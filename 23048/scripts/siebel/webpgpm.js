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
if(typeof(SiebelAppFacade.WebpgPM)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.WebpgPM");define("siebel/webpgpm",["siebel/pmodel"],function(){SiebelAppFacade.WebpgPM=(function(){var i=SiebelJS.Dependency("SiebelApp.Utils"),g=SiebelJS.Dependency("SiebelApp.Constants");function h(k){SiebelAppFacade.WebpgPM.superclass.constructor.call(this,k);var j={};var m=null;var l=null;this.GetControls=function(){return j};this.GetCanInvokeByName=function(){return l};this.SetCanInvokeByName=function(){l=[]};this.GetCanInvokeArray=function(){return m};this.SetCanInvokeArray=function(){m=[]}}SiebelJS.Extend(h,SiebelAppFacade.BasePM);h.prototype.Init=function(){this.AddProperty("placeholder",g.get("SWE_PROP_TMPL_ITM_HOLDER"));this.AddProperty("itemArray",[]);this.AddMethod("InvokeControlMethod",a);this.AddMethod("CanInvokeMethod",f);this.AddMethod("ProcessProperties",e);this.AddMethod("ExecuteUIUpdate",function(){})};h.prototype.Setup=function(k){var j=CCFMiscUtil_CreatePropSet();k.SetProperty("SWE_OUI_RENDERER","WebpgPR");SiebelAppFacade.WebpgPM.superclass.Setup.call(this,j);d.call(this,k)};function d(j){if(j.GetChildCount()>0){var m=j.GetChildByType(g.get("SWE_PST_CNTRL_LIST"));if(m){var k=m.GetChildCount(),l;for(l=0;l<k;l++){c.call(this,m.GetChild(l))}}}}function a(j){var k=CCFMiscUtil_CreatePropSet();SiebelApp.S_App.CallServer(j.GetChild(0),k,true,{async:true})}function e(k){var j=k.GetProperty(g.get("SWE_PROP_CAN_INVOKE"));if(typeof(j)==="string"){b.call(this,j)}}function b(l){var o=[];var k=true;CCFMiscUtil_StringToArray(l,o);if(!this.GetCanInvokeByName()){this.SetCanInvokeByName()}this.SetCanInvokeArray();if(o.length>=2){for(var n=0,j=o.length;n<j;n+=2){var m=o[n];var p=o[n+1];if(m){k=(p==="1")?true:false;this.GetCanInvokeArray().push(m);this.GetCanInvokeByName()[m]={bCanInvoke:k}}}}}function f(k){var j=true;if(!k){return false}if(this.GetCanInvokeByName()!==null&&this.GetCanInvokeByName()[k]){j=this.GetCanInvokeByName()[k].bCanInvoke;if(j!==undefined||j!==null){return j}}return j}function c(j){var k=SiebelApp.S_App.LookupStringCache;j.SetProperty(g.get("SWE_PROP_NAME"),k(j.GetProperty(g.get("SWE_PROP_NAME"))));j.SetProperty(g.get("SWE_PROP_TMPL_ITM_HOLDER"),j.GetProperty(g.get("SWE_PROP_TMPL_ITM_HOLDER")));j.SetProperty(g.get("SWE_PROP_TYPE"),k(j.GetProperty(g.get("SWE_PROP_TYPE"))));j.SetProperty(g.get("SWE_PROP_SEQ"),j.GetProperty(g.get("SWE_PROP_SEQ")));j.SetProperty(g.get("SWE_PROP_DISP_NAME"),k(j.GetProperty(g.get("SWE_PROP_DISP_NAME"))));j.SetProperty(g.get("SWE_PROP_HTML_ATTRIBUTE"),k(j.GetProperty(g.get("SWE_PROP_HTML_ATTRIBUTE"))));j.SetProperty(g.get("SWE_PROP_MTHD_NAME"),k(j.GetProperty(g.get("SWE_PROP_MTHD_NAME"))));j.SetProperty(g.get("SWE_SHOW_POPUP_STR"),k(j.GetProperty(g.get("SWE_SHOW_POPUP_STR"))));j.SetProperty(g.get("SWE_CTRL_URL"),k(j.GetProperty(g.get("SWE_CTRL_URL"))));this.GetControls()[j.GetProperty(g.get("SWE_PROP_NAME"))]=j}return h}());return"SiebelAppFacade.WebpgPM"})};