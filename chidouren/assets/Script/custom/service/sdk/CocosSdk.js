
var s = require("../../util/Utils"), o = require("../../util/WebUtils"), n = require("../const/HttpConst"), a = function() {};
module.exports = {
    CocosSdk: a
}, a.prototype.getStorage = function(t, e) {
    t = "" + t;
    var i = cc.sys.localStorage.getItem(t), o = s.Utils.getJson(i);
    if (null == o) return console.log("getStorage data format err", t, i), void s.Utils.invokeCb(e, {});
    s.Utils.invokeCb(e, o);
}, a.prototype.setStorage = function(t, e, i) {
    if (t = "" + t, !s.Utils.isObject(e)) return console.log("setStorage data format err", t, e), 
    void s.Utils.invokeCb(i, !1);
    cc.sys.localStorage.setItem(t, JSON.stringify(e)), s.Utils.invokeCb(i, !0);
}, a.prototype.httpRequest = function(t, e, i, a) {
    if (!s.Utils.isObject(i)) return console.log("cocos httpRequest data format err", key, i), 
    void s.Utils.invokeCb(a, null, n.HttpConst.HTTP_CODE.NOT_OBJECT);
    var r = o.WebUtils.obj2UriParam(i);
    console.log("content=", r);
    var c = new XMLHttpRequest();
    c.open(t, e, !0), c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;"), 
    c.onreadystatechange = function() {
        if (4 == c.readyState) if (200 == c.status) {
            var t = s.Utils.getJson(c.responseText);
            t ? s.Utils.invokeCb(a, t, c.status) : (console.log("cocos httpRequest result format err", c.responseText), 
            s.Utils.invokeCb(a, null, n.HttpConst.HTTP_CODE.RETURN_FORMAT_ERR));
        } else s.Utils.invokeCb(a, null, c.status);
    }, console.log("cocos httpRequest succ", i), c.send(r);
} 