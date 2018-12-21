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
if(typeof(SiebelAppFacade.SmartScriptRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.SmartScriptRenderer");if(typeof(SiebelApp)!=="undefined"&&typeof(SiebelApp.S_App)!=="undefined"){if(typeof(SiebelApp.Constants)!=="undefined"){SiebelApp.S_App.RegisterConstructorAgainstKey("SmartScriptPR","SiebelAppFacade.SmartScriptRenderer")}}define("siebel/smartscriptrenderer",[],function(){SiebelAppFacade.SmartScriptRenderer=(function(){var m=SiebelJS.Dependency("SiebelApp.Utils");var i=SiebelJS.Dependency("SiebelApp.Constants");var j=i.get("SWE_PST_BUTTON_CTRL");var d=i.get("SWE_CTRL_MVG");var h=i.get("SWE_CTRL_PICK");var e=i.get("SWE_CTRL_RADIO");var g=i.get("SWE_CTRL_CHECKBOX");var k=i.get("SWE_CTRL_COMBOBOX");var n=i.get("SWE_CTRL_TEXT");var l="175px";function c(o){SiebelAppFacade.SmartScriptRenderer.superclass.constructor.call(this,o);this.AttachPMBinding("FocusOnApplet",a,{scope:this});this.AttachPMBinding("firstQuestionFocus",a,{scope:this});this.PopulateQuestionList=function(q){var p=$("#SSQuestionList");if(p.length){p.html(q)}p.show()};this.DisplayPageLabel=function(q){var p=$("#s_SSPageLabel");if(p.length&&q!==null){p.html(q.m_displayName)}};this.DisplayQuestion=function(p,r){var q=null;if(p.m_mustAnswer>0){$("#"+p.m_uiInputName+"_r").html(r)}$("#"+p.m_uiInputName+"_d").html(p.m_displayName)};this.ExtractHtmlForQuestions=function(t){var s=$("#SSQuestionList > table.AppletBack");var r,q,u;var p;var v;if(s.length===0){SiebelJS.Log("SmartScript missing question list in SSQuestionList");return}for(r=0;r<s.length;r++){q=s[r];u=$(q).find(".ssDisplayName");if(u.length){v=u.attr("id");v=v.substring(0,v.length-2);if(t.hasOwnProperty(v)){p=t[v];if(p.m_enabledHTML===undefined||p.m_enabledHTML===""){p.m_enabledHTML=q.outerHTML}}else{SiebelJS.Log("SmartScript unexpected quest id: "+u.attr("id"))}}}}}SiebelJS.Extend(c,SiebelAppFacade.PhysicalRenderer);c.prototype.ShowUI=function(){var o=this.GetPM();o.GetHtmlForQuestions();o.CcPopulate();SiebelAppFacade.SmartScriptRenderer.superclass.ShowUI.call(this);o.FocusOnFirstQuestion();SiebelApp.S_App.uiStatus.Free()};c.prototype.BindEvents=function(){SiebelAppFacade.SmartScriptRenderer.superclass.BindEvents.call(this)};function f(o,r){if(!o||!o.length){return null}var q=o.length;for(var p=0;p<q;p++){if(o[p].value===r){return o[p]}}return null}c.prototype.SetControlValue=function(r,q){if(!b(r)){return}var p=$("#"+r.GetInputName())[0]||$("[name="+r.GetInputName()+"]")[0];p=$(p);switch(r.GetUIType()){case e:p=$("input[name="+r.GetInputName()+"]");p=f(p,q);if(p){$(p).prop("checked",true)}break;case k:if(q!==undefined&&q!==""){var o=p.find("option:contains('"+q+"')");if(o.length){o.attr("selected","selected")}else{p.append("<option value='"+q+"' selected>"+q+"</option>")}}p.attr("value",q);break;default:SiebelAppFacade.SmartScriptRenderer.superclass.SetControlValue.call(this,r,q);break}};c.prototype.ShowUIControl=function(o){if(!b(o)){return}SiebelAppFacade.SmartScriptRenderer.superclass.ShowUIControl.call(this,o);var p=$("[name="+o.GetInputName()+"]");switch(o.GetUIType()){case n:p.addClass("text");break;case k:p.addClass("comboBox");if(o.GetWidth()==0){p.width(l)}break;default:break}p.height(p.attr("height"));p.width(p.attr("width"))};c.prototype.BindControlEvents=function(o){SiebelAppFacade.SmartScriptRenderer.superclass.BindControlEvents.call(this,o);if(!b(o)){return}var p=$("[name="+o.GetInputName()+"]");switch(o.GetUIType()){case k:break;case n:break;default:break}p=null};function b(o){return(typeof(o.GetInputName)==="function")}function a(){var p=this.GetPM().Get("firstQuestionFocus");var o=(p===null)?null:p.GetInputName();SiebelJS.Log("SmartScript focus on control: "+o);setTimeout(function(){if(p!==null){var q=p.GetUIType();var r;if(q===e){r=$("#"+o+"_d")[0]}else{r=$("#"+o)[0]||$("[name="+o+"]")[0]||$("#"+o+"_d")[0]}$(r).attr("tabindex",0).focus()}else{var r=$(".siebui-applet-btm-buttons  button:enabled")[0];$(r).attr("tabindex",0).focus()}},60)}return c}());return"SiebelAppFacade.SmartScriptRenderer"})};