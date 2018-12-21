//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopList&name=atc_borrower_forKI&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.atc_borrower_forKIPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.atc_borrower_forKIPR");
 define("siebel/custom/atc_borrower_forKIPR", ["siebel/TileLayoutPR"] ,
  function () {
   SiebelAppFacade.atc_borrower_forKIPR = (function () {

    function atc_borrower_forKIPR(pm) {
     SiebelAppFacade.atc_borrower_forKIPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(atc_borrower_forKIPR, SiebelAppFacade.TileLayoutPR);

    atc_borrower_forKIPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.atc_borrower_forKIPR.superclass.Init.apply(this, arguments);
    //    this.AttachPMBinding("P_Picture", this.RefreshData,{scope: this});
    //    this.GetPM().AttachPMBinding("ExecuteUIUpdate", this.RefreshData, {scope: this});
    }

    atc_borrower_forKIPR.prototype.ShowUI = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": atc_borrower_forKIPR:      ShowUI method reached.");
     SiebelAppFacade.atc_borrower_forKIPR.superclass.ShowUI.apply(this, arguments);
  
 
    }

    atc_borrower_forKIPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.atc_borrower_forKIPR.superclass.BindData.apply(this, arguments);
     //    this.RefreshData();

    }

    atc_borrower_forKIPR.prototype.RefreshData = function () {

        //if($(".siebui-form-data input").length > 0) {
			var a = $(".siebui-form-data input").val().length;
			 $('.siebui-form-data input').attr("size",a + 10);

			 $('div[title="Участники сделки Аплет списка"] .siebui-applet-header').css (
				{'display':'none'}
			)
			 $('div[title="Участники сделки Аплет списка"] input').css (
				{'font-weight':'bold','position':'relative','top':'7px','left':'7px'}
			)
				
		 
			$('.siebui-tile-navlink_desc').focusin(function(){
				
			});
		  
			 $('div[title="Участники сделки Аплет списка"] .siebui-tile-container').css (
				{'height':'45px','padding':'0', 'width':'auto'}
			);
			$('div[title="Участники сделки Аплет списка"] .siebui-tile').css (
				{'border-radius':'0px;'}
			);
			$('div[title="Скан-копии Аплет списка"] .siebui-tile').css (
				{'height':'auto','background-color':'white'}
			);
			$('div[title="Скан-копии Аплет списка"] .siebui-tile .siebui-tile-selected').css (
				{'height':'auto'}
			);
			$('div[title="Скан-копии Аплет списка"] .siebui-tile-list').css (
				{'height':'auto'}
			);
			//$('div[title="Скан-копии Аплет списка"]').css (
			//	{'height':'430px'}
			//);
			$('div[title="Скан-копии Аплет списка"] .siebui-tile-container').css (
				{'height':'auto','background-color':'white'}
			);
			$('div[title="Скан-копии Аплет списка"] .siebui-vertical').css (
				{'padding':'60px 0px','background-color':'white','top':'35px','border-left':'none','border-top':'1px solid #E0E0E0','border-right':'1px solid #E0E0E0','border-bottom':'1px solid #E0E0E0','margin-right':'20px'}
			);
		//}

    }

    atc_borrower_forKIPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": atc_borrower_forKIPR:      BindEvents method reached.");
     SiebelAppFacade.atc_borrower_forKIPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    atc_borrower_forKIPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelJS.Log(this.GetPM().Get("GetName")+": atc_borrower_forKIPR:      EndLife method reached.");
     SiebelAppFacade.atc_borrower_forKIPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return atc_borrower_forKIPR;
   }()
  );
  return "SiebelAppFacade.atc_borrower_forKIPR";
 })
}
