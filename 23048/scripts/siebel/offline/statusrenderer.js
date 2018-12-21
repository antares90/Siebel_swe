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
if(typeof(SiebelAppFacade.DMToolbarRenderer)==="undefined"){Namespace("SiebelAppFacade.DMToolbarRenderer");define("siebel/offline/DMToolbarRenderer",["siebel/basephyrenderer","siebel/hamburgernav"],function(){SiebelAppFacade.DMToolbarRenderer=(function(){var o=SiebelJS.Dependency("SiebelApp.Utils"),k=SiebelApp.Constants,h=SiebelApp.Offlineconstants,i=SiebelApp.OfflineUtils,g=SiebelApp.S_App,l=g.OfflineLocaleObject,d={FullDownLoad:"stati statusFullDownLoad",FullDownLoadFailed:"stati statusFullDownLoadFailed",SyncPendng:"stati statusSyncPending",IncDataDownLoad:"stati statusIncDataDownLoad",IncDownLoadFailed:"stati statusIncDownLoadFailed",UpSync:"stati statusUpSync",UpSyncFailed:"stati statusUpSyncFailed",UpSyncDataConflict:"stati statusSyncPendingSec",UpSyncDone:"stati statusSyncPendingSec",UpSyncOnly:"stati statusUpSyncOnly",UpSyncISync:"stati statusUpSyncISync",GoOnline:"stati statusGoOnline",NoStatus:"stati"},n,m,r;function q(v){var u=this,t=v;u.GetPM=function(){return t};u.AttachPMBinding("SyncStatus",a);u.AttachPMBinding("OfflineProcessStatus",j);SiebelAppFacade.DMToolbarRenderer.superclass.constructor.apply(this,arguments)}SiebelJS.Extend(q,SiebelAppFacade.BasePR);function a(t,v){var u=r;if(!p(u)){if(v==="DownLoadFailed"){if(u.find(".statusFullDownLoad").length){v="FullDownLoadFailed"}else{if(u.find(".statusIncDataDownLoad").length){v="IncDownLoadFailed"}else{if(u.find(".statusUpSync").length){v="UpSyncFailed"}}}}if(d[v]){u.find(".stati").removeClass().addClass(d[v])}if(o.IsTrue(g.IsAutoOn())){u.find(".stati").attr({ot:"SyncStatus",rn:v,un:v})}}}function j(){$(window).trigger("resize")}function f(){if(!p(r)){var u=this.GetPM().Get("Mode"),t=r.find(".offline-hb-nav-btn");if(u){t.switchClass("online-icon","offline-icon")}else{t.switchClass("offline-icon","online-icon")}t.find("span:first-child").addClass("stati")}}function c(){var t=this.GetPM();return t.Get("Mode")}function s(){if(c.call(this)){var u=this,v=u.GetPM().Get("autoAttributes"),t=o.IsTrue(g.IsAutoOn()),w={uploadGoOnlinePlaceholder:'<span class="online-icon"><span class="stati-fix statusGoOnline"></span></span>'+l.GetLocalString("IDS_CLIENT_UPLOAD_GO_ONLINE"),syncStayOfflinePlaceholder:'<span class="offline-icon"><span class="stati-fix statusUpSyncISync"></span></span>'+l.GetLocalString("IDS_CLIENT_SYNC_STAY_OFFLINE"),uploadStayOfflinePlaceholder:'<span class="offline-icon"><span class="stati-fix statusUpSyncOnly"></span></span>'+l.GetLocalString("IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE")};$.each(w,function(z,x){var y=b.call(u,z).html(x);if(t){y.attr({ot:"Btn",rn:v[z],un:v[z]})}})}}function p(t){return !(t&&t.length)}function b(u){var t=this.GetPM().Get(u);return $("#"+t)}function e(v){if(!v){SiebelJS.Log("Error -> No placeholder for offline drop menu button.");return}var u=this.GetPM().Get("Mode"),t=u?"siebui-nav-hb-gooffline-visible":"siebui-nav-hb-gooffline-invisible";return new SiebelAppFacade.HBNavPlugin({id:v,hbClass:"offline-hb-nav-btn",visibleClass:t,hiddenClass:"siebui-nav-hb-gooffline-invisible"})}q.prototype.Init=function(){var t=this,u=t.GetPM(),v=u.Get("offlineOptionsPlaceholder");n=b.call(t,"offlineLogPlaceholder");r=b.call(t,"offlineOptionsPlaceholder");m=e.call(t,v);m.Manage()};q.prototype.ShowUI=function(){var t=this,v=t.GetPM().Get("IsOfflineModeEnabled");if(!p(n)&&window.localStorage.getItem("LogEvt")){n.addClass("siebui-dm-log-btn").append('<a id="offline_dm_log" href="javascript:void(0)" tabindex="-1" title="'+l.GetLocalString("IDS_CLIENT_LOG")+'"></a>')}s.call(t);if(!p(r)&&v){f.call(t);if(o.IsTrue(g.IsAutoOn())){r.attr({ot:"Btn",rn:"GoOffline",un:"GoOffline"});var u=t.GetPM(),x=u.Get("Mode")?"Offline":"Online",w=u.Get("SyncStatus");r.find(".stati").attr({ot:"SyncStatus",rn:w,un:w});r.find("button").attr({ot:"DMMode",rn:x,un:x})}}};q.prototype.BindEvents=function(){var t=this,w=t.GetPM(),x=w.Get("IsOfflineModeEnabled"),y=w.Get("offlineOptionCfg"),u,v=function(A){var z=A.data;w.OnControlEvent("OnOfflineButtonClick",z.type,z.status)};if(!p(n)){n.on("click",$.proxy(w,"OnControlEvent","OnGotoDMLogClick"))}if(!p(r)&&x){u=r.find(".offline-hb-nav-btn");if(c.call(t)){b.call(t,"uploadGoOnlinePlaceholder").on("click",y.uploadGoOnline,v);b.call(t,"syncStayOfflinePlaceholder").on("click",y.syncStayOffline,v);b.call(t,"uploadStayOfflinePlaceholder").on("click",y.uploadStayOffline,v);u.on("click",function(){$(this).eq(0).focus()})}else{u.on("click",y.uploadGoOnline,v)}}};return q}());return"SiebelAppFacade.DMToolbarRenderer"})};