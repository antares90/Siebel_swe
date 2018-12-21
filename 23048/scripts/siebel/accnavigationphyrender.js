/*Federal Acquisition Regulation and agency-specific supplemental regulations.
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
if (typeof(SiebelAppFacade.AccNavigationPhyRenderer) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.AccNavigationPhyRenderer");
    define("siebel/accnavigationphyrender", ["siebel/basephyrenderer"], function() {
        SiebelAppFacade.AccNavigationPhyRenderer = (function() {
            var r = SiebelJS.Dependency("SiebelApp.Constants");
            var t = r.get("SWE_SCREEN_NAV_CONTROL_STR");
            var p = r.get("SWE_AGGR_VIEW_NAV_CONTROL_STR");
            var w = r.get("SWE_DET_VIEW_NAV_CONTROL_STR");
            var d = r.get("SWE_DET_SUB_VIEW_NAV_CONTROL_STR");
            var C = null;

            function l(D) {
                SiebelAppFacade.AccNavigationPhyRenderer.superclass.constructor.call(this, D);
                var E = {};
                this._getLast = function(F) {
                    return E[F]
                };
                this._setCurrent = function(G, F) {
                    E[G] = F
					
                }
            }
            SiebelJS.Extend(l, SiebelAppFacade.BasePR);

            function i() {
                return this.GetPM().Get("GetType") === r.get("SWE_PROP_NC_ID_SCREEN_CONTROL")
            }

            function B() {
                if (C === null) {
                    C = (!!SiebelAppFacade.HBNavPlugin) && $("html").hasClass("siebui-navigation-side")
                }
                return C
            }

            function e(H, E) {
                var I = (B.call(this) ? "siebui-nav-hb" : "siebui-nav-tab"),
                    G = $("div#" + H + "." + I);
                if (E && G.length === 0) {
                    G = $("div#" + H);
                    if (G.length) {
                        G = G.eq(0);
                        var J = (G.attr("class") || "").split(" ");
                        for (var F = 0, D = J.length; F < D; F++) {
                            if (J[F].indexOf("siebui-nav-") === 0 && J[F] !== I) {
                                G.removeClass(J[F])
                            }
                        }
                        G.addClass(I)
                    }
                } else {
                    if (G.length) {
                        G = G.eq(0)
                    }
                }
                return G
            }
            l.prototype.Init = function() {
                SiebelAppFacade.AccNavigationPhyRenderer.superclass.Init.call(this);
                if (i.call(this)) {
                    this.AttachPMBinding("Refresh", this.BindData)
                }
                this.GetPM().AttachPMBinding("FocusNavLink", g, {
                    scope: this
                })
            };
            l.prototype.ShowUI = function() {
                SiebelAppFacade.AccNavigationPhyRenderer.superclass.ShowUI.call(this);
                var F = this.GetPM(),
                    I = F.Get("placeholder"),
                    G = e.call(this, I, true),
                    E = (i.call(this)) ? "siebui-view-navs" : "siebui-subview-navs";
                if (!G.hasClass(E)) {
                    G.addClass(E)
                }
                if (SiebelApp.S_App.IsRwd() && !B.call(this)) {
                    var H = F.Get("SubPlaceholder") ? F.Get("SubPlaceholder") : I;
                    if (e.call(this, H).length !== 0) {
                        I = H;
                        G = e.call(this, H);
                        if (!G.hasClass("siebui-subview-screennavs")) {
                            G.addClass("siebui-subview-screennavs")
                        }
                    }
                    F.SetProperty("LevelPlaceholder", I)
                } else {
                    var D = F.Get("SubPlaceholder");
                    if (e.call(this, D, (B.call(this) || !i.call(this))).length !== 0) {
                        I = D;
                        G = e.call(this, D);
                        if (!G.hasClass("siebui-subview-screennavs")) {
                            G.addClass("siebui-subview-screennavs")
                        }
                    }
                    F.SetProperty("LevelPlaceholder", I)
                }
            };
            l.prototype.BindEvents = function() {
                SiebelAppFacade.AccNavigationPhyRenderer.superclass.BindEvents.call(this);
                var E = this.GetPM(),
                    G = E.Get("placeholder"),
                    F = E.Get("LevelPlaceholder"),
                    H = e.call(this, G),
                    D = e.call(this, F);
                H.undelegate(".AccNavBar");
                D.undelegate(".AccNavBar");
                H.delegate("#" + G + "_tabScreen a", "click.AccNavBar", {
                    ctx: this
                }, b);
                H.delegate(".siebui-nav-scroll", "click.AccNavBar", {
                    ctx: this
                }, z);
                D.delegate("#" + F + "_tabView a", "click.AccNavBar", {
                    ctx: this
                }, c);
                D.delegate("#s_sctrl_tabView_noop", "click.AccNavBar", {
                    ctx: this
                }, q);
                $($.unique($("#" + G + ", #" + F).get())).delegate("select.siebui-nav-links", "click.AccNavBar keypress.AccNavBar blur.AccNavBar", {
                    ctx: this
                }, v).delegate("select.siebui-nav-links", "focus.AccNavBar keyup.AccNavBar", function(I) {
                    if ((I.type === "keyup" && I.keyCode === $.ui.keyCode.ESCAPE) || I.type !== "keyup") {
                        $(this)[0].selectedIndex = 0
                    }
                });
                if (!B.call(this)) {
                    $(window).unbind("resize." + E.GetPMName()).bind("resize." + E.GetPMName(), {
                        ctx: this
                    }, function(I) {
                        I.data.ctx.BindData(true, true)
                    })
                }
            };

            function q(D) {
                $("#s_sctrl_tabView").toggleClass("siebui-open");
                if ($(".siebui-open").length) {
                    $("#s_sctrl_tabView").height($("#_sweview").height())
                } else {
                    $("#s_sctrl_tabView").height(46)
                }
            }

            function z(F) {
                var E, H, J, G = $("#s_sctrl_tabScreen"),
                    I = G.scrollLeft(),
                    D = G.width();
                if (($(F.target).attr("id") || "").indexOf("left") > -1) {
                    J = (I <= D) ? I : D;
                    G.animate({
                        scrollLeft: I - J
                    }, 500);
                    if (I - J === 0) {
                        $("#sui-left-scroll").addClass("siebui-tile-scroll-d")
                    }
                    $("#sui-right-scroll").removeClass("siebui-tile-scroll-d");
                    $("#sui-right-scroll").addClass("siebui-tile-right-scroll")
                } else {
                    if (($(F.target).attr("id") || "").indexOf("right") > -1) {
                        E = $(".siebui-nav-tabScreen ul").width();
                        H = E - (I + D);
                        J = (H <= D) ? H : D;
                        G.animate({
                            scrollLeft: I + J
                        }, 500);
                        if (I + J + D === E) {
                            $("#sui-right-scroll").addClass("siebui-tile-scroll-d")
                        }
                        $("#sui-left-scroll").removeClass("siebui-tile-scroll-d");
                        $("#sui-left-scroll").addClass("siebui-tile-left-scroll")
                    }
                }
            }

            function b(H) {
                var G = $(this);
                var J = G.attr("data-tabindex");
                var F = H.data.ctx.GetPM();
                var E = F.Get("GetTabInfo");
				console.log(H);
                if (E[J]) {
                    var D = "viewName";
                    if (i.call(H.data.ctx)) {
                        D = "defaultViewName";
                        E[J]["level"] = t
                    } else {
                        E[J]["level"] = w
                    }
                    var I = E[J][D];
                    if (I) {
                        if (!F.OnControlEvent("OnClick", E[J])) {
                            $("#" + F.Get("placeholder") + "_tabScreen").tabs("active", Number(F.Get("GetSelectedTabKey").replace("tabScreen", "")) || 0)
                        }
                    }
                }
            }

            function c(H) {
                var G = $(this);
                var J = G.attr("data-tabindex");
                var F = H.data.ctx.GetPM();
                var E = F.Get("GetSelectedTabLinkInfo");
                if (i.call(H.data.ctx)) {
                    E[J]["level"] = p
                } else {
                    E[J]["level"] = d
                }
                if (E[J]) {
                    var D = "viewName";
                    var I = E[J][D];
                    if (I) {
                        if (!F.OnControlEvent("OnClick", E[J])) {
                            $("#" + F.Get("LevelPlaceholder") + "_tabView").tabs("active", Number(F.Get("GetSelectedLinkKey").replace("tabView", "")) || 0)
                        }
                    }
                }
            }

            function v(D) {
                if (D.type === "keypress" && D.which !== $.ui.keyCode.ENTER) {} else {
                    var F = D.data.ctx.GetPM();
                    var M = F.Get("placeholder");
                    var E = $(this).attr("id");
                    var G = $(this).val();
                    var H = {};
                    var K = F.Get("GetType");
                    if (G) {
                        if (E === "j_" + M + "_tabScreen") {
                            H = F.Get("GetTabInfo");
                            if (K === r.get("SWE_PROP_NC_ID_SCREEN_CONTROL")) {
                                H[G]["level"] = t
                            } else {
                                H[G]["level"] = w
                            }
                        } else {
                            if (E === "j_" + F.Get("LevelPlaceholder") + "_tabView") {
                                H = F.Get("GetSelectedTabLinkInfo");
                                if (K === r.get("SWE_PROP_NC_ID_SCREEN_CONTROL")) {
                                    H[G]["level"] = p
                                } else {
                                    H[G]["level"] = d
                                }
                            } else {
                                return
                            }
                        }
                        if ($(this).data("NavLinkChange") === H[G]) {
                            return
                        }
                        var J = H[G] || {};
                        var L = J.defaultViewName || J.viewName;
                        if (L) {
                            $(this).data("NavLinkChange", H[G]);
                            F.OnControlEvent("OnClick", H[G]);
                            var I = this;
                            setTimeout(function() {
                                $(I).removeData("NavLinkChange");
                                I = null
                            }, 1)
                        }
                    }
                }
            }
            l.prototype.BindData = function(I, D) {
                SiebelAppFacade.AccNavigationPhyRenderer.superclass.BindData.call(this);
                D = D || false;
                var E = this.GetPM();
                if (E.Get("GetDataReload") === true || I) {
                    var H = E.Get("placeholder"),
                        G = E.Get("LevelPlaceholder"),
                        F = e.call(this, H);
                    if (F.length === 0) {
                        return
                    }
                    s.call(this, H, "tabScreen", E.Get("GetTabInfo"), E.Get("GetSelectedTabKey"), D);
                    s.call(this, E.Get("LevelPlaceholder"), "tabView", E.Get("GetSelectedTabLinkInfo"), E.Get("GetSelectedLinkKey"), D);
                    m.call(this);
                    A.call(this)
                }
            };

            function s(I, O, S, R, N) {
                var V = this.GetPM(),
                    D, U = SiebelApp.S_App.LocaleObject,
                    K = false,
                    H = I + "_" + O,
                    F = null,
                    Q = x.call(this, I, O, S, R),
                    E = null,
                    X = SiebelApp.S_App.GetNavLevel() || [],
                    J = null,
                    T = "",
                    G, P = Number((R || "").replace(O, ""));
                if (!(N || SiebelApp.Utils.IsTrue(SiebelApp.S_App.IsSui()))) {
                    var M = $("#" + H),
                        L = M.find(".ui-state-default"),
                        W = M.find("li.siebui-active-navtab").eq(0);
                    if (i.call(this) && Q && Q === this._getLast(O) && (S[R] && W.text() === S[R].captionName)) {
                        P = P >= L.length ? L.length - 1 : P;
                        if (M.tabs("option", "active") !== P) {
                            W.removeClass("siebui-active-navtab").removeAttr("aria-label");
                            M.data("refreshActivate", true);
                            M.tabs("option", "active", P);
                            M.removeData("refreshActivate");
                            M.find("li").eq(P).addClass("siebui-active-navtab").attr("aria-label", function() {
                                return $(this).text() + " " + SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_CKEDITOR_SELECTED")
                            });
                            if (B.call(this)) {
                                j.call(this, H, S, O, D)
                            }
                        }
                        M = L = W = null;
                        return K
                    }
                    M = L = W = null
                }
                this._setCurrent(O, Q);
                F = e.call(this, I);
                E = F.children("#" + H);
                E.remove();
                E = null;
                if (Q) {
                    if (SiebelApp.Utils.IsTrue(SiebelApp.S_App.IsSui()) && $("#sui-left-scroll").length === 0) {
                        F.append("<div id='sui-left-scroll' class='siebui-nav-scroll'></div>")
                    }
                    F.append("<div class='siebui-nav-tabs siebui-nav-" + O + "' id=" + H + ">" + Q + "</div>");
                    if (SiebelApp.Utils.IsTrue(SiebelApp.S_App.IsSui()) && $("#sui-right-scroll").length === 0) {
                        F.append("<div id='sui-right-scroll' class='siebui-nav-scroll'></div>")
                    }
                    $("#" + H).find("ol,ul").eq(0).bind("keydown", {
                        ctx: this
                    }, o).end().end().tabs({
                        active: (R === undefined) ? false : Number((R || "").replace(O, "")),
                        collapsible: true,
                        create: f,
                        beforeActivate: function(Y, Z) {
                            return !!$(this).data("refreshActivate")
                        }
                    }).find("li").eq(Number((R || "").replace(O, ""))).addClass("siebui-active-navtab").attr("aria-label", function() {
                        return $(this).text() + " " + SiebelApp.S_App.LocaleObject.GetLocalString("IDS_SWE_CKEDITOR_SELECTED")
                    });
                    if (i.call(this)) {
                        D = (O === "tabScreen") ? U.GetLocalString("IDS_SWE_FIRST_LEVEL_VIEW_BAR_TITLE") : U.GetLocalString("IDS_SWE_SECOND_LEVEL_VIEW_BAR_TITLE")
                    } else {
                        D = (O === "tabScreen") ? U.GetLocalString("IDS_SWE_THIRD_LEVEL_VIEW_BAR_TITLE") : U.GetLocalString("IDS_SWE_FOURTH_LEVEL_VIEW_BAR_TITLE")
                    }
                    J = i.call(this) ? (O === "tabScreen" ? "1" : "2") : (O === "tabScreen" ? "3" : "4");
                    G = window.matchMedia("(orientation: landscape)");
                    if (X.indexOf(J) !== -1 && G.matches) {
                        switch (parseInt(J)) {
                            case 1:
                                T = "s_sctrl_tabScreen";
                                break;
                            case 2:
                                T = "s_sctrl_tabView";
                                break;
                            case 3:
                                T = "s_vctrl_div_tabScreen";
                                break;
                            case 4:
                                T = "s_vctrl_div_tabView";
                                break
                        }
                    }
                    if (SiebelApp.Utils.IsTrue(SiebelApp.S_App.IsSui())) {
                        h.call(this, N);
                        if (!i.call(this) && T !== H) {
                            k.call(this, H, O, S, R)
                        }
                    } else {
                        if (!B.call(this) && T !== H) {
                            k.call(this, H, O, S, R)
                        }
                    }
                    if (B.call(this)) {
                        n.call(this, H, S, O, D)
                    }
                    Q = null;
                    K = true
                } else {
                    if (O == "tabView") {
                        F.append("<div class='siebui-nav-tabs siebui-empty-tabs siebui-nav-" + O + "' id=" + H + "></div>")
                    }
                }
                return K
            }

            function h(J) {
                var H, D, K = 0,
                    G = 0,
                    L, E = $("#s_sctrl_tabScreen"),
                    F = E.scrollLeft();
                D = E.children("ul").children("li");
                for (var I = 0, K = D.length; I < K; I++) {
                    G += D.eq(I).width()
                }
                if ($(".siebui-landing").length) {
                    $(".siebui-toolbar-settings-popup").width($("#_svf0").width() - 10)
                }
                if ($(".siebui-landing").length === 0 && J) {
                    E.children("ul").width(G)
                }
                viewport = E.width();
                if (F > 0) {
                    $("#sui-left-scroll").removeClass("siebui-tile-scroll-d");
                    $("#sui-left-scroll").addClass("siebui-tile-left-scroll")
                } else {
                    $("#sui-left-scroll").addClass("siebui-tile-scroll-d")
                }
                H = G - (F + viewport);
                if (H > 0) {
                    $("#sui-right-scroll").removeClass("siebui-tile-scroll-d");
                    $("#sui-right-scroll").addClass("siebui-tile-right-scroll")
                } else {
                    $("#sui-right-scroll").addClass("siebui-tile-scroll-d")
                }
            }

            function n(I, G, H, J) {
                var F = this.GetPM();
                if (!F.Get("HB-" + I)) {
                    F.SetProperty("HB-" + I, new SiebelAppFacade.HBNavPlugin({
                        id: I
                    }))
                }
                var D = SiebelApp.S_App.GetNavLevel() || [],
                    E = null;
                E = i.call(this) ? (H === "tabScreen" ? "1" : "2") : (H === "tabScreen" ? "3" : "4");
                F.Get("HB-" + I).Manage((D.indexOf(E) !== -1), J)
            }

            function j(G, E, F, H) {
                var D = this.GetPM();
                if (!D.Get("HB-" + G)) {
                    return
                }
                D.Get("HB-" + G).Refresh()
            }

            function o(D) {
                if ($(D.target).is("li") && D.which === $.ui.keyCode.ENTER) {
                    $(document.activeElement.firstChild).trigger("click")
                }
            }

            function f(E, D) {
                $(D.panel).hide()
            }

            function x(L, H, I, K) {
                var M = "",
                    F = L + "_" + H + "_noop",
                    E = SiebelApp.S_App.GetDirection(),
                    G, D = 0;
                for (var J in I) {
                    if (I.hasOwnProperty(J)) {
                        M += "<li ";
                        if (E) {
                            M += " class='siebui-rtl-element-right' "
                        }
                        M += "><a data-tabindex='" + J + "' href='#" + F + "'";
                        if (i.call(this)) {
                            D = (H === "tabScreen") ? 1 : 2
                        }
                        if (SiebelApp.Utils.IsTrue(SiebelApp.S_App.IsSui()) && D === 1) {
                            M += " title='" + String(I[J].captionName) + "' >"
                        } else {
                            M += " >"
                        }
                        G = I[J].tabIcon;
                        if (G && D === 1) {
                            M += utils.GetSpanTag(G, "screentab_icon") + "<img src='" + G + "'/></span>"
                        } else {
                            if (D === 1) {
                                M += utils.GetSpanTag("screentab_icon") + "</span>"
                            } else {
                                if (G) {
                                    M += utils.GetSpanTag(G) + "<img src='" + G + "'/></span>"
                                }
                            }
                        }
                        M += String(I[J].captionName) + "</a></li>"
                    }
                }
                if (M !== "") {
                    M = "<ul>" + M + "</ul>";
                    M += '<div class="siebui-invisible-el siebui-nav-' + H + '"  id="' + F + '" ></div>'
                }
                return M
            }

            function k(F, J, P, M) {
                var U = this.GetPM();
                var I = $("#" + F);
                var E = Number((M || "").replace(J, "")) || 0;
                var K = Number(I.outerWidth());
                var O = 25;
                var G = I.children("ul").children("li");
                O += G.eq(E).outerWidth() + 10;
                var V = 0;
                var L = SiebelApp.Utils.IsTrue(SiebelApp.S_App.IsMobileApplication());
                for (var Q = 0, S = G.length; Q < S; Q++) {
                    if (Q !== E) {
                        O += G.eq(Q).outerWidth() + 10;
                        if (O > K) {
                            V = (Q - 1);
                            break
                        }
                    }
                }
                if ((L || V !== 0) && V < G.length) {
                    var T = SiebelApp.S_App.LocaleObject;
                    var R = "";
                    if (i.call(this)) {
                        R = (J === "tabScreen") ? T.GetLocalString("IDS_SWE_FIRST_LEVEL_VIEW_BAR_TITLE") : T.GetLocalString("IDS_SWE_SECOND_LEVEL_VIEW_BAR_TITLE")
                    } else {
                        R = (J === "tabScreen") ? T.GetLocalString("IDS_SWE_THIRD_LEVEL_VIEW_BAR_TITLE") : T.GetLocalString("IDS_SWE_FOURTH_LEVEL_VIEW_BAR_TITLE")
                    }
                    var D = "<span></span><li><select class='siebui-nav-links " + (U.Get("IsScreen") ? "siebui-nav-screenlist" : "siebui-nav-viewlist") + "'  id='j_" + F + "' role='combo' aria-atomic='true' aria-label='" + R + "' ><option value='' hidden> </option>";
                    var N = 0;
                    var H = 0;
                    if (!L) {
                        H = V + 1
                    }
                    var W;
                    while (P[J + H]) {
                        if (H !== E) {
                            D += "<option value='" + (J + H) + "'>" + P[J + H].captionName + "</option>";
                            W = I.children("ul").children("li").eq(H - N);
                            W.remove();
                            W = null;
                            N++
                        }
                        H++
                    }
                    D += "</select></li>";
                    I.tabs("refresh");
                    I.children("ul").append(D);
                    I.children("ul").children("li").last().eq(0).addClass(SiebelApp.S_App.GetDirection() ? "siebui-rtl-element-right" : "");
                    u.call(this, "select#j_" + F)
                }
            }

            function u(E) {
                if (!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())) {
                    var D = $(E).outerWidth();
                    $(E).wrap("<span style='width:" + D + "px; overflow:hidden; float:right;'/>").width("auto").css({
                        position: "relative",
                        left: "-" + ($(E).outerWidth() - D) + "px"
                    })
                }
            }

            function m() {
                var G = this.GetPM();
                var J = G.Get("placeholder");
                var I = J + "_tabScreen";
                var F = G.Get("LevelPlaceholder") + "_tabView";
                var H = $("#" + I);
                var E = $("#" + F);
                var D = SiebelApp.S_App.LocaleObject;
                if (i.call(this)) {
                    H.attr({
                        role: "navigation",
                        title: D.GetLocalString("IDS_SWE_FIRST_LEVEL_VIEW_BAR_TITLE")
                    }).children("ul").eq(0).attr("aria-live", "off");
                    E.attr({
                        role: "navigation",
                        title: D.GetLocalString("IDS_SWE_SECOND_LEVEL_VIEW_BAR_TITLE")
                    }).children("ul").eq(0).attr("aria-live", "off")
                } else {
                    H.attr({
                        role: "navigation",
                        title: D.GetLocalString("IDS_SWE_THIRD_LEVEL_VIEW_BAR_TITLE")
                    }).children("ul").eq(0).attr("aria-live", "off");
                    E.attr({
                        role: "navigation",
                        title: D.GetLocalString("IDS_SWE_FOURTH_LEVEL_VIEW_BAR_TITLE")
                    }).children("ul").eq(0).attr("aria-live", "off")
                }
            }

            function a(P, L, O, D) {
                var G = r.get("SWE_PROP_QTP_OT");
                var N = r.get("SWE_PROP_QTP_RN");
                var M = r.get("SWE_PROP_QTP_UN");
                if (O && (typeof(O.GetProperty) === "function")) {
                    P.children("ul").attr("ot", O.GetProperty(G)).attr("rn", O.GetProperty(N)).attr("un", O.GetProperty(M))
                }
                if (!D) {
                    return
                }
                var E = P.children("ul").children("li");
                var F = E.children("select").length;
                var Q = F ? E.length - 1 : E.length;
                for (var K = 0; K < Q - 1; K++) {
                    if (D[K] && (typeof(D[K].GetProperty) === "function")) {
                        E.eq(K).attr("ot", D[K].GetProperty(G)).attr("rn", D[K].GetProperty(N)).attr("un", D[K].GetProperty(M))
                    }
                }
                var I = K;
                var H = (L === "tabScreen") ? this.GetPM().Get("GetSelectedTabKey") : this.GetPM().Get("GetSelectedLinkKey");
                if (H) {
                    var J = parseInt(H.substring(L.length));
                    if (J) {
                        I = (J < K) ? K : J
                    }
                }
                if (D[I] && (typeof(D[I].GetProperty) === "function")) {
                    E.eq(K).attr("ot", D[I].GetProperty(G)).attr("rn", D[I].GetProperty(N)).attr("un", D[I].GetProperty(M))
                }
            }

            function y(M, L, D, I) {
                var F = r.get("SWE_PROP_QTP_OT");
                var K = r.get("SWE_PROP_QTP_RN");
                var J = r.get("SWE_PROP_QTP_UN");
                if (L && (typeof(L.GetProperty) === "function")) {
                    M.attr("ot", L.GetProperty(F)).attr("rn", L.GetProperty(K)).attr("un", L.GetProperty(J))
                }
                var E = M.children("option");
                for (var H = 0; H < E.length; H++) {
                    var G = Number((E.eq(H).val() || "").replace(I, ""));
                    if (G && D[G] && (typeof(D[G].GetProperty) === "function")) {
                        E.eq(H).attr("ot", D[G].GetProperty(F)).attr("rn", D[G].GetProperty(K)).attr("un", D[G].GetProperty(J))
                    }
                }
            }

            function A() {
                var H = this.GetPM();
                var G = H.Get("GetTabContainerQTPInfo");
                var I = H.Get("GetTabItemsQTPInfo");
                var E = H.Get("GetTabViewLinkContainerQTPInfo");
                var F = H.Get("GetTabViewLinkItemsQTPInfo");
                var J = H.Get("placeholder") + "_tabScreen";
                var D = H.Get("LevelPlaceholder") + "_tabView";
                a.call(this, $("#" + J), "tabScreen", G, I);
                a.call(this, $("#" + D), "tabView", E, F);
                y.call(this, $("#j_" + J), H.Get("GetJumpTabQTPInfo"), I, "tabScreen");
                y.call(this, $("#j_" + D), H.Get("GetJumpTabQTPInfo"), F, "tabView")
            }

            function g(G) {
                var F = r.get("SWE_PROP_NC_ID_SCREEN_CONTROL");
                var E = r.get("SWE_PROP_NC_ID_VIEW_CONTROL");
                var D = null;
                switch (G) {
                    case t:
                        if (i.call(this)) {
                            D = e.call(this, F);
                            if (B.call(this)) {
                                D.find(".siebui-nav-hb-btn").click()
                            }
                            D.find(" ul  li ").tabs().eq(0).focus()
                        }
                        break;
                    case w:
                        if (!i.call(this)) {
                            D = e.call(this, E);
                            if (B.call(this)) {
                                D.find(".siebui-nav-hb-btn").click()
                            }
                            D.find(" ul  li ").tabs().eq(0).focus()
                        }
                        break
                }
            }
            return l
        }());
        return "SiebelAppFacade.AccNavigationPhyRenderer"
    })
};