if (typeof(SiebelAppFacade.ATCEBSPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.ATCEBSPR");
    define("siebel/custom/ATCEBSPR", ["siebel/phyrenderer",
            "3rdParty/magnific-popup/jquery.magnific-popup",
            "3rdParty/jPlayer-2.9.2/dist/jplayer/jquery.jplayer"],
        function () {
            SiebelAppFacade.ATCEBSPR = (function () {

                function ATCEBSPR(pm) {
                    SiebelAppFacade.ATCEBSPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(ATCEBSPR, SiebelAppFacade.PhysicalRenderer);

                ATCEBSPR.prototype.ShowUI= function()
                {
                    ATCEBSPR.superclass.ShowUI.apply(this, arguments);
                    var pm = this.GetPM();
					var sURL=SiebelApp.S_App.GetClientURL().replace(/\/start.swe.+/g,'').replace(/^\//g,'');
                    sURL=sURL==''?sURL:('/' +sURL);
                    $.get(sURL+'/FILES/custom/recorderPopup.html',
                        function (data) {
                            pm.SetProperty("GetRecorderHTML", data);
                        });
                    $.get(sURL+'/FILES/custom/voicePopup.html',
                        function (data) {
                            pm.SetProperty("GetVoicePopup", data);
                        });						
				$('#_sweview').append('<link rel="stylesheet" href="'+sURL+'/files/custom/magnific-popup-cst.css"/>');
				$('#_sweview').append('<link rel="stylesheet" href="'+sURL+'/files/custom/recorder.css"/>')
                }

               ATCEBSPR.prototype.drawCheckSuccess=function() {
                   this.drawCurrentStatus();
               }
                ATCEBSPR.prototype.drawCheckError=function(error) {
                    this.drawCurrentStatus();
                }

                ATCEBSPR.prototype.setAudioData=function(recNum,url) {
                    $("#jquery_jplayer_" + recNum).jPlayer("setMedia", { wav: url }); 
                    if (!!url)
                        $('li#li_' + recNum + ' .jp-play').removeAttr("disabled");
                    else
                        $('li#li_' + recNum + ' .jp-play').attr("disabled","disabled");
                    this.drawCurrentStatus();
                }

                ATCEBSPR.prototype.drawOneVoiceRecorder=function(recNum,textToRead,url)
                {
                    var elem=this.GetPM().Get("GetRecorderHTML").replace(/{recNum}/g,recNum).replace(/{textToRead}/g,textToRead),
                        id = "#jquery_jplayer_" + recNum,
                        pm=this.GetPM();
                    $('#recordingslist').append(elem);
                    $(id).jPlayer({
                        ready: function (event) {
                            $(this).jPlayer("setMedia", {
                                wav: url
                            });
                        },
                        pause: function (event) {
                            $('li#li_' + recNum + ' .jp-play').text("Продолжить");
                        },
                        play: function (event) {
                            $('li#li_' + recNum + ' .jp-play').text("Пауза");
                        },
                        ended: function (event) {
                            $('li#li_' + recNum + ' .jp-play').text("Прослушать");
                        },
                        loadeddata:function(event){
                            pm.setDuration(recNum, $('#jquery_jplayer_' + recNum + ' audio')[0].duration);
                        },
                        cssSelectorAncestor: '#jp_container_'+recNum,
                        supplied: "WAV",
                        wmode: "window",
                        useStateClassSkin: true,
                        autoBlur: false,
                        smoothPlayBar: true,
                        keyEnabled: true,
                        remainingDuration: false,
                        toggleDuration: false
                    });
                    $('li#li_' + recNum + ' .jp-record').click(this.StartRecording.bind(this, recNum));
                    if (!!url)
                        $('li#li_' + recNum + ' .jp-play').removeAttr("disabled");
                    $('li#li_' + recNum + ' .jp-record-abort').bind("click", this.AbortRecording.bind(this,recNum));
                    $('li#li_' + recNum + ' .jp-record-stop').bind("click", this.StopRecording.bind(this,recNum));

                }

                ATCEBSPR.prototype.AbortRecording=function(recNum) {
                    if(this.GetPM().abortRecording()) {
                        $('li#li_' + recNum + ' .jp-play-bar').stop();
                        $('li#li_' + recNum + ' .jp-seek-bar').css("width","0%");
                        $('li#li_' + recNum + ' .jp-play-bar').css("width","0%");
                        $('li#li_' + recNum + ' .jp-duration').text('00:00');
                    }
                }

                ATCEBSPR.prototype.StopRecording = function (recNum) {
                    var curLi = $('li#li_' + recNum);
                    curLi.find('.jp-play-bar').stop();
                    curLi.find('.jp-play-bar').css("width", "0%");
                    curLi.find('.jp-duration').removeClass('HiddenTimer');
                    curLi.find('.jp-current-time').addClass('HiddenTimer');                    
                    curLi.find('.RecorderButtonRecordEnabled').addClass('RecorderButtonRecordDisabled').removeClass('RecorderButtonRecordEnabled');
                    curLi.find('.jp-seek-bar').removeClass('jp-seek-bar-recording');
                    curLi.find('.jp-play').removeAttr('disabled');
                    this.GetPM().stopRecording(recNum, this.setAudioData.bind(this));                   
                }

                ATCEBSPR.prototype.StartRecording = function (recNum) {
                    var curLi = $('li#li_' + recNum);
                    curLi.find('.jp-play').attr('disabled','disabled');
                    curLi.find('.jp-duration').addClass('HiddenTimer');
                    curLi.find('.jp-current-time').removeClass('HiddenTimer');
                    curLi.find('.jp-play').text("Прослушать");
                    curLi.find('.RecorderButtonRecordDisabled').addClass('RecorderButtonRecordEnabled').removeClass('RecorderButtonRecordDisabled');
                    var duration = this.GetPM().getWriteDuration();
                    this.GetPM().startRecording(recNum);
                    this.drawCurrentStatus();
                    if(duration) {
                        $("#jquery_jplayer_" + recNum).jPlayer("clearMedia");
                        curLi.find('.jp-seek-bar').addClass('jp-seek-bar-recording').animate({ width: "100%" }, 0);
                        curLi.find('.jp-duration').text(toMMSS(duration));
                        curLi.find('.jp-play-bar').animate({
                            width: "100%"
                        }, {
                            duration: duration * 1000,
                            done: this.StopRecording.bind(this, recNum),
                            step: function (x) {
                                curLi.find('.jp-current-time').text(toMMSS(Math.round(x * duration / 100)));
                            },
                            specialEasing: {
                                width: "linear"
                            }
                        });
                    }
                }            

                function toMMSS (secs) {
                    var seconds = Math.floor(secs),
                        minutes = Math.floor(seconds / 60);
                    seconds -= minutes*60;
                    if (minutes < 10) {minutes = "0"+minutes;}
                    if (seconds < 10) {seconds = "0"+seconds;}
                    return minutes+':'+seconds;
                }

                ATCEBSPR.prototype.drawSyncCheckStatusButton = function () {
                    var pm = this.GetPM(),
                        hasNext = true,
                        valStatus = pm.Get("GetValidationStatus");
                    $.each(pm.getAudioData(), function (name, val) {
                        if (valStatus == "LOADING" || valStatus == "SYSTEMERROR"){
                            $('#jp_container_' + val.Id + ' .jp-record').attr("disabled", "disabled");
                            $('#jp_container_' + val.Id + ' .jp-record-stop').attr("disabled", "disabled");
                            $('#jp_container_' + val.Id + ' .jp-record-stub').removeAttr("disabled");
                        }
                        else {
                            if (val.isRecording) {
                                $('#jp_container_' + val.Id + ' .jp-record').attr("disabled", "disabled");
                                $('#jp_container_' + val.Id + ' .jp-record-stop').removeAttr("disabled");
                                $('#jp_container_' + val.Id + ' .jp-record-stub').attr("disabled", "disabled");
                            }
                            else {
                                if (!!val.blob || hasNext) {
                                    $('#jp_container_' + val.Id + ' .jp-record').removeAttr("disabled");
                                    $('#jp_container_' + val.Id + ' .jp-record-stop').attr("disabled", "disabled");
                                    $('#jp_container_' + val.Id + ' .jp-record-stub').attr("disabled", "disabled");
                                }
                                else {
                                    $('#jp_container_' + val.Id + ' .jp-record').attr("disabled", "disabled");
                                    $('#jp_container_' + val.Id + ' .jp-record-stop').attr("disabled", "disabled");
                                    $('#jp_container_' + val.Id + ' .jp-record-stub').removeAttr("disabled");
                                }
                            }
                        }
                        hasNext = !!val.blob;                                                 
                        });
                }

                ATCEBSPR.prototype.drawCurrentStatus = function () {
                    var pm = this.GetPM(),
                        status = pm.checkValidationStatus(false);
                    switch (status) {                                                    
                        case "SYSTEMERROR":
                            {
                                $('.VoiceSubHeaderText').hide();
                                $('.VoiceSuccessText').hide();
                                $('.VoiceErrorText').hide();
                                $('.VoiceSystemErrorText').fadeIn(1000);
                                $('#VoicePopupSave').attr("disabled", "disabled");
                                $('#VoicePopupCheck').attr("disabled", "disabled");
                                break;
                            }
                        case "ERROR":
                        case "FAILED":
                            {
                                $('.VoiceSubHeaderText').hide();
                                $('.VoiceSuccessText').hide();
                                $('.VoiceErrorText').fadeIn(1000);
                                $('.VoiceSystemErrorText').hide();
                                $('#VoicePopupSave').attr("disabled", "disabled");
                                $('#VoicePopupCheck').attr("disabled", "disabled");
                                break;
                            }
                        case "SUCCESS":
                            {
                                $('.VoiceSubHeaderText').hide();
                                $('.VoiceErrorText').hide();
                                $('.VoiceSystemErrorText').hide();
                                $('.VoiceSuccessText').fadeIn(1000);
                                $('#VoicePopupSave').removeAttr("disabled");
                                $('#VoicePopupCheck').attr("disabled", "disabled");
                                break;
                            }
                        case "LOADING":
                        case "RECORDING":
                            {
                                $('.VoiceErrorText').hide();
                                $('.VoiceSuccessText').hide();
                                $('.VoiceSystemErrorText').hide();
                                $('.VoiceSubHeaderText').fadeIn(0);
                                $('#VoicePopupSave').attr("disabled", "disabled");
                                $('#VoicePopupCheck').attr("disabled", "disabled");
                                break;
                            }
                        case "RECORDED":
                            {
                                $('.VoiceErrorText').hide();
                                $('.VoiceSuccessText').hide();
                                $('.VoiceSystemErrorText').hide();
                                $('.VoiceSubHeaderText').fadeIn(0);
                                $('#VoicePopupCheck').removeAttr("disabled");
                                $('#VoicePopupSave').attr("disabled", "disabled");
                                break;
                            }                    
                    }   
                    this.drawSyncCheckStatusButton();
                }

                ATCEBSPR.prototype.OpenPopup = function () {
                    var pm = this.GetPM();
                    var that = this;
                    $.magnificPopup.open({
                        items: {
                            src: pm.Get('GetVoicePopup'),
                            type: 'inline'
                        },
                        callbacks: {
                            open: function () {
                                pm.loadAudioContext();
                                $.each(pm.getAudioData(),function(name,val){
                                    that.drawOneVoiceRecorder(val.Id,val.text,val.url);
                                });
                                that.drawCurrentStatus();
                                $('#VoicePopupCancel').click(function () {
                                    $.magnificPopup.close();
                                });                                
                                $("#VoicePopupCheck").click(function () {
                                    pm.checkFullAudio();
                                });
                                $("#VoicePopupSave").click(function () {
                                    pm.saveFullAudio();
                                    $.magnificPopup.close();
                                });
                            },
                            close:function(){
                                pm.abortRecording();
                            }
                        }

                    });
                }
                return ATCEBSPR;
            }()
                );
            return "SiebelAppFacade.ATCEBSPR";
        })
}
