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
if(typeof(SiebelAppFacade.EditUIPModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.EditUIPModel");define("siebel/epuipmodel",["siebel/listpmodel"],function(){SiebelAppFacade.EditUIPModel=(function(){var j=SiebelJS.Dependency("SiebelAppFacade.FacadeConstants"),h=SiebelJS.Dependency("SiebelApp.Constants"),g=SiebelApp.S_App.REPCHK_MRV1();function f(r){SiebelAppFacade.EditUIPModel.superclass.constructor.call(this,r);var o=[],s=[],q=[],n=[];if(g){var p=[],m=[]}this.SetReadOnlyControl=function(t){o=t};this.GetReadOnlyControls=function(){return o};this.SetHideControlPartInfo=function(t){s=t};this.GetHideControlPartInfo=function(){return s};this.SetRowLevelControls=function(t){q=t};this.GetRowLevelControls=function(){return q};this.SetControlDynCaptions=function(t){n=t};this.GetControlDynCaptions=function(){return n};if(g){this.SetHeaderIdentifier=function(t){m=t};this.GetHeaderIdentifier=function(){return m};this.SetResetFocusToHeader=function(t){return p=t};this.GetResetFocusToHeader=function(){return p}}}SiebelJS.Extend(f,SiebelAppFacade.ListPresentationModel);f.prototype.Init=function(){SiebelAppFacade.EditUIPModel.superclass.Init.call(this);this.AddProperty("LastBoundData",[]);this.AddProperty("RecordGroupField","");this.AddMethod("CanShowRowLevelControl",b,{scope:this});this.AddMethod("IsRowLevelControl",c,{scope:this});this.AddMethod("IsControlReadOnly",a,{scope:this});this.AddMethod("GetControlCaption",d,{scope:this});if(g){this.AddMethod("IsRuleRow",i,{scope:this});this.AddMethod("CanResetFocusToHeader",l,{scope:this})}};f.prototype.Setup=function(m){SiebelAppFacade.EditUIPModel.superclass.Setup.call(this,m);k.call(this,m)};function e(o){var q=o.split(","),m=q[0],p=q[1],n=q[2];return{Control:m,Info:{Field:p,Value:n}}}function k(p){var A=p.GetChildByType("apm");if(!A||typeof(A)==="undefined"){return}var z=A.EnumProperties(true),B=[],o=[],t=[],u=[];if(g){var C=[],s=[]}do{var y=A.GetProperty(z);if(z.indexOf("Row Level Hide Control")!==-1||z.indexOf("Hide Layout Part")!==-1){var v=e(y);o[v.Control]=v.Info}else{if(z.indexOf("Row Level Controls")!==-1){var m=y.split(",");for(var w=0;w<m.length;w++){t[m[w]]=true}}else{if(g&&z.indexOf("Reset Focus To Header")!==-1){var r=y.split(",");for(var w=0;w<r.length;w++){C[r[w]]=true}}else{if(z.indexOf("Read Only Field")!==-1){var x=e(y);B[x.Control]=x.Info}else{if(z==="Record Group Field"){this.SetProperty("RecordGroupField",y)}else{if(g&&z==="Accordion Identifier"){var n=e(y);s[n.Control]=n.Info}else{if(z.indexOf("Dyn Caption Control")!==-1){var q=y.split(",");u[q[0]]=q[1]}}}}}}}}while(z=A.EnumProperties(false));this.SetHideControlPartInfo(o);this.SetReadOnlyControl(B);this.SetRowLevelControls(t);this.SetControlDynCaptions(u);if(g){this.SetHeaderIdentifier(s);this.SetResetFocusToHeader(C)}}var b=function(o,n){var r=this.GetHideControlPartInfo();if(!r.hasOwnProperty(o)){return true}var s=r[o].Field;var m=r[o].Value;var q=this.Get("GetRawRecordSet");if(n>=q.length){return false}var p=q[n][s];return(p!==m)};if(g){var l=function(n){var m=(headerFocusControls.hasOwnProperty(n)&&this.GetResetFocusToHeader()[n]===true)?true:false;return m};var i=function(n){var o=this.Get("GetRawRecordSet"),m=(n<o.length&&o[n][this.GetHeaderIdentifier()["AccordionHeader"].Field]==="N")?true:false;return m}}var c=function(m){var n=this.GetRowLevelControls();if(n.hasOwnProperty(m)&&n[m]===true){return true}return false};var a=function(n,m){var q=this.GetReadOnlyControls();if(!q.hasOwnProperty(n)){return false}var s=q[n].Field;var r=q[n].Value;var p=this.Get("GetRawRecordSet");var o=p[m][s];return(o===r)};var d=function(o,m){var q=this.GetControlDynCaptions();if(!q.hasOwnProperty(o)){return""}var n=q[o];var p=this.Get("GetRawRecordSet");return p[m][n]};return f}());return"SiebelAppFacade.EditUIPModel"})};