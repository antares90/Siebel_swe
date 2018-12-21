//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopList&name=ATCAttachmentsPhotoList&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATCAttachmentsPhotoListPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCAttachmentsPhotoListPM");
 define("siebel/custom/ATCAttachmentsPhotoListPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.ATCAttachmentsPhotoListPM = (function () {

    function ATCAttachmentsPhotoListPM(pm) {
     SiebelAppFacade.ATCAttachmentsPhotoListPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCAttachmentsPhotoListPM, SiebelAppFacade.ListPresentationModel);

    ATCAttachmentsPhotoListPM.prototype.Init = function () {
     SiebelAppFacade.ATCAttachmentsPhotoListPM.superclass.Init.call(this);

         this.AddMethod("PostExecute", PostExecuteDownloadFile,{sequence : true, scope : this}); 

    }

    function PostExecuteDownloadFile(methodName, inPs,outPS,returnStructure)
            {
                if(outPS.PropertyExists("Status"))
                    if(outPS.GetProperty("Status")=="DownloadFile") {
                        returnStructure.CancelOperation = true;
                        this.GetRenderer().DownloadFile(outPS);
                    }
                    console.log(outPS.GetProperty("Status"));
            }

    ATCAttachmentsPhotoListPM.prototype.Setup = function (propSet) {
     SiebelJS.Log(this.Get("GetName")+": ATCAttachmentsPhotoListPM:      Setup method reached.");
     SiebelAppFacade.ATCAttachmentsPhotoListPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATCAttachmentsPhotoListPM;
   }()
  );
  return "SiebelAppFacade.ATCAttachmentsPhotoListPM";
 })
}
