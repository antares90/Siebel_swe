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
if (typeof(SiebelApp.S_App.CommToolbar) === "undefined") {
    SiebelJS.Namespace("SiebelApp.S_App.CommToolbar");
    SiebelApp.S_App.CommToolbar = (function () {
        var z = SiebelJS.Dependency("SiebelApp.Constants");
        var q;
        var p = {};
        var O = {};
        var I = {};
        var M = {};
        var t = 0;
        var N = null;
        var R = false;
        var H = "7000";
        var J = "CTI Message";
        var m = [];
        var V = 0;
        var K;
        var E = false;
        var g;
        var A;
        var f = false;
        var L = false;
        var i = 0;
        var w = 0;
        var S = "";
        var y = "";
        var b = {};
        var u = null;
        var F = "";
        var Q = false;
        var h = true;
        var G = false;
        var r = "";
        var s = 0;
        var n = 3;
        var C = false;
        var x = 0;

        function j() {
            var W;
            X = function X() {
                return W
            };
            X.prototype = this;
            W = new X();
            W.constructor = X;
            return W
        }

        j.prototype.SetPModel = function (W) {
            q = W
        };
        j.prototype.GetPModel = function () {
            return q
        };
        j.prototype.GetName = function () {
            return z.get("SWE_PST_COMM_TOOLBAR")
        };
        j.prototype.GetPropArray = function () {
            return ["GetTopControlNum", "GetTopCtrlsSeqMap", "GetSubCtrlsSeqMap", "GetPopSidewayCtrl", "GetPlaceholder", "GetBackgroundColor", "IsMakeCallPopupNeeded", "IsAutomationEnabled"]
        };
        j.prototype.GetMethodArray = function () {
            return ["InvokeCommandByItemName", "InvokeCommandToolTip", "ShowPreviousMessage", "ShowNextMessage", "ShowStatusText", "ShowMessageWithAlert", "PlaySound", "UpdateHTMLControl", "TriggerEvent", "ApplySticky", "FlashTitle", "BlinkParentBtn", "GotoCTIToolbar", "HideCTIToolbar", "CollectFocusInfo", "ClearFocusInfo", "CallContactFromUI", "UpdateCallContactFromUI", "OpenCallContactFromUIPopup", "EditBoxStatusUpdate", "CallContactFromUIEnabled", "HandleGotoCTIToolbar", "ParseParameters", "InitCTIToolbar", "NotifyCommPanel"]
        };
        j.prototype.Init = function () {
            var W = this.GetParamFromHiddenTag();
            if (this.ProcessObjectInfo(W)) {
                return true
            } else {
                return false
            }
        };
        j.prototype.HandleGotoCTIToolbar = function () {
            this.GotoCTIToolbar();
            return true
        };
        j.prototype.GetTopControlNum = function () {
            return t
        };
        j.prototype.GetTopCtrlsSeqMap = function () {
            return p
        };
        j.prototype.GetSubCtrlsSeqMap = function () {
            return M
        };
        j.prototype.GetPopSidewayCtrl = function () {
            return O.SidewayPopup
        };
        j.prototype.GetPlaceholder = function () {
            return ".siebui-tb-cti"
        };
        j.prototype.GetBackgroundColor = function () {
            return this.GetParameter("BGColor")
        };
        j.prototype.GetImageURL = function () {
            return this.GetParameter("ImageURL")
        };
        j.prototype.GetURLBase = function () {
            return this.GetParameter("URLBase")
        };
        j.prototype.IsMakeCallPopupNeeded = function () {
            return h
        };
        j.prototype.IsAutomationEnabled = function () {
            return G
        };
        j.prototype.ParseParameters = function () {
            if ($(this.GetPlaceholder()).length <= 0) {
                D(1, "No place holder for CTI toolbar!");
                return false
            }
            try {
                D(0, "CTI toolbar: ResetSessionCount");
                var svcResSess = SiebelApp.S_App.GetService("Communications Client");
                var psInResSess = SiebelApp.S_App.NewPropertySet();
                var psOutResSess = SiebelApp.S_App.NewPropertySet();
                psOutResSess = svcResSess.InvokeMethod("ResetSessionCount", psInResSess);

                U();
                D(0, "CTI toolbar: INIT.begin");
                if (this.Init()) {
                    SiebelApp.S_App.CommToolbarUtil.InitApplet();
                    D(0, "CTI toolbar: SoftPhoneEnable - " + SiebelApp.S_App.CommToolbarUtil.SoftPhoneEnable());
                    D(0, "CTI toolbar: TelesetExtension - " + SiebelApp.S_App.CommToolbarUtil.getTelesetExt());
                    $("#_sweviewbar").html("");
                    if (navigator.userAgent.search(/Chrome/) > -1 && SiebelApp.S_App.CommToolbarUtil.SoftPhoneEnable() && SiebelApp.S_App.CommToolbarUtil.getTelesetExt() != 0) {
                        $("#HTMLMessageBar").after("<iframe width=\"142px\" height=\"25px\" style=\"margin: 8px 3px 0 0;float:right;border:none;\" src='https://wrtc01.altuera.com/assets/softphone.html?dn=" + SiebelApp.S_App.CommToolbarUtil.getTelesetExt() + "&agent=" + theApplication().GetProfileAttr('Login Name') + "'></iframe>");
                        //console.log("Login = " + theApplication().GetProfileAttr('Login Name'))
					
						//console.log("!!!!!!!!!!!!!!!!!!!!!!начало!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
						$(document).ready(function () {
							$('#Work_Edit').prop("disabled", true); 						
							//$('#Work_Edit').prop("readonly", "readonly"); 							
						})
						//console.log("!!!!!!!!!!!!!!!!!!!!!!конец!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    }
                    return true
                } else {
                    D(1, "Init process failed!");
                    return false
                }
            } catch (W) {
                D(1, "Init process failed!");
                return false
            }
        };
        j.prototype.InitCTIToolbar = function () {
            try {
                SiebelApp.S_App.CommToolbarUtil.InitApplet();
                D(0, "CTI toolbar: INIT.end")
            } catch (W) {
                D(1, "Init process failed!")
            }
        };
        j.prototype.GetParamFromHiddenTag = function () {
            var W = new JSSPropertySet();
            $(this.GetPlaceholder()).children("input").each(function () {
                var X = $(this);
                W.SetProperty(X.attr("name"), X.attr("value"));
                X.attr("aria-hidden", "true")
            });
            return W
        };
        j.prototype.ProcessObjectInfo = function (W) {
            N = W;
            var X = this.GetParameter("AutomationEnabled");
            if (X !== undefined && X.toLowerCase() === "true") {
                G = true
            }
            K = this.GetParameter("SRN");
            if (K === undefined) {
                K = ""
            }
            if (this.GetParameter("IsUseCookie").toLowerCase() === "true") {
                E = true
            }
            D(3, "IsUseCookie = " + E);
            if (!E) {
                g = this.GetParameter("SNAME");
                if (g !== undefined) {
                    A = this.GetParameter("SID");
                    if (A !== undefined) {
                        A = encodeURIComponent(A)
                    } else {
                        A = ""
                    }
                } else {
                    D(2, "SNAME parameter is missing.")
                }
            }
            if (this.ParseControlInfo()) {
                return true
            } else {
                return false
            }
        };
        j.prototype.GetParameter = function (W) {
            return N.GetProperty(W)
        };
        function l(W) {
            var X = /^\+{0,1}\d*$/;
            return (X.test(W))
        }

        j.prototype.ParseControlInfo = function () {
            var ah = -1;
            var ac = 0;
            var aa = 0;
            var ad;
            var W;
            var ab;
            var ag = SiebelApp.S_App.CommToolbarItem;
            var ai = this.GetParameter("SidewayPopup") + ";Type=Button;Command=SidewayPopup;Enabled=true";
            var af = new ag(ai);
            af.m_state = "enabled";
            O.SidewayPopup = af;
            t = this.GetParameter("NumberOfControls");
            if (t === undefined) {
                D(2, "NumberOfControls parameter is missing.");
                return false
            } else {
                if (!l(t)) {
                    D(2, "Value of NumberOfControls is: " + t);
                    return false
                }
            }
            var ae = t;
            for (var Z = 1; Z <= ae; Z++) {
                ab = this.GetParameter("Control" + Z);
                if (ab === undefined) {
                    D(2, "Parameter with name Control" + Z + " is missing.")
                } else {
                    ad = new ag(ab);
                    if (ah !== ad.m_iSeq) {
                        ah = ad.m_iSeq;
                        ac++;
                        aa = 0
                    }
                    ad.m_iSeq = ac;
                    if (ad.m_index > 0) {
                        ad.m_index = ++aa
                    }
                    if (ad.m_index === 0) {
                        p[ad.m_iSeq] = ad;
                        O[ad.m_name] = ad
                    }
                    if (ad.m_index > 0 || ad.m_bSticky === true) {
                        if (ad.m_index > 0) {
                            t--
                        }
                        I[ad.m_name] = ad;
                        W = M[ad.m_iSeq];
                        if (W === undefined) {
                            W = [];
                            M[ad.m_iSeq] = W
                        }
                        if (ad.m_index !== 0) {
                            W[ad.m_index] = ad
                        }
                    }
                }
            }
            for (var Y = 0; Y < t; Y++) {
                ad = p[Y + 1];
                if (ad === undefined) {
                    continue
                }
                if (ad.m_bSticky === true) {
                    W = M[Y + 1];
                    if (W !== undefined) {
                        for (var X = 1; X < W.length; X++) {
                            W[X].m_bSticky = true
                        }
                    }
                }
            }
            return true
        };
        function k(W) {
            var X = O[W];
            if (X === undefined) {
                X = I[W]
            }
            return X
        }

        j.prototype.InvokeCommandByItemName = function (ac, Z, X) {
            var ab = k(ac);
            if (ab === undefined) {
                D(2, "Control with name: " + ac + "is not found.");
                return
            } else {
                if (ab.m_state === "enabled" && o() === true) {
                    var Y = e(Z, X);
                    var W = ab.m_command;
                    if (SiebelApp.S_App.CommToolbarUtil.IsPSRLogEnabled() === true) {
                        var aa = k(ac).m_tooltip;
                        if (aa === "Write PSR Log") {
                            Y.PSRLog = SiebelApp.S_App.CommToolbarUtil.GetPSRLog()
                        }
                    }
                    D(3, "InvokeToolbarCommand for control: " + ac);
                    SiebelApp.S_App.CommToolbarUtil.SendCommand({
                        url: W, inputKV: Y, error: function () {
                            D(2, "Failed invoking command for control: " + ac + "!")
                        }, needUIFProcessRP: true
                    })
                }
            }
        };
        j.prototype.InvokeCommandToolTip = function (ab, aa, X) {
            var Z = k(ab);
            if (Z === undefined) {
                D(2, "Control with name: " + ab + "is not found.");
                return
            } else {
                if (f === false) {
                    Z.SetTooltip(Z.m_tooltipFromTools)
                } else {
                    var W = Z.m_dynamictooltipCmd;
                    if (W.length > 0) {
                        var Y = e(aa, X);
                        Y.ControlName = Z.m_name;
                        D(3, "invokeCommandToolTip for control: " + ab);
                        SiebelApp.S_App.CommToolbarUtil.SendCommand({
                            url: W, inputKV: Y, error: function () {
                                Z.SetTooltip(Z.m_tooltipFromTools);
                                D(2, "Failed getting dynamic tooltip for control: " + ab + ", Use static tooltip.")
                            }
                        })
                    } else {
                        Z.SetTooltip(Z.m_tooltipFromTools)
                    }
                }
            }
        };
        j.prototype.CallContactFromUI = function (W, Z) {
            if (o() === true && F.length > 0) {
                var Y = e(Z);
                Y.UIPhone = W;
                var X = this.GetParameter("InitCommand1").replace("ShellUIInit", F);
                D(3, "Make call to " + Y.UIPhone + " using command " + F);
                SiebelApp.S_App.CommToolbarUtil.SendCommand({
                    url: X, inputKV: Y, error: function () {
                        D(2, "Failed invoking command: " + F + "!")
                    }, needUIFProcessRP: true
                })
            }
        };
        j.prototype.EditBoxStatusUpdate = function (Z, Y) {
            if (C) {
                return
            }
            var X = e(Y);
            var W = this.GetParameter("InitCommand1").replace("ShellUIInit", "EditBoxStatusUpdate");
            SiebelApp.S_App.CommToolbarUtil.SendCommand({
                url: W, inputKV: X, error: function () {
                    D(2, "Failed invoking command: EditBoxStatusUpdate!")
                }, needUIFProcessRP: false
            })
        };
        function e(ag, af) {
            var ad = {FromCTIToolBar: "true"};
            var Y = false;
            var ae = {};
            $.extend(ae, O, I);
            for (var ab in ae) {
                if (ae.hasOwnProperty(ab)) {
                    var W = ae[ab];
                    if (W.m_type === "edit") {
                        Y = false;
                        if (ag.FocusEdit === ab) {
                            Y = true
                        }
                        if (ag.EditText !== undefined && ag.EditText[ab] !== undefined) {
                            ad[ab] = ag.EditText[ab];
                            ad[ab + "_HasFocus"] = ((af || Y) ? "true" : "false")
                        }
                    } else {
                        if (W.m_type === "combo box" && ag.ComboValue !== undefined) {
                            var ah = ag.ComboValue[ab];
                            if (ah !== undefined && ah.length > 0) {
                                ad[ab] = ah
                            }
                        }
                    }
                }
            }
            var ac = ag.SelText;
            if (ac !== undefined && ac.length > 0) {
                ad.SelectedText = ac
            }
            var aa;
            if (u === null || af) {
                aa = T()
            } else {
                aa = u
            }
            var X = aa.BusComp;
            var Z = aa.Field;
            if (X !== undefined && X.length > 0) {
                ad.FocusBusComp = X;
                if (Z !== undefined && Z.length > 0) {
                    ad.FocusField = Z
                }
            }
            ad.refID = SiebelApp.S_App.CommToolbarUtil.GetRefId();
            return ad
        }

        function B(X, W) {
            if (X !== undefined) {
                return true
            } else {
                D(2, "Control not found : " + W);
                return false
            }
        }

        j.prototype.ExecuteCommand = function (Y) {
            var ak = null;
            var aa = null;
            var ai = false;
            var ab = false;
            if (Y.name === undefined) {
                D(2, "Invalid command!");
                return
            }
            if (Y.m_type !== "UPDATEMENU" && Y.m_type !== "UPDATEMENU") {
                ak = k(Y.control)
            }
            if (ak !== undefined && ak !== null && ak.m_bSticky === true) {
                aa = I[Y.control];
                if (aa === undefined || aa === null) {
                    aa = null;
                    var am = "Error: Fail to find the sticky item from Sideway";
                    this.LogMsg(1, am)
                }
            }
            switch (Y.name.toUpperCase()) {
                case"ENABLECONTROL":
                    if (Y.control === "CallFromUI") {
                        if (Y.value === undefined) {
                            D(2, "Invalid command : " + Y);
                            return
                        } else {
                            if (Y.value.toLowerCase() === "true") {
                                Q = true
                            } else {
                                Q = false
                            }
                        }
                        this.UpdateCallContactFromUI(Q)
                    } else {
                        if (B(ak, Y.control)) {
                            if (Y.value === undefined) {
                                D(2, "Invalid command : " + Y);
                                return
                            } else {
                                ak.SetEnabled(Y.value);
                                if (aa !== null && aa.m_id !== ak.m_id) {
                                    aa.SetEnabled(Y.value)
                                }
                            }
                            ai = true
                        }
                    }
                    break;
                case"UPDATEMENU":
                    if (Y.control === undefined || Y.value === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        SiebelApp.S_App.CommToolbarUtil.UpdateCmdMgrMenu(Y.control, Y.value.toLowerCase())
                    }
                    break;
                case"MSGDISPLAYINTERVAL":
                    if (Y.value === undefined) {
                        D(2, " Invalid command : " + Y);
                        return
                    } else {
                        H = Y.value
                    }
                    break;
                case"IMPLICITSAVE":
                    if (Y.value === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        if (Y.value.toUpperCase() === "TRUE") {
                            R = true
                        }
                    }
                    break;
                case"CTIMESSAGEPREFIX":
                    if (Y.value === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        J = Y.value
                    }
                    break;
                case"CHANGEVALUE":
                    if (B(ak, Y.control)) {
                        if (Y.value === undefined) {
                            D(2, "Invalid command : " + Y);
                            return
                        } else {
                            ak.ChangeValue(Y.value);
                            if (aa !== null && aa.m_id !== ak.m_id) {
                                aa.ChangeValue(Y.value)
                            }
                        }
                    }
                    ai = true;
                    break;
                case"BLINKCONTROL":
                    if (B(ak, Y.control)) {
                        if (Y.value === undefined) {
                            D(2, "Invalid command : " + Y);
                            return
                        } else {
                            ak.Blink(Y.value);
                            if (aa !== null && aa.m_id !== ak.m_id) {
                                aa.Blink(Y.value)
                            }
                            if (L === true && ak.m_name.indexOf("Accept Work") >= 0 && Y.value.toUpperCase() === "TRUE") {
                                this.TriggerEvent(ak.m_name, "click")
                            }
                        }
                    }
                    ai = true;
                    break;
                case"CHANGETOOLTIP":
                    if (B(ak, Y.control)) {
                        if (Y.value === undefined) {
                            D(2, "Invalid command : " + Y);
                            return
                        } else {
                            ak.SetTooltip(Y.value);
                            if (aa !== null && aa.m_id !== ak.m_id) {
                                aa.SetTooltip(Y.value)
                            }
                        }
                    }
                    break;
                case"STARTTIMER":
                    var X = Y.startTime;
                    var ah = Y.serverTime;
                    if (B(ak, Y.control)) {
                        if (X !== undefined && ah !== undefined) {
                            ak.StartTimer(X, ah)
                        } else {
                            D(2, "Invalid command : " + Y);
                            return
                        }
                    }
                    break;
                case"STOPTIMER":
                    if (B(ak, Y.control)) {
                        ak.StopTimer()
                    }
                    break;
                case"SHOWALERT":
                    if (Y.message === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        this.ShowMessageWithAlert(Y.message)
                    }
                    break;
                case"SHOWDOCUMENT":
                case"DOPOPUP":
                case"DOSWEENCODECMD":
                    var af = (Y.checkPopup !== undefined && Y.checkPopup.toUpperCase() === "TRUE" && v());
                    var Z = (Y.url.indexOf("OpenEmailPopup") < 0) && (Y.url.indexOf("UpdateCustDashboardWithBookmark") < 0) && (Y.url.indexOf("HoldChat") < 0) && (Y.url.indexOf("ResumeChat") < 0);
                    if (!af && Z) {
                        if (Y.name.toUpperCase() === "SHOWDOCUMENT" && o() === true) {
                            SiebelApp.S_App.CommToolbarUtil.ShowDocument(Y.url, Y.target, Y.encodedCmd, Y.viewName)
                        } else {
                            if (Y.name.toUpperCase() === "DOPOPUP") {
                                SiebelApp.S_App.CommToolbarUtil.DoPopup(Y.url, Y.width, Y.height)
                            } else {
                                if (Y.name.toUpperCase() === "DOSWEENCODECMD" && o() === true) {
                                    SiebelApp.S_App.CommToolbarUtil.DoSweCmd(Y.url)
                                }
                            }
                        }
                    } else {
                        if (Y.name.toUpperCase() !== "DOSWEENCODECMD" && Y.urlParameters !== undefined) {
                            a(Y, Y.urlParameters, ["SWEService", "SWEMethod", "SWECmd"]);
                            if ((d(Y.SWEService) && Y.SWEService.length > 0) && (d(Y.SWEMethod) && Y.SWEMethod.length > 0) && (d(Y.SWECmd) && Y.SWECmd.toUpperCase() === "INVOKEMETHOD")) {
                                var an = SiebelApp.S_App.GetService(Y.SWEService);
                                if (an) {
                                    if (Z || af) {
                                        Y.urlParameters.SetProperty("ExecuteCommand", "No")
                                    }
                                    an.InvokeMethod(Y.SWEMethod, Y.urlParameters);
                                    D(3, "Invoke Method" + Y.SWEMethod + " for BS: " + Y.SWEService)
                                }
                            }
                        }
                        if (Z || af) {
                            this.ExecuteCommand({name: "SHOWSTATUSTEXT", value: Y.popupErrMsg})
                        }
                    }
                    break;
                case"HASPENDINGPOPUP":
                    if (Y.urlParameters !== undefined) {
                        a(Y, Y.urlParameters, ["SWEService", "SWEMethod", "SWECmd"]);
                        if ((d(Y.SWEService) && Y.SWEService.length > 0) && (d(Y.SWEMethod) && Y.SWEMethod.length > 0) && (d(Y.SWECmd) && Y.SWECmd.toUpperCase() === "INVOKEMETHOD")) {
                            var ag = v() ? "TRUE" : "FALSE";
                            var an = SiebelApp.S_App.GetService(Y.SWEService);
                            if (an) {
                                var aj = CCFMiscUtil_CreatePropSet();
                                aj.SetProperty("HasPendingPopup", ag);
                                if (Y.value !== undefined && Y.value !== null) {
                                    aj.SetProperty("Value", Y.value)
                                }
                                an.InvokeMethod(Y.SWEMethod, aj);
                                D(3, "Invoke Method" + Y.SWEMethod + " for BS: " + Y.SWEService + " Popup: " + ag)
                            }
                        }
                    }
                    break;
                case"DOPUREPOPUP":
                    if (Y.url !== undefined) {
                        var ae = location.protocol;
                        SWEShowFeaturedPopup(ae + "//" + Y.url, Y.target, Y.height, Y.width, Y.feature)
                    } else {
                        D(2, "Invalid command : " + Y);
                        return
                    }
                    break;
                case"REMOVEPOPUP":
                    if (Y.target === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        if (Y.target.length > 0) {
                            var al = Y.target;
                            if (window[al] !== undefined && window[al] !== null) {
                                window[al].close()
                            }
                        }
                    }
                    break;
                case"DONE":
                    break;
                case"REVERSEORDER":
                    break;
                case"TOGGLECONTROL":
                    if (B(ak, Y.control)) {
                        if (Y.value === undefined) {
                            D(2, "Invalid command : " + Y);
                            return
                        } else {
                            ak.SetToggle(Y.value)
                        }
                    }
                    ai = true;
                    break;
                case"SHOWERRORSTATUSTEXT":
                case"SHOWSTATUSTEXT":
                    if (Y.value === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        var ac = Y.value;
                        this.AddMessageToQ(ac);
                        this.ShowStatusText(ac, H);
                        ab = true
                    }
                    break;
                case"PLAYSOUND":
                    var ad = Y.value;
                    if (ad === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        if (ad.length > 0) {
                            this.PlaySound(ad)
                        }
                    }
                    break;
                case"INVOKEMETHOD":
                    if (Y.value === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        if (Y.value.length > 0) {
                            var W = "start.swe?SWECmd=InvokeMethod&SWEService=HTML+Communication+Client&SWEMethod=";
                            W += Y.value;
                            SiebelApp.S_App.CommToolbarUtil.SendCommand({
                                url: W, inputKV: {}, error: function () {
                                    D(2, "Invoke method failed for: " + Y.value + " of HTML Communication Client.")
                                }, needUIFProcessRP: true
                            })
                        }
                    }
                    break;
                case"WAITFORCMD":
                    f = true;
                    SiebelApp.S_App.CommToolbarUtil.StartPush({
                        bPush: true,
                        sCmd: Y.value,
                        StopPushString: r,
                        RetryBeforeStopPush: s
                    });
                    break;
                case"GETMESSAGECMD":
                    if (Y.polling.length > 0 && Y.polling >= 0) {
                        SiebelApp.S_App.CommToolbarUtil.StartPush({
                            bPush: false,
                            sCmd: Y.value,
                            iInterval: Y.polling,
                            StopPushString: r,
                            RetryBeforeStopPush: s
                        })
                    } else {
                        SiebelApp.S_App.CommToolbarUtil.StartPush({
                            bPush: false,
                            sCmd: Y.value,
                            iInterval: 2,
                            StopPushString: r,
                            RetryBeforeStopPush: s
                        })
                    }
                    break;
                case"SHOWPREVIOUSMESSAGE":
                    this.ShowPreviousMessage();
                    ab = true;
                    break;
                case"SHOWNEXTMESSAGE":
                    this.ShowNextMessage();
                    ab = true;
                    break;
                case"AUTOANSWER":
                    if (Y.value !== undefined && Y.value.toUpperCase() === "TRUE") {
                        L = true
                    }
                    break;
                case"BROWSERONFOCUS":
                    this.FlashTitle(y);
                    break;
                case"SERIOUSREFIDERROR":
                    this.SeriousRefIDError();
                    break;
                case"MAXREFIDERROR":
                    if (Y.value !== undefined && Y.message !== undefined) {
                        this.SetMaxRefIDError(Y.value, Y.message)
                    }
                    break;
                case"BRINGTOFRONTTITLE":
                    if (Y.value === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        y = Y.value
                    }
                    break;
                case"ENABLEPSRLOG":
                    SiebelApp.S_App.CommToolbarUtil.SetEnablePSRLog();
                    break;
                case"SETCLIENTPSRLOGLENGTH":
                    if (!isNaN(Y.value)) {
                        SiebelApp.S_App.CommToolbarUtil.SetClientPSRLogLength(Y.value)
                    }
                    break;
                case"INITFAILED":
                    this.HideCTIToolbar();
                    this.GetPModel().SetProperty("InitFailed", true);
                    this.ShowPreviousMessage();
                    break;
                case"CALLFROMUICOMMAND":
                    if (Y.value === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        F = Y.value
                    }
                    break;
                case"STOPPUSHSTRING":
                    if (Y.value === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        r = Y.value
                    }
                    break;
                case"RETRYBEFORESTOPPUSH":
                    if (Y.value === undefined || isNaN(Y.value)) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        s = Y.value
                    }
                    break;
                case"JAVASCRIPTLOGLEVEL":
                    if (Y.value === undefined || isNaN(Y.value)) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        n = Y.value;
                        D(1, "JavaScriptLogLevel : " + n);
                        SiebelApp.S_App.CommToolbarUtil.SetLogLevel(n)
                    }
                    break;
                case"OPENFIND":
                    if (Y.target === undefined) {
                        D(2, "Invalid command : " + Y);
                        return
                    } else {
                        c(Y.target, Y.findFields)
                    }
                    break;
                case"DONOTUSELATESTCMDSTATUS":
                    C = true;
                    break;
                case"EXECUTENEXTCOMMAND":
                    SiebelApp.S_App.CommToolbarUtil.ExecuteNextCommand();
                    break;
                default:
                    break
            }
            if (ai) {
                this.BlinkParentBtn();
                ab = true
            }
            if (ab) {
                this.NotifyUIUpdate()
            }
        };
        function a(Z, X, W) {
            for (var Y = 0; Y < W.length; Y++) {
                Z[W[Y]] = X.GetProperty(W[Y])
            }
        }

        function d(W) {
            return (W !== null && W !== undefined)
        }

        function T() {
            var W = {BusComp: "", Field: ""};
            var aa = App();
            var Z;
            var Y;
            var X;
            var ac;
            var ab;
            if (aa === undefined || aa === null) {
                D(2, "App() failed!");
                return W
            }
            Z = aa.GetMainView();
            if (Z === undefined || Z === null) {
                D(2, "Get no main view!");
                return W
            }
            Y = Z.GetActiveApplet();
            if (Y === undefined || Y === null) {
                D(2, "No active applet found!");
                return W
            }
            X = Y.GetBusComp();
            if (X === undefined || X === null) {
                D(2, "No BC found for current active applet !")
            } else {
                W.BusComp = X.GetName()
            }
            ac = Y.GetActiveControl();
            if (ac === undefined || ac === null) {
                D(3, "No active control found for current active applet!")
            } else {
                ab = ac.GetFieldName();
                W.Field = ab
            }
            return W
        }

        j.prototype.AddMessageToQ = function (W) {
            if (m.length < 10) {
                m.push(W)
            } else {
                m.shift();
                m.push(W)
            }
            V = m.length
        };
        j.prototype.ShowNextMessage = function () {
            var W;
            if (m.length === 0) {
                return
            }
            if (V < m.length - 1) {
                W = m[++V]
            } else {
                V = m.length - 1;
                W = m[m.length - 1]
            }
            W = V + ". " + W;
            this.ShowStatusText(W, H)
        };
        j.prototype.ShowPreviousMessage = function () {
            var W;
            if (m.length === 0) {
                return
            }
            if (V > 0) {
                W = m[--V]
            } else {
                W = m[0]
            }
            if (!this.GetPModel().Get("InitFailed")) {
                W = V + ". " + W
            }
            this.ShowStatusText(W, H)
        };
        j.prototype.ShowStatusText = function (X, W) {
        };
        j.prototype.ShowMessageWithAlert = function (W) {
        };
        j.prototype.TriggerEvent = function (X, W) {
        };
        j.prototype.UpdateHTMLControl = function (Y, X, W) {
        };
        j.prototype.PlaySound = function (W) {
        };
        j.prototype.FlashTitle = function (W) {
        };
        j.prototype.BlinkParentBtn = function () {
        };
        j.prototype.GotoCTIToolbar = function () {
        };
        j.prototype.HideCTIToolbar = function () {
        };
        j.prototype.UpdateCallContactFromUI = function (W) {
        };
        j.prototype.ApplySticky = function (X) {
            var W = k(X);
            if (W !== undefined && W !== null && W.m_bSticky === true) {
                var Y = p[W.m_iSeq];
                if (Y !== undefined && Y !== null) {
                    O[Y.m_name] = undefined;
                    Y.ReplaceInfo(W);
                    Y.SetEnabled("true");
                    O[Y.m_name] = Y
                }
            }
        };
        j.prototype.CollectFocusInfo = function () {
            u = T()
        };
        j.prototype.ClearFocusInfo = function () {
            u = null
        };
        j.prototype.IsUseCookies = function () {
            return E
        };
        j.prototype.GetSessionName = function () {
            return g
        };
        j.prototype.GetSessionId = function () {
            return A
        };
        j.prototype.GetSessionRN = function () {
            return K
        };
        function o() {
            if (R === false) {
                return true
            }
            return SiebelApp.S_App.CommToolbarUtil.ImplicitSave()
        }

        function v() {
            if (SiebelApp.S_App.GetPopupPM().Get("state") === z.get("POPUP_STATE_VISIBLE")) {
                return true
            } else {
                return false
            }
        }

        j.prototype.SeriousRefIDError = function () {
            i++;
            D(1, "Serious Error <" + i + ">: Ref ID is less than expected!");
            if (w > 0 && i >= w) {
                SiebelApp.S_App.CommToolbarUtil.StopPush();
                D(1, S);
                this.ExecuteCommand({name: "SHOWSTATUSTEXT", value: S})
            }
        };
        j.prototype.PushError = function () {
            x++;
            D(1, "Serious Error <" + x + ">: Push Response Error!");
            if (w > 0 && x >= w) {
                SiebelApp.S_App.CommToolbarUtil.StopPush();
                D(1, S);
                this.ExecuteCommand({name: "SHOWSTATUSTEXT", value: S})
            }
        };
        j.prototype.SetMaxRefIDError = function (X, W) {
            if (!isNaN(X)) {
                w = X
            }
            S = W
        };
        function D(X, W) {
            SiebelApp.S_App.CommToolbarUtil.Log(X, "commToolbarpui.js: " + W)
        }

        j.prototype.CallContactFromUIEnabled = function () {
            return Q
        };
        j.prototype.OpenCallContactFromUIPopup = function (W, X) {
        };
        j.prototype.DisableAllButtons = function () {
            var Y;
            var X = {};
            $.extend(X, O, I);
            for (var W in X) {
                if (X.hasOwnProperty(W)) {
                    Y = X[W];
                    if (Y.m_type === "button") {
                        Y.SetEnabled("FALSE")
                    }
                }
            }
        };
        j.prototype.NotifyUIUpdate = function () {
            var W = SiebelApp.S_App.getExtObject("CommunicationPanel");
            if (!W || !W.Get("Show")) {
                this.NotifyCommPanel()
            }
        };
        j.prototype.NotifyCommPanel = function () {
        };
        function U() {
            var W = 3;
            var X = true;
            SiebelApp.S_App.CommToolbarUtil.SetLogLevel(W);
            h = X;
            P()
        }

        function P() {
            if (SiebelApp.S_App.CommToolbarUtil.isJavaEnabled() == false) {
                D(0, "BuildHTMLPageToLoadCTIUtilApplet: JRE is disabled at this env, skip this function");
                return
            }
            var Y = SiebelApp.S_App.CommToolbarUtil.GetCTIUtilApplet();
            var Z = window.parent.SIEBEL_BUILD;
            var W = Z.indexOf("/");
            Z = Z.substring(0, W);
            if (!Y) {
                var X = '<object id="SiebelCTIJavaApplet" ';
                X += '  classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" width=0 height=0>';
                X += '  <param name="code" value="com.siebel.applets.ctiutil.SiebelCTIUtilApplet.class">';
                X += '  <param name="codebase" value=".">';
                X += '  <param name="archive" value="' + Z + '/applets/SiebelCTIUtil.jar">';
                X += '  <param name="scriptable" value="true">';
                X += "    <comment>";
                X += '      <embed id="SiebelCTIJavaApplet2" ';
                X += '        code="com.siebel.applets.ctiutil.SiebelCTIUtilApplet.class"';
                X += '        codebase="." archive="' + Z + '/applets/SiebelCTIUtil.jar"';
                X += '        type="application/x-java-applet;version=1.7" pluginspage="http://java.com/download/"';
                X += "        width=0 height=0>";
                X += "        <noembed>";
                X += "          No Java Support.";
                X += "        </noembed>";
                X += "      </embed>";
                X += "    </comment>";
                X += "</object>";
                jQuery(X).appendTo("body")
            }
        }

        function c(Y, X) {
            var ac = SiebelAppFacade.ComponentMgr.FindComponent({id: z.get("SWE_PST_SEARCH_NAME")});
            if (!ac) {
                D(1, "Failed at invoking Search Pane, Search component unavailable! ");
                return
            }
            var Z = CCFMiscUtil_CreatePropSet();
            var W = CCFMiscUtil_CreatePropSet();
            var ab = CCFMiscUtil_CreatePropSet();
            Z.SetProperty("bcDisplayName", Y);
            for (var aa in X) {
                if (X.hasOwnProperty(aa)) {
                    ab.SetProperty(aa, X[aa])
                }
            }
            Z.AddChild(ab);
            D(1, "Invoke ExposedOpenSearchPanel for " + Y);
            SiebelApp.S_App.CommToolbarUtil.PSRLog("[PSR] Invoke ExposedOpenSearchPanel for [" + Y + "]");
            ac.ExecuteMethod("ExposedOpenSearchPanel", Z, W)
        }

        return new j()
    }())
}
;

if (typeof(SiebelApp.S_App.CommToolbar) === "undefined") {
    var parseParameters = SiebelApp.S_App.CommToolbar.prototype.ParseParameters;
    //SiebelApp.S_App.CommToolbar.prototype.ParseParameters = function () {
    //    parseParameters.call(this);
    //    console.clear();
    //    console.log('SiebelApp.S_App.CommToolbar.prototype.ParseParameters');
    //
        //console.log("CTI toolbar: SoftPhoneEnable - " + SiebelApp.S_App.CommToolbarUtil.SoftPhoneEnable());
        //console.log("CTI toolbar: TelesetExtension - " + SiebelApp.S_App.CommToolbarUtil.getTelesetExt());
    //}
}