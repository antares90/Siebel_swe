if (typeof (SiebelAppFacade.ATCEBSPHPM) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.ATCEBSPHPM");
    define("siebel/custom/ATCEBSPHPM", ["siebel/pmodel", "3rdParty/adapter-master/release/adapter", "3rdParty/photomaker-js/smoother"],//"3rdParty/photomaker-js/fpsmeter.min.j"],
        function () {
            SiebelAppFacade.ATCEBSPHPM = (function () {

                function ATCEBSPHPM(pm) {
                    SiebelAppFacade.ATCEBSPHPM.superclass.constructor.apply(this, arguments);
                }
                SiebelJS.Extend(ATCEBSPHPM, SiebelAppFacade.PresentationModel);
                var LivenessState = {
                    NOT_STARTED: 0,
                    STARTED: 1,
                    OPENED_FIRST_TIME: 2,
                    CLOSED: 3,
                    OPENED_SECOND_TIME: 4,
                    FINISHED: 5
                };

                ATCEBSPHPM.prototype.Init = function () {
                    SiebelAppFacade.ATCEBSPHPM.superclass.Init.call(this);                    
                    this.AddProperty('GetApplet', SiebelApp.S_App.GetMainView().GetAppletMap()[this.Get('GetName')]);
                    this.AddProperty('GetView', SiebelApp.S_App.GetMainView());
                    var viewPM = SiebelAppFacade.ComponentMgr.FindComponent({ id: SiebelApp.S_App.GetMainView().GetName() }).GetPM();
                    this.AddProperty("GetViewPM", viewPM);
                    viewPM.SetProperty("GetCheckPhoto", this.OpenCheckPhotoPopup.bind(this));
                    
                    
                    this.AddProperty('GetMinWidth', 1920); 
                    this.AddProperty('GetMinHeight', 1080); 
                    this.AddProperty('GetIdealWidth', 1920); 
                    this.AddProperty('GetIdealHeight', 1080);
                    this.AddProperty('GetWidth', 0); 
                    this.AddProperty('GetHeight', 0); 
                    this.AddProperty('GetNextId', 0);
                    this.AddProperty('GetHeightX', '50');
                    this.AddProperty('GetLineWidth', 4);
                    this.AddProperty('GetLineColor', 'rgba(76,255,0,255)');
                    this.AddProperty('GetQuadWidth',480);
                    this.AddProperty('GetQuadHeight',640);
                    this.AddProperty('GetQuadDelta',100)
                    this.AddProperty('GetPortraitMaxHeight', 1000);
                    this.AddProperty('GetDetectionSmoothing', 0.9999999)
                    this.AddProperty('GetDebugData', false);
                    this.AddProperty('GetBestShotMinWidth', 640);
                    this.AddProperty('GetMovementThreshold', 0.1);
                    this.AddProperty('GetBestShotScoreThreshold', 0.2);
                    this.AddProperty('GetRotationThreshold', 5);
                    this.AddProperty('GetMaxNumberOfFramesWithoutDetection', 8);
                    this.AddProperty('GetDocType', null);
                    this.AddProperty('GetSomeTimeOut', 3000);
                    this.AddProperty('GetImageMimeType', 'image/png');
                    
                                        
                    this.AddProperty('GetPhotoBlobData', { data: [] });
                    this.AddProperty('GetSmoother', null);
                    this.AddMethod('InvokeMethod', this.PreInvokeMethod, {
                        sequence: true,
                        scope: this
                    });
                }

                ATCEBSPHPM.prototype.Setup = function (prop) {
                    ATCEBSPHPM.superclass.Setup.call(this, prop);
                    this.getConfig("PhotoProfile");
                }

                ATCEBSPHPM.prototype.getConfig = function (profileName) {
                    var bs = SiebelApp.S_App.GetService("ATC EBS Proxy Service"),
                        ps = SiebelApp.S_App.NewPropertySet();
                    ps.SetProperty("ProfileName", profileName);
                    var psOut = bs.InvokeMethod("GetConfig", ps),
                        psRes = psOut.GetChildByType("ResultSet"),
                        audioData = [];

                    if (!!psRes)
                        for (var i = 0; i < psRes.GetChildCount(); i++) {
                            psChild = psRes.GetChild(i);
                            this.SetProperty("Get" + psChild.GetProperty("Name"), psChild.GetProperty("Value"));
                        }
                }

                ATCEBSPHPM.prototype.PreInvokeMethod = function (methodName, psIn, arg, retVal) {
                    if (methodName == "CheckAudio") {
                        this.GetRenderer().OpenPopup();
                        setCancelOperation(retVal);
                    }
                }

                function setCancelOperation(retVal) {
                    retVal.CancelOperation = true, retVal.ReturnValue = true, retVal.CancelPost = true;
                    SiebelApp.S_App.uiStatus.Free();
                }

                ATCEBSPHPM.prototype.OpenCheckPhotoPopup = function () {
                    this.GetRenderer().OpenPopup();
                }

                ATCEBSPHPM.prototype.loadVideoContext = function (videoControl, resizeCallback) {
                    var config = {
                        video: {
                            width: { min: this.Get("GetMinWidth"), ideal: this.Get("GetIdealWidth") },
                            height: { min: this.Get("GetMinHeight"), ideal: this.Get("GetIdealHeight") }
                        }
                    }
                    try {
                        var pm = this;
                        this.SetProperty("GetVideoControl", videoControl);
                    }
                    catch (e) {
                        alert('No web video support in this browser!');
                    }
                    navigator.getUserMedia(config, function (stream) {
                        var videoControl = pm.Get("GetVideoControl");
                        pm.SetProperty("GetVideoStream", stream);
                        videoControl.attr('src', window.URL.createObjectURL(stream));
                        videoControl.on('loadedmetadata', function () {
                            videoControl.trigger('play');
                            pm.SetProperty("GetWidth", this.videoWidth);
                            pm.SetProperty("GetHeight", this.videoHeight);
                            resizeCallback();
                            pm.Initialize();
                            pm.setActiveFrame();
                        });
                    }, function (e) {
                        pm.GetRenderer().drawSystemError();
                    });
                }
                ATCEBSPHPM.prototype.EndLife = function () {
                    this.closeVideoContext();
                }

                ATCEBSPHPM.prototype.closeVideoContext = function () {
                    this.SetProperty("doCapture",false);
                    var videoStream = this.Get("GetVideoStream");
                    if (!!videoStream) {
                        var videoTracks = videoStream.getVideoTracks() || [];
                        videoTracks.forEach(function (elem) { elem.stop() });
                        if (!this.Get("GetPhotoMaker")) {
                        //    this.Get("GetPhotoMaker").delete();
                        //    this.SetProperty("GetPhotoMaker", null);
                            var nativeFrameBuffer = this.Get("GetNativeFrameBuffer"),
                                nativeFrameBufferData = this.Get("GetNativeFrameBufferData"),
                                nativeBestShotBuffer = this.Get("GetNativeBestShotBuffer"),
                                nativeBestShotBufferData = this.Get("GetNativeBestShotBufferData");
                           // Module._free(nativeFrameBuffer);
                           // nativeFrameBufferData.delete();
                           // Module._free(nativeBestShotBuffer);
                           // nativeBestShotBufferData.delete();
                        }
                    }
                    this.SetProperty('GetPhotoBlobData', { data: [] });
                }

                ATCEBSPHPM.prototype.Initialize = function () {
                    var width = this.Get("GetWidth"),
                        height = this.Get("GetHeight"),
                        buffer = document.createElement("canvas");
                    buffer.width = width;
                    buffer.height = height;
                    this.SetProperty("GetBuffer", buffer);
                    this.SetProperty("GetBufferCC", buffer.getContext('2d'));


                    var overlay = this.Get("GetOverlay");
                    overlay.width = width;
                    overlay.height = height;


                    // compute staging memory requirements
                    var bufferSize = width * height * 4;

                    // allocate staging memory
                    var nativeFrameBuffer = SiebelApp.S_App.nativeFrameBuffer||Module._malloc(bufferSize),
                        nativeFrameBufferData = SiebelApp.S_App.nativeFrameBufferData||new Uint8ClampedArray(
                            Module.HEAPU8.buffer,
                            nativeFrameBuffer, bufferSize),
                        nativeBestShotBuffer = SiebelApp.S_App.nativeBestShotBuffer|| Module._malloc(bufferSize),
                        nativeBestShotBufferData = SiebelApp.S_App.nativeBestShotBufferData|| new Uint8ClampedArray(
                            Module.HEAPU8.buffer,
                            nativeBestShotBuffer, bufferSize),
                        photoMaker = SiebelApp.S_App.photoMaker|| new Module.WebPhotomaker();
                    this.SetProperty("GetNativeFrameBuffer", nativeFrameBuffer);                    
                    this.SetProperty("GetNativeFrameBufferData", nativeFrameBufferData);
                    this.SetProperty("GetNativeBestShotBuffer", nativeBestShotBuffer);
                    this.SetProperty("GetNativeBestShotBufferData", nativeBestShotBufferData);
                    SiebelApp.S_App["nativeFrameBuffer"] = nativeFrameBuffer;
                    SiebelApp.S_App["nativeFrameBufferData"] = nativeFrameBufferData;
                    SiebelApp.S_App["nativeBestShotBuffer"] = nativeBestShotBuffer;
                    SiebelApp.S_App["nativeBestShotBufferData"] = nativeBestShotBufferData;
                    SiebelApp.S_App["photoMaker"] = photoMaker;

                    photoMaker.setStopAfterBestShot(false);
                    photoMaker.setMovementThreshold(Number(this.Get("GetMovementThreshold")));
                    photoMaker.setBestShotScoreThreshold(Number(this.Get("GetBestShotScoreThreshold")));
                    photoMaker.setRotationThreshold(Number(this.Get("GetRotationThreshold")));
                    photoMaker.setMaxNumberOfFramesWithoutDetection(Number(this.Get("GetMaxNumberOfFramesWithoutDetection")));
                    photoMaker.setPortraitMaxHeight(Number(this.Get("GetPortraitMaxHeight")));
                    this.SetProperty("GetPhotoMaker", photoMaker);
                }

                ATCEBSPHPM.prototype.capture = function () {
                    if (this.Get("GetVideoStream")) {
                        if (!this.process() && this.Get("doCapture"))
                            requestAnimationFrame(this.capture.bind(this));
                        if (!this.Get("doCapture")) {
                            this.GetRenderer().drawStopCapture(this.getActiveFrame());
                            this.setActiveFrame(-1);
                        }
                    }

                }

                ATCEBSPHPM.prototype.process = function () {
                    // var meter = this.Get("GetMeter");

                    // meter.tickStart();
                    // download video frame data to a canvas buffer
                    var bufferCC = this.Get("GetBufferCC"),
                        video = this.Get("GetVideoControl")[0],
                        width = this.Get("GetWidth"),
                        height = this.Get("GetHeight"),
                        res = false;
                    bufferCC.drawImage(video, 0, 0, width, height);

                    // take the buffer contents
                    var bufferImageData = bufferCC.getImageData(0, 0, width, height);

                    // convert image data to typed byte array (raw bytes)
                    this.Get("GetNativeFrameBufferData").set(bufferImageData.data, 0);

                    // process raw bytes
                    var photoMaker = this.Get("GetPhotoMaker");
                    photoMaker.submitRawImage(this.Get("GetNativeFrameBuffer"), width, height);
                    photoMaker.update();

                    var detectionSmoothing = this.Get("GetDetectionSmoothing");
                    var imageValid = false;
                    if (photoMaker.haveFaceDetection()) {
                        var detection = photoMaker.getSmoothedFaceDetection();
                        detection = this.getSmootherDetection(detection);
                        var imageCheckInfo = this.imageXYCheck(detection, photoMaker.faceDetectionIsPredicted(), photoMaker.isSlowMovement(), photoMaker.getQualityEstimation());
                        imageValid = this.GetRenderer().visualizeDetection(
                            detection,
                            imageCheckInfo);                        
                        this.GetRenderer().drawDebugData("QE", photoMaker.getQualityEstimation());
                        this.GetRenderer().drawDebugData("imageXYCheck", imageCheckInfo);
                        this.GetRenderer().drawDebugData("detection", detection);
                    }
                    else
                        this.SetProperty("GetSmoother", null);

                    if (photoMaker.haveBestShot() && imageValid) {
                        photoMaker.getBestShotRaw(this.Get("GetNativeBestShotBuffer"));
                        var portraitWidth = photoMaker.getBestShotWidth(),
                            portraitHeight = photoMaker.getBestShotHeight(),
                            isFront = photoMaker.isFrontalPose(),
                            imageCheck = this.bestShotImageCheck(portraitWidth, portraitHeight, isFront, photoMaker.getQualityEstimation());

                        if (this.GetRenderer().drawErrorData(imageCheck)) {
                            this.getBestShot(this.Get("GetNativeBestShotBufferData"), portraitWidth, portraitHeight);
                            res = true;
                        }
                        else
                        {
                            setTimeout(function () { photoMaker.reset(); }, Number(this.Get("GetSomeTimeOut")));                            
                        }
                    }
                    return res;
                }
             
                ATCEBSPHPM.prototype.saveFullPhoto = function () {
                    var that = this,
                        formData = new FormData();
                    formData.append('SWEView', this.Get("GetView").GetName());
                    formData.append('SWEApplet', this.Get("GetName"));
                    formData.append('SWECmd', 'InvokeMethod');
                    formData.append('SWEMethod', 'NewFileAttachment');
                    formData.append('SWETS', new Date().getTime());
                    formData.append('SWERPC', '1');
                    formData.append('SWERowIds', '');
                    formData.append('SWEP', '');
                    var blobArr = this.Get("GetPhotoBlobData"),
                        curId = this.getActiveFrame();
                    $.each(blobArr.data, function (nam, val) {
                        if (val.id == curId)
                            formData.append('s_SweFileName', val.blob, "photo" + new Date().getTime().toString() + ".png");
                    });                    
                   
                    jQuery.ajax({
                        url: SiebelApp.S_App.GetPageURL() + '?SRN=' + SiebelApp.S_App.GetSRN(),
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        method: 'POST',
                        type: 'POST',
                        success: this.saveOtherFields.bind(this)
                    });
                }
                ATCEBSPHPM.prototype.getSmootherDetection = function (detection) {
                    var smoother = this.Get("GetSmoother"),
                        detectionSmoothing = Number(this.Get("GetDetectionSmoothing"));
                    if (!smoother) {
                        smoother = new Smoother([
                            detectionSmoothing,
                            detectionSmoothing,
                            detectionSmoothing,
                            detectionSmoothing], detection);
                        this.SetProperty("GetSmoother", smoother);
                    }
                    else
                        detection = smoother.smooth(detection);
                    return detection;
                }

                ATCEBSPHPM.prototype.copyFromArrayToCanvas = function (tempImageData, nativeBestShotBufferData, portraitWidth, portraitHeight,top,realHeight) {
                    for (var i = 0; i < realHeight; i++) {
                        for (var j = 0; j < portraitWidth; j++) {
                            for (var k = 0; k < 4; k++) {
                                tempImageData.data[i * 4 * portraitWidth + j * 4 + k] = nativeBestShotBufferData[(i+top) * 4 * portraitWidth + j * 4 + k];
                            }
                        }
                    }
                }

                ATCEBSPHPM.prototype.bestShotImageCheck = function (width, height, front, qualityEstimation) {

                    if (qualityEstimation.dataIsCorrect)
                        return {
                            minWidth: width > Number(this.Get("GetBestShotMinWidth")),
                            height: true,
                            isFront: front,
                            dark: qualityEstimation.dark >= qualityEstimation.threshold,
                            light: qualityEstimation.light >= qualityEstimation.threshold,
                            gray: qualityEstimation.gray >= qualityEstimation.threshold,
                            blur: qualityEstimation.blur >= qualityEstimation.threshold,
                            quality: qualityEstimation.quality >= qualityEstimation.threshold,

                        }
                    else
                        return {
                            minWidth: width > Number(this.Get("GetBestShotMinWidth")),
                            height: true,
                            isFront: front
                        }
                }

                ATCEBSPHPM.prototype.imageXYCheck = function (detection, predicted, speedSlow, qualityEstimation) {
                    var coef = this.Get("GetVideoCoef"),
                        leftPos = this.Get("GetLeftPosion"),
                        width = this.Get("GetClientWidth"),
                        height = this.Get("GetClientHeight"),
                        sx = detection.x * coef + leftPos,
                        sy = detection.y * coef,
                        ex = (detection.x + detection.width) * coef + leftPos,
                        ey = (detection.y + detection.height) * coef;
                    if (qualityEstimation.dataIsCorrect)
                        return {
                            left: sx > 0,
                            top: sy > 0,
                            right: ex < width,
                            bottom: ey < height,
                            dark: qualityEstimation.dark >= qualityEstimation.threshold,
                            light: qualityEstimation.light >= qualityEstimation.threshold,
                            gray: qualityEstimation.gray >= qualityEstimation.threshold,
                            blur: qualityEstimation.blur >= qualityEstimation.threshold,
                            quality: qualityEstimation.quality >= qualityEstimation.threshold,
                            predicted: !predicted,
                            speedSlow: speedSlow
                        }
                    else
                        return {
                            left: sx > 0,
                            top: sy > 0,
                            right: ex < width,
                            bottom: ey < height,
                            predicted: !predicted,
                            speedSlow: speedSlow
                        }
                }
                                 


                ATCEBSPHPM.prototype.checkImage = function (blob, url, id) {
                    var that = this;
                    this.GetRenderer().drawStatus(id, url, "INPROGRESS");
                    $.ajax({
                        url: this.getCheckImageUrl(),
                        type: 'POST',
                        data: blob,
                        processData: false,
                        contentType: false,
                        success: this.onCheckSuccess.bind(this, id),
                        error: this.onCheckFailed.bind(this, id)
                    });
                }


                ATCEBSPHPM.prototype.onCheckFailed = function (id, data) {
                    var blobArr = this.Get("GetPhotoBlobData");
                    var url = "";
                    $.each(blobArr.data, function (name, val) {
                        if (val.id == id) {
                            url = val.url;
                            val.status = "FAILED";
                            status = val.status;
                            val.data = data;
                        }
                    });
                    if (status != "") {
                        this.addBlankPhotoCamera();
                        this.GetRenderer().drawBestShot(tmpObj.url, tmpObj.id);
                        this.GetRenderer().drawStatus(id, url, status, data);
                    }
                }

                ATCEBSPHPM.prototype.onCheckSuccess = function (id, data) {
                    var blobArr = this.Get("GetPhotoBlobData"),
                        url = "",
                        status = "";
                    $.each(blobArr.data, function (name, val) {
                        if (val.id == id) {
                            url = val.url;
                            val.status = data.Result == 1 ? "SUCCESS" : "FAILED";
                            status = val.status;
                            val.data = data;
                        }
                    }
                    );        
                    if (status != "") {
                        this.GetRenderer().drawStatus(id, url, status, data);
                        var tmpObj = this.addBlankPhotoCamera();
                        this.GetRenderer().drawBestShot(tmpObj.url, tmpObj.id);
                    }
                }

                ATCEBSPHPM.prototype.onCapture = function () {
                    var id = this.getCurrentId(),
                        blobArr = this.Get("GetPhotoBlobData"),
                        captureFlg = true,                       
                        index = -1;
                    $.each(blobArr.data, function (num, val) {
                        if (val.id == id) {
                            captureFlg = val.status != "PHOTO";                           
                            index = num;
                        }
                    });
                    if (captureFlg) {
                        $.each(blobArr.data, function (num, val) {
                            if (val.status == "CAMERAONLY") {
                                id = val.id;
                                val.status = "PHOTO";
                            }
                        }
                        );
                        this.setActiveFrame(id);
                        this.SetProperty("doCapture", true);
                        this.Get("GetPhotoMaker").reset();
                        this.capture();
                    }
                    else {
                        $.each(blobArr.data, function (num, val) {
                            if (val.status == "PHOTO") {
                                id = val.id;
                                val.status = "CAMERAONLY";
                            }
                        }
                        );
                        this.setActiveFrame(id);
                        this.SetProperty("doCapture", false);
                    }
                }            

                ATCEBSPHPM.prototype.addBlankPhotoCamera = function ()
                {
                    var blobArr = this.Get("GetPhotoBlobData"),
                        id = this.getNextId();
                    blobArr.data.push({ id: id, url: 'IMAGES/custom/VoiceRecorderImages/photo-camera.png', blob: null, status: "CAMERAONLY" ,data:null});                                
                    return {
                        id: id,
                        url: 'IMAGES/custom/VoiceRecorderImages/photo-camera.png'
                    }
                }


                ATCEBSPHPM.prototype.setActiveFrame = function (id) {
                    var prevActiveFrame = this.Get("GetActiveFrame") || id,
                        url = "",
                        status = "",
                        data = {},
                        blobArr = this.Get("GetPhotoBlobData"),
                        pm = this;
                    if (id != prevActiveFrame) {
                        $.each(blobArr.data, function (name, val) {
                            if (val.id == prevActiveFrame) {
                                if (val.status == "PHOTO") {
                                    val.status = "CAMERAONLY";
                                    pm.SetProperty("doCapture", false);
                                }
                            }
                        });
                    }
                    $.each(blobArr.data, function (name, val) {
                        if (val.id == id||id==-1) {
                            id = val.id;
                            url = val.url;
                            status = val.status;
                            data = val.data;
                        }
                    });
                    this.SetProperty("GetActiveFrame", id);                    
                    this.GetRenderer().drawStatus(id, url, status,data);
                }

                ATCEBSPHPM.prototype.getActiveFrame = function (id) {
                    return this.Get("GetActiveFrame");
                }

                ATCEBSPHPM.prototype.getCurrentId = function ()
                {
                    return this.Get("GetNextId");
                }

                ATCEBSPHPM.prototype.getNextId = function()
                {
                    var id = this.Get("GetNextId");
                    id++;
                    this.SetProperty("GetNextId", id);                    
                    return id;                    
                }


                ATCEBSPHPM.prototype.getDocType = function () {
                    return this.Get("GetDocType") || 'Заявление';
                }   

                ATCEBSPHPM.prototype.getCheckImageUrl = function () {
                    var url = this.Get("GetCheckVoiceURL");
                    if (!url) {
                        throw "Не настроен параметр CheckVoiceURL";
                    }
                    //return "http://192.168.10.50:8083/CI";
                    return url;                    
                }

                ATCEBSPHPM.prototype.GetRealHeight = function (nativeBestShotBufferData,portraitWidth,portraitHeight)
                {
                    var topElem = 0, realHeight=0;
                    for (var i = 0; i < portraitHeight; i++) {
                        var all00 = 0;
                        for (var j = 0; j < portraitWidth; j++) {
                            var checkFF = 0, check00 = 0;
                            for (var k = 0; k < 4; k++) {
                                var tmp = nativeBestShotBufferData[i * 4 * portraitWidth + j * 4 + k];
                                if (tmp == 0||tmp==255)
                                    check00++;                                
                            }
                            if (check00 >= 3)
                                all00++;
                        }
                        if (all00 == portraitWidth) {
                            if (realHeight == 0)
                                topElem++;
                        }
                        else
                            realHeight++;
                        if (realHeight > 878)
                            var hhbh = 0;
                    }
                    return {
                        topElem: topElem,
                        realHeight: realHeight,
                        bottomElem: portraitHeight - realHeight - topElem
                    }
                }

                ATCEBSPHPM.prototype.getBestShot = function (nativeBestShotBufferData, portraitWidth, portraitHeight) {
                    var
                        pm=this,
                        bestShot = this.Get("GetBestShot")[0],
                        bestShotCC = this.Get("GetBestShotCC"),
                        render = this.GetRenderer(),
                        realHeight = this.GetRealHeight(nativeBestShotBufferData, portraitWidth, portraitHeight),
                        tempImageData = bestShotCC.createImageData(portraitWidth, realHeight.realHeight);                    
                    console.log(JSON.stringify(realHeight));
                    bestShot.width = portraitWidth;
                    bestShot.height = realHeight.realHeight;
                    pm.copyFromArrayToCanvas(tempImageData, nativeBestShotBufferData, portraitWidth, portraitHeight, realHeight.topElem, realHeight.realHeight);
                    bestShotCC.putImageData(tempImageData, 0, 0);
                    bestShot.toBlob(function (blob) {
                        var url = URL.createObjectURL(blob);
                        var blobArr = pm.Get("GetPhotoBlobData");
                        var id = pm.getCurrentId();
                        $.each(blobArr.data, function (nam, val) {
                            if (id == val.id) {
                                val.url = url;
                                val.blob = blob;
                                val.status = "INPROGRESS";
                            }
                        });
                        render.drawBestShot(url, id);
                        pm.checkImage(blob, url ,id);                         
                    }, pm.Get("GetImageMimeType"),1);
                }

                ATCEBSPHPM.prototype.saveOtherFields = function (data) {
                    if (!SiebelApp.Utils.IsEmpty(data)) {
                        SiebelApp.S_App.ProcessResponse(data);
                        SiebelApp.S_App.uiStatus.Free();
                        var bc = this.Get("GetBusComp");
                        bc.SetFieldValue("ATC Doc Type", this.getDocType());                      
                        this.invokeBCMethodSync("WriteRecord");
                    }
                }

                ATCEBSPHPM.prototype.invokeBCMethodSync = function (methodName) {
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

                return ATCEBSPHPM;
            }()
            );
            return "SiebelAppFacade.ATCEBSPHPM";
        })
}
