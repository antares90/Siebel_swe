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
if(typeof(SiebelAppFacade.barcdviewpr)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.barcdviewpr");define("siebel/barcdviewpr",["siebel/viewpr"],function(){SiebelAppFacade.barcdviewpr=(function(){var b=SiebelJS.Dependency("SiebelApp.Constants");var a=SiebelApp.S_App.LocaleObject;function d(e){SiebelAppFacade.barcdviewpr.superclass.constructor.call(this,e)}SiebelJS.Extend(d,SiebelAppFacade.ViewPR);d.prototype.EndLife=function(){var e=this.GetPM();$("div[id ='BarcodeButtons']").remove()};d.prototype.ShowUI=function(){if(SiebelApp.S_App.GetOfflineMode&&SiebelApp.S_App.GetOfflineMode()&&$("#_sweview > div[id ='BarcodeButtons']").length>0){$("#_sweview > div[id ='BarcodeButtons']").each(function(){$(this).remove()})}var g=this.GetPM();var f=g.Get(b.get("SWE_BARCODE_DRIVER"));var j=g.Get(b.get("SWE_BARCODE_OP"));var i=SiebelApp.S_App.GetActiveView().GetApplet(f).GetControls();var l=i.BarcodeNew.GetInputName();var h=i.BarcodeUpdate.GetInputName();var e=i.BarcodeCombo.GetInputName();SiebelAppFacade.barcdviewpr.superclass.ShowUI.call(this);$("[name="+e+"]").addClass("siebui-barcode-field");$("[name="+e+"]").attr("id",$("[name="+e+"]").attr("name"));$("[name="+e+"]").attr("title",a.GetLocalString("IDS_BARCODE_TEXT")+" "+a.GetLocalString("IDS_SWE_COMBO_FIELD"));if(SiebelApp.S_App.IsAutoOn()){$("[id="+l+"_Ctrl]").attr("ot","BarcodeNewBtn");$("[id="+l+"_Ctrl]").attr("rn","BarcodeNewBtn");$("[id="+l+"_Ctrl]").attr("un","BarcodeNewBtn");$("[id="+h+"_Ctrl]").attr("ot","BarcodeUpdateBtn");$("[id="+h+"_Ctrl]").attr("rn","BarcodeUpdateBtn");$("[id="+h+"_Ctrl]").attr("un","BarcodeUpdateBtn");$("[name="+e+"]").attr("ot","BarcodeComboBox");$("[name="+e+"]").attr("rn","BarcodeComboBox");$("[name="+e+"]").attr("un","BarcodeComboBox")}e=SiebelApp.S_App.GetActiveView().GetApplet(f).GetControls().BarcodeScanText.GetInputName();$("[name="+e+"]").addClass("siebui-barcode-text");$("[name="+e+"]").attr("id",$("[name="+e+"]").attr("name"));$("[name="+e+"]").attr("title",a.GetLocalString("IDS_BARCODE_TEXT")+" "+a.GetLocalString("IDS_SEARCH_OUI_SRCH_TEXTBOX"));if(SiebelApp.S_App.IsAutoOn()){$("[name="+e+"]").attr("ot","BarcodeTextBox");$("[name="+e+"]").attr("rn","BarcodeTextBox");$("[name="+e+"]").attr("un","BarcodeTextBox")}if(!SiebelAppFacade.DecisionManager.IsTouch()){$("[name="+e+"]").addClass("siebui-no-display")}$("[id="+l+"_Ctrl]").addClass("siebui-icon-barcode-add");$("[id="+h+"_Ctrl]").addClass("siebui-icon-barcode-edit");$("[id="+l+"_Ctrl]").attr("title",a.GetLocalString("IDS_BARCODE_TEXT")+" "+a.GetLocalString("IDS_NEW_STRING"));$("[id="+h+"_Ctrl]").attr("title",a.GetLocalString("IDS_BARCODE_TEXT")+" "+a.GetLocalString("IDS_BARCODE_TOOLTIP_UPDATE"));var k=$("div[id ='BarcodeButtons']").detach();k.addClass("siebui-barcode");$("#_sweview").prepend(k);g.SetProperty(b.get("SWE_BARCODE_HIGHLIGHT"),true);g.AddProperty(b.get("SWE_BARCODE_STYLE"),"New");g.AttachPMBinding(b.get("SWE_BARCODE_STYLE"),this.BarcodeStyler)};function c(){var f=this.GetPM();var i=f.Get(b.get("SWE_BARCODE_STYLE"));var e=f.Get(b.get("SWE_BARCODE_DRIVER"));var h=SiebelApp.S_App.GetActiveView().GetApplet(e).GetControls();var j=h.BarcodeNew.GetInputName();var g=h.BarcodeUpdate.GetInputName();if(SiebelApp.S_App.uiStatus.IsBusy()){SiebelApp.S_App.uiStatus.Free()}}d.prototype.BindEvents=function(){var g=this.GetPM();var f=g.Get(b.get("SWE_BARCODE_DRIVER"));var e=SiebelApp.S_App.GetActiveView().GetApplet(f).GetControls().BarcodeScanText.GetInputName();if(SiebelApp.S_App.GetOfflineMode&&SiebelApp.S_App.GetOfflineMode()){$(".siebui-icon-barcodenew").bind("click",{ctx:this},function(h){h.data.ctx.GetPM().SetProperty(b.get("SWE_BARCODE_STYLE"),"New");c.call(h.data.ctx)});$(".siebui-icon-barcodeupdate").bind("click",{ctx:this},function(h){h.data.ctx.GetPM().SetProperty(b.get("SWE_BARCODE_STYLE"),"Update");c.call(h.data.ctx)})}$("[name="+e+"]").bind("keypress",{ctx:this},function(j){var h=j.data.ctx.GetPM();if(((j.which===28||j.which===92)&&j.ctrlKey===true)||(j.which===$.ui.keyCode.ENTER)){h.SetProperty(b.get("SWE_BARCODE_METHOD_NAME"),"BarcodeEntry");var i=$("[name="+e+"]").val();h.SetProperty(b.get("SWE_BARCODE_SCAN_TEXT"),i);h.OnControlEvent(b.get("SWE_BARCODE_ON_SCAN"));$("[name="+e+"]").val("")}});SiebelApp.S_App.GetTargetViewContainer().bind("keypress",{ctx:this},function(i){var j=i.data.ctx;var h=j.GetPM();if(((i.which===28||i.which===92)&&i.ctrlKey===true)||(i.which===$.ui.keyCode.ENTER)){if(!SiebelAppFacade.DecisionManager.IsTouch()){$("[name="+e+"]").removeClass("siebui-no-display")}$("[name="+e+"]").focus()}})};return d}());return"SiebelAppFacade.barcdviewpr"}())};