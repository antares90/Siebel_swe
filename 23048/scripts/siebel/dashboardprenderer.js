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
if(typeof(SiebelAppFacade.DashboardPR)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.DashboardPR");define("siebel/dashboardprenderer",["siebel/basephyrenderer"],function(){SiebelAppFacade.DashboardPR=(function(){var l=SiebelJS.Dependency("SiebelApp.Constants");var r=SiebelJS.Dependency("SiebelApp.Utils");var n=SiebelJS.Dependency("SiebelApp.S_App.LocaleObject");function q(x){SiebelAppFacade.DashboardPR.superclass.constructor.call(this,x)}SiebelJS.Extend(q,SiebelAppFacade.BasePR);q.prototype.Init=function(){SiebelAppFacade.DashboardPR.superclass.Init.call(this);this.AttachPMBinding("UIControlInfo",v,{scope:this});this.AttachPMBinding("QuickNavigateList",f,{scope:this});this.AttachPMBinding("UpdatedCtrlData",j,{scope:this})};q.prototype.ShowUI=function(){SiebelAppFacade.DashboardPR.superclass.ShowUI.call(this);var F=$("#CommunicationPanelContainer #Dashboard");var H=null;var G=null;var E=null;var x="";var D="";if(F.length>0){F.addClass("siebui-dashboard-frame");H=F.find("#commPanelDashboardToggle");if(H.length>0){E=H.find("#commPanelDashboardToShowMore");G=H.find("#commPanelDashboardToShowLess");if(E.length>0){x=n.GetLocalString("IDS_COMM_PANEL_TOGGLE_SHOW_MORE");E.parent("div").attr("title",x);E.attr("aria-label",x)}if(G.length>0){D=n.GetLocalString("IDS_COMM_PANEL_TOGGLE_SHOW_LESS");G.parent("div").attr("title",D);G.attr("aria-label",D)}}}var I=CCFMiscUtil_CreatePropSet();I.SetType("RequiredFields");var y=$(".siebui-dashboard-element");var B=0;for(var A=0,B=y.length;A<B;A++){var z=y[A];I.SetProperty(parseInt(A+1),$(z).attr("name"))}this.GetPM().SetProperty("RequiredFields",I);var C=$(".siebui-dashboard-container").parent();var J=C.siblings("a.next-item-applet").attr("title")+" "+n.GetLocalString("IDS_SWE_FORM_APPLET");C.attr({role:"region",title:J});$("#s_dashboardclose").attr("role","button").attr("tabindex","0").attr("aria-label",n.GetLocalString("IDS_MSG_CLOSE")).attr("title",n.GetLocalString("IDS_MSG_CLOSE"));$("#s_dshbd_Link_Goto").addClass("siebui-ctrl-btn");$("#s_dshbd_PushToDashboard").addClass("siebui-ctrl-btn");$(".siebui-dashboard-container input").attr("readOnly",true).attr("aria-readonly",true).attr("tabindex","0").addClass("siebui-ctrl-input");$("#s_dshbd_GoToPreviousRecord").attr("title",n.GetLocalString("PrevRecSetToolTip"));$("#s_dshbd_GoToNextRecord").attr("title",n.GetLocalString("NextRecSetToolTip"));p.call(this,"Dashboard: ShowUI")};q.prototype.BindEvents=function(){SiebelAppFacade.DashboardPR.superclass.BindEvents.call(this);var B=$("#s_dashboardclose");var D=$("#s_dshbd_PushToDashboard");var C=$("#s_dshbd_GoToPreviousRecord");var A=$("#s_dshbd_GoToNextRecord");var x=$("#s_dshbd_Link_Goto");var y=SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper");if(y){if(B.length>0){y.Manage(B,"click",{ctx:this},i);y.Manage(B,"keydown",{ctx:this},e)}if(D.length>0){y.Manage(D,"click",{ctx:this},s)}if(C.length>0){y.Manage(C,"click",{ctx:this},h);y.Manage(C,"keydown",{ctx:this},u)}if(A.length>0){y.Manage(A,"click",{ctx:this},m);y.Manage(A,"keydown",{ctx:this},t)}if(x.length>0){y.Manage(x,"click",{ctx:this},w)}var z=$("#CommunicationPanelContainer #commPanelDashboardToggle");if(z.length>0){y.Manage(z,"click",{ctx:this},c);y.Manage(z,"keydown",{ctx:this},a)}}};q.prototype.BindData=function(){SiebelAppFacade.DashboardPR.superclass.BindData.call(this);o.call(this)};q.prototype.EndLife=function(){SiebelAppFacade.DashboardPR.superclass.EndLife.call(this)};function o(){if($(".siebui-dashboard-container").length>0){this.GetPM().ExecuteMethod(l.get("DASHBOARD_METHOD_INIT"))}else{this.GetPM().ExecuteMethod("InvokeServiceMethod",l.get("DASHBOARD_METHOD_OPEN"))}}function i(x){x.data.ctx.GetPM().OnControlEvent(l.get("DASHBOARD_METHOD_CLOSE"))}function e(x){if(x.keyCode===$.ui.keyCode.ENTER){x.data.ctx.GetPM().OnControlEvent(l.get("DASHBOARD_METHOD_CLOSE"))}}function s(y){var x=CCFMiscUtil_CreatePropSet();SiebelApp.S_App.GetMainView().GetActiveApplet().InvokeMethod("ImplicitCommit",x);y.data.ctx.GetPM().OnControlEvent(l.get("DASHBOARD_METHOD_UPDATE"))}function h(x){x.data.ctx.GetPM().OnControlEvent(l.get("DASHBOARD_METHOD_PREVIOUS"))}function u(x){if(x.keyCode===$.ui.keyCode.ENTER){x.data.ctx.GetPM().OnControlEvent(l.get("DASHBOARD_METHOD_PREVIOUS"))}}function m(x){x.data.ctx.GetPM().OnControlEvent(l.get("DASHBOARD_METHOD_NEXT"))}function t(x){if(x.keyCode===$.ui.keyCode.ENTER){x.data.ctx.GetPM().OnControlEvent(l.get("DASHBOARD_METHOD_NEXT"))}}function w(y){var x=$("#s_dshbd_Quick_Navigation").val();if(!r.IsEmpty(x)){y.data.ctx.GetPM().OnControlEvent(l.get("DASHBOARD_METHOD_GOTONAV"),x)}}function c(z){var x=$(z.target);var y=x.attr("id");z.preventDefault();if(y==="commPanelDashboardToShowMore"){d(z,x)}else{if(y==="commPanelDashboardToShowLess"){b(z,x)}}}function a(x){if(x.which===$.ui.keyCode.ENTER||x.which===$.ui.keyCode.SPACE){c(x)}}function b(A,y){var x=$("#CommunicationPanelContainer #commPanelDashboardToShowMore");var z=$("#CommunicationPanelContainer #commPanelDashboardToShowLess");if(x.length===0||z.length===0){return}var B=x.css("display")!=="none";if(B){return}else{x.show().attr("aria-hidden",false);z.hide().attr("aria-hidden",true);if(A&&y){x.focus()}k(A)}}function d(A,y){var x=$("#CommunicationPanelContainer #commPanelDashboardToShowMore");var z=$("#CommunicationPanelContainer #commPanelDashboardToShowLess");if(x.length===0||z.length===0){return}var B=z.css("display")!=="none";if(B){return}else{z.show().attr("aria-hidden",false);x.hide().attr("aria-hidden",true);if(A&&y){z.focus()}k(A)}}function k(x){var y=$("#CommunicationPanelContainer #Dashboard");if(y.length>0){y.toggleClass("siebui-comm-panel-less")}p.call(x.data.ctx,"Dashboard: Toggle")}function p(x){if($("#CommunicationPanelContainer").length>0){$(window).trigger("resize.commpanel",x)}}function v(){g.call(this,this.GetPM().Get("UIControlInfo"))}function j(){g.call(this,this.GetPM().Get("UpdatedCtrlData"))}function g(F){if(F){SiebelJS.Log("[Customer Dashboard].INFO: Updating control info...");var H=F.EnumChildren(true);do{if(H){var y=H.GetProperty("CtrlName");var G=H.GetProperty("CtrlType");var C=H.GetProperty("Visible");var E=H.GetProperty("DisplayName");var B=H.GetProperty("FieldValue");var D=H.GetProperty("CanInvokeMethod");var x=$('.siebui-dashboard-container [name="'+y+'"]');if(x.length>0){switch(G){case"FieldLabel":if(y=="Label QuickNavigation"){if(r.IsEmpty(E)){E="";SiebelJS.Log("[Customer Dashboard].UNDEFINED: Caption property of "+y+" control is not defined in Tools!")}x.text(E?E+" : ":E)}else{if(r.IsEmpty(B)){B="";SiebelJS.Log("[Customer Dashboard].UNDEFINED: "+y+" is not mapped properly!")}x.text(B?B+" : ":B)}break;case"Field":x.val(B).attr("aria-label",B).attr("title",B);break;case"MiniButton":if(r.IsEmpty(E)){E="";SiebelJS.Log("[Customer Dashboard].UNDEFINED: Caption property of "+y+" control is not defined in Tools!")}x.html(E);x.attr("title",E);break;case"RecNavPrv":case"RecNavNxt":x.removeClass("siebui-btn-icon-e siebui-btn-icon-d");if(D==l.get("DASHBOARD_VALUE_NO")){x.addClass("siebui-btn-icon-d").attr("tabindex","-1")
}else{if(D==l.get("DASHBOARD_VALUE_YES")){x.addClass("siebui-btn-icon-e").attr("tabindex","0")}}break;default:break}if(D==l.get("DASHBOARD_VALUE_NO")){x.attr("disabled","disabled").attr("tabindex","-1")}else{if(D==l.get("DASHBOARD_VALUE_YES")){x.removeAttr("disabled").attr("tabindex","0")}}if(C==l.get("DASHBOARD_VALUE_NO")){x.addClass("siebui-invisible");SiebelJS.Log("[Customer Dashboard].INVISIBLE: "+y+" is hidden due to Visible property set FALSE in Tools!")}else{x.removeClass("siebui-invisible")}}}}while((H=F.EnumChildren(false)));$(".siebui-dashboard-container label[name!='Label QuickNavigation']").each(function(){var I=$("#"+$(this).attr("for"));if((!$(this).text()||$(this).hasClass("siebui-invisible"))&&(!I.val()||I.hasClass("siebui-invisible"))){$(this).parent(".siebui-dashboard-cell").addClass("siebui-no-display siebui-invisible");SiebelJS.Log("[Customer Dashboard].HIDE: "+$(this).attr("name")+" and its paired field are hidden as they both are either empty or Visible set FALSE in Tools!")}else{$(this).parent(".siebui-dashboard-cell").removeClass("siebui-no-display siebui-invisible")}});var A=$(".siebui-dashboard-container input[name='Label Time']");var z=$(".siebui-dashboard-container input[name='Field Time']");if((!A.val()||A.hasClass("siebui-invisible"))&&(!z.val()||z.hasClass("siebui-invisible"))){$(".siebui-dashboard-time-label").parent(".siebui-dashboard-cell").addClass("siebui-no-display siebui-invisible");SiebelJS.Log("[Customer Dashboard].HIDE: Time label and field are hidden as they both are either empty or Visible set FALSE in Tools!")}else{$(".siebui-dashboard-time-label").parent(".siebui-dashboard-cell").removeClass("siebui-no-display siebui-invisible")}SiebelJS.Log("[Customer Dashboard].INFO: Control info updated!")}}function f(){var y=this.GetPM().Get("QuickNavigateList");if(y){var x=$("#s_dshbd_Quick_Navigation");x.empty();var A=y.EnumChildren(true);do{if(A){x.append('<option value="'+A.GetProperty("FieldValue")+'">'+A.GetProperty("DisplayName")+"</option>")}}while((A=y.EnumChildren(false)));if(y.GetChildCount()==0){var z=$("#s_dshbd_Link_Goto");if(z.length){z.attr("disabled","disabled").attr("tabindex","-1")}}}}return q}());return SiebelAppFacade.DashboardPR})}if(typeof(SiebelAppFacade.CommunicationPanelPR)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.CommunicationPanelPR");define("siebel/commpanelprenderer",["siebel/basephyrenderer"],function(){SiebelAppFacade.CommunicationPanelPR=(function(){var m=SiebelJS.Dependency("SiebelApp.Constants");var u=SiebelJS.Dependency("SiebelApp.Utils");var o=SiebelJS.Dependency("SiebelApp.S_App.LocaleObject");var s="DOCK";var h=3;var t=["INFO: ","ERROR: ","WARNING: ","DEBUG: "];function y(z){SiebelAppFacade.CommunicationPanelPR.superclass.constructor.call(this,z)}SiebelJS.Extend(y,SiebelAppFacade.BasePR);y.prototype.Init=function(){SiebelAppFacade.CommunicationPanelPR.superclass.Init.call(this);this.AttachPMBinding("Show",d,{scope:this})};y.prototype.ShowUI=function(){SiebelAppFacade.CommunicationPanelPR.superclass.ShowUI.call(this);var C=$("#CommunicationPanelContainer");var H=null;var B=null;var I=null;var N=null;var O=null;var J=null;var M=null;var G=null;var E=null;var P="";var L="";var A="";var K="";var F="";var z="";if(C.length>0){H=C.find("#commPanelCaption");if(H.length>0){P=o.GetLocalString("IDS_COMM_PANEL_CAPTION");H.parent("div").attr("title",P);H.attr("aria-label",P);H.text(P)}B=C.find("#commPanelSideToggle");if(B.length>0){I=B.find("#commPanelSideToShowWide");N=B.find("#commPanelSideToShowNarrow");if(I.length>0){L=o.GetLocalString("IDS_COMM_PANEL_SIDE_SHOW_WIDE");I.parent("div").attr("title",L);I.attr("aria-label",L)}if(N.length>0){A=o.GetLocalString("IDS_COMM_PANEL_SIDE_SHOW_NARROW");N.parent("div").attr("title",A);N.attr("aria-label",A)}}O=C.find("#commPanelDockToggle");if(O.length>0){J=O.find("#commPanelDockToShowPin");M=O.find("#commPanelDockToShowUnpin");if(J.length>0){K=o.GetLocalString("IDS_COMM_PANEL_DOCK_TO_DOCK");J.parent("div").attr("title",K);J.attr("aria-label",K)}if(M.length>0){F=o.GetLocalString("IDS_COMM_PANEL_DOCK_TO_FLOAT");M.parent("div").attr("title",F);M.attr("aria-label",F)}}G=C.find("#commPanelCloseToggle");if(G.length>0){E=G.find("#commPanelClose");if(E.length>0){z=o.GetLocalString("IDS_COMM_PANEL_CLOSE");E.parent("div").attr("title",z);E.attr("aria-label",z)}}var D=SiebelAppFacade.ComponentMgr.FindComponent({id:m.get("SWE_PST_COMM_TOOLBAR")});if(D&&D.Get("InitFailed")){C.find("#CommPanelHeaderCTI").addClass("forcehide");D.ExecuteMethod("ShowPreviousMessage")}}};y.prototype.BindEvents=function(){SiebelAppFacade.CommunicationPanelPR.superclass.BindEvents.call(this);v.call(this);var D=SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper");if(D){var F=$("#CommunicationPanelContainer");if(F.length>0){var B=F.find("#commPanelClose");if(B.length>0){D.Manage(B,"click",{ctx:this},b);D.Manage(B,"keydown",{ctx:this},l)}var C=F.find("#commPanelSideToggle");if(C.length>0){D.Manage(C,"click",{ctx:this},j);D.Manage(C,"keydown",{ctx:this},f)}var E=F.find("#commPanelDockToggle");if(E.length>0){D.Manage(E,"click",{ctx:this},a);D.Manage(E,"keydown",{ctx:this},x)}var A=this;var z;$(window).off("resize.commpanel").on("resize.commpanel",function(H,G){clearTimeout(z);z=setTimeout(function(){H.preventDefault();H.stopPropagation();e.call(A,H,G)},100)});B=null;C=null;E=null}F=null}D=null};y.prototype.BindData=function(){SiebelAppFacade.CommunicationPanelPR.superclass.BindData.call(this)};function v(){var A=$("#CommunicationPanelContainer");var z=A.find($("#CommPanelHeader"));if(A.length>0&&z.length>0){if(A.data("uiDraggable")===undefined){A.draggable({handle:z,start:function(){A.css({right:"",bottom:""})},drag:function(B,C){C.position=C.offset},stop:p});A.off("dragstop.commpanel").on("dragstop.commpanel",p)}if(s==="DOCK"){A.draggable("option","disabled",true)}else{A.draggable("option","disabled",false)}A.css("cursor","default");A.css("position","")}}function p(A,G){var B=$("#CommunicationPanelContainer");var H=B.find($("#CommPanelHeader"));if(B.length>0&&H.length>0){var F=G?G.offset.top:B.offset().top;var D=G?G.offset.left:B.offset().left;var z=$(window).width();var I=B.outerWidth(true);var C=50-I+parseInt(B.css("marginRight"),10);var E=$(window).height()-parseInt(B.css("marginTop"),10)-H.height();if(F<0){B.css("top",0)}else{if(F>E){B.css("top",E)}}if(SiebelApp.S_App.GetDirection()){if(D<C){B.css("left",C)}else{if(D>(z-I)){B.css("left",z-I)}}}else{if(D<5){B.css("left",5)}else{if(D>(z-50)){B.css("left",z-50)}}}}}function b(z){z.preventDefault();z.data.ctx.GetPM().OnControlEvent(m.get("COMM_PANEL_CLOSE"))}function l(z){if(z.which===$.ui.keyCode.ENTER||z.which===$.ui.keyCode.SPACE){b(z)}}function j(B){var z=$(B.target);var A=z.attr("id");B.preventDefault();if(A==="commPanelSideToShowWide"){c(B,z)}else{if(A==="commPanelSideToShowNarrow"){g(B,z)}}}function f(z){if(z.which===$.ui.keyCode.ENTER||z.which===$.ui.keyCode.SPACE){j(z)}}function c(A,z){var C=$("#CommunicationPanelContainer");var B=C.find("#commPanelSideToShowWide");
var E=C.find("#commPanelSideToShowNarrow");var D=E.css("display")!=="none";if(D){return}else{E.show().attr("aria-hidden",false);B.hide().attr("aria-hidden",true);if(A&&z){E.focus()}r(A)}}function g(A,z){var C=$("#CommunicationPanelContainer");var B=C.find("#commPanelSideToShowWide");var E=C.find("#commPanelSideToShowNarrow");var D=B.css("display")!=="none";if(D){return}else{B.show().attr("aria-hidden",false);E.hide().attr("aria-hidden",true);if(A&&z){B.focus()}r(A)}}function r(z){var A=$("#CommunicationPanelContainer");if(A.length>0){A.toggleClass("siebui-comm-panel-narrow")}q.call(z.data.ctx,"CommPanel: Wide/Narrow")}function a(B){var z=$(B.target);var A=z.attr("id");B.preventDefault();if(A==="commPanelDockToShowPin"){i(B,z)}else{if(A==="commPanelDockToShowUnpin"){w(B,z)}}}function x(z){if(z.which===$.ui.keyCode.ENTER||z.which===$.ui.keyCode.SPACE){a(z)}}function i(A,z){var C=$("#CommunicationPanelContainer");var B=C.find("#commPanelDockToShowPin");var E=C.find("#commPanelDockToShowUnpin");var D=E.css("display")!=="none";if(D){return}else{E.show().attr("aria-hidden",false);B.hide().attr("aria-hidden",true);if(A&&z){E.focus()}k(A)}}function w(A,z){var C=$("#CommunicationPanelContainer");var B=C.find("#commPanelDockToShowPin");var E=C.find("#commPanelDockToShowUnpin");var D=B.css("display")!=="none";if(D){return}else{B.show().attr("aria-hidden",false);E.hide().attr("aria-hidden",true);if(A&&z){B.focus()}k(A)}}function k(z){var A=$("#CommunicationPanelContainer");if(A.length>0){A.toggleClass("siebui-comm-panel-float")}if(s==="FLOAT"){s="DOCK"}else{if(s==="DOCK"){s="FLOAT"}}v();q.call(z.data.ctx,"CommPanel: Dock/UnDock")}function q(z){if($("#CommunicationPanelContainer").length>0){$(window).trigger("resize.commpanel",z)}}function e(z,C){var B=$("#CommunicationPanelContainer");if(B.length>0){var H=(s==="FLOAT")?$("#_sweclient").height():$("#_swecontent").height();var I=B.height();var D=B.find($("#CommunicationPanel")).height();var F=(B.find($("#CTIToolbar")).length===0)?0:B.find($("#CTIToolbar")).height();var E=(B.find($("#Dashboard")).length===0)?0:B.find($("#Dashboard")).height();var A=(B.find($("#SS_ChatUI")).length===0)?0:B.find($("#SS_ChatUI")).height();var G=D+F+E+A;if(3<h){if(!u.IsEmpty(z)&&u.IsEmpty(z.namespace)){C=C||"Window"}else{C=C||"Unknown"}n.call(this,3,"Resize triggered from "+C+"\n  CommPanel Height Limit:     "+H+"\n  CommPanel Container Height: "+I+"\n  Sub Panels Height:          "+G+"\n    CommPanel: "+D+"\n    CTI:       "+F+"\n    Dashboard: "+E+"\n    Chat:      "+A)}if(H<I||I<G){B.removeClass("siebui-comm-panel-height-auto")}else{B.addClass("siebui-comm-panel-height-auto")}if(s==="FLOAT"&&z.namespace===undefined){B.trigger("dragstop.commpanel")}}}function d(){var A=$("#CommunicationPanelContainer");var z;var B;if(A.length>0){if(this.GetPM().Get("Show")){A.removeClass("forcehide");A.find($("#CTIToolbar")).removeClass("forcehide");B=$("#siebui-toolbar-toggle-communication-panel .siebui-toolbar-toggle-communication-panel-notification");if(B.length>0){z=B.attr("data-initial-title")||"";B.removeClass("siebui-toolbar-toggle-communication-panel-notification").attr("aria-label",z).attr("title",z)}q.call(this,"CommPanel: Post Show")}else{$(window).off("resize.commpanel");A.addClass("forcehide");A.find($("#CTIToolbar")).addClass("forcehide")}}}function n(A,z){if(A<h){A=(A<t.length)?A:t.length-1;SiebelJS.Log("["+u.GetISODateTime(null,true)+"]: "+t[A]+z)}}return y}());return SiebelAppFacade.CommunicationPanelPR})};