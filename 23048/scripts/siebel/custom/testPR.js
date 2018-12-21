//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=test&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.testPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.testPR");
 define("siebel/custom/testPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.testPR = (function () {

    function testPR(pm) {
     SiebelAppFacade.testPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(testPR, SiebelAppFacade.PhysicalRenderer);

    testPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.testPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": testPR:      Init method reached.");
        this.GetPM().AttachPMBinding("ExecuteUIUpdate", this.RefreshData, {scope: this});
    }

    testPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": testPR:      ShowUI method reached.");
     SiebelAppFacade.testPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    testPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": testPR:      BindData method reached.");
     SiebelAppFacade.testPR.superclass.BindData.apply(this, arguments);
        this.RefreshData();
    }

    testPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": testPR:      BindEvents method reached.");
     SiebelAppFacade.testPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    testPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": testPR:      EndLife method reached.");
     SiebelAppFacade.testPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }
    
    testPR.prototype.RefreshData = function () {
        
    }

    return testPR;
   }()
  );
  return "SiebelAppFacade.testPR";
 })
}
