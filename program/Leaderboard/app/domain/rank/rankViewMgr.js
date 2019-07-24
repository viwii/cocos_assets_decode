function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var i = 0; i < n.length; i++) {
            var r = n[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, i, r) {
        return i && e(n.prototype, i), r && e(n, r), n;
    };
}(), i = require("../../conf/rank/rankConf"), r = require("./rankView"), t = require("./rangeView"), a = require("./beyondView"), u = null;

module.exports.getInstance = function() {
    return null == u && (u = new o()), u;
};

var o = function() {
    function u() {
        e(this, u), this.viewMap = {};
    }
    return n(u, [ {
        key: "init",
        value: function() {
            this.viewMap = {};
            for (var e in i.RANK_VIEWCONF) {
                var n = i.RANK_VIEWCONF[e];
                if (e == i.RANK_VIEWTYPE.NORMAL) for (var u in n) {
                    var o = n[u], f = new r(u, o);
                    this.viewMap[u] = f, f.init();
                } else if (e == i.RANK_VIEWTYPE.RANGE) for (var u in n) {
                    var o = n[u], f = new t(u, o);
                    this.viewMap[u] = f, f.init();
                } else if (e == i.RANK_VIEWTYPE.BEYOND) for (var u in n) {
                    var o = n[u], f = new a(u, o);
                    this.viewMap[u] = f, f.init();
                }
            }
        }
    }, {
        key: "getView",
        value: function(e) {
            return this.viewMap.hasOwnProperty(e) ? this.viewMap[e] : null;
        }
    } ]), u;
}();