//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopList&name=atc_borrower_forKI&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.atc_borrower_forKIPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.atc_borrower_forKIPM");
 define("siebel/custom/atc_borrower_forKIPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.atc_borrower_forKIPM = (function () {

    function atc_borrower_forKIPM(pm) {
     SiebelAppFacade.atc_borrower_forKIPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(atc_borrower_forKIPM, SiebelAppFacade.ListPresentationModel);

    atc_borrower_forKIPM.prototype.Init = function () {
     SiebelAppFacade.atc_borrower_forKIPM.superclass.Init.apply(this, arguments);
     this.AddMethod("GetValueFromControls",GetValueFromControls, {sequence : false, scope : this});
     this.AddMethod("ShowSelection",PostShowSelection, {sequence : false, scope : this});
     this.AddMethod("FieldChange",PostFieldChange, {sequence : false, scope : this});
    }

    atc_borrower_forKIPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.atc_borrower_forKIPM.superclass.Setup.apply(this, arguments);

    }
    function GetValueFromControls(){
              //SiebelJS.Log("Значения контролов аплета - 'Участники сделки'");
              var arrControls = this.Get("ListOfColumns");
              var controls = this.Get("GetControls");
              var sFieldValue = "";
              var sControlName, oControl, sFieldName;
              
              for(var i = 0, len = arrControls.length; i < len; i++){
                var control = controls[arrControls[i].name];
                if(control) {
                  sFieldValue = this.ExecuteMethod("GetFieldValue", control);
                  //console.log(arrControls[i].name + " " + sFieldValue);
                }
              }
          }
          function PostShowSelection(){
            this.ExecuteMethod("GetValueFromControls")
          }
          function PostFieldChange(){
              this.ExecuteMethod("GetValueFromControls")
          }

    return atc_borrower_forKIPM;
   }()
  );
  return "SiebelAppFacade.atc_borrower_forKIPM";
 })
}
