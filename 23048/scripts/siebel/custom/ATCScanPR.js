//Regenerate using:http://fiddle.jshell.net/f1foLs2c/show/?prpm=PR&object=DesktopForm&name=ATCScan&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATCScanPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.ATCScanPR");
    define("siebel/custom/ATCScanPR", ["siebel/jqgridrenderer", '3rdParty/custom/dynamsoft/Resources/dynamsoft.webtwain.initiate', 'siebel/custom/CustomWebtwain.config'],
        function() {
            SiebelAppFacade.ATCScanPR = (function() {
                var DWObject;
                var popup;
                var imageFile;
                var appletName;

                function Dynamsoft_OnReady(){
                    DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('webcamBox');
                }

                function AcquireImage(){
                    if(DWObject) {
                        DWObject.IfDisableSourceAfterAcquire = true;
                        DWObject.IfShowUI = true;
                        if (DWObject.SelectSource()){
                            DWObject.CloseSource();
                            DWObject.OpenSource();
                            return DWObject.AcquireImage();
                        }
                    }
                }

                function ATCScanPR(pm) {
                    SiebelAppFacade.ATCScanPR.superclass.constructor.call(this, pm);
                }

                SiebelJS.Extend(ATCScanPR, SiebelAppFacade.JQGridRenderer);

                ATCScanPR.prototype.Init = function() {
                    SiebelAppFacade.ATCScanPR.superclass.Init.call(this);
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": ATCScanPR:      Init method reached.");
                    appletName = this.GetPM().Get("GetName");
                    // Add code here that should happen after default processing
                }

                ATCScanPR.prototype.ShowUI = function() {
                    // ShowUI is called when the object is initially laid out.
                    // Add code here that should happen before default processing
                    $("body").append($(".scan-popup"));

                    SiebelAppFacade.ATCScanPR.superclass.ShowUI.call(this);
                    Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady);
                    Dynamsoft.WebTwainEnv.Load();
                    popup = $(".scan-popup");
                    if (popup) {
                        popup.hide();
                        $('.ui-widget-overlay').remove();
                    }

                    var scanButtonControlName = this.GetPM().Get('GetControls')["Scan"].GetInputName();
                    $('[name=' + scanButtonControlName + ']').on('click', $.proxy(this.showTwainPopup, this));
                    $(popup.find("#closeScanPopup").eq(0)).click(this.ClosePopup.bind(this));
                    $(popup.find("#closePopup").eq(0)).click(this.ClosePopup.bind(this));
                    $(popup.find("#sendPhoto").eq(0)).click(this.SendPhoto.bind(this));

                    SiebelJS.Log(this.GetPM().Get("GetName") + ": ATCScanPR:      ShowUI method reached.");
                    // Add code here that should happen after default processing
                }

                ATCScanPR.prototype.showTwainPopup = function (event, type) {
                    if (DWObject) {
                        DWObject.RemoveAllImages();
                    }
                                
                    var oheight = popup.outerHeight();
                    var owidth = popup.outerWidth();
                    var swe_client = $("#_sweclient");

                    popup.css("top", swe_client.height() / 2 - oheight / 2 + "px");
                    popup.css("left", swe_client.width() / 2 - owidth / 2 + "px");
                    popup.show();

                    $('.ui-widget-overlay-cam').show();
                    this.shotTwain.call(this);
                };


                ATCScanPR.prototype.shotTwain = function (event) {
                    var self = this;
                    if(!DWObject) {
                        alert('Инициализация оборудования... Повторите попытку позднее.');
                        $('.ui-widget-overlay-cam').hide();   
                        return;
                    }
                    var pm = this.GetPM();
                    DWObject.RegisterEvent('OnBitmapChanged', function(){
                        DWObject.SelectedImagesCount = 1;
                        DWObject.SetSelectedImageIndex(0,0);
                        DWObject.GetSelectedImagesSize(EnumDWT_ImageType.IT_PNG);
                        imagedata = DWObject.SaveSelectedImagesToBase64Binary();
                        var image = new Image();
                        image.onload = function() {
                            imageFile = FileAPI.Image(image);
                        };
                        image.src = "data:image/jpg;base64," + imagedata;
                    });
                    if (!AcquireImage()){
                        this.ClosePopup();
                    }   
                };

                ATCScanPR.prototype.ClosePopup = function () {
                    if (DWObject) {
                        DWObject.RemoveAllImages();
                    }

                    popup.hide();
                    $('.ui-widget-overlay-cam').hide();
                };

                ATCScanPR.prototype.EndLife = function() {
                    // EndLife is where we perform any required cleanup.
                    // Add code here that should happen before default processing
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": ATCScanPR:      EndLife method reached.");
                    if (DWObject && DWObject.CloseSourceManager){
                        DWObject.CloseSource();
                        DWObject.CloseSourceManager();
                    }
                    this.ClosePopup();
                    SiebelAppFacade.ATCScanPR.superclass.EndLife.apply(this, arguments);
                    // Add code here that should happen after default processing
                }

                ATCScanPR.prototype.SendPhoto = function (event) {
                    FileAPI.upload(
                            {
                                url: SiebelApp.S_App.GetPageURL() + '?SRN=' + SiebelApp.S_App.GetSRN(),
                                files: {
                                    's_SweFileName': imageFile
                                },
                                imageTransform: {
                                    type: 'image/png'
                                },
                                data: {
                                    'SWEView': SiebelApp.S_App.GetActiveView().GetName(), 
                                    'SWEApplet': appletName, 
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
                    this.ClosePopup();
                }

                return ATCScanPR;
            }());
            return "SiebelAppFacade.ATCScanPR";
        })
}
