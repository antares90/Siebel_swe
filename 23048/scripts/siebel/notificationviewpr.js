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
if(typeof(SiebelApp.S_App.notificationviewpr)=="undefined"){Namespace("SiebelApp.S_App.notificationviewpr");define("siebel/notificationviewpr",["siebel/viewpr"],function(){SiebelAppFacade.notificationviewpr=(function(){function b(c){SiebelAppFacade.notificationviewpr.superclass.constructor.call(this,c)}SiebelJS.Extend(b,SiebelAppFacade.ViewPR);b.prototype.Init=function(){SiebelAppFacade.notificationviewpr.superclass.Init.call(this);this.AttachPMBinding("ComponentStateChange",this.ComponentDisplay)};b.prototype.ShowUI=function(){SiebelAppFacade.notificationviewpr.superclass.ShowUI.call(this);var c=[];var e=[];c=$("[id^=s_S_A]");for(var d=0;d<c.length;d++){e[d]="#"+c[d].id}this.GetPM().ExecuteMethod("PrepareStateInfo",e);a(this)};b.prototype.ComponentDisplay=function(f,d){var e="#s_S_A"+f+"_div";var c="a_"+f;if(d===true){$(e).parent().show();$(e+"_Btn").addClass("siebui-userprofile-navigationtabs-focus")}else{if(d===false){$(e).parent().hide();$(e+"_Btn").removeClass("siebui-userprofile-navigationtabs-focus")}}$(".siebui-view-multi-column").remove()};function a(h){var c=h.GetPM().Get("ChildComponentState");var e="<div id=UserPreferTabs class=ui-body-g>";for(var d=0;d<c.length;d++){if(d===0){var f="#S_A"+c[d].id;var g="#s_S_A"+c[d].id+"_div_Btn"}e+="<button id=s_S_A"+c[d].id+"_div_Btn class=ui-btn>"+c[d].childLabel+"</button>"}$(f).parent().prepend(e);$(g).addClass("siebui-userprofile-navigationtabs-focus")}b.prototype.BindEvents=function(){$("#UserPreferTabs").find(".ui-btn").bind("click",{ctx:this},function(f){f.data.ctx.GetPM().OnControlEvent("TabClick",this.id);var d=f.data.ctx.GetPM().Get("ChildComponentState");var h;for(var e=0;e<d.length;e++){h=$("#s_S_A"+d[e].id+"_div");if(h.hasClass("siebui-edit-mode")){var c=SiebelApp.S_App.GetActiveView().GetApplet(d[e].childName).GetControls();for(var g in c){if(!(g==="UndoRecord"||g==="SaveEditRecord")&&$("[name="+c[g].GetInputName()+"]")){$("[name="+c[g].GetInputName()+"]").parent().addClass("siebui-ipe-enabled")}}h.removeClass("siebui-edit-mode");h.addClass("siebui-roipe-mode")}}})};return b}());return"SiebelAppFacade.notificationviewpr"}())};