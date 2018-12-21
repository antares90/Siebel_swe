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
if(typeof(SiebelAppFacade.RecommendationRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.RecommendationRenderer");define("siebel/recommendationrenderer",["siebel/phyrenderer"],function(){SiebelAppFacade.RecommendationRenderer=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants");function b(c){SiebelAppFacade.RecommendationRenderer.superclass.constructor.call(this,c)}function b(c){SiebelAppFacade.RecommendationRenderer.superclass.constructor.call(this,c)}SiebelJS.Extend(b,SiebelAppFacade.PhysicalRenderer);b.prototype.ShowUI=function(){var e=this.GetPM();$("#"+this.GetPM().Get("GetPlaceholder")).add({scroll:10,size:0,vertical:true,itemFallbackDimension:200});var f=this.GetPM().Get("GetFullId");var d=("s_"+f+"_div");var c=$("#"+d);c.find(".AppletMenu").remove()};b.prototype.BindData=function(){SiebelAppFacade.RecommendationRenderer.superclass.BindData.call(this);var E=this.GetPM();var L=SiebelApp.S_App.GetService("RTD_NBA Integration Service");var y=E.Get("GetPlaceholder");var p=E.Get("GetBusComp").GetRecordSet();var c=E.Get("GetBusComp").GetName();var o=E.Get("GetBusComp").GetBusObj().GetName();var q=p.length;var s;var G="";var F="";var I="";var A=SiebelApp.S_App.NewPropertySet();var n=SiebelApp.S_App.NewPropertySet();A.SetProperty("BCName",c);A.SetProperty("BOName",o);n=L.InvokeMethod("GetRequiredParams",A);s=n.GetChild(0).GetProperty("Application");n.Reset();A.Reset();if(q>0){for(var z=0;z<q;z++){if(G.search(p[z]["offerCategory"])===-1){if(G.length>0){G+=","}G+="'"+p[z]["offerCategory"]+"'"}}}A.SetProperty("Application",s);A.SetProperty("ChoiceGroups",G);var f=SiebelApp.S_App.NewPropertySet();if(L){n=L.InvokeMethod("GetChoiceGroupEvents",A);var D=n;var l=D.GetChildCount();while(l>0){var v=D.GetChild(0);if(v!==null&&v.GetType()==="ChoiceGroup"){f=v;break}else{l=v.GetChildCount();D=v}}}F="<div class='siebui-dashboard-row'><br>";F+="<table width='100%' cellspacing='0' cellpadding='0' border='0' align='center' datatable='0'>";F+="<tbody>";for(var z=0;z<q;z++){var t=p[z]["likelihoodIntensity"];var e=p[z]["offerImage"];var u=p[z]["name"];var g=p[z]["offerCategory"];var K=p[z]["Id"];I="";I+="<tr align='left' class='AppletButtons'>";I+="<td nowrap='' class='AppletTitle'>"+u+"</td>";if(t){I+="<td nowrap='' class='AppletTitle'>";var m=5;m=Number(t);if(m===5){I+="<span class='stars5-img'></span>"}else{if(m===4){I+="<span class='stars4-img'></span>"}else{if(m===3){I+="<span class='stars3-img'></span>"}else{if(m===2){I+="<span class='stars2-img'></span>"}else{if(m===1){I+="<span class='stars1-img'></span>"}}}}}I+="</td>"}if(e){I+="<td nowrap='' class='AppletTitle'>";I+="<img src='";I+=e;I+="' alt ='"+u+"'>";I+="</td>"}var J=f;var l;if(J!==null){l=J.GetChildCount()}for(var x=0;x<l;x++){var v=J.GetChild(x);if(v!==null&&(v.GetProperty("ChoiceGroupName")===g)){var H=v.GetChild(0);if(H!==null&&(H.GetType()==="ListOfChoiceGroupEvent")){for(var w=0,C=H.GetChildCount();w<C;w++){var h=H.GetChild(w);var d=h.GetProperty("ResponseName");var r=h.GetProperty("RTDChoiceEventName");var B=h.GetProperty("ChoiceGroupEventId");I+="<td nowrap='' class='AppletTitle'>";I+="<span class='siebui-dashboard-cell'><button type='button' name="+K+"|"+B+"|"+r+">";I+=d;I+="</button></span>";I+="</td>"}}}}I+="</tr >";F+=I}F+="</tbody></table>";F+="</div>";$("#"+y).html("");$("#"+y).append(F)};b.prototype.BindEvents=function(){SiebelAppFacade.RecommendationRenderer.superclass.BindEvents.call(this);$("#"+this.GetPM().Get("GetPlaceholder")).delegate("button","click",{ctx:this},c);function c(k){if(k&&k.currentTarget){var h=k.data.ctx.GetPM();var g=k.currentTarget.name;var j=g.split("|");var l=j[0];var e=j[1];var i=j[2];var f=SiebelApp.S_App.NewPropertySet();f.SetProperty("ResponseId",e);f.SetProperty("vId",l);f.SetProperty("ResponseName",i);var d=h.ExecuteMethod("InvokeMethod","TrackResponse",f)}}};return b}());return"SiebelAppFacade.RecommendationRenderer"})};