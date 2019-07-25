
var s = require("../util/Utils"), o = null, n = function() {
    this.dataDict = {};
};
module.exports = {
    DataService: n
}, n.getInstance = function() {
    return null == o && (o = new n()), o;
};
var a = function(t) {
    var e = t.replace(/\\/g, "/"), i = e.split("/");
    return !s.Utils.isArray(i) || i.length <= 0 ? e : i[i.length - 1];
};
n.prototype.loadJson = function(t, e) {
    cc.loader.loadResDir(t, function(t, i, o) {
        if (t) console.log("DataService loadJson error:", t); else {
            for (var n = {}, a = 0; a < o.length; a++) n[o[a]] = i[a].json;
            s.Utils.invokeCb(e, n);
        }
    });
}, n.prototype.load = function(t, e) {
    var i = this;
    this.loadJson(t, function(t) {
        for (var o in t) {
            var n = t[o], r = a(o), c = {};
            for (var h in n) {
                var l = n[h];
                if (s.Utils.isArray(l)) {
                    var d = {}, u = -1, p = 0;
                    for (var g in l) s.Utils.isObject(l[g]) && l[g].hasOwnProperty("id") && (u < 0 && (u = l[g].id), 
                    d[l[g].id] = l[g], p = l[g].id);
                    c[h] = {
                        fristId: u,
                        lastId: p,
                        data: d
                    };
                }
            }
            i.dataDict[r] = c;
        }
        s.Utils.invokeCb(e);
    });
}, n.prototype.getAllSheets = function(t, e) {
    return s.Utils.isValidValue(e) || (e = !0), this.dataDict.hasOwnProperty(t) ? e ? s.Utils.clone(this.dataDict[t]) : this.dataDict[t] : null;
}, n.prototype.getSheet = function(t, e, i) {
    s.Utils.isValidValue(i) || (i = !0);
    var o = this.getAllSheets(t, !1);
    return null == o ? null : o.hasOwnProperty(e) ? i ? s.Utils.clone(o[e]) : o[e] : null;
}, n.prototype.getData = function(t, e, i, o) {
    s.Utils.isValidValue(o) || (o = !0);
    var n = this.getSheet(t, e, !1);
    if (null == n) return null;
    var a = n.data;
    return a.hasOwnProperty(i) ? o ? s.Utils.clone(a[i]) : a[i] : null;
}, n.prototype.getFristId = function(t, e) {
    var i = this.getSheet(t, e, !1);
    return null == i ? 0 : i.fristId;
}, n.prototype.getLastId = function(t, e) {
    var i = this.getSheet(t, e, !1);
    return null == i ? 0 : i.lastId;
}