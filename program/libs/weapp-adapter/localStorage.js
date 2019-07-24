Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    get length() {
        return wx.getStorageInfoSync().keys.length;
    },
    key: function(e) {
        return wx.getStorageInfoSync().keys[e];
    },
    getItem: function(e) {
        return wx.getStorageSync(e);
    },
    setItem: function(e, t) {
        return wx.setStorageSync(e, t);
    },
    removeItem: function(e) {
        wx.removeStorageSync(e);
    },
    clear: function() {
        wx.clearStorageSync();
    }
};

exports.default = e, module.exports = exports.default;