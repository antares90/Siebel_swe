//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=ATC_Voice_IFrame_KI_Form_Applet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM");
 define("siebel/custom/ATC_Voice_IFrame_KI_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM = (function () {

    function ATC_Voice_IFrame_KI_Form_AppletPM(pm) {
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Voice_IFrame_KI_Form_AppletPM, SiebelAppFacade.PresentationModel);
	
	var iframeLink = "http://10.252.7.25:8290/frame/"; //ссылка на iframe
	var session_key, detailForm, sFormAppletId;

    ATC_Voice_IFrame_KI_Form_AppletPM.prototype.Init = function () {
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.Init.apply(this, arguments);
	//var bc = this.Get("GetBusComp").GetParentBusComp().GetParentBusComp().GetFieldValue("Integration Id");
	//console.log("GetFieldValue = " + SiebelApp.S_App.GetProfileAttr("KI Login Id"));
						
	this.SetProperty("OptyId", this.Get("GetBusComp").GetParentBusComp().GetParentBusComp().GetFieldValue("Id"));
	var bs = SiebelApp.S_App.GetService("ATC WF Utility"),
	ps = SiebelApp.S_App.NewPropertySet();
	ps.SetProperty("BOName", "ATC Action");
	ps.SetProperty("BCName", "ATC Action");
	ps.SetProperty("FieldName", "Voice Auth Session Key");
	//ps.SetProperty("FieldName2", "Id");
	ps.SetProperty("SearchExpr", "[Type] = 'Вызов - исходящий' AND [Status] = 'Открыто' AND [ATC Opportunity Contact Id] = '" + this.Get("GetBusComp").GetParentBusComp().GetFieldValue("Id") + "'"); //[Primary Owner Id] = '" + SiebelApp.S_App.GetProfileAttr("KI Login Id") + "'"
	var psOut = bs.InvokeMethod("GetFieldValues", ps);
	var session_key = (psOut.GetChildByType("ResultSet").GetProperty("FieldValue") == "" ? "" : psOut.GetChildByType("ResultSet").GetProperty("FieldValue"));

	if(session_key>"") {
				   
		sFormAppletId = this.Get("GetFullId"); 
		console.log("sFormAppletId = " + sFormAppletId);
		detailForm = "<div><p><img src='../../images/custom/test_iframe2.png' alt='тут будет iframe'></p>" + $("#" + sFormAppletId +" table.GridBack").parent().html()+"</div>";// 
		//"<iframe id='detailFormDiv' src=\"" + iframeLink +  session_key + "\">" + $("#" + sFormAppletId +" table.GridBack").parent().html() + "</iframe>";
		//detailForm = "<div><p><iframe id='detailFormDiv' src=\"" + iframeLink +  session_key + "\">" + $("#" + sFormAppletId +" table.GridBack").parent().html() + "</iframe></p><p>eeeee</p>" + $("#" + sFormAppletId +" table.GridBack").parent().html()+"</div>";
		
		$(".ui-dialog").remove();
		oDialog = $(detailForm).dialog({title:"Голосовая аутентификация",position:[1300,1300],  autoOpen:true,show:true,hide:true,width:'439px',height:'200', buttons: [
						{
							text: 'Свернуть',
							click: function() {											
								//oDialog.hide();
								/*$('.ui-dialog').addClass('dialog_window_minimized');
								$('.ui-dialog').hide();
								$('.ui-dialog').show();*/
								//alert($('.ui-dialog').height());
								$('.ui-dialog').height(70);	
								$('.ui-dialog').width(220);	
								oDialog.hide();
							}
						}
						,{
							text: 'Развернуть',
						click: function() {
							//$('.ui-dialog').show();
							//test_dialog();
								$('.ui-dialog').height('auto');	
								$('.ui-dialog').width('332');	
								oDialog.show();
						}}
					]
					});
					
		$("#" + sFormAppletId).hide();
		$('.ui-dialog-titlebar').addClass('ui-dialog-iframeKI');
		//$('.ui-dialog-titlebar-close').removeClass('ui-dialog-titlebar-close');
		$('.ui-dialog-titlebar-close').hide();
	}
/*	for(var property in Inputs) {
		console.log("- " + property + " = " + Inputs[property]);
		} //childEnum  value 
	*/
/*	if($("#AtcKiVoiceIFrameHTMLMessage").length > 0 && session_key>""){
			console.log("AtcKiVoiceIFrameHTMLMessage существует");
			$("#AtcKiVoiceIFrameHTMLMessage").after("<iframe name=\"VoiceIframeKI\"  src=\"" + iframeLink + session_key + "\"></iframe>");
			console.log("iFrame Link = " + iframeLink + session_key);
		} else {
			console.log("AtcKiVoiceIFrameHTMLMessage  не существует");
		}
*/		
    }

    ATC_Voice_IFrame_KI_Form_AppletPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.Setup.apply(this, arguments);
    }
	
	
	
    ATC_Voice_IFrame_KI_Form_AppletPM.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     //SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Voice_Auth_IFrame_Activity_Form_AppletPR:      EndLife method reached.");
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
                //закрытие диалогового окна iframe
                if (oDialog.dialog("isOpen")){
                    oDialog.dialog("close");
					console.log("iframe close");
				}
    }

    return ATC_Voice_IFrame_KI_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM";
 })
}
