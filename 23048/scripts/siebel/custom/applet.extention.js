if (typeof(SiebelApp.S_App.Applet) !== "undefined") {
    var utils = SiebelJS.Dependency("SiebelApp.Utils");
    var consts = SiebelJS.Dependency("SiebelApp.Constants");
    var CallServerApplet = SiebelApp.S_App.Applet.prototype.CallServerApplet;

    SiebelApp.S_App.Applet.prototype.CallServerApplet = function (D, E, I, F) {
        /*
         * На БК неправильно берется  H = this.GetBusComp().GetIdValue();
         * Нет ActiveControl
         * поэтому возьмем ID c апплета для календаря
         */
        if (/eCalendar Daily Applet - My/.test(this.GetName())){
          try{
              this.CallCalendarServerApplet(D, E, I, F);
          }  catch (e){
              console.info(e);
              CallServerApplet.call(this,D, E, I, F);
          }
        }else
            CallServerApplet.call(this,D, E, I, F);
    }

    SiebelApp.S_App.Applet.prototype.CallCalendarServerApplet = function (D, E, I, F){
        var G = true;
        if (typeof(F) !== "undefined") {
            if (F.psresp === true || F.psresp === false) {
                G = F.psresp;
            }
        }
        var C = E.Clone();
        C.SetProperty(consts.get("SWE_CMD_ARG"), consts.get("SWE_CMD_INVOKE_METHOD_STR"));
        if (!utils.IsEmpty(this.GetView())) {
            C.SetProperty(consts.get("SWE_VIEW_ID_ARG"), this.GetView().GetBusObj().GetZone());
            C.SetProperty(consts.get("SWE_VIEW_ARG"), this.GetView().GetName())
        }
        if (C.GetProperty(consts.get("SWE_APPLET_STR")) === undefined || C.GetProperty(consts.get("SWE_APPLET_STR") === null)) {
            C.SetProperty(consts.get("SWE_APPLET_STR"), this.GetName())
        }
        C.SetProperty(consts.get("SWE_METHOD_STR"), D);
        if (D != "CollapseTreeItem" && D != "ExpandTreeItem" && D != "NextTreeItem" && D != "PreviousTreeItem" && D != "SelectTreeItem") {
            var H;
            if (!!this.GetBusComp()) {
                // Берем ID события календаря из соотвествующего Property в PropertySet
                H = E.GetProperty("SWERowId"); //this.GetBusComp().GetIdValue();
                C.SetProperty(consts.get("SWE_ROW_ID_STR"), H)
            }
            if (H !== "") {
                C.SetProperty(consts.get("SWE_REQ_ROW_ID_STR"), "1")
            } else {
                C.SetProperty(consts.get("SWE_REQ_ROW_ID_STR"), "0")
            }
            if (!!this.GetBusComp()) {
                this.GetRowIds(C)
            }
        }
        if (C.GetProperty(consts.get("SWE_ROW_IDS_STR")) === undefined || C.GetProperty(consts.get("SWE_ROW_IDS_STR") === null)) {
            this.GetRowIds(C)
        }
        if (C.GetProperty(consts.get("SWE_ACTIVE_APPLET_STR")) === undefined || C.GetProperty(consts.get("SWE_ACTIVE_APPLET_STR") === null)) {
            C.SetProperty(consts.get("SWE_ACTIVE_APPLET_STR"), this.GetName())
        }
        if (C.GetProperty(consts.get("SWE_NEED_CONTEXT_STR")) === undefined || C.GetProperty(consts.get("SWE_NEED_CONTEXT_STR") === null)) {
            C.SetProperty(consts.get("SWE_NEED_CONTEXT_STR"), "true")
        }
        C.SetProperty(consts.get("SWE_COUNT_STR"), SiebelApp.S_App.GetSWEReqCount());
        if (this.GetPopBookMark()) {
            C.SetProperty(consts.get("SWE_POPUP_VECTOR_STR"), this.GetPopBookMark())
        }
        if (D === consts.get("SWE_EDIT_FIELD") || D === consts.get("SWE_GET_PICK_INFO")) {
            C.SetProperty(consts.get("SWE_JS_EXTRA_INFO"), "false")
        }
        SiebelApp.S_App.OfflineCallMethod("SetNewRecord", this, C);
        SiebelApp.S_App.CallServer(C, I, G, F)
    }



}