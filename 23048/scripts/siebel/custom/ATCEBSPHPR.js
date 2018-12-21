if (typeof (SiebelAppFacade.ATCEBSPHPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.ATCEBSPHPR");
    define("siebel/custom/ATCEBSPHPR", ["siebel/phyrenderer",
        "3rdParty/magnific-popup/jquery.magnific-popup",
        "3rdParty/jquery.nicescroll"],
        function () {
            SiebelAppFacade.ATCEBSPHPR = (function () {

                function ATCEBSPHPR(pm) {
                    SiebelAppFacade.ATCEBSPHPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(ATCEBSPHPR, SiebelAppFacade.PhysicalRenderer);

                ATCEBSPHPR.prototype.ShowUI = function () {
                    ATCEBSPHPR.superclass.ShowUI.apply(this, arguments);
                    var pm = this.GetPM(),
                        sURL = SiebelApp.S_App.GetClientURL().replace(/\/start.swe.+/g, '').replace(/^\//g, '');
                    //sURL=sURL==''?sURL:('/' +sURL);
					sURL=sURL ==''||sURL.substring(0,4) == "http"?sURL:('/' +sURL);
					console.log("sURL = ", sURL);
                    $.get(sURL + '/FILES/custom/photoAuditor.html',
                        function (data) {
                            pm.SetProperty("GetPHAudPopup", data);
                        });
                    $.get(sURL + '/FILES/custom/imageCaruselleHolder.html',
                        function (data) {
                            pm.SetProperty("GetCaruseleHolder", data);
                        });
                    $('#_sweview').append('<link rel="stylesheet" href="' + sURL + '/files/custom/magnific-popup-phau.css"/>');
                    if (typeof (Module) === "undefined") Module = {
                        filePackagePrefixURL: sURL + "/files/3rdParty/photomaker-js/",
                        memoryInitializerPrefixURL: sURL + "/files/3rdParty/photomaker-js/"
                    };
                    require(["3rdParty/photomaker-js/WebPhotoMaker"], function () {
                        var i = 0;
                    });
                }


                ATCEBSPHPR.prototype.OpenPopup = function () {
                    var pm = this.GetPM(),
                        that = this;
                    $.magnificPopup.open({
                        items: {
                            src: pm.Get('GetPHAudPopup'),
                            type: 'inline'
                        },
                        callbacks: {
                            open: this.drawOpenPopup.bind(this),
                            close: pm.closeVideoContext.bind(pm)
                        }

                    });
                }


                ATCEBSPHPR.prototype.drawOpenPopup = function () {
                    var pm = this.GetPM(),
                        overlay = $("#PhotoPopup #PhotoVideoCanvas"),
                        webcam = $('#PhotoPopup #PhotoVideoWebcam'),
                        bestShot = $("canvas#PhotoBestShot");                    
                    webcam.fadeIn(0);
                    overlay.fadeIn(0);
                    pm.SetProperty('GetOverlay', overlay);
                    pm.SetProperty('GetBestShot', bestShot);
                    pm.SetProperty('GetBestShotCC', bestShot[0].getContext("2d"));
                    pm.SetProperty('GetWebCam', webcam);
                    if (pm.Get("GetDebugData") == "true")
                        $('#PhotoDebugData').fadeIn(0);
                    pm.loadVideoContext(webcam, this.resizePopup.bind(this));
                    $('#PhotoPopupPhoto').removeAttr('disabled');
                    $('#PhotoPopupPhoto').click(pm.onCapture.bind(pm));
                    $("#PhotoPopupSave").click(function () {
                        pm.saveFullPhoto();
                        $.magnificPopup.close();
                    });
                    $('#PhotoPopupCancel').click(function () {
                        $.magnificPopup.close();
                    });
                    $('#PhotoFrameCarusele').niceScroll(".Wrap",{
                        cursorcolor: "#4f7cbd",
                        background: "#e6e6e6",
                        cursorborderradius: 0,
                        cursorwidth: "5px",
                        autohidemode: false,
                        cursorminheight: 92

                    });                    
                }

                ATCEBSPHPR.prototype.resizePopup = function () {
                    var pm = this.GetPM(),
                        videoCntrl = pm.Get("GetWebCam"),
                        overlay = pm.Get("GetOverlay"),
                        parentVideoCtr = videoCntrl.parent(),
                        coef = videoCntrl[0].clientHeight / videoCntrl[0].videoHeight,
                        leftPos = parentVideoCtr.width() / 2 - videoCntrl[0].clientWidth / 2;
                    videoCntrl.css({ left: leftPos });
                    overlay.css({
                        left: leftPos,
                        height: videoCntrl[0].clientHeight,
                        width: videoCntrl[0].clientWidth
                    });
                    overlay[0].height = videoCntrl[0].videoHeight;
                    overlay[0].width = videoCntrl[0].videoWidth;
                    pm.SetProperty('GetOverlayCC', overlay[0].getContext("2d"));
                    pm.SetProperty("GetLeftPosion", leftPos);
                    pm.SetProperty("GetClientWidth", parentVideoCtr.width());
                    pm.SetProperty("GetClientHeight", parentVideoCtr.height());
                    pm.SetProperty("GetVideoCoef", coef); 
                    var tmpObj = pm.addBlankPhotoCamera();
                    pm.setActiveFrame(tmpObj.id);
                    this.drawBestShot(tmpObj.url, tmpObj.id);
                }

                ATCEBSPHPR.prototype.visualizeDetection = function (detection, imageCheckInfo) {
                    var pm = this.GetPM(),
                        overlay = pm.Get("GetOverlay")[0],
                        overlayCC = pm.Get("GetOverlayCC");

                    this.drawClearOverlay(false);                    
                    var hasError = !this.drawErrorData(imageCheckInfo);
                    this.visualizeFaceDetection(overlayCC, detection, 10, this.getColor(hasError));
                    return !hasError;
                }

                ATCEBSPHPR.prototype.visualizeFaceDetection = function (ctx, xywh, radius, color) {
                    var coef = this.GetPM().Get("GetVideoCoef");
                    ctx.save();
                    ctx.strokeStyle = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", " + color[3] + ")";

                    ctx.lineWidth = 4;

                    try {
                        var sx = xywh.x;
                        var sy = xywh.y;
                        var ex = (xywh.x + xywh.width);
                        var ey = (xywh.y + xywh.height);
                        var r = radius;

                        var r2d = Math.PI / 180;

                        if ((ex - sx) - (2 * r) < 0) {
                            r = ((ex - sx) / 2);
                        } //ensure that the radius isn't too large for x
                        if ((ey - sy) - (2 * r) < 0) {
                            r = ((ey - sy) / 2);
                        } //ensure that the radius isn't too large for y
                        ctx.setLineDash([]);
                        ctx.beginPath();
                        ctx.moveTo(sx + r, sy);
                        ctx.lineTo(ex - r, sy);
                        ctx.arc(ex - r, sy + r, r, r2d * 270, r2d * 360, false);
                        ctx.lineTo(ex, ey - r);
                        ctx.arc(ex - r, ey - r, r, r2d * 0, r2d * 90, false);
                        ctx.lineTo(sx + r, ey);
                        ctx.arc(sx + r, ey - r, r, r2d * 90, r2d * 180, false);
                        ctx.lineTo(sx, sy + r);
                        ctx.arc(sx + r, sy + r, r, r2d * 180, r2d * 270, false);
                        ctx.closePath();

                        ctx.stroke();
                        ctx.restore();
                    } catch (err) {
                        console.log("BAD VALUE OF DETECTION");
                    }
                }

                ATCEBSPHPR.prototype.getColor = function (hasError) {
                    return hasError ? [255, 0, 0, 255] : [0, 255, 0, 255];
                }

                ATCEBSPHPR.prototype.translateImageXYCheck = function (data) {
                    var resString = "";
                    $.each(data, function (nam, val) {
                        if (!val) {
                            switch (nam) {
                                case "left":
                                    resString += "<p>Держите голову правее</p>";
                                    break;
                                case "top":
                                    resString += "<p>Держите голову ниже</p>";
                                    break;
                                case "right":
                                    resString += "<p>Держите голову левее</p>";
                                    break;
                                case "bottom":
                                    resString += "<p>Держите голову выше</p>";
                                    break;
                                case "dark":
                                    resString += "<p>Слишком темно. Добавьте освещенности.</p>"
                                    break;
                                case "dark":
                                    resString += "<p>Слишком светло. Уменьшите освещенность</p>"
                                    break;
                                case "gray", "blur":
                                    resString += "<p>Попробуйте другие настройки освещенности</p>";
                                    break;
                                case "predicted":
                                    resString += "<p>Лицо не найдено</p>";
                                    break;
                                case "speedSlow":
                                    resString += "<p>Слишком быстро</p>";
                                    break;
                                case "isFront":
                                    resString += "<p>Смотрите в камеру</p>";
                                    break;
                                case "minWidth":
                                    resString += "<p>Приблизьте камеру к клиенту</p > ";
                                    break;
                            }
                        }
                    });
                    return resString;
                }                

                ATCEBSPHPR.prototype.drawBestShot = function (url, id) {
                    var pm = this.GetPM();
                    if ($('ul#lightSlider li#li' + id).length > 0) {
                        $('ul#lightSlider li#li' + id + ' img#img' + id).attr('src', url);
                    }
                    else {
                        var htmlR = pm.Get("GetCaruseleHolder").replace(/{id}/g, id).replace(/{url}/g, url);
                        $('ul#lightSlider').prepend($(htmlR));
                        $('ul#lightSlider li#li' + id + ' .container').click(this.onCaruseleElementClick.bind(this, id));
                    }
                    $("#PhotoFrameCarusele").getNiceScroll().resize();
                }

                ATCEBSPHPR.prototype.onCaruseleElementClick = function (id, event) {
                    var pm = this.GetPM();
                    pm.setActiveFrame(id);
                }                                                                   

                ATCEBSPHPR.prototype.drawStatus = function (id, url, status,data) {

                    $('ul#lightSlider img').removeClass('container-active');
                    $('ul#lightSlider img#img' + id).addClass('container-active');

                    if (id != -1) {
                        switch (status) {
                            case "SUCCESS":
                                this.drawCheckSuccess(id, url);
                                break;
                            case "FAILED":
                                this.drawCheckFailed(id, url, data);
                                break;
                            case "INPROGRESS":
                                this.drawCheckInProgress(id, url);
                                break;
                            case "PHOTO":
                                this.drawCapture(id, url);
                                break;
                            case "CAMERAONLY":
                                this.drawCameraOnly(id, url);
                                break;
                        }
                    }
                }

                ATCEBSPHPR.prototype.drawClearOverlay = function (drawOnly)
                {
                    var pm = this.GetPM(),
                        overlay = pm.Get("GetOverlay")[0],
                        overlayCC = pm.Get("GetOverlayCC"),
                        heightX = Number(pm.Get("GetHeightX")),
                        height = overlay.height,
                        width = overlay.width,
                        lHeight = Number(pm.Get("GetQuadHeight")),
                        lWidth = Number(pm.Get("GetQuadWidth")),
                        lDelta = Number(pm.Get("GetQuadDelta")),
                        llineWidth = Number(pm.Get("GetLineWidth")),
                        lcolor = pm.Get("GetLineColor");

                    overlayCC.clearRect(0, 0, width, height);
                    if (drawOnly) {
                        overlayCC.save();
                    }
                    overlayCC.strokeStyle = lcolor;
                    overlayCC.lineWidth = llineWidth;
                    overlayCC.setLineDash([10, 10]);
                    overlayCC.beginPath();
                                                            
                    overlayCC.moveTo(width / 2, (height - lHeight)/2);
                    overlayCC.lineTo(width / 2, (height + lHeight) / 2 );

                    overlayCC.moveTo((width - lWidth) / 2, height / 2 - lHeight / 2 + (lHeight * heightX / 100));
                    overlayCC.lineTo((width + lWidth) / 2, height / 2 - lHeight / 2 + (lHeight * heightX / 100));
                    
                    overlayCC.stroke();
                    overlayCC.lineWidth = llineWidth * 2;                   
                    overlayCC.strokeStyle = lcolor;
                    overlayCC.setLineDash([]); 
                    overlayCC.beginPath();
                    overlayCC.moveTo(lDelta + (width - lWidth - lDelta) / 2, (height - lHeight - lDelta) / 2);
                    overlayCC.lineTo((width - lWidth - lDelta) / 2, (height - lHeight - lDelta) / 2);
                    overlayCC.lineTo((width - lWidth - lDelta) / 2, lDelta + (height - lHeight - lDelta) / 2);

                    overlayCC.moveTo(-lDelta + (width + lWidth + lDelta) / 2, (height - lHeight - lDelta) / 2);
                    overlayCC.lineTo((width + lWidth + lDelta) / 2, (height - lHeight - lDelta) / 2);
                    overlayCC.lineTo((width + lWidth + lDelta) / 2, lDelta + (height - lHeight - lDelta) / 2);

                    overlayCC.moveTo(lDelta + (width - lWidth - lDelta) / 2, (height + lHeight + lDelta) / 2);
                    overlayCC.lineTo((width - lWidth - lDelta) / 2, (height + lHeight + lDelta) / 2);
                    overlayCC.lineTo((width - lWidth - lDelta) / 2, -lDelta + (height + lHeight + lDelta) / 2);

                    overlayCC.moveTo(-lDelta + (width + lWidth + lDelta) / 2, (height + lHeight + lDelta) / 2);
                    overlayCC.lineTo((width + lWidth + lDelta) / 2, (height + lHeight + lDelta) / 2);
                    overlayCC.lineTo((width + lWidth + lDelta) / 2, -lDelta + (height + lHeight + lDelta) / 2);

                    overlayCC.stroke();

                    if (drawOnly) {                        
                        overlayCC.restore();
                    }

                }

                ATCEBSPHPR.prototype.drawCameraOnly = function (id, url) {
                    var pm = this.GetPM(),
                        activeFrame = pm.getActiveFrame();
                    this.drawClearOverlay(true);
                        
                    if (id == activeFrame) {
                        $('#PhotoPopupPhoto').attr('disabled', 'disabled');

                        $('#PhotoPopupPhoto').removeAttr('disabled');
                        $('#PhotoPopupPhoto').text("Фотографировать");
                        $('#PhotoPopupSave').attr('disabled', 'disabled');
                        
                        $('#PhotoCheckSuccess').fadeOut(0);
                        $('#PhotoCheckError').fadeOut(0);
                        $('#PhotoCheckInProgress').fadeOut(0);
                        $('#PhotoCheckInfo').fadeIn(0);
                        $('#PhotoCheckSystemError').fadeOut(0);

                        $('#PhotoVideoCanvas').fadeIn(0);
                        $('#PhotoVideoWebcam').fadeIn(0);

                        $('#PhotoImageHolder').fadeIn(0);
                        $('#PhotoImageHolder #PhotoImagePreview').attr("src", "");
                        $('#PhotoImageHolder #PhotoImagePreview').removeClass("CheckInProgress");                        
                        $('#PhotoImageHolder .PhotoImagePreviewInProgress').fadeOut(0);
                        $('#PhotoImageHolder #PhotoImagePreview').removeClass("PhotoImagePreviewError");
                        $('#PhotoHoverErrorMessage').fadeOut(0);
                    }

                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImagePreviewInProgress').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImageError').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImageSuccess').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider #img' + id).removeClass("CheckInProgress");                    
                    this.drawBestShot(url, id);
                }

                ATCEBSPHPR.prototype.drawSystemError = function () {
                    
                    $('#PhotoPopupPhoto').attr('disabled', 'disabled');                    
                    $('#PhotoPopupSave').attr('disabled', 'disabled');                    
                    $('#PhotoCheckSuccess').fadeOut(0);
                    $('#PhotoCheckError').fadeOut(0);
                    $('#PhotoCheckInProgress').fadeOut(0);
                    $('#PhotoCheckInfo').fadeOut(0);                   
                    $('#PhotoCheckSystemError').fadeIn(1);
                }


                ATCEBSPHPR.prototype.drawCapture = function (id, url) {                    

                    $('#PhotoPopupPhoto').removeAttr('disabled');
                    $('#PhotoPopupPhoto').text("Остановить");
                    $('#PhotoPopupSave').attr('disabled', 'disabled');
                    
                    $('#PhotoCheckSuccess').fadeOut(0);
                    $('#PhotoCheckError').fadeOut(0);
                    $('#PhotoCheckInProgress').fadeOut(0);
                    $('#PhotoCheckInfo').fadeIn(0);
                    $('#PhotoCheckSystemError').fadeOut(0);

                    $('#PhotoVideoCanvas').fadeIn(0);
                    $('#PhotoVideoWebcam').fadeIn(0);

                    $('#PhotoImageHolder').fadeIn(0);
                    $('#PhotoImageHolder #PhotoImagePreview').attr("src", "");
                    $('#PhotoImageHolder #PhotoImagePreview').removeClass("CheckInProgress");
                    $('#PhotoImageHolder .PhotoImagePreviewInProgress').fadeOut(0);
                    $('#PhotoImageHolder #PhotoImagePreview').removeClass("PhotoImagePreviewError");
                    $('#PhotoHoverErrorMessage').fadeOut(0);

                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImagePreviewInProgress').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImageError').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImageSuccess').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider #img' + id).removeClass("CheckInProgress");
                    this.drawBestShot(url, id);
                }

                ATCEBSPHPR.prototype.drawCheckInProgress = function (id, url ) {
                    var pm = this.GetPM(),
                        activeFrame = pm.getActiveFrame();
                    if (id == activeFrame) {

                        $('#PhotoPopupPhoto').attr('disabled', 'disabled');
                        $('#PhotoPopupPhoto').text("Фотографировать");
                        $('#PhotoPopupSave').attr('disabled', 'disabled');
                        
                        $('#PhotoCheckSuccess').fadeOut(0);
                        $('#PhotoCheckError').fadeOut(0);
                        $('#PhotoCheckInProgress').fadeIn(1);
                        $('#PhotoCheckInfo').fadeOut(0);
                        $('#PhotoCheckSystemError').fadeOut(0);

                        $('#PhotoVideoCanvas').fadeOut(0);
                        $('#PhotoVideoWebcam').fadeOut(0);

                        $('#PhotoImageHolder').fadeIn(0);
                        $('#PhotoImageHolder #PhotoImagePreview').attr("src", url);
                        $('#PhotoImageHolder #PhotoImagePreview').addClass("CheckInProgress");
                        $('#PhotoImageHolder .PhotoImagePreviewInProgress').fadeIn(0);
                        $('#PhotoImageHolder #PhotoImagePreview').removeClass("PhotoImagePreviewError");
                        $('#PhotoHoverErrorMessage').fadeOut(0);
                    }
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImagePreviewInProgress').fadeIn(0);
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImageError').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImageSuccess').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider #img' + id).addClass("CheckInProgress");
                }

                ATCEBSPHPR.prototype.drawCheckSuccess = function (id, url, data) {
                    var pm = this.GetPM(),
                        activeFrame = pm.getActiveFrame();
                    if (id == activeFrame) {
                        $('#PhotoPopupPhoto').removeAttr('disabled', 'disabled');
                        $('#PhotoPopupPhoto').text("Фотографировать");
                        $('#PhotoPopupSave').removeAttr('disabled', 'disabled');
                        
                        $('#PhotoCheckSuccess').fadeIn(1);
                        $('#PhotoCheckError').fadeOut(0);
                        $('#PhotoCheckInProgress').fadeOut(0);
                        $('#PhotoCheckInfo').fadeOut(0);
                        $('#PhotoCheckSystemError').fadeOut(0);

                        $('#PhotoVideoCanvas').fadeOut(0);
                        $('#PhotoVideoWebcam').fadeOut(0);

                        $('#PhotoImageHolder').fadeIn(0);
                        $('#PhotoImageHolder #PhotoImagePreview').attr("src", url);
                        $('#PhotoImageHolder #PhotoImagePreview').removeClass("CheckInProgress");
                        $('#PhotoImageHolder .PhotoImagePreviewInProgress').fadeOut(0);
                        $('#PhotoImageHolder #PhotoImagePreview').removeClass("PhotoImagePreviewError");
                        $('#PhotoHoverErrorMessage').fadeOut(0);
                    }

                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImagePreviewInProgress').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImageError').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImageSuccess').fadeIn(0);
                    $('#PhotoFrameCarusele #lightSlider #img' + id).removeClass("CheckInProgress");
                }

                ATCEBSPHPR.prototype.translateFailedInfo = function (data) {
                    var subRes = {}, res = "", hasDefault = false;
                    $.each(data.fullError, function (name, val) {
                        var resTmp = ""
                        if (val) {
                            switch (name) {
                                case 'CheckImageIllegalFaceVerticalPos':
                                case 'CheckImageIllegalFaceHorizontalPos':
                                    resTmp = "Лицо не полностью находится в кадре. Поместите лицо в ограничивающую рамку";
                                    break;
                                case 'CheckImageCantDetectOneFace':
                                    resTmp = "Лицо отсутствует или два лица в кадре";
                                    break;
                                case 'CheckImageIllegalHeadPosZ':
                                    resTmp = "Зафиксирован поворот головы";
                                    break;
                                case 'CheckImageIllegalHeadPosX':
                                    resTmp = "Зафиксирован наклон головы";
                                    break;
                                case 'CheckImageIllegalHeadPosY':
                                    resTmp = "Зафиксирован наклон головы. Поднимите или опустите подбородок";
                                    break;
                                    case 'CheckImageIllegalEyeDistance':
                                    resTmp = "Лицо находится слишком далеко";
                                    break;
                                case 'CheckImageIllegalHeadHorizontalSize':
                                case 'CheckImageIllegalHeadVerticalSize':
                                    resTmp = "Лицо находится слишком далеко. Поместите лицо в ограничивающую рамку";
                                    break;
                                default:
                                    hasDefault = true;
                                    break;
                            }
                            subRes[resTmp] = 1;
                        }                      
                    });
                    $.each(subRes, function (name, val) {
                        res += '<p>' + name + '</p>';
                        });
                    if (hasDefault)
                        res +='<p>Проблема с настройкой изображения. Необходимо обратиться в тех. поддержку.</p>'
                    return res;
                }

                ATCEBSPHPR.prototype.drawCheckFailed = function (id, url, data) {
                    var pm = this.GetPM(),
                        activeFrame = pm.getActiveFrame();
                    if (id == activeFrame) {
                        $('#PhotoPopupPhoto').removeAttr('disabled');
                        $('#PhotoPopupPhoto').text("Фотографировать"); 
                        $('#PhotoPopupSave').attr('disabled', 'disabled');                        
                
                        $('#PhotoCheckSuccess').fadeOut(0);
                        $('#PhotoCheckError').fadeIn(1);
                        $('#PhotoCheckInProgress').fadeOut(0);
                        $('#PhotoCheckInfo').fadeOut(0);
                        $('#PhotoCheckSystemError').fadeOut(0);

                        $('#PhotoVideoCanvas').fadeOut(0);
                        $('#PhotoVideoWebcam').fadeOut(0);

                        $('#PhotoImageHolder').fadeIn(0);
                        $('#PhotoImageHolder #PhotoImagePreview').attr("src", url);
                        $('#PhotoImageHolder #PhotoImagePreview').removeClass("CheckInProgress");
                        $('#PhotoImageHolder .PhotoImagePreviewInProgress').fadeOut(0);
                        $('#PhotoImageHolder #PhotoImagePreview').addClass("PhotoImagePreviewError");
                        $('#PhotoHoverErrorMessage').fadeIn(0);
                        $('#PhotoHoverErrorMessageText').html(this.translateFailedInfo(data));
                    }

                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImagePreviewInProgress').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImageError').fadeIn(0);
                    $('#PhotoFrameCarusele #lightSlider li#li' + id + ' .PhotoImageSuccess').fadeOut(0);
                    $('#PhotoFrameCarusele #lightSlider #img' + id).removeClass("CheckInProgress");
                }

                ATCEBSPHPR.prototype.drawErrorData = function (imageCheckInfo) {
                    var text = this.translateImageXYCheck(imageCheckInfo),
                        hasError = text != "";
                    if (hasError) {
                        $('#PhotoInfoData').fadeIn(0);
                        $('#PhotoInfoData').html(text);
                    }
                    else
                        $('#PhotoInfoData').fadeOut(0);
                    return !hasError;
                }
                
                ATCEBSPHPR.prototype.drawDebugData = function (id, data) {
                    var pm = this.GetPM(),
                        debug = pm.Get("GetDebugData") == "true";
                    if (debug)
                        if ($('#PhotoDebugData li#' + id).length > 0)
                            $('#PhotoDebugData li#' + id).text(id + ' = ' + JSON.stringify(data, null, ' '));
                        else
                            $('#PhotoDebugData ul').append('<li id="' + id + '">' + id + ' =' + JSON.stringify(data, null, ' ') + '</li>');
                }

                ATCEBSPHPR.prototype.drawStopCapture = function (id) {                    
                    this.drawClearOverlay(true);
                    this.drawErrorData({});
                    $('#PhotoPopupPhoto').text("Фотографировать");
                }

                return ATCEBSPHPR;
            }()
            );
            return "SiebelAppFacade.ATCEBSPHPR";
        })
}
