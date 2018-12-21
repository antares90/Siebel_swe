if (typeof(SiebelAppFacade.atc_new_layout_control_forKIPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.atc_new_layout_control_forKIPR");
 define("siebel/custom/atc_new_layout_control_forKIPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.atc_new_layout_control_forKIPR = (function () {

    function atc_new_layout_control_forKIPR(pm) {
     SiebelAppFacade.atc_new_layout_control_forKIPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(atc_new_layout_control_forKIPR, SiebelAppFacade.PhysicalRenderer);

    atc_new_layout_control_forKIPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.atc_new_layout_control_forKIPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": atc_new_layout_control_forKIPR:      Init method reached.");
     this.GetPM().AttachPMBinding("ExecuteUIUpdate", this.RefreshData, {scope: this});
     var myPM = this.GetPM();
     this.AttachPMBinding("pFielValue",ModifyLayuots);
     //this.AttachPMBinding("pFielName",ModifyLayuots); 
    }

   

    atc_new_layout_control_forKIPR.prototype.ShowUI = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": atc_new_layout_control_forKIPR:      ShowUI method reached.");
          $('input').css (
            {'min-width':'100%'}   
          );

          var a = $("div.width_block").width();
		  
          if(a < 1100) {
              $(".control_resize").removeClass("col-lg-1");
              $(".control_resize").addClass("col-lg-3");
              $(".control_resize").css (
                  {'padding-right':'15px','height':'44px'}
              );
              $("textarea").css (
                  {'width':'100%'}
              );
              $("form input:radio").css (
                  {'width':'30%','min-width':'0'}
              );
              $(".control_resize span").css (
                  {'white-space':'nowrap', 'font-size':'0.9em'}
              );
              $(".col-lg-3").css (
                  {'width':'25%'}
              );
                $("form input:text").css (
                  {'width':'100%'}
              );
                $(".Custom_Title").css (
                      {'font-size':'12px'}
                      );
              $(".control_resize").each(function () {
                  // удаляем все пустые символы по краям строки и проверяем оставшуюся строку на пустоту
                  if ($.trim($(this).text()) == "") {
                     // Если строка пустая то удаляем ее
                     $(this).remove();
                  }
              });
			  
			  //LETO-7757>>меняем ширину полей нижнего апплета
			  $(".col-rtdm-max-val").removeClass("col-lg-1");
              $(".col-rtdm-max-val").addClass("col-lg-3"); 
              $(".col-rtdm-max-val").css (
              	{'width':'100%', 'padding-left':'0px', 'padding-right':'20px'}
              );
			  
              $(".col-rtdm-comment").css (
              	{'padding-left':'30px'}
              );			  
          }
          if (a > 1200)
          {
              $(".control_resize").removeClass("col-lg-3");
              $(".control_resize").addClass("col-lg-1"); 
              $('.container_fluid br').remove();
              $(".col-lg-1").css (
                  {'width':'14.28571%','padding-right':'0px'}
              );
              $("#personal .col-lg-1").css (
                  {'width':'8.333333%','padding-right':'0px'}
              );
              $("form input:text").css (
                  {'width':'100%'}
              );
              $("form input:radio").css (
                  {'width':'30%','min-width':'0'}
              );
              $("textarea").css (
                  {'width':'93%'}
              );
              $(".control_resize span").css (
                  {'white-space':'nowrap', 'font-size':'0.9em'}
              );
			  
              //LETO-7757>>меняем ширину полей нижнего апплета
			  $(".col-rtdm-max-val").removeClass("col-lg-3");
              $(".col-rtdm-max-val").addClass("col-lg-1"); 
              $(".col-rtdm-max-val").css (
              	{'width':'50%', 'padding-left':'0px', 'padding-right':'20px'}
              );
			  
              $(".col-rtdm-comment").css (
              	{'padding-left':'30px'}
              );			  
          }

          SiebelAppFacade.atc_new_layout_control_forKIPR.superclass.ShowUI.apply(this, arguments);
    }

    atc_new_layout_control_forKIPR.prototype.BindData = function (bRefresh) {
     SiebelJS.Log(this.GetPM().Get("GetName")+": atc_new_layout_control_forKIPR:      BindData method reached.");
     SiebelAppFacade.atc_new_layout_control_forKIPR.superclass.BindData.apply(this, arguments);
      this.RefreshData();
   
    }

    atc_new_layout_control_forKIPR.prototype.BindEvents = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": atc_new_layout_control_forKIPR:      BindEvents method reached.");
     SiebelAppFacade.atc_new_layout_control_forKIPR.superclass.BindEvents.apply(this, arguments);

    }

    atc_new_layout_control_forKIPR.prototype.EndLife = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": atc_new_layout_control_forKIPR:      EndLife method reached.");
     SiebelAppFacade.atc_new_layout_control_forKIPR.superclass.EndLife.apply(this, arguments);
    }

    atc_new_layout_control_forKIPR.prototype.RefreshData = function () {
            $(window).resize(function(){
               var a = $("div.width_block").width();
              //console.log("прорисовка после изменения масштаба");
              console.log(a);
                if(a < 1100) {
                    $(".control_resize").removeClass("col-lg-1");
                    $(".control_resize").addClass("col-lg-3");
                    $(".control_resize").css (
                        {'padding-right':'15px','height':'44px'}
                    );
                    $("textarea").css (
                        {'width':'93%'}
                    );
                    $("form input:radio").css (
                        {'width':'30%','min-width':'0'}
                    );
                    $(".control_resize span").css (
                        {'white-space':'nowrap', 'font-size':'0.9em'}
                    );
                    $(".col-lg-3").css (
                        {'width':'25%'}
                    );
                      $("form input:text").css (
                        {'width':'100%'}
                    );
                      $(".Custom_Title").css (
                      {'font-size':'12px'}
                      );
                    $(".control_resize").each(function () {
                        // удаляем все пустые символы по краям строки и проверяем оставшуюся строку на пустоту
                        if ($.trim($(this).text()) == "") {
                           // Если строка пустая то удаляем ее
                           $(this).remove();
                        }
                    });
					
					//LETO-7757>>меняем ширину полей нижнего апплета
					$(".col-rtdm-max-val").removeClass("col-lg-1");
                    $(".col-rtdm-max-val").addClass("col-lg-3"); 
					$(".col-rtdm-max-val").css (
						{'width':'100%', 'padding-left':'0px', 'padding-right':'20px'}
					);
					
                }
                if (a > 1200)
                {
                    $(".control_resize").removeClass("col-lg-3");
                    //$(".control_resize").removeClass("col-OC-aplt");
                    $(".control_resize").addClass("col-lg-1"); 
                    $('.container_fluid br').remove();
                    $(".col-lg-1").css (
                        {'width':'14.28571%','padding-right':'0px'}
                    );
                    $("form input:text").css (
                        {'width':'100%'}
                    );
                    $("form input:radio").css (
                        {'width':'30%','min-width':'0'}
                    );
                    $("textarea").css (
                        {'width':'93%','border':'1px solid #E0E0E0 !important'}
                    );
                    $(".control_resize span").css (
                        {'white-space':'nowrap', 'font-size':'0.9em'}
                    );
					
					//LETO-7757>>меняем ширину полей нижнего апплета
					$(".col-rtdm-max-val").removeClass("col-lg-3");
                    $(".col-rtdm-max-val").addClass("col-lg-1"); 
					$(".col-rtdm-max-val").css (
						{'width':'50%', 'padding-left':'0px', 'padding-right':'20px'}
					);
                }
            });
    }
    function ModifyLayuots(){
     
     

    
     
    }

    return atc_new_layout_control_forKIPR;
   }()
  );
  return "SiebelAppFacade.atc_new_layout_control_forKIPR";
 })
}
