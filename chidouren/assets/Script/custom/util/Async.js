
var s = require("./Utils"), o = function() {};
module.exports = {
    Async: o
}, o.map = function(t, e, i) {
    if (s.Utils.isArray(t)) if (s.Utils.isFunction(e)) if (t.length <= 0) i(null, []); else for (var o = [], n = 0, a = t.length, r = null, c = 0; c < a; c++) e(t[c], function(t, e) {
        r || (t ? i(r = t, o) : (o.push(e), ++n >= a && i(r, o)));
    }); else i(new Error("async.map iterator is invaild" + e), []); else i(new Error("async.map array is invaild" + t), []);
}, o.mapSeries = function(t, e, i) {
    if (s.Utils.isArray(t)) if (s.Utils.isFunction(e)) if (t.length <= 0) i(null, []); else {
        var o = [], n = 0, a = t.length;
        e(t[n], function s(r, c) {
            r ? i(r, o) : (o.push(c), ++n >= a ? i(null, o) : e(t[n], s));
        });
    } else i(new Error("async.mapSeries iterator is invaild" + e), []); else i(new Error("async.mapSeries array is invaild" + t), []);
}  