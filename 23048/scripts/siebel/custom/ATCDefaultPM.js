if (typeof(SiebelAppFacade.ATCDefaultPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCDefaultPM");
 define("siebel/custom/ATCDefaultPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATCDefaultPM = (function () {
	   
    function ATCDefaultPM(pm) {
     SiebelAppFacade.ATCDefaultPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCDefaultPM, SiebelAppFacade.PresentationModel);

    ATCDefaultPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATCDefaultPM.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATCDefaultPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATCDefaultPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }
	
    return ATCDefaultPM;
   }()
  );
  return "SiebelAppFacade.ATCDefaultPM";
 })
}
