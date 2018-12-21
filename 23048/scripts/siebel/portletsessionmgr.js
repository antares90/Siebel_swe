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
if(typeof(SiebelApp.S_App.PortletSessionMgr)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.PortletSessionMgr");SiebelApp.S_App.PortletSessionMgr=(function(){var e=SiebelJS.Dependency("SiebelApp.Constants");var c=SiebelJS.Dependency("SiebelApp.Utils");var a;var d=[e.get("SWE_GOTO_VIEW"),e.get("SWE_GET_APPLET"),e.get("SWE_CMD_LOGOFF")];function b(){var p=SiebelApp.S_App.LocaleObject;var n="";var u=0;var l=false;var r="";var t={};var m={};var i;var w;a=this;SiebelApp.S_App.PortletSessionMgr=function(){return a};SiebelApp.S_App.PortletSessionMgr.GetInstance=b.GetInstance;a.constructor=b;this.GetAction=function(){return n};this.ProcessPortalRequest=function(H,F){if(!o(H)){c.Alert(p.GetLocalString("IDS_PORTLET_API_UNAUTHORIZED_REQUEST"));return}if(!t[H]){t[H]=0}if(m[H]){c.Alert(p.GetLocalString("IDS_PORTLET_API_BLOCK_MSG").replace("%1",i));return}else{if(t[H]>=w){k.call(this,true,H.split(","));return}else{if(!j(F)){++t[H];c.Alert(p.GetLocalString("IDS_PORTLET_API_UNAUTHORIZED_REQUEST"));return}else{if(F[e.get("SWE_CMD_ARG")]=="Logoff"){var B,A;SiebelApp.S_App.InvokeMethod("Logoff",B,A)}else{var z=e.get("SWE_PARAM_PORTLET_API_KEY");var G=e.get("SWE_CMD_ARG");var E=e.get("SWE_AUX_CMD_STR");var D=CCFMiscUtil_CreatePropSet();var x=CCFMiscUtil_CreatePropSet();var C={};C.selfbusy=true;C.scope=this;var y=function(){var J=H;if(SiebelApp.S_App.ErrorObject.GetErrorArray(SiebelApp.S_App).length>0){++t[J]}else{t[J]=0}};SiebelApp.S_App.PushPostBack(y,this);x.SetProperty(z,F.Key);for(var I in F){if(F.hasOwnProperty(I)){if((I!==z)&&(I!==E)){x.SetProperty(I,F[I])}}}SiebelApp.S_App.CallServer(x,D,true,C)}}}}};function q(x){r=x.GetProperty(e.get("SWE_PROP_PORTLET_ORIGIN_LIST"));w=Number(x.GetProperty(e.get("SWE_PROP_PORTLET_API_FAILUREATTEMPT")));i=Number(x.GetProperty(e.get("SWE_PROP_PORTLET_API_BLOCK_TIME")));var y=x.GetProperty(e.get("SWE_PARAM_PORTLET_API_BLOCKE_ORIGIN_LIST"));if(y){k.call(this,false,y.split(","))}}this.ProcessPortletInfo=function(x){u=x.GetProperty(e.get("SWE_PROP_SESSIONTIMEOUT_VALUE"));if(c.IsTrue(x.GetProperty(e.get("SWE_PARAM_KEEPALIVE")))){l=true}q.call(this,x);h.call(this,x.GetProperty(e.get("SWE_PROP_PORTLET_ACTION")));if(l){v.call(this)}};function h(x){x=x.replace(/SWEAC[\s]*=/g,"").replace("SWECmd%3d","SWECmd=");if(l){x+="&"+e.get("SWE_PARAM_KEEPALIVE")+"=1"}n=encodeURI(x)}function k(B,y){for(var A=0;A<y.length;A++){m[y[A]]=true}var C=CCFMiscUtil_CreatePropSet();var x=CCFMiscUtil_CreatePropSet();var z={};setTimeout(function(){for(var D=0;D<y.length;D++){m[y[D]]=false;t[y[D]]=0}x.SetProperty(e.get("SWE_PARAM_PORTLET_API_BLOCKE_ORIGIN_LIST"),s());SiebelApp.S_App.CallServer(x,C,false,z)},i*1000);if(B){x.SetProperty(e.get("SWE_PARAM_PORTLET_API_BLOCKE_ORIGIN_LIST"),s());SiebelApp.S_App.CallServer(x,C,false,z);c.Alert(p.GetLocalString("IDS_PORTLET_API_BLOCK_MSG").replace("%1",i))}}function v(){var A=CCFMiscUtil_CreatePropSet();var x=CCFMiscUtil_CreatePropSet();var z=u*1000-100;var y={};x.SetProperty(e.get("SWE_CMD_ARG"),e.get("SWE_PROP_PING"));y.selfbusy=true;setInterval(function(){SiebelApp.S_App.CallServer(x,A,false,y)},z)}function j(y){var x=d.length,A=false,z=y[e.get("SWE_CMD_ARG")];if(!y.Key||y[e.get("SWE_METHOD_STR")]){A=false}else{for(var B=0;B<x;B++){if(z===d[B]){A=true;break}}}return A}function s(){var y="";for(var x in m){if(m.hasOwnProperty(x)){if(m[x]){y=x+","+y}}}return y}function o(y){var x=r.split(","),A=x.length;for(var z=0;z<A;z++){if(x[z]===y){return true}}return false}f.call(this);return a}b.GetInstance=function(){return a};function g(h){SiebelApp.S_App.PortletSessionMgr.GetInstance().ProcessPortalRequest(h.origin,h.data)}function f(){if(window.addEventListener){window.addEventListener("message",g,false)}else{window.attachEvent("onmessage",g,false)}}return b}())};