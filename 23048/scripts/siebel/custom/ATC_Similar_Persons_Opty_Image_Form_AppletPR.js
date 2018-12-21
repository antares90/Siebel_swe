if (typeof (SiebelAppFacade.ATC_Similar_Persons_Opty_Image_Form_AppletPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.ATC_Similar_Persons_Opty_Image_Form_AppletPR");
    define("siebel/custom/ATC_Similar_Persons_Opty_Image_Form_AppletPR", ["siebel/custom/ATC_Custom_RotatePR"], function () {
        SiebelAppFacade.ATC_Similar_Persons_Opty_Image_Form_AppletPR = (function () {

            function ATC_Similar_Persons_Opty_Image_Form_AppletPR(pm) {
                SiebelAppFacade.ATC_Similar_Persons_Opty_Image_Form_AppletPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(ATC_Similar_Persons_Opty_Image_Form_AppletPR, SiebelAppFacade.ATC_Custom_RotatePR);

            ATC_Similar_Persons_Opty_Image_Form_AppletPR.prototype.Init = function () {
                // Init is called each time the object is initialised.
                // Add code here that should happen before default processing
                SiebelAppFacade.ATC_Similar_Persons_Opty_Image_Form_AppletPR.superclass.Init.apply(this, arguments);
                // Add code here that should happen after default processing
                this.getConfig();
            }

      			ATC_Similar_Persons_Opty_Image_Form_AppletPR.prototype.SetControlValue = function (control, val, b) {
              ATC_Similar_Persons_Opty_Image_Form_AppletPR.superclass.SetControlValue.call(this, control, val, b);
      				if (control.GetName() == "OpptyFileName")
      				{
                var pm = this.GetPM();
                var bcAttachment = pm.Get("GetBusComp");
                var bcSimilarPerson = bcAttachment.GetParentBusComp();
                if (bcSimilarPerson.GetName() === "ATC Similar Persons")
                {
                  var LunaFlag = bcSimilarPerson.GetFieldValue("Luna Flag");
                  var PhotoId = bcSimilarPerson.GetFieldValue("Photo Key Id");
                  var ClientNumber = bcSimilarPerson.GetFieldValue("Similar Persons Number");
                  pm.SetProperty("ClientNumber", ClientNumber);
                  var ClientPrefix = pm.Get("ClientPrefix");
                  if (ClientPrefix>'' && ClientNumber.startsWith(ClientPrefix) && LunaFlag==="Y" && PhotoId>'')
                  {
                    this.GetPortrait(PhotoId);
                  }
                }
      				}
      			}

      			ATC_Similar_Persons_Opty_Image_Form_AppletPR.prototype.GetPortrait = function (DescriptorId) {
      				var pm = this.GetPM();
      				var oReq = new XMLHttpRequest();
      				oReq.open('GET', pm.Get("GetLUNAURL") + '/storage/portraits/'+DescriptorId, true);
      				oReq.responseType = "blob";
              oReq.setRequestHeader('X-Auth-Token', pm.Get("GetLUNAAuthToken"));
      				oReq.onload = this.drawPortrait.bind(this);
              oReq.onerror = function () {
                    alert("Не удалось загрузить фотографию для связанного лица");
                  };
      				oReq.send();
      			}

      			ATC_Similar_Persons_Opty_Image_Form_AppletPR.prototype.drawPortrait = function(evt) {
      				var pm=this.GetPM();
              var client_img = $('#'+pm.Get("GetControls")["OpptyFileName"].GetInputName()+' img')[0];
      				client_img.src=URL.createObjectURL(evt.target.response);
              client_img.title=pm.Get("ClientNumber");
      			}

            ATC_Similar_Persons_Opty_Image_Form_AppletPR.prototype.getConfig = function () {
                var pm = this.GetPM()
                var bs = SiebelApp.S_App.GetService("ATC Luna Helper"),
                    ps = SiebelApp.S_App.NewPropertySet();
                ps.SetProperty("ProfileCode", "CLIENT_BLACK_LIST");
                var psOut = bs.InvokeMethod("GetLunaProfile", ps),
                    psRes = psOut.GetChildByType("ResultSet");
                if (!!psRes)
                    for (var prop = psRes.GetFirstProperty(); prop!==""&&prop; prop = psRes.GetNextProperty()) {
                        pm.SetProperty("Get" + prop, psRes.GetProperty(prop));
                    }
                //Get ClientPrefix
                psOut = bs.InvokeMethod("GetClientPrefix", ps);
                pm.SetProperty("ClientPrefix", psOut.GetChildByType ("ResultSet").GetProperty("ClientPrefix"))
            }

            return ATC_Similar_Persons_Opty_Image_Form_AppletPR;
        }());
        return "SiebelAppFacade.ATC_Similar_Persons_Opty_Image_Form_AppletPR";
    })
}
