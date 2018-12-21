if (typeof( SiebelAppFacade.BonusMatrixSalesInfoRenderer ) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.BonusMatrixSalesInfoRenderer");

    define("siebel/custom/bm.sales.info.renderer", ["siebel/phyrenderer"], function () {
        SiebelAppFacade.BonusMatrixSalesInfoRenderer = ( function () {

            var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");

            function BonusMatrixSalesInfoRenderer(pm) {
                SiebelAppFacade.BonusMatrixSalesInfoRenderer.superclass.constructor.call(this, pm);
            }

            SiebelJS.Extend(BonusMatrixSalesInfoRenderer, SiebelAppFacade.PhysicalRenderer);
            BonusMatrixSalesInfoRenderer.prototype.ShowUI = function () {
                SiebelAppFacade.BonusMatrixSalesInfoRenderer.superclass.ShowUI.call(this);
                this.GetPM().AddProperty("LastColumn", []);
            };
            BonusMatrixSalesInfoRenderer.prototype.BindData = function () {
                var colFuncs = {
                    'Bonus With Forecast Sales': this.GetTotal,
                    'Current Bonus': this.GetTotal,
                    'Forecast Bonus': this.GetTotal,
                    'City Kot': this.GetNull,
                    'Job Title Coefficient': this.GetNull,
                    'Period': this.GetNull,
                    'Product Type': this.GetItogo
                };
                var pm = this.GetPM();
                var placeHolder = "s_" + pm.Get("GetFullId") + "_div";
                $('#' + placeHolder).html('');

                var recordSet = pm.Get("GetRecordSet");
                var currentProductType = '';

                //построение таблицы
                if (recordSet.length == 0) {
                    //$("#" + placeHolder).html('<div class="bmSalesDataNotFound">Данные не найдены!</div>');
                }
                else {
                    var tableSalesInfo = '<table id="bmSalesInfoTable" cellpadding="5" cellspacing="0"></table>';
                    var salesInfoHeaderHTML = '<thead><tr id="bmSalesInfoHeader"></tr></thead>'; // шапка таблицы
                    var salesInfoHeaderRowHTML = ''; // строка шапки таблицы

                    var salesInfoBodyRowHTML = ''; // строка данных таблицы
                    var listOfColumns = this.GetPM().Get("ListOfColumns"); //колонки таблицы
                    var column = "";
                    //наполнение заголовка таблицы
                    for (column in listOfColumns) if (listOfColumns.hasOwnProperty(column)) {
                        if (listOfColumns[column]["control"].GetName() != "City Kot" && listOfColumns[column]["control"].GetName() != "Job Title Coefficient" && listOfColumns[column]["control"].GetName() != "Period") {
                            salesInfoHeaderRowHTML += '<th class="bmSalesTableHeaderElement" style="width: ' +
                                listOfColumns[column]["control"].GetWidth() + 'px;">' +
                                listOfColumns[column]["control"].GetDisplayName() + '</th>';
                        }
                    }

                    $("#" + placeHolder).append(tableSalesInfo);
                    $("#bmSalesInfoTable").append(salesInfoHeaderHTML);
                    $("#bmSalesInfoHeader").append(salesInfoHeaderRowHTML);

                    //Итоговая строка
                    salesInfoBodyRowHTML += '<tr id="da-hz-kak-nazvat"/>';

                    //конец итоговой строки, начало тела таблицы.
                    var lastColumn = [];
                    for (record in recordSet) if (recordSet.hasOwnProperty(record)) {
                        lastColumn.push(0);
                        salesInfoBodyRowHTML += "<tr>";

                        for (column in listOfColumns) if (listOfColumns.hasOwnProperty(column)) {
                            //if (listOfColumns[column]["name"] != "City Kot" && listOfColumns[column]["name"] != "Job Title Coefficient") {
                            if (listOfColumns[column]["name"] == "Product Type") {
                                if (currentProductType != recordSet[record]['Product Type']) {
                                    currentProductType = recordSet[record]['Product Type'];
                                    salesInfoBodyRowHTML += '<td class="bmSalesProductGroup" rowspan="' + this.GetCountProducts(recordSet, currentProductType) + '" >' + currentProductType + '</td>';
                                }
                            }
                            else {
                                if (listOfColumns[column]["name"] == "Forecast Sales Num" ||
                                    listOfColumns[column]["name"] == "Fact Sales Num" ||
                                    listOfColumns[column]["name"] == "Bonus") {
                                    salesInfoBodyRowHTML += '<td class="bmSalesTableBodyElement" id="' + listOfColumns[column]["name"].replace(/\s*/g, '') + record + '">';

                                }
                                else if (listOfColumns[column]["name"] == "Bonus With Forecast Sales")
                                    salesInfoBodyRowHTML += '<td class="bmSalesTableBodyElement" id="bmSalesCalculateResult' + record + '">';

                                else if (listOfColumns[column]["name"] == "City Kot" || listOfColumns[column]["name"] == "Job Title Coefficient" || listOfColumns[column]["name"] == "Period")
                                    salesInfoBodyRowHTML += '<td class="bmSalesTableBodyElement" id="' + listOfColumns[column]["name"].replace(/\s*/g, '') + record + '" style="display: none;">';

                                else
                                    salesInfoBodyRowHTML += '<td class="bmSalesTableBodyElement">';

                                switch (listOfColumns[column]["name"]) {
                                    case "Description":
                                        salesInfoBodyRowHTML += '<div id="bmSalesDescription' + record + '" class="bmSalesDescriptionData" title="'+ recordSet[record][listOfColumns[column]["name"]] + '">' + recordSet[record][listOfColumns[column]["name"]] + '</div>';
                                        break;
                                    case "Forecast Sales Num":
                                        if (recordSet[record]['Period'] == "current") {
                                            salesInfoBodyRowHTML += '<input type="text" colnm="' + record + '" class="bmSalesTableInput" />';
                                        }
                                        else {
                                            salesInfoBodyRowHTML += '<input type="text" class="bmSalesTableInput" ' + (recordSet[record]['Period'] == "current" ? 'onkeyup="BonusMatrixCalculate(' + record + ', $(this).val());return false;" ' : 'disabled') + '>';
                                        }
                                        break;
                                    default:
                                        salesInfoBodyRowHTML += recordSet[record][listOfColumns[column]["name"]];
                                        break;
                                }
                                salesInfoBodyRowHTML += '</td>';
                            }
                            //}
                        }
                        salesInfoBodyRowHTML += "</tr>";
                    }
                    this.GetPM().SetProperty("LastColumn", lastColumn);
                    $("#bmSalesInfoTable").append(salesInfoBodyRowHTML);
                    var self = this;
                    $('.bmSalesTableInput').on('keyup', function (e) {
                        self.BonusMatrixCalculate(e)
                    });
                    this.RefreshLastRow(listOfColumns);
                    $('.bmSalesDescriptionData').each(function (index) {
                        //$(".bmSalesTableBodyElement").click(function (event) {
                            //if (!$('#bmSalesDescriptionPopup' + index).length) {
                                //$('.bmSalesDescriptionPopup').remove(); //Удаление текущих активных подсказок
                                //$(this).append('<div class="bmSalesDescriptionPopup' + index + '" id="bmSalesDescriptionPopup' + index + '</div></div>');
                                    $("#bmSalesDescription" + index).tooltip({
                                        show: {
                                            effect: "Fade"
                                        }
                                        
                                    });
                                    $("#bmSalesDescription" + index).tooltip({
                                        hide: {
                                            effect: "Fade"
                                        }
                                        
                                    });
                                /*200px - высота всплывающего окна*/
                                //$('#bmSalesDescriptionPopup' + index).show('fast');
                                //$('#bmSalesDescriptionPopup' + index).mouseleave(function (event) {
                                   // $(this).remove();
                                //});
                            //}
                        //});
                        //$(this).mouseleave(function (event) {
                         //   if ($('#bmSalesDescriptionPopup' + index).length)
                          //      $('#bmSalesDescriptionPopup' + index).remove();
                        //});
                    });
                    /*$('#bmSalesInfoTable th').each( function () {
                     $(this).css('width', $(this).parent().css('width'));
                     });*/
                }
            };
            BonusMatrixSalesInfoRenderer.prototype.EndLife = function () {
                $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().undelegate();
                SiebelAppFacade.BonusMatrixSalesInfoRenderer.superclass.EndLife.call(this);
                $('.bmSalesDescriptionPopup').remove();
            };
            BonusMatrixSalesInfoRenderer.prototype.GetCountProducts = function (prodArr, prodName) {
                /* Получение кол-ва строк для продукта */
                var count = 0;
                for (prod in prodArr) {
                    if (prodArr[prod]["Product Type"] == prodName)
                        count++;
                }
                return count;
            }

            BonusMatrixSalesInfoRenderer.prototype.RefreshLastRow = function (listOfColumns) {
                var colFuncs = {
                    'Bonus With Forecast Sales': this.GetLastRowSum,
                    'Current Bonus': this.GetTotal,
                    'Forecast Bonus': this.GetTotal,
                    'City Kot': this.GetNull,
                    'Job Title Coefficient': this.GetNull,
                    'Period': this.GetNull,
                    'Product Type': this.GetItogo
                };
                var placeHolder = $('#da-hz-kak-nazvat');
                var salesInfoBodyRowHTML = '';
                for (column in listOfColumns) if (listOfColumns.hasOwnProperty(column)) {
                    var func = colFuncs[listOfColumns[column]["name"]];
                    if (!!func)
                        salesInfoBodyRowHTML += func.call(this, listOfColumns[column]["name"]);
                    else
                        salesInfoBodyRowHTML += '<td class="bmSalesTableBodyTotal"/>';
                }
                placeHolder.html(salesInfoBodyRowHTML);
            }
            BonusMatrixSalesInfoRenderer.prototype.GetNull = function (colName) {
                return '';
            }
            BonusMatrixSalesInfoRenderer.prototype.GetItogo = function (colName) {
                return '<td class="bmSalesTableBodyTotal"><b>Итого</b></td>';
            }
            BonusMatrixSalesInfoRenderer.prototype.GetLastRowSum = function (colName) {
                var recordSet = this.GetPM().Get('LastColumn');
                var sum = 0;
                for (var i = 0; i < recordSet.length; i++)
                    sum += parseFloat(recordSet[i]);
                return '<td class="bmSalesTableBodyTotal"><b>' + sum.toLocaleString() + '</b></td>';
            }
            BonusMatrixSalesInfoRenderer.prototype.GetTotal = function (colName) {
                var recordSet = this.GetPM().Get('GetBusComp').GetRecordSet();
                var sum = 0;
                $.each(recordSet, function (index, value) {
                    sum += parseFloat(value[colName]);
                })
                return '<td class="bmSalesTableBodyTotal"><b>' + sum.toLocaleString() + '</b></td>';
            }
            BonusMatrixSalesInfoRenderer.prototype.BonusMatrixCalculate = function (e) {
                var index = e.currentTarget.attributes['colnm'].value, value = e.currentTarget.value;
                /*' + (recordSet[record]['Period'] == "current" ? 'onkeyup="BonusMatrixCalculate(' + record + ', $(this).val());return false;" ' : 'disabled') +*/
                if (value != "") {
                    if (!(value == parseInt(value, 10))) {
                        $('#bmSalesCalculateResult' + index).html("");
                        $('#bmSalesCalculateResult' + index).html("");
                        $('#ForecastSalesNum' + index).children().val("");
                        //$('#bmSalesCalculateResult' + index).html("Введите число!");
                    }
                    else {
                        /*if (console)
                         {
                         console.log('fact sales num: '  + parseFloat( $('#FactSalesNum' + index + '').text().replace(/\s|&nbsp;|,/g, '') ) );
                         console.log('input sales num: ' + parseFloat( value ));
                         console.log('bonus: ' + parseFloat( $('#Bonus' + index ).text().replace(/\s|&nbsp;|,/g, '')));
                         console.log('city kot: ' + parseFloat( $('#CityKot' + index ).text().replace(/\s|&nbsp;/g, '').replace(/,/g ,'.') ));
                         console.log('job title coeff: ' + parseFloat( $('#JobTitleCoefficient' + index ).text().replace(/\s|&nbsp;|,/g, '') ));

                         var res = 	(
                         ( 	parseFloat( $('#FactSalesNum' + index + '').text().replace(/\s|&nbsp;|,/g, '') ) +
                         parseFloat( value ) ) *
                         parseFloat( $('#Bonus' + index ).text().replace(/\s|&nbsp;|,/g, ''))
                         ).toString() ;
                         console.log( (res.charAt(res.length - 2) == '.' ? res + '0' : res));
                         }*/

                        var res = (  ( parseFloat($('#FactSalesNum' + index + '').text().replace(/\s|&nbsp;/g, '').replace(/,/g, '.')) +
                            parseFloat(value) ) *
                            parseFloat($('#Bonus' + index).text().replace(/\s|&nbsp;/g, '').replace(/,/g, '.')) *
                            parseFloat($('#CityKot' + index).text().replace(/\s|&nbsp;/g, '').replace(/,/g, '.')) *
                            parseFloat($('#JobTitleCoefficient' + index).text().replace(/\s|&nbsp;|,/g, '').replace(/,/g, '.'))
                        ).toFixed(1).toString();
                        $('#bmSalesCalculateResult' + index).html((res.charAt(res.length - 1) == '.' ? res + '0' : res));
                        this.GetPM().Get('LastColumn')[index] = res;
                        this.RefreshLastRow(this.GetPM().Get('ListOfColumns'));
                    }
                }
                else {
                    $('#bmSalesCalculateResult' + index).html('');
                }
            };
            return BonusMatrixSalesInfoRenderer;
        }());

        return "SiebelAppFacade.BonusMatrixSalesInfoRenderer";
    });
}
