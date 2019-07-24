function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), n = require("../user/user").getInstance(), a = require("./rankMgr").getInstance(), i = require("./rankCanvas"), r = function() {
    function r(t, a) {
        e(this, r), this.uid = n.getData("uid"), this.viewId = t, this.conf = a, this.page = 1, 
        this.pageCount = a.pageCount;
    }
    return t(r, [ {
        key: "init",
        value: function() {}
    }, {
        key: "drawPage",
        value: function() {
            var e = a.getRank(this.conf.rankId).getRank(), t = e.getRankTotal(), n = (this.page - 1) * this.pageCount, r = n + this.pageCount;
            r > t && (r = t);
            var u = e.getRankRange(n, r), o = e.getKeyInfo(this.uid);
            i.drawPage(this.conf, u, o);
        }
    }, {
        key: "draw",
        value: function(e) {
            e.return && (this.page = 1), this.drawPage();
        }
    }, {
        key: "turnPage",
        value: function(e) {
            if (!(this.pageCount <= 0)) {
                var t = a.getRank(this.conf.rankId).getRank().getRankTotal(), n = Math.ceil(t / this.pageCount), i = this.page + e;
                i <= 0 || i > n || (this.page = i, this.drawPage());
            }
        }
    } ]), r;
}();

module.exports = r;