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
if (typeof(SiebelAppFacade.AlarmMgrPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.AlarmMgrPR");
    define("siebel/alarmmgrpr", ["siebel/phyrenderer"], function() {
        SiebelAppFacade.AlarmMgrPR = (function() {
            function a(b) {
                SiebelAppFacade.AlarmMgrPR.superclass.constructor.call(this, b)
            }
            SiebelJS.Extend(a, SiebelAppFacade.PhysicalRenderer);
            a.prototype.Init = function() {
                SiebelAppFacade.AlarmMgrPR.superclass.Init.call(this);
                var b = $("#s_" + this.GetPM().Get("GetFullId") + "_div");
                b.find("form").attr("name", "SWEAlarmForm0_0");
                b.dialog({
                    autoOpen: false,
                    height: "auto",
                    width: "auto",
                    title: this.GetPM().Get("GetAppletLabel"),
                    modal: true,
                    closeOnEscape: false,
                    resizable: false
                });
                b.parent().find(".ui-dialog-titlebar-close").addClass("siebui-alarmmgr-close-btn");
                b.addClass("siebui-alarmmgr-applet")
            };
            a.prototype.ShowUI = function() {
                var b = SiebelJS.Dependency("SiebelApp.Constants");
                var f = b.get("SWE_PST_BUTTON_CTRL");
                var i = b.get("SWE_CTRL_TEXT");
                var h = b.get("SWE_CTRL_TEXTAREA");
                var c = this.GetPM();
                if (c.Get("nextAlarm") === 0) {
                    $("#s_" + c.Get("GetFullId") + "_div").dialog("close")
                } else {
                    if (!$("#s_" + c.Get("GetFullId") + "_div").dialog("isOpen")) {
                        $("#s_" + c.Get("GetFullId") + "_div").dialog("open");
                        /*##vmikhailov.LETO-9723.20/03/2018. Web Notification
                        if (window.Notification) {
                            if (Notification.permission === "granted") {
                            var notif = new Notification("Почта Банк", {body: "Банк, с которым всё хорошо!", icon: "images/custom/garmash.jpg"});

                            notif.onclick = function() {
                            window.focus();
                            notif.close();
                            };
                            } else {
                                Notification.requestPermission();
                            }
                        }
                        ##vmikhailov.LETO-9723.20/03/2018. Web Notification*/
                    }
                    var d;
                    SiebelAppFacade.AlarmMgrPR.superclass.ShowUI.call(this);
                    var g = c.Get("GetControls");
                    for (var e in g) {
                        if (g.hasOwnProperty(e)) {
                            control = g[e];
                            if (d = this.GetUIWrapper(control).GetEl()) {
                                if (control.GetUIType() === f) {
                                    d.addClass("siebui-alarmmgr-btn")
                                } else {
                                    if (control.GetUIType() === i) {
                                        d.addClass("siebui-alarmmgr-field")
                                    } else {
                                        if (control.GetUIType() === h) {
                                            d.addClass("siebui-alarmmgr-field");
                                            d.addClass("siebui-alarmmgr-comment")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            a.prototype.BindData = function() {
                SiebelAppFacade.AlarmMgrPR.superclass.BindData.call(this);
                var d = this.GetPM();
                var c, e;
                var b = d.Get("GetControls");
                for (var g in b) {
                    if (b.hasOwnProperty(g)) {
                        var f = b[g];
                        if (f.GetUIType() === "JTextArea") {
                            c = this.GetUIWrapper(f);
                            e = c.GetEl();
                            if (e) {
                                e.css("height", "10px");
                                e.css("height", e[0].scrollHeight)
                            }
                        }
                    }
                }
            };
            return a
        }());
        return SiebelAppFacade.AlarmMgrPR
    })
};