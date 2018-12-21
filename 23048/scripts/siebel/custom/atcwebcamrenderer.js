if (typeof(SiebelAppFacade.ATCWebCamRenderer) === 'undefined') {
    SiebelJS.Namespace('SiebelAppFacade.ATCWebCamRenderer');


    define("siebel/custom/atcwebcamrenderer", ["siebel/jqgridrenderer"], function () {

        SiebelAppFacade.ATCWebCamRenderer = (function () {
            function ATCWebCamRenderer(p) {
                SiebelAppFacade.ATCWebCamRenderer.superclass.constructor.call(this, p);
            }

            SiebelJS.Extend(ATCWebCamRenderer, SiebelAppFacade.JQGridRenderer);

            var webcam = null;

            ATCWebCamRenderer.prototype.Init = function () {
                SiebelAppFacade.ATCWebCamRenderer.superclass.Init.call(this);
				this.GetPM().AttachPMBinding( "MakePhoto",  this.showWebCamPopup, { scope: this });
				//this.GetPM().AttachPMBinding( "MyProp",  this.ProcessMyProp, { scope: this });
                			
				
                var FileAPI = {
                    debug: true, // debug mode
                    media: true, // use webcam
                    staticPath: 'xfileapi/'
                };
                require(
                    [
                        "xfileapi/FileAPI.js"
                    ],
                    this.afterInit.bind(this)
                );
            };

            ATCWebCamRenderer.prototype.afterInit = function () {
                //console.clear();
                //console.log(this);
            };

            ATCWebCamRenderer.prototype.ShowUI = function () {
                SiebelAppFacade.ATCWebCamRenderer.superclass.ShowUI.call(this);

                //var fullID = this.GetPM().Get("GetFullId");

                // Заменяем кнопку Фотографировать
               // $('#' + fullID + ' .siebui-applet-buttons button[data-display=Фотографировать]').replaceWith('<button type="button" class="siebui-ctrl-btn siebui-icon-makephoto appletButton" id="make_photo" name="make_photo" data-display="Фотографировать" tabindex="0"><span>Фотографировать</span></button>');

            };

            /*ATCWebCamRenderer.prototype.ProcessMyProp = function (event, type) {
				//console.log("MyProp");
				//console.log('MyProp='+this.GetPM().Get("MyProp"));
				//SiebelApp.S_App.GetActiveBusObj().GetBusCompByName("Action Attachment").SetFieldValue("ATC Doc Type", "Фотография", true);
				//this.GetPM().Get("GetBusComp").SetFieldValue("ATC Doc Type", "Фотография", true);
			};*/

            ATCWebCamRenderer.prototype.showWebCamPopup = function (event, type) {
                $('<div style="width: 640px; height: 480px !important;" id="webcambox" class="js-fileapi-wrapper"></div>').dialog({
                    modal: true,
                    title: "Фотографирование",
                    width: 670,
                    height: 550,
                    open: function () {
                        if (FileAPI && FileAPI.Camera) {
                            FileAPI.Camera.publish($('#webcambox'), {
                                width: 640,
                                height: 480
                            }, function (err, cam) {
                                if (err) {
                                    //console.log(err);
                                    $('#webcambox').html('Ошибка инициализации Веб-камеры');
                                    webcam = null;
                                } else {
                                    webcam = cam;
                                }
                            });
                        }
                    },
                    buttons: {
                        "Фотографировать": this.shotWebcam.bind(this),
                        "Отмена": function () {
                            if (webcam && webcam.stop) {
                                webcam.stop();
                                webcam = null;
                            }
                            //$(this).dialog("close");
                            $(this).dialog('destroy');
                        }
                    },
                    close: function () {
                        if (webcam && webcam.stop) {
                            webcam.stop();
                            webcam = null;
                        }
                        $(this).dialog('destroy');
                    }
                });
            };

            ATCWebCamRenderer.prototype.shotWebcam = function (event) {
                var pm = this.GetPM();
                var shot = webcam.shot();
                webcam.stop();
                webcam = null;

                shot.get(function (err, img) {
                });

                pm.SetProperty('File', shot);
                this.GetPM().SendPhoto();
				
                //$('#webcambox').dialog('close');
                 $('#webcambox').dialog('destroy');

            };

			ATCWebCamRenderer.prototype.BindData = function (bRefresh) {
				// BindData is called each time the data set changes.
				// This is where you'll bind that data to user interface elements you might have created in ShowUI
				// Add code here that should happen before default processing
				SiebelAppFacade.ATCWebCamRenderer.superclass.BindData.apply(this, arguments);
				// Add code here that should happen after default processing
				try
				{
					var pm = this.GetPM();
					var control = '.' + pm.Get("GetControls")["ATC Webcam Photo Flg"].GetInputName();
					$(control).addClass("hide");
				}
				catch(e)
				{
					console.log(e.toString())
				}
				

			}
			
            ATCWebCamRenderer.prototype.BindEvents = function () {
                SiebelAppFacade.ATCWebCamRenderer.superclass.BindEvents.call(this);
                //$('#make_photo').click(this.showWebCamPopup.bind(this));
            };

            ATCWebCamRenderer.prototype.EndLife = function () {
                /*SiebelAppFacade.ATCWebCamRenderer.superclass.EndLife.call(this);
                if (webcam && webcam.stop) {
                    webcam.stop();
                    webcam = null;
                }*/
            };

            return ATCWebCamRenderer;
        }
        ());
        return "SiebelAppFacade.ATCWebCamRenderer";
    })
}
