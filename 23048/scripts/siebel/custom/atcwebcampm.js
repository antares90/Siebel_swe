if (typeof(SiebelAppFacade.ATCWebCamPM) === 'undefined') {
    SiebelJS.Namespace('SiebelAppFacade.ATCWebCamPM');

    define("siebel/custom/atcwebcampm", ["siebel/listpmodel.js"], function () {

        SiebelAppFacade.ATCWebCamPM = (function () {
            function ATCWebCamPM(proxy) {
                SiebelAppFacade.ATCWebCamPM.superclass.constructor.call(this, proxy);
            }

            SiebelJS.Extend(ATCWebCamPM, SiebelAppFacade.ListPresentationModel);

            ATCWebCamPM.prototype.SendPhoto = function () {
                SiebelApp.S_App.uiStatus.Busy();

                var photo = this.Get('File'),
                    pm = this;
                console.log(this.Get('File'));

                if (!photo)
                    return false;

                FileAPI.upload({
                    url: SiebelApp.S_App.GetPageURL() + '?SRN=' + SiebelApp.S_App.GetSRN(),
                    files: {
                        's_SweFileName': photo
                    },
                    imageTransform: {
                        type: 'image/png'//,
                        //quality: 0.86 // jpeg quality
                    },
                    data: {
                        'SWEView': SiebelApp.S_App.GetActiveView().GetName(), //'Contact Attachment View',
                        'SWEApplet': SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName(), //'Contact Attachment Applet',
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
                                pm.SetProperty('File', null);	
								if (xhr.status === 200) {
									try
									{
										pm.Get("GetBusComp").SetFieldValue("ATC Webcam Photo Flg", "Y");
										pm.Get("GetBusComp").SetFieldValue("ATC Doc Type", "Фотография", true);
									}
									catch(e)
									{
										console.log(e.toString())
									}
								}
                            }
                        } else {
                            //console.log(err);
                        }
                    }
                });
            }

            ATCWebCamPM.prototype.Init = function () {
                SiebelAppFacade.ATCWebCamPM.superclass.Init.call(this);
                //console.log('ATCWebCamPM.prototype.Init');		   
				
				this.AddProperty('GetApplet', SiebelApp.S_App.GetMainView().GetAppletMap()[this.Get('GetName')]);

                this.AddProperty('GetView', SiebelApp.S_App.GetMainView());
                //this.AddProperty('AllowScan', false);
				this.AddProperty( "MakePhoto", "" );

                /* Attach Pre Handler for CanInvokeMethod */
                this.AddMethod('CanInvokeMethod', {
                    sequence: true,
                    scope: this
                }); //pre handler
                /* Attach Pre Handler for InvokeMethod */
                this.AddMethod('InvokeMethod', {
                    sequence: true,
                    scope: this
                }); //pre handler
				this.AddMethod("InvokeMethod", this.PreInvokeProcess, {
					sequence: true,
					scope: this
				});

                this.SetProperty('File', null);
            };

            ATCWebCamPM.prototype.Setup = function (propSet) {
                SiebelAppFacade.ATCWebCamPM.superclass.Setup.call(this, propSet);
                //console.log('ATCWebCamPM.prototype.Setup');
                //console.dir(propSet);
            };
			ATCWebCamPM.prototype.PreInvokeProcess = function( methodName, psInputArgs, lp, returnStructure){
				if( methodName === "MakePhoto"){
					//this.SetProperty( "MakePhoto", "Y");
					console.log(this.SetProperty( "MakePhoto", ""));
					SiebelApp.S_App.uiStatus.Free();
					returnStructure ["CancelOperation"] = true;
					returnStructure ["returnStructure"] = "";
				}
			}

            return ATCWebCamPM;
        }
        ());
        return "SiebelAppFacade.ATCWebCamPM";
    });
}
