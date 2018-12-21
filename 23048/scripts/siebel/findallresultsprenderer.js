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
if(typeof(SiebelAppFacade.FindAllResultsPRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.FindAllResultsPRenderer");define("siebel/findallresultsprenderer",["siebel/phyrenderer"],function(){SiebelAppFacade.FindAllResultsPRenderer=(function(){var b=SiebelJS.Dependency("SiebelApp.Utils");var d=SiebelJS.Dependency("SiebelApp.Constants");var a=SiebelApp.S_App.LocaleObject;function e(g){SiebelAppFacade.FindAllResultsPRenderer.superclass.constructor.call(this,g);var f=g;this.GetPM=function(){return f}}SiebelJS.Extend(e,SiebelAppFacade.PhysicalRenderer);function c(f){var B=0;var A,z;var K,J,L,s,y,q,g,n,x,w,D;var I="";var v="#";var m=[];var l=[];var t='<span class="siebui-search-bigheadingtext-dialog">'+a.GetLocalString("IDS_SEARCH_OUI_SRCH_TITLE_TEXT")+"</span>";var p='<span class="siebui-search-bigheadingtext-dialog">'+a.GetLocalString("IDS_SWE_CKEDITOR_SOURCE")+"</span>";var u=f.Get("GetRecordSet");var E=u.length;if(E===0){var G=SiebelAppFacade.ComponentMgr.FindComponent({id:d.get("SWE_PST_SEARCH_NAME")});if(!G){LogMsg(1,"Failed at Find All Result View, Search component unavailable!");return}if(G.Get("EnableNewRecordFeature")==="TRUE"){var h='<button type = "button" id= "find-new-button" class="refineappletButton" title="'+a.GetLocalString("IDS_NEW_STRING")+'">'+a.GetLocalString("IDS_NEW_STRING")+"</button>";var H="<div id='div-find-results' class=siebui-applet-content><table title="+a.GetLocalString("RTCFindTxt")+a.GetLocalString("IDS_SEARCH_OUI_SRCH_RESULTS_TEXT")+">"+h+"<tbody><tr></tr>";H+="</tbody></table></div>";$("#findresulttable").append(H).trigger("create");this.BindEvents("newrecord")}}else{var H="<div id='div-find-results' class=siebui-applet-content><table title="+a.GetLocalString("RTCFindTxt")+a.GetLocalString("IDS_SEARCH_OUI_SRCH_RESULTS_TEXT")+"><tbody><tr><th class=siebui-search-table-h1>"+t+"</th><th class=siebui-search-table-h2>"+p+"</th></tr>";var r="<tr class=siebui-row-first siebui-row-odd>";var F="<tr class=siebui-row-odd>";var C="<tr class=siebui-row-even>";for(B=0;B<E;B++){K=u[B]["URL"];m=b.TokenizeString(K,v);J=b.Trim(m[0].substring(5));L=b.Trim(m[1].substring(7));s=b.Trim(m[2].substring(6));s=URLEncode(s);y=b.Trim(m[3].substring(5));q=b.Trim(m[4].substring(8));n=u[B]["Result Field With Method"];l=b.TokenizeString(n,";");if(l.length%2===0){D=l.length/2}else{D=(l.length-1)/2}x="";w="";for(A=0;A<D;A++){x=x+l[A]+" ; "}for(z=D;z<l.length;z++){w=w+l[z]+" ; "}if(y==="0"){I="SWECmd=GotoView&SWEView="+J+"&SWEPostnApplet="+L+"&SWEPostnRowId="+s+"&SWEKeepContext=0"}else{I="SWECmd=GotoView&SWEView="+J+"&SWEApplet0="+L+"&SWERowId0="+s}g='<a href="javascript:void(0)"id="URL'+B+'"value ="'+I+'">'+u[B]["Result Field"]+"</a>";var o="<td class=siebui-search-col1><p><span class=siebui-search-highlight>"+g+"</span></p><p><span class=siebui-search-subtext>"+x+"</span></p><p><span class=siebui-search-subtext>"+w+"</span></p></td><td class=siebui-search-col2>"+q+"</td></tr>";if(B===0){H+=r+o}else{if(B%2===0){H+=C+o}else{H+=F+o}}}H+="</tbody></table></div>";$("#findresulttable").append(H).trigger("create")}}e.prototype.ShowUI=function(){var f=this.GetPM();SiebelAppFacade.FindAllResultsPRenderer.superclass.ShowUI.call(this);c.call(this,f)};e.prototype.BindEvents=function(j){var g=this.GetPM();switch(j){case"newrecord":$("#find-new-button").unbind("click");$("#find-new-button").bind("click",{ctx:this},function(l){var m=SiebelAppFacade.ComponentMgr.FindComponent({id:d.get("SWE_PST_SEARCH_NAME")});if(!m){LogMsg(1,"Failed at invoking Search Pane, Search component unavailable! ");return}var i=CCFMiscUtil_CreatePropSet();m.ExecuteMethod("ExposedCurrentFind",i)});break;case"drilldown":var f=0;for(f=0;f<10;f++){var h="URL"+f;var k;$("#"+h+"").bind("click",{ctx:this},function(i){k=i.currentTarget.getAttribute("value");SiebelApp.S_App.GotoView("","",k,"")})}break;default:SiebelAppFacade.FindAllResultsPRenderer.superclass.BindEvents.call(this)}};e.prototype.BindData=function(g){var f=this.GetPM();SiebelAppFacade.FindAllResultsPRenderer.superclass.BindData.call(this);$("#div-find-results").remove();c.call(this,f);this.BindEvents("drilldown")};return e}());return"SiebelAppFacade.FindAllResultsPRenderer"})};