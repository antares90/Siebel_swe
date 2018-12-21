//Regenerate using:http://fiddle.jshell.net/f1foLs2c/show/?prpm=PM&object=DesktopForm&name=ATCScan&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATCScanPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCScanPM");
 define("siebel/custom/ATCScanPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.ATCScanPM = (function () {

    function ATCScanPM(pm) {
     SiebelAppFacade.ATCScanPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCScanPM, SiebelAppFacade.ListPresentationModel);

    ATCScanPM.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
	 //var photo = this.Get('File');
	 /*FileAPI.upload({
		url: SiebelApp.S_App.GetPageURL() + '?SRN=' + SiebelApp.S_App.GetSRN(),
		files: {
			's_SweFileName': photo
		},
		imageTransform: {
			type: 'image/png'
		},
		data: {
			'SWEView': SiebelApp.S_App.GetActiveView().GetName(), 
			'SWEApplet': SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName(), 
			'SWECmd': 'InvokeMethod',
			'SWEMethod': 'NewFileAttachment',
			'SWETS': new Date().getTime(),
			'SWERPC': '1',
			'SWERowIds': '',
			'SWEP': ''
		},
		scope: this,
		complete: function (err, xhr, request) {
			if (!err) {
				var res = xhr.responseText;
				if (!SiebelApp.Utils.IsEmpty(res)) {
					SiebelApp.S_App.ProcessResponse(res);
					SiebelApp.S_App.uiStatus.Free();
				}
				} else {
								console.log(err);
							}			
				}
				});

*/
     SiebelAppFacade.ATCScanPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": ATCScanPM:      Init method reached.");
     // Add code here that should happen after default processing
    }

    ATCScanPM.prototype.Setup = function (propSet) {
     // Setup is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.Get("GetName")+": ATCScanPM:      Setup method reached.");
     SiebelAppFacade.ATCScanPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
    }
	
    return ATCScanPM;
   }()
  );
  return "SiebelAppFacade.ATCScanPM";
 })
}