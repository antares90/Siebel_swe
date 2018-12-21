if (typeof(EXTFSLoader.SWIFT)==="undefined")
{
    EXTFSLoader.SWIFT = (function () {
        function SWIFT(moduleName) {
            this.moduleName = moduleName,
            this.containerURL=null,
            SiebelApp.S_App[moduleName] = SiebelApp.S_App[moduleName] || {};
        }
        SWIFT.prototype.getAuthToken=function()
        {
            var token=SiebelApp.S_App[this.moduleName].AuthToken||{token:null,validTill:Date.now()-1000};
            if(token.validTill>Date.now())
                return token.token;
            var bs=SiebelApp.S_App.GetService("ATC EXT FS Proxy Service"),
                ps=SiebelApp.S_App.NewPropertySet();
            var psOut=bs.InvokeMethod("GetAuthToken",ps);
            var psRes=psOut.GetChildByType("ResultSet");
            if(!!psRes)
                if(!!psRes.GetProperty("AuthToken")) {
                    token = {
                        token: psRes.GetProperty("AuthToken"),
                        validTill: new Date(psRes.GetProperty("ValidTill"))
                    },
                        SiebelApp.S_App[this.moduleName].AuthToken=token;
                    return token.token;
                }
            return null;
        }
        SWIFT.prototype.getAttachment=function(urlFile,fileName) {

            var req = new XMLHttpRequest();
            req.open("GET", urlFile, true);
            req.responseType = "blob";
            req.setRequestHeader("X-Auth-Token", this.getAuthToken());
            var fn = fileName;
            req.onload = function (event) {
                var blob = req.response;
                var fileName = fn; //if you have the fileName header available
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            };
            req.send();
        }
        SWIFT.prototype.getContainerURL=function()
        {
            if(!this.containerURL)
                this.containerURL=EXTFSLoader.GetConstant("PROXY_URL",this.moduleName)+"/"+EXTFSLoader.GetConstant("CONTAINER",this.moduleName);
            return this.containerURL;
        }
        SWIFT.prototype.loadAttachment=function(pm,file,name,successCB,errorCB)
        {
            var sUrl=this.getContainerURL()+'/'+name;
            $.ajax({
                url : sUrl,
                type : 'PUT',
                data : file,
                headers: {"X-Auth-Token":this.getAuthToken()},
                processData: false,
                contentType: false,
                success : function(data) {
                    successCB.call(pm,sUrl);
                },
                error: function(){
                    errorCB.call(pm);
                }
            });
        }
        return SWIFT;
    }());
    EXTFSLoader["siebel/custom/ATCSWIFTFS"]=EXTFSLoader.SWIFT;
}


