if (typeof(SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR) === "undefined") {

 define("siebel/custom/ATC_Voice_Auth_IFrame_Activity_Form_AppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR = (function () {

    function ATC_Voice_Auth_IFrame_Activity_Form_AppletPR(pm) {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Voice_Auth_IFrame_Activity_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);
	
	var iframeLink = "http://10.252.7.25:8290/frame/"; //ссылка на iframe

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.Init = function () {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.Init.apply(this, arguments);
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.ShowUI.apply(this, arguments);
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
	
            var dialog_element = this;
            var dialog_id = 'detailFormDiv'; //$(this).attr('id');
        var sPlaceHolder = this.GetPM().Get("GetPlaceholder");
			var applet = $("#" + sPlaceHolder) 
			//console.log("test = " + $("Голосовая аутентификация"));
			/*$('#dialog_window_minimized_container').append(
                '<div class="dialog_window_minimized ui-widget ui-state-default ui-corner-all" id="' + 
                dialog_id + '_minimized">' + 
                '<span class="ui-icon ui-icon-newwin"></div>');*/
			
          
	 var session_key = this.GetPM().Get("GetBusComp").GetFieldValue("ATC Voice Auth Session Key");
	 var detailForm, sFormAppletId;
	var oControlSet, sControlName, oControl, sFieldValue, sElemId, elem;
	 //console.log("session_key = " + session_key);
	 //$("#AtcVoiceAuthIFrameHTMLMessage").after("<iframe name=\"VoiceAuth\"  src=\"http://voicekeyagnt11.bankexp.local:8290/" + session_key + "\"></iframe>");
	 //console.log("iFrame Link = " + "http://voicekeyagnt11.bankexp.local:8290/" + session_key);
	 //$("#AtcVoiceAuthIFrameHTMLMessage").after("<iframe name=\"VoiceAuth\"  src=\"http://10.252.7.25:8290/frame/" + session_key + "\"></iframe>");
	 //console.log("iFrame Link = " + "http://10.252.7.25:8290/frame/" + session_key);
	 //$("#AtcVoiceAuthIFrameHTMLMessage").after("<iframe name=\"VoiceAuth\"  src=\"" + iframeLink + session_key + "\"></iframe>");
	 console.log("iFrame Link = " + iframeLink + session_key);

	
		/*for(var property in this.GetPM()) {
		console.log("- " + property + " = " + this.GetPM()[property]);
		}*/
		sFormAppletId = this.GetPM().Get("GetFullId"); 
		
		console.log(" sFormAppletId = " + sFormAppletId);
		detailForm = "<div><p><img src='../../images/custom/test_iframe2.png' alt='тут будет iframe'></p>" + $("#" + sFormAppletId +" table.GridBack").parent().html()+"</div>";// "<iframe id='detailFormDiv' src=\"" + iframeLink +  session_key + "\">" + $("#" + sFormAppletId +" table.GridBack").parent().html() + "</iframe>";
		//console.log(" detailForm = " + detailForm);
		
		oDialog = $(detailForm).dialog({title:"Голосовая аутентификация    ",position:[300,300],  autoOpen:true,show:true,hide:true,width:'439px',height:'200', buttons: [
						{
							text: 'Свернуть',
							click: function() {
								var div_count = $('.dialog_window').length + 1;
								var div_id = 'dialog_window_' + div_count;
								var div_title = $('#new_window_title').val();
								var div_content = $('#new_window_content').val();
							   
								//oDialog.dialog("close");
								
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
		/*$('.ui-dialog-titlebar-close').click(function () {
			//alert("tst");
							
		if($("#S_A6").length > 0){
			oDialog.hide();
			alert("S_A6 существует");
			//var dialog_id = "ui-id-66";
			//$('#' + dialog_id + '_minimized').show();
			$('#S_A6').after("<iframe name=\"VoiceAuth\"  src=\"" + session_key + "\" height=\"10px\" weight=\"10px\"></iframe>");
		} else {
			alert("  не существует");
		}		
		})*/

	
		$("#" + sFormAppletId).hide();
	
//вывод кнопки сворачивания			
			/*for(var property in $("Голосовая аутентификация")) {
		console.log("- " + property + " = " + $("Голосовая аутентификация")[property]);
		}*/
		
		/*$("#ui-id-66").after(('<id="ui-id-66-minbutton" class="ui-dialog-titlebar-minimize ui-corner-all">'+
            '<span class="ui-icon ui-icon-minusthick"></span></a>'));*/
		//$(".ui-dialog-title").after(('<div><p>ppp</p></div>'));
/*	

		$(".ui-icon-closethick").after(('<br><button  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close ui-dialog-titlebar-minus" type="button" role="button" title="Minus" padding-right="100px">'+
            '<span class="ui-button-icon-primary ui-icon siebui-icon-minus"></span></a>'+'<div>'));
		
		 $('.ui-dialog-titlebar-minus').hover(function() {
                $(this).addClass('ui-state-hover');
            }, function() {
                $(this).removeClass('ui-state-hover');
            }).click(function() {
                alert('bla');
            });
		
*/		
		/*$("#ui-id-66").after(('<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close" type="button" role="button" title="Close">'+
            '<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span></a>'));*/
			
			/*if($(".ui-icon-closethick").length > 0){
			console.log(" существует");
		} else {
			console.log("  не существует");
		}*/
//логика сворачивания		
		/*var dialog_id = "ui-id-66";
		
            $('.siebui-icon-minus').hover(function() {
                $(this).addClass('ui-state-hover');
            }, function() {
                $(this).removeClass('ui-state-hover');
            }).click(function() {
                dialog_element.close();
               // $('#' + dialog_id + '_minimized').show();
            });*/
		
		
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.EndLife = function () {
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.EndLife.apply(this, arguments);
    }

    return ATC_Voice_Auth_IFrame_Activity_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR";
 })
}
