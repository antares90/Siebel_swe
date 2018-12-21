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
if(typeof(SiebelAppFacade.HBNavPlugin)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.HBNavPlugin");define("siebel/hamburgernav",[],function(){SiebelAppFacade.HBNavPlugin=(function(){var h=SiebelJS.Dependency("SiebelApp.Utils");function a(k){this.cfg={showIcon:true,hbClass:"siebui-nav-hb-btn",collapseClass:"siebui-nav-hb-closed",expandClass:"siebui-nav-hb-open",visibleClass:"siebui-nav-hb-visible",hiddenClass:"siebui-nav-hb-invisible",forceExpandClass:"siebui-nav-hb-expanded"};$.extend(this.cfg,k)}a.prototype.CanManage=function(){return true};a.prototype.addTemplate=function(m){var o=false;if(m.length&&m.find("li").length&&m.find("button."+this.cfg.hbClass).length===0){var k=i.call(this,this.cfg.id),l="<span class='siebui-icon-bar'></span><span class='siebui-icon-bar'></span><span class='siebui-icon-bar'></span>",n="";n='<button class="'+this.cfg.hbClass+" "+(m.find("li").length>0?"siebui-display":"siebui-no-display")+'" >'+(this.cfg.showIcon?l:k)+"</button>";if(this.cfg.showIcon){n+='<span class="siebui-hb-header" >'+k+"</span>"}m.prepend(n);o=true;l=n=m=null}return o};a.prototype.Refresh=function(){var l=$("#"+this.cfg.id);if(l.length&&l.find("button."+this.cfg.hbClass).length){var k=i.call(this,this.cfg.id);if(this.cfg.showIcon){l.find("span.siebui-hb-header").html(k)}else{l.find("button."+this.cfg.hbClass).html(k)}}};a.prototype.Manage=function(m,n){var k=this,l=$("#"+k.cfg.id);if(k.addTemplate(l)){l.find("ul").eq(0).hide().addClass(k.cfg.collapseClass).removeClass(k.cfg.visibleClass).addClass(k.cfg.hiddenClass);setTimeout(function(){l.find("ul").eq(0).show();l=null},1);c.call(this,l,m)}if(m){l.find("button."+this.cfg.hbClass).addClass("siebui-no-display").end().find("span.siebui-hb-header").addClass("siebui-no-display");if(!l.find("button."+this.cfg.hbClass).is(":visible")){f.call(this,l.find("ul").eq(0));l.find("ul").eq(0).addClass(this.cfg.forceExpandClass)}}if(n){l.find("button."+this.cfg.hbClass).attr({role:"presentation",title:n});l.find("ul").eq(0).attr("tabindex","-1")}};function f(k){k.removeClass(this.cfg.collapseClass).addClass(this.cfg.expandClass).removeClass(this.cfg.hiddenClass).addClass(this.cfg.visibleClass)}function e(k){k.removeClass(this.cfg.expandClass).addClass(this.cfg.collapseClass).removeClass(this.cfg.visibleClass).addClass(this.cfg.hiddenClass)}function c(k,l){k.undelegate("button."+this.cfg.hbClass,"click",{ctx:this,state:l},d).delegate("button."+this.cfg.hbClass,"click",{ctx:this,state:l},d).unbind("focusout.HBNavPlugin",{ctx:this,state:l},b).bind("focusout.HBNavPlugin",{ctx:this,state:l},b);$(window).unbind("resize.HBNavPlugin orientationchange.HBNavPlugin",{ctx:this,state:l},g).bind("resize.HBNavPlugin orientationchange.HBNavPlugin",{ctx:this,state:l},g)}function i(m){var l=$("#"+m),k=l.find("li.siebui-active-navtab").find("a");return(k.length!==0)?k.text():""}function d(k){var l=k.data.ctx,m=$(this).parent().find("ul").eq(0);if(k.data.state&&!$(this).is(":visible")){return}if(m.hasClass(l.cfg.collapseClass)){f.call(l,m);if(m.find("li.siebui-active-navtab").length){m.find("li.siebui-active-navtab").eq(0).focus()}}else{e.call(l,m)}m=null}function g(k){var l=k.data.ctx,m=$("#"+l.cfg.id).find("button."+l.cfg.hbClass),n=m.parent().find("ul").eq(0);if(k.data.state){if(m.is(":visible")){if(n.hasClass(l.cfg.forceExpandClass)){n.removeClass(l.cfg.forceExpandClass);e.call(l,n);return}}else{if(!n.hasClass(l.cfg.forceExpandClass)){f.call(l,n);n.addClass(l.cfg.forceExpandClass)}return}}if(n.hasClass(l.cfg.expandClass)){e.call(l,n)}n=m=null}function b(k){var l=this;if(k.data.state&&!$(this).find("button."+k.data.ctx.cfg.hbClass).is(":visible")){return}setTimeout(function(){j.call(l,k);l=k=null},1)}function j(k){if($(this).find($(document.activeElement)).length===0&&this!==document.activeElement){var l=k.data.ctx,m=$(this).find("ul").eq(0);if(m.hasClass(l.cfg.visibleClass)){e.call(l,m)}m=null}}return a}());return SiebelAppFacade.HBNavPlugin})};