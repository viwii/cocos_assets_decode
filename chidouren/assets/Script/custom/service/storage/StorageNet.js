
var s = require("../../util/Utils"), o = require("../SdkService"), n = function() {}, a = null;
n.getInstance = function() {
    return null == a && (a = new n()), a;
}, module.exports = {
    StorageNet: n
}, n.prototype.getData = function(t, e, i) {
    var n = {
        uid: t.selfUid,
        account_id: t.account,
        platform: t.platform,
        sid: t.secret_id,
        game_type: t.game_type,
        data_id: e
    };
    o.SdkService.getInstance().httpPost(t.httpUrl + "game/get_data", n, function(t, e) {
        if (null == t) console.log("StorageNet getData timeout", e), s.Utils.invokeCb(i, null, 0); else if (200 == t.err_code) {
            if (!t.data.hasOwnProperty("datas")) return console.log("StorageNet getData not found"), 
            void s.Utils.invokeCb(i, {}, t.data.refresh);
            var o = s.Utils.getJson(t.data.datas);
            if (null == o) return console.log("StorageNet getData format err", t.data.datas), 
            void s.Utils.invokeCb(i, null, 0);
            console.log("StorageNet getData success", t), s.Utils.invokeCb(i, o, t.data.refresh);
        } else console.log("StorageNet getData failed", t), s.Utils.invokeCb(i, null, 0);
    });
}, n.prototype.setData = function(t, e, i, n) {
    var a = {
        uid: t.selfUid,
        account_id: t.account,
        platform: t.platform,
        sid: t.secret_id,
        game_type: t.game_type,
        data_id: e,
        datas: JSON.stringify(i)
    };
    o.SdkService.getInstance().httpPost(t.httpUrl + "game/set_data", a, function(t, e) {
        null == t ? (console.log("StorageNet setData failed", e), s.Utils.invokeCb(n, !1)) : (console.log("StorageNet setData success", t), 
        s.Utils.invokeCb(n, !0));
    });
}  