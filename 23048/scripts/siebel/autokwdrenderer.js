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
if(typeof(SiebelAppFacade.AutoKWDRenderer)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.AutoKWDRenderer");define("siebel/autokwdrenderer",["siebel/phyrenderer"],function(){SiebelAppFacade.AutoKWDRenderer=(function(){var w=SiebelJS.Dependency("SiebelApp.Utils"),q=SiebelJS.Dependency("SiebelApp.Constants"),s=q.get("SWE_PST_BUTTON_CTRL"),x=q.get("SWE_CTRL_COMBOBOX"),m=q.get("SWE_CTRL_TEXT"),g=SiebelJS.Dependency("SiebelAppFacade.HTMLTemplateManager"),o=":-",b="::",a="|";function v(y){SiebelAppFacade.AutoKWDRenderer.superclass.constructor.call(this,y)}SiebelJS.Extend(v,SiebelAppFacade.PhysicalRenderer);v.prototype.Init=function(){SiebelAppFacade.AutoKWDRenderer.superclass.Init.call(this);this.AttachPMBinding("objRnAlias",d,{scope:this});this.AttachPMBinding("inputs",c,{scope:this});this.AttachPMBinding("mulInputs",p,{scope:this});this.AttachPMBinding("lovs",u,{scope:this});this.AttachPMBinding("endAction",i,{scope:this});this.AttachPMBinding("pasteAttr",l,{scope:this});this.AttachPMBinding("rowNum",t,{scope:this});this.AttachPMBinding("definitionChanged",k,{scope:this})};function k(){var A=this.GetPM(),y=A.Get("GetControls");for(var C in y){if(y.hasOwnProperty(C)){var B=y[C],z=B.GetName();if(B.GetUIType()!==s&&z!=="Description"&&z!=="Keyword"&&z!=="Paste Attr"&&z!=="Help Text"&&z!=="Test Step Sequence"&&z!=="Screen Shot Flag"){this.GetUIWrapper(y[B.GetName()]).GetEl().parents("tr").hide()}}}}function d(){var C=this.GetPM(),y=C.Get("GetControls"),E=null,A=C.Get("objRnAlias");if(A){var z=A.length;for(var B=0;B<z;B++){E=y["RN"+(B+1)];var D=this.GetUIWrapper(y[E.GetName()]).GetEl();D.parents("tr").show();D.parents("tr").find("#"+E.GetName()+"_Label").empty().append('<span id="RN1_Label">'+A[B]+"</span>")}}}function t(){var z=this.GetPM(),y=z.Get("GetControls");if(z.Get("rowNum").toString()==="Y"){ctrl=y["Row Number"];this.GetUIWrapper(y[ctrl.GetName()]).GetEl().parents("tr").show()}}function c(){var A=this.GetPM(),H=A.Get("GetControls"),y=null,E=A.Get("inputs");if(E){var C=E.length;for(var B=0;B<C;B++){var y=H["Input"+(B+1)],I=this.GetUIWrapper(H[y.GetName()]).GetEl();if((E[B].search(o)>-1)){var G=E[B].split(o),D=H["Value"+(B+1)],F=this.GetUIWrapper(H[D.GetName()]),z=F.GetEl();E[B]=G[0];z.parents("tr").show();z.show();F.SetValue("");z.parents("tr").find("#"+D.GetName()+"_Label").empty().append('<span id="inputs">'+G[1]+"</span>")}I.parents("tr").show();I.show();I.nextAll().remove();I.removeAttr("placeholder");I.parents("tr").find("#"+y.GetName()+"_Label").empty().append('<span id="inputs">'+E[B]+"</span>");if(typeof(I.autocomplete())&&I.autocomplete().length>0){I.autocomplete("destroy")}}}}function u(){var B=this.GetPM(),K=B.Get("GetControls"),M=B.Get("lovs"),H=B.Get("inputs");if(M){var N=M,A=N.length,F=H.length;for(var D=0;D<F;D++){for(var C=0;C<A;C++){var I=N[C].split(b),G=I[0],J=I[1].split(a),y,E=H[D],z="Input"+(D+1);if(E===G){y=K[z];var L=this.GetUIWrapper(K[y.GetName()]).GetEl();J.unshift("");L.nextAll().remove();g.EnhanceMarkup({el:L,type:x,id:y.GetInputName()+"_Ctrl",className:"siebui-ctrl-select",value:J});if(this.GetPM().ExecuteMethod("CanUpdate",y.GetName())){L.autocomplete({source:J,appendTo:L.parents("#_sweview").length?"#_sweview":null,autoFocus:true,delay:170}).autocomplete("option","position",{my:"center top",at:"center bottom",of:L,collision:"flipfit flipfit"});L.next("span.siebui-icon-dropdown").bind("click",{ctx:this,ctrl:y,lovVal:J},function(P){var Q=P.data.ctrl,O=P.data.lovVal,R=P.data.ctx.GetUIWrapper(K[Q.GetName()]).GetEl();R.autocomplete("option","source",O);setTimeout(function(){R.autocomplete("option","minLength",0);if(R.autocomplete("widget").not(":hidden").length===0){R.autocomplete("search","")}R.autocomplete("option","autoFocus",true).autocomplete("option","minLength",1);R.focus();R=null},0)})}}}}}}function p(){var N=this.GetPM(),J=N.Get("GetControls"),E=N.Get("mulInputs"),I=N.Get("inputs");if(E){var P=I.length,O=E.length;for(var L=0;L<P;L++){for(var K=0;K<O;K++){var y=E[K],B=I[L],A="Input"+(L+1);if(y===B){var C=J[A],G=J["Multiple Input"+(L+1)],H=this.GetUIWrapper(J[G.GetName()]),D=this.GetUIWrapper(J[C.GetName()]).GetEl(),F=H.GetEl(),M,z;F.parents("tr").show();H.SetValue("");M=g.GenerateMarkup({type:s,id:"Ctrl_Add_"+A,className:"appletButton",value:"+"});z=g.GenerateMarkup({type:s,id:"Ctrl_Done_"+A,className:"appletButton",value:"Done"});D.nextAll().remove();D.after(M);F.nextAll().remove();F.after(z);if(!this.GetPM().ExecuteMethod("CanUpdate",C.GetName())){D.next().addClass("appletButtonDis");F.next().addClass("appletButtonDis")}}}}}}function i(){var y=this.GetPM();if(y.Get("endAction")){var z=this.GetUIWrapper(y.Get("GetControls")["End Action"]).GetEl();$(z).parents("tr").show()}}function l(){var B=this.GetPM(),K=B.Get("GetControls"),F=B.Get("pasteAttr"),A=SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper"),I=B.Get("inputs");if(F){var G=I.length,H=F.length;for(var D=0;D<G;D++){for(var C=0;C<H;C++){var E="Input"+(D+1),y=K[E],J=I[D],z=F[C],L=this.GetUIWrapper(y).GetEl();L.removeAttr("Paste Attribute");if(J===z){L.attr("placeholder","Paste Attribute");L.off("blur");A.Manage(L,"blur",{ctx:this,ctrl:K[y.GetName()]},e)}}}}}v.prototype.ShowUIControl=function(A){SiebelAppFacade.AutoKWDRenderer.superclass.ShowUIControl.call(this,A);if(A.GetUIType()!==s){var y=A.GetName();if(y!=="Description"&&y!=="Keyword"&&y!=="Paste Attr"&&y!=="Help Text"&&y!=="Test Step Sequence"&&y!=="Screen Shot Flag"){var z=this.GetUIWrapper(A).GetEl();z.parents("tr").hide()}}};v.prototype.SetControlValue=function(D,C,z){SiebelAppFacade.AutoKWDRenderer.superclass.SetControlValue.call(this,D,C,z);if(D.GetName()==="Keyword Def"){var A=this.GetPM(),y=C.split("&&");if(y==""){return}function B(E){return(y[E].split("#")[1]===""||y[E].split("#")[1]===undefined)?null:y[E].split("#")[1].split("|^")}A.SetProperty("definitionChanged",C);A.SetProperty("objRnAlias",B(0));A.SetProperty("inputs",B(1));A.SetProperty("mulInputs",B(2));A.SetProperty("lovs",B(3));A.SetProperty("endAction",B(4));A.SetProperty("pasteAttr",B(5));A.SetProperty("rowNum",B(6))}};v.prototype.BindControlEvents=function(B){SiebelAppFacade.AutoKWDRenderer.superclass.BindControlEvents.call(this,B);var y=B.GetName(),z=SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper"),A=$("#s_"+this.GetPM().Get("GetFullId")+"_div");handlerMethod=null;switch(y){case"Paste Attr":handlerMethod=n;break;case"Value1":case"Value2":case"Value3":handlerMethod=f;break;case"Input1":case"Input2":case"Input3":z.Manage(A,"click",{ctx:this},h,"#Ctrl_Add_"+y);z.Manage(A,"click",{ctx:this},r,"#Ctrl_Done_"+y);break}if(handlerMethod){z.Manage(this.GetUIWrapper(B).GetEl(),"blur",{ctx:this,ctrV:B},handlerMethod)}};function n(z){var H=z.data.ctx,K=z.data.ctrV,A=H.GetUIWrapper(K),F=A.GetValue();if(F!==""){var G=F.split(a),B=H.GetPM(),I=B.Get("GetControls"),D=B.Get("objRnAlias"),E=D.length;if(D&&F.indexOf(a)>0){for(var C=0;C<E;C++){for(j=0;j<=3;j++){if(G[j]&&(G[j].search(b)>0)&&D[C]===G[j].split(b)[0]){var y=I["RN"+(C+1)],J=H.GetUIWrapper(y).GetEl();B.ExecuteMethod("SetActiveControl",y);
H.GetUIWrapper(y).SetValue(G[j].split(b)[1]);J.trigger("blur");break}}}}B.ExecuteMethod("SetActiveControl",K);A.SetValue("");A.OnControlEvent(consts.get("PHYEVENT_CONTROL_BLUR"),K,"")}}function f(y){var C=y.data.ctrV,z=C.GetName(),G=y.data.ctx,F=G.GetUIWrapper(C),E=F.GetValue(),A=G.GetPM(),D=G.GetUIWrapper(A.Get("GetControls")["Input"+z.substring(z.length-1)]);if(E!==""){var B=D.GetValue()==""?E:D.GetValue()+"|"+E;A.ExecuteMethod("SetActiveControl",D.control);D.SetValue(B);D.GetEl().trigger("blur");A.ExecuteMethod("SetActiveControl",F.control);F.SetValue("");F.GetEl().trigger("blur")}}function h(E){var B=E.data.ctx,C=B.GetPM(),z=C.Get("GetControls"),y=$(this).attr("id").substring(($(this).attr("id")).length-1),F=B.GetUIWrapper(z["Input"+y]),D=B.GetUIWrapper(z["Multiple Input"+y]),A=F.GetValue();InpMEleVlue=D.GetValue();if(A!==""){InpMEleVlue=InpMEleVlue===""?A:InpMEleVlue+","+A}D.SetValue(InpMEleVlue);F.SetValue("");F.GetEl().focus()}function r(z){var F=z.data.ctx,B=F.GetPM(),G=B.Get("GetControls"),E=$(this).attr("id").substring(($(this).attr("id")).length-1),y=F.GetUIWrapper(G["Input"+E]),I=F.GetUIWrapper(G["Multiple Input"+E]),C,A=I.GetValue(),D=y.GetValue(),H=y.GetEl();B.ExecuteMethod("SetActiveControl",G["Input"+E]);C=D===""?A:(A===""?D:A+","+D);y.SetValue(C);H.trigger("blur");I.SetValue("");$(this).addClass("appletButtonDis");H.nextAll("button").addClass("appletButtonDis");y.SetState(q.get("EDITABLE"),false);I.SetState(q.get("EDITABLE"),false);F.GetUIWrapper(G["Value"+E]).SetState(q.get("EDITABLE"),false)}function e(C){var D=C.data.ctrl,A=C.data.ctx,B=A.GetUIWrapper(D);if($(this).attr("placeholder")==="Paste Attribute"){var z=B.GetValue().split(a),y=B.GetValue();if(z.length>=4&&z[3]!==""&&z[3].search(b)>0){y=z[3].split(b)[1]}A.GetPM().ExecuteMethod("SetActiveControl",D);B.SetValue(y);B.OnControlEvent(consts.get("PHYEVENT_CONTROL_BLUR"),D,y)}else{A.GetPM().ExecuteMethod("SetActiveControl",D);B.SetValue($(this).val());B.OnControlEvent(consts.get("PHYEVENT_CONTROL_BLUR"),D,$(this).val())}}v.prototype.GetPhysicalControlValue=function(z){if(z.GetName().search("Value")===0){var y=this.GetPM();$(document.activeElement).trigger("blur");y.SetProperty("PhysicalCtrlVal",y.ExecuteMethod("GetFormattedFieldValue",z));y.ExecuteMethod("SetActiveControl",null)}else{SiebelAppFacade.AutoKWDRenderer.superclass.GetPhysicalControlValue.call(this,z)}};v.prototype.EndLife=function(){SiebelAppFacade.AutoKWDRenderer.superclass.EndLife.call(this)};return v}());return"SiebelAppFacade.AutoKWDRenderer"})};