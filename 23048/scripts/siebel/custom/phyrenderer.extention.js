if (typeof(SiebelAppFacade.PhysicalRenderer) !== "undefined"){
    var _ShowUI= SiebelAppFacade.PhysicalRenderer.prototype.ShowUI;
	var showUIControlBase = SiebelAppFacade.PhysicalRenderer.prototype.ShowUIControl;   //LETO-10923>>APRONIN
	
    SiebelAppFacade.PhysicalRenderer.prototype.ShowUI = function() {
       _ShowUI.call(this);
        //Убираем неполноценные заголовки с неразрывными пробелами, которые не удалось найти в темлейтах
        try{
            var placeHolder = "s_" + this.GetPM().Get("GetFullId") + "_div";
            $('#'+placeHolder+' .AppletTitle:contains("'+String.fromCharCode(160)+'")').html('');
        }catch(e){
            console.log(e);
        }
    }
	
	//LETO-10923>>APRONIN>>Дропдаун при нажатии на всей области поля
	SiebelAppFacade.PhysicalRenderer.prototype.ShowUIControl = function (appletCtrl) {
		showUIControlBase.call(this, appletCtrl);
		var ctrlPlace = $("input[name='" + appletCtrl.GetInputName() + "']");
			
		if (ctrlPlace) {
			if (ctrlPlace.attr("role") == "combobox") {
				ctrlPlace.on("click", function () {
					var ctrlIcorPlace = $("#" + appletCtrl.GetInputName() + "_icon");
					if (ctrlIcorPlace.length === 1)
						ctrlIcorPlace.click();
				});
			}
		}
	}
	
    var _SetControlValue = SiebelAppFacade.PhysicalRenderer.prototype.SetControlValue;
    SiebelAppFacade.PhysicalRenderer.prototype.SetControlValue = function (appletCtrl, val, aN) {

           
                var aE = !aN ? 0 : aN;
                var aF = $("#" + appletCtrl.GetInputName())[aE] || $("[name=" + appletCtrl.GetInputName() + "]")[aE];
                //var applet = $("#" + appletCtrl.GetInputName())[aE];
                //var q = appletCtrl
                //console.log(applet);
          
                if (!aF) {
                    return
                }
                //$(aF).attr("data-toggle","tooltip");
                //$(aF).attr("data-placement","top");
                $(aF).attr("title",val);
                $(aF).attr("id",appletCtrl.GetInputName());
				
				$('li [data-caption="Отправка сообщения по каналу беспроводной связи[Alt+F9]"] a').removeClass('ui-state-disabled');
                
                //$(function () {
                //    $('[data-toggle="tooltip"]').tooltip()
               // })
                _SetControlValue.call(this, appletCtrl, val, aN);
            }
}
if (typeof(SiebelAppFacade.PopupRenderer) !== "undefined") {
    SiebelAppFacade.PopupRenderer.prototype.BindEvents = function() {
        SiebelAppFacade.PopupRenderer.superclass.BindEvents.call(this);
        var k = $("[name=popup]");
        k.data("context", this);
        k.dialog({
            beforeClose: function(m, n) {
                if ($(m.currentTarget, "[class*=ui-dialog-titlebar-close]").length > 0) {
                    var l = $("[name=popup]").data("context");
                    l.GetPM().OnControlEvent("ClosePopupByX", m);
                    return true;
                }
            }
        })
    };
}