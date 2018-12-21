"use strict"
if (typeof (SiebelApp.S_App) !== "undefined") {
	if(typeof (SiebelApp.S_App.OnUnLoadAppBckp) === "undefined")
	  SiebelApp.S_App.OnUnLoadAppBckp= SiebelApp.S_App.OnUnLoadApp;

  SiebelApp.S_App.OnUnLoadApp = function() {
	  console.log('SiebelApp.S_App.prototype.OnUnLoadApp');
	  var bs = SiebelApp.S_App.GetService("ATC Logout Service");
	  var psOut = bs.InvokeMethod("Lookup");
	  var psRes = psOut.GetChildByType("ResultSet");
	  
	  var ReplaceFlg = psRes.GetProperty("LogOutFLg");
	  
	  
	  var urlka = SiebelApp.S_App.GetPageURL();
	  var sDate = new Date();
	  var aP = 1; //Взято с ApplicationContext
	  var sURL = urlka + "?SWECmd=Logoff&SWETS=" + sDate.valueOf() + "&SWEPreLd=" + aP;
	  SiebelApp.S_App.OnUnLoadAppBckp.call(this);
	  
	  if(ReplaceFlg == "Y"){			
	  //SiebelApp.S_App.superclass.OnUnLoadApp.call(this);
		$.ajax({
					type : "POST",
					url :  sURL,
					data : 1,
					processData : false,
					complete : true
				})
		window.location.replace("https://auth.pochtabank.ru/oam/server/logout?end_url=https://sales.pochtabank.ru");
	  }else
	  {
		window.location.replace(sURL);
	  }		
   }   
} 