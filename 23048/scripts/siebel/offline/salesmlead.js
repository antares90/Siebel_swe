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
if(typeof(SiebelApp.salesmlead)==="undefined"){SiebelJS.Namespace("SiebelApp.salesmlead");define("siebel/offline/salesmlead",["siebel/offline/model","siebel/offline/servicemodel"],function(){var b={};var a=SiebelApp.Offlineconstants;var c=CCFMiscUtil_CreatePropSet();b[a.get("DOUIREG_OBJ_NAME")]="SHCE Sales Lead Form Applet - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="salesmlead";b[a.get("DOUIREG_SRVC_MTDH")]="DoInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="SHCE Sales Lead Form Applet - Mobile";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEAPPLET");b[a.get("DOUIREG_OBJ_MTHD")]="DoCanInvokeMethod";b[a.get("DOUIREG_SRVC_NAME")]="salesmlead";b[a.get("DOUIREG_SRVC_MTDH")]="DoCanInvokeMethod";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="Opportunity";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEBUSCOMP");b[a.get("DOUIREG_OBJ_MTHD")]="AddAssociation";b[a.get("DOUIREG_SRVC_NAME")]="salesmlead";b[a.get("DOUIREG_SRVC_MTDH")]="SetLeadPrimaryOpty";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPOST");SiebelApp.S_App.Model.ServiceRegistry(b);b[a.get("DOUIREG_OBJ_NAME")]="Opportunity";b[a.get("DOUIREG_OBJ_TYPE")]=a.get("DOUIREG_OBJ_TYPEBUSCOMP");b[a.get("DOUIREG_OBJ_MTHD")]="DeleteRecord";b[a.get("DOUIREG_SRVC_NAME")]="salesmlead";b[a.get("DOUIREG_SRVC_MTDH")]="EmptyLeadPrimaryOpty";b[a.get("DOUIREG_EXT_TYPE")]=a.get("DOUIREG_EXT_TYPEPRE");SiebelApp.S_App.Model.ServiceRegistry(b);SiebelApp.salesmlead=(function(){var d=SiebelJS.Dependency("SiebelApp.Utils");function e(f){}SiebelJS.Extend(e,SiebelApp.ServiceModel);e.prototype.DoCanInvokeMethod=function(j){var g=CCFMiscUtil_CreatePropSet();var m="";var f=this.GetContext().GetBusComp();var i=this.GetContext().GetName();var l;var k;var h;m=j.GetProperty("MethodName").toString();if(m==="OnCreateOpptyClicked"){if(f.CheckActiveRow()===true){l=SiebelApp.S_App.Model.GetLovNameVal("Retired","LEAD_STATUS");f.FieldValue("Lead Status");$.callback(this,function(o){var n=o.retVal;if(n===l){g.SetProperty("Invoked",true);g.SetProperty("RetVal",false);$.setReturnValue({err:false,retVal:g})}else{g.SetProperty("Invoked",true);g.SetProperty("RetVal",true);$.setReturnValue({err:false,retVal:g})}})}}};e.prototype.DoInvokeMethod=function(h){var i="";var g=CCFMiscUtil_CreatePropSet();var f;i=h.GetProperty("MethodName").toString();if(i==="OnCreateOpptyClicked"){this.CheckContactProspect();$.callback(this,function(j){if(!j.err){this.CreateOptyFromLead();$.callback(this,function(q){if(!q.err){var o=SiebelApp.S_App.GetActiveView().GetActiveApplet();var n=o.GetUserProperty("Convert Lead Mobile Navigate View");if(!d.IsEmpty(n)){var l=SiebelApp.S_App.Model.GetBusObj("Lead");var m=l.GetBusComp("Lead");var k=l.GetBusComp("Opportunity");var r=c.GetProperty("LeadId");var p=c.GetProperty("OpptyId");m.Execute();$.callback(this,function(s){m.Home();$.callback(this,function(t){m.PositionById(r);$.callback(this,function(u){k.Execute();$.callback(this,function(v){k.Home();$.callback(this,function(w){k.PositionById(p);$.callback(this,function(x){SiebelApp.OfflineAppMgr.BuildViewAsync(n,"BS_NORMAL","",l);$.callback(this,function(y){})})})})})})})}$.setReturnValue({err:"",retVal:g})}else{$.setReturnValue({err:q.err,retVal:g})}})}else{g.SetProperty("Invoked",true);$.setReturnValue({err:j.err,retVal:g})}})}else{g.SetProperty("Invoked",false);$.setReturnValue({err:false,retVal:g})}};e.prototype.SetLeadPrimaryOpty=function(j){SiebelJS.Log("Invoked SetLeadPrimaryOpty Method");var h,k,f,n;var i,l,m;h=this.GetContext();var g=c.GetProperty("isConvertOpty");n=h.GetParentBusComp();if(n&&n.GetName()==="Lead"&&g!="Y"){n.FieldValue("Id");$.callback(this,function(o){i=o.retVal;n.FieldValue("Primary Opportunity Id");$.callback(this,function(p){l=p.retVal;if(d.IsEmpty(l)){h.FieldValue("Id");$.callback(this,function(q){m=q.retVal;n.SetFieldValue("Primary Opportunity Id",m,true);$.callback(this,function(r){n.SetCommitPending(true);n.WriteRecord(false);$.callback(this,function(s){if(!s.err){$.setReturnValue({err:"",retVal:""})}else{$.setReturnValue({err:s.err,retVal:""})}})})})}})})}};e.prototype.EmptyLeadPrimaryOpty=function(l){SiebelJS.Log("Invoked EmptyLeadPrimaryOpty Method");var g,f,m,h;var k,j,i;g=this.GetContext();h=g.GetParentBusComp();if(h&&h.GetName()==="Lead"){h.FieldValue("Id");$.callback(this,function(n){k=n.retVal;h.FieldValue("Primary Opportunity Id");$.callback(this,function(o){j=o.retVal;g.FieldValue("Id");$.callback(this,function(p){i=p.retVal;if(j===i){h.SetFieldValue("Primary Opportunity Id","",true);$.callback(this,function(q){h.SetCommitPending(true);h.WriteRecord(false);$.callback(this,function(r){if(!r.err){$.setReturnValue({err:"",retVal:""})}else{$.setReturnValue({err:r.err,retVal:""})}})})}})})})}};e.prototype.CreateOptyFromLead=function(){SiebelJS.Log("Invoked CreateOptyFromLead Method");var h,t,g,w,k,o,x,m,C,z,l=0,j;var f,A,u,r,n,B,y,s,q,p;var i=new Date();var v=(i.getMonth()+1)+"/"+i.getDate()+"/"+i.getFullYear()+" "+i.getHours()+":"+i.getMinutes()+":"+i.getSeconds();h=SiebelApp.S_App.GetActiveView().GetActiveApplet().GetBusComp();if(c.propArrayLen>0){o=c.GetProperty("ProspectId");x=c.GetProperty("ContactId");m=c.GetProperty("LeadId");if((d.IsEmpty(o)&&!d.IsEmpty(x))||(!d.IsEmpty(o)&&d.IsEmpty(x))){h.ActivateField("Id");h.ActivateField("Description");h.ActivateField("Account Id");h.ActivateField("Contact Id");h.ActivateField("Primary Position Id");h.ActivateField("Primary organization Id");h.ActivateField("Source Id");h.ActivateField("Quality");h.ActivateField("Outcome");h.ActivateField("Primary Opportunity Id");h.ActivateField("Date Converted");h.SetFldSearchSpec("Id",m);h.Execute();$.callback(this,function(D){h.Home();$.callback(this,function(E){if(h.CheckActiveRow()===true){h.FieldValue("Description");$.callback(this,function(F){f=F.retVal;h.FieldValue("Account Id");$.callback(this,function(G){A=G.retVal;h.FieldValue("Contact Id");$.callback(this,function(H){u=H.retVal;h.FieldValue("Primary Position Id");$.callback(this,function(I){r=I.retVal;h.FieldValue("Primary Organization Id");$.callback(this,function(J){n=J.retVal;h.FieldValue("Quality");$.callback(this,function(K){y=K.retVal;y=SiebelApp.S_App.Model.GetLovNameVal(y,"LEAD_QUALITY");strOptyName=f+" ("+m+") "+v;t=SiebelApp.S_App.Model.GetBusObj("Lead").GetBusComp("Opportunity");t.SetSearchSpec("");t.Execute();$.callback(this,function(L){t.NewRecord();$.callback(this,function(M){t.SetFieldValue("Name",strOptyName,true);$.callback(this,function(N){t.SetFieldValue("Account Id",A,true);$.callback(this,function(O){t.SetFieldValue("Key Contact Id",u,true);$.callback(this,function(P){t.SetFieldValue("Primary Revenue Amount",l,true);$.callback(this,function(Q){t.SetFieldValue("Primary Revenue Close Date",v,true);$.callback(this,function(R){t.SetFieldValue("Primary Position Id",r,true);
$.callback(this,function(S){t.SetFieldValue("Primary Organization Id",n,true);$.callback(this,function(T){t.SetFieldValue("Quality",y,true);$.callback(this,function(U){s=SiebelApp.S_App.Model.GetLovNameVal("Pending","OPTY_STATUS");t.SetFieldValue("Status",s,true);$.callback(this,function(V){q=SiebelApp.S_App.Model.GetLovNameVal("Local","SHM_BUSINESS_TYPE_CD");t.SetFieldValue("Business Type",q,true);$.callback(this,function(W){t.SetCommitPending(true);t.WriteRecord();$.callback(this,function(X){if(!X.err){t.FieldValue("Id");$.callback(this,function(Y){if(!Y.err){C=Y.retVal;c.SetProperty("OpptyId",C);c.SetProperty("isConvertOpty","Y");this.AssocLeadOpty(m,C);$.callback(this,function(Z){if(!Z.err){this.AssocOptyContact(C,u);$.callback(this,function(aa){if(!aa.err){var ab=SiebelApp.S_App.Model.GetLovNameVal("Opportunity created","LEAD_OUTCOME");h.SetFieldValue("Outcome",ab,true);$.callback(this,function(ad){var ac=new Date();var ae=(ac.getMonth()+1)+"/"+ac.getDate()+"/"+ac.getFullYear()+" "+ac.getHours()+":"+ac.getMinutes()+":"+ac.getSeconds();h.SetFieldValue("Date Converted",ae,true);$.callback(this,function(af){h.SetFieldValue("Primary Opportunity Id",C,true);$.callback(this,function(ah){var ag=SiebelApp.S_App.Model.GetLovNameVal("Converted","LEAD_STATUS");h.SetFieldValue("Lead Status",ag,true);$.callback(this,function(ai){h.SetCommitPending(true);h.WriteRecord();$.callback(this,function(aj){if(!aj.err){$.setReturnValue({err:"",retVal:""})}else{$.setReturnValue({err:aj.err,retVal:""})}});$.setReturnValue({err:"",retVal:""})})})})})}else{$.setReturnValue({err:aa.err,retVal:psOutArgs})}})}else{$.setReturnValue({err:Z.err,retVal:psOutArgs})}})}else{$.setReturnValue({err:Y.err,retVal:psOutArgs})}})}else{$.setReturnValue({err:X.err,retVal:psOutArgs});return}})})})})})})})})})})})})})})})})})})})}})})}}};e.prototype.AssocOptyContact=function(i,h){var k,j,f;var g;k=SiebelApp.S_App.Model.GetBusObj("Opportunity");j=k.GetBusComp("Contact");f=k.GetBusComp("Opportunity");f.ActivateField("Id");f.SetSearchSpec("Id",i);f.Execute();$.callback(this,function(l){f.Home();$.callback(this,function(m){f.PositionById(i);$.callback(this,function(n){if(f.FindWorkSet(f.GetActiveRow())){j.ActivateField("Id");j.Execute();$.callback(this,function(o){g=j.GetAssocList();$.callback(this,function(p){g.ActivateField("Id");g.SetFldSearchSpec("Id",h);g.Execute();$.callback(this,function(q){g.Home();$.callback(this,function(r){g.PositionById(h);$.callback(this,function(s){if(g.FindWorkSet(g.GetActiveRow())){j.AddAssociation();$.callback(this,function(t){SiebelApp.S_App.Model.ReleaseBO(k)})}else{SiebelApp.S_App.Model.ReleaseBO(k)}})})})})})}else{SiebelApp.S_App.Model.ReleaseBO(k)}})})})};e.prototype.AssocLeadOpty=function(j,i){var g,k,f,h;var l;g=SiebelApp.S_App.Model.GetBusObj("Lead");h=g.GetBusComp("Lead");f=g.GetBusComp("Opportunity");h.ActivateField("Id");h.SetSearchSpec("Id",j);h.Execute();$.callback(this,function(m){h.Home();$.callback(this,function(n){h.PositionById(j);$.callback(this,function(o){if(h.FindWorkSet(h.GetActiveRow())){f.ActivateField("Id");f.Execute();$.callback(this,function(p){l=f.GetAssocList();$.callback(this,function(q){l.ActivateField("Id");l.SetFldSearchSpec("Id",i);l.Execute();$.callback(this,function(r){l.Home();$.callback(this,function(s){l.PositionById(i);$.callback(this,function(t){if(l.FindWorkSet(l.GetActiveRow())){f.AddAssociation();$.callback(this,function(u){SiebelApp.S_App.Model.ReleaseBO(g);SiebelApp.OfflineAppMgr.PostActions("ActionRPCCompleted")})}else{SiebelApp.S_App.Model.ReleaseBO(g);SiebelApp.OfflineAppMgr.PostActions("ActionRPCCompleted")}})})})})})}else{SiebelApp.S_App.Model.ReleaseBO(g);SiebelApp.OfflineAppMgr.PostActions("ActionRPCCompleted")}})})})};e.prototype.CheckContactProspect=function(){SiebelJS.Log("Invoked CheckContactProspect Method");var k;var h;var f;var j=CCFMiscUtil_CreatePropSet();var i=[],g=CCFMiscUtil_CreatePropSet();h=this.GetContext().GetBusComp();h.FieldValue("Id");$.callback(this,function(l){var m=l.retVal;h.FieldValue("Contact Id");$.callback(this,function(o){var n=o.retVal;h.FieldValue("Prospect Id");$.callback(this,function(p){var q=p.retVal;if((d.IsEmpty(n)&&d.IsEmpty(q))||(!d.IsEmpty(n)&&!d.IsEmpty(q))){SiebelApp.S_App.OfflineErrorObject.SetErrorMsg("IDS_SALES_CONTACT_PROSPECT_REQD",i);$.setReturnValue({err:"IDS_SALES_CONTACT_PROSPECT_REQD",retVal:""});return}else{c.Reset();c.SetProperty("LeadId",m);c.SetProperty("ContactId",n);c.SetProperty("ProspectId",q);$.setReturnValue({err:false,retVal:""})}if(!d.IsEmpty(q)&&d.IsEmpty(n)){this.ProspectToContact();$.callback(this,function(r){if(!r.err){$.setReturnValue({err:false,retVal:""})}else{$.setReturnValue({err:r.err,retVal:g})}})}})})})};e.prototype.ProspectToContact=function(){SiebelJS.Log("Invoked ProspectToContact Method");var m=SiebelApp.S_App.GetModel();var g=SiebelApp.S_App.Model.GetBusObj("Lead");var q=g.GetBusComp("List Mgmt Prospective Contact");var l,h,k,o,j,f,p,i;var n,r,s;q.ActivateField("Last Name");q.ActivateField("First Name");q.ActivateField("Home Phone #");q.ActivateField("Work Phone #");q.ActivateField("Cellular Phone #");q.ActivateField("Fax Phone #");q.ActivateField("Email Address");q.ActivateField("Promoted By");q.ActivateField("Promoted Date");q.ActivateField("Associated Contact Id");q.SetFldSearchSpec("Id",c.GetProperty("ProspectId"));q.Execute();$.callback(this,function(t){q.Home();$.callback(this,function(u){if(q.CheckActiveRow()===true){q.FieldValue("Last Name");$.callback(this,function(v){l=v.retVal;q.FieldValue("First Name");$.callback(this,function(w){h=w.retVal;q.FieldValue("Home Phone #");$.callback(this,function(x){strHomePhone=x.retVal;q.FieldValue("Work Phone #");$.callback(this,function(y){o=y.retVal;q.FieldValue("Cellular Phone #");$.callback(this,function(z){j=z.retVal;q.FieldValue("Fax Phone #");$.callback(this,function(A){f=A.retVal;q.FieldValue("Email Address");$.callback(this,function(B){p=B.retVal;n=m.GetBusObj("Contact");r=n.GetBusComp("Contact");r.ActivateField("Last Name");r.ActivateField("First Name");r.ActivateField("Home Phone #");r.ActivateField("Work Phone #");r.ActivateField("Cellular Phone #");r.ActivateField("Fax Phone #");r.ActivateField("Email Address");r.ActivateField("Last Name");r.ActivateField("Prospect Flag");r.Execute();$.callback(this,function(C){r.NewRecord();$.callback(this,function(D){r.SetFieldValue("Last Name",l,true);$.callback(this,function(E){r.SetFieldValue("First Name",h,true);$.callback(this,function(F){r.SetFieldValue("Home Phone #",strHomePhone,true);$.callback(this,function(G){r.SetFieldValue("Work Phone #",o,true);$.callback(this,function(H){r.SetFieldValue("Cellular Phone #",j,true);$.callback(this,function(I){r.SetFieldValue("Fax Phone #",f,true);$.callback(this,function(J){r.SetFieldValue("Email Address",p,true);$.callback(this,function(K){r.SetFieldValue("Person UId",c.GetProperty("ProspectId"),true);$.callback(this,function(L){r.SetFieldValue("Prospect Flag","Y",true);$.callback(this,function(M){r.SetCommitPending(true);
r.WriteRecord();$.callback(this,function(N){if(!N.err){r.FieldValue("Id");$.callback(this,function(O){i=O.retVal;s=this.GetContext().GetBusComp();s.GetPickList("Contact Last Name");$.callback(this,function(Q){var P=Q.retVal;P.SetFldSearchSpec("Id",i);$.callback(this,function(R){P.Execute();$.callback(this,function(S){P.Home();$.callback(this,function(T){if(P.CheckActiveRow()===true){P.PickCurrentRow();$.callback(this,function(U){if(!U.err){s.SetFieldValue("Prospect Last Name","",true);$.callback(this,function(V){s.SetFieldValue("Prospect First Name","",true);$.callback(this,function(W){s.SetFieldValue("Prospect Id","",true);$.callback(this,function(X){s.SetCommitPending(true);s.WriteRecord();$.callback(this,function(Y){if(!Y.err){q.SetFieldValue("Promoted By",SiebelApp.S_App.Model.GetLoginId(),true);$.callback(this,function(Z){q.SetFieldValue("Associated Contact Id",i,true);$.callback(this,function(ac){var ab=new Date();var aa=(ab.getMonth()+1)+"/"+ab.getDate()+"/"+ab.getFullYear()+" "+ab.getHours()+":"+ab.getMinutes()+":"+ab.getSeconds();q.SetFieldValue("Promoted Date",aa,true);$.callback(this,function(ad){q.SetCommitPending(true);q.WriteRecord();$.callback(this,function(ae){if(!ae.err){$.setReturnValue({err:"",retVal:""});SiebelApp.S_App.Model.ReleaseBO(n);SiebelApp.S_App.Model.ReleaseBO(g)}})})})})}else{$.setReturnValue({err:T.err,retVal:T.retVal})}})})})})}})}})})})})})}})})})})})})})})})})})})})})})})})})})}})})};return e}());return"SiebelAppFacade.salesmlead"})};