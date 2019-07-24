function t(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function t(t, n) {
        for (var a = 0; a < n.length; a++) {
            var e = n[a];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(n, a, e) {
        return a && t(n.prototype, a), e && t(n, e), n;
    };
}(), a = null;

module.exports.getInstance = function() {
    return null == a && (a = new e()), a;
};

var e = function() {
    function a() {
        t(this, a), this.dataMap = {};
    }
    return n(a, [ {
        key: "getData",
        value: function(t) {
            return this.dataMap.hasOwnProperty(t) ? this.dataMap[t] : null;
        }
    }, {
        key: "setData",
        value: function(t, n) {
            this.dataMap[t] = n;
        }
    }, {
        key: "init",
        value: function(t, n, a) {
            this.setData("uid", "" + t), this.setData("nickname", n), this.setData("avatarUrl", a);
        }
    } ]), a;
}();