function n(n, r) {
    if (!(n instanceof r)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function n(n, r) {
        for (var e = 0; e < r.length; e++) {
            var a = r[e];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(n, a.key, a);
        }
    }
    return function(r, e, a) {
        return e && n(r.prototype, e), a && n(r, a), r;
    };
}(), e = require("../../conf/rank/rankConf"), a = require("./friendRank"), t = null;

module.exports.getInstance = function() {
    return null == t && (t = new i()), t;
};

var i = function() {
    function t() {
        n(this, t), this.rankMap = {};
    }
    return r(t, [ {
        key: "init",
        value: function() {
            this.rankMap = {};
            for (var n in e.RANK_CONF) {
                var r = e.RANK_CONF[n];
                if (n == e.RANK_TYPE.FRIEND) for (var t in r) {
                    var i = r[t], u = new a(t, i);
                    this.rankMap[t] = u, u.load();
                }
            }
        }
    }, {
        key: "getRank",
        value: function(n) {
            return this.rankMap.hasOwnProperty(n) ? this.rankMap[n] : null;
        }
    } ]), t;
}();