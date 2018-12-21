//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=ATC_Superuser_Communication_Voice_IFrame_Form_Applet&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM");
 define("siebel/custom/ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM = (function () {

    function ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM(pm) {
     SiebelAppFacade.ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM, SiebelAppFacade.PresentationModel);
	
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
	var session_key, detailForm, sFormAppletId;

    ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM.prototype.Init = function () {
     SiebelAppFacade.ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM.superclass.Init.apply(this, arguments);

	this.AddMethod("ShowIframe",ShowIframe, {sequence : false, scope : this});
	this.AddMethod("ShowSelection",PostShowSelection, {sequence : false, scope : this});
	this.ExecuteMethod("ShowIframe");
	 
    }

    ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM.prototype.Setup = function (propSet) {
		
     SiebelAppFacade.ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM.superclass.Setup.apply(this, arguments);
    
    }
	
	function ShowIframe() {
		$('#AtcVoiceAuthIFrameHTMLMessage').parent().hide(); //скрытие iframe
		console.log("Коммуникация = " + this.Get("GetBusComp").GetFieldValue("Id") + " status = " + this.Get("GetBusComp").GetFieldValue("Status") + " ключ сессии = " + this.Get("GetBusComp").GetFieldValue("Voice Auth Session Key"));
		session_key	= this.Get("GetBusComp").GetFieldValue("Voice Auth Session Key");
		
		
		if(session_key>"" && this.Get("GetBusComp").GetFieldValue("Status")=="Открыто") {
			
			$("iframe[name='VoiceAuth']").remove()
			$("#AtcVoiceAuthIFrameHTMLMessage").after("<iframe name=\"VoiceAuth\"  src=\"" + iframeLink + session_key + "\"></iframe>");
			console.log("iFrame Link = " + iframeLink + session_key);
			$('#AtcVoiceAuthIFrameHTMLMessage').parent().show()  //открытие iframe
	
		}
	}
	
	function PostShowSelection(){
		console.log("вызываем ShowIframe");
		this.ExecuteMethod("ShowIframe");
	}

    return ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_Superuser_Communication_Voice_IFrame_Form_AppletPM";
 })
}

