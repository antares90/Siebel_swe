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
/* 8.1.1.14SIA[23044]PATCHSET10 */
if(typeof(SiebelAppFacade.ToolbarRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.ToolbarRenderer");var utils=SiebelJS.Dependency("SiebelApp.Utils");var consts=SiebelJS.Dependency("SiebelApp.Constants");define("siebel/toolbarrenderer",["siebel/basephyrenderer"],function(){SiebelAppFacade.ToolbarRenderer=(function(){var c=consts.get("SWE_PST_QTP_INFO");var f=consts.get("SWE_PST_BUTTON_CTRL");var h=consts.get("SWE_CTRL_LINK");var e=consts.get("SWE_CTRL_IMAGECONTROL");var j=consts.get("SWE_CTRL_TEXTDATA");function i(m){var l;this.SetToolbarMap=function(n){l=n};this.GetToolbarMap=function(){return l};SiebelAppFacade.ToolbarRenderer.superclass.constructor.call(this,m)}SiebelJS.Extend(i,SiebelAppFacade.BasePR);i.prototype.Init=function(){SiebelAppFacade.ToolbarRenderer.superclass.Init.call(this);this.AttachPMBinding("Update",k)};function d(){var l=SiebelApp.S_App.GetName();return(l==="Siebel CX Partner Portal"||l==="Siebel HTIM PRM"||l==="Siebel Public Sector PRMPortal")}function g(m){var q=false;for(var n=0,l=m.length;n<l;n++){var p=m[n],o=p.GetProperty("type");if(o&&o!==c){q=true;break}}return q}i.prototype.ShowUI=function(){SiebelAppFacade.ToolbarRenderer.superclass.ShowUI.call(this);var C=this.GetPM(),H=C.Get("itemArray"),t=C.Get("placeholder"),B={},D={},w=SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_APPTOOLBAR_TITLE"),p,l,y=SiebelApp.S_App.GetDirection();for(p=0;p<H.length;p++){var z=H[p],q=C.ExecuteMethod("CanInvoke",z.GetProperty("command")),o=z.GetProperty("type"),m=z.GetProperty("toolbarname")||"",r=z.GetProperty("name")||"",x=z.GetProperty("offbitmap"),u=z.GetProperty("onbitmap"),G="siebui-toolbar-"+m.replace(/\s+/g,"-").toLowerCase(),F=($("#"+G).length>0)?"#"+G:"#"+t,E="N";if(!D[F]){D[F]=($("#"+G).length>0)?"role='navigation' aria-label='"+m:"role='toolbar' aria-label='"+w}l=B[F]||"";if(g.call(this,z.childArray)){E="Y";q=true}switch(o){case f:case h:case e:var A=z.GetChildByType(consts.get("SWE_PST_QTP_INFO")),n=!q?"ToolbarButtonOff":"ToolbarButtonOn";l+="<li id = 'tb_"+p+"' class='"+(!q?"siebui-toolbar-disable":"siebui-toolbar-enable")+(y?" siebui-rtl-element-right":"")+"' data-cmd='"+z.GetProperty("command")+"' data-subtoolbar='"+E+"' role = 'button'  title = '"+z.GetProperty("caption")+"' name='"+r+"' tabindex='"+(p===0?0:-1)+"' data-tbindex='"+p+"'><span class='siebui-icon-tb-"+r.toLowerCase().replace(/ /g,"_")+" "+n+"'><img src='"+((!q&&!!x)?x:u)+"' class='"+n+"' ";if(A){l+=consts.get("SWE_PROP_QTP_OT")+"='"+A.GetProperty(consts.get("SWE_PROP_QTP_OT"))+"' "+consts.get("SWE_PROP_QTP_RN")+"='"+A.GetProperty(consts.get("SWE_PROP_QTP_RN"))+"' "+consts.get("SWE_PROP_QTP_UN")+"='"+A.GetProperty(consts.get("SWE_PROP_QTP_UN"))+"'"}l+="/></span></li>";B[F]=l;break}}var v;for(var s in B){v="<ul class='siebui-toolbar' "+(D[s]||"")+"' >";B[s]=v+B[s]+"</ul>";$(s).html(B[s]);$(s).find("li.siebui-toolbar-enable").eq(0).attr("tabindex","0")}this.SetToolbarMap(B);SiebelAppFacade.LegacyCssSupport.addLegacyClass($("#"+t))};i.prototype.BindEvents=function(){SiebelAppFacade.ToolbarRenderer.superclass.BindEvents.call(this);var n=new SiebelApp.UIStatus();var l;var m=this.GetToolbarMap();for(l in m){$(l).delegate("li.siebui-toolbar-enable","click",{ctx:this},function(o){var q=$(this).attr("data-subtoolbar");if(q==="N"){var p=$(this).attr("data-cmd");setTimeout(function(){o.data.ctx.GetPM().OnControlEvent("TOOLBAR_INVOKE",p)},0)}else{b.call(o.data.ctx,$(this))}});$(l).delegate("li.siebui-toolbar-enable","keydown",{ctx:this},function(o){a.call(o.data.ctx,$(this),o,n)});l=null}if($("#_sweviewbar").length){$("#_sweviewbar").before('<div class="siebui-callout-one"></div><div class="siebui-callout-two"></div>')}if((SiebelApp.Utils.IsTrue(SiebelApp.S_App.IsSui())||d())&&$(".siebui-button-toolbar").length){$(".siebui-button-toolbar").addClass("siebui-closed");$("html").bind("click",function(o){var p=$(".siebui-button-toolbar");if(p.hasClass("siebui-open")){p.removeClass("siebui-open");p.addClass("siebui-closed")}p=null});$(".siebui-button-toolbar").bind("click",function(o){o.stopPropagation();var p=$(this);if(p.hasClass("siebui-closed")){p.removeClass("siebui-closed");p.addClass("siebui-open")}else{p.removeClass("siebui-open");p.addClass("siebui-closed")}p=null})}};function b(o){var C=this.GetPM();var J=C.Get("itemArray");var z=J[o.attr("data-tbindex")];var s=z.GetProperty("name")||"";s=s.replace(/\s+/g,"-").toLowerCase();var r=z.childArray;var l=z.GetProperty("toolbarname")||"";var I=$("#toolbar_popup");var H=l.replace(/\s+/g,"-").toLowerCase();H="siebui-toolbar-"+H;var x=$("#"+H);if(r.length<=0){return}if(I.length>0){I.remove()}var m;var u="";var E="";var w="";var F="";var n="";for(var A=0;A<r.length;A++){var v=r[A];var t=C.ExecuteMethod("CanInvoke",v.GetProperty("command"));var q=v.GetProperty("type");var B;B=v.GetProperty("name")||"";F=' ot="'+v.GetProperty("type")+'" rn="'+B+'" un="'+v.GetProperty("caption")+'" ';B=B.replace(/\s+/g,"-").toLowerCase();switch(q){case e:n="siebui-tb-item-img";u+="<div autofocus tabindex="+(A+1)+' id="tb_item_'+A+'" class="'+n+'"><span '+F+'><span class="siebui-icon-'+B.toLowerCase().replace(" ","_")+'"><img src="'+v.GetProperty("onbitmap")+'"></img></span></span></div>';break;case j:n="siebui-tb-item-text";var D=v.GetProperty("caption");if(!utils.IsEmpty(D)){E+="<div tabindex="+(A+1)+' id="tb_item_'+A+'" class="'+n+'"><span '+F+">"+D+"</span></div>"}break;case f:case h:var y;var G=(!t&&!!v.GetProperty("offbitmap"))?v.GetProperty("offbitmap"):v.GetProperty("onbitmap");if(G){y="<span class='siebui-icon-"+B.toLowerCase().replace(" ","_")+"'><img src='"+G+"' /></span>"}else{y=v.GetProperty("caption")}n="siebui-tb-item-btn";w+="<div tabindex="+(A+1)+' id="tb_item_'+A+'" class="'+n+" "+(!t?"ui-state-disabled":"siebui-tb-item-enabled")+'" data-cmd="'+v.GetProperty("command")+'"><button class="siebui-ctrl-btn appletButton"'+F+">"+y+"</button></div>";break}}m='<div id="toolbar_popup" name="toolbar_popup" class="siebui-tb-popup"><div class="siebui-tb-popup-top">'+u+E+'</div><div class="siebui-tb-popup-bottom">'+w+"</div></div>";$(x).append(m);$("#toolbar_popup").dialog({modal:true,autoOpen:false,closeOnEscape:true,dialogClass:H+"-popup"});$("#toolbar_popup").dialog("open");$(document).undelegate(".ui-widget-overlay","click.toolbarrenderer");$(document).delegate(".ui-widget-overlay","click.toolbarrenderer",function(){$("#toolbar_popup").dialog("close")});var p=$("div.siebui-tb-item-enabled");p.unbind("click.toolbaritem");p.bind("click.toolbaritem",{ctx:this},function(K){var L=$(this).attr("data-cmd");K.data.ctx.GetPM().OnControlEvent("TOOLBAR_INVOKE",L);$("#toolbar_popup").dialog("close")});return false}function a(o,p,s){var n=this.GetPM();s=s||new SiebelApp.UIStatus();if(o&&o.length===1&&p){switch(p.which){case $.ui.keyCode.LEFT:o=o.parent().children().filter('[tabindex^="0"]');var m=o.prevAll("li.siebui-toolbar-enable").eq(0);if(m.length===1){o.attr("tabIndex","-1");m.attr("tabIndex","0").focus()}break;case $.ui.keyCode.RIGHT:o=o.parent().children().filter('[tabindex^="0"]');
var l=o.nextAll("li.siebui-toolbar-enable").eq(0);if(l.length===1){o.attr("tabIndex","-1");l.attr("tabIndex","0").focus()}break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:var r=$(this).attr("data-subtoolbar");if(r==="N"){var q=$(o).attr("data-cmd");if(q){n.OnControlEvent("TOOLBAR_INVOKE",q)}}else{b.call(p.data.ctx,o)}break}}}i.prototype.BindData=function(){SiebelAppFacade.ToolbarRenderer.superclass.BindData.call(this)};function k(){var n=this.GetPM(),m=n.Get("itemArray"),l=$("#"+n.Get("placeholder")),p=null,r=null,q=null,s=null;for(var o=0,t=m.length;o<t;o++){p=m[o];if(p.GetProperty("type")==="Link"){r=l.find("li#tb_"+o);if(r.length){q=n.ExecuteMethod("CanInvoke",p.GetProperty("command"));s=q?" siebui-toolbar-enable ":" siebui-toolbar-disable ";if((" "+r[0].className+" ").indexOf(s)<=-1){r.removeClass("siebui-toolbar-disable siebui-toolbar-enable").addClass(!q?"siebui-toolbar-disable":"siebui-toolbar-enable").children().eq(0).removeClass("ToolbarButtonOff ToolbarButtonOn").addClass(!q?"ToolbarButtonOff":"ToolbarButtonOn").children().eq(0).attr("src",(!q&&!!p.GetProperty("offbitmap"))?p.GetProperty("offbitmap"):p.GetProperty("onbitmap")).removeClass("ToolbarButtonOff ToolbarButtonOn").addClass(!q?"ToolbarButtonOff":"ToolbarButtonOn")}}}}l=r=m=null}return i}());return SiebelAppFacade.ToolbarRenderer})};