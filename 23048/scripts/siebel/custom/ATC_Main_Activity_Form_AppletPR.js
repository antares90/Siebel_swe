//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATC_Main_Activity_Form_Applet&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.ATC_Main_Activity_Form_AppletPR) === "undefined") {

	SiebelJS.Namespace("SiebelAppFacade.ATC_Main_Activity_Form_AppletPR");
	define("siebel/custom/ATC_Main_Activity_Form_AppletPR", ["siebel/phyrenderer"],
		function () {
		SiebelAppFacade.ATC_Main_Activity_Form_AppletPR = (function () {

			function ATC_Main_Activity_Form_AppletPR(pm) {
				SiebelAppFacade.ATC_Main_Activity_Form_AppletPR.superclass.constructor.apply(this, arguments);
			}

			SiebelJS.Extend(ATC_Main_Activity_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);

			var timerId;
			var Text;
			var TextBL;
			var actionId;
			var sBusService;
			var Inputs;
			var Outputs;
			var Interval;
			//var Interval = 20; //Периодичность проверки предложений в секундах>LETO-10827>MLIPOV>
			
			var b = '<div class="popup"></div>'
			$(".popup").css({"background-color": "yellow", 'width':'100px','height':'100px'});
			$(b).appendTo('body');
			
			sBusService = SiebelApp.S_App.GetService("ATC From JS Call Service");
			Inputs = SiebelApp.S_App.NewPropertySet();
			Outputs = SiebelApp.S_App.NewPropertySet();

			ATC_Main_Activity_Form_AppletPR.prototype.BindData = function (bRefresh) {
				// BindData is called each time the data set changes.
				// This is where you'll bind that data to user interface elements you might have created in ShowUI
				// Add code here that should happen before default processing
				SiebelAppFacade.ATC_Main_Activity_Form_AppletPR.superclass.BindData.apply(this, arguments);
				// Add code here that should happen after default processing
				actionId = this.GetPM().Get("GetBusComp").GetFieldValue("Id");
				//console.log("Id: ", actionId);
				Interval = this.GetPM().Get("GetBusComp").GetFieldValue("ATC PopUpNotificationCheckTime"); //Периодичность проверки предложений в секундах>LETO-10827>MLIPOV>
				console.log("Interval: ", Interval);
				timerId = setTimeout(checkOffersAndBL, Interval * 1000);

				 if(this.GetPM().Get("GetBusComp").GetFieldValue("ATC Main Activity Applet Text")>"")
				 {
					$(".ATCMainActivityAppletText").parent().parent().parent().removeAttr('style');
				 }
				 else
				 {
					$(".ATCMainActivityAppletText").parent().parent().parent().css( "display", "none" );
				 }

			}

			function checkOffersAndBL() {
				//return;
				//console.log("Interval_2: ", Interval);
				var apl = SiebelApp.S_App.GetActiveView().GetActiveApplet();
				if (apl && !apl.GetParentApplet() && actionId != ""){
					Inputs.Reset();
					Outputs.Reset();
					Inputs.SetProperty("ProcessName", "ATC VB Check BlackList Message");//LETO-10576>MLIPOV>08.06.2018>проверка клиента в черном списке
					Inputs.SetProperty("sActionId", actionId);
					Inputs.SetProperty("SWEBS", "1"); //вызов BS вне контекста апплетов LETO-8232
					if(sBusService){
						var configBL = {};
						configBL.async = true;
						configBL.scope = this;
						configBL.cb = function(){
							Outputs = arguments[2];
							if (Outputs !== null){
								
								TextBL = Outputs.GetChildByType("ResultSet").GetProperty("Error Message");

								if (TextBL != "") {
									$('.popup').dialog({
										open: function() {
											$(this).html(TextBL);
										},
										buttons: [{
											text: 'Ок',
											click: function() {
												$(this).dialog("close");
											}
										}]
									})

								}
							}
						}
						sBusService.InvokeMethod("CallService", Inputs, configBL);
					}
					console.log("!Не popup1, actionId = '", actionId, "'!");
					
					if(TextBL == ""){
						Inputs.Reset();
						Outputs.Reset();
						Inputs.SetProperty("ProcessName", "ATC Check ACRM Offer");//LETO-10576>MLIPOV>08.06.2018>а это старая проверка на наличие предложений
						Inputs.SetProperty("RowId", actionId);
						Inputs.SetProperty("SWEBS", "1"); //вызов BS вне контекста апплетов LETO-8232
						if(sBusService){
							var config = {};
							config.async = true;
							config.scope = this;
							config.cb = function(){
								Outputs = arguments[2];
								if (Outputs !== null){
									
									Text = Outputs.GetChildByType("ResultSet").GetProperty("OfferTextOut");

									if (Text != "") {
										$('.popup').dialog({
											open: function() {
												$(this).html(Text);
											},
											buttons: [{
												text: 'Ок',
												click: function() {
													Inputs.SetProperty("ProcessName", "ATC Confirm ACRM Offer");
													//Inputs.SetProperty("RowId", actionId);
													sBusService.InvokeMethod("CallService", Inputs);//, Outputs);
													$(this).dialog("close");
												}
											}, {
												text: 'Отмена',
												click: function() {
													$(this).dialog("close");
												}
											}]
										})

									}
								}
							}
							sBusService.InvokeMethod("CallService", Inputs, config);
						}
						console.log("!Не popup2, actionId = '", actionId, "'!");
					}
				}
				else 
					console.log("!Popup!");

				timerId = setTimeout(checkOffersAndBL, Interval * 1000);
			}

			ATC_Main_Activity_Form_AppletPR.prototype.EndLife = function () {
				// EndLife is where we perform any required cleanup.
				// Add code here that should happen before default processing
				SiebelAppFacade.ATC_Main_Activity_Form_AppletPR.superclass.EndLife.apply(this, arguments);
				// Add code here that should happen after default processing
				clearTimeout(timerId);
				timerId = null;
			}

			return ATC_Main_Activity_Form_AppletPR;
		}
			());
		return "SiebelAppFacade.ATC_Main_Activity_Form_AppletPR";
	})
}
