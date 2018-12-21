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
if(typeof(SiebelAppFacade.notificationviewpm)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.notificationviewpm");define("siebel/notificationviewpm",["siebel/viewpm"],function(){SiebelAppFacade.notificationviewpm=(function(){function b(e){SiebelAppFacade.notificationviewpm.superclass.constructor.call(this,e)}SiebelJS.Extend(b,SiebelAppFacade.ViewPM);b.prototype.Init=function(){SiebelAppFacade.notificationviewpm.superclass.Init.apply(this,arguments);this.AddMethod("PrepareStateInfo",c);this.AddMethod("ComponentStateChange",a);this.AddMethod("ChangeState",d);this.AttachEventHandler("TabClick","ChangeState")};b.prototype.Setup=function(e){SiebelAppFacade.notificationviewpm.superclass.Setup.call(this,e)};function c(m){var f=SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()});var i=f.GetChildren();var h=[];if(i&&m){for(var k=0,g=i.length;k<g;k++){var j=m.indexOf("#s_S_A"+i[k].Get("GetId")+"_div");var l=(m.indexOf("#s_S_A"+i[k].Get("GetId")+"_div")===0);var e={childName:i[k].Get("GetName"),childLabel:i[k].Get("GetAppletLabel"),id:i[k].Get("GetId"),displayState:(l?true:false)};this.ExecuteMethod("ComponentStateChange",e.id,e.displayState);h.splice(j,0,e)}}else{if(i&&!m){for(var k=0,g=i.length;k<g;k++){var e={childName:i[k].Get("GetName"),childLabel:i[k].Get("GetAppletLabel"),id:i[k].Get("GetId"),displayState:(k===0?true:false)};this.ExecuteMethod("ComponentStateChange",e.id,e.displayState);h.push(e)}}}this.AddProperty("ChildComponentState",h)}function d(e){var h=this.Get("ChildComponentState");for(var f=0,g=h.length;f<g;f++){if(SiebelApp.S_App.GetActiveView().GetApplet(h[f].childName).GetBusComp().IsCommitPending()===true){SiebelApp.S_App.GetActiveView().GetApplet(h[f].childName).PostChangesToBC(true,null,true)}if((e.indexOf("s_S_A"+h[f].id+"_div")===0&&h[f].displayState===false)||(e.indexOf("s_S_A"+h[f].id+"_div")!==0&&h[f].displayState===true)){h[f].displayState=!h[f].displayState;this.ExecuteMethod("ComponentStateChange",h[f].id,h[f].displayState)}}}function a(f,e){}return b}());return"SiebelAppFacade.notificationviewpm"})};