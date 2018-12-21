if (typeof (SiebelAppFacade.ATC_Client_Photo_List_AppletPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.ATC_Client_Photo_List_AppletPR");
    define("siebel/custom/ATC_Client_Photo_List_AppletPR", ["siebel/jqgridrenderer"], function () {
        SiebelAppFacade.ATC_Client_Photo_List_AppletPR = (function () {

            function ATC_Client_Photo_List_AppletPR(pm) {
                SiebelAppFacade.ATC_Client_Photo_List_AppletPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(ATC_Client_Photo_List_AppletPR, SiebelAppFacade.JQGridRenderer);

            ATC_Client_Photo_List_AppletPR.prototype.Init = function () {
                // Init is called each time the object is initialised.
                // Add code here that should happen before default processing
                SiebelAppFacade.ATC_Client_Photo_List_AppletPR.superclass.Init.apply(this, arguments);
                // Add code here that should happen after default processing
            }

            ATC_Client_Photo_List_AppletPR.prototype.ShowUI = function () {
             // ShowUI is called when the object is initially laid out.
             // Add code here that should happen before default processing
             SiebelAppFacade.ATC_Client_Photo_List_AppletPR.superclass.ShowUI.apply(this, arguments);
             // Add code here that should happen after default processing
            }

            ATC_Client_Photo_List_AppletPR.prototype.BindData = function (bRefresh) {
                // BindData is called each time the data set changes.
                // This is where you'll bind that data to user interface elements you might have created in ShowUI
                // Add code here that should happen before default processing
        				SiebelAppFacade.ATC_Client_Photo_List_AppletPR.superclass.BindData.apply(this, arguments);
                // Add code here that should happen after default processing
                var pm = this.GetPM();
                var bcPhotoList = pm.Get("GetBusComp");
                var bcAttemptAuth = bcPhotoList.GetParentBusComp();
                var AuthLuna = bcAttemptAuth.GetFieldValue("Authentification Luna");
                var applet = $("div#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["ATC Client Photo List Applet"].GetFullId())
                if (AuthLuna==="Y")
                  applet.hide();
                else
                  applet.show();
            }


            return ATC_Client_Photo_List_AppletPR;
        }());
        return "SiebelAppFacade.ATC_Client_Photo_List_AppletPR";
    })
}
