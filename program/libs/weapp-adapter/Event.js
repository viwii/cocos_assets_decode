function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("./util");

exports.default = function o(s) {
    t(this, o), this.cancelBubble = !1, this.cancelable = !1, this.target = null, this.timestampe = Date.now(), 
    this.preventDefault = e.noop, this.stopPropagation = e.noop, this.type = s;
}, module.exports = exports.default;