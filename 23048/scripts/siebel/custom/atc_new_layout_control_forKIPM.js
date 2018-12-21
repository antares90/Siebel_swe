//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=atc_new_layout_control_forKI&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.atc_new_layout_control_forKIPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.atc_new_layout_control_forKIPM");
 define("siebel/custom/atc_new_layout_control_forKIPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.atc_new_layout_control_forKIPM = (function () {

    function atc_new_layout_control_forKIPM(pm) {
     SiebelAppFacade.atc_new_layout_control_forKIPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(atc_new_layout_control_forKIPM, SiebelAppFacade.PresentationModel);

    atc_new_layout_control_forKIPM.prototype.Init = function () {
     SiebelAppFacade.atc_new_layout_control_forKIPM.superclass.Init.apply(this, arguments);
     this.AddMethod("GetValueFromControls",GetValueFromControls, {sequence : false, scope : this});
     this.AddMethod("ShowSelection",PostShowSelection, {sequence : false, scope : this});
     this.AddMethod("FieldChange",PostFieldChange, {sequence : false, scope : this});
     this.AddProperty("pFielValue",0);
     this.AddProperty("pFielName",0)
       
    }

    atc_new_layout_control_forKIPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.Get("GetName")+": atc_new_layout_control_forKIPM:      Setup method reached.");
     SiebelAppFacade.atc_new_layout_control_forKIPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing

    }

    function GetValueFromControls() {
      SiebelJS.Log(this.Get("GetName")+" значения контролов:");
    var arrControls = this.Get("GetControls");   
     var sFieldValue = "";
     var sControlName, oControl, sFieldName, sFieldId;
     //for (sControlName in arrControls) {
        if(arrControls.hasOwnProperty(sControlName)) {
          oControl = arrControls[sControlName];
          sFieldName = oControl.GetInputName();
          sFieldValue = this.ExecuteMethod("GetFieldValue", oControl);
          //console.log(sFieldValue);
        }
        this.SetProperty("pFielValue",sFieldValue);
        this.SetProperty("pFielName",sFieldName);
      //}
      /*var arrControls = this.Get("GetControls");   
      var sFieldValue = "";
      var sControlName, oControl, sFieldName, sFieldId;
      for (sControlName in arrControls) {
        if(arrControls.hasOwnProperty(sControlName)) {
              oControl = arrControls[sControlName];
            //for(var i = 0, len = arrControls.length; i < len; i++) {
              sFieldName = oControl.GetFieldName();
              sFieldValue = this.ExecuteMethod("GetFieldValue", oControl);
              //sFieldId = this.ExecuteMethod("GetControlId");
              // = oControl.GetControlId(); 
              //console.log(sFieldName + "-" + sFieldId);
          //}
        }
        this.SetProperty("pFielValue",sFieldValue);
        this.SetProperty("pFielName",sFieldName);
      }*/
    }
   
        function PostShowSelection(){
            this.ExecuteMethod("GetValueFromControls")
        }
        function PostFieldChange(){
            this.ExecuteMethod("GetValueFromControls")
        }
    return atc_new_layout_control_forKIPM;
   }()
  );
  return "SiebelAppFacade.atc_new_layout_control_forKIPM";
 })
}
