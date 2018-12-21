//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopList&name=atc_Tile_Image_forKI&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.atc_Tile_Image_forKIPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.atc_Tile_Image_forKIPM");
 define("siebel/custom/atc_Tile_Image_forKIPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.atc_Tile_Image_forKIPM = (function () {

    function atc_Tile_Image_forKIPM(pm) {
     SiebelAppFacade.atc_Tile_Image_forKIPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(atc_Tile_Image_forKIPM, SiebelAppFacade.ListPresentationModel);

    atc_Tile_Image_forKIPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.atc_Tile_Image_forKIPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": atc_Tile_Image_forKIPM:      Init method reached.");
     this.AddMethod("GetValueFromControls",GetValueFromControls, {sequence : false, scope : this});
     this.AddMethod("ShowSelection",PostShowSelection, {sequence : false, scope : this});
     this.AddMethod("FieldChange",PostFieldChange, {sequence : false, scope : this});
    }

    atc_Tile_Image_forKIPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.Get("GetName")+": atc_Tile_Image_forKIPM:      Setup method reached.");
     SiebelAppFacade.atc_Tile_Image_forKIPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }
    function GetValueFromControls(){
              SiebelJS.Log("Значения контролов аплета - 'Участники сделки'");
              var arrControls = this.Get("ListOfColumns");
              var controls = this.Get("GetControls");
              var sFieldValue = "";
              var sControlName, oControl, sFieldName;
              
              for(var i = 0, len = arrControls.length; i < len; i++){
                var control = controls[arrControls[i].name];
                if(control) {
                  sFieldValue = this.ExecuteMethod("GetFieldValue", control);
                  console.log(arrControls[i].name + " " + sFieldValue);
                }
              }
          }
          function PostShowSelection(){
            this.ExecuteMethod("GetValueFromControls")
          }
          function PostFieldChange(){
              this.ExecuteMethod("GetValueFromControls")
          }

    return atc_Tile_Image_forKIPM;
   }()
  );
  return "SiebelAppFacade.atc_Tile_Image_forKIPM";
 })
}
