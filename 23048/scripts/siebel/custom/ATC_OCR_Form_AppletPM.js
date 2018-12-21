//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopForm&name=ATC_OCR_Form_Applet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.ATC_OCR_Form_AppletPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_OCR_Form_AppletPM");
 define("siebel/custom/ATC_OCR_Form_AppletPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATC_OCR_Form_AppletPM = (function () {

    function ATC_OCR_Form_AppletPM(pm) {
     SiebelAppFacade.ATC_OCR_Form_AppletPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_OCR_Form_AppletPM, SiebelAppFacade.PresentationModel);

    ATC_OCR_Form_AppletPM.prototype.Init = function () {
     SiebelAppFacade.ATC_OCR_Form_AppletPM.superclass.Init.apply(this, arguments);
				
    }

    ATC_OCR_Form_AppletPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.ATC_OCR_Form_AppletPM.superclass.Setup.apply(this, arguments);
    }
	
	ATC_OCR_Form_AppletPM.prototype.PreInvokeProcess = function( methodName, psInputArgs, lp, returnStructure){
		
	}

    return ATC_OCR_Form_AppletPM;
   }()
  );
  return "SiebelAppFacade.ATC_OCR_Form_AppletPM";
 })
}
