//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopList&name=ATC_SR_Agreement_XM_RateVal_List_Applet&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.ATCAttemptingAuthenticateListAppletPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.ATCAttemptingAuthenticateListAppletPR");
    define("siebel/custom/ATCAttemptingAuthenticateListAppletPR", ["siebel/jqgridrenderer", "3rdParty/magnific-popup/jquery.magnific-popup"],
        function () {
            SiebelAppFacade.ATCAttemptingAuthenticateListAppletPR = (function () {

                    function ATCAttemptingAuthenticateListAppletPR(pm) {
                        SiebelAppFacade.ATCAttemptingAuthenticateListAppletPR.superclass.constructor.apply(this, arguments);

                    }

                    SiebelJS.Extend(ATCAttemptingAuthenticateListAppletPR, SiebelAppFacade.JQGridRenderer);

                    ATCAttemptingAuthenticateListAppletPR.prototype.Init = function () {
                        // Init is called each time the object is initialised.
                        // Add code here that should happen before default processing
                        SiebelAppFacade.ATCAttemptingAuthenticateListAppletPR.superclass.Init.apply(this, arguments);
                        // Add code here that should happen after default processing
                    }
                    ATCAttemptingAuthenticateListAppletPR.prototype.ShowPhotoPopup =function(){
                        var i=0;
                    }
                    ATCAttemptingAuthenticateListAppletPR.prototype.ShowUI = function () {
                        SiebelAppFacade.ATCAttemptingAuthenticateListAppletPR.superclass.ShowUI.apply(this, arguments);
                        var pm = this.GetPM(),
                            sURL = SiebelApp.S_App.GetClientURL().replace(/\/start.swe.+/g, '').replace(/^\//g, '');
                        sURL=sURL ==''||sURL.substring(0,4) == "http"?sURL:('/' +sURL);
                        console.log("sURL = ", sURL);
                        $.get(sURL + '/FILES/custom/photoPopup.html',
                            function (data) {
                                pm.SetProperty("GetPhotoPopup", data);
                            });
                        $('#_sweview').append('<link rel="stylesheet" href="' + sURL + '/files/custom/photoPopup.css"/>');
                    }
                    ATCAttemptingAuthenticateListAppletPR.prototype.ShowPhotoPopup = function (evt) {
                        var pm = this.GetPM(),
                            that = this,
                            blob = evt.target.response,
                            url = URL.createObjectURL(blob),
                            status = evt.target.status;
                        if (status === 200) {
                            $.magnificPopup.open({
                                items: {
                                    src: pm.Get('GetPhotoPopup'),
                                    type: 'inline'
                                },
                                callbacks: {
                                    open: this.drawOpenPopup.bind(this, url)
                                }
                            });
                        }
                        else {
                            alert("Фотография не найдена");
                        }
                    }
                    ATCAttemptingAuthenticateListAppletPR.prototype.drawOpenPopup = function (url) {
                        $('#mainImage')[0].src = url;
                    }
                    ATCAttemptingAuthenticateListAppletPR.prototype.BindData = function (bRefresh) {
                        SiebelAppFacade.ATCAttemptingAuthenticateListAppletPR.superclass.BindData.apply(this, arguments);


                    }

                    ATCAttemptingAuthenticateListAppletPR.prototype.BindEvents = function () {
                        // BindEvents is where we add UI event processing.
                        // Add code here that should happen before default processing
                        SiebelAppFacade.ATCAttemptingAuthenticateListAppletPR.superclass.BindEvents.apply(this, arguments);
                        // Add code here that should happen after default processing

                    }

                    return ATCAttemptingAuthenticateListAppletPR;
                }()
            );
            return "SiebelAppFacade.ATCAttemptingAuthenticateListAppletPR";
        })
}
