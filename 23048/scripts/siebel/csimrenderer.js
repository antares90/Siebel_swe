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
if(typeof(SiebelAppFacade.CSimRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.CSimRenderer");define("siebel/csimrenderer",["siebel/jqgridrenderer"],function(){SiebelAppFacade.CSimRenderer=(function(){function a(b){SiebelAppFacade.CSimRenderer.superclass.constructor.call(this,b)}SiebelJS.Extend(a,SiebelAppFacade.JQGridRenderer);a.prototype.ShowUI=function(){SiebelAppFacade.CSimRenderer.superclass.ShowUI.call(this);$("#s_"+this.GetPM().Get("GetFullId")+"_div").addClass("siebui-telco-no-title")};a.prototype.BindEvents=function(){SiebelAppFacade.CSimRenderer.superclass.BindEvents.call(this);var c=this.GetPM(),b=c.Get("GetControls")["Change SIM"].GetInputName()+"_Ctrl";c.AddProperty("launchpad_is","collapsed");$("#"+b).bind("mouseover",function(){$(".siebui-custdash-toggle-applet").attr("id","qcsapplet");$("#qcsapplet").addClass("siebui-show-quick-applet")});$(".siebui-applet-container").bind("click",{ctx:this,PM:c},function(d){var e=d.data.PM;$(".siebui-quick-applet-combobox input").val("");$(".siebui-quick-applet-input input").val("");if(e.Get("launchpad_is")==="expanded"){e.SetProperty("launchpad_is","collapsed");if($("#qcsapplet").hasClass("siebui-show-quick-applet")){$("#qcsapplet").removeClass("siebui-show-quick-applet")}}else{e.SetProperty("launchpad_is","expanded")}})};return a}());return"SiebelAppFacade.CSimRenderer"})};