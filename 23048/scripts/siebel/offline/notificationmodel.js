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
if(typeof(SiebelApp.S_App.BCBroker)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.BCBroker");SiebelApp.S_App.BCBroker=(function(){var f=SiebelApp.Constants;var i=SiebelApp.Offlineconstants;var h=SiebelJS.Dependency("SiebelApp.Utils");var c=i.get("SAVE_BC_STATE_ALL");var b=i.get("SAVE_BC_STATE_NONE");var a;a=function(){var q=0;var r=null;var j=null;var m="";var l=-1;var n=null;var o=false;var s=[];var p=0;var k={};this.GetFieldMap=function(){return k};this.AddReference=function(){return ++q};this.SetGenerateNotifyInfo=function(t){o=t};this.GenerateNotifyInfo=function(t){return o};this.GetNumOfRefs=function(){return q};this.RemoveReference=function(){return --q};this.GetView=function(){return r};this.SetView=function(t){r=t};this.GetBC=function(){return j};this.SetBC=function(t){j=t};this.SetBCId=function(t){m=t};this.GetBCId=function(){return m};this.GetNotifyArray=function(){return s};this.ResetNotifyArray=function(){s=[]};this.AddToNotifyArray=function(t){s.push(t)};this.IsMarkedRemove=function(){return p};this.MarkToRemove=function(t){p=t};this.AddMarkedToRmCnt=function(){p++};this.GetNotComp=function(){return n};this.SetNotComp=function(t){n=t};this.GetNotIdComp=function(){return l};this.SetNotIdComp=function(t){l=t};this.ReSetNotIdComp=function(){l=-1}};a.prototype.EndLife=function(){this.GetBC().UnRegNotifyObj(this.GetNotIdComp());this.SetBC(null);this.ReSetNotIdComp();this.SetNotIdComp(-1);this.SetNotComp(null);this.EnableGenerateNotifyInfo(false)};a.prototype.Initialize=function(j,m,l){this.SetView(j);this.SetBC(m);m.AddRef();this.SetBCId(m.GetVarName());this.SetNotComp(new SiebelApp.S_App.BCBrokerNotify(this));this.SetNotIdComp(m.RegNotifyObj(this.GetNotComp(),l));var k=this.GetNotIdComp();m.SetWorkSetSizeX(k,1,false,l);m.WSHomeX(this.GetNotIdComp(),l)};a.prototype.GetObjInfo=function(j,k){g.call(this,j);$.callback(this,function(){this.EnableGenerateNotifyInfo(true)})};a.prototype.GetDataObjInfo=function(){};a.prototype.GetNewFieldsObjInfo=function(){};a.prototype.GetRecordArraysObjInfo=function(){};a.prototype.GetDefaultFieldObjInfo=function(){};function g(k){if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().StartTime("BCBroker.GetOMObjInfo")}var m=this.GetBC().GetFieldMap();var l=this.GetBC();for(var j in m){if(m[j]){this.GetFieldMap()[j]=m[j].index}}if(l.HasAssocList()){k.SetProperty(i.get("SWE_PROP_HAS_ASSOC"),"1")}if(l.CanAssociate()){k.SetProperty(i.get("SWE_PROP_CAN_ASSOC"),"1")}if(l.IsInQueryState()){k.SetProperty(i.get("SWE_PROP_IS_IN_QUERY"),"1")}if(l.IsCommitPending()){k.SetProperty(f.get("SWE_PROP_IS_COMMIT"),"1")}if(l.IsDeleteRecordPending()){k.SetProperty(i.get("SWE_PROP_IS_DELETE"),"1")}if(l.IsInsertPending()){k.SetProperty(i.get("SWE_PROP_IS_NEW_REC_PEND"),"1")}l.CanDelete();$.callback(this,function(n){var o=n.retVal;if(!o){k.SetProperty(i.get("SWE_PROP_CAN_DELETE"),"1")}if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().EndTime("BCBroker.GetOMObjInfo")}})}a.prototype.StringToTokenArray=function(){};a.prototype.GetBCStateShortName=function(){};a.prototype.CanInvokeMethod=function(){};a.prototype.SetupFields=function(){};a.prototype.SetupClientActiveFields=function(){};a.prototype.InvokeMethod=function(n,o){var s="";if(o){s=o.GetChildByType("FieldValues")}if(s){var k=s.GetProperty("ValueArray");var l=s.GetProperty("FieldArray");if(!l||!k){$.setReturnValue({err:false,retVal:null});return}var p=[];var t=[];CCFMiscUtil_StringToArray(k,p);CCFMiscUtil_StringToArray(l,t);if(t.length!==p.length){$.setReturnValue({err:false,retVal:null});return}var q=t.length;var m="";var r=this.GetBC();var j=function(u){return[t[u],p[u]]};if(n==="SetFieldSearchSpec"){if(q){m={iterations:q,execute:r.SetSearchSpec,executeScope:r,preExecute:j};$.eachAsyncOp(this,m);$.callback(this,function(u){m=null;j=null;$.setReturnValue({err:false,retVal:null})})}}else{if(n==="SetFieldValue"){if(q){m={iterations:q,execute:r.SetFieldValueX,executeScope:r,preExecute:j};$.eachAsyncOp(this,m);$.callback(this,function(u){m=null;j=null;$.setReturnValue({err:false,retVal:null})})}}}}};a.prototype.GetNotifyPropSet=function(){if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().StartTime("BCBroker.prototype.GetNotifyPropSet")}var o=false;var m;var n;var l;var j=CCFMiscUtil_CreatePropSet();var q=this.GetNotifyArray();if((q.length-this.IsMarkedRemove())===0){$.setReturnValue({err:false,retVal:j});return}this.GetBC().SaveCanMethodStates(c);var k=function(r){p=null;m=null;n=null;l=null};var p=function(w){this.GetBC().SaveBusCompStates(c);var y=0;var r=q.length;var x=[],t=0;for(var v=0;v<r;v++){var s=q[v];if(s.IsMarkedToRemove()){continue}else{x[t]=s;t++}}if(t>0){var u=0;o=true;m=function(B){var A=B.GetNotifyPropSet();var z=B.GetBasePS().GetProperty("type");if(A){if((!h.IsEmpty(z))&&(z.indexOf("SWEI")!==-1)){j.InsertChildAt(A,y);y++}else{j.AddChild(A)}A=null;delete A}};n=function(z){var A=x[z].GetRecord();if(A){if(x[z].GetNotifyType()===17){this.BCFieldValue(x[z].GetFieldName(),A,x[z].GetValPS())}else{this.BCFieldValues(A,x[z].GetValPS())}$.callback(this,function(B){if(!B.err){if(B.retVal){x[z].SetValPS(B.retVal)}m.call(this,x[z])}z++;if(z<t){n.call(this,z)}})}else{m.call(this,x[z]);z++;if(z<t){n.call(this,z)}}};n.call(this,u)}l=function(){var z=CCFMiscUtil_CreatePropSet();this.GetNotComp().SetDefaultProperty(z,true);z.SetPropertyStr("OP","bn");j.InsertChildAt(z,0);var A=CCFMiscUtil_CreatePropSet();this.GetNotComp().SetDefaultProperty(A,true);A.SetPropertyStr("OP","en");j.AddChild(A);$.setReturnValue({err:false,retVal:j});if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().EndTime("BCBroker.prototype.GetNotifyPropSet")}};if(o){$.callback(this,l)}else{l.call(this)}};$.callback(this,p)};a.prototype.ResetNotifyPropSet=function(){e.call(this)};function e(){var k;var m=this.GetNotifyArray();var j=m.length;for(var l=0;l<j;l++){k=m[l];if(k){k.EndLife();k=null;delete k}}this.ResetNotifyArray();this.MarkToRemove(0)}a.prototype.EnableGenerateNotifyInfo=function(j){this.SetGenerateNotifyInfo(j);e.call(this)};a.prototype.AddNotifyInfo=function(q,k,w,r,u,j,n){if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().StartTime("BCBroker.prototype.AddNotifyInfo")}var l,s=false;var p;if(!this.GenerateNotifyInfo()){delete w;delete r;delete u;return}if((!(q&&r))||(this.GetNotifyArray().length>1000)){}var t=this.GetBC();if(n&&n!==0){t.SaveBusCompStates(n);t.SaveCanMethodStates(n)}var o;var m;var x=function(y){v=null;o=null;m=null};var v=function(D){if(j===4){var A;var H="";var y;A=w.GetProperty("nr");y=A;var z=this.GetNotifyArray();var E=z.length;var G;if(y===-1){for(p=0;p<E;p++){l=z[p];if(l.IsMarkedToRemove()){continue}G=false;if(l.GetRecord()){G=true}else{switch(l.GetNotifyType){case 15:case 4:case 3:case 10:case 11:case 17:case 21:case 22:case 27:G=true;break;case 30:H=l.GetBasePS().GetProperty("state");if(H==="activeRow"){G=true}break;default:break}}if(G){l.SetMarkedRemoved(true);this.AddMarkedToRmCnt()}}}if(y===1||y>=1){var F=[],B=0;for(p=0;p<E;p++){l=z[p];if(l.IsMarkedToRemove()){continue
}else{F[B]=l;B++}}if(B>0){var C=0;s=true;o=function(I){var J=F[I].GetRecord();if(J&&(q===J)){if(l.GetNotifyType===17){this.BCFieldValue(GetFieldName,J,l.GetValPS())}else{this.BCFieldValues(J,l.GetValPS())}$.callback(this,function(K){if(!K.err){if(K.retVal){l.SetValPS(K.retVal)}}l.SetRecord(null);I++;if(I<B){o.call(this,I)}})}else{I++;if(I<B){o.call(this,I)}}};o.call(this,C)}}}m=function(){var I=t.GetNotifyInfo(this.GetNotIdComp());l=new SiebelApp.S_App.BCBrokerNotifyInfo(q,k,w,r,u,I,j);this.AddToNotifyArray(l);if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().EndTime("BCBroker.prototype.AddNotifyInfo")}};if(s){$.callback(this,function(){q=null;m.call(this)})}else{m.call(this)}};$.callback(this,v)};a.prototype.BCFieldValue=function(l,n,o,r){if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().StartTime("BCBroker.prototype.BCFieldValue")}var q;var j;var t;var u=[];var p=[];var m;var k;q=!n?false:true;if(!o){o=CCFMiscUtil_CreatePropSet();o.SetType("FieldValues")}t=this.GetFieldMap()[l];if(h.IsEmpty(t)&&this.GetBC().GetFieldMap()[l]){t=this.GetBC().GetFieldMap()[l].index}if(h.IsEmpty(l)||h.IsEmpty(t)){$.setReturnValue({err:false,retVal:false});return}this.GetBC().FieldValue(l,n);var v=function(w){s=null};var s=function(w){if(!w.err){j=w.retVal;if(!q&&j===null){}var x=h.IsEmpty(j)?"":j.toString();u.push(t.toString());p.push(x);m=d.call(this,u);k=d.call(this,p);o.SetProperty("FieldArray",m);o.SetProperty("ValueArray",k);$.setReturnValue({err:w.err,retVal:o})}if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().EndTime("BCBroker.prototype.BCFieldValue")}};$.callback(this,s)};a.prototype.BCFieldValues=function(s,t){if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().StartTime("BCBroker.prototype.BCFieldValues")}var v=[];var u;var m;var n;var o;var w,k=[];w=this.GetBC().GetFieldList();if(!t){t=CCFMiscUtil_CreatePropSet();t.SetType("FieldValues")}var l=w.length;if(l>0){u=!s?false:true;var q=0;for(var r=0;r<l;r++){o=SiebelApp.S_App.LookupStringCache(w[r]);if(h.IsEmpty(o)){continue}else{k[q]=o;q++}}var p={};p.iterations=q;p.preExecute=function(j){return[k[j],s]};p.execute=this.GetBC().FieldValue;p.executeScope=this.GetBC();p.postExecute=function(j){if(!j.err){m=j.retVal;if(!u&&m===null){}var y=h.IsEmpty(m)?"":m.toString();v.push(y)}};$.eachAsyncOp(this,p);$.callback(this,function(j){if(!j.err){n=d.call(this,v);t.SetProperty("ValueArray",n);$.setReturnValue({err:false,retVal:t});if(SiebelApp.S_App.GetTimer()){SiebelApp.S_App.GetTimer().EndTime("BCBroker.prototype.BCFieldValues")}}})}else{$.setReturnValue({err:false,retVal:false})}var x=function(j){p=null}};function d(m){var l="";for(var k=0;k<m.length;k++){var j=m[k].length;j=j.toString();l=l+j.concat("*",m[k])}return l}a.prototype.AddField=function(){};a.prototype.BCCreateFieldList=function(){};a.prototype.BCActiveFieldsChanged=function(){};a.prototype.BCEnumFields=function(){};a.prototype.SetWorkSetSize=function(j,l){var k=this.GetNotIdComp();var n=this.GetBC();if(n){var m=n.GetWorkSetSize(k);if(m>=j){return}}n.SetWorkSetSizeX(k,j,null,l)};return a}())}if(typeof(SiebelApp.S_App.BCBrokerNotify)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.BCBrokerNotify");SiebelApp.S_App.BCBrokerNotify=(function(){var e=SiebelApp.Constants;var c=SiebelJS.Dependency("SiebelApp.Utils");var b=SiebelApp.Offlineconstants;var a=b.get("SAVE_BC_STATE_ALL");var d=b.get("SAVE_BC_STATE_NONE");var f=function(g){var h=g;var i=[];var j=[];this.RegBusCompArray=function(k){i.push(k)};this.RegNtfyIdArray=function(k){j.push(k)};this.GetRegBcArray=function(){return i};this.GetNtfyIdArray=function(){return j};this.GetBroker=function(){return h}};f.prototype.Add=function(h,g){this.RegBusCompArray(h);this.RegNtfyIdArray(g)};f.prototype.Remove=function(m,l){var k=this.GetRegBcArray();var h=k.length;var g=this.GetNtfyIdArray();for(var j=0;j<h;j++){if((k[j]===m)&&(g[j]===l)){k.splice(j,1);g.splice(j,1);return true}}return false};f.prototype.SetDefaultProperty=function(j,i){var h=this.GetBroker();j.SetPropertyStr("bc",h.GetBCId());var g=h.GetView();if(!c.IsEmpty(g)){j.SetPropertyStr("Zone",g)}if(!i){var k=h.GetBC().GetActiveRow();j.SetPropertyStr("ar",k)}};f.prototype.NotifyBeginQuery=function(){var k=CCFMiscUtil_CreatePropSet();var l;var h=this.GetBroker();this.SetDefaultProperty(k,null);k.SetPropertyStr("OP","bq");l=h.GetBC().GetFieldList();var m=l.length;var g;for(var j=0;j<m;j++){g=SiebelApp.S_App.LookupStringCache(l[j]);if(c.IsEmpty(g)){continue}this.NotifyNewQuerySpec(g)}};f.prototype.NotifyChangeSelection=function(){var h=CCFMiscUtil_CreatePropSet();var g=this.GetBroker();this.SetDefaultProperty(h,null);h.SetPropertyStr("OP","cs");g.AddNotifyInfo(null,null,h,null,null,2)};f.prototype.NotifyDeleteWorkSet=function(k,g,j){var i=CCFMiscUtil_CreatePropSet();var h=this.GetBroker();this.SetDefaultProperty(i,null);i.SetPropertyStr(e.get("SWE_PROP_BC_OPERATION"),e.get("SWE_PROP_BC_NOTI_DELETE_WORKSET"));i.SetPropertyStr("index",k);i.SetPropertyStr("nr",g);h.AddNotifyInfo(j,null,i,null,null,4)};f.prototype.NotifyDeleteRecord=function(j,i){var h=CCFMiscUtil_CreatePropSet();var g=this.GetBroker();this.SetDefaultProperty(h,null);h.SetProperty(e.get("SWE_PROP_BC_OPERATION"),e.get("SWE_PROP_BC_NOTI_DELETE_RECORD"));h.SetProperty("bSetup",j?true:false);h.SetProperty("bUp",i?true:false);g.AddNotifyInfo(null,null,h,null,null,3,(j)?0:1)};f.prototype.NotifyNewSelIds=function(h){var k=CCFMiscUtil_CreatePropSet();var l="r";var g=this.GetBroker();this.SetDefaultProperty(k,null);k.SetPropertyStr("OP","nsi");for(var j=0;j<h.length;j++){l="r";l=l.concat(j);k.SetPropertyStr(l,h[j])}g.AddNotifyInfo(null,null,k,null,null,25)};f.prototype.NotifyEndQuery=function(){};f.prototype.NotifyExecute=function(){var i=CCFMiscUtil_CreatePropSet();var h=this.GetBroker();this.SetDefaultProperty(i,null);var g=h.GetBC().GetSearchExpr();var j=h.GetBC().GetSortSpec();i.SetPropertyStr("OP",e.get("SWE_PROP_BC_NOTI_EXECUTE"));i.SetPropertyStr("srt",j);i.SetPropertyStr("s",g);h.AddNotifyInfo(null,name,i,null,null,7)};f.prototype.NotifyGeneric=function(k,h){var j=CCFMiscUtil_CreatePropSet();var i;var g=this.GetBroker();i=(k.indexOf("SWEI")===-1||k.indexOf("SWEA")===-1);this.SetDefaultProperty(j,i);j.SetPropertyStr("OP","g");j.SetPropertyStr("type",k);h=SiebelApp.OfflineUtils.NotifyValueArray(h);j.SetPropertyStr("ArgsArray",h);g.AddNotifyInfo(null,null,j,null,null,8)};f.prototype.NotifyInsertWorkSet=function(h,j){var i=CCFMiscUtil_CreatePropSet();var g=this.GetBroker();this.SetDefaultProperty(i);i.SetProperty(e.get("SWE_PROP_BC_OPERATION"),e.get("SWE_PROP_BC_NOTI_INSERT_WORKSET"));i.SetProperty("index",h);g.AddNotifyInfo(j,null,i,null,null,11)};f.prototype.NotifyInsertWSFieldVals=function(){};f.prototype.NotifyLongOpProgress=function(){};f.prototype.NotifyNewActiveFieldList=function(){};f.prototype.NotifyNewActiveRow=function(){var h=CCFMiscUtil_CreatePropSet();var g=this.GetBroker();this.SetDefaultProperty(h,null);h.SetPropertyStr("OP","nar");g.AddNotifyInfo(null,null,h,null,null,15,a)};
f.prototype.NotifyNewData=function(h){var g=this.GetBroker();var j=c.IsEmpty(h);var k=j?null:h;var i=CCFMiscUtil_CreatePropSet();this.SetDefaultProperty(i,null);if(k){bcState="SAVE_BC_STATE_CANDELETE | SAVE_BC_STATE_ROWNUMINFO";i.SetPropertyStr("f",k);i.SetPropertyStr("OP","nfd")}else{i.SetPropertyStr("OP","nd")}g.AddNotifyInfo(null,k,i,null,null,16)};f.prototype.NotifyNewDataWS=function(k){var i=this.GetBroker();if(c.IsEmpty(k)){return}var h=i.GetBC();var l=CCFMiscUtil_CreatePropSet();this.SetDefaultProperty(l,null);l.SetPropertyStr("OP","ndw");l.SetPropertyStr("f",k);var j=h.GetActiveRow();var g=h.FindWorkSet(j);i.AddNotifyInfo(g,k,l,null,null,17)};f.prototype.NotifyNewFieldList=function(){};f.prototype.NotifyNewQuerySpec=function(j){var k=CCFMiscUtil_CreatePropSet();var i=this.GetBroker();var h=i.GetBC();var g=h.GetFieldSearchSpec(j);this.SetDefaultProperty(k,null);k.SetPropertyStr("op","nfq");k.SetPropertyStr("f",j);k.SetPropertyStr("v",g);i.AddNotifyInfo(null,j,k,null,null,23)};f.prototype.NotifyNewPrimary=function(){};f.prototype.NotifyNewRecord=function(g){var i=CCFMiscUtil_CreatePropSet();var h=this.GetBroker();this.SetDefaultProperty(i);i.SetPropertyStr(e.get("SWE_PROP_BC_OPERATION"),e.get("SWE_PROP_BC_NOTI_NEW_RECORD"));i.SetPropertyStr("bInsertBefore",g?"true":"false");h.AddNotifyInfo(null,null,i,null,null,e.get("SWE_PROP_BC_NOTI_NEW_RECORD"),1)};f.prototype.NotifyNewRecordData=function(){var h=CCFMiscUtil_CreatePropSet();var g=this.GetBroker();this.SetDefaultProperty(h);h.SetPropertyStr(e.get("SWE_PROP_BC_OPERATION"),e.get("SWE_PROP_BC_NOTI_NEW_RECORD_DATA"));g.AddNotifyInfo(null,null,h,null,null,e.get("SWE_PROP_BC_NOTI_NEW_RECORD_DATA"))};f.prototype.NotifyNewRecordDataWS=function(){var j;var i=this.GetBroker();var h=i.GetBC();var k=CCFMiscUtil_CreatePropSet();this.SetDefaultProperty(k);k.SetPropertyStr(e.get("SWE_PROP_BC_OPERATION"),e.get("SWE_PROP_BC_NOTI_NEW_RECORD_DATA_WS"));j=h.GetActiveRow();var g=h.FindWorkSet(j);i.AddNotifyInfo(g,null,k,null,null,e.get("SWE_PROP_BC_NOTI_NEW_RECORD_DATA_WS"))};f.prototype.NotifyNewSelection=function(i){var g=this.GetBroker();var h=CCFMiscUtil_CreatePropSet();this.SetDefaultProperty(h,null);h.SetPropertyStr("OP","ns");h.SetPropertyStr("bSelected",!!i);g.AddNotifyInfo(null,null,h,null,null,24)};f.prototype.NotifyPageRefresh=function(){};f.prototype.NotifyScrollData=function(j,h){var i=CCFMiscUtil_CreatePropSet();var g=this.GetBroker();this.SetDefaultProperty(i,null);i.SetPropertyStr("OP","sa");i.SetPropertyStr("bUp",j?true:false);i.SetPropertyStr("scrollAmount",h);g.AddNotifyInfo(null,null,i,null,null,28)};f.prototype.NotifySelModeChange=function(i){var h=CCFMiscUtil_CreatePropSet();var g=this.GetBroker();this.SetDefaultProperty(h,null);h.SetPropertyStr("OP","smc");h.SetPropertyStr("bInMultiSelMode",i?true:false);g.AddNotifyInfo(null,null,h,null,null,"SWE_BCNOTIFY_SELMODECHANGE")};f.prototype.NotifyStateChanged=function(h,j){var i=CCFMiscUtil_CreatePropSet();var g=this.GetBroker();this.SetDefaultProperty(i,null);i.SetPropertyStr("OP","sc");i.SetPropertyStr("state",h);i.SetPropertyStr("value",j);g.AddNotifyInfo(null,h,i,null,null,"SWE_BCNOTIFY_STATECHANGED")};f.prototype.NotifyTotalsChanged=function(){};return f}())}if(typeof(SiebelApp.S_App.BCBrokerNotifyInfo)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.BCBrokerNotifyInfo");SiebelApp.S_App.BCBrokerNotifyInfo=(function(){function a(j,f,n,k,m,q,e){var l=0;var r=0;var d=0;var i=j;var h=f;var g=n;var c=k;var b=m;var p=e;var o=false;if(q){l=q.GetBegRow();r=q.GetCurrRow();d=q.GetSize()}if(!n){n=CCFMiscUtil_CreatePropSet()}n.SetPropertyStr("br",l);n.SetPropertyStr("cr",r);n.SetPropertyStr("l",d);this.SetRecord=function(s){i=s};this.IsMarkedToRemove=function(){return o};this.SetMarkedRemoved=function(s){o=s};this.GetValPS=function(s){return c};this.SetValPS=function(s){c=s};this.GetFieldPS=function(s){return b};this.GetRecord=function(){return i};this.GetNotifyType=function(){return p};this.GetFieldName=function(){return h};this.GetBasePS=function(){return g};this._EndLife=function(){h=null;g=null;c=null;b=null;p=null}}a.prototype.EndLife=function(){var c=this.GetBasePS();var d=this.GetValPS();var b=this.GetFieldPS();if(c){delete c}if(d){delete d}if(b){delete b}this.SetRecord(null);this._EndLife()};a.prototype.GetNotifyPropSet=function(e){var c=this.GetBasePS();if(this.IsMarkedToRemove()){return}var d=this.GetValPS();if(d){c.AddChild(d)}var b=this.GetFieldPS();if(b){c.AddChild(b)}return(c?c:null)};return a}())}if(typeof(SiebelApp.S_App.NotifyInfo)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.NotifyInfo");SiebelApp.S_App.NotifyInfo=(function(){function a(){var h=0;var c={};var d={};var i={};var g=0;var b=null;var f=1;var e=[];this.SetBusCompNotify=function(j){b=j};this.GetBusCompNotify=function(j){return b};this.SetBegRow=function(k,j){h=k;if(j){c[j]=k}};this.GetAppletArray=function(){return e};this.SetAppletArray=function(j){if(e.indexOf(j)===-1){e.push(j);if(!c[j]){c[j]=0}if(!d[j]){d[j]=0}if(!i[j]){i[j]=1}}};this.GetBegRow=function(k){if(k){return(c[k])}for(var j in c){if(h>c[j]){h=c[j]}}return h};this.SetCurrRow=function(k,j){g=k;if(j){d[j]=k}};this.GetCurrRow=function(j){if(j){return(d[j])}return g};this.SetSize=function(l,k){f=l;if(k){i[k]=l}else{var m=e.length;for(var j=0;j<m;j++){i[e[j]]=l}}};this.GetSize=function(j){if(j){return(i[j])}return f}}return a}())};