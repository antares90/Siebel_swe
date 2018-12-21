if(typeof(SiebelApp.S_App.CommToolbar)==="undefined"){

    var InitCTIToolbar =  SiebelApp.S_App.CommToolbar.prototype.prototype.InitCTIToolbar;

    SiebelApp.S_App.CommToolbar.prototype.prototype.InitCTIToolbar = function () {
        console.clear();
        console.log('SiebelApp.S_App.CommToolbar.prototype.prototype.InitCTIToolbar');
	
        InitCTIToolbar.call(this);
    };
}
