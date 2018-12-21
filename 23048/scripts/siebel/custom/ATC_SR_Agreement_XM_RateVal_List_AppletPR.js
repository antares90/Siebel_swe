//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopList&name=ATC_SR_Agreement_XM_RateVal_List_Applet&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPR");
 define("siebel/custom/ATC_SR_Agreement_XM_RateVal_List_AppletPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPR = (function () {

    function ATC_SR_Agreement_XM_RateVal_List_AppletPR(pm) {
     SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_SR_Agreement_XM_RateVal_List_AppletPR, SiebelAppFacade.JQGridRenderer);

    ATC_SR_Agreement_XM_RateVal_List_AppletPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_SR_Agreement_XM_RateVal_List_AppletPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_SR_Agreement_XM_RateVal_List_AppletPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
	 
		window.onload = function() {
		this.RefreshApplet();
		}
	 
    }

    ATC_SR_Agreement_XM_RateVal_List_AppletPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
	 
    }
	
	
	
	ATC_SR_Agreement_XM_RateVal_List_AppletPR.prototype.RefreshApplet = function () {
		
		
		//var RecordCount = this.GetPM().Get("GetBusComp").GetRecordSet().length;
		var RecordCount = this.GetPM().Get("GetRecordSet").length;
		//console.log(RecordCount);
		
		var pm = this.GetPM();
		var placeHolder = "s_" + pm.Get("GetFullId") + "_div";
		//console.log(placeHolder);

		if(RecordCount == 0)
		{
			$('#' + placeHolder).hide();
		}
		else
		{
			$('#' + placeHolder).show();
		}
				 
		
	}	

    ATC_SR_Agreement_XM_RateVal_List_AppletPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATC_SR_Agreement_XM_RateVal_List_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_SR_Agreement_XM_RateVal_List_AppletPR";
 })
}
