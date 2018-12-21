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
if(typeof(SiebelAppFacade.BaseChartPModel)==="undefined"){SiebelJS.Namespace("SiebelAppFacade.BaseChartPModel");define("siebel/basechartpmodel",["siebel/pmodel"],function(){SiebelAppFacade.BaseChartPModel=(function(){var b=SiebelJS.Dependency("SiebelApp.Constants");function a(){SiebelAppFacade.BaseChartPModel.superclass.constructor.apply(this,arguments)}SiebelJS.Extend(a,SiebelAppFacade.PresentationModel);a.prototype.Init=function(){SiebelAppFacade.BaseChartPModel.superclass.Init.call(this);this.AttachPSHandler("ChartInfo",function(e){d.call(this,e)});this.AddMethod("BarDrillDown",c);this.AddMethod("BarDrillDown",c);this.AddProperty("2dHorizBar","siebui-chart-icon-bar-hor");this.AddProperty("2dStackedBar","siebui-chart-icon-bar-stacked");this.AddProperty("2dBar","siebui-chart-icon-bar");this.AddProperty("3dHorizBar","siebui-chart-icon-bar-hor");this.AddProperty("3dStackedBar","siebui-chart-icon-bar-stacked");this.AddProperty("3dSpline","siebui-chart-icon-spline");this.AddProperty("3dLine","siebui-chart-icon-line");this.AddProperty("3dBar","siebui-chart-icon-bar");this.AddProperty("3dPie","siebui-chart-icon-pie");this.AddProperty("2dSpline","siebui-chart-icon-spline");this.AddProperty("2dPie","siebui-chart-icon-pie");this.AddProperty("2dLine","siebui-chart-icon-line")};a.prototype.Setup=function(e){var f;var g;SiebelAppFacade.BaseChartPModel.superclass.Setup.call(this,e);if(e){f=e.GetChildByType("apm")}if(f){g=f.GetChildByType("ChartInfo")}d.call(this,g)};function d(e){var f;if(e&&e.GetType()==="ChartInfo"){f=e.EnumProperties(true);do{if(this.hasOwnProperty(f)){this.SetProperty(f,e.GetProperty(f))}else{this.AddProperty(f,e.GetProperty(f))}}while((f=e.EnumProperties(false)))}}function c(e,f){var g=SiebelApp.S_App.NewPropertySet();g.SetProperty("Category",f);g.SetProperty("Series",e);g.SetProperty("NeedConversion","TRUE");this.ExecuteMethod("InvokeMethod","ChartDrillDown",g)}return a}());return SiebelAppFacade.BaseChartPModel})};