//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopList&name=ATC_SR_Agreement_XM_RateVal_List_Applet&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPM");
 define("siebel/custom/ATC_SR_Agreement_XM_RateVal_List_AppletPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPM = (function () {

    function ATC_SR_Agreement_XM_RateVal_List_AppletPM(pm) {
     SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_SR_Agreement_XM_RateVal_List_AppletPM, SiebelAppFacade.ListPresentationModel);

    ATC_SR_Agreement_XM_RateVal_List_AppletPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPM.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing	 
    }

    ATC_SR_Agreement_XM_RateVal_List_AppletPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATC_SR_Agreement_XM_RateVal_List_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPM";
 })
}
