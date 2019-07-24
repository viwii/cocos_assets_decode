var r = require("./utils"), t = module.exports;

String.prototype.replaceAll = function(r, t) {
    return this.replace(new RegExp(r, "gm"), t);
}, String.prototype.format = function(t) {
    var e = this;
    if (!r.isObject(t) && !r.isArray(t)) return e;
    var i = t;
    for (var n in i) {
        var a = i[n];
        void 0 != a && (e = e.replaceAll("\\{" + n + "\\}", a));
    }
    return e;
}, t.formatString = function(t, e) {
    return r.isString(t) ? t.format(e) : "";
}, t.getFuncName = function(t) {
    if (r.isString(t)) {
        var e = t.match("\\{func:(.*?)\\}");
        return r.isArray(e) && e.length > 1 ? e[1] : void 0;
    }
};