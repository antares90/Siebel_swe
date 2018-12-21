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
if(typeof(SiebelAppFacade.CKEditorRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.CKEditorRenderer");define("siebel/ckeditorrenderer",["siebel/phyrenderer","3rdParty/ckeditor/ckeditor.js"],function(){SiebelAppFacade.CKEditorRenderer=(function(){var g;function b(j){SiebelAppFacade.CKEditorRenderer.superclass.constructor.call(this,j);j.AttachPMBinding("SetContentBinder",function(){var k=this.GetPM().Get("OfferType");var m=this.GetPM().Get("Content");var l=this.GetPM().Get("EditorElementId");if(k.indexOf("Email")!=-1){a(m,l)}else{if(m.split("*")!=null&&m.split("*").length>=2&&m.split("*")[1]!=null){var n=m.split("*")[1];a(n,l)}}},{scope:this});j.AttachPMBinding("prop",function(){var q=this.Get("ResetCount");q++;this.SetProperty("ResetCount",q);if(q==1){return}else{this.SetProperty("ResetCount",0)}if(!this.Get("HandleReset")){this.SetProperty("HandleReset",true);return}var k=this.Get("prop");var p=this.Get("prop").GetChild(2);var s=this.Get("EditorElementId");var n=this.Get("ControlConfig");for(var m=0;m<n.GetChildCount();m++){var l;var o=n.GetChild(m);var r=o.GetType();if(r=="Person"){n.RemoveChild(m);n.AddChild(p);break}}n.SetProperty("Content",this.Get("Content"));this.SetProperty("ControlConfig",n);c.call(this,this)})}SiebelJS.Extend(b,SiebelAppFacade.PhysicalRenderer);b.prototype.EndLife=function(){var j=this.GetPM().Get("EditorElementId");if(CKEDITOR.instances[j]){CKEDITOR.config.removePlugins="mergefieldsblock,contentruleblock";CKEDITOR.instances[j].destroy(true);CKEDITOR.removeListener("instanceReady");$("#"+j).remove()}};b.prototype.ShowUI=function(){SiebelAppFacade.CKEditorRenderer.superclass.ShowUI.call(this);dir=CKEDITOR.basePath.replace("/ckeditor/","");CKEDITOR.plugins.addExternal("mergefieldsblock",dir+"/ckeditor-custom/mergefieldsblock/plugin.js","");CKEDITOR.plugins.addExternal("contentruleblock",dir+"/ckeditor-custom/contentruleblock/plugin.js","");CKEDITOR.config.extraPlugins="mergefieldsblock,contentruleblock";CKEDITOR.config.removePlugins="";var k=$("table.GridBack tbody tr td:last-child","#s_"+this.GetPM().Get("GetFullId")+"_div");var j=$("div span",k);var l=this.GetPM().Get("GetFullId")+"_editor1";this.GetPM().SetProperty("EditorElementId",l);$("<textarea id='"+l+"' name='"+l+"'></textarea>").appendTo(j);if(SiebelApp.S_App.GetDirection()){$(j).addClass("cke_rtl");CKEDITOR.config.contentsLangDirection="rtl"}c.call(this,this.GetPM())};function c(q){var x;var o;var n;var N;var A;var y;var O=700;var G=400;var L=new Array();var I=new Array();var j=new Array();var t=new Array();var s=new Array();var J=new Array();var r=new Array();var C=0;var M="";var k="";var P=new Array();var u="";var R;var z=q.Get("ControlConfig");u=z.GetProperty("Content");M=z.GetProperty("OfferType");k=z.GetProperty("Language");P=z.GetProperty("Templates");x=z.GetProperty("filebrowserBrowseUrl");o=z.GetProperty("filebrowserImageBrowseUrl");n=z.GetProperty("filebrowserFlashBrowseUrl");N=z.GetProperty("filebrowserUploadUrl");A=z.GetProperty("filebrowserImageUploadUrl");y=z.GetProperty("filebrowserFlashUploadUrl");O=z.GetProperty("filebrowserWindowWidth");G=z.GetProperty("filebrowserWindowHeight");var v=z.GetChildCount();for(var m=0;m<v;m++){var p;var l=z.GetChild(m);var T=l.GetType();if(T=="Person"){var H=l.GetProperty("MergeFieldVal");var D=l.GetChildCount();for(var E=0;E<D;E++){var F=l.GetChild(E);var K=F.GetType();L[E]=K;I[E]=new Array();h(F,I[E],true);if(K==H){C=E}}}else{if(T=="Rule"){var w=l.GetChildCount();for(var E=0;E<w;E++){var S=l.GetChild(E);var T=S.GetType();if(T=="R"){e(S,j,true);e(S,t,false)}else{if(T=="O"){e(S,s,true);e(S,J,false)}}}}else{if(T=="Caption"){h(l,r,false)}}}}var B;var Q;CKEDITOR.config.g_arrCategory=L;CKEDITOR.config.g_arrItem=I;CKEDITOR.config.g_arrRule=j;CKEDITOR.config.g_arrRuleMap=t;CKEDITOR.config.g_arrOperator=s;CKEDITOR.config.g_arrOperatorMap=J;CKEDITOR.config.g_arrStr=r;CKEDITOR.config.g_iMergeField=C;Q=q;B=Q.Get("EditorElementId");if(CKEDITOR.instances[B]){CKEDITOR.instances[B].destroy(true);delete CKEDITOR.instances[B]}g=CKEDITOR.replace(B,{customConfig:"../ckeditor-custom/custom-config.js",extraPlugins:"mergefieldsblock,contentruleblock",filebrowserBrowseUrl:x,filebrowserImageBrowseUrl:o,filebrowserFlashBrowseUrl:n,filebrowserWindowWidth:O,filebrowserWindowHeight:G,language:i(k),toolbar:f(M),template_files:P,on:{instanceReady:function(U){if(CKEDITOR.instances[B]){a(u,B);CKEDITOR.instances[B].on("blur",function(){})}}}})}function f(j){if(!j||0===j.length){j="Base"}return j+"Block"}function i(k){var j={};j.ENU="en";j.ARA="ar";j.PRC="zh";j.CNT="zh-cn";j.CSY="cs";j.DAN="da";j.DEU="de";j.ENG="en-gb";j.ESN="esn";j.ESP="es";j.FIN="fi";j.FRA="fr";j.HEB="he";j.ITA="it";j.JPN="ja";j.KOR="ko";j.NLD="nl";j.PL="pl";j.PTB="pt-br";j.PTG="pt";j.RUS="ru";j.SVE="sv";j.THA="th";j.TRK="tr";return j[k]}function e(k,p,m){var o=0;var l;for(var j=0;j<k.GetChildCount();j++){var n=k.GetChild(j);if((l=n.EnumProperties(true))!=null&&l!=""){if(m){p[o]=l;o++}else{p[l]=n.GetProperty(l)}}}}function h(j,m,l){for(var k in j.propArray){if(l){m[j.propArray[k]]=k}else{m[k]=j.propArray[k]}}}function d(j,m,l){var k;if((k=j.EnumProperties(true))!=null&&k!=""){do{if(l){m[j.GetProperty(k)]=k}else{m[k]=j.GetProperty(k)}}while((k=j.EnumProperties(false))!=null&&k!="")}}function a(k,j){if(!CKEDITOR.instances[j]||CKEDITOR.instances[j]=="undefined"){return}CKEDITOR.instances[j].setData(k)}return b}());return"SiebelAppFacade.CKEditorRenderer"})};