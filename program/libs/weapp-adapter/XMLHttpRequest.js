function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" !== (void 0 === t ? "undefined" : a(t)) && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : a(t)));
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

function o(e) {
    if ("function" == typeof this["on" + e]) {
        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
        this["on" + e].apply(this, n);
    }
}

function r(e) {
    this.readyState = e, o.call(this, "readystatechange");
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var s, l, i = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), u = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./EventTarget.js")), f = new WeakMap(), c = new WeakMap(), p = new WeakMap(), d = new WeakMap(), y = new WeakMap(), h = (l = s = function(a) {
    function s() {
        e(this, s);
        var n = t(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this));
        return n.onabort = null, n.onerror = null, n.onload = null, n.onloadstart = null, 
        n.onprogress = null, n.ontimeout = null, n.onloadend = null, n.onreadystatechange = null, 
        n.readyState = 0, n.response = null, n.responseText = null, n.responseType = "", 
        n.responseXML = null, n.status = 0, n.statusText = "", n.upload = {}, n.withCredentials = !1, 
        p.set(n, {
            "content-type": "application/x-www-form-urlencoded"
        }), d.set(n, {}), n;
    }
    return n(s, u.default), i(s, [ {
        key: "abort",
        value: function() {
            var e = y.get(this);
            e && e.abort();
        }
    }, {
        key: "getAllResponseHeaders",
        value: function() {
            var e = d.get(this);
            return Object.keys(e).map(function(t) {
                return t + ": " + e[t];
            }).join("\n");
        }
    }, {
        key: "getResponseHeader",
        value: function(e) {
            return d.get(this)[e];
        }
    }, {
        key: "open",
        value: function(e, t) {
            c.set(this, e), f.set(this, t), r.call(this, s.OPENED);
        }
    }, {
        key: "overrideMimeType",
        value: function() {}
    }, {
        key: "send",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            if (this.readyState !== s.OPENED) throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
            wx.request({
                data: t,
                url: f.get(this),
                method: c.get(this),
                header: p.get(this),
                responseType: this.responseType,
                success: function(t) {
                    var n = t.data, a = t.statusCode, l = t.header;
                    if ("string" != typeof n && !(n instanceof ArrayBuffer)) try {
                        n = JSON.stringify(n);
                    } catch (e) {
                        n = n;
                    }
                    if (e.status = a, d.set(e, l), o.call(e, "loadstart"), r.call(e, s.HEADERS_RECEIVED), 
                    r.call(e, s.LOADING), e.response = n, n instanceof ArrayBuffer) {
                        e.responseText = "";
                        for (var i = new Uint8Array(n), u = i.byteLength, f = 0; f < u; f++) e.responseText += String.fromCharCode(i[f]);
                    } else e.responseText = n;
                    r.call(e, s.DONE), o.call(e, "load"), o.call(e, "loadend");
                },
                fail: function(t) {
                    var n = t.errMsg;
                    -1 !== n.indexOf("abort") ? o.call(e, "abort") : o.call(e, "error", n), o.call(e, "loadend");
                }
            });
        }
    }, {
        key: "setRequestHeader",
        value: function(e, t) {
            var n = p.get(this);
            n[e] = t, p.set(this, n);
        }
    }, {
        key: "addEventListener",
        value: function(e, t) {
            if ("function" == typeof t) {
                var n = this;
                this["on" + e] = function(e) {
                    t.call(n, e);
                };
            }
        }
    } ]), s;
}(), s.UNSEND = 0, s.OPENED = 1, s.HEADERS_RECEIVED = 2, s.LOADING = 3, s.DONE = 4, 
l);

exports.default = h, module.exports = exports.default;