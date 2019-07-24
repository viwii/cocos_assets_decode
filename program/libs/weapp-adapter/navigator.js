Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("./util/index.js"), o = wx.getSystemInfoSync();

console.log(o);

var n = o.system, t = o.platform, i = o.language, a = o.version, r = -1 !== n.toLowerCase().indexOf("android") ? "Android; CPU " + n : "iPhone; CPU iPhone OS " + n + " like Mac OS X", s = {
    platform: t,
    language: i,
    appVersion: "5.0 (" + r + ") AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    userAgent: "Mozilla/5.0 (" + r + ") AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/" + a + " MiniGame NetType/WIFI Language/" + i,
    onLine: !0,
    geolocation: {
        getCurrentPosition: e.noop,
        watchPosition: e.noop,
        clearWatch: e.noop
    }
};

wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
    s.onLine = e.isConnected;
}), exports.default = s, module.exports = exports.default;