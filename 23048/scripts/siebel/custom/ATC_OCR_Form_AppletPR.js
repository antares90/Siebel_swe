//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATC_OCR_Form_Applet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.ATC_OCR_Form_AppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_OCR_Form_AppletPR");
 define("siebel/custom/ATC_OCR_Form_AppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.ATC_OCR_Form_AppletPR = (function () {

    function ATC_OCR_Form_AppletPR(pm) {
     SiebelAppFacade.ATC_OCR_Form_AppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_OCR_Form_AppletPR, SiebelAppFacade.PhysicalRenderer);
 var webcam = null;
    ATC_OCR_Form_AppletPR.prototype.Init = function () {
     SiebelAppFacade.ATC_OCR_Form_AppletPR.superclass.Init.apply(this, arguments);
	 
		SiebelAppFacade.ATC_OCR_Form_AppletPR.superclass.Init.call(this);
				//this.GetPM().AttachPMBinding( "MakePhoto",  this.ShowUI, { scope: this });
			
                
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
				console.log(SiebelApp);
    }
	
	 ATC_OCR_Form_AppletPR.prototype.afterInit = function () {
                //console.clear();
                //console.log(this);
            };
			
			
	
   ATC_OCR_Form_AppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.ATC_OCR_Form_AppletPR.superclass.ShowUI.apply(this, arguments);

		var t = this;
		pm = this.GetPM();
		
		var sBusService = SiebelApp.S_App.GetService("ATC Tools");
		if(sBusService)
		{
			  //Create new property set
			var Inputs = SiebelApp.S_App.NewPropertySet();
			var Outputs = SiebelApp.S_App.NewPropertySet();
			Inputs.SetProperty("BCName", "Opportunity Contact");
			Inputs.SetProperty("FieldName", "ATC General RO Flag");// Invoke the Business service Method and pass the Inputs
			Outputs = sBusService.InvokeMethod("GetFieldFromCurrentVIew",Inputs );
			// Get the Outputs/Result Set in a property set
			var ResultSet = SiebelApp.S_App.NewPropertySet();
			ResultSet = Outputs.GetChildByType ("ResultSet").GetProperty("FieldValue");
			var Flag = ResultSet;
			//console.log(ResultSet);
		}
		else
		{
			console.log("Business Service Not Found");
		}
		//Flag = "Y"; //debug
		if(Flag == "Y")
		{
			$(".siebui-ctrl-file").wrap("<div class='CustomFileUploadDisable'></div>");
			var sBusService2 = SiebelApp.S_App.GetService("SIS OM PMT Service");
			if(sBusService2)
			{
				Inputs.SetProperty("Profile Attribute Name", "OCR Flag RO");
				Inputs.SetProperty("Profile Attribute Value", "Y");
				Outputs = sBusService2.InvokeMethod("Set Profile Attribute",Inputs );
			}
			else
			{
				console.log("Business Service Not Found");
			}
		}
		else
		{
			
			$(".siebui-ctrl-file").wrap("<div class='CustomFileUpload'></div>");
			var sBusService2 = SiebelApp.S_App.GetService("SIS OM PMT Service");
			if(sBusService2)
			{
				Inputs.SetProperty("Profile Attribute Name", "OCR Flag RO");
				Inputs.SetProperty("Profile Attribute Value", "N");
				Outputs = sBusService2.InvokeMethod("Set Profile Attribute",Inputs );
			}
			else
			{
				console.log("Business Service Not Found");
			}
			$('.siebui-btn-icon-e').click( function(){
			$('<div style="width: 640px; height: 480px !important;" id="webcambox" class="js-fileapi-wrapper"></div>').dialog({
				modal: true,
                title: "Фотографирование",
                width: 670,
                height: 550,
				open: /*function(){
					if(navigator.webkitGetUserMedia!=null) { 
					  var options = { 
						video:true
					  }; 
					  navigator.webkitGetUserMedia(options, 
						function(stream) { 
						  var video = document.querySelector('video'); 
						  video.src = window.webkitURL.createObjectURL(stream); 
						}, 
						function(e) { 
						  console.log("Ошибка инициализации камеры!"); 
						} 
					  ); 
					}
					$('<video autoplay></video>').appendTo('.popup');
					$('<canvas style="display:none;"></canvas>').appendTo('.popup');
					$('<input id="file" type="hidden" name="myHiddenField" />').appendTo('.popup');
					//$('<input id="file" type="hidden" name="myHiddenField" />').wrapp("<form></form>");
					
				},*/
				function () {
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
				buttons: [
					{
						text: 'Фотографировать',
						click:	function(e, err, cam) {
							t.shotWebcam(e);
							webcam = cam;
						}
					},
					{
						text: 'Отмена',
						click: function() {
							if (webcam && webcam.stop) {
                            webcam.stop();
                            webcam = null;
                        }
                        $(this).dialog('destroy');
						}
					}
				],
				close: function () {
                        if (webcam && webcam.stop) {
                            webcam.stop();
                            webcam = null;
                        }
                        $(this).dialog('destroy');
                    }
			})
		});
			
		}
		$(".siebui-ctrl-file").wrap("<label title='Прикрепить'></label>");
		$(".siebui-ctrl-file").attr("accept","image/*");
		//$(".siebui-ctrl-file").wrap("<form></form>");
	}
	
    ATC_OCR_Form_AppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.ATC_OCR_Form_AppletPR.superclass.BindData.apply(this, arguments);

    }
	
	
	 ATC_OCR_Form_AppletPR.prototype.shotWebcam = function (e,t) {
            var pm = this.GetPM();
			  var shot = webcam.shot();
                webcam.stop();
                webcam = null;
				console.log(shot);
				shot.get(function (err, img) {
                });
			//var video = document.querySelector('video');
			//var canvas = document.querySelector('canvas');
			//var ctx = canvas.getContext('2d');

				
			//ctx.drawImage(video, 0, 0);
			//document.querySelector('.photo').src = canvas.toDataURL('image/png');
		
			//var photo = canvas.toDataURL('image/png');
			//document.getElementsByName("myHiddenField")[0].setAttribute("value", photo);
			
			//var image = new Image();
			//image.src = photo;
			//var oi = document.body.appendChild(image);
		
			
			FileAPI.upload({
                    url: SiebelApp.S_App.GetPageURL() + '?SRN=' + SiebelApp.S_App.GetSRN(),
                    files: {
                        's_SweFileName': shot
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
                            }
                        } else {
                            //console.log(err);
                        }
                    }
                });
				$('#webcambox').dialog('destroy');
			
			
    };

    ATC_OCR_Form_AppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.ATC_OCR_Form_AppletPR.superclass.BindEvents.apply(this, arguments);

    }

    ATC_OCR_Form_AppletPR.prototype.EndLife = function () {
     SiebelAppFacade.ATC_OCR_Form_AppletPR.superclass.EndLife.apply(this, arguments);
    }
	
    return ATC_OCR_Form_AppletPR;
   }()
  );
  return "SiebelAppFacade.ATC_OCR_Form_AppletPR";
 })
}
