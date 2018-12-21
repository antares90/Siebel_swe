if(typeof(SiebelAppFacade.ATCDefaultViewPR) === "undefined"){
    SiebelJS.Namespace("SiebelAppFacade.ATCDefaultViewPR");
    define("siebel/custom/ATCDefaultViewPR", ["siebel/viewpr"], function(){
        SiebelAppFacade.ATCDefaultViewPR = (function(){
            var PM;
            var PRName = "ATCDefaultViewPR";
			console.log("!!!!!!!!!!!!!!!!!!!!!!!INIT!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            function ATCDefaultViewPR(){
                SiebelAppFacade.ATCDefaultViewPR.superclass.constructor.apply(this,arguments);}
            //Extend view renderer
            SiebelJS.Extend(ATCDefaultViewPR, SiebelAppFacade.ViewPR);

            ATCDefaultViewPR.prototype.Init = function() {
                SiebelAppFacade.ATCDefaultViewPR.superclass.Init.apply(this,arguments);
                PM = this.GetPM();
                PRName = PM.Get("GetName");
                SiebelJS.Log("Custom PR " + PRName + ": Init method reached.");
				console.log("!!!!!!!!!!!!!!!!!!!!!!!INIT!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            };
            ATCDefaultViewPR.prototype.Setup = function(){
                SiebelJS.Log("Custom PR " + PRName + ": Setup method reached.");
                //implement Setup method here
				console.log("!!!!!!!!!!!!!!!!!!!!!!!INIT!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            };
            ATCDefaultViewPR.prototype.SetRenderer = function(){
                SiebelJS.Log("Custom PR " + PRName + ": SetRenderer method reached.");
                //implement SetRenderer method here
				console.log("!!!!!!!!!!!!!!!!!!!!!!!INIT!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            };
            ATCDefaultViewPR.prototype.EndLife = function(){
				SiebelAppFacade.ATCDefaultViewPR.superclass.EndLife.call(this);
                SiebelJS.Log("Custom PR " + PRName + ": EndLife method reached.");
                //implement EndLife method here
				console.log("!!!!!!!!!!!!!!!!!!!!!!!INIT!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				if(PRName == "ATC Application To Decide View KI")
				{
					history.replaceState("DecisionView",null,null);
					console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					console.log(history.state);
					console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				}
            };
            //implement custom functions here
            return ATCDefaultViewPR;
        }());
        return "SiebelAppFacade.ATCDefaultViewPR";
    });
}