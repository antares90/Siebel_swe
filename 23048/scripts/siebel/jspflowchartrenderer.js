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
if(typeof(SiebelAppFacade.JSPFlowChartRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.JSPFlowChartRenderer");define("siebel/jspflowchartrenderer",["siebel/networkrenderer"],function(){SiebelAppFacade.JSPFlowChartRenderer=(function(){var b=false,j=false,h=false;function g(){SiebelAppFacade.JSPFlowChartRenderer.superclass.constructor.apply(this,arguments)}SiebelJS.Extend(g,SiebelAppFacade.NetworkRenderer);g.prototype.Init=function(){SiebelAppFacade.JSPFlowChartRenderer.superclass.Init.apply(this,arguments);this.AttachPMBinding("DrawPalette",function(){var k=this.GetPM();var l=k.Get("PaletteItems");e.call(this,l,k)});this.AttachPMBinding("OnDropOverNodeEventHandler",function(){var l=this.GetPM();var k=l.Get("Event");var m=l.Get("ui");f.call(this,k,m,l)});this.AttachPMBinding("OnDropCanvasEventHandler",function(){var l=this.GetPM();var k=l.Get("Event");var m=l.Get("ui");c.call(this,k,m,l)});this.AttachPMBinding("AddContextmenuToNode",function(){var l=this.GetPM();var k=l.Get("taskid");var m=l.Get("menuitemslist");d.call(this,k,m,l)})};g.prototype.BindEvents=function(){SiebelAppFacade.JSPFlowChartRenderer.superclass.BindEvents.apply(this,arguments);var k=this.GetPM();$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-ball").draggable({containment:"parent",stop:a});$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-designer").droppable({drop:function(l,m){$(m.helper).data("pm").ExecuteMethod("OnDropCanvasEventHandler",l,m)}})};g.prototype.ShowUI=function(){SiebelAppFacade.JSPFlowChartRenderer.superclass.ShowUI.apply(this,arguments);var k=this.GetPM();$(".siebui-funnel-chart").hide();$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-ball").data("pm",k);if($(".siebui-rtl").length>0){$(".siebui-fcd-slider").addClass("siebui-fcd-slider-rtl")}};function e(m,o){var k="";var q=[],p=[];var s=o.Get("ImagesCssClass");if(m.length>0){k="<div class='siebui-fcd-tasks' id='pal1'><div id='siebui-fcd-paletteHeader' class='siebui-fcd-objects'>OBJECTS</div>"}for(i=0;i<m.length;i++){var u=m[i];var n=u.imageText;var r=u.id;if(r==="0"||r==="2"||r===2||r===0){q.push(m[i]);continue}if(n.indexOf("Tree")!==-1){n="SegmentTree"}if(n.indexOf("Tree")!==-1||n.indexOf("Segment")!==-1||n.indexOf("List")!==-1||n.indexOf("Lead")!==-1){p.push(m[i]);continue}var l=s[u.imagePath];var t="<div  class='siebui-fcd-task draggable "+u.imageText+"Task' id='"+u.imageText+"' name='"+u.id+"'>";t+="<i class='"+l+"'/><span class='siebui-fcd-spanText'>"+u.imageText+"</span>";k+=t+"</div>"}if(p.length>0){k+="<div id='siebui-fcd-paletteHeader' class='siebui-fcd-targetPalette'>TARGET</div>"}while(p.length>0){var u=p.pop();var n=u.imageText;var r=u.id;if(r==="0"||r==="2"||r===2||r===0){continue}if(n.indexOf("Tree")!==-1){n="SegmentTree"}var l=s[u.imagePath];var t="<div  class='siebui-fcd-task draggable "+u.imageText+"Task' id='"+u.imageText+"' name='"+u.id+"'>";t+="<i class='"+l+"'/><span class='siebui-fcd-spanText'>"+u.imageText+"</span>";k+=t+"</div>"}while(q.length>0){var u=q.pop();var r=u.id;if(r==2){k+="<div id='siebui-fcd-paletteHeader' class='siebui-fcd-connectors'>CONNECTOR</div>";k+='<div  class=\'siebui-fcd-task\'><span class=\'siebui-fcd-spanText\'>Constrained</span><div id="constrained" class="siebui-fcd-slider siebui-fcd-notConstrainedSlider"><div id="ball"  class="siebui-fcd-ball siebui-fcd-bacll-notConstrained"><div class="siebui-fcd-constrained-text">OFF</div></div></div></div>';o.SetProperty("isRefreshNeededonPrivFields",true);continue}}o.SetProperty("PaletteDrawn",k+"</div>")}function f(m,n,l){if(!$(n.draggable).hasClass("BranchTask")){return}if($(n.draggable).hasClass("design")){return}var o=$(m.target).attr("id");var k=$("#_sweview #s_"+l.Get("GetFullId")+"_div").find("#"+o).css("left");var p=$("#_sweview #s_"+l.Get("GetFullId")+"_div").find("#"+o).css("top");k=k.replace("px","");p=p.replace("px","");k=k*1+15;p=p*1+15;l.OnControlEvent("SendConnectionToServer","0",k,p,(k*1+72),p,o,"")}function c(m,n,l){if($(n.draggable).hasClass("siebui-fcd-design")){return}var k=Math.round((n.offset.left-$("#_sweview #s_"+l.Get("GetFullId")+"_div").find(".siebui-fcd-designer").offset().left));var o=Math.round($("#_sweview #s_"+l.Get("GetFullId")+"_div").find(".siebui-fcd-designer").scrollTop()+$(n.draggable).offset().top-Math.abs($("#_sweview #s_"+l.Get("GetFullId")+"_div").find(".siebui-fcd-designer").offset().top));xlength=l.Get("xlen");ylength=l.Get("Ylen");l.OnControlEvent("CreateNewNode",$(n.draggable).attr("name"),k,o,k+xlength,o+ylength)}function d(m,t,n){var r=this;var k=$("#_sweview #s_"+n.Get("GetFullId")+"_div").find("#"+m);var p=m;var l=[];if(typeof t!="undefined"&&t.length>0){var s=t.length;for(var o=0;o<s;o++){var q=t[o];l.push({label:q.text,disabled:q.isEnabled===true?false:true,id:m,name:q.serverCmd,pm:n,action:function(){this.pm.ExecuteMethod("OnContextmenuClick",this)}})}}else{l.push({label:"Delete",disabled:true,id:m,name:"Delete",pm:n,action:function(){this.pm.ExecuteMethod("OnContextmenuClick",this)}});if(n.Get("isSmartScript")){l.push({label:"Pick Question/Answer",disabled:true,id:m,name:"Pick",pm:n,action:function(){this.pm.OnControlEvent("NodeDoubleClicked",this.id)}})}}k.contextPopup({id:p,title:"Actions",items:l})}function a(l,m){var k=$(m.helper).data("pm");var n=25;if($(".siebui-fcd-slider-rtl ").length>0){n=0}if((100*m.position.left/$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-slider").width()<=n)){$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-slider").addClass("siebui-fcd-constrainedSlider");$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-slider").removeClass("siebui-fcd-notConstrainedSlider");$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-constrained-text").text("ON");$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-ball").removeClass("siebui-fcd-bacll-notConstrained");$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-ball").addClass("siebui-fcd-bacll-Constrained");k.Get("jsplumbInstance").selectEndpoints().setType("constrained")}else{$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-slider").removeClass("siebui-fcd-constrainedSlider");$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-slider").addClass("siebui-fcd-notConstrainedSlider");$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-constrained-text").text("OFF");$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-ball").removeClass("siebui-fcd-bacll-Constrained");$("#_sweview #s_"+k.Get("GetFullId")+"_div").find(".siebui-fcd-ball").addClass("siebui-fcd-bacll-notConstrained");k.Get("jsplumbInstance").selectEndpoints().setType("basic")}}return g}());return SiebelAppFacade.JSPFlowChartRenderer})};