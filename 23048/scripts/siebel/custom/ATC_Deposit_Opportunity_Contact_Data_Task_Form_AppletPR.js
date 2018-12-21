if (typeof(SiebelAppFacade.ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR");
 define("siebel/custom/ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR = (function () {

    function ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR(pm) {
     SiebelAppFacade.ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);

    ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.prototype.Init = function () {
     SiebelAppFacade.ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.superclass.Init.apply(this, arguments);
	//this.GetPM().AttachPMBinding("FieldChange", this.SetControlValue, {scope: this}	
    }

    ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.superclass.ShowUI.apply(this, arguments);
	 this.SetAllBorder();
	  //this.SetAllHideControl();
    }

    ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.superclass.BindData.apply(this, arguments);
	 this.GetPM().AttachPMBinding("ExecuteUIUpdate", this.SetAllBorder, {scope: this});
	 this.SetAllBorder();
	 this.SetAllHideControl();
    }

    ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.superclass.BindEvents.apply(this, arguments);
	
    }

    ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.prototype.EndLife = function () {
     SiebelAppFacade.ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.superclass.EndLife.apply(this, arguments);
    }
	ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.prototype.SetBorder = function (ControlName, FlagName) 
	{	//LETO-7376 Проставляем нужным контролам класс, чтобы они подсвечивалось
		var pm = this.GetPM();
		var arrControls = pm.Get("GetControls");
		var control1 =  arrControls[FlagName];
		var Flag = pm.ExecuteMethod("GetFieldValue", control1);
		var control = '#' + pm.Get("GetControls")[ControlName].GetInputName();
		//console.log(Flag);
		if(Flag=="N")
		{
			$(control).addClass("red");
		}
		else
		{
			$(control).removeClass("red");
		}
	}
	ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.prototype.SetHideControl = function (ControlName)
	{//LETO-7642 - скрытие полей(галочек) с апплета для того чтобы корректно работал OnFieldUpdateSet
		 var pm = this.GetPM();
		var control = '.' + pm.Get("GetControls")[ControlName].GetInputName();
		//console.log(ControlName);
		$(control).addClass("hide");
	}
	ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.prototype.SetAllBorder = function ()
	{
		this.SetBorder("ATC Last Name", "ATC Last Name Correct Flag");
		this.SetBorder("ATC First Name", "ATC First Name Correct Flag");
		this.SetBorder("ATC Middle Name", "ATC Middle Name Correct Flag");
		this.SetBorder("ATCBirthDate", "ATC Birth Date Correct Flag");
		this.SetBorder("ATCBirthPlace", "ATC Birth Place Correct Flag");
		this.SetBorder("ATCM/F", "ATC M/F Correct Flag");
		this.SetBorder("ATC Task Passport Seria", "ATC Doc Seria Correct Flag");
		this.SetBorder("ATC Task Passport Number", "ATC Doc Number Correct Flag");
		this.SetBorder("ATC Task Passport Issue Date", "ATC Doc Issue Date Correct Flag");
		this.SetBorder("ATC Task Passport Issue By Code", "ATC Doc Issue By Code Correct Flag");
	}
	ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR.prototype.SetAllHideControl = function ()
	{
		this.SetHideControl("ATC Last Name Correct Flag");
		this.SetHideControl("ATC First Name Correct Flag");
		this.SetHideControl("ATC Middle Name Correct Flag");
		this.SetHideControl("ATC Birth Date Correct Flag");
		this.SetHideControl("ATC Birth Place Correct Flag");
		this.SetHideControl("ATC M/F Correct Flag");
		this.SetHideControl("ATC Doc Seria Correct Flag");
		this.SetHideControl("ATC Doc Number Correct Flag");
		this.SetHideControl("ATC Doc Issue Date Correct Flag");
		this.SetHideControl("ATC Doc Issue By Code Correct Flag");
	}


    return ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR;
   }()
  );

  return "SiebelAppFacade.ATC_Deposit_Opportunity_Contact_Data_Task_Form_AppletPR";
 })
}
