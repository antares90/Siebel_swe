//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATC_SR_Change_Data_Address_Short_Form_Applet&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.ATC_SR_Change_Data_Address_Short_Form_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_SR_Change_Data_Address_Short_Form_AppletPR");
 define("siebel/custom/ATC_SR_Change_Data_Address_Short_Form_AppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATC_SR_Change_Data_Address_Short_Form_AppletPR = (function () {

    function ATC_SR_Change_Data_Address_Short_Form_AppletPR(pm) {
     SiebelAppFacade.ATC_SR_Change_Data_Address_Short_Form_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_SR_Change_Data_Address_Short_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);

    ATC_SR_Change_Data_Address_Short_Form_AppletPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Change_Data_Address_Short_Form_AppletPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_SR_Change_Data_Address_Short_Form_AppletPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Change_Data_Address_Short_Form_AppletPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
	 
	 var sBusService = SiebelApp.S_App.GetService("ATC Tools");
		if(sBusService)
		{
			  //Create new property set
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet();
			Inputs.SetProperty("BCName", "ATC SR");
			Inputs.SetProperty("FieldName", "Type Change Data");// Invoke the Business service Method and pass the Inputs
			Outputs = sBusService.InvokeMethod("GetFieldFromCurrentVIew",Inputs );
			// Get the Outputs/Result Set in a property set
			var ResultSet = SiebelApp.S_App.NewPropertySet();
			ResultSet = Outputs.GetChildByType ("ResultSet").GetProperty("FieldValue");
			var sType = ResultSet;
			console.log(ResultSet);
			
			if(sType == "N" || sType == "")
			{
				var pm = this.GetPM();
				var placeHolder = "s_" + pm.Get("GetFullId") + "_div";
				//console.log(placeHolder);
				$('#' + placeHolder).hide();
			}			
		}
		else
		{
			console.log("Business Service Not Found");
		}
    }

    ATC_SR_Change_Data_Address_Short_Form_AppletPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Change_Data_Address_Short_Form_AppletPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_SR_Change_Data_Address_Short_Form_AppletPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Change_Data_Address_Short_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_SR_Change_Data_Address_Short_Form_AppletPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_SR_Change_Data_Address_Short_Form_AppletPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATC_SR_Change_Data_Address_Short_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_SR_Change_Data_Address_Short_Form_AppletPR";
 })
}
