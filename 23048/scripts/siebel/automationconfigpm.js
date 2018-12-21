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
if(typeof(SiebelAppFacade.AutoCfgPM)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.AutoCfgPM");define("siebel/automationconfigpm",["siebel/pmodel"],function(){SiebelAppFacade.AutoCfgPM=(function(){var g=SiebelJS.Dependency("SiebelApp.Utils"),d=SiebelJS.Dependency("SiebelApp.Constants"),i=d.get("AUTO_CLOB_DELIM"),b=d.get("AUTO_OBJ_DELIM");function f(k){SiebelAppFacade.AutoCfgPM.superclass.constructor.call(this,k)}SiebelJS.Extend(f,SiebelAppFacade.PresentationModel);f.prototype.Init=function(){SiebelAppFacade.AutoCfgPM.superclass.Init.call(this);this.AddProperty("userCredsClob","");this.AddProperty("serverCredsClob","");this.AddProperty("toolsCredsClob","");this.AddProperty("userCredsDivPlaceHolder","");this.AddProperty("serverCredsDivPlaceHolder","");this.AddProperty("toolsCredsDivPlaceHolder","");this.AddProperty("clobUpdateByUser",{userCredsClob:false,serverCredsClob:false,toolsCredsClob:false});this.AddProperty("visibleRowLength",{userCredsClob:0,serverCredsClob:0,toolsCredsClob:0});this.AttachEventHandler("OnInputFieldBlur",a)};function a(o,p,n,m,l){var k=this.Get("clobUpdateByUser");k[l]=true;this.SetProperty("clobUpdateByUser",k);c.call(this,o,p,n,m,l);k[l]=false;this.SetProperty("clobUpdateByUser",k);return false}function c(r,v,k,q,l){var p=this.Get(l).split(i),o=p[v],t=o.split(b),s={userName:"",pwd:""},n={component:"",url:"",appType:"",osType:"",userName:"",pwd:"",srfPath:"",portNum:""},u={machine:"",userName:"",pwd:"",rootPath:"",srfPath:""},m;switch(l){case"userCredsClob":j.call(this,s,o,l);s[q]=r;p[v]=e.call(this,s);m=d.get("AUTO_USERCONTROL_NAME");break;case"serverCredsClob":j.call(this,n,o,l);n[q]=r;p[v]=e.call(this,n);m=d.get("AUTO_SERVERCONTROL_NAME");break;case"toolsCredsClob":j.call(this,u,o,l);u[q]=r;p[v]=e.call(this,u);m=d.get("AUTO_TOOLSCONTROL_NAME");break}this.ExecuteMethod("SetFormattedValue",this.Get("GetControls")[m],p.join(i))}function j(m,p,l){var n=0,o=p.split(b),k="",q;switch(l){case"userCredsClob":k=h(o,2);break;case"serverCredsClob":k=h(o,8);break;case"toolsCredsClob":k=h(o,5);break}q=k.split(b);for(var r in m){m[r]=q[n];n++}}function e(l){var k="",m=0;for(var n in l){k+=((m!==0?b:"")+l[n]);m++}return k}function h(l,n){var k="";for(var m=0;m<n;m++){k+=((m!==0?b:"")+(l[m]?l[m]:""))}return k}return f}());return"SiebelAppFacade.AutoCfgPM"})};