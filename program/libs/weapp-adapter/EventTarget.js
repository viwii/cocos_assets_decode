function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = new WeakMap(), r = function() {
    function r() {
        e(this, r), n.set(this, {});
    }
    return t(r, [ {
        key: "addEventListener",
        value: function(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = n.get(this);
            i || (i = {}, n.set(this, i)), i[e] || (i[e] = []), i[e].push(t), r.capture, r.once, 
            r.passive;
        }
    }, {
        key: "removeEventListener",
        value: function(e, t) {
            var r = n.get(this);
            if (r) {
                var i = r[e];
                if (i && i.length > 0) for (var a = i.length; a--; a > 0) if (i[a] === t) {
                    i.splice(a, 1);
                    break;
                }
            }
        }
    }, {
        key: "dispatchEvent",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = n.get(this)[e.type];
            if (t) for (var r = 0; r < t.length; r++) t[r](e);
        }
    } ]), r;
}();

exports.default = r, module.exports = exports.default;