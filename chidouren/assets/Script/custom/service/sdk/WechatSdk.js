
var s = require("../../util/Utils"), o = require("../../util/WebUtils"), n = require("../const/HttpConst"), a = require("../const/ShareConst"), r = function() {};
module.exports = {
    WechatSdk: r
}, r.prototype.checkWx = function() {
    return "undefined" != typeof wx;
}, r.prototype.checkWxFunction = function(t) {
    return this.checkWx() ? s.Utils.isFunction(wx[t]) : null;
}, r.prototype.getStorage = function(t, e) {
    if (t = "" + t, !this.checkWxFunction("getStorage")) return console.log("wechat getStorage err, wx is low", t), 
    void s.Utils.invokeCb(e, null);
    wx.getStorage({
        key: t,
        success: function(i) {
            if (!i) return console.log("wechat getStorage data res = null", t), void s.Utils.invokeCb(e, {});
            s.Utils.invokeCb(e, i.data);
        },
        fail: function(i) {
            console.log("wechat getStorage fail", t, i), s.Utils.invokeCb(e, {});
        }
    });
}, r.prototype.setStorage = function(t, e, i) {
    return t = "" + t, this.checkWxFunction("setStorage") ? s.Utils.isObject(e) ? void wx.setStorage({
        key: t,
        data: e,
        success: function() {
            s.Utils.invokeCb(i, !0);
        },
        fail: function() {
            console.log("wechat setStorage fail", t, e), s.Utils.invokeCb(i, !1);
        }
    }) : (console.log("wechat setStorage data format err", t, e), void s.Utils.invokeCb(i, !1)) : (console.log("wechat setStorage err, wx is low", t, e), 
    void s.Utils.invokeCb(i, !1));
}, r.prototype.httpRequest = function(t, e, i, o) {
    if (!this.checkWxFunction("request")) return console.log("wechat httpRequest err, wx is low", key, i), 
    void s.Utils.invokeCb(o, null, n.HttpConst.HTTP_CODE.WX_FUNC_FAILD);
    if (!s.Utils.isObject(i)) return console.log("wechat httpRequest data format err", key, i), 
    void s.Utils.invokeCb(o, null, n.HttpConst.HTTP_CODE.NOT_OBJECT);
    var a = {};
    a.url = e, a.header = {
        "Content-Type": "application/x-www-form-urlencoded;"
    }, a.data = i, a.method = t, a.dataType = "json", a.success = function(t) {
        var e = null;
        200 == t.statusCode && (e = t.data), s.Utils.invokeCb(o, e, t.statusCode);
    }, a.fail = function() {
        s.Utils.invokeCb(o, null, n.HttpConst.HTTP_CODE.FAILED);
    }, console.log("wechat httpRequest succ", i), wx.request(a);
}, r.prototype.shareAppMessage = function(t, e, i, n, r, c, h) {
    var l = {
        succ: !1,
        mod: t,
        code: a.ShareConst.SHARE_CODE.FAILED,
        cbParam: h
    };
    if (!this.checkWxFunction("shareAppMessage")) return console.log("wechat shareAppMessage err, wx is low"), 
    l.code = a.ShareConst.SHARE_CODE.WX_FUNC_FAILD, void s.Utils.invokeCb(c, l);
    var d = {
        title: e,
        query: o.WebUtils.obj2UriParam(r),
        imageUrl: i,
        imageUrlId: n,
        success: function(e) {
            t == a.ShareConst.SHARE_MOD.GROUP ? e.hasOwnProperty("shareTickets") ? (console.log("分享到群成功"), 
            l.succ = !0, l.code = a.ShareConst.SHARE_CODE.GROUP_SUCC, l.shareTickets = e.shareTickets, 
            s.Utils.invokeCb(c, l)) : (console.log("分享到群失败"), l.code = a.ShareConst.SHARE_CODE.FAILED_GOURP, 
            s.Utils.invokeCb(c, l)) : (console.log("分享成功"), l.succ = !0, l.code = a.ShareConst.SHARE_CODE.NORMAL_SUCC, 
            s.Utils.invokeCb(c, l));
        },
        fail: function(t) {
            console.log("wechat shareAppMessage fail:", t), l.code = a.ShareConst.SHARE_CODE.FAILED, 
            s.Utils.invokeCb(c, l);
        },
        complete: function() {
            console.log("wechat shareAppMessage complete");
        },
        cancel: function(t) {
            console.log("wechat shareAppMessage cancel:", t), l.code = a.ShareConst.SHARE_CODE.CANCEL, 
            s.Utils.invokeCb(c, l);
        }
    };
    wx.shareAppMessage(d);
}, r.prototype.setupAppMessage = function(t, e, i, n, r, c, h) {
    if (this.checkWxFunction("onShareAppMessage")) {
        var l = { 
            succ: !1,
            mod: t,
            code: a.ShareConst.SHARE_CODE.FAILED,
            cbParam: h
        }, d = {
            title: e,
            query: o.WebUtils.obj2UriParam(r),
            imageUrl: i,
            imageUrlId: n,
            success: function(e) {
                t == a.ShareConst.SHARE_MOD.GROUP ? e.hasOwnProperty("shareTickets") ? (console.log("分享到群成功"), 
                l.succ = !0, l.code = a.ShareConst.SHARE_CODE.GROUP_SUCC, l.groupId = e.shareTickets, 
                s.Utils.invokeCb(c, l)) : (console.log("分享到群失败"), l.code = a.ShareConst.SHARE_CODE.FAILED_GOURP, 
                s.Utils.invokeCb(c, l)) : (console.log("分享成功"), l.succ = !0, l.code = a.ShareConst.SHARE_CODE.NORMAL_SUCC, 
                s.Utils.invokeCb(c, l));
            },
            fail: function(t) {
                console.log("wechat onShareAppMessage fail:", t), l.code = a.ShareConst.SHARE_CODE.FAILED, 
                s.Utils.invokeCb(c, l);
            },
            complete: function() {
                console.log("wechat onShareAppMessage complete");
            }
        };
        wx.onShareAppMessage(function() {
            return d;
        });
    } else console.log("wechat setupAppMessage err, wx is low");
}