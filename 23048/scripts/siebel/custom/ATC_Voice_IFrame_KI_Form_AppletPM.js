if (typeof(SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM");
 define("siebel/custom/ATC_Voice_IFrame_KI_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM = (function () {

    function ATC_Voice_IFrame_KI_Form_AppletPM(pm) {
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Voice_IFrame_KI_Form_AppletPM, SiebelAppFacade.PresentationModel);
	
	var sBusService = SiebelApp.S_App.GetService("ATC WF Utility");
	var Inputs = SiebelApp.S_App.NewPropertySet();
	var Outputs = SiebelApp.S_App.NewPropertySet();	
	
	Inputs.SetProperty("BOName", "EAI Lookup Map");
	Inputs.SetProperty("BCName", "EAI Lookup Map");
	Inputs.SetProperty("FieldName", "Siebel Value");  
	Inputs.SetProperty("SearchExpr", "[External System Value]='VoiceAuthIframeUrl'");
	Outputs = sBusService.InvokeMethod("GetFieldValues", Inputs);
	
	var iframeLink = Outputs.GetChildByType ("ResultSet").GetProperty("FieldValue");  //ссылка на iframe
	//var iframeLink = "http://10.252.7.25:8290/frame/"; //ссылка на iframe
	var session_key, detailForm, sFormAppletId, sVoiceModelFlag;

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
		session_key	= this.Get("GetBusComp").GetFieldValue("ATC Voice Auth Session Key");
		console.log("активность = " + this.Get("GetBusComp").GetFieldValue("Id") + " status = " + this.Get("GetBusComp").GetFieldValue("Status") + " ключ сессии = " + session_key);
		sVoiceModelFlag = this.Get("GetBusComp").GetParentBusComp().GetFieldValue("ATC Voice Model Flag");
		console.log("iFrame Link = " + iframeLink + session_key);
		console.log("слепок = " + this.Get("GetBusComp").GetParentBusComp().GetFieldValue("Id") + " sVoiceModelFlag = " + this.Get("GetBusComp").GetParentBusComp().GetFieldValue("ATC Voice Model Flag") );
		
		$('#ki_iframe_window').remove();//закрытие iframe перед созданием нового диалогового окна

		if(session_key>"" && this.Get("GetBusComp").GetFieldValue("Status")=="Открыто" && sVoiceModelFlag == "Есть" ) {
			sFormAppletId = this.Get("GetFullId"); 
			detailForm = "<div id='VoiceIframeKI_div'><iframe name='VoiceIframeKI' src=\"" + iframeLink +  session_key + "\">" + $("#" + sFormAppletId +" table.GridBack").parent().html() + "</iframe></div>";

			oDialog = $(detailForm).dialog({title:"Голосовая аутентификация",position: { my: "right top", at: "right top", of: window  }, /*autoOpen:true,*/show:true,hide:true,width:'659px',height:'200',
				closeOnEscape: false,
					open: function(event, ui) {
						$(this).parent().children().children('.ui-dialog-titlebar-close').hide();
						$(this).parent().children('.ui-dialog-titlebar').addClass('ui-dialog-iframeKI');
						$(this).height('auto');	
						$(this).width(220);	
						$(this).parent().attr('id', 'ki_iframe_window');
						//$(this).parent().css({"margin":"0px"});

						//var dialog_id = $(this).parent().attr('id');
						//добавление кнопки сворачивания			
						$(this).parent().append('<a href="#" id="ki_iframe_window-minbutton" class="ui-dialog-titlebar-minimize ui-corner-all ui-icon ui-icon-ki ui-icon-minusthick">'+'</a>');//кнопка для сворачивания
						
						
						$(this).parent().append('<a href="#" id="ki_iframe_window-maxbutton" class="ui-dialog-titlebar-minimize ui-corner-all ui-icon ui-icon-ki ui-icon-minusthick">'+'</a>');//кнопка для разворачивания
						$('#ki_iframe_window-maxbutton').hide();
						
						//Добавление кнопки закрытия
						$(this).parent().append('<a href="#" id="ki_iframe_window-closebutton" class="ui-dialog-titlebar-minimize ui-corner-all ui-icon ui-icon-ki ui-icon-minusthick">'+'</a>');//кнопка для сворачивания
						
						
						// логика закрытия						
						$('#ki_iframe_window-closebutton').hover(function() {
							$(this).addClass('ui-state-hover');
						}, function() {
							$(this).removeClass('ui-state-hover');
						}).click(function() {
							
							oDialog.hide();
							var elem = document.getElementById("ki_iframe_window");
							elem.parentNode.removeChild(elem);
							
						});
						
						// логика сворачивания						
						$('#ki_iframe_window-minbutton').hover(function() {
							$(this).addClass('ui-state-hover');
						}, function() {
							$(this).removeClass('ui-state-hover');
						}).click(function() {
							$(this).parent().height(70);	
							$(this).parent().width(280);
							oDialog.hide();
							var body = document.body;
							var Elem = document.body.children[4];
							$('#ki_iframe_window-minbutton').hide();
							$('#ki_iframe_window-closebutton').hide();
							$('#ki_iframe_window-maxbutton').show();
							/*var elem = document.getElementById("ki_iframe_window");
							/*elem.parentNode.removeChild(elem);
							var d=2;*/
						});
						
						//логика восстановления окна	
						$('#ki_iframe_window-maxbutton').hover(function() {
							$(this).addClass('ui-state-hover');
						}, function() {
							$(this).removeClass('ui-state-hover');
						}).click(function() {
							$(this).parent().height('auto');	
							$(this).parent().width(659);
							oDialog.show();
							$('#ki_iframe_window-minbutton').show();
							$('#ki_iframe_window-closebutton').show();
							$('#ki_iframe_window-maxbutton').hide();
						});
						
						
					}
						});
			$("#" + sFormAppletId).hide();
		}
	}
	
	function PostShowSelection(){
		console.log("вызываем ShowIframe");
		this.ExecuteMethod("ShowIframe");
	}

	
    ATC_Voice_IFrame_KI_Form_AppletPM.prototype.EndLife = function () {
     SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM.superclass.EndLife.apply(this, arguments);
                //закрытие диалогового окна iframe  
				if($('#ki_iframe_window').length>0){
					$('#ki_iframe_window').remove();
				}
    }
	
		
    return ATC_Voice_IFrame_KI_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_Voice_IFrame_KI_Form_AppletPM";
 })
}
