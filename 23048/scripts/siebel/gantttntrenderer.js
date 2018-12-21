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
if(typeof(SiebelAppFacade.GanttTNTRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.GanttTNTRenderer");define("siebel/gantttntrenderer",["siebel/ganttrenderer"],function(){SiebelAppFacade.GanttTNTRenderer=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants"),c=a.get("SWE_GANTT_ACTIVITY_LABEL");function b(){SiebelAppFacade.GanttTNTRenderer.superclass.constructor.apply(this,arguments);var f=this.GetPM()}SiebelJS.Extend(b,SiebelAppFacade.GanttRenderer);b.prototype.ShowUI=function(){e.call(this);SiebelAppFacade.GanttTNTRenderer.superclass.ShowUI.call(this)};b.prototype.BindData=function(){SiebelAppFacade.GanttTNTRenderer.superclass.BindData.call(this);var f=this.GetPM();if(f.Get("Redraw Legends")==="Y"){f.SetProperty("Redraw Legends","");this.getGanttLegendBar().createLegends(f.ExecuteMethod("prepareLegendMap"),f.Get("ShowLegend"))}};b.prototype.BindEvents=function(){SiebelAppFacade.GanttTNTRenderer.superclass.BindEvents.call(this);var i=this,g,q,v,m,o=i.GetPM(),n,x,f,k,w,t,y,l=0,p,j,r,u,h=$("#s_"+o.Get("GetFullId")+"_div"),s=SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper");n=o.Get("GetControls");x=n.TurnTime;if(x){f=this.GetUIWrapper(x);p=f.GetEl();if(s&&p.length){s.Manage(p,"click",{ctx:this},function(z){o.SetProperty("TurnTime",f.GetValue())})}}k=n.ConfigSpacePattern;if(k){w=this.GetUIWrapper(k);j=w.GetEl();if(s&&j.length){s.Manage(j,"click",{ctx:this},function(z){o.SetProperty("ConfigSpacePattern",w.GetValue())})}}g=n["Display Toggle"];if(g){q=this.GetUIWrapper(g);r=q.GetEl();r.unbind("autocompleteclose")}v=n["Color Display Toggle"];if(v){m=this.GetUIWrapper(v);u=m.GetEl();u.unbind("autocompleteclose");if(s&&u.length){s.Manage(u,"blur",{ctx:this,CW:m},d)}}h=null;n=null};b.prototype.GetDrilldownPropSet=function(j,i,l,g){var k=SiebelAppFacade.GanttTNTRenderer.superclass.GetDrilldownPropSet.call(this,j,i,l,g);if(($(j).attr("data-drilldown-type"))==="UGrid"){var f=$(j).closest("div.siebui-taskBox").attr("taskid");var h=$(j).closest("div.siebui-taskEditUtility").attr("taskid");var n=this.GetPM().ExecuteMethod("getEvent",h,f);var m=n?n.FI:0;if(m){k.SetProperty("Function Id",m)}}return k};function e(){var i=this.GetPM(),o=$(window).height(),n=$("#_sweappmenu").outerHeight(true),f=$(".siebui-button-toolbar").outerHeight(true),h=$("#_swethreadbar").outerHeight(true),l=$("#_swescrnbar").outerHeight(true),g=$("#s_"+i.Get("GetFullId")+"_div").find(".AppletButtons").outerHeight(true),k=$("#s_"+i.Get("GetFullId")+"_div").find("#siebui-formControls").outerHeight(true),j=10,m=o-(n+f+h+l+g+k+j);this.setGanttCtrlHeight(m)}function d(f){thatPM=f.data.ctx.GetPM();LICCode=thatPM.Get("LIC Field")[f.data.CW.GetValue()];thatPM.SetProperty("Color Display By",LICCode);thatPM.SetProperty("Redraw Legends","Y")}return b}());return"SiebelAppFacade.GanttTNTRenderer"})};