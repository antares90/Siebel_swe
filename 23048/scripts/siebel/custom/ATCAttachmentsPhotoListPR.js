//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopList&name=ATCAttachmentsPhotoList&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATCAttachmentsPhotoListPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCAttachmentsPhotoListPR");
 define("siebel/custom/ATCAttachmentsPhotoListPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.ATCAttachmentsPhotoListPR = (function () {

    function ATCAttachmentsPhotoListPR(pm) {
     SiebelAppFacade.ATCAttachmentsPhotoListPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCAttachmentsPhotoListPR, SiebelAppFacade.JQGridRenderer);

    ATCAttachmentsPhotoListPR.prototype.Init = function () {
     SiebelAppFacade.ATCAttachmentsPhotoListPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATCAttachmentsPhotoListPR:      Init method reached.");

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
    }

    ATCAttachmentsPhotoListPR.prototype.afterInit = function () {
            
    };

    ATCAttachmentsPhotoListPR.prototype.ShowUI = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATCAttachmentsPhotoListPR:      ShowUI method reached.");
     SiebelAppFacade.ATCAttachmentsPhotoListPR.superclass.ShowUI.apply(this, arguments);
            var pm = this.GetPM();
            $('#a_1').append("<div class='photo-popup' id='prew1'><img style='max-width:100%; display:none; padding:0;' id='prew' src=''/></div>");
            var inPropSet = CCFMiscUtil_CreatePropSet();
            var ai= {};
            ai.async = true;
            ai.selfbusy = true;
            ai.scope = this;
            ai.mask = true;
            ai.opdecode = true;

            $( "#s_1_1_20_0s_SweFileName" ).change(function() {
                var file = this.files[0];
                var reader = new FileReader();
                
                reader.onload = function(event) {
                    the_url = event.target.result;
                    $('#prew').attr('src',the_url);
                    $('#prew').dialog(
                    {
                        buttons: 
                        {
                            "сохранить": function() {
                                pm.ExecuteMethod ("NewFileAttachment");
                                $(this).dialog('destroy');
                            },
                            "отмена": function() {
                                pm.ExecuteMethod("InvokeMethod", "UndoRecord", inPropSet, ai);
                                $(this).dialog('destroy');
                            }
                        }
                    });
                }
            //when the file is read it triggers the onload event above.
            reader.readAsDataURL(file);
        });
    }

    

    ATCAttachmentsPhotoListPR.prototype.BindData = function (bRefresh) {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATCAttachmentsPhotoListPR:      BindData method reached.");
     SiebelAppFacade.ATCAttachmentsPhotoListPR.superclass.BindData.apply(this, arguments);
        $('.drilldown').click($.proxy(this.showImage, this));
    }

    ATCAttachmentsPhotoListPR.prototype.showPopup = function (event) {
                var file = this.GetPM().Get('File');
                var doc = this.GetPM().Get('Current Doc');

                if (!doc || !file)
                    return false;

                $('#preview-box').html('');

                var self = this;
                FileAPI.Image(file)
                    .preview()
                    .get(function (err, image) {
                        // Если не было ошибок, то вставляем изображение
                        if (!err) {
                            // Конвертим в картинку, чтобы не заморачиваться с масштабированиями
                            var dataurl = image.toDataURL("image/png");
                            var img = new Image();
                            img.onload = function(){
                                $('#preview-box').html(img);
                                self.resizePopup();
                            }
                            img.src = dataurl;
                        }
                    });

                return false;
            }

    ATCAttachmentsPhotoListPR.prototype.showImage = function (event) {
        var placeHolder = this.GetPM().Get("GetPlaceholder") || "div";
        console.log(placeHolder);
        this.popupContainer = "photo-popup-container-" + placeHolder;
        $('#' + placeHolder).append("<div class='photo-popup' id='" + this.popupContainer + "' style='display: none;'><img id='popup-photo' src='' /></div>");
    }

    ATCAttachmentsPhotoListPR.prototype.selectFile = function (evt) {
                this.GetPM().resetCurrentDoc();
                this.setCurrentDoc(evt);
                var file = FileAPI.getFiles(evt)[0];
                if (!file)
                    return false;
                this.GetPM().SetProperty('File', file);
                this.showPopup(evt);
            }

    ATCAttachmentsPhotoListPR.prototype.DownloadFile = function (ps) {

        var subUrl = ps.GetProperty(consts.get("SWE_RPC_PROP_URL")) +  SiebelApp.S_App.GetSRN();
        //var url1 = SiebelApp.S_App.GetPageURL();
        //var url2 = SiebelApp.S_App.GetSRN();
        //var subUrl = "http://192.168.15.201/fins_oui_rus/start.swe?SWECmd=GetFile&SWEC=141&SRN=yJnpAyrw90d6KNcsD8uHB3bfwvIvDcTeZhH2f81MtPYb";

        if (!subUrl)
            return;

        $('#popup-photo').attr('src', subUrl);
        $('#popup-photo').load($.proxy(this.showPhoto, this));

    }


    ATCAttachmentsPhotoListPR.prototype.BindEvents = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATCAttachmentsPhotoListPR:      BindEvents method reached.");
     SiebelAppFacade.ATCAttachmentsPhotoListPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATCAttachmentsPhotoListPR.prototype.showPhoto = function () {

        $('#' + this.popupContainer).dialog({
            modal: true,
            close: $.proxy(this.closePopup, this),
            height: 'auto',
            width: 'auto',
            minWidth: 500
        });
        SiebelApp.S_App.uiStatus.Free();
    }

     ATCAttachmentsPhotoListPR.prototype.closePopup = function (event, ui) {

        $('#popup-photo').attr('src', '');

    }

    ATCAttachmentsPhotoListPR.prototype.EndLife = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATCAttachmentsPhotoListPR:      EndLife method reached.");
     SiebelAppFacade.ATCAttachmentsPhotoListPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATCAttachmentsPhotoListPR;
   }()
  );
  return "SiebelAppFacade.ATCAttachmentsPhotoListPR";
 })
}
