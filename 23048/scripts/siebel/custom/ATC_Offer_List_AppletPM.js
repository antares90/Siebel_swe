//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopList&name=ATC_Offer_List_Applet&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.ATC_Offer_List_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Offer_List_AppletPM");
 define("siebel/custom/ATC_Offer_List_AppletPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.ATC_Offer_List_AppletPM = (function () {

    function ATC_Offer_List_AppletPM(pm) {
     SiebelAppFacade.ATC_Offer_List_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Offer_List_AppletPM, SiebelAppFacade.ListPresentationModel);

    ATC_Offer_List_AppletPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Offer_List_AppletPM.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
	 
	 this.AttachPostProxyExecuteBinding("UseOffer", function(methodName, inputPS, outputPS){
		 
		var ekassir_url = SiebelApp.S_App.GetProfileAttr("ATC Offer Ekassir URL");
		console.log("ProfAttr: "+ekassir_url);
				
		if(ekassir_url>"")
		{
			var sBusService = SiebelApp.S_App.GetService("SIS OM PMT Service");
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet();
			 
			Inputs.SetProperty("Profile Attribute Name", "ATC Offer Ekassir URL");
			Inputs.SetProperty("Profile Attribute Value", "");
			sBusService.InvokeMethod("Set Profile Attribute", Inputs);
		 
			window.open(ekassir_url, "_blank");	

		} 		 

		 return;});
    }

    ATC_Offer_List_AppletPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Offer_List_AppletPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATC_Offer_List_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_Offer_List_AppletPM";
 })
}