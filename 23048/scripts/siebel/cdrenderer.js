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
if(typeof(SiebelAppFacade.CDRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.CDRenderer");define("siebel/cdrenderer",["siebel/jqgridrenderer"],function(){SiebelAppFacade.CDRenderer=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants");function b(c){SiebelAppFacade.CDRenderer.superclass.constructor.call(this,c)}SiebelJS.Extend(b,SiebelAppFacade.JQGridRenderer);b.prototype.ShowUI=function(){SiebelAppFacade.CDRenderer.superclass.ShowUI.call(this);var d=this.GetPM().Get("GetId");var f="s_"+d+"_ld";var c=parseInt(this.GetPM().Get("GetControls").CDIcon.GetColIndex());c+=1;var e=$("#"+f).find("th")[c];this.GetGrid().jqGrid("setGridParam",{deepempty:true})};b.prototype.BindEvents=function(){SiebelAppFacade.CDRenderer.superclass.BindEvents.call(this);var c=this.GetColCount();c-=1;var d=SiebelApp.S_App.GetActiveView().GetAppletMap()["TOUI CustDir Applet"];SiebelApp.S_App.GetActiveView().SetActiveAppletOnLoad(d);$("#"+this.GetPM().Get("GetPlaceholder")).bind("keyup",{ctx:this},function(f){if(f.keyCode===27){var e=f.data.ctx.GetPM().Get("GetSelection");e+=1;var g=$("#"+e+"CDIcon");if(g.hasClass("siebui-telco-inline-open")){if(!(g.hasClass("siebui-telco-inline-close"))){g.parent().next().slideUp(50);g.addClass("siebui-telco-inline-close").removeClass("siebui-telco-inline-open")}}}});$("#"+this.GetPM().Get("GetPlaceholder")).on("click",'[id*="CDIcon"]',{ctx:this,TotalAppletColumns:c},function(h){var g=$(this).parent()[0].id,i=h.data.ctx.GetPM().Get("GetFullId"),l="#s_"+h.data.ctx.GetPM().Get("GetId")+"_ld",k=$("#"+i).find('[data-content-id="siebui-custdir-drop-content"]').find("input"),j;g-=1;h.data.ctx.GetPM().OnControlEvent(a.get("PHYEVENT_SELECT_ROW"),g,false,false);k.each(function(){$(this).attr("value",$(this).val())});if($(this).attr("class")===undefined){var f=$("#"+i).find('[data-content-id="siebui-custdir-drop-content"]').html();var e;$(this).addClass("siebui-telco-inline-open");$(this).parent().after('<section class = "siebui-telco-inline"><section class="siebui-telco-inline-applet" colspan='+h.data.TotalAppletColumns+"> "+f+"</section></section>");$(this).parent().next().find(".siebui-custdir-drop-applet input").removeAttr("name");e=$(this).parent().next().find(".siebui-custdir-drop-applet input");if(e.attr("title")==undefined||e.prev("span").attr("title")==undefined){e.each(function(){var m=$(this).prev("span");$(this).attr("title",$(this).val());m.attr("title",m.text())})}}else{if($(this).hasClass("siebui-telco-inline-close")){$(this).addClass("siebui-telco-inline-open").removeClass("siebui-telco-inline-close");$(this).parent().next().slideDown(50)}else{$(this).addClass("siebui-telco-inline-close").removeClass("siebui-telco-inline-open");$(this).parent().next().slideUp(50)}}j=$(l).find("tr").width();$(this).parent().next().css("width",j);h.stopImmediatePropagation()})};b.prototype.BindData=function(e){var d="#s_"+this.GetPM().Get("GetId")+"_ld";if(e){var c=$(d).find("section.siebui-telco-inline");if(c.length!=0){c.remove()}}SiebelAppFacade.CDRenderer.superclass.BindData.call(this,e)};return b}());return"SiebelAppFacade.CDRenderer"})};