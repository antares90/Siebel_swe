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
/* 8.1.1.14SIA[23044]PATCHSET8 */
if (typeof(SiebelAppFacade.AlarmMgrPM) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.AlarmMgrPM");
    define("siebel/custom_alarmmgrpm", [], function() {
        SiebelAppFacade.AlarmMgrPM = (function() {
            var n = SiebelJS.Dependency("SiebelApp.Constants");
            var e = n.get("SWE_EXTN_CANCEL_ORIG_OP"),
                r = n.get("SWE_EXTN_RETVAL"),
                j = n.get("SWE_EXTN_STOP_PROP_OP");

            function i(A) {
                SiebelAppFacade.AlarmMgrPM.superclass.constructor.call(this, A)
            }
            SiebelJS.Extend(i, SiebelAppFacade.PresentationModel);
            i.prototype.Init = function() {
                SiebelAppFacade.AlarmMgrPM.superclass.Init.call(this, arguments);
                this.AddProperty("Alarms", []);
                this.AddProperty("pollId", "");
                this.AddProperty("timerId", -1);
                this.AddProperty("msgId", "");
                this.AddProperty("nextAlarm", 0);
                this.AddProperty("dueAlarm", -1);
                this.AddProperty("dispAlarm", -1);
                this.AddProperty("Load Frequency", 2);
                this.AddMethod("prev", m);
                this.AddMethod("next", o);
                this.AddMethod("GetAlarm", k);
                this.AddMethod("DismissAlarm", h);
                this.AddMethod("DismissAll", a);
                this.AddMethod("SetSnooze", c);
                this.AddMethod("SnoozeAlarm", s);
                this.AddMethod("SnoozeAll", b);
                this.AddMethod("CanUpdate", g, {
                    scope: this,
                    sequence: true
                });
                this.AddMethod("CanInvokeMethod", d, {
                    scope: this,
                    sequence: true
                });
                this.AddMethod("InvokeMethod", z, {
                    scope: this,
                    sequence: true
                });
                this.AddMethod("GetFieldValue", w, {
                    core: true,
                    override: true,
                    scope: this
                });
                this.AddMethod("GetFormattedFieldValue", v, {
                    core: true,
                    override: true,
                    scope: this
                });
                this.AddMethod("SetFormattedValue", u, {
                    core: true,
                    override: true,
                    scope: this
                });
                this.AddMethod("RefreshUI", p);
                this.AddMethod("notifyAlarm", t);
                this.AttachEventHandler(n.get("PHYEVENT_APPLET_FOCUS"), function() {
                    var A = arguments[arguments.length - 1];
                    A[e] = true;
                    A[j] = true;
                    return false
                })
            };
            i.prototype.Setup = function(B) {
                var A = this;
                SiebelAppFacade.AlarmMgrPM.superclass.Setup.call(this, B);
                setTimeout(function() {
                    l.call(A, true)
                }, 30000)
            };

            function t() {
                if (this.Get("pollId").length > 0) {
                    clearTimeout(this.Get("pollId"))
                }
                l.call(this, false)
            }

            function g(D) {
                var B = arguments[arguments.length - 1];
                if (B && (B instanceof Object)) {
                    var A = n.get("SWE_EXTN_RETVAL");
                    var C = n.get("SWE_EXTN_CANCEL_ORIG_OP");
                    if (D === "Snooze") {
                        B[C] = true;
                        B[A] = true
                    }
                }
            }

            function d(D) {
                var B = arguments[arguments.length - 1];
                if (B && (B instanceof Object)) {
                    var A = n.get("SWE_EXTN_RETVAL");
                    var C = n.get("SWE_EXTN_CANCEL_ORIG_OP");
                    var F = this.Get("dispAlarm");
                    var E = this.Get("nextAlarm");
                    if (D === "Next") {
                        B[C] = true;
                        B[A] = (F < E - 1)
                    } else {
                        if (D === "Prev") {
                            B[C] = true;
                            B[A] = (F > 0)
                        } else {
                            if (D === "SnoozeAll" || D === "DismissAll") {
                                B[C] = true;
                                B[A] = (E > 1)
                            }
                        }
                    }
                }
                return true
            }

            function z(B, D, C) {
                var A = arguments[arguments.length - 1];
                if (!B) {
                    return false
                }
                switch (B) {
                    case "Next":
                        o.call(this);
                        A[e] = true;
                        A[r] = false;
                        break;
                    case "Prev":
                        m.call(this);
                        A[e] = true;
                        A[r] = false;
                        break;
                    case "SnoozeAlarm":
                        s.call(this);
                        A[e] = true;
                        A[r] = false;
                        break;
                    case "SnoozeAll":
                        b.call(this);
                        A[e] = true;
                        A[r] = false;
                        break;
                    case "DismissAlarm":
                        h.call(this);
                        console.log(h);
                        A[e] = true;
                        A[r] = false;
                  
                        break;
                    case "DismissAll":
                        a.call(this);
                        A[e] = true;
                        A[r] = false;
                        break;
                    default:
                        break
                }
                return true
            }

            function v(C, B, A) {
                return w.call(this, C, A)
            }

            function w(C, A) {
                var E = k.call(this.GetPModel());
                var B = "";
                var D = C.GetFieldName();
                if (E) {
                    switch (D) {
                        case "Type":
                            B = E.apptType;
                            break;
                        case "Description":
                            B = E.description;
                            break;
                        case "Comment":
                            B = E.apptComment;
                            break;
                        case "MeetingLocation":
                            B = E.apptLocation;
                            break;
                        case "Due Date":
                            B = E.due;
                            break;
                        case "Appt Alarm Time Min":
                            B = E.SnoozeTimeVal;
                            break;
                        case "Alarm":
                            B = (this.GetPModel().Get("dispAlarm") + 1) + " / " + this.GetPModel().Get("nextAlarm");
                            break;
                        default:
                            break
                    }
                }
                return B
            }

            function u(B, A) {
                var D = k.call(this.GetPModel());
                var C = B.GetFieldName();
                if (D && (C === "Appt Alarm Time Min")) {
                    D.SnoozeTimeVal = A
                }
                return true
            }

            function f(E, D, J, B, H, I, K, L, M, C, F, G) {
                var A = {};
                A.actualDate = E;
                A.actualTime = D;
                A.endDate = H;
                A.endTime = I;
                A.date = new Date(E.slice(6), (E.slice(0, 2) - 1), E.slice(3, 5), D.slice(0, 2), D.slice(3, 5), D.slice(6));
                A.apptDate = new Date(A.date);
                A.date.setTime(A.date.getTime() - (M * 60 * 1000));
                A.lead = M;
                A.description = J;
                A.apptId = B;
                A.apptType = K;
                A.apptRepAct = L;
                A.SnoozeTimeVal = (C > 0 ? C : 15);
                A.apptComment = F;
                A.apptLocation = G;
                A.due = formatDate(E) + " " + D.slice(0, 5) + " - " + formatDate(H) + " " + I.slice(0, 5); // Добавили ф-ю форматирования даты в формате dd/MM/YYYY

                /** LETO-7626 */
                function formatDate(date) {

                	var ms = Date.parse(date);
                	var dddd = new Date(ms);
	                var dd = dddd.getDate() < 10 ? "0" +  dddd.getDate() : dddd.getDate();
	                var mm = (dddd.getMonth()+1) < 10 ? "0" + (dddd.getMonth()+1) : (dddd.getMonth()+1);
	                var yyyy = dddd.getFullYear();

	                return "" + dd + "/" + mm + "/" + yyyy;
            	}
				
                A.timerId = -1;
                A.MsgId = "";
                return (A)
            }

            function l(I) {
                var B = new Date();
                var A = CCFMiscUtil_CreatePropSet();
                var J = CCFMiscUtil_CreatePropSet();
                var C = 60 + (60 * 24);
                var H = {};
                var D = CCFMiscUtil_CreatePropSet();
                var F;
                A.SetProperty("alarmDate", (B.getMonth() + 1) + "/" + B.getDate() + "/" + B.getFullYear());
                A.SetProperty("now", B.getHours() + ":" + B.getMinutes() + ":" + B.getSeconds());
                A.SetProperty("interval", C);
                A.SetProperty("SWEJI", "false");
                A.SetProperty("OUIAlarm", "Y");
                A.SetProperty("packUIStrings", "true");
                A.SetProperty("preferenceOnly", I);
                var E = SiebelApp.S_App.GetService("Alarm Manager");
                var G = this;
                if (E) {
                    J = null;
                    H.async = true;
                    H.npr = false;
                    H.selfbusy = true;
                    H.scope = this;
                    if (!I) {
                        H.cb = function() {
                            J = arguments[2];
                            q.call(G, J)
                        }
                    } else {
                        H.cb = function() {
                            J = arguments[2];
                            D = J.GetChildByType("ResultSet");
                            if (D !== null) {
                                F = parseInt(D.GetProperty("strLoadDelay"), 10);
                                if (F > 0) {
                                    setTimeout(function() {
                                        l.call(G, false)
                                    }, F * 1000)
                                } else {
                                    l.call(G, false)
                                }
                            } else {
                                setTimeout(function() {
                                    l.call(G, false)
                                }, 30000)
                            }
                        }
                    }
                    E.InvokeMethod("GetAlarms", A, H)
                } else {
                    this.SetProperty("pollId", setTimeout(function() {
                        l.call(G, false)
                    }, this.Get("Load Frequency") * 60000))
                }
            }

            function q(Y) {
                var aa = CCFMiscUtil_CreatePropSet();
                var F;
                var M;
                if (Y !== null) {
                    aa = Y.GetChildByType("ResultSet");
                    var C = this.Get("Alarms");
                    var ad = C.length;
                    if (aa !== null) {
                        F = parseInt(aa.GetProperty("strLoadFrequency"), 10);
                        if (F) {
                            this.SetProperty("Load Frequency", F)
                        }
                        if (aa.GetProperty("strSnoozeTimes") !== null) {
                            var ab = aa.GetProperty("strSnoozeTimes").split("|");
                            var E = this.Get("GetControls");
                            var S = CCFMiscUtil_CreatePropSet();
                            for (var X = 0; X < ab.length; X++) {
                                var R = CCFMiscUtil_CreatePropSet();
                                R.SetProperty("DisplayName", ab[X]);
                                S.AddChild(R)
                            }
                            E.Snooze.SetRadioGroupPropSet(S)
                        }
                        var I = C.slice(0);
                        C.splice(0, ad);
                        var A = aa.GetPropertyCount() - 16;
                        var N = 0;
                        for (N = 0; N * 13 < A; N++) {
                            if (aa.GetProperty("apptDate" + N) === null) {
                                continue
                            }
                            var Q = aa.GetProperty("apptDate" + N);
                            var B = aa.GetProperty("apptTime" + N);
                            var W = aa.GetProperty("apptDesc" + N);
                            var L = aa.GetProperty("apptId" + N);
                            var ac = aa.GetProperty("apptType" + N);
                            var D = aa.GetProperty("apptEndDate" + N);
                            var P = aa.GetProperty("apptEndTime" + N);
                            var O = aa.GetProperty("repAct" + N);
                            var H = aa.GetProperty("reminder" + N);
                            var G = aa.GetProperty("defSnoozeTime" + N);
                            var K = aa.GetProperty("apptComment" + N);
                            var Z = aa.GetProperty("apptLocation" + N);
                            M = f.call(this, Q, B, W, L, D, P, ac, O, H, G, K, Z);
                            C[N] = M;
                            for (var V = 0; V < ad; V++) {
                                if ((M.apptId.indexOf(I[V].apptId) !== -1)) {
                                    if ((M.apptDate.getTime() === I[V].apptDate.getTime()) && (M.lead === I[V].lead) && (M.date.getTime() < I[V].date.getTime())) {
                                        C[N].SnoozeTimeVal = I[V].SnoozeTimeVal;
                                        C[N].date = I[V].date;
                                        C[N].timerId = I[V].timerId;
                                        C[N].MsgId = I[V].MsgId
                                    } else {
                                        if (M.date.getTime() === I[V].date.getTime()) {
                                            C[N].timerId = I[V].timerId
                                        }
                                    }
                                    break
                                }
                            }
                        }
                        for (var U = 0; U < ad; U++) {
                            if (I[U].apptRepAct === "Y") {
                                for (var T = 0; T < C.length; T++) {
                                    if (I[U].apptId.indexOf(C[T].apptId) !== -1) {
                                        break
                                    }
                                }
                                if (T === C.length) {
                                    C[N] = I[U];
                                    N++
                                }
                            }
                        }
                    }
                    if (C.length > 1) {
                        C.sort(x)
                    }
                    this.SetProperty("Alarms", C);
                    y.call(this, false)
                }
                var J = this;
                this.SetProperty("pollId", setTimeout(function() {
                    l.call(J)
                }, this.Get("Load Frequency") * 60000))
            }

            function y(F) {
                var H = 0;
                var I = 0;
                var B = new Date();
                var P = false;
                var J = this;
                var C = CCFMiscUtil_CreatePropSet();
                var M = CCFMiscUtil_CreatePropSet();
                var L = CCFMiscUtil_CreatePropSet();
                var K = SiebelApp.S_App.GetMsgBarPM();
                var G = this.Get("timerId");
                var D = this.Get("msgId");
                var O = this.Get("nextAlarm");
                var E = this.Get("dueAlarm");
                var A = this.Get("dispAlarm");
                var N = this.Get("Alarms");
                if (!F && G > 0) {
                    clearTimeout(G);
                    G = -1;
                    if (O < N.length) {
                        N[O].timerId = -1
                    }
                }
                for (I = 0; I < N.length && N[I].date.getTime() <= B.getTime(); I++) {
                    H++;
                    if (!P) {
                        if (N[I].timerId < 0) {
                            P = true;
                            N[I].timerId = 0;
                            E = I;
                            F = true
                        } else {
                            if (N[I].timerId === G) {
                                P = true;
                                E = I
                            }
                        }
                    } else {
                        N[I].timerId = 0
                    }
                }
                O = I;
                if (typeof(K) !== "undefined") {
                    L.SetType("Local");
                    L.SetProperty("Type", "Alarm");
                    L.SetProperty("Abstract", "((( " + this.Get("GetAppletLabel") + " )))");
                    L.SetProperty("Callback", "PM:" + this.GetObjName() + ":RefreshUI");
                    if (D.length === 0) {
                        if (H > 0) {
                            L.SetProperty("Body", H + " " + this.Get("GetAppletLabel"));
                            C.AddChild(L);
                            //M = K.ExecuteMethod("AddNotification", C);
                            if (M.GetChildCount() > 0) {
                                D = M.GetChild(0).GetProperty("Msg Id")
                            }
                        }
                    } else {
                        if (H > 0) {
                            L.SetProperty("Msg Id", D);
                            L.SetProperty("Body", H + " alarm pending.");
                            C.AddChild(L);
                            K.ExecuteMethod("UpdateNotification", C)
                        } else {
                            L.SetProperty("Msg Id", D);
                            C.AddChild(L);
                            K.ExecuteMethod("DeleteNotification", C);
                            D = ""
                        }
                    }
                }
                if (N.length > 0 && O < N.length) {
                    G = setTimeout(function() {
                        y.call(J, true)
                    }, Math.abs(N[O].date.getTime() - B.getTime()));
                    N[O].timerId = G
                }
                this.SetProperty("timerId", G);
                this.SetProperty("msgId", D);
                this.SetProperty("nextAlarm", O);
                this.SetProperty("dueAlarm", E);
                this.SetProperty("Alarms", N);
                if (A < 0 || A >= O) {
                    this.SetProperty("dispAlarm", E)
                }
                this.ExecuteMethod("RefreshUI")
            }

            function p() {
                var A = SiebelAppFacade.ComponentMgr.FindComponent({
                    id: this.GetObjName()
                });
                if (A) {
                    A.Show()
                }
            }

            function k() {
                var A = this.Get("dispAlarm");
                if (A >= 0) {
                    return this.Get("Alarms")[A]
                } else {
                    return null
                }
            }

            function c(C) {
                var B = this.Get("Alarms");
                var A = this.Get("dispAlarm");
                B[A].SnoozeTimeVal = C;
                this.SetProperty("Alarms", B)
            }

            function o() {
                var A = this.Get("dispAlarm");
                if (A < this.Get("nextAlarm")) {
                    A++;
                    this.SetProperty("dispAlarm", A)
                }
                this.ExecuteMethod("RefreshUI")
            }

            function m() {
                var A = this.Get("dispAlarm");
                if (A > 0) {
                    A--;
                    this.SetProperty("dispAlarm", A)
                }
                this.ExecuteMethod("RefreshUI")
            }

            function s() {
                var A = this.Get("dispAlarm");
                var B = this.Get("Alarms");
                B[A].date.setTime(new Date().getTime() + (B[A].SnoozeTimeVal * 60 * 1000));
                B[A].timerId = -1;
                if (A + 1 === this.Get("nextAlarm") && A > 0) {
                    A--;
                    this.SetProperty("dispAlarm", A)
                }
                B.sort(x);
                this.SetProperty("Alarms", B);
                y.call(this, false)
            }

            function b() {
                var C = this.Get("Alarms");
                var A = this.Get("dispAlarm");
                for (var B = 0; B < this.Get("nextAlarm"); B++) {
                    C[B].SnoozeTimeVal = C[A].SnoozeTimeVal;
                    C[B].date.setTime(new Date().getTime() + (C[B].SnoozeTimeVal * 60 * 1000));
                    C[B].timerId = -1
                }
                C.sort(x);
                this.SetProperty("Alarms", C);
                y.call(this, false)
            }

            function h() {
                var B = SiebelApp.S_App.GetService("Alarm Manager");
                var H = SiebelApp.S_App.NewPropertySet();
                var G = this.Get("nextAlarm");
                var D = this.Get("dispAlarm");
                var E = this.Get("Alarms");
                var A;
                if (E[D].apptRepAct === "N") {
                    H.SetProperty("alarmId", E[D].apptId + "|");
                    H.SetProperty("SWEJSXInfo", "false");
                    E.splice(D, 1);
                    if (B) {
                        A = null;
                        var C = "DismissAlarm";
                        var F = {};
                        F.async = true;
                        F.selfbusy = true;
                        F.scope = this;
                        F.cb = function() {
                            y.call(this, false)
                        };
                        B.InvokeMethod(C, H, F)
                    }
                } else {
                    E.splice(D, 1)
                }
                this.SetProperty("nextAlarm", G--);
                this.SetProperty("Alarms", E);
                y.call(this, false)
            }

            function a() {
                var H = "";
                var A = SiebelApp.S_App.GetService("Alarm Manager");
                var G = SiebelApp.S_App.NewPropertySet();
                var F = this.Get("nextAlarm");
                var D = this.Get("Alarms");
                for (var C = 0; C < F; C++) {
                    if (D[C].apptRepAct === "N") {
                        H += D[C].apptId + "|"
                    }
                }
                G.SetProperty("alarmId", H);
                G.SetProperty("SWEJSXInfo", "false");
                if (A) {
                    outPropSet = null;
                    var B = "DismissAlarm";
                    var E = {};
                    E.async = true;
                    E.selfbusy = true;
                    E.scope = this;
                    E.cb = function() {
                        y.call(this, false)
                    };
                    A.InvokeMethod(B, G, E)
                }
                D.splice(0, F);
                this.SetProperty("Alarms", D);
                this.SetProperty("nextAlarm", 0);
                y.call(this, false)
            }

            function x(B, A) {
                if (B.date.valueOf() > A.date.valueOf()) {
                    return 1
                } else {
                    if (B.date.valueOf() < A.date.valueOf()) {
                        return -1
                    } else {
                        return 0
                    }
                }
            }
            return i
        }());
        return SiebelAppFacade.AlarmMgrPM
    })
};