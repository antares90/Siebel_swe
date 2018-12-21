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
if(typeof(SiebelApp.serviceactstat)==="undefined"){SiebelJS.Namespace("SiebelApp.serviceactstat");define("siebel/offline/servicemactstat",["siebel/offline/model"],function(){var b={};var a=SiebelApp.Offlineconstants;b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service Activity Detail Form Applet - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b={};b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service Activity Detail Form Applet Read Only- Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b={};b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service Activity Detail Form Applet - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoCanInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoCanInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b={};b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service Activity Detail Form Applet Read Only- Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoCanInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoCanInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b={};b[a.get("DOUIREG_OBJ_NAME")]="Action";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEBUSCOMP");b[a.get("DOUIREG_OBJ_MTHD")]="Execute";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="Execute";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service FS Invoice List Applet - Auto Invoice - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoCanInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoCanInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service FS Invoice List Applet - Auto Invoice - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service Service Request Invoice List Applet - Auto Invoice - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoCanInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoCanInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service Service Request Invoice List Applet - Auto Invoice - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service Activity Invoice Signature Form Applet - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoCanInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoCanInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service Activity Invoice Signature Form Applet - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service Invoice Signature Form Applet - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoCanInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoCanInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="SHCE Service Invoice Signature Form Applet - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="serviceactstat";b[a.get("DOUIREG_SRVC_MTDH")]="DoInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);SiebelApp.serviceactstat=(function(){function c(d){}SiebelJS.Extend(c,SiebelApp.ServiceModel);c.prototype.DoCanInvokeMethod=function(g){var l=CCFMiscUtil_CreatePropSet();var r="";var i=this.GetContext().GetBusComp();r=g.GetProperty("MethodName").toString();if(r==="AcceptStatus"){var s;var n;var j;var o;var h;var m;var e;var d;var f;j=this.GetContext();n=j.GetBusComp();s=n.FieldValue("Status");$.callback(this,function(t){s=t.retVal;h=SiebelApp.S_App.Model.GetLovNameVal("Acknowledged","EVENT_STATUS");m=SiebelApp.S_App.Model.GetLovNameVal("On Hold","EVENT_STATUS");e=SiebelApp.S_App.Model.GetLovNameVal("In Progress","EVENT_STATUS");d=SiebelApp.S_App.Model.GetLovNameVal("Done","EVENT_STATUS");f=SiebelApp.S_App.Model.GetLovNameVal("Cancelled","EVENT_STATUS");if(s===h||s===m||s===e||s===d||s===f){l.SetProperty("Invoked",false);l.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:l})}else{l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}})}else{if(r==="ArrivedStatus"){var s;var k;var n;var j;var o;var e;j=this.GetContext();n=j.GetBusComp();s=n.FieldValue("Status");$.callback(this,function(t){s=t.retVal;k=n.FieldValue("Started");$.callback(this,function(u){k=u.retVal;e=SiebelApp.S_App.Model.GetLovNameVal("In Progress","EVENT_STATUS");if(s===e&&k==0){l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}else{l.SetProperty("Invoked",false);l.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:l})}})})}else{if(r==="DeclineStatus"){var s;var k;var n;var j;var m;var e;var d;var f;var p;var o;j=this.GetContext();n=j.GetBusComp();s=n.FieldValue("Status");$.callback(this,function(t){s=t.retVal;k=n.FieldValue("Started");
$.callback(this,function(u){k=u.retVal;e=SiebelApp.S_App.Model.GetLovNameVal("In Progress","EVENT_STATUS");m=SiebelApp.S_App.Model.GetLovNameVal("On Hold","EVENT_STATUS");d=SiebelApp.S_App.Model.GetLovNameVal("Done","EVENT_STATUS");f=SiebelApp.S_App.Model.GetLovNameVal("Cancelled","EVENT_STATUS");p=SiebelApp.S_App.Model.GetLovNameVal("Declined","EVENT_STATUS");if((s===e&&utils.IsEmpty(k))||(s!==e&&s!==m&&s!==d&&s!==f&&s!==p)){l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}else{l.SetProperty("Invoked",false);l.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:l})}})})}else{if(r==="EnRouteStatus"){var s;var n;var j;var h;j=this.GetContext();n=j.GetBusComp();s=n.FieldValue("Status");$.callback(this,function(t){s=t.retVal;h=SiebelApp.S_App.Model.GetLovNameVal("Acknowledged","EVENT_STATUS");if(s===h){l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}else{l.SetProperty("Invoked",false);l.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:l})}})}else{if(r==="SuspendStatus"){var s;var k;var n;var j;var e;j=this.GetContext();n=j.GetBusComp();s=n.FieldValue("Status");$.callback(this,function(t){s=t.retVal;k=n.FieldValue("Started");$.callback(this,function(u){k=u.retVal;e=SiebelApp.S_App.Model.GetLovNameVal("In Progress","EVENT_STATUS");if(s===e&&k!=0){l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}else{l.SetProperty("Invoked",false);l.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:l})}})})}else{if(r==="ResumeStatus"){var s;var n;var j;var m;j=this.GetContext();n=j.GetBusComp();s=n.FieldValue("Status");$.callback(this,function(t){s=t.retVal;m=SiebelApp.S_App.Model.GetLovNameVal("On Hold","EVENT_STATUS");if(s===m){l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}else{l.SetProperty("Invoked",false);l.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:l})}})}else{if(r==="FinishedStatus"){var s;var k;var n;var j;var e;j=this.GetContext();n=j.GetBusComp();s=n.FieldValue("Status");$.callback(this,function(t){s=t.retVal;k=n.FieldValue("Started");$.callback(this,function(u){k=u.retVal;e=SiebelApp.S_App.Model.GetLovNameVal("In Progress","EVENT_STATUS");if(s===e&&k!=0){l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}else{l.SetProperty("Invoked",false);l.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:l})}})})}else{if(r==="Sign"){var q;if(i.CheckActiveRow()===true){i.FieldValue("Signature Captured");$.callback(this,function(t){q=t.retVal;if(q==="N"){l.SetProperty("RetVal",true)}else{l.SetProperty("RetVal",false)}l.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:l})})}else{l.SetProperty("Invoked",true);l.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:l})}}else{if(r==="CreateSignature"){l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}else{if(r==="CancelSignature"){l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}else{if(r==="ClearSignature"){l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}else{if(r==="ApplySignature"){l.SetProperty("Invoked",true);l.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:l})}else{l.SetProperty("Invoked",false);l.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:l})}}}}}}}}}}}}};c.prototype.DoInvokeMethod=function(e){var f="";var d=CCFMiscUtil_CreatePropSet();f=e.GetProperty("MethodName").toString();if(f==="AcceptStatus"){this.SetActivityStatus("Acknowledged",f);$.callback(this,function(g){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})})}else{if(f=="Start"||f=="ArrivedStatus"){this.SetActivityStatus("In Progress",f);$.callback(this,function(g){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})})}else{if(f==="DeclineStatus"){this.SetActivityStatus("Declined",f);$.callback(this,function(g){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})})}else{if(f==="EnRouteStatus"){this.SetActivityStatus("In Progress",f);$.callback(this,function(g){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})})}else{if(f==="SuspendStatus"){this.SetActivityStatus("On Hold",f);$.callback(this,function(g){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})})}else{if(f==="ResumeStatus"){this.SetActivityStatus("In Progress",f);$.callback(this,function(g){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})})}else{if(f==="FinishedStatus"){this.SetActivityStatus("Done",f);$.callback(this,function(g){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})})}else{if(f==="Sign"){this.Sign();$.callback(this,function(g){if(!g.err){d.SetProperty("Invoked",true);$.setReturnValue({err:"",retVal:d})}else{d.SetProperty("Invoked",true);$.setReturnValue({err:g.err,retVal:d})}})}else{if(f==="CreateSignature"){this.CreateSignature();$.callback(this,function(g){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})})}else{if(f==="CancelSignature"){this.CancelSignature();$.callback(this,function(g){if(!g.err){d.SetProperty("Invoked",true);$.setReturnValue({err:"",retVal:d})}else{d.SetProperty("Invoked",true);$.setReturnValue({err:g.err,retVal:d})}})}else{if(f==="ClearSignature"){d.SetProperty("Invoked",true);$.setReturnValue({err:false,retVal:d})}else{if(f==="ApplySignature"){this.ApplySignature();$.callback(this,function(g){if(!g.err){d.SetProperty("Invoked",true);$.setReturnValue({err:"",retVal:d})}else{d.SetProperty("Invoked",true);$.setReturnValue({err:g.err,retVal:d})}})}else{d.SetProperty("Invoked",false);$.setReturnValue({err:false,retVal:d})}}}}}}}}}}}}};c.prototype.SetActivityStatus=function(h,l){SiebelJS.Log("Service Method SetActivityStatus...");var f;var g;var m;var j;var i;var k;var e;e=this.GetContext();i=e.GetBusComp();k=e.GetControl("Status").GetFieldName();g=e.GetBusComp().GetFieldDefn(k).PickListName;m=i.GetPickListInfo(g,"Status");j=SiebelApp.S_App.Model;f=j.GetLovNameVal(h,m.LOVType);i.ActivateField("Status");i.SetFieldValue("Status",f,true);$.callback(this,function(n){});if(l!=""){var d=new Date();if(l=="ArrivedStatus"){i.ActivateField("Started");i.SetFieldValue("Started",d,true);$.callback(this,function(n){i.SetFieldValue("Done","",true);$.callback(this,function(o){})})}else{if(l=="FinishedStatus"){i.SetFieldValue("Done",d,true);$.callback(this,function(n){})}}}i.SetCommitPending(true);i.WriteRecord();$.callback(this,function(n){SiebelApp.OfflineAppMgr.PostActions(a.get("ACTION_RPC_COMPLETED"));if(l=="FinishedStatus"){i.ActivateField("Percent Complete");i.SetFieldValue("Percent Complete","100",true);$.callback(this,function(o){i.SetCommitPending(true);i.WriteRecord(false);$.callback(this,function(p){SiebelApp.OfflineAppMgr.PostActions(a.get("ACTION_RPC_COMPLETED"))
})})}})};c.prototype.Execute=function(){var e=CCFMiscUtil_CreatePropSet();var d=this.GetContext();d.ActivateField("Started")};c.prototype.Sign=function(){var f;var d;var h="";var i=CCFMiscUtil_CreatePropSet();var g=SiebelApp.S_App.GetActiveView().GetActiveApplet();var e=g.GetBusComp();e.FieldValue("Id");$.callback(this,function(k){var j=k.retVal;h=g.GetDrillDown("Signature Capture Drilldown");if(!utils.IsEmpty(h)){f=h.viewname;d=g.GetUserProperty("Signature Applet Name");i.SetProperty("Parent Id",j);SiebelApp.OfflineAppMgr.QueueMethod(d,"CreateSignature",i);SiebelApp.OfflineAppMgr.BuildViewAsync(f,"BS_DRILLDOWN",h)}})};c.prototype.CreateSignature=function(e){SiebelJS.Log("Invoked CreateSignature Method");if(!utils.IsEmpty(e)){var g=e.GetProperty("Parent Id")}var d=this.GetContext().GetBusComp();var f=d.GetParentBusComp();f.FieldValue("Id");$.callback(this,function(i){var h=i.retVal;d.Execute();$.callback(this,function(j){d.NewRecord(true)})})};c.prototype.CancelSignature=function(){SiebelJS.Log("Invoked CancelSignature Method");var i="Cancel Drilldown";var h="";var d="";var f=CCFMiscUtil_CreatePropSet();var g=SiebelApp.S_App.GetActiveView().GetActiveApplet();var e=g.GetBusComp();var j=e.GetParentBusComp();$.callback(this,function(l){var k=g.GetDrillDown(i);if(!utils.IsEmpty(k)){d=k.viewname;SiebelApp.OfflineAppMgr.BuildViewAsync(d,"BS_DRILLDOWN",k)}else{d=SiebelApp.OfflineAppMgr.GetPriorView();SiebelApp.OfflineAppMgr.BuildViewAsync(d,"BS_NORMAL")}})};c.prototype.ApplySignature=function(){SiebelJS.Log("Invoked ApplySignature Method");var j="Apply Drilldown";var i="";var s;var e;var l=CCFMiscUtil_CreatePropSet();var t=0;var m=16000;var n=5;var k=[];var h;var q=SiebelApp.S_App.GetActiveView().GetActiveApplet();var g=q.GetUserProperty("Signature Length");if(!utils.IsEmpty(g)){m=parseInt(g,10)}var f=q.GetBusComp();var d=f.GetParentBusComp();var r=SiebelApp.AjaxRequestMgr.GetActiveRequestObj();for(var p in r.FieldValue){var o=r.FieldValue[p];if(o[0]==="Contact Last Name"){e=o[1]}else{if(o[0]==="Signature"){s=o[1]}}}i=utils.UrlDecode(s);t=i.length;if(e.length===0){SiebelApp.OfflineAppMgr.PostActions("ActionRPCCompleted","ApplySignature");k.push("Contact Last Name");SiebelApp.S_App.OfflineErrorObject.SetErrorMsg("SSAFReqFieldNotExist",k);$.setReturnValue({err:"SSAFReqFieldNotExist",retVal:""});return}if(t===0){SiebelApp.OfflineAppMgr.PostActions("ActionRPCCompleted","ApplySignature");k.push("Signature");SiebelApp.S_App.OfflineErrorObject.SetErrorMsg("SSAFReqFieldNotExist",k);$.setReturnValue({err:"SSAFReqFieldNotExist",retVal:""});return}else{if(t<n){SiebelApp.OfflineAppMgr.PostActions("ActionRPCCompleted","ApplySignature");k.push("Signature");SiebelApp.S_App.OfflineErrorObject.SetErrorMsg("SSAFReqFieldNotExist",k);$.setReturnValue({err:"SSAFReqFieldNotExist",retVal:""});return}else{if(t>=m){SiebelApp.OfflineAppMgr.PostActions("ActionRPCCompleted","ApplySignature");k.push("Signature");SiebelApp.S_App.OfflineErrorObject.SetErrorMsg("IDS_PHA_ERR_SIGN_TOO_BIG",k);$.setReturnValue({err:"IDS_PHA_ERR_SIGN_TOO_BIG",retVal:""});return}else{$.callback(this,function(u){f.SetFieldValue("Signature",i);$.callback(this,function(v){f.SetCommitPending(true);f.WriteRecord();$.callback(this,function(w){f.FieldValue("Invoice Id");$.callback(this,function(y){var x=y.retVal;d.SetFldSearchSpec("Id",x);d.Execute();$.callback(this,function(z){d.Home();$.callback(this,function(A){d.SetFieldValue("Signature Captured","Y");$.callback(this,function(){d.SetCommitPending(true);d.WriteRecord();$.callback(this,function(E){var D=q.GetDrillDown(j);if(!utils.IsEmpty(D)){h=D.viewname;var G=SiebelApp.S_App.Model.GetViewDef(h);if(G){var F=G.BOName;var B=SiebelApp.S_App.Model.GetBusObj(F);var C=B.GetBusComp(D.busCompName);C.SetFldSearchSpec(D.destFieldName,x);SiebelApp.OfflineAppMgr.BuildViewAsync(h,"BS_DRILLDOWN",D,B)}}else{h=SiebelApp.OfflineAppMgr.GetPriorView();SiebelApp.OfflineAppMgr.BuildViewAsync(h,"BS_NORMAL")}})})})})})})})})}}}};return c}());return"SiebelAppFacade.SiebelApp.serviceactstat"})};