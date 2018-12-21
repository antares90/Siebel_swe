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
if(typeof(SiebelAppFacade.OrgChartRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.OrgChartRenderer");define("siebel/orgchartrenderer",["siebel/networkrenderer"],function(){SiebelAppFacade.OrgChartRenderer=(function(){var f={},g=false,c=false,d=false;function a(){SiebelAppFacade.OrgChartRenderer.superclass.constructor.apply(this,arguments)}SiebelJS.Extend(a,SiebelAppFacade.NetworkRenderer);a.prototype.Init=function(){SiebelAppFacade.OrgChartRenderer.superclass.Init.apply(this,arguments);this.AttachPMBinding("AddContextmenuToNode",function(){var i=this.GetPM();var h=i.Get("taskid");var j=i.Get("menuitemslist");e.call(this,h,j,i)});this.AttachPMBinding("AddNewNode",function(){var i=this.GetPM();var j=i.Get("nodeObj");var h=i.Get("allowDragging");b.call(this,j,h,i)})};function b(o,x,t){var z=t.Get("contextMenuObj");var n=this;var p;var s=t.Get("Handle");var q=t.Get("BoxSize");var m=parseInt(q.split(" ")[0])+10;var l=q.split(" ")[1];if(t.Get("saveActivated")==true){return}var h=t.Get("AcceptBackgroundColour");if($("#_sweview #s_"+t.Get("GetFullId")+"_div").find("#"+o.taskid).length>0){return}if(typeof o.shapeId==="undefined"){o.shapeId=""}if(typeof o.bgColor!="undefined"){var i=parseInt(o.bgColor,10);if(i){p="rgb("+(i&255)+","+((i&65280)>>8)+","+((i&16711680)>>16)+")"}}var y=o.x*1.5;var u=o.y*1.5;var j="<div  class='siebui-fcd-task ' id='"+o.taskid+"' name='"+o.shapeId+"' title='"+o.tooltip+"' style='left:"+y+"px;top:"+u+"px;position:absolute;z-index:1;'>";var w=o.imageText.indexOf("<0 0 255>");var r=o.imageText.length;o.imageText=o.imageText.substr(0,w)+o.imageText.substr(w+9,r);j+="<span class='siebui-fcd-org-span-text'>"+o.imageText+"</div>";$("#_sweview #s_"+t.Get("GetFullId")+"_div").find(".siebui-fcd-designer").append(j);if(!h){$("#_sweview #s_"+t.Get("GetFullId")+"_div").find("#"+o.taskid).css("background",p)}if(x){$("#_sweview #s_"+t.Get("GetFullId")+"_div").find("#"+o.taskid).data("pm",t);t.Get("jsplumbInstance").draggable(o.taskid,{containment:".siebui-fcd-designer",stop:function(A,B){$(B.helper).data("pm").ExecuteMethod("OnNodeDragStop",A,B)}})}var k=$("#_sweview #s_"+t.Get("GetFullId")+"_div").find("#"+o.taskid);k.addClass("siebui-fcd-design").removeClass("siebui-fcd-task").addClass("siebui-fcd-org-task-designer");$(".siebui-fcd-org-task-designer").width(m);$(".siebui-fcd-org-task-designer").height(l);var v=t.Get("localPos");v[o.taskid]={};v[o.taskid].left=o.x;v[o.taskid].top=o.y;v[o.taskid].name=o.shapeId;t.SetProperty("localPos",v);t.ExecuteMethod("AddContextmenuToNode",o.taskid,z[o.shapeId]);this.GetPM().Get("jsplumbInstance").getType("LeftMiddle").paintStyle={fillStyle:"#0000ff",outlineColor:"black"};this.GetPM().Get("jsplumbInstance").getType("RightMiddle").paintStyle={fillStyle:"#0000ff",outlineColor:"black"};this.GetPM().Get("jsplumbInstance").getType("TopCenter").paintStyle={fillStyle:"white",outlineColor:"black"};this.GetPM().Get("jsplumbInstance").getType("BottomCenter").paintStyle={fillStyle:"white",outlineColor:"black"};this.GetPM().Get("jsplumbInstance").getType("Direct").paintStyle={fillStyle:"white",outlineColor:"black"}}a.prototype.BindEvents=function(){SiebelAppFacade.OrgChartRenderer.superclass.BindEvents.apply(this,arguments);$("#_sweview #s_"+this.GetPM().Get("GetFullId")+"_div").on("dblclick",".siebui-fcd-org-task-designer",{ctx:this},function(h){h.data.ctx.GetPM().ExecuteMethod("OnNodeDblClick",h)})};a.prototype.ShowUI=function(){SiebelAppFacade.OrgChartRenderer.superclass.ShowUI.apply(this,arguments);$(".siebui-funnel-chart").hide();$("#siebui-fcd-designer").addClass("siebui-org-chart")};function e(n,m,l){var h=l.Get("ConnectionsList");var k=$("#"+n);var i=n;var j=[];if(typeof h[n]!="undefined"){j.push({label:"Delete",disabled:false,id:n,toId:h[n].toId,action:function(){l.ExecuteMethod("OnContextmenuClick",this)}});k.contextPopup({id:i,title:"Actions",items:j})}}return a}());return SiebelAppFacade.OrgChartRenderer})};