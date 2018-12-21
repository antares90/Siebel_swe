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
if(SiebelApp.S_App.BCField){(function(){var a=SiebelApp.Utils;var c=SiebelApp.Constants;var b=SiebelApp.S_App.BCField;var g=SiebelApp.S_App.BCField.prototype;var f=SiebelApp.S_App.BCField;SiebelApp.S_App.BCField=function(){f.call(this);var j={};var h=[];var i=0;this.GetExtObj=function(){return j};this.SetExtObjProp=function(l,k){this.GetExtObj()[l]=k};this.GetExtObjProp=function(k){if(!((this.GetExtObj()).hasOwnProperty(k))){this.GetExtObj()[k]=null}return(this.GetExtObj()[k])};this.GetForDepArray=function(){return h};this.SetForDepArray=function(k){h=k};this.SetNumImmediateDep=function(k){i=k};this.GetNumImmediateDep=function(){return i}};SiebelApp.S_App.BCField.prototype=g;SiebelApp.S_App.BCField.prototype.constructor=SiebelApp.S_App.BCField;var e={};var d={};e.ProcessObjectInfo=b.prototype.ProcessObjectInfo;d.ProcessObjectInfo=function(p){var n=p.GetType();if(n!==c.get("SWE_PST_FIELD")){throw new Error()}var o=a.Curry(SiebelApp.S_App.constructor.prototype.DefineAccessor,this,p);o("GetName","SWE_PROP_NAME");o("GetDataType","SWE_PROP_TYPE",true);o("GetValidationSpec","VALIDATIONSPEC");o("GetPrcn","PRECISION");o("GetNoCopy","NOCOPY");o("GetPostDefault","POSTDEFAULT");o("GetPickList","PICKLISTNAME");o("GetLinkName","LINKNAME");o("GetForceCase","FORCE_CASE");o("GetForceActive","FORCE_ACTIVE");o("IsDisableSort","DISABLE_SORT");o("IsDisableSearch","DISABLE_SEARCH");o("GetColName","COLUMN_NAME");o("GetCalcExpr","CALCEXPR");if(p.GetProperty("fDeps")){var k=p.GetProperty("fDeps");var j=p.GetProperty("fDeps").length;for(var m=0;m<j;m++){this.AddForwardDependency(k[m])}}e.ProcessObjectInfo.call(this,p);var l=this.GetBusComp().GetDatumDataType(this.GetDefn().DataType);this.GetDataType=function(){return l};var h=this.GetDefn().ReadOnly;this.IsReadOnly=function(){return h}};b.prototype.HasDefaultValue=function(){var h=this.GetDefn();if(a.IsEmpty(h.PreDefault)&&a.IsEmpty(h.PostDefault)){return false}return true};b.prototype.GetDefn=function(){return(this.GetBusComp().GetFieldDefn(SiebelApp.S_App.LookupStringCache(this.GetName())))};b.prototype.IsInactive=function(){return(false)};b.prototype.AreValuesEqual=function(i,h){if(i===h){return(false)}else{return(true)}};b.prototype.GetColName=function(){return this.GetDefn().ColName};b.prototype.SetName=function(h){this.SetExtObjProp("m_name",h)};b.prototype.IsSystemField=function(){return false};b.prototype.IsConstrainingField=function(){return true};b.prototype.IsActivated=function(){if(!this.GetExtObjProp("m_activated")){this.SetExtObjProp("m_activated",false)}return(this.GetExtObjProp("m_activated"))};b.prototype.SetActivated=function(h){this.SetExtObjProp("m_activated",h)};b.prototype.GetCalcQuery=function(){return this.GetDefn().CalExpr};SiebelApp.S_App.BCField.prototype.Validate=function(){return true};SiebelApp.S_App.BCField.prototype.GetTableName=function(){return""};SiebelApp.S_App.BCField.prototype.ForwardDeps=function(k,m,i){if(k){i=0}var h=this.GetForDepArray();var l;var j;var n=(m)?this.GetNumImmediateDep():h.length;for(;i<n;i++){l=h[i];j=this.GetBusComp().GetFieldMap()[l];if(j){if(!j.IsInactive()){return true}}}return false};SiebelApp.S_App.BCField.prototype.AddForwardDependency=function(l,h){var k=[];var i=this.GetForDepArray();var j;if(l===this.GetName()){k.push(this.GetName());j.err=true;j.retVal=k}if(h){i.splice(0,0,l);this.SetNumImmediateDep(this.GetNumImmediateDep()+1)}else{i.push(l)}};SiebelApp.S_App.BCField.prototype.EnumDefaultValDependencies=function(){};SiebelApp.OfflineUtils.DefineExtentions(b,d,e)}())};