//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATC_Auth_Superuser_Voice_Activity_Form_Applet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.ATC_Auth_Superuser_Voice_Activity_Form_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Auth_Superuser_Voice_Activity_Form_AppletPR");
 define("siebel/custom/ATC_Auth_Superuser_Voice_Activity_Form_AppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATC_Auth_Superuser_Voice_Activity_Form_AppletPR = (function () {

    function ATC_Auth_Superuser_Voice_Activity_Form_AppletPR(pm) {
     SiebelAppFacade.ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Auth_Superuser_Voice_Activity_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);

    ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.prototype.Init = function () {
     SiebelAppFacade.ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.superclass.Init.apply(this, arguments);
    }

    ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.superclass.ShowUI.apply(this, arguments);
	 
		$('#s_6_1_2_0_Ctrl').attr('disabled','disabled');
		
		var period = this.GetPM().Get("GetBusComp").GetFieldValue("ATC CheckAuthCode Timeout")*1000;
		console.log(period);
		var timerId = setTimeout(function enableButton(){
									if (this.GetPM().Get("GetBusComp").GetFieldValue("ATC Percent Voice Match Standart")=="" && this.GetPM().Get("GetBusComp").GetFieldValue("ATC Percent Voice Match Blacklist")=="")
										$('#s_6_1_2_0_Ctrl').removeAttr('disabled');
								}.bind(this), period);
    }

    ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.superclass.BindData.apply(this, arguments);
    }

    ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
    }

    ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.prototype.EndLife = function () {
     SiebelAppFacade.ATC_Auth_Superuser_Voice_Activity_Form_AppletPR.superclass.EndLife.apply(this, arguments);
    }

    return ATC_Auth_Superuser_Voice_Activity_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_Auth_Superuser_Voice_Activity_Form_AppletPR";
 })
}
