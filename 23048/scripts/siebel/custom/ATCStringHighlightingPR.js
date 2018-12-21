//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATCStringHighlighting&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATCStringHighlightingPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCStringHighlightingPR");
 define("siebel/custom/ATCStringHighlightingPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.ATCStringHighlightingPR = (function () {

    function ATCStringHighlightingPR(pm) {
     SiebelAppFacade.ATCStringHighlightingPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCStringHighlightingPR, SiebelAppFacade.JQGridRenderer);

    ATCStringHighlightingPR.prototype.Init = function () {
     SiebelAppFacade.ATCStringHighlightingPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATCStringHighlightingPR:      Init method reached.");

    }

    ATCStringHighlightingPR.prototype.ShowUI = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATCStringHighlightingPR:      ShowUI method reached.");
     SiebelAppFacade.ATCStringHighlightingPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATCStringHighlightingPR.prototype.BindData = function (bRefresh) {
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATCStringHighlightingPR:      BindData method reached.");
     SiebelAppFacade.ATCStringHighlightingPR.superclass.BindData.apply(this, arguments);
        var PM = this.GetPM();
        var sColName;
        var sCFFieldList = PM.Get("CF Field List");
        var sCFThresholdList = PM.Get("CF Treshhold List");
        console.log('sCFFieldList =' + sCFFieldList);
        console.log('sCFThresholdList =' + sCFThresholdList);
        if (sCFFieldList) {
            var arrCFFields = sCFFieldList.split(",");
            var arrCFTresholds = sCFThresholdList.split(",");
            var oColumns = this.GetColumnHelper().GetColMap();
            console.log('sCFFieldList =' + sCFFieldList);
            console.log('sCFThresholdList =' + sCFThresholdList);
            console.log('arrCFFields =' + arrCFFields);
            console.log('oColumns =' + oColumns);

            for(var i = 0; i <arrCFFields.length; i++)
            {
                for (sColName in oColumns) {
                    if(oColumns[sColName] == arrCFFields[i])
                    {
                        this.HighlightingString(sColName,arrCFTresholds[i])
                    }
                    else
                    {

                    }
                }
            }
        }
        else
        {
            SiebelJS.Log("No fields")
        }



        var listOfColumns = this.GetPM().Get("ListOfColumns");
        
        var oRecordSet = PM.Get("GetRecordSet");
        var record;
        var row_id;
        var sPlaceHolder = PM.Get("GetPlaceholder");
        var applet = $("#" + sPlaceHolder) 
        //this.GetFieldValue(field_ame)

        for(record in oRecordSet) 
        {
            row_id = Number(record)+1;
            row = applet.find("tr[id*=" + row_id + "]");
           var listOfColumns1 = this.GetPM().Get("ListOfColumns")[2].control;
            //var alt = $(listOfColumns1).attr("alt");
            //var listOfColumns2 = this.GetPM().Get("ListOfColumns")[2].control;
            //var placeHolder = "s_" + PM.Get("GetFullId") + "_div";
            if (listOfColumns1 != null) {
               // $(row).addClass("Lights");
            }
            console.log(listOfColumns1)
            
        }



    }

    ATCStringHighlightingPR.prototype.HighlightingString = function (column, higval)
    {
        var oRecordSet = PM.Get("GetRecordSet");
        var record;
        var row_id;

        for(record in oRecordSet) 
        {
            row_id = Number(record)+1;
            row = applet.find("tr[id*=" + row_id + "]");
            console.log(row_id);
        }
    }


    ATCStringHighlightingPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATCStringHighlightingPR:      BindEvents method reached.");
     SiebelAppFacade.ATCStringHighlightingPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    ATCStringHighlightingPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATCStringHighlightingPR:      EndLife method reached.");
     SiebelAppFacade.ATCStringHighlightingPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return ATCStringHighlightingPR;
   }()
  );
  return "SiebelAppFacade.ATCStringHighlightingPR";
 })
}
