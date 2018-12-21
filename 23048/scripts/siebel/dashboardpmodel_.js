/*<ORACLECOPYRIGHT>* Copyright (C) 1994-2014 * Oracle and Java are registered trademarks of Oracle and/or its affiliates. * Other names may be trademarks of their respective owners. * UNIX is a registered trademark of The Open Group. * * This software and related documentation are provided under a license agreement * containing restrictions on use and disclosure and are protected by intellectual property laws. * Except as expressly permitted in your license agreement or allowed by law, you may not use, copy, * reproduce, translate, broadcast, modify, license, transmit, distribute, exhibit, perform, publish, * or display any part, in any form, or by any means. Reverse engineering, disassembly, * or decompilation of this software, unless required by law for interoperability, is prohibited. * * The information contained herein is subject to change without notice and is not warranted to be error-free. * If you find any errors, please report them to us in writing. * * U.S. GOVERNMENT RIGHTS Programs, software, databases, and related documentation and technical data delivered to U.S. * Government customers are "commercial computer software" or "commercial technical data" pursuant to the applicable * Federal Acquisition Regulation and agency-specific supplemental regulations. * As such, the use, duplication, disclosure, modification, and adaptation shall be subject to the restrictions and * license terms set forth in the applicable Government contract, and, to the extent applicable by the terms of the * Government contract, the additional rights set forth in FAR 52.227-19, Commercial Computer Software License * (December 2007). Oracle America, Inc., 500 Oracle Parkway, Redwood City, CA 94065. * * This software or hardware is developed for general use in a variety of information management applications. * It is not developed or intended for use in any inherently dangerous applications, including applications that * may create a risk of personal injury. If you use this software or hardware in dangerous applications, * then you shall be responsible to take all appropriate fail-safe, backup, redundancy, * and other measures to ensure its safe use. Oracle Corporation and its affiliates disclaim any liability for any * damages caused by use of this software or hardware in dangerous applications. * * This software or hardware and documentation may provide access to or information on content, * products, and services from third parties. Oracle Corporation and its affiliates are not responsible for and * expressly disclaim all warranties of any kind with respect to third-party content, products, and services. * Oracle Corporation and its affiliates will not be responsible for any loss, costs, * or damages incurred due to your access to or use of third-party content, products, or services.</ORACLECOPYRIGHT>*/
/* 8.1.1.14SIA[23044]PATCHSET7 */ if (typeof(SiebelAppFacade.DashboardPM) === "undefined") {
	SiebelJS.Namespace("SiebelAppFacade.DashboardPM");
	define("siebel/dashboardpmodel", ["siebel/pmodel"], function () {
		SiebelAppFacade.DashboardPM = (function () {
			var g = SiebelJS.Dependency("SiebelApp.Constants");
			var k = SiebelJS.Dependency("SiebelApp.Utils");
			function f() {
				SiebelAppFacade.DashboardPM.superclass.constructor.call(this, {
					GetName: function () {
						return "DashboardObj"
					}
				})
			}
			SiebelJS.Extend(f, SiebelAppFacade.BasePM);
			f.prototype.Init = function () {
				this.AddProperty("RequiredFields", null);
				this.AddProperty("UIControlInfo", null);
				this.AddProperty("QuickNavigateList", null);
				this.AddProperty("UpdatedCtrlData", null);
				this.AddProperty("CommPanelEnabled", false);
				this.AddMethod("InvokeServiceMethod", function (n, p, r) {
					var m = SiebelApp.S_App.GetService(g.get("NAME_DASHBOARDSVC"));
					if (m) {
						p = p || CCFMiscUtil_CreatePropSet();
						var q = m.InvokeMethod(n, p);
						var o = q.GetProperty(g.get("SWE_RPC_PROP_RETURN_STATUS"));
						if (o !== g.get("SWE_RPC_PROP_STATUS_ERROR") && !k.IsEmpty(o)) {
							if (r) {
								var s = q.GetChildByType("ResultSet");
								if (s) {
									r.DeepCopy(s)
								}
							}
							return true
						}
					}
					return false
				});
				this.AddMethod(g.get("DASHBOARD_METHOD_INIT"), c);
				this.AddMethod("PopulateDashboardfromSS", d);
				this.AttachEventHandler(g.get("DASHBOARD_METHOD_UPDATE"), j);
				this.AttachEventHandler(g.get("DASHBOARD_METHOD_CLOSE"), i);
				this.AttachEventHandler(g.get("DASHBOARD_METHOD_PREVIOUS"), l);
				this.AttachEventHandler(g.get("DASHBOARD_METHOD_NEXT"), h);
				this.AttachEventHandler(g.get("DASHBOARD_METHOD_GOTONAV"), a)
			};
			f.prototype.Setup = function (m) {
				m.SetProperty("SWE_OUI_RENDERER", "DashboardPR");
				SiebelAppFacade.DashboardPM.superclass.Setup.call(this, m);
				if (m.PropertyExists(g.get("COMM_PANEL_METHOD_ISENABLED"))) {
					this.SetProperty("CommPanelEnabled", m.GetProperty(g.get("COMM_PANEL_METHOD_ISENABLED")).toUpperCase() === "TRUE")
				}
				b.call(this, m)
			};
			f.prototype.HandleNotify = function (m) {
				b.call(this, m)
			};
			f.prototype.Show = function () {
				if (this.Get("CommPanelEnabled")) {
					e.call(this)
				}
				SiebelAppFacade.DashboardPM.superclass.Show.call(this)
			};
			function e() {
				var o = SiebelApp.S_App.getExtObject("CommunicationPanel");
				if (!(o && o.Get("Show"))) {
					var m = SiebelApp.S_App.GetService(g.get("NAME_COMM_PANEL_UISVC"));
					if (m) {
						var n = CCFMiscUtil_CreatePropSet();
						n.SetProperty(g.get("SWE_VIEW_ID_STR"), g.get("COMM_PANEL_VIEWNAME"));
						m.InvokeMethod(g.get("COMM_PANEL_METHOD_OPEN"), n)
					}
				}
			}
			function b(o) {
				if (!o) {
					return
				}
				var q = o.GetProperty("UIControlInfo");
				if (q) {
					var s = CCFMiscUtil_CreatePropSet();
					s.DecodeFromString(q);
					this.SetProperty("UIControlInfo", s)
				}
				var p = o.GetChildByType("QuickNavigateList");
				if (p) {
					var n = CCFMiscUtil_CreatePropSet();
					n.DeepCopy(p);
					this.SetProperty("QuickNavigateList", n)
				}
				var r = o.GetChildByType("UpdatedCtrlData");
				if (r) {
					var m = CCFMiscUtil_CreatePropSet();
					m.DeepCopy(r);
					this.SetProperty("UpdatedCtrlData", m)
				}
			}
			function c() {
				var m = CCFMiscUtil_CreatePropSet();
				if (this.ExecuteMethod("InvokeServiceMethod", g.get("DASHBOARD_METHOD_INIT"), this.Get("RequiredFields"), m)) {
					b.call(this, m)
				}
			}
			function j() {
				var m = CCFMiscUtil_CreatePropSet();
				if (this.ExecuteMethod("InvokeServiceMethod", g.get("DASHBOARD_METHOD_PUSH"), this.Get("RequiredFields"), m)) {
					b.call(this, m)
				}
			}
			function d() {
				var m = CCFMiscUtil_CreatePropSet();
				if (this.ExecuteMethod("InvokeServiceMethod", "PopulateDashboardfromSS", this.Get("RequiredFields"), m)) {
					b.call(this, m)
				}
			}
			function i() {
				this.ExecuteMethod("InvokeServiceMethod", g.get("DASHBOARD_METHOD_CLOSE"));
				SiebelApp.S_App.UnregisterExtObject("Dashboard")
			}
			function l() {
				var m = CCFMiscUtil_CreatePropSet();
				if (this.ExecuteMethod("InvokeServiceMethod", g.get("DASHBOARD_METHOD_PREVIOUS"), this.Get("RequiredFields"), m)) {
					b.call(this, m)
				}
			}
			function h() {
				var m = CCFMiscUtil_CreatePropSet();
				if (this.ExecuteMethod("InvokeServiceMethod", g.get("DASHBOARD_METHOD_NEXT"), this.Get("RequiredFields"), m)) {
					b.call(this, m)
				}
			}
			function a(n) {
				var m = CCFMiscUtil_CreatePropSet();
				m.SetProperty("SelectedNavigation", n);
				this.ExecuteMethod("InvokeServiceMethod", g.get("DASHBOARD_METHOD_QUICKNAV"), m)
			}
			return f
		}
			());
		return SiebelAppFacade.DashboardPM
	})
}
if (typeof(SiebelAppFacade.CommunicationPanelPM) === "undefined") {
	SiebelJS.Namespace("SiebelAppFacade.CommunicationPanelPM");
	define("siebel/commpanelpmodel", ["siebel/pmodel"], function () {
		SiebelAppFacade.CommunicationPanelPM = (function () {
			var d = SiebelJS.Dependency("SiebelApp.Constants");
			var b = SiebelJS.Dependency("SiebelApp.Utils");
			function c() {
				SiebelAppFacade.CommunicationPanelPM.superclass.constructor.call(this, {
					GetName: function () {
/*console.log("CommunicationPanel????? dashb");
$('#CommunicationPanel').hide();
$('#CTIToolbar').hide();*/
						return "CommunicationPanel"
					}
				})
			}
			SiebelJS.Extend(c, SiebelAppFacade.BasePM);
			c.prototype.Init = function () {
				this.AddProperty("Show", false);
				this.AddMethod("InvokeServiceMethod", function (g, i, k, l) {
					l = l || d.get("NAME_COMM_PANEL_UISVC");
					var f = SiebelApp.S_App.GetService(l);
					if (f) {
						i = i || CCFMiscUtil_CreatePropSet();
						var j = f.InvokeMethod(g, i);
						var h = j.GetProperty(d.get("SWE_RPC_PROP_RETURN_STATUS"));
						if (h !== d.get("SWE_RPC_PROP_STATUS_ERROR") && !b.IsEmpty(h)) {
							if (k) {
								var m = j.GetChildByType("ResultSet");
								if (m) {
									k.DeepCopy(m)
								}
							}
							return true
						}
					}
					return false
				});
				this.AddMethod("Hide", a);
				this.AttachEventHandler(d.get("COMM_PANEL_CLOSE"), e)
			};
			c.prototype.Setup = function (f) {
				f.SetProperty("SWE_OUI_RENDERER", "CommunicationPanelPR");
				SiebelAppFacade.CommunicationPanelPM.superclass.Setup.call(this, f)
			};
			c.prototype.Show = function () {
				SiebelAppFacade.CommunicationPanelPM.superclass.Show.call(this);
				if (!this.Get("Show")) {
					this.SetProperty("Show", true);
					var g = CCFMiscUtil_CreatePropSet();
					var h;
					var i = false;
					var j = null;
					if (!SiebelApp.S_App.getExtObject("Dashboard")) {
						i = true
					}
					if (i) {
						this.ExecuteMethod("InvokeServiceMethod", "OpenDashboard", g, null, d.get("NAME_DASHBOARDSVC"))
					}
					j = SiebelAppFacade.ComponentMgr.FindComponent({
							id: d.get("SWE_PST_COMM_TOOLBAR")
						});
					if (!j || !j.Get("InitFailed")) {
						h = CCFMiscUtil_CreatePropSet();
						this.ExecuteMethod("InvokeServiceMethod", "IsChatEnabled", g, h, d.get("NAME_CHATUISVC"));
						if (h.GetProperty("IsChatEnabled") === "1") {
							i = false;
							if (SiebelApp.S_App.getExtObject("ChatPane")) {
								h = CCFMiscUtil_CreatePropSet();
								this.ExecuteMethod("InvokeServiceMethod", "IsChatPaneOpened", g, h, d.get("NAME_CHATUISVC"));
								var f = h.GetProperty("IsChatPaneOpened");
								if (!f || f !== "1") {
									i = true
								}
							} else {
								i = true
							}
							if (i) {
								this.ExecuteMethod("InvokeServiceMethod", "ToggleChatPane", g, null, d.get("NAME_CHATUISVC"))
							}
						}
					}
				}
			};
			function a() {
				if (this.Get("Show")) {
					var f = SiebelApp.S_App.getExtObject("Dashboard");
					if (f) {
						f.OnControlEvent(d.get("DASHBOARD_METHOD_CLOSE"))
					}
					this.SetProperty("Show", false)
				}
			}
			function e() {
				var g = SiebelApp.S_App.getExtObject("Dashboard");
				if (g) {
					g.OnControlEvent(d.get("DASHBOARD_METHOD_CLOSE"))
				}
				this.SetProperty("Show", false);
				var f = CCFMiscUtil_CreatePropSet();
				f.SetProperty(d.get("SWE_VIEW_ID_STR"), d.get("COMM_PANEL_VIEWNAME"));
				this.ExecuteMethod("InvokeServiceMethod", d.get("COMM_PANEL_METHOD_TOGGLE"), f);
				SiebelApp.S_App.UnregisterExtObject(d.get("COMM_PANEL_OBJ_ID"))
			}
			return c
		}
			());
		return SiebelAppFacade.CommunicationPanelPM
	})
};
