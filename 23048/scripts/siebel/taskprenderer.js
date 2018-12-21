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
if(typeof(SiebelAppFacade.TaskPhyRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.TaskPhyRenderer");var consts=SiebelJS.Dependency("SiebelApp.Constants");define("siebel/taskprenderer",["siebel/basephyrenderer"],function(){SiebelAppFacade.TaskPhyRenderer=(function(){var f=consts.get("SWE_PROP_QTP_OT"),i=consts.get("SWE_PROP_QTP_RN"),h=consts.get("SWE_PROP_QTP_UN");function e(n){SiebelAppFacade.TaskPhyRenderer.superclass.constructor.call(this,n)}SiebelJS.Extend(e,SiebelAppFacade.BasePR);e.prototype.Init=function(){SiebelAppFacade.TaskPhyRenderer.superclass.Init.call(this);this.AttachPMBinding("TaskRefresh",this.BindData)};e.prototype.ShowUI=function(){SiebelAppFacade.TaskPhyRenderer.superclass.ShowUI.call(this);$("#SS_TaskUIPane").addClass(SiebelApp.S_App.GetDirection()?"siebui-task-pane siebui-rtl-element-right":"siebui-task-pane");d.call(this)};e.prototype.BindEvents=function(){SiebelAppFacade.TaskPhyRenderer.superclass.BindEvents.call(this);$("[id=s_close]").bind("click",{ctx:this},function(n){n.data.ctx.GetPM().OnControlEvent(consts.get("TASK_PANE_CLOSE"))});$("[id=s_gotoinbox]").bind("click",{ctx:this},function(n){n.data.ctx.GetPM().OnControlEvent(consts.get("TASK_NAVIGATE_INBOX"))});$("#s_TaskPane").on("click",".siebui-task-step",{ctx:this},function(n){n.data.ctx.GetPM().OnControlEvent("InvokeFastNavigation",$(this).data("step"))})};e.prototype.BindData=function(){SiebelAppFacade.TaskPhyRenderer.superclass.BindData.call(this);try{$("#"+this.GetPM().Get("GetContainer")).dynatree("getRoot").removeChildren()}catch(n){}l.call(this);b.call(this);m.call(this)};function l(){var p=this.GetPM().Get("LocaleInfo");if(p){var o;var n;o=$("[id=IDS_TASKPANE_CAPTION]");n=o.parent();o.remove();n.append("<label>"+p.CAPTION+"</label>");o=$("[id=IDS_TASKPANE_GOTOINBOX ]");n=o.parent();o.remove();$("#s_gotoinbox").attr("href","javascript:void(0)");if(utils.IsTrue(SiebelApp.S_App.IsAutoOn())){var q={};q[f]="TaskLink";q[i]=consts.get("TASK_PANE_CLOSE");q[h]=consts.get("TASK_PANE_CLOSE");$("#s_close").attr(q);q[f]="TaskLink";q[i]=p.GOTOINBOX;q[h]=p.GOTOINBOX;$("#s_gotoinbox").attr(q)}n.append(p.GOTOINBOX);$("#IDS_TASKPANE_PROGRESS").html(p.PROGRESS)}}function b(){var o=this.GetPM().Get("TaskContext");if(o&&o.length){var p=k.call(this);if(!p){return}for(var n=0;n<o.length;n++){g.call(this,o[n],p)}}}function c(n,q){var p=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_TSKLINKICON");var o=q.addChild({title:n.TaskDispName,isFolder:false,url:"",icon:p,activate:true,addClass:false,expand:true,key:n.TaskName})}function g(s,r){var p=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_EXPANDICON");var q=r.addChild({title:s.GrpDispName,isFolder:true,icon:p,activate:true,expand:true,key:s.grpName,noLink:true});var o=s.TASKLIST;for(var n=0;n<o.length;n++){c.call(this,o[n],q)}}function k(){var o=$("#"+this.GetPM().Get("GetContainer"));if(!o.length){return}var n=o.dynatree("getRoot");var p=n.addChild({title:"TaskPane",key:"TBUI",addClass:"dynatree-root-tag",isFolder:true,expand:true,url:null});return p}function d(){var n=$("#"+this.GetPM().Get("GetContainer")),p=utils.IsTrue(SiebelApp.S_App.IsAutoOn())||false,o=this;n.dynatree({autoCollapse:true,imagePath:" ",classNames:{nodeIcon:null},clickFolderMode:3,minExpandLevel:1,persist:false,expandOnAdd:true,onClick:function(r,q){r.data.expand=true;if(r.data.isFolder===true){if(r.data.expand===true){r.data.expand=false;r.data.icon=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_COLLAPSEICON")}else{r.data.expand=true;r.data.icon=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_EXPANDICON")}}else{o.GetPM().OnControlEvent("TaskNavigate","StartTask",r)}},onCreate:function(r,q){if(p){var s={};s[f]="SiebTask";s[i]=r.data.title;s[h]=r.data.title;$(q).attr(s)}},onRender:function(r,q){if(p){var s={};if(($(q).hasClass("dynatree-exp-el"))||($(q).hasClass("dynatree-exp-e"))){s[f]="SiebTask";s[i]="IconCollapse";s[h]="IconCollapse";$(".dynatree-expander",q).attr(s)}else{if(($(q).hasClass("dynatree-exp-cl"))||($(q).hasClass("dynatree-exp-c"))){s[f]="SiebTask";s[i]="IconExpand";s[h]="IconExpand";$(".dynatree-expander",q).attr(s)}}}}})}function m(){var n=this.GetPM().Get("CurrentTask");if(n&&n.TaskDispName){var r=k.call(this);if(!r){return}var o=r.addChild({title:n.TaskDispName,isFolder:false,icon:null,activate:true,expand:true,key:"",noLink:true});var q=this.GetPM().Get("CurrentTaskChapter");for(var p=0;p<q.length;p++){a.call(this,q[p],o)}}}function a(p,s){var n=p.STEPS;var r;if(n.length>0){r=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_COLLAPSEICON")}else{r=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_EXPANDICON")}var o=s.addChild({title:p.CDN,isFolder:true,icon:r,activate:true,expand:true,key:"",noLink:true});for(var q=0;q<n.length;q++){j.call(this,n[q],o)}}function j(q,n){var p=SiebelApp.S_App.GetPageURL().split("start.swe")[0]+consts.get("ICON_TSKLINKICON");var o=n.addChild({title:q.TSDN,isFolder:false,url:"",icon:p,activate:true,addClass:"siebui-task-step",expand:true,key:""});$.data(o.span,"step",q)}e.prototype.Refresh=function(){$("#"+this.GetPM().GetContainer()).dynatree("getRoot").removeChildren();return};return e}());return SiebelAppFacade.TaskPhyRenderer})};