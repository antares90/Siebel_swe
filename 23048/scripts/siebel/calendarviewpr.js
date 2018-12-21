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
if(typeof(SiebelApp.S_App.calendarviewpr)=="undefined"){Namespace("SiebelApp.S_App.calendarviewpr");define("siebel/calendarviewpr",["siebel/viewpr"],function(){SiebelAppFacade.calendarviewpr=(function(){function b(c){SiebelAppFacade.calendarviewpr.superclass.constructor.call(this,c)}SiebelJS.Extend(b,SiebelAppFacade.ViewPR);b.prototype.Init=function(){SiebelAppFacade.calendarviewpr.superclass.Init.call(this);this.AttachPMBinding("ComponentModeChange",this.ComponentDisplay)};b.prototype.ShowUI=function(){SiebelAppFacade.calendarviewpr.superclass.ShowUI.call(this);this.GetPM().ExecuteMethod("PrepareModeInfo");a(this)};b.prototype.ComponentDisplay=function(e,c){var d="#s_S_A"+e+"_div";if(c&&c.toLowerCase()==="expanded"){$(d).find(".siebui-collapsible-applet-content").addClass("forceshow");$(d).find(".siebui-collapsible-applet-content").removeClass("forcehide");$(d).find(".siebui-btn-icon-expanded").addClass("forcehide");$(d).find(".siebui-btn-icon-expanded").removeClass("forceshow");$(d).find(".siebui-btn-icon-collapsed").addClass("forceshow");$(d).find(".siebui-btn-icon-collapsed").removeClass("forcehide");$(d).find(".siebui-btn-grp-search").addClass("forceshow");$(d).find(".siebui-btn-grp-search").removeClass("forcehide")}else{if(c&&c.toLowerCase()==="collapsed"){$(d).find(".siebui-collapsible-applet-content").addClass("forcehide");$(d).find(".siebui-collapsible-applet-content").removeClass("forceshow");$(d).find(".siebui-btn-icon-expanded").addClass("forceshow");$(d).find(".siebui-btn-icon-expanded").removeClass("forcehide");$(d).find(".siebui-btn-icon-collapsed").removeClass("forceshow");$(d).find(".siebui-btn-icon-collapsed").addClass("forcehide");$(d).find(".siebui-btn-grp-search").addClass("forcehide");$(d).find(".siebui-btn-grp-search").removeClass("forceshow")}}$(d).find(".siebui-applet-title").addClass("siebui-no-padding");$(d).find(".siebui-btn-grp-applet").addClass("siebui-no-padding")};function a(e){var c=e.GetPM().Get("ChildComponentMode");for(var d=0;d<c.length;d++){if(c[d].displayMode!=null){$("#s_S_A"+c[d].id+"_div").find(".siebui-collapsible-applet-container").addClass("siebui-accordian-btn")}}}b.prototype.BindEvents=function(){$(".siebui-accordian-btn").bind("click",{ctx:this},function(c){c.data.ctx.GetPM().OnControlEvent("TabClick",this)})};return b}());return"SiebelAppFacade.calendarviewpr"}())};