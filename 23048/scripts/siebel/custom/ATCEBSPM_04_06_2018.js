//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopList&name=ATCAttachmentsPhotoList&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATCEBSPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCEBSPM");
 define("siebel/custom/ATCEBSPM", ["siebel/pmodel",
          "3rdParty/recorder/dist/recorder",
         "3rdParty/adapter-master/release/adapter"],
  function () {
      SiebelAppFacade.ATCEBSPM = (function () {

          function ATCEBSPM(pm) {
              SiebelAppFacade.ATCEBSPM.superclass.constructor.apply(this, arguments);
          }

          SiebelJS.Extend(ATCEBSPM, SiebelAppFacade.PresentationModel);
          ATCEBSPM.prototype.Init = function () {
              SiebelAppFacade.ATCEBSPM.superclass.Init.call(this);
              this.AddProperty('GetApplet', SiebelApp.S_App.GetMainView().GetAppletMap()[this.Get('GetName')]);
              this.AddProperty('GetView', SiebelApp.S_App.GetMainView());
              var viewPM = SiebelAppFacade.ComponentMgr.FindComponent({ id: SiebelApp.S_App.GetMainView().GetName() }).GetPM();
              this.AddProperty("GetViewPM", viewPM);
              viewPM.SetProperty("GetCheckAudio", this.OpenCheckAudioPopup.bind(this));
              this.AddProperty('GetAudioContext', null);
              this.AddProperty('GetRecorder', null);
              this.AddProperty('AudioData', null);
              this.AddProperty('CheckVoiceUrl', null);
              this.AddProperty('GetFilenamePrefix', 'audio');
              this.AddProperty('GetValidationStatus', null);
              this.AddProperty('GetDocType', null);
              this.AddMethod('InvokeMethod', this.PreInvokeMethod, {
                  sequence: true,
                  scope: this
              });
          }

          ATCEBSPM.prototype.Setup = function (ps) {
              SiebelAppFacade.ATCEBSPM.superclass.Setup.call(this, ps);
              this.getConfig();
          }

          ATCEBSPM.prototype.getConfig = function () {
              var bs = SiebelApp.S_App.GetService("ATC EBS Proxy Service"),
                  ps = SiebelApp.S_App.NewPropertySet();
              ps.SetProperty("ProfileName", "VoiceProfile");
              var psOut = bs.InvokeMethod("GetConfig", ps),
                  psRes = psOut.GetChildByType("ResultSet"),
                  audioData = [];

              if (!!psRes)
                  for (var i = 0; i < psRes.GetChildCount(); i++) {
                      psChild = psRes.GetChild(i);
                      if (psChild.GetProperty("Name") == "AudioDataText") {
                          audioData.push({
                              Id: Number(psChild.GetProperty("Order")),
                              text: psChild.GetProperty("Value"),
                              buffers: null,
                              url: null,
                              blob: null,
                              duration: null,
                              isRecording: false
                          });
                      }
                      else {
                          this.SetProperty("Get" + psChild.GetProperty("Name"), psChild.GetProperty("Value"));
                      }
                  }
              this.SetProperty("AudioData", audioData.sort(function (a, b) { return a.Id - b.Id }));
          }
      

       ATCEBSPM.prototype.getAudioData=function() {
           if (!this.Get("AudioData"))
               this.SetProperty("AudioData",[
                   {
                       Id: 1,
                       text: 'У попа была собака',
                       buffers: null,
                       url: null,
                       blob: null,
                       isRecording: false,
                   },
                   {
                       Id: 2,
                       text: 'Она съела кусок мяса',
                       buffers: null,
                       url: null,
                       blob: null,
                       isRecording:false
                   }                  
               ]);
           return this.Get("AudioData");
       }
          ATCEBSPM.prototype.getDocType = function () {
             return this.Get("GetDocType") || 'Заявление';              
          }

       ATCEBSPM.prototype.getWriteDuration = function () {
           var duration = this.Get("GetDuration") || '10';
           return Number(duration);
       }

       ATCEBSPM.prototype.getTotalDuration = function () {
           var duration = this.Get("GetTotalDuration") || '30';
           return Number(duration);
       }

       ATCEBSPM.prototype.getChanels = function () {
           var chanels = this.Get("GetChanels") || '2';
           chanels = Number(chanels);
           if (chanels != 1 && chanels != 2)
               throw "Параметр Chanels может быть только 1 или 2";
           return chanels;
       }

       ATCEBSPM.prototype.getCheckVoiceUrl = function () {
           var url = this.Get("GetCheckVoiceURL");
           if (!url) {
               throw "Не настроен параметр CheckVoiceURL";
               }
           //return "http://192.168.10.50:8083/CV";
           return url;
       }

       ATCEBSPM.prototype.checkValidationStatus = function ()
       {
           var validationStatus = this.Get('GetValidationStatus'),
               curValidationStatus = null;
           if (validationStatus == "ERROR" || validationStatus == "SUCCESS" || validationStatus == "FAILED" || validationStatus == "SYSTEMERROR" || validationStatus == "LOADING")
               return validationStatus;           
           $.each(this.getAudioData(), function (name, val) {
               if (!val.blob)
                   curValidationStatus = "RECORDING";
           });
           validationStatus = curValidationStatus == "RECORDING"? "RECORDING":"RECORDED";           
           this.SetProperty('GetValidationStatus', validationStatus);
           return validationStatus;
       }

       ATCEBSPM.prototype.saveFullAudio = function () {
           var that = this,
               formData = new FormData();
           formData.append('SWEView', this.Get("GetView").GetName());
           formData.append('SWEApplet', this.Get("GetName"));
           formData.append('SWECmd', 'InvokeMethod');
           formData.append('SWEMethod', 'NewFileAttachment');
           formData.append('SWETS', new Date().getTime());
           formData.append('SWERPC', '1');
           formData.append('SWERowIds', '');
           formData.append('SWEP', '');
           formData.append('s_SweFileName', this.Get("mergedAudio"), this.Get("GetFilenamePrefix").replace("{GetDate}", new Date().getTime().toString()) +".wav");
           jQuery.ajax({
               url: SiebelApp.S_App.GetPageURL() + '?SRN=' + SiebelApp.S_App.GetSRN(),
               data: formData,
               cache: false,
               contentType: false,
               processData: false,
               method: 'POST',
               type: 'POST', 
               success: this.saveOtherFields.bind(this)
           });               
       }
       ATCEBSPM.prototype.getDurationData = function ()
       {
           var res = SiebelApp.S_App.NewPropertySet(),
               res1 = SiebelApp.S_App.NewPropertySet(),
               startTime = 0;
           res1.SetType("OutPS");           
           $.each(this.getAudioData(), function (name, val) {               
               var psChild = SiebelApp.S_App.NewPropertySet();
               psChild.SetProperty("Id", val.Id);
               psChild.SetProperty("Text", val.text);
               psChild.SetProperty("StartTime", startTime);
               startTime += val.duration;
               psChild.SetProperty("EndTime", startTime);
               res1.AddChild(psChild);
               
           });
           res.AddChild(res1);
           return res.EncodeAsString();
       }


       ATCEBSPM.prototype.saveOtherFields = function (data) {
           if (!SiebelApp.Utils.IsEmpty(data)) {
               SiebelApp.S_App.ProcessResponse(data);
               SiebelApp.S_App.uiStatus.Free();
               var bc = this.Get("GetBusComp");
               bc.SetFieldValue("ATC Doc Type", this.getDocType());
               bc.SetFieldValue("EBS Data", this.getDurationData());
               this.invokeBCMethodSync("WriteRecord");
           }
       }

       ATCEBSPM.prototype.invokeBCMethodSync = function (methodName) {
           var ai = {
               async: false,
               selfbusy: true,
               scope: this,
               mask: true,
               opdecode: true
           },
               inPropSet = CCFMiscUtil_CreatePropSet();
           if (methodName == "WriteRecord")
               methodName = "ImplicitCommit";
           this.ExecuteMethod("InvokeMethod", methodName, inPropSet, ai);
       }

       ATCEBSPM.prototype.checkAudio=function(blob) {
           var that = this;
           try{
           $.ajax({
               url: this.getCheckVoiceUrl(),
               type: 'POST',
               data: blob,
               processData: false,
               contentType: false,
               success: this.onCheckSuccess.bind(this),
               error: this.onCheckError.bind(this)
           });
           }
           catch (e)
           {
               alert(e);
           }
       }

       
       ATCEBSPM.prototype.checkFullAudio = function () {
           var that=this;
           this.getRecorder().exportBuffersWAV(function(blob){
               var url = URL.createObjectURL(blob);
               that.SetProperty("mergedAudio",blob);
               that.checkAudio(blob);               
           },this.getAudioData());
       }

       ATCEBSPM.prototype.OpenCheckAudioPopup = function ()
       {
           this.GetRenderer().OpenPopup();           
       }

       ATCEBSPM.prototype.PreInvokeMethod=function(methodName,psIn,arg,retVal) {
            if(methodName=="CheckAudio"){
                this.OpenCheckAudioPopup();
                setCancelOperation(retVal);
            }
       }

       ATCEBSPM.prototype.loadAudioContext = function () {
           try {
               var pm = this;
               pm.SetProperty("GetValidationStatus","LOADING");
               var audio_context = this.Get("GetAudioContext")||new AudioContext;
               this.SetProperty("GetAudioContext", audio_context);
           }
           catch
               (e) {
               alert('No web audio support in this browser!');
           }
           navigator.getUserMedia({audio: true}, function (stream) {
               var
                   input = pm.Get("GetRecorderInput") || audio_context.createMediaStreamSource(stream),
                   recorder = pm.Get("GetRecorder") || new Recorder(input, { numChannels: pm.getChanels() });
               pm.SetProperty("GetRecorderInput", input);
               pm.SetProperty("GetRecorder", recorder);               
               pm.SetProperty("GetValidationStatus", "RECORDING");               
               pm.GetRenderer().drawCurrentStatus();
           }, function (e) {
               pm.SetProperty("GetValidationStatus", "SYSTEMERROR");
               pm.GetRenderer().drawCurrentStatus();
           });
       }

       ATCEBSPM.prototype.abortRecording=function() {
           var recorder = this.getRecorder();
           if (!!recorder) {
               if (recorder.recording) {
                   recorder.stop();
                   recorder.clear();
                   this.getAudioData().forEach(function (name) {
                       name.isRecording = false;
                   });
                   return true;
               }
           }           
           return false;
       }
       ATCEBSPM.prototype.setDuration = function (recNum, duration)
       {           
           this.getAudioData().filter(function (name) {
               return name.Id == recNum;
           }).forEach(function (name) {
               name.duration = duration;
           });
       }
       ATCEBSPM.prototype.stopRecording = function (recNum,callback) {
           var pm=this,
               recorder = this.getRecorder();
           if(recorder.recording) {
               recorder.stop();
               recorder.exportWAV(function (blob) {
                   var url = URL.createObjectURL(blob);
                   pm.getAudioData().filter(function (name) {
                       return name.Id == recNum;
                   }).forEach(function (name) {
                       name.blob = blob,
                           name.url = url;
                       name.isRecording = false;
                   });
                   callback(recNum,url);
                   recorder.getBuffer(function (buffers) {
                       pm.getAudioData().filter(function (name) {
                           return name.Id == recNum;
                       }).forEach(function (name) {
                           name.buffers = buffers;
                       });
                       recorder.clear();
                   });
               });
           }
       }


       ATCEBSPM.prototype.startRecording = function (recNum) {
           this.SetProperty("GetValidationStatus", "RECORDING");
           var recorder = this.getRecorder();
           if (!recorder.recording) {
               recorder.record();
               this.getAudioData().filter(function (name) {
                   return name.Id == recNum;
               }).forEach(function (name) {               
                   name.isRecording = true;
               });
           }
       }

       ATCEBSPM.prototype.checkOneAudio = function (recNum) {
           var resBlob=null,
               pr = this.GetRenderer();
           this.getAudioData().filter(function(name){
               return name.Id==recNum;
           }).forEach(function(name){
               resBlob=name.blob;
           });
           this.checkAudio(resBlob,this.onCheckSuccess.bind(this), this.onCheckError.bind(this));
       }

       ATCEBSPM.prototype.onCheckSuccess = function (data) {
           var rend = this.GetRenderer();
           if (data.Result == 1)
               this.SetProperty('GetValidationStatus', 'SUCCESS');
           else {
               this.SetProperty('GetValidationStatus', 'ERROR');
               $.each(this.getAudioData(), function (name, val) {
                   val.buffers = null;
                   val.url = null;
                   val.blob = null;
                   val.isRecording = false;
                   rend.setAudioData(val.Id, null);
               });
           }
           this.GetRenderer().drawCurrentStatus();
       }

       ATCEBSPM.prototype.onCheckError = function (data) {
           this.SetProperty('GetValidationStatus', 'FAILED');
           this.GetRenderer().drawCurrentStatus();
       }


       ATCEBSPM.prototype.getRecorder = function (){
           return this.Get('GetRecorder');
       }

       ATCEBSPM.prototype.getRecorderInput = function (){
           return this.Get('GetRecorderInput');
       }

       function setCancelOperation(retVal){
           retVal.CancelOperation=true, retVal.ReturnValue=true, retVal.CancelPost =true;
           SiebelApp.S_App.uiStatus.Free();
       }

       ATCEBSPM.prototype.EndLife= function()
       {
           if(!!this.getRecorder()) {
               this.getRecorder().worker.terminate();
               delete this.getRecorder();
           }
           if(!!this.Get("GetAudioContext"))
            delete this.Get("GetAudioContext");

       }
    return ATCEBSPM;
   }()
  );
  return "SiebelAppFacade.ATCEBSPM";
 })
}
