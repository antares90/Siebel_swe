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
if(typeof(SiebelAppFacade.csimpr)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.csimpr");define("siebel/csimpr",["siebel/jqgridrenderer"],function(){var a=5000;SiebelAppFacade.csimpr=(function(){function e(i){SiebelAppFacade.csimpr.superclass.constructor.call(this,i)}SiebelJS.Extend(e,SiebelAppFacade.JQGridRenderer);e.prototype.Init=function(){SiebelAppFacade.csimpr.superclass.Init.call(this);this.AttachPMBinding("isValidSnum",c,{scope:this});this.AttachPMBinding("isValidDate",f,{scope:this})};function h(i){if(i.currentTarget.id.indexOf("Due_Date")>0){i.data.ctx.GetPM().OnControlEvent("modifyDueDate",i.currentTarget.firstChild.value)}}function f(){var m=this.GetPM(),n=m.Get("isValidDate"),j=m.Get("GetId"),k=$("#s_"+j+"_l"),i=k.find("tr.ui-state-highlight").find("td[id$='Due_Date']"),l=m.Get("invalidDate");if(!n){i.tooltip({content:l,show:{duration:50},tooltipClass:"siebui-telco-custom-tooltip",position:{my:"center bottom-10",at:"center top",using:function(o,p){$(this).css(o);$("<div>").addClass("siebui-telco-custom-tooltip-arrow",p.vertical,p.horizontal).appendTo(this)}}});i.tooltip("open");i.addClass("siebui-telco-invalid-input");setTimeout(function(){i.tooltip("close");i.tooltip("enable")},a);i[0].isttip=true}else{i.removeClass("siebui-telco-invalid-input");i.tooltip({content:i.text(),show:{effect:"blind",duration:8000}});i[0].isttip=false}}function d(i){if(i.currentTarget.id.indexOf("SIM_")>0){i.data.ctx.GetPM().OnControlEvent("modifySimNum",i.currentTarget.lastChild.value)}}function c(){var l=this.GetPM(),m=l.Get("isValidSnum"),j=l.Get("GetId"),k=$("#s_"+j+"_l"),i=k.find("tr.ui-state-highlight").find("td[id$='SIM_']"),n="";switch(m){case"empty":n=l.Get("emptyValError");break;case"lenError":n=l.Get("lengthError");break;case"invalid":n=l.Get("invalidEntryError");break}if(n){i.addClass("siebui-telco-invalid-input");i.tooltip({content:n,tooltipClass:"siebui-telco-custom-tooltip",position:{my:"center bottom-10",at:"center top",using:function(o,p){$(this).css(o);$("<div>").addClass("siebui-telco-custom-tooltip-arrow",p.vertical,p.horizontal).appendTo(this)}},});i.tooltip("open");setTimeout(function(){i.tooltip("close");i.tooltip("enable")},a);i[0].isttip=true}else{i.removeClass("siebui-telco-invalid-input");i.tooltip({content:i.text(),show:{effect:"blind",duration:100}});i[0].isttip=false}}function b(k,j){var i=k;i.tooltip({position:{my:"center bottom-10",at:"center top",using:function(l,m){$(this).css(l);$("<div>").addClass("siebui-telco-custom-tooltip-arrow",m.vertical,m.horizontal).appendTo(this)}},content:j,tooltipClass:"siebui-telco-custom-tooltip"});i[0].isttip=true}function g(){var i=$(this);if(i[0].isttip){i.tooltip("disable")}}e.prototype.BindData=function(){this.ClearData();SiebelAppFacade.csimpr.superclass.BindData.call(this);var l=this.GetPM(),j=l.Get("GetId"),k=$("#S_A"+j),n=k.find("td[id$='SIM_']");for(var m=0;m<n.length;m++){var q=$(n[m]),p=q.text(),r=SiebelApp.TelcoUtils.ValidateSimNumber(p),o="";switch(r){case"empty":o="emptyValError";break;case"lenError":o="lengthError";break;case"invalid":o="invalidEntryError";break}if(o){q.addClass("siebui-telco-invalid-input");b(q,this.GetPM().Get(o))}}};e.prototype.BindEvents=function(){SiebelAppFacade.csimpr.superclass.BindEvents.call(this);this.ClearData();var j=this.GetPM(),k=j.Get("GetId"),i=$("#S_A"+k);i.on("blur","td[id$='Due_Date']",{ctx:this},h);i.on("blur","td[id$='SIM_']",{ctx:this},d);i.on("focus","td[id$='Due_Date'] , td[id$='SIM_']",{ctx:this},g)};return e}());return"SiebelAppFacade.csimpr"})};