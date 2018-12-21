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
/* 8.1.1.14SIA[23044]PATCHSET9 */
require.onError = function (a) {
	SiebelJS.Log("Error in downloading file " + a.requireType + ":" + a.requireModules)
};
if (typeof(SiebelApp.S_App) === "undefined") {
	SiebelJS.Namespace("SiebelApp.S_App");
	SiebelApp.S_App = (function () {
		var ac = SiebelJS.Dependency("SiebelApp.Utils");
		var G = SiebelJS.Dependency("SiebelApp.Constants");
		var ak = G.get("SWE_PST_APP_INFO");
		var o;
		var ay;
		var aF;
		var ai = G.get("SWE_FIELD_STR");
		var ad = G.get("SWE_RPC_PROP_URL");
		var Z = G.get("SWE_ARG_START");
		var at = G.get("SWE_RPC_PROP_FILEDOWNLOADSAVE");
		var au = G.get("SWE_METHOD_SAVE_QUERY");
		var c = G.get("SWE_METHOD_SAVE_QUERY_AS");
		var ah = G.get("SWE_METHOD_POST_CHANGES");
		var k = G.get("SWE_TARGET_TOP");
		var h = G.get("SWE_BCF_FIELD");
		var v = [];
		var aN = [];
		var ao = [];
		var m;
		var H = {};
		var N = [];
		var L;
		var a = [];
		var U = {};
		var aA;
		var aO = false;
		var t = null;
		var f;
		var aa = {};
		var ax = false;
		var an = {};
		var j = {};
		var C = null;
		var b;
		var g = true;
		var B = {};
		var q = false;
		var ae = "";
		var P = "";
		var D = "";
		var aj = "";
		var w = false;
		var ag = false;
		var V = null;
		var aG = false;
		var K = 0;
		var z = null;
		var Q = [];
		var aC;
		var X = null;
		var l = null;
		var O = {};
		var aK = function () {
			var aP;
			aK = function () {
				return aP
			};
			aK.prototype = this;
			aP = new aK();
			aP.uiStatus = new SiebelApp.UIStatus();
			aP.constructor = aK;
			var aQ = new SiebelApp.CommandManager(aP);
			aK.prototype.GetCmdMgr = function () {
				return aQ
			};
			SiebelAppFacade.ComponentMgr.RegisterLevel(aP);
			return aP
		};
		o = new aK();
		function d() {
			b = new SiebelApp.PopupPModel({
					GetName : function () {
						return "PopupPxy"
					}
				});
			b.Init()
		}
		aK.prototype.SetExternalActiveApplet = function (aP) {
			V = aP
		};
		aK.prototype.GetExternalActiveApplet = function (aP) {
			return V
		};
		aK.prototype.SetShowNewPage = function (aP) {
			aG = aP
		};
		aK.prototype.GetShowNewPage = function () {
			return aG
		};
		aK.prototype.GetRowCounterTemplateMap = function (aP) {
			return B[aP]
		};
		function i(aP, aQ) {
			B[aP] = aQ
		}
		aK.prototype.IsExternalApplet = function (aP) {
			return !ac.IsEmpty(j[aP.GetName()])
		};
		aK.prototype.RemoveApplet = function (aQ) {
			if (this.GetExternalActiveApplet() === aQ) {
				this.SetExternalActiveApplet(null)
			}
			delete j[aQ.GetName()];
			if (!!aQ.GetBusComp()) {
				if (aQ.GetBusComp().GetNotifyObject().GetAppletRegistry().length === 1) {
					delete aQ.GetBusComp().GetNotifyObject();
					delete aQ.GetBusComp()
				} else {
					aQ.GetBusComp().GetNotifyObject().DeRegister(aQ)
				}
			}
			var aP = SiebelAppFacade.ComponentMgr.FindComponent({
					id : aQ.GetName()
				});
			if (aP) {
				SiebelAppFacade.ComponentMgr.DeleteComponent(aP, this)
			}
			if (aQ.EndLife) {
				aQ.EndLife()
			}
			delete aQ
		};
		aK.prototype.GetPopupPM = function () {
			return b
		};
		aK.prototype.GetMsgBarPM = function () {
			return C
		};
		aK.prototype.GetIconMap = function () {
			return an
		};
		aK.prototype.GetCancelId = function () {
			return K
		};
		aK.prototype.PushPostBack = function (aQ, aP) {
			N.push({
				callBack : aQ,
				object : aP
			})
		};
		aK.prototype.DefineAccessor = function (aT, aP, aS, aR, aU) {
			aR = G.get(aR);
			var aQ = null;
			if (aP.PropertyExists(aR)) {
				aQ = aP.GetProperty(aR)
			}
			if (aU === true) {
				aQ = SiebelApp.S_App.LookupStringCache(aQ)
			}
			if (!ac.IsEmpty(aQ) || (typeof aT[aS] !== "function")) {
				aT[aS] = function () {
					return aQ
				}
			}
			aP = null
		};
		aK.prototype.GetActiveBusObj = function () {
			return ay
		};
		aK.prototype.SetActiveBusObj = function (aP) {
			ay = aP
		};
		aK.prototype.GetActiveView = function () {
			return aF
		};
		aK.prototype.SetActiveView = function (aP) {
			aF = aP
		};
		aK.prototype.SetLayoutLoaded = function (aR, aQ, aP, aS) {};
		aK.prototype.SetLayoutUnloaded = function () {};
		aK.prototype.SetThreadbarSpan = function () {};
		aK.prototype.ViewUINotLoaded = function () {};
		aK.prototype.ProcessRPCInfo = function (aP) {};
		aK.prototype.OnUnload = function () {
			SiebelJS.Log("On Unload")
		};
		aK.prototype.GetActivePageComp = function () {
			return l
		};
		aK.prototype.SetActivePageComp = function (aP) {
			l = aP
		};
		aK.prototype.REPCHK_MRV1 = function () {
			return ag
		};
		function aB(be) {
			aK.prototype.GetAppPropertySet = function () {
				return be.Clone()
			};
			var aV = be.GetChild(0);
			if (aV.GetType() !== ak) {
				throw new Error("Wrong propSet type in Application Context")
			}
			this.SetSelfProps(aV);
			var a7 = SiebelApp.Environment;
			if (a7 !== undefined) {
				n.call(this, aV)
			}
			var a9 = aV.GetChildCount();
			var aW = G.get("SWE_PST_LOADURL"),
			aR = G.get("SWE_PST_STR_CACHE"),
			aX = G.get("SWE_PST_NEW_NAV_CTRL_MGR"),
			aY = G.get("SWE_PST_NAV_CTRL_INFO"),
			bb = G.get("SWE_PST_SERVICE_SHADOWS"),
			bg = G.get("SWE_PST_QTP_INFO"),
			bf = G.get("SWE_PST_ACCESSIBILITY_INFO"),
			bh = G.get("SWE_PST_NEW_TIMER"),
			bl = G.get("SWE_PST_NEW_LOCALE"),
			aP = G.get("SWE_PST_STYLESHEET"),
			bi = G.get("SWE_UIDEF_THEME_INFO"),
			bv = G.get("SWE_UIDEF_PAGE_TRANSITION_INFO"),
			aT = G.get("SWE_PST_MSG"),
			bm = G.get("SWE_PST_ROW_CNT_TMPL"),
			bw = G.get("SWE_PROP_SEARCH_BAR"),
			aS = G.get("SWE_PST_PORTLET_APP"),
			br = G.get("SWE_PROP_VALUE"),
			bc = G.get("SWE_PROP_NAME"),
			a6 = G.get("SWE_RPC_PROP_COMMAND_MGR"),
			bj = G.get("SWE_PST_NEW_BUSCOMP"),
			bs = G.get("SWE_PST_NEW_APPLET"),
			a8 = G.get("SWE_PST_NEW_LIST_APPLET"),
			bt = G.get("SWE_PST_NEW_TREEAPPLET"),
			by = SiebelApp.S_App.BusComp,
			a1 = be.GetProperty(G.get("SWE_RPC_PROP_STATUS")),
			bx = G.get("SWE_RPC_PROP_NEW_APPLET_LAYOUT"),
			aZ = G.get("SWE_PST_CNTRL_LIST"),
			a3 = G.get("SWE_PST_ICON_LIST");
			for (var bd = 0; bd < a9; bd++) {
				var bp = aV.GetChild(bd);
				var bz = bp.GetType();
				var bo = ac.Curry(aK.prototype.DefineAccessor, SiebelApp.Environment.constructor.prototype, bp);
				switch (bz) {
				case aW:
					bo("GetClientFrameName", "SWE_PROP_NAME");
					bo("GetClientURL", "SWE_PROP_VALUE");
					SiebelApp.Environment.constructor.prototype.GetClientFrame = function () {
						return $('[name="' + SiebelApp.Environment.GetClientFrameName() + '"]')[0]
					};
					break;
				case aP:
					bo("GetStyleSheetName", "SWE_PROP_VALUE");
					break;
				case aR:
					var bn = bp.GetProperty(br);
					if (bn) {
						this.AppendToStrCache(bn)
					}
					break;
				case aX:
					var a5 = bp.GetChildCount();
					if (a5 > 0) {
						m.Initialize(bp);
						m.ProcessObjectInfo(bp.GetChildByType(aY))
					}
					break;
				case bv:
					var bn = bp.GetProperty(br);
					if (bn) {
						SiebelApp.LayoutTransitionsMgr.setTransition(bn)
					}
					break;
				case bf:
					bo("GetScreenNavTitle", "SWE_PROP_SCREEN_NAV_TITLE");
					bo("GetDetailCategoryTitle", "SWE_PROP_DETAIL_CATEGORY_TITLE");
					break;
				case bg:
					if (bp.PropertyExists(G.get("SWE_PROP_QTP_OT"))) {
						bo("GetObjectType", "SWE_PROP_QTP_OT")
					}
					if (bp.PropertyExists(G.get("SWE_PROP_QTP_RN"))) {
						bo("GetRepstrName", "SWE_PROP_QTP_RN")
					}
					if (bp.PropertyExists(G.get("SWE_PROP_QTP_UN"))) {
						bo("GetUIName", "SWE_PROP_QTP_UN")
					}
					break;
				case bb:
					var aU = bp.EnumProperties(true);
					do {
						U[aU] = bp.GetProperty(aU)
					} while ((aU = bp.EnumProperties(false)));
					break;
				case bh:
					aE.call(this, bp);
					break;
				case bl:
					var bk = bp.GetChildCount();
					if (bk > 0) {
						SiebelApp.S_App.LocaleObject.InitLocale(bp.GetChild(0))
					}
					break;
				case aT:
					var aQ = bp.GetProperty(bc);
					var bn = bp.GetProperty(br);
					if (aQ && bn) {
						aH.call(this, aQ, bn)
					}
					break;
				case aS:
					var bq = new SiebelApp.S_App.PortletSessionMgr();
					bq.ProcessPortletInfo(bp);
					break;
				case bm:
					var a2 = bp.GetProperty(bc);
					var a4 = bp.GetProperty(br);
					if (a2 && a4) {
						i.call(this, a2, a4)
					}
					break;
				case bw:
					var a0 = {};
					a0.GetName = function () {
						return G.get("SWE_PST_SEARCH_NAME")
					};
					if (!(SiebelAppFacade.ComponentMgr.FindComponent({
								id : G.get("SWE_PST_SEARCH_NAME")
							}))) {
						var bu = CCFMiscUtil_CreatePropSet();
						bu.SetProperty(G.get("SWE_UIDEF_PM_CTR"), "siebel/searchLookinPModel");
						bu.SetProperty(G.get("SWE_UIDEF_PR_CTR"), "siebel/searchLookinPRenderer");
						SiebelAppFacade.ComponentMgr.MakeComponent(SiebelApp.S_App, bu, a0)
					}
					break;
				case a6:
					if (SiebelApp.S_App.IsRwd()) {
						this.GetCmdMgr().ProcessRWDNotifications(bp)
					}
					break;
				case bj:
					if (SiebelApp.S_App.IsRwd()) {
						buscomp = new by();
						buscomp.ProcessObjectInfo(bp.GetChild(0))
					}
					break;
				case bs:
				case a8:
				case bt:
					if (SiebelApp.S_App.IsRwd()) {
						var ba = ac.PrepareModuleInfo(bp);
						(function () {
							var bC = bp;
							var bB = buscomp;
							if (a1 === bx) {
								var bA = new $.Deferred();
								deferreds.push(bA.promise())
							}
							require(ba, function () {
								try {
									if (a1 !== bx) {
										am.call(SiebelApp.S_App, bC, bB)
									} else {
										aL.call(SiebelApp.S_App, bC, bB);
										bA.resolveWith(SiebelApp.S_App, ["SA Applet Object Info"])
									}
								} catch (bD) {
									SiebelJS.Log(bD)
								}
								bC = null
							})
						})()
					}
					break;
				case a3:
					if (SiebelApp.S_App.IsRwd()) {
						u.call(this, bp)
					}
					break;
				case aZ:
					if (SiebelApp.S_App.IsRwd()) {
						aC = bp
					}
					break;
				default:
					SiebelJS.Log("[SetProtoAPIs] : Missing handler for type [" + bz + "]");
					break
				}
			}
			if (a7 !== undefined) {
				az()
			}
			aV = null
		}
		function aE(aQ) {
			var aP = new SiebelApp.S_App.SweTimer();
			SiebelApp.S_App.SetTimer(aP);
			SiebelApp.S_App.GetTimer().CreateTimerHookMap(aQ);
			SiebelApp.S_App.SetEnablePerfHooks(true);
			SiebelApp.S_App.GetTimer().SetSessionID()
		}
		function az() {
			var aP = SiebelApp.S_App.constructor.prototype;
			var aQ = SiebelApp.Environment.constructor.prototype;
			for (var aR in aQ) {
				if (typeof aQ[aR] === "function") {
					aP[aR] = aQ[aR]
				}
			}
		}
		aK.prototype.SetSelfProps = function (aR) {
			var aU = ac.Curry(aK.prototype.DefineAccessor, aK.prototype, aR);
			aU("GetUserName", "SWE_PROP_USER_ID");
			aU("GetName", "SWE_PROP_NAME");
			aU("GetAckView", "SWE_PROP_ACK_VIEW");
			aU("GetCookieName", "SWE_PROP_COOKIE_NAME");
			aU("GetSessionId", "SWE_RPC_PROP_SESSION_NUMBER");
			aU("GetSRN", "SWE_PROP_SESSION_RANDOM_NUMBER");
			aU("UseCookie", "SWE_RPC_PROP_USE_COOKIE");
			aU("UseSecureCookie", "SWE_RPC_PROP_USE_SECURE_COOKIE");
			aU("GetPageURL", "SWE_PROP_PAGEURL");
			aU("GetLoginTimeStamp", "SWE_PROP_LOGIN_TIMESTAMP");
			aU("GetScriptDir", "SWE_PROP_SCRIPT_DIR");
			aU("GetSWEReqCount", "SWE_PROP_REQ_COUNT");
			aU("GetSWEReqCount", "SWE_COUNT_STR");
			aU("GetStandAloneClient", "SWE_PROP_STANDALONE_CLIENT");
			aU("GetAccessibilityEnhanced", "SWE_PROP_ACCESSIBILITY_ENHANCED");
			aU("GetHtmlPopupName", "SWE_PROP_HTML_POPUP_NAME");
			aU("GetPopupHDBrowser", "SWE_PROP_POPUP_HDBrowser");
			aU("GetCheckSum", "SWE_PROP_CHECKSUM");
			aU("GetCancelQueryTimeout", "SWE_PROP_CANCEL_QUERY_TIME_OUT");
			aU("GetPopupConSize", "SWE_PROP_POPUP_CON_SIZE");
			aU("GetStrictDate", "SWE_PROP_STRICT_DATE");
			aU("IsUIEnableDateError", "SWE_PROP_IS_ENABLE_UI_DATE_ERROR_DETECT");
			aU("UseAnsiCtrls", "SWE_PROP_USE_ANSI_CONTROLS");
			aU("IsMobileApplication", "SWE_IS_MOBILE_APPLICATION");
			aU("IsAutoOn", "SWE_IS_AUTO_ON");
			aU("GetRequiredIndicator", "SWE_PROP_ICON_REQ_INDICATOR");
			aU("WPName", "SWE_PROP_NAME");
			aU("ViewTarget", "SWE_VIEW_TARGET");
			aU("IsSui", "SWE_PROP_SUI_THEME");
			aU("IsUPTEnabled", "SWE_PROP_ENABLE_UPT");
			aU("GetBusyTimer", "SWE_BUSY_TIMER");
			aK.prototype.GetScreenNavTitle = function () {
				return ""
			};
			aK.prototype.GetDetailCategoryTitle = function () {
				return ""
			};
			var aV = aR.GetProperty(G.get("SWE_MINOR_REL_VER1"));
			if (ac.IsTrue(aV)) {
				ag = true
			}
			aV = aR.GetProperty(G.get("SWE_PROP_PHONE_LEADING_ZERO"));
			if (aV) {
				var aT;
				var aW = " ";
				aT = aV.toString().split(",");
				for (var aS = 0, aQ = aT.length; aS < aQ; aS++) {
					var aP = aT[aS];
					if (aP && aP[0] !== "+") {
						aP = "+" + aP
					}
					O[aP] = aW
				}
			}
		};
		aK.prototype.IsPhoneLeadingZeroAllowed = function (aP) {
			return O[aP] ? true : false
		};
		aK.prototype.AppendToStrCache = function (aQ) {
			if (aQ && aQ !== "") {
				var aP = [];
				CCFMiscUtil_StringToArray(aQ, aP);
				aN = aN.concat(aP)
			}
		};
		aK.prototype.AppendToLocalStrCache = function (aQ) {
			var aP = SiebelApp.Utils.IndexOf(ao, aQ);
			if (aP === -1) {
				ao.push(aQ);
				aP = ao.length - 1
			}
			return (G.get("SWE_INDEX_PREFIX") + aP)
		};
		aK.prototype.LookupStringCache = function (aP) {
			var aQ = "";
			if (aP >= 0 && aP < aN.length) {
				aQ = aN[aP]
			} else {
				if (aP && aP[0] === G.get("SWE_INDEX_PREFIX")) {
					aP = aP.substring(1, aP.length);
					aQ = ao[aP]
				}
			}
			return aQ
		};
		aK.prototype.GetStringCache = function () {
			return aN
		};
		aK.prototype.SetStringCache = function (aP) {
			aN = aP
		};
		aK.prototype.GetNavLevel = function () {
			return Q
		};
		aK.prototype.GetPMPropSet = function () {
			return z
		};
		aK.prototype.SetPMPropSet = function (aP) {
			z = z === null ? aP : z;
			Q = Q.length === 0 ? (z ? (z.GetProperty(G.get("SWE_NAV_EXPANDED_LEVEL")) || "") : "").split(",") : Q
		};
		aK.prototype.SetDiscardUserState = function (aP) {
			ax = aP
		};
		aK.prototype.GetDiscardUserState = function () {
			return ax
		};
		aK.prototype.GotoView = function (aU, aV, aQ, aY, aT, aX) {
			var aS;
			this.uiStatus.Busy({
				target : this.GetTargetViewContainer(),
				mask : true
			});
			SiebelApp.S_App.NotifyTimer("TimeGoToView", [aU, "Start GotoView"]);
			var aR = true;
			if (!ac.IsEmpty(aQ)) {
				aS = ac.DecodeFromQueryString(aQ, true);
				var aW = aS.GetProperty(G.get("SWE_VIEW_ARG"));
				if (ac.IsEmpty(aU) && ac.IsEmpty(aV) && !ac.IsEmpty(aW) && (!this.GetActiveView() || (aW !== this.GetActiveView().GetName())) && !aS.GetProperty(G.get("SWE_ARG_KEEP_CONTEXT"))) {
					aS.SetProperty(G.get("SWE_ARG_KEEP_CONTEXT"), "0")
				}
			} else {
				aS = CCFMiscUtil_CreatePropSet()
			}
			if (this.GetDiscardUserState()) {
				if (this.GetPopupPM().Get("state") === G.get("POPUP_STATE_VISIBLE")) {
					this.GetPopupPM().ExecuteMethod("SetPopupVisible", false)
				}
			} else {
				if (!aT && !this.CanLeaveMainView()) {
					aR = false;
					this.uiStatus.Free();
					return aR
				}
			}
			SiebelApp.S_App.NotifyTimer("TimeGoToView", [aU, "View Cache Ready"]);
			if (ac.IsEmpty(aS.GetProperty(G.get("SWE_CMD_ARG")))) {
				aS.SetProperty(G.get("SWE_CMD_ARG"), G.get("SWE_GOTO_VIEW"))
			}
			if (!aS.GetProperty(G.get("SWE_ARG_KEEP_CONTEXT"))) {
				aS.SetProperty(G.get("SWE_ARG_KEEP_CONTEXT"), "1")
			}
			this.SetDefaultArgs(aS);
			if (!ac.IsEmpty(aU)) {
				aU = aU.split("&").join("%26");
				aS.SetProperty(G.get("SWE_VIEW_ARG"), aU)
			}
			if (ac.IsEmpty(aS.GetProperty(G.get("SWE_COUNT_STR")))) {
				aS.SetProperty(G.get("SWE_COUNT_STR"), this.GetSWEReqCount())
			} else {
				aK.prototype.GetSWEReqCount = function () {
					return aS.GetProperty(G.get("SWE_COUNT_STR"))
				}
			}
			var aZ = ac.EncodeToQueryString(aS, ac.IsEmpty(aQ));
			var aP = {};
			aP.url = this.GetPageURL();
			aP.data = aZ.split(" ").join("%20");
			aP.type = "POST";
			aP.contentType = "application/x-www-form-urlencoded";
			aP.async = !aX;
			aP.context = this;
			aP.successfncallback = function () {
				var a1 = new $.Deferred();
				var a0 = this.ProcessResponse.apply(this, arguments);
				a0.done(function () {
					SiebelApp.S_App.ProcessError();
					SiebelApp.S_App.uiStatus.Free();
					a1.resolve()
				});
				return a1.promise()
			};
			SiebelApp.AjaxRequestMgr.Ajax(aP);
			aP = null;
			return aR
		};
		function J() {
			$("#_sweview").addClass("siebui-indent-content")
		}
		function aq() {
			$("#_sweview").addClass("siebui-dashboard-content-indent")
		}
		function aw() {
			$("#SS_ChatUI").addClass("siebui-chat-pane")
		}
		aK.prototype.HideLayout = function (aP) {
			if (typeof(aP) === "string") {
				if (aP.match(/SS_OpenUIReportPane/) || aP.match(/SS_TaskUIPane/)) {
					$("#_sweview").removeClass("siebui-indent-content")
				} else {
					if (aP.match(/TaskAssistant/)) {
						$("#_sweview").removeClass("siebui-indent-content");
						var aQ = SiebelApp.S_App.getExtObject("TaskAssistant");
						if (aQ) {
							aQ.ExecuteMethod("Hide")
						}
					} else {
						if (aP.match(/Dashboard/)) {
							$("#_sweview").removeClass("siebui-dashboard-content-indent");
							var aQ = SiebelApp.S_App.getExtObject("Dashboard");
							if (aQ) {
								SiebelApp.S_App.UnregisterExtObject("Dashboard")
							}
						} else {
							if (aP.match(/SS_ChatUI/)) {
								$("#SS_ChatUI").removeClass("siebui-chat-pane")
							} else {
								if (aP.match(/CommunicationPanel/)) {
									var aQ = SiebelApp.S_App.getExtObject("CommunicationPanel");
									if (aQ) {
										aQ.ExecuteMethod("Hide")
									}
								}
							}
						}
					}
				}
			}
			$("#" + aP).html("");
			SiebelApp.EventManager.fireEvent("forceResize")
		};
		aK.prototype.GenerateSrvrReq = function (aR) {
			var aP = CCFMiscUtil_CreatePropSet();
			aP.SetProperty(G.get("SWE_CMD_ARG"), aR);
			aP.SetProperty(G.get("SWE_ARG_KEEP_CONTEXT"), "1");
			this.SetDefaultArgs(aP);
			aP.SetProperty(G.get("SWE_COUNT_STR"), SiebelApp.S_App.GetSWEReqCount());
			SiebelApp.S_App.OfflineCallMethod("GetSRN", aP);
			var aQ = ac.EncodeToQueryString(aP, false);
			var aS = SiebelApp.S_App.GetPageURL() + G.get("SWE_ARG_START") + aQ;
			return aS
		};
		aK.prototype.CanLeaveMainView = function () {
			var aP = true;
			var aQ = this.GetActiveView();
			if (!SiebelApp.S_App.UploadFile()) {
				return false
			}
			if (aQ && !aQ.SetActiveApplet(null)) {
				aP = false
			}
			return aP
		};
		aK.prototype.GetSWEReqCount = function () {
			return "1"
		};
		aK.prototype.GetRequestDefault = function () {
			var aP = CCFMiscUtil_CreatePropSet();
			this.SetDefaultArgs(aP);
			aP.SetProperty(G.get("SWE_VIEW_ID_ARG"), "");
			return aP
		};
		aK.prototype.SetDefaultArgs = function (aS) {
			aS.SetProperty(G.get("SWE_VIEW_RPC_ARG"), "1");
			aS.SetProperty(G.get("SWE_PROP_SESSION_RANDOM_NUMBER"), this.GetSRN());
			var aQ = this.GetSWEReqCount();
			if (!isNaN(aQ)) {
				aS.SetProperty(G.get("SWE_COUNT_STR"), aQ)
			}
			if (!this.GetPopupPM().IsPopupStarted() && this.GetActiveView() && this.GetActiveView().GetActiveApplet() && !this.GetPopupPM().Get("isCurrencyOpen") && !ac.IsTrue(aS.GetProperty(G.get("SWE_BUSINESS_SERVICE")))) {
				if (ac.IsEmpty(aS.GetProperty(G.get("SWE_ACTIVE_APPLET_STR")))) {
					aS.SetProperty(G.get("SWE_ACTIVE_APPLET_STR"), this.GetActiveView().GetActiveApplet().GetName())
				}
				var aP = aS.GetProperty(G.get("SWE_APPLET_STR"));
				var aR = !ac.IsEmpty(j[aP]);
				if (ac.IsEmpty(aS.GetProperty(G.get("SWE_ACTIVE_VIEW_STR"))) && !aR) {
					aS.SetProperty(G.get("SWE_ACTIVE_VIEW_STR"), this.GetActiveView().GetName())
				}
			} else {
				if (!ac.IsTrue(aS.GetProperty(G.get("SWE_BUSINESS_SERVICE"))) && !aS.GetProperty(G.get("SWE_ACTIVE_APPLET_STR")) && SiebelApp.S_App.PortletSessionMgr && V) {
					aS.SetProperty(G.get("SWE_ACTIVE_APPLET_STR"), V.GetName())
				}
			}
		};
		aK.prototype.OnLoadViewContent = function () {
			try {
				SiebelApp.EventManager.cleanListners("gridresize");
				SiebelApp.EventManager.fireEvent("preload");
				var aR = this.GetActiveView();
				if (!ac.IsEmpty(aR)) {
					if (ac.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced())) {
						$("[name= _sweview]").attr({
							role : "main",
							title : aF.GetViewSummary()
						})
					}
					aR.Initialize();
					if (SiebelApp.S_App.IsRwd()) {
						var aP = "[id=" + SiebelApp.S_App.ViewTarget() + "]";
						if (typeof aR.GetRepstrName === "function") {
							$(aP).attr("rn", aR.GetRepstrName())
						}
						if (typeof aR.GetUIName === "function") {
							$(aP).attr("un", aR.GetUIName())
						}
						if (typeof aR.GetObjectType === "function") {
							$(aP).attr("ot", aR.GetObjectType())
						}
					} else {
						if (typeof aR.GetRepstrName === "function") {
							$("[name=_sweview]").attr("rn", aR.GetRepstrName())
						}
						if (typeof aR.GetUIName === "function") {
							$("[name=_sweview]").attr("un", aR.GetUIName())
						}
					}
				} else {
					SiebelApp.S_App.NavCtrlMgr.Show(true)
				}
				if (SiebelApp.S_App.IsMobileApplication() !== "true") {
					var aV = $("#_swescrnbar");
					if (!(aV.hasClass("addshowactivated"))) {
						var aT = SiebelApp.S_App.GetDirection(),
						aY = '<a href="#" id="sidebarOpenButton" title="Open Sidebar" class="sidebarNavButton hidden"></a>',
						aZ = $("#_swecontent"),
						a1 = SiebelApp.S_App.IsRwd(),
						aW = a1 ? SiebelApp.S_App.NavCtrlMgr.GetscreenNavigationPM() : "",
						aQ = a1 ? $("#" + aW.Get("placeholder")) : $("#s_sctrl.siebui-nav-tree");
						aQ.append(aY);
						aV.addClass(aT ? "siebui-rtl-screenbar addshowactivated" : "addshowactivated");
						aZ.removeClass("maxWidth");
						aY = '<a href="#" class="sidebarNavButton" id="sidebarCloseButton" title="Close Sidebar"></a>';
						aQ.append(aY);
						var a2 = $("#sidebarOpenButton"),
						aU = $("#sidebarCloseButton");
						aU.on("click", function () {
							aV.addClass("treeClosed");
							a2.removeClass("hidden");
							aU.addClass("hidden");
							aZ.addClass("maxWidth");
							$("[id^='gview_s']").resize()
						});
						a2.on("click", function () {
							aV.removeClass("treeClosed");
							a2.addClass("hidden");
							aU.removeClass("hidden");
							aZ.removeClass("maxWidth").addClass(aT ? "siebui-rtl-content" : "");
							aQ.css("display", "");
							$("[id^='gview_s']").resize()
						})
					}
				}
				var aS = SiebelAppFacade.ComponentMgr.FindComponent({
						id : G.get("SWE_PST_COMM_TOOLBAR")
					});
				if (SiebelApp.S_App.CommToolbar && !aS) {
					var a0 = CCFMiscUtil_CreatePropSet();
					a0.SetProperty(G.get("SWE_UIDEF_PM_CTR"), "siebel/commToolbarpmodel");
					a0.SetProperty(G.get("SWE_UIDEF_PR_CTR"), "siebel/commToolbarprender");
					SiebelAppFacade.ComponentMgr.MakeComponent(this, a0, SiebelApp.S_App.CommToolbar);
					if (aS = SiebelAppFacade.ComponentMgr.FindComponent({
								id : G.get("SWE_PST_COMM_TOOLBAR")
							})) {
						aS.Show()
					}
				}
				if (SiebelApp.S_App.IsRwd()) {
					this.GetCmdMgr().Show()
				}
				if (this.GetActiveView() && this.GetActiveView().GetInvokeMethod()) {
					this.GetCmdMgr().InvokeCommand(this.GetActiveView().GetInvokeMethod())
				}
			} catch (aX) {
				SiebelJS.Log(aX)
			}
			finally {
				SiebelApp.EventManager.fireEvent("postload");
				this.uiStatus.Free()
			}
		};
		aK.prototype.OnLoadExternalObject = function (aQ) {
			try {
				switch (aQ) {
				case "SS_TaskUIPane":
					if ($("#taskList").hasClass("tasklist1")) {
						var aR = SiebelApp.S_App.getExtObject("TaskUIPane");
						if (aR) {
							J.call(this);
							aR.Show()
						}
					}
					break;
				case "TaskAssistant":
					var aR = SiebelApp.S_App.getExtObject("TaskAssistant");
					if (aR) {
						J.call(this);
						aR.Show()
					}
					break;
				case "Dashboard":
					var aR = SiebelApp.S_App.getExtObject("Dashboard");
					if (aR) {
						aq.call(this);
						aR.Show()
					}
					break;
				case "SS_OpenUIReportPane":
					if ($("#reportList").hasClass("siebui-report-list")) {
						var aR = SiebelApp.S_App.getExtObject("ReportPane");
						if (aR) {
							J.call(this);
							aR.Show()
						}
					}
					break;
				case "SS_ChatUI":
					var aR = SiebelApp.S_App.getExtObject("ChatPane");
					if (aR) {
						aw.call(this);
						aR.Show()
					}
					break;
				case "CommunicationPanel":
					var aR = SiebelApp.S_App.getExtObject("CommunicationPanel");
					if (aR) {
						aR.Show()
					}
					break
				}
			} catch (aP) {
				SiebelJS.Log(aP)
			}
			finally {
				SiebelApp.EventManager.fireEvent("forceResize");
				SiebelApp.EventManager.fireEvent("posteoiload");
				this.uiStatus.Free()
			}
		};
		aK.prototype.RegisterExtObject = function (aV) {
			var aW = aV.GetProperty(G.get("SWE_PST_EXT_OBJ_INFO"));
			var aU = this.getExtObject(aW);
			if (aU) {
				return aU.Object
			}
			aU = {};
			switch (aW) {
			case "TaskUIPane":
				var aR = new SiebelAppFacade.TaskPresentationModel();
				aR.Init();
				aU.TYPE = aW;
				aU.Object = aR;
				break;
			case "TaskAssistant":
				var aS = new SiebelAppFacade.TaskAssistPlayerPM();
				aS.Init();
				aU.TYPE = aW;
				aU.Object = aS;
				break;
			case "Dashboard":
				var aX = new SiebelAppFacade.DashboardPM();
				aX.Init();
				aU.TYPE = aW;
				aU.Object = aX;
				break;
			case "ReportPane":
				var aQ = new SiebelAppFacade.ReportPresentationModel();
				aQ.Init();
				aU.TYPE = aW;
				aU.Object = aQ;
				break;
			case "ChatPane":
				var aP = new SiebelAppFacade.ChatPresentationModel();
				aP.Init();
				aU.TYPE = aW;
				aU.Object = aP;
				break;
			case "CommunicationPanel":
				var aT = new SiebelAppFacade.CommunicationPanelPM();
				aT.Init();
				aU.TYPE = aW;
				aU.Object = aT;
				break
			}
			a.push(aU);
			return aU.Object
		};
		aK.prototype.getExtObject = function (aR) {
			var aQ = a.length;
			for (var aP = 0; aP < aQ; aP++) {
				if (a[aP].TYPE === aR) {
					return a[aP].Object
				}
			}
			return null
		};
		aK.prototype.UnregisterExtObject = function (aR) {
			var aQ = a.length;
			for (var aP = 0; aP < aQ; aP++) {
				if (a[aP].TYPE === aR) {
					a.splice(aP, 1);
					return
				}
			}
		};
		aK.prototype.CanInvokeMethod = function (aP) {
			return true
		};
		aK.prototype.LogOff = function () {
			var aR = this.GetActiveView();
			if (aR) {
				if (!aR.SetActiveApplet(null)) {
					return false
				}
			}
			if (SiebelApp.S_App.GetTimer()) {
				var aS = this;
				var aV = {};
				aV.type = "POST";
				var aU = SiebelApp.S_App.GetTimer().GetLogBuffer();
				var aQ = SiebelApp.S_App.GetPageURL();
				var aT = SiebelApp.S_App.GetSRN();
				aQ = aQ + "?SWECmd=InvokeMethod&SWEMethod=WritePerfLog&SRN=" + aT;
				var aP = "" + G.get("SWE_PERF_LOG_DATA") + "=" + URLEncode(aU);
				$.ajax({
					type : "POST",
					url : aQ,
					data : aP,
					processData : false,
					complete : aS.OnUnLoadApp
				})
			} else {
				this.OnUnLoadApp();
				return true
			}
		};
		aK.prototype.OnUnLoadApp = function () {
			var aR = "";
			var aP = "1";
			var aQ = new Date();
			aR = aR + SiebelApp.S_App.GetPageURL() + "?SWECmd=Logoff&SWETS=" + aQ.valueOf() + "&SWEPreLd=" + aP;
			window.location.replace(aR)
		};
		aK.prototype.InvokeMethod = function (a2, aY, aW) {
			var aQ = true;
			aY = aY || CCFMiscUtil_CreatePropSet();
			var aS = aY.Clone();
			var a0 = this.GetMainView();
			aQ = x.call(this, a2, aS);
			if (!aQ) {
				return false
			}
			var aZ = {};
			var aV = this;
			if (typeof(aW) === "object" || aW === true || aW === false) {
				aZ.scope = this;
				aZ.args = [];
				aZ.args.push(a2);
				aZ.args.push(aS);
				aZ.async = (typeof(aW.async) === "boolean") ? aW.async : aW;
				aZ.selfbusy = aW.selfbusy || false;
				aZ.mask = aW.mask || false;
				aZ.cb = function () {
					var a6 = Array.prototype.slice.call(arguments);
					a6.push(aV.PostExecute.apply(aV, arguments));
					if (typeof(aW.scope) !== "undefined" && typeof(aW.scope.cb) === "function") {
						aW.scope.cb.apply(aW.scope || null, a6)
					}
					if (a6[0] === "ExecuteNamedQuery") {
						SiebelApp.S_App.uiStatus.Free()
					}
				}
			} else {
				aZ = undefined
			}
			switch (a2) {
			case "Query":
				var aR = aY.Applet;
				delete aY.Applet;
				aR.GetBusComp().HandleQuery(aY);
				aM.call(this, a2, aS);
				break;
			case "ExecuteNamedQuery":
				var a1 = CCFMiscUtil_CreatePropSet();
				aS.SetProperty(G.get("SWE_CMD_ARG"), G.get("SWE_CMD_INVOKE_METHOD_STR"));
				aS.SetProperty(G.get("SWE_METHOD_STR"), a2);
				aS.SetProperty(G.get("SWE_INPUT_PROP_SET_STR"), aS.EncodeAsString());
				aS.SetProperty(G.get("SWE_VIEW_RPC_ARG"), "1");
				SiebelApp.S_App.uiStatus.Busy({
					timeOut : false,
					mask : true,
					loadMsg : true
				});
				var a5;
				if (a0) {
					a5 = a0.GetActiveApplet();
					if (a5 && a5.GetBusComp()) {
						var aX = CCFMiscUtil_CreatePropSet();
						if (!a5.InvokeMethod("ImplicitCommit", aX)) {
							aQ = false;
							break
						}
					}
				}
				SiebelApp.S_App.CallServer(aS, a1, true, aZ);
				if (typeof(aW) === "undefined") {
					SiebelApp.S_App.uiStatus.Free()
				}
				break;
			case "CanLeaveMainView":
				aQ = this.CanLeaveMainView();
				aM.call(this, a2, aS);
				break;
			case "NextApplet":
				if (a0) {
					a0.CycleActiveApplet(false)
				}
				aM.call(this, a2, aS);
				break;
			case "PrevApplet":
				if (a0) {
					a0.CycleActiveApplet(true)
				}
				aM.call(this, a2, aS);
				break;
			case "GotoAppletMenu":
				if (a0) {
					var a4 = a0.GetActiveApplet();
					if (a4.GetMenu()) {
						a4.GetMenu().OnMenuInvoke(G.get("APPLET_NAME"), G.get("SWE_PREPARE_APPLET_MENU"), G.get("SWE_MENU_APPLET"))
					}
				}
				aM.call(this, a2, aS);
				break;
			case "GotoApplicationMenu":
				if (t) {
					var aT = t.GetPM().Get("GetPlaceHolder");
					$("#" + aT).children().eq(0).children().eq(0).focus()
				}
				aM.call(this, a2, aS);
				break;
			case "GotoCTIToolBar":
				var aU = SiebelAppFacade.ComponentMgr.FindComponent({
						id : G.get("SWE_PST_COMM_TOOLBAR")
					});
				if (aU) {
					aU.ExecuteMethod("HandleGotoCTIToolbar")
				}
				aM.call(this, a2, aS);
				break;
			case "GotoChatPane":
				var aP = SiebelApp.S_App.getExtObject("ChatPane");
				if (aP) {
					aP.ExecuteMethod("SetFocus")
				}
				aM.call(this, a2, aS);
				break;
			case "GotoSelectedTreeNode":
				if (this.CanLeaveMainView() && a0) {
					a0.GotoSelectedTreeNode()
				}
				break;
			case "ViewList":
				SiebelApp.S_App.NavCtrlMgr.GetVisPM().GetRenderer().SetFocus();
				aM.call(this, a2, aS);
				break;
			case "Logoff":
				aQ = this.LogOff();
				break;
			case "GotoScrnTab":
				SiebelApp.S_App.NavCtrlMgr.FocusNavLink(G.get("SWE_SCREEN_NAV_CONTROL_STR"));
				break;
			case "GotoViewTab":
				SiebelApp.S_App.NavCtrlMgr.FocusNavLink(G.get("SWE_DET_VIEW_NAV_CONTROL_STR"));
				break;
			case "GotoSubViewTab":
				$("#s_vctrl_div_tabView ul  li ").children().eq(0).focus();
				break;
			default:
				if (a2 === au || a2 === c) {
					var a5;
					if (a0) {
						a5 = a0.GetActiveApplet()
					}
					if (a5 && a5.GetBusComp() && a5.GetBusComp().IsInQueryState()) {
						var aX = CCFMiscUtil_CreatePropSet();
						a5.InvokeMethod(ah, aX)
					}
				}
				var a3;
				a3 = this.CallServerApp(a2, aS, aZ);
				if (typeof(aW) === "undefined") {
					var aY = [];
					aY.push(a2);
					aY.push(aS);
					aY.push(a3);
					aQ = this.PostExecute.apply(this, aY);
					SiebelApp.S_App.uiStatus.Free();
					return aQ
				}
				break
			}
			return aQ
		};
		aK.prototype.PostExecute = function (aR, aT, aS) {
			if (aS === null) {
				return false
			} else {
				if (aR == "GetProfileAttr") {
					var aQ;
					aQ = aT.GetPropertyAsStr("attrName");
					if (aQ == "GetJSAddBarDisable") {
						if (strResult == "FALSE" || strResult == "False") {
							return false
						}
					}
				}
			}
			var aP = aM.call(this, aR, aT);
			return aP
		};
		aK.prototype.SWECount = 0;
		aK.prototype.OnLoadViewContainer = function (aT) {
			(function () {
				var aU = $("[name=" + aT + "]");
				if (SiebelApp.S_App.IsRwd()) {
					aU = $("#" + aT)
				}
				aK.prototype.GetTargetViewContainer = function () {
					return aU
				};
				aK.prototype.SetNextTargetViewContainer = function (aV) {
					if (SiebelApp.S_App.IsRwd()) {
						aU = $("#" + aV)
					} else {
						aU = $("[name=" + aV + "]")
					}
				};
				aK.prototype.updateTargetViewContainer = function (aY, aW, aV) {
					var aX = new $.Deferred();
					SiebelApp.contentUpdater.AddCallBack(aY, function () {
						aX.resolveWith(this, ["LayoutDone"]);
						if (aW === true) {
							this.OnLoadViewContent()
						}
						if (SiebelApp.S_App.IsRwd() && aV === true) {
							this.OnLoadPageContent()
						}
						if (SiebelApp.LayoutTransitionsMgr && typeof(SiebelApp.LayoutTransitionsMgr.ShowTransition) === "function") {
							SiebelApp.LayoutTransitionsMgr.ShowTransition(this.GetTargetViewContainer().attr("id"))
						}
					}, this);
					if (SiebelApp.LayoutTransitionsMgr && typeof(SiebelApp.LayoutTransitionsMgr.Setup) === "function") {
						SiebelApp.LayoutTransitionsMgr.Setup(this.GetTargetViewContainer().attr("id"))
					}
					this.GetTargetViewContainer().attr("src", aY);
					SiebelApp.contentUpdater.loadContent();
					return aX.promise()
				}
			}
				());
			if (SiebelApp.S_App.IsMsgBarEnabled() && C === null) {
				var aR = function () {};
				var aS = new aR();
				aS.GetName = function () {
					return "MsgBarPxy"
				};
				C = new SiebelAppFacade.MsgBrdCstPresentationModel(aS);
				var aQ = CCFMiscUtil_CreatePropSet();
				aQ.SetProperty("SWE_OUI_RENDERER", "MsgBrdCstPhyRenderer");
				C.Init();
				C.Setup(aQ.Clone());
				C.Show()
			}
			var aP = SiebelAppFacade.ComponentMgr.FindComponent({
					id : G.get("SWE_PST_SEARCH_NAME")
				});
			if (aP) {
				aP.Show()
			}
		};
		aK.prototype.GetLayoutURL = function (aY, aT, aU, aX, aP) {
			var aR = G.get("SWE_RPC_PROP_NEW_LAYOUT");
			var aW = G.get("SWE_ARG_EQUAL");
			var aQ = G.get("SWE_ARG_DELIM");
			var aV = aX.GetProperty(G.get("SWE_LAYOUT_IDENTIFIER")) || "";
			aV = URLEncode(aV);
			if (aY === aR) {
				var aS;
				aS = this.GetPageURL() + G.get("SWE_ARG_START") + G.get("SWE_CMD_ARG") + aW + (!ac.IsEmpty(aP) ? G.get("SWE_GET_APPLET_LAYOUT") : G.get("SWE_GET_VIEW_LAYOUT")) + aQ + G.get("SWE_VIEW_ARG") + aW + aT + aQ + G.get("SWE_VIEW_ID_ARG") + aW + aU + aQ + G.get("SWE_VIEW_CHK_SUM_ARG") + aW + this.GetCheckSum() + aQ + G.get("SWE_APPLET_STR") + aW + aP + aQ + G.get("SWE_LAYOUT_IDENTIFIER") + aW + aV;
				return aS
			}
		};
		aK.prototype.NavCtrlMngr = function () {
			return m
		};
		aK.prototype.GetDrilldownURL = function (aP) {
			this.SetDefaultArgs(aP);
			aP.SetProperty(G.get("SWE_COUNT_STR"), this.GetSWEReqCount());
			aP.SetProperty(G.get("SWE_VIEW_ID_ARG"), "");
			aP.SetProperty(G.get("SWE_METHOD_STR"), G.get("SWE_CMD_DRILLDOWN_STR"));
			aP.SetProperty(G.get("SWE_REQ_ROW_ID_STR"), "1");
			aP.SetProperty(G.get("SWE_ACTIVE_VIEW_STR"), this.GetActiveView().GetName());
			aP.SetProperty(G.get("SWE_VIEW_ARG"), this.GetActiveView().GetName());
			aP.SetProperty(G.get("SWE_CMD_ARG"), G.get("SWE_CMD_INVOKE_METHOD_STR"));
			aP.SetProperty(G.get("SWE_POPUP_VECTOR_STR"), "");
			var aQ = ac.EncodeToQueryString(aP);
			return "start.swe?" + aQ
		};
		aK.prototype.DelegateResponse = function (bC, aP) {
			var bt = new $.Deferred();
			var bF = [];
			var aW = [];
			var bn = null;
			if (SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer()) {
				SiebelApp.S_App.GetTimer().TimeGoToView("", "Have Object Info");
				SiebelApp.S_App.GetTimer().TimeServerNotification("Received Server Notifications");
				SiebelApp.S_App.GetTimer().TimePopupApplet("", "Have Object Info")
			}
			var bo = G.get("SWE_RPC_PROP_NEW_LAYOUT");
			var bE = G.get("SWE_RPC_PROP_NEW_APPLET_LAYOUT");
			var a9 = G.get("SWE_RPC_PROP_REFRESH_LAYOUT");
			var a8 = G.get("SWE_RPC_PROP_CONFIRM_DIALOG");
			var aT = G.get("SWE_RPC_PROP_NEW_PAGE");
			var bm = G.get("SWE_RPC_PROP_NEW_POPUP");
			var a0 = G.get("SWE_RPC_PROP_CLOSE_POPUP");
			var a4 = G.get("SWE_PST_NAV_CTRL_INFO");
			var a1 = G.get("SWE_RPC_PROP_NOTIFICATION");
			var bc = G.get("SWE_PST_EXT_OBJ_INFO");
			var ba = G.get("SWE_RPC_PROP_COMMAND_MGR");
			var aX = G.get("SWE_HIST_OUI_UPDATE_INFO");
			var aV = G.get("SWE_OUI_PRINT_DATA");
			var aZ = G.get("SWE_PST_CLIENT_DESCRIPTOR_INFO");
			var a2 = G.get("SWE_RPC_PROP_TOGGLE_LAYOUT");
			var a7 = G.get("SWE_RPC_PROP_STATUS_ERROR");
			var bA = G.get("SWE_RPC_PROP_TARGET");
			var bG = G.get("SWE_RPC_APPLET_NOTIFICATIONS");
			var be = G.get("SWE_APPLICATION_PM_PS");
			var bk = G.get("SWE_RPC_VIEW_NOTIFICATIONS");
			var bq = G.get("SWE_RPC_APP_NOTIFICATIONS");
			var bi = G.get("SWE_RPC_PAGE_NOTIFICATIONS");
			var a6 = G.get("SWE_RPC_HIDE_BROWSER_FRAME");
			var bu = CCFMiscUtil_CreatePropSet();
			var bb = SiebelAppFacade.EJSAdapter;
			if (bC instanceof JSSPropertySet) {
				bu = bC
			} else {
				bu.DecodeFromString(bC)
			}
			if (ac.IsTrue(bu.GetProperty(G.get("SWERESPONSE_ERROR_STR")))) {
				ac.Alert(bu.GetProperty(G.get("SWERESPONSE_ERROR_MSG")));
				this.uiStatus.Free();
				bt.resolve();
				return bt.promise()
			}
			if (!ac.IsEmpty(bu.GetProperty(G.get("SWE_RPC_PROP_ALERT_MSG")))) {
				ac.Alert(HtmlDecode(bu.GetProperty(G.get("SWE_RPC_PROP_ALERT_MSG"))))
			}
			var bj = bu.GetProperty(G.get("SWE_RPC_PROP_STATUS")),
			aQ = this.GetPopupPM();
			if (bj === a0) {
				aQ.ExecuteMethod("ProcessClearPopup", bu)
			} else {
				if (bj === a7) {
					aQ.SetProperty("forceClosePopup", true)
				}
			}
			var a3 = bu.GetProperty(G.get("SWE_PROP_SESSION_RANDOM_NUMBER"));
			if (a3 && bj === a7 && this.GetSRN && ac.IsEmpty(this.GetSRN())) {
				aK.prototype.GetSRN = function () {
					return a3
				}
			}
			if (bj === a7) {
				e.call(this, bu, aP)
			}
			var br = ac.Curry(aK.prototype.DefineAccessor, aK.prototype, bu);
			br("GetSWEReqCount", "SWE_PROP_REQ_COUNT");
			br("GetSWEReqCount", "SWE_COUNT_STR");
			var aU = null;
			var bs = null;
			var bl = null;
			var aY;
			var bz = bu.GetChildCount();
			for (var bx = 0; bx < bz; bx++) {
				var bh = bu.GetChild(bx);
				var bd = bh.GetType();
				switch (bd) {
				case bk:
					if (SiebelApp.S_App.IsRwd()) {
						if (this.GetActiveView()) {
							this.GetActiveView().DispatchNotification(bh)
						}
					}
					break;
				case bq:
					if (SiebelApp.S_App.IsRwd()) {
						A.call(this, bh)
					}
					break;
				case bi:
					if (SiebelApp.S_App.IsRwd()) {
						s.call(this, bh)
					}
					break;
				case a1:
					aJ.call(this, bh);
					break;
				case bG:
					E.call(this, bh);
					break;
				case ak:
					aU = bh;
					if (aU !== null) {
						var bp = aU.GetChildByType(G.get("SWE_PST_STR_CACHE"));
						if (bp !== null) {
							this.AppendToStrCache(bp.GetProperty(G.get("SWE_PROP_VALUE")))
						}
						if (this.IsAutoOn()) {
							var bg = aU.GetChildByType(G.get("SWE_PROP_PICK_CACHE"));
							if (SiebelApp.S_App.TranslationTable && bg !== null) {
								SiebelApp.S_App.TranslationTable.CreateCache(bg)
							}
						}
					}
					break;
				case a4:
					m.HandleResponsePS(bh.Clone());
					m.ProcessObjectInfo(bh);
					break;
				case bc:
					var bD = this.getExtObject(bh.GetProperty(G.get("SWE_PST_EXT_OBJ_INFO")));
					if (bD) {
						bD.HandleNotify(bh.GetChild(0))
					} else {
						bD = this.RegisterExtObject(bh);
						if (bD) {
							bD.Setup(bh.GetChild(0))
						}
					}
					break;
				case ba:
					if (SiebelApp.S_App.IsRwd()) {
						this.GetCmdMgr().ProcessRWDNotifications(bh)
					} else {
						this.GetCmdMgr().ProcessNotifications(bh)
					}
					break;
				case aX:
					f.ProcessObjectInfo(bh);
					break;
				case be:
					this.SetPMPropSet(bh.Clone());
					break;
				case aV:
					var bf = bu.GetChildByType(aZ);
					bb.GenerareEJSPrint(bh, bf);
					break
				}
			}
			if (bu.GetProperty(G.get("SWE_ALARM_NOTI"))) {
				var aR = SiebelAppFacade.ComponentMgr.FindComponent({
						id : "Alarm Reminder Applet"
					});
				if (aR) {
					aR.GetPM().ExecuteMethod("notifyAlarm")
				}
			}
			var bB,
			aS;
			switch (bj) {
			case bo:
				if (SiebelApp.S_App.IsRwd()) {
					if (aU) {
						bl = aU.GetChildByType(G.get("SWE_PST_NEW_VIEW"));
						if (bl) {
							bs = bl.GetChildByType(G.get("SWE_PST_VIEW_INFO"));
							if (bs) {
								aY = bs.GetProperty(G.get("SWE_PROP_TMPL_ITM_HOLDER"))
							}
						} else {
							aY = "External." + bu.GetProperty("ViewId")
						}
					}
					bB = av.call(this, aY, aW)
				} else {
					bB = av.call(this, bu.GetProperty(bA), aW)
				}
				bF.push(this.ProcessNewLayout(bu, bB));
				bn = "refreshview";
				break;
			case bE:
				bB = av.call(this, bu.GetProperty(bA), aW, bu.GetProperty(G.get("SWE_APPLET_STR")));
				bF.push(this.ProcessNewAppletLayout(bu, bB));
				bn = "newappletlayout";
				break;
			case a2:
				bF = bF.concat(this.GetActiveView().HandleRefreshLayout(bu, aW));
				break;
			case a9:
				if (SiebelApp.S_App.IsRwd()) {
					if (aU) {
						bl = aU.GetChildByType(G.get("SWE_PST_NEW_VIEW"));
						if (bl) {
							bs = bl.GetChildByType(G.get("SWE_PST_VIEW_INFO"));
							if (bs) {
								aY = bs.GetProperty(G.get("SWE_PROP_TMPL_ITM_HOLDER"))
							}
						} else {
							bs = aU.GetChildByType(G.get("SWE_PST_VIEW_INFO"));
							if (bs) {
								aY = bs.GetProperty(G.get("SWE_PROP_TMPL_ITM_HOLDER"))
							}
						}
					}
					bB = av.call(this, aY, aW)
				} else {
					bB = av.call(this, bu.GetProperty(bA), aW)
				}
				aS = this.ProcessRefreshLayout(bu, bB);
				if (aS !== false) {
					bF.push(aS);
					bn = "refreshlayout"
				} else {
					aW.pop()
				}
				break;
			case a8:
				aD.call(this, bu);
				break;
			case aT:
				this.SetShowNewPage(true);
				if (SiebelApp.S_App.IsRwd()) {
					bB = av.call(this, "", aW)
				} else {
					bB = av.call(this, bu.GetProperty(bA), aW)
				}
				aS = this.ProcessNewPage(bu, bB);
				if (aS !== false) {
					bF.push(aS);
					bn = "refreshpage"
				} else {
					aW.pop()
				}
				if (SiebelApp.S_App.IsRwd()) {
					var bw = bu.GetChildByType(G.get("SWE_PST_PAGE_INFO"));
					if (bw) {
						var by = bw.GetProperty(G.get("SWE_PROP_NEW_PAGE_NAME"));
						if (by != null) {
							ap.call();
							var a5 = function () {};
							var bv = new a5();
							bv.GetName = function () {
								return by
							};
							ac.PrepareModuleInfo(bw);
							if (!bw.GetProperty(G.get("SWE_UIDEF_PM_CTR"))) {
								bw.SetPropertyStr(G.get("SWE_UIDEF_PM_CTR"), "siebel/webpgpm")
							}
							if (!bw.GetProperty(G.get("SWE_UIDEF_PR_CTR"))) {
								bw.SetPropertyStr(G.get("SWE_UIDEF_PR_CTR"), "siebel/webpgpr")
							}
							SiebelAppFacade.ComponentMgr.MakeComponent(SiebelApp.S_App, bw, bv);
							pageComp = SiebelAppFacade.ComponentMgr.FindComponent({
									id : bv.GetName()
								});
							this.SetActivePageComp(pageComp)
						}
					}
				}
				break;
			case bm:
				bn = this.ProcessNewPopup(bu);
				break;
			case a7:
				aQ.SetProperty("forceClosePopup", false);
				break;
			case a6:
				if (SiebelApp.S_App.IsRwd()) {
					aY = bu.GetProperty("ViewId");
					SWEHideBrowserFrame(aY);
					switch (aY) {
					case "SS_TaskUIPane":
						SiebelApp.S_App.UnregisterExtObject("TaskUIPane");
						break
					}
				}
				break;
			default:
				break
			}
			if (ac.IsEmpty(aU) || bj === a2) {
				y.call(this)
			}
			if (SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer()) {
				SiebelApp.S_App.GetTimer().TimeServerNotification("Processed Server Notifications")
			}
			bF.push(this.GetFilesAndProcessObjectInfo(bu));
			if (bj === a9) {
				if (bF.length > 0) {
					bF[bF.length - 1].done(function () {
						y.call(SiebelApp.S_App)
					})
				}
			}
			this.InvokeCallBack();
			if (!ac.IsEmpty(f)) {
				f.ManipulateHistoryState()
			}
			if (SiebelApp.S_App.OUIPerfReporter) {
				SiebelApp.S_App.OUIPerfReporter.RefreshData(bu)
			}
			if (bj === a0) {
				F(bu)
			}
			bu = null;
			if (bF.length > 0) {
				$.when.apply($, bF).done(function () {
					SiebelApp.S_App.ProcessCallbacks(bn, aW);
					bt.resolve()
				})
			} else {
				SiebelApp.S_App.NavCtrlMgr.Show(true);
				bt.resolve()
			}
			if (ac.IsEmpty(aU) || (SiebelApp.S_App.IsRwd() && bj === aT)) {
				aI.call(this)
			}
			return bt.promise()
		};
		aK.prototype.ProcessCallbacks = function (aQ, aS) {
			if (aQ === "refreshpopup") {
				SiebelApp.S_App.GetPopupPM().SetProperty("CanProcessLayout", true)
			}
			if (aQ !== "newappletlayout") {
				SiebelApp.S_App.NavCtrlMgr.Show(true)
			}
			for (var aR = 0, aP = aS.length; aR < aP; aR++) {
				aS[aR]["func"].call(SiebelApp.S_App, aS[aR]["tgt"], aS[aR]["applet"])
			}
			SiebelApp.EventManager.fireEvent(aQ)
		};
		function A(aP) {
			X.ExecuteMethod("ProcessProperties", aP);
			X.ExecuteMethod("ExecuteUIUpdate")
		}
		function s(aR) {
			var aQ = aR.GetProperty(G.get("SWE_PROP_NEW_PAGE_NAME"));
			var aP = SiebelAppFacade.ComponentMgr.FindComponent({
					id : aQ
				});
			if (aP) {
				aP.ExecuteMethod("ProcessProperties", aR);
				aP.ExecuteMethod("ExecuteUIUpdate")
			}
		}
		function ap() {
			var aP = SiebelApp.S_App.GetActivePageComp();
			if (aP) {
				if (aP.GetPM && aP.GetPM()) {
					aP.GetPM().EndLife()
				}
				SiebelAppFacade.ComponentMgr.DeleteComponent(aP, this);
				SiebelApp.S_App.SetActivePageComp(null)
			}
		}
		function e(a2, aZ) {
			var aW;
			var a1;
			var aQ = G.get("SWE_RPC_PROP_ERROR_CODE");
			var aV = G.get("SWE_RPC_PROP_ERROR_MSG");
			var aP = G.get("SWE_RPC_PROP_ERRORS");
			var aX = a2.GetChildCount();
			if (!(aZ && typeof(aZ.AddErrorMsgText) === "function")) {
				aZ = this
			}
			if (aX > 0 && (this.ErrorObject.GetIndex(aZ) > -1)) {
				for (var aY = 0; aY < aX; aY++) {
					var aS = a2.GetChild(aY);
					var aT = aS.GetType();
					if (aT == aP) {
						for (var aU = 0, a0 = aS.GetChildCount(); aU < a0; aU++) {
							var aR = aS.GetChild(aU);
							aW = aR.GetProperty(aQ);
							a1 = aR.GetProperty(aV);
							if (aW && a1 && SiebelApp.S_App.ErrorObject) {
								aZ.AddErrorMsgText(aW, a1, true)
							}
						}
						break
					}
				}
			}
		}
		aK.prototype.ProcessNewPopup = function (aP) {
			this.SetShowNewPage(true);
			this.GetPopupPM().SetProperty("CanProcessLayout", false);
			this.GetPopupPM().ExecuteMethod("ProcessNewPopup", aP);
			return "refreshpopup"
		};
		aK.prototype.ProcessResponse = function (aP, aQ) {
			if (arguments[2] && arguments[2].getResponseHeader("swerpc") != "true") {
				window.location.replace(SiebelApp.S_App.GetPageURL());
				return true
			}
			return this.GetFilesAndDelegateResponse(aP, aQ)
		};
		function F(aR) {
			var aU = aR.GetProperty(G.get("SWE_RPC_PROP_URL"));
			var aQ = "";
			var aP = "";
			var aT = false;
			var aS = aR.GetProperty(G.get("PROP_TARGET"));
			if (!ac.IsEmpty(aU) && !ac.IsEmpty(aS)) {
				aQ = aR.GetProperty(G.get("SWE_RPC_PROP_VIEW"));
				aP = aR.GetProperty(G.get("SWE_RPC_PROP_VIEW_ID"));
				if (SiebelApp.S_App.GetActiveView() && SiebelApp.S_App.GetActiveView().GetName() == aQ) {
					aT = true
				}
				if (aT) {
					SiebelApp.S_App.RefreshView(aQ, aP, aU, aS)
				} else {
					SiebelApp.S_App.GotoView(aQ, aP, aU, aS)
				}
			}
		}
		aK.prototype.SetURLToGo = function (aQ, aS, aR, aU, aP, aT) {
			if (aR || !q) {
				q = true;
				ae = aQ;
				P = aS;
				D = aU;
				aj = aP;
				w = aT
			}
		};
		function aI() {
			if (q) {
				q = false;
				if (D) {
					if (w) {
						this.RefreshView(D, aj, ae, P)
					} else {
						this.GotoView(D, aj, ae, P);
						if (SiebelApp.S_App.uiStatus.m_gbusy > 1) {
							SiebelApp.S_App.uiStatus.Free()
						}
					}
				} else {
					var aP = false;
					if (SiebelApp.S_App.IsRwd()) {
						aP = true
					}
					var aQ = this.GotoURL(ae, P, aP);
					if (aQ && typeof(aQ.done) === "function") {
						aQ.done(function () {
							this.uiStatus.Free()
						})
					}
				}
			}
		}
		aK.prototype.RefreshView = function (aR, aQ, aU, aT) {
			var aP = null;
			var aS = CCFMiscUtil_CreatePropSet();
			if (ac.IsEmpty(aQ)) {
				aP = ac.DecodeFromQueryString(aU);
				SiebelApp.S_App.CallServer(aP, aS, true);
				this.ProcessError()
			} else {
				SiebelApp.S_App.GotoURL(aU, aT)
			}
		};
		aK.prototype.GotoURL = function (aS, aR, aP) {
			var aQ = this.GetPageURL() + aS.split("start.swe")[1];
			if (aR === k) {
				window.location.replace(aQ)
			} else {
				return this.updateTargetViewContainer(aQ, false, aP)
			}
		};
		function av(aR, aQ, aP) {
			aR = aR.split(".");
			if (aR[aR.length - 1] === "_sweview") {
				aR = "_svf0";
				aQ.push({
					func : this.OnLoadViewContent,
					tgt : aR
				})
			} else {
				if (aR.length === 1 && SiebelApp.S_App.IsRwd()) {
					aR = SiebelApp.S_App.ViewTarget();
					aQ.push({
						func : this.OnLoadViewContent,
						tgt : aR
					})
				} else {
					if (aR[aR.length - 1] === "_sweclient") {
						aQ.push({
							func : this.OnLoadAppletContent,
							tgt : aR,
							applet : aP
						});
						var aS = $("[name=" + aR[aR.length - 1] + "]");
						aK.prototype.GetTargetViewContainer = function () {
							return aS
						};
						aK.prototype.SetNextTargetViewContainer = function (aT) {
							aS = $("[name=" + aT + "]")
						}
					} else {
						aR = aR[aR.length - 1];
						aQ.push({
							func : this.OnLoadExternalObject,
							tgt : aR
						})
					}
				}
			}
			this.SetNextTargetViewContainer(aR);
			return aR
		}
		aK.prototype.OnLoadAppletContent = function (aR, aQ) {
			SiebelAppFacade.ComponentMgr.FindComponent({
				id : aQ
			}).Show();
			var aP = j[aQ];
			aP.ShowOnly();
			aP.ShowSelection();
			this.ClearErrorMsg();
			if (aP.HasCustomShadow() && aP.shadow && typeof(aP.shadow.OnLoad) === "function") {
				aP.shadow.OnLoad()
			}
			this.uiStatus.Busy();
			this.uiStatus.Free()
		};
		aK.prototype.ProcessNewLayout = function (aS, aT) {
			if (this.GetPopupPM().Get("state") !== G.get("POPUP_STATE_UNLOADED")) {
				this.GetPopupPM().ExecuteMethod("ClearPopup")
			}
			var aU = aS.GetProperty(G.get("SWE_RPC_PROP_VIEW"));
			var aR = aS.GetProperty(G.get("SWE_RPC_PROP_APPLET")) || aS.GetProperty(G.get("SWE_APPLET_STR"));
			var aP = aS.GetProperty(G.get("SWE_RPC_PROP_VIEW_ID"));
			aU = aU.split(" ").join("%20").split("&").join("%26");
			var aQ = this.GetLayoutURL(G.get("SWE_RPC_PROP_NEW_LAYOUT"), aU, aP, aS, aR);
			if (SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer()) {
				SiebelApp.S_App.GetTimer().TimeGoToView(aU, "Call GetViewLayout")
			}
			return this.updateTargetViewContainer(aQ)
		};
		aK.prototype.ProcessNewAppletLayout = function (aR, aS) {
			SiebelApp.S_App.uiStatus.ShowOnLoadIndicator();
			var aQ = aR.GetProperty(G.get("SWE_RPC_PROP_APPLET")) || aR.GetProperty(G.get("SWE_APPLET_STR"));
			var aP = this.GetLayoutURL(G.get("SWE_RPC_PROP_NEW_LAYOUT"), "", "", aR, aQ);
			return r.call(this, aP)
		};
		function r(aQ) {
			var aP = new $.Deferred();
			SiebelApp.contentUpdater.AddCallBack(aQ, function () {
				aP.resolveWith(this, ["AppletLayoutDone"])
			}, this);
			this.GetTargetViewContainer().attr("src", aQ);
			SiebelApp.contentUpdater.loadContent();
			return aP.promise()
		}
		aK.prototype.ProcessRefreshLayout = function (aP, aR) {
			if (SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer()) {
				SiebelApp.S_App.GetTimer().TimeRefreshView("", "", "Start RefreshView")
			}
			var aS = aP.GetProperty(G.get("SWE_RPC_PROP_VIEW"));
			var aT = aP.GetProperty(G.get("SWE_VIEW_ID_STR")) || "";
			if (aS !== this.GetActiveView().GetName() || ac.IsEmpty(aS)) {
				return false
			}
			aS = aS.split(" ").join("%20").split("&").join("%26");
			var aQ = SiebelApp.S_App.GetLayoutURL(G.get("SWE_RPC_PROP_NEW_LAYOUT"), aS, aT, aP);
			if (SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer()) {
				SiebelApp.S_App.GetTimer().TimeGoToView("", "View Cache Ready")
			}
			return this.updateTargetViewContainer(aQ)
		};
		
//orig aD
		function aD(aV) {
			var aW;
			var a2;
			var aT;
			var aU;
			var aZ;
			var aY;
			var aP;
			var a0;
			var aX;
			var aR;
			var a1 = null;
			var aS = null;
			var aQ = false;
			aX = aV.GetProperty(G.get("SWE_RPC_PROP_STATUS"));
			if (aX === G.get("SWE_RPC_PROP_CONFIRM_DIALOG")) {
				aW = aV.GetProperty(G.get("SWE_CONFIRM_TEXT_STR"));
				aT = ac.Confirm(aW);
				if (aT) {
					a2 = aV.GetProperty(G.get("SWE_OK_METHOD_STR"))
				} else {
					a2 = aV.GetProperty(G.get("SWE_CANCEL_METHOD_STR"))
				}
				if (a2) {
					aZ = aV.GetProperty(G.get("SWE_VIEW_ID_STR"));
					aP = aV.GetProperty(G.get("SWE_APPLET_STR"));
					if (aT) {
						a0 = aV.GetChildByType(G.get("SWE_OK_METHOD_ARGS_STR"))
					} else {
						a0 = aV.GetChildByType(G.get("SWE_CANCEL_METHOD_ARGS_STR"))
					}
					a0 = a0 || CCFMiscUtil_CreatePropSet();
					if (ac.IsEmpty(aZ)) {
						a1 = this.GetMainView()
					}
					if (a1 && (aS = a1.GetApplet(aP))) {
						aQ = aS.InvokeMethod(a2, a0)
					} else {
						aU = aV.GetProperty(G.get("SWE_SERVICE"));
						if (aU) {
							a0.SetProperty(G.get("SWE_CMD_ARG"), G.get("SWE_CMD_INVOKE_METHOD_STR"));
							a0.SetProperty(G.get("SWE_SERVICE"), aU);
							a0.SetProperty(G.get("SWE_METHOD_STR"), a2)
						} else {
							aY = aV.GetProperty(G.get("SWE_VIEW_ARG"));
							a0.SetProperty(G.get("SWE_CMD_ARG"), G.get("SWE_CMD_INVOKE_METHOD_STR"));
							a0.SetProperty(G.get("SWE_VIEW_ID_STR"), aZ);
							a0.SetProperty(G.get("SWE_VIEW_ARG"), aY);
							a0.SetProperty(G.get("SWE_APPLET_STR"), aP);
							a0.SetProperty(G.get("SWE_METHOD_STR"), a2)
						}
						aR = CCFMiscUtil_CreatePropSet();
						SiebelApp.S_App.CallServer(a0, aR, true)
					}
				}
				aQ = true
			}
			return aQ
		}
		//custom aD Сделана для отображение confirm формы в виде всплывающего окна
			/*function aD(aV) {
			var aW;
			var a2;
			var aT;
			var aU;
			var aZ;
			var aY;
			var aP;
			var a0;
			var aX;
			var aR;
			var a1 = null;
			var aS = null;
			var aQ = false;
			aX = aV.GetProperty(G.get("SWE_RPC_PROP_STATUS"));
			if (aX === G.get("SWE_RPC_PROP_CONFIRM_DIALOG")) {
				aW = aV.GetProperty(G.get("SWE_CONFIRM_TEXT_STR"));
				//aT = ac.Confirm(aW);
				
	
                $("<div class='alert-wrap'></div>").html(aW).dialog({
                    //title: title,
                    resizable: true,
                    modal: true,
					closeOnEscape: false,
                    buttons: {
                        "Ok": {
                            click: function () {
                                $(this).dialog("close");
								aQ = ATCCustomConfirm(true, aV);
								aT = true;
                            },
								text: "Ок",
								class: 'appletButton'
						},
							
							"Cancel": {
                            click: function () {
                                $(this).dialog("close");
								aQ = ATCCustomConfirm(false, aV);
								aT = false;
                            },                           
							text: "Отмена",
							class: 'appletButton'
                        }						
					},
                   create:function () {
                        $(this).parent().addClass("alert-div");
						$(".ui-dialog-titlebar-close").css("display", "none");
                        var t = SiebelApp.S_App.GetActiveView();
                        if (t) {
                            var z = t.GetActiveApplet();
                            if (z) {
                                t.SetActiveAppletBeforePopup(z);
                                document.activeElement.blur();
                            }
                        }
                    },
                   // beforeClose: restoreFocus 
			});	
		}
		return aQ
		}
		function ATCCustomConfirm(aT, aV) {
			var aW;
			var a2;
			var aU;
			var aZ;
			var aY;
			var aP;
			var a0;
			var aX;
			var aR;
			var a1 = null;
			var aS = null;
			var aQ = false;

			if (aT) {
				a2 = aV.GetProperty(G.get("SWE_OK_METHOD_STR"))
			} else {
				a2 = aV.GetProperty(G.get("SWE_CANCEL_METHOD_STR"))
			}
			if (a2) {
				aZ = aV.GetProperty(G.get("SWE_VIEW_ID_STR"));
				aP = aV.GetProperty(G.get("SWE_APPLET_STR"));
				if (aT) {
					a0 = aV.GetChildByType(G.get("SWE_OK_METHOD_ARGS_STR"))
				} else {
					a0 = aV.GetChildByType(G.get("SWE_CANCEL_METHOD_ARGS_STR"))
				}
				a0 = a0 || CCFMiscUtil_CreatePropSet();
				if (ac.IsEmpty(aZ)) {
					//a1 = this.GetMainView()
				}
				if (a1 && (aS = a1.GetApplet(aP))) {
					aQ = aS.InvokeMethod(a2, a0)
				} else {
					aU = aV.GetProperty(G.get("SWE_SERVICE"));
					if (aU) {
						a0.SetProperty(G.get("SWE_CMD_ARG"), G.get("SWE_CMD_INVOKE_METHOD_STR"));
						a0.SetProperty(G.get("SWE_SERVICE"), aU);
						a0.SetProperty(G.get("SWE_METHOD_STR"), a2)
					} else {
						aY = aV.GetProperty(G.get("SWE_VIEW_ARG"));
						a0.SetProperty(G.get("SWE_CMD_ARG"), G.get("SWE_CMD_INVOKE_METHOD_STR"));
						a0.SetProperty(G.get("SWE_VIEW_ID_STR"), aZ);
						a0.SetProperty(G.get("SWE_VIEW_ARG"), aY);
						a0.SetProperty(G.get("SWE_APPLET_STR"), aP);
						a0.SetProperty(G.get("SWE_METHOD_STR"), a2)
					}
					aR = CCFMiscUtil_CreatePropSet();
					SiebelApp.S_App.CallServer(a0, aR, true)
				}
			}
			return aQ
		}*/
		aK.prototype.ProcessNewPage = function (aW, aU) {
			var aT = false;
			var aP = aW.GetProperty(G.get("SWE_RPC_PROP_URL"));
			var aR = aW.GetProperty(G.get("SWE_RPC_PROP_VIEW"));
			var aQ = aW.GetProperty(G.get("SWE_RPC_PROP_VIEW_ID"));
			var aS = aW.GetProperty(G.get("SWE_RPC_PROP_TARGET"));
			var aV = aW.GetProperty(G.get("SWE_RPC_PROP_TIMEOUT"));
			if (aS.length == 1 && SiebelApp.S_App.IsRwd()) {
				aS = SiebelApp.S_App.ViewTarget()
			}
			aS ? ((aS.indexOf("_sweview") > -1) ? this.ClearExistingViewAndBO() : false) : false;
			if (!ac.IsEmpty(aR) && ac.IsEmpty(aQ)) {
				var aX = this.GetActiveView();
				if (!ac.IsEmpty(aX) && (aX.GetName() !== aR) && (aP.match("SWECmd=GotoPostedAction"))) {
					this.GotoView(aR, "", aP, aS);
					SiebelApp.S_App.uiStatus.Free();
					return false
				}
			} else {
				if (aV && SiebelApp.S_App.PortletSessionMgr && aP.indexOf("SWECmd=Login") != -1) {
					window.location.replace(this.GetPageURL() + "?" + SiebelApp.S_App.PortletSessionMgr.GetInstance().GetAction());
					return false
				} else {
					if (aV && aS.indexOf("top") != -1 & aP.indexOf("SWECmd=Login") != -1) {
						window.location.replace(aP);
						return false
					}
				}
			}
			this.uiStatus.Busy({
				target : this.GetTargetViewContainer(),
				mask : true
			});
			this.SetURLToGo(aP, aS, false, aR, aQ, aT);
			return false
		};
		aK.prototype.InvokeCallBack = function () {
			while (N.length > 0) {
				var aP = {};
				aP = N.pop();
				aP.callBack.call(aP.object)
			}
		};
		function y() {
			var aR = this.GetCmdMgr();
			if (aR.GetRefreshTB()) {
				aR.UpdateUIControls();
				aR.SetRefreshTB(false)
			}
			var aQ = this.GetActiveView();
			if (!ac.IsEmpty(aQ)) {
				aQ.ExecuteUIUpdate()
			}
			for (var aS in j) {
				var aP = j[aS];
				aP.ExecuteUIUpdate()
			}
		}
		function E(aV) {
			var aQ = this.GetActiveView();
			var aY = !ac.IsEmpty(aQ) ? aQ.GetAppletMap() : {};
			var aT = aV.GetChildCount();
			for (var aS = 0; aS < aT; aS++) {
				var aX = aV.GetChild(aS);
				var aP = aX.GetProperty(G.get("SWE_PROP_VAR_NAME"));
				var aW = aX.GetType();
				if (aW === G.get("SWE_APPLET_PM_PS")) {
					for (var aR in aY) {
						if (aY[aR].GetVarName() === aP) {
							aY[aR].GetPModel().HandleResponsePS(aX)
						}
					}
					for (var aU in j) {
						if (j[aU].GetVarName() === aP) {
							j[aU].GetPModel().HandleResponsePS(aX)
						}
					}
				}
			}
		}
		function aJ(aY) {
			if (aY.GetType() !== G.get("SWE_RPC_PROP_NOTIFICATION")) {
				return false
			}
			var aQ = this.GetActiveView();
			var aV = this.GetActiveBusObj();
			var a1 = !ac.IsEmpty(aQ) ? aQ.GetAppletMap() : {};
			var aU = aY.GetChildCount();
			for (var aT = 0; aT < aU; aT++) {
				var aZ = aY.GetChild(aT);
				var a0 = aZ.GetProperty(G.get("SWE_PROP_BC"));
				var aX = aZ.GetProperty(G.get("SWE_PROP_BC_NOTI_ZONE"));
				var aP = !ac.IsEmpty(aV) ? aV.GetBusComp(a0) : null;
				if (aP && (!aX || aX == aV.GetZone())) {
					aP.HandleServerNotifications(aZ);
					for (var aR in a1) {
						if (!ac.IsEmpty(a1[aR].GetBusComp()) && a1[aR].GetBusComp().GetVarName() === a0 && !(a1[aR].GetPModel()instanceof JSSPropertySet)) {
							if (a1[aR].GetPModel()) {
								a1[aR].GetPModel().HandleNotify(aZ)
							}
						}
					}
					m.HandleNotify(aZ)
				} else {
					for (var aW in j) {
						if (j.hasOwnProperty(aW)) {
							var aS = j[aW];
							if (!ac.IsEmpty(aS.GetBusComp()) && aS.GetBusComp().GetVarName() === a0) {
								aP = aS.GetBusComp();
								aP.HandleServerNotifications(aZ);
								aS.GetPModel().HandleNotify(aZ)
							}
						}
					}
				}
			}
		}
		aK.prototype.GetFilesAndDelegateResponse = function (aR, aQ) {
			var aX = new $.Deferred();
			var aU = null;
			var aV = G.get("SWE_PST_CLIENT_DESCRIPTOR_INFO");
			var aW = CCFMiscUtil_CreatePropSet();
			aW.DecodeFromString(aR);
			var aT = aW.GetChildByType(aV);
			if (aT !== null) {
				var aP = ac.PrepareModuleInfo(aW);
				if (aP.length > 0) {
					var aS = this;
					require(aP, function () {
						try {
							aU = aS.DelegateResponse(aW, aQ)
						} catch (aY) {
							SiebelJS.Log(aY)
						}
						aT = null;
						aU.done(function () {
							aX.resolve()
						})
					})
				} else {
					aU = this.DelegateResponse(aW, aQ);
					aT = null;
					aU.done(function () {
						aX.resolve()
					})
				}
			} else {
				aU = this.DelegateResponse(aW, aQ);
				aT = null;
				aU.done(function () {
					aX.resolve()
				})
			}
			return aX.promise()
		};
		aK.prototype.GetFilesAndProcessObjectInfo = function (aR) {
			var aQ = new $.Deferred();
			var aT = null;
			var aP = aR.GetChildByType("api");
			if (aP !== null) {
				var aS = ac.GetFileInfoFromPropSet(aR);
				if (aS.length > 0) {
					var aU = this;
					require(aS, function () {
						try {
							aT = M.call(aU, aR)
						} catch (aV) {
							SiebelJS.Log(aV)
						}
						aP = null;
						aT.done(function () {
							aQ.resolveWith(this, ["Process Object"])
						})
					})
				} else {
					aT = M.call(this, aR);
					aP = null;
					aT.done(function () {
						aQ.resolveWith(this, ["Process Object"])
					})
				}
				aS = null
			} else {
				aP = null;
				aQ.resolveWith(this, ["Process Object"])
			}
			return aQ.promise()
		};
		aK.prototype.InitializeBO = function (aP) {
			this.ClearExistingViewAndBO();
			ay = new SiebelApp.S_App.BusObj();
			ay.ProcessObjectInfo(aP.GetChild(0))
		};
		aK.prototype.ClearExistingViewAndBO = function () {
			if (!ac.IsEmpty(ay) && !ac.IsEmpty(aF) && aF.GetBusObj() === ay) {
				this.ClearMainView();
				this.ClearBusObj()
			}
		};
		function M(bn) {
			var bm = new $.Deferred();
			var a7 = [];
			this.SetSelfProps(bn);
			if (SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer()) {
				SiebelApp.S_App.GetTimer().TimePopupApplet("", "Process Object Info Start")
			}
			var a5 = SiebelApp.Environment;
			if (a5) {
				n.call(this, bn)
			}
			var aR = bn.GetChildByType("api");
			var bc = bn.GetProperty(G.get("SWE_RPC_PROP_STATUS"));
			var ba = G.get("SWE_RPC_PROP_NEW_APPLET_LAYOUT");
			if (aR !== null) {
				var a4 = aR.EnumChildren(true);
				if (a4 !== null) {
					var bj = G.get("SWE_PST_NEW_VIEW");
					var bh = G.get("SWE_PST_NEW_BUSOBJ");
					var aQ = G.get("SWE_PST_STR_CACHE");
					var a8 = G.get("SWE_PST_NEW_NAV_CTRL_MGR");
					var aV = G.get("SWE_PST_NAV_CTRL_INFO");
					var aW = G.get("SWE_PROP_VALUE");
					var bg = G.get("SWE_PST_BUSOBJ_INFO");
					var bk = G.get("SWE_PST_VIEW_INFO");
					var aZ = G.get("SWE_PST_CLEAR_MV");
					var a2 = G.get("SWE_PST_EXT_OBJ_INFO");
					var a3 = G.get("SWE_PST_ICON_LIST");
					var aS = G.get("SWE_PST_NEW_BUSCOMP");
					var bd = SiebelApp.S_App.BusComp;
					var bf = SiebelApp.S_App.Applet;
					var aU = SiebelApp.S_App.ListApplet;
					var aP = SiebelApp.S_App.Playbarapplet;
					var aY;
					var a0 = G.get("SWE_PST_NEW_APPLET");
					var a6 = G.get("SWE_PST_NEW_LIST_APPLET");
					var aT = G.get("SWE_PST_NEW_TREEAPPLET");
					var bl = null;
					do {
						var a9 = a4.GetType();
						switch (a9) {
						case aS:
							aY = new bd();
							aY.ProcessObjectInfo(a4.GetChild(0));
							break;
						case a0:
						case a6:
						case aT:
							var bi = ac.PrepareModuleInfo(a4);
							(function () {
								var br = a4;
								var bq = aY;
								var bo = new $.Deferred();
								a7.push(bo.promise());
								var bp = function () {
									try {
										if (bc !== ba) {
											am.call(SiebelApp.S_App, br, bq);
											bo.resolveWith(SiebelApp.S_App, [""])
										} else {
											aL.call(SiebelApp.S_App, br, bq);
											bo.resolveWith(SiebelApp.S_App, ["SA Applet Object Info"])
										}
									} catch (bs) {
										SiebelJS.Log(bs)
									}
									br = a4 = null
								};
								bi.length ? require(bi, bp) : bp()
							})();
							break;
						case bh:
							this.InitializeBO(a4);
							break;
						case aZ:
							this.ClearMainView();
							this.ClearBusObj();
							break;
						case bg:
							ay.ProcessObjectInfo(a4);
							break;
						case bj:
							if (SiebelApp.S_App.IsRwd()) {
								ap.call()
							}
							aF = SiebelAppFacade.ProxyFactory.MakeObject(a9);
							SiebelAppFacade.ComponentMgr.RegisterLevel(aF, this);
							a7.push(aF.GetFilesAndProcessObjectInfo(a4.GetChild(0)));
							break;
						case bk:
							if (!ac.IsEmpty(aF)) {
								a7.push(aF.GetFilesAndProcessObjectInfo(a4))
							}
							break;
						case a8:
							var be = a4.GetChildCount();
							if (be > 0) {
								m.ProcessObjectInfo(a4.GetChild(0))
							}
							break;
						case aV:
							m.HandleResponsePS(a4.Clone());
							m.ProcessObjectInfo(a4);
							break;
						case a2:
							var bb = a4.GetProperty(G.get("SWE_PST_EXT_OBJ_INFO"));
							var a1 = SiebelApp.S_App.getExtObject(bb);
							if (a1) {
								a1.HandleNotify(a4.GetChild(0))
							} else {
								a1 = SiebelApp.S_App.RegisterExtObject(a4);
								if (a1) {
									a1.Setup(a4.GetChild(0));
									if (bb === "Dashboard") {
										aq.call(this)
									} else {
										if (bb === "ChatPane") {
											aw.call(this)
										} else {
											J.call(this)
										}
									}
									if (bb !== "Dashboard" || bn.GetProperty(G.get("SWE_RPC_PROP_VIEW_ID")) !== "Dashboard") {
										a1.Show()
									}
								}
							}
							break;
						case a3:
							u.call(this, a4);
							break;
						default:
							break
						}
					} while ((a4 = aR.EnumChildren(false)))
				}
			}
			if (SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer()) {
				SiebelApp.S_App.GetTimer().TimeGoToView("", "Processed Object Info");
				SiebelApp.S_App.GetTimer().TimePopupApplet("", "Processed Object Info")
			}
			var aX = this;
			if (a7.length > 0) {
				$.when.apply($, a7).done(function () {
					bm.resolveWith(aX, ["API "])
				})
			} else {
				bm.resolveWith(aX, ["API "])
			}
			return bm.promise()
		}
		function aH(aP, aQ) {
			if (SiebelApp.S_App.LocaleObject) {
				SiebelApp.S_App.LocaleObject.AddLocalString(aP, aQ)
			}
		}
		function aL(aS, aT) {
			var aR;
			var aP = aS.GetChild(0).Clone();
			aR = SiebelAppFacade.ProxyFactory.MakeObject(aS.GetType());
			if (aR) {
				if (aT) {
					aR.SetBusComp(aT)
				}
				var aQ = {
					callback : aR.ProcessObjectInfo,
					scope : aR,
					input : {
						ps : aP
					}
				};
				SiebelAppFacade.ComponentMgr.MakeComponent(this, aP, aR, aQ);
				SiebelAppFacade.ComponentMgr.CompleteComponent(this, aP, aR);
				if (ac.IsTrue(aS.GetProperty(G.get("SWE_PST_STANDALONE_APPLET")))) {
					j[aR.GetName()] = aR;
					aR.SetIsStandAlone(true);
					aR.SetAppletActive(true, aR)
				}
				aR.Initialize()
			}
		}
		function am(aS, aT) {
			var aR;
			var aP = aS.GetChild(0).Clone();
			aR = SiebelAppFacade.ProxyFactory.MakeObject(aS.GetType());
			if (aR) {
				if (aT) {
					aR.SetBusComp(aT)
				}
				if (aS.GetType() === G.get("SWE_PST_NEW_LIST_APPLET")) {
					var aQ = {
						callback : aR.ProcessObjectInfo,
						scope : aR,
						input : {
							ps : aP
						}
					};
					SiebelAppFacade.ComponentMgr.MakeComponent(this, aP, aR, aQ);
					SiebelAppFacade.ComponentMgr.CompleteComponent(this, aP, aR)
				} else {
					aR.ProcessObjectInfo(aP);
					SiebelAppFacade.ComponentMgr.MakeComponent(this, aP, aR)
				}
				if (ac.IsTrue(aS.GetProperty(G.get("SWE_PST_STANDALONE_APPLET")))) {
					j[aR.GetName()] = aR;
					aR.SetIsStandAlone(true);
					if (SiebelApp.S_App.PortletSessionMgr) {
						aR.SetAppletActive(true, aR)
					}
				}
				if (SiebelApp.S_App.GetPopupPM().Get("state") !== G.get("POPUP_STATE_VISIBLE")) {
					aR.Initialize();
					SiebelAppFacade.ComponentMgr.FindComponent({
						id : aR.GetName()
					}).Show();
					aR.ShowOnly();
					aR.ShowSelection();
					this.ClearErrorMsg();
					if (aR.HasCustomShadow() && aR.shadow && typeof(aR.shadow.OnLoad) === "function") {
						aR.shadow.OnLoad()
					}
				}
			}
		}
		function u(aV) {
			var aR;
			var aP = [];
			var aW = aV.GetType();
			if (aW != G.get("SWE_PST_ICON_LIST")) {
				return
			}
			aR = aV.GetProperty(G.get("SWE_PROP_NAME"));
			if (aR) {
				var aU = aV.GetChildCount();
				for (var aT = 0; aT < aU; aT++) {
					var aQ = aV.GetChild(aT);
					var aS = aQ.GetType();
					if (aS == G.get("SWE_PST_ICON")) {
						var aX = p.call(this, aQ);
						aP.push(aX)
					}
				}
				an[aR] = aP
			}
		}
		function p(aQ) {
			if (ac.IsEmpty(aQ)) {
				return
			}
			var aP = {};
			aP.iconName = aQ.GetProperty(G.get("SWE_PROP_NAME"));
			aP.iconImage = aQ.GetProperty(G.get("SWE_PROP_ICON_IMG"));
			return aP
		}
		function n(aP) {
			SiebelApp.Environment.SetProtoAPIs(aP)
		}
		aK.prototype.GetFilesAndInitExecContext = function (aS, aU) {
			var aV = CCFMiscUtil_CreatePropSet();
			aV.DecodeFromString(aS);
			var aQ = ac.GetFileInfoFromPropSet(aV);
			var aP = aV.GetChildByType(ak);
			if (SiebelApp.S_App.IsRwd && SiebelApp.S_App.IsRwd()) {
				ac.PrepareModuleInfo(aP)
			}
			if (aQ.length > 0) {
				var aR = aP.GetProperty(G.get("SWE_PROP_PAGEURL")).split("start.swe")[0] + SIEBEL_BUILD;
				require.config({
					baseUrl : aR,
					waitSeconds : 30,
					paths : {
						"jquery.ui.widget" : "../scripts/3rdParty/jquery-ui/current/ui/jquery.ui.widget"
					}
				});
				var aT = this;
				require.exec("for(var reg in contexts['_'].registry){if(contexts['_'].registry.hasOwnProperty(reg)){contexts['_'].registry[reg].enable();} useInteractive = true;}");
				SiebelRequire(aQ, null, null, function () {
					try {
						require.exec("for(var reg in contexts['_'].registry){if(contexts['_'].registry.hasOwnProperty(reg)){contexts['_'].registry[reg].enable();} useInteractive = true;}");
						aT.InitExecContext(aV, aU)
					} catch (aW) {
						SiebelJS.Log(aW)
					}
					aV = null
				})
			} else {
				this.InitExecContext(aV, aU);
				aV = null
			}
			aP = aQ = null
		};
		aK.prototype.InitExecContext = function (aU, aT) {
			SiebelApp.EventManager.addListner("AppInit", ar, this);
			SiebelApp.S_App.ErrorObject.DecorateErrorCapability(this);
			d();
			f = new SiebelApp.S_App.HistoryMgr();
			m = SiebelApp.S_App.NavCtrlMgr;
			var aP = aU.GetChildByType(ak);
			aK.prototype.IsRwd = function () {
				return ac.IsTrue(aP.GetProperty(G.get("SWE_IS_RWD")))
			};
			aK.prototype.IsMsgBarEnabled = function () {
				return ac.IsTrue(aP.GetProperty(G.get("SWE_IS_MSGBAR_ENABLED")))
			};
			aB.call(this, aU);
			if (SiebelApp.S_App.IsRwd()) {
				ar.call(this);
				var aS = SiebelApp.S_App.WPName();
				if (aS != null) {
					var aQ = function () {};
					var aR = new aQ();
					aR.GetName = function () {
						return aS
					};
					X = SiebelAppFacade.ComponentMgr.FindComponent({
							id : aR.GetName()
						});
					if (!X) {
						if (!aP.GetProperty(G.get("SWE_UIDEF_PM_CTR"))) {
							aP.SetPropertyStr(G.get("SWE_UIDEF_PM_CTR"), "siebel/webpgpm")
						}
						if (!aP.GetProperty(G.get("SWE_UIDEF_PR_CTR"))) {
							aP.SetPropertyStr(G.get("SWE_UIDEF_PR_CTR"), "siebel/webpgpr")
						}
						SiebelAppFacade.ComponentMgr.MakeComponent(SiebelApp.S_App, aP, aR);
						X = SiebelAppFacade.ComponentMgr.FindComponent({
								id : aR.GetName()
							})
					}
					X.Show()
				}
			}
			if (aT) {
				this.ProcessResponse(aT)
			} else {
				if (SiebelApp.S_App.IsRwd()) {
					W.call(this)
				} else {
					this.LoadClientContainer()
				}
			}
		};
		aK.prototype.LoadClientContainer = function () {
			SiebelApp.contentUpdater.updateSrc(this.GetClientFrame(), this.GetPageURL() + this.GetClientURL().split("start.swe")[1])
		};
		function ar() {
			var aQ = this.GetService(G.get("SWE_OUI_CLIENT_PREF_SERVICE"));
			if (!ac.IsEmpty(aQ)) {
				var aR = SiebelApp.S_App.NewPropertySet(),
				aP = "Mobile=" + SiebelAppFacade.DecisionManager.IsTouch();
				if (SiebelApp.S_App.IsRwd()) {
					aP = aP + ",Viewport:width=" + $(window).width()
				}
				aR.SetProperty(G.get("SWE_OUI_CLIENT_PREF"), aP);
				aQ.InvokeMethod("SetClientCapability", aR, {
					npr : false,
					async : true,
					cb : function () {}

				})
			}
		}
		function Y() {
			if (!t) {
				t = new SiebelApp.S_App.Menu(this);
				t.CreatePM("AppMenuPR", SiebelAppFacade.AppMenuPM);
				t.ShowMenuControl()
			}
		}
		function W() {
			var aP = SiebelApp.S_App.ViewTarget();
			SiebelApp.S_App.OnLoadViewContainer(aP);
			if (this.GetAckView()) {
				SiebelApp.S_App.GotoView(this.GetAckView(), "", "", null)
			}
			this.InitializeGlobalMenu();
			this.GetCmdMgr().Show()
		}
		aK.prototype.InitializeGlobalMenu = function () {
			if (!this.GetTargetViewContainer) {
				SiebelApp.EventManager.addListner("AppInit", Y, this)
			} else {
				Y.call(this)
			}
		};
		aK.prototype.GetLabel = function () {
			return ""
		};
		aK.prototype.RegisterControl = function (aP, aQ) {
			if (H) {
				H[aP] = aQ
			}
		};
		aK.prototype.GetControlClassInstance = function (aP) {
			if (H) {
				return H[aP]
			}
		};
		aK.prototype.RegisterConstructorAgainstKey = function (aP, aQ) {
			if (aa) {
				aa[aP] = aQ
			}
		};
		aK.prototype.GetConstructorFromKey = function (aP) {
			if (aa) {
				return aa[aP]
			}
		};
		aK.prototype.CallServer = function (aT, aY, aQ, aV) {
			aV = $.extend({
					selfbusy : false,
					mask : true,
					async : false,
					opdecode : true
				}, aV);
			if (!aV.selfbusy) {
				var aR = {};
				if (aV.target) {
					aR.target = aV.target
				}
				if (aV.mask) {
					aR.mask = aV.mask
				}
				this.uiStatus.Busy(aR)
			}
			aY = aY || CCFMiscUtil_CreatePropSet();
			if (ac.IsTrue(aT.GetProperty(G.get("SWE_PROP_CANCELABLE_RPC")))) {
				var aW = Math.floor(((new Date()).getTime() / 1000)),
				aX = parseInt(K);
				while (aW <= aX) {
					aW++
				}
				K = "" + aW;
				aT.SetProperty(G.get("SWSE_CANCEL_ID"), K)
			}
			if (String(aT.GetProperty(G.get("SWSE_CMD_STR"))) !== G.get("SWSE_CANCEL_QUERY")) {
				this.SetDefaultArgs(aT)
			}
			var aS = ac.EncodeToQueryString(aT),
			aU = new Date(),
			aP = null;
			aS = aS + "&" + G.get("SWE_TIME_STAMP") + "=" + aU.getTime();
			this.SetInputPS(aT);
			aP = {
				url : this.GetPageURL(),
				data : aS.split(" ").join("%20"),
				type : "POST",
				async : aV.async,
				contentType : "application/x-www-form-urlencoded",
				successfncallback : this.OnSuccessCallServer,
				errfncb : af,
				context : {
					scope : this,
					lp : aV,
					outputPS : aY,
					nPR : aQ
				}
			};
			SiebelApp.AjaxRequestMgr.Ajax(aP);
			aP = null
		};
		aK.prototype.OnSuccessCallServer = function (aS, aR, aW) {
			var aU = this.lp,
			aV = this.outputPS,
			aY = this.scope,
			aT = this.nPR,
			aP = new $.Deferred();
			if (aT === true && aW && typeof(aW.getResponseHeader) === "function" && aW.getResponseHeader("swerpc") != "true") {
				window.location.replace(SiebelApp.S_App.GetPageURL());
				return true
			}
			if (!ac.IsEmpty(aS)) {
				if (aT === true) {
					var aX = (aU && aU.scope) || this;
					var aQ = aY.ProcessResponse(aS, aX);
					aQ.done(function () {
						SiebelApp.S_App.ProcessError();
						aP.resolve()
					})
				} else {
					aP.resolve()
				}
				if (aU.opdecode === true) {
					aV.DecodeFromString(aS);
					if (SiebelApp.S_App.OUIPerfReporter) {
						SiebelApp.S_App.OUIPerfReporter.RefreshData(aV)
					}
				}
				if (typeof(aU.cb) === "function") {
					aU.args = aU.args || [];
					if (aU.opdecode === true) {
						aU.args.push(aV)
					} else {
						aU.args.push(aS)
					}
					aU.cb.apply(aU.scope || null, aU.args)
				} else {
					if (typeof(aU.scope) !== "undefined" && typeof(aU.scope.PostExecute) === "function") {
						aU.args = aU.args || [];
						aU.args.push(aV);
						aU.scope.PostExecute.apply(aU.scope || null, aU.args)
					}
				}
			} else {
				aP.resolve()
			}
			aP.done(function () {
				if ((aU && !aU.selfbusy) || !aU) {
					aY.uiStatus.Free()
				}
			});
			return aP.promise()
		};
		function af(aS, aU, aR) {
			var aQ = this.lp,
			aT = this.outputPS,
			aP = this.scope;
			if (typeof(aQ.errcb) === "function") {
				aQ.args = aQ.args || [];
				aQ.errcb.apply(aQ.scope || null, aQ.args)
			} else {
				if (aQ.scope !== "undefined" && typeof(aQ.scope.PostExecute) === "function") {
					aQ.args = aQ.args || [];
					aT.SetProperty(G.get("AJAX_FAIL_ERR"), aU);
					aQ.args.push(aT);
					aQ.scope.PostExecute.apply(aQ.scope || null, aQ.args)
				}
			}
			if ((aQ && !aQ.selfbusy) || !aQ) {
				aP.uiStatus.Free()
			}
		}
		aK.prototype.GetSessionCookie = function () {
			if (document.cookie) {
				return document.cookie
			}
		};
		aK.prototype.SetStaticPickValues = function (aQ, aP) {
			v[aQ] = aP
		};
		aK.prototype.GetStaticPickValues = function (aP) {
			return v[aP]
		};
		aK.prototype.SetActiveView = function (aP) {
			aF = aP
		};
		aK.prototype.SetActiveBO = function (aP) {
			ay = aP
		};
		aK.prototype.ClearMainView = function () {
			if (aF && typeof(aF.EndLife) === "function") {
				var aP = SiebelAppFacade.ComponentMgr.FindComponent({
						id : aF.GetName()
					});
				aF.EndLife();
				if (aP) {
					if (aP.GetPM && aP.GetPM()) {
						aP.GetPM().EndLife()
					}
					SiebelAppFacade.ComponentMgr.DeleteComponent(aP, this)
				}
			}
			this.GetPopupPM().ExecuteMethod("ProcessClearPopup");
			SiebelApp.S_App.ClearErrorMsg();
			aF = null
		};
		aK.prototype.ClearBusObj = function () {
			if (ay && typeof(ay.EndLife) === "function") {
				ay.EndLife()
			}
			ay = null
		};
		aK.prototype.SeblTrace = function (aP, aQ) {};
		aK.prototype.GetBusObj = function (aP) {
			var aQ = this.GetActiveView();
			if (!aP) {
				if (aQ) {
					return aQ.GetBusObj()
				}
			}
			if (aQ && aQ.GetBusObj().GetName() === aP) {
				return aQ.GetBusObj()
			}
			return null
		};
		aK.prototype.GetProfileAttr = function (aQ) {
			var aP;
			var aR;
			if (!aQ) {
				this.SetErrorMsg("AppErrInvalidAttrName");
				return null
			}
			aP = CCFMiscUtil_CreatePropSet();
			aP.SetType("GetProfileAttr");
			aP.SetProperty("attrName", aQ);
			aR = this.CallServerApp("GetProfileAttr", aP);
			if (aR === null) {
				return null
			} else {
				if (this.HasErrorMsg()) {
					this.ProcessError();
					return false
				}
			}
			return aR
		};
		aK.prototype.SetProfileAttr = function (aQ, aR) {
			if (!aQ) {
				this.SetErrorMsg("AppErrInvalidAttrName");
				return false
			}
			aR = aR || "";
			var aP = CCFMiscUtil_CreatePropSet();
			aP.SetType("SetProfileAttr");
			aP.SetProperty("attrName", aQ);
			aP.SetProperty("value", aR);
			aR = this.CallServerApp("SetProfileAttr", aP);
			if (aR === null) {
				return null
			} else {
				if (this.HasErrorMsg()) {
					this.ProcessError();
					return false
				}
			}
			return true
		};
		aK.prototype.GetMainView = function () {
			return this.GetActiveView()
		};
		aK.prototype.CallServerApp = function (aV, aU, aR) {
			var aT;
			var aQ = CCFMiscUtil_CreatePropSet();
			var aP;
			var aS;
			aS = aU.EncodeAsString();
			aT = CCFMiscUtil_CreatePropSet();
			aT.SetProperty("SWECmd", "InvokeMethod");
			aT.SetProperty("SWEMethod", aV);
			aT.SetProperty("SWEIPS", aS);
			SiebelApp.S_App.CallServer(aT, aQ, true);
			aP = aQ.GetProperty("Result");
			return aP
		};
		aK.prototype.NewPropertySet = function () {
			return (CCFMiscUtil_CreatePropSet())
		};
		var T = {};
		aK.prototype.RemoveService = function (aP) {
			if (T[aP.GetName()]) {
				delete T[aP.GetName()]
			}
		};
		aK.prototype.GetService = function (aQ) {
			if (ac.IsEmpty(aQ)) {
				return false
			}
			var aP = T[aQ];
			if (!ac.IsEmpty(aP)) {
				aP.AddRef();
				return aP
			} else {
				aP = new SiebelApp.Service();
				aP.SetName(aQ);
				T[aP.GetName()] = aP
			}
			if (U[aQ]) {
				if (typeof(window[U[aQ]]) === "function") {
					new window[U[aQ]](aP)
				}
			}
			return aP
		};
		aK.prototype.ShowModalDialog = function (aP, aQ, aR) {
			return window.showModalDialog(aP, aQ, aR)
		};
		function x(aR, aQ) {
			var aP;
			if (this.shadow && typeof(this.shadow.OnPreInvokeMethod) === "function") {
				aP = this.shadow.OnPreInvokeMethod(aR, aQ);
				if (aP === "CancelOperation") {
					return false
				}
				return true
			}
			return true
		}
		function aM(aQ, aP) {
			if (this.shadow && typeof(this.shadow.OnInvokeMethod) === "function") {
				this.shadow.OnInvokeMethod(aQ, aP)
			}
		}
		aK.prototype.CreateJSShadow = function (aR, aU) {
			if (!aU) {
				return false
			}
			var aT = [];
			CCFMiscUtil_StringToArray(aU, aT);
			if (aT.length < 2) {
				return false
			}
			$.ajaxSetup({
				async : false
			});
			var aS = function (aV, aW) {};
			var aP = aT.length;
			for (var aQ = 1; aQ < aP; aQ++) {
				$.getScript(aT[aQ], aS)
			}
			$.ajaxSetup({
				async : true
			});
			if (typeof(window[aT[0]]) === "function") {
				new window[aT[0]](aR);
				return true
			}
			return false
		};
		var S = false;
		var I = {};
		(function (aP) {
			I.encode = function (aU) {
				if (!aU) {
					return ""
				}
				var aS = new Uint8Array(aU),
				aT,
				aQ = aS.length,
				aR = "";
				for (aT = 0; aT < aQ; aT += 3) {
					aR += aP[aS[aT] >> 2];
					aR += aP[((aS[aT] & 3) << 4) | (aS[aT + 1] >> 4)];
					aR += aP[((aS[aT + 1] & 15) << 2) | (aS[aT + 2] >> 6)];
					aR += aP[aS[aT + 2] & 63]
				}
				if ((aQ % 3) === 2) {
					aR = aR.substring(0, aR.length - 1) + "="
				} else {
					if (aQ % 3 === 1) {
						aR = aR.substring(0, aR.length - 2) + "=="
					}
				}
				return aR
			};
			I.decode = function (aW) {
				var aR = aW.length * 0.75,
				aX = aW.length,
				aV,
				aT = 0,
				aU,
				aS,
				aQ,
				aZ;
				if (aW[aW.length - 1] === "=") {
					aR--;
					if (aW[aW.length - 2] === "=") {
						aR--
					}
				}
				var aY = new Uint8Array(aR);
				for (aV = 0; aV < aX; aV += 4) {
					aU = aP.indexOf(aW[aV]);
					aS = aP.indexOf(aW[aV + 1]);
					aQ = aP.indexOf(aW[aV + 2]);
					aZ = aP.indexOf(aW[aV + 3]);
					aY[aT++] = (aU << 2) | (aS >> 4);
					aY[aT++] = ((aS & 15) << 4) | (aQ >> 2);
					aY[aT++] = ((aQ & 3) << 6) | (aZ & 63)
				}
				return aY
			}
		})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
		function al() {
			try {
				return new window.XMLHttpRequest()
			} catch (aP) {}

		}
		function R() {
			try {
				return new window.ActiveXObject("Microsoft.XMLHTTP")
			} catch (aP) {}

		}
		aK.prototype.IsInFileEditing = function () {
			return S
		};
		function ab() {
			var aR;
			var aP = (navigator.userAgent.indexOf("Trident") > 0);
			if (aP) {
				var aQ = document.getElementById("SiebeAttachmentAppletFrame");
				if (aQ) {
					aR = aQ.contentWindow.document.getElementById("SiebelAttachmentJavaApplet")
				}
			} else {
				aR = document.getElementById("SiebelAttachmentJavaApplet2")
			}
			return aR
		}
		aK.prototype.UploadFile = function () {
			if (!SiebelApp.S_App.IsInFileEditing()) {
				return true
			}
			S = false;
			var aY = ab();
			if (aY) {
				var aZ = aY.uploadFile();
				if (!aZ) {
					return true
				}
				var a1 = jQuery.parseJSON(aZ);
				var aQ = a1.uploadStatus;
				if (aQ == 2) {
					S = true;
					SWEAlert(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_ATT_CLOSE_CONFIRM"));
					return false
				} else {
					if (aQ == 1) {
						var aR = a1.boundary;
						var aU = a1.url;
						var aX = 0;
						var aS = new Array();
						for (aX = 0; ; aX++) {
							var aW = aY.getUploadData(aX, 4096);
							if (aW) {
								aS.push(aW)
							} else {
								break
							}
						}
						var aV = aS.join("");
						var aT = I.decode(aV);
						var a0 = function () {
							if (this.readyState == 4) {
								if (this.status == 200) {
									var a2 = SiebelApp.S_App.GetActiveView().GetActiveApplet();
									a2.InvokeMethod("WriteRecord", CCFMiscUtil_CreatePropSet())
								}
							}
						};
						var aP = al() || R();
						aP.onreadystatechange = a0;
						aP.open("POST", aU, false);
						aP.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + aR);
						aP.send(aT.buffer)
					} else {
						if (aQ == -1) {
							SWEAlert(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_ATT_UPLOAD_FAILED"))
						} else {
							if (aQ == -2) {
								S = true;
								SWEAlert(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_ATT_CLOSE_CONFIRM"));
								return false
							}
						}
					}
				}
				return true
			}
		};
		aK.prototype.DownloadFile = function (a5, bb) {
			var aU = a5.GetProperty(ad);
			var aQ = aU.split(Z);
			var aZ = a5.GetProperty(at);
			var aY = this.GetPageURL() + Z;
			var aW = aQ[1];
			var a7 = ArrayBuffer ? true : false;
			var a2 = (navigator.userAgent.indexOf("Trident") > 0);
			var a1 = a5.GetProperty("FileTitle");
			var a0 = a5.GetProperty("FileExt");
			var a9 = a1 + (a0 ? ("." + a0) : "");
			var a8 = false;
			if (localStorage) {
				a8 = localStorage.getItem("isAdfmContainer")
			}
			var ba = function () {
				if (aY && aW) {
					var bd = "";
					var bi = aW.split("&");
					var bh = bi.length;
					for (var bg = 0; bg < bh; bg++) {
						var bj = bi[bg].split("=");
						if (bj[0] == "SRN") {
							bj[1] = SiebelApp.S_App.GetSRN()
						}
						bd += '<input type="hidden" name="' + bj[0] + '" value="' + bj[1] + '" />'
					}
					if ((SiebelApp.S_App.IsMobileApplication() === "true") && (window.navigator.standalone !== undefined) && window.navigator.standalone) {
						var be = aY + aW;
						var bc = document.createElement("a");
						bc.setAttribute("href", be);
						var bf = document.createEvent("HTMLEvents");
						bf.initEvent("click", true, true);
						bc.dispatchEvent(bf);
						bc = null
					} else {
						jQuery('<form action="' + aY + '" method="post"' + (aZ ? "" : ' target="_blank"') + ">" + bd + "</form>").appendTo("body").submit().remove()
					}
				}
			};
			var a3 = function () {
				if (this.readyState == 4) {
					if (this.status == 200 || this.status == 204) {
						var bc = I.encode(this.response);
						SiebelApp.MobileFileMgr.WriteTempWithFlag({
							filename : a9,
							content : bc,
							append : false,
							success : function () {
								SiebelApp.S_App.uiStatus.Free();
								SiebelApp.MobileFileMgr.OpenTempFile({
									filename : a9,
									displayFileName : a9
								})
							},
							error : function () {
								SiebelApp.S_App.uiStatus.Free();
								ac.Alert(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_ATT_CREATE_FILE_PATH_ERROR"))
							}
						})
					}
				}
			};
			var a4 = function () {
				SiebelApp.S_App.uiStatus.Busy({});
				var bc = aY + aW;
				var bd = al() || R();
				bd.onreadystatechange = a3;
				bd.open("GET", bc);
				bd.responseType = "arraybuffer";
				bd.send()
			};
			if (a8) {
				if (SiebelApp.AttachmentMgr.PreviewInMAF) {
					var aS = aY + aW;
					SiebelApp.AttachmentMgr.PreviewInMAF(aS, a9)
				} else {
					a4()
				}
				return
			}
			var aV = function () {
				if (!a7) {
					ba()
				} else {
					var bd = a5.GetChild(0).GetProperty("hnurl");
					var bi = bd.indexOf("SWEView=") + "SWEView=".length;
					var bk = bd.indexOf("&amp;", bi);
					var bj = bd.substring(bi, bk).replace(/\+/gm, " ");
					var bc = {};
					bc.SRN = SiebelApp.S_App.GetSRN();
					bc.SWEView = bj;
					bc.SWEApplet = bb.GetProperty("SWEApplet");
					bc.SWERowIds = bb.GetProperty("SWERowIds");
					bc.SWECmd = "InvokeMethod";
					bc.SWEMethod = "AttachAttachment";
					bc.SWERPC = "1";
					bc.SWEBCFField = bb.GetProperty(h);
					var bh = JSON.stringify(bc);
					var be = function () {
						if (this.readyState == 4) {
							if (this.status == 200 || this.status == 204) {
								S = true;
								var bl = I.encode(this.response);
								var bp = ab();
								if (bp) {
									var br = 4096;
									var bo = Math.floor(bl.length / br);
									var bn = bl.length % br;
									var bm;
									for (bm = 0; bm < bo; bm++) {
										var bq = bm * br;
										bp.prepareFileData(bl.substring(bq, bq + br), bm == 0)
									}
									if (bn > 0) {
										bp.prepareFileData(bl.substring(br * bo, bl.length), false)
									}
									bp.downloadFile(a9, aY + aW, bh)
								}
							}
							SiebelApp.S_App.uiStatus.Free()
						}
					};
					var bf = function () {
						SiebelApp.S_App.uiStatus.Busy({
							mask : true
						});
						window.DownloadFileAppletLoaded = function () {};
						var bp = ab();
						if (bp) {
							var bq = false;
							try {
								bq = bp.isAppletValidate()
							} catch (bo) {}

							if (bq) {
								var bl = new Array("IDS_ATT_CLOSE_CONFIRM", "IDS_ATT_UPLOAD_FAILED", "IDS_ATT_APP_NOT_FOUND", "IDS_ATT_CREATE_FILE_PATH_ERROR", "IDS_ATT_ERROR_DIALOG_CAPTION");
								jQuery.each(bl, function (bs, br) {
									bp.setMessage(br, SiebelApp.S_App.LocaleObject.GetLocalString(br))
								});
								var bm = aY + aW;
								var bn = al() || R();
								bn.onreadystatechange = be;
								bn.open("GET", bm);
								bn.responseType = "arraybuffer";
								bn.send()
							} else {
								ba()
							}
						}
					};
					var bg = ab();
					if (!bg) {
						window.DownloadFileAppletLoaded = function () {
							SiebelApp.S_App.uiStatus.Free();
							bf()
						};
						aR()
					} else {
						bf()
					}
				}
			};
			var aR = function () {
				SiebelApp.S_App.uiStatus.Busy({});
				jQuery(window).on("beforeunload", function (bg) {
					var bh = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_ATT_CLOSE_CONFIRM");
					var bf = ab();
					if (!bf.onWindowClose()) {
						bg.cancelBubble = true;
						bg.returnValue = bh;
						return bh
					}
				});
				var bc = SIEBEL_BUILD.indexOf("/");
				var be = SIEBEL_BUILD.substring(0, bc);
				if (a2) {
					jQuery("<iframe id='SiebeAttachmentAppletFrame' src='attachment.html' width=0 height=0 frameBorder=0></iframe>").appendTo("body")
				} else {
					var bd = '<object id="SiebelAttachmentJavaApplet" ';
					bd += '  classid="clsid:CAFEEFAC-0017-0000-FFFF-ABCDEFFEDCBA" width=0 height=0>';
					bd += '  <param name="code" value="com.siebel.applets.attachment.SiebelAttachmentApplet.class">';
					bd += '  <param name="codebase" value="http://java.sun.com/update/1.6.0/jinstall-6u30-windows-i586.cab#Version=1,6,0,0">';
					bd += '  <param name="archive" value="' + be + '/applets/SiebelAttachment.jar">';
					bd += "    <comment>";
					bd += '      <embed id="SiebelAttachmentJavaApplet2" ';
					bd += '        code="com.siebel.applets.attachment.SiebelAttachmentApplet.class"';
					bd += '        codebase="." archive="' + be + '/applets/SiebelAttachment.jar"';
					bd += '        type="application/x-java-applet;version=1.7" pluginspage="http://java.com/download/"';
					bd += "        width=0 height=0>";
					bd += "        <noembed>";
					bd += "          No Java Support.";
					bd += "        </noembed>";
					bd += "      </embed>";
					bd += "    </comment>";
					bd += "</object>";
					jQuery(bd).appendTo("body")
				}
			};
			var a6 = function () {
				var bf = $("#downloadFileChooseDialog");
				if (bf.length <= 0) {
					var be = "<div id='downloadFileChooseDialog' style='padding:10px;'></div>";
					bf = $(be)
				}
				var bg = [{
						text : SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CLIENT_SAVE"),
						click : function () {
							ba();
							$(this).dialog("close")
						}
					}, {
						text : SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CLIENT_CANCEL"),
						click : function () {
							$(this).dialog("close")
						}
					}
				];
				if (localStorage.getItem("isJavaAppletSupport") && localStorage.getItem("isJavaAppletSupport") == "true") {
					bg.unshift({
						text : SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CLIENT_OPEN"),
						click : function () {
							aV();
							$(this).dialog("close")
						}
					})
				}
				var bc = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CLIENT_FILE_DOWNLOAD");
				var bd = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_FILE_DOWNLOAD_PROMPT");
				bd = bd.replace("%1", a9);
				bf.html(bd);
				bf.dialog({
					title : bc,
					modal : true,
					autoOpen : false,
					buttons : bg
				});
				bf.parent().find("button").addClass("siebui-ctrl-btn").addClass("appletButton");
				bf.dialog("open")
			};
			var aX = ab();
			if (typeof(localStorage) == "undefined") {
				var aP = function () {
					this.storage = {}

				};
				aP.prototype.setItem = function (bc, bd) {
					this.storage[bc] = bd.toString()
				};
				aP.prototype.getItem = function (bc) {
					return this.storage[bc]
				};
				localStorage = new aP()
			}
			if (localStorage.getItem("isJavaAppletSupport")) {
				a6()
			} else {
				window.DownloadFileAppletLoaded = function () {
					localStorage.setItem("isJavaAppletSupport", true);
					SiebelApp.S_App.uiStatus.Free();
					a6()
				};
				aR();
				var aT = 5000;
				setTimeout(function () {
					if (!(localStorage.getItem("isJavaAppletSupport") && localStorage.getItem("isJavaAppletSupport") == "true")) {
						SiebelApp.S_App.uiStatus.Free();
						localStorage.setItem("isJavaAppletSupport", false);
						a6()
					}
				}, aT)
			}
		};
		aK.prototype.GetAppletControlInstance = function (aS, aQ, aR, aT, aP) {
			var aU = new SiebelApp.S_App.AppletControl();
			var aV = CCFMiscUtil_CreatePropSet();
			aV.SetType(G.get("SWE_PST_CNTRL"));
			aU.ProcessObjectInfo(aV);
			aU.GetName = function () {
				return aS
			};
			aU.GetUIType = function () {
				return aQ
			};
			aU.GetDisplayName = function () {
				return aR
			};
			aU.GetWidth = function () {
				return aT
			};
			aU.GetHeight = function () {
				return aP
			};
			aU.GetMaxSize = function () {
				return 1000
			};
			aU.IsSortable = function () {
				return true
			};
			aU.GetFieldName = function () {
				return ""
			};
			aU.GetIconMap = function () {
				return ""
			};
			aU.GetDisplayFormat = function () {
				return ""
			};
			aU.GetInputName = function () {
				return ""
			};
			aU.GetDefaultMethod = function () {
				return ""
			};
			aU.GetSpanPrefix = function () {
				return ""
			};
			aU.GetValue = function () {
				return ""
			};
			aU.IsClientCtrl = function () {
				return true
			};
			return aU
		};
		aK.prototype.GetInputPS = function () {
			return L
		};
		aK.prototype.SetInputPS = function (aP) {
			L = aP
		};
		aK.prototype.GetCSParam = function () {
			var aP = {};
			aP.async = true;
			return aP
		};
		aK.prototype.SetEnablePerfHooks = function (aP) {
			aO = aP
		};
		aK.prototype.GetEnablePerfHooks = function () {
			return aO
		};
		aK.prototype.GetTimer = function () {
			return aA
		};
		aK.prototype.SetTimer = function (aP) {
			aA = aP
		};
		aK.prototype.NotifyTimer = function (aQ, aP) {
			if (aO && aA) {
				aA[aQ].apply(aA, aP)
			}
		};
		aK.prototype.OfflineCallMethod = function () {};
		aK.prototype.Drilldown = function (aS) {
			var aP = aS || window.event;
			if (aP.preventDefault) {
				aP.preventDefault()
			}
			aP.returnValue = false;
			if (aS.stopPropagation) {
				aS.stopPropagation()
			} else {
				aS.cancelBubble = true
			}
			var aR = new Date();
			var aT = aP.currentTarget || aP.srcElement;
			var aQ = aT.href + "&" + G.get("SWE_TIME_STAMP") + "=" + aR.getTime();
			this.GotoView("", "", aQ, "");
			return false
		};
		aK.prototype.TriggerUPTEvent = function (aR) {
			var aQ;
			var aP;
			var aS;
			if (!ac.IsTrue(SiebelApp.S_App.IsUPTEnabled()) || !aR) {
				return
			}
			if (ac.IsEmpty(aR.GetProperty(G.get("UPT_EVENT_NAME")))) {
				aR.SetProperty(G.get("UPT_EVENT_NAME"), G.get("UPT_EVENT_NAME_TEXT"))
			}
			if (ac.IsEmpty(aR.GetProperty(G.get("UPT_EVENT_SOURCE")))) {
				aR.SetProperty(G.get("UPT_EVENT_SOURCE"), G.get("UPT_SOURCE_TEXT"))
			}
			aQ = CCFMiscUtil_CreatePropSet();
			aS = aR.EncodeAsString();
			aQ.SetProperty(G.get("SWE_CMD_ARG"), G.get("UPT_CMD_NAME"));
			aQ.SetProperty(G.get("SWE_PROP_UPT_STR"), aS);
			SiebelApp.S_App.CallServer(aQ, aP, true)
		};
		return o
	}
		())
}
SiebelApp.MvgBeautifier = {
	Initialize : function () {
		this.availableApplet = null;
		this.selectedApplet = null;
		var b = $("div[name=popup]").width();
		var i = $("div[name=popup]").height();
		var l = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_SHOW_AVAILABLE");
		var c = SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_SHOW_SELECTED");
		var f = l;
		var e = c;
		$("div[name=popup]").width(b).height(i).dialog("option", "dialogClass", "siebui-mvg-dialog").dialog("option", "buttons", [{
					text : l,
					click : function (m) {
						var p = $(m.currentTarget);
						var o = p.children(".ui-button-text");
						if (p.text() === c) {
							o.text(l).end().attr("title", f);
							n = SiebelApp.MvgBeautifier.getSelected();
							if (!!n && typeof(n.GetObjectType) == "function") {
								o.attr("un", l);
								o.attr("rn", "ShowAvailable")
							}
							SiebelApp.MvgBeautifier.resizeSelected()
						} else {
							if (p.text() === l) {
								o.text(c).end().attr("title", e);
								var n = SiebelApp.MvgBeautifier.getAvailable();
								if (!!n && typeof(n.GetObjectType) == "function") {
									o.attr("un", c);
									o.attr("rn", "ShowSelected")
								}
								SiebelApp.MvgBeautifier.resizeAvailable()
							}
						}
					}
				}
			]).find(".siebui-mvg-btn-modifier button").clone(true).appendTo($("div[name=popup]").parent().find("div.ui-dialog-buttonset"));
		$("div[name=popup]").parent().find("div.ui-dialog-buttonset").find("button").each(function () {
			$(this).html($(this).val() || $(this).attr("data-display"))
		});
		var d = SiebelApp.S_App.GetActiveView();
		var j = d.GetAppletMap();
		var a;
		for (var h in j) {
			if (j.hasOwnProperty(h)) {
				if (typeof(j[h].GetMvgAssocAppletName) === "function") {
					a = d.GetApplet(j[h].GetMvgAssocAppletName());
					if (!!a) {
						this.availableApplet = a;
						e = a.GetAppletLabel() || "";
						e = e ? (e + ":" + c) : c;
						a.GetPModel().AttachPostProxyExecuteBinding("ALL", function (n, m, o) {
							SiebelApp.MvgBeautifier.MVGPostProxyExecute(this.Get("GetId"))
						})
					}
				}
				if (typeof(j[h].GetMvgSelectedAppletName) === "function") {
					a = d.GetApplet(j[h].GetMvgSelectedAppletName());
					if (!!a) {
						this.selectedApplet = a;
						f = a.GetAppletLabel() || "";
						f = f ? (f + ":" + l) : l;
						a.GetPModel().AttachPostProxyExecuteBinding("ALL", function (n, m, o) {
							SiebelApp.MvgBeautifier.MVGPostProxyExecute(this.Get("GetId"))
						})
					}
				}
			}
		}
		a = null;
		SiebelApp.MvgBeautifier.resizeSelected();
		var g = $("div[name=popup]").parent().find("div.ui-dialog-buttonset").find("button").eq(0);
		g.removeClass().addClass("appletButtons").attr("title", f);
		var k = SiebelApp.MvgBeautifier.getSelected();
		if (k && typeof(k.GetObjectType) == "function") {
			g.children("span").eq(0).attr("ot", "Button").attr("rn", "ShowAvailable").attr("un", l)
		}
		$("div[name=popup]").find("form").submit(function (m) {
			m.preventDefault();
			return false
		})
	},
	MVGPostProxyExecute : function (f) {
		var d = $("div[name=popup]").parent();
		var e = d.find("div.siebui-mvg-btn-modifier").find("button");
		if (!$("#a_" + f).is(":visible")) {
			d.find("div.ui-dialog-buttonset").find("button").eq(0).click()
		}
		for (var c = 0, a = e.length; c < a; ++c) {
			var b = e.eq(c).attr("disabled") ? true : false;
			d.find('[name="' + e.eq(c).attr("name") + '"]').eq(1).removeAttr("disabled").attr("disabled", b).removeClass("appletButton appletButtonDis").addClass((!b ? "appletButton" : "appletButtonDis"))
		}
		d = e = null
	},
	getAvailable : function () {
		if (!this.availableApplet) {
			var c = SiebelApp.S_App.GetActiveView();
			var a = c.GetAppletMap();
			for (var b in a) {
				if (a.hasOwnProperty(b)) {
					if (typeof(a[b].GetMvgAssocAppletName) === "function") {
						this.availableApplet = c.GetApplet(a[b].GetMvgAssocAppletName())
					}
				}
			}
		}
		return this.availableApplet
	},
	getSelected : function () {
		if (!this.selectedApplet) {
			var c = SiebelApp.S_App.GetActiveView();
			var a = c.GetAppletMap();
			for (var b in a) {
				if (a.hasOwnProperty(b)) {
					if (typeof(a[b].GetMvgSelectedAppletName) === "function") {
						this.selectedApplet = c.GetApplet(a[b].GetMvgSelectedAppletName())
					}
				}
			}
		}
		return this.selectedApplet
	},
	resizeAvailable : function () {
		$("div[name=popup]").find("td.AppletStylePopup").eq(0).show();
		var b = this.getSelected();
		if (!!b) {
			if (SiebelApp.S_App.IsRwd()) {
				$("[id^=gbox_tb_s_" + SiebelApp.MvgBeautifier.getSelected().GetPH() + "]").hide();
				var a = b.GetControls();
				for (var f in a) {
					if (a.hasOwnProperty(f)) {
						var d = a[f];
						var e = d.GetMethodName();
						var c = d.GetInputName();
						if (e === "AddRecords") {
							$("#" + c + "_Ctrl").show()
						} else {
							if ((e === "DeleteRecords") || (e === "DeleteAllRecords")) {
								$("#" + c + "_Ctrl").hide()
							} else {
								if (e === "CloseApplet") {
									continue
								} else {
									if (e != null) {
										$("#" + c + "_Ctrl").parent().hide()
									}
								}
							}
						}
					}
				}
			} else {
				$("#a_" + b.GetId()).parents("div").eq(0).hide()
			}
		}
		b = this.getAvailable();
		if (!!b) {
			if (SiebelApp.S_App.IsRwd()) {
				$("#S_A" + SiebelApp.MvgBeautifier.getAvailable().GetPH()).show()
			} else {
				$("#a_" + b.GetId()).parents("div").eq(0).show()
			}
			if (b.GetPModel && !(b.GetPModel()instanceof JSSPropertySet)) {
				b.GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_APPLET_FOCUS"));
				if (b.GetPModel().GetRenderer() && b.GetPModel().GetRenderer().resize) {
					b.GetPModel().GetRenderer().resize()
				}
			}
			this.elementShowHide(true)
		}
	},
	resizeSelected : function () {
		$("div[name=popup]").find("td.AppletStylePopup").eq(0).hide();
		var b = this.getAvailable();
		if (!!b) {
			if (SiebelApp.S_App.IsRwd()) {
				$("#S_A" + SiebelApp.MvgBeautifier.getAvailable().GetPH()).hide()
			} else {
				$("#a_" + b.GetId()).parents("div").eq(0).hide()
			}
		}
		b = this.getSelected();
		if (!!b) {
			if (SiebelApp.S_App.IsRwd()) {
				$("[id^=gbox_tb_s_" + SiebelApp.MvgBeautifier.getSelected().GetPH() + "]").show();
				var a = b.GetControls();
				for (var f in a) {
					if (a.hasOwnProperty(f)) {
						var d = a[f];
						var e = d.GetMethodName();
						var c = d.GetInputName();
						if (e === "AddRecords") {
							$("#" + c + "_Ctrl").hide()
						} else {
							if ((e === "DeleteRecords") || (e === "DeleteAllRecords")) {
								$("#" + c + "_Ctrl").show()
							} else {
								if (e === "CloseApplet") {
									continue
								} else {
									if (e != null) {
										$("#" + c + "_Ctrl").parent().show()
									}
								}
							}
						}
					}
				}
			} else {
				$("#a_" + b.GetId()).parents("div").eq(0).show()
			}
			if (b.GetPModel && !(b.GetPModel()instanceof JSSPropertySet)) {
				b.GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_APPLET_FOCUS"));
				if (b.GetPModel().GetRenderer() && b.GetPModel().GetRenderer().resize) {
					b.GetPModel().GetRenderer().resize()
				}
			}
			this.elementShowHide(false)
		}
	},
	elementShowHide : function (b) {
		var f = $("div[name=popup]").parent().find("div.ui-dialog-buttonset"),
		a = this.getSelected().GetControls();
		for (var h in a) {
			if (a.hasOwnProperty(h)) {
				var g = a[h];
				var e = g.GetMethodName();
				if (e === "AddRecords" || e === "DeleteRecords" || e === "DeleteAllRecords") {
					var c = g.GetInputName() + "_Ctrl",
					d = $(f.find('[name="' + c + '"]')[0] || f.find("#" + c)[0]);
					switch (e) {
					case "AddRecords":
						b ? d.removeClass("siebui-invisible-el") : d.addClass("siebui-invisible-el");
						break;
					default:
						b ? d.addClass("siebui-invisible-el") : d.removeClass("siebui-invisible-el")
					}
				}
			}
		}
	}
};