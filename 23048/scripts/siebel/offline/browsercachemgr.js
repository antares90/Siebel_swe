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
if(typeof(SiebelApp.BrowserCacheMgr)==="undefined"){Namespace("SiebelApp.BrowserCacheMgr");SiebelApp.BrowserCacheMgr=(function(){var browserCacheMgr=new BrowserCacheMgr();var offlinecacheconfig=SiebelApp.OfflineCacheConfig;var offlineconstants=SiebelApp.Offlineconstants;var consts=SiebelJS.Dependency("SiebelApp.Constants");var AjaxMgr=SiebelApp.AjaxRequestMgr;var utils=SiebelApp.Utils;var outils=SiebelApp.OfflineUtils;var clientSystem=offlineconstants.get("LOG_EVT_CLIENT_SYS");var editRecordStr=offlineconstants.get("EDITRECORD");var ninf=offlineconstants.get("NEW_VIEW_INFO");var cinf=offlineconstants.get("CREATE_VIEW_INFO");function BrowserCacheMgr(){var _instance;var _browserStorage;var _browserStoragePromise;BrowserCacheMgr=function BrowserCacheMgr(){return _instance};BrowserCacheMgr.prototype=this;_instance=new BrowserCacheMgr();_instance.constructor=BrowserCacheMgr;this.GetBrowserStorage=function(){if(_browserStorage==null){_browserStorage=SiebelApp.OfflineUtils.GetBrowserStorage();if(_browserStorage.Initialize){_browserStoragePromise=_browserStorage.Initialize(SiebelApp.OfflineUtils.GetOfflineCacheConfig())}}return _browserStorage};this.ready=function(fn){$.when(_browserStoragePromise).then(fn)};return _instance}BrowserCacheMgr.prototype.CacheOnlineOp=function(args){var deferredCacheOnlineOp=new $.Deferred();var browserStore=this.GetBrowserStorage();var that=this;this.ready(function(res){if(!res){return}var query;var selQuery;var metadataTable=offlinecacheconfig.get("PRO_METADATASTORE_DB_TBL");var columns=[];var values=[];var searchCon=[];columns=["ObjName","SweCmd"];values=[args.ObjName,args.SweCmd];for(var col=0;col<columns.length;col++){var whereCal={};whereCal.FieldName=columns[col];whereCal.Val=values[col];if(col){whereCal.PreLogic="AND"}searchCon.push(whereCal)}selQuery=SiebelApp.SqlBuilder.SelectRecord(metadataTable,searchCon);SiebelApp.OfflineAppMgr.PopulateDeferredArray(deferredCacheOnlineOp.promise());var pCacheOnline=browserStore.Execute(selQuery.selectQuery,selQuery.valList);pCacheOnline.done(function(record){if(!record){query=SiebelApp.SqlBuilder.InsertRecord(metadataTable,["ObjName","SweCmd","Response","Type"],[args.ObjName,args.SweCmd,args.Response,args.Type]);that.Execute(query.insertquery,query.values)}else{query="UPDATE "+metadataTable+" SET Response = ? WHERE  ObjName = ? AND SweCmd = ? ";var values2=[args.Response,args.ObjName,args.SweCmd];that.Execute(query,values2)}deferredCacheOnlineOp.resolve()});pCacheOnline.fail(function(err){$.setReturnValue({err:true,retVal:err});deferredCacheOnlineOp.resolve({err:true,retVal:err})})})};BrowserCacheMgr.prototype.GetMetadata=function(tableName){var deferred=new $.Deferred();var query;var deferredSQLObj=null;var browserStore=this.GetBrowserStorage();if((tableName==="PickListGeneric")||(tableName==="PickListHierarchical")){query=SiebelApp.SqlBuilder.SelectRecord(tableName,null,null,["OrderBy"])}else{query=SiebelApp.SqlBuilder.SelectRecord(tableName)}SiebelApp.OfflineAppMgr.PopulateDeferredArray(deferred.promise());deferredSQLObj=browserStore.SelectAll(query,tableName);deferredSQLObj.always(function(data){$.setReturnValue({err:false,retVal:[tableName,data]});deferred.resolve()})};BrowserCacheMgr.prototype.GetItemsToSync=function(txnId,callback){var table="";var query;table=offlinecacheconfig.get("PRO_SYNCQUEUE_DB_TBL");query=SiebelApp.SqlBuilder.SelectFilterRecord(table,"RecordNum","TransactionId",txnId);this.Execute(query.query,query.value,true);$.callback(this,function(retObj){$.setReturnValue(retObj)})};BrowserCacheMgr.prototype.GetItemsToSyncByLastRecordNum=function(txnId,lastRecordNum,callback){var table="";var query;var orderByCols=[];var order="ASC";var limit=[];var whereClause=[];var whereClauseItem={};if(lastRecordNum!=""){whereClauseItem.FieldName="RecordNum";whereClauseItem.Oper=">";whereClauseItem.Val=lastRecordNum;whereClause.push(whereClauseItem)}table=offlinecacheconfig.get("PRO_SYNCQUEUE_DB_TBL");orderByCols.push("RecordNum");query=SiebelApp.SqlBuilder.SelectRecord(table,whereClause,null,orderByCols,order,null);this.Execute(query.selectQuery,query.valList,true);$.callback(this,function(retObj){$.setReturnValue(retObj)})};BrowserCacheMgr.prototype.GetItemsToSyncByPage=function(txnId,callback){var table="";var query;var orderByCols=[];var order="ASC";var limit=[];table=offlinecacheconfig.get("PRO_SYNCQUEUE_DB_TBL");orderByCols.push("RecordNum");query=SiebelApp.SqlBuilder.SelectRecord(table,null,null,orderByCols,order,null);this.Execute(query.selectQuery,query.valList,true);$.callback(this,function(retObj){$.setReturnValue(retObj)})};BrowserCacheMgr.prototype.DiscoverMetadata=function(request,callback,reqIdentifier,objName,type){var browserStore=this.GetBrowserStorage();var deferredDiscoverMetadata=new $.Deferred();var sweCmd=SiebelApp.RequestProcessor.GetCmdTag(reqIdentifier);var requestType=SiebelApp.RequestProcessor.GetRequestType(request);var query;var searchCon=[];var table=offlinecacheconfig.get("PRO_METADATASTORE_DB_TBL");var tblColumns=offlinecacheconfig.get("PRO_METADATASTORE_DB_TBL_COLS");var columns=[tblColumns.ObjName,tblColumns.SweCmd,tblColumns.Type];var values=[objName,sweCmd,type];for(var col=0;col<columns.length;col++){var whereCal={};whereCal.FieldName=columns[col];whereCal.Val=values[col];if(col){whereCal.PreLogic="AND"}searchCon.push(whereCal)}query=SiebelApp.SqlBuilder.SelectRecord(table,searchCon);SiebelApp.OfflineAppMgr.PopulateDeferredArray(deferredDiscoverMetadata.promise());var promiseSelectRecord=browserStore.Execute(query.selectQuery,query.valList);promiseSelectRecord.done(function(record){var obj=record;var strResp;var args=[];if(obj!==null&&obj!==undefined){strResp=obj.Response;if(requestType===editRecordStr&&sweCmd==="nr"){if(SiebelApp.RequestProcessor.IsAssoc(strResp)){SiebelApp.RequestProcessor.SetLayoutState(cinf,objName.split("/")[1]);SiebelApp.BrowserCacheMgr.DiscoverMetadata(request,"","cr",objName,cinf);$.callback(this,function(retObj){if(!retObj.err){var data=retObj.retVal;$.setReturnValue({err:retObj.err,retVal:data});if(!data){outils.CcfLogEvent([clientSystem,51,7,26,requestType,objName])}else{outils.CcfLogEvent([clientSystem,69,7,26,requestType,"CreateRecord",objName])}}else{outils.CcfLogEvent([clientSystem,51,7,26,reqIdentifier,objName]);$.setReturnValue(retObj)}})}}args.push(strResp)}else{if(requestType===offlineconstants.get("EDITRECORD")&&sweCmd==="er"){SiebelApp.RequestProcessor.SetLayoutState(ninf,objName.split("/")[1]);SiebelApp.BrowserCacheMgr.DiscoverMetadata(request,"","nr",objName,ninf);$.callback(this,function(retObj){if(!retObj.err){var data=retObj.retVal;$.setReturnValue({err:retObj.err,retVal:data});if(!data){outils.CcfLogEvent([clientSystem,51,7,26,reqIdentifier,objName])}else{outils.CcfLogEvent([clientSystem,69,7,26,reqIdentifier,"NewRecord",objName])}}else{outils.CcfLogEvent([clientSystem,51,7,26,reqIdentifier,objName]);$.setReturnValue(retObj)}})}else{if(requestType===editRecordStr&&sweCmd==="nr"){SiebelApp.RequestProcessor.SetLayoutState(cinf,objName.split("/")[1]);
SiebelApp.BrowserCacheMgr.DiscoverMetadata(request,"","cr",objName,cinf);$.callback(this,function(retObj){if(!retObj.err){var data=retObj.retVal;$.setReturnValue({err:retObj.err,retVal:data});if(!data){outils.CcfLogEvent([clientSystem,51,7,26,reqIdentifier,objName])}else{outils.CcfLogEvent([clientSystem,69,7,26,reqIdentifier,"CreateRecord",objName])}}else{outils.CcfLogEvent([clientSystem,51,7,26,reqIdentifier,objName]);$.setReturnValue(retObj)}})}else{SiebelApp.RequestProcessor.SetLayoutState(false);outils.CcfLogEvent([clientSystem,51,7,26,reqIdentifier,objName]);if(SiebelApp.RequestProcessor.IsSupported(request)){SiebelApp.OfflineAppMgr.HandleNullResponse(request);$.setReturnValue({err:true});deferredDiscoverMetadata.resolve(strResp)}args.push(offlineconstants.get("CUD_RESPONSE"))}}}$.setReturnValue({err:false,retVal:strResp});deferredDiscoverMetadata.resolve(strResp);if(callback){args.push("success");callback.apply(this,args)}});promiseSelectRecord.fail(function(err){$.setReturnValue({err:true,retVal:err});deferredDiscoverMetadata.reject()})};BrowserCacheMgr.prototype.Delete=function(table,field,value){var query;table=offlinecacheconfig.get("PRO_SYNCQUEUE_DB_TBL");query=SiebelApp.SqlBuilder.DeleteFilterRecord(table,"RecordNum",field,value);this.Execute(query.query,query.value)};BrowserCacheMgr.prototype.DeleteByLastRecordNum=function(table,field,value){var query;var values=[];var columns=[];var condition=" <= ";columns.push(field);values.push(value);table=offlinecacheconfig.get("PRO_SYNCQUEUE_DB_TBL");query=SiebelApp.SqlBuilder.DeleteRecords(table,columns,null,condition);this.Execute(query,values)};BrowserCacheMgr.prototype.CreateTable=function(query){var browserStore=this.GetBrowserStorage();browserStore.CreateTable(query)};BrowserCacheMgr.prototype.SelectRecord=function(query,bRet){return this.Execute(query.selectQuery,query.valList,bRet)};BrowserCacheMgr.prototype.InsertRecord=function(table,columns,values,callback){var query=SiebelApp.SqlBuilder.InsertRecord(table,columns,values);return(this.Execute(query.insertquery,query.values))};BrowserCacheMgr.prototype.InsertRecordSet=function(table,columns,recordSet,callback){var browserStore=this.GetBrowserStorage();browserStore.InsertRecordSet(table,columns,recordSet,callback)};BrowserCacheMgr.prototype.Execute=function(query,values,bRetRecSet){if(!values){values=[]}var deferredExecute=new $.Deferred();SiebelApp.OfflineAppMgr.PopulateDeferredArray(deferredExecute.promise());var browserStore=this.GetBrowserStorage();var promisedataExecute=browserStore.Execute(query,values,bRetRecSet);promisedataExecute.done(function(recordSet){$.setReturnValue({err:false,retVal:recordSet});SiebelApp.OfflineAppMgr.RemoveObj(deferredExecute.promise());deferredExecute.resolve(recordSet)});promisedataExecute.fail(function(err){$.setReturnValue({err:true,retVal:err});SiebelApp.OfflineAppMgr.RemoveObj(deferredExecute.promise());deferredExecute.resolve()})};BrowserCacheMgr.prototype.SelectRecordSet=function(query){return this.Execute(query.selectQuery,query.valList,true)};BrowserCacheMgr.prototype.DoesTableExist=function(table){var browserStore=this.GetBrowserStorage();return(browserStore.DoesTableExist(table))};BrowserCacheMgr.prototype.DoesFieldExist=function(table,fieldName){var browserStore=this.GetBrowserStorage();return(browserStore.DoesFieldExist(table,fieldName))};BrowserCacheMgr.prototype.CacheSCMap=function(sc){if(sc){var arrStringCache=[];CCFMiscUtil_StringToArray(sc,arrStringCache);window.localStorage.setItem(offlineconstants.get("STRING_CACHE"),JSON.stringify(arrStringCache))}};BrowserCacheMgr.prototype.DeleteTable=function(query){var browserStore=this.GetBrowserStorage();browserStore.DeleteTable(query)};BrowserCacheMgr.prototype.CacheSyncNodeId=function(syncNodeId){if(syncNodeId){window.localStorage.setItem(consts.get("SYNC_NODE_ID"),syncNodeId)}};BrowserCacheMgr.prototype.CacheSRFId=function(srfId){if(srfId){window.localStorage.setItem(offlineconstants.get("SRF_ID"),srfId)}};BrowserCacheMgr.prototype.CacheViewList=function(viewlist){window.localStorage.setItem(offlineconstants.get("VIEW_LIST"),JSON.stringify(viewlist))};BrowserCacheMgr.prototype.GetPickFldDetails=function(bcName,fieldName,pickBCName,pickRecId,callback){var browserStore=this.GetBrowserStorage();var cols=offlinecacheconfig.get("PRO_DB_PICKFLD_MAP_TBL_COLS");var retObj={};var query;var searchCon=[];var columns=[];var values=[];columns=[cols.BCName,cols.FldName];values=[bcName,fieldName];for(var col=0;col<columns.length;col++){var whereCal={};whereCal.FieldName=columns[col];whereCal.Val=values[col];if(col){whereCal.PreLogic="AND"}searchCon.push(whereCal)}var dPickFldDetails=new $.Deferred();query=SiebelApp.SqlBuilder.SelectRecord(offlinecacheconfig.get("PRO_DB_PICKFLD_MAP_TBL"),searchCon);SiebelApp.OfflineAppMgr.PopulateDeferredArray(dPickFldDetails.promise());var pSelectRecord=browserStore.Execute(query.selectQuery,query.valList);pSelectRecord.done(function(record){if(record){var column;var value;var searchSpec=[];retObj.PickMap=record;column=["Id"];value=[pickRecId];for(var col=0;col<column.length;col++){var whereCal={};whereCal.FieldName=column[col];whereCal.Val=value[col];if(col){whereCal.PreLogic="AND"}searchSpec.push(whereCal)}query=SiebelApp.SqlBuilder.SelectRecord(SiebelApp.OfflineUtils.RemoveNonAlphaChars(pickBCName),searchSpec);var pSelectRec=browserStore.Execute(query.selectQuery,query.valList);pSelectRec.done(function(rec){retObj.PickRecord=rec;$.setReturnValue({err:false,retVal:retObj});dPickFldDetails.resolve(retObj)});pSelectRec.fail(function(err){$.setReturnValue({err:true,retVal:err});dPickFldDetails.resolve({err:true,retVal:err})})}});pSelectRecord.fail(function(err){$.setReturnValue({err:true,retVal:err});dPickFldDetails.resolve({err:true,retVal:err})})};function ParsePickSearchSpec(pickListData,srtExpr,busComp){var val=[];if(!utils.IsEmpty(srtExpr)&&((srtExpr.indexOf("[Order By]")!==-1)||(srtExpr.indexOf("[Name]")!==-1)||(srtExpr.indexOf("LookupValue")!==-1))){var OrderBy;var Name;var Value;if(srtExpr.indexOf("LookupValue")!==-1){srtExpr=SiebelApp.Query.GetSearchSpec(srtExpr,busComp)}srtExpr=srtExpr.replace(/\[Order By]/g,"OrderBy");srtExpr=srtExpr.replace(/\[Order By]/g,"Name");srtExpr=srtExpr.replace(/\AND/g,"&&");srtExpr=srtExpr.replace(/\and/g,"&&");srtExpr=srtExpr.replace(/\OR/g,"||");srtExpr=srtExpr.replace(/\or/g,"||");srtExpr=srtExpr.replace(/\<>/g,"!==");var k=0;for(var j=0;j<pickListData.length;j++){OrderBy=pickListData[j].OrderBy;Name=pickListData[j].Name;Value=pickListData[j].Value;if(eval(srtExpr)){val[k]=Value;k++}}return val}else{for(var i=0;i<pickListData.length;i++){val[i]=pickListData[i].Value}return val}}BrowserCacheMgr.prototype.GetPickListData=function(pickListDef,busComp,fieldName){var columns=[];var values=[];var searchSpec=[];var query;var pickListData;var parent;var parentType;var srtExpr=pickListDef.SrchSpec;var request=AjaxMgr.GetActiveRequestObj();var bSkip=false;var pickListType=pickListDef.LOVType;switch(pickListDef.BC){case"PickList Generic":pickListData=SiebelApp.Metadata.GetPickListGeneric(pickListType);
var val=ParsePickSearchSpec.call(this,pickListData,srtExpr,busComp);$.setReturnValue({err:false,retVal:val});return;case"List Of Values":pickListData=SiebelApp.Metadata.GetLov(pickListType);$.setReturnValue({err:false,retVal:pickListData});return;case"PickList Hierarchical Sub-Area":case"PickList Hierarchical":var fldDef=busComp.GetFieldDefn(fieldName);var pickMap;var i;if(fldDef){pickMap=fldDef.pickMap;var len=pickMap?pickMap.length:0;var pPickMapDef;var arrConstrains=[];var curRow=busComp.GetActiveRow();var curRec;var objCons;if(curRow>=0){curRec=busComp.GetWS()[curRow];for(i=0;i<len;i++){pPickMapDef=pickMap[i];objCons={};if(pPickMapDef.IsConstrained){objCons.PFldName=pPickMapDef.PFldName;var fname=SiebelApp.OfflineUtils.RemoveNonAlphaChars(pPickMapDef.FldName);objCons.PFldValue=curRec[fname];arrConstrains.push(objCons)}}}}if(pickListDef.SrchSpec){var searchspec=pickListDef.SrchSpec;if(searchspec.indexOf("Parent Type")!==-1){var index=searchspec.indexOf("=")+3;searchspec=searchspec.substring(index,searchspec.length-1)}if(searchspec){var fields=busComp.GetFieldMap();for(var fn in fields){if(fields[fn]&&!bSkip){var fDefn=fields[fn].GetDefn();if(fDefn&&fDefn.PickListName&&fDefn.PickListName!==pickListDef.NAME){var parentPick=fDefn.PickListName;var parentPickDefn=SiebelApp.Metadata.GetPickListDef(parentPick);if(parentPickDefn&&parentPickDefn.LOVType){if(parentPickDefn.LOVType===searchspec){for(var i=0;i<request.FieldValue.length;i++){if(SiebelApp.Utils.UrlDecode(request.FieldValue[i][0])===SiebelApp.S_App.LookupStringCache(fields[fn].GetName())){parent=SiebelApp.Utils.UrlDecode(request.FieldValue[i][1]);parentType=searchspec;bSkip=true;break}}}}}}}}}if(pickListDef.BC==="PickList Hierarchical Sub-Area"){pickListData=SiebelApp.Metadata.GetPickListHierarchicalSubArea(pickListType,parentType,parent,arrConstrains);$.setReturnValue({err:false,retVal:pickListData});return}else{if(pickListDef.BC==="PickList Hierarchical"){if(pickListDef.LOVType==="SR_AREA"){parent="External"}pickListData=SiebelApp.Metadata.GetPickListHierarchical(pickListType,parent,arrConstrains);$.setReturnValue({err:false,retVal:pickListData});return}}break;default:break}SiebelApp.OfflineUtils.CcfLogEvent([clientSystem,110,7,110,pickListDef.Name]);$.setReturnValue({err:false,retVal:[]})};BrowserCacheMgr.prototype.GetPickAppletInfo=function(viewName,appletName,fldName,callback){SiebelApp.OfflineUtils.CcfLogEvent([clientSystem,48,7,25,viewName,appletName,fldName]);var browserStore=this.GetBrowserStorage();var cols=offlinecacheconfig.get("PRO_DB_PICKAPPLET_INFO_TBL_COLS");var fldInfo=viewName+"."+appletName+"|"+fldName;var query;var columns=[];var values=[];var searchCon=[];var dPickAppletInfo=new $.Deferred();var pSelectRecord;columns=[cols.FldInfo];values=[fldInfo];for(var col=0;col<columns.length;col++){var whereCal={};whereCal.FieldName=columns[col];whereCal.Val=values[col];if(col){whereCal.PreLogic="AND"}searchCon.push(whereCal)}query=SiebelApp.SqlBuilder.SelectRecord(offlinecacheconfig.get("PRO_DB_PICKAPPLET_INFO_TBL"),searchCon);SiebelApp.OfflineAppMgr.PopulateDeferredArray(dPickAppletInfo.promise());pSelectRecord=browserStore.Execute(query.selectQuery,query.valList);pSelectRecord.done(function(record){$.setReturnValue({err:false,retVal:record});dPickAppletInfo.resolve(record)});pSelectRecord.fail(function(err){$.setReturnValue({err:true,retVal:err});dPickAppletInfo.resolve()})};BrowserCacheMgr.prototype.GetSyncNodeId=function(){var syncnodeid=window.localStorage.getItem(consts.get("SYNC_NODE_ID"));if(syncnodeid===null){syncnodeid=""}return syncnodeid};BrowserCacheMgr.prototype.UpdateRecord=function(query,fv){var deferredUpdateRecord=new $.Deferred();var browserStore=this.GetBrowserStorage();SiebelApp.OfflineAppMgr.PopulateDeferredArray(deferredUpdateRecord.promise());var promiseUpdateRecord=browserStore.UpdateRecord(query,fv);promiseUpdateRecord.done(function(rowAffected){if(rowAffected<=0){$.setReturnValue({err:false,retVal:rowAffected})}deferredUpdateRecord.resolve({err:false,retVal:rowAffected})});promiseUpdateRecord.fail(function(err){$.setReturnValue({err:true,retVal:err});deferredUpdateRecord.resolve({err:true,retVal:err})})};return browserCacheMgr}())};