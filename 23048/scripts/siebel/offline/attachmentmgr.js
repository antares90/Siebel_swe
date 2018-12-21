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
if(typeof(SiebelApp.AttachmentMgr)==="undefined"){SiebelJS.Namespace("SiebelApp.AttachmentMgr");SiebelApp.AttachmentMgr=(function(){var z=new m();var y=SiebelApp.OfflineCacheConfig;var r=SiebelApp.Offlineconstants;var w=SiebelJS.Dependency("SiebelApp.Utils");var j=SiebelApp.OfflineAppSettings;var t=SiebelApp.OfflineUtils;var f=["BCName","Id","saf","Status","Timestamp","localFileName","displayFileName","isUnzip"];var i=["Name","FileTable","Prefix"];var p="AttachmentList";var a="AttachmentBCs";var B={};var u={};var b=30000;var g=-1;var o=g;var h=null;var A=0;var n=false;var k="OK";var e="New";var x="ClientNew";var c="Error";var v="FileNotFound";var s=null;var d=false;function m(){var D;E=function E(){return D};E.prototype=this;D=new E();D.constructor=E;return D}function C(D){t.CcfLogEvent([r.get("LOG_EVT_COMMON"),1,1,1,D])}m.prototype.IsOfflineAttEnabled=function(){return j.GetOfflineAttEnabled()};m.prototype.DownloadAllAttachments=function(){var D=localStorage&&localStorage.getItem("isAdfmContainer");if(!D){SiebelApp.AttachmentMgr.FinishAndLogoff();return}C("+++DownloadAllAttachments+++");o=0;n=false;A=(new Date()).getTime();if(!SiebelApp.AttachmentMgr.IsOfflineAttEnabled()){C("Offline attachment is not enabled ... finish.");SiebelApp.AttachmentMgr.FinishAndLogoff();return}b=30000*u.length;for(var G in u){var E=u[G];if(E.status===e){E.ctxid="";if(SiebelApp.AttachmentMgr.DownloadAttachment(E)){o++}}}if(o===0){C("No attachments to be downloaded ... finish.");SiebelApp.AttachmentMgr.FinishAndLogoff()}else{var F=setInterval(function(){if(SiebelApp.AttachmentMgr.IsFinished()||(o==g)){clearInterval(F)}else{var H=(new Date()).getTime();if(H-A>b){n=true;clearInterval(F);C("Attachment download ... is aborted.");SiebelApp.AttachmentMgr.FinishAndLogoff()}}},3000)}};m.prototype.DownloadAttachment=function(E){C("+++DownAtt+++"+JSON.stringify(E));var G=SiebelApp.S_App.GenerateSrvrReq("GetOfflineData");var D=w.DecodeFromQueryString(G);D.SetProperty(consts.get("SYNC_NODE_ID"),SiebelApp.BrowserCacheMgr.GetSyncNodeId());var F=E;if(!F.seq){F.seq=0}D.SetProperty("fid",F.fid);D.SetProperty("saf",F.saf);D.SetProperty("ctxid",F.ctxid?F.ctxid:"");D.SetProperty("seq",F.seq);D.SetProperty("getFile","1");G=w.EncodeToQueryString(D,false);G=SiebelApp.S_App.GetPageURL()+consts.get("SWE_ARG_START")+G;C(">>> Download attachment ["+F.saf+"], ctxid=["+F.ctxid+"], seq=["+F.seq+"]");SiebelApp.AjaxRequestMgr.Get(G,SiebelApp.AttachmentMgr.ProcessAttachmentResponse);return true};m.prototype.FinishAttachment=function(G,F,D){var E=u[G];SiebelApp.AttachmentMgr.SetAttachmentStatus(G,F,D);E.fileEntry=null;o--;if(SiebelApp.AttachmentMgr.IsFinished()){C("All attachments download ... is done.");SiebelApp.AttachmentMgr.FinishAndLogoff()}};m.prototype.FinishAndLogoff=function(){C("----attachment finishAndLogoff----");if(h){h.call(this);h=null}n=false};m.prototype.SetPostDownloadAction=function(D){h=D};m.prototype.ResetDownloadStatus=function(){o=g;h=null;n=false};m.prototype.IsFinished=function(){return((o===0)||n)};m.prototype.ShowFile=function(D){var F;var E=[];E.push({IsField:true,FieldName:"Id",Val:"'"+D+"'",Oper:"="});F=SiebelApp.SqlBuilder.SelectRecord(p,E);SiebelApp.BrowserCacheMgr.Execute(F.selectQuery,F.valList,true);$.callback(this,function(I){$.setReturnValue({err:false});if(!I.err){var G=I.retVal;if(G&&G.length){var J=G[0];var K=J.localFileName;var H=J.displayFileName;SiebelApp.MobileFileMgr.Open({filename:K,displayFileName:H})}}})};m.prototype.SaveToLocalFile=function(F,E,G){var D=F.ftable+"_"+F.fid+"_"+F.frev+"."+F.fext;C("Attachment::SaveToLocalFile:"+D);var H=G;SiebelApp.MobileFileMgr.Write({filename:D,content:H,isComplete:E,success:function(){SiebelApp.AttachmentMgr.FileWriteDone(F.fid,E,k)},error:function(){SiebelApp.AttachmentMgr.FileWriteDone(F.fid,E,c)}});return true};m.prototype.FileWriteDone=function(J,F,E){C(">>>>>> AndroidFilewriteDone= "+J+" \n");if(u[J]){var G=u[J];var H=G.fext;var D=G.ftable+"_"+G.fid+"_"+G.frev+"."+G.fext;var I=G.displayFileName;if(F==="1"){C(">>> Completed attachment ["+H+"] download.");SiebelApp.AttachmentMgr.FinishAttachment(J,H,E);if(H=="zip"&&G.isUnzip=="Y"){SiebelApp.MobileFileMgr.Unzip({filename:D,pathname:D})}}else{G.seq=G.seq+1;SiebelApp.AttachmentMgr.DownloadAttachment(G)}}return this};m.prototype.SaveAttachment=function(J){var I=J.GetChildCount();if(!I||J.GetType()!=="attachment"){return false}for(var H=0;H<I;H++){var M=J.GetChild(H);var D=M.GetType();if(D==="att"){var E=M.GetProperty("fid");var N=M.GetProperty("saf");var G=M.GetProperty("err");var Q=M.GetProperty("seq");var F=M.GetProperty("ctxid");var P=M.GetProperty("eof");var L=M.GetProperty("dat");var O;if(G!==k){C(">>> Error write attachment ["+N+"]:"+G);SiebelApp.AttachmentMgr.FinishAttachment(E,N,G);continue}O=L;Q=parseInt(Q);C(">>> Got data chunk for ["+N+"], seq="+Q+", ctxid="+F+", eof="+P);var K=u[E];if(!K){C(">>> Attachment not found on client ["+E+"].");continue}K.ctxid=F;K.seq=Q;SiebelApp.AttachmentMgr.SaveToLocalFile(K,P,O)}else{C(">>>>>> Unexpected type in attachment package: "+D)}}};m.prototype.ProcessAttachmentResponse=function(E){C("Processing attachment response...");var F=CCFMiscUtil_CreatePropSet();F.DecodeFromString(E);A=(new Date()).getTime();var D=F.GetChildCount();if(!D){C(">>> Got an empty attachment response.");return}if(F.GetType()==="attachment"){SiebelApp.AttachmentMgr.SaveAttachment(F)}};m.prototype.InitAttachmentList=function(){if(d){return}d=true;var E=SiebelApp.SqlBuilder.CreateTable(p,f);SiebelApp.BrowserCacheMgr.CreateTable(E);E=SiebelApp.SqlBuilder.CreateTable(a,i);SiebelApp.BrowserCacheMgr.CreateTable(E);E=SiebelApp.SqlBuilder.SelectRecord(a);SiebelApp.BrowserCacheMgr.Execute(E.selectQuery,E.valList,true);$.callback(this,function(I){$.setReturnValue({err:false});if(!I.err){var F=I.retVal;if(F&&F.length){var H=F.length;for(var G=0;G<H;G++){rec=F[G];bcName=rec.Name;B[bcName]=rec}}}});var D=[];D.push({FieldName:"Id",Val:""});E=SiebelApp.SqlBuilder.SelectRecord(p);SiebelApp.BrowserCacheMgr.Execute(E.selectQuery,E.valList,true);$.callback(this,function(K){$.setReturnValue({err:false});if(!K.err){var J=K.retVal;if(J&&J.length){var H=J.length;for(var L=0;L<H;L++){var I=J[L];var G=I.Id;var N=I.BCName;var F=B[N];if(!F){C("Error, attachment BC info is not found for ["+N+"]");continue}var M={ftable:F.FileTable,fid:I.Id,frev:null,fsize:null,fname:null,fext:null,saf:I.saf,ctxid:"",status:I.Status,bcName:N};u[G]=M}for(var N in B){SiebelApp.AttachmentMgr.LoadAttachmentBC(N)}}}})};m.prototype.LoadAttachmentBC=function(K){var D=B[K];var G=D.Prefix;var I=G+"FILENAME";var L=G+"FILEEXT";var F=G+"FILEREV";var H=G+"FILESIZE";var J=["Id",I,L,H,F];var E=SiebelApp.SqlBuilder.SelectRecord(K,null,J);SiebelApp.BrowserCacheMgr.Execute(E.selectQuery,E.valList);$.callback(this,function(R){$.setReturnValue({err:false});if(!R.err){var O=R.retVal;if(O&&O.length){C(">>> There are ["+O.length+"] attachment records in BC "+K);var Q=O.length;for(var P=0;P<Q;P++){var S=O[P];var M=S.ID;var N=u[M];if(!N){C("Ooops, attachment is not listed for ["+K+"], with Id=["+M+"]");
continue}N.fname=S[I];N.fext=S[L];N.frev=S[F];N.fsize=S[H]}}}})};m.prototype.GetAttachmentStatus=function(E){var D=u[E];if(D!==undefined){return D.status}return"Unknown"};m.prototype.SetAttachmentStatus=function(I,G,E){var D;var H=((new Date()).toLocaleString());var F=u[I];D=SiebelApp.SqlBuilder.UpdateRecord(p,["Status","Timestamp"],[E,H],"saf",G);SiebelApp.BrowserCacheMgr.UpdateRecord(D,G);if(F!==undefined){F.status=E}};m.prototype.UpdateAttachment=function(G,E){var D;var F=((new Date()).toLocaleString());D=SiebelApp.SqlBuilder.UpdateRecord(p,["saf","Status","Timestamp"],[E.saf,E.status,F],"Id",G);SiebelApp.BrowserCacheMgr.UpdateRecord(D,G)};m.prototype.DeleteAttachment=function(E,F){C("DeleteAttachment for "+E+": "+F);for(var H in F){var D=u[H];if(!D){C("Attachment delete fid not found in cache: "+H);continue}}var G=F.join(",");G="'"+G+"'";SiebelApp.BrowserCacheMgr.Delete(p,"Id",G);for(var H in F){delete u[H]}};m.prototype.NewAttachmentList=function(L,E,R,O){var J=SiebelApp.SqlBuilder.CreateTable(a,i);SiebelApp.BrowserCacheMgr.CreateTable(J);var N=l(E);var T={};if(!(L in B)){var X=["Name","FileTable","Prefix"];var U=[L,R,N];var F={Name:L,FileTable:R,Prefix:N};C(">>> Got attachment BC :"+U);B[L]=F;SiebelApp.BrowserCacheMgr.InsertRecord(a,X,U)}var H=E.length;for(var ab=0;ab<H;ab++){T[E[ab]]=ab}var V=N+"FILENAME";var S=N+"FILEEXT";var K=N+"FILEREV";var I=N+"FILESIZE";var J=SiebelApp.SqlBuilder.CreateTable(p,f);SiebelApp.BrowserCacheMgr.CreateTable(J);var ac=O.length;for(var aa=0;aa<ac;aa++){var M=O[aa];var Z=M[T.ID];var W={ftable:R,fid:Z,frev:M[T[K]],fsize:M[T[I]],fname:M[T[V]],fext:M[T[S]],saf:"",ctxid:"",isUnzip:M[T.UNZIPONDOWNLOAD]||"N",status:e};var Q=W.ftable+"_"+W.fid+"_"+W.frev+".SAF";W.saf=Q;var P=W.ftable+"_"+W.fid+"_"+W.frev+"."+W.fext;W.localFileName=P;var Y=W.fname+(W.fext?("."+W.fext):"");W.displayFileName=Y;W.bcName=L;C(">>> New attachment record: "+M.toString());var D=u[Z];if(D===undefined||D===null){var G=[L,Z,W.saf,e,"",W.localFileName,W.displayFileName,W.isUnzip];SiebelApp.BrowserCacheMgr.InsertRecord(p,f,G);u[Z]=W}else{if(D.saf!==W.saf){u[Z]=W;SiebelApp.AttachmentMgr.UpdateAttachment(W.fid,W)}}}};m.prototype.UpdateAttachmentList=function(J,E,O,M,V){var K=l(E);var Q={};var G=E.length;for(var W=0;W<G;W++){Q[E[W]]=W}var R=K+"FileName";var P=K+"FileExt";var I=K+"FileRev";var H=K+"FileSize";if(M.length){SiebelApp.AttachmentMgr.NewAttachmentList(J,E,O,M)}var X=M.length;for(var U=0;U<X;U++){var L=M[U];var T=L[Q.Id];var S={ftable:O,fid:T,frev:L[Q[I]],fsize:L[Q[H]],fname:L[Q[R]],fext:L[Q[P]],saf:"",ctxid:"",isUnzip:L[Q.UNZIPONDOWNLOAD]||"N",status:e};S.saf=S.ftable+"_"+S.fid+"_"+S.frev+".SAF";C(">>> Got inserted file record: "+L.toString())}var Y=V.length;for(var U=0;U<Y;U++){var L=V[U];var T=L[Q.Id];var S={ftable:O,fid:T,frev:L[Q[I]],fsize:L[Q[H]],fname:L[Q[R]],fext:L[Q[P]],saf:"",ctxid:"",isUnzip:L[Q.UNZIPONDOWNLOAD]||"N",status:e};S.saf=S.ftable+"_"+S.fid+"_"+S.frev+".SAF";var N=S.ftable+"_"+S.fid+"_"+S.frev+"."+S.fext;S.localFileName=N;C(">>> Got updated file record: "+L.toString());var D=u[T];if(D===undefined||D===null){C("Unexpected update ... no attachment to be updated on the client. Adding a new one.");var F=[J,T,S.saf,e,"",S.localFileName,S.isUnzip];SiebelApp.BrowserCacheMgr.InsertRecord(p,f,F);u[T]=S}else{if(D.saf!==S.saf||D.status!==k){u[T]=S;SiebelApp.AttachmentMgr.UpdateAttachment(S.fid,S)}else{C("This attachment is already synched on client: "+S.saf+":"+S.fname)}}}};function q(H,E){var I=new String(H);var D=100;if(E!==undefined&&E!==null){D=E/2}if(I.length>2*D){var G=I.substr(0,D);var F=I.substr(I.length-D,D);return G+"..."+F}else{return I}}function l(G){var I=null;var H=G.length;for(var F=0;F<H;F++){var E=G[F];if(E.substr(E.length-8,8)!=="FILENAME"){continue}I=E.substr(0,E.length-8);for(var D=0;D<H;D++){E=G[D];if(E.substr(E.length-8,8)!=="FILESIZE"){continue}if(E.substr(0,E.length-8)===I){return I}}}return I}return z}())};