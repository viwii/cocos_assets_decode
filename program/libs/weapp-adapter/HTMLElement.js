function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" !== (void 0 === t ? "undefined" : r(t)) && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : r(t)));
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var o = function() {
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
}(), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./Element")), u = require("./util/index.js"), f = require("./WindowProperties"), l = function(r) {
    function l() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        e(this, l);
        var r = t(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this));
        return r.className = "", r.childern = [], r.style = {
            width: f.innerWidth + "px",
            height: f.innerHeight + "px"
        }, r.insertBefore = u.noop, r.innerHTML = "", r.tagName = n.toUpperCase(), r;
    }
    return n(l, i.default), o(l, [ {
        key: "setAttribute",
        value: function(e, t) {
            this[e] = t;
        }
    }, {
        key: "getAttribute",
        value: function(e) {
            return this[e];
        }
    }, {
        key: "getBoundingClientRect",
        value: function() {
            return {
                top: 0,
                left: 0,
                width: f.innerWidth,
                height: f.innerHeight
            };
        }
    }, {
        key: "focus",
        value: function() {}
    }, {
        key: "clientWidth",
        get: function() {
            var e = parseInt(this.style.fontSize, 10) * this.innerHTML.length;
            return Number.isNaN(e) ? 0 : e;
        }
    }, {
        key: "clientHeight",
        get: function() {
            var e = parseInt(this.style.fontSize, 10);
            return Number.isNaN(e) ? 0 : e;
        }
    } ]), l;
}();

exports.default = l, module.exports = exports.default;