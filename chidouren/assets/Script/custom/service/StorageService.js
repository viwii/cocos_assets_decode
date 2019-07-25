
var s = require("../util/Utils"), o = require("../util/Async"), n = require("./storage/Storage"), a = require("./conf/StorageConf"), r = function() {
    this.isLoad = !1, this.initTimeout = a.StorageConf.INIT_TIMEOUT, this.storageMap = {}, 
    this.storageConf = s.Utils.clone(a.StorageConf.STORAGE_CONF);
};
module.exports = {
    StorageService: r
};
var c = null;
r.getInstance = function() {
    return null == c && (c = new r()), c;
}, r.prototype.initAllStorage = function(t, e, i) {
    if (!this.isLoad) {
        this.storageMap = {}, s.Utils.isObject(i) ? this.setStorageConf(i, e) : this.setStorageConf(this.storageConf, e);
        var n = [];
        for (var r in this.storageMap) n.push(this.storageMap[r]);
        var c = this;
        o.Async.map(n, function(t, e) {
            c.isLoad ? e(null) : t.load(function() {
                e(null);
            });
        }, function() {
            c.isLoad || (c.isLoad = !0, s.Utils.invokeCb(t), setInterval(function() {
                c.update();
            }, a.StorageConf.UPDATE_TIMES));
        });
    }
}, r.prototype.update = function() {
    var t = Date.now();
    for (var e in this.storageMap) this.storageMap[e].update(t);
}, r.prototype.setStorageConf = function(t, e) {
    for (var i in s.Utils.isValidValue(e) || (e = {}), this.storageConf = s.Utils.clone(t), 
    this.storageConf) {
        var o = this.getStorage(i), a = this.storageConf[i];
        null == o ? this.storageMap[i] = new n.Storage(i, a.localTimes, a.needNet, a.netTimes, e) : o.setConf(a.localTimes, a.needNet, a.netTimes, e);
    }
}, r.prototype.init = function(t, e, i, o) {
    if (!this.isLoad) {
        s.Utils.isNumber(i) && (this.initTimeout = i), this.initAllStorage(t, e, o);
        var n = this;
        setTimeout(function() {
            n.init(t, e, n.initTimeout, o);
        }, n.initTimeout);
    }
}, r.prototype.getStorage = function(t) {
    return this.storageMap.hasOwnProperty(t) ? this.storageMap[t] : null;
}, r.prototype.getData = function(t) {
    var e = this.getStorage(t);
    return e ? e.getData() : null;
}, r.prototype.setData = function(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], o = this.getStorage(t);
    if (o) {
        var a = 0;
        i && s ? a = n.SAVE_MODE.ALL : i ? a = n.SAVE_MODE.NET : s && (a = n.SAVE_MODE.LOCAL), 
        o.setData(e, a);
    }
}