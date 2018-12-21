if(typeof(SiebelApp.OfflineAppMgr)==="undefined"){SiebelJS.Namespace("SiebelApp.OfflineAppMgr");SiebelApp.OfflineAppMgr=(function(){var c=new a();var b=SiebelApp.Offlineconstants;var f=SiebelJS.Dependency("SiebelApp.Constants");var e=true;var d=true;function a(){var i;var h=[];var k={BC:[],prevBC:[],RowId:""};var j;this.SetTimeoutFunc=function(l){j=l};this.ClearTimeout=function(){clearTimeout(j)};if(!(JSON.parse(window.localStorage.getItem("CacheType")))){window.localStorage.setItem("CacheType",JSON.stringify("Reactive"))}this.SetCacheType=function(l){window.localStorage.setItem("CacheType",JSON.stringify(l))};this.GetCacheType=function(){return(JSON.parse(window.localStorage.getItem("CacheType")))};g=function g(){return i};this.SetCmdMap=function(){h.push({cmd:"GotoView",cmdTag:"oinf"});h.push({cmd:"GetViewLayout",cmdTag:"gvl"});h.push({cmd:"GetAppletLayout",cmdTag:"nl"});h.push({cmd:"NewRecord",cmdTag:"nr"});h.push({cmd:"EditRecord",cmdTag:"nr"});h.push({cmd:"WriteRecord",cmdTag:"wr"});h.push({cmd:"DeleteRecord",cmdTag:"dl"});h.push({cmd:"AddRecord",cmdTag:"ar"});h.push({cmd:"GetCachedFrame",cmdTag:"gcf"});h.push({cmd:"GotoPostedAction",cmdTag:"gpa"});h.push({cmd:"EditField",cmdTag:"ef"});h.push({cmd:"NewLayout",cmdTag:"nl"});h.push({cmd:"CreateRecord",cmdTag:"cr"});window.localStorage.setItem("cmdMap",JSON.stringify(h))};this.GetCmdMap=function(){return(JSON.parse(window.localStorage.getItem("cmdMap")))};this.GetOfflineAppContext=function(){return k};g.prototype=this;i=new g();i.constructor=g;return i}a.prototype.ReturnCachedResponse=function(i,k,h,j){var g=SiebelApp.OfflineAppMgr.ModifyRequest(i);offlineCallback=function(n){var p=n;var l;var o=[];if(p!==null&&p!==undefined){l=p.Response;var m=SiebelApp.RequestProcessor.GetRequestType(i);if(m===b.get("EDITRECORD")){if(SiebelApp.RequestProcessor.IsAssoc(l)){SiebelApp.BrowserCacheMgr.GetPCachedResponseExt(i,offlineCallback,"er",p.ObjName,p.Type);return}}SiebelApp.OfflineAppMgr.UpdateStates(m,i,l);if((SiebelApp.OfflineDataMgr.GetRecordParam()).State){l=l.replace(/ClosePopup/g,"")}if(m===b.get("EDIT_FIELD")){if(l.search("ClosePopup")!==-1){l=l.replace(/ClosePopup/g,"")}}o.push(l)}else{if(SiebelApp.RequestProcessor.IsSupported(i)){SiebelApp.OfflineAppMgr.HandleNullResponse(i)}o.push(b.get("CUD_RESPONSE"))}o.push("success");if(j){k.apply(j.context||this,o)}else{k.apply(this,o)}};SiebelApp.BrowserCacheMgr.GetCachedResponse(g,offlineCallback,h)};a.prototype.ReturnCUDResponse=function(h,j){var i=b.get("CUD_RESPONSE");var g=[];g.push(i);j.apply(this,g)};a.prototype.SetWriteDone=function(g){d=g};a.prototype.HandleNullResponse=function(j){var i=0;var g=utils.DecodeFromQueryString(j);var h=g.GetProperty(b.get("SWECMD"));if(h=="GetLastTxn"){alert("Not able to Sync, Please check your Network Connection")}else{SiebelApp.OfflineAppMgr.HandleValidation(i)}};a.prototype.UpdateStates=function(h,k,i){switch(h){case b.get("NEWRECORD"):case b.get("CREATERECORD"):var j=CCFMiscUtil_CreatePropSet();j.DecodeFromString(i);var g=j.GetProperty("Status");if(g&&g.toString()!=="NewPopup"){SiebelApp.OfflineDataMgr.SetNewRecordCommit(true)}case b.get("EDITRECORD"):SiebelApp.OfflineDataMgr.SetRecordParam(true,k);break;case b.get("NEWLAYOUT"):if((SiebelApp.OfflineDataMgr.GetRecordParam()).State===f.get("SWE_PST_APPLET_MODE_NEW")){SiebelApp.OfflineDataMgr.SetNewRecordCommit(true)}SiebelApp.OfflineDataMgr.SetRecordParam(false);break}};a.prototype.CacheOfflineRequest=function(i,j,h){if(SiebelApp.OfflineAppMgr.IsCachableRequest(i)){var g={};g.request=i;g.callback=j;g.async=h;SiebelApp.BrowserCacheMgr.CacheOfflineOp(g)}};a.prototype.OfflineRequestHandler=function(k,g,i){var p=g.successfncallback;var l=SiebelApp.OfflineAppMgr.GetCacheType()==="Proactive";var h=utils.DecodeFromQueryString(k);h.SetProperty(b.get("ASYNC_STATUS"),i);var m=function(s){if(typeof(s)==="string"){var r=[];r.push(s);p.apply(g.context||this,r)}else{p.apply(g.context||this,s)}};var j=SiebelApp.OfflineAppMgr.Validate(h);if(!j){var n=[];n.push(k);n.push(p);n.push(i);n.push(g);var q=SiebelApp.RequestProcessor.IsCUDRequest(h,true);var o=SiebelApp.RequestProcessor.HasCachedResponse(h,true);if(SiebelApp.RequestProcessor.IsNotificationRequest(h)&&l){SiebelApp.OfflineNotificationHandler.RunOfflineNotification(k,m)}if(q){SiebelApp.OfflineAppMgr.CacheOfflineRequest(k,m,i)}if(o){SiebelApp.OfflineAppMgr.ReturnCachedResponse.apply(this,n)}}};a.prototype.Validate=function(g){var h=SiebelApp.RequestProcessor.GetRequestType(g,true);var j=false;var i;switch(h){case b.get("GOTOVIEW"):if(!d){j=true;i=1;SiebelApp.OfflineAppMgr.HandleValidation(i)}break;case b.get("POSITION_ON_ROW"):if(!(SiebelApp.S_App.GetActiveView().GetActiveApplet().hasOwnProperty("GetPopupAppletName"))){if(SiebelApp.OfflineDataMgr.IsNewRecord()){j=true;i=1;SiebelApp.OfflineAppMgr.HandleValidation(i)}}break}return j};a.prototype.HandleValidation=function(h){var g=["Cache not found. Unable to complete operation in offline mode.","No Values Entered for New Record Created. Please enter the values."];SiebelApp.S_App.uiStatus.Free();switch(h){default:alert(g[h])}};a.prototype.IsCachableRequest=function(k){var j=[".js",".htm"];if(k!=="undefined"&&k!==""){for(var h=0;h<j.length;h++){var g=j[h];if(k.indexOf(g)!==-1){return false}}return true}else{return false}};a.prototype.CacheResponse=function(i,h){if(SiebelApp.OfflineAppSettings.GetMode()===false&&SiebelApp.OfflineAppMgr.IsCachableRequest(i)&&h[0]&&h[0]!=="undefined"&&h[0]!==""&&(SiebelApp.RequestProcessor.IsSupported(i))){var g=SiebelApp.OfflineAppMgr.ModifyRequest(i);var j={};j.url=g;j.response=h[0];j.status=h[2].status;j.statusText=h[1];j.responseHeaders=h[2].getAllResponseHeaders();SiebelApp.BrowserCacheMgr.CacheOnlineOp(j)}};a.prototype.ModifyRequest=function(l){var m=["SWEC=","SWETS=","SWEActiveView=","OF_","bci","boi"];var h=l;for(var j=0;j<m.length;j++){var n=m[j];var g=h.indexOf(n);for(;g!==-1;g=h.indexOf(n)){var o=h.substring(0,h.indexOf(n));var k=h.substring(h.indexOf(n),h.length);if(k.indexOf("&")!==-1){k=k.substring(k.indexOf("&")+1,k.length);h=o+k}else{h=o}}}return h};a.prototype.GoOffline=function(){SiebelApp.S_App.uiStatus.Busy({mask:true,timeOut:false});var g=setTimeout(function(){if((SiebelApp.OfflineAppSettings.GetData()===false)){alert("Error in Downloading Offline Package.Please Check the Internet Connection.Empty Cache and Try again.");SiebelApp.S_App.uiStatus.Free()}},SiebelApp.Offlineconstants.get("Timeout"));this.SetTimeoutFunc(g);SiebelJS.Log("Getting Offline Metadata...."+SiebelApp.OfflineUtils.GetTS());var h=SiebelApp.S_App.GenerateSrvrReq("GoOffline");h=SiebelApp.AjaxRequestMgr.SetSrvrReqInputProp(h,[f.get("SYNC_NODE_ID")],[SiebelApp.BrowserCacheMgr.GetSyncNodeId()]);SiebelApp.AjaxRequestMgr.Get(h,SiebelApp.AjaxRequestMgr.ProcessToolbarResponse)};a.prototype.Sync=function(){if((SiebelApp.OfflineAppMgr.GetCacheType()==="Reactive")){SiebelApp.SyncMgr.UpSync()}else{var g=SiebelApp.S_App.GenerateSrvrReq("GetLastTxn");g=SiebelApp.AjaxRequestMgr.SetSrvrReqInputProp(g,[f.get("SYNC_NODE_ID")],[SiebelApp.BrowserCacheMgr.GetSyncNodeId()]);
SiebelApp.AjaxRequestMgr.Get(g,SiebelApp.AjaxRequestMgr.ProcessToolbarResponse)}};a.prototype.SetContextParam=function(k,j,h,i){var g=this.GetOfflineAppContext();if(h!=undefined&&i!=undefined){g.RowNum=i;g.RowId=h}else{if(k!==undefined){g.activeBO=k}g.prevBO=g.BO;g.BO=g.activeBO;g.nBC=j;g.prevBC=g.BC;g.BC=[]}};a.prototype.SetBCContext=function(h,i,k){var g={};g.Name=h;g.Id=i;g.ParentBC=k;var j=this.GetOfflineAppContext();j.BC.push(g)};a.prototype.GetAppContext=function(){return this.GetOfflineAppContext()};return c}())};