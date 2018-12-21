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
/* 8.1.1.14SIA[23044]PATCHSET9 */
if(typeof(SiebelAppFacade.DynaControlListPM)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.DynaControlListPM");define("siebel/dynacontrollistpm",["siebel/listpmodel"],function(){SiebelAppFacade.DynaControlListPM=(function(){var f=SiebelJS.Dependency("SiebelApp.Constants");var h=SiebelJS.Dependency("SiebelApp.S_App.LocaleObject");var i=SiebelJS.Dependency("SiebelApp.Utils");var d=f.get("SWE_CTRL_DATE_TIME_PICK");var e=f.get("SWE_CTRL_DATE_TZ_PICK");var c=f.get("SWE_CTRL_DATE_PICK");function g(k){SiebelAppFacade.DynaControlListPM.superclass.constructor.apply(this,arguments);this.AddProperty("SelectedRow",-1)}SiebelJS.Extend(g,SiebelAppFacade.ListPresentationModel);g.prototype.Setup=function(l){SiebelAppFacade.DynaControlListPM.superclass.Setup.call(this,l);var k;if(l){k=l.GetChildByType(f.get("SWE_APPLET_PM_PS"))}if(k){this.AddProperty("AppletTemplateId",k.GetProperty("DynaAppletTemplateId"));this.AddProperty("AppletTitleId",k.GetProperty("APPLET_TITLE"));var m=k.GetProperty("Required Control");if(m){this.AddProperty("RequiredControl",m.split(","))}}};g.prototype.Init=function(){SiebelAppFacade.DynaControlListPM.superclass.Init.apply(this,arguments);this.AddMethod("GetSelection",b,{core:true,override:true,scope:this});this.AddMethod("GetRecordSet",a,{override:true,sequence:true,scope:this})};function b(){var k=this.GetPModel().Get("SelectedRow");return(k)?k:0}g.prototype.SetSelection=function(k){this.SetProperty("SelectedRow",k)};function a(l){var m=[];m=j.call(this);function k(n){if(!n){m=[];m=j.call(this)}return m}return m}function j(){var r=[];var t=this;var l=t.GetPrivateFieldMap();var m=t.GetListOfColumns();var r=[];var x=[];var n;var u=0;for(var o in m){if(m[o]){var k=m[o].GetName();x[u]=k;if(t.GetPrivateFieldMap()[k]&&!n){n=l[k].valueArray.length}}u++}for(var p=0;p<n;p++){var q={};for(var v=0,s=x.length;v<s;v++){var w=x[v];q[w]=l[w].valueArray[p]}r.push(q)}return r}return g}());return SiebelAppFacade.DynaControlListPM})};