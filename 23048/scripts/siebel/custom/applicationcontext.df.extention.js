if (typeof(SiebelApp.S_App) !== "undefined") {
    var ac = SiebelJS.Dependency("SiebelApp.Utils");
    var G = SiebelJS.Dependency("SiebelApp.Constants");
    var _DelegateResponse = SiebelApp.S_App.DelegateResponse;

    SiebelApp.S_App.DelegateResponse = function(bC, aP) {
        var bu = CCFMiscUtil_CreatePropSet();
        var bt = new $.Deferred();
        var a8 = G.get("SWE_RPC_PROP_CONFIRM_DIALOG");
        if (bC instanceof JSSPropertySet) {
            bu = bC
        } else {
            bu.DecodeFromString(bC)
        }
        var bj = bu.GetProperty(G.get("SWE_RPC_PROP_STATUS"));
        if (bj == a8) {
            aD.call(this, bu);
            //Меняем значение свойства Status для предотвращения повторной обработки стандартным методом SiebelApp.S_App.DelegateResponse.
            bu.SetProperty(G.get("SWE_RPC_PROP_STATUS"), bj + "_resolved");
        }
        return _DelegateResponse.call(this, bC, aP);
    };

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
        var self = this;
        aX = aV.GetProperty(G.get("SWE_RPC_PROP_STATUS"));
        if (aX === G.get("SWE_RPC_PROP_CONFIRM_DIALOG")) {
            aW = aV.GetProperty(G.get("SWE_CONFIRM_TEXT_STR"));

            $("<div class='alert-wrap'></div>").html(aW).dialog({
                //title: title,
                resizable: true,
                modal: true,
                closeOnEscape: false,
                buttons: {
                    "Ok": {
                        click: function() {
                            $(this).dialog("close");
                            aQ = ATCCustomConfirm.call(self, true, aV);
                            aT = true;
                        },
                        text: "Ок",
                        class: 'appletButton'
                    },

                    "Cancel": {
                        click: function() {
                            $(this).dialog("close");
                            aQ = ATCCustomConfirm.call(self, false, aV);
                            aT = false;
                        },
                        text: "Отмена",
                        class: 'appletButton'
                    }
                },
                create: function() {
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
    }
}