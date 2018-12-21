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
if(typeof(SiebelAppFacade.OPAViewPM)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.opaviewpm");define("siebel/opaviewpm",["siebel/viewpm"],function(){SiebelAppFacade.OPAViewPM=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants");function c(f){SiebelAppFacade.OPAViewPM.superclass.constructor.call(this,f)}SiebelJS.Extend(c,SiebelAppFacade.ViewPM);c.prototype.Init=function(){SiebelAppFacade.OPAViewPM.superclass.Init.apply(this,arguments);this.AddProperty("ViewPRLoaded",false);this.AddMethod("CallAppletsShowMethod",e,{sequence:true,scope:this});this.AddMethod("HandleCommit",b);this.AttachEventHandler("CallServer",d)};c.prototype.Setup=function(f){SiebelAppFacade.OPAViewPM.superclass.Setup.call(this,f);var g;var i;var h;if(f){g=f.GetChildByType(consts.get("SWE_VIEW_PM_PS"))}if(g){i=g.GetChildByType("SCREEN_DETAILS");this.SetProperty("dynaTemplateId",g.GetProperty("dynaTemplateId"));h=g.GetChildByType("screen-list");this.SetProperty("OPABusinessServcie",g.GetProperty("OPABusinessServcie"));this.SetProperty("OPAWorkflow",g.GetProperty("OPAWorkflow"))}if(i){this.SetProperty("htmlTemplateName",i.GetProperty("SBL_TEMPLATE_NAME"));this.SetProperty("Screen Id",i.GetProperty("Screen Id"));this.SetProperty("vcls",i)}if(h){this.SetProperty("Navigation Step",h)}};function b(){var i=SiebelApp.S_App.GetActiveView();var f=i.GetAppletMap();for(var h in f){if(f.hasOwnProperty(h)){var g=f[h];if(i.IsAppletActive(g)){g.SetHighlightState(false,g)}f[h].PostChangesToBC(true,null,true)}}}function e(){var f=SiebelApp.S_App.GetActiveView().GetAppletMap();var h=0;for(var g in f){if(f.hasOwnProperty(g)){h++;SiebelAppFacade.ComponentMgr.FindComponent({id:g}).Show()}}}function d(){var p,u,g,j,l="",s,r,q,m;if(arguments.length>=1){p=arguments[1]}var h=CCFMiscUtil_CreatePropSet();h.SetProperty("action",p);h.SetProperty("Screen Id",this.Get("ScreenId"));h.SetProperty("WorkflowName",this.Get("OPAWorkflow"));var o;var k=SiebelApp.S_App.GetService(this.Get("OPABusinessServcie"));if(k){var n={};n.async=false;n.selfbusy=true;n.scope=this;n.cb=function(){o=arguments[2];SiebelApp.S_App.uiStatus.Free()};SiebelApp.S_App.uiStatus.Busy({mask:true,loadMsg:true});k.InvokeMethod("InvokeSubWorkflow",h,n)}if(o){u=o.GetChildByType("ResultSet");if(u){g=u.GetChildByType("ErrorDetail");if(g){m=g.GetProperty("StaticAppletName");j=g.GetChildByType("error-list");if(j){for(var i=true;(s=j.EnumProperties(i))!==null;i=false){r=j.GetProperty(s);if(s==="Entity_ID"){q=r;continue}l+=(r+"\n")}SiebelApp.S_App.ErrorObject.GetErrorRendr().ShowError(HtmlDecode(l));var t=SiebelApp.S_App.GetActiveView().GetAppletMap();for(var f in t){if(t.hasOwnProperty(f)){if((q&&f==q)||(!q&&(f!==m))){t[f].FocusFirstControl();break}}}}}}}}return c}());return"SiebelAppFacade.OPAViewPM"})};