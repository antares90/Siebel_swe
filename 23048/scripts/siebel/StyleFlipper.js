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
SiebelApp.ThemeManager=function(){var c={};var b=[];function a(f){if(f){for(var e in f.css){$("#"+e).remove()}}}function d(f){if(f){if(typeof(f.css)==="object"){for(var e in f.css){if(f.css.hasOwnProperty(e)){if(f.css[e]){if($("#"+e)[0]){$("#"+e).attr("href",f.css[e])}else{if(document.createStyleSheet){document.createStyleSheet(f.css[e]);$("link[href='"+f.css[e]+"'").attr("id",e)}else{$("head").append("<link id='"+e+"' type='text/css' href='"+f.css[e]+"' rel='stylesheet' />")}}}}}}}}return{getTheme:function(e){return c[e]||{}},isChangeAllowed:function(){return true},addTheme:function(e,f){c[e]=f},unLoadStyle:function(e){if(c[e]){a(c[e]);delete c[e]}},flipTheme:function(f,e){var h={};h.css=new Object();for(var g=0;g<e.length;g++){var j=f+g;h.css[j]=e[g]}this.addTheme(f,h);d(c[f])}}}();SiebelApp.ThemeFlipper=function(b){var a=b;this.getDelegate=function(){return a}};SiebelApp.ThemeFlipper.prototype.FlipStyle=function(){this.getDelegate().flipTheme()};SiebelApp.ThemeFlipper.prototype.setStyleState=function(){this.getDelegate().setStyleState()};new SiebelApp.ThemeFlipper(SiebelApp.ThemeManager);SiebelApp.LayoutTransitionsMgr=(function(){var c="";var a=null;function d(){if(a===null){a=false;var f=$("#_svf0")[0],e=f.style;a="transform" in e||"WebkitTransform" in e||"MozTransform" in e||"OTransform" in e||"msTransform" in e;f=e=null}return a}function b(e){return e==="_svf0"}return{setTransition:function(e){e=e.toLowerCase();$(".siebui-prev-"+c+"-begin").removeClass("siebui-prev-"+c+"-begin");$(".siebui-prev-"+c+"-end").removeClass("siebui-prev-"+c+"-end");$(".siebui-next-"+c+"-begin").removeClass("siebui-next-"+c+"-begin");$(".siebui-next-"+c+"-end").removeClass("siebui-next-"+c+"-end");c=e},IsEnable:function(){if(c==="none"||!c.match(/\S/)){return false}else{return true}},Setup:function(f){if(this.IsEnable()&&b(f)){if(typeof(c)==="function"){c.call(window,"setup",f)}else{if(c&&d()){var e=$("#"+f);if($("#"+f+"_temp").length===0){e.after("<div id='"+f+"_temp'></div>")}$("#"+f+"_temp").empty().removeClass("siebui-prev-"+c+"-begin siebui-prev-"+c+"-end").append(e.children().clone().removeAttr("id").removeAttr("name").find("*").removeAttr("id").removeAttr("name").end()).show().addClass("siebui-prev-"+c+"-begin");e.removeClass("siebui-next-"+c+"-begin siebui-next-"+c+"-end").addClass("siebui-next-"+c+"-begin");e=null}}}},ShowTransition:function(e){if(this.IsEnable()){if(typeof(c)==="function"){c.call(window,"execute",e)}else{if(c&&d()){$("#"+e+"_temp").addClass("siebui-prev-"+c+"-end");setTimeout(function(){$("#"+e).addClass("siebui-next-"+c+"-end")},1);setTimeout(function(){$("#"+e+"_temp").empty()},500)}}}}}})();