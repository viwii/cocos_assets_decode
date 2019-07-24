function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t) {
    return function(e) {
        var o = new n(t);
        o.touches = e.touches, o.targetTouches = Array.prototype.slice.call(e.touches), 
        o.changedTouches = e.changedTouches, o.timeStamp = e.timeStamp, document.dispatchEvent(o);
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var o = require("../util/index.js"), n = function e(n) {
    t(this, e), this.touches = [], this.targetTouches = [], this.changedTouches = [], 
    this.preventDefault = o.noop, this.stopPropagation = o.noop, this.type = n, this.target = window.canvas, 
    this.currentTarget = window.canvas;
};

exports.default = n, wx.onTouchStart(e("touchstart")), wx.onTouchMove(e("touchmove")), 
wx.onTouchEnd(e("touchend")), wx.onTouchCancel(e("touchcancel")), module.exports = exports.default;