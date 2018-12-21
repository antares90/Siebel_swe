if (typeof(SiebelAppFacade.ATCAttachmentEXTFSPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.ATCAttachmentEXTFSPR");
 define("siebel/custom/ATCAttachmentEXTFSPR", ["siebel/jqgridrenderer","3rdParty/magnific-popup/jquery.magnific-popup"],
  function () {
   SiebelAppFacade.ATCAttachmentEXTFSPR = (function () {

    function ATCAttachmentEXTFSPR(pm) {
     SiebelAppFacade.ATCAttachmentEXTFSPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(ATCAttachmentEXTFSPR, SiebelAppFacade.JQGridRenderer);

ATCAttachmentEXTFSPR.prototype.OpenPopup=function()
{
    var pm=this.GetPM();
    $.magnificPopup.open({
        items:{
            src: '#EXTFSFilePopup',
            type: 'inline'
        },
        callbacks:{
            open: function(){
                $('#EXTFSFilePopup #Cancel_Ctrl').click(function() {
                    $.magnificPopup.close();
                });
                $('#EXTFSFilePopup #Save_Ctrl').click(function() {
                    var urlInput=$('#EXTFSFilePopup #s_SweUrl');
                    if(!!urlInput[0]) {
                        var sError=pm.saveURLAttachment(urlInput[0].value);
                        if(!!sError)
                            alert(sError);
                        else
                            $.magnificPopup.close();
                    }
                })
                $('#EXTFSFilePopup #s_SweFileName').change(function(evt){
                    var sError =pm.saveFileAttachment(evt.target.files[0]);
                    if(!!sError)
                        alert(sError);
                    else
                        $.magnificPopup.close();
                });
            }
        }

    });
}
    return ATCAttachmentEXTFSPR;
   }()
  );
  return "SiebelAppFacade.ATCAttachmentEXTFSPR";
 })
}
