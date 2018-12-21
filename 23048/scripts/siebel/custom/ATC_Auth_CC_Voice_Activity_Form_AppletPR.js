//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATC_SR_Card_Operation_Form_Applet&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.ATC_Auth_CC_Voice_Activity_Form_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Auth_CC_Voice_Activity_Form_AppletPR");
 define("siebel/custom/ATC_Auth_CC_Voice_Activity_Form_AppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATC_Auth_CC_Voice_Activity_Form_AppletPR = (function () {

    function ATC_Auth_CC_Voice_Activity_Form_AppletPR(pm) {
     SiebelAppFacade.ATC_Auth_CC_Voice_Activity_Form_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Auth_CC_Voice_Activity_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);
	
	var timerId;

    ATC_Auth_CC_Voice_Activity_Form_AppletPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Auth_CC_Voice_Activity_Form_AppletPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_Auth_CC_Voice_Activity_Form_AppletPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Auth_CC_Voice_Activity_Form_AppletPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
								
		var act_id = this.GetPM().Get("GetBusComp").GetFieldValue("Id");
								
		setVoiceAuthProgress();						
								
		function setVoiceAuthProgress(){	
			var bs = SiebelApp.S_App.GetService("ATC WF Utility"),
			ps = SiebelApp.S_App.NewPropertySet();
			ps.SetProperty("BOName", "ATC Activity");
			ps.SetProperty("BCName", "Action");
			ps.SetProperty("FieldName", "ATC Current Time");
			ps.SetProperty("FieldName2", "ATC Voice Auth Start Date");
			ps.SetProperty("FieldName3", "ATC CheckAuthCode Timeout");
			ps.SetProperty("FieldName4", "ATC Voice Auth Progress");
			ps.SetProperty("SearchExpr", "[Id]='"+act_id+"'");
			var psOut = bs.InvokeMethod("GetFieldValues", ps);
		
			var voice_status = psOut.GetChildByType("ResultSet").GetProperty("FieldValue4");
			console.log(voice_status);	
			var period = Number(psOut.GetChildByType("ResultSet").GetProperty("FieldValue3"));
			console.log(period);		
		    var cur_date = new Date(psOut.GetChildByType("ResultSet").GetProperty("FieldValue"));
			console.log(cur_date);
			var voice_date = new Date(psOut.GetChildByType("ResultSet").GetProperty("FieldValue2"));
			console.log(voice_date);
		
			if (voice_status == "" || voice_status == "Выполняется"){
				cur_date.setSeconds(cur_date.getSeconds() - period);
				console.log(cur_date > voice_date);	
				if (cur_date > voice_date){
					bs = SiebelApp.S_App.GetService("ATC WF Utility"),
					ps = SiebelApp.S_App.NewPropertySet();
					ps.SetProperty("BOName", "ATC Activity");
					ps.SetProperty("BCName", "Action");
					ps.SetProperty("FieldName", "ATC Voice Auth Progress");
					ps.SetProperty("FieldValue", "Доступно подтверждение ЦКД/КС");
					ps.SetProperty("SearchExpr", "[Id]='"+act_id+"'");
					psOut = bs.InvokeMethod("SetFieldValues", ps);
									   
					bs = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
					ps = SiebelApp.S_App.NewPropertySet();
					ps.SetProperty("Refresh All","Y");
					psOut = bs.InvokeMethod("RefreshCurrentApplet", ps);
				}
				else{
					timerId = setTimeout(setVoiceAuthProgress, 10000);
				}	
			}
		}	
					
    }

    ATC_Auth_CC_Voice_Activity_Form_AppletPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Auth_CC_Voice_Activity_Form_AppletPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_Auth_CC_Voice_Activity_Form_AppletPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Auth_CC_Voice_Activity_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_Auth_CC_Voice_Activity_Form_AppletPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Auth_CC_Voice_Activity_Form_AppletPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
	 clearTimeout(timerId);
	 timerId = null;
    }

    return ATC_Auth_CC_Voice_Activity_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_Auth_CC_Voice_Activity_Form_AppletPR";
 })
}
