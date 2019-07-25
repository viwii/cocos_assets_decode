
var s = require("../util/Utils"), 
o = require("./sdk/CocosSdk"), 
n = require("./sdk/WechatSdk"), 
a = require("./const/HttpConst"), 
r = require("./const/ShareConst"), 
c = require("./const/SdkConst"), 
h = require("./conf/SdkConf"), l = function() {
    this.sdkConf = {};
    var t = "undefined" != typeof wx;
    for (var e in h.SdkConf.SDK_CONF) this.sdkConf[e] = t ? s.Utils.clone(h.SdkConf.SDK_CONF[e]) : c.SdkConst.PLATFORM_TYPE.COCOS;
    this.sdks = {}, this.sdks[c.SdkConst.PLATFORM_TYPE.COCOS] = new o.CocosSdk(), this.sdks[c.SdkConst.PLATFORM_TYPE.WECHAT] = new n.WechatSdk();
};
module.exports = {
    SdkService: l
};
var d = null;
l.getInstance = function() {
    return null == d && (d = new l()), d;
}, l.prototype.getFunction = function(t, e) {
    s.Utils.isValidValue(e) || (e = this.sdkConf[c.SdkConst.CONF_TYPE.NORMAL]);
    var i = this.sdkConf[c.SdkConst.CONF_TYPE.DEFAULT];
    return s.Utils.getObjFuncEx(this.sdks[e], t, this.sdks[i]);
}, l.prototype.setConfPlatform = function(t, e) {
    this.sdkConf[t] = e;
}, l.prototype.getStorage = function(t, e) {
    var i = this.getFunction("getStorage");
    if (!i) return console.log("SdkService.getStorage sdk func not exist"), void s.Utils.invokeCb(e, null);
    i(t, e);
}, l.prototype.setStorage = function(t, e, i) {
    var o = this.getFunction("setStorage");
    if (!o) return console.log("SdkService.setStorage sdk func not exist"), void s.Utils.invokeCb(i, !1);
    o(t, e, i);
}, l.prototype.httpGet = function(t, e, i) {
    var o = this.sdkConf[c.SdkConst.CONF_TYPE.HTTP], n = this.getFunction("httpRequest", o);
    if (!n) return console.log("SdkService.httpGet sdk func not exist"), void s.Utils.invokeCb(i, null, a.HttpConst.HTTP_CODE.FUNC_NOT_EXIST);
    n(a.HttpConst.HTTP_METHOD.GET, t, e, i);
}, l.prototype.httpPost = function(t, e, i) {
    var o = this.sdkConf[c.SdkConst.CONF_TYPE.HTTP], n = this.getFunction("httpRequest", o);
    if (!n) return console.log("SdkService.httpPost sdk func not exist"), void s.Utils.invokeCb(i, null, a.HttpConst.HTTP_CODE.FUNC_NOT_EXIST);
    n(a.HttpConst.HTTP_METHOD.POST, t, e, i);
}, l.prototype.shareNormal = function(t, e, i, o, n, a) {
    var c = this.getFunction("shareAppMessage");
    if (!c) {
        var h = {
            succ: !1,
            mod: r.ShareConst.SHARE_MOD.NORMAL,
            code: r.ShareConst.SHARE_CODE.FUNC_NOT_EXIST,
            cbParam: a
        };
        return console.log("SdkService.shareNormal sdk func not exist"), void s.Utils.invokeCb(n, h);
    }
    c(r.ShareConst.SHARE_MOD.NORMAL, t, e, i, o, n, a);
}, l.prototype.shareGroup = function(t, e, i, o, n, a) {
    var c = this.getFunction("shareAppMessage");
    if (!c) {
        var h = {
            succ: !1,
            mod: r.ShareConst.SHARE_MOD.GROUP,
            code: r.ShareConst.SHARE_CODE.FUNC_NOT_EXIST,
            cbParam: a
        };
        return console.log("SdkService.shareGroup sdk func not exist"), void s.Utils.invokeCb(n, h);
    }
    c(r.ShareConst.SHARE_MOD.GROUP, t, e, i, o, n, a);
}, l.prototype.setAppShare = function(t, e, i, o, n, a) {
    var c = this.getFunction("setupAppMessage");
    if (!c) {
        var h = {
            succ: !1,
            mod: r.ShareConst.SHARE_MOD.NORMAL,
            code: r.ShareConst.SHARE_CODE.FUNC_NOT_EXIST,
            cbParam: a
        };
        return console.log("SdkService.setAppShare sdk func not exist"), void s.Utils.invokeCb(n, h);
    }
    c(r.ShareConst.SHARE_MOD.NORMAL, t, e, i, o, n, a);
} 