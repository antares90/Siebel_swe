if (typeof (SiebelAppFacade.ATCESIAEBSFormPM) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.ATCESIAEBSFormPM");
    define("siebel/custom/ATCESIAEBSFormPM", ["siebel/pmodel"],
        function () {
            SiebelAppFacade.ATCESIAEBSFormPM = (function () {
                function ATCESIAEBSFormPM(pm) {
                    SiebelAppFacade.ATCESIAEBSFormPM.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(ATCESIAEBSFormPM, SiebelAppFacade.PresentationModel);
                ATCESIAEBSFormPM.prototype.Init = function () {
                    SiebelAppFacade.ATCEBSPM.superclass.Init.call(this);
                    this.AddProperty('GetApplet', SiebelApp.S_App.GetMainView().GetAppletMap()[this.Get('GetName')]);
                    this.AddProperty('GetView', SiebelApp.S_App.GetMainView());
                    var viewPM = SiebelAppFacade.ComponentMgr.FindComponent({ id: SiebelApp.S_App.GetMainView().GetName() }).GetPM();
                    this.AddProperty("GetViewPM", viewPM);
                    this.AddMethod('InvokeMethod', this.PreInvokeMethod, {
                        sequence: true,
                        scope: this
                    });
                }
                ATCESIAEBSFormPM.prototype.PreInvokeMethod = function (methodName, psIn, arg, retVal) {
                    if (methodName == "CheckAudio") {
						if (this.Get("GetName") == "ATC Opportunity Voice Collection Form Applet"){
							var bc = this.Get("GetBusComp");
							bc.SetFieldValue("Voice Collect Skip Reason", "");
							this.invokeBCMethodSync("WriteRecord");
						}
                        var viewPM = this.Get("GetViewPM"),
                            checkAudioMethod = viewPM.Get("GetCheckAudio") || this.NotImplemented.bind(this);
                        checkAudioMethod();
                        setCancelOperation(retVal);
                    }
                    if (methodName == "CheckPhoto") {
                        var viewPM = this.Get("GetViewPM"),
                            checkAudioMethod = viewPM.Get("GetCheckPhoto") || this.NotImplemented.bind(this);
                        checkAudioMethod();
                        setCancelOperation(retVal);
                    }
                }
				
				ATCESIAEBSFormPM.prototype.invokeBCMethodSync = function (methodName) {
				   var ai = {
					   async: false,
					   selfbusy: true,
					   scope: this,
					   mask: true,
					   opdecode: true
				   },
					   inPropSet = CCFMiscUtil_CreatePropSet();
				   if (methodName == "WriteRecord")
					   methodName = "ImplicitCommit";
				   this.ExecuteMethod("InvokeMethod", methodName, inPropSet, ai);
			    }

                ATCESIAEBSFormPM.prototype.NotImplemented = function () { }
                
                function setCancelOperation(retVal) {
                    retVal.CancelOperation = true, retVal.ReturnValue = true, retVal.CancelPost = true;
                    SiebelApp.S_App.uiStatus.Free();
                }
               
                return ATCESIAEBSFormPM;
            }()
            );
            return "SiebelAppFacade.ATCESIAEBSFormPM";
        })
}