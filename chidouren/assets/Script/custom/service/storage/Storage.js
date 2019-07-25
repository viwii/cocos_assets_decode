
        var s = require("../../util/Utils"), o = require("../../util/Async"), n = require("../SdkService"), a = require("./StorageNet"), r = function(t, e, i, s, o) {
            t = "" + t, this.key = t, this.storageData = {}, this.storageData[c.LOCAL] = {
                saveTimeStamp: 0,
                isLoad: !1,
                version: 0,
                data: {}
            }, this.storageData[c.NET] = {
                saveTimeStamp: 0,
                isLoad: !1,
                version: 0,
                data: {}
            }, this.version = 0, this.data = {}, this.isLoad = !1, this.setConf(e, i, s, o);
        }, c = {
            LOCAL: 0,
            NET: 1
        }, h = {
            NONE: 0,
            LOCAL: 1,
            NET: 2,
            ALL: 3
        };
        module.exports = {
            Storage: r,
            STORAGE_TYPE: c,
            SAVE_MODE: h
        }, r.prototype.isLoaded = function() {
            for (var t in this.storageData) if (!this.storageData[t].isLoad) return !1;
            return !0;
        }, r.prototype.setConf = function(t, e, i, o) {
            s.Utils.isValidValue(t) || (t = 1e4), s.Utils.isValidValue(e) || (e = !1), s.Utils.isValidValue(i) || (i = 0), 
            this.needNet = e, e && (this.netData = o), t > 0 && (this.storageData[c.LOCAL].times = t, 
            this.storageData[c.LOCAL].saveTimeStamp = Date.now() + t), i > 0 && (this.storageData[c.NET].times = i, 
            this.storageData[c.NET].saveTimeStamp = Date.now() + i);
        }, r.prototype.load = function(t) {
            var e = this;
            if (this.isLoaded()) s.Utils.invokeCb(t); else {
                var i = [ this.loadLocalStorage.bind(this), this.loadNetStorage.bind(this) ], n = this;
                o.Async.map(i, function(t, e) {
                    t(function() {
                        e(null);
                    });
                }, function() {
                    if (e.isLoaded()) {
                        for (var i in n.storageData) {
                            var o = n.storageData[i];
                            o.version > n.version && (console.log("Async.map", o, n.version), n.version = o.version, 
                            n.data = o.data);
                        }
                        s.Utils.invokeCb(t);
                    }
                });
            }
        }, r.prototype.loadLocalStorage = function(t) {
            var e = this, i = this.storageData[c.LOCAL];
            i.isLoad ? s.Utils.invokeCb(t, !1) : n.SdkService.getInstance().getStorage(this.key, function(o) {
                null != o ? (o.hasOwnProperty("version") || (o = {
                    version: 0,
                    data: {}
                }), console.log("LocalStorage load success", e.key, o), i.isLoad = !0, i.version = o.version, 
                i.data = o.data, s.Utils.invokeCb(t, !1)) : console.log("LocalStorage load faild", e.key);
            });
        }, r.prototype.loadNetStorage = function(t) {
            var e = this, i = this.storageData[c.NET];
            if (!i.isLoad) return this.needNet ? void (this.netData && this.netData.httpUrl && a.StorageNet.getInstance().getData(this.netData, this.key, function(o, n) {
                if (null != o) {
                    console.log("NetStorage load success", e.key, o), i.isLoad = !0;
                    var a = !1;
                    n ? a = !0 : i.version = o.version, i.data = o.data, s.Utils.invokeCb(t, a);
                } else console.log("NetStorage load faild", e.key);
            })) : (i.isLoad = !0, void s.Utils.invokeCb(t, !1));
            s.Utils.invokeCb(t, !1);
        }, r.prototype.save = function(t) {
            this.isLoaded() && (t == h.LOCAL ? this.saveLocal() : t == h.NET ? this.saveNet() : t == h.ALL && (this.saveLocal(), 
            this.saveNet()));
        }, r.prototype.saveLocal = function() {
            var t = this.storageData[c.LOCAL];
            t.version != this.version && (t.version = this.version, t.saveTimeStamp = Date.now() + t.times, 
            n.SdkService.getInstance().setStorage(this.key, {
                version: this.version,
                data: this.data
            }, function() {}));
        }, r.prototype.saveNet = function() {
            if (this.needNet) {
                var t = this.storageData[c.NET];
                t.version != this.version && (t.version = this.version, t.saveTimeStamp = Date.now() + t.times, 
                a.StorageNet.getInstance().setData(this.netData, this.key, {
                    version: this.version,
                    data: this.data
                }, function() {}));
            }
        }, r.prototype.update = function(t) {
            if (this.isLoaded()) {
                var e = this.storageData[c.LOCAL], i = this.storageData[c.NET];
                e.saveTimeStamp > 0 && t >= e.saveTimeStamp && this.save(h.LOCAL), i.saveTimeStamp > 0 && t >= i.saveTimeStamp && this.save(h.NET);
            }
        }, r.prototype.setData = function(t, e) {
            return !!this.isLoaded() && !!s.Utils.isObject(t) && (this.version = Math.floor((this.version + 1) % 1e15), 
            this.data = t, this.save(e), !0);
        }, r.prototype.getData = function() {
            return this.isLoaded() ? this.data : null;
        } 