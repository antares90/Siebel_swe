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
	 
     this.AddMethod("ShowIframe",ShowIframe, {sequence : false, scope : this});
     this.AddMethod("ShowSelection",PostShowSelection, {sequence : false, scope : this});

		this.ExecuteMethod("ShowIframe")
    }
	
	
    ATC_Voice_IFrame_KI_Form_AppletPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.Setup.apply(this, arguments);	
	}


	
    function ShowIframe() {	
		console.log("активность = " + this.Get("GetBusComp").GetFieldValue("Id") + " status = " + this.Get("GetBusComp").GetFieldValue("Status"));
		//console.log("ATC Voice Auth Session Key = " + this.Get("GetBusComp").GetFieldValue("ATC Voice Auth Session Key"));	
		session_key	= this.Get("GetBusComp").GetFieldValue("ATC Voice Auth Session Key");
		this.SetProperty("OptyId", this.Get("GetBusComp").GetParentBusComp().GetParentBusComp().GetFieldValue("Id"));

		console.log("слепок = " + this.Get("GetBusComp").GetParentBusComp().GetFieldValue("Id"));
		
		$('.custom_iframe_button_ki').parent().parent().parent().remove();//закрытие iframe перед созданием нового диалогового окна
		if(session_key>"" && this.Get("GetBusComp").GetFieldValue("Status")=="Открыто") {
			sFormAppletId = this.Get("GetFullId"); 
			//detailForm = "<div><p><img src='../../images/custom/test_iframe2.png' alt='тут будет iframe'></p>" + $("#" + sFormAppletId +" table.GridBack").parent().html()+"</div>";// 
			//"<iframe id='detailFormDiv' src=\"" + iframeLink +  session_key + "\">" + $("#" + sFormAppletId +" table.GridBack").parent().html() + "</iframe>";
			//detailForm = "<div id='VoiceIframeKI_div'><img src='../../images/custom/iframe_example.png' alt='тут будет iframe'></img></div>";
			detailForm = "<div id='VoiceIframeKI_div'><iframe name='VoiceIframeKI' src=\"" + iframeLink +  session_key + "\">" + $("#" + sFormAppletId +" table.GridBack").parent().html() + "</iframe></div>";
			console.log("iframe link = " + iframeLink +  session_key);
			//$('.ui-dialog-title').length;
			oDialog = $(detailForm).dialog({title:"Голосовая аутентификация",position: { my: "right top", at: "right top", of: window  }, /*autoOpen:true,*/show:true,hide:true,width:'659px',height:'200',
				//classes: {"ui-dialog": "custom-red"},
				/*options: {
					classes: {
						"ui-dialog": "ui-corner-all custom-red custom-big"
					}
				},*/
				closeOnEscape: false,
					open: function(event, ui) {
						$(this).parent().children().children('.ui-dialog-titlebar-close').hide();
						$(this).parent().children('.ui-dialog-titlebar').addClass('ui-dialog-iframeKI');
						$(this).height('auto');	
						$(this).width(220);	
						$(this).parent().attr('id', 'ki_iframe_window');
						//$(this).parent().css({"margin":"0px"});

						var dialog_element = $(this).parent();
						var dialog_id = $(this).parent().attr('id');
						//добавление кнопки сворачивания		
						$(this).parent().append('<a href="#" id="' + dialog_id + '-minbutton" class="ui-dialog-titlebar-minimize ui-corner-all">'+'<span class="ui-icon ui-icon-minusthick"></span></a>');
						//alert($(this));
						
						//прорисовка свернутого окна
						$('#KI_iframe_window_minimized_container').append('<div class="KI_iframe_window_minimized ui-widget ui-state-default ui-corner-all" id="' + dialog_id + '_minimized">' + $(this).parent().find('.ui-dialog-title').text() + '<span class="ui-icon ui-icon-newwin"></div>');
				
						// логика сворачивания						
						$('#' + dialog_id + '-minbutton').hover(function() {
							$(this).addClass('ui-state-hover');
						}, function() {
							$(this).removeClass('ui-state-hover');
						}).click(function() {
							/*$(this).height(30);	
							$(this).width(120);	
							$(this).parent().height(70);	
							$(this).parent().width(220);
							oDialog.hide();*/
							//dialog_element.close();
							dialog_element.hide();
							$('#' + dialog_id + '_minimized').show();
						});
						
						//логика восстановления окна
						$('#' + dialog_id + '_minimized').click(function() {
							$('#' + dialog_id + '_minimized').hide();
							dialog_element.show();
						});
						
					},
				buttons: [
							{
								text: 'Свернуть',
								class: 'custom_iframe_button_ki',
								click: function() {	
									$(this).height(30);	
									$(this).width(120);	
									$(this).parent().height(70);	
									$(this).parent().width(220);	
									oDialog.hide();
								}
							}
							,{
								text: 'Развернуть',
								click: function() {
									$(this).height('auto');	
									$(this).width(220);	
									$(this).parent().height('auto');	
									$(this).parent().width(659);	
									oDialog.show();
							}}
						]
						});
			$("#" + sFormAppletId).hide();
			
			//for(var property in Inputs) {
			//	console.log("- " + property + " = " + Inputs[property]);		} 
			
		}
	}
	
	function PostShowSelection(){
		console.log("вызываем ShowIframe");
		this.ExecuteMethod("ShowIframe");
	}
	
    ATC_Voice_IFrame_KI_Form_AppletPM.prototype.EndLife = function () {
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.EndLife.apply(this, arguments);
                //закрытие диалогового окна iframe
                /*if (oDialog.dialog("isOpen")){
                    oDialog.dialog("close");
					console.log("iframe закрыт");
				}*/
				if($('.custom_iframe_button_ki').length>0){
					$('.custom_iframe_button_ki').parent().parent().parent().remove();
				}
    }
	
		
    return ATC_Voice_IFrame_KI_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM";
 })
}
