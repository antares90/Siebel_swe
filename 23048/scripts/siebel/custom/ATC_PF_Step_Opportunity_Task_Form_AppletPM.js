if (typeof(SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPM");
 define("siebel/custom/ATC_PF_Step_Opportunity_Task_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPM = (function () {

    function ATC_PF_Step_Opportunity_Task_Form_AppletPM(pm) {
     SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_PF_Step_Opportunity_Task_Form_AppletPM, SiebelAppFacade.PresentationModel);

    ATC_PF_Step_Opportunity_Task_Form_AppletPM.prototype.Init = function () {
     SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPM.superclass.Init.apply(this, arguments);
    }

    ATC_PF_Step_Opportunity_Task_Form_AppletPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPM.superclass.Setup.apply(this, arguments);
    }

    return ATC_PF_Step_Opportunity_Task_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_PF_Step_Opportunity_Task_Form_AppletPM";
 })
}
