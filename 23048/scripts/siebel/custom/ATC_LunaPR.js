if (typeof (SiebelAppFacade.ATC_LunaPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.ATC_LunaPR");
    define("siebel/custom/ATC_LunaPR", ["siebel/phyrenderer"], function () {
        SiebelAppFacade.ATC_LunaPR = (function () {

            function ATC_LunaPR(pm) {
                SiebelAppFacade.ATC_LunaPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(ATC_LunaPR, SiebelAppFacade.PhysicalRenderer);

            ATC_LunaPR.prototype.Init = function () {
                // Init is called each time the object is initialised.
                // Add code here that should happen before default processing
                SiebelAppFacade.ATC_LunaPR.superclass.Init.apply(this, arguments);
                // Add code here that should happen after default processing
                var sBusService = SiebelApp.S_App.GetService("ATC Luna Helper");
                var Inputs = SiebelApp.S_App.NewPropertySet();
                var Outputs = SiebelApp.S_App.NewPropertySet();
                Outputs = sBusService.InvokeMethod("GetLunaProfile", Inputs);
				var pm = this.GetPM()
				pm.AddProperty("AuthToken", Outputs.GetChildByType ("ResultSet").GetProperty("sAuthToken"));
				pm.AddProperty("LunaURL", Outputs.GetChildByType ("ResultSet").GetProperty("sLunaURL"));
				pm.AddProperty("PortraitControlName", pm.Get("GetControls")["PortraitControl"].GetInputName());
            }
			/*
            ATC_LunaPR.prototype.BindData = function (bRefresh) {
                // BindData is called each time the data set changes.
                // This is where you'll bind that data to user interface elements you might have created in ShowUI
                // Add code here that should happen before default processing
				SiebelAppFacade.ATC_LunaPR.superclass.BindData.apply(this, arguments);
                // Add code here that should happen after default processing
				var DescriptorId = this.GetDescriptor()
				this.GetPortrait(DescriptorId);
            }
			*/
			
			ATC_LunaPR.prototype.SetControlValue = function (control, val, b) {
				if (control.GetName() == "OpptyFileName")
				{
					this.hidePortrait(true);
					this.GetPortrait(val);
				}
				else
					ATC_LunaPR.superclass.SetControlValue.call(this, control, val, b);				
			}

			ATC_LunaPR.prototype.GetPortrait = function (DescriptorId) {
				var pm = this.GetPM();
				var oReq = new XMLHttpRequest();
				oReq.open('GET', pm.Get("LunaURL") + '/storage/portraits/'+DescriptorId, true);
				oReq.responseType = "blob";
				oReq.onload = this.drawPortrait.bind(this);
				oReq.setRequestHeader('X-Auth-Token', pm.Get("AuthToken"));
				oReq.send();
			}

			ATC_LunaPR.prototype.drawPortrait = function(evt) {
				var pm=this.GetPM();
				$('#'+pm.Get("PortraitControlName")+' img')[0].src=URL.createObjectURL(evt.target.response);		
				this.hidePortrait(false);
			}

			ATC_LunaPR.prototype.hidePortrait = function(value) {
				var pm=this.GetPM();
				$('#'+pm.Get("PortraitControlName"))[0].hidden = value;
			}

            return ATC_LunaPR;
        }());
        return "SiebelAppFacade.ATC_LunaPR";
    })
}