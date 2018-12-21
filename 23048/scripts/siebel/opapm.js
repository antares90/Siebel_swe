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
if(typeof(SiebelAppFacade.OPAPM)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.OPAPM");define("siebel/opapm",["siebel/dynacontrolpm"],function(){SiebelAppFacade.OPAPM=(function(){var i=SiebelJS.Dependency("SiebelApp.Constants");var n=i.get("SWE_PST_BUTTON_CTRL");var g=i.get("SWE_CTRL_LABEL");var j=i.get("SWE_CTRL_IMAGECONTROL");var l=SiebelJS.Dependency("SiebelApp.S_App.LocaleObject");var m=SiebelJS.Dependency("SiebelApp.Utils");var e=i.get("SWE_CTRL_DATE_TIME_PICK");var h=i.get("SWE_CTRL_DATE_TZ_PICK");var b=i.get("SWE_CTRL_DATE_PICK");function c(){SiebelAppFacade.OPAPM.superclass.constructor.apply(this,arguments)}SiebelJS.Extend(c,SiebelAppFacade.DynaControlPM);c.prototype.Setup=function(p){SiebelAppFacade.OPAPM.superclass.Setup.call(this,p);var o;if(p){o=p.GetChildByType(consts.get("SWE_APPLET_PM_PS"))}if(o){var q=o.GetChildByType(consts.get("SWE_DYNA_CONTROL_PROPERTY"));if(q){this.SetProperty("ScreenId",q.GetProperty("Screen Id"))}}};c.prototype.Init=function(){SiebelAppFacade.OPAPM.superclass.Init.apply(this,arguments);this.AddMethod("InvokeMethod",k,{sequence:true,scope:this});this.AddMethod("GetFieldValue",d,{sequence:false,scope:this});this.AddMethod("GetFormattedFieldValue",a,{sequence:false,scope:this})};function k(y,q,u,o){if(y==="FrameEventMethodWFNavigate"){var p=CCFMiscUtil_CreatePropSet();var z=this.Get("GetControls");for(var s in z){if(z.hasOwnProperty(s)){var t=z[s],v=t.GetUIType();if(v!==g&&v!==n&&v!==j){p.SetProperty(t.GetName(),this.ExecuteMethod("GetFieldValue",t))}}}p.SetProperty("action",y);p.SetProperty("Screen Id",this.Get("ScreenId"));var x;var r=SiebelApp.S_App.GetService("OPA Interface Service");if(r){var w={};w.async=false;w.selfbusy=true;w.scope=this;w.cb=function(){x=arguments[2]};r.InvokeMethod("InvokeSubWorkflow",p,w)}if(x&&x.GetChildByType(i.get("SWE_RPC_PROP_ERRORS"))){o[i.get("SWE_EXTN_CANCEL_ORIG_OP")]=true;o[i.get("SWE_EXTN_RETVAL")]=false;this.ExecuteMethod("SetFocusToCtrl",this.Get("defaultControlFocus"),true)}}}function d(r,t,o,s){var p=r.GetUIType(),q=s.ReturnValue;if(p==h||p==e){s.CancelOperation=true;s.ReturnValue=f(q,r,true,r.GetDisplayFormat(),i.get("ISO8601_DATETIME_FORMAT_T"))}else{if(p==b){s.CancelOperation=true;s.ReturnValue=f(q,r,false,r.GetDisplayFormat(),i.get("ISO_DATE_FORMAT"))}}}function a(s,v,o,u){var p=s.GetUIType(),r=u.ReturnValue;if(p==h||p==e){u.CancelOperation=true;var q=r.split("T"),t=(q[0]&&q[1])?(q[0]+" "+q[1]):r;u.ReturnValue=f(t,s,true,i.get("ISO8601_DATETIME_FORMAT"),s.GetDisplayFormat())}else{if(p==b){u.CancelOperation=true;u.ReturnValue=f(r,s,false,i.get("ISO_DATE_FORMAT"),s.GetDisplayFormat())}}}function f(s,r,q,t,u){var o=r.GetUIType(),p=s;if(p!=""){if(q){p=l.GetStringFromDateTime(s,t,u,true)}else{p=l.GetStringFromDateTime(s,t,u)}return(p==""?s:p)}else{return p}}return c}());return SiebelAppFacade.OPAPM})};