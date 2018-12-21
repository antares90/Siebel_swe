if (typeof (SiebelAppFacade.CheckboxDblClickPW) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.CheckboxDblClickPW");
     
    define("siebel/custom/CheckboxDblClickPW", [],
        function () {
            SiebelAppFacade.CheckboxDblClickPW = (function () {
 
                function CheckboxDblClickPW(pm) {
                    SiebelAppFacade.CheckboxDblClickPW.superclass.constructor.apply(this, arguments);
                }
 
                SiebelJS.Extend(CheckboxDblClickPW, SiebelAppFacade.CheckBoxPW);
   
                CheckboxDblClickPW.prototype.ShowUI = function () {
                SiebelAppFacade.CheckboxDblClickPW.superclass.ShowUI.apply(this, arguments);
 
                var pwEl = this.GetEl();
                var myEl;
     
                if (pwEl !== null)
                {
                    myEl = pwEl.closest($("[role='gridcell']")); // get gridcell for checkbox
         
                    if (myEl !== undefined)
                    {
                        $(myEl).dblclick(function () {
                            setTimeout(function () {$(pwEl).trigger("click");}, 0); // trigger click
                    });
                }
            }
        }
 
        return CheckboxDblClickPW;
        }()
    );
   
    SiebelApp.S_App.PluginBuilder.AttachPW(consts.get("SWE_CTRL_CHECKBOX"), SiebelAppFacade.CheckboxDblClickPW, function (control, objName) {
        return true;
    });
 
    return "SiebelAppFacade.CheckboxDblClickPW";
})
}