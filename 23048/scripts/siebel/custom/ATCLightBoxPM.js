if (typeof(SiebelAppFacade.ATCLightBoxPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCLightBoxPM");
 define("siebel/custom/ATCLightBoxPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATCLightBoxPM = (function () {

    function ATCLightBoxPM(pm) {
     SiebelAppFacade.ATCLightBoxPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCLightBoxPM, SiebelAppFacade.PresentationModel);

    ATCLightBoxPM.prototype.Init = function () {
     SiebelAppFacade.ATCLightBoxPM.superclass.Init.apply(this, arguments);
	 //SiebelJS.Log("InitPM method reached.");
	 SiebelJS.Log('12')
    }

    ATCLightBoxPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.ATCLightBoxPM.superclass.Setup.apply(this, arguments);
	  //SiebelJS.Log("Setup method reached.");
	  SiebelJS.Log('13')
    }
	 
    return ATCLightBoxPM;
   }()
  );
  return "SiebelAppFacade.ATCLightBoxPM";
 })
}
