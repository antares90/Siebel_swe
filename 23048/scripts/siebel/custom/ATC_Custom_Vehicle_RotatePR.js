//Regenerate using:http://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=ATC_Custom_Vehicle_RotatePR&userprops=&comments=Yes&logging=Yes
if (typeof(SiebelAppFacade.ATC_Custom_Vehicle_RotatePR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATC_Custom_Vehicle_RotatePR");
 define("siebel/custom/ATC_Custom_Vehicle_RotatePR", ["siebel/phyrenderer"], function () {
   SiebelAppFacade.ATC_Custom_Vehicle_RotatePR = (function () {

    function ATC_Custom_Vehicle_RotatePR(pm) {
     SiebelAppFacade.ATC_Custom_Vehicle_RotatePR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATC_Custom_Vehicle_RotatePR, SiebelAppFacade.PhysicalRenderer);

    ATC_Custom_Vehicle_RotatePR.prototype.Init = function () {
     SiebelAppFacade.ATC_Custom_Vehicle_RotatePR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Custom_Vehicle_RotatePR:      Init method reached.");
     this.GetPM().AttachPMBinding("ExecuteUIUpdate", this.RefreshData, {scope: this});
    }

    ATC_Custom_Vehicle_RotatePR.prototype.ShowUI = function () {
     //SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Custom_Vehicle_RotatePR:      ShowUI method reached.");
     SiebelAppFacade.ATC_Custom_Vehicle_RotatePR.superclass.ShowUI.apply(this, arguments);
        var pm = this.GetPM();
        var control = '#' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var sample_div = 'sample_div' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var left = 'rotate_left' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var zoom_out = 'zoom_out' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var fit = 'fit' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var zoom_in = 'zoom_in' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var right = 'rotate_right' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();
        //var sample_picture = $('sample_picture' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName());
        //var selector_img = $(sample_picture).selector;
        $(control).after("<div id='"+sample_div+"'></div>");

        //$('#' + sample_div).after("<div id='controls'></div>");
        $("<div id='controls'></div>").appendTo('#' + sample_div);

        $('#controls').css(
            {'background-color': '#fafafb', 'width': '100%', 'height': '35px', 'position': 'absolute', 'top':'300px', 'bottom': '0', 'border-radius':'0px 0px 0px 0px'}
        );

        $('#' +sample_div).css(
            {'background-color': 'white', 'width': '100%', 'height': '0px', 'position': 'absolute', 'top':'-5px', 'bottom': '0', 'border-radius':'0px 0px 0px 0px'}
        );
        $("<a class='"+left+"' type='button' title='Rotate left'><i class='fa fa-rotate-left'></i></a>").appendTo('#' + sample_div + ' ' + '#controls');
        $("<a class='"+zoom_out+"'    type='button' title='Zoom out'><i class='fa fa-search-minus'></i></a></a>").appendTo('#' + sample_div + ' ' + '#controls');
        $("<a class='"+fit+"'        type='button' title='Fit image'><i class='fa fa-arrows-alt'></i></a></a>").appendTo('#' + sample_div + ' ' + '#controls');
        $("<a class='"+zoom_in+"'     type='button' title='Zoom in'><i class='fa fa-search-plus'></i></a></a>").appendTo('#' + sample_div + ' ' + '#controls');
        $("<a class='"+right+"' type='button' title='Rotate left'><i class='fa fa-rotate-right'></i></a></a>").appendTo('#' + sample_div + ' ' + '#controls');

        $('#sample_div_s_6_1_0_0').css(
            {'background-color': '#80A0B0', 'width': '100%', 'height': '0px', 'position': 'absolute', 'bottom': '0', 'top': '23px', 'border-radius': '0px 0px 0px 0px'}

        );
        $('#sample_div_s_1_1_0_0').css(
            {'background-color': '#80A0B0', 'width': '100%', 'height': '0px', 'position': 'absolute', 'bottom': '0', 'top': '23px', 'border-radius': '0px 0px 0px 0px'}

        );
        $('#controls a').css(
            {'line-height': '37px'}
        );
	}

    ATC_Custom_Vehicle_RotatePR.prototype.BindData = function (bRefresh) {
     //SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Custom_Vehicle_RotatePR:      BindData method reached.");
     SiebelAppFacade.ATC_Custom_Vehicle_RotatePR.superclass.BindData.apply(this, arguments);
		this.RefreshData();
		
    }

    ATC_Custom_Vehicle_RotatePR.prototype.BindEvents = function () {
     //SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Custom_Vehicle_RotatePR:      BindEvents method reached.");
     SiebelAppFacade.ATC_Custom_Vehicle_RotatePR.superclass.BindEvents.apply(this, arguments);

    }
	
	ATC_Custom_Vehicle_RotatePR.prototype.RefreshData = function () {
        var pm = this.GetPM();
        var control = '#' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var control1 = pm.Get("GetControls").VehicleFileName.GetInputName();
        console.log(control1);
        var sample_picture = $('sample_pic' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName());
        var selector_img = $(sample_picture).selector;
        var left = 'rotate_left' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var zoom_out = 'zoom_out' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var fit = 'fit' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var zoom_in = 'zoom_in' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();
        var right = 'rotate_right' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName();

        $(control + " " + "img").attr('class', selector_img);

        var sample_picture = $('.sample_pic' + '_' + pm.Get("GetControls").VehicleFileName.GetInputName());
        var picture = $(sample_picture);
        console.log(sample_picture);
        //console.log(picture);

            $(picture).on('load', function() {
                picture.guillotine({ });
                $(picture).guillotine('fit');

                $('.' + left).click(function(){

                    picture.guillotine('rotateLeft');

                });

                $('.' + right).click(function(){

                    picture.guillotine('rotateRight');
                });

                $('.' + fit).click(function(){

                    picture.guillotine('fit');
                });

                $('.' + zoom_in).click(function(){

                    picture.guillotine('zoomIn');
                });

                $('.' + zoom_out).click(function(){
                    picture.guillotine('zoomOut');
                });
        });

    }
	
    ATC_Custom_Vehicle_RotatePR.prototype.EndLife = function () {
     //SiebelJS.Log(this.GetPM().Get("GetName")+": ATC_Custom_Vehicle_RotatePR:      EndLife method reached.");
     SiebelAppFacade.ATC_Custom_Vehicle_RotatePR.superclass.EndLife.apply(this, arguments);
    }

    return ATC_Custom_Vehicle_RotatePR;
   }()
  );
  return "SiebelAppFacade.ATC_Custom_Vehicle_RotatePR";
 })
}
