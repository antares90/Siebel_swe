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
if(typeof(SiebelApp.S_App.DateFilterControl)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.DateFilterControl");SiebelApp.S_App.DateFilterControl=(function(){var c="";function b(){var d;e=function e(){return d};e.prototype=this;d=new e();d.constructor=e;return d}b.prototype.populate=function(d){c=new Date();var e=d.GetDefn().userPropMap["Search Field Name"];if(utils.IsEmpty(e)){d.GetBusComp().SetSearchExpr("[Planned] = Today()")}else{d.GetBusComp().SetSearchExpr("["+e+"] = Today()")}};b.prototype.DoCanInvokeMethod=function(f,e){var d=CCFMiscUtil_CreatePropSet();if(f==="GetCurrentDate"){d.SetProperty("Invoked",true);d.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:d})}else{if(f==="PrevDay"){d.SetProperty("Invoked",true);d.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:d})}else{if(f==="NxtDay"){d.SetProperty("Invoked",true);d.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:d})}}}};b.prototype.DoInvokeMethod=function(d,f){var e=CCFMiscUtil_CreatePropSet();if(d==="NxtDay"||d==="PrevDay"||d==="JumtoToday"||d==="GotoDay"){this.GotoDayEvent(d,f);e.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:e})}else{if(d==="GetCurrentDate"){this.GetCurrentDate(f);e.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:e})}}};function a(d){var e=d.getDate();e=e.toString();if(e.length===1){e="0"+e}return e}b.prototype.GetCurrentDate=function(g){var e=CCFMiscUtil_CreatePropSet();if(utils.IsEmpty(c)){c=new Date()}e.SetType("GetCurrentDate");var h=c.getMonth()+1;var f=h+"/"+c.getDate()+"/"+c.getFullYear();f=SiebelApp.S_App.LocaleObject.GetStringFromDateTime(f,"M/D/YYYY",SiebelApp.S_App.LocaleObject.m_sDateFormat,true);e.SetProperty("CurrentDate",f);var i=e.EncodeAsString();var d=[];d.push(i);SiebelApp.OfflineAppMgr.PostActions("ActionRPCCompleted");if(!(g.IsNotifyEnabled())){g.EnableNotify();g.NotifyGeneric("MobileCurrentDate",d);g.DisableNotify()}else{g.NotifyGeneric("MobileCurrentDate",d)}};b.prototype.GotoDayEvent=function(e,l){var h,g;var q;var u;var s;var r=new Date();var k=r.getTimezoneOffset();if(e==="NxtDay"){q=new Date(c.getTime());q.setHours(0,0,0,0);q.setDate(q.getDate()+1);q.setMinutes(q.getMinutes()+k);u=q.getMonth()+1;s=a.call(this,q);u=u<10?"0"+u:""+u;var j=q.getHours()<10?"0"+q.getHours():""+q.getHours();var p=q.getMinutes()<10?"0"+q.getMinutes():""+q.getMinutes();h=""+q.getFullYear()+""+u+""+s+""+j+""+p;q.setDate(q.getDate()+1);u=q.getMonth()+1;u=u<10?"0"+u:""+u;s=a.call(this,q);var i=q.getHours()<10?"0"+q.getHours():""+q.getHours();var o=q.getMinutes()<10?"0"+q.getMinutes():""+q.getMinutes();g=""+q.getFullYear()+""+u+""+s+""+i+""+o;c.setDate(c.getDate()+1)}else{if(e==="PrevDay"){q=new Date(c.getTime());q.setHours(0,0,0,0);c.setDate(c.getDate()-1);q.setMinutes(q.getMinutes()+k);var j=q.getHours()<10?"0"+q.getHours():""+q.getHours();var p=q.getMinutes()<10?"0"+q.getMinutes():""+q.getMinutes();u=q.getMonth()+1;u=u<10?"0"+u:""+u;s=a.call(this,q);g=""+q.getFullYear()+""+u+""+s+""+j+""+p;q.setDate(q.getDate()-1);u=q.getMonth()+1;u=u<10?"0"+u:""+u;s=a.call(this,q);var i=q.getHours()<10?"0"+q.getHours():""+q.getHours();var o=q.getMinutes()<10?"0"+q.getMinutes():""+q.getMinutes();h=""+q.getFullYear()+""+u+""+s+""+j+""+p}else{if(e==="JumtoToday"){q=new Date();u=q.getMonth()+1;h=""+q.getFullYear()+""+u+""+q.getDate();q.setDate(q.getDate()+1);u=q.getMonth()+1;g=""+q.getFullYear()+""+u+""+q.getDate()}else{if(e==="GotoDay"){var f=SiebelApp.AjaxRequestMgr.GetActiveRequestObj();h=SiebelApp.AjaxRequestMgr.GetActiveRequestObj().SweCommands.StartDate;c=new Date(h);g=SiebelApp.AjaxRequestMgr.GetActiveRequestObj().SweCommands.EndDate;var v=new Date(h);v.setMinutes(v.getMinutes()+k);var j=v.getHours()<10?"0"+v.getHours():""+v.getHours();var p=v.getMinutes()<10?"0"+v.getMinutes():""+v.getMinutes();var n=v.getDate()<10?"0"+v.getDate():""+v.getDate();month1=v.getMonth()+1;month1=month1<10?"0"+month1:""+month1;h=v.getFullYear()+""+month1+""+n+""+j+""+p;var t=new Date(g);t.setMinutes(v.getMinutes()+k);var i=t.getHours()<10?"0"+t.getHours():""+t.getHours();var o=t.getMinutes()<10?"0"+t.getMinutes():""+t.getMinutes();var m=t.getDate()<10?"0"+t.getDate():""+t.getDate();month2=t.getMonth()+1;month2=month2<10?"0"+month2:""+month2;g=t.getFullYear()+""+month2+""+m+""+i+""+o}}}}l.SetSearchExpr("[Planned] >= '"+h+"' AND [Planned] <= '"+g+"'");l.Execute();$.callback(this,function(d){l.Home()})};return new b()}())};