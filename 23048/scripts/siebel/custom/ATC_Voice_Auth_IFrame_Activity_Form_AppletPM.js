//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=ATC_Voice_Auth_IFrame_Activity_Form_Applet&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPM");
 define("siebel/custom/ATC_Voice_Auth_IFrame_Activity_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPM = (function () {

    function ATC_Voice_Auth_IFrame_Activity_Form_AppletPM(pm) {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Voice_Auth_IFrame_Activity_Form_AppletPM, SiebelAppFacade.PresentationModel);

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": ATC_Voice_Auth_IFrame_Activity_Form_AppletPM:      Init method reached.");
	// $("#AtcVoiceAuthIFrameHTMLMessage").after("<iframe name=\"VoiceAuth\"></iframe>");
	 //$("#AtcVoiceAuthIFrameHTMLMessage").after("<iframe name=\"VoiceAuth\" src=\"http://kursksu.ru\"></iframe>");
     // Add code here that should happen after default processing
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.Get("GetName")+": ATC_Voice_Auth_IFrame_Activity_Form_AppletPM:      Setup method reached.");
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATC_Voice_Auth_IFrame_Activity_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPM";
 })
}
