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
/* 8.1.1.14SIA[23044]PATCHSET9 */
if(typeof(SiebelApp.salesmorders)==="undefined"){SiebelJS.Namespace("SiebelApp.salesmorders");define("siebel/offline/salesmorders",["siebel/offline/model","siebel/offline/servicemodel"],function(){var b={};var a=SiebelApp.Offlineconstants;b[a.get("DOUIREG_OBJ_NAME")]="Order Entry - Orders";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEBUSCOMP");b[a.get("DOUIREG_OBJ_MTHD")]="WriteRecord";b[a.get("DOUIREG_SRVC_NAME")]="salesmorders";b[a.get("DOUIREG_SRVC_MTDH")]="SalesOrderPredefault";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b={};b[a.get("DOUIREG_OBJ_NAME")]="Order Entry - Line Items";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEBUSCOMP");b[a.get("DOUIREG_OBJ_MTHD")]="WriteRecord";b[a.get("DOUIREG_SRVC_NAME")]="salesmorders";b[a.get("DOUIREG_SRVC_MTDH")]="WriteRecord";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);SiebelApp.salesmorders=(function(){function c(d){}SiebelJS.Extend(c,SiebelApp.ServiceModel);c.prototype.SalesOrderPredefault=function(g){SiebelJS.Log("Invoked Service Method SalesOrderPredefault");var e;var f;var d=CCFMiscUtil_CreatePropSet();e=this.GetContext();if(e.IsNewRecordPending()){$.callback(this,function(h){e.FieldValue("Order Type");$.callback(this,function(i){if(!i.err){var j=i.retVal;if(utils.IsEmpty(j)){if(!i.err){f=SiebelApp.S_App.Model.GetLovNameVal("Sales Order","FS_ORDER_TYPE");if(!utils.IsEmpty(f)){e.GetPickList("Order Type");$.callback(this,function(l){if(!l.err){var k=l.retVal;k.SetFldSearchSpec("Order Type",f);$.callback(this,function(m){k.Execute();$.callback(this,function(n){if(!n.err){k.Home();$.callback(this,function(o){if(k.CheckActiveRow()===true){k.PickCurrentRow();$.callback(this,function(p){if(!n.err){$.setReturnValue({err:false,retVal:d})}else{$.setReturnValue({err:n.err,retVal:n.retVal})}})}})}else{$.setReturnValue({err:n.err,retVal:n.retVal})}})})}else{$.setReturnValue({err:l.err,retVal:l.retVal})}})}}else{$.setReturnValue({err:i.err,retVal:i.retVal})}}}})})}};c.prototype.WriteRecord=function(j){SiebelJS.Log("Invoked Service Method WriteRecord");var h;var f=0;var e=0;h=this.GetContext();var g=CCFMiscUtil_CreatePropSet();var d;var i=[];h.ActivateField("Product Id");h.FieldValue("Product Id");$.callback(this,function(m){d=m.retVal;if(utils.IsEmpty(d)){i.push("Product");SiebelApp.S_App.OfflineErrorObject.SetErrorMsg("SSAFReqFieldNotExist",i);$.setReturnValue({err:"SSAFReqFieldNotExist",retVal:g});return}if(h.IsNewRecordPending()){var k=SiebelApp.S_App.Model.GetBusObj("Order Entry (Sales)");var l=k.GetBusComp("Order Entry - Line Items");h.FieldValue("Order Header Id");$.callback(this,function(n){var o=n.retVal;if(!utils.IsEmpty(o)){l.SetSearchSpec("Order Header Id",o);l.Execute();$.callback(this,function(p){l.Home();$.callback(this,function(q){var r=function(){l.FieldValue("Line Number");$.callback(this,function(s){var t=s.retVal;if(t>e){e=t}});$.callback(this,function(s){l.NextRecord();$.callback(this,function(u){var t=u.err;if(!t){r.call(this)}})})};if(l.CheckActiveRow()===true){r.call(this)}f=++e;$.callback(this,function(s){h.SetFieldValue("Line Number",f,true);$.callback(this,function(t){if(!t.err){SiebelApp.S_App.Model.ReleaseBO(k);$.setReturnValue({err:false,retVal:g})}else{SiebelApp.S_App.Model.ReleaseBO(k);$.setReturnValue({err:t.err,retVal:t.retVal})}})})})})}else{SiebelApp.S_App.Model.ReleaseBO(k)}})}})};return c}());return"SiebelAppFacade.salesmorders"})};