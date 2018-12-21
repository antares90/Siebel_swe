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
if(typeof(SiebelAppFacade.AutomationInfo)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.AutomationInfo");SiebelAppFacade.AutomationInfo=(function(){var a=SiebelApp.S_App.LocaleObject;function b(){$(document).mousedown(function(d){if(d.which===3&&d.ctrlKey===true){c(d)}});$(document).bind("contextmenu",function(d){if(d.which===3&&d.ctrlKey===true){d.preventDefault()}});if($("#siebui-automation-dialog-message").length===0){$("body").append(" <div id='siebui-automation-dialog-message' class='siebui-automation-dialog'  title='"+a.GetLocalString("IDS_SWE_AUTOMATION_DIALOG_HEADER")+"'   > "+a.GetLocalString("IDS_SWE_ELEMENT_APPLET_RN")+"<INPUT  class='siebui-input' readonly='readonly' id='Siebel_APPLET_RN' /><br> "+a.GetLocalString("IDS_SWE_ELEMENT_VIEW_RN")+"<INPUT  class='siebui-input' readonly='readonly' id='Siebel_VIEW_RN' /><br> "+a.GetLocalString("IDS_SWE_ELEMENT_SCREEN_RN")+"<INPUT  class='siebui-input' readonly='readonly' id='Siebel_SCREEN_RN' /><br> "+a.GetLocalString("IDS_SWE_ELEMENT_RN")+"<INPUT class='siebui-input' readonly='readonly'\" id='Siebel_RN' /> <br>"+a.GetLocalString("IDS_SWE_ELEMENT_OT")+"<INPUT class='siebui-input' readonly='readonly'\" id='Siebel_OT' /> <br> "+a.GetLocalString("IDS_SWE_ELEMENT_UN")+"<INPUT  class='siebui-input' readonly='readonly' id='Siebel_UN' /><br> "+a.GetLocalString("IDS_SWE_ELEMENT_LOV")+"<INPUT class='siebui-input' readonly='readonly'\" id='Siebel_LOV' /> <br>"+a.GetLocalString("IDS_SWE_ELEMENT_LIC")+"<INPUT class='siebui-input' readonly='readonly'\" id='Siebel_LIC' /> <br>"+a.GetLocalString("IDS_SWE_ELEMENT_CON_STRING")+"<INPUT type='text' class='siebui-input' readonly='readonly' id='Siebel_APPLET_CON_STR' /><br>  </div>");$("#siebui-automation-dialog-message").dialog({autoOpen:false,buttons:{Ok:{text:a.GetLocalString("IDS_SWE_CKEDITOR_OK"),click:function(){$(this).dialog("close")}}}})}}function c(e){var k=$("#siebui-automation-dialog-message");var n=k.find("#Siebel_OT"),r=k.find("#Siebel_RN"),p=k.find("#Siebel_UN"),h=k.find("#Siebel_LOV"),f=k.find("#Siebel_LIC"),j=k.find("#Siebel_APPLET_RN"),l=k.find("#Siebel_VIEW_RN"),o=k.find("#Siebel_SCREEN_RN"),i=k.find("#Siebel_APPLET_CON_STR"),g=$(e.target);j.val(" ");l.val(" ");o.val(" ");n.val(" ");r.val(" ");p.val(" ");i.val(" ");if(!g.attr("ot")){if(g.children().attr("ot")){g=g.children()}else{if(g.parent().attr("ot")){g=g.parent()}else{if(g.parent().parent().attr("ot")){g=g.parent().parent()}}}}if(g.parents(".siebui-applet").length>0){j.val(g.parents(".siebui-applet").attr("rn"))}if(g.parents("#_sweview").length>0){l.val(g.parents("#_sweview").attr("rn"))}if($("#_sweappmenu").find(".siebui-active-navtab").length>0){o.val($("#_sweappmenu").find(".siebui-active-navtab").attr("rn"))}if(g.attr("rn")){r.val(g.attr("rn"))}if(g.attr("ot")){n.val(g.attr("ot"))}if(g.attr("un")){p.val(g.attr("un"))}if(g.attr("data-lovtype")){h.val(g.attr("data-lovtype"))}if(g.attr("data-licval")){f.val(g.attr("data-licval"))}var d="|";var q=":";var m=a.GetLocalString("IDS_SWE_ELEMENT_APPLET_RN")+q+j.val()+d+a.GetLocalString("IDS_SWE_ELEMENT_VIEW_RN")+q+l.val()+d+a.GetLocalString("IDS_SWE_ELEMENT_SCREEN_RN")+q+o.val()+d+a.GetLocalString("IDS_SWE_ELEMENT_RN")+q+r.val();i.val(m);k.dialog("open");i.select();if(window.clipboardData){window.clipboardData.setData("Text",m)}e.preventDefault();e.stopPropagation();return true}return new b()}())};