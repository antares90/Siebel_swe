if (typeof(SiebelAppFacade.CustomNavigationsTabPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.CustomNavigationsTabPR");
 define("siebel/custom/CustomNavigationsTabPR", ["siebel/accnavigationphyrender"],
  function () {
   SiebelAppFacade.CustomNavigationsTabPR = (function () {
	
    function CustomNavigationsTabPR(pm) {
		SiebelAppFacade.CustomNavigationsTabPR.superclass.constructor.apply(this, arguments);
	}
	
    SiebelJS.Extend(CustomNavigationsTabPR, SiebelAppFacade.AccNavigationPhyRenderer);
		
    CustomNavigationsTabPR.prototype.Init = function () {
     SiebelAppFacade.CustomNavigationsTabPR.superclass.Init.apply(this, arguments);
	 PM = this.GetPM();
	 PRName = PM.GetPMName();
	// console.log(PRName = PM.GetPMName());
     SiebelJS.Log(PRName+": CustomNavigationsTabPR:      Init method reached.");
		var attTabs = new Array();
		var sTabText = "";
		var sCookieName = "OUIBOOK_TABLAYOUT";
		var sCookieValue = jQuery.cookie(sCookieName);
		var r = SiebelJS.Dependency("SiebelApp.Constants");
		var t = r.get("SWE_SCREEN_NAV_CONTROL_STR");
		console.log(t)
		var p = r.get("SWE_AGGR_VIEW_NAV_CONTROL_STR");
		var w = r.get("SWE_DET_VIEW_NAV_CONTROL_STR");
		var d = r.get("SWE_DET_SUB_VIEW_NAV_CONTROL_STR");
		var C = null;
		//var F = $("#s_sctrl_tabScreen").data.ctx.GetPM();
     
    }

	 var _ShowUI = SiebelAppFacade.AccNavigationPhyRenderer.prototype.ShowUI;
	
    CustomNavigationsTabPR.prototype.ShowUI = function () {
     SiebelJS.Log(PRName+": CustomNavigationsTabPR:      ShowUI method reached.");
     SiebelAppFacade.CustomNavigationsTabPR.superclass.ShowUI.apply(this, arguments);
	 _ShowUI.call(this);
	//if($('[data-tabindex=tabScreen1]'));
	//$('a[data-tabindex=tabScreen1]').attr('background-color', 'red' );
			
    }

    CustomNavigationsTabPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     //SiebelJS.Log(PRName+": CustomNavigationsTabPR:      BindData method reached.");
     SiebelAppFacade.CustomNavigationsTabPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    CustomNavigationsTabPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     //SiebelJS.Log(PRName+": CustomNavigationsTabPR:      BindEvents method reached.");
     SiebelAppFacade.CustomNavigationsTabPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    CustomNavigationsTabPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     //SiebelJS.Log(PRName+": CustomNavigationsTabPR:      EndLife method reached.");
     SiebelAppFacade.CustomNavigationsTabPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return CustomNavigationsTabPR;
   }()
  );
  return "SiebelAppFacade.CustomNavigationsTabPR";
 })
}
