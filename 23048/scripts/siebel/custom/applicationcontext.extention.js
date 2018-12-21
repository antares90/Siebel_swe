if (typeof(SiebelApp.S_App) !== "undefined") {
    var ac = SiebelJS.Dependency("SiebelApp.Utils");
    var G = SiebelJS.Dependency("SiebelApp.Constants");
    var ak = G.get("SWE_PST_APP_INFO");
    var ai = G.get("SWE_FIELD_STR");
    var ad = G.get("SWE_RPC_PROP_URL");
    var Z = G.get("SWE_ARG_START");
    var at = G.get("SWE_RPC_PROP_FILEDOWNLOADSAVE");
    var au = G.get("SWE_METHOD_SAVE_QUERY");
    var c = G.get("SWE_METHOD_SAVE_QUERY_AS");
    var ah = G.get("SWE_METHOD_POST_CHANGES");
    var k = G.get("SWE_TARGET_TOP");
    var h = G.get("SWE_BCF_FIELD");

    function ab() {
        var aR;
        var aP = (navigator.userAgent.indexOf("Trident") > 0);
        if (aP) {
            var aQ = document.getElementById("SiebeAttachmentAppletFrame");
            if (aQ) {
                aR = aQ.contentWindow.document.getElementById("SiebelAttachmentJavaApplet")
            }
        } else {
            aR = document.getElementById("SiebelAttachmentJavaApplet2")
        }
        return aR
    }

    SiebelApp.S_App.DownloadFile = function(a5, bb) {
        var aU = a5.GetProperty(ad);
        var aQ = aU.split(Z);
        var aZ = a5.GetProperty(at);
        var aY = this.GetPageURL() + Z;
        var aW = aQ[1];
        var a7 = ArrayBuffer ? true : false;
        var a2 = (navigator.userAgent.indexOf("Trident") > 0);
        var a1 = a5.GetProperty("FileTitle");
        var a0 = a5.GetProperty("FileExt");
        var a9 = a1 + (a0 ? ("." + a0) : "");
        var a8 = false;
        if (localStorage) {
            a8 = localStorage.getItem("isAdfmContainer")
        }
        var ba = function() {
            if (aY && aW) {
                var bd = "";
                var bi = aW.split("&");
                var bh = bi.length;
                for (var bg = 0; bg < bh; bg++) {
                    var bj = bi[bg].split("=");
                    if (bj[0] == "SRN") {
                        bj[1] = SiebelApp.S_App.GetSRN()
                    }
                    bd += '<input type="hidden" name="' + bj[0] + '" value="' + bj[1] + '" />'
                }
                if ((SiebelApp.S_App.IsMobileApplication() === "true") && (window.navigator.standalone !== undefined) && window.navigator.standalone) {
                    var be = aY + aW;
                    var bc = document.createElement("a");
                    bc.setAttribute("href", be);
                    var bf = document.createEvent("HTMLEvents");
                    bf.initEvent("click", true, true);
                    bc.dispatchEvent(bf);
                    bc = null
                } else {
                    jQuery('<form action="' + aY + '" method="post"' + (aZ ? "" : ' target="_blank"') + ">" + bd + "</form>").appendTo("body").submit().remove()
                }
            }
        };
        var a3 = function() {
            if (this.readyState == 4) {
                if (this.status == 200 || this.status == 204) {
                    var bc = I.encode(this.response);
                    SiebelApp.MobileFileMgr.WriteTempWithFlag({
                        filename: a9,
                        content: bc,
                        append: false,
                        success: function() {
                            SiebelApp.S_App.uiStatus.Free();
                            SiebelApp.MobileFileMgr.OpenTempFile({
                                filename: a9,
                                displayFileName: a9
                            })
                        },
                        error: function() {
                            SiebelApp.S_App.uiStatus.Free();
                            ac.Alert(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_ATT_CREATE_FILE_PATH_ERROR"))
                        }
                    })
                }
            }
        };
        var a4 = function() {
            SiebelApp.S_App.uiStatus.Busy({});
            var bc = aY + aW;
            var bd = al() || R();
            bd.onreadystatechange = a3;
            bd.open("GET", bc);
            bd.responseType = "arraybuffer";
            bd.send()
        };
        if (a8) {
            if (SiebelApp.AttachmentMgr.PreviewInMAF) {
                var aS = aY + aW;
                SiebelApp.AttachmentMgr.PreviewInMAF(aS, a9)
            } else {
                a4()
            }
            return
        }
        var aV = function() {
            if (!a7) {
                ba()
            } else {
                var bd = a5.GetChild(0).GetProperty("hnurl");
                var bi = bd.indexOf("SWEView=") + "SWEView=".length;
                var bk = bd.indexOf("&amp;", bi);
                var bj = bd.substring(bi, bk).replace(/\+/gm, " ");
                var bc = {};
                bc.SRN = SiebelApp.S_App.GetSRN();
                bc.SWEView = bj;
                bc.SWEApplet = bb.GetProperty("SWEApplet");
                bc.SWERowIds = bb.GetProperty("SWERowIds");
                bc.SWECmd = "InvokeMethod";
                bc.SWEMethod = "AttachAttachment";
                bc.SWERPC = "1";
                bc.SWEBCFField = bb.GetProperty(h);
                var bh = JSON.stringify(bc);
                var be = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200 || this.status == 204) {
                            S = true;
                            var bl = I.encode(this.response);
                            var bp = ab();
                            if (bp) {
                                var br = 4096;
                                var bo = Math.floor(bl.length / br);
                                var bn = bl.length % br;
                                var bm;
                                for (bm = 0; bm < bo; bm++) {
                                    var bq = bm * br;
                                    bp.prepareFileData(bl.substring(bq, bq + br), bm == 0)
                                }
                                if (bn > 0) {
                                    bp.prepareFileData(bl.substring(br * bo, bl.length), false)
                                }
                                bp.downloadFile(a9, aY + aW, bh)
                            }
                        }
                        SiebelApp.S_App.uiStatus.Free()
                    }
                };
                var bf = function() {
                    SiebelApp.S_App.uiStatus.Busy({
                        mask: true
                    });
                    window.DownloadFileAppletLoaded = function() {};
                    var bp = ab();
                    if (bp) {
                        var bq = false;
                        try {
                            bq = bp.isAppletValidate()
                        } catch (bo) {}
                        if (bq) {
                            var bl = new Array("IDS_ATT_CLOSE_CONFIRM", "IDS_ATT_UPLOAD_FAILED", "IDS_ATT_APP_NOT_FOUND", "IDS_ATT_CREATE_FILE_PATH_ERROR", "IDS_ATT_ERROR_DIALOG_CAPTION");
                            jQuery.each(bl, function(bs, br) {
                                bp.setMessage(br, SiebelApp.S_App.LocaleObject.GetLocalString(br))
                            });
                            var bm = aY + aW;
                            var bn = al() || R();
                            bn.onreadystatechange = be;
                            bn.open("GET", bm);
                            bn.responseType = "arraybuffer";
                            bn.send()
                        } else {
                            ba()
                        }
                    }
                };
                var bg = ab();
                if (!bg) {
                    window.DownloadFileAppletLoaded = function() {
                        SiebelApp.S_App.uiStatus.Free();
                        bf()
                    };
                    aR()
                } else {
                    bf()
                }
            }
        };
        var aR = function() {
            SiebelApp.S_App.uiStatus.Busy({});
            jQuery(window).on("beforeunload", function(bg) {
                var bh = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_ATT_CLOSE_CONFIRM");
                var bf = ab();
                if (!bf.onWindowClose()) {
                    bg.cancelBubble = true;
                    bg.returnValue = bh;
                    return bh
                }
            });
            var bc = SIEBEL_BUILD.indexOf("/");
            var be = SIEBEL_BUILD.substring(0, bc);
            if (a2) {
                jQuery("<iframe id='SiebeAttachmentAppletFrame' src='attachment.html' width=0 height=0 frameBorder=0></iframe>").appendTo("body")
            } else {
                var bd = '<object id="SiebelAttachmentJavaApplet" ';
                bd += '  classid="clsid:CAFEEFAC-0017-0000-FFFF-ABCDEFFEDCBA" width=0 height=0>';
                bd += '  <param name="code" value="com.siebel.applets.attachment.SiebelAttachmentApplet.class">';
                bd += '  <param name="codebase" value="http://java.sun.com/update/1.6.0/jinstall-6u30-windows-i586.cab#Version=1,6,0,0">';
                bd += '  <param name="archive" value="' + be + '/applets/SiebelAttachment.jar">';
                bd += "    <comment>";
                bd += '      <embed id="SiebelAttachmentJavaApplet2" ';
                bd += '        code="com.siebel.applets.attachment.SiebelAttachmentApplet.class"';
                bd += '        codebase="." archive="' + be + '/applets/SiebelAttachment.jar"';
                bd += '        type="application/x-java-applet;version=1.7" pluginspage="http://java.com/download/"';
                bd += "        width=0 height=0>";
                bd += "        <noembed>";
                bd += "          No Java Support.";
                bd += "        </noembed>";
                bd += "      </embed>";
                bd += "    </comment>";
                bd += "</object>";
                jQuery(bd).appendTo("body")
            }
        };
        var a6 = function() {
            ba();
        };
        var aX = ab();
        if (typeof(localStorage) == "undefined") {
            var aP = function() {
                this.storage = {}
            };
            aP.prototype.setItem = function(bc, bd) {
                this.storage[bc] = bd.toString()
            };
            aP.prototype.getItem = function(bc) {
                return this.storage[bc]
            };
            localStorage = new aP()
        }
        if (localStorage.getItem("isJavaAppletSupport")) {
            a6()
        } else {
            window.DownloadFileAppletLoaded = function() {
                localStorage.setItem("isJavaAppletSupport", true);
                SiebelApp.S_App.uiStatus.Free();
                a6()
            };
            aR();
            var aT = 5000;
            setTimeout(function() {
                if (!(localStorage.getItem("isJavaAppletSupport") && localStorage.getItem("isJavaAppletSupport") == "true")) {
                    SiebelApp.S_App.uiStatus.Free();
                    localStorage.setItem("isJavaAppletSupport", false);
                    a6()
                }
            }, aT)
        }
    };
}