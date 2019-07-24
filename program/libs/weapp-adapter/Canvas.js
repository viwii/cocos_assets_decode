Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var t = wx.createCanvas();
    t.type = "canvas";
    t.getContext;
    return t.getBoundingClientRect = function() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }, t.style = {
        top: "0px",
        left: "0px",
        width: e.innerWidth + "px",
        height: e.innerHeight + "px"
    }, t.addEventListener = function(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        document.addEventListener(e, t, n);
    }, t.removeEventListener = function(e, t) {
        document.removeEventListener(e, t);
    }, t.dispatchEvent = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        console.log("canvas.dispatchEvent", e.type, e);
    }, Object.defineProperty(t, "clientWidth", {
        enumerable: !0,
        get: function() {
            return e.innerWidth;
        }
    }), Object.defineProperty(t, "clientHeight", {
        enumerable: !0,
        get: function() {
            return e.innerHeight;
        }
    }), t;
};

var e = require("./WindowProperties");

module.exports = exports.default;