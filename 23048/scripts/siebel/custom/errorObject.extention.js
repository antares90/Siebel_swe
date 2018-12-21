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
if (typeof(SiebelApp.S_App.ErrorObject) !== "undefined") {
    SiebelJS.Namespace("SiebelApp.S_App.ErrorObject");
    var consts = SiebelJS.Dependency("SiebelApp.Constants");
    var utils = SiebelJS.Dependency("SiebelApp.Utils");
    SiebelApp.S_App.ErrorObject = (function () {
        function g() {
            var j = ["Global"], l = [[]], k = null, i = true, h = [];
            this.GetErrorSuppressState = function () {
                return i
            };
            this.SetErrorSuppressState = function (m) {
                i = m
            };
            this.AddCapableObject = function (n) {
                var m = false;
                if (j.indexOf(n) === -1) {
                    j.push(n);
                    l.push([]);
                    h.push(false);
                    m = true
                }
                return m
            };
            this.GetIndex = function (m) {
                return (j.indexOf(m === undefined ? "Global" : m))
            };
            this.HasServerError = function (n) {
                var m = this.GetIndex(n || this);
                return m === -1 ? false : h[m]
            };
            this.SetServerError = function (n, o) {
                var m = this.GetIndex(n || this);
                if (m !== -1) {
                    h[m] = o
                }
            };
            this.GetErrorArray = function (n) {
                var m = this.GetIndex(n);
                return m === -1 ? null : l[m]
            };
            this.ResetErrorArray = function (n) {
                var m = this.GetIndex(n);
                if (m !== -1) {
                    l[m] = []
                }
            };
            this.DeleteErrorObj = function (n) {
                var m = this.GetIndex(n);
                if (m > -1) {
                    j.splice(m, 1);
                    l.splice(m, 1);
                    h.splice(m, 1)
                }
            };
            this.AddErrorRecord = function (n, o) {
                var m = this.GetIndex(o);
                if (m !== -1) {
                    l[m].push(n)
                } else {
                    SiebelJS.Log("Failed to save error message")
                }
            };
            this.GetErrorRendr = function () {
                if (!k) {
                    k = new SiebelAppFacade.ErrorObjectRenderer(new SiebelAppFacade.BasePM({
                        GetName: function () {
                            return "ErrorObject"
                        }, GetPropArray: function () {
                            return []
                        }, GetMethodArray: function () {
                            return []
                        }
                    }));
                    k.ShowUI();
                    k.BindData();
                    k.BindEvents()
                }
                return k
            }
        }

        g.prototype.AddErrorMsgText = function (i, j, h) {
            b.call(this, i, j, h)
        };
        g.prototype.ProcessError = function () {
            d.apply(this, arguments)
        };
        g.prototype.SetErrorMsg = function (h, i) {
            e.call(this, h, i)
        };
        g.prototype.ClearErrorMsg = function () {
            f.apply(this, arguments)
        };
        g.prototype.HasErrorMsg = function () {
            a.apply(this, arguments)
        };
        g.prototype.DecorateErrorCapability = function (h) {
            if (this.AddCapableObject(h)) {
                h.ProcessError = function () {
                    if (!this.CanProcessError || this.CanProcessError(SiebelApp.S_App.ErrorObject.GetErrorArray(this))) {
                        d.call(SiebelApp.S_App.ErrorObject, this)
                    } else {
                        f.call(SiebelApp.S_App.ErrorObject, this)
                    }
                };
                h.SetErrorMsg = function (i, j) {
                    e.call(SiebelApp.S_App.ErrorObject, i, j, this)
                };
                h.ClearErrorMsg = function () {
                    f.call(SiebelApp.S_App.ErrorObject, this)
                };
                h.HasErrorMsg = function () {
                    a.call(SiebelApp.S_App.ErrorObject, this)
                };
                h.AddErrorMsgText = function (j, k, i) {
                    b.call(SiebelApp.S_App.ErrorObject, j, k, i, this)
                };
                h.HasServerError = function () {
                    return SiebelApp.S_App.ErrorObject.HasServerError.call(SiebelApp.S_App.ErrorObject, this)
                };
                h.SetServerError = function (i) {
                    SiebelApp.S_App.ErrorObject.SetServerError.call(SiebelApp.S_App.ErrorObject, this, i)
                }
            }
        };
        function d(n) {
            var h = consts.get("SSAELErrUserDefinedError");
            var j = this.GetErrorArray(n);
            var m = j === null ? 0 : j.length;
            var l = "";
            if (m === 0) {
                return
            }
            for (var k = 0; k < m; k++) {
                if (j[k].errCode === h) {
                    l = j[k].errMsg;
                    break
                }
                if (m > 1) {
                    l += "[" + (k + 1) + "]"
                }
                l += j[k].errMsg + "\n"
            }
            if (l) {

                l = l.replace(/(?:\r\n|\r|\n)/g, '<br />');
                showErrorMsg(HtmlDecode(l));
            }
            f.call(this, n)
        }

        function f(h) {
            h.SetServerError(false);
            this.ResetErrorArray(h)
        }

        function showErrorMsg(msg){
            if (msg) {
                $("<div class='alert-wrap'></div>").html(msg).dialog({
                    //title: title,
                    resizable: false,
                    modal: true,
                    buttons: {
                        "Ok": {
                            click: function () {
                                $(this).dialog("close");
                            },
                            text: 'Ok',
                            class: 'appletButton'
                        }
                        //"Ok": function()
                        //{
                        //    $( this ).dialog( "close" );
                        //}
                    },
                    create:function () {
                        $(this).parent().addClass("alert-div");

                        var t = SiebelApp.S_App.GetActiveView();
                        if (t) {
                            var z = t.GetActiveApplet();
                            if (z) {
                                t.SetActiveAppletBeforePopup(z);
                                document.activeElement.blur();
                            }
                        }
                    },
                    beforeClose: restoreFocus
                });
            }
        }

        function restoreFocus() {
            var t = SiebelApp.S_App.GetActiveView();
            if (!!t) {
                var a = t.GetActiveAppletBeforePopup();
                if (!!a) {
                    t.SetActiveAppletBeforePopup(null);
                    t.SetActiveAppletInternal(a);
                    a.SetAppletActive(true, a);
                    a.SetFocusDefaultControl(true);
                    a.FocusDefaultControl();
                }
            }
        }

        function e(h, k, j) {
            var i = {};
            f.call(this, j);
            if (h === "OK") {
                return true
            }
            i.errCode = h;
            i.errMsg = SiebelApp.S_App.LocaleObject.GetLocalString(h);
            if (!i.errMsg) {
                i.errMsg = h
            } else {
                if (k) {
                    if (h === "LocaleErrFormattedToString") {
                        i.errMsg = '"' + k + '": ' + i.errMsg
                    } else {
                        i.errMsg.replace("%1", k)
                    }
                }
            }
            this.AddErrorRecord(i, j)
        }

        function b(i, j, h, l) {
            var k = {};
            k.errCode = i;
            k.errMsg = j;
            (l || this).SetServerError(true);
            this.AddErrorRecord(k, l)
        }

        function a(j) {
            var i = false;
            var h = this.GetErrorArray(j);
            if (h && (h.length > 0)) {
                i = true
            }
            return i
        }

        function c(h) {
        }

        return new g()
    }())
};
