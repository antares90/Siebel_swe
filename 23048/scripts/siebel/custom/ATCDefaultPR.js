if (typeof(SiebelAppFacade.ATCDefaultPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCDefaultPR");
 define("siebel/custom/ATCDefaultPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATCDefaultPR = (function () {

    function ATCDefaultPR(pm) {
     SiebelAppFacade.ATCDefaultPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCDefaultPR, SiebelAppFacade.PhysicalRenderer);

    ATCDefaultPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATCDefaultPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATCDefaultPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATCDefaultPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
    }
	

    ATCDefaultPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.ATCDefaultPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
	 
	 //LETO-10672>>APRONIN>>Удаление титулов у контролов, формирующих текст из шаблонов коммуникаций
	 $("span[role=presentation]").removeAttr("title");	
	 
    }

    ATCDefaultPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATCDefaultPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATCDefaultPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATCDefaultPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATCDefaultPR;
   }()
  );
  return "SiebelAppFacade.ATCDefaultPR";
 })
}