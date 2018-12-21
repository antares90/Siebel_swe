if (typeof(SiebelAppFacade.ATC_SR_Unlock_SIM_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_SR_Unlock_SIM_Form_AppletPM");
 define("siebel/custom/ATC_SR_Unlock_SIM_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_SR_Unlock_SIM_Form_AppletPM = (function () {

    function ATC_SR_Unlock_SIM_Form_AppletPM(pm) {
     SiebelAppFacade.ATC_SR_Unlock_SIM_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_SR_Unlock_SIM_Form_AppletPM, SiebelAppFacade.PresentationModel);

    ATC_SR_Unlock_SIM_Form_AppletPM.prototype.Init = function () {
     SiebelAppFacade.ATC_SR_Unlock_SIM_Form_AppletPM.superclass.Init.apply(this, arguments);
	 
		var status_cd;
		var sSr_id;		
		var timerId;
		var intarval = 5000;
		var constant = 0;
		var constEnd = 18;
		
		this.AttachPostProxyExecuteBinding("CallPhone", function(methodName, inputPS, outputPS){
		 
		sSr_id = this.Get("GetBusComp").GetFieldValue("Id");
		console.log("SR Id = " + sSr_id);
		
		if (sSr_id > "") 
		{
			refreshProcess();
		}	 

		function refreshProcess ()
		{
			var sBusService = SiebelApp.S_App.GetService("ATC WF Utility");
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet();
			
			Inputs.SetProperty("BOName", "ATC Activity");
			Inputs.SetProperty("BCName", "ATC Superuser Communication");
			Inputs.SetProperty("FieldName", "Status");
			Inputs.SetProperty("SearchExpr", "[ATC Last SR Id]='"+sSr_id+"' AND [ATC Sub Type] = 'Superuser'");
			Inputs.SetProperty("SortSpec", "Created(DESCENDING)");
			Outputs = sBusService.InvokeMethod("GetFieldValues", Inputs);

			status_cd = Outputs.GetChildByType ("ResultSet").GetProperty("FieldValue");
			console.log(status_cd);
			
			if ((status_cd == "" || status_cd == "Закрыто") && constant != constEnd)
			{	
				timerId = setTimeout(refreshProcess, intarval);		
				constant ++;
				console.log(constant);
			}
			else
			{	
				constant = 0;
				sBusService = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
				var Input = SiebelApp.S_App.NewPropertySet();
				var Output  = SiebelApp.S_App.NewPropertySet();
				Input.SetProperty("Refresh All","Y");
			    Output = sBusService.InvokeMethod("RefreshCurrentApplet", Input);
			}		
		}
		 return;});
    }

    ATC_SR_Unlock_SIM_Form_AppletPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.ATC_SR_Unlock_SIM_Form_AppletPM.superclass.Setup.apply(this, arguments);
    }

    return ATC_SR_Unlock_SIM_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_SR_Unlock_SIM_Form_AppletPM";
 })
}
