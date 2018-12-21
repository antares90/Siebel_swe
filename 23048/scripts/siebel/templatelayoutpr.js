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
if(typeof(SiebelAppFacade.TemplateLayoutPR)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.TemplateLayoutPR");define("siebel/templatelayoutpr",["siebel/phyrenderer"],function(){var a=SiebelJS.Dependency("SiebelApp.Constants");SiebelAppFacade.TemplateLayoutPR=(function(){function b(c){SiebelAppFacade.TemplateLayoutPR.superclass.constructor.call(this,c)}SiebelJS.Extend(b,SiebelAppFacade.PhysicalRenderer);b.prototype.Init=function(){SiebelAppFacade.TemplateLayoutPR.superclass.Init.call(this);var c=this.GetPM();var e=c.Get("GetAppletLabel");var d=$("#"+c.Get("GetFullId"));d.parent().parent().parent().find(".ui-dialog-titlebar").find(".ui-dialog-title").text(e)};b.prototype.BindControlEvents=function(e){SiebelAppFacade.TemplateLayoutPR.superclass.BindControlEvents.call(this,e);var c=e.GetUIType();switch(c){case a.get("SWE_CTRL_CHECKBOX"):if(e.GetName()==="ChkToggleList"&&e.GetMethodName()==="ToggleList"){var d='input[name="'+e.GetInputName()+'"]';$(d).bind("click",{ctx:this,ctrl:e},function(g){var f=g.target.checked?"Y":"N";g.data.ctx.GetPM().OnControlEvent("ToggleContentList",f)})}break;default:break}};b.prototype.BindData=function(){SiebelAppFacade.TemplateLayoutPR.superclass.BindData.call(this);var h=this.GetPM();var q=h.Get("GetControls");for(var l in q){if(q.hasOwnProperty(l)){var k=q[l];if(k.GetUIType()===a.get("SWE_CTRL_COMBOBOX")){var g=CCFMiscUtil_CreatePropSet();var o=CCFMiscUtil_CreatePropSet();var f=[];var c=[];var n,p;var r=this.GetUIWrapper(k);g=k.GetRadioGroupPropSet();for(var j=0;j<g.GetChildCount();j++){o=g.GetChild(j);n=o.GetProperty("DisplayName");p=o.GetProperty("FieldValue");f.push(n);c.push(p)}var e=k.GetHTMLAttr();var d=r.GetEl();var m=h.ExecuteMethod("GetComboSize",e);if(m.length===2){d.css("height",m[0]);d.css("width",m[1])}if(k.GetName()==="Contents"){h.ExecuteMethod("SetContentCtl",k,r,f,c)}else{if(k.GetName()==="Layout"){h.ExecuteMethod("SetLayoutCtl",k,r,f,c)}}}}}h.ExecuteMethod("SetDisplayExtMap")};return b}());return SiebelAppFacade.TemplateLayoutPR})};