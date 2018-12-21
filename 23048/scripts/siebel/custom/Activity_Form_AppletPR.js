if (typeof(SiebelAppFacade.Activity_Form_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.Activity_Form_AppletPR");
 define("siebel/custom/Activity_Form_AppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.Activity_Form_AppletPR = (function () {

    function Activity_Form_AppletPR(pm) {
     SiebelAppFacade.Activity_Form_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(Activity_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);

    Activity_Form_AppletPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.Activity_Form_AppletPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": Activity_Form_AppletPR:      Init method reached.");
     // Add code here that should happen after default processing
    }

    Activity_Form_AppletPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": Activity_Form_AppletPR:      ShowUI method reached.");
     SiebelAppFacade.Activity_Form_AppletPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    Activity_Form_AppletPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": Activity_Form_AppletPR:      BindData method reached.");
     SiebelAppFacade.Activity_Form_AppletPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    Activity_Form_AppletPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": Activity_Form_AppletPR:      BindEvents method reached.");
     SiebelAppFacade.Activity_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    Activity_Form_AppletPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": Activity_Form_AppletPR:      EndLife method reached.");
     SiebelAppFacade.Activity_Form_AppletPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return Activity_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.Activity_Form_AppletPR";
 })
}