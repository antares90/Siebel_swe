if (typeof(SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR");
 define("siebel/custom/ATC_Voice_Auth_IFrame_Activity_Form_AppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR = (function () {

    function ATC_Voice_Auth_IFrame_Activity_Form_AppletPR(pm) {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Voice_Auth_IFrame_Activity_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);
	
	var sBusService = SiebelApp.S_App.GetService("ATC WF Utility");
	var Inputs = SiebelApp.S_App.NewPropertySet();
	var Outputs = SiebelApp.S_App.NewPropertySet();	
	Inputs.SetProperty("BOName", "EAI Lookup Map");
	Inputs.SetProperty("BCName", "EAI Lookup Map");
	Inputs.SetProperty("FieldName", "Siebel Value");  
	Inputs.SetProperty("SearchExpr", "[External System Value]='VoiceAuthIframeUrl'");
	Outputs = sBusService.InvokeMethod("GetFieldValues", Inputs);
	
	var iframeLink = Outputs.GetChildByType ("ResultSet").GetProperty("FieldValue");  //ссылка на iframe
	//var iframeLink = "http://10.252.7.25:8290/frame/"; //ссылка на iframe
	
    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.Init = function () {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Voice_Auth_IFrame_Activity_Form_AppletPR:      Init method reached.");
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.ShowUI = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Voice_Auth_IFrame_Activity_Form_AppletPR:      ShowUI method reached.");
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.ShowUI.apply(this, arguments);
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.BindData = function (bRefresh) {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Voice_Auth_IFrame_Activity_Form_AppletPR:      BindData method reached.");
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.BindData.apply(this, arguments);
	
	 var session_key = this.GetPM().Get("GetBusComp").GetFieldValue("ATC Voice Auth Session Key");
	 //console.log("session_key = " + session_key);
	 $("#AtcVoiceAuthIFrameHTMLMessage").after("<iframe name=\"VoiceAuth\"  src=\"" + iframeLink + session_key + "\"></iframe>");
	 console.log("iFrame Link = " + iframeLink + session_key);
	 
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.BindEvents = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Voice_Auth_IFrame_Activity_Form_AppletPR:      BindEvents method reached.");
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.EndLife = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Voice_Auth_IFrame_Activity_Form_AppletPR:      EndLife method reached.");
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.EndLife.apply(this, arguments);
    }

    return ATC_Voice_Auth_IFrame_Activity_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR";
 })
}
