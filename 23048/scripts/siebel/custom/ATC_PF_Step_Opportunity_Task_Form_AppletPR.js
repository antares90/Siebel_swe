//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATC_PF_Step_Opportunity_Task_Form_Applet&userprops=&comments=No&logging=Yes
if (typeof(SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPR");
 define("siebel/custom/ATC_PF_Step_Opportunity_Task_Form_AppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPR = (function () {

    function ATC_PF_Step_Opportunity_Task_Form_AppletPR(pm) {
     SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_PF_Step_Opportunity_Task_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);

    ATC_PF_Step_Opportunity_Task_Form_AppletPR.prototype.Init = function () {
     SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPR.superclass.Init.apply(this, arguments);
   //  SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_PF_Step_Opportunity_Task_Form_AppletPR:      Init method reached.");
    }

    ATC_PF_Step_Opportunity_Task_Form_AppletPR.prototype.ShowUI = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_PF_Step_Opportunity_Task_Form_AppletPR:      ShowUI method reached.");
     SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPR.superclass.ShowUI.apply(this, arguments);
	  var sBusService = SiebelApp.S_App.GetService("ATC Tools");
		if(sBusService)
		{
			  //Create new property set
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet();
			Inputs.SetProperty("BCName", "ATC Opportunity POS");
			Inputs.SetProperty("FieldName", "Type");// Invoke the Business service Method and pass the Inputs
			Outputs = sBusService.InvokeMethod("GetFieldFromCurrentVIew",Inputs );
			// Get the Outputs/Result Set in a property set
			var ResultSet = SiebelApp.S_App.NewPropertySet();
			ResultSet = Outputs.GetChildByType ("ResultSet").GetProperty("FieldValue");
			var sType = ResultSet;
			console.log(ResultSet);
		}
		else
		{
			console.log("Business Service Not Found");
		}
		if(sType != "POS")
		{
			var pm = this.GetPM();
			var arrControls = pm.Get("GetControls");
			var CashCard = '.' + pm.Get("GetControls")["Card Number Task"].GetInputName();
			//$(CashCard).addClass("Card_Number_Task_Cash");
			//$("#Card_Number_Task_Label").addClass("Card_Number_Task_Cash");
			$(CashCard).parent().addClass("Card_Number_Task_Cash");
			$("#Card_Number_Task_Label").parent().addClass("Card_Number_Task_Cash");
		}
    }

    ATC_PF_Step_Opportunity_Task_Form_AppletPR.prototype.BindData = function (bRefresh) {
    // SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_PF_Step_Opportunity_Task_Form_AppletPR:      BindData method reached.");
     SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPR.superclass.BindData.apply(this, arguments);
    }

    ATC_PF_Step_Opportunity_Task_Form_AppletPR.prototype.BindEvents = function () {
    // SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_PF_Step_Opportunity_Task_Form_AppletPR:      BindEvents method reached.");
     SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
    }

    ATC_PF_Step_Opportunity_Task_Form_AppletPR.prototype.EndLife = function () {
    // SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_PF_Step_Opportunity_Task_Form_AppletPR:      EndLife method reached.");
     SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPR.superclass.EndLife.apply(this, arguments);
    }

    return ATC_PF_Step_Opportunity_Task_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPR";
 })
}
