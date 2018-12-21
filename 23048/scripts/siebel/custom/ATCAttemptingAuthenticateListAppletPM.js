//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PM&object=DesktopList&name=ATC_SR_Agreement_XM_RateVal_List_Applet&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.ATCAttemptingAuthenticateListAppletPM) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.ATCAttemptingAuthenticateListAppletPM");
    define("siebel/custom/ATCAttemptingAuthenticateListAppletPM", ["siebel/listpmodel"],
        function () {
            SiebelAppFacade.ATCAttemptingAuthenticateListAppletPM = (function () {

                    function ATCAttemptingAuthenticateListAppletPM(pm) {
                        SiebelAppFacade.ATCAttemptingAuthenticateListAppletPM.superclass.constructor.apply(this, arguments);
                    }

                    SiebelJS.Extend(ATCAttemptingAuthenticateListAppletPM, SiebelAppFacade.ListPresentationModel);

                    ATCAttemptingAuthenticateListAppletPM.prototype.Init = function () {
                        SiebelAppFacade.ATCAttemptingAuthenticateListAppletPM.superclass.Init.apply(this, arguments);
                        this.AddMethod('InvokeMethod',this.PreInvokeMethod, {
                            sequence: true,
                            scope: this
                        });
                        this.getConfig();

                    }
                    ATCAttemptingAuthenticateListAppletPM.prototype.PreInvokeMethod=function(methodName,psIn,arg,retVal) {
                        if (methodName === "Drilldown") {
                            var field = psIn.GetProperty("SWEBCFField");
                            if (field === "Photo Id URL" || field === "Best Photo Id URL") {
                                var bc = this.Get("GetBusComp");
                                if (bc.GetFieldValue("Authentification Luna") === "Y") {
                                    if(this.Get("GetLANAError")) {
                                        alert(this.Get("GetLANAError"));
                                    } else {
                                        var request = new XMLHttpRequest(),
                                            url = this.Get("GetLUNAURL") +"/storage/portraits/"+bc.GetFieldValue(field),
                                            renderer =this.GetRenderer();
                                        request.open('GET', url);
                                        request.responseType = 'blob';
                                        request.setRequestHeader("X-Auth-Token",this.Get("GetLUNAAuthToken"));
                                        request.onload = renderer.ShowPhotoPopup.bind(renderer);

                                        request.onerror = function () {
                                            alert("Фотография не найдена");
                                        };
                                        request.send();
                                    }
                                }
                                else {
                                 window.open(bc.GetFieldValue(field));
                                }
                                setCancelOperation(retVal);
                            }
                        }
                    }

                    ATCAttemptingAuthenticateListAppletPM.prototype.getConfig = function () {
                        var bs = SiebelApp.S_App.GetService("ATC Luna Helper"),
                            ps = SiebelApp.S_App.NewPropertySet();
                        ps.SetProperty("ProfileCode", "CLIENT_AUTH_SSL");
                        var psOut = bs.InvokeMethod("GetLunaProfile", ps),
                            psRes = psOut.GetChildByType("ResultSet");
                        if (!!psRes)
                            for (var prop = psRes.GetFirstProperty(); prop!==""&&prop; prop = psRes.GetNextProperty()) {
                                this.SetProperty("Get" + prop, psRes.GetProperty(prop));
                            }
                    }

                    function setCancelOperation(retVal){
                        retVal.CancelOperation=true, retVal.ReturnValue=true, retVal.CancelPost =true;
                        SiebelApp.S_App.uiStatus.Free();
                    }

                    return ATCAttemptingAuthenticateListAppletPM;
                }()
            );
            return "SiebelAppFacade.ATCAttemptingAuthenticateListAppletPM";
        })
}
