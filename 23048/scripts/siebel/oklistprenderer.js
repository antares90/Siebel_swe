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
if(typeof(SiebelAppFacade.OKListPRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.OKListPRenderer");define("siebel/oklistprenderer",["siebel/phyrenderer","http://yui.yahooapis.com/3.14.0/build/yui/yui-min.js"],function(){SiebelAppFacade.OKListPRenderer=(function(){var c=SiebelJS.Dependency("SiebelApp.Constants");function a(d){SiebelAppFacade.OKListPRenderer.superclass.constructor.call(this,d);this._DestoryObjArray=[];this._HeadNode;this._Panel}SiebelJS.Extend(a,SiebelAppFacade.PhysicalRenderer);a.prototype.ShowUI=function(){var h=this;var g=this.GetPM().Get("GetRawRecordSet");if(g.length==0){return}var e=g[0]["Knowledge Management Url"];var d=e+"/apps/infocenter/resources/js/OKWidgets/";var f=$.data($("body")[0],"yuiObj");if(f){b.call(h,f)}else{YUI({modules:{"oracle-knowledge/base":{fullpath:d+"okBaseWidget.js"},"oracle-knowledge/answer-view":{fullpath:d+"answerViewWidget.js"},"oracle-knowledge/ok-utility":{fullpath:d+"okUtility.js"},"oracle-knowledge/answer-list":{fullpath:d+"answerListWidget.js"},okLocale:{fullpath:d+"localeUtility.js"},"oracle-knowledge/search-widget":{fullpath:d+"searchWidget.js"},"oracle-knowledge/result-widget":{fullpath:d+"resultWidget.js"},"oracle-knowledge/facet-tree":{fullpath:d+"facetsWidget.js"}},combine:false,filter:"RAW"}).use("node-event-simulate","panel","transition","oracle-knowledge/base","oracle-knowledge/ok-utility","okLocale","oracle-knowledge/answer-view","oracle-knowledge/answer-list","oracle-knowledge/search-widget","oracle-knowledge/result-widget","oracle-knowledge/facet-tree",function(i){if($.data($("body")[0],"yuiObj")){i.destroy();i=null;b.call(h,$.data($("body")[0],"yuiObj"))}else{$.data($("body")[0],"yuiObj",i);b.call(h,i)}})}SiebelAppFacade.OKListPRenderer.superclass.ShowUI.call(this)};function b(k){var n=this.GetPM().Get("GetFullId");var z="#"+n+"_header",C="#"+n+"_overlay",t="#"+n+"_listDetailContainer",B="#"+n+" #ok-list-container",D="#"+n+" #ok-list";var i='<div id ="'+n+'_header"></div>';$("div:first").before(i);$(z).addClass("yui3-skin-sam");var v='<div id ="'+n+'_overlay"></div>';$(z).append(v);var h='<div id ="'+n+'_listDetailContainer"></div>';$(C).append(h);var s=this.GetPM().Get("GetRawRecordSet");if(s.length==0){return}var x=s[0]["Knowledge Management Url"];var A=x+"/apps/infocenter/resources/js/OKWidgets/";var f=x+"/apps/infocenter/resources/css/oracleKnowledgeWidget";var m=s[0]["Type"];var H=s[0]["Channel Name"];var y=s[0]["Language"];var d=s[0]["Num Records"];var g=s[0]["Sort By"];if(this.GetPM()!==null){var o=k.one(z),r=k.one(C),l=k.one(t),p=k.one(B),q=k.one(D);var E={};E.baseURL=x;E.widgetDir=A;E.css=f;E.setLocale=y;E.transport="jsonp";E.type="type";try{var F=new k.OracleKnowledge.OKUtility(E);var e=new k.Panel({srcNode:r,width:"50%",height:"90%",zIndex:10,modal:true,visible:false,close:true}).render();e.set("align",{node:o,points:[k.WidgetPositionAlign.TC,k.WidgetPositionAlign.BC]});var u=new k.OracleKnowledge.AnswerView({utility:F}).render(l);u.on("show",function(I){e.show();u.get("closeButton").hide()});var w={};w.answerViewWidget=u;w.utility=F;w.type=m;w.channelReferenceKey=H;w.pageSize=d;w.sortBy=g;var j=new k.OracleKnowledge.AnswerList(w).render(q);this._Panel=e;this._HeadNode=o;this._DestoryObjArray.push(j);this._DestoryObjArray.push(u);this._DestoryObjArray.push(F)}catch(G){$(B).html("<p class='siebui-quick-applet-validation-error'>"+SiebelApp.S_App.LocaleObject.GetLocalString("IDS_OK_CONFIG")+"</p>")}}}a.prototype.EndLife=function(){for(var e=0;e<this._DestoryObjArray.length;e++){if(this._DestoryObjArray[e]!=null&&typeof(this._DestoryObjArray[e])!=="undefined"){this._DestoryObjArray[e].destroyWidget();this._DestoryObjArray[e]=null}}if(this._Panel){this._Panel.destroy(true);this._Panel=null}if(this._HeadNode){this._HeadNode.destroy(true);this._HeadNode=null}var d=this.GetPM().Get("GetFullId");var f="#"+d+"_header";$(f).remove();SiebelAppFacade.OKListPRenderer.superclass.EndLife.call(this)};return a}());return SiebelAppFacade.OKListPRenderer})};