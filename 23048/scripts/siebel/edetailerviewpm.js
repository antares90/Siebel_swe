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
if(typeof(SiebelAppFacade.edetailerviewpm)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.edetailerviewpm");define("siebel/edetailerviewpm",["siebel/viewpm"],function(){SiebelAppFacade.edetailerviewpm=(function(){function c(g){SiebelAppFacade.edetailerviewpm.superclass.constructor.call(this,g)}SiebelJS.Extend(c,SiebelAppFacade.ViewPM);c.prototype.Init=function(){SiebelAppFacade.edetailerviewpm.superclass.Init.apply(this,arguments);this.AddMethod("PrepareStateInfo",d);this.AddMethod("SysPref",f);this.AddMethod("ComponentStateChange",a);this.AddMethod("ButtonCanInvoke",b);this.AddMethod("ChangeState",e);this.AddProperty("LastUpdatedRec","");this.AddProperty("PlayerApplet","");this.AddProperty("RelatedApplet","");this.AddProperty("DetailingStartTime","");this.AddProperty("hotspotappletname","");this.AddProperty("PlayerStartTime","");this.AddProperty("RelatedStartTime","");this.AddProperty("Mode","");this.AddProperty("UpdatePlayer","N");this.AddProperty("ThreadbarFullId","");this.AttachEventHandler("TabClick","ChangeState");this.AddProperty("m_sessionData",CCFMiscUtil_CreatePropSet());this.AddProperty("hotspotRelatedStartTime","");this.AddProperty("hotspotRelatedEndTime","");this.AddProperty("visited","N");this.AddProperty("GetSysPref","");this.AddProperty("GetCrossInd","")};c.prototype.Setup=function(g){SiebelAppFacade.edetailerviewpm.superclass.Setup.call(this,g)};function f(){var i;var j;var h=SiebelApp.S_App.GetService("LS PCD Service");var g=SiebelApp.S_App.NewPropertySet();var l=SiebelApp.S_App.NewPropertySet();if(h){var k={};k.async=false;k.scope=this;k.npr=true;k.selfbusy=true;k.cb=function(){g=arguments[2];i=g.childArray[0].GetProperty("RetVal");j=g.childArray[0].GetProperty("CrossIndRetVal");this.AddProperty("GetSysPref",i);this.AddProperty("GetCrossInd",j)};h.InvokeMethod("GeteDetailingSysPref",l,k)}}function d(n){var j=[];var i=[];var t=SiebelAppFacade.ComponentMgr.FindComponent({id:this.Get("PlayerApplet")});var g=SiebelAppFacade.ComponentMgr.FindComponent({id:this.Get("RelatedApplet")});j.push(t);j.push(g);var k=[];var o=SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()});this.AddProperty("View",o);if(j){for(var l=0,h=j.length;l<h;l++){var s="#s_S_A"+j[l].Get("GetId")+"_div";i.push(s);var w=n.indexOf("#s_S_A"+j[l].Get("GetId")+"_div");var r=(n.indexOf("#s_S_A"+j[l].Get("GetId")+"_div")===0);var v={childName:j[l].Get("GetName"),childLabel:j[l].Get("GetAppletLabel"),id:j[l].Get("GetId"),displayState:(r?true:false)};this.ExecuteMethod("ComponentStateChange",v.id,v.displayState);k.splice(w,0,v)}}this.AddProperty("ChildComponentState",k);var p;var x=SiebelApp.S_App.GetService("LS PCD Service");var m=SiebelApp.S_App.NewPropertySet();var u=SiebelApp.S_App.NewPropertySet();if(x){var q={};q.async=false;q.scope=this;q.npr=true;q.selfbusy=true;q.cb=function(){m=arguments[2];p=m.childArray[0].GetProperty("RetVal");if(p==="Y"){var z=SiebelAppFacade.ComponentMgr.FindComponent({id:"Contact Feedback List VBC Applet"});j.push(z);var A="#s_S_A"+j[l].Get("GetId")+"_div";i.push(A);var y=n.indexOf("#s_S_A"+j[2].Get("GetId")+"_div");v={childName:j[l].Get("GetName"),childLabel:j[l].Get("GetAppletLabel"),id:j[l].Get("GetId"),displayState:(r?true:false)};v.displayState="";$("#s_S_A"+v.id+"_div").addClass("siebui-addcontact-applet");this.ExecuteMethod("ComponentStateChange",v.id,v.displayState);k.splice(y,0,v);this.AddProperty("ChildComponentState",k)}};x.InvokeMethod("GeteDetailingSysPref",u,q)}}function e(g){var j=this.Get("ChildComponentState");for(var h=0,i=j.length;h<i;h++){if(h!=="2"){j[h].displayState=!j[h].displayState}this.ExecuteMethod("ComponentStateChange",j[h].id,j[h].displayState)}}function a(h,g){}function b(){var g=0}return c}());return"SiebelAppFacade.edetailerviewpm"})};