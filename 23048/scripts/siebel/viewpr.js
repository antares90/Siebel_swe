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
if(typeof(SiebelAppFacade.ViewPR)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.ViewPR");define("siebel/viewpr",["siebel/basephyrenderer"],function(){SiebelAppFacade.ViewPR=(function(){var m=SiebelJS.Dependency("SiebelApp.Utils");var f=SiebelJS.Dependency("SiebelApp.Constants");var k=f.get("SWE_CTRL_LINK");var j=f.get("SWE_CTRL_IMAGECONTROL");var e=f.get("SWE_CTRL_TEXTDATA");var i=f.get("SWE_PST_BUTTON_CTRL");function c(){SiebelAppFacade.ViewPR.superclass.constructor.apply(this,arguments)}SiebelJS.Extend(c,SiebelAppFacade.BasePR);c.prototype.Init=function(){SiebelAppFacade.ViewPR.superclass.Init.call(this);this.AttachPMBinding("ExecuteViewUpdate",a,{scope:this})};c.prototype.ShowUI=function(){SiebelAppFacade.ViewPR.superclass.ShowUI.call(this);if(SiebelApp.S_App.IsRwd()){$("#"+SiebelApp.S_App.ViewTarget()).addClass("siebui-view");l.call(this)}else{$("#_svf0").addClass("siebui-view")}if(m.IsTrue(SiebelApp.S_App.IsSui())&&$(".siebui-from-landing-view").length===0){$("html").removeClass("siebui-landing");g()}};c.prototype.BindEvents=function(){SiebelAppFacade.ViewPR.superclass.BindEvents.call(this);if(SiebelApp.S_App.IsRwd()){var n=this.GetPM().Get("GetControls");for(var o in n){if(n.hasOwnProperty(o)){b.call(this,n[o])}}}};function b(q){var o=$("#"+q.GetProperty(f.get("SWE_PROP_TMPL_ITM_HOLDER"))),p=q.GetProperty(f.get("SWE_PROP_TYPE")),n=SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper");switch(p){case i:n.Manage(o,"click",{ctx:this,ctrlPS:q},function(r){setTimeout(function(){r.data.ctx.InvokeControlMethod(r.data.ctrlPS)},0);r.preventDefault()});break;case k:break;case j:break;default:break}}c.prototype.InvokeControlMethod=function(p){SiebelApp.S_App.uiStatus.Busy({});var o={};o.async=true;o.cb=function(){var q=Array.prototype.slice.call(arguments);var r=q?q[q.length-1]:"";if(r!==f.get("SWE_RPC_PROP_NEW_LAYOUT")&&r!==f.get("SWE_RPC_PROP_REFRESH_LAYOUT")&&r!==f.get("SWE_RPC_PROP_NEW_PAGE")){SiebelApp.S_App.uiStatus.Free()}};var n=CCFMiscUtil_CreatePropSet();this.GetPM().OnControlEvent(f.get("INVOKE_VIEW_CONTROL"),p,n,o)};c.prototype.BindData=function(){SiebelAppFacade.ViewPR.superclass.BindData.call(this)};function a(){var o=this.GetPM(),n=o.Get("GetControls");for(var p in n){if(n.hasOwnProperty(p)){h.call(this,n[p])}}}function h(q){var o=this.GetPM(),n=$("#"+q.GetProperty(f.get("SWE_PROP_TMPL_ITM_HOLDER"))),s=false,p=q.GetProperty(f.get("SWE_PROP_TYPE")),r=q.GetProperty(f.get("SWE_PROP_MTHD_NAME"));if(!n){return}switch(p){case i:s=o.ExecuteMethod("CanInvokeMethod",r);if(s){n.removeClass("appletButtonDis").removeAttr("disabled")}else{n.addClass("appletButtonDis").attr("disabled","disabled")}break;case k:var s=(r)?o.ExecuteMethod("CanInvokeMethod",r):false;if(s){n.removeClass("siebui-link-icon-d")}else{n.addClass("siebui-link-icon-d")}break}}function l(){var o=this.GetPM(),n=o.Get("GetControls");for(var p in n){if(n.hasOwnProperty(p)){d.call(this,n[p])}}}function d(r){var t=this.GetPM(),u=$("#"+r.GetProperty(f.get("SWE_PROP_TMPL_ITM_HOLDER"))),w=0,v=false,x=r.GetProperty(f.get("SWE_PROP_TYPE")),q=r.GetProperty(f.get("SWE_PROP_MTHD_NAME")),s=r.GetProperty(f.get("SWE_PROP_DISP_NAME")),p=t.Get("GetTitle"),o=SiebelApp.S_App.IsAutoOn(),n=r.GetProperty(f.get("SWE_PROP_JUSTIFICATION"));if(!u){return}switch(x){case i:v=t.ExecuteMethod("CanInvokeMethod",q);if(p!==""){p=p+":"}u.addClass("appletButton");if(!v){u.addClass("appletButtonDis").attr("disabled","disabled")}u.attr("type","button").attr("data-display",s).attr("tabindex",w).attr("title",p+s).attr("aria-label",p+s);break;case e:if(m.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced())){u.attr("tabindex",w).addClass("siebui-ctrl-link");if(n){u.addClass("siebui-input-align-"+n)}}break;case k:if(u.length===1){var v=(q)?t.ExecuteMethod("CanInvokeMethod",q):false;u.attr("role","link").attr("tabindex",v?w:"-1").addClass(v?"siebui-link-icon-e":"siebui-link-icon-d");if(n){u.addClass("siebui-input-align-"+n)}}break;case j:if(n){u.addClass("siebui-input-align-"+n)}break;default:u.attr("tabindex",w).addClass("siebui-ctrl-link");if(n){u.addClass("siebui-input-align-"+n)}break}if(o==="true"){this.InjectQTPInfo(u,r)}u=null}c.prototype.InjectQTPInfo=function(n,o){if((n.length!=0)&&(o!=undefined)){$(n).attr("ot",o.GetProperty(f.get("SWE_PROP_QTP_OT")));$(n).attr("rn",o.GetProperty(f.get("SWE_PROP_QTP_RN")));$(n).attr("un",o.GetProperty(f.get("SWE_PROP_QTP_UN")))}};function g(){var s,n,u=0,r=0,v,o=$("#s_sctrl_tabScreen"),p=SiebelApp.S_App.GetDirection(),q=o.scrollLeft();n=o.children("ul").children("li");for(var t=0,u=n.length;t<u;t++){r+=n.eq(t).width()}if($(".siebui-landing").length===0){o.children("ul").width(r)}viewport=o.width();if(q>0){if(p){$("#sui-right-scroll").removeClass("siebui-tile-scroll-d");$("#sui-right-scroll").addClass("siebui-tile-right-scroll")}else{$("#sui-left-scroll").removeClass("siebui-tile-scroll-d");$("#sui-left-scroll").addClass("siebui-tile-left-scroll")}}else{if(p){$("#sui-right-scroll").addClass("siebui-tile-scroll-d")}else{$("#sui-left-scroll").addClass("siebui-tile-scroll-d")}}s=r-(q+viewport);if(s>0){if(p){$("#sui-left-scroll").removeClass("siebui-tile-scroll-d");$("#sui-left-scroll").addClass("siebui-tile-left-scroll")}else{$("#sui-right-scroll").removeClass("siebui-tile-scroll-d");$("#sui-right-scroll").addClass("siebui-tile-right-scroll")}}else{if(p){$("#sui-left-scroll").addClass("siebui-tile-scroll-d")}else{$("#sui-right-scroll").addClass("siebui-tile-scroll-d")}}}return c}());return"SiebelAppFacade.ViewPR"})};