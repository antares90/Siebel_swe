/*<ORACLECOPYRIGHT>
 * Copyright (C) 1994-2014
 * Oracle and Java are registered trademarks of Oracle and/or its affiliates.
 * Other names may be trademarks of their respective owners.
 * UNIX is a registered trademark of The Open Group.
 *
 * This software and related documentation are provided under a license agreement
 * containing restrictions on use and disclosure and are protected by intellectual property laws.
 * Except as expressly permitted in your license agreement or allowed by law, you may not use, copy,
 * reproduce, translate, broadcast, modify, license, transmit, distribute, exhibit, perform, publish,
 * or display any part, in any form, or by any means. Reverse engineering, disassembly,
 * or decompilation of this software, unless required by law for interoperability, is prohibited.
 *
 * The information contained herein is subject to change without notice and is not warranted to be error-free.
 * If you find any errors, please report them to us in writing.
 *
 * U.S. GOVERNMENT RIGHTS Programs, software, databases, and related documentation and technical data delivered to U.S.
 * Government customers are "commercial computer software" or "commercial technical data" pursuant to the applicable
 * Federal Acquisition Regulation and agency-specific supplemental regulations.
 * As such, the use, duplication, disclosure, modification, and adaptation shall be subject to the restrictions and
 * license terms set forth in the applicable Government contract, and, to the extent applicable by the terms of the
 * Government contract, the additional rights set forth in FAR 52.227-19, Commercial Computer Software License
 * (December 2007). Oracle America, Inc., 500 Oracle Parkway, Redwood City, CA 94065.
 *
 * This software or hardware is developed for general use in a variety of information management applications.
 * It is not developed or intended for use in any inherently dangerous applications, including applications that
 * may create a risk of personal injury. If you use this software or hardware in dangerous applications,
 * then you shall be responsible to take all appropriate fail-safe, backup, redundancy,
 * and other measures to ensure its safe use. Oracle Corporation and its affiliates disclaim any liability for any
 * damages caused by use of this software or hardware in dangerous applications.
 *
 * This software or hardware and documentation may provide access to or information on content,
 * products, and services from third parties. Oracle Corporation and its affiliates are not responsible for and
 * expressly disclaim all warranties of any kind with respect to third-party content, products, and services.
 * Oracle Corporation and its affiliates will not be responsible for any loss, costs,
 * or damages incurred due to your access to or use of third-party content, products, or services.
 </ORACLECOPYRIGHT>*/
/* 8.1.1.14SIA[23044]PATCHSET7 */
if (typeof(SiebelApp.S_App.CommToolbarUtil) === "undefined") {
    Namespace("SiebelApp.S_App.CommToolbarUtil");
    SiebelApp.S_App.CommToolbarUtil = (function () {
        function A() {
            return this
        }

        var c = "";
        var q = new A();
        var o = CCFMiscUtil_CreatePropSet;
        var x = false;
        var g = 3;
        var i = [];
        var f = false;
        var n = 0;
        var C = '<command name="ClientIP" value="';

        function r(F) {
            var E = this;
            E.height = "600";
            E.width = "800";
            E.polling = "2";
            $.each(r.paramAttr, function (H, K) {
                E[K] = F.attr(K);
                if (E[K] === undefined) {
                    return
                }
                if (K === "url") {
                    var L = E[K].indexOf("?");
                    if (L >= 0) {
                        var G = E[K].substring(L + 1);
                        G = G.replace(new RegExp("\\+", "gm"), " ");
                        var J = G.split("&");
                        var I = o();
                        $.each(J, function (N, M) {
                            var O = [];
                            O = M.split("=");
                            if ((O.length === 2) && (O[0].indexOf("swe") !== 0)) {
                                I.SetProperty(O[0], O[1])
                            }
                        });
                        E.urlParameters = I
                    } else {
                        return
                    }
                }
            })
        }

        r.paramAttr = ["name", "value", "control", "message", "url", "target", "applet", "startTime", "serverTime", "encodedCmd", "viewName", "position", "feature", "checkPopup", "popupErrMsg", "polling", "width", "height", "position", "feature"];
        r.prototype.Invoke = function () {
            SiebelApp.S_App.CommToolbar.ExecuteCommand(this)
        };
        r.prototype.toString = function () {
            var F = "command [" + this.name + "]: ";
            var E = this;
            $.each(r.paramAttr, function (G, H) {
                if (E[H] !== undefined) {
                    F += "\n\t" + H + ":" + E[H]
                }
            });
            return F
        };
        var k = true;
        var b = "";
        var s = 0;
        var w = {
            bStarted: false,
            bRun: true,
            bPush: true,
            iInterval: 3,
            sCmd: "SWECmd=WaitForCmd&SWEService=Communications Client",
            StopPushString: "",
            RetryBeforeStopPush: 0
        };
        var z = function (I, J, H) {
            var F = o();
            for (var E in I) {
                if (I.hasOwnProperty(E)) {
                    F.SetProperty(E, I[E])
                }
            }
            var G = {async: true, cb: this.HandleResponse, opdecode: false, scope: this};
            if (typeof(J) === "function") {
                G.errcb = J
            }
            G.selfbusy = true;
            SiebelApp.S_App.CallServer(F, undefined, H, G)
        };
        A.prototype.getCookiesSession = function () {
            var E = "";
            E = "&" + SiebelApp.S_App.CommToolbar.GetSessionName() + "=" + SiebelApp.S_App.CommToolbar.GetSessionId();
            E += t();
            this.LogMsg(3, "getCookiesSession: " + E);
            return E
        };
        var v = function (E) {
            return E.replace(new RegExp("&", "gm"), " __X__ ")
        };
        var B = function (E) {
            return E.replace(new RegExp(" __X__ ", "gm"), "&")
        };
        var t = function () {
            var E = "&SRN=" + b;
            return E
        };
        var m = function () {
            return document.cookie
        };
        A.prototype.isValidCookieSession = function () {
            if (k === true) {
                if (m() !== "") {
                    return true
                }
            } else {
                if (this.getCookiesSession() !== "") {
                    return true
                }
            }
            return false
        };
        var e = function (F) {
            var E = false;
            this.LogMsg(3, "get push response of request " + s + ": " + F);
            if (F === "Error") {
                SiebelApp.S_App.CommToolbar.PushError();
                this.LogMsg(1, "handlePushResponse: Error: " + F)
            } else {
                if ((w.StopPushString.length > 0 && F.indexOf(w.StopPushString) >= 0) || F.indexOf(C) < 0) {
                    this.LogMsg(1, "invalid push response of request " + s + ", retry times: " + n);
                    if (n >= w.RetryBeforeStopPush) {
                        this.LogMsg(1, "Stop push and disable the toolbar!");
                        SiebelApp.S_App.CommToolbar.DisableAllButtons();
                        w.bRun = false
                    } else {
                        this.LogMsg(1, "handlePushResponse: retry");
                        E = true;
                        ++n
                    }
                } else {
                    if (F !== "OK") {
                        n = 0;
                        x = true;
                        this.HandleResponse(F);
                        x = false
                    } else {
                        this.LogMsg(1, "handlePushResponse: else: " + F)
                    }
                }
            }
            w.bStarted = false;
            if (w.bRun) {
                if (w.bPush) {
                    if (E) {
                        this.LogMsg(1, "handlePushResponse: push: retry");
                        h(this.SendPush, 1000, this)
                    } else {
                        this.SendPush()
                    }
                } else {
                    if (E) {
                        this.LogMsg(1, "handlePushResponse: get: retry");
                        h(this.GetMsg, 1000, this)
                    } else {
                        this.GetMsg()
                    }
                }
            }
        };
        var d = function (E) {
            this.LogMsg(1, "sendCommand failed for push request<" + s + ">");
            w.bStarted = false;
            if (w.bRun) {
                if (w.bPush) {
                    if (n < w.RetryBeforeStopPush) {
                        n++;
                        h(this.SendPush, 1000, this)
                    } else {
                        this.LogMsg(1, "Stop push after few tries at handlePushException!")
                    }
                } else {
                    h(this.GetMsg, 1000, this)
                }
            }
        };

        A.prototype.getTelesetExt = function () {
            try {
                var sBusService = SiebelApp.S_App.GetService("ATC_CTI_Response");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                var Outputs = SiebelApp.S_App.NewPropertySet();
                var ResultSet = SiebelApp.S_App.NewPropertySet();
                Outputs = sBusService.InvokeMethod("GetTelesetExtension", Inputs);
                ResultSet = Outputs.GetChildByType("ResultSet");
                return ResultSet.GetProperty("TelesetExtension").toString()
            } catch (e) {
                console.log("getProfileAttr Error: " + e.toString());
                console.log(Outputs);
                return 0
            }
        };
        A.prototype.SoftPhoneEnable = function () {
            try {
                var sPrflService = SiebelApp.S_App.GetService("SiebelUserProfileService");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                var Outputs = SiebelApp.S_App.NewPropertySet();
                var ResultSet = SiebelApp.S_App.NewPropertySet();
                Inputs.SetProperty("Name", "Primary Responsibility Name");
                Outputs = sPrflService.InvokeMethod("GetProfileAttribute", Inputs);
                ResultSet = Outputs.GetChildByType("ResultSet");
                if (ResultSet.GetProperty("Value").toString() == "ATC Expert With CTI" || ResultSet.GetProperty("Value").toString() == "ATC Cloud CTI") {
                    return true
                } else {
                    return false
                }
            } catch (e) {
                console.log("getProfileAttr Error: " + e.toString());
                console.log(Outputs);
                return false
            }
        };
        A.prototype.HandleResponse = function (I) {
            if (!x) {
                this.LogMsg(3, "Get command response: " + I)
            }
            var K = I;
            var H = /<HTML(.|\n)*/g;
            K = K.replace(H, "");
            K = "<xml>" + K + "</xml>";
            var E = $.parseXML(K);
            if (E === undefined) {
                return
            }
            var F = $(E).find("command");
            $.each(F, function () {
                var M = new r($(this));
                if (M.name.toUpperCase() === "SHOWDOCUMENT") {
                    i.push([M])
                } else {
                    if (M.name.toUpperCase() === "OPENFIND") {
                        var L = $(this).find("field");
                        M.findFields = [];
                        $.each(L, function () {
                            M.findFields[$(this).attr("name")] = $(this).attr("value")
                        })
                    }
                    M.Invoke()
                }
            });
            var J = SiebelApp.S_App.getExtObject("ChatPane");
            if (J) {
                var G = $(E).find("chat");
                if (G.children().length > 0) {
                    J.Notify(G);
                    SiebelApp.S_App.CommToolbar.NotifyUIUpdate()
                }
            }
            if (i.length > 0 && !f) {
                this.ExecuteNextCommand()
            }
        };
        A.prototype.ExecuteNextCommand = function () {
            var F = i.shift();
            if (f) {
                SiebelApp.EventManager.removeListner("postload", this.ExecuteNextCommand, this);
                SiebelApp.EventManager.removeListner("posteoiload", this.ExecuteNextCommand, this);
                f = false
            }
            if (F) {
                F[0].Invoke();
                if (!f) {
                    this.ExecuteNextCommand()
                }
            } else {
                var E = SiebelApp.S_App.getExtObject("ChatPane");
                if (E) {
                    E.ExecuteMethod("SetFocusToTextInput")
                }
            }
        };
        A.prototype.GenInputPS = function (G, F) {
            $.each(G.split("&"), function E(H, K) {
                var L = K.split("=");
                if (L.length === 2) {
                    var J = L[0];
                    var I = L[1];
                    F[J] = I
                }
            });
            return F
        };
        A.prototype.SendCommandStr = function (F, E) {
            var G = "";
            G = c + F;
            if (arguments.length >= 2) {
                $.get(B(G), this.HandleResponse).error(function (K, H, I) {
                    var J = {errCode: K.status, errText: I};
                    E(J)
                })
            } else {
                $.get(B(G), this.HandleResponse)
            }
        };
        var l = function (E) {
            for (var F in w) {
                if (w.hasOwnProperty(F)) {
                    if (typeof(E[F]) !== "undefined") {
                        if (F === "sCmd") {
                            if (E[F].indexOf("start.swe?") === 0) {
                                E[F] = E[F].substring(10)
                            }
                            E[F] = E[F].replace(new RegExp("\\+", "gm"), " ")
                        }
                        w[F] = E[F]
                    }
                }
            }
        };
        var h = function (H, G, E) {
            var F = E;
            var I = function () {
                H.call(F)
            };
            setTimeout(I, G)
        };
        A.prototype.SendCommand = function (F) {
            if (typeof(F) !== "object") {
                this.LogMsg(1, "Invoking SendCommand, the input arg is not valid!");
                return
            }
            var E = F.url;
            var G = F.inputKV;
            var I = F.error;
            var H = {};
            if (typeof(G) === "object") {
                H = G
            }
            if (typeof(E) === "string") {
                E = decodeURI(E);
                E = E.replace(new RegExp("\\+", "gm"), " ");
                if (E.indexOf("start.swe?") === 0) {
                    E = E.substring(10)
                }
                H = this.GenInputPS(E, H)
            }
            z.call(this, H, I, F.needUIFProcessRP)
        };
        A.prototype.CallSWEAsString = function (G) {
            var F = App();
            var E = "";
            F.CallSWEAsString(G, false, E)
        };
        A.prototype.DoSweCmd = function (E) {
            var F = SiebelApp.CommandManager.GetInstance();
            F.InvokeCommand(E)
        };
        A.prototype.ShowDocument = function (F, E, H, G) {
            if (!this.ImplicitSave()) {
                return
            }
            SiebelApp.EventManager.addListner("postload", this.ExecuteNextCommand, this);
            SiebelApp.EventManager.addListner("posteoiload", this.ExecuteNextCommand, this);
            f = true;
            if (G !== undefined && G.length > 0) {
                this.LogMsg(3, "using SiebelApp.S_App.GotoView");
                this.PSRLog("[PSR] GotoView [" + G + "]");
                SiebelApp.S_App.GotoView(G, "", F, E, "", false)
            } else {
                if ((E === "_sweview") && (H !== undefined) && (H.length > 0)) {
                    this.LogMsg(3, "using CallSWEAsString");
                    this.CallSWEAsString(H)
                } else {
                    this.LogMsg(3, "using SiebelApp.S_App.GotoView");
                    this.PSRLog("[PSR] GotoView");
                    SiebelApp.S_App.GotoView("", "", F, E, "", false)
                }
            }
        };
        A.prototype.GetRefId = function () {
            return s
        };
        A.prototype.SendPush = function () {
            if (SiebelAppFacade.DecisionManager.IsTouch()) {
                this.LogMsg(0, "disable CTI push channel at iPad to avoid bug 19623469");
                return
            }
            if (w.bStarted === true) {
                return
            }
            w.bStarted = true;
            s = s + 1;
            var H = w.sCmd + "&refID=" + s;
            var I = {};
            I = this.GenInputPS(H, I);
            var F = o();
            for (var E in I) {
                if (I.hasOwnProperty(E)) {
                    F.SetProperty(E, I[E])
                }
            }
            var J = false;
            var G = {async: true, cb: e, errcb: d, opdecode: false, scope: this};
            if (w.bPush === true) {
                this.LogMsg(3, "send a new push request: " + s)
            } else {
                this.LogMsg(3, "Send: " + H)
            }
            G.selfbusy = true;
            SiebelApp.S_App.CallServer(F, undefined, J, G)
        };
        A.prototype.GetMsg = function () {
            h(this.SendPush, w.iInterval * 1000, this)
        };
        A.prototype.StartPush = function (E) {
            if (typeof(E) === "object") {
                l(E)
            }
            if (typeof(E) === "object") {
                if (w.bPush === true) {
                    this.LogMsg(0, "Push Channel STARTED");
                    h(this.SendPush, 1500, this)
                } else {
                    this.LogMsg(0, "Push Channel for RunGetMsgThread IS Started");
                    h(this.GetMsg, 1500, this)
                }
                return
            }
        };
        A.prototype.StopPush = function () {
            w.bRun = false;
            this.LogMsg(0, "PushCmd stopped!")
        };
        A.prototype.DoPopup = function (G, F, E) {
            var H = o();
            H.SetProperty("URL", G);
            this.LogMsg(3, "doPopup: " + G);
            SiebelApp.S_App.GetPopupPM().ExecuteMethod("ProcessNewPopup", H)
        };
        A.prototype.UpdateCmdMgrMenu = function (G, F) {
            var H = o();
            var E = SiebelApp.CommandManager.GetInstance();
            H.SetProperty(G, F);
            E.UpdateBatchMethods(H)
        };
        A.prototype.LogMsg = function (F, E) {
            this.Log(F, "commToolbarUtil.js: " + E)
        };
        A.prototype.GetLogTime = function () {
            if (!Date.prototype.toISOString) {
                (function () {
                    function E(G) {
                        var F = String(G);
                        if (F.length === 1) {
                            F = "0" + F
                        }
                        return F
                    }

                    Date.prototype.toISOString = function () {
                        return this.getUTCFullYear() + "-" + E(this.getUTCMonth() + 1) + "-" + E(this.getUTCDate()) + "T" + E(this.getUTCHours()) + ":" + E(this.getUTCMinutes()) + ":" + E(this.getUTCSeconds()) + "." + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) + "Z"
                    }
                }())
            }
            return new Date().toISOString() + " UTC"
        };
        A.prototype.Log = function (G, F) {
            var E = this.GetLogTime();
            if (G >= g) {
                return
            }
            if (G === 0) {
                SiebelJS.Log("[" + E + "]:INFO: " + F)
            }
            if (G === 1) {
                SiebelJS.Log("[" + E + "]:ERROR: " + F)
            }
            if (G === 2) {
                SiebelJS.Log("[" + E + "]:WARNING: " + F)
            }
            if (G >= 3) {
                SiebelJS.Log("[" + E + "]:DEBUG: " + F)
            }
        };
        var D = "";
        var a = false;
        var p = 10240;
        var u = 11;
        var j = 0;
        var y = "";
        A.prototype.SetEnablePSRLog = function () {
            a = true;
            this.LogMsg(0, "Enable PSR Log")
        };
        A.prototype.IsPSRLogEnabled = function () {
            return a
        };
        A.prototype.SetClientPSRLogLength = function (E) {
            p = E;
            this.LogMsg(0, "Set Client PSR Log Length = " + E)
        };
        A.prototype.PSRLog = function (F) {
            if (!a) {
                return
            }
            var E = this.GetLogTime();
            if (D.length !== 0) {
                D += "\n"
            }
            D += "[" + E + "]: " + F;
            if (D.length > p) {
                D = ""
            }
        };
        A.prototype.GetPSRLog = function () {
            var E = D;
            D = "";
            return E
        };
        A.prototype.GetCTIUtilApplet = function () {
            var F;
            var E = (navigator.userAgent.indexOf("Trident") > 0);
            if (E) {
                F = document.getElementById("SiebelCTIJavaApplet")
            } else {
                F = document.getElementById("SiebelCTIJavaApplet2")
            }
            return F
        };
        A.prototype.isJavaEnabled = function () {
			// VK, LETO-5933
            /*if (navigator.userAgent.toLowerCase().indexOf("chrome") == -1) {
                return navigator.javaEnabled()
            }
            var E = Array.prototype.slice.call(navigator.plugins, 0);
            if (!E) {
                return false
            }
            var H = E.length;
            var G;
            for (G = 0; G < H; G++) {
                var F = E[G].name;
                if (F) {
                    this.LogMsg(3, "isJavaEnabled: chrome plugin list:" + F)
                }
                if (F && F.toLowerCase().indexOf("java(tm)") > -1) {
                    return true
                }
            }*/
            return false
        };
        A.prototype.ShellUIInit = function () {
            j = j + 1;
            var F = SiebelApp.S_App.CommToolbarUtil.GetCTIUtilApplet();
            if (F) {
                try {
                    this.LogMsg(0, "access applet's getHostInfoFromJavaScript");
                    y += F.getHostInfoFromJavaScript()
                } catch (E) {
                    if (j < u) {
                        this.LogMsg(3, "Fail to access getClientInfo, wait for another second before retry");
                        h(this.ShellUIInit, 1000, this);
                        return
                    }
                }
                F.style.display = "none";
                F.style.visibility = "hidden"
            }
            this.LogMsg(0, "Init Command is:" + y);
            this.SendCommand({url: y})
        };
        A.prototype.InitApplet = function () {
            c = SiebelApp.S_App.GetPageURL().replace("/start.swe", "/");
            var F = SiebelApp.S_App.CommToolbar.GetParameter("NoOfInitCommands");
            b = SiebelApp.S_App.CommToolbar.GetSessionRN();
            k = SiebelApp.S_App.CommToolbar.IsUseCookies();
            if (F !== undefined) {
                for (var E = 0; E < F; E++) {
                    var G = 1 + E;
                    y = "" + SiebelApp.S_App.CommToolbar.GetParameter("InitCommand" + G);
                    if (y === undefined) {
                        y = SiebelApp.S_App.CommToolbar.GetParameter("InitCommand" + G)
                    }
                    if (y !== undefined) {
                        this.ShellUIInit()
                    }
                }
            } else {
                this.LogMsg(2, "NoOfInitCommands parameter is missing.")
            }
        };
        A.prototype.SetLogLevel = function (E) {
            g = E
        };
        A.prototype.ImplicitSave = function () {
            var F = App(), G, E;
            if (F) {
                G = F.GetMainView();
                if (G) {
                    E = G.GetActiveApplet();
                    if (E) {
                        return E.InvokeMethod("ImplicitCommit", CCFMiscUtil_CreatePropSet())
                    }
                }
            }
            this.LogMsg(2, "No active applet!");
            return true
        };
        return q
    }())
}
;


if (typeof (SiebelApp.S_App.CommToolbarUtil) !== "undefined") {

}