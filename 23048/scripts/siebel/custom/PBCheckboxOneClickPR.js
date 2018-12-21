if (typeof(SiebelAppFacade.PBCheckboxOneClickPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.PBCheckboxOneClickPR");
 define("siebel/custom/PBCheckboxOneClickPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.PBCheckboxOneClickPR = (function () {

    function PBCheckboxOneClickPR(pm) {
     SiebelAppFacade.PBCheckboxOneClickPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(PBCheckboxOneClickPR, SiebelAppFacade.JQGridRenderer);

    PBCheckboxOneClickPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.PBCheckboxOneClickPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    PBCheckboxOneClickPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.PBCheckboxOneClickPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    PBCheckboxOneClickPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.PBCheckboxOneClickPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing	
	 }

			var checkboxId;
			
			PBCheckboxOneClickPR.prototype.BindEvents = function () {
                SiebelAppFacade.PBCheckboxOneClickPR.superclass.BindEvents.call(this);

                
				var pHolder = this.GetPM().Get("GetFullId");

				$('#s_' + pHolder + "_div table.ui-jqgrid-btable").on("click", "td[aria-labelledby*='altCheckBox']", function(){
					checkboxId=$(this).attr('id');
				});
				$('#s_' + pHolder + "_div table.ui-jqgrid-btable").on("click", "td[aria-labelledby*='altCheckBox']", this.CheckBoxFlg.bind(this));
            };

            PBCheckboxOneClickPR.prototype.CheckBoxFlg = function () {
				var checkboxVal=$("#"+checkboxId).find("input").val();
				console.log("checkboxId: "+checkboxId);
				console.log("checkboxVal: "+checkboxVal);
				if (typeof(checkboxVal)  === "undefined") checkboxVal=$("#"+checkboxId).attr("title");
				console.log("checkboxVal: "+checkboxVal);
				if (checkboxVal=='Снят' || checkboxVal=='N') {
					setTimeout(function() {
						$("#"+checkboxId).find("input").val("Y");	
						$("#"+checkboxId).find("input").prop("checked", true);	
						$("#"+checkboxId).find("input").attr("aria-checked", true);
					}, 1);
				}
				else {
					setTimeout(function() {
						$("#"+checkboxId).find("input").val("N");
						$("#"+checkboxId).find("input").prop("checked", false);	
						$("#"+checkboxId).find("input").attr("aria-checked", false);					
					}, 1);
				}
            };

			
    return PBCheckboxOneClickPR;
   }()
  );
  return "SiebelAppFacade.PBCheckboxOneClickPR";
 });
}