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
if(typeof(SiebelAppFacade.JSPFlowChartPModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.JSPFlowChartPModel");define("siebel/jspflowchartpmodel",["siebel/networkpmodel"],function(){SiebelAppFacade.JSPFlowChartPModel=(function(){var g=0,d=2;function e(){SiebelAppFacade.JSPFlowChartPModel.superclass.constructor.apply(this,arguments)}SiebelJS.Extend(e,SiebelAppFacade.NetworkPM);e.prototype.Init=function(){SiebelAppFacade.JSPFlowChartPModel.superclass.Init.apply(this,arguments);this.AddProperty("fullyLoaded",false);this.AddProperty("isSmartScript",false);this.AddProperty("isHelp",false);this.AddProperty("waitingforConnections",[]);this.AddMethod("EventMenuClickHandler",function(h,i){a(this,h,i)},{override:true});this.AddMethod("NewNodeHandler",function(l,i,k,h,j){c(this,l,i,k,h,j)},{override:true});this.AddMethod("NodeMoved",b,{override:true});this.AddMethod("GetColorClass",function(j){var i=this.Get("isSmartScript");var h=this.Get("isHelp");if(i&&j=="105"){this.SetProperty("colorclass","smart_page")}else{if(i&&j=="110"){this.SetProperty("colorclass","smart_question")}else{if(h&&j=="100"){this.SetProperty("colorclass","ihelp_start")}else{if(h&&j=="103"){this.SetProperty("colorclass","ihelp_step")}else{if(j=="100"){this.SetProperty("colorclass","loy_start")}else{if(j=="110"){this.SetProperty("colorclass","loy_end")}}}}}}},{override:true});f(this)};e.prototype.Setup=function(m){SiebelAppFacade.JSPFlowChartPModel.superclass.Setup.apply(this,arguments);var j=m.GetChildByType("apm");this.SetProperty("i110",j.GetProperty("i110"));this.SetProperty("i0",j.GetProperty("i0"));this.SetProperty("i105",j.GetProperty("i105"));var l=j.GetProperty("OrgChartType");this.SetProperty("chartTypeProp",l);if(l==="AccountChart"){this.SetProperty("DisableContextMenu",true);var p=this.Get("connectionStyle");p.connectorStyle=["Flowchart"];this.SetProperty("connectionStyle",p);var o=this.Get("Handle");o.nodeDrag=false;this.SetProperty("Handle",o)}var n=CCFMiscUtil_CreatePropSet();n.SetProperty("hasPalette",true);this.ExecuteMethod("SetCanvasProperties",n);var k=j.GetProperty("IsQandAnsApplet");var q=j.GetProperty("IsSmallApplet");if(k=="T"||k=="t"){this.SetProperty("isSmartScript",true);this.ExecuteMethod("SetLengths",72,48,96,48);this.SetProperty("HandleCR",false)}if(q=="T"||q=="t"){this.SetProperty("isHelp",true);this.ExecuteMethod("SetLengths",72,48,96,48);var h=this.Get("CanvasProperties");h.SetProperty("designerHeight",true);this.SetProperty("CanvasProperties",h);var i=this.Get("colorMap");i["100"]="siebui-fcd-c3";this.SetProperty("colorMap",i)}};function a(i,j,k){if(k&&j){var h=CCFMiscUtil_CreatePropSet();h.SetProperty("sel",j);h.SetProperty("action",k);i.ExecuteMethod("NotifyServer",k,h)}}function c(k,n,j,p,i,o){var h=CCFMiscUtil_CreatePropSet();var l=k.Get("ActionMap");h.SetProperty("shpId",n);h.SetProperty("frId","");var m=typeof k.Get("SelectedId")==="undefined"?"":k.Get("SelectedId");h.SetProperty("rect",j+" "+p+" "+i+" "+o);h.SetProperty("sel",m);k.ExecuteMethod("NotifyServer",l.NodeDropped,h)}function b(k,l,m){var j=CCFMiscUtil_CreatePropSet();j.SetProperty("pt",k+" "+l);j.SetProperty("ptPos","1");j.SetProperty("sel",m);var i=this.Get("ActionMap");var h=this.Get("chartTypeProp");if(h==="AccountChart"){j.SetProperty("ctrl","0")}this.ExecuteMethod("NotifyServer",i.NodeMoved,j)}function f(h){h.ExecuteMethod("SetActionMap","NodeDropped","newGfc")}return e}());return SiebelAppFacade.JSPFlowChartPModel})};