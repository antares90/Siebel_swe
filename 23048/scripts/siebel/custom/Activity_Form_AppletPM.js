if (typeof(SiebelAppFacade.Activity_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.Activity_Form_AppletPM");
 define("siebel/custom/Activity_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.Activity_Form_AppletPM = (function () {

    function Activity_Form_AppletPM(pm) {
     SiebelAppFacade.Activity_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(Activity_Form_AppletPM, SiebelAppFacade.PresentationModel);

    Activity_Form_AppletPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.Activity_Form_AppletPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": Activity_Form_AppletPM:      Init method reached.");
     // Add code here that should happen after default processing
    }

    Activity_Form_AppletPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.Get("GetName")+": Activity_Form_AppletPM:      Setup method reached.");
     SiebelAppFacade.Activity_Form_AppletPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return Activity_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.Activity_Form_AppletPM";
 })
}
