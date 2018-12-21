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
if(typeof(SiebelAppFacade.ExpressionDesignerPM)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.ExpressionDesignerPM");define("siebel/expressiondesignerpm",["siebel/pmodel"],function(){SiebelAppFacade.ExpressionDesignerPM=(function(){var d=SiebelJS.Dependency("SiebelApp.Constants");function c(g,i,j){var h=SiebelAppFacade.PresentationModel.GetCtrlTemplate(g,g,d.get("SWE_PST_BUTTON_CTRL"),1);h.SetType(d.get("SWE_PST_CNTRL"));h.SetPropertyStr(d.get("SWE_PROP_NAME"),g);h.SetPropertyStr(d.get("SWE_PROP_TYPE"),d.get("SWE_PST_BUTTON_CTRL"));h.SetPropertyStr(d.get("SWE_PROP_JUSTIFICATION"),"center");if(j){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),g);h.SetPropertyStr(d.get("SWE_PROP_MTHD_NAME"),"AddElmnt");h.SetPropertyStr(d.get("SWE_PROP_SPAN"),"AddElement");h.SetPropertyStr("cph","AddElement")}else{h.SetPropertyStr(d.get("SWE_PROP_MTHD_NAME"),g);h.SetPropertyStr(d.get("SWE_PROP_SPAN"),g);h.SetPropertyStr("cph",g)}if(g==="AND"||g==="OR"||g==="NOT"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),g)}else{if(g==="EQUAL"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),"=")}else{if(g==="GREATER_THAN"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),">")}else{if(g==="LESS_THAN"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),"<")}else{if(g==="NOT_EQUAL"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),"<>")}else{if(g==="LESS_THAN_EQUAL"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),"<=")}else{if(g==="GREATER_THAN_EQUAL"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),">=")}else{if(g==="NOT_EQUAL"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),"<>")}else{if(g==="IS_NULL"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),"IS NULL")}else{if(g==="IS_NOT_NULL"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),"IS NOT NULL")}else{if(g==="METHOD"){h.SetPropertyStr(d.get("SWE_PROP_DISP_NAME"),"()")}}}}}}}}}}}i.ExecuteMethod("AddClientControl",h)}function e(g){SiebelAppFacade.ExpressionDesignerPM.superclass.constructor.call(this,g)}SiebelJS.Extend(e,SiebelAppFacade.PresentationModel);e.prototype.Init=function(){SiebelAppFacade.ExpressionDesignerPM.superclass.Init.call(this);var g=["AddElmnt","OR","AND","NOT","EQUAL","GREATER_THAN","LESS_THAN","NOT_EQUAL","LESS_THAN_EQUAL","GREATER_THAN_EQUAL","IS_NULL","IS_NOT_NULL","METHOD"];this.AddProperty("Syntax","");this.AddProperty("StartText","");this.AddProperty("EndText","");this.AddProperty("MethodArray",g);this.AddMethod("InvokeMethod",b,{sequence:true,scope:this});this.AddMethod("CanInvokeMethod",f,{sequence:true,scope:this});this.AttachNotificationHandler(d.get("SWE_PROP_BC_NOTI_GENERIC"),a);this.AddMethod("GetSelectedText",function(){});this.AddMethod("SetCursorPosition",function(){})};function a(g){var i=g.GetProperty(d.get("SWE_PROP_NOTI_TYPE"));if(i===d.get("SWE_EXPR_SYNTAX")){var j=[];var h=g.GetProperty(d.get("SWE_PROP_ARGS_ARRAY"));if(h){CCFMiscUtil_StringToArray(h,j);this.SetProperty("Syntax",j[0])}}}function f(h){var j=this.Get("MethodArray");var g=true;var i=arguments[arguments.length-1];if(j&&(utils.IndexOf(j,h)>=0)){i.CancelOperation=true;i.ReturnValue=true}}function b(q,l){var h={OR:"OR",AND:"AND",NOT:"NOT",EQUAL:"=",GREATER_THAN:">",LESS_THAN:"<",NOT_EQUAL:"<>",LESS_THAN_EQUAL:"<=",GREATER_THAN_EQUAL:">=",IS_NULL:"IS NULL",IS_NOT_NULL:"IS NOT NULL",METHOD:"()"};var k;var i;var n=arguments[arguments.length-1];var j=this.ExecuteMethod("GetControl","Expression");this.ExecuteMethod("GetSelectedText");if(q==="AddElmnt"){var p;var g;this.ExecuteMethod("InvokeMethod","AddElement",g,p);var o=this.Get("Syntax");if(o){i=o}}else{if(h.hasOwnProperty(q)){i=h[q]}}var m=this.Get("MethodArray");if(m&&(utils.IndexOf(m,q)>=0)){k=this.Get("StartText")+i+this.Get("EndText");this.ExecuteMethod("SetFormattedValue",j,k);this.ExecuteMethod("SetCursorPosition");n.CancelOperation=true;n.ReturnValue="true";SiebelApp.S_App.uiStatus.Free()}}e.prototype.UpdateModel=function(s){SiebelAppFacade.ExpressionDesignerPM.superclass.UpdateModel.call(this,s);var k=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_EXPR_DESGN_ADD_ELEM");c(k,this,true);var h="OR";c(h,this,false);var i="AND";c(i,this,false);var q="NOT";c(q,this,false);var r="EQUAL";c(r,this,false);var g="GREATER_THAN";c(g,this,false);var l="LESS_THAN";c(l,this,false);var t="NOT_EQUAL";c(t,this,false);var n="LESS_THAN_EQUAL";c(n,this,false);var p="GREATER_THAN_EQUAL";c(p,this,false);var j="IS_NULL";c(j,this,false);var m="IS_NOT_NULL";c(m,this,false);var o="METHOD";c(o,this,false)};return e}());return SiebelAppFacade.ExpressionDesignerPM})};