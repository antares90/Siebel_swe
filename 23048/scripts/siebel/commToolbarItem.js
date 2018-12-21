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
if(typeof(SiebelApp.S_App.CommToolbarItem)==="undefined"){SiebelJS.Namespace("SiebelApp.S_App.CommToolbarItem");SiebelApp.S_App.CommToolbarItem=(function(){function b(k){this.m_type="";this.m_name="";this.m_id="";this.m_value="";this.m_image="";this.m_imgd="";this.m_state="disabled";this.m_effect="";this.m_img_src=this.m_img;this.m_tooltipFromTools="";this.m_tooltip="";this.m_width=0;this.m_sequence=0;this.m_command="";this.m_dynamictooltipCmd="";this.m_bSticky=false;this.m_index=0;this.m_bStatic=false;var c=k.split(";");var h;var e;var j=c.length;for(var g=0;g<j;g++){var d=c[g];var l=d.indexOf("=");if(l<0){continue}h=$.trim(d.substr(0,l)).toLowerCase();e=$.trim(d.substr(l+1));switch(h){case"name":this.m_name=e;this.m_id=this.m_name.replace(/\s/g,"_");break;case"image":if(e.length>0){e=this.GetCommToolbar().GetURLBase()+this.GetCommToolbar().GetImageURL()+"/"+e}this.m_image=e;break;case"disabledimage":if(e.length>0){e=this.GetCommToolbar().GetURLBase()+this.GetCommToolbar().GetImageURL()+"/"+e}this.m_imgd=e;break;case"sequence":var f=e.split(".");this.m_iSeq=f[0];if(f.length>1){this.m_index=f[1]}break;case"reflection":this.m_bSticky=true;break;case"type":this.m_type=e.toLowerCase();break;case"command":this.m_command=e;break;case"width":this.m_width=e;break;case"tooltip":this.m_tooltip=e;this.m_tooltipFromTools=this.m_tooltip;break;case"dynamictooltipcmd":this.m_dynamictooltipCmd=e;break;default:break}}if(this.m_tooltip.length<=0){this.m_tooltip=this.m_name}if(this.m_imgd===this.m_image){this.m_bStatic=true}}b.prototype.GetCommToolbar=function(){return SiebelApp.S_App.CommToolbar};b.prototype.SetEnabled=function(c){if(c.toLowerCase()==="true"){this.m_state="enabled"}else{this.m_state="disabled"}this.GetCommToolbar().UpdateHTMLControl(this,"state")};b.prototype.SetToggle=function(c){if(c.toLowerCase()==="true"){this.m_effect="toggled"}else{this.m_effect="untoggled"}this.GetCommToolbar().UpdateHTMLControl(this,"effect")};b.prototype.Blink=function(c){if(c.toLowerCase()==="true"){this.m_effect="blinking"}else{this.m_effect="unblinking"}this.GetCommToolbar().UpdateHTMLControl(this,"effect")};b.prototype.StartTimer=function(c,d){this.GetCommToolbar().UpdateHTMLControl(this,"starttimer",[c,d])};b.prototype.StopTimer=function(){this.GetCommToolbar().UpdateHTMLControl(this,"stoptimer")};b.prototype.SetTooltip=function(c){if(c.length>0){this.m_tooltip=c;this.GetCommToolbar().UpdateHTMLControl(this,"changetooltip")}else{if(this.m_type==="edit"){this.m_tooltip=this.m_name;this.GetCommToolbar().UpdateHTMLControl(this,"changetooltip")}}};b.prototype.ChangeValue=function(e){var g=[];switch(this.m_type){case"edit":this.m_value=e;break;case"combo box":g=e.split(",");var c=g.length;for(var f=0;f<c;f++){g[f]=$.trim(g[f])}if(g.length%2!==0&&e!==""){a(1,"changeValue: got wrong format for control:"+this.m_name)}break;case"button":var d=e.split(",");this.m_image=$.trim(d[0]);if(this.m_image.length>0&&this.m_image.indexOf(this.GetCommToolbar().GetImageURL()+"/")<0){this.m_image=this.GetCommToolbar().GetURLBase()+this.GetCommToolbar().GetImageURL()+"/"+this.m_image}if(d[1]!==undefined){this.m_imgd=$.trim(d[1]);if(this.m_imgd.length>0&&this.m_imgd.indexOf(this.GetCommToolbar().GetImageURL()+"/")<0){this.m_imgd=this.GetCommToolbar().GetURLBase()+this.GetCommToolbar().GetImageURL()+"/"+this.m_imgd}}break;default:return}this.GetCommToolbar().UpdateHTMLControl(this,"value",g)};b.prototype.TriggerEvent=function(c){this.GetCommToolbar().TriggerEvent(this.m_name,c)};b.prototype.ReplaceInfo=function(c){this.m_name=c.m_name;this.m_type=c.m_type;this.m_image=c.m_image;this.m_imgd=c.m_imgd;this.m_state=c.m_state;this.m_effect=c.m_effect;this.m_value=c.m_value;this.m_width=c.m_width;this.m_tooltipFromTools=c.m_tooltipFromTools;this.m_tooltip=c.m_tooltip;this.m_command=c.m_command;this.ChangeValue(this.m_image+","+this.m_imgd)};function a(d,c){SiebelApp.S_App.CommToolbarUtil.Log(d,"commToolbarItem.js: "+c)}return b}())};