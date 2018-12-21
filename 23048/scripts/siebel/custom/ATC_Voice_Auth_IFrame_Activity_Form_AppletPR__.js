//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATC_Voice_Auth_IFrame_Activity_Form_Applet&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR) === "undefined") {

 //SiebelJS.Namespace("SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR");
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
	 
		//var oAppletMap = PM.Get("GetAppletMap");
		//console.log(" GetFullId = " + this.GetPM().Get("GetFullId"));
		/*for(var property in this.GetPM()) {
		console.log("- " + property + " = " + this.GetPM()[property]);
		}*/
		sFormAppletId = this.GetPM().Get("GetFullId"); 
		
		console.log(" sFormAppletId = " + sFormAppletId);
		detailForm = "<iframe id='detailFormDiv' src=\"" + iframeLink +  session_key + "\">" + $("#" + sFormAppletId +" table.GridBack").parent().html() + "</iframe>";
		//console.log(" detailForm = " + detailForm);
		oDialog = $(detailForm).dialog({title:"Голосовая аутентификация    ",position:[300,300],autoOpen:true,show:true,hide:true,width:'332px',height:'auto'});
		/*
		this.GetPM().Get("AttachPMBinding").("ShowSelection",function(){
			if (!oDialog.dialog("isOpen")){  //if dialog is not open
				oDialog.dialog("open");      //open it
			}
			oControlSet = this.GetPM().Get("GetControls"); //get form applet control objects
		//console.log(" oControlSet = " + oControlSet);
			for(sControlName in oControlSet){ //loop through controls
				if( oControlSet.hasOwnProperty(sControlName) ){
					oControl = oControlSet[sControlName]; //get control object
					sFieldValue = this.GetPM().ExecuteMethod("GetFormattedFieldValue",oControl);   //get formatted field value
					sElemId = oControl.GetInputName(); //get control's element id
					elem = $("#detailFormDiv [name=" + sElemId + "]");  //address the same element id in the dialog
					elem.val(sFieldValue); //set the value
					elem.attr("readonly","readonly");  //make it read-only
				}
			}
		});*/
		$("#" + sFormAppletId).hide();
		
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     //SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Voice_Auth_IFrame_Activity_Form_AppletPR:      BindEvents method reached.");
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     //SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Voice_Auth_IFrame_Activity_Form_AppletPR:      EndLife method reached.");
     SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATC_Voice_Auth_IFrame_Activity_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_Voice_Auth_IFrame_Activity_Form_AppletPR";
 })
}
