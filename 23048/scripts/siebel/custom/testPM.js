//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=test&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.testPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.testPM");
 define("siebel/custom/testPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.testPM = (function () {

    function testPM(pm) {
     SiebelAppFacade.testPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(testPM, SiebelAppFacade.PresentationModel);

    testPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.testPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": testPM:      Init method reached.");
     this.AddProperty("P_Picture",0)
        this.AddMethod("GetValueFromControls",GetValueFromControls, {sequence : false, scope : this});
        this.AddMethod("ShowSelection",PostShowSelection, {sequence : false, scope : this});
        this.AddMethod("FieldChange",PostFieldChange, {sequence : false, scope : this});
    }

    testPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.Get("GetName")+": testPM:      Setup method reached.");
     SiebelAppFacade.testPM.superclass.Setup.apply(this, arguments);
     function GetValueFromControls(){
            SiebelJS.Log("Работа кастомной функции");
            var arrControls = this.Get("GetControls");
            var sFieldValue = "";
            var sControlName, oControl, sFieldName;
        
        for (sControlName in arrControls) {
            if(arrControls.hasOwnProperty(sControlName)) {
                    oControl = arrControls["ContactFileName"];
                    sFieldName = oControl.GetFieldName();
                    sFieldValue = this.ExecuteMethod("ContactFileName", oControl);
                    console.log(sFieldValue);
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
        }
    }

    return testPM;
   }()
  );
  return "SiebelAppFacade.testPM";
 })
}
