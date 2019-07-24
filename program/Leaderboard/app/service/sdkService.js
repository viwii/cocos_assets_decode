var e = require("../util/utils"), o = module.exports;

o.getStorage = function(o, t) {
    if (o = "" + o, !e.isValidValue(wx) || !e.isFunction(wx.getUserCloudStorage)) return console.log("getStorage err, wx is low", o), 
    void e.invokeCb(t, null);
    wx.getUserCloudStorage({
        keyList: [ o ],
        success: function(a) {
            if (!a) return console.log("getStorage data res = null", o), void e.invokeCb(t, null);
            var i = a.KVDataList;
            if (!e.isArray(i)) return console.log("getStorage kvList format err", o, i), void e.invokeCb(t, null);
            var r = {};
            if (i.length > 0) {
                var n = e.getJson(i[0].value);
                if (null == n) return console.log("getStorage data format err", o, i), void e.invokeCb(t, null);
                r = n;
            }
            e.invokeCb(t, r);
        },
        fail: function(a) {
            console.log("getStorage fail", o, a), e.invokeCb(t, null);
        }
    });
}, o.setStorage = function(o, t, a, i) {
    return t = "" + t, e.isValidValue(wx) && e.isFunction(wx.setUserCloudStorage) ? e.isObject(a) ? (a.uid = o, 
    void wx.setUserCloudStorage({
        KVDataList: [ {
            key: t,
            value: JSON.stringify(a)
        } ],
        success: function(o) {
            e.invokeCb(i, !0);
        },
        fail: function(r) {
            console.log("setStorage fail", o, t, a, r), e.invokeCb(i, !1);
        }
    })) : (console.log("setStorage data format err", o, t, a), void e.invokeCb(i, !1)) : (console.log("setStorage err, wx is low", o, t, a), 
    void e.invokeCb(i, !1));
}, o.getFriendsStorage = function(o, t) {
    if (o = "" + o, !e.isValidValue(wx) || !e.isFunction(wx.getFriendCloudStorage)) return console.log("getFriendsData err, wx is low", o), 
    void e.invokeCb(t, null);
    wx.getFriendCloudStorage({
        keyList: [ o ],
        success: function(a) {
            if (!e.isArray(a.data)) return console.log("getFriendsData res.data format err", o, a.data), 
            void e.invokeCb(t, null);
            for (var i = {}, r = 0; r < a.data.length; r++) {
                var n = a.data[r];
                if (e.isArray(n.KVDataList)) for (var l = 0; l < n.KVDataList.length; l++) {
                    var s = n.KVDataList[l];
                    if (e.isObject(s) && (s.hasOwnProperty("key") && s.hasOwnProperty("value") && s.key === o)) {
                        var u = {};
                        u.openid = n.openid, u.nickname = n.nickname, u.avatarUrl = n.avatarUrl;
                        var g = e.getJson(s.value);
                        if (null == g) continue;
                        if (u.data = g, !u.data.hasOwnProperty("uid")) continue;
                        i[u.data.uid] = u;
                    }
                }
            }
            e.invokeCb(t, i);
        },
        fail: function(o) {
            console.log("getFriendsData fail", o), e.invokeCb(t, null);
        }
    });
};