//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopList&name=ATC_Superuser_Communication_SR_List_Applet&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.ATC_Superuser_Communication_SR_List_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Superuser_Communication_SR_List_AppletPR");
 define("siebel/custom/ATC_Superuser_Communication_SR_List_AppletPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.ATC_Superuser_Communication_SR_List_AppletPR = (function () {

    function ATC_Superuser_Communication_SR_List_AppletPR(pm) {
     SiebelAppFacade.ATC_Superuser_Communication_SR_List_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Superuser_Communication_SR_List_AppletPR, SiebelAppFacade.JQGridRenderer);

    ATC_Superuser_Communication_SR_List_AppletPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Superuser_Communication_SR_List_AppletPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_Superuser_Communication_SR_List_AppletPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Superuser_Communication_SR_List_AppletPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
    
	var sBusService = SiebelApp.S_App.GetService("ATC Tools");
		if(sBusService)
		{
			 //Create new property set
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet();
			Inputs.SetProperty("BCName", "ATC SR");
			
			Inputs.SetProperty("FieldName", "Type Change Mobile Phone");
			Outputs = sBusService.InvokeMethod("GetFieldFromCurrentVIew",Inputs );
			var sTypeMobile = Outputs.GetChildByType ("ResultSet").GetProperty("FieldValue");
			console.log(sTypeMobile);
			
			Inputs.SetProperty("FieldName", "Type Unlock SIM");
			Outputs = sBusService.InvokeMethod("GetFieldFromCurrentVIew",Inputs );
			var sTypeSIM = Outputs.GetChildByType ("ResultSet").GetProperty("FieldValue");
			console.log(sTypeSIM);
			
			if((sTypeMobile == "N" || sTypeMobile == "") && (sTypeSIM == "N" || sTypeSIM == ""))
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

    ATC_Superuser_Communication_SR_List_AppletPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Superuser_Communication_SR_List_AppletPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_Superuser_Communication_SR_List_AppletPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Superuser_Communication_SR_List_AppletPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATC_Superuser_Communication_SR_List_AppletPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Superuser_Communication_SR_List_AppletPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATC_Superuser_Communication_SR_List_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_Superuser_Communication_SR_List_AppletPR";
 })
}
