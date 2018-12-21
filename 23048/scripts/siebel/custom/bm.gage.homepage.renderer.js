if (typeof( SiebelAppFacade.BonusMatrixGageHomePageRenderer ) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.BonusMatrixGageHomePageRenderer");
    define("siebel/custom/bm.gage.homepage.renderer", ["siebel/phyrenderer", "siebel/custom/gage_lib/gaugeSVG.js"], function () {
        SiebelAppFacade.BonusMatrixGageHomePageRenderer = (function () {

            function BonusMatrixGageHomePageRenderer(pm) {

                SiebelAppFacade.BonusMatrixGageHomePageRenderer.superclass.constructor.call(this, pm);
            }

            SiebelJS.Extend(BonusMatrixGageHomePageRenderer, SiebelAppFacade.PhysicalRenderer);

            BonusMatrixGageHomePageRenderer.prototype.ShowUI = function () {
                SiebelAppFacade.BonusMatrixGageHomePageRenderer.superclass.ShowUI.call(this);
            };
            BonusMatrixGageHomePageRenderer.prototype.BindData = function () {
                var pm = this.GetPM();


                // Пихаем в нужное место график в зависимости от апплета
                var placeHolder = "s_" + pm.Get("GetFullId") + "_div";
                if(this.GetPM().GetObjName() == 'ATC Bonus Matrix Employee Gage List Applet')
                    placeHolder = "s_" + pm.Get("GetFullId") + "_div .leto-button-info-left";


                $("#" + placeHolder).attr('title', '');
                $("#" + placeHolder).html('');
                var recordSet = pm.Get("GetRecordSet");

                var gaugeInfArr = {
                    "sales_volume": {
                        "title": "БизнесМетр",
                        "label": ""/*"Объем продаж"*/
                    },
                    "earned_bonus": {
                        "title": "БонусМетр",
                        "label": "руб" /*"Бонус, руб."*/
                    }
                }

                if (recordSet.length > 0) {
                    for (var record in recordSet) {
                        var currentValue = recordSet[record]["Current Value"] || null,
                            type = recordSet[record]['Type'] || null,
                            unit = recordSet[record]["Unit"] || null,
                            greenMax = recordSet[record]["Green Max"] || null,
                            redMax = recordSet[record]["Red Max"] || null,
                            yellowMax = recordSet[record]["Yellow Max"] || null;

                        if (!!currentValue && !!type && !!unit && !!greenMax && !!redMax && !!yellowMax) {
                            $('#' + placeHolder).append('<div class="bm_gage" style="width:150px; height:120px; display: inline-block; margin: 1em;" id="gg' + record + '"></div>');
                            new GaugeSVG({
                                id: "gg" + record,
                                value: currentValue.replace(/\s*/g, ''),
                                valueColor: "#888",
                                title: gaugeInfArr[type]["title"],
                                titleColor: "#DA1D5F",
                                //label: gaugeInfArr[recordSet[record]['Type']]['label'],
                                label: unit,
                                gaugeWidthScale: 1,
                                min: 0,
                                max: greenMax.replace(/\s*/g, ''),
                                lowerActionLimit: redMax.replace(/\s*/g, ''),
                                upperActionLimit: -1,
                                lowerWarningLimit: redMax.replace(/\s*/g, ''),
                                upperWarningLimit: yellowMax.replace(/\s*/g, ''),
                                needleColor: "#f00",
                                optimumRangeColor: "#ff6", //желтая зона
                                warningRangeColor: "#44944A", //зеленая зона
                                actionRangeColor: "#f66", //красная зона
                                canvasBackColor: "#fff",
                                gaugeBackColor: "#fff",
                                showGaugeShadow: false
                            });

                            if (this.GetPM().GetObjName() == 'ATC Bonus Matrix Employee Gage List Applet'){
                                $('#gg' + record).mouseenter(function (event) {
                                    var gaugeId = ($(this).attr('id').slice(-1));
                                    if (!$('#bmGaugeDescriptionPopup' + gaugeId).length) {
                                        $('.bmGaugeDescriptionPopup').remove(); //Удаление текущих активных подсказок

                                        $('#gg' + gaugeId).append('<div class="bmGaugeDescriptionPopup" id="bmGaugeDescriptionPopup' + gaugeId +
                                            '" style="top: ' + (parseInt($('#gg' + gaugeId).offset().top) - 180) +
                                            'px; left: ' + (parseInt($('#gg' + gaugeId).offset().left) + parseInt($('#gg' + gaugeId).width()) - 40) +
                                            'px;"><div class="bmGaugeDescriptionPopupData">' + recordSet[gaugeId]["Comments"] + '</div></div>');
                                        /*200px - высота всплывающего окна*/

                                        $('#bmGaugeDescriptionPopup' + gaugeId).show('fast');
                                        $('#bmGaugeDescriptionPopup' + gaugeId).mouseleave(function (event) {
                                            $(this).remove();
                                        });
                                    }
                                });
                                $('#gg' + record).mouseleave(function (event) {
                                    var gaugeId = ($(this).attr('id').slice(-1));
                                    if ($('#bmGaugeDescriptionPopup' + gaugeId).length)
                                        $('#bmGaugeDescriptionPopup' + gaugeId).remove();
                                });
                            }

                        }
                    }
                }

            };
            BonusMatrixGageHomePageRenderer.prototype.EndLife = function () {
                $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().undelegate();

                SiebelAppFacade.BonusMatrixGageHomePageRenderer.superclass.EndLife.call(this);
            };
            return BonusMatrixGageHomePageRenderer;

        }());
        return "SiebelAppFacade.BonusMatrixGageHomePageRenderer";
    });
}