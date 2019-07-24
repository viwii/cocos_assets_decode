function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var a = n[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(n, t, a) {
        return t && e(n.prototype, t), a && e(n, a), n;
    };
}(), t = require("../user/user").getInstance(), a = require("./rankMgr").getInstance(), i = require("./rankCanvas"), r = function() {
    function r(n, a) {
        e(this, r), this.uid = t.getData("uid"), this.viewId = n, this.conf = a, this.pageCount = a.pageCount;
    }
    return n(r, [ {
        key: "init",
        value: function() {}
    }, {
        key: "draw",
        value: function(e) {
            var n = a.getRank(this.conf.rankId).getRank(), t = n.getKeyRankRange(this.uid, this.conf.lastDiff, this.pageCount), r = n.getKeyInfo(this.uid);
            i.drawPage(this.conf, t, r);
        }
    } ]), r;
}();

module.exports = r;