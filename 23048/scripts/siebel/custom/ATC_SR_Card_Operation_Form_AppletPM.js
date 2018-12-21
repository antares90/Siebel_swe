//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=ATC_SR_Card_Operation_Form_Applet&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.ATC_SR_Card_Operation_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_SR_Card_Operation_Form_AppletPM");
 define("siebel/custom/ATC_SR_Card_Operation_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_SR_Card_Operation_Form_AppletPM = (function () {

    function ATC_SR_Card_Operation_Form_AppletPM(pm) {
     SiebelAppFacade.ATC_SR_Card_Operation_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_SR_Card_Operation_Form_AppletPM, SiebelAppFacade.PresentationModel);

    ATC_SR_Card_Operation_Form_AppletPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Card_Operation_Form_AppletPM.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_SR_Card_Operation_Form_AppletPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Card_Operation_Form_AppletPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATC_SR_Card_Operation_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_SR_Card_Operation_Form_AppletPM";
 })
}
