var i = module.exports, r = require("./utils");

i.map = function(i, e, n) {
    if (r.isArray(i)) if (r.isFunction(e)) if (i.length <= 0) n(null, []); else for (var s = [], a = 0, l = i.length, t = null, u = 0; u < l; u++) e(i[u], function(i, r) {
        if (!t) {
            if (i) return t = i, void n(t, s);
            s.push(r), ++a >= l && n(t, s);
        }
    }); else n(new Error("async.map iterator is invaild" + e), []); else n(new Error("async.map array is invaild" + i), []);
}, i.mapSeries = function(i, e, n) {
    if (r.isArray(i)) if (r.isFunction(e)) if (i.length <= 0) n(null, []); else {
        var s = [], a = 0, l = i.length;
        e(i[a], function r(t, u) {
            t ? n(t, s) : (s.push(u), ++a >= l ? n(null, s) : e(i[a], r));
        });
    } else n(new Error("async.mapSeries iterator is invaild" + e), []); else n(new Error("async.mapSeries array is invaild" + i), []);
};