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
if (typeof(SiebelAppFacade.MsgBrdCstPhyRenderer) === "undefined"){
    SiebelJS.Namespace("SiebelAppFacade.MsgBrdCstPhyRenderer");
    var HTMLMessages = "";
    var HTMLMsgCount = "";
    var isMsgChanged = false;
    var m_strNormal = "";
    var m_strAuto = "";
    var m_strHigh = "";
    var m_strUrgent = "";
    var m_strUrgentWA = "";
    var m_normalColor = "";
    var m_highColor = "";
    var m_urgentColor = "";
    var m_updateInterval = 120;
    var m_prefixNormal = "";
    var m_prefixHigh = "";
    var m_prefixUrgent = "";
    var msgArray = [];
    var consts = SiebelJS.Dependency("SiebelApp.Constants");
    var utils = SiebelJS.Dependency("SiebelApp.Utils");
    var myDlg;
    var objPM = "";
    var m_blinkFlg = false;
    var m_strRdLtstClrCode = "siebui-msgbarbkgrnd-msgread-nomsgs";
    var m_strUnRdLtstClrCode = "";
    var m_blinktimer = "";
    var m_strNtfcSummaryText = "";
    var m_strNtfcDetailsText = "";
    var m_strCloseText = "";
    var m_dWidth = "";
    var m_dPosY = "";
    var m_strNotification = "";
    var m_selectedrowId = "";
    var m_msgexpired = "";
    var m_isUnrdUwA = false;
    var m_strMsgRowClass;
    var m_areAllMsgsRead = false;
    var m_strPreviouslyReadText = "";
    var m_isMobileFlg = false;
    var m_strMarkAllAsReadText = "";
    var m_useRtlClass = false;
    SiebelAppFacade.MsgBrdCstPhyRenderer = (function () {
        function k(p) {
            var o = p;
            this.GetPM = function () {
                return o;
            }
        }

        k.prototype.ShowUI = function () {
            var p = this.GetPM();
            var q = document.getElementById("HTMLMessageBar");
            m_isMobileFlg = (SiebelApp.S_App.IsMobileApplication() === "true");
            m_useRtlClass = (SiebelApp.S_App.GetDirection() ? true : false);
            if (q) {
                p.OnControlEvent("ShowMessageBar");
                $("div[id='HTMLMessageBar']").attr("role", "navigation");
                $("div[id='HTMLMessageBar']").attr("aria-label", "Notification");
            }
            objPM = p;
            var o = SiebelApp.S_App.LocaleObject;
            m_strNtfcSummaryText = o.GetLocalString("IDS_MSG_NOTIFICATION_SUMMARY");
            m_strNtfcDetailsText = o.GetLocalString("IDS_MSG_NOTIFICATION_DETAILS");
            m_strCloseText = o.GetLocalString("IDS_MSG_CLOSE");
            m_strNotification = o.GetLocalString("IDS_MSG_NOTIFICATION");
            m_msgexpired = o.GetLocalString("IDS_MSG_EXPIRED");
            m_strPreviouslyReadText = o.GetLocalString("IDS_MSG_PREVIOUSLY_READ");
            m_strMarkAllAsReadText = o.GetLocalString("IDS_MSG_MARKALL_AS_READ");
            if (m_strNtfcSummaryText === undefined || m_strNtfcSummaryText === "") {
                m_strNtfcSummaryText = "Notification Summary"
            }
            if (m_strNtfcDetailsText === undefined || m_strNtfcDetailsText === "") {
                m_strNtfcDetailsText = "Notification Details"
            }
            if (m_strCloseText === undefined || m_strCloseText === "") {
                m_strCloseText = "Close"
            }
            if (m_strNotification === undefined || m_strNotification === "") {
                m_strNotification = "Notification"
            }
            if (m_msgexpired === undefined || m_msgexpired === "") {
                m_msgexpired = "Message Expired"
            }
            if (m_strPreviouslyReadText === undefined || m_strPreviouslyReadText === "") {
                m_strPreviouslyReadText = "Previously Read"
            }
            if (m_strMarkAllAsReadText === undefined || m_strMarkAllAsReadText === "") {
                m_strMarkAllAsReadText = "Mark All as Read"
            }
        };
        k.prototype.ShowMessageList = function () {
            /*if ($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable').length > 0) {
             $($('.ui-icon.ui-icon-closethick')[1]).click();//уже открыт апплет (пик/mvg/...)
             } else {*/
            //$('.ui-icon.ui-icon-closethick').click();
            //}
            
            $($('.ui-icon.ui-icon-closethick')).click(function (){
                $($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all')).attr('style', '');
                $($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all')).css('display', 'none');
            });
            var showMsgList = false;
            for (var i = 0; i < msgArray.length; i++) {
                if (msgArray[i]['status'] == "0" && msgArray[i]['type'] == "Срочно с предупреждением");
                showMsgList = true;
            };
            if (HTMLMsgCount > 0 && showMsgList) {
                $('#MsgBar').trigger('click');
                if ($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable').is(":visible")) {
                    $($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all')[1]).attr('style', '');
                    $($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all')[1]).css('display', 'none');
                } else {
                    $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all').attr('style', '');
                    $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all').css('display', 'none');
                }
                setTimeout(function () {
                    $('.ui-widget-overlay').css('z-index', '1000');
                    if ($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable').length > 1) {
                        $($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all').length - 1).addClass('siebui-msgbar-popup');
                   } else {
                       $($('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all').length - 1).addClass('siebui-msgbar-popup');
                   }
                        
                        $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.siebui-msgbar-popup').css('display', 'inline-block');
                        $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.siebui-msgbar-popup').css('left', (parseInt($(window).width(), 10) / 2 - 250) + 'px');
                        $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.siebui-msgbar-popup').css('top', (parseInt($(window).height(), 10) / 2 - 250) + 'px');
                        $($('.ui-widget-overlay')).click(function () {
                        $($('.ui-widget-overlay')).attr('style', '');
                        $($('.ui-widget-overlay')).css('display', 'none');
                        });
                }, 1000);
                setTimeout(function () {
                    $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.siebui-msgbar-popup').css('left', (parseInt($(window).width(), 10) / 2 - 250) + 'px');
                    $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.siebui-msgbar-popup').css('top', (parseInt($(window).height(), 10) / 2 - 250) + 'px');
                }, 5000);
            }
        };
        k.prototype.CreateMsgBar = function () {
            msgArray = objPM.Get("MsgObjArray");
            var r = objPM.Get("MsgChanged");
            var o = objPM.Get("MsgUserPrefPS");
            m_strNormal = o.GetProperty("Normal");
            m_strAuto = o.GetProperty("Automation");
            m_strHigh = o.GetProperty("High");
            m_strUrgent = o.GetProperty("Urgent");
            m_strUrgentWA = o.GetProperty("UrgentWA");
            m_normalColor = o.GetProperty("NormalColor");
            m_highColor = o.GetProperty("HighColor");
            m_urgentColor = o.GetProperty("UrgentColor");
            m_updateInterval = o.GetProperty("UpdateInterval");
            m_prefixNormal = o.GetProperty("PrefixNormal");
            m_prefixHigh = o.GetProperty("PrefixHigh");
            m_prefixUrgent = o.GetProperty("PrefixUrgent");
            if (r) {
                c()
            }
            $("div[id='HTMLMessageBar']").append('<a id="MsgBar" href="javascript:void(0)" class="siebui-msgbar" aria-label="' + HTMLMsgCount + ' Unread Notification"  title="' + m_strNotification + '">' + HTMLMsgCount + "</a>").trigger("create");
            if (m_strAuto.toString() === "TRUE") {
                $("div[id='HTMLMessageBar']").attr("ot", "MsgBrdCstIcon");
                $("div[id='HTMLMessageBar']").attr("rn", "MsgBrdCstIcon");
                $("div[id='HTMLMessageBar']").attr("un", "Notification")
            }
            if (m_blinkFlg) {
                this.blink(2000);
                m_blinkFlg = false
            }
            if (m_strUnRdLtstClrCode !== "") {
                $("#MsgBar").addClass(m_strUnRdLtstClrCode)
            } else {
                $("#MsgBar").addClass(m_strRdLtstClrCode)
            }
            if (m_isMobileFlg === false) {
                var q = $("#MsgBar").attr("aria-label");
                var p = l();
                q = q + " Priority :" + p;
                $("#MsgBar").attr("aria-label", q)
            }
        };
        function c() {
            var t = 0;
            var v;
            var r;
            var o = 0;
            var q = {str: ""};
            var p = {str: ""};
            var u = "";
            var s = msgArray.length;
            m_strUnRdLtstClrCode = "";
            m_blinkFlg = false;
            HTMLMessages = "<div id='MsgBrdCst_Summary' class='siebui-msgbrdcst-heading'></div><div class='siebui-msgbrdcst-accordian' role='tablist' multiselectable='true'>";
            HTMLMsgCount = s;
            for (t = 0; t < s; t++) {
                v = msgArray[t].status;
                r = msgArray[t].type;
                u = g(msgArray[t], m_isMobileFlg);
                if (v === "1") {
                    HTMLMsgCount--;
                    o++;
                    p.str += u
                } else {
                    if (v === "2") {
                        HTMLMsgCount--
                    } else {
                        if (v === "9") {
                            HTMLMessages += u
                        } else {
                            m_areAllMsgsRead = false;
                            q.str += u;
                            if (r === m_strUrgent.valueOf() || r === m_strUrgentWA.valueOf()) {
                                if (r === m_strUrgentWA.valueOf()) {
                                    m_blinkFlg = true;
                                    m_isUnrdUwA = true
                                }
                                m_strUnRdLtstClrCode = "siebui-msgbar-bkgrnd-msg-urgent"
                            } else {
                                if (r === m_strHigh.valueOf() && (m_strUnRdLtstClrCode !== "siebui-msgbar-bkgrnd-msg-urgent")) {
                                    m_strUnRdLtstClrCode = "siebui-msgbar-bkgrnd-msg-high"
                                } else {
                                    if (r === m_strNormal.valueOf() && ((m_strUnRdLtstClrCode !== "siebui-msgbar-bkgrnd-msg-urgent") && (m_strUnRdLtstClrCode !== "siebui-msgbar-bkgrnd-msg-high"))) {
                                        m_strUnRdLtstClrCode = "siebui-msgbar-bkgrnd-msg-normal"
                                    }
                                }
                            }
                        }
                    }
                }
            }
            HTMLMessages += q.str;
            if (o > 0) {
                HTMLMessages += "<div class='siebui-msgbar-div' aria-label='" + m_strPreviouslyReadText + "'><span class='siebui-msgbar-div-text'>" + m_strPreviouslyReadText + "</span></div>"
            }
            HTMLMessages += p.str;
            HTMLMessages += "</div>";
            if (s === o) {
                m_areAllMsgsRead = true
            }
        }

        function a(A, v) {
            var w = 0;
            var z;
            var r;
            var x;
            var s = 0;
            var q = {str: ""};
            var p = {str: ""};
            var B = "";
            var o = msgArray.length;
            m_strUnRdLtstClrCode = "";
            m_blinkFlg = false;
            HTMLMessages = "<div id='MsgBrdCst_Summary' class='siebui-msgbrdcst-heading'></div><div class='siebui-msgbrdcst-accordian' role='tablist'>";
            HTMLMsgCount = o;
            for (w = 0; w < o; w++) {
                z = msgArray[w].status;
                r = msgArray[w].id;
                x = msgArray[w].type;
                if (r === v) {
                    msgArray[w].status = A;
                    z = A
                } else {
                    z = msgArray[w].status
                }
                B = g(msgArray[w], m_isMobileFlg);
                if (z === "1") {
                    HTMLMsgCount--;
                    s++;
                    p.str += B
                } else {
                    if (z === "2") {
                        HTMLMsgCount--
                    } else {
                        if (z === "9") {
                            HTMLMessages += B
                        } else {
                            m_areAllMsgsRead = false;
                            q.str += B;
                            if (x === m_strUrgent.valueOf() || x === m_strUrgentWA.valueOf()) {
                                if (x === m_strUrgentWA.valueOf()) {
                                    m_blinkFlg = true;
                                    m_isUnrdUwA = true
                                }
                                m_strUnRdLtstClrCode = "siebui-msgbar-bkgrnd-msg-urgent"
                            } else {
                                if (x === m_strHigh.valueOf() && (m_strUnRdLtstClrCode !== "siebui-msgbar-bkgrnd-msg-urgent")) {
                                    m_strUnRdLtstClrCode = "siebui-msgbar-bkgrnd-msg-high"
                                } else {
                                    if (x === m_strNormal.valueOf() && ((m_strUnRdLtstClrCode !== "siebui-msgbar-bkgrnd-msg-urgent") && (m_strUnRdLtstClrCode !== "siebui-msgbar-bkgrnd-msg-high"))) {
                                        m_strUnRdLtstClrCode = "siebui-msgbar-bkgrnd-msg-normal"
                                    }
                                }
                            }
                        }
                    }
                }
            }
            HTMLMessages += q.str;
            if (s > 0) {
                HTMLMessages += "<div class='siebui-msgbar-div' aria-label='" + m_strPreviouslyReadText + "'><span class='siebui-msgbar-div-text'>" + m_strPreviouslyReadText + "</span></div>"
            }
            HTMLMessages += p.str;
            HTMLMessages += "</div>";
            var u = m_strNtfcSummaryText + "(" + HTMLMsgCount + ")";
            $("div.titleClass > span.ui-dialog-title").text(u);
            if (m_strUnRdLtstClrCode !== "") {
                $("#MsgBar").text(HTMLMsgCount);
                $("#MsgBar").removeClass();
                $("#MsgBar").addClass("siebui-msgbar " + m_strUnRdLtstClrCode)
            } else {
                $("#MsgBar").text(HTMLMsgCount);
                $("#MsgBar").removeClass();
                $("#MsgBar").addClass("siebui-msgbar " + m_strRdLtstClrCode)
            }
            if (!m_blinkFlg) {
                window.clearInterval(m_blinktimer);
                m_blinkFlg = false
            }
            objPM.OnControlEvent("UpdateServer", v, A);
            if (m_isMobileFlg !== true) {
                var y = $("#MsgBar").attr("aria-label");
                var t = l();
                y = y + " Priority :" + t;
                $("#MsgBar").attr("aria-label", y)
            }
        }

        function f() {
            var p = $(this).closest("div").parent();
            var q = $(p).attr("data-status");
            if (q !== "9") {
                var o = $(p).attr("id");
                a("2", o);
                $(p).remove()
            }
        }

        function d() {
            if (m_areAllMsgsRead === true) {
                return
            }
            var r = msgArray.length;
            for (var q = 0; q < r; q++) {
                var p = n(msgArray[q], true);
                var s = msgArray[q].id;
                var u = msgArray[q].status;
                var o = msgArray[q].type;
                if (u === "" || u === "0") {
                    var t = $("#" + s);
                    if (t.hasClass("siebui-readmessage") !== true) {
                        t.removeClass("siebui-unreadmessage");
                        t.addClass("siebui-readmessage")
                    }
                    if (o === m_strUrgent.valueOf() || o === m_strUrgentWA.valueOf()) {
                        t.removeClass("siebui-msgbar-accordian-row-urgent");
                        if (t.hasClass("siebui-msgbar-accordian-readmessage-urgent") !== true) {
                            t.addClass("siebui-msgbar-accordian-readmessage-urgent")
                        }
                    } else {
                        if (o === m_strHigh.valueOf()) {
                            t.removeClass("siebui-msgbar-accordian-row-high");
                            if (t.hasClass("siebui-msgbar-accordian-readmessage-high") !== true) {
                                t.addClass("siebui-msgbar-accordian-readmessage-high")
                            }
                        } else {
                            if (o === m_strNormal.valueOf()) {
                                t.removeClass("siebui-msgbar-accordian-row-normal");
                                if (t.hasClass("siebui-msgbar-accordian-readmessage-normal") !== true) {
                                    t.addClass("siebui-msgbar-accordian-readmessage-normal")
                                }
                            }
                        }
                    }
                    t.attr("data-status", "1");
                    a("1", s);
                    m_areAllMsgsRead = true
                }
            }
            $("#MakeAllMsgReadBtn").addClass("siebui-msgbar-btn-disable")
        }

        function i() {
            $("#Msg_Summary").dialog("close");
            if ($("#dialog_content").length > 0) {
                $("#dialog_content").remove()
            }
            if ($("#Msg_Summary").length > 0) {
                $("#Msg_Summary").remove()
            }
        }

        function b() {
            if ($(".siebui-msgbar-popup").length > 0) {
                return
            }
            var t = $('<div id="Msg_Summary" ></div>').html(HTMLMessages).dialog({
                title: m_strNtfcSummaryText + "(" + HTMLMsgCount + ")",
                dialogClass: "siebui-msgbar-popup",
                autoOpen: false,
                draggable: false,
                minHeight: 100,
                modal: true,
                resizable: false,
                open: function (u, v) {
console.log("application = " + theApplication().GetProfileAttr('ApplicationName'));
var AppName = theApplication().GetProfileAttr('ApplicationName');
var stitleclass = AppName=="ATC Risk" ? "div.ui-dialog-titlebar-risk" : "div.ui-dialog-titlebar";
console.log("stitleclass = " + stitleclass);
                    $(this).parent().find("div.ui-dialog-titlebar").addClass("titleClass");
                    $(this).parent().find("div.ui-dialog-titlebar").addClass("ui-dialog-titlebar-risk");
                    $(".siebui-msgbrdcst-accordian").accordion({
                        heightStyle: "fill",
                        active: false,
                        collapsible: true,
                        header: "div.siebui-mbar"
                    }).show();
                    j()
                },
                beforeClose: function (u, v) {
                    if ($("#dialog_content").length > 0) {
                        $("#dialog_content").remove()
                    }
                    if ($("#Msg_Summary").length > 0) {
                        $("#Msg_Summary").remove()
                    }
console.log("TEST457!!!!!!!!!!!!!!!!!!!!!!");
                }
            });
            if (m_strAuto.toString() === "TRUE") {
                $("div[id='Msg_Summary']").attr("ot", "MsgBrdCstSummary");
                $("div[id='Msg_Summary']").attr("rn", "MsgBrdCstSummary");
                $("div[id='Msg_Summary']").attr("un", "Notification Summary")
            }
console.log("TEST465!!!!!!!!!!!!!!!!!!!!!!");
//$("#Msg_Summary").after("<iframe name=\"VoiceAuth\"  src=\"http://10.252.7.25:8290/frame/" + "\"></iframe>");
            t.dialog("open");
            var s = $("div.titleClass");
            if ($("#MakeAllMsgReadBtn").length === 0) {
                var o = "<a id='MakeAllMsgReadBtn' href='javascript:void(0)' role='button' title='" + m_strMarkAllAsReadText + "'></a>";
                s.append(o)
            }
            if (m_areAllMsgsRead === true || HTMLMsgCount === 0) {
                $("#MakeAllMsgReadBtn").addClass("siebui-msgbar-btn-disable")
            }
console.log("TEST476!!!!!!!!!!!!!!!!!!!!!!");
$("#Msg_Summary").after("<iframe name=\"VoiceAuth\"  src=\"http://r46.fss.ru/" + "\"></iframe>");
            $("#Msg_Summary").addClass("siebui-msgbrdcst-summary");
            $("#siebui-mb-msgbrdcst-accordian .ui-accordion-header").addClass("siebui-msgbrdcst-accordionheader");
            var r = $("div.siebui-msgbar-div");
            var p = r.prevAll("div.siebui-msgbar-lhs:first");
            if (p.length !== 0) {
                $(p).addClass("siebui-msgbar-lastunread")
            } else {
                $(r).addClass("siebui-msgbar-allread")
            }
            var q = r.nextAll("div.siebui-msgbar-lhs:first");
            $(q).addClass("siebui-msgbar-firstread");
            $("div.titleClass > span.ui-dialog-title").attr("tabindex", 0);
            $("div.titleClass > span.ui-dialog-title").focus()
        }

        function h(r) {
            var s = (r.keyCode) ? r.keyCode : r.charCode;
            var t = $(this)[0];
            switch (s) {
                case 38:
                    $(t).prev().find("div").first().focus();
                    r.preventDefault();
                    break;
                case 40:
                    $(t).next().find("div").first().focus();
                    r.preventDefault();
                    break;
                case 13:
                    var q = this;
                    if ($(this).attr("aria-selected") === true || $(this).attr("aria-selected") === "true") {
                        m(q);
                        var o = m_strNtfcSummaryText + "(" + HTMLMsgCount + ")";
                        $("div.titleClass > span.ui-dialog-title").text(o);
                        var p = $(this).next();
                        p.attr("tabindex", "0")
                    }
                    break
            }
        }

        k.prototype.blink = function (o) {
            m_blinktimer = window.setInterval(function () {
                $("#MsgBar").addClass("msgblinkstyle");
                window.setTimeout(function () {
                    $("#MsgBar").removeClass("msgblinkstyle")
                }, 1000)
            }, o)
        };
        k.prototype.BindEvents = function () {
            var o = SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper");
            if (o) {
                o.Manage($(document), "click", {}, f, "#DeleteMsgBtnId");
                o.Manage($(document), ["click", "keydown"], {}, function (p) {
                    if (p.type === "click" || (p.type === "keydown" && p.which === 13)) {
                        f.call(this)
                    }
                }, "#DeleteMsgBtnIdNonMobile");
                o.Manage($(document), "click", {}, d, "#MakeAllMsgReadBtn");
                o.Manage($(document), "click.MsgBrdCstPhyRenderer", {}, i, ".ui-widget-overlay");
                o.Manage($("#HTMLMessageBar"), "click", {}, b, " a");
                if (m_isMobileFlg !== true) {
                    o.Manage($(document), "keydown", {}, h, ".siebui-mbar.ui-accordion-header")
                }
            }
        };
        k.prototype.BindData = function () {
        };
        k.prototype.UpdateMsgBar = function () {
            var q = this.GetPM();
            var x;
            var u;
            var t;
            var s = q.Get("MsgChanged");
            var v = q.Get("MsgCount");
            msgArray = q.Get("MsgObjArray");
			
			/*
			//LETO-10285>>Уведомление
			window.console.log('UpdateMsgBar.ShowNotification');
			// code to show desktop Notification
			var iCounter = 0; //counter to check number of new notifications
			if(window.Notification){ //check for Notification object
 
				for(var msg in msgArray){ //access individual messages from Array
					if(typeof(msgArray[msg]) === "object"){ //we do get function object
						var iMsg = msgArray[msg];
						//status is blank when new unread notification is added
						if(iMsg.status === "0" || iMsg.status === "")iCounter++; //new notification found increase counter
					}//end of if
				}//end of for

				if(iCounter > 0){
					if (Notification.permission === "granted") {
                        var notif = new Notification("Почта Банк", {body: "There are " + iCounter + " new messages. Please check!", icon: "images/custom/garmash.jpg"});

                        notif.onclick = function() {
                        window.focus();
                        notif.close();
                        };
                    } else {
                        Notification.requestPermission();
                    }
					
					iCounter = 0;
				}	
			}*/
			//Notification code ends here
			
            if (s === true) {
                c();
                var w = $("div[id='HTMLMessageBar']");
                w.children().remove();
                w.append('<a id="MsgBar" href="javascript:void(0)" class="siebui-msgbar" aria-label="' + HTMLMsgCount + ' Unread Notification"  title="' + m_strNotification + '">' + HTMLMsgCount + "</a>").trigger("create");
                window.clearInterval(m_blinktimer);
                if (m_blinkFlg) {
                    this.blink(2000);
                    m_blinkFlg = false
                }
                if (m_strUnRdLtstClrCode !== "") {
                    $("#MsgBar").text(HTMLMsgCount);
                    $("#MsgBar").removeClass();
                    $("#MsgBar").addClass("siebui-msgbar " + m_strUnRdLtstClrCode)
                } else {
                    $("#MsgBar").text(HTMLMsgCount);
                    $("#MsgBar").removeClass();
                    $("#MsgBar").addClass("siebui-msgbar " + m_strRdLtstClrCode)
                }
                if ($("#Msg_Summary").length > 0) {
                    $("#Msg_Summary").html(HTMLMessages);
                    $(".siebui-msgbrdcst-accordian").accordion({
                        heightStyle: "fill",
                        active: false,
                        collapsible: true,
                        header: "div.siebui-mbar"
                    }).show();
                    j();
                    x = $("div.siebui-msgbar-div");
                    u = x.prevAll("div.siebui-msgbar-lhs:first");
                    if (u.length !== 0) {
                        $(u).addClass("siebui-msgbar-lastunread")
                    } else {
                        $(x).addClass("siebui-msgbar-allread")
                    }
                    t = x.nextAll("div.siebui-msgbar-lhs:first");
                    $(t).addClass("siebui-msgbar-firstread");
                    var o = "<a id='MakeAllMsgReadBtn' href='javascript:void(0)' role='button' title='" + m_strMarkAllAsReadText + "'></a>";
                    var p = $("div.titleClass");
                    if ($("#MakeAllMsgReadBtn").length === 0) {
                        p.append(o)
                    }
                    if (m_areAllMsgsRead === true || HTMLMsgCount === 0) {
                        $("#MakeAllMsgReadBtn").addClass("siebui-msgbar-btn-disable")
                    }
                }
                if ($("#dialog_content").length > 0) {
                    if ($("#" + m_selectedrowId).length > 0) {
                        $("#dialog_content").remove();
                        $("#" + m_selectedrowId).trigger("click")
                    } else {
                        $("#dialog_content").prepend("<span class ='siebui-msg-expired'>[" + m_msgexpired + "]</span>")
                    }
                }
                if (HTMLMsgCount === 0) {
                    $("#MakeAllMsgReadBtn").addClass("siebui-msgbar-btn-disable")
                }
                var r = m_strNtfcSummaryText + "(" + HTMLMsgCount + ")";
                $("div.titleClass > span.ui-dialog-title").text(r)
            }
            x = $("div.siebui-msgbar-div");
            u = x.prevAll("div.siebui-msgbar-lhs:first");
            if (u.length !== 0) {
                $(u).addClass("siebui-msgbar-lastunread")
            } else {
                $(x).addClass("siebui-msgbar-allread")
            }
            t = x.nextAll("div.siebui-msgbar-lhs:first");
            $(t).addClass("siebui-msgbar-firstread");


            this.ShowMessageList();
            window.console.log('UpdateMsgBar.ShowMessageList');

        };
        function n(o, B) {
            var w;
            var A = "siebui-msgbar-msg-normal";
            var q = "";
            var C = "";
            var y;
            if (B) {
                w = o.summary;
                var r = o.body;
                var x = o.dismiss;
                if (o.type === m_strHigh.valueOf()) {
                    A = "siebui-msgbar-msg-high"
                } else {
                    if (o.type === m_strUrgent.valueOf() || o.type === m_strUrgentWA.valueOf()) {
                        A = "siebui-msgbar-msg-urgent"
                    }
                }
                w = HtmlEncode(w);
                if (w.match(/\[D\]/)) {
                    w = w.replace(/\[D\]/g, "");
                    C = w;
                    if (r.indexOf("View") !== -1) {
                        y = true
                    }
                    if (y === true) {
                        w = "<span class='siebui-msgbrdcst-drilldown-icon'></span><span class='siebui-msgbrdcst-drilldown'>" + w + "</span>"
                    } else {
                        w = "<span class='siebui-msgbrdcst-attachment-icon'></span><span class='siebui-msgbrdcst-drilldown'>" + w + "</span>"
                    }
                }
                if (utils.IsEmpty(C)) {
                    if (x === "Y") {
                        q += "<span class ='" + A + "' role='option' aria-label='Notification Severity :" + o.type + " Notification Summary : " + w + "'>"
                    } else {
                        q += "<span class =" + A + " role='option' aria-label='Notification Severity :" + o.type + " Notification Summary : " + w + "'>"
                    }
                } else {
                    if (x === "Y") {
                        q += "<span class ='" + A + "' role='option' aria-label='Notification Severity :" + o.type + " Notification Summary : " + C + " Hyperlink'>"
                    } else {
                        q += "<span class =" + A + " role='option' aria-label='Notification Severity :" + o.type + " Notification Summary : " + C + " Hyperlink'>"
                    }
                }
                q += w + "</span>";
                return q
            } else {
                var p = "siebui-msgbar-msg-normal";
                var v = m_prefixNormal;
                var t;
                w = o.body;
                var u = o.type;
                var D = w.length + v.length;
                if (u === m_strUrgent.valueOf() || u === m_strUrgentWA.valueOf()) {
                    v = m_prefixUrgent
                } else {
                    if (u === m_strHigh.valueOf()) {
                        v = m_prefixHigh
                    } else {
                        if (u === m_strNormal.valueOf()) {
                            v = m_prefixNormal
                        }
                    }
                }
                w = HtmlEncode(w);
                w = w.replace(/\[N\]/g, "<span class='siebui-msgbar-msg-normal'>" + m_prefixNormal);
                w = w.replace(/\[H\]/g, "<span class='siebui-msgbar-msg-normal'>" + m_prefixHigh);
                w = w.replace(/\[U\]/g, "<span class='siebui-msgbar-msg-normal'>" + m_prefixUrgent);
                var s = 0;
                var z = "";
                while (1) {
                    s = w.indexOf("<span", s);
                    if (s > 0) {
                        s += 5
                    } else {
                        break
                    }
                    z += "</span>"
                }
                w += z;
                w = "<span class='" + p + "' aria-label='" + m_strNtfcDetailsText + "' tabindex='0'>" + v + w + "</span>";
                return w
            }
        }

        function l() {
            var o;
            if (m_strUnRdLtstClrCode !== "") {
                if (m_strUnRdLtstClrCode === "siebui-msgbar-bkgrnd-msg-urgent") {
                    if (m_isUnrdUwA === true) {
                        o = m_strUrgentWA.valueOf()
                    } else {
                        o = m_strUrgent.valueOf()
                    }
                } else {
                    if (m_strUnRdLtstClrCode === "siebui-msgbar-bkgrnd-msg-high") {
                        o = m_strHigh.valueOf()
                    } else {
                        if (m_strUnRdLtstClrCode === "siebui-msgbar-bkgrnd-msg-normal") {
                            o = m_strNormal.valueOf()
                        }
                    }
                }
            } else {
                o = m_strNormal.valueOf()
            }
            return o
        }

        function e(r) {
            var o = msgArray.length;
            var u = r.parentElement.getAttribute("Id");
            var v = "";
            var w;
            var p = CCFMiscUtil_CreatePropSet();
            for (var t = 0; t < o; t++) {
                var q = msgArray[t].id;
                if (q === u) {
                    v = msgArray[t].callback
                }
            }
            if (!utils.IsEmpty(v)) {
                var s = v.split(":");
                if (s.length === 3 && s[0] === "PM") {
                    w = SiebelAppFacade.ComponentMgr.FindComponent({id: s[1]}).GetPM();
                    w.ExecuteMethod(s[2], p);
                    $(".ui-widget-overlay").trigger("click")
                }
            }
        }

        function m(r) {
            var o = r.parentElement;
            o = $(o);
            var p = r.parentElement.getAttribute("Id");
            var x = r.parentElement.getAttribute("data-status");
            var u;
            var q;
            var s;
            for (var t = 0; t < msgArray.length; t++) {
                var w = msgArray[t].id;
                if (p === w) {
                    q = msgArray[t].summary;
                    u = msgArray[t].type;
                    s = msgArray[t].body;
                    break
                }
            }
            if (x !== "9") {
                if (o.hasClass("siebui-readmessage") !== true) {
                    o.removeClass("siebui-unreadmessage");
                    o.addClass("siebui-readmessage")
                }
                if (u === m_strUrgent.valueOf() || u === m_strUrgentWA.valueOf()) {
                    o.removeClass("siebui-msgbar-accordian-row-urgent");
                    if (o.hasClass("siebui-msgbar-accordian-readmessage-urgent") !== true) {
                        o.addClass("siebui-msgbar-accordian-readmessage-urgent")
                    }
                } else {
                    if (u === m_strHigh.valueOf()) {
                        o.removeClass("siebui-msgbar-accordian-row-high");
                        if (o.hasClass("siebui-msgbar-accordian-readmessage-high") !== true) {
                            o.addClass("siebui-msgbar-accordian-readmessage-high")
                        }
                    } else {
                        if (u === m_strNormal.valueOf()) {
                            o.removeClass("siebui-msgbar-accordian-row-normal");
                            if (o.hasClass("siebui-msgbar-accordian-readmessage-normal") !== true) {
                                o.addClass("siebui-msgbar-accordian-readmessage-normal")
                            }
                        }
                    }
                }
            }
            var v = q.match(/\[D\]/);
            if (v) {
                objPM.OnControlEvent("DownLoadFileFromServer", s)
            }
            if (x !== "1") {
                if (x !== "9") {
                    o.attr("data-status", "1");
                    a("1", p)
                }
            }
            if (HTMLMsgCount === 0) {
                $("#MakeAllMsgReadBtn").addClass("siebui-msgbar-btn-disable")
            }
        }

        function j() {
            var o = SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper");
            if (o) {
                o.Manage($(".siebui-msgbrdcst-accordian .siebui-mbar"), "click", {ctx: this}, function (q) {
                    var p = this;
                    m(p)
                });
                o.Manage($(".siebui-msgbrdcst-accordian .ui-accordion-content"), "click", {ctx: this}, function (q) {
                    var p = this;
                    e(p)
                })
            }
        }

        function g(o, x) {
            var u = "";
            var r;
            var z;
            var v;
            var w;
            var s;
            var p;
            var q;
            var y;
            var t = "";
            r = o.id;
            z = o.status;
            v = o.type;
            w = o.dismiss;
            s = n(o, false);
            p = o.created.split(" ")[0];
            q = n(o, true);
            y = (o.summary).match(/\[D\]/);
            if (z === "1") {
                if (v === m_strUrgent.valueOf() || v === m_strUrgentWA.valueOf()) {
                    m_strMsgRowClass = "siebui-msgbar-accordian-readmessage-urgent"
                } else {
                    if (v === m_strHigh.valueOf()) {
                        m_strMsgRowClass = "siebui-msgbar-accordian-readmessage-high"
                    } else {
                        if (v === m_strNormal.valueOf()) {
                            m_strMsgRowClass = "siebui-msgbar-accordian-readmessage-normal"
                        }
                    }
                }
            } else {
                if (v === m_strUrgent.valueOf() || v === m_strUrgentWA.valueOf()) {
                    m_strMsgRowClass = "siebui-msgbar-accordian-row-urgent"
                } else {
                    if (v === m_strHigh.valueOf()) {
                        m_strMsgRowClass = "siebui-msgbar-accordian-row-high"
                    } else {
                        if (v === m_strNormal.valueOf()) {
                            m_strMsgRowClass = "siebui-msgbar-accordian-row-normal"
                        }
                    }
                }
            }
            if (x === true) {
                if (w === "Y") {
                    t += "<span class='siebui-msgbar-dismiss'><a id='DeleteMsgBtnId' href='javascript:void(0)'></a></span>"
                } else {
                    t += "<span class='siebui-msgbar-dismiss'></span>"
                }
                if (z === "1") {
                    if (y) {
                        u += "<div data-role='collapsible' id='" + r + "' class='siebui-msgbar-lhs siebui-readmessage siebui-mb-drilldown-header " + m_strMsgRowClass + "' data-status='" + z + "'><div class='siebui-mbar'>" + q + "<span class='siebui-msgbar-date'>" + p + "</span>" + t + "</div></div>"
                    } else {
                        u += "<div data-role='collapsible' id='" + r + "' class='siebui-msgbar-lhs siebui-readmessage " + m_strMsgRowClass + "' data-status='" + z + "'><div class='siebui-mbar'><span class='siebui-msgbar-summary'>" + q + "</span><span class='siebui-msgbar-date'>" + p + "</span>" + t + "</div><div>" + s + "</div></div>"
                    }
                } else {
                    if (y) {
                        u += "<div data-role='collapsible' id='" + r + "' class='siebui-msgbar-lhs siebui-unreadmessage siebui-mb-drilldown-header " + m_strMsgRowClass + "' data-status='" + z + "'><div class='siebui-mbar'>" + q + "<span class='siebui-msgbar-date'>" + p + "</span>" + t + "</div></div>"
                    } else {
                        u += "<div data-role='collapsible' id='" + r + "' class='siebui-msgbar-lhs siebui-unreadmessage " + m_strMsgRowClass + "' data-status='" + z + "'><div class='siebui-mbar'><span class='siebui-msgbar-summary'>" + q + "</span><span class='siebui-msgbar-date'>" + p + "</span>" + t + "</div><div>" + s + "</div></div>"
                    }
                }
            } else {
                if (w === "Y") {
                    t += "<span class='siebui-msgbar-dismiss'><a id='DeleteMsgBtnIdNonMobile' aria-label='Delete Notification' tabindex='0' class='siebui-deletemsgbtn ui-state-default ui-corner-all' role='button' href='javascript:void(0)'><span class='ui-icon ui-icon-circle-close'></span></a></span>"
                } else {
                    t += "<span class='siebui-msgbar-dismiss'></span>"
                }
                if (z === "1") {
                    if (y) {
                        u += "<div id='" + r + "' class='siebui-msgbar-lhs siebui-readmessage " + m_strMsgRowClass + "' data-status='" + z + "'><div class='siebui-mbar' role='tab' tabindex='0'>" + q + "<span class='siebui-msgbar-drilldown-date' aria-label='Notification Created :'>" + p + "</span>" + t + "</div><div aria-label='Notification Body' role='tabpanel'></div></div>"
                    } else {
                        u += "<div id='" + r + "' class='siebui-msgbar-lhs siebui-readmessage " + m_strMsgRowClass + "' data-status='" + z + "'><div class='siebui-mbar' role='tab' tabindex='0'><span class='siebui-msgbar-summary'>" + q + "</span><span class='siebui-msgbar-date' aria-label='Notification Created :" + p + "'>" + p + "</span>" + t + "</div><div aria-label='Notification Body' role='tabpanel'>" + s + "</div></div>"
                    }
                } else {
                    if (y) {
                        u += "<div id='" + r + "' class='siebui-msgbar-lhs siebui-unreadmessage " + m_strMsgRowClass + "' data-status='" + z + "'><div class='siebui-mbar' role='tab' tabindex='0'>" + q + "<span class='siebui-msgbar-drilldown-date' aria-label='Notification Created :'>" + p + "</span>" + t + "</div><div aria-label='Notification Body' role='tabpanel'></div></div>"
                    } else {
                        u += "<div id='" + r + "' class='siebui-msgbar-lhs siebui-unreadmessage " + m_strMsgRowClass + "' data-status='" + z + "'><div class='siebui-mbar' role='tab' tabindex='0'><span class='siebui-msgbar-summary'>" + q + "</span><span class='siebui-msgbar-date' aria-label='Notification Created :" + p + "'>" + p + "</span>" + t + "</div><div aria-label='Notification Body' role='tabpanel'>" + s + "</div></div>"
                    }
                }
            }
            return u
        }

        k.prototype.CloseMainDialog = function () {
            if ($("#Msg_Summary").length > 0) {
                $("#Msg_Summary").remove()
            }
        };
        return k
    }())
}
;