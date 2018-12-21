//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=ATCStringHighlighting&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATCStringHighlightingPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCStringHighlightingPM");
 define("siebel/custom/ATCStringHighlightingPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.ATCStringHighlightingPM = (function () {
    var constant = SiebelJS.Dependency("SiebelApp.Constants");

    function ATCStringHighlightingPM(pm) {
     SiebelAppFacade.ATCStringHighlightingPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCStringHighlightingPM, SiebelAppFacade.ListPresentationModel);

    ATCStringHighlightingPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATCStringHighlightingPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": ATCStringHighlightingPM:      Init method reached.");
     // Add code here that should happen after default processing
    }

    ATCStringHighlightingPM.prototype.Setup = function (propSet) {
     SiebelJS.Log(this.Get("GetName")+": ATCStringHighlightingPM:      Setup method reached.");
     SiebelAppFacade.ATCStringHighlightingPM.superclass.Setup.apply(this, arguments);
      var apm = propSet.GetChildByType(consts.get("SWE_APPLET_PM_PS"));
      this.SetProperty("CF Fields List", apm.GetProperty("CF Fields List"));
      this.SetProperty("CF Treshold List", apm.GetProperty("CF Treshold List"));
      console.log(apm);
    }

    return ATCStringHighlightingPM;
   }()
  );
  return "SiebelAppFacade.ATCStringHighlightingPM";
 })
}
