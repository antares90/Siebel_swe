var EXTFSLoader=EXTFSLoader|| {
    modules: {},
    LoadModule: function (moduleName) {
        var modulePath=this.GetConstant("CLIENT_JS",moduleName),that=this;
        if (!this.modules[moduleName]) {
            require([modulePath], function () {
                that.modules[moduleName] = new EXTFSLoader[modulePath](moduleName);

            });
        }
    },
    GetModule: function (moduleName) {
        if (!!this.modules[moduleName])
            return this.modules[moduleName];
    },
    GetConstant: function(name,fsCode)
    {
        var bs=SiebelApp.S_App.GetService("ATC EXT FS Proxy Service"),
            ps=SiebelApp.S_App.NewPropertySet();
        ps.SetProperty("Code",name);
        ps.SetProperty("FS Code",fsCode);
        var psOut=bs.InvokeMethod("GetConstant",ps);
        var psRes=psOut.GetChildByType("ResultSet");
        var sUrl="";
        if(!!psRes)
            return psRes.GetProperty("Value");
        throw "Константа не найдена";
    }
}
