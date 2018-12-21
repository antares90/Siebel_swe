if( typeof( SiebelAppFacade.VerifyDataPM ) === "undefined" ){
	SiebelJS.Namespace( "SiebelAppFacade.VerifyDataPM" );
	define("siebel/custom/verifydatapm", [], function () {
		SiebelAppFacade.VerifyDataPM = ( function () {
			function VerifyDataPM(proxy) {
				SiebelAppFacade.VerifyDataPM.superclass.constructor.call(this, proxy);
			}
			SiebelJS.Extend(VerifyDataPM, SiebelAppFacade.PresentationModel);
			VerifyDataPM.prototype.Init = function () {
				SiebelAppFacade.VerifyDataPM.superclass.Init.call(this);
				this.AddProperty("FieldName", "");
				this.AddProperty("FieldValue", "");
				this.AddMethod("FieldChange", OnFieldChange, {sequence: false, scope: this});
			};
			function OnFieldChange(control, value) {
				//alert(control.GetName());
				if (control.GetDisplayName().indexOf("Correct Flag") != -1) {
					this.SetProperty("FieldName", control.GetName());
					this.SetProperty("FieldValue", ( value == "Y" ? true : false ));
				}
			}
			return VerifyDataPM;
		}());
		return "SiebelAppFacade.VerifyDataPM";
	});
}
