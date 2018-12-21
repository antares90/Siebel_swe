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
if(typeof(SiebelAppFacade.PrintPresentationModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.PrintPresentationModel");define("siebel/docprintpm",[],function(){SiebelAppFacade.PrintPresentationModel=(function(){var h=SiebelJS.Dependency("SiebelApp.Constants");var i=h.get("SWE_EXTN_CANCEL_ORIG_OP"),e=h.get("SWE_EXTN_RETVAL"),a=h.get("SWE_EXTN_STOP_PROP_OP");function k(o){SiebelAppFacade.PrintPresentationModel.superclass.constructor.call(this,o)}SiebelJS.Extend(k,SiebelAppFacade.ListPresentationModel);k.prototype.Init=function(){SiebelAppFacade.PrintPresentationModel.superclass.Init.call(this);this.AttachEventHandler(h.get("PHYEVENT_INVOKE_CONTROL"),d)};k.prototype.Setup=function(o){SiebelAppFacade.PrintPresentationModel.superclass.Setup.call(this,o);l()};function d(p){if("ClientPrintDoc"===p){if(navigator.appVersion.indexOf("Win")!=-1){m()}else{SiebelJS.Log("Unsupported OS : "+navigator.appVersion)}var o=arguments[arguments.length-1];if(o&&(o instanceof Object)){o[i]=true;o[a]=true}return false}return true}function m(){var y=f();var r=y.length;if(r===0){return}var v=SiebelApp.S_App.GetPopupPM();if(v.Get("state")===h.get("POPUP_STATE_UNLOADED")){v.Setup()}var q=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_LOADING_INDICATOR_TITLE");v.ExecuteMethod("OpenPopup",q,"0","0",false,false,true);v.SetProperty("content",q);g();var u="CorrespPrint";var t=SiebelApp.S_App.GetService(u);var o=CCFMiscUtil_CreatePropSet();var x="SetParentFrameParams";o.SetProperty("SelectedRowIds",CCFMiscUtil_ArrayToString(y));o.SetProperty("IsProspect","FALSE");o.SetProperty("IsPrintDoc","TRUE");var s=t.InvokeMethod(x,o);o=CCFMiscUtil_CreatePropSet();x="ClientPrint";var w=0;var p=function(){s=t.InvokeMethod(x,o);var E=s.GetProperty("FileTitle")+"."+s.GetProperty("FileExt");var D=SiebelApp.S_App.GetPageURL();var B=SiebelApp.S_App.GetPageURL()+"?";B+="SWECmd=GetFile&";B+="SWEC="+s.GetProperty("SWEC")+"&";B+="SRN="+SiebelApp.S_App.GetSRN();var A=function(){if(this.readyState==4){if(this.status==200||this.status==204){SiebelApp.S_App.uiStatus.Busy({target:SiebelApp.S_App.GetTargetViewContainer(),mask:true});var L=c();var J=n.encode(this.response);if(L){var H=false;try{H=L.isAppletValidate()}catch(M){setTimeout(function(){v.ExecuteMethod("SetPopupVisible",false)},20);setTimeout(function(){SiebelApp.S_App.uiStatus.Free()},20);return}var F=4096;var K=Math.floor(J.length/F);var N=J.length%F;var I;for(I=0;I<K;I++){var G=I*F;L.prepareFileData(J.substring(G,G+F),I==0)}if(N>0){L.prepareFileData(J.substring(F*K,J.length),false)}L.downloadFilePrint(E);w++;if(w<r){p()}else{q=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_DATEPICKER_CLOSE_TEXT");setTimeout(function(){v.ExecuteMethod("SetPopupVisible",false)},20);setTimeout(function(){SiebelApp.S_App.uiStatus.Free()},20)}}}}};var C=b()||j();var z=typeof C.responseType==="string";if(!z){SiebelJS.Log("Browser has no support for arraybuffer");setTimeout(function(){v.ExecuteMethod("SetPopupVisible",false)},20);setTimeout(function(){SiebelApp.S_App.uiStatus.Free()},20);return}C.onreadystatechange=A;C.open("GET",B);C.responseType="arraybuffer";C.send()};p()}function f(){var s=[];var r=SiebelApp.S_App.GetActiveView().GetActiveApplet();var q=r.GetRowsSelectedArray();var p=r.GetRawRecordSet();var o=q.length;var t=0;while(t<o){if(q[t]){s.push(p[t].Id)}t++}return s}function c(){var q;var o=(navigator.userAgent.indexOf("Trident")>0);if(o){var p=document.getElementById("SiebeAttachmentAppletFrame");if(p){q=p.contentWindow.document.getElementById("SiebelAttachmentJavaApplet")}}else{q=document.getElementById("SiebelAttachmentJavaApplet2")}return q}function l(){var q=c();var r=(navigator.userAgent.indexOf("Trident")>0);if(!q){jQuery(window).on("beforeunload",function(u){var v=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_ATT_CLOSE_CONFIRM");var t=c();if(!t.onWindowClose()){u.cancelBubble=true;u.returnValue=v;return v}});var s=window.parent.SIEBEL_BUILD;var o=s.indexOf("/");s=s.substring(0,o);if(r){jQuery("<iframe id='SiebeAttachmentAppletFrame' src='attachment.html' width=0 height=0 frameBorder=0></iframe>").appendTo("body")}else{var p='<object id="SiebelAttachmentJavaApplet" ';p+='  classid="clsid:CAFEEFAC-0017-0000-FFFF-ABCDEFFEDCBA" width=0 height=0>';p+='  <param name="code" value="com.siebel.applets.attachment.SiebelAttachmentApplet.class">';p+='  <param name="codebase" value="http://java.sun.com/update/1.6.0/jinstall-6u30-windows-i586.cab#Version=1,6,0,0">';p+='  <param name="archive" value="'+s+'/applets/SiebelAttachment.jar">';p+="    <comment>";p+='      <embed id="SiebelAttachmentJavaApplet2" ';p+='        code="com.siebel.applets.attachment.SiebelAttachmentApplet.class"';p+='        codebase="." archive="'+s+'/applets/SiebelAttachment.jar"';p+='        type="application/x-java-applet;version=1.7" pluginspage="http://java.com/download/"';p+="        width=0 height=0>";p+="        <noembed>";p+="          No Java Support.";p+="        </noembed>";p+="      </embed>";p+="    </comment>";p+="</object>";jQuery(p).appendTo("body")}}}var n={};(function(o){n.encode=function(t){if(!t){return""}var r=new Uint8Array(t),s,p=r.length,q="";for(s=0;s<p;s+=3){q+=o[r[s]>>2];q+=o[((r[s]&3)<<4)|(r[s+1]>>4)];q+=o[((r[s+1]&15)<<2)|(r[s+2]>>6)];q+=o[r[s+2]&63]}if((p%3)===2){q=q.substring(0,q.length-1)+"="}else{if(p%3===1){q=q.substring(0,q.length-2)+"=="}}return q};n.decode=function(w){var r=w.length*0.75,x=w.length,v,t=0,u,s,q,z;if(w[w.length-1]==="="){r--;if(w[w.length-2]==="="){r--}}var y=new Uint8Array(r);for(v=0;v<x;v+=4){u=o.indexOf(w[v]);s=o.indexOf(w[v+1]);q=o.indexOf(w[v+2]);z=o.indexOf(w[v+3]);y[t++]=(u<<2)|(s>>4);y[t++]=((s&15)<<4)|(q>>2);y[t++]=((q&3)<<6)|(z&63)}return y}})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");function b(){try{return new window.XMLHttpRequest()}catch(o){}}function j(){try{return new window.ActiveXObject("Microsoft.XMLHTTP")}catch(o){}}function g(){$("div[name=popup]").dialog("option","height","60").dialog("option","width","60").dialog("option","position","center").dialog("option","title","Print")}return k}());return"SiebelAppFacade.PrintPresentationModel"})};