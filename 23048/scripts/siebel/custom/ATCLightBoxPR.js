if (typeof(SiebelAppFacade.ATCLightBoxPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCLightBoxPR");
 define("siebel/custom/ATCLightBoxPR", ["siebel/phyrenderer", "3rdParty/lightbox2-master/src/js/lightbox"],
  function () {
   SiebelAppFacade.ATCLightBoxPR = (function () {

    function ATCLightBoxPR(pm) {
     SiebelAppFacade.ATCLightBoxPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCLightBoxPR, SiebelAppFacade.PhysicalRenderer);

    ATCLightBoxPR.prototype.Init = function () {
        /** VBLINOV>>LETO-7033>>закомментил, это обламывает gotoview из браузерного скрипта
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATCLightBoxPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": "+this.constructor.name+":      Init method reached.");
     // Add code here that should happen after default processing
	 this.GetPM().AttachPostProxyExecuteBinding ("ALL", this.SetLightBox, {scope: this}); //рефреш на текущем апплете
	this.GetPM().AttachPMBinding ("ExecuteUIUpdate", this.SetLightBox, {scope: this}) //рефреш на любом парент апплете
    */
    }

    ATCLightBoxPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": "+this.constructor.name+":      ShowUI method reached.");
     SiebelAppFacade.ATCLightBoxPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
	 this.SetLightBox();
    }

    ATCLightBoxPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
    SiebelJS.Log(this.GetPM().Get("GetName")+": "+this.constructor.name+":      BindData method reached.");
    SiebelAppFacade.ATCLightBoxPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    this.SetLightBox();
	this.GetPM().AttachPMBinding("ALL",this.SetLightBox,{scope: this});
	this.GetPM().AttachPostProxyExecuteBinding("ALL",this.SetLightBox,{scope: this}); 	

    }

    ATCLightBoxPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": "+this.constructor.name+":      BindEvents method reached.");
     SiebelAppFacade.ATCLightBoxPR.superclass.BindEvents.apply(this, arguments);	 	 
     // Add code here that should happen after default processing
    }
	ATCLightBoxPR.prototype.SetLightBox = function () {
        var pm = this.GetPM();
		var Image = pm.Get("GetControls").ContactFileName.GetInputName();
        var control = '#' + Image;   
        var arrControls = pm.Get("GetControls");
        var sFieldValue = "";
        var sControlName, oControl, sFieldName;
        
        for (sControlName in arrControls) {
            if(arrControls.hasOwnProperty(sControlName)) {
                oControl = arrControls["ContactFileName"];
                sFieldName = oControl.GetFieldName();
                sFieldValue = pm.ExecuteMethod("GetFieldValue", oControl);
            }
            var picture = $(sFieldValue);
        } 
		var Pict_tag = $(picture).html();
        $(control + " " + "img").attr("id","img_lightbox")
		var src = $('.siebui-icon-contactfilename img').attr("src");
		$("#img_lightbox").wrap("<a href='"+src+"' data-lightbox='"+Image+"'></a>"); 
		$("#img_lightbox").removeAttr("width");
		$("#img_lightbox").css("max-width", "100%");
		$("#img_lightbox").css("max-height", "100%");

		$("#"+Image).parent().css("overflow", "hidden");

			
    }

    ATCLightBoxPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": "+this.constructor.name+":      EndLife method reached.");
     SiebelAppFacade.ATCLightBoxPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }
	
    return ATCLightBoxPR;
   }()
  );
  return "SiebelAppFacade.ATCLightBoxPR";
 })
}
