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
if(typeof(SiebelApp.S_App.OfflineErrorObject)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.OfflineErrorObject");var consts=SiebelJS.Dependency("SiebelApp.Constants");SiebelApp.S_App.OfflineErrorObject=(function(){function a(){var d="OK";var c="";var b={};b.SSAOMErrBoundedPick=consts.get("SSAOMErrBoundedPick");b.SSAELErrUserDefinedError=consts.get("SSAELErrUserDefinedError");b.SSAELErrGetFieldNotActive=consts.get("SSAELErrGetFieldNotActive");this.ClearErrorMsg=function(){d="OK";c=""};this.SetErrorCode=function(e){d=e};this.GetErrorCode=function(){return(d)};this.GetErrorCodeString=function(){if(b[d]){return b[d]}return(d)};this.SetErrorText=function(e){c=e};this.GetErrorText=function(){return(c)}}a.prototype.SetErrorMsg=function(f,d,p,j,h,l,n){var k;var e;var b="%";var o=SiebelApp.OfflineUtils;var c=SiebelApp.Offlineconstants;if(f==="OK"){return true}if(f===this.GetErrorCode()){return}this.SetErrorCode(f);k=SiebelApp.S_App.OfflineLocaleObject.GetLocalString(f);e=k;if(!k){this.SetErrorText(f)}else{if(d){if(f==="LocaleErrFormattedToString"){e='"'+d+'": '+e}else{var m;var q=0;var g;for(g=0;g<d.length&&g<8;g++){if(g===0){q=1}else{q=q+1}m=b+q;e=e.replace(m,d[g])}}this.SetErrorText(e);o.CcfLogEvent([c.get("LOG_EVT_CLIENT_SYS"),27,l,n,e])}else{this.SetErrorText(e);o.CcfLogEvent([c.get("LOG_EVT_CLIENT_SYS"),27,l,n,e])}}};a.prototype.HasErrorMsg=function(){if(this.GetErrorText()&&this.GetErrorCode()!=="OK"){return true}else{return false}};return new a()}())};