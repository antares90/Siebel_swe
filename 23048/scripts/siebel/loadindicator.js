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
/* 8.1.1.14SIA[23044]PATCHSET10 */
SiebelApp.UIStatus=function(){this.maskClass="siebui-mask-content";this.m_gbusy=0;this.timeOut=false;this.timeOutId=null;this.config={};this.masked=false;this.loadMsg=false};SiebelApp.UIStatus.prototype={Busy:function(a){if(SiebelApp.UIStatus.Global){SiebelApp.UIStatus.Global.Free();delete SiebelApp.UIStatus.Global}this.m_gbusy++;this.config=$.extend({timeOut:true},this.config,a);var b=this;var d=30000;if(SiebelApp.S_App.GetBusyTimer!==undefined){d=SiebelApp.S_App.GetBusyTimer()*1000;d=d<30000?30000:d}if(this.config.timeOut&&this.timeOutId===null){this.timeOutId=setTimeout(function(){b.timeout=true;b.Free()},d)}if(this.config.mask&&!this.masked){$(".siebui-mask-content").text("");if(a.imgClass!="siebui-mask-splash"){$("#mask-img").hide();setTimeout(function(){$("#mask-img").show()},900)}$("#maskoverlay").css({width:$(window).width(),height:$(window).height(),top:"0",left:"0",position:"absolute",display:"block"});if(a.loadMsg){var c=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_LOADING_INDICATOR_TITLE");$(".siebui-mask-content").addClass("loadmsg");$(".siebui-mask-content").text(c)}this.masked=true}if(!$("html").hasClass("siebui-busy")){$("html").addClass("siebui-busy")}return this},Free:function(){if(this.m_gbusy>0&&!this.timeOut){this.m_gbusy--}if(this.m_gbusy<=0||this.timeout){if(this.timeOut){this.m_gbusy=0}else{if(SiebelApp.S_App.GetEnablePerfHooks()&&SiebelApp.S_App.GetTimer()&&this.m_gbusy===0){var a=SiebelApp.S_App.GetTimer();a.TimePopupApplet("","Reset Busy State");a.TimeGoToView("","Reset Busy State");a.TimeInvokeMethod("","","","Reset Busy State");a.TimeRefreshView("","","Reset Busy State");a.ShowTotal()}}this.Reset()}return this},IsBusy:function(){if($("html")[0].className=="siebui-busy"||this.m_gbusy>0){return true}else{return false}},LocalBusy:function(a){this.configLocal=this.configLocal||{};var b=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_LOADING_INDICATOR_TITLE");$.extend(this.configLocal,{message:b,imgClass:"localLoading"});$.extend(this.configLocal,a);if(this.configLocal.mask===true){$(this.configLocal.target).addClass(this.configLocal.imgClass);$(this.configLocal.target).html(this.configLocal.message)}},LocalFree:function(){$(this.configLocal.target).removeClass(this.configLocal.imgClass)},ShowOnLoadIndicator:function(){$("body").append("<div id='maskcontent' aria-live='polite' aria-atomic='true' class='siebui-mask-content' /><div id='maskoverlay' class='siebui-mask-overlay' style='display:none'> <div id='mask-img' class='siebui-mask-outer'>   <div class='siebui-mask-inner' /> </div></div>");var a=new SiebelApp.UIStatus({});a.Busy({target:"html",imgClass:"siebui-mask-splash",mask:true});SiebelApp.UIStatus.Global=a},Reset:function(){this.timeOut=false;if(this.timeOutId!==null){clearTimeout(this.timeOutId)}this.timeOutId=null;this.masked=false;if(this.config.mask){if(this.config.loadMsg){var a=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_DATEPICKER_CLOSE_TEXT");$(".siebui-mask-content").removeClass("loadmsg");$(".siebui-mask-content").text(a);setTimeout(function(){$("#maskoverlay").hide()},1000)}else{$("#maskoverlay").hide()}$("#mask").hide()}$("html").removeClass("siebui-busy");this.config={}}};$(function(){if(!SiebelApp.S_App.PortletSessionMgr||!SiebelApp.S_App.PortletSessionMgr.GetInstance()||!SiebelApp.S_App.PortletSessionMgr.GetInstance().GetAction()||SiebelApp.S_App.PortletSessionMgr.GetInstance().GetAction().indexOf("SWECmd=GetApplet")===-1){SiebelApp.S_App.uiStatus.ShowOnLoadIndicator()}});