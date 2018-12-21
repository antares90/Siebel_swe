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
if(typeof(SiebelAppFacade.EdetailerPlayerPM)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.EdetailerPlayerPM");define("siebel/edetailerplayerpm",["siebel/pmodel"],function(){SiebelAppFacade.EdetailerPlayerPM=(function(){var k=SiebelJS.Dependency("SiebelApp.Constants");var o=0;var d={};function q(r){SiebelAppFacade.EdetailerPlayerPM.superclass.constructor.call(this,r)}SiebelJS.Extend(q,SiebelAppFacade.BasePM);q.prototype.Init=function(){SiebelAppFacade.EdetailerPlayerPM.superclass.Init.call(this);this.AddMethod("NotifyGetRecChange",i);this.AddMethod("SendNotification",c);this.AddMethod("SetSesRecData",l);this.AddMethod("GetSesRecData",g);this.AddMethod("GotoNextSet",n);this.AddMethod("GotoPreviousSet",b);this.AddMethod("GoToNextItem",a);this.AddMethod("GotoPreviousItem",j);this.AddMethod("navigateToItem",p);this.AddMethod("detailerMenuBar",f);this.AddMethod("detailerThreadBar",m);this.AddMethod("RelatedItemStartTime",h);this.AddMethod("RelatedItemEndTime",e);var r=SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM();if(r.Get("PlayerApplet")===""){r.AddProperty("PlayerApplet",this.Get("GetName"));SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM().SetProperty("hotspotappletname",this.Get("GetName"))}else{r.AddProperty("RelatedApplet",this.Get("GetName"))}this.AttachNotificationHandler(k.get("SWE_PROP_BC_NOTI_GENERIC"),function(s){this.ExecuteMethod("NotifyGetRecChange",s)})};function l(){var s=this.Get("GetRecordSet");var r=s[this.Get("GetSelection")];if(r){d.MpiId=r.Id;d.ThumbnailPath=r["Image With Path"];d.ParentMPId=r["Parent MP Id"];d.ItemName=r.Name;d.ParentDsblMsgResponse=r["Parent Disable Msg Response Flag"];d.ParentMPName=r["Parent MP Name"];d.LitFileExt=r.LitFileExt;d.LitFileRev=r.LitFileRev;d.LiteratureId=r["Literature Id"];d.ThumbnailExtension=r["Thumbnail Extension"];d.ThumbnailId=r["Thumbnail Id"];d.ThumbnailRevId=r["Thumbnail Rev Id"]}}function g(){return(d)}q.prototype.SentData=function(){c.call(this)};function i(r){var s=r.GetProperty(k.get("SWE_PROP_NOTI_TYPE")).toString();if((s==="BegRow")){var t=SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM();t.AddProperty("visited","N");c.call(this)}}function c(){var x=SiebelApp.S_App.GetService("LS PCD Service");var r=SiebelApp.S_App.NewPropertySet();var t=new Date();var A=g.call(this);var B=A.MpiId;var v=SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM();var y=this.Get("GetRecordSet").length;if(y!==0){var s=this.Get("GetRecordSet")[this.Get("GetSelection")].Id}if(s&&s!==A.MpiId){if(v.Get("LastUpdatedRec")!==A.MpiId){if(x){var z={};z.async=true;z.scope=this;z.npr=true;z.selfbusy=true;z.cb=function(){var C=(t.getMonth()+1)+"/"+t.getDate()+"/"+t.getFullYear()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();l.call(this);if(v.Get("Mode")==="Player"){v.AddProperty("PlayerStartTime",C)}else{v.AddProperty("RelatedStartTime",C)}v.ExecuteMethod("ButtonCanInvoke");v.GetRenderer().BindEvents()};var w=(t.getMonth()+1)+"/"+t.getDate()+"/"+t.getFullYear()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();var u;if(v.Get("Mode")==="Player"){r.SetProperty("StartTime",v.Get("PlayerStartTime"))}else{r.SetProperty("StartTime",v.Get("RelatedStartTime"))}r.SetProperty("MpiId",A.MpiId);r.SetProperty("ThumbnailPath",A.ThumbnailPath);r.SetProperty("EndTime",w);r.SetProperty("ParentMPId",A.ParentMPId);r.SetProperty("ItemName",A.ItemName);r.SetProperty("ParentDsblMsgResponse",A.ParentDsblMsgResponse);r.SetProperty("ParentMPName",A.ParentMPName);r.SetProperty("LitFileExt",A.LitFileExt);r.SetProperty("LitFileRev",A.LitFileRev);r.SetProperty("LiteratureId",A.LiteratureId);r.SetProperty("ThumbnailExtension",A.ThumbnailExtension);r.SetProperty("ThumbnailId",A.ThumbnailId);r.SetProperty("ThumbnailRevId",A.ThumbnailRevId);if(v.Get("UpdatePlayer")==="N"){r.SetProperty("Mode","INSERT")}else{r.SetProperty("Mode","UPDATE")}if(v.Get("Mode")==="Player"&&this.GetObjName()===v.Get("PlayerApplet")){v.AddProperty("LastUpdatedRec",B);v.AddProperty("UpdatePlayer","N");x.InvokeMethod("LogMsgPlanItemSesResponse",r,z)}if(v.Get("Mode")==="Related"&&this.GetObjName()===v.Get("RelatedApplet")){v.AddProperty("LastUpdatedRec",B);v.AddProperty("UpdatePlayer","N");x.InvokeMethod("LogMsgPlanItemSesResponse",r,z)}}}}}q.prototype.Show=function(){var r=this.GetRenderer();r.ShowUI();r.BindEvents()};q.prototype.EndLife=function(){SiebelAppFacade.EdetailerPlayerPM.superclass.EndLife.call(this)};function b(){var r={};r.async=true;r.scope=this;r.npr=true;r.selfbusy=true;r.cb=function(){l.call(this);var s=this.GetRenderer();s.ShowSelection();s.CanInvokeNavBar(this)};this.ExecuteMethod("InvokeMethod","GotoPreviousSet","",r)}function n(){var r={};r.async=true;r.scope=this;r.npr=true;r.selfbusy=true;r.cb=function(){l.call(this);var s=this.GetRenderer();s.ShowSelection();s.CanInvokeNavBar(this)};this.ExecuteMethod("InvokeMethod","GotoNextSet","",r)}function a(){n.call(this)}function j(){b.call(this)}function f(r){this.SetProperty("detailerMenuBar",r,true)}function m(r){this.SetProperty("detailerThreadBar",r,true)}function p(u){var t=this.Get("GetRecordSet")[this.Get("GetSelection")];var v=t["Parent MP Id"];var s=SiebelApp.S_App.GetService("LS PCD Service");var x=SiebelApp.S_App.NewPropertySet();var r=SiebelApp.S_App.NewPropertySet();x.SetProperty("Parent MP Id",v);x.SetProperty("Content File",u);if(s){r=null;var w={};w.async=true;w.npr=false;w.selfbusy=true;w.scope=this;w.cb=function(){r=arguments[2]};s.InvokeMethod("navigateToItem",x,w)}}function h(){var t=SiebelApp.S_App.NewPropertySet();var s=new Date();var r=(s.getMonth()+1)+"/"+s.getDate()+"/"+s.getFullYear()+" "+s.getHours()+":"+s.getMinutes()+":"+s.getSeconds();SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM().SetProperty("hotspotRelatedStartTime",r)}function e(A){var r=SiebelApp.S_App.NewPropertySet();var x=SiebelApp.S_App.GetService("LS PCD Service");var s=new Date();hotspotRelatedEndTime=(s.getMonth()+1)+"/"+s.getDate()+"/"+s.getFullYear()+" "+s.getHours()+":"+s.getMinutes()+":"+s.getSeconds();var w=SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).Get("hotspotRelatedStartTime");var v=this.Get("GetRecordSet")[this.Get("GetSelection")];var z=v.Id;var u=v["Parent MP Id"];var t=v["Parent MP Name"];r.SetProperty("MpiId",z);r.SetProperty("ParentMPId",u);r.SetProperty("ItemName",A);r.SetProperty("StartTime",w);r.SetProperty("ParentMPName",t);r.SetProperty("EndTime",hotspotRelatedEndTime);r.SetProperty("LitFileExt",v.LitFileExt);r.SetProperty("LitFileRev",v.LitFileRev);r.SetProperty("LiteratureId",v["Literature Id"]);r.SetProperty("ThumbnailExtension",v["Thumbnail Extension"]);r.SetProperty("ThumbnailId",v["Thumbnail Id"]);r.SetProperty("ThumbnailRevId",v["Thumbnail Rev Id"]);r.SetProperty("LastUpdatedRec",z);r.SetProperty("Mode","INSERT");
if(x){outPropSet=null;var y={};y.async=true;y.npr=false;y.selfbusy=true;y.scope=this;y.cb=function(){outPropSet=arguments[2]};x.InvokeMethod("LoghotspotMsgPlanResponse",r,y)}}return q}());return"SiebelAppFacade.EdetailerPlayerPM"})};