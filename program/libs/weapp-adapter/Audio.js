function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" !== (void 0 === e ? "undefined" : o(e)) && "function" != typeof e ? t : e;
}

function n(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : o(e)));
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), u = function t(e, n, o) {
    null === e && (e = Function.prototype);
    var r = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === r) {
        var u = Object.getPrototypeOf(e);
        return null === u ? void 0 : t(u, n, o);
    }
    if ("value" in r) return r.value;
    var i = r.get;
    if (void 0 !== i) return i.call(o);
}, i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./HTMLAudioElement")), a = 0, s = 1, l = 2, p = 3, c = 4, d = 1, f = {}, y = function(o) {
    function y(n) {
        t(this, y);
        var o = e(this, (y.__proto__ || Object.getPrototypeOf(y)).call(this));
        o._$sn = d++, o.HAVE_NOTHING = a, o.HAVE_METADATA = s, o.HAVE_CURRENT_DATA = l, 
        o.HAVE_FUTURE_DATA = p, o.HAVE_ENOUGH_DATA = c, o.readyState = a;
        var r = wx.createInnerAudioContext();
        return f[o._$sn] = r, o._canplayEvents = [ "load", "loadend", "canplay", "canplaythrough", "loadedmetadata" ], 
        r.onCanplay(function() {
            o._loaded = !0, o.readyState = o.HAVE_CURRENT_DATA, o._canplayEvents.forEach(function(t) {
                o.dispatchEvent({
                    type: t
                });
            });
        }), r.onPlay(function() {
            o._paused = f[o._$sn].paused, o.dispatchEvent({
                type: "play"
            });
        }), r.onPause(function() {
            o._paused = f[o._$sn].paused, o.dispatchEvent({
                type: "pause"
            });
        }), r.onEnded(function() {
            o._paused = f[o._$sn].paused, !1 === f[o._$sn].loop && o.dispatchEvent({
                type: "ended"
            }), o.readyState = c;
        }), r.onError(function() {
            o._paused = f[o._$sn].paused, o.dispatchEvent({
                type: "error"
            });
        }), n ? o.src = n : o._src = "", o._loop = r.loop, o._autoplay = r.autoplay, o._paused = r.paused, 
        o._volume = r.volume, o._muted = !1, o;
    }
    return n(y, i.default), r(y, [ {
        key: "addEventListener",
        value: function(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            u(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "addEventListener", this).call(this, t, e, n), 
            t = String(t).toLowerCase(), this._loaded && -1 !== this._canplayEvents.indexOf(t) && this.dispatchEvent({
                type: t
            });
        }
    }, {
        key: "load",
        value: function() {}
    }, {
        key: "play",
        value: function() {
            f[this._$sn].play();
        }
    }, {
        key: "resume",
        value: function() {
            f[this._$sn].resume();
        }
    }, {
        key: "pause",
        value: function() {
            f[this._$sn].pause();
        }
    }, {
        key: "destroy",
        value: function() {
            f[this._$sn].destroy();
        }
    }, {
        key: "canPlayType",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            return "string" != typeof t ? "" : t.indexOf("audio/mpeg") > -1 || t.indexOf("audio/mp4") ? "probably" : "";
        }
    }, {
        key: "cloneNode",
        value: function() {
            var t = new y();
            return t.loop = this.loop, t.autoplay = this.autoplay, t.src = this.src, t;
        }
    }, {
        key: "currentTime",
        get: function() {
            return f[this._$sn].currentTime;
        },
        set: function(t) {
            f[this._$sn].seek(t);
        }
    }, {
        key: "duration",
        get: function() {
            return f[this._$sn].duration;
        }
    }, {
        key: "src",
        get: function() {
            return this._src;
        },
        set: function(t) {
            this._src = t, this._loaded = !1, this.readyState = this.HAVE_NOTHING, f[this._$sn].src = t;
        }
    }, {
        key: "loop",
        get: function() {
            return this._loop;
        },
        set: function(t) {
            this._loop = t, f[this._$sn].loop = t;
        }
    }, {
        key: "autoplay",
        get: function() {
            return this.autoplay;
        },
        set: function(t) {
            this._autoplay = t, f[this._$sn].autoplay = t;
        }
    }, {
        key: "paused",
        get: function() {
            return this._paused;
        }
    }, {
        key: "volume",
        get: function() {
            return this._volume;
        },
        set: function(t) {
            this._volume = t, this._muted || (f[this._$sn].volume = t);
        }
    }, {
        key: "muted",
        get: function() {
            return this._muted;
        },
        set: function(t) {
            this._muted = t, f[this._$sn].volume = t ? 0 : this._volume;
        }
    } ]), y;
}();

exports.default = y, module.exports = exports.default;