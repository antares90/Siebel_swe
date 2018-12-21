if(typeof(SiebelAppFacade.ATC_Application_To_Decide_View_KIPR) === "undefined"){
    SiebelJS.Namespace("SiebelAppFacade.ATC_Application_To_Decide_View_KIPR");
    define("siebel/custom/ATC_Application_To_Decide_View_KIPR", ["siebel/viewpr"], function(){
        SiebelAppFacade.ATC_Application_To_Decide_View_KIPR = (function(){
            var PM;
            var PRName = "ATC_Application_To_Decide_View_KIPR";
            function ATC_Application_To_Decide_View_KIPR(){
                SiebelAppFacade.ATC_Application_To_Decide_View_KIPR.superclass.constructor.apply(this,arguments);}
            //Extend view renderer
            SiebelJS.Extend(ATC_Application_To_Decide_View_KIPR, SiebelAppFacade.ViewPR);

            ATC_Application_To_Decide_View_KIPR.prototype.Init = function() {
                SiebelAppFacade.ATC_Application_To_Decide_View_KIPR.superclass.Init.apply(this,arguments);
                PM = this.GetPM();
                PRName = PM.Get("GetName") + "_ATC_Application_To_Decide_View_KIPR";
                SiebelJS.Log("Custom PR " + PRName + ": Init method reached.");
            };
            ATC_Application_To_Decide_View_KIPR.prototype.Setup = function(){
                SiebelJS.Log("Custom PR " + PRName + ": Setup method reached.");
                //implement Setup method here
            };
            ATC_Application_To_Decide_View_KIPR.prototype.SetRenderer = function(){
                SiebelJS.Log("Custom PR " + PRName + ": SetRenderer method reached.");
                //implement SetRenderer method here
            };
            ATC_Application_To_Decide_View_KIPR.prototype.EndLife = function(){
                SiebelJS.Log("Custom PR " + PRName + ": EndLife method reached.");
                //implement EndLife method here
				history.replaceState("DecisionView",null,null);
				//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				//console.log(history.state);
				//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            };
            //implement custom functions here
            return ATC_Application_To_Decide_View_KIPR;
        }());
        return "SiebelAppFacade.ATC_Application_To_Decide_View_KIPR";
    });
}