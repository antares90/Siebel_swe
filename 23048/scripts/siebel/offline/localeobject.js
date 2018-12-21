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
if(typeof(SiebelApp.S_App.OfflineLocaleObject)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.OfflineLocaleObject");SiebelApp.S_App.OfflineLocaleObject=(function(){var b=function(){this.m_localOfflineStrMap={};this.m_bLocalStrsInitialized=false;var c;b=function(){return c};b.prototype=this;c=new b();c.constructor=b;return c};function a(){var c=_SWEgetGlobalMsgAryOffline();for(var d in c){if(c[d]){this.m_localOfflineStrMap[d]=c[d]}}}b.prototype.FormattedToString=function(c,j,e){var g;var i;var d;var f;var h;if(!e){if((c==="time"||c==="date")&&j){i=j.trim(" ");var k=SiebelApp.S_App.LocaleObject.GetDatum(c);if(i&&i.length>k.GetFormat().length){c="datetime"}}if(j){if(c==="utcdatetime"||c==="datetime"){d=new Date(j);f=(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();h=SiebelApp.Offlineconstants.get("DM_DATETIME_FORMAT")}else{if(c==="date"){d=new Date(j);f=(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();h=SiebelApp.Offlineconstants.get("DM_DATE_FORMAT")}else{f=j;h=SiebelApp.Offlineconstants.get("DM_TIME_FORMAT")}}g=SiebelApp.S_App.LocaleObject.FormattedToString(c,f,h);return g}}g=SiebelApp.S_App.LocaleObject.FormattedToString(c,j,e);return g};b.prototype.GetLocalString=function(c){var d=null;d=this.m_localOfflineStrMap[c];if(!d&&!this.m_bLocalStrsInitialized){a.call(this);this.m_bLocalStrsInitialized=true;d=this.m_localOfflineStrMap[c]}if(!d){d=SiebelApp.S_App.LocaleObject.GetLocalString(c)}return(d)};return new b()}())};