
var s = require("./service/DataService"), o = require("./service/ShareService"), n = require("./service/StorageService"), a = require("./service/SdkService"), r = require("./service/const/HttpConst"), c = function() {
    this.data = null, this.share = null, this.storage = null;
};
c.prototype.initialize = function() {
    this.sdk = a.SdkService.getInstance(), this.data = s.DataService.getInstance(), 
    this.share = o.ShareService.getInstance(), this.storage = n.StorageService.getInstance();
}, c.prototype.loadConfig = function(t, e) {
    this.data.load(t, e);
}, c.prototype.getSheet = function(t, e) {
    var i = this.data.getSheet(t, e);
    return i ? i.data : null;
}, c.prototype.getSheetData = function(t, e, i) {
    return this.data.getData(t, e, i);
}, c.prototype.getSheetFristId = function(t, e) {
    return this.data.getFristId(t, e);
}, c.prototype.getSheetLastId = function(t, e) {
    return this.data.getLastId(t, e);
}, c.prototype.initStorage = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e4, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    this.storage.init(t, e, i, s);
}, c.prototype.setStorage = function(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
    this.storage.setData(t, e, i, s);
}, c.prototype.getStorage = function(t) {
    return this.storage.getData(t);
}, c.prototype.initShare = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    console.log("initShare:", t, e), this.share.init(t, e);
}, c.prototype.setShareConf = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
    this.share.setShareConf(t);
}, c.prototype.getShareConfData = function(t) {
    return this.share.getShareConfData(t);
}, c.prototype.setAppShare = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    this.share.setAppShare(t, e, i, s);
}, c.prototype.shareGroup = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    this.share.shareGroup(t, e, i, s);
}, c.prototype.shareNormal = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    this.share.shareNormal(t, e, i, s);
}, c.prototype.httpGet = function(t, e, i) {
    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    this.sdk.httpGet(t, e, function(t, e) {
        e == r.HttpConst.HTTP_CODE.OK ? i(t) : s && s();
    });
}, c.prototype.httpPost = function(t, e, i) {
    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    this.sdk.httpPost(t, e, function(t, e) {
        e == r.HttpConst.HTTP_CODE.OK ? i(t) : s && s();
    });
};
module.exports = {
    CustomManager: c
}