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
/* 8.1.1.14SIA[23044]PATCHSET8 */
if(typeof(SiebelAppFacade.ParametricSearchRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.ParametricSearchRenderer");define("siebel/parametricsearchrenderer",["siebel/phyrenderer"],function(){SiebelAppFacade.ParametricSearchRenderer=(function(){var c=SiebelJS.Dependency("SiebelApp.Constants");function a(f){SiebelAppFacade.ParametricSearchRenderer.superclass.constructor.call(this,f)}SiebelJS.Extend(a,SiebelAppFacade.PhysicalRenderer);a.prototype.Init=function(){SiebelAppFacade.ParametricSearchRenderer.superclass.Init.call(this);this.AttachPMBinding("PopulateNeeded",function(){if(true===this.GetPM().Get("PopulateNeeded")){this.ShowUI();this.BindEvents();this.BindData()}})};a.prototype.BindEvents=function(){SiebelAppFacade.ParametricSearchRenderer.superclass.BindEvents.call(this);b.call(this)};a.prototype.BindData=function(){SiebelAppFacade.ParametricSearchRenderer.superclass.BindData.call(this);d.call(this)};a.prototype.ShowUI=function(){SiebelAppFacade.ParametricSearchRenderer.superclass.ShowUI.call(this);e.call(this)};function e(){var k=this.GetPM();var q=k.Get("SpanInnerHTML");var l=$("#S_A"+k.Get("GetId"));var o="";var g=SiebelApp.S_App.IsAutoOn();if(q!==""){l.html(q)}var p=$("#S_A"+k.Get("GetId")).find("[class=minibuttonOn]").find("a");var n=p.length;for(var m=0;m<n;m++){var j=p.get(m);var u=/InvokeMethod[^,]+?,(\"|\&quot\;)([^\"\&]+?)(\"|\&quot\;),(\"|\&quot\;)([^\"\&]+?)(\"|\&quot\;)/;var s=j.outerHTML.match(u);if(s){o=" mthbtn=\"'"+s[2]+", "+s[5]+"'\""}if(g==="true"){o+='ot = "Button" rn = "'+s[2]+'" un = "'+s[2]+'"'}$(j).replaceWith(SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({type:c.get("SWE_PST_BUTTON_CTRL"),value:$(j).text(),attrs:o}))}if(g==="true"){var t=$(l).find("[name='DisplayName']");t.attr("ot","JcomboBox");t.attr("rn","SelectProductFamily");t.attr("un","SelectProductFamily");var h=k.ExecuteMethod("GetFieldDefs","Dummy");for(var f in h){if(h.hasOwnProperty(f)){var r=$(l).find("[id=ord_"+f+"]");r.attr("ot","JText");r.attr("rn",f);r.attr("un",f)}}}$(l).closest("div[class*='siebui-catalogview-table']").addClass("siebui-searchview-table").removeClass("siebui-catalogview-table")}function b(){var k=this.GetPM();var l=$("#S_A"+k.Get("GetId"));var g=k.ExecuteMethod("GetFieldDefs","Dummy");for(var f in g){if(g.hasOwnProperty(f)){$(l).find("[id=ord_"+f+"]").unbind()}}var j=$(l).find("[name='DisplayName']");var o=j.length;for(var m=0;m<o;m++){var h=j.get(m);var q=/ChangeSelectTag[^,]+[^;]+;([^"&]+)/;var p=h.outerHTML.match(q);if(p){$(h).removeAttr("onchange").bind("change",{ctx:this},function(i){k.OnControlEvent("EventOnChangeSelectTag",p[1],this.value)})}}var n=$(l).find("[id^=ord]");n.bind("change",{ctx:this},function(i){i.data.ctx.GetPM().OnControlEvent("SearchUpdateFieldValue",i.target.name,i.target.value)});n.bind("keydown",{ctx:this},function(i){if(i.keyCode==13){i.data.ctx.GetPM().OnControlEvent("SearchUpdateFieldValue",i.target.name,i.target.value);k.OnControlEvent("EventInvokeMethod","Search","Dummy")}});$(l).find("button[mthbtn]").each(function(){$(this).unbind();var r=/ mthbtn=([^"]*?)"'([^,]+),\s*([^']+)'"/;var i=this.outerHTML.match(r);if(i){$(this).bind("click",{ctx:this},function(s){k.OnControlEvent("EventInvokeMethod",i[2],i[3])})}})}function d(){this.GetPM().ExecuteMethod("SearchPurgeFieldValues")}return a}());return"SiebelAppFacade.ParametricSearchRenderer"})};