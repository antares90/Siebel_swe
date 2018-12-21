if (typeof(SiebelAppFacade.ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM");
 define("siebel/custom/ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM = (function () {

    function ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM(pm) {
     SiebelAppFacade.ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM, SiebelAppFacade.PresentationModel);

    ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM.prototype.Init = function () {
     SiebelAppFacade.ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM.superclass.Init.apply(this, arguments);
    }

    ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM.superclass.Setup.apply(this, arguments);
    }

    return ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_Opportunity_Contact_Data_PFR_Task_Form_AppletPM";
 })
}
