if (typeof(SiebelAppFacade.pmextentionPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.pmextentionPM");
 define("siebel/custom/pmextentionPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.pmextentionPM = (function () {

    function pmextentionPM(pm) {
     SiebelAppFacade.pmextentionPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(pmextentionPM, SiebelAppFacade.PresentationModel);

    pmextentionPM.prototype.Init = function () {
     SiebelAppFacade.pmextentionPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": pmextentionPM:      Init method reached.");
    }

    pmextentionPM.prototype.Setup = function (propSet) {
     SiebelJS.Log(this.Get("GetName")+": pmextentionPM:      Setup method reached.");
     SiebelAppFacade.pmextentionPM.superclass.Setup.apply(this, arguments);
    }

    return pmextentionPM;
   }()
  );
  return "SiebelAppFacade.pmextentionPM";
 })
}