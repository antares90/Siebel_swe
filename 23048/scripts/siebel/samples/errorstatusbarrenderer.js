    SiebelJS.Namespace('SiebelAppFacade.ErrorObjectRenderer');

    define("siebel/errorstatusbarrenderer", ["siebel/basephyrenderer"], function () {
    SiebelAppFacade.ErrorObjectRenderer = (function () {

        function ErrorObjectRenderer(pm) {
            SiebelAppFacade.ErrorObjectRenderer.superclass.constructor.call(this, pm);
        }

        SiebelJS.Extend(ErrorObjectRenderer, SiebelAppFacade.BasePR);


        ErrorObjectRenderer.prototype.ShowUI = function () {
            SiebelAppFacade.ErrorObjectRenderer.superclass.ShowUI.call(this);
            CreateStatusBar(this);
        };

        ErrorObjectRenderer.prototype.BindEvents = function (controls, forceStop) {
            SiebelAppFacade.ErrorObjectRenderer.superclass.BindEvents.call(this);

            $(".siebui-statusbar").bind("click", { ctx: this }, function (event) {
                    $("#_sweview_statusbar").hide();
            });

        };

        ErrorObjectRenderer.prototype.ShowError = function (errMsg) {
            if (errMsg) {
                    $("#_sweview_statusbar").text(errMsg).show();
            }
        };

        function CreateStatusBar() {
            var divErr;
                if ($("#_sweview_statusbar").length === 0) {
                    divErr = "<div id = '_sweview_statusbar' class ='siebui-statusbar'>" + "</div>";
                if ($("#_sweview").length !== 0) {
                    $("#_sweview").append(divErr);
                }
            }            
                $("#_sweview_statusbar").hide();
        }
        return ErrorObjectRenderer;
    })();
        return SiebelAppFacade.ErrorObjectRenderer;
    });    