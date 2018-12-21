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
if(typeof(SiebelAppFacade.barcdviewpm)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.barcdviewpm");define("siebel/barcdviewpm",["siebel/viewpm"],function(){SiebelAppFacade.barcdviewpm=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants");function d(f){SiebelAppFacade.barcdviewpm.superclass.constructor.call(this,f)}SiebelJS.Extend(d,SiebelAppFacade.ViewPM);d.prototype.Init=function(){SiebelAppFacade.barcdviewpm.superclass.Init.apply(this,arguments);this.AttachEventHandler(a.get("SWE_BARCODE_ON_SCAN"),function(){var f=SiebelApp.S_App.GetActiveView().GetApplet(this.Get(a.get("SWE_BARCODE_DRIVER"))).GetPModel();var g=CCFMiscUtil_CreatePropSet();if(this.Get(a.get("SWE_BARCODE_SCAN_TEXT"))==a.get("SWE_BARCODE_NEW")){f.ExecuteMethod(a.get("SWE_BARCODE_NEW_OP"))}else{if(this.Get(a.get("SWE_BARCODE_SCAN_TEXT"))==a.get("SWE_BARCODE_UPDATE")){f.ExecuteMethod(a.get("SWE_BARCODE_UPDATE_OP"))}else{f.ExecuteMethod(a.get("SWE_CMD_INVOKE_METHOD_STR"),this.Get("MethodName"),g)}}});this.AddProperty(a.get("SWE_BARCODE_HIGHLIGHT"),false);this.AttachPMBinding(a.get("SWE_BARCODE_HIGHLIGHT"),this.BarcodeHighlighter)};function b(){var f=SiebelApp.S_App.GetActiveView().GetApplet(this.Get(a.get("SWE_BARCODE_DRIVER"))).GetPModel();f.AddMethod(a.get("SWE_BARCODE_NEW_OP"),c);f.AddMethod("BarcodeUpdateOp",e)}function c(){var g="";var f;this.ExecuteMethod(a.get("SWE_CMD_INVOKE_METHOD_STR"),a.get("SWE_BARCODE_METHOD_NEW"));f=CCFMiscUtil_CreatePropSet();f.SetType("GetProfileAttr");f.SetProperty("attrName",a.get("SWE_BARCODE_OP"));g=SiebelApp.S_App.CallServerApp("GetProfileAttr",f);if(g=="New"){barcodepm.SetProperty(a.get("SWE_BARCODE_STYLE"),a.get("SWE_BARCODE_METHOD_NEW"))}}function e(){var g="";var f;this.ExecuteMethod(a.get("SWE_CMD_INVOKE_METHOD_STR"),a.get("SWE_BARCODE_METHOD_UPDATE"));f=CCFMiscUtil_CreatePropSet();f.SetType("GetProfileAttr");f.SetProperty("attrName",a.get("SWE_BARCODE_OP"));g=SiebelApp.S_App.CallServerApp("GetProfileAttr",f);if(g=="Update"){barcodepm.SetProperty(a.get("SWE_BARCODE_STYLE"),"Update")}}d.prototype.Setup=function(f){SiebelAppFacade.barcdviewpm.superclass.Setup.call(this,f);var g=f.GetChildByType("vpm");this.AddProperty(a.get("SWE_BARCODE_DRIVER"),g.GetProperty(a.get("SWE_BARCODE_DRIVER")));this.AddProperty(a.get("SWE_BARCODE_OP"),g.GetProperty(a.get("SWE_BARCODE_OP")));barcodepm=this};d.prototype.EndLife=function(){barcodepm=""};return d}());return"SiebelAppFacade.barcdviewpm"})};