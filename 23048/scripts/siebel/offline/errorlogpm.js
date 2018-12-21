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
if(typeof(SiebelApp.ErrorLogPM)==="undefined"){SiebelJS.Namespace("SiebelApp.ErrorLogPM");define("siebel/offline/errorlogpm",["siebel/pmodel"],function(){SiebelApp.ErrorLogPM=(function(){function e(){SiebelApp.ErrorLogPM.superclass.constructor.apply(this,arguments)}function h(){var l=SiebelApp.S_App.GetActiveView(),j=l.GetAppletMap(),i,k;for(k in j){if(j[k]){i=j[k];if(i.GetName()===a.get("ERRLOG_APPLET")){return i}}}return i}function d(){var m=parseInt(f.getItem("LogRecordNum")||0,10),i=[],l,j,k;for(l=0;l<=m;l++){j="AllLogs"+(l||"");k=f.getItem(j);if(k){i.push(j)}}return i}function g(){var j=[],i=d();i.forEach(function(l){var m=f.getItem(l),k=JSON.parse(m);k.forEach(function(n){j.push(SiebelApp.OfflineUtils.GetLogMsg(n.c,n.p))})});return j.join("\n")}SiebelJS.Extend(e,SiebelAppFacade.PresentationModel);var c=SiebelApp.Constants,a=SiebelApp.Offlineconstants,f=window.localStorage,b={ClearLogs:function(){var i=d();i.push("LogRecordNum");i.forEach(f.removeItem,f);this.ExecuteMethod("ShowSelection")},UploadLogs:function(){var l=encodeURIComponent(g()),o=SiebelApp.S_App.GetPageURL(),n=SiebelApp.S_App.GetSRN(),m=SiebelApp.BrowserCacheMgr.GetSyncNodeId(),k=SiebelApp.AjaxRequestMgr.SetSrvrReqInputProp(o,[c.get("SWE_CMD_ARG"),c.get("SWE_ARG_KEEP_CONTEXT"),c.get("SWE_VIEW_RPC_ARG"),a.get("CLIENT_LOG_DATA"),c.get("SYNC_NODE_ID"),"SRN"],["UploadClientLogs",1,1,l,m,n],"",o);var j=k.indexOf("?"),i=k.substring(j+1,k.length);k=k.substring(0,j);$.ajax({type:"POST",url:k,data:i,processData:false})}};e.prototype.Init=function(){SiebelAppFacade.PresentationModel.superclass.Init.call(this);this.AddMethod("CanUpdate",function(j){var i=arguments[arguments.length-1];if(j==="Logs"){i.ReturnValue=false}return i},{scope:this,sequence:false});this.AddMethod("CanInvokeMethod",function(j){var i=arguments[arguments.length-1];if(b[j]){i.ReturnValue=!!f.getItem("AllLogs");if(i.ReturnValue&&j==="UploadLogs"){i.ReturnValue=!SiebelApp.OfflineAppSettings.GetMode()}}return i},{scope:this,sequence:false});this.AddMethod("InvokeMethod",function(j){var i=arguments[arguments.length-1],l=b[j];if(l){var k=h();if(k&&k.GetControls().Logs){l.call(this)}}return i},{scope:this,sequence:false});this.AddMethod("GetFormattedFieldValue",function(j){var i=arguments[arguments.length-1];if(j.GetName()==="Logs"){i.ReturnValue=g()}return i},{scope:this,sequence:false})};return e}());return SiebelApp.ErrorLogPM})};