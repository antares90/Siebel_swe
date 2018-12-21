//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATC_Voice_Auth_IFrame_Activity_Empty_Form_Applet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR");
 define("siebel/custom/ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR = (function () {

    function ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR(pm) {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);

    ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.prototype.Init = function () {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.superclass.Init.apply(this, arguments);
    }

    ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.superclass.ShowUI.apply(this, arguments);
    }

    ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.superclass.BindData.apply(this, arguments);
	 
		//console.log("TEST1");
		
		var pm = this.GetPM();
		var placeHolder = "s_" + pm.Get("GetFullId") + "_div";
		//console.log("placeHolder = " + placeHolder);
		$('#' + placeHolder).hide();
    }

    ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
    }

    ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.prototype.EndLife = function () {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR.superclass.EndLife.apply(this, arguments);
    }

    return ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Empty_Form_AppletPR";
 })
}
