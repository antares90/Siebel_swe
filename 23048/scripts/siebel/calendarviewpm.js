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
if(typeof(SiebelAppFacade.calendarviewpm)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.calendarviewpm");define("siebel/calendarviewpm",["siebel/viewpm"],function(){SiebelAppFacade.calendarviewpm=(function(){function b(f){var e=[];this.GetCompMode=function(){return e};this.SetCompMode=function(g){e=g};SiebelAppFacade.calendarviewpm.superclass.constructor.call(this,f)}SiebelJS.Extend(b,SiebelAppFacade.ViewPM);b.prototype.Init=function(){SiebelAppFacade.calendarviewpm.superclass.Init.apply(this,arguments);this.AddMethod("PrepareModeInfo",c);this.AddMethod("ComponentModeChange",a);this.AddMethod("ChangeMode",d);this.AttachEventHandler("TabClick","ChangeMode")};b.prototype.Setup=function(e){SiebelAppFacade.calendarviewpm.superclass.Setup.call(this,e)};function c(){compMode=this.GetCompMode();if(compMode.length===0){var i=SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()});var e=i.GetChildren();if(e){for(var f=0,h=e.length;f<h;f++){var g={childName:e[f].Get("GetName"),childLabel:e[f].Get("GetAppletLabel"),id:e[f].Get("GetId"),displayMode:e[f].Get("defaultAppletDisplayMode")};this.ExecuteMethod("ComponentModeChange",e[f].Get("GetId"),e[f].Get("defaultAppletDisplayMode"));compMode.push(g)}}}else{for(var f=0,h=compMode.length;f<h;f++){this.ExecuteMethod("ComponentModeChange",compMode[f].id,compMode[f].displayMode)}}this.AddProperty("ChildComponentMode",compMode)}function d(e){var h=this.Get("ChildComponentMode");for(var f=0,g=h.length;f<g;f++){if($(e).closest("#s_S_A"+h[f].id+"_div").length>0&&h[f].displayMode&&h[f].displayMode!="expanded"){h[f].displayMode="expanded"}else{if(h[f].displayMode){h[f].displayMode="collapsed"}}this.ExecuteMethod("ComponentModeChange",h[f].id,h[f].displayMode)}}function a(f,e){}b.prototype.EndLife=function(){this.SetCompMode(null);SiebelAppFacade.calendarviewpm.superclass.EndLife.call(this)};return b}());return"SiebelAppFacade.calendarviewpm"})};