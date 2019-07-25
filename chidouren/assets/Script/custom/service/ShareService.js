
var 
//s = require("../util/Utils"), o = require("../util/RandomTools"), n = require("./conf/ShareConf"), a = require("./SdkService"), r =require("./share/ShareGroup"), c = require("../util/StringUtils"), 
h = function() {
    // this.shareTxt = s.Utils.clone(n.ShareConf.SHARE_TXT), this.shareImg = s.Utils.clone(n.ShareConf.SHARE_IMG), 
    // this.shareUrl = s.Utils.clone(n.ShareConf.SHARE_URL), this.shareConf = s.Utils.clone(n.ShareConf.SHARE_CONF), 
    // this.group = new r.ShareGroup(), this.shareData = null, this.isOpen = !1, this.isCheck = !1, 
    // this.isRemote = !1;
};
module.exports = {
    ShareService: h
};
var l = null;
h.getInstance = function() {
    return null == l && (l = new h()), l;
}, h.prototype.getShareInfo = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = this.getLastShareId(t);
    if (!this.shareConf.hasOwnProperty(i)) return null;
    var s = this.shareConf[i];
    if (s.length <= 0) return null;
    var n = s[o.RandomTools.randomInt(0, s.length - 1)], a = n.txt, r = n.img, h = {
        shareId: i,
        txtId: a,
        imgId: r, 
        urlId: this.isRemote && n.url ? n.url + "" : "",
        title: "",
        imgUrl: ""
    };
    return this.shareTxt.hasOwnProperty(a) && (h.title = e ? c.StringUtils.stringKeyValue(this.shareTxt[a], e) : this.shareTxt[a]), 
    this.shareImg.hasOwnProperty(r) && (h.imgUrl = this.shareImg[r]), h;
}, h.prototype.init = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    "undefined" != typeof wx && (wx.showShareMenu(), wx.updateShareMenu({
        withShareTicket: !0
    }), this.setShareConf(t), this.shareData = e, e && this.group.init(e.group), this.isOpen = t.isOpen, 
    this.isCheck = this.checkSDKVersion("2.4.3"), this.isRemote = this.isOpen && this.isCheck);
}, h.prototype.setShareConf = function(t) {
    t && (this.setTxtMap(t.shareTxt), this.setImageMap(t.shareImg), this.setUrlMap(t.shareUrl), 
    this.setShareInfo(t.shareConf));
}, h.prototype.getShareConfData = function(t) {
    if (!this.shareConf.hasOwnProperty(t)) return null;
    var e = this.shareConf[t];
    return e.length <= 0 ? null : e[o.RandomTools.randomInt(0, e.length - 1)];
}, h.prototype.getLastShareId = function(t) {
    return this.isOpen && !this.isCheck ? "8888" : t;
}, h.prototype.setTxtMap = function(t) {
    this.shareTxt = s.Utils.clone(t);
}, h.prototype.setImageMap = function(t) {
    this.shareImg = s.Utils.clone(t);
}, h.prototype.setUrlMap = function(t) {
    this.shareUrl = s.Utils.clone(t);
}, h.prototype.setShareInfo = function(t) {
    this.shareConf = s.Utils.clone(t);
}, h.prototype.shareGroup = function(t, e, i) {
    var s = this, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, n = this.getShareInfo(t, o);
    null != n && a.SdkService.getInstance().shareGroup(n.title, n.imgUrl, n.urlId, e, function(t) {
        s.group.execute(i, t);
    }, n);
}, h.prototype.shareNormal = function(t, e, i) {
    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, o = this.getShareInfo(t, s);
    null != o && a.SdkService.getInstance().shareNormal(o.title, o.imgUrl, o.urlId, e, i, o);
}, h.prototype.setAppShare = function(t, e, i) {
    var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, o = this.getShareInfo(t, s);
    null != o && a.SdkService.getInstance().setAppShare(o.title, o.imgUrl, o.urlId, e, i, o);
}, h.prototype.checkSDKVersion = function(t) {
    if ("undefined" == typeof wx) return !1;
    var e = wx.getSystemInfoSync(), i = (e && e.SDKVersion ? e.SDKVersion : "0.0.0").split("."), s = t.split(".");
    return Number(i[0]) > Number(s[0]) || !(Number(i[0]) < Number(s[0])) && (Number(i[1]) > Number(s[1]) || !(Number(i[1]) < Number(s[1])) && Number(i[2]) >= Number(s[2]));
}