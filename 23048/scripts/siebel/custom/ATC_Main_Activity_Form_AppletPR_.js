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
	
	var b = '<div class="popup"></div>'
	$(".popup").css({"background-color": "yellow", 'width':'100px','height':'100px'});
	$(b).appendTo('body');

    ATC_Main_Activity_Form_AppletPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Main_Activity_Form_AppletPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
	 
	 timerId = setTimeout(function notify_run() {
		 var sBusService = SiebelApp.S_App.GetService("ATC Tools");
		 if(sBusService)
		 {
		 	if (!($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable').is(":visible"))) //LETO-8232>>dnyudlchiev>>Проверка наличия предложений в ССМ запускается только если нет открытых всплывающих окон (pick, popup, mvg)
		 	{
				//Create new property set
				var Inputs = SiebelApp.S_App.NewPropertySet();
				var Outputs = SiebelApp.S_App.NewPropertySet();
				Inputs.SetProperty("BCName", "Action");
				Inputs.SetProperty("FieldName", "Id");
				Outputs = sBusService.InvokeMethod("GetFieldFromCurrentVIew",Inputs );

				var RecordId = Outputs.GetChildByType ("ResultSet").GetProperty("FieldValue");

				if (RecordId != "" && RecordId != "Error")
				{
					sBusService = SiebelApp.S_App.GetService("ATC WF Utility");
					Inputs = SiebelApp.S_App.NewPropertySet();
					Outputs = SiebelApp.S_App.NewPropertySet();
					Inputs.SetProperty("BOName", "List Of Values");
					Inputs.SetProperty("BCName", "List Of Values");
					Inputs.SetProperty("SearchExpr", "[Type] = 'ATC_CONSTANT' AND [Name] = 'CheckOffersForServise' AND [Language] = 'RUS' AND [Active] = 'Y'");
					Inputs.SetProperty("FieldName", "Value");
					Outputs = sBusService.InvokeMethod("GetFieldValues",Inputs );

					var timerSec = Outputs.GetChildByType ("ResultSet").GetProperty("FieldValue");

					if (timerSec != "" && timerSec != "0")
					{

						try
						{
							timerId = setTimeout(function notify() 
							{
								if (!($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable').is(":visible"))) //LETO-8232>>dnyudlchiev>>Проверка наличия предложений в ССМ запускается только если нет открытых всплывающих окон (pick, popup, mvg)
								{
									//Create new property set
									console.log("debug: отправка запроса в ССМ: " + new Date()); 
									sBusService = SiebelApp.S_App.GetService("Workflow Process Manager");
									Inputs = SiebelApp.S_App.NewPropertySet();
									Outputs = SiebelApp.S_App.NewPropertySet();
									Inputs.SetProperty("ProcessName", "ATC Check ACRM Offer");
									Inputs.SetProperty("RowId", RecordId);
									Outputs = sBusService.InvokeMethod("RunProcess",Inputs );
									// Get the Outputs/Result Set in a property set
									Text = Outputs.GetChildByType ("ResultSet").GetProperty("OfferTextOut");		
									//var Text = '<b>Внимание!</b><br>Для Клиента есть новые персональные предложения от Банка: <br><br>str1234<br><br>Чтобы узнать подробности и оформить предложение Клиенту нажмите "ОК"';
									if (Text != "")
									{
										//var isAdmin = confirm(Text);							
										$('.popup').dialog({
											 open: function () {
											 $(this).html(Text);
											 },
											 buttons: [
												{
													text: 'Ок',
													click: function() {
													sBusService = SiebelApp.S_App.GetService("Workflow Process Manager");
													Inputs = SiebelApp.S_App.NewPropertySet();
													Outputs = SiebelApp.S_App.NewPropertySet();
													Inputs.SetProperty("ProcessName", "ATC Confirm ACRM Offer");
													Inputs.SetProperty("RowId", RecordId);
													sBusService.InvokeMethod("RunProcess",Inputs,Outputs);
													$(this).dialog("close");
													}
												},
												{
													text: 'Отмена',
													click: function() {
													$(this).dialog("close");
													}
												}
											]
										})

									}

									timerId = setTimeout(notify, timerSec);
								}
								else
								{
									timerId = setTimeout(notify, timerSec);
								}
							}, timerSec);
						}
						catch(e)
						{

						}
					}
				}	
			}
			else
			{
				timerId = setTimeout(notify_run, timerSec);
			}	
		 }
	 }, 5000);	 
    }

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
    }

    ATC_Main_Activity_Form_AppletPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Main_Activity_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_Main_Activity_Form_AppletPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Main_Activity_Form_AppletPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
	 
	 clearTimeout(timerId);
	 $(b).empty();
    }

    return ATC_Main_Activity_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_Main_Activity_Form_AppletPR";
 })
}
