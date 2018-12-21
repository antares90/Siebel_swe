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
if(typeof(SiebelAppFacade.DynaControlFormPR)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.DynaControlFormPR");define("siebel/dynacontrolformpr",["siebel/phyrenderer"],function(){SiebelAppFacade.DynaControlFormPR=(function(){function a(b){SiebelAppFacade.DynaControlFormPR.superclass.constructor.apply(this,arguments)}SiebelJS.Extend(a,SiebelAppFacade.PhysicalRenderer);a.prototype.Init=function(){SiebelAppFacade.DynaControlFormPR.superclass.Init.call(this);this.GetPM().SetProperty("SelectedRow",0);this.AttachPMBinding("CellChange",this.SetCellValue);this.AttachPMBinding("FocusFirstControl",this.FocusFirstControl)};a.prototype.ShowUI=function(){var e=this.GetPM();if(SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM().Get("ViewPRLoaded")){var b=e.Get("GetControls"),g=e.Get("GetFullId"),c=e.Get("AppletTemplateId"),i=$("#"+c).html();$("#"+c).html('<div id="'+g+'"><div id="s_'+g+'_div"></div></div>');var d=$("#s_"+g+"_div");if(i){d.append(i)}for(var f in b){if(b.hasOwnProperty(f)){var h=b[f];$("#"+h.GetName()).addClass("siebui-show-control");if(h.GetUIType()==="Label"){$("#"+h.GetName()).text(h.GetDisplayName())}}}SiebelAppFacade.DynaControlFormPR.superclass.ShowUI.call(this)}};a.prototype.BindData=function(){if(SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM().Get("ViewPRLoaded")){SiebelAppFacade.DynaControlFormPR.superclass.BindData.call(this)}};a.prototype.BindEvents=function(){if(SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM().Get("ViewPRLoaded")){SiebelAppFacade.DynaControlFormPR.superclass.BindEvents.call(this)}};a.prototype.SetCellValue=function(e,i,b){var f=this.GetPM();var j=f.Get("GetControls");var c;for(var g in j){if(j.hasOwnProperty(g)){var h=j[g];if(h.GetName()==i){var d=$("#"+i);if(d.length===0){return false}else{d.val(b);c=true}d=null;return c}}}};a.prototype.FocusFirstControl=function(){var c=this.GetPM().Get("GetControls");var b=9999;this.SetFirstControl(null);for(var f in c){if(c.hasOwnProperty(f)){var e=c[f];if(e.GetIndex()&&e.GetIndex()<b){var d=false;if(this.GetPM().Get("IsInQueryMode")===false){d=this.GetPM().ExecuteMethod("CanUpdate",f)}else{d=true}if(d&&!utils.IsEmpty(e.GetUIType())&&(e.isBasicControl()||e.GetUIType()[0]==="J"||e.GetUIType()===mvg||e.GetUIType()===pick)&&($("#"+e.GetInputName())[0]||$("[name="+e.GetInputName()+"]")[0])){b=e.GetIndex();this.SetFirstControl($("#"+e.GetInputName())[0]||$("[name="+e.GetInputName()+"]")[0]);break}}}}if(this.GetFirstControl()!=null){$(this.GetFirstControl()).focus();return}this.FocusFirstNonEditableControl()};return a}());return SiebelAppFacade.DynaControlFormPR})};