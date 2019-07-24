function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var r = 0; r < n.length; r++) {
            var a = n[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(n, r, a) {
        return r && e(n.prototype, r), a && e(n, a), n;
    };
}(), r = function() {
    function r() {
        e(this, r), this.handlerMap = {};
    }
    return n(r, [ {
        key: "addHandler",
        value: function(e, n) {
            this.handlerMap[e] = n;
        }
    }, {
        key: "init",
        value: function(e) {
            for (var n in e) {
                var r = e[n], a = require(r);
                this.addHandler(n, a);
            }
        }
    }, {
        key: "handler",
        value: function(e, n) {
            var r = e.split(".");
            if (2 == r.length) {
                var a = r[0], o = r[1];
                if (this.handlerMap.hasOwnProperty(a)) {
                    var t = this.handlerMap[a];
                    t.hasOwnProperty(o) ? (0, t[o])(n) : console.log("HandlerService handler unknown method", e);
                } else console.log("HandlerService handler unknown module", e);
            } else console.log("HandlerService handler unknown route", e);
        }
    } ]), r;
}();

module.exports = r;