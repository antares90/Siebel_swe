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
if (typeof(SiebelAppFacade.atcganttrenderer) === "undefined") {
	SiebelJS.Namespace("SiebelAppFacade.atcganttrendererPR");
	define("siebel/custom/atcganttrenderer", ["siebel/phyrenderer", "3rdParty/team-jq-gantt/Libs/jquery.livequery.min.js", "3rdParty/team-jq-gantt/Libs/jquery.timers.js", "3rdParty/team-jq-gantt/Libs/platform.js", "3rdParty/team-jq-gantt/Libs/date.js", "3rdParty/team-jq-gantt/Libs/i18nJs.js", "3rdParty/team-jq-gantt/Libs/dateField/jquery.dateField.js", "3rdParty/team-jq-gantt/Libs/JST/jquery.JST.js", "3rdParty/team-jq-gantt/ganttUtilities.js", "3rdParty/team-jq-gantt/ganttDrawer.js", "3rdParty/team-jq-gantt/ganttGridEditor.js", "3rdParty/team-jq-gantt/ganttMaster.js", "siebel/ganttDateBar", "siebel/ganttLegendBar"], function () {
		SiebelAppFacade.atcganttrenderer = (function () {
			var h = SiebelJS.Dependency("SiebelApp.Constants"),
			M = h.get("SWE_GANTT_DRILLDOWN_ID"),
			R = h.get("SWE_GANTT_ACTIVITY_LABEL"),
			L = h.get("SWE_GANTT_RENDER_INFO"),
			W = h.get("SWE_GANTT_STARTMILLIS"),
			t = h.get("SWE_GANTT_ENDMILLIS"),
			i = h.get("SWE_GANTT_DRILLDOWN_CLS"),
			H = "ICON_INFO",
			D = h.get("SWE_GANTT_DRILLDOWN_CLS"),
			aB = h.get("SWE_GANTT_START_DATE"),
			az = "Column Width",
			aF = "Splitter Position",
			ab = "170",
			U = 30,
			aH = "MM/dd/yyyy",
			v = h.get("SWE_GANTT_ACTIVITY_START_TIME"),
			ax = h.get("SWE_GANTT_DAYINFO"),
			P = h.get("SWE_GANTT_TIME_SCALE"),
			an = h.get("SWE_GANTT_COLOR"),
			b = h.get("SWE_GANTT_ACTIVITY_END_TIME"),
			m = h.get("SWE_GANTT_ACTIVITY_NO_DAYS_IN_WEEK"),
			K = h.get("SWE_GANTT_ACTIVITY_WEEK_DAY_START"),
			l = h.get("SWE_GANTT_BOTTOMAXIS"),
			Q = h.get("SWE_GANTT_NOOFHRS"),
			r = h.get("SWE_GANTT_SPL_DATE"),
			y = h.get("SWE_GANTT_DAY_HOUR"),
			n = h.get("SWE_GANTT_DAY_TWOHOUR"),
			f = h.get("SWE_GANTT_DAY_DAY_FOURHOUR"),
			aq = h.get("SWE_GANTT_DAY_DAYPART"),
			k = h.get("SWE_GANTT_WEEK_DAY_DAYPART"),
			X = h.get("SWE_GANTT_MONTH_DOW_DAYPART"),
			w = h.get("SWE_GANTT_WEEK_DAY"),
			aE = h.get("SWE_GANTT_MONTH_DAY"),
			ah = h.get("SWE_GANTT_MONTH_DOW"),
			I = h.get("SWE_GANTT_3MONTH_DOW"),
			at = h.get("SWE_GANTT_DAY_DAY_HALFHOUR"),
			j = h.get("SWE_GANTT_DAY_DAY_QUARTERHOUR"),
			g = h.get("SWE_GANTT_YEAR_MONTH"),
			aj = h.get("SWE_GANTT_YEAR_WEEK"),
			d = h.get("SWE_GANTT_MONTH_WEEK"),
			ae = SiebelApp.S_App.LocaleObject,
			B = "Weekends",
			ap = "TS COLOR",
			Z = "Hour Axis Color",
			aa = "MM/dd/yyyy HH:mm:ss",
			o = "MM/DD/YYYY HH:MM:SS",
			A = {
				mask : true
			};
			function F() {
				SiebelAppFacade.atcganttrenderer.superclass.constructor.apply(this, arguments);
				var aV = this.GetPM();
				aV.AttachPMBinding("IsRefreshNeeded", this.BindData, {
					scope : this
				});
				aV.AttachPMBinding("RevertBooking", O, {
					scope : this
				});
				aV.AttachPMBinding(aB, p, {
					scope : this
				});
				aV.AttachPMBinding(P, p, {
					scope : this
				});
				aV.AttachPMBinding("ShowLegend", c, {
					scope : this
				});
				aV.AttachPMBinding("expcolpse", aD, {
					scope : this
				});
				var aI = null,
				aQ = null,
				aT = 0,
				aM = 0,
				aU = {},
				aP = 0,
				aK = 0,
				aO = 0,
				aR = 600,
				aL = aV.Get("GetFullId"),
				aN = aV.Get("CustCtlrName"),
				aS = 0,
				aJ = 1;
				aV.SetProperty("InEvent", false);
				this.GetAppletId = function () {
					return aL
				};
				this.GetCustCtrlName = function () {
					return aN
				};
				this.getGanttLegendBar = function () {
					return aQ
				};
				this.setGanttLegendBar = function (aW) {
					aQ = aW
				};
				this.getRowsPerPage = function () {
					return aM
				};
				this.setRowsPerPage = function (aW) {
					aM = aW
				};
				this.getTotalPages = function () {
					return aK
				};
				this.setTotalPages = function (aW) {
					aK = aW
				};
				this.getRemainingRows = function () {
					return aO
				};
				this.setRemainingRows = function (aW) {
					aO = aW
				};
				this.getGanttDateBar = function () {
					return aI
				};
				this.setGanttDateBar = function (aW) {
					aI = aW
				};
				this.setMapResIndex = function (aW) {
					aU = aW
				};
				this.getMapResIndex = function (aW) {
					return aU
				};
				this.setResColCount = function (aW) {
					aP = aW
				};
				this.getResColCount = function () {
					return aP
				};
				this.setGanttCtrlHeight = function (aW) {
					aR = aW
				};
				this.getGanttCtrlHeight = function () {
					return aR
				};
				this.setHasWidthbuffer = function (aW) {
					aS = aW
				};
				this.getHasWidthbuffer = function () {
					return aS
				};
				this.setFirstLoad = function (aW) {
					aJ = aW
				};
				this.getFirstLoad = function () {
					return aJ
				}
			}
			SiebelJS.Extend(F, SiebelAppFacade.PhysicalRenderer);
			F.prototype.ShowUI = function () {
				var aI,
				aL = this.GetPM(),
				aM = "",
				aT,
				aK,
				aS,
				aQ,
				aP,
				aO = this.getGanttCtrlHeight(),
				aJ = SiebelApp.S_App.IsAutoOn(),
				aN = "";
				SiebelAppFacade.atcganttrenderer.superclass.ShowUI.call(this);
				aT = $("#s_" + this.GetAppletId() + "_div").find("#s_ganttleft");
				if (aT) {
					aT.hide();
					aP = SiebelApp.S_App.GetName();
					if ((aP === "Siebel Loyalty") || (aP === "Siebel Consumer Sector") || (aP === "Siebel eDealer")) {
						aM = ""
					} else {
						aM = '<span class="appletButton siebui-ganttFilterPane"><span class="siebui-ganttFilter" title="Filter Panel"';
						if (aJ === "true") {
							aM += ' ot="span" rn="gearIcon" un="gearIcon"'
						}
						aM += "></span></span>"
					}
					aL.SetProperty("FilterGantt_CLS", aM)
				}
				$("#s_" + this.GetAppletId() + "_div").find("#siebui-iconSection").append(aM);
				if (aL.Get("DateBarControl")) {
					aS = $("#" + aL.Get("DateBarControl"));
					if (aS) {
						this.setGanttDateBar(new SiebelAppFacade.GanttDateBar());
						this.getGanttDateBar().ShowUI(aL, aS);
						this.getGanttDateBar().BindEvents();
						if (aJ === "true") {
							$("#s_" + this.GetAppletId() + "_div").find(".siebui-ganttDate .ui-datepicker-trigger").attr("rn", "Choose a Date").attr("un", "Choose a Date").attr("ot", "ImageControl")
						}
						this.getGanttDateBar().setNavigationValues()
					}
				}
				var aR = new GanttMaster();
				if (aL.Get("LegendControl")) {
					aQ = $("#" + aL.Get("LegendControl"));
					if (aQ) {
						this.setGanttLegendBar(new SiebelAppFacade.GanttLegendBar());
						this.getGanttLegendBar().init(aQ, this.GetAppletId() + "_colorcodelegend");
						this.getGanttLegendBar().createLegends(aL.ExecuteMethod("prepareLegendMap"), aL.Get("ShowLegend"));
						aO = aO - aQ.height();
						ganttLeftHeight = parseInt(aO, 10) + aQ.height() + 8
					}
				} else {
					ganttLeftHeight = parseInt(aO, 10) + 8
				}
				$("#s_" + this.GetAppletId() + "_div").find("#s_ganttFilterPane").addClass("siebui-ganttReportPane siebui-inrGanttFilterPane");
				aI = $("#" + this.GetCustCtrlName()).addClass("siebui-ganttControl");
				aI.css({
					height : parseInt(aO, 10)
				});
				aR.init(aI, aL.Get(L));
				this.setRowsPerPage(au.call(this, aL));
				$(".siebui-splitBox3").addClass("siebui-VScroll");
				$("#s_ganttleft").css({
					height : ganttLeftHeight
				});
				C.call(this)
			};
			F.prototype.BindData = function () {
				SiebelAppFacade.atcganttrenderer.superclass.BindData.call(this);
				var a6 = this.GetPM(),
				aR,
				aU,
				aZ = this.getRowsPerPage(),
				bb = 0,
				aT = 0,
				a2 = 0,
				aM = 0,
				a9 = {},
				aI = "",
				a7 = "",
				aS = 1,
				aO = a6.Get("PanesToRefresh"),
				aQ = 0,
				a1 = 0,
				aW = a6.Get("GetControls"),
				aK = aW.GoToResource,
				aX = 0,
				aN = "",
				aP = "",
				a0 = a6.Get("Scale_factor") * 100 * a6.Get("TotalHPages"),
				bc = a6.Get("Color Display By"),
				aY = a6.Get("Status Abbreviations"),
				ba,
				a3 = this.GetPM().Get("RESOURCEHEADER").length,
				a5;
				if (aY && bc) {
					ba = aY.substring(aY.indexOf(bc) + bc.length + 1, aY.indexOf(";", aY.indexOf(bc)))
				} else {
					if (aY) {
						ba = aY.substring(aY.indexOf(",") + 1, aY.length - 1)
					} else {
						ba = "GS"
					}
				}
				var aV = {
					RJoinFld : a6.Get("RJoinFld"),
					RParentFld : a6.Get("RParentFld"),
					Statabb : ba,
					EventColor : a6.Get("Booking Colors"),
					TST : a6.Get("TST"),
					EventDefaultColor : a6.Get("EventDefaultColor"),
					RHeaderMap : a6.Get("RESOURCEHEADER"),
					configSpacePatternFlag : a6.Get("ConfigSpacePattern")
				};
				if (a6.Get("IsTotalHPagesChanged") === "Y") {
					a6.SetProperty("IsTotalHPagesChanged", "N");
					$("#TGrid").width(a0.toString() + "%");
					$("#UGrid").width(a0.toString() + "%")
				}
				aR = a6.Get("RecordSet");
				aU = aR ? aR.length : 0;
				aZ = aU > aZ ? aZ : aU;
				bb = parseInt(aU / aZ, 10);
				aX = aU - bb * aZ;
				this.setTotalPages(bb);
				this.setRemainingRows(aX);
				aQ = aO & 1;
				aO >>= 1;
				a1 = aO & 1;
				while (aO) {
					aO >>= 1;
					aS = aS + 1;
					if (aO & 1) {
						switch (aS) {
						case 2:
							if (a1) {
								$("#HGrid").empty().append(al.call(this));
								SiebelJS.Log("RGrid Dynamic");
								aT = 0;
								$("#RGrid").empty();
								while (aT < bb) {
									a2 = aT * aZ;
									aM = a2 + aZ;
									a6.ExecuteMethod("prepareRespage", a2, aM);
									aP = aP + q.call(this, a2, aM, "page" + aT.toString(), aR, aV);
									aT = aT + 1
								}
								if (aX > 0) {
									a2 = bb * aZ;
									aM = a2 + aX;
									a6.ExecuteMethod("prepareRespage", a2, aM);
									aP = aP + q.call(this, a2, aM, "page" + aT.toString(), aR, aV)
								}
								$("#RGrid").append(aP);
								ay.call(this, aU)
							}
							break;
						case 3:
							if (aQ) {}

							if (a1) {
								SiebelJS.Log("TGrid Dynamic");
								$("#TGrid").empty().append(this.renderTimeScale())
							}
							break;
						case 4:
							if (aQ) {}

							if (a1) {
								aT = 0;
								SiebelJS.Log("UGrid Dynamic");
								$("#UGrid").empty();
								while (aT < bb) {
									a2 = aT * aZ;
									aM = a2 + aZ;
									a6.prepareUtillpage(a2, aM);
									aN = aN + s.call(this, a2, aM, "page" + aT.toString(), aR, aV);
									aT = aT + 1
								}
								if (aX > 0) {
									a2 = bb * aZ;
									aM = a2 + aX;
									a6.prepareUtillpage(a2, aM);
									aN = aN + s.call(this, a2, aM, "page" + aT.toString(), aR, aV)
								}
								$("#UGrid").append(aN)
							}
							break
						}
					}
				}
				a5 = parseInt($(".siebui-gdfColHeader").css("max-width")) * a3;
				$(".siebui-splitBox0").width(a5);
				$(".siebui-splitBox1").width(a5);
				if (aK && (a6.Get("PanesToRefresh") & (1 << 2))) {
					J.call(this, aK)
				}
				ao.call(this);
				if (a6.Get("InEvent") === false) {
					this.SetHScrollPos()
				} else {
					a6.SetProperty("InEvent", false)
				}
				C.call(this);
				var a4 = a6.Get("Resource Id");
				var a8 = a6.Get("ResIDtoIndex");
				var aJ = a8 ? a8[a4] : 0;
				var aL = aR ? aR[aJ] : 0;
				if (aL) {
					if (this.getFirstLoad() === 1) {
						am.call(this, aL["Resource Name"])
					}
					Y.call(this)
				}
				this.setFirstLoad(0);
				aV = null;
				aW = null;
				SiebelApp.S_App.uiStatus.Free()
			};
			F.prototype.BindEvents = function () {
				SiebelAppFacade.atcganttrenderer.superclass.BindEvents.call(this);
				var aQ = this,
				aW = aQ.GetPM(),
				aV,
				aM,
				aZ,
				a4,
				aT,
				aK,
				a6,
				aP,
				aR = 0,
				a7 = 0,
				a0 = 0,
				aO = 0,
				aJ = null,
				aY,
				aI,
				a3,
				aU,
				a2,
				aL,
				a5,
				aS,
				aX,
				a1 = SiebelApp.S_App.PluginBuilder.GetHoByName("EventHelper");
				var aN = $("#s_" + this.GetAppletId() + "_div");
				aV = aW.Get("GetControls");
				aM = aV["Display Toggle"];
				if (aM) {
					aZ = this.GetUIWrapper(aM);
					aL = aZ.GetEl();
					if (a1 && aL.length) {
						a1.Manage(aL, "autocompleteclose", {
							ctx : this,
							CW : aZ
						}, G)
					}
				}
				a4 = aV["Color Display Toggle"];
				if (a4) {
					aT = this.GetUIWrapper(a4);
					a5 = aT.GetEl();
					if (a1 && a5.length) {
						a1.Manage(a5, "autocompleteclose", {
							ctx : this,
							CW : aT
						}, aw)
					}
				}
				aK = aV.GoToResource;
				if (aK) {
					a6 = this.GetUIWrapper(aK);
					aP = a6.GetEl();
					aP.autocomplete({
						source : []
					}).autocomplete("option", "position", {
						my : "center top",
						at : "center bottom",
						of : $(aP),
						collision : "flip flip"
					});
					if (a1 && aP.length) {
						a1.Manage(aP, "autocompleteclose", {
							ctx : this
						}, av);
						a1.Manage(aP, "keypress", {
							ctx : this
						}, af)
					}
				}
				aX = aN.find(".siebui-option-bar");
				if (a1 && aX.length) {
					a1.Manage(aX, "click", {
						ctx : this
					}, u, "button")
				}
				if (a1 && aN.length) {
					a1.Manage(aN, "mouseenter", {
						ctx : this
					}, function (a8) {
						aI = $("#_sweview")[0].title;
						a3 = a8.currentTarget.title;
						a8.currentTarget.title = "";
						$("#_sweview")[0].title = ""
					});
					a1.Manage(aN, "mouseleave", {
						ctx : this
					}, function (a8) {
						a8.currentTarget.title = a3;
						$("#_sweview")[0].title = aI
					});
					a1.Manage(aN, "mouseover", {
						ctx : this,
						attr : "Id",
						Input : "ResId",
						Pane : "Pane 0"
					}, z, ".siebui-showResTooltip");
					a1.Manage(aN, "mouseover", {
						ctx : this
					}, S, ".siebui-taskBox");
					a1.Manage(aN, "mouseover", {
						ctx : this,
						attr : "DateVal",
						Input : "DateVal",
						Pane : "Pane 1"
					}, z, ".siebui-showTSTooltip");
					a1.Manage(aN, "mouseover", {
						ctx : this
					}, ac, ".siebui-taskBox.Rsizable");
					a1.Manage(aN, "click", {
						ctx : this
					}, ak, ".siebui-expcoll");
					a1.Manage(aN, "click", {
						ctx : this
					}, aQ.drillDownHandler, ".siebui-ganttDrilldown");
					a1.Manage(aN, "click", {
						ctx : this
					}, Y, ".siebui-taskEditUtility");
					a1.Manage(aN, "click", {
						ctx : this
					}, Y, ".siebui-taskEditRow");
					a1.Manage(aN, "dblclick", {
						ctx : this
					}, a, ".siebui-taskEditUtility");
					a1.Manage(aN, "dblclick", {
						ctx : this
					}, aA, ".siebui-taskBox");
					a1.Manage(aN, "mousedown", {
						ctx : this
					}, V, ".siebui-taskBox.Dragpble");
					a1.Manage(aN, "mouseup", {
						ctx : this
					}, E, ".siebui-taskEditUtility");
					a1.Manage(aN, "click", {
						ctx : this
					}, N, ".siebui-ganttFilterPane");
					a1.Manage(aN, "mousedown", {
						ctx : this
					}, aG, ".siebui-vSplitBar");
					a1.Manage(aN, "mouseover", {
						ctx : this
					}, ai, ".siebui-gdfColHeader");
					a1.Manage(aN.find(".siebui-VScroll"), "scroll", {
						ctx : this
					}, aC)
				}
				aS = aN.find(".siebui-splitBox3");
				if (a1 && aS.length) {
					a1.Manage(aS, "mousedown", {
						ctx : this,
						el : aN
					}, function (a8) {
						$(a8.data.el).data("SCROLL_BUTTON", true)
					});
					a1.Manage(aS, "mouseup", {
						ctx : this,
						el : aN
					}, function (a8) {
						$(a8.data.el).data("SCROLL_BUTTON", false);
						a0 = 0
					});
					a1.Manage(aS, "scroll", {
						ctx : this,
						iScroll : a0,
						el : aN,
						prevScroll : a7
					}, ag)
				}
				aN = null;
				aV = null
			};
			F.prototype.EndLife = function () {
				ganttDateBar = null;
				ganttLegendBar = null;
				m_mapResIndex = null;
				SiebelAppFacade.atcganttrenderer.superclass.EndLife.call(this)
			};
			function J(aK) {
				var aI = this.GetPM(),
				aL = this.GetUIWrapper(aK);
				ctrlResEl = aL.GetEl();
				name = "",
				dataArray = [],
				mapResIndex = {},
				resSet = aI.Get("RecordSet"),
				reslen = 0,
				value = "";
				reslen = resSet ? resSet.length : 0;
				for (var aJ = 0; aJ < reslen; aJ = aJ + 1) {
					name = resSet[aJ]["Resource Name"];
					mapResIndex[name.toLowerCase()] = aJ;
					dataArray.push(name)
				}
				this.setMapResIndex(mapResIndex);
				if (ctrlResEl.length !== 0) {
					ctrlResEl.autocomplete("option", "source", dataArray)
				}
			}
			function am(aL) {
				var aI = this.GetPM(),
				aK = $(".siebui-taskEditRow").height(),
				aJ = 0,
				aN,
				aM = this.getMapResIndex();
				if (aL) {
					aJ = aM[aL.toLowerCase()];
					if (aJ >= 0) {
						aN = parseInt(aJ * aK, 10);
						$(".siebui-splitBox3").scrollTop(aN);
						$("#" + aI.Get("RecordSet")[aJ][aI.Get("RJoinFld")]).click();
						return true
					}
				} else {}

				return false
			}
			function ar(aM) {
				var aR = this.GetPM(),
				aJ,
				aK,
				aQ,
				aO,
				aI = aR.Get("RecordSet"),
				aL = aI.length;
				var aP = aR.Get("RJoinFld");
				for (var aN = 0; aN < aL; aN = aN + 1) {
					aK = $("#" + aI[aN][aP]).attr("pid");
					if (aK === "" || aK === "ORPHANED") {
						aJ = $("#" + aI[aN][aP]).attr("id");
						aQ = $("#" + aJ).children()[0];
						aO = $(aQ.lastChild).children()[0];
						if (aM) {
							if ($(aO).hasClass("ui-icon-triangle-1-e")) {
								$(aO).removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-se");
								$('*[pid="' + aJ + '"]').slideToggle(30)
							}
						} else {
							if ($(aO).hasClass("ui-icon-triangle-1-se")) {
								$(aO).removeClass("ui-icon-triangle-1-se").addClass("ui-icon-triangle-1-e");
								$('*[pid="' + aJ + '"]').slideToggle(30)
							}
						}
					}
				}
			}
			function N(aJ) {
				var aQ = aJ.data.ctx,
				aM = aQ.GetPM(),
				aS = aJ.data.ctx,
				aL = $(".siebui-splitBox3").scrollLeft(),
				aO = 0,
				aN = $(".siebui-splitBox3").width(),
				aU = $("#s_" + aQ.GetAppletId() + "_div").find("#s_ganttleft"),
				aR = $("#s_" + aQ.GetAppletId() + "_div").find("#s_ganttRight"),
				aK = 0;
				if (aR.hasClass("siebui-shrinkRight")) {
					aR.removeClass("siebui-shrinkRight");
					aU.hide()
				} else {
					aU.show();
					aR.addClass("siebui-shrinkRight")
				}
				var aI = $("#" + aS.GetCustCtrlName());
				var aT = aI.innerWidth();
				aO = $(".siebui-splitBox3").width();
				if (aS.getHasWidthbuffer() == 1) {
					var aP = aM.Get("ScrollbarWidth");
					aK = (aO - aP) / aT * 100
				} else {
					aK = (aO) / aT * 100
				}
				$(".siebui-splitBox2").width(aK + "%");
				$(".siebui-splitBox3").scrollLeft(aL * aO / aN);
				ao.call(aQ)
			}
			function u(aJ) {
				var aM = aJ.data.ctx.GetPM(),
				aS = aM.Get("GetControls"),
				aR = aM.Get("TST"),
				aN = aM.Get("datePaddingMap"),
				aL = 0,
				aT = aJ.currentTarget.id.replace("_Ctrl", ""),
				aK = "",
				aQ = 0,
				aP = aM.Get("TotalHPages"),
				aO = aP;
				SiebelApp.S_App.uiStatus.Busy({
					target : SiebelApp.S_App.GetTargetViewContainer(),
					mask : true
				});
				aQ = aQ | (1 << 1);
				aQ = aQ | (1 << 2);
				aQ = aQ | (1 << 3);
				aQ = aQ | (1 << 4);
				aM.SetProperty("PanesToRefresh", aQ);
				for (var aI in aS) {
					if (aS[aI].GetInputName() === aT) {
						aK = aS[aI].GetName();
						aM.SetProperty("NotifyTSButtonClk", "TRUE");
						if (aR != aK) {
							aM.SetProperty("TST", aK);
							aM.SetProperty("InEvent", false);
							if (aN[aK]) {
								aL = aN[aK]
							}
							aO = 1 + (aL * 2);
							if (aO !== aP) {
								aM.SetProperty("TotalHPages", aO);
								aM.SetProperty("IsTotalHPagesChanged", "Y")
							}
							if (aN[aK]) {
								aL = aN[aK]
							}
							aO = 1 + (aL * 2);
							if (aO !== aP) {
								aM.SetProperty("TotalHPages", aO);
								aM.SetProperty("IsTotalHPagesChanged", "Y")
							}
							C.call(aJ.data.ctx);
							aJ.data.ctx.getGanttDateBar().setNavigationValues();
							break
						}
					}
				}
				aS = null
			}
			function ad(aR) {
				var aP,
				aL = this.GetPM(),
				a0,
				aQ,
				aX,
				aI,
				aZ,
				aN,
				aM,
				aW,
				aS,
				aJ,
				aT,
				aO,
				aU,
				aK;
				a0 = aL.Get("LIC Field")[aR];
				aQ = aL.Get("Status Abbreviations");
				aX = aQ.substring(aQ.indexOf(a0) + a0.length + 1, aQ.indexOf(";", aQ.indexOf(a0)));
				aI = aL.Get("Booking Colors");
				aZ = aL.Get("RecordSet");
				aK = aZ ? aZ.length : 0;
				for (var aV = 0; aV < aK; aV = aV + 1) {
					var aY = aZ[aV][aL.Get("RJoinFld")];
					aP = aL.ExecuteMethod("gettaskSeqEvents", aY);
					if (aP) {
						for (aU = 0; aU < aP.length; aU++) {
							aO = $('*[taskId="' + aP[aU] + '"]').find(".siebui-layout");
							aW = aL.ExecuteMethod("getEvent", aY, aP[aU]);
							aS = aW[aX];
							aJ = aX + "_" + aS;
							aT = aI[aJ];
							if (!aT) {
								aT = aL.Get("EventDefaultColor")
							}
							aO.css({
								"background-color" : aT
							})
						}
					}
				}
				aL.SetProperty("Color Display By", a0);
				this.getGanttLegendBar().createLegends(aL.ExecuteMethod("prepareLegendMap"), aL.Get("ShowLegend"))
			}
			function T(aK, aL) {
				var aJ = aK.getMinutes(),
				aI;
				aI = (parseInt(((aJ + aL / 2) / aL), 10) * aL);
				aK = new Date(aK.setMinutes(aI, 0));
				return aK
			}
			function O() {
				var aU = this.GetPM(),
				aW = aU.Get("RevertDate"),
				aM = aU.Get("RevertInfo"),
				aP,
				aN,
				aK,
				aQ,
				aS,
				aT,
				aV = aW ? aW.FROMRESINDEX : -1,
				aJ = aW ? aW.TORESINDEX : -1,
				aI = aU.Get("Color Display By"),
				aR = aU.Get("Status Abbreviations"),
				aO;
				if (aR && aI) {
					aO = aR.substring(aR.indexOf(aI) + aI.length + 1, aR.indexOf(";", aR.indexOf(aI)))
				}
				var aL = {
					Statabb : aO,
					EventColor : aU.Get("Booking Colors"),
					TST : aU.Get("TST"),
					configSpacePatternFlag : aU.Get("ConfigSpacePattern"),
					EventDefaultColor : aU.Get("EventDefaultColor")
				};
				if (aV && aV !== -1) {
					aS = "";
					$("#UGrid").find("#" + aV.toString() + " div.siebui-eventContainer").remove();
					aT = aU.Get("RecordSet")[aV].EVENTS;
					aS = '<div class="siebui-eventContainer">' + this.preparerowtasks(aT, aV, aL) + "</div></div>";
					$("#UGrid").find("#" + aV.toString()).append(aS)
				}
				if (aJ && aJ !== -1) {
					aS = "";
					$("#UGrid").find("#" + aJ.toString() + " div.siebui-eventContainer").remove();
					aT = aU.Get("RecordSet")[aJ].EVENTS;
					aS = '<div class="siebui-eventContainer">' + this.preparerowtasks(aT, aJ, aL) + "</div></div>";
					$("#UGrid").find("#" + aJ.toString()).append(aS)
				}
				aU.SetProperty("RevertDate", "");
				aL = null
			}
			function e(aI) {
				var aJ = '<div id="gantEditorTemplates" class="siebui-gantEditorTemplates">' + al.call(this) + "</div>";
				return aJ
			}
			function al() {
				var aR = this.GetPM().Get("RESOURCEHEADER"),
				aN = aR.length,
				aI = parseFloat(100 / aN, 10),
				aL = '<span class="appletButton siebui-ganttFilterPane"><span class="siebui-ganttFilter" ot="span" rn="gearIcon" un="gearIcon" title="Filter Panel"></span></span>',
				aK = '<div class="siebui-gdfHeaderRow">',
				aP = this.GetPM().Get(az),
				aQ = "",
				aJ = SiebelApp.S_App.IsAutoOn();
				this.setResColCount(aN);
				if (aP) {
					aQ = utils.TokenizeString(aP, ":")
				}
				for (var aM = 0, aO = ""; aM < aN; aM++) {
					aO = aO + "<div ";
					if (aQ !== "") {
						aO = aO + 'style = "width:' + aQ[aM] + 'px;"'
					}
					if (aM === aN - 1) {
						aO = aO + ' class="siebui-gdfColHeader gdfResizable gdfied siebui-lastColumn" id="siebui-gdfColHeader' + aM + '" data-idd-name="' + aR[aM].IDD + '" ColNum ="' + aM + '"><div class = "siebui-headerData"';
						if (aJ === "true") {
							aO += 'ot = "span" rn = "' + aR[aM].NM + '" un = "RH' + aR[aM].NM + '"'
						}
						aO += ">" + aR[aM].NM + "</div></div>"
					} else {
						aO = aO + ' class="siebui-gdfColHeader gdfResizable gdfied" id="siebui-gdfColHeader' + aM + '" data-idd-name="' + aR[aM].IDD + '" ColNum ="' + aM + '"><div class = "siebui-headerData"';
						if (aJ === "true") {
							aO += 'ot = "span" rn = "' + aR[aM].NM + '" un = "RH' + aR[aM].NM + '"'
						}
						aO += ">" + aR[aM].NM + "</div></div>"
					}
				}
				aK = aK + aO + "</div></div>";
				return aK
			}
			function q(aN, aL, aO, aP, aT) {
				var a2 = this.GetPM(),
				aU = aT.RHeaderMap,
				aZ = aU.length,
				aW = parseFloat(100 / aZ, 10),
				aV = this.getRowsPerPage(),
				aR = aP ? aP.length : 0,
				aS = aR > aV ? aV : aR,
				aK = "",
				aJ = "",
				aY = a2.Get(az),
				aQ = "";
				appletId = this.GetAppletId(),
				fld = aT.RJoinFld,
				parentfld = aT.RParentFld,
				Icons = "Icons",
				strAutoOn = SiebelApp.S_App.IsAutoOn(),
				attr = "";
				if (aY) {
					aQ = utils.TokenizeString(aY, ":")
				}
				for (var a0 = aN, aI = ""; a0 < aL; a0 = a0 + 1) {
					aI = aI + '<div  class="siebui-gdfRow siebui-gdfRowRes siebui-taskEditRow row' + a0.toString() + "" + aP[a0].STCLS + '"  index="' + a0.toString() + '"  taskId="' + aP[a0][fld] + '"    pid="' + aP[a0][parentfld] + '"  id="' + aP[a0][fld];
					if (strAutoOn === "true") {
						aI += '"ot = "row" rn = "RR' + aP[a0][fld] + '" un = "RR' + aP[a0][fld] + '"'
					}
					aI += '" >';
					for (var a1 = 0, aM = ""; a1 < aZ; a1++) {
						var aX = aU[a1].DDFLD ? D : "";
						if (a1 === 0) {
							aM = aM + '<div class="siebui-gdfCell siebui-ResCol' + appletId + a1 + '" ';
							if (aQ !== "") {
								aM = aM + 'style = "width:' + aQ[a1] + 'px;"'
							}
							aM = aM + '> <div class = "siebui-defaultIndent" style=padding-left:' + aP[a0].LEVEL * 5 + "px;>" + aP[a0][Icons] + '<div class="' + aP[a0].CLS + '" taskId = "' + aP[a0][fld] + '"></div>'
						} else {
							if (a1 === aZ - 1) {
								aM = aM + '<div class="siebui-gdfCell siebui-lastColumn siebui-ResCol' + appletId + a1 + '" ';
								if (aQ !== "") {
									aM = aM + '" style = "width:' + aQ[a1] + 'px;"'
								}
								aM = aM + '><div class="siebui-resIndent siebui-defaultIndent">'
							} else {
								aM = aM + '<div class="siebui-gdfCell siebui-ResCol' + appletId + a1 + '" ';
								if (aQ !== "") {
									aM = aM + '" style = "width:' + aQ[a1] + 'px;"'
								}
								aM = aM + '><div class="siebui-resIndent siebui-defaultIndent">'
							}
						}
						attr = "data-drilldown-type='RGrid' data-drilldown-id='" + aP[a0][aU[a1].DDFLD] + "'";
						if (strAutoOn === "true") {
							attr += " ot = 'a' rn = 'RR " + aP[a0][aU[a1].FLD] + "' un = 'RR" + aP[a0][fld] + "Col" + a1 + aP[a0][aU[a1].FLD]
						}
						aM += SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
							type : h.get("SWE_CTRL_LINK"),
							className : "siebui-showResTooltip " + aX,
							value : HtmlEncode(aP[a0][aU[a1].FLD]),
							attrs : attr
						});
						aM = aM + "</div></div>"
					}
					aI = aI + aM + "</div>"
				}
				aJ = aJ + aI + "</div>";
				return aJ
			}
			function s(aJ, aN, aK, aI, aP) {
				var aL = '<div class="' + aK + '">';
				fld = aP.RJoinFld,
				parentFld = aP.RParentFld,
				ResPaneRefresh = ((this.GetPM().Get("PanesToRefresh") & (1 << 2)) === 0),
				strAutoOn = SiebelApp.S_App.IsAutoOn();
				for (var aO = aJ, aQ = ""; aO < aN; aO = aO + 1) {
					var aM = aO.toString(),
					aR = (ResPaneRefresh && aI[aO][parentFld] !== "ORPHANED") ? $("#" + aI[aO][fld]).css("display") : "block",
					aQ = aQ + '<div  style="display:' + aR + '" class="siebui-gdfRow siebui-taskEditUtility row' + aM + '"  pid="' + aI[aO][parentFld] + '"   taskId="' + aI[aO][fld] + '"  id="' + aO.toString() + '" ';
					if (strAutoOn === "true") {
						aQ += 'ot = "row" rn = "UR' + aI[aO][fld] + '" un = "UR' + aI[aO][fld] + '"'
					}
					aQ += '><div class="siebui-eventContainer">' + this.preparerowtasks(aI[aO].EVENTS, aO, aP) + "</div></div>"
				}
				aL = aL + aQ + "</div>";
				return aL
			}
			F.prototype.preparerowtasks = function (aZ, aL, aQ) {
				var aW = "",
				aI = aQ.EventColor,
				a1 = aQ.Statabb,
				aN = aQ.configSpacePatternFlag,
				aT,
				aJ,
				aV,
				aX,
				aO,
				aK,
				aP,
				a0,
				aY,
				aU = "siebui-layout",
				aM = 98,
				aR = SiebelApp.S_App.IsAutoOn(),
				aS = "";
				if (aQ.TST === "64") {
					aU += " siebui-taskBoxMonthDay"
				}
				if (aZ) {
					for (aX in aZ) {
						aY = aZ[aX];
						if (aZ.hasOwnProperty(aX)) {
							aT = aY[a1];
							aJ = a1 + "_" + aT;
							if (aY.BT && (aY.BT === "Out of Order" || aY.BT === "Unavailable Instance" || aY.BT === "Ineffective UNCHANGED")) {
								aJ = "GS_LIC_" + aY.BT
							}
							if (aI) {
								aV = aI[aJ]
							}
							if (!aV) {
								aV = aQ.EventDefaultColor
							}
							aO = aZ[aX][R];
							if (aY.OLPCNT && aY.OLPCNT > 2) {
								aO = "";
								if (aY.Icon) {
									aY.Icon = ""
								}
							}
							if (!aO) {
								aO = ""
							}
							aK = aY.DDID;
							if (!aK) {
								aK = "";
								aP = ""
							} else {
								aP = i
							}
							a0 = 100 - (aZ[aX]["SW"] ? parseInt(aZ[aX]["SW"], 10) : 0) - (aZ[aX]["TW"] ? parseInt(aZ[aX]["TW"], 10) : 0) - 5;
							aW = aW + '<div class="siebui-taskBox ' + aZ[aX]["CLS"] + '" taskId=' + aZ[aX]["ID"] + "  id= " + aL.toString() + " style=width:" + aZ[aX]["width"] + "%;height:" + aZ[aX]["height"] + "px!important;left:" + aZ[aX]["left"] + "%;margin-top:" + aZ[aX]["top"] + "px;z-index:" + aM + ";";
							if (aR === "true") {
								aW = aW + 'ot = "div" rn = "event-' + aZ[aX]["ID"] + '" un = "event-' + aZ[aX]["ID"] + '"'
							}
							aW = aW + '><div class="' + aU + '" style=background-color:' + aV + ";>";
							if (aZ[aX]["SW"]) {
								aW = aW + '<div class = "siebui-turnTime siebui-setupTime" style = width:' + aZ[aX]["SW"] + "%;></div>"
							}
							if (aZ[aX]["TW"]) {
								aW = aW + '<div class = "siebui-turnTime siebui-teardownTime" style = width:' + aZ[aX]["TW"] + "%;></div>"
							}
							if (aN === "Y" && aZ[aX]["CFST"] && aZ[aX]["CFST"] === "Y") {
								aW = aW + '<div class = "siebui-configSpacePattern">'
							}
							aW = aW + '<span class="siebui-taskStatus" style = width:' + a0 + "%; status=" + aZ[aX]["GS"] + ">" + this.createIconInfo(aZ[aX]);
							aS = " data-drilldown-type= 'UGrid' data-drilldown-id='" + aK + "'";
							if (aR === "true") {
								aS += "ot = 'a' rn = '" + aO + "' un = '" + aO + "'"
							}
							aW += SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
								type : h.get("SWE_CTRL_LINK"),
								className : "siebui-activityLabel " + aP,
								value : HtmlEncode(aO),
								attrs : aS
							});
							aW += "</span></div></div>";
							if (aN === "Y" && aZ[aX]["CFST"] && aZ[aX]["CFST"] === "Y") {
								aW = aW + "</div>"
							}
						}
					}
				}
				return aW
			};
			function ak(aJ) {
				var aI = $(this).closest(".siebui-gdfRow").attr("taskid");
				if (aI !== "" && aI != "ORPHANED") {
					$('*[pid="' + aI + '"]').slideToggle(30)
				}
				if ($(this).hasClass("ui-icon-triangle-1-e")) {
					$(this).removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-se")
				} else {
					$(this).removeClass("ui-icon-triangle-1-se").addClass("ui-icon-triangle-1-e")
				}
			}
			function z(aL) {
				if (!($(this).attr("aria-label"))) {
					var aJ = aL.data.ctx.GetPM(),
					aO = "",
					aN = "",
					aI,
					aK = "",
					aM = SiebelApp.S_App.NewPropertySet();
					if (aL.data.attr === "Id") {
						aK = $(this).closest(".siebui-taskEditRow").attr("Id")
					} else {
						if (aL.data.attr === "DateVal") {
							aK = $(this).attr("DateVal")
						}
					}
					if (aK) {
						aM.SetProperty(aL.data.Input, aK);
						aM.SetProperty("Pane", aL.data.Pane);
						aJ.ExecuteMethod("getTooltip", aM);
						aN = aJ.Get("tooltipMap");
						if (aN) {
							aI = aN.EnumProperties(true);
							while (aI) {
								if (aO !== "") {
									aO = aO + "\n" + String(aN.GetProperty(aI))
								} else {
									aO = String(aN.GetProperty(aI))
								}
								aI = aN.EnumProperties(false)
							}
						}
						$(this).attr("aria-label", aO);
						$(this).attr("title", aO)
					}
				}
			}
			function S(aK) {
				if (!($(this).attr("aria-label"))) {
					var aM = aK.data.ctx.GetPM(),
					aQ = "",
					aO,
					aP = "",
					aN,
					aJ = SiebelApp.S_App.NewPropertySet(),
					aL = $(this).attr("taskId"),
					aI = aM.Get("RecordSet")[$(this).closest(".siebui-gdfRow").attr("id")][aM.Get("RJoinFld")];
					if (aL && aI) {
						aP = aM.ExecuteMethod("getEvent", aI, aL);
						if (aP) {
							if (aP.FI) {
								aJ.SetProperty("FunId", aP.FI)
							} else {
								aJ.SetProperty("ResourceId", aI)
							}
							aJ.SetProperty("BookingId", aL);
							aJ.SetProperty("Pane", "Pane 2");
							aM.ExecuteMethod("getTooltip", aJ);
							aO = aM.Get("tooltipMap");
							if (aO) {
								aN = aO.EnumProperties(true);
								while (aN) {
									if (aQ !== "") {
										aQ = aQ + "\n" + String(aO.GetProperty(aN))
									} else {
										aQ = String(aO.GetProperty(aN))
									}
									aN = aO.EnumProperties(false)
								}
							}
						}
						$(this).attr("aria-label", aQ);
						$(this).attr("title", aQ)
					}
				}
			}
			function ac(aM) {
				var aL = aM.data.ctx,
				aI = 0,
				aJ = aL.GetPM(),
				aN = aM.currentTarget.offsetLeft;
				if (aJ.ExecuteMethod("CanExtendShrinkEvents")) {
					var aK,
					aO = aJ.Get("fx") * aJ.Get("Round Minutes Events") * 60000;
					if (!aO) {
						aO = 10
					}
					$("#s_" + aL.GetAppletId() + "_div").find(".siebui-taskBox.Rsizable").resizable({
						containment : $("#s_" + aL.GetAppletId() + "_div").find("#UGrid"),
						handles : "e,w",
						minWidth : aO,
						start : function (aP, aQ) {},
						stop : function (a4, aZ) {
							var aR,
							a0,
							a3,
							aQ,
							aS = null,
							a9,
							a7,
							a1 = null,
							a6,
							aU,
							aW,
							aY,
							aP,
							a2,
							aT,
							aV = null,
							a5 = null,
							aX = {};
							aU = $(this).closest("div.siebui-gdfRow").attr("Id");
							a2 = aJ.Get("RecordSet")[aU][aJ.Get("RESOURCEHEADER")[0].FLD];
							aU = aJ.Get("RecordSet")[aU][aJ.Get("RJoinFld")];
							aW = $(this).attr("taskId");
							aY = aJ.ExecuteMethod("getEvent", aU, aW);
							aP = aY.FI;
							aR = aZ.position.left;
							aK = aZ.originalPosition.left;
							a7 = new Date(aY.ET);
							a9 = new Date(aY.ST);
							aendDate = new Date(aY.AET);
							astDate = new Date(aY.AST);
							aS = a9.getTime();
							aV = a7.getTime() - a9.getTime();
							a5 = aendDate.getTime() - astDate.getTime();
							var a8 = aJ.Get("TurnTime");
							if (a8 === "Y") {
								if (aZ.size.width > aZ.originalSize.width) {
									a0 = (aZ.size.width - aZ.originalSize.width) - ((aZ.size.width - aZ.originalSize.width) * (a5 - aV)) / (a5 * 2)
								} else {
									a0 = (aZ.size.width - aZ.originalSize.width) - ((aZ.size.width - aZ.originalSize.width) * (a5 - aV)) / (aV * 2)
								}
							} else {
								a0 = aZ.size.width - aZ.originalSize.width
							}
							if (parseInt(aR, 10) !== parseInt(aK, 10)) {
								if (aJ.Get("EndTime")) {
									aS = aL.calcNonContiguousTime(aR)
								} else {
									if (aJ.Get("fx") !== 0) {
										a1 = Math.round(a0 / aJ.Get("fx"))
									}
								}
								aS = aS - a1;
								a9 = new Date(aS);
								a9 = T(a9, aJ.Get("Round Minutes Events"))
							} else {
								if (aJ.Get("EndTime")) {
									a3 = aR * 1 + aZ.size.width * 1;
									aQ = aL.calcNonContiguousTime(a3)
								} else {
									if (aJ.Get("fx") !== 0) {
										a1 = Math.round(a0 / aJ.Get("fx"))
									}
									aQ = aS + aV + a1
								}
								a7 = new Date(aQ);
								a7 = T(a7, aJ.Get("Round Minutes Events"))
							}
							aQ = a7.format("HH:mm:ss");
							aS = a9.format("HH:mm:ss");
							aT = $(this).closest("div.siebui-taskEditUtility");
							aX.FROMRESINDEX = $(aT).attr("id");
							aJ.SetProperty("RevertDate", aX);
							a6 = SiebelApp.S_App.NewPropertySet();
							a6.SetProperty("Resource Id", aU);
							a6.SetProperty("Resource", a2);
							a6.SetProperty("Function Id", aP);
							a6.SetProperty("booking Id", aW);
							a6.SetProperty("Start Date", a9.format("MM/dd/yyyy"));
							a6.SetProperty("Start Time", aS);
							a6.SetProperty("End Time", aQ);
							a6.SetProperty("End Date", a7.format("MM/dd/yyyy"));
							a6.SetProperty("End DTTM", a7.format("MM/dd/yyyy HH:mm:ss"));
							a6.SetProperty("Start DTTM", a9.format("MM/dd/yyyy HH:mm:ss"));
							a6.SetProperty("operation", "ExtendShrink");
							aI = 0;
							aI = aI | (1 << 1);
							aI = aI | (1 << 4);
							a6.SetProperty("PanesToRefresh", aI);
							aJ.SetProperty("PanesToRefresh", aI);
							aJ.SetProperty("InEvent", true);
							aJ.ExecuteMethod("InvokeOperation", a6)
						}
					})
				}
			}
			F.prototype.drillDownHandler = function (aI) {
				var aO = aI.data.ctx,
				aL = aO.GetPM(),
				aS = $(this).attr("data-drilldown-type"),
				aN = null,
				aU = null,
				aX,
				aP,
				aW,
				aJ,
				aM,
				aQ;
				switch (aS) {
				case ("UGrid"):
					SiebelApp.S_App.uiStatus.Busy({
						target : SiebelApp.S_App.GetTargetViewContainer(),
						mask : true
					});
					aX = aL.Get("Activity_DDInfo");
					if (aX) {
						aN = aX["Item Drilldown Name"];
						aU = $(this).attr("data-drilldown-id")
					}
					aL.ExecuteMethod("CustomDrillDown", aO.GetDrilldownPropSet(this, aN, aU));
					SiebelApp.S_App.uiStatus.Free();
					break;
				case ("RGrid"):
					SiebelApp.S_App.uiStatus.Busy({
						target : SiebelApp.S_App.GetTargetViewContainer(),
						mask : true
					});
					aW = $("#s_" + aO.GetAppletId() + "_div").find(".siebui-gdfColHeader").eq($(this).parent().parent().index());
					aN = aW.attr("data-idd-name");
					aU = $(this).attr("data-drilldown-id");
					aL.ExecuteMethod("CustomDrillDown", aO.GetDrilldownPropSet(this, aN, aU));
					SiebelApp.S_App.uiStatus.Free();
					break;
				case ("BAxis"):
					aM = aL.Get("TSDDInfo");
					if (aM) {
						aN = aM["Item Drilldown Name"];
						aU = aM["Item Drilldown Field"];
						aL.ExecuteMethod("CustomDrillDown", aO.GetDrilldownPropSet(this, aN, aU))
					}
					break;
				case ("TAxis"):
					aM = aL.Get("TSDDInfo");
					var aK = $(this).attr("dateval");
					if (aM) {
						aN = aM["Item Drilldown Name"];
						aU = aM["Item Drilldown Field"];
						aL.ExecuteMethod("CustomDrillDown", aO.GetDrilldownPropSet(this, aN, aU, aK))
					}
					break;
				default:
					var aT = aL.Get("DateDrilldown"),
					aR = aL.Get("TST") + ":",
					aV;
					if (aT) {
						aV = aT.substring(aT.indexOf(aR) + aR.length, aT.indexOf(";", aT.indexOf(aR)))
					}
					if (aV) {
						var aK = $(this).attr("dateval");
						aL.ExecuteMethod("RefreshGanttChart", aK, aV, A);
						aO.getGanttDateBar().setNavigationValues()
					}
					break
				}
			};
			F.prototype.GetDrilldownPropSet = function (aK, aJ, aL, aI) {
				if (aJ && aL) {
					propset = CCFMiscUtil_CreatePropSet();
					propset.SetProperty("DrillDownName", aJ);
					propset.SetProperty("DestFieldValue", aL);
					if (aI) {
						propset.SetProperty("DestDateValue", aI)
					}
					return propset
				}
			};
			function Y(aM) {
				var aL = aM ? aM.data.ctx : this,
				aJ = aL.GetPM(),
				aO = aJ.Get("Resource Id"),
				aN = aJ.Get("ResIDtoIndex")[aO];
				if (aM) {
					var aI = $(this).attr("taskid"),
					aK = aJ.Get("ResIDtoIndex")[aI];
					$("#s_" + aL.GetAppletId() + "_div").find(".row" + aN).removeClass("siebui-rowSelected");
					$("#s_" + aL.GetAppletId() + "_div").find(".row" + aK).addClass("siebui-rowSelected");
					aJ.SetProperty("Resource Id", aI)
				} else {
					if (aN !== "undefined") {
						$("#s_" + aL.GetAppletId() + "_div").find(".row" + aN).addClass("siebui-rowSelected")
					}
				}
			}
			function a(aI) {
				var aR = aI.data.ctx,
				aM = aR.GetPM(),
				aW = $(this).scrollLeft() + aI.clientX - $(this).offset().left,
				aV = $(aI.target).closest(".siebui-gdfRow").attr("id"),
				aN = "",
				aT,
				aU,
				aP,
				aL,
				aK,
				aJ,
				aX,
				aO,
				aY,
				aQ = 0;
				if (aV) {
					aN = aM.Get("RecordSet")[aV][aM.Get("RESOURCEHEADER")[0].FLD];
					aY = aM.Get("RecordSet")[aV][aM.Get("RJoinFld")]
				}
				if (aM.Get("EndTime")) {
					aT = new Date(aR.calcNonContiguousTime(aW))
				} else {
					aT = ((aW * (aM.Get(t) - aM.Get(W))) / $("#UGrid").width()) + aM.Get(W)
				}
				aU = new Date(aT);
				aP = aU.getMinutes();
				aL = (parseInt(((aP + 7.5) / 15), 10) * 15);
				aU = new Date(aU.setMinutes(aL, 0));
				aK = aU.format("MM/dd/yyyy");
				aJ = aU.format("HH:mm:ss");
				aX = aU.format("MM/dd/yyyy HH:mm:ss");
				aO = SiebelApp.S_App.NewPropertySet();
				aO.SetProperty("Resource Id", aY);
				aO.SetProperty("Resource", aN);
				aO.SetProperty("Start Date", aK);
				aO.SetProperty("Start Time", aJ);
				aO.SetProperty("Start DTTM", aX);
				aO.SetProperty("operation", "Create Task");
				aQ = 0;
				aQ = aQ | (1 << 1);
				aQ = aQ | (1 << 4);
				aO.SetProperty("PanesToRefresh", aQ);
				aM.SetProperty("PanesToRefresh", aQ);
				aM.SetProperty("InEvent", true);
				var aS = SiebelApp.S_App.GetName();
				if (aS !== "Siebel eDealer") {
					aM.ExecuteMethod("InvokeOperation", aO)
				}
			}
			function V(aJ) {
				var aP = aJ.data.ctx,
				aN = aP.GetPM(),
				aR = $("#s_" + aN.Get("GetFullId") + "_div").find(".siebui-splitBox3"),
				aO = aR.offset(),
				aL = aO.top + aR.height(),
				aQ = null,
				aS = null,
				aI = 10,
				aK = 100,
				aM = 20;
				$(this).draggable({
					containment : $("#s_" + aN.Get("GetFullId") + "_div").find("#UGrid"),
					scrollSensitivity : 1,
					zIndex : 9999,
					drag : function (aT, aU) {
						var aV = false;
						if ((aT.pageY - aO.top) <= aI) {
							aV = true;
							clearInterval(aQ);
							clearInterval(aS);
							aQ = setInterval(function () {
									aR.scrollTop(aR.scrollTop() - aM)
								}, aK)
						}
						if (aT.pageY >= (aL - aI)) {
							aV = true;
							clearInterval(aQ);
							clearInterval(aS);
							aS = setInterval(function () {
									aR.scrollTop(aR.scrollTop() + aM)
								}, aK)
						}
						if (!aV) {
							clearInterval(aQ);
							clearInterval(aS)
						}
					},
					start : function (aV, aW) {
						var aU = $(this).closest("div.siebui-gdfRow").attr("taskId"),
						aT = $(this).closest("div.siebui-gdfRow").attr("Id");
						$(this).draggable("option", "sResId", aU);
						$(this).draggable("option", "resindex", aT);
						$(this).draggable().css({
							"margin-top" : 0
						});
						aN.SetProperty("InEvent", true)
					}
				})
			}
			function aA(aJ) {
				aJ.stopPropagation();
				var aR = SiebelApp.S_App.GetName();
				if (aR === "Siebel eDealer") {
					return
				}
				if ($(this).hasClass("Dragpble")) {
					var aP = aJ.data.ctx,
					aM = aP.GetPM(),
					aW = $(this).attr("taskId"),
					aS = $(aJ.target).closest(".siebui-gdfRow").attr("id"),
					aV = aS,
					aQ = 0;
					if (aW) {
						if (aS) {
							aS = aM.Get("RecordSet")[aS][aM.Get("RJoinFld")];
							var aU = aM.ExecuteMethod("getEvent", aS, aW);
							var aO = aU.FI;
							var aN = aU.GS;
							var aK = aU.FSTP;
							var aL = aM.Get("RecordSet")[aV][aM.Get("RESOURCEHEADER")[0].FLD];
							var aI = SiebelApp.S_App.NewPropertySet();
							var aT = SiebelApp.S_App.NewPropertySet();
							aI.SetProperty("booking Id", aW);
							aI.SetProperty("Function Id", aO);
							aI.SetProperty("Resource Id", aS);
							aI.SetProperty("Resource", aL);
							aI.SetProperty("Inventory Status", aN);
							aI.SetProperty("Function Space Type", aK);
							aI.SetProperty("operation", "Show Task Details");
							aQ = 0;
							aQ = aQ | (1 << 1);
							aQ = aQ | (1 << 4);
							aI.SetProperty("PanesToRefresh", aQ);
							aM.SetProperty("PanesToRefresh", aQ);
							aM.SetProperty("InEvent", true);
							aM.ExecuteMethod("InvokeOperation", aI)
						}
					}
				}
			}
			function E(aK) {
				var aJ = aK.data.ctx,
				aI = aJ.GetPM();
				$("#s_" + aJ.GetAppletId() + "_div").find(".siebui-taskEditUtility").droppable({
					drop : function (a2, aY) {
						var aP = null,
						aQ = $(this).attr("Id"),
						aT = aY.draggable.attr("taskId"),
						a0,
						aS,
						a3,
						a7,
						aR,
						aL,
						a6,
						aN,
						aW,
						aO,
						a1 = aI.Get("RecordSet")[aQ][aI.Get("RESOURCEHEADER")[0].FLD],
						aU = 0,
						aZ = aI.Get(W),
						aX = {},
						a5,
						aV,
						aM = $(this).attr("taskid");
						if (aI.Get("EndTime")) {
							aP = new Date(aJ.calcNonContiguousTime(aY.position.left))
						} else {
							aP = new Date(Math.round(((aY.position.left * (aI.Get(t) - aZ)) / $("#UGrid").width()) + aZ));
							var a4 = aI.Get("TurnTime");
							if (a4 === "Y") {
								OResId = $(aY.draggable).draggable("option", "sResId");
								a6 = aI.ExecuteMethod("getEvent", OResId, aT);
								aP = new Date(aP.getTime() + (new Date(a6.ST).getTime() - new Date(a6.AST).getTime()))
							}
						}
						a0 = (parseInt(((aP.getMinutes() + 7.5) / 15), 10) * 15);
						aP = new Date(aP.setMinutes(a0, 0));
						aS = aP.format("MM/dd/yyyy");
						a3 = aP.format("HH:mm:ss");
						a7 = aP.format("MM/dd/yyyy HH:mm:ss");
						aR = SiebelApp.S_App.NewPropertySet();
						aI.SetProperty("InEvent", true);
						aL = $(aY.draggable).draggable("option", "sResId");
						a5 = $(aY.draggable).draggable("option", "resindex");
						a6 = aI.ExecuteMethod("getEvent", aL, aT);
						aX.FROMRESINDEX = a5;
						aX.TORESINDEX = aQ;
						aI.SetProperty("RevertDate", aX);
						aN = a6.FI;
						aW = a6.DDID;
						aO = new Date(aP.getTime() + (new Date(a6.ET).getTime() - new Date(a6.ST).getTime()));
						aR.SetProperty("Resource Id", aM);
						aR.SetProperty("booking Id", aT);
						aR.SetProperty("Resource", a1);
						aR.SetProperty("Start Date", aS);
						aR.SetProperty("Start Time", a3);
						aR.SetProperty("Start DTTM", a7);
						aR.SetProperty("End Time", aO.format("HH:mm:ss"));
						aR.SetProperty("End DTTM", aO.format("MM/dd/yyyy HH:mm:ss"));
						aR.SetProperty("End Date", aO.format("MM/dd/yyyy"));
						aR.SetProperty("Function Id", aN);
						aR.SetProperty("Quote Id", aW);
						aR.SetProperty("Pre Resource Id", aL);
						aR.SetProperty("operation", "DragnDrop");
						aU = 0;
						aU = aU | (1 << 1);
						aU = aU | (1 << 4);
						aR.SetProperty("PanesToRefresh", aU);
						aI.SetProperty("PanesToRefresh", aU);
						aI.ExecuteMethod("InvokeOperation", aR)
					}
				})
			}
			F.prototype.calcNonContiguousTime = function (aI) {
				var aL = this.GetPM(),
				aK = aL.Get("PixelsPerUnit"),
				aN = aL.Get("TDays"),
				aM = aL.Get("StartTime"),
				aJ = aL.Get("EndTime");
				absPixels = aK * $("#UGrid").width();
				if (absPixels) {
					noOfUnits = parseInt(aI / absPixels)
				}
				timePixels = aI % absPixels;
				startDay = aL.Get(W) + noOfUnits * aN;
				if (absPixels) {
					startTime = parseInt(aL.Get("StartTime") + timePixels / absPixels * aL.Get("AxisDuration"), 10)
				}
				startDay = startDay + startTime;
				return parseInt(startDay, 10)
			};
			F.prototype.createIconInfo = function (aN) {
				var aK = "",
				aJ = this.GetPM().Get(L)[H],
				aI;
				if (aN.Icon) {
					var aM = aN.Icon.split(",");
					for (var aL = 0; aL < aM.length; aL++) {
						if (aJ && aJ[aM[aL]]) {
							aI = aJ[aM[aL]];
							aK = aK + "<span class='" + aI + "'></span>"
						}
					}
				}
				return aK
			};
			function au(aJ) {
				var aK = 20,
				aI = Number(aJ.Get("TotalHPages"), 10) > 0 ? 15 : 0;
				return Math.floor((($("#s_" + this.GetAppletId() + "_div").find(".siebui-splitBox1").height() - aI) / aK), 10)
			}
			function ao() {
				var aI = 0,
				aJ = this.GetPM(),
				aL = 0,
				aN = $("#" + this.GetCustCtrlName()),
				aK = $(".siebui-vSplitBar"),
				aM = 21;
				if (aK.length > 0) {
					aI = $("#UGrid").width();
					aL = aI / (aJ.Get(t) - aJ.Get(W));
					aJ.SetProperty("MinGanttsize", aI);
					aJ.SetProperty("fx", aL)
				}
			}
			function aG(aJ) {
				$.splittify.splitterBar = $(this);
				var aL = 0,
				aI = SiebelApp.S_App.NewPropertySet(),
				aR = aJ.data.ctx,
				aO = aR.GetPM(),
				aM = $("#s_" + aR.GetAppletId() + "_div"),
				aK,
				aN = $(".siebui-splitBox3").scrollLeft(),
				aQ = 0,
				aP = $(".siebui-splitBox3").width();
				reclen = aO.Get("RecordSet") ? aO.Get("RecordSet").length : 0;
				$("body").unselectable().bind("mousemove", function (aV) {
					var aY = $.splittify.splitterBar;
					var aZ = aV.pageX - aY.parent().offset().left;
					var a0 = aY.parent().width();
					var aU = aO.Get("ScrollbarWidth");
					var a1 = parseInt($(".siebui-resourceContainer").css("width"));
					if (aZ > 0 && aZ < a1) {
						aL = a0;
						var aT = parseFloat(((aZ / a0) * 100), 2);
						var aX = parseFloat(((aZ + aY.width()) / a0) * 100, 2);
						var aS = parseFloat(((a0 - (aZ + aY.width())) / a0) * 100, 2);
						var aW = aU / a0 * 100;
						aY.css({
							left : aT + "%"
						});
						aM.find(".siebui-resourceContainer").css({
							width : aT + "%"
						});
						if (aR.getHasWidthbuffer() == 1) {
							aM.find(".siebui-splitBox2").css({
								left : aX + "%",
								width : (aS - aW) + "%"
							})
						} else {
							aM.find(".siebui-splitBox2").css({
								left : aX + "%",
								width : (aS) + "%"
							})
						}
						aM.find(".siebui-splitBox3").css({
							left : aX + "%",
							width : aS + "%"
						});
						aQ = $(".siebui-splitBox3").width();
						$(".siebui-splitBox3").scrollLeft(aN * aQ / aP)
					}
				}).bind("mouseup", function (aT) {
					$(this).unbind("mousemove").unbind("mouseup").clearUnselectable();
					var aS = aL;
					ao.call(aR);
					aK = $.splittify.splitterBar.offset().left - $("#" + aR.GetCustCtrlName()).offset().left;
					aO.SetProperty(aF, aK);
					aI.SetProperty("splPos", aK);
					aO.ExecuteMethod("saveUserPref", aI);
					delete $.splittify.splitterBar
				})
			}
			function ay(aV) {
				var aN = this.GetPM();
				var aI = $("#" + this.GetCustCtrlName());
				var aT = aI.innerWidth();
				var aO = aN.Get("Splitter Position");
				var aQ = aN.Get("ScrollbarWidth");
				var aJ = $("#s_" + this.GetAppletId() + "_div");
				var aU = parseInt($(".siebui-resourceContainer").css("width"));
				var aW = aJ.find(".siebui-vSplitBar");
				var aL = aW.width();
				var aP = aJ.find(".siebui-gdfCell");
				if (aO === "") {
					if (aP.length > 0) {
						aO = aP.css("width")
					} else {
						aO = ab
					}
				} else {
					aO = Math.min(aO, aU)
				}
				var aM = parseFloat(((parseInt(aO, 10) / aT) * 100), 2);
				var aS = parseFloat((((parseInt(aO, 10) + aL) / aT) * 100), 2);
				var aR = aQ / aT * 100;
				var aK = $("#RGrid");
				aW.css({
					left : aM + "%"
				});
				if ((aK.get(0).scrollHeight > aK.get(0).offsetHeight)) {
					aJ.find(".siebui-splitBox2").css({
						left : aS + "%",
						width : (100 - aS - aR) + "%"
					});
					this.setHasWidthbuffer(1)
				} else {
					aJ.find(".siebui-splitBox2").css({
						left : aS + "%",
						width : (100 - aS) + "%"
					});
					this.setHasWidthbuffer(0)
				}
				aJ.find(".siebui-splitBox3").css({
					left : aS + "%",
					width : (100 - aS) + "%"
				})
			}
			function ai(aJ) {
				var aQ = aJ.data.ctx,
				aN = aQ.GetPM(),
				aI = SiebelApp.S_App.NewPropertySet(),
				aP = ".siebui-ResCol" + aQ.GetAppletId() + $(this).attr("ColNum"),
				aL = $("#s_" + aQ.GetAppletId() + "_div"),
				aK = aJ.data.ctx.getResColCount(),
				aO = "",
				aM = $(".siebui-gdfColHeader").css("min-width"),
				aR = $(".siebui-gdfColHeader").css("max-width");
				$(this).resizable({
					alsoResize : aP,
					handles : "e",
					minWidth : aM,
					maxWidth : aR,
					start : function (aS, aT) {},
					stop : function (aT, aU) {
						$(aP).css("height", "");
						for (var aS = 0; aS < aK; aS++) {
							aO = aO + aL.find("#siebui-gdfColHeader" + aS).width() + ":"
						}
						aN.SetProperty(az, aO);
						aI.SetProperty("colWidth", aO);
						aN.ExecuteMethod("saveUserPref", aI)
					}
				})
			}
			function x() {
				$(".siebui-splitBox3").scrollTop(this.GetPM().Get("VScrollPos"))
			}
			F.prototype.SetHScrollPos = function () {
				var aJ = this.GetPM(),
				aI = new Date(aJ.Get(aB)),
				aL = String(aJ.Get(v)),
				aK = 0;
				aJ.ExecuteMethod("setHoursFrom", aI, aL);
				aK = (aI.getTime() - aJ.Get(W)) / (aJ.Get(t) - aJ.Get(W));
				aK = aK * aJ.Get("MinGanttsize");
				$(".siebui-splitBox3").scrollLeft(aK)
			};
			function p() {
				if (this.getGanttDateBar() != null) {
					var aI = this.GetPM();
					$("#s_" + this.GetAppletId() + "_div").find("#ganttDateLbl").html(aI.ExecuteMethod("getDateRange", ""));
					$("#s_" + this.GetAppletId() + "_div").find("#ganttdatePicker").val(aI.Get(aB))
				}
			}
			function c() {
				var aL = this.GetPM(),
				aK,
				aJ,
				aM = aL.Get("ShowLegend"),
				aN = $("#" + this.GetCustCtrlName()),
				aI = $("#" + this.GetAppletId() + "_colorcodelegend");
				this.getGanttLegendBar().ShowLegends(aM);
				aK = aN.css("height");
				aJ = aI.css("height");
				aK = aK ? Number(aK.substr(0, aK.length - 2)) : 0;
				aJ = aJ ? Number(aJ.substr(0, aJ.length - 2)) : 0;
				if (aM) {
					aN.css("height", aK - aJ)
				} else {
					aN.css("height", aK + aJ)
				}
			}
			function aD() {
				var aI = this.GetPM(),
				aJ = aI.Get("expcolpse");
				ar.call(this, aJ)
			}
			function C() {
				var aJ = this.GetPM(),
				aI = aJ.Get("GetControls"),
				aL = aJ.Get("TST"),
				aK = aI[aL];
				if (aK) {
					$("#s_" + this.GetAppletId() + "_div").find(".siebui-buttonPressed").removeClass("siebui-buttonPressed");
					$("#s_" + this.GetAppletId() + "_div").find("#" + aK.GetInputName() + "_Ctrl").addClass("siebui-buttonPressed")
				}
				aI = null
			}
			F.prototype.renderTimeScale = function () {
				var aY = this.GetPM(),
				aU,
				aI,
				bW,
				a3,
				bL,
				aO,
				bg,
				bf,
				aN = 0,
				b3,
				bC,
				aK,
				a6,
				b1,
				bT,
				bi,
				aS,
				bE,
				bM,
				bA,
				bv,
				bc,
				a7,
				bO,
				aX,
				a1,
				bI,
				by,
				bJ = 0,
				bm = '<div class = "siebui-ganttTable">',
				bu = '<div class = "siebui-ganttHead1',
				bt = '<div class = "siebui-ganttHead2',
				bq,
				aP,
				bN = 3600000,
				a4 = aY.Get(l),
				a8 = a4 ? 1 : 0,
				bQ = aY.Get(ax),
				aV = aY.Get(r),
				bp,
				aR = 60,
				a0 = "",
				be,
				aT = aY.Get(m),
				bR = aY.Get("StartTime") / (60 * 60 * 1000),
				bd = aY.Get("EndTime") / (60 * 60 * 1000),
				bP = aY.Get("FinalWeekDays"),
				bF = aY.Get(W),
				bV = aY.Get(t),
				bj = aY.Get("UserPrefWDS"),
				bK,
				bo = 0,
				bU = "",
				aW,
				b4,
				bD,
				bx,
				aM,
				a5,
				bB,
				aJ = 0,
				bS = 0,
				ba = aY.Get("TotalHPages"),
				bw = aY.Get("isDispatchBoard");
				if (a8) {
					bq = '<div class = "siebui-ganttHead3 siebui-threeAxis">';
					bu += ' siebui-threeAxis">';
					bt += ' siebui-threeAxis">';
					a1 = 100 / 3 + "%"
				} else {
					bu += ' siebui-twoAxis">';
					bt += ' siebui-twoAxis">';
					a1 = "50%"
				}
				switch (Number(aY.Get(P))) {
				case (X):
					aU = new Date(bF);
					bo = 5 * aY.Get("TotalHPages");
					if (!bQ) {
						break
					}
					bC = bQ.length;
					while (aU.getTime() <= bV && aN < bo) {
						bL = aU.getTime();
						bO = aU.format("MM/dd/yyyy");
						bp = aV[bO];
						bK = this.IsWeekend(aU);
						aI = (1 / bo) * 100;
						bu += this.createTimeScaleCell(new Date(bL), "DDD, MMM D", 0, aI + "%", 0, i, bp, bK, 0, bO);
						if (a8) {
							bU = "";
							for (be in a4[bO]) {
								if (bU) {
									bU = bU + "/" + a4[bO][be]
								} else {
									bU = a4[bO][be]
								}
							}
							bq += this.createBAxisCell(bU, aI + "%", 0, i, bO)
						}
						bc = 0;
						bi = "";
						if (aJ == 0) {
							bI = (parseInt((bQ[bc].ST).substr(0, 2)) * 60 * 60) + (parseInt((bQ[bc].ST).substr(3, 2)) * 60) + (parseInt((bQ[bc].ST).substr(6, 2)));
							bJ = bI / (24 * 60 * 60) * 100
						}
						bi += '<div style="width: ' + aI * ba + "% ; left:" + aJ + "% ; position: absolute; height:" + a1 + ';" class="siebui-ganttInnerTbl">';
						aJ += aI * ba;
						if (bI != 0) {
							bi += this.createTimeScaleCell(bQ[bC - 1].NM.substr(0, 1), "", 0, bJ + "%", "0%")
						}
						by = bJ;
						while (bc < bC) {
							aP = (bQ[bc].DUR) / 3600;
							if (bI != 0 && bc == bC - 1) {
								aP = (bQ[bc].DUR - bI) / 3600
							} else {
								aP = (bQ[bc].DUR) / 3600
							}
							a3 = aP / 24 * 100;
							bi += this.createTimeScaleCell(bQ[bc].NM.substr(0, 1), "", 0, a3 + "%", by + "%");
							bc = bc + 1;
							by += a3
						}
						bi += "</div>";
						bt += bi;
						aN++;
						aU.setDate(aU.getDate() + 7)
					}
					break;
				case (aE):
					var bz = 0;
					aU = new Date(bF);
					bL = aU.getTime();
					a5 = new Date(aU);
					noOfCells = 31 * ba;
					aN = 0;
					a3 = 100 / 31;
					while (aN < noOfCells) {
						if (bP && bP.indexOf(aU.getDay()) !== -1) {
							bK = this.IsWeekend(aU);
							bO = aU.format("MM/dd/yyyy");
							bp = aV[bO];
							bt += this.createTimeScaleCell(aU, "D", 0, a3 + "%", aJ + "%", i, bp, bK, 0, bO);
							if (a8) {
								bq += this.createBAxisCell((a4[bO] ? a4[bO].FLD1 : ""), a3 + "%", aJ + "%", i, bO)
							}
							aJ += a3;
							aN++;
							bz++
						}
						a5.setDate(aU.getDate() + aY.Get(Q));
						if ((aU.getMonth() != a5.getMonth()) || (aN === noOfCells)) {
							bu += this.createTimeScaleCell(aU, "MMMM", 0, ((a3 * bz)) + "%", bS + "%");
							bz = 0;
							bS = aJ
						}
						aU.setDate(aU.getDate() + aY.Get(Q))
					}
					break;
				case (at): //интервал 30 минут
					aU = new Date(bF);
					var bs = 0,
					bn = 0,
					bb,
					b2;
					bb = new Date(aU.getTime());
					b2 = new Date();
					b2.setDate(bb.getDate() + 1);
					if (bR < bd) {
						bn = bd - bR
					} else {
						bn = 24 - (bR - bd)
					}
					if (bn === 0 || isNaN(bn)) {
						bn = 48 //старое значение 24. Поправлено в рамках LETO-6909 для построения сетки с интервалом 30 мин>>dnyudkchiev.
					}
					while (aU.getTime() < bV) {
						bL = aU.getTime();
						bO = aU.format("MM/dd/yyyy");
						bK = this.IsWeekend(aU);
						aU.setDate(aU.getDate() + 1);
						bE = new Date(bL);
						aI = 2 * 100;
						if (aU.getTime() < bV) {
							aS = aU.getTime()
						} else {
							aS = bV
						}
						bp = aV[bO];
						if (bP.indexOf(new Date(bL).getDay()) !== -1) {
							bu += this.createTimeScaleCell(new Date(bL), "DDDD, MMMM D", 0, aI + "%", bS + "%", i, bp, bK);
							if (a8) {
								bU = "";
								for (be in a4[bO]) {
									if (bU) {
										bU = bU + "/" + a4[bO][be]
									} else {
										bU = a4[bO][be]
									}
								}
								bq += this.createBAxisCell(bU, aI + "%", bS + "%", i, bO)
							}
							bS += aI
						} else {
							continue
						}
						a3 = (0.5) * aI / bn;
						bi = "";
						while (bE.getTime() < aS) {
							bD = bE.getHours();
							bx = bE.getMinutes();
							bM = bD * aR + bx;
							bA = aS - bE.getTime();
							if (aY.Get(Z)) {
								aX = aY.Get(Z)[bD]
							}
							if (bM % ((0.5) * aR) !== 0 || bA < ((0.5) * bN)) {
								if (bM % ((0.5) * aR) !== 0) {
									a7 = ((0.5) * aR) - (bM % ((0.5) * aR))
								} else {
									a7 = bA / 60000
								}
								bv = (a7 / ((0.5) * aR) * a3);
								bi += this.createTimeScaleCell(bE, "h:mmp", 0, bv + "%", 0, 0, 0, 0, aX);
								bE.setTime(bE.getTime() + (a7 * aR * 1000))
							} else {
								if (bw === "TRUE") {
									if (bR != "" && bd != "") {
										if (bE.getHours() >= bR && bE.getHours() < bd) {
											bi += this.createTimeScaleCell(bE.format("h:mm a"), "", 0, a3 + "%", aJ + "%", 0, 0, 0, aX);
											aJ += a3
										}
									} else {
										if (bR != "" && bd === "") {
											if (bE.getHours() >= bR) {
												bi += this.createTimeScaleCell(bE.format("h:mm a"), "", 0, a3 + "%", aJ + "%", 0, 0, 0, aX);
												aJ += a3
											}
										} else {
											bi += this.createTimeScaleCell(bE.format("h:mm a"), "", 0, a3 + "%", aJ + "%", 0, 0, 0, aX);
											aJ += a3
										}
									}
								} else {
									bi += this.createTimeScaleCell(bE.format("HH:mm"), "", 0, a3 + "%", aJ + "%", 0, 0, 0, aX);
									aJ += a3
								}
								if (bs === 0) {
									bE.setMinutes(30);
									bs++
								} else {
									bE.setHours(bE.getHours() + 1);
									bE.setMinutes(0);
									bs = 0
								}
							}
						}
						bt += bi
					}
					break;
				case (j):  //15 минут
					aU = new Date(bF);
					var bs = 1,
					bn = 0,
					bb,
					b2;
					bb = new Date(aU.getTime());
					b2 = new Date();
					b2.setDate(bb.getDate() + 1);
					if (bR < bd) {
						bn = bd - bR
					} else {
						bn = 24 - (bR - bd)
					}
					if (bn === 0 || isNaN(bn)) {
						bn = 96 //старое значение 24. Поправлено в рамках LETO-6909 для построения сетки с интервалом 15 мин>>dnyudkchiev.
					}
					while (aU.getTime() < bV) {
						bL = aU.getTime();
						bO = aU.format("MM/dd/yyyy");
						bK = this.IsWeekend(aU);
						aU.setDate(aU.getDate() + 1);
						bE = new Date(bL);
						aI = 4 * 100;
						if (aU.getTime() < bV) {
							aS = aU.getTime()
						} else {
							aS = bV
						}
						bp = aV[bO];
						if (bP.indexOf(new Date(bL).getDay()) !== -1) {
							bu += this.createTimeScaleCell(new Date(bL), "DDDD, MMMM D", 0, aI + "%", bS + "%", i, bp, bK);
							if (a8) {
								bU = "";
								for (be in a4[bO]) {
									if (bU) {
										bU = bU + "/" + a4[bO][be]
									} else {
										bU = a4[bO][be]
									}
								}
								bq += this.createBAxisCell(bU, aI + "%", bS + "%", i, bO)
							}
							bS += aI
						} else {
							continue
						}
						a3 = (0.25) * aI / bn;
						bi = "";
						while (bE.getTime() < aS) {
							bD = bE.getHours();
							bx = bE.getMinutes();
							bM = bD * aR + bx;
							bA = aS - bE.getTime();
							if (aY.Get(Z)) {
								aX = aY.Get(Z)[bD]
							}
							if (bM % ((0.25) * aR) !== 0 || bA < ((0.25) * bN)) {
								if (bM % ((0.25) * aR) !== 0) {
									a7 = ((0.25) * aR) - (bM % ((0.25) * aR))
								} else {
									a7 = bA / 60000
								}
								bv = (a7 / ((0.25) * aR) * a3);
								bi += this.createTimeScaleCell(bE, "h:mmp", 0, bv + "%", 0, 0, 0, 0, aX);
								bE.setTime(bE.getTime() + (a7 * aR * 1000))
							} else {
								if (bw === "TRUE") {
									if (bR != "" && bd != "") {
										if (bE.getHours() >= bR && bE.getHours() < bd) {
											bi += this.createTimeScaleCell(bE.format("h:mm a"), "", 0, a3 + "%", aJ + "%", 0, 0, 0, aX);
											aJ += a3
										}
									} else {
										if (bR != "" && bd === "") {
											if (bE.getHours() >= bR) {
												bi += this.createTimeScaleCell(bE.format("h:mm a"), "", 0, a3 + "%", aJ + "%", 0, 0, 0, aX);
												aJ += a3
											}
										} else {
											bi += this.createTimeScaleCell(bE.format("h:mm a"), "", 0, a3 + "%", aJ + "%", 0, 0, 0, aX);
											aJ += a3
										}
									}
								} else {
									bi += this.createTimeScaleCell(bE.format("HH:mm"), "", 0, a3 + "%", aJ + "%", 0, 0, 0, aX);
									aJ += a3
								}
								if (bs < 4) {
									bE.setMinutes(15 * bs);
									bs++
								} else {
									bE.setHours(bE.getHours() + 1);
									bE.setMinutes(0);
									bs = 1
								}
							}
						}
						bt += bi
					}
					break;
				case (g):
					aU = new Date(bF);
					var br = new Date(bF);
					var a2 = new Date(br);
					var aZ;
					var bh = 0;
					br.setDate(1);
					a2.setDate(br.getDate() - 1);
					a2.setHours(23, 59, 59, 999);
					a2.setFullYear(a2.getFullYear() + 1);
					if (aU.getDate() > 1) {
						bh = 1
					}
					a3 = (100 / (12 + bh)) * aY.Get("TotalHPages");
					while (aU.getTime() < bV) {
						bt += this.createTimeScaleCell(aU, "MMMM", 0, a3 + "%");
						if (aU.getMonth() == 11) {
							aU = new Date(aU.getFullYear() + 1, 0, 1)
						} else {
							aU = new Date(aU.getFullYear(), aU.getMonth() + 1, 1)
						}
						if (br.getMonth() == aU.getMonth()) {
							aZ = new Date(aU);
							aZ.setDate(aZ.getDate() - 1);
							aW = ae.GetStringFromDateTime(br.format(aa), o, "MMMM D YYYY") + " - " + ae.GetStringFromDateTime(aZ.format(aa), o, "MMMM D YYYY");
							bu += this.createTimeScaleCell(aW, "", 0, 12 * a3 + "%");
							br = new Date(aU)
						}
					}
					break;
				case (aj):
					var a9 = 1,
					b0 = 0,
					br,
					aZ,
					aL;
					var bY = new Date(bF);
					aU = new Date(bF);
					if ((aU.getDate() < 3 && aU.getMonth() == 0) || (aU.getDate() > 29 && aU.getMonth() == 11)) {
						b0 = 1
					}
					a3 = 100 / (52 * aY.Get("TotalHPages") + b0);
					br = new Date(bF);
					while ((aU.getTime() < bV)) {
						bK = this.IsWeekend(aU);
						bY.setDate(aU.getDate() + 6);
						bt += this.createTimeScaleCell(a9, "", 0, a3 + "%", 0, i, bp, bK);
						if (a8) {
							bU = "";
							for (be in a4[bO]) {
								if (bU) {
									bU = bU + "/" + a4[bO][be]
								} else {
									bU = a4[bO][be]
								}
							}
							bq += this.createBAxisCell(bU, (4 * a3) + "%", 0, i, bO)
						}
						aU.setDate(aU.getDate() + 7);
						a9++;
						if (a9 > 52) {
							a9 = 1;
							aL = aU.getDate();
							if (aL < 30) {
								aU.setDate(aU.getDate() + 1)
							}
							aZ = new Date(aU);
							aZ.setDate(aZ.getDate() - 1);
							aW = ae.GetStringFromDateTime(br.format(aa), o, "MMMM D YYYY") + " - " + ae.GetStringFromDateTime(aZ.format(aa), o, "MMMM D YYYY");
							bu += this.createTimeScaleCell(aW, "", 0, 52 * a3 + "%");
							br = new Date(aU);
							br.setDate(br.getDate() + 1)
						}
					}
					break;
				case (ah):
					aU = new Date(bF);
					bL = aU.getTime();
					noOfCells = 5 * aY.Get("TotalHPages");
					a3 = 100 / noOfCells;
					while (aU.getTime() < bV && aN < noOfCells) {
						aU.setDate(1);
						aU.setMonth(aU.getMonth() + 1);
						if (aU.getTime() < bV) {
							bW = Math.ceil((aU.getTime() - bL) / (bN * 24 * aY.Get(Q)));
							aN += bW
						} else {
							bW = noOfCells - aN
						}
						bu += this.createTimeScaleCell(new Date(bL), "MMMM", 0, bW * a3 + "%");
						if (a8) {
							bU = "";
							for (be in a4[bO]) {
								if (bU) {
									bU = bU + "/" + a4[bO][be]
								} else {
									bU = a4[bO][be]
								}
							}
							bq += this.createBAxisCell(bU, (bW * a3) + "%", 0, i, bO)
						}
						bL += (bW * bN * 24 * 7)
					}
					b3 = "DDD DD";
					aU = new Date(bF);
					aN = 0;
					while (++aN <= noOfCells) {
						bK = this.IsWeekend(aU);
						bO = aU.format("MM/dd/yyyy");
						bp = aV[bO];
						bt += this.createTimeScaleCell(aU, b3, 0, a3 + "%", 0, i, bp, bK, 0, bO);
						aU.setDate(aU.getDate() + aY.Get(Q))
					}
					break;
				case (I):
					aU = new Date(bF);
					bL = aU.getTime();
					noOfCells = 14 * aY.Get("TotalHPages");
					a3 = 100 / noOfCells;
					while (aU.getTime() < bV && aN < noOfCells) {
						aU.setDate(1);
						aU.setMonth(aU.getMonth() + 1);
						if (aU.getTime() < bV) {
							bW = Math.ceil((aU.getTime() - bL) / (bN * 24 * aY.Get(Q)));
							aN += bW
						} else {
							bW = noOfCells - aN
						}
						bu += this.createTimeScaleCell(new Date(bL), "MMMM", 0, bW * a3 + "%");
						bL += (bW * bN * 24 * 7)
					}
					b3 = "DDD DD";
					aU = new Date(bF);
					aN = 0;
					while (++aN <= noOfCells) {
						bK = this.IsWeekend(aU);
						bO = aU.format("MM/dd/yyyy");
						bp = aV[bO];
						bt += this.createTimeScaleCell(aU, b3, 0, a3 + "%", 0, i, bp, bK, 0, bO);
						if (a8) {
							bU = "";
							for (be in a4[bO]) {
								if (bU) {
									bU = bU + "/" + a4[bO][be]
								} else {
									bU = a4[bO][be]
								}
							}
							bq += this.createBAxisCell(bU, bW * a3 + "%", 0, i, bO)
						}
						aU.setDate(aU.getDate() + aY.Get(Q))
					}
					break;
				case (y):
				case (n):
				case (f):
					var bn = 0,
					bb,
					b2;
					aU = new Date(bF);
					bb = new Date(aU.getTime());
					b2 = new Date();
					b2.setDate(bb.getDate() + 1);
					if (bR < bd) {
						bn = bd - bR
					} else {
						bn = 24 - (bR - bd)
					}
					if (bn === 0 || isNaN(bn)) {
						bn = 24
					}
					while (aU.getTime() < bV) {
						bL = aU.getTime();
						bO = aU.format("MM/dd/yyyy");
						bK = this.IsWeekend(aU);
						aU.setDate(aU.getDate() + 1);
						bE = new Date(bL);
						if (aU.getTime() < bV) {
							aS = aU.getTime()
						} else {
							aS = bV
						}
						aI = 100;
						bp = aV[bO];
						if (bP.indexOf(bE.getDay()) !== -1) {
							bu += this.createTimeScaleCell(new Date(bL), "DDDD, MMMM D", 0, aI + "%", bS + "%", i, bp, bK, 0, bO);
							if (a8) {
								bU = "";
								for (be in a4[bO]) {
									if (bU) {
										bU = bU + "/" + a4[bO][be]
									} else {
										bU = a4[bO][be]
									}
								}
								bq += this.createBAxisCell(bU, aI + "%", aJ + "%", i, bO)
							}
							bS += aI
						} else {
							continue
						}
						a3 = aY.Get(Q) * aI / bn;
						bi = '<div style="width:' + aI / ba + '%;" class="siebui-ganttInnerTblDH">';
						if (bw === "TRUE") {
							while (bE.getTime() < aS) {
								if ((bR == "" || bE.getHours() >= bR) && (bd == "" || bE.getHours() < bd)) {
									bi += this.createTimeScaleCell(bE, "h:mmp", 0, a3 + "%", aJ + "%", 0, 0, 0, aX);
									aJ += a3
								}
								bE.setUTCHours(bE.getUTCHours() + aY.Get(Q))
							}
						} else {
							while (bE.getTime() < aS) {
								bi += this.createTimeScaleCell(bE.format("HH:mm"), "", 0, a3 + "%", aJ + "%", 0, 0, 0, aX);
								bE.setUTCHours(bE.getUTCHours() + aY.Get(Q));
								aJ += a3
							}
						}
						bi += "</div>";
						bt += bi
					}
					break;
				case (aq):
					aU = new Date(aY.Get(W));
					if (!bQ) {
						break
					}
					bC = bQ.length;
					while (aU.getTime() < bV) {
						bL = aU.getTime();
						bO = aU.format("MM/dd/yyyy");
						bE = new Date(bL);
						bK = this.IsWeekend(aU);
						aU.setDate(aU.getDate() + 1);
						aS = aU.getTime();
						aI = (aU.getTime() - bL) / (bV - aY.Get(W)) * 100;
						bp = aV[bO];
						bu += this.createTimeScaleCell(new Date(bL), "DDDD, MMMM D", 0, aI + "%", 0, i, bp, bK, 0, bO);
						if (a8) {
							bU = "";
							for (be in a4[bO]) {
								if (bU) {
									bU = bU + "/" + a4[bO][be]
								} else {
									bU = a4[bO][be]
								}
							}
							bq += this.createBAxisCell(bU, aI + "%", 0, i, bO)
						}
						bc = 0;
						bi = "";
						if (aJ == 0) {
							bI = (parseInt((bQ[bc].ST).substr(0, 2)) * 60 * 60) + (parseInt((bQ[bc].ST).substr(3, 2)) * 60) + (parseInt((bQ[bc].ST).substr(6, 2)));
							if (bI != 0) {
								aJ = bI / (bV - aY.Get(W)) * 100 * 1000;
								bi = '<div style="width:' + (aJ * 100 / aI) + "% ; left: 0% ; position: absolute; height:" + a1 + ';" class="siebui-ganttInnerTbl">';
								bi += this.createTimeScaleCell(bQ[bC - 1].NM, "", 0, "100%", "0%");
								bi += "</div>"
							}
						}
						bi += '<div style="width:' + aI * ba + "% ; left:" + (aJ * 100 / aI) + "% ; position: absolute; height:" + a1 + ';" class="siebui-ganttInnerTbl">';
						by = 0;
						while (bE.getTime() < aS) {
							aP = (bQ[bc].DUR) / 3600;
							if (aU.getTime() >= bV && bI != 0 && bc == bC - 1) {
								a3 = (bQ[bc].DUR - bI) / (bV - aY.Get(W)) * 100 * 1000
							} else {
								a3 = bQ[bc].DUR / (bV - aY.Get(W)) * 100 * 1000
							}
							bi += this.createTimeScaleCell(bQ[bc].NM, "", 0, (a3 * 100 / aI) + "%", by * 100 / aI + "%");
							bc = (bc + 1) % bC;
							bE.setHours(bE.getHours() + aP);
							aJ += a3;
							by += a3
						}
						bi += "</div>";
						bt += bi
					}
					break;
				case (k):
					aU = new Date(aY.Get(W));
					if (!bQ) {
						break
					}
					bC = bQ.length;
					while (aU.getTime() < bV) {
						bL = aU.getTime();
						bO = aU.format("MM/dd/yyyy");
						bK = this.IsWeekend(aU);
						aU.setDate(aU.getDate() + 1);
						aI = (aU.getTime() - bL) / (bV - aY.Get(W)) * 100;
						bp = aV[bO];
						bu += this.createTimeScaleCell(new Date(bL), "DDD, MMM D", 0, aI + "%", 0, i, bp, bK, 0, bO);
						if (a8) {
							bU = "";
							for (be in a4[bO]) {
								if (bU) {
									bU = bU + "/" + a4[bO][be]
								} else {
									bU = a4[bO][be]
								}
							}
							bq += this.createBAxisCell(bU, aI + "%", 0, i, bO)
						}
						bc = 0;
						bi = "";
						if (aJ == 0) {
							bI = (parseInt((bQ[bc].ST).substr(0, 2)) * 60 * 60) + (parseInt((bQ[bc].ST).substr(3, 2)) * 60) + (parseInt((bQ[bc].ST).substr(6, 2)));
							if (bI != 0) {
								aJ = bI / (24 * 60 * 60) * 100;
								aJ = aJ * aI * ba / 100;
								bi = '<div style="width:' + aJ + "% ; left: 0% ; position: absolute; height:" + a1 + ';" class="siebui-ganttInnerTbl">';
								bi += this.createTimeScaleCell(bQ[bC - 1].NM.substr(0, 1), "", 0, "100%", "0%");
								bi += "</div>"
							}
						}
						bi += '<div style="width: ' + aI * ba + "% ; left:" + aJ + "% ; position: absolute; height:" + a1 + ';" class="siebui-ganttInnerTbl">';
						by = 0;
						aJ += aI * ba;
						while (bc < bC) {
							aP = (bQ[bc].DUR) / 3600;
							if (aU.getTime() >= bV && bI != 0 && bc == bC - 1) {
								aP = (bQ[bc].DUR - bI) / 3600
							} else {
								aP = (bQ[bc].DUR) / 3600
							}
							a3 = aP / 24 * 100;
							bi += this.createTimeScaleCell(bQ[bc].NM.substr(0, 1), "", 0, a3 + "%", by + "%");
							bc = bc + 1;
							by += a3
						}
						bi += "</div>";
						bt += bi
					}
					break;
				case (d):
					var bl = 0;
					aU = new Date(aY.Get(W));
					aN = 0,
					firsttimeWeekSet = true,
					createMajorAxis = false;
					b4 = new Date(aY.Get(W));
					while (b4.getTime() < bV) {
						b4.setDate(b4.getDate() + 7);
						aN++
					}
					aU = new Date(aY.Get(W));
					b4 = new Date(aY.Get(W));
					aM = (bV - aU.getTime()) / (24 * bN);
					a3 = 7 / aM * 100;
					aI = 5 * a3;
					while ((aU.getTime() < bV)) {
						bK = this.IsWeekend(aU);
						bO = aU.format("MM/dd/yyyy");
						bp = aV[bO];
						if (firsttimeWeekSet == true) {
							b4.setDate(aU.getDate() + 6);
							firsttimeWeekSet = false
						} else {
							b4.setDate(b4.getDate() + 7)
						}
						aW = ae.GetStringFromDateTime(aU.format(aa), o, "MMMM D") + "-" + ae.GetStringFromDateTime(b4.format(aa), o, "MMMM D");
						bt += this.createTimeScaleCell(aW, "", 0, a3 + "%", 0, i, bp, bK);
						bl++;
						if (a8) {
							bU = "";
							for (be in a4[bO]) {
								if (bU) {
									bU = bU + "/" + a4[bO][be]
								} else {
									bU = a4[bO][be]
								}
							}
							bq += this.createBAxisCell(bU, (bl * mnrAxiswidth) + "%", 0, i, bO)
						}
						if (b4.getDate() == 30) {
							var bZ = new Date(b4);
							createMajorAxis = true;
							bZ.setDate(bZ.getDate() + 1);
							if (bZ.getDate() == 31 && bZ.getMonth() == b4.getMonth()) {
								createMajorAxis = false
							}
						} else {
							if (b4.getDate() == 31) {
								createMajorAxis = true
							}
						}
						if ((aU.getMonth() != b4.getMonth()) || createMajorAxis == true) {
							bu += this.createTimeScaleCell(aU, "MMMM", 0, bl * a3 + "%");
							bl = 0;
							createMajorAxis = false
						}
						aU.setDate(aU.getDate() + 7)
					}
					break;
				case (w):
					if (bw === "TRUE") {
						var bH = 0,
						aQ;
						aU = new Date(aY.Get(W));
						noOfCells = aT * ba;
						a3 = ba / noOfCells * 100;
						aI = a3 * aT;
						while (aU.getTime() < bV) {
							if (bP.indexOf(aU.getDay()) !== -1) {
								bK = this.IsWeekend(aU);
								bO = aU.format("MM/dd/yyyy");
								bp = aV[bO];
								bt += this.createTimeScaleCell(aU, "D DDDD", 0, a3 + "%", aJ + "%", i, bp, bK, 0, bO);
								if (a8) {
									bU = "";
									for (be in a4[bO]) {
										if (bU) {
											bU = bU + "/" + a4[bO][be]
										} else {
											bU = a4[bO][be]
										}
									}
									bq += this.createBAxisCell(bU, a3 + "%", aJ + "%", i, bO)
								}
								if (bH === 0) {
									aQ = new Date(aU)
								}
								bH++;
								aJ += a3
							}
							if (bH === Number(aT)) {
								aW = ae.GetStringFromDateTime(aQ.format(aa), o, "MMMM D") + " - " + ae.GetStringFromDateTime(aU.format(aa), o, "MMMM D");
								bH = 0;
								bu += this.createTimeScaleCell(aW, "", 0, aI + "%", bS + "%");
								bS += aI
							}
							aU.setDate(aU.getDate() + 1)
						}
					} else {
						var bX = false,
						bk = 1,
						bG = 0;
						noOfCells = aT * ba;
						a3 = ba / noOfCells * 100;
						aU = new Date(aY.Get(W));
						aO = new Date(bV);
						while ((aU.getTime() < bV)) {
							bX = false;
							if (bP.indexOf(aU.getDay()) !== -1) {
								bX = true;
								break
							}
							aU.setDate(aU.getDate() + 1)
						}
						while (aU.getTime() <= bV) {
							bk = 1;
							bG = 0;
							a5 = new Date(aU);
							for (be = 1; be < aT; be++) {
								a5.setDate(a5.getDate() + 1);
								if (aU.getMonth() === a5.getMonth()) {
									bk++
								} else {
									bG++
								}
							}
							bf = new Date(a5);
							if (aU.getMonth() === bf.getMonth()) {
								bu += this.createTimeScaleCell(aU, "MMMM", 0, (bk * a3) + "%", bS + "%");
								bS += a3 * bk
							} else {
								bu += this.createTimeScaleCell(aU, "MMMM", 0, (bk * a3) + "%", bS + "%");
								bS += a3 * bk;
								bu += this.createTimeScaleCell(bf, "MMMM", 0, (bG * a3) + "%", bS + "%");
								bS += a3 * bG
							}
							aU.setDate(aU.getDate() + 7)
						}
						aU = new Date(aY.Get(W));
						while (aU.getTime() < bV) {
							if (bP.indexOf(aU.getDay()) !== -1) {
								bK = this.IsWeekend(aU);
								bO = aU.format("MM/dd/yyyy");
								bp = aV[bO];
								bt += this.createTimeScaleCell(aU, "D DDDD", 0, a3 + "%", aJ + "%", i, bp, bK, 0, bO);
								if (a8) {
									bU = "";
									for (be in a4[bO]) {
										if (bU) {
											bU = bU + "/" + a4[bO][be]
										} else {
											bU = a4[bO][be]
										}
									}
									bq += this.createBAxisCell(bU, a3 + "%", aJ + "%", i, bO)
								}
								aJ += a3
							}
							aU.setDate(aU.getDate() + 1)
						}
					}
					break
				}
				bu += "</div>";
				bt += "</div>";
				if (a8) {
					bq += "</div>";
					bm += bu + bt + bq + "</div>"
				} else {
					bm += bu + bt + "</div>"
				}
				bE = null;
				return bm
			};
			F.prototype.createTimeScaleCell = function (ba, a6, a5, aY, aM, aP, aO, aW, aV, aI) {
				var a8 = this.GetPM(),
				aX = a8.Get(ap),
				aK = a8.Get(H),
				aJ = "../images/",
				aR = [],
				a0,
				aT = "",
				aL,
				aN = '<div style=" ',
				a7,
				a4 = a8.Get(l),
				a3 = a4 ? 1 : 0,
				aQ = a8.Get("Special Days Class"),
				aS = SiebelApp.S_App.IsAutoOn(),
				a1 = a8.Get("TSDDInfo"),
				aU = a1["Custom DrillDown"],
				aZ = "";
				cls = 'class = "siebui-ganttHeadCell';
				if (a6) {
					a7 = ae.GetStringFromDateTime(ba.format(aa), o, a6)
				} else {
					a7 = ba
				}
				if (aY && aY !== 0) {
					aN += "width:" + aY + ";"
				}
				if (aM && aM !== 0) {
					aN += "left:" + aM + "; position: absolute;";
					if (a8.Get(P) != aq && a8.Get(P) != k && a8.Get(P) != X) {
						if (a3) {
							aN += "height:" + 100 / 3 + "%;"
						} else {
							aN += "height: 50%;"
						}
					}
				}
				if (aW) {
					if (aX) {
						a0 = aX.Weekends
					}
					if (a0) {
						aN += "background-color:" + a0 + ";";
						cls += " siebui-Weekends"
					}
				}
				if (aO) {
					if (aQ) {
						aP = aP + " siebui-" + aQ
					}
					for (var a9 in aO) {
						if (aO.hasOwnProperty(a9)) {
							aR.push(a9)
						}
					}
					aR.sort();
					for (var a2 = 0; a2 < aR.length; a2++) {
						a9 = aR[a2];
						if (aK && aK[a9] && a8.Get(P) != aE) {
							aL = aK[a9];
							aT += '<span class="' + aL + '"></span>'
						}
						if (!a0 && aX && aX[a9]) {
							a0 = aX[a9];
							if (a0) {
								aN += "background-color:" + a0 + ";";
								a0 = ""
							}
						}
					}
				}
				aN += '"' + cls;
				if (aV && a8.Get(P) === y) {
					aN += " siebui-" + aV
				}
				aN += '">';
				if (aI) {
					if (aU === "Y") {
						aZ = 'data-drilldown-type="TAxis"'
					}
					aZ += "DateVal = '" + aI + "'";
					if (aS === "true") {
						aZ += " ot = 'a' rn = 'TSA" + aI + "' un = 'TSA" + aI + "'"
					}
					aN += SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
						type : h.get("SWE_CTRL_LINK"),
						className : "siebui-showTSTooltip " + (aP ? aP : ""),
						value : HtmlEncode(a7),
						attrs : aZ
					})
				} else {
					if (aS === "true") {
						aZ += " ot = 'a' rn = 'TSA" + a7 + "' un = 'TSA" + a7 + "'"
					}
					if (typeof a7 === "number") {
						a7 = a7.toString()
					}
					aN += SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
						type : h.get("SWE_CTRL_LINK"),
						className : (aP ? aP : ""),
						value : HtmlEncode(a7),
						attrs : aZ
					});
					if (aP && aU === "Y") {
						aN += 'data-drilldown-type="TAxis"'
					}
				}
				aN += aT;
				aN += "</div>";
				return aN
			};
			F.prototype.createBAxisCell = function (aP, aI, aK, aR, aO) {
				var aL = this.GetPM(),
				aJ = "",
				aQ = aL.Get(l),
				aS = aQ ? 1 : 0,
				aM = '<div class="siebui-ganttHeadCell" style="',
				aP,
				aN = "";
				if (aI && aI !== 0) {
					aM += "width:" + aI + ";"
				}
				if (aK && aK !== 0) {
					aM += "left:" + aK + "; position: absolute;";
					if (aS) {
						aM += "height:" + 100 / 3 + "%;"
					} else {
						aM += "height: 50%;"
					}
				}
				aM += '">';
				if (aR) {
					aJ = aR;
					aN = "data-drilldown-type='BAxis'"
				}
				if (SiebelApp.S_App.IsAutoOn() === "true" && aO) {
					aN += " ot = 'a' rn = 'BA" + aP + "' un = 'BA" + aO + "-" + aP + "'"
				}
				aM += SiebelAppFacade.HTMLTemplateManager.GenerateMarkup({
					type : h.get("SWE_CTRL_LINK"),
					className : (aR ? aR : ""),
					value : HtmlEncode(aP),
					attrs : aN
				});
				aM += "</div>";
				return aM
			};
			F.prototype.IsWeekend = function (aK) {
				if (aK instanceof Date) {
					var aI = aK.getDay(),
					aJ = this.GetPM();
					if (aI === 0) {
						aI = 7
					}
					if (aJ.Get(B)) {
						return ((aJ.Get(B)).indexOf(aI) !== -1)
					}
				}
			};
			function av(aK) {
				var aJ = aK.data.ctx,
				aI = aJ.pm;
				if (aK.srcElement) {
					value = aK.srcElement.innerHTML
				} else {
					value = aK.target.value
				}
				ar.call(aJ, true);
				if (am.call(aJ, value)) {
					if (aK.srcElement) {
						aK.srcElement.innerHTML = ""
					} else {
						aK.target.value = ""
					}
				}
			}
			function af(aI) {
				if (aI.which === $.ui.keyCode.ENTER) {
					$(this).autocomplete("close")
				}
			}
			function ag(aK) {
				var aJ = $(this),
				aM = aK.data.iScroll,
				aI = aK.data.ctx.GetPM(),
				aL = aJ.scrollLeft(),
				aN = aK.data.prevScroll;
				$(".siebui-splitBox2").scrollLeft(aL);
				if (aI.Get("InEvent") === false) {
					if (aN < aL || aM === 1) {
						if (aJ[0].scrollWidth < (aJ[0].scrollLeft + aJ[0].offsetWidth + 1)) {
							aI.SetProperty("NotifyTSButtonClk", "TRUE");
							sDate = new Date(aI.Get(aB));
							if (!isNaN(sDate.getDate())) {
								sDate.setDate(sDate.getDate() + aI.ExecuteMethod("getTimeScaleUnits"));
								aN = 0;
								aI.ExecuteMethod("RefreshGanttChart", sDate.format(aH));
								aM = 1;
								aJ.scrollLeft(aJ[0].scrollLeft - 10)
							}
							return
						} else {
							if ($(aK.data.el).data("SCROLL_BUTTON") === true && aM === 1) {
								aJ.scrollLeft(aJ[0].scrollLeft + 5)
							} else {
								aM = 0
							}
						}
					} else {
						if (aN > aL || aM === 2) {
							if ($(this)[0].scrollLeft === 0 && aI.Get("TotalHPages") > 1) {
								aI.SetProperty("NotifyTSButtonClk", "TRUE");
								sDate = new Date(aI.Get(aB));
								if (!isNaN(sDate.getDate())) {
									sDate.setDate(sDate.getDate() - aI.ExecuteMethod("getTimeScaleUnits"));
									aN = aJ[0].scrollWidth;
									aI.ExecuteMethod("RefreshGanttChart", sDate.format(aH));
									aM = 2;
									aJ.scrollLeft(aJ[0].scrollLeft + 10)
								}
								return
							} else {
								if ($(aK.data.el).data("SCROLL_BUTTON") === true && aM === 2) {
									aJ.scrollLeft(aJ[0].scrollLeft - 5)
								} else {
									aM = 0
								}
							}
						}
					}
				}
				aM = 0;
				aK.data.iScroll = 0;
				aN = $(".siebui-splitBox3").scrollLeft();
				aK.data.prevScroll = aN
			}
			function aC(aI) {
				$(".siebui-resTable").scrollTop($(".siebui-VScroll").scrollTop())
			}
			function G(aK) {
				var aI = 0,
				aJ = aK.data.ctx.GetPM();
				aI = aI | (1 << 1);
				aI = aI | (1 << 4);
				aJ.SetProperty("PanesToRefresh", aI);
				aJ.SetProperty("Display Toggle", aK.data.CW.GetValue());
				aJ.ExecuteMethod("InvokeServer")
			}
			function aw(aK) {
				var aJ = aK.data.ctx.GetPM(),
				aI = SiebelApp.S_App.NewPropertySet(),
				aL = aK.data.CW.GetValue();
				aJ.SetProperty("Color Display Toggle", aL);
				aI.SetProperty("Color Display Toggle", aL);
				aJ.ExecuteMethod("saveControlValues", aI);
				ad.call(that, aL)
			}
			return F
		}
			());
		return "SiebelAppFacade.atcganttrenderer"
	})
};
