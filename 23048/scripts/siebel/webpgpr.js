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
if(typeof(SiebelAppFacade.WebpgPR)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.WebpgPR");define("siebel/webpgpr",[],function(){SiebelAppFacade.WebpgPR=(function(){var l=SiebelJS.Dependency("SiebelApp.Utils");var f=SiebelJS.Dependency("SiebelApp.Constants");var j=f.get("SWE_CTRL_LINK");var i=f.get("SWE_CTRL_IMAGECONTROL");var e=f.get("SWE_CTRL_PLAINTEXT");var m=f.get("SWE_CTRL_TEXTDATA");var h=f.get("SWE_PST_BUTTON_CTRL");var k=f.get("SWE_CTRL_LABEL");function d(){SiebelAppFacade.WebpgPR.superclass.constructor.apply(this,arguments)}SiebelJS.Extend(d,SiebelAppFacade.BasePR);d.prototype.Init=function(){SiebelAppFacade.WebpgPR.superclass.Init.call(this);this.AttachPMBinding("ExecuteUIUpdate",a)};d.prototype.ShowUI=function(){SiebelAppFacade.WebpgPR.superclass.ShowUI.call(this);n.call(this)};function a(){var p=this.GetPM(),o=p.GetControls();for(var q in o){if(o.hasOwnProperty(q)){g.call(this,o[q])}}}function g(r){var p=this.GetPM(),o=$("#"+r.GetProperty(f.get("SWE_PROP_TMPL_ITM_HOLDER"))),t=false,q=r.GetProperty(f.get("SWE_PROP_TYPE")),s=r.GetProperty(f.get("SWE_PROP_NAME"));if(!o){return}switch(q){case h:t=p.ExecuteMethod("CanInvokeMethod",s);if(t){o.removeClass("appletButtonDis").removeAttr("disabled")}else{o.addClass("appletButtonDis").attr("disabled","disabled")}break;case j:var t=(s)?p.ExecuteMethod("CanInvokeMethod",s):false;if(t){o.removeClass("siebui-link-icon-d");o.addClass("siebui-link-icon-e")}else{o.removeClass("siebui-link-icon-e");o.addClass("siebui-link-icon-d")}break}}function n(){var p=this.GetPM(),o=p.GetControls();for(var q in o){if(o.hasOwnProperty(q)){c.call(this,o[q])}}}function c(r){var s=this.GetPM(),t=$("#"+r.GetProperty(f.get("SWE_PROP_TMPL_ITM_HOLDER"))),w=0,v=false,u=r.GetProperty(f.get("SWE_PROP_NAME")),x=r.GetProperty(f.get("SWE_PROP_TYPE")),p=r.GetProperty(f.get("SWE_PROP_MTHD_NAME")),q=r.GetProperty(f.get("SWE_PROP_DISP_NAME")),o=SiebelApp.S_App.IsAutoOn();if(!t){return}switch(x){case h:v=s.ExecuteMethod("CanInvokeMethod",u);t.addClass("appletButton");if(!v){t.addClass("appletButtonDis").attr("disabled","disabled")}t.attr("type","button").attr("data-display",q).attr("tabindex",w).attr("title",q).attr("aria-label",q);t=null;break;case k:case m:case e:if(l.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced())){t.attr("tabindex",w).addClass("siebui-input-align-"+r.GetProperty(f.get("SWE_PROP_JUSTIFICATION")))}t=null;break;case j:if(t.length===1){var v=(p)?s.ExecuteMethod("CanInvokeMethod",u):false;t.attr("href","javascript:void()").attr("role","link").attr("tabindex",v?w:"-1").addClass(v?"siebui-link-icon-e":"siebui-link-icon-d")}t=null;break;case i:t.addClass("siebui-input-align-"+r.GetProperty(f.get("SWE_PROP_JUSTIFICATION")));break;default:t.attr("tabindex",w).addClass("siebui-input-align-"+r.GetProperty(f.get("SWE_PROP_JUSTIFICATION")));break}if(o==true){this.InjectQTPInfo(t,r)}}d.prototype.InjectQTPInfo=function(o,p){if((o.length!=0)&&(p!=undefined)){$(o).attr("ot",p.GetProperty(f.get("SWE_PROP_QTP_OT")));$(o).attr("rn",p.GetProperty(f.get("SWE_PROP_QTP_RN")));$(o).attr("un",p.GetProperty(f.get("SWE_PROP_TYPE")))}};d.prototype.BindEvents=function(){SiebelAppFacade.WebpgPR.superclass.BindEvents.call(this);var o=this.GetPM().GetControls();for(var p in o){if(o.hasOwnProperty(p)){b.call(this,o[p])}}};function b(r){var p=$("#"+r.GetProperty(f.get("SWE_PROP_TMPL_ITM_HOLDER"))),q=r.GetProperty(f.get("SWE_PROP_TYPE")),o=SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper");switch(q){case j:case h:o.Manage(p,"click",{ctx:this,ctrlPS:r},function(s){setTimeout(function(){s.data.ctx.GetPM().ExecuteMethod("InvokeControlMethod",r)},0);s.preventDefault()});break;case i:break;default:break}}return d}());return"SiebelAppFacade.WebpgPR"})};