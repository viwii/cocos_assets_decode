Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = wx.getSystemInfoSync(), t = e.screenWidth, o = e.screenHeight, i = e.devicePixelRatio, r = exports.innerWidth = t, n = exports.innerHeight = o;

exports.devicePixelRatio = i;

exports.screen = {
    width: t,
    height: o,
    availWidth: r,
    availHeight: n,
    availLeft: 0,
    availTop: 0
}, exports.performance = {
    now: Date.now
}, exports.ontouchstart = null, exports.ontouchmove = null, exports.ontouchend = null;