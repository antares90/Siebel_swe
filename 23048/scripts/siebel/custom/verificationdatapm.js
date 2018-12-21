if( typeof( SiebelAppFacade.VerificationdataPM ) === "undefined" ){
	//для LETO-5217>>dnyudlchiev
	SiebelJS.Namespace( "SiebelAppFacade.VerificationdataPM" );
	define("siebel/custom/verificationdatapm", [], function () {
		SiebelAppFacade.VerificationdataPM = ( function () {
			function VerificationdataPM(proxy) {
				SiebelAppFacade.VerificationdataPM.superclass.constructor.call(this, proxy);
			}
			SiebelJS.Extend(VerificationdataPM, SiebelAppFacade.PresentationModel);
			VerificationdataPM.prototype.Init = function () {
				SiebelAppFacade.VerificationdataPM.superclass.Init.call(this);
				this.AddProperty("FieldName", "");
				this.AddProperty("FieldValue", "");
				this.AddMethod("FieldChange", OnFieldChange, {sequence: false, scope: this});
			};
			function OnFieldChange(control, value) {
				//alert(control.GetName());
				if (control.GetDisplayName().indexOf("ATC Employee Code") != -1) {
					this.SetProperty("FieldName", control.GetName());
					this.SetProperty("FieldValue", ( value == "" ? true : false ));
				}
			}
			return VerificationdataPM;
		}());
		return "SiebelAppFacade.VerificationdataPM";
	});
}
