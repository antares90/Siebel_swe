//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=ATC_Voice_IFrame_KI_Form_Applet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM");
 define("siebel/custom/ATC_Voice_IFrame_KI_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM = (function () {

    function ATC_Voice_IFrame_KI_Form_AppletPM(pm) {
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Voice_IFrame_KI_Form_AppletPM, SiebelAppFacade.PresentationModel);
	
	var iframeLink = "http://10.252.7.25:8290/frame/"; //ссылка на iframe
	var session_key;    

    ATC_Voice_IFrame_KI_Form_AppletPM.prototype.Init = function () {
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.Init.apply(this, arguments);
	//var bc = this.Get("GetBusComp").GetParentBusComp().GetParentBusComp().GetFieldValue("Integration Id");
	//console.log("GetFieldValue = " + SiebelApp.S_App.GetProfileAttr("KI Login Id"));
						
					var bc = this.Get("GetBusComp").GetParentBusComp().GetParentBusComp();
				   this.SetProperty("OptyId", bc.GetFieldValue("Id"));
			       var bs = SiebelApp.S_App.GetService("ATC WF Utility"),
			       ps = SiebelApp.S_App.NewPropertySet();
			       ps.SetProperty("BOName", "ATC Action");
			       ps.SetProperty("BCName", "ATC Action");
			       ps.SetProperty("FieldName", "Voice Auth Session Key");
			       //ps.SetProperty("FieldName2", "Id");
			       ps.SetProperty("SearchExpr", "[Type] = 'Вызов - исходящий' AND [Status] = 'Открыто' AND [Primary Owner Id] = '" + SiebelApp.S_App.GetProfileAttr("KI Login Id") + "'");
			       var psOut = bs.InvokeMethod("GetFieldValues", ps);
			       var session_key = (psOut.GetChildByType("ResultSet").GetProperty("FieldValue") == "" ? "" : psOut.GetChildByType("ResultSet").GetProperty("FieldValue"));
			      
				   
	//console.log("Outputs = " + Outputs.GetChildByType("ResultSet").GetProperty("childEnum"));
	
/*	for(var property in Inputs) {
		console.log("- " + property + " = " + Inputs[property]);
		} //childEnum  value 
	*/
	if($("#AtcKiVoiceIFrameHTMLMessage").length > 0 && session_key>""){
			console.log("AtcKiVoiceIFrameHTMLMessage существует");
			$("#AtcKiVoiceIFrameHTMLMessage").after("<iframe name=\"VoiceIframeKI\"  src=\"" + iframeLink + session_key + "\"></iframe>");
			console.log("iFrame Link = " + iframeLink + session_key);
		} else {
			console.log("AtcKiVoiceIFrameHTMLMessage  не существует");
		}
		
    }

    ATC_Voice_IFrame_KI_Form_AppletPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.Setup.apply(this, arguments);
    }

    return ATC_Voice_IFrame_KI_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM";
 })
}
