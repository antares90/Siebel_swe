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
if(typeof(SiebelAppFacade.edetailerthreadbar)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.edetailerthreadbar");define("siebel/edetailerthreadbar",["siebel/TileLayoutPR"],function(){SiebelAppFacade.edetailerthreadbar=(function(){var a=SiebelJS.Dependency("SiebelApp.Constants");var c=true;var b=false;function d(f){SiebelAppFacade.edetailerthreadbar.superclass.constructor.call(this,f);var e=f;this.GetPM=function(){return e}}SiebelJS.Extend(d,SiebelAppFacade.TileLayoutPR);d.prototype.Init=function(){SiebelAppFacade.edetailerthreadbar.superclass.Init.call(this);this.AttachPMBinding("ShowSelection",this.ShowSelection)};d.prototype.ShowUI=function(h){SiebelAppFacade.edetailerthreadbar.superclass.ShowUI.call(this,h);var g=this.GetPM();var j=g.Get("GetFullId");var f=SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM();if(f.Get("ThreadbarFullId")===""){f.AddProperty("ThreadbarFullId",j)}var i=$("#"+j);i.find(".AppletButtons").hide();i.find(".siebui-tile-container").addClass("siebui-edetailing-threadbar-tile-container");i.addClass("siebui-thread");var e=localStorage.getItem("isAdfmContainer");if(e==="1"){i.addClass("siebui-thread-maf")}};d.prototype.BindEvents=function(e){SiebelAppFacade.edetailerthreadbar.superclass.BindEvents.call(this,e)};d.prototype.BindData=function(k){b=true;var g=this.GetPM();var j=$("#"+g.Get("GetFullId"));j.show();SiebelAppFacade.edetailerthreadbar.superclass.BindData.call(this,k);var e=g.Get("GetControls");$('[name="SWEForm4_0"]').addClass("siebui-edetailing-player-threadbar");this.GetContainer().find(".siebui-tile-list").find("img").addClass("siebui-preview-img");$(".siebui-edetailing-threadbar-prev-container").on("click",function(){var l=SiebelAppFacade.ComponentMgr.FindComponent({id:SiebelApp.S_App.GetActiveView().GetName()}).GetPM();if(l.Get("Mode")==="Related"){return}var i=g.Get("GetRecordSet")[g.Get("GetSelection")];var m=i["Parent Disable Nav Flag"];if(m==="Y"){return}j.show();setTimeout(function(){j.hide()},9000)});j.mouseenter(function(){c=false});j.mouseleave(function(){c=true});$("#s_vctrl_div_tabScreen").hide();j.find(".siebui-tile-image").hide();j.hide();for(var h in e){if(e.hasOwnProperty(h)){if(e[h].GetHTMLAttr()==="eDetailing Control"){for(var f=0;f<this.GetUIWrapper(e[h]).GetEl().length;f++){this.GetUIWrapper(e[h]).GetEl().eq(f).parent().hide()}}}}};d.prototype.ShowSelection=function(){SiebelAppFacade.edetailerthreadbar.superclass.ShowSelection.call(this);this.GetContainer().find("img").addClass("siebui-preview-img");var f=this.GetPM();var e=localStorage.getItem("isAdfmContainer");if(e==="1"&&(SiebelApp.S_App.GetOfflineMode&&SiebelApp.S_App.GetOfflineMode())){SiebelApp.MobileFileMgr.GetHttpURLPrefix({success:function(k){var h=f.Get("GetRecordSet").length;if(h>0){for(var l=0;l<h;l++){var n=f.Get("GetRecordSet")[l];var r=n.LitFileExt;if(r==="zip"||r==="ZIP"){var j=n["Image With Path"];var o=j.split("\\");var q=o.length;if(n["Thumbnail Id"]){offlineFileName="S_LIT_"+n["Thumbnail Id"]+"_"+n["Thumbnail Rev Id"]+"/"+o[q-2]+"/"+o[q-1]}else{var m=n["Literature Id"];var g=n.LitFileRev;offlineFileName="S_LIT_"+m+"_"+g+"/"+o[q-2]+"/"+o[q-1]}}else{offlineFileName="S_LIT_"+n["Thumbnail Id"]+"_"+n["Thumbnail Rev Id"]+"."+n["Thumbnail Extension"]}if(b===true){var p=k+"/"+offlineFileName;if($("#"+f.Get("GetFullId")+"_tile_"+(l)).find("img")[0]){$("#"+f.Get("GetFullId")+"_tile_"+(l)).find("img")[0].src=p}}else{if(b===false&&f.Get("GetSelection")===l){var p=k+"/"+offlineFileName;if($("#"+f.Get("GetFullId")+"_tile_"+(l)).find("img")[0]){$("#"+f.Get("GetFullId")+"_tile_"+(l)).find("img")[0].src=p}}}}}b=false},error:function(g){alert(g)}})}if(SiebelAppFacade.DecisionManager.IsTouch()&&$(".siebui-icon-fullscreen").length>0){$(".siebui-icon-fullscreen").hide()}};return d}());return"SiebelAppFacade.edetailerthreadbar"})};