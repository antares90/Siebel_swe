//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopList&name=ATCAttachmentsPhotoList&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATCAttachmentEXTFSPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCAttachmentEXTFSPM");
 define("siebel/custom/ATCAttachmentEXTFSPM", ["siebel/listpmodel","siebel/custom/EXTFSLoader"],
  function () {
   SiebelAppFacade.ATCAttachmentEXTFSPM = (function () {

    function ATCAttachmentEXTFSPM(pm) {
     SiebelAppFacade.ATCAttachmentEXTFSPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCAttachmentEXTFSPM, SiebelAppFacade.ListPresentationModel);
       ATCAttachmentEXTFSPM.prototype.Init = function () {
           SiebelAppFacade.ATCAttachmentEXTFSPM.superclass.Init.call(this);
           this.AddProperty('GetApplet', SiebelApp.S_App.GetMainView().GetAppletMap()[this.Get('GetName')]);
           this.AddProperty('GetView', SiebelApp.S_App.GetMainView());
           this.AddProperty('NewFileCtrlId','');
           this.AddMethod('InvokeMethod',this.PreInvokeMethod, {
               sequence: true,
               scope: this
           });
           this.AddMethod('NewFileAttachment',this.PreNewFileAttachment, {
               sequence: true,
               scope: this
           });
       }

       ATCAttachmentEXTFSPM.prototype.Setup = function (propSet) {
           SiebelAppFacade.ATCAttachmentEXTFSPM.superclass.Setup.apply(this, arguments);
           if(!this.isSFS())
               EXTFSLoader.LoadModule(this.getActiveFS(),this.SetProperty);
           var that=this;
           $.each(this.Get("GetApplet").GetControls(),function(name,ctrl){
               if(ctrl.GetMethodName()=="NewFileAttachment")
                that.SetProperty('NewFileCtrlId',ctrl.GetInputName()+'s_SweFileName');
           });
       }


       ATCAttachmentEXTFSPM.prototype.PreNewFileAttachment=function(a, b, retVal) {
           if (!this.isSFS()) {
               this.setFile($("#"+this.Get("NewFileCtrlId"))[0].files[0]);
               this.getEXTFSLoader().loadAttachment(this,
                   this.getFile(),
                   this.createFileAttachment(this.getFileName(),true),
                   this.doSaveAttachment,
                   this.doUndoAttachment
               );
               setCancelOperation(retVal);
               return false;
           }
       }

       ATCAttachmentEXTFSPM.prototype.PreInvokeMethod=function(methodName,psIn,arg,retVal) {
           if (methodName == "Drilldown") {
               if (!this.getActiveFS())
                   return;
               var bc = this.Get("GetBusComp"),
                   prefix = this.getDefaultPrefix();
               if (!this.validateBC()) {
                   alert("Апплет не корректно настроен. Обратитесь к администратору.");
                   setCancelOperation(retVal);
                   return;
               }
               if (this.getActiveFS() == "SFS") {
                   if (bc.GetFieldValue(prefix + "FileSrcType") == "URL" && bc.GetFieldValue(prefix + "EXTFSFlg") == "Y") {
                       alert("Файл не перенесен на SiebelFS");
                       setCancelOperation(retVal);
                   }
               }
               else {
                   if (bc.GetFieldValue(prefix + "FileSrcType") != "URL" || bc.GetFieldValue(prefix + "EXTFSFlg") != "Y") //Файл еще не перенесен на новую ФС
                       return;
                   if (bc.GetFieldValue(prefix + "EXTFSCode") != this.getActiveFS()) {
                       alert("Файл не перенесен на файловую систему " + this.getActiveFS() + " c " + bc.GetFieldValue(prefix + "EXTFSCode"));
                       setCancelOperation(retVal);
                       return;
                   }
                   this.getEXTFSLoader().getAttachment(bc.GetFieldValue(prefix + "FileSrcPath"), bc.GetFieldValue(prefix + "FileName"));
                   setCancelOperation(retVal);
               }
           }
           if (methodName == "EditPopup") {
               if(!this.isSFS()) {
                   if(this.Get("GetApplet").GetActiveControl().GetName()==this.getDefaultPrefix()+'FileName') {
                       this.GetRenderer().OpenPopup();
                       setCancelOperation(retVal);
                   }
               }
           }
       }


        ATCAttachmentEXTFSPM.prototype.saveFileAttachment=function(file) {

            if (this.isSFS())
                return "Изменилась используемая фалойвая система. Перезайдите  на экран";
            this.setFile(file);
            this.getEXTFSLoader().loadAttachment(this,
                this.getFile(),
                this.createFileAttachment(this.getFileName(), false),
                this.doSaveAttachment,
                this.doUndoAttachment
            );
            return null;
        }

       ATCAttachmentEXTFSPM.prototype.saveURLAttachment=function(urlVal) {
           if(!urlVal)
            return "Укажите валидный URL";
           var bc=this.Get("GetBusComp"),
               prefix=this.getDefaultPrefix();
           bc.SetFieldValue(prefix+"EXTFSFlg","N");
           bc.SetFieldValue(prefix+"FileName",urlVal);
           bc.SetFieldValue(prefix+"FileSrcPath",urlVal);
           bc.SetFieldValue(prefix + "FileSrcType","URL");
           this.invokeBCMethodSync("WriteRecord");
           return null;
       }


       ATCAttachmentEXTFSPM.prototype.getEXTFSLoader=function() {
           return EXTFSLoader.GetModule(this.getActiveFS());
       }

       ATCAttachmentEXTFSPM.prototype.getFSClientPath=function() {
          if(!this.Get("GetFSClientPath"))
              this.SetProperty("GetFSClientPath",EXTFSLoader.GetConstant("CLIENT_JS",this.getActiveFS()));
           return this.Get("GetFSClientPath");
       }


       ATCAttachmentEXTFSPM.prototype.isSFS=function() {
            return !this.getActiveFS()||this.getActiveFS()==="SFS";
       }

       ATCAttachmentEXTFSPM.prototype.getFile=function(){
           return this.Get("GetFile");
       }
       ATCAttachmentEXTFSPM.prototype.getFileName=function(){
           return this.Get("GetFile").name;
       }
       ATCAttachmentEXTFSPM.prototype.setFile=function(file){
           this.SetProperty("GetFile",file);
       }

       function setCancelOperation(retVal){
           retVal.CancelOperation=true, retVal.ReturnValue=true, retVal.CancelPost =true;
           SiebelApp.S_App.uiStatus.Free();
       }

       ATCAttachmentEXTFSPM.prototype.validateBC=function() {
           var bc = this.Get("GetBusComp"),
               defaultPrefix = this.getDefaultPrefix(),
               fieldList = bc.GetFieldMap();
           return !!fieldList[defaultPrefix + "EXTFSCode"] && !!fieldList[defaultPrefix + "EXTFSFlg"] && !!fieldList[defaultPrefix + "FileSrcPath"] && !!fieldList[defaultPrefix + "FileSrcType"] && !!fieldList[defaultPrefix + "SFSFlg"];
       }



       ATCAttachmentEXTFSPM.prototype.getActiveFS=function() {
           if (!this.Get("ActiveFS")) {
               var bs = SiebelApp.S_App.GetService("ATC EXT FS Proxy Service"),
                   ps = SiebelApp.S_App.NewPropertySet();
               ps.SetProperty("Name", this.Get("GetBusComp").GetName());
               var psOut = bs.InvokeMethod("GetActiveFS", ps);
               var psRes = psOut.GetChildByType("ResultSet");
               if (!!psRes)
                   if (!!psRes.GetProperty("FS Code")) {
                       this.SetProperty("ActiveFS", psRes.GetProperty("FS Code"));
                       this.SetProperty("DefaultPrefix", psRes.GetProperty("DefaultPrefix"));
                   }
               ;
           }
           return this.Get("ActiveFS");
       }
       ATCAttachmentEXTFSPM.prototype.getDefaultPrefix=function() {
           if (!this.Get("DefaultPrefix"))
               this.getActiveFS();
           return this.Get("DefaultPrefix");
       }

       ATCAttachmentEXTFSPM.prototype.invokeBCMethodSync=function(methodName)
       {
           var  ai = {
                   async: false,
                   selfbusy: true,
                   scope: this,
                   mask: true,
                   opdecode: true
               },
               inPropSet = CCFMiscUtil_CreatePropSet();
           if(methodName=="WriteRecord")
                methodName="ImplicitCommit";
           this.ExecuteMethod("InvokeMethod",methodName,inPropSet,ai);
       }

       ATCAttachmentEXTFSPM.prototype.createFileAttachment=function(fileName,newRecord){
           if(newRecord)
            this.invokeBCMethodSync("NewRecord");
           var prefix=this.getDefaultPrefix(),
               bc=this.Get("GetBusComp");
           bc.SetFieldValue(prefix+"EXTFSFlg","Y");
           bc.SetFieldValue(prefix+"FileName",fileName);
           bc.SetFieldValue(prefix + "FileSrcType","URL");
           this.invokeBCMethodSync("WriteRecord");
           //return bc.GetFieldValue("Id");
		   
		    var bsUnicName = SiebelApp.S_App.GetService("ATC EXT FS Proxy Service");
			psUnicIN = SiebelApp.S_App.NewPropertySet();
			psUnicOUT = SiebelApp.S_App.NewPropertySet();
			psUnicOUT = bsUnicName.InvokeMethod("GetUnicName",psUnicIN);
			var psUnicRes = psUnicOUT.GetChildByType("ResultSet");	 
			return psUnicRes.GetProperty("Process Instance Id");
       }
       ATCAttachmentEXTFSPM.prototype.doUndoAttachment=function(){
           this.invokeBCMethodSync("DeleteRecord");
       }

       ATCAttachmentEXTFSPM.prototype.doSaveAttachment=function(sUrl){
           var prefix=this.getDefaultPrefix(),
               bc=this.Get("GetBusComp");
           bc.SetFieldValue(prefix+"FileSrcPath",sUrl);
           this.invokeBCMethodSync("WriteRecord");
       }

    return ATCAttachmentEXTFSPM;
   }()
  );
  return "SiebelAppFacade.ATCAttachmentEXTFSPM";
 })
}
