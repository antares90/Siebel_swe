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
if(typeof(SiebelAppFacade.DynaControlGridPR)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.DynaControlGridPR");define("siebel/dynacontrolgridpr",["siebel/jqgridrenderer","siebel/htmltmplmgr"],function(){SiebelAppFacade.DynaControlGridPR=(function(){var b=SiebelJS.Dependency("SiebelAppFacade.HTMLTemplateManager");var a=SiebelJS.Dependency("SiebelApp.Constants");function c(d){SiebelAppFacade.DynaControlGridPR.superclass.constructor.apply(this,arguments)}SiebelJS.Extend(c,SiebelAppFacade.JQGridRenderer);c.prototype.Init=function(){SiebelAppFacade.DynaControlGridPR.superclass.Init.call(this)};c.prototype.ShowUI=function(){var e=this.GetPM();if(SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM().Get("ViewPRLoaded")){var p=e.Get("GetControls"),g=e.Get("GetFullId"),m=e.Get("GetPlaceholder"),h=e.Get("AppletTemplateId"),n=e.Get("AppletTitleId"),d=e.Get(a.get("SWE_VIS_MODE_DEFAULT")),l=false;$('[id="'+h+'"][data-mode]').not('[data-mode ="'+d+'"]').remove();var k=$('[id="'+h+'"][data-mode ="'+d+'"]').length;if(k){$('[id="'+h+'"][data-mode ="'+d+'"]').eq(0).html('<div id="'+g+'"><div id="s_'+g+'_div"></div></div>');if(k>1){SiebelJS.Log("Html template has multiple elements with id '"+h+"' and data-mode '"+d+"'")}}else{if($("#"+h)){$("#"+h).attr("data-mode",d).html('<div id="'+g+'"><div id="s_'+g+'_div"></div></div>')}else{SiebelJS.Log("Ensure that the HTML template has an element with id '"+h+"'")}}$('[id="'+h+'"]').not('[data-mode ="'+d+'"]').remove();var o=$("#s_"+g+"_div"),j;o.append('<div class="siebui-applet-header"><div class="siebui-applet-title"></div></div>');for(var f in p){if(p.hasOwnProperty(f)){var i=p[f];if(n&&i.GetName()==n){o.find(".siebui-applet-title").attr("id",n).attr("name",n)}if(i.GetUIType()==="Button"){if(!l){o.children(".siebui-applet-header").append('<div class="siebui-btn-grp-applet" id="buttonDiv"></div>');l=true;j=o.find("#buttonDiv")}j.append('<div class="siebui-vismode-buttonbar"></div>');j.append('<span id="'+i.GetName()+'sp" name="'+i.GetName()+'"></span>')}else{if(i.GetUIType()==="Label"){$("#"+i.GetName()).addClass("siebui-show-control");$("#"+i.GetName()).text(i.GetDisplayName())}}}}o.append('<table id="'+m+'" valign="top" width="100%" datatable="1"></table>');SiebelAppFacade.DynaControlGridPR.superclass.ShowUI.call(this)}};c.prototype.BindData=function(d){if(SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM().Get("ViewPRLoaded")){SiebelAppFacade.DynaControlGridPR.superclass.BindData.call(this,d)}};c.prototype.BindEvents=function(){if(SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM().Get("ViewPRLoaded")){SiebelAppFacade.DynaControlGridPR.superclass.BindEvents.call(this)}};c.prototype.ShowSelection=function(){var f=this.GetPM();var d=f.Get("GetRecordSet").length;var g=f.Get("GetRowsSelectedArray");for(var e=0;e<d&&e<g.length;e++){if(g[e]){f.SetSelection(e)}}SiebelAppFacade.DynaControlGridPR.superclass.ShowSelection.call(this)};return c}());return SiebelAppFacade.DynaControlGridPR})};