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
			var actionId;
			var sBusService;
			var Inputs;
			var Outputs;
			
			/*if ($("#ccm_offer_dialog").length === 0) {
			var b = '<div id="ccm_offer_dialog"></div>';
			$(ccm_offer_dialog).css({
				"background-color": "yellow",
				'width': '100px',
				'height': '100px'
			});
			$(b).appendTo('body');
			}*/
			
			var b = '<div class="popup"></div>'
			$(".popup").css({"background-color": "yellow", 'width':'100px','height':'100px'});
			$(b).appendTo('body');
			
			sBusService = SiebelApp.S_App.GetService("Workflow Process Manager");
			Inputs = SiebelApp.S_App.NewPropertySet();
			Outputs = SiebelApp.S_App.NewPropertySet();

			ATC_Main_Activity_Form_AppletPR.prototype.ShowUI = function () {
				// ShowUI is called when the object is initially laid out.
				// Add code here that should happen before default processing
				SiebelAppFacade.ATC_Main_Activity_Form_AppletPR.superclass.ShowUI.apply(this, arguments);
				// Add code here that should happen after default processing
			}

			ATC_Main_Activity_Form_AppletPR.prototype.BindData = function (bRefresh) {
				// BindData is called each time the data set changes.
				// This is where you'll bind that data to user interface elements you might have created in ShowUI
				// Add code here that should happen before default processing
				SiebelAppFacade.ATC_Main_Activity_Form_AppletPR.superclass.BindData.apply(this, arguments);
				// Add code here that should happen after default processing
				actionId = this.GetPM().Get("GetBusComp").GetFieldValue("Id");
				//console.log("Id: ", actionId);
			}

			function checkOffers() {
				var apl = SiebelApp.S_App.GetActiveView().GetActiveApplet();
				if (apl && !apl.GetParentApplet() && actionId != ""){
					Inputs.SetProperty("ProcessName", "ATC Check ACRM Offer");
					Inputs.SetProperty("RowId", actionId);
					Outputs = sBusService.InvokeMethod("RunProcess", Inputs);
					Text = Outputs.GetChildByType("ResultSet").GetProperty("OfferTextOut");
					if (Text != "") {
						$('.popup').dialog({
							open: function() {
								$(this).html(Text);
							},
							buttons: [{
								text: 'Ок',
								click: function() {
									sBusService = SiebelApp.S_App.GetService("Workflow Process Manager");
									Inputs = SiebelApp.S_App.NewPropertySet();
									Outputs = SiebelApp.S_App.NewPropertySet();
									Inputs.SetProperty("ProcessName", "ATC Confirm ACRM Offer");
									Inputs.SetProperty("RowId", actionId);
									sBusService.InvokeMethod("RunProcess", Inputs, Outputs);
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
					console.log("!Не popup, actionId = '", actionId, "'!");
				}
				else
					console.log("!Popup!");

				timerId = setTimeout(checkOffers, 5000);
			}

			ATC_Main_Activity_Form_AppletPR.prototype.BindEvents = function () {
				// BindEvents is where we add UI event processing.
				// Add code here that should happen before default processing
				SiebelAppFacade.ATC_Main_Activity_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
				// Add code here that should happen after default processing

				timerId = setTimeout(checkOffers, 5000);
			}

			ATC_Main_Activity_Form_AppletPR.prototype.EndLife = function () {
				// EndLife is where we perform any required cleanup.
				// Add code here that should happen before default processing
				SiebelAppFacade.ATC_Main_Activity_Form_AppletPR.superclass.EndLife.apply(this, arguments);
				// Add code here that should happen after default processing
				clearTimeout(timerId);
			}

			return ATC_Main_Activity_Form_AppletPR;
		}
			());
		return "SiebelAppFacade.ATC_Main_Activity_Form_AppletPR";
	})
}
