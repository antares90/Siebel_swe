//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATC_Add_Info_KI_From_Applet_2&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.ATC_Add_Info_KI_From_Applet_2PR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Add_Info_KI_From_Applet_2PR");
 define("siebel/custom/ATC_Add_Info_KI_From_Applet_2PR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATC_Add_Info_KI_From_Applet_2PR = (function () {

    function ATC_Add_Info_KI_From_Applet_2PR(pm) {
     SiebelAppFacade.ATC_Add_Info_KI_From_Applet_2PR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Add_Info_KI_From_Applet_2PR, SiebelAppFacade.PhysicalRenderer);
	var a;

    ATC_Add_Info_KI_From_Applet_2PR.prototype.Init = function () {
     SiebelAppFacade.ATC_Add_Info_KI_From_Applet_2PR.superclass.Init.apply(this, arguments);
     //this.GetPM().AttachPMBinding("ExecuteUIUpdate", this.RefreshData, {scope: this});
	 history.replaceState("DecisionView",null,null);
    }

    ATC_Add_Info_KI_From_Applet_2PR.prototype.ShowUI = function () {
     SiebelAppFacade.ATC_Add_Info_KI_From_Applet_2PR.superclass.ShowUI.apply(this, arguments);
	 a = $("div.width_block").width();
	 //console.log(" ATC_Add_Info_KI_From_Applet_2PR a = " + a);
              //$(".control_resize_ki_add_2").addClass("col-lg-3"); 
		  if(a < 1100) {
			  $(".control_resize_ki_add_2").addClass("col-lg-1-ki-add-2"); 
			  $(".col-lg-1-ki-add-2").css (
				  {"width":"20.8%", "padding-left":"0px"} //{"width":"134px", "padding-left":"0px"}
			  );
			  $(".col-rtdm-comment-add2").css (
				  {"width":"65.9%", "padding-left":"30px"} //{"width":"434px", "padding-left":"30px"}
			  );
		  };
		  if(a > 1200) {
			  $(".control_resize_ki_add_2").addClass("col-lg-1-ki-add-2"); 
			  $(".col-lg-1-ki-add-2").css (
				  {"width":"20.8%", "padding-left":"0px"} //{"width":"167px", "padding-left":"0px"}
			  );
			  $(".col-rtdm-comment-add2").css (
				  {"width":"65.9%", "padding-left":"30px"} //{"width":"539px", "padding-left":"30px"}
			  );
		  };
			 
		  if(a < 1400) { //для того, чтобы уместить поле "Подтвержден средним по региону">>LETO-10750
				$('div[title="Доходы и кредитная нагрузка Аплет формы"] #ATCConfirmedAverageRegion_Label').parent().parent().parent().parent().parent().find('.col-lg-2').css ({"width":"16.3%"});
				$('div[title="Доходы и кредитная нагрузка Аплет формы"] #ATCConfirmedAverageRegion_Label').parent().parent().parent().css ({"width":"18.5%"});
		  };
		  if(a > 1400) { //для того, чтобы уместить поле "Подтвержден средним по региону">>LETO-10750
				$('div[title="Доходы и кредитная нагрузка Аплет формы"] #ATCConfirmedAverageRegion_Label').parent().parent().parent().parent().parent().find('.col-lg-2').css ({"width":"16.666666666666664%"});
		  };
    }

    ATC_Add_Info_KI_From_Applet_2PR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.ATC_Add_Info_KI_From_Applet_2PR.superclass.BindData.apply(this, arguments);
		this.RefreshData();
			 
    }

    ATC_Add_Info_KI_From_Applet_2PR.prototype.BindEvents = function () {
     SiebelAppFacade.ATC_Add_Info_KI_From_Applet_2PR.superclass.BindEvents.apply(this, arguments);
    }

    ATC_Add_Info_KI_From_Applet_2PR.prototype.EndLife = function () {
     SiebelAppFacade.ATC_Add_Info_KI_From_Applet_2PR.superclass.EndLife.apply(this, arguments);
    }
	
    ATC_Add_Info_KI_From_Applet_2PR.prototype.RefreshData = function () {
            $(window).resize(function(){
               a = $("div.width_block").width();
              //console.log("прорисовка после изменения масштаба");
              //console.log("a = " + a);
			  if(a < 1100) {
				  $(".control_resize_ki_add_2").addClass("col-lg-1-ki-add-2"); 
				  $(".col-lg-1-ki-add-2").css (
					  {"width":"38%", "padding-left":"30px"} //{"width":"134px", "padding-left":"0px"}
				  );
				  $(".col-rtdm-comment-add2").css (
					  {"width":"73.5%", "padding-left":"30px"} //{"width":"434px", "padding-left":"30px"}
				  );
				  //console.log("width control_resize_ki_add_2 : 337px");
			  };
			  if(a > 1200) {
				  $(".control_resize_ki_add_2").addClass("col-lg-1-ki-add-2"); 
				  $(".col-lg-1-ki-add-2").css (
					  {"width":"20.8%", "padding-left":"0px"} //{"width":"167px", "padding-left":"0px"}
				  );
				  $(".col-rtdm-comment-add2").css (
					  {"width":"65.9%", "padding-left":"30px"} //{"width":"539px", "padding-left":"30px"}
				  );
				  //console.log("width .col-rtdm-comment-add2 : 539px");
			  };
			  if(a < 1400) { //для того, чтобы уместить поле "Подтвержден средним по региону">>LETO-10750
					$('div[title="Доходы и кредитная нагрузка Аплет формы"] #ATCConfirmedAverageRegion_Label').parent().parent().parent().parent().parent().find('.col-lg-2').css ({"width":"16.3%"});
					$('div[title="Доходы и кредитная нагрузка Аплет формы"] #ATCConfirmedAverageRegion_Label').parent().parent().parent().css ({"width":"18.5%"});
			  };
			  if(a > 1400) { //для того, чтобы уместить поле "Подтвержден средним по региону">>LETO-10750
					$('div[title="Доходы и кредитная нагрузка Аплет формы"] #ATCConfirmedAverageRegion_Label').parent().parent().parent().parent().parent().find('.col-lg-2').css ({"width":"16.666666666666664%"});
			  };
			  
			});
	}

    return ATC_Add_Info_KI_From_Applet_2PR;
   }()
  );
  return "SiebelAppFacade.ATC_Add_Info_KI_From_Applet_2PR";
 })
}