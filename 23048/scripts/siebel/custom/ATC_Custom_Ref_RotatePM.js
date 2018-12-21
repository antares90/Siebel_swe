if (typeof(SiebelAppFacade.ATC_Custom_Ref_RotatePM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Custom_Ref_RotatePM");
 define("siebel/custom/ATC_Custom_Ref_RotatePM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_Custom_Ref_RotatePM = (function () {

    function ATC_Custom_Ref_RotatePM(pm) {
     SiebelAppFacade.ATC_Custom_Ref_RotatePM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Custom_Ref_RotatePM, SiebelAppFacade.PresentationModel);

    ATC_Custom_Ref_RotatePM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.ATC_Custom_Ref_RotatePM.superclass.Init.apply(this, arguments);
     //SiebelJS.Log(this.Get("GetName")+": ATC_Custom_Ref_RotatePM:      Init method reached.");
        /*this.AddProperty("P_Picture",0)
        this.AddMethod("GetValueFromControls",GetValueFromControls, {sequence : false, scope : this});
        this.AddMethod("ShowSelection",PostShowSelection, {sequence : false, scope : this});
        this.AddMethod("FieldChange",PostFieldChange, {sequence : false, scope : this});*/
     // Add code here that should happen after default processing
    }

    ATC_Custom_Ref_RotatePM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     //SiebelJS.Log(this.Get("GetName")+": ATC_Custom_Ref_RotatePM:      Setup method reached.");
     SiebelAppFacade.ATC_Custom_Ref_RotatePM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }
        /*function GetValueFromControls(){
            SiebelJS.Log("Работа кастомной функции");
            var arrControls = this.Get("GetControls");
            var sFieldValue = "";
            var sControlName, oControl, sFieldName;
        
        for (sControlName in arrControls) {
            if(arrControls.hasOwnProperty(sControlName)) {
                    oControl = arrControls["RefinAgrFileName"];
                    sFieldName = oControl.GetFieldName();
                    sFieldValue = this.ExecuteMethod("GetFieldValue", oControl);
                    $(sFieldValue).html();
                    //console.log(sFieldValue);
                }
                    var picture = $(sFieldValue);
                    this.SetProperty("P_Picture",picture);
            }
        }
       
        function PostShowSelection(){
            this.ExecuteMethod("GetValueFromControls")
        }
        function PostFieldChange(){
            this.ExecuteMethod("GetValueFromControls")
        }*/

    return ATC_Custom_Ref_RotatePM;
   }()
  );
  return "SiebelAppFacade.ATC_Custom_Ref_RotatePM";
 })
}
