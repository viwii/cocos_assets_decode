var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

var xx = {
    AbfunLogic: [ function(t, e, i) {
        cc._RF.push(e, "5ebf2wJFERKfa2+cknMLu/v", "AbfunLogic");
        var s = function() {
            this.url = "https://ab.afunapp.com", this.app_key = "chidouzidazuozhan", this.data = null, 
            this.test_client_id = 2, this.experiment_login_id = "chidouzidazuozhan5", this.experiment_login_data = null;
        };
        s.prototype.init = function() {
            var t = this;
            this.getData(function() {
                t.login();
            });
        }, s.prototype.getData = function(t, e) {
            var i = this;
            if (this.data) t && t(this.data); else {
                var s = {
                    app_key: this.app_key,
                    client_id: ss.proxy.httpParams.uid || this.test_client_id
                };
                ss.custom.httpPost(this.url + "/get_experiment_flags", s, function(s) {
                    console.log("AbFunLogic getData:", s), s && 200 == s.code ? (i.data = s.data, t && t(i.data)) : e && e();
                }, e);
            }
        }, s.prototype.sendData = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = {
                app_key: this.app_key,
                client_id: ss.proxy.httpParams.uid || this.test_client_id,
                device_info: JSON.stringify({
                    platform: this._getDevicePlatform(),
                    version: ss.proxy.game.version + ""
                }),
                experiment_ids: JSON.stringify(t.experiment_ids),
                ext_data: JSON.stringify(t.ext_data),
                log_time: Date.now()
            };
            ss.custom.httpPost(this.url + "/tracker", s, function(t) {
                console.log("AbFunLogic sendData:", t), t && 200 == t.code ? e && e(t.data) : i && i();
            }, i);
        }, s.prototype.login = function() {
            if (this.data) {
                var t = this._getExperimentItem(this.experiment_login_id);
                if (t) {
                    this.experiment_login_data = t;
                    var e = {}, i = {};
                    i[this.experiment_login_id] = t.g_id, e.experiment_ids = i, e.ext_data = {
                        login: 1
                    }, this.sendData(e);
                } else console.warn("AbFunLogic.login experiment is null, maybe is not test, or data error");
            } else console.warn("AbFunLogic.login undefind data,plase requst get_experiment_flags");
        }, s.prototype._getExperimentItem = function(t) {
            if (this.data && this.data.experiments) for (var e = this.data.experiments, i = 0; i < e.length; i++) {
                var s = e[i];
                if (s.e_id == t) return s;
            }
            return null;
        }, s.prototype._getDevicePlatform = function() {
            switch (ss.logic.open.getSystem()) {
              case "android":
                return 2;

              case "ios":
              case "window":
                return 1;
            }
            return 1;
        }, s.prototype.isGroup2 = function() {
            return this.experiment_login_data || (this.experiment_login_data = this._getExperimentItem(this.experiment_login_id)), 
            !(!this.experiment_login_data || "2" != this.experiment_login_data.g_id);
        }, e.exports = {
            AbFunLogic: s
        }, cc._RF.pop();
    }, {} ],
    AddSpeed: [ function(t, e, i) {
        cc._RF.push(e, "dc33cOJhHdKaYEkmNLPf2qY", "AddSpeed"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.timestamps = 0;
            },
            start: function() {},
            play: function() {
                this.playing = !0;
            },
            stop: function() {
                this.playing = !1;
            },
            click: function(t) {
                if (this.playing) {
                    var e = Date.now();
                    e - this.timestamps < 800 || (this.timestamps = e, ss.logic.sound.addSpeed(), this.node.emit("speed"));
                }
            }
        }), cc._RF.pop();
    }, {} ],
    Advertising: [ function(t, e, i) {
        cc._RF.push(e, "dd35a8nXzFB2JHFUgrJrRjf", "Advertising");
        var s = function() {
            this.advertisings = new ss.Dictionary();
        };
        s.prototype.initialize = function(t) {
            var e = {};
            e[ss.enum.advertising.mode.banner] = o, e[ss.enum.advertising.mode.video] = n, e[ss.enum.advertising.mode.interstitial] = a;
            for (var i, s = 0, r = null, c = t.length; s < c; s++) {
                if (!(i = e[(r = t[s]).mode])) return void console.log("warn warn warn undefind advertising mode:", r.mode);
                this.advertisings.set(r.type, new i(r, this));
            }
        }, s.prototype.get = function(t) {
            return this.advertisings.get(t);
        }, s.prototype.create = function() {
            this._$callAll("create");
        }, s.prototype.preload = function() {
            this._$callAll("preload");
        }, s.prototype.showBanner = function(t) {
            o.current != t && (this._$callOne(o.current, "hide"), this._$callOne(t, "show"));
        }, s.prototype.hideBanner = function() {
            var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null) || o.current;
            this._$callOne(t, "hide");
        }, s.prototype.replaceBanner = function(t) {
            this._$callOne(t, "replace");
        }, s.prototype.pauseBanner = function() {
            this._$callOne(o.current, "pause");
        }, s.prototype.resumeBanner = function() {
            this._$callOne(o.current, "resume");
        }, s.prototype.showVideo = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            this._$callOne(t, "show", e);
        }, s.prototype.showInterstitial = function(t) {
            this._$callOne(t, "show");
        }, s.prototype.interstitialIsRequesting = function(t) {
            var e = this.get(t);
            return e && e.isRequesting;
        }, s.prototype._$callOne = function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = this.get(t);
            s && s[e] && s[e].call(s, i);
        }, s.prototype._$callAll = function(t) {
            for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = this.advertisings.values, s = 0, o = null, n = i.length; s < n; s++) (o = i[s]) && o[t] && o[t].call(o, e);
        }, s.prototype._$callMode = function(t, e) {
            for (var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = this.advertisings.values, o = 0, n = null, a = s.length; o < a; o++) (n = s[o]) && n.mode == t && n[e] && e.call(n, i);
        };
        var o = function(t, e) {
            this.manager = e, this.vo = t, this.ad = null, this.isReady = !0, this.isShowing = !1, 
            this.isPausing = !1;
        };
        o.current = null, o.prototype._$createStyle = function(t) {
            if (t) return {
                left: t.left,
                top: t.top,
                width: t.width
            };
            var e = wx.getSystemInfoSync();
            return {
                left: (e.windowWidth - 300) / 2,
                top: e.windowHeight - 80 + 1,
                width: 300
            };
        }, o.prototype.create = function() {
            var t = this;
            if (!this.ad) {
                this.isReady = !0;
                var e = wx.getSystemInfoSync(), i = this._$createStyle(this.vo.style);
                this.ad = wx.createBannerAd({
                    adUnitId: this.vo.adUnitId,
                    style: i
                }), this.ad.onError(function(e) {
                    console.log("banner [" + t.vo.type + "] onError error:", e), t.isReady = !1, t.isShowing = !1, 
                    o.current = null, t.vo.cb && t.vo.cb({
                        code: ss.enum.advertising.code.failed,
                        method: ss.enum.advertising.method.onError,
                        msg: e,
                        vo: t.vo
                    });
                }), this.ad.onResize(function(i) {
                    t.vo.style && t.vo.style.onResize ? t.vo.style.onResize(t, i) : t.ad.style.top = e.windowHeight - t.ad.style.realHeight + 1;
                });
            }
        }, o.prototype.preload = function() {}, o.prototype.show = function() {
            var t = this;
            if (console.log("banner [" + this.vo.type + "] show start:", this.vo), this.ad && !this.isShowing) {
                this.isPausing = !1, o.current = this.vo.type;
                var e = !0;
                this.ad.show().then(function() {
                    console.log("banner [" + t.vo.type + "] show success"), e ? (t.isReady = !0, t.isShowing = !0, 
                    t.vo.cb && t.vo.cb({
                        code: ss.enum.advertising.code.success,
                        method: ss.enum.advertising.method.show,
                        msg: "",
                        vo: t.vo,
                        banner: t
                    })) : console.log("banner [" + t.vo.type + "] show 强制修复失败还会调用then");
                }).catch(function(i) {
                    console.log("banner [" + t.vo.type + "] show error:", i), e = !1, t.isReady = !1, 
                    t.isShowing = !1, o.current = null, t.vo.cb && t.vo.cb({
                        code: ss.enum.advertising.code.failed,
                        method: ss.enum.advertising.method.show,
                        msg: i,
                        vo: t.vo
                    });
                });
            }
        }, o.prototype.replace = function() {
            this.isShowing && (this.isPausing || (this.hide(), this.show()));
        }, o.prototype.hide = function() {
            this.ad && (this.ad.hide(), this.isShowing = !1, o.current == this.vo.type && (o.current = null));
        }, o.prototype.pause = function() {
            this.isShowing && this.ad && (this.ad.hide(), this.isPausing = !0, this.isShowing = !1);
        }, o.prototype.resume = function() {
            this.isPausing && this.show();
        }, o.prototype.destory = function() {
            this.ad && (this.hide(), this.ad.destory(), this.ad = null, this.isReady = !1, this.isShowing = !1, 
            this.isPausing = !1);
        };
        var n = function(t, e) {
            this.manager = e, this.vo = t, this.ad = null, this.isReady = !0, this.param = null;
        };
        n.current = null, n.prototype.create = function() {
            var t = this;
            this.ad || (console.log("video [" + this.vo.type + "] create start:", this.vo), 
            this.ad = wx.createRewardedVideoAd({
                adUnitId: this.vo.adUnitId
            }), this.ad.onError(function(e) {
                console.log("video [" + t.vo.type + "] onError:", e), t.isReady = !1, t.vo.cb && t.vo.cb({
                    code: ss.enum.advertising.code.failed,
                    method: ss.enum.advertising.method.onError,
                    msg: e,
                    vo: t.vo,
                    isReady: t.isReady,
                    param: t.param
                });
            }), this.ad.onClose(function(e) {
                t.vo.type == n.current && (console.log("video [" + t.vo.type + "] onClose:", e), 
                n.current = null, t.manager.resumeBanner(), t.isReady = !0, e && e.isEnded || void 0 === e ? t.vo.cb && t.vo.cb({
                    code: ss.enum.advertising.code.success,
                    method: ss.enum.advertising.method.onClose,
                    msg: e,
                    vo: t.vo,
                    isReady: t.isReady,
                    param: t.param
                }) : t.vo.cb && t.vo.cb({
                    code: ss.enum.advertising.code.failed,
                    method: ss.enum.advertising.method.onClose,
                    msg: e,
                    vo: t.vo,
                    isReady: t.isReady,
                    param: t.param
                }));
            }));
        }, n.prototype.preload = function() {
            var t = this;
            this.ad && this.ad.load().then(function() {
                console.log("video [" + t.vo.type + "] preload success:", t.vo), t.isReady = !0, 
                t.vo.cb && t.vo.cb({
                    code: ss.enum.advertising.code.success,
                    method: ss.enum.advertising.method.preload,
                    msg: "",
                    vo: t.vo,
                    isReady: t.isReady,
                    param: t.param
                });
            }).catch(function(e) {
                console.log("video [" + t.vo.type + "] preload error:", e), t.isReady = !1, t.vo.cb && t.vo.cb({
                    code: ss.enum.advertising.code.failed,
                    method: ss.enum.advertising.method.preload,
                    msg: e,
                    vo: t.vo,
                    isReady: t.isReady,
                    param: t.param
                });
            });
        }, n.prototype.show = function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            if (this.ad) {
                this.param = e, n.current = this.vo.type;
                var i = !0;
                this.ad.show().then(function() {
                    console.log("video [" + t.vo.type + "] show start"), i ? (t.isReady = !0, t.manager.pauseBanner(), 
                    t.vo.cb && t.vo.cb({
                        code: ss.enum.advertising.code.success,
                        method: ss.enum.advertising.method.show,
                        msg: "",
                        vo: t.vo,
                        isReady: t.isReady,
                        param: t.param
                    })) : console.log("video [" + t.vo.type + "] show 版本问题导致失败后还会调用then");
                }).catch(function(e) {
                    console.log("video [" + t.vo.type + "] show error:", e), i = !1, t.isReady = !1, 
                    t.vo.cb && t.vo.cb({
                        code: ss.enum.advertising.code.failed,
                        method: ss.enum.advertising.method.show,
                        msg: e,
                        vo: t.vo,
                        isReady: t.isReady,
                        param: t.param
                    });
                });
            }
        }, n.prototype.hide = function() {}, n.prototype.destory = function() {};
        var a = function(t, e) {
            this.manager = e, this.vo = t, this.ad = null, this.isReady = !0, this.isShowing = !1, 
            this.isRequesting = !1;
        };
        a.prototype.create = function() {}, a.prototype.preload = function() {}, a.prototype.createTemp = function() {
            var t = this;
            this.ad || (this.isReady = !0, Object.values || (Object.values = function(t) {
                if (t !== Object(t)) throw new TypeError("Object.values called on a non-object");
                var e, i = [];
                for (e in t) Object.prototype.hasOwnProperty.call(t, e) && i.push(t[e]);
                return i;
            }), this.ad = wx.createInterstitialAd({
                adUnitId: this.vo.adUnitId
            }), this.ad.onLoad(function() {
                console.log("Interstitial [" + t.vo.type + "] load success"), t.isRequesting = !1;
            }), this.ad.onError(function(e) {
                console.log("Interstitial [" + t.vo.type + "] onError error:", e), t.isReady = !1, 
                t.isShowing = !1, t.isRequesting = !1, t.vo.cb && t.vo.cb({
                    code: ss.enum.advertising.code.failed,
                    method: ss.enum.advertising.method.onError,
                    msg: e,
                    vo: t.vo
                });
            }), this.ad.onClose(function(e) {
                console.log("Interstitial [" + t.vo.type + "] onClose res:", e), t.isReady = !0, 
                t.isShowing = !1, t.isRequesting = !1, t.vo.cb && t.vo.cb({
                    code: ss.enum.advertising.code.success,
                    method: ss.enum.advertising.method.onClose,
                    msg: e,
                    vo: t.vo
                });
            }));
        }, a.prototype.show = function() {
            var t = this;
            if (console.log("Interstitial [" + this.vo.type + "] show start:", this.vo), this.isRequesting = !0, 
            this.createTemp(), this.ad && !this.isShowing) {
                var e = !0;
                this.ad.show().then(function() {
                    console.log("Interstitial [" + t.vo.type + "] show success"), e ? (t.manager.hideBanner(), 
                    t.isReady = !0, t.isShowing = !0, t.isRequesting = !1, t.vo.cb && t.vo.cb({
                        code: ss.enum.advertising.code.success,
                        method: ss.enum.advertising.method.show,
                        msg: "",
                        vo: t.vo,
                        banner: t
                    })) : console.log("Interstitial [" + t.vo.type + "] show 强制修复失败还会调用then");
                }).catch(function(i) {
                    console.log("Interstitial [" + t.vo.type + "] show error:", i), e = !1, t.isShowing = !1, 
                    t.isRequesting = !1, t.vo.cb && t.vo.cb({
                        code: ss.enum.advertising.code.failed,
                        method: ss.enum.advertising.method.show,
                        msg: i,
                        vo: t.vo
                    });
                });
            } else this.isRequesting = !1;
        }, a.prototype.hide = function() {}, a.prototype.destory = function() {}, e.exports = {
            Advertising: s,
            AdvertisingVo: function(t, e, i) {
                var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
                this.type = t, this.mode = e, this.style = s, this.adUnitId = i, this.cb = o;
            }
        }, cc._RF.pop();
    }, {} ],
    AldLogic: [ function(t, e, i) {
        cc._RF.push(e, "952cbnHuqtBI4iiGV+FPB9m", "AldLogic");
        var s = function() {};
        s.prototype.open = function() {
            ss.logic.open.sendAldEvent(ss.event.ald.open);
        }, s.prototype.login = function() {
            ss.logic.open.sendAldEvent(ss.event.ald.login);
        }, s.prototype.startGame = function() {
            ss.logic.open.sendAldEvent(ss.event.ald.start_game);
        }, s.prototype.clickShareAld = function() {
            var t = ss.platform.params;
            t && t.hasOwnProperty("shareId") && t.hasOwnProperty("shareimg") && t.hasOwnProperty("sharetext") && "" != t.shareId && "" != t.shareimg && "" != t.sharetext && ss.logic.open.sendAldEvent(ss.event.ald.clickShare, {
                shareId: t.shareId,
                shareimg: t.shareimg,
                sharetext: t.sharetext
            });
        }, s.prototype.sendShareAld = function(t) {
            t && t.hasOwnProperty("shareId") && t.hasOwnProperty("shareimg") && t.hasOwnProperty("sharetext") && ss.logic.open.sendAldEvent(ss.event.ald.sendShare, {
                shareId: t.shareId,
                shareimg: t.shareimg,
                sharetext: t.sharetext
            }, !0);
        }, e.exports = {
            AldLogic: s
        }, cc._RF.pop();
    }, {} ],
    AldSdk: [ function(t, e, i) {
        cc._RF.push(e, "a12ea0anp5HnbGOKh4h0ASU", "AldSdk");
        var s = function() {
            this.initialize();
        };
        s.prototype.initialize = function() {
            isWeiXin;
        }, s.prototype.sendAldEvent = function(t, e) {
            isWeiXin && (e ? wx.aldSendEvent(t, e) : wx.aldSendEvent(t));
        }, e.exports = {
            AldSdk: s
        }, cc._RF.pop();
    }, {} ],
    App: [ function(t, e, i) {
        cc._RF.push(e, "5dec9O9LzdOP5/C7KaUc9iM", "App"), e.exports = {
            App: {
                isLoaded: !1
            }
        }, window.isWeiXin = "undefined" != typeof wx, window.ss = {
            isLog: !0,
            log: function(t) {
                if (ss.isLog) {
                    for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++) i[s - 1] = arguments[s];
                    console.log.apply(console, [ t ].concat(i));
                }
            },
            info: function(t) {
                if (ss.isLog) {
                    for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++) i[s - 1] = arguments[s];
                    console.info.apply(console, [ t ].concat(i));
                }
            },
            warn: function(t) {
                for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++) i[s - 1] = arguments[s];
                console.warn.apply(console, [ t ].concat(i));
            },
            error: function(t) {
                for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++) i[s - 1] = arguments[s];
                console.error.apply(console, [ t ].concat(i));
            },
            _uid: 0,
            getUid: function() {
                return ++ss._uid;
            },
            byte64: null,
            commonUtils: null,
            dateUtils: null,
            randomUtils: null,
            timeUtils: null,
            dirUtils: null,
            Resize: null,
            Dictionary: null,
            NodePool: null,
            Big: null,
            ferrari: null,
            proxy: null,
            config: null,
            state: null,
            enum: null,
            facade: null,
            command: null,
            boot: null,
            data: null,
            vo: null,
            mask: null,
            server: null,
            http: null,
            rom: null,
            event: null,
            custom: null,
            logic: null,
            extends: null,
            sound: null,
            asset: null,
            tips: null,
            panel: null
        }, cc._RF.pop();
    }, {} ],
    AssetLogic: [ function(t, e, i) {
        cc._RF.push(e, "7d9ad3luSdPFK3IFWEWsgoH", "AssetLogic");
        var s = function() {};
        s.prototype.getPacmanClip = function(t) {
            return ss.asset.pacmanClips.clips[t];
        }, s.prototype.getPacmanIcon = function(t) {
            var e = parseInt(t.split("_")[1]);
            return ss.asset.pacmanIcons.frames[e];
        }, e.exports = {
            AssetLogic: s
        }, cc._RF.pop();
    }, {} ],
    Asset: [ function(t, e, i) {
        cc._RF.push(e, "3f0727HAe9Pd5ZmI92N7gmA", "Asset");
        var s = t("./asset/MoveClips"), o = t("./asset/SpriteFrames");
        cc.Class({
            extends: cc.Component,
            properties: {
                pacmanClips: s.MoveClips,
                ghostClips: s.MoveClips,
                pacmanIcons: o.SpriteFrames
            },
            onLoad: function() {
                ss.asset = this;
            },
            getAsset: function(t) {
                return this[t] ? this[t] : null;
            }
        }), cc._RF.pop();
    }, {
        "./asset/MoveClips": "MoveClips",
        "./asset/SpriteFrames": "SpriteFrames"
    } ],
    Async: [ function(t, e, i) {
        cc._RF.push(e, "7aef1eUyVpGwpet+JhCFAnT", "Async");
        var s = t("./Utils"), o = function() {};
        e.exports = {
            Async: o
        }, o.map = function(t, e, i) {
            if (s.Utils.isArray(t)) if (s.Utils.isFunction(e)) if (t.length <= 0) i(null, []); else for (var o = [], n = 0, a = t.length, r = null, c = 0; c < a; c++) e(t[c], function(t, e) {
                r || (t ? i(r = t, o) : (o.push(e), ++n >= a && i(r, o)));
            }); else i(new Error("async.map iterator is invaild" + e), []); else i(new Error("async.map array is invaild" + t), []);
        }, o.mapSeries = function(t, e, i) {
            if (s.Utils.isArray(t)) if (s.Utils.isFunction(e)) if (t.length <= 0) i(null, []); else {
                var o = [], n = 0, a = t.length;
                e(t[n], function s(r, c) {
                    r ? i(r, o) : (o.push(c), ++n >= a ? i(null, o) : e(t[n], s));
                });
            } else i(new Error("async.mapSeries iterator is invaild" + e), []); else i(new Error("async.mapSeries array is invaild" + t), []);
        }, cc._RF.pop();
    }, {
        "./Utils": "Utils"
    } ],
    Bala: [ function(t, e, i) {
        cc._RF.push(e, "51d0fCkdfBEUaCixYtk6xbt", "Bala");
        var s = t("./balabala/Buff"), o = function(t) {
            this.comp = t, this.playing = !1, this.data = null, this.items = null;
        };
        o.pools = [], o.create = function() {
            return o.pools.length ? o.pools.pop() : new s.Buff();
        }, o.recover = function(t) {
            t && (t.clear(), o.pools.push(t));
        }, o.prototype.init = function(t) {
            this.data = t, this.items || (this.items = new ss.Dictionary());
        }, o.prototype.play = function() {
            this.playing = !0;
        }, o.prototype.stop = function() {
            this.playing = !1;
        }, o.prototype.update = function(t) {
            if (this.playing && this.items) for (var e, i = this.items.values, s = i.length - 1; s >= 0; s--) (e = i[s]) && e.update(t);
        }, o.prototype.has = function(t) {
            return this.items && this.items.has(t);
        }, o.prototype.add = function(t, e) {
            if (!(this.has(t) || e <= 0)) {
                var i = o.create();
                i.setData(t, {
                    time: e,
                    updateFun: this._updateFun.bind(this),
                    finishFun: this._finishFun.bind(this)
                }), this.items.set(t, i), this._callCompAdd(t, e), i.play();
            }
        }, o.prototype.remove = function(t) {
            if (this.items) {
                var e = this.items.get(t);
                e && (this.items.remove(t), o.recover(e), this._callCompRemove(t));
            }
        }, o.prototype.clear = function() {
            if (this.stop(), this.items) {
                for (var t, e = this.items.values, i = e.length - 1; i > 0; i--) t = e[i], o.recover(t);
                this.items.clear();
            }
            this.data = null;
        }, o.prototype._updateFun = function(t, e) {
            this._callCompUpdate(t, e);
        }, o.prototype._finishFun = function(t, e) {
            this.remove(t);
        }, o.prototype._callCompAdd = function(t, e) {
            this.comp && this.comp.onBalaAdd && this.comp.onBalaAdd(t, e);
        }, o.prototype._callCompUpdate = function(t, e) {
            this.comp && this.comp.onBalaUpdate && this.comp.onBalaUpdate(t, e);
        }, o.prototype._callCompRemove = function(t) {
            this.comp && this.comp.onBalaRemove && this.comp.onBalaRemove(t, 0);
        }, e.exports = {
            Bala: o
        }, cc._RF.pop();
    }, {
        "./balabala/Buff": "Buff"
    } ],
    BootBase: [ function(t, e, i) {
        cc._RF.push(e, "1f7b8g0oTtJLoqKHBJEx0+d", "BootBase");
        var s = function() {
            this.boot = null;
        };
        s.prototype.execute = function() {
            this._$oneByOne();
        }, s.prototype._$oneByOne = function() {
            this.boot && this.boot._$oneByOne();
        }, s.prototype.destroy = function() {
            this.boot = null;
        }, e.exports = {
            BootBase: s
        }, cc._RF.pop();
    }, {} ],
    BootConfig: [ function(t, e, i) {
        cc._RF.push(e, "d02ebAM6WlIFo+f6yTAWXwK", "BootConfig");
        var s = t("./BootBase"), o = function() {
            s.BootBase.call(this);
        };
        (o.prototype = new s.BootBase()).execute = function() {
            ss.custom.loadConfig("config", this._$oneByOne.bind(this));
        }, e.exports = {
            BootConfig: o
        }, cc._RF.pop();
    }, {
        "./BootBase": "BootBase"
    } ],
    BootLoads: [ function(t, e, i) {
        cc._RF.push(e, "2f988xMdX1Px4seS9Ka0FWm", "BootLoads");
        var s = t("./BootBase"), o = function() {
            s.BootBase.call(this);
        };
        (o.prototype = new s.BootBase()).execute = function() {
            this._$oneByOne();
        }, e.exports = {
            BootLoads: o
        }, cc._RF.pop();
    }, {
        "./BootBase": "BootBase"
    } ],
    BootManager: [ function(t, e, i) {
        cc._RF.push(e, "4dc10DaiaRNfayPOVyryRl8", "BootManager");
        var s = t("./boot/BootConfig"), o = t("./boot/BootLoads"), n = function() {
            this.index = -1, this.boots = [], this.mCompleteHandler = null;
        };
        n.prototype.initialize = function() {
            this.add(new s.BootConfig()), this.add(new o.BootLoads());
        }, n.prototype.add = function(t) {
            -1 == this.boots.indexOf(t) && (t.boot = this, this.boots.push(t));
        }, n.prototype.execute = function(t) {
            this.mCompleteHandler = t, this._$oneByOne();
        }, n.prototype._$oneByOne = function() {
            ++this.index < this.boots.length ? this.boots[this.index] && this.boots[this.index].execute() : this._$complete();
        }, n.prototype._$complete = function() {
            this.mCompleteHandler && this.mCompleteHandler();
        }, e.exports = {
            BootManager: n
        }, cc._RF.pop();
    }, {
        "./boot/BootConfig": "BootConfig",
        "./boot/BootLoads": "BootLoads"
    } ],
    Brain: [ function(t, e, i) {
        cc._RF.push(e, "7689cHTgBFJlJvJ3TaPpv9T", "Brain");
        var s = function(t) {
            this.comp = t, this.clear();
        };
        s.prototype.setData = function(t) {
            this.data = ss.config.smart[t];
        }, s.prototype.reflect = function(t, e) {
            var i = this.data[t];
            return i && Math.random() < i.frist ? (this.time = 0, this.action = t, this.targetId = e, 
            this.item = i, this.clockwise = Math.random() < .5 ? -1 : 1, this.cdRandom = i.cdRandom ? Math.ceil(i.cdRandom * Math.random()) : 0, 
            this.playing = !0, {
                addSpeed: Math.random() < i.addSpeed
            }) : null;
        }, s.prototype.update = function(t) {
            this.playing && this.data && this.item && (this.item.cd <= 0 || (this.time += 1e3 * t, 
            this.time >= this.item.cd + this.cdRandom ? (this.playing = !1, this._onBrainFinish({
                action: this.action,
                again: Math.random() < this.item.again
            })) : this._onBrainUpdate({
                action: this.action,
                clockwise: this.clockwise
            })));
        }, s.prototype.reset = function() {
            this.item = null, this.time = 0, this.targetId = -1, this.action = null, this.playing = !1, 
            this.clockwise = -1, this.cdRandom = 0;
        }, s.prototype.clear = function() {
            this.data = null, this.reset();
        }, s.prototype._onBrainUpdate = function(t) {
            this.comp && this.comp.onBrainUpdate && this.comp.onBrainUpdate(t);
        }, s.prototype._onBrainFinish = function(t) {
            this.comp && this.comp.onBrainFinish && this.comp.onBrainFinish(t);
        }, e.exports = {
            Brain: s
        }, cc._RF.pop();
    }, {} ],
    BuffItem: [ function(t, e, i) {
        cc._RF.push(e, "624a6M0ZaZDmaiqwjdc7X1e", "BuffItem"), cc.Class({
            extends: cc.Component,
            properties: {
                numLab: cc.Label
            },
            ctor: function() {
                this.isLoaded = !1;
            },
            onLoad: function() {},
            start: function() {
                this.isLoaded || (this.node.active = !1);
            },
            setVisible: function(t) {
                this.isLoaded = !0, this.node.active = t;
            },
            setNum: function(t) {
                this.numLab.string = "" + t;
            },
            clear: function() {
                this.numLab.string = "", this.node.active = !1;
            }
        }), cc._RF.pop();
    }, {} ],
    Buff: [ function(t, e, i) {
        cc._RF.push(e, "c83d1Z5icJIwLRJ1NLeLahl", "Buff");
        var s = function() {
            this.clear();
        };
        s.prototype.setData = function(t, e) {
            this.count = 0, this.type = t, this.time += e.time, this.updateFun = e.updateFun, 
            this.finishFun = e.finishFun;
        }, s.prototype.play = function() {
            this.playing = !0;
        }, s.prototype.stop = function() {
            this.playing = !1;
        }, s.prototype.update = function(t) {
            this.playing && (this.count += t, this.count < 1 || (this.count = 0, --this.time <= 0 ? (this.playing = !1, 
            this.time = 0, this.finishFun && this.finishFun(this.type, this.time)) : this.updateFun && this.updateFun(this.type, this.time)));
        }, s.prototype.clear = function() {
            this.playing = !1, this.type = 0, this.count = 0, this.time = 0, this.updateFun = null, 
            this.finishFun = null;
        }, e.exports = {
            Buff: s
        }, cc._RF.pop();
    }, {} ],
    Bulu: [ function(t, e, i) {
        cc._RF.push(e, "9df6efOgGlGJ5KXOy1R0qyx", "Bulu");
        var s = t("./bulubulu/Viewing"), o = function() {
            this.viewing = new s.Viewing(), this.pacmans = new ss.NodePool(), this.ghosts = new ss.NodePool(), 
            this.peas = new ss.NodePool(), this.radars = new ss.NodePool(), this.snows = new ss.NodePool(), 
            this.shadows = new ss.NodePool(), this.uid = 0, this.heroid = 0, this.hero = null, 
            this.data = null, this.map = null, this._scaleValue = 0, this._scaleXY = 0;
        };
        o.prototype.init = function(t) {
            this.data = t, this.map = t.map, this.viewing.init(t.viewing), this.peas.initialize("Pea", t.pea.prefab, t.pea.parent), 
            this.peas.preview(t.pea.num), this.ghosts.initialize("Ghost", t.ghost.prefab, t.ghost.parent), 
            this.ghosts.preview(t.ghost.num), this.pacmans.initialize("Pacman", t.pacman.prefab, t.pacman.parent), 
            this.pacmans.preview(t.pacman.num), this.snows.initialize("Snow", t.snow.prefab, t.snow.parent), 
            this.snows.preview(t.snow.num), this.shadows.initialize("Shadow", t.shadow.prefab, t.shadow.parent), 
            this.shadows.preview(t.shadow.num);
        }, o.prototype.createAll = function(t) {
            var e, i;
            this.viewing.reset();
            var s = 0, o = t.pea.data;
            for (var n in o) for (i = o[n], e = 0; e < i; e++) this.createPea(ss.enum.gameEgg[n]), 
            s++;
            for (i = Math.max(t.pea.num - s, 0), e = 0; e < i; e++) this.createPea(ss.enum.gameEgg.normal);
            for (i = t.ghost.length, e = 0; e < i; e++) this.createGhost(t.ghost[e]);
            for (this.createHero(t.pacman[0]), i = Math.max(0, t.pacman.length), e = 1; e < i; e++) this.createPacman(t.pacman[e]);
        }, o.prototype.clearAll = function() {
            this.pacmans.removeAll(), this.ghosts.removeAll(), this.peas.removeAll(), this.snows.removeAll(), 
            this.shadows.removeAll(), this.viewing.clear(), this.uid = 0, this.hero = null, 
            this._scaleValue = 0, this._scaleXY = 1;
        }, o.prototype.getScaleXY = function() {
            return this._scaleXY;
        }, o.prototype.getRandOutSideCell = function() {
            return this.viewing.getRandOutsideCell();
        }, o.prototype.addUnit = function(t, e, i) {
            this.viewing.addUnit(t, e, i);
        }, o.prototype.removeUnit = function(t) {
            this.viewing.removeUnit(t);
        }, o.prototype.createHero = function(t) {
            var e = {};
            e.id = this.heroid, e.pos = cc.v2(), e.gid = this.viewing.getCellIdLocal(e.pos), 
            e.type = ss.enum.roleType.superman, e.camp = t.camp, e.sid = t.sid, e.mid = t.mid, 
            e.name = t.name, this.pacmans.create(e, null, !0), this.hero = this.pacmans.getComp(this.heroid);
        }, o.prototype.createPacman = function(t) {
            var e = {};
            e.id = ++this.uid, e.pos = null, e.gid = Math.random() < .2 ? this.viewing.getRandInnerId() : this.viewing.getRandOutsideId(), 
            e.type = ss.enum.roleType.pacman, e.camp = t.camp, e.sid = t.sid, e.mid = t.mid, 
            e.name = t.name, this.pacmans.create(e, null, !0);
        }, o.prototype.createGhost = function(t) {
            var e = {};
            e.id = ++this.uid, e.gid = this.viewing.getRandInnerId(), e.type = ss.enum.roleType.ghost, 
            e.camp = ss.enum.gameCamp.normal, e.sid = t.sid, e.mid = t.mid, this.ghosts.create(e, null, !0);
        }, o.prototype.createPea = function(t) {
            var e = {};
            e.id = ++this.uid, e.gid = this.viewing.getRandInnerId(), e.type = ss.enum.roleType.pea, 
            e.camp = ss.enum.gameCamp.normal, e.sid = 0, e.egg = t, this.peas.create(e, null, !0);
        }, o.prototype.createRadar = function(t) {}, o.prototype.createSnow = function(t) {
            var e = {};
            e.id = ++this.uid, e.target = t.target, e.parent = t.parent, e.word = t.word, e.v2 = t.v2, 
            e.index = t.index, this.snows.create(e, null, !1);
        }, o.prototype.createShadow = function(t) {
            var e = {};
            e.id = ++this.uid, e.target = t.target, e.pos = t.pos, e.size = t.size, e.rotation = t.rotation, 
            e.scaleX = t.scaleX, e.scaleY = t.scaleY, e.mid = t.mid, this.shadows.create(e, null, !1);
        }, o.prototype.recoverHero = function(t) {
            this.heroid == t && (this.hero = null, this.pacmans.recover(t, !0));
        }, o.prototype.recoverPacman = function(t) {
            this.pacmans.recover(t, !0);
        }, o.prototype.recoverGhost = function(t) {
            this.ghosts.recover(t, !0);
        }, o.prototype.recoverPea = function(t) {
            this.peas.recover(t, !0);
        }, o.prototype.recoverRadar = function(t) {}, o.prototype.recoverSnow = function(t) {
            this.snows.recover(t, !0);
        }, o.prototype.recoverShadow = function(t) {
            this.shadows.recover(t, !0);
        }, o.prototype.reviveHero = function(t) {
            this.viewing.reset();
            var e = t;
            e.id = this.heroid, e.pos = cc.v2(), e.gid = this.viewing.getCellIdLocal(e.pos), 
            this.pacmans.create(e, null, !0), this.hero = this.pacmans.getComp(this.heroid);
        }, o.prototype.revivePacman = function(t) {
            var e = t;
            e.pos = null, e.gid = this.viewing.getRandOutsideId(), this.pacmans.create(e, null, !0);
        }, o.prototype.reviveGhost = function(t) {
            var e = t;
            e.gid = this.viewing.getRandOutsideId(), this.ghosts.create(e, null, !0);
        }, o.prototype.revivePea = function(t) {
            var e = t;
            e.gid = this.viewing.getRandInnerId(), this.peas.create(e, null, !0);
        }, o.prototype.reviveAll = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.pacmans.callMethod("revive", t);
        }, o.prototype.removeTargetShadow = function(t) {
            this.shadows.callMethod("removeTarget", t);
        }, o.prototype.removeTargetSnow = function(t) {
            this.snows.callMethod("removeTarget", t);
        }, o.prototype.lookAt = function(t) {
            this.viewing.move(t);
        }, o.prototype.shootAt = function() {
            if (this.hero) {
                var t = this.hero.node.getPosition();
                t.x *= -1, t.y *= -1, this.viewing.moveViewPort(t);
            }
        }, o.prototype.scaleXY = function(t) {
            if (ss.logic.game.isSystemBetter() && !(this._scaleValue >= t)) {
                this._scaleValue = t;
                var e = 1;
                t >= 192 && (e = .85), this._scaleXY != e && (console.log("scaleXY:", e), this._scaleXY = e, 
                this.viewing.scaleXY(e));
            }
        }, o.prototype.move = function(t) {
            this.hero && this.hero.move(t);
        }, o.prototype.addSpeed = function() {
            this.hero && this.hero.addSpeed();
        }, o.prototype.moveRadar = function(t) {}, e.exports = {
            Bulu: o
        }, cc._RF.pop();
    }, {
        "./bulubulu/Viewing": "Viewing"
    } ],
    Cell: [ function(t, e, i) {
        cc._RF.push(e, "bd1f1CHaHJHPq+gXtdJDJJi", "Cell");
        var s = function(t, e, i) {
            this.id = t, this.inner = e, this.rect = i, this.showing = !1, this.units = new ss.Dictionary();
        };
        s.prototype.getRandV2 = function() {
            var t = cc.v2();
            return t.x = this.rect.x + Math.floor(Math.random() * this.rect.width), t.y = this.rect.y + Math.floor(Math.random() * this.rect.height), 
            t;
        }, s.prototype.getCenterV2 = function() {
            return this.rect.center;
        }, s.prototype.getRectV2 = function() {
            return this.rect.origin;
        }, s.prototype.add = function(t) {
            this.units.set(t.id, t), t && t.onActiveFx && t.onActiveFx(this.showing, !0);
        }, s.prototype.remove = function(t) {
            this.units.remove(t);
        }, s.prototype.show = function() {
            this.showing || (this.showing = !0, this._activeFx(!0));
        }, s.prototype.hide = function() {
            this.showing && (this.showing = !1, this._activeFx(!1));
        }, s.prototype.reset = function() {
            this.hide();
        }, s.prototype.clear = function() {
            for (var t, e = this.units.values, i = 0, s = e.length; i < s; i++) (t = e[i]) && t.clear && t.clear();
            this.units.clear();
        }, s.prototype._activeFx = function(t) {
            for (var e, i = this.units.values, s = i.length - 1; s >= 0; s--) (e = i[s]) && e.onActiveFx && e.onActiveFx(t);
        }, e.exports = {
            Cell: s
        }, cc._RF.pop();
    }, {} ],
    CocosSdk: [ function(t, e, i) {
        cc._RF.push(e, "9ba6dU75P9FjKUDRMtK2THC", "CocosSdk");
        var s = t("../../util/Utils"), o = t("../../util/WebUtils"), n = t("../const/HttpConst"), a = function() {};
        e.exports = {
            CocosSdk: a
        }, a.prototype.getStorage = function(t, e) {
            t = "" + t;
            var i = cc.sys.localStorage.getItem(t), o = s.Utils.getJson(i);
            if (null == o) return console.log("getStorage data format err", t, i), void s.Utils.invokeCb(e, {});
            s.Utils.invokeCb(e, o);
        }, a.prototype.setStorage = function(t, e, i) {
            if (t = "" + t, !s.Utils.isObject(e)) return console.log("setStorage data format err", t, e), 
            void s.Utils.invokeCb(i, !1);
            cc.sys.localStorage.setItem(t, JSON.stringify(e)), s.Utils.invokeCb(i, !0);
        }, a.prototype.httpRequest = function(t, e, i, a) {
            if (!s.Utils.isObject(i)) return console.log("cocos httpRequest data format err", key, i), 
            void s.Utils.invokeCb(a, null, n.HttpConst.HTTP_CODE.NOT_OBJECT);
            var r = o.WebUtils.obj2UriParam(i);
            console.log("content=", r);
            var c = new XMLHttpRequest();
            c.open(t, e, !0), c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;"), 
            c.onreadystatechange = function() {
                if (4 == c.readyState) if (200 == c.status) {
                    var t = s.Utils.getJson(c.responseText);
                    t ? s.Utils.invokeCb(a, t, c.status) : (console.log("cocos httpRequest result format err", c.responseText), 
                    s.Utils.invokeCb(a, null, n.HttpConst.HTTP_CODE.RETURN_FORMAT_ERR));
                } else s.Utils.invokeCb(a, null, c.status);
            }, console.log("cocos httpRequest succ", i), c.send(r);
        }, cc._RF.pop();
    }, {
        "../../util/Utils": "Utils",
        "../../util/WebUtils": "WebUtils",
        "../const/HttpConst": "HttpConst"
    } ],
    CommandManager: [ function(t, e, i) {
        cc._RF.push(e, "01541tJ4SNM/ZmXU/bgcEmh", "CommandManager");
        var s = function() {};
        e.exports = {
            CommandManager: s
        }, s.prototype.initialize = function() {
            cc.systemEvent.on(ss.event.cmd.GameInit, this.gameInit, this), cc.systemEvent.on(ss.event.cmd.UserData, this.userData, this), 
            cc.systemEvent.on(ss.event.cmd.GameData, this.gameData, this), cc.systemEvent.on(ss.event.cmd.GamePlay, this.gamePlay, this), 
            cc.systemEvent.on(ss.event.cmd.GameOver, this.gameOver, this), cc.systemEvent.on(ss.event.cmd.AddMoney, this.addMoney, this), 
            cc.systemEvent.on(ss.event.cmd.SetMisc, this.setMisc, this), cc.systemEvent.on(ss.event.cmd.SetGoods, this.setGoods, this), 
            cc.systemEvent.on(ss.event.cmd.AddScore, this.addScore, this);
        }, s.prototype.clear = function() {}, s.prototype.startup = function() {
            var t = ss.platform.getOpenFunc(), e = t && t.share ? t.share : ss.config.shareConf;
            cc.systemEvent.emit(ss.event.client.openFunc, t), ss.custom.initShare(e, ss.proxy.share), 
            ss.logic.open.setAppMessage();
            var i = ss.enum.storage;
            ss.custom.initStorage(function() {
                var t = {};
                for (var e in i) t[i[e]] = ss.custom.getStorage(i[e]);
                ss.data.startup(t), ss.mask.startup(t), ss.server.startup();
            }, null, 1e4, i);
        }, s.prototype.gameInit = function(t) {
            ss.state.onInit(), cc.systemEvent.emit(ss.event.system.GameInit);
        }, s.prototype.userData = function(t) {
            var e = {};
            e.userInfo = ss.proxy.userInfo, cc.systemEvent.emit(ss.event.system.UserData, e);
        }, s.prototype.gameData = function(t) {
            ss.state.onPrev(), cc.systemEvent.emit(ss.event.system.GameData, {});
        }, s.prototype.gamePlay = function(t) {
            var e = t;
            ss.state.onPlay(), cc.systemEvent.emit(ss.event.system.GamePlay, e);
        }, s.prototype.gameOver = function(t) {
            var e = t;
            ss.state.onOver(), cc.systemEvent.emit(ss.event.system.GameOver, e);
        }, s.prototype.addMoney = function(t) {
            var e = t;
            ss.logic.storage.saveUnit(e.isStorage), cc.systemEvent.emit(ss.event.client.addMoney, e);
        }, s.prototype.setMisc = function(t) {
            ss.custom.setStorage(ss.enum.storage.misc, ss.data.misc);
        }, s.prototype.setGoods = function(t) {
            var e = t;
            ss.logic.storage.saveGoods(), cc.systemEvent.emit(ss.event.client.setGoods, e);
        }, s.prototype.addScore = function(t) {
            ss.logic.storage.saveUnit();
            var e = ss.data.getScore();
            ss.logic.open.setUserCloud(e);
        }, cc._RF.pop();
    }, {} ],
    CommonUtils: [ function(e, i, s) {
        cc._RF.push(i, "83b26YAX9dEV4bKiHDFGHty", "CommonUtils");
        var o = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        }, n = function() {};
        n.isValidValue = function(t) {
            return void 0 !== t && null != t && ("number" != typeof t || !isNaN(t));
        }, n.isBoolean = function(t) {
            return n.isValidValue(t) && "boolean" == typeof t;
        }, n.isNumber = function(t) {
            return n.isValidValue(t) && "number" == typeof t;
        }, n.isString = function(t) {
            return n.isValidValue(t) && "string" == typeof t;
        }, n.isFunction = function(t) {
            return n.isValidValue(t) && "function" == typeof t;
        }, n.isArray = function(t) {
            return n.isValidValue(t) && Array.isArray(t);
        }, n.isObject = function(t) {
            return n.isValidValue(t) && "object" === (void 0 === t ? "undefined" : o(t)) && !Array.isArray(t);
        }, n.getJson = function(t) {
            if (!n.isString(t)) return null;
            try {
                var e = JSON.parse(t);
                if (e && n.isObject(e)) return e;
            } catch (t) {}
            return null;
        }, n.getObjFunc = function(t, e) {
            return n.isObject(t) && n.isString(e) && n.isFunction(t[e]) ? t[e].bind(t) : null;
        }, n.getObjFuncEx = function(t, e, i) {
            var s = n.getObjFunc(t, e);
            return null == s ? n.getObjFunc(i, e) : s;
        }, n.invokeCb = function(t) {
            if (n.isFunction(t)) {
                var e = Array.prototype.slice.call(arguments, 1);
                t.apply(null, e);
            } else console.log("invokeCb faild", t);
        }, n.clone = function(t) {
            var e = JSON.stringify(t);
            try {
                return JSON.parse(e);
            } catch (t) {}
            return null;
        }, n.angleToRotation = function(t) {
            return -1 * t;
        }, n.rotationToAngle = function(t) {
            return -1 * t;
        }, n.rotaToRad = function(t) {
            var e = n.rotationToAngle(t) % 360;
            return 0 == t && (e = 0), n.toFixed(e / 180 * Math.PI);
        }, n.sin = function(t) {
            return Math.abs(t) % Math.PI == 0 ? t / Math.PI : Math.abs(t) == Math.PI / 2 ? 0 : Math.sin(t);
        }, n.cos = function(t) {
            return Math.abs(t) == Math.PI / 2 ? t / (Math.PI / 2) : Math.cos(t);
        }, n.toFixed = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return 0 == t ? 0 : i ? Math.floor(t * e) / e : Math.ceil(t * e) / e;
        }, n.rotationToVec2 = function(t) {
            var e = {
                x: 0,
                y: 0,
                dir: 0
            }, i = t % 360;
            return 0 == t && (i = 0), i < 0 && i > -90 || i > 270 && i < 360 ? (e.x = 1, e.y = 1, 
            e.dir = 9) : i < -90 && i > -180 || i > 180 && i < 270 ? (e.x = -1, e.y = 1, e.dir = 7) : i < -180 && i > -270 || i > 90 && i < 180 ? (e.x = -1, 
            e.y = -1, e.dir = 1) : i < -270 && i > -360 || i > 0 && i < 90 ? (e.x = 1, e.y = -1, 
            e.dir = 3) : 0 == i ? (e.x = 1, e.y = 0, e.dir = 6) : -90 == i || 270 == i ? (e.x = 0, 
            e.y = 1, e.dir = 8) : -180 == i || 180 == i ? (e.x = -1, e.y = 0, e.dir = 4) : -270 != i && 90 != i || (e.x = 0, 
            e.y = -1, e.dir = 2), e;
        }, n.vToRotaVec2 = function(t, e) {
            var i = {}, s = n.rotationToVec2(e), o = n.rotaToRad(e);
            return i.x = s.x * Math.abs(n.cos(o)) * t, i.y = s.y * Math.abs(n.sin(o)) * t, i;
        }, n.randomInt = function(t, e) {
            return Math.floor((e - t + 1) * Math.random()) + t;
        }, n.arrayRandomSort = function(t) {
            for (var e = t.length - 1, i = 0; i <= e; i++) {
                var s = n.randomInt(i, e), o = t[i];
                t[i] = t[s], t[s] = o;
            }
            return t;
        }, n.unitToString = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = null, o = null;
            return t >= 1e15 ? (s = n.toFixed(t / 1e15, e, !0), o = "Q") : t >= 1e12 ? (s = n.toFixed(t / 1e12, e, !0), 
            o = "T") : t >= 1e9 ? (s = n.toFixed(t / 1e9, e, !0), o = "B") : t >= 1e6 ? (s = n.toFixed(t / 1e6, e, !0), 
            o = "M") : t >= 1e4 ? (s = n.toFixed(t / 1e4, e, !0), o = "W") : i && (s = n.toFixed(t, e, !0)), 
            null != s && null != o ? -1 == (s + "").indexOf(".") ? s + ".0" + o : s + o : t + "";
        }, n.intToString = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
            return String(t).length >= e ? "" + t : "" + (Array(e).join(0) + t).slice(-e);
        }, n.stringReplace = function(t, e, i) {
            return e.replace(new RegExp(t, "gm"), i);
        }, n.stringKeyValue = function(t, e) {
            var i = t;
            for (var s in e) {
                var o = e[s];
                void 0 != o && (i = n.stringReplace("\\{" + s + "\\}", i, o));
            }
            return i;
        }, n.stringTruncate = function(t, e) {
            for (var i = "", s = 0, o = 0; o < t.length; o++) {
                var n = t.charCodeAt(o);
                if (n >= 1 && n <= 126 || 65376 <= n && n <= 65439 ? s++ : s += 2, !(s <= e)) break;
                i += t.substr(o, 1);
            }
            return i;
        }, i.exports = {
            CommonUtils: n
        }, cc._RF.pop();
    }, {} ],
    ConfigLogic: [ function(t, e, i) {
        cc._RF.push(e, "1f33eXWIR1GO7ItkTFCF8LS", "ConfigLogic");
        var s = function() {
            this.fileName = "table";
        };
        s.prototype.getSheet = function(t) {
            return ss.custom.getSheet(this.fileName, t);
        }, s.prototype.getSheetData = function(t, e) {
            return ss.custom.getSheetData(this.fileName, t, e);
        }, s.prototype.getSheetFristId = function(t) {
            return ss.custom.getSheetFristId(this.fileName, t);
        }, s.prototype.getSheetLastId = function(t) {
            return ss.custom.getSheetLastId(this.fileName, t);
        }, e.exports = {
            ConfigLogic: s
        }, cc._RF.pop();
    }, {} ],
    Config: [ function(t, e, i) {
        cc._RF.push(e, "e510d+nyKdJTIdMD1kfsmkZ", "Config");
        var s = {};
        e.exports = {
            Config: s
        }, s.adunit = {
            video: "adunit-63fb99fe58e5f88a",
            interstitial: "adunit-027f1fabcc3ed9a9",
            bannersLength: 6,
            banners_1: [ "adunit-ce4d45a6eb6a0d67", "adunit-01ec23ff485315fc", "adunit-581c8cb28b138656", "adunit-0738174486ed8b42" ],
            banners_2: [ "adunit-d81fde31ccdfd210", "adunit-7734ea0f1bd73d17", "adunit-69802c3fd6b7d567", "adunit-d8e95246c84348ba", "adunit-e740c220f8d897ab" ],
            banners_3: [ "adunit-87a9d00f44ae716b", "adunit-edaf780b3bb35722", "adunit-c2f4283451ab2a6f", "adunit-c2f91170c07d8164", "adunit-b2a17c5d07186a5d", "adunit-328ea584129f8498" ],
            banners_4: [ "adunit-65f4faa74539a6f0", "adunit-cf82bbd4f82c1bd4", "adunit-2b2a0e1ff3055e5f", "adunit-29f14f6ea571dd96", "adunit-2b1295d67e51cf63", "adunit-e1138fedca3b775c", "adunit-336113921edf005e" ],
            banners_5: [ "adunit-e164cfabc3b91775" ],
            banners_6: [ "adunit-e164cfabc3b91775", "adunit-46485bc389b9e871", "adunit-1ca8c168f8e3798f", "adunit-c2e6ddcc9ae1ddb4", "adunit-5855f4fead550c1d" ]
        }, s.shareIds = {
            app: 9999,
            home: 1,
            invite: 2,
            lottey: 3,
            test: 4,
            result: 5,
            daily: 6,
            revive: 7,
            getAward: 8,
            strong: 9
        }, s.shareConfAudit = {
            isOpen: !1,
            shareTxt: {
                1: "哈哈打不过我吧,没有办法我就是这么强大...啦啦啦啦啦啦啦啦啦"
            },
            shareImg: {
                1: "Leaderboard/res/share1.jpg"
            },
            shareUrl: {
                1: "GxGjm_qoRtq5yxqWNU45rA"
            },
            shareConf: {
                8888: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ],
                9999: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ],
                1: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ],
                2: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ],
                3: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ],
                4: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ],
                5: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ],
                6: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ],
                7: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ],
                8: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ],
                9: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                } ]
            }
        }, s.shareConf = {
            isOpen: !0,
            shareTxt: {
                0: "哈哈打不过我吧,没有办法我就是这么强大,啦啦啦啦啦啦啦啦啦...",
                1: "哈哈打不过我吧,没有办法我就是这么强大,啦啦啦啦啦啦啦啦啦...",
                2: "快来呀，一起吃饭、睡觉、追豆豆吧！",
                3: "嘘，别说话！我不会告诉你我们正在偷袭...",
                4: "神对手，猪对手，统统都被吃成狗！"
            },
            shareImg: {
                0: "Leaderboard/res/share1.jpg",
                1: "https://mmocgame.qpic.cn/wechatgame/9dH1VrbFicjxAQbeemgYtFicCR3315bROYTconjicQXOwrK4BxjdhuHuic7krc2tU9Hx/0",
                2: "https://mmocgame.qpic.cn/wechatgame/9dH1VrbFicjyGzmoPrlsHZJJerZCBXoicln1gyPs3kCfktH27oUiawXbJsXpsK2VdC0/0",
                3: "https://mmocgame.qpic.cn/wechatgame/9dH1VrbFicjzsQooqIqNzCNYLNESicBZ8Ery8pGaibZTtribnptRNCNFe8V26bIvp2r6/0",
                4: "https://mmocgame.qpic.cn/wechatgame/9dH1VrbFicjzPHsMsiaLqaibxI4VicNbic8tD4w50x1LicPM8j9GsjzXcHiaY2BtjRuyL5B/0"
            },
            shareUrl: {
                0: "GxGjm_qoRtq5yxqWNU45rA",
                1: "GxGjm_qoRtq5yxqWNU45rA",
                2: "_bVG1U0RRR6w0Qn4fGCi8w",
                3: "q_OvpPTsTOmxswS27rg8Ug",
                4: "6kSMBweHQCmT2gheL9KQSw"
            },
            shareConf: {
                8888: [ {
                    txt: 0,
                    img: 0,
                    url: 0
                } ],
                9999: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                }, {
                    txt: 2,
                    img: 2,
                    url: 2
                }, {
                    txt: 3,
                    img: 3,
                    url: 3
                }, {
                    txt: 4,
                    img: 4,
                    url: 4
                } ],
                1: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                }, {
                    txt: 2,
                    img: 2,
                    url: 2
                }, {
                    txt: 3,
                    img: 3,
                    url: 3
                }, {
                    txt: 4,
                    img: 4,
                    url: 4
                } ],
                2: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                }, {
                    txt: 2,
                    img: 2,
                    url: 2
                }, {
                    txt: 3,
                    img: 3,
                    url: 3
                }, {
                    txt: 4,
                    img: 4,
                    url: 4
                } ],
                3: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                }, {
                    txt: 2,
                    img: 2,
                    url: 2
                }, {
                    txt: 3,
                    img: 3,
                    url: 3
                }, {
                    txt: 4,
                    img: 4,
                    url: 4
                } ],
                4: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                }, {
                    txt: 2,
                    img: 2,
                    url: 2
                }, {
                    txt: 3,
                    img: 3,
                    url: 3
                }, {
                    txt: 4,
                    img: 4,
                    url: 4
                } ],
                5: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                }, {
                    txt: 2,
                    img: 2,
                    url: 2
                }, {
                    txt: 3,
                    img: 3,
                    url: 3
                }, {
                    txt: 4,
                    img: 4,
                    url: 4
                } ],
                6: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                }, {
                    txt: 2,
                    img: 2,
                    url: 2
                }, {
                    txt: 3,
                    img: 3,
                    url: 3
                }, {
                    txt: 4,
                    img: 4,
                    url: 4
                } ],
                7: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                }, {
                    txt: 2,
                    img: 2,
                    url: 2
                }, {
                    txt: 3,
                    img: 3,
                    url: 3
                }, {
                    txt: 4,
                    img: 4,
                    url: 4
                } ],
                8: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                }, {
                    txt: 2,
                    img: 2,
                    url: 2
                }, {
                    txt: 3,
                    img: 3,
                    url: 3
                }, {
                    txt: 4,
                    img: 4,
                    url: 4
                } ],
                9: [ {
                    txt: 1,
                    img: 1,
                    url: 1
                }, {
                    txt: 2,
                    img: 2,
                    url: 2
                }, {
                    txt: 3,
                    img: 3,
                    url: 3
                }, {
                    txt: 4,
                    img: 4,
                    url: 4
                } ]
            }
        }, s.storageConf = {
            unit: {
                localTimes: 9e3,
                needNet: !1,
                netTimes: 13e4
            },
            info: {
                localTimes: 11e3,
                needNet: !1,
                netTimes: 13e4
            },
            goods: {
                localTimes: 12e3,
                needNet: !1,
                netTimes: 13e4
            },
            misc: {
                localTimes: 13e3,
                needNet: !1,
                netTimes: 13e4
            },
            mask: {
                localTimes: 14e3,
                needNet: !1,
                netTimes: 13e4
            },
            sets: {
                localTimes: 15e3,
                needNet: !1,
                netTimes: 13e4
            }
        }, s.popup = {
            isOpenShowBanner: !1,
            isOpenHideBanner: !0,
            isOpenChangeBanner: !1,
            isCloseBanner: !0,
            opacity: 255,
            isEffect: !1,
            bannerDelayTime: 0
        }, s.miniProgram = {
            id: 10,
            id_1: 11,
            open: 1,
            list: [ 10, 12, 5, 2, 11, 6, 7, 4, 8, 9 ],
            list_1: [ 11, 12, 11, 12, 11, 12 ],
            allList: [ 10, 1, 5, 2, 3, 6, 7, 4, 8, 9 ],
            programs: {
                1: {
                    appId: "wxa2fd73a6fc715041",
                    icon: "resources/icon/icon_1.png",
                    path: "",
                    name: "超级90坦克",
                    rate: 20
                },
                2: {
                    appId: "wx6116e13858fad80b",
                    icon: "resources/icon/icon_2.png",
                    path: "",
                    name: "经典水管工",
                    rate: 20
                },
                3: {
                    appId: "wxebb8abe1f4cadacd",
                    icon: "resources/icon/icon_3.png",
                    path: "",
                    name: "锤子大作战",
                    rate: 20
                },
                4: {
                    appId: "wxdb05a20158191f56",
                    icon: "resources/icon/icon_4.png",
                    path: "",
                    name: "跳跃吧球球",
                    rate: 20
                },
                5: {
                    appId: "wxb12fb9300c93a4fb",
                    icon: "resources/icon/icon_5.png",
                    path: "",
                    name: "刀剑大作战",
                    rate: 20
                },
                6: {
                    appId: "wx323844398d34ba97",
                    icon: "resources/icon/icon_6.png",
                    path: "",
                    name: "暴走忍者",
                    rate: 20
                },
                7: {
                    appId: "wxfd5e6758e91c29e6",
                    icon: "resources/icon/icon_7.png",
                    path: "",
                    name: "标枪王者",
                    rate: 20
                },
                8: {
                    appId: "wxb2a1b305bbf69be2",
                    icon: "resources/icon/icon_8.png",
                    path: "",
                    name: "球球向下冲",
                    rate: 20
                },
                9: {
                    appId: "wx431e5e24ccd54633",
                    icon: "resources/icon/icon_9.png",
                    path: "",
                    name: "梦幻消消乐",
                    rate: 20
                },
                10: {
                    appId: "wxf4ac0077b6ffb1e7",
                    icon: "resources/icon/icon_10.png",
                    path: "",
                    name: "贪吃蛇大作战",
                    rate: 20
                },
                11: {
                    appId: "wxebb8abe1f4cadacd",
                    icon: "resources/icon/icon_11.png",
                    path: "",
                    name: "欢乐锤锤",
                    rate: 20
                },
                12: {
                    appId: "wxa2fd73a6fc715041",
                    icon: "resources/icon/icon_12.png",
                    path: "",
                    name: "坦克大战",
                    rate: 20
                }
            }
        }, s.bannerWrong = {
            7: {
                delayRate: 0,
                skipTime: .8,
                showTime: .8
            },
            8: {
                delayRate: 0,
                skipTime: .8,
                showTime: .8
            },
            9: {
                delayRate: 0,
                skipTime: .8,
                showTime: .8
            },
            10: {
                delayRate: 0,
                skipTime: .8,
                showTime: .8
            },
            14: {
                delayRate: 0,
                skipTime: .8,
                showTime: .8
            }
        }, s.rule = {
            test: {
                newSort: [ 5, 3, 4 ],
                oldSort: [ 5, 3, 4 ],
                auditSort: [ 3 ],
                datas: {
                    1: {
                        mask: "mask_test_free",
                        new: 9999,
                        old: 9999
                    },
                    3: {
                        mask: "mask_test_video",
                        new: 9999,
                        old: 9999
                    },
                    4: {
                        mask: "mask_test_share",
                        new: 9999,
                        old: 9999
                    },
                    5: {
                        mask: "mask_test_shareLimit",
                        new: 1,
                        old: 1
                    }
                }
            },
            revive: {
                newSort: [ 3, 5, 2, 4 ],
                oldSort: [ 3, 5, 2, 4 ],
                auditSort: [ 3, 2 ],
                datas: {
                    1: {
                        mask: "mask_revive_free",
                        new: 9999,
                        old: 9999
                    },
                    2: {
                        mask: "mask_revive_pay",
                        new: 9999,
                        old: 9999,
                        cost: 10
                    },
                    3: {
                        mask: "mask_revive_video",
                        new: 9999,
                        old: 9999
                    },
                    4: {
                        mask: "mask_revive_share",
                        new: 9999,
                        old: 9999
                    },
                    5: {
                        mask: "mask_revive_shareLimit",
                        new: 1,
                        old: 1
                    }
                }
            },
            revive_2: {
                newSort: [ 2, 3, 4 ],
                oldSort: [ 2, 3, 4 ],
                auditSort: [ 3, 2 ],
                datas: {
                    1: {
                        mask: "mask_revive_free",
                        new: 9999,
                        old: 9999
                    },
                    2: {
                        mask: "mask_revive_pay",
                        new: 9999,
                        old: 9999,
                        cost: 10
                    },
                    3: {
                        mask: "mask_revive_video",
                        new: 9999,
                        old: 9999
                    },
                    4: {
                        mask: "mask_revive_share",
                        new: 9999,
                        old: 9999
                    },
                    5: {
                        mask: "mask_revive_shareLimit",
                        new: 1,
                        old: 1
                    }
                }
            },
            lottey: {
                newSort: [ 1, 3, 2 ],
                oldSort: [ 1, 3, 2 ],
                auditSort: [ 1, 3, 2 ],
                datas: {
                    1: {
                        mask: "mask_lottey_free",
                        new: 1,
                        old: 1
                    },
                    2: {
                        mask: "mask_lottey_pay",
                        new: 4,
                        old: 4,
                        cost: 10
                    },
                    3: {
                        mask: "mask_lottey_video",
                        new: 9999,
                        old: 9999
                    },
                    4: {
                        mask: "mask_lottey_share",
                        new: 9999,
                        old: 9999
                    }
                }
            },
            daily: {
                newSort: [ 3, 5 ],
                oldSort: [ 3, 5 ],
                auditSort: [ 3, 2 ],
                datas: {
                    1: {
                        mask: "mask_daily_free",
                        new: 1,
                        old: 1
                    },
                    2: {
                        mask: "mask_daily_pay",
                        new: 1,
                        old: 1,
                        cost: 10
                    },
                    3: {
                        mask: "mask_daily_video",
                        new: 1,
                        old: 1
                    },
                    4: {
                        mask: "mask_daily_share",
                        new: 9999,
                        old: 9999
                    },
                    5: {
                        mask: "mask_daily_shareLimit",
                        new: 1,
                        old: 1
                    }
                }
            },
            result: {
                newSort: [ 7, 3, 5 ],
                oldSort: [ 3, 5 ],
                auditSort: [ 3, 2 ],
                datas: {
                    1: {
                        mask: "mask_result_free",
                        new: 1,
                        old: 1
                    },
                    2: {
                        mask: "mask_result_pay",
                        new: 1,
                        old: 1,
                        cost: 10
                    },
                    3: {
                        mask: "mask_result_video",
                        new: 9999,
                        old: 9999
                    },
                    4: {
                        mask: "mask_result_share",
                        new: 9999,
                        old: 9999
                    },
                    5: {
                        mask: "mask_result_shareLimit",
                        new: 1,
                        old: 1
                    },
                    7: {
                        mask: "mask_result_shareLimitPre",
                        new: 1,
                        old: 1
                    }
                }
            },
            getAward: {
                newSort: [ 5, 3, 4 ],
                oldSort: [ 3, 4 ],
                auditSort: [ 3 ],
                datas: {
                    1: {
                        mask: "mask_getAward_free",
                        new: 9999,
                        old: 9999
                    },
                    3: {
                        mask: "mask_getAward_video",
                        new: 9999,
                        old: 9999
                    },
                    4: {
                        mask: "mask_getAward_share",
                        new: 9999,
                        old: 9999
                    },
                    5: {
                        mask: "mask_getAward_shareLimit",
                        new: 1,
                        old: 1
                    }
                }
            },
            strong: {
                newSort: [ 5, 3, 4 ],
                oldSort: [ 5, 3, 4 ],
                auditSort: [ 3 ],
                datas: {
                    1: {
                        mask: "mask_strong_free",
                        new: 9999,
                        old: 9999
                    },
                    3: {
                        mask: "mask_strong_video",
                        new: 9999,
                        old: 9999
                    },
                    4: {
                        mask: "mask_strong_share",
                        new: 9999,
                        old: 9999
                    },
                    5: {
                        mask: "mask_strong_shareLimit",
                        new: 1,
                        old: 1
                    }
                }
            }
        }, s.lottery = {
            max: 4,
            addSpeedTime: 1,
            runTime: 2,
            waitingTime: .5,
            pinList: [ {
                id: 1,
                itemId: 11006,
                min_rotaion: 0,
                max_rotaion: 59
            }, {
                id: 2,
                itemId: 11002,
                min_rotaion: 60,
                max_rotaion: 119
            }, {
                id: 3,
                itemId: 11004,
                min_rotaion: 120,
                max_rotaion: 179
            }, {
                id: 4,
                itemId: 11003,
                min_rotaion: 180,
                max_rotaion: 239
            }, {
                id: 5,
                itemId: 11005,
                min_rotaion: 240,
                max_rotaion: 299
            }, {
                id: 6,
                itemId: 11001,
                min_rotaion: 300,
                max_rotaion: 359
            } ],
            itemList: [ {
                id: 0,
                name: "",
                value: 0,
                per: 1e4,
                icon: ""
            }, {
                id: 1,
                name: "海量钻石",
                value: 1,
                per: 100,
                icon: ""
            }, {
                id: 2,
                name: "大量金币",
                value: 2,
                per: 2600,
                icon: ""
            }, {
                id: 3,
                name: "少量钻石",
                value: 3,
                per: 4600,
                icon: ""
            }, {
                id: 4,
                name: "海量金币",
                value: 4,
                per: 4900,
                icon: ""
            }, {
                id: 5,
                name: "大量钻石",
                value: 5,
                per: 5400,
                icon: ""
            }, {
                id: 6,
                name: "少量金币",
                value: 6,
                per: 1e4,
                icon: ""
            } ]
        }, s.invite = {
            max: 50,
            coin: 500
        }, s.bubble = {
            coin: 500,
            diamond: 50
        }, s.openForever = {
            num: 5,
            kill: 25
        }, s.dan = {
            star: [ 0, 2, 4, 8 ],
            list: [ {
                id: 0,
                name: "倔强青铜Ⅲ",
                icon: 0,
                score: 30
            }, {
                id: 1,
                name: "倔强青铜Ⅱ",
                icon: 0,
                score: 60
            }, {
                id: 2,
                name: "倔强青铜Ⅰ",
                icon: 0,
                score: 90
            }, {
                id: 3,
                name: "秩序白银Ⅲ",
                icon: 1,
                score: 130
            }, {
                id: 4,
                name: "秩序白银Ⅱ",
                icon: 1,
                score: 170
            }, {
                id: 5,
                name: "秩序白银Ⅰ",
                icon: 1,
                score: 210
            }, {
                id: 6,
                name: "荣耀黄金Ⅳ",
                icon: 2,
                score: 260
            }, {
                id: 7,
                name: "荣耀黄金Ⅲ",
                icon: 2,
                score: 310
            }, {
                id: 8,
                name: "荣耀黄金Ⅱ",
                icon: 2,
                score: 360
            }, {
                id: 9,
                name: "荣耀黄金Ⅰ",
                icon: 2,
                score: 410
            }, {
                id: 10,
                name: "尊贵铂金Ⅳ",
                icon: 3,
                score: 470
            }, {
                id: 11,
                name: "尊贵铂金Ⅲ",
                icon: 3,
                score: 530
            }, {
                id: 12,
                name: "尊贵铂金Ⅱ",
                icon: 3,
                score: 590
            }, {
                id: 13,
                name: "尊贵铂金Ⅰ",
                icon: 3,
                score: 650
            }, {
                id: 14,
                name: "永恒钻石Ⅴ",
                icon: 4,
                score: 710
            }, {
                id: 15,
                name: "永恒钻石Ⅳ",
                icon: 4,
                score: 770
            }, {
                id: 16,
                name: "永恒钻石Ⅲ",
                icon: 4,
                score: 830
            }, {
                id: 17,
                name: "永恒钻石Ⅱ",
                icon: 4,
                score: 890
            }, {
                id: 18,
                name: "永恒钻石Ⅰ",
                icon: 4,
                score: 950
            }, {
                id: 19,
                name: "至尊星耀Ⅴ",
                icon: 5,
                score: 1030
            }, {
                id: 20,
                name: "至尊星耀Ⅳ",
                icon: 5,
                score: 1100
            }, {
                id: 21,
                name: "至尊星耀Ⅲ",
                icon: 5,
                score: 1180
            }, {
                id: 22,
                name: "至尊星耀Ⅱ",
                icon: 5,
                score: 1260
            }, {
                id: 23,
                name: "至尊星耀Ⅰ",
                icon: 5,
                score: 1340
            }, {
                id: 24,
                name: "最强王者Ⅴ",
                icon: 6,
                score: 1460
            }, {
                id: 25,
                name: "最强王者Ⅳ",
                icon: 6,
                score: 1580
            }, {
                id: 26,
                name: "最强王者Ⅲ",
                icon: 6,
                score: 1700
            }, {
                id: 27,
                name: "最强王者Ⅱ",
                icon: 6,
                score: 1820
            }, {
                id: 28,
                name: "最强王者Ⅰ",
                icon: 6,
                score: 1940
            } ]
        }, s.insterstital = {
            open: 1,
            frist: 2,
            gap: 3
        }, s.smart = {
            0: {
                bodyLength: 24,
                viewLength: 100,
                growR: 6,
                freedom: {
                    frist: 0,
                    cd: 0,
                    cdRandom: 0,
                    addSpeed: 0,
                    again: 0
                },
                track: {
                    frist: 0,
                    cd: 0,
                    cdRandom: 0,
                    addSpeed: 0,
                    again: 0
                },
                escape: {
                    frist: 0,
                    cd: 0,
                    cdRandom: 0,
                    addSpeed: 0,
                    again: 0
                },
                border: {
                    frist: 0,
                    cd: 0,
                    cdRandom: 0,
                    addSpeed: 0,
                    again: 0
                },
                swerve: {
                    frist: 0,
                    cd: 0,
                    cdRandom: 0,
                    addSpeed: 0,
                    again: 0
                }
            },
            1001: {
                bodyLength: 24,
                viewLength: 100,
                growR: 6,
                freedom: {
                    frist: 1,
                    cd: 2500,
                    cdRandom: 0,
                    addSpeed: .01,
                    again: .05
                },
                track: {
                    frist: .1,
                    cd: 2e3,
                    cdRandom: 0,
                    addSpeed: .1,
                    again: .4
                },
                escape: {
                    frist: .1,
                    cd: 2e3,
                    cdRandom: 0,
                    addSpeed: .1,
                    again: .4
                },
                border: {
                    frist: .96,
                    cd: 200,
                    cdRandom: 0,
                    addSpeed: 0,
                    again: .8
                },
                swerve: {
                    frist: 1,
                    cd: 350,
                    cdRandom: 500,
                    addSpeed: 0,
                    again: .1
                }
            },
            1002: {
                bodyLength: 24,
                viewLength: 130,
                growR: 5,
                freedom: {
                    frist: 1,
                    cd: 2500,
                    cdRandom: 0,
                    addSpeed: .02,
                    again: .05
                },
                track: {
                    frist: .2,
                    cd: 1600,
                    cdRandom: 0,
                    addSpeed: .2,
                    again: .5
                },
                escape: {
                    frist: .2,
                    cd: 1600,
                    cdRandom: 0,
                    addSpeed: .2,
                    again: .5
                },
                border: {
                    frist: .96,
                    cd: 200,
                    cdRandom: 0,
                    addSpeed: 0,
                    again: .85
                },
                swerve: {
                    frist: 1,
                    cd: 350,
                    cdRandom: 500,
                    addSpeed: 0,
                    again: .1
                }
            },
            1003: {
                bodyLength: 24,
                viewLength: 160,
                growR: 4,
                freedom: {
                    frist: 1,
                    cd: 2500,
                    cdRandom: 0,
                    addSpeed: .2,
                    again: .05
                },
                track: {
                    frist: .3,
                    cd: 1200,
                    cdRandom: 0,
                    addSpeed: .3,
                    again: .6
                },
                escape: {
                    frist: .3,
                    cd: 1200,
                    cdRandom: 0,
                    addSpeed: .3,
                    again: .6
                },
                border: {
                    frist: .96,
                    cd: 200,
                    cdRandom: 0,
                    addSpeed: 0,
                    again: .9
                },
                swerve: {
                    frist: 1,
                    cd: 350,
                    cdRandom: 500,
                    addSpeed: 0,
                    again: .1
                }
            },
            1004: {
                bodyLength: 32,
                viewLength: 190,
                growR: 3,
                freedom: {
                    frist: 1,
                    cd: 2500,
                    cdRandom: 0,
                    addSpeed: .05,
                    again: .05
                },
                track: {
                    frist: .4,
                    cd: 800,
                    cdRandom: 0,
                    addSpeed: .4,
                    again: .7
                },
                escape: {
                    frist: .4,
                    cd: 800,
                    cdRandom: 0,
                    addSpeed: .4,
                    again: .7
                },
                border: {
                    frist: .96,
                    cd: 200,
                    cdRandom: 0,
                    addSpeed: 0,
                    again: .95
                },
                swerve: {
                    frist: 1,
                    cd: 350,
                    cdRandom: 500,
                    addSpeed: 0,
                    again: .1
                }
            },
            2001: {
                bodyLength: 32,
                viewLength: 200,
                freedom: {
                    frist: 1,
                    cd: 6e3,
                    addSpeed: .01,
                    again: .01
                },
                track: {
                    frist: .01,
                    cd: 6e3,
                    addSpeed: .01,
                    again: .01
                },
                escape: {
                    frist: 0,
                    cd: 0,
                    addSpeed: 0,
                    again: 0
                },
                border: {
                    frist: 1,
                    cd: 1e3,
                    addSpeed: 0,
                    again: 0
                }
            },
            2002: {
                bodyLength: 32,
                viewLength: 200,
                freedom: {
                    frist: 1,
                    cd: 5500,
                    addSpeed: .02,
                    again: .02
                },
                track: {
                    frist: .02,
                    cd: 5500,
                    addSpeed: .02,
                    again: .02
                },
                escape: {
                    frist: 0,
                    cd: 0,
                    addSpeed: 0,
                    again: 0
                },
                border: {
                    frist: 1,
                    cd: 1e3,
                    addSpeed: 0,
                    again: 0
                }
            },
            2003: {
                bodyLength: 32,
                viewLength: 200,
                freedom: {
                    frist: 1,
                    cd: 5e3,
                    addSpeed: .03,
                    again: .03
                },
                track: {
                    frist: .03,
                    cd: 5e3,
                    addSpeed: .03,
                    again: .03
                },
                escape: {
                    frist: 0,
                    cd: 0,
                    addSpeed: 0,
                    again: 0
                },
                border: {
                    frist: 1,
                    cd: 1e3,
                    addSpeed: 0,
                    again: 0
                }
            },
            2004: {
                bodyLength: 32,
                viewLength: 200,
                freedom: {
                    frist: 1,
                    cd: 4500,
                    addSpeed: .05,
                    again: .05
                },
                track: {
                    frist: .05,
                    cd: 4500,
                    addSpeed: .05,
                    again: .05
                },
                escape: {
                    frist: 0,
                    cd: 0,
                    addSpeed: 0,
                    again: 0
                },
                border: {
                    frist: 1,
                    cd: 1e3,
                    addSpeed: 0,
                    again: 0
                }
            }
        }, s.nikeNames = [ "快乐因你为本", "阿花花", "甜甜圈", "云端远盼", "张博茨", "好人一生平安", "花仙子", "宝藏女孩.ঞ", "茉莉花香", "高山清泉", "漫尢莉莉丝.", "凡守春", "請喊我月姬.", "合家幸福", "小骨头", "刘冬年", "王凤芹", "以气质出名", "捞月亮的人", "啊伊舍", "洒脱先生", "杨文志", "落入尘埃", "城南花已开", "选我超甜的", "鱼水情深", "关于风起时", "小静静", "江上月卿", "凌玲润湘", "可爱的我", "笨笨的", "崔梦新", "春悄夜迢迢", "王稳然", "能伴我多久!", "追风超人", "在线打call", "日久见人心", "静桂之园", "水果篮子", "李瑞武", "lily", "萌秋秋", "炸了哥哥的鱼塘", "雨是云的泪", "因为有你们", "美丽青青", "勿忘初衷", "凉拌黄瓜丝儿", "明天更美好", "遠近都迷人.", "可以泡你么", "喜欢你萌喜欢", "稚遇°", "Cold 。", "温柔…等待", "明天更美好", "承诺比白纸还薄", "俞旭芒", "似星河入梦", "我这该死的仙女", "梧桐雨", "废墟中的仰望", "相亲相爱", "星河不可及", "胖虎没我胖", "心事长风寄", "宋雪峰", "芳芳衣坊", "张胜霞", "超级豆豆", "Slender Man", "徐永胜", "随缘进心", "玫瑰花", "希望在明天", "萍水相逢", "金不换", "小猫咪", "陈梓帆", "美丽海星", "快乐的人", "甜心猫宠女", "爱你不悔", "快乐每一天", "白开水", "骑猪娶媳妇", "开心就好", "没有期待.", "国民女汉纸", "上天入地小仙女", "阳光总在风雨", "温情百合", "海洋的颜色", "勇者无敌", "∞ 素颜妆", "- CoCo 小姐", "留不住的时光", "女神灬经丶", "柠檬不萌", "牟海静和牟海", "自由飞翔", "旧城已无他", "残暴的安妮", "ζ微雨ゼ清凉", "Live for you", "始于脸红", "胡静如", "焦糖豆沙", "刘阳阳", "格守成信", "四号花店", "我本无心何来", "。雾里看花", "体温与鹿", "姜万程", "唐大姐", "稍尽春风", "【幕 幕】", "海棠才谢", "心随梦飞扬", "冬天的太阳", "站在冰箱上的小仙女O", "无价之宝", "小甜心", "贾小倩", "依旧那么甜(>w<)", "快乐一家人", "半颗心的人", "家有幸福", "家有千金", "小西瓜", "喝下第九杯月亮", "真诚永远", "俊豪雪洁", "幸福常相伴", "酒酿樱桃子υ", "再无伤心", "知足常乐", "眉眼藏欢~", "捕星光", "平淡幸福", "三生路", "0下柒℃-D泪", "知音有几", "夢想黒洞.", "果酱味奶糖３", "开心每一天", "一缕清风", "温斯芳", "猪精女孩", "谭扬和", "闫文莉", "李小燕", "眉间黛色", "你是我的臆想", "邀我花前醉", "何须浅碧深红", "方寸月光", "坚强往前走", "懵懂少年", "钟尹爸爸", "抱只软猫咪", "独霸一方", "简简单单", "满级马尾x", "满分喜欢.", "冷沁韩", "Mr枫", "左左豆", "川南由北", "可心天然", "稳稳的幸福", "王小晶", "喵脸君≧v≦", "摇铃唤白鹿", "-   余生，", "绿茵艺术", "甜中书", "芒果味病患□", "远赴相思", "BUYILUOSIAIL", "一直向前从不", "你与我不止过往", "我要快乐", "鬼马娇萝", "李章英", "泪@染倾@城", "道北旅馆", "我在魔仙堡玩泥巴", "旧梦如烟", "烟花易冷", "兔眼睛弯弯", "小星星", "孟香妈妈", "^簡單^", "淡云清风", "漫步人生路", "祥云瑞气  ", "知足常乐", "甜味少女馆", "可念不可说", "百郦花草", "娜姐姐", "撒娇小小怪~", "鸟语花香", "八方来财", "一片叶", "锦绣城", "快乐桃子君", "与世无争", "皓月千里", "心想&事成", "贾玉梅", "偏爱你侧脸", "逃课小姐姐", "心懒意怯", "悲伤染指了流", "简简单单的度", "鱼和熊掌也能", "天蓝蓝水绿绿", "我心依旧", "柯一梦", "敬你春风野马", "南猫北巷", "白云飘飘", "开心就好", "爱拼才会赢", "幸福十分", "笨笨傻丫头", "止步于喜欢", "谷猫落山", "来一碗小仙女", "Expect", "风铃鹿", "Ｅmpress", "李子熟了", "落大雨", "是个狼人", "执念成殇", "Luck", "花样年华", "zhaobingxi", "苛笹玳м", "么么哒(^з^)", "风月斟酒", "温柔眼眉", "笨小孩", "彪叔叔", "吃不饱的大可爱~", "沈李强", "泠泠七弦上", "唯一的爱", "咖啡物语の", "古丽尼沙", "人心抵不过时", "生命斓图", "顺其自然", "Hello！何先森", "张宏珍", "完美邂逅", "清風与我", "温致如猫", "杯酒挽歌和", "妍在晨曦", "且贪欢笑", "青葱记忆染指", "江南的故事酒馆", "做个梦给你", "众里寻Ta", "偷捧时间煮酒喝", "世末歌者", "本是荒野客", "徐其云", "美人笑眼媚入骨", "幸福时", "幸福快乐", "山野伴雾灯", "君好求", "李白仙", "随遇而安", "双生灵", "猫耳酱", "橘淮北", "一生一世", "y拿葱的那个少女", "李鹏涛", "o亲藽宀貝o", "陈丽婵", "想你是蠢", "进口可爱", "夏夜听雨", "情長也是安息", "旧梦如烟", "天女のキス", "顺其自然", "機車▼女", "无所谓了??", "朽木长了草", "凉薄小姐", "甜甜的梦都给你", "猫扑风铃", "铭雅ko", "借我一生", "草莓ぇ宝", "怪力少女抗大炮i", "平凡之露、", "一诺:旭", "季夏第四月", "回忆过去的流", "心若止水", "勿忘我", "随雪飘扬", "贾雪弘", "笑忘身是客", "苦命人，追", "始终如一", "朱由芳", "不忍思量", "`梨涡酒", "yanghuag1817", "壮壮王国", "最熟悉又陌生", "笑颜齐心", "小雪花", "拿可爱换你", "长裙小矮子", "学而不厌", "natural", "静默淡然", "金银鑫", "张晨俊", "坦诚相待", "樱桃白兰地", "酷酷的仙女", "周中华", "勇闯天涯", "欲言竟无词", "可爱宝贝", "寇铁英", "萝莉捕猎人", "相思无人探", "桃花纷落", "四月是谎言", "蒋宇辉", "舞动人生", "平平淡淡", "香水百合", "默守你", "钰【妩】鈊", "心想爱琳琳", "浮生错", "柠檬味拥抱", "美好人生", "红色康乃馨", "陪我去流浪", "中意难求", "相逢与你有缘", "水清天蓝", "奋进*^o^", "运来一生平安", "我有故事没有酒", "我的小鹿撞死了", "被窝探险家", "杨嘉宝", "鹿滢xll", "攒一口袋星星", "勇往直前", "五十二赫兹", "想念雪人", "邹佛宝", "小胖也可爱", "诚实守信", "我是佳祺", "柒月无风", "谜一样的女人", "躺在你的梨涡里", "张荣妈妈", "南风向北", "旦增斯卓", "盖世英雄少女心", "鱼巷猫归", "葛有娣", "图图爷爷", "四叶草", "甜味拾荒者", "嘴角的樱桃汁*", "東京は美少女", "种花の小仙女", "财源滚滚", "智商都来卖萌了", "fennylee", "请叫我miss c", "小雪雅", "开心的过好每", "会飞的鱼", "甜ぃぅおかく", "入戏到哽咽词穷", "快快乐乐", "一生有你", "一望几重烟水", "我来自熊猫星", "天空之城", "萤火眠眠", "不骄傲", "^_^相系~相依", "不忘初心", "沙吉娜", "清衣渡", "浩然宝贝", "mutttlove", "Hidden", "三头六臂", "冬去春来", "Surplus", "蓝婴浅蝶", "太阳花", "小燕子", "不忘初心", "曹元云", "董事长", "相得益彰", "老坟无土", "南乔枝", "茕茕之鹿", "微凉@", "清酒桃花", "oh~", "以前的我", "晚风撩人", "十秒萌定你", "换个心情", "朱芷慧", "诗人的野猫", "甜过不二家", "一切随缘", "幸福一生", "爱的一生", "房东的猫语", "兰之美", "郭廷兰", "巧克力", "幸褔家园", "守望麦田", "低血压的长颈鹿●rz", "萍萍 Car", "柠檬味的大海", "雾尽眉目清", "错过的情人", "王者风范", "手不毒人", "欣慰宝宝", "落雪起风", "我非柠檬为何", "。无业游民", "海棠零", "Linda", "你是谁的谁", "梅花落满南山", "天天开心", "江畔南风起", "陈小琴", "燕唯橼-Yxy", "花が咲く", "知了与冬", "青松永存", "风月缱绻", "诚信是金", "生来就可爱ヽ(ⅴ＜●)", "凌受兵", "给你一囗甜甜゛", "涵@雪", "一壶酒化流年", "送分小仙女□", "爱喝香槟的花猫", "执笔经年", "辜建娥", "未完待续", "一壶漂泊", "王丽萌", "破茧成蝶", "美丽的春天", "南国的夜", "七彩虹baby", "〖星夜琉璃］", "烟雾弥漫", "巴山夜雨", "明天会更好", "王光霞", "一生有你", "。_饼干妹妹", "月下无痕", "玫瑰情缘", "俗世里睡一觉", "宠儿coco", "刀尖萝莉!", "开心就好", "慕童语。", "雾锁深情目", "自闭症网瘾萝莉.ら", "用心的爱", "风居住的街道", "轻枕海棠", "陈秀叶", "美味奇缘", "〆雨落倾城夏", "为了家庭奋斗", "平安是福", "遥寄三山", "柔らかい妹", "Angel、烟尘", "两盒软妹~`", "惠HUI", "恬淡春风", "睡于麋鹿林", "王玉英", "黑胡同里の猫", "浅夏安然", "芳梦一生", "我要、发光~", "琼楼玉宇", "happy", "小青鲤", "Dylan", "周俊军", "想你却忘了自", "金水桥", "海阔天空", "彩虹妹妹", "宏小伟", "扶尾猫", "家有二哈", "媚态萌生ら", "阳光每一天", "是非英雄梦メ", "种花兔", "释放心情", "じ爱喝咖啡的喵", "陌上花开只为", "喜气洋洋", "无梦相赠", "山楂味的诗", "猪猪女孩", "与之野浪", "饮马桃花时", "陈晓芳", "犬马不复来", "唯恐是梦", "☆*小可爱的女巫帽ぅ", "@猫腻", "づ泥萌怪物", "薯条妹妹", "一片微笑海ぐ", "上不了岸的猫", "恒妍鑫", "思故乡", "☆姐☆→女_汉", "谷貓落山", "夏水日潺湲", "爱的诺言", "叹沉浮", "JUST.suk", "混吃等死小姐", "@男子汉", "萌萌的小确幸", "夏树繁花", "放飞梦想", "王座上的猫斯拉", "漫思茶", "﹎每天都超可爱の", "萌面大瞎", "Adam&仙女", "张贵豪", "桃腮带笑", "赵昌勤", "巫女殿下", "初相识，", "焦新堯", "ST-s555", "哈哈星人", "南楼月下", "香水百合", "忘优草", "两个小傻瓜", "(_贩卖可爱", "折青杏", "桃花散漫", "特立独行的兔子", "低調的人生′", "冻梨小姐", "有志者事竟成", "肩上风尘", "ζ-橘子郡主。", "江南未寒", "今生，你是我", "心静如水", "全网最萌打怪小能手", "手捧软喵メ", "杜鹃花三雄极", "罐头告诉猫", "依锦还乡", "美好一生", "胡思仪", "淡漠的忧伤", "姐、为自己", "张圣楠", "一路向前!", "花开富贵", "bobo头少女", "樟木三里巷", "回忆里的那个", "冰雪寒梅", "吕诗蕾", "刘星妍", "实现梦想", "酒心穤洣團", "温酒少女", "陈新夏", "孙若雨", "北风几经秋", "吴永芳", "爱打盹的猫", "七禾页", "平安一生", "前世 今生", "爷，独霸天下", "饱汉子不知", "下一站的路该", "纪念一切 珍", "四分萌气^*", "周石山", "婷阿妹吖", "蝶之舞", "卓尔不群", "清露踏涟漪", "与风相拥", "一片天", "六句迷人诗", "秋天的落叶", "过往云烟", "风平浪静", "沈道秀", "深巷钟意猫", "A.Miss", "∩∞仙人掌小姐", "有你们真好", "天花板上的猫", "姜志玲", "每天都", "逝去的青春", "喵吉欧尼酱", "美好鍀回", "菇凉硪芯", "ぐθ常悠哉大王", "开心每一天", "秋风凉", "[笑梨涡]", "梦想成真", "陈玉碧", "皮卡丘", "可可小爱", "我就是我", "执笔画素颜", "与你撒欢づ", "黄以刚", "龙游木木", "南斋时", "幸福一家人", "带刺的玫瑰", "甜甜钻", "一挽清愁", "旧事情书", "慕雨遙长", "鱼窥荷", "鹿与說書亽", "v是就第一天", "家和万事兴", "淡淡的幸福", "越来越好", "λ.皮卡丘不会跳舞", "walphhz张巨元", "刘志谷", "道不同不相为", "桃枝兔子", "王淑霞", "山木鬼客", "﹏追尾巴的猫", "许你一世不变", "橘温茶暖", "乀树下小狐", "李炎煕", "Οo開蘂赽泺о", "桜花祭", "枫叶情", "う甜味趣事", "平安幸福", "美丽家园", "多久的未来", "飘飞的落叶", "韩英龙", "咪咕猫", "Queen杨莉莉", "幸福一辈子", "Focus", "廖锡军", "超级英雄", "花落倾城季微", "醉眼望云烟", "一个人的湛蓝", "心软是病@", "南七夏", "【爱】你@ 宝", "司绍元", "茶花信笺ご", "巫秀奎", "森屿麋鹿", "吴初荣", "文春梅", "木易姐姐", "共创未来", "王芷萱", "今非昔比", "提灯晚风", "完美人生", "家有双宝欢乐", "一生随缘", "我の一辈子", "☆*:.月光粥", "`章鱼ぷгομ丸灬", "糖宝婆婆", "春暧花开", "爱的代价", "幸福满满", "熏衣草", "一夜奈良山", "星语心愿", "全能仙女稳战场", "七月逆流", "有缘袁小菊", "幸福you", "ㄐ号线美少女", "南池姑娘", "懂你的人", "唯美幸福", "闪亮明天", "浪味儿ξ喵", "久伴随心", "心若情初", "王欣彤", "花重月数", "~心疲倦。", "刘小立", "李振宇", "程小平", "万年如旧", "张智宸", "慕斯派少女", "薄荷港", "饭团萌霸爻", "美好明天", "雨落~雨兮", "烟云似雪", "想当龙的猫”＞ω＜", "初夏七鹿", "パ十岁少女", "小小崔", "宇智波左助", "萌糯糯ing", "一笑很美", "快乐就好", "回忆渲染悲伤", "じ蝸牛姑娘", "長髮飄飄", "心心相印", "彩云之南", "初心未许", "喥ㄖ洳姩", "梦境贩卖馆", "流星雨", "快乐每一天", "懒癌弃疗", "雨燕飞", "李艳萍", "青青子衿", "白鲸街", "快乐每一天", "孙家友", "你开心我快乐", "森鹿姑娘", "呆梨小仙女ゾ", "灬丨流年丨灬", "南国遐思λ`", "月影依风", "爱吃甜筒的猫ぅ", "思美人", "李国根", "岛忘了回忆", "苝海莈冇猫", "爱拼才会赢", "时当月色", "鎕果分享社", "南冥有猫", "饮风而醉", "春风不识路", "大碴子姑娘", "桃花扇r", "　叶落￡似流", "初始模样", "南巷旅人", "老大姐", "┊七猫ぐ酒馆┋", "开心果", "笑靥荼靡", "秋风行", "天天快乐", "带刺的玫瑰", "常馨月", "秋蝉儿", "恋物少女", "心软且酷", "匿久友人", "芝士就是力量ら", "陈丹如", "李海明", "茕茕白兔", "坚强的女人18", "Springつ初心", "侧耳倾听", "总萌大人~Q~", "梦里山河", "周峰辉", "人生如梦", "小小杜鹃花", "不喜烟愁", "北方姑娘", "生来不讨喜", "喝酒的火焰山", "勇往直前", "余菊花", "三寸阳光独搏你笑", "村乙尐女", "汪洋洪杰", "永远幸福", "美好时光", "回风舞雪", "千里落花风", "挽清梦" ], 
        cc._RF.pop();
    }, {} ],
    CustomManager: [ function(t, e, i) {
        cc._RF.push(e, "f7c982cVYpJlIrnSlodDjFm", "CustomManager");
        var s = t("./service/DataService"), o = t("./service/ShareService"), n = t("./service/StorageService"), a = t("./service/SdkService"), r = t("./service/const/HttpConst"), c = function() {
            this.data = null, this.share = null, this.storage = null;
        };
        c.prototype.initialize = function() {
            this.sdk = a.SdkService.getInstance(), this.data = s.DataService.getInstance(), 
            this.share = o.ShareService.getInstance(), this.storage = n.StorageService.getInstance();
        }, c.prototype.loadConfig = function(t, e) {
            this.data.load(t, e);
        }, c.prototype.getSheet = function(t, e) {
            var i = this.data.getSheet(t, e);
            return i ? i.data : null;
        }, c.prototype.getSheetData = function(t, e, i) {
            return this.data.getData(t, e, i);
        }, c.prototype.getSheetFristId = function(t, e) {
            return this.data.getFristId(t, e);
        }, c.prototype.getSheetLastId = function(t, e) {
            return this.data.getLastId(t, e);
        }, c.prototype.initStorage = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e4, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            this.storage.init(t, e, i, s);
        }, c.prototype.setStorage = function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            this.storage.setData(t, e, i, s);
        }, c.prototype.getStorage = function(t) {
            return this.storage.getData(t);
        }, c.prototype.initShare = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            console.log("initShare:", t, e), this.share.init(t, e);
        }, c.prototype.setShareConf = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            this.share.setShareConf(t);
        }, c.prototype.getShareConfData = function(t) {
            return this.share.getShareConfData(t);
        }, c.prototype.setAppShare = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            this.share.setAppShare(t, e, i, s);
        }, c.prototype.shareGroup = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            this.share.shareGroup(t, e, i, s);
        }, c.prototype.shareNormal = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            this.share.shareNormal(t, e, i, s);
        }, c.prototype.httpGet = function(t, e, i) {
            var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            this.sdk.httpGet(t, e, function(t, e) {
                e == r.HttpConst.HTTP_CODE.OK ? i(t) : s && s();
            });
        }, c.prototype.httpPost = function(t, e, i) {
            var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            this.sdk.httpPost(t, e, function(t, e) {
                e == r.HttpConst.HTTP_CODE.OK ? i(t) : s && s();
            });
        }, e.exports = {
            CustomManager: c
        }, cc._RF.pop();
    }, {
        "./service/DataService": "DataService",
        "./service/SdkService": "SdkService",
        "./service/ShareService": "ShareService",
        "./service/StorageService": "StorageService",
        "./service/const/HttpConst": "HttpConst"
    } ],
    CustomMaterial: [ function(t, e, i) {
        cc._RF.push(e, "4f1b7y8x/lApJARxNhezVsT", "CustomMaterial");
        var s = cc.renderer.renderEngine, o = s.renderer, n = s.gfx, a = function(t) {
            function e(e, i, s) {
                t.call(this, !1);
                var a = new o.Pass(e);
                a.setDepth(!1, !1), a.setCullMode(n.CULL_NONE), a.setBlend(n.BLEND_FUNC_ADD, n.BLEND_SRC_ALPHA, n.BLEND_ONE_MINUS_SRC_ALPHA, n.BLEND_FUNC_ADD, n.BLEND_SRC_ALPHA, n.BLEND_ONE_MINUS_SRC_ALPHA);
                var r = [ {
                    name: "texture",
                    type: o.PARAM_TEXTURE_2D
                }, {
                    name: "color",
                    type: o.PARAM_COLOR4
                } ];
                i && (r = r.concat(i));
                var c = new o.Technique([ "transparent" ], r, [ a ]);
                this.name = e, this._effect = new o.Effect([ c ], {}, s), this._texture = null, 
                this._color = {
                    r: 1,
                    g: 1,
                    b: 1,
                    a: 1
                }, this._mainTech = c;
            }
            cc.js.extend(e, t);
            var i = {
                effect: {
                    configurable: !0
                },
                texture: {
                    configurable: !0
                },
                color: {
                    configurable: !0
                }
            };
            return i.effect.get = function() {
                return this._effect;
            }, i.texture.get = function() {
                return this._texture;
            }, i.texture.set = function(t) {
                this._texture !== t && (this._texture = t, this._effect.setProperty("texture", t.getImpl()), 
                this._texIds.texture = t.getId());
            }, i.color.get = function() {
                return this._color;
            }, i.color.set = function(t) {
                var e = this._color;
                e.r = t.r / 255, e.g = t.g / 255, e.b = t.b / 255, e.a = t.a / 255, this._effect.setProperty("color", e);
            }, e.prototype.clone = function() {
                var t = new e();
                return t.texture = this.texture, t.color = this.color, t.updateHash(), t;
            }, e.prototype.setParamValue = function(t, e) {
                this._effect.setProperty(t, e);
            }, e.prototype.getParamValue = function(t) {
                return this._effect.getProperty(t);
            }, e.prototype.setDefine = function(t, e) {
                this._effect.define(t, e);
            }, Object.defineProperties(e.prototype, i), e;
        }(s.Material), r = {};
        a.addShader = function(t) {
            r[t.name] ? console.log("addShader - shader already exist: ", t.name) : cc.renderer._forward ? (cc.renderer._forward._programLib.define(t.name, t.vert, t.frag, t.defines || []), 
            r[t.name] = t) : cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
                cc.renderer._forward._programLib.define(t.name, t.vert, t.frag, t.defines || []), 
                r[t.name] = t;
            });
        }, a.getShader = function(t) {
            return r[t];
        }, a.getShaderByIndex = function(t) {
            return Object.values || (Object.values = function(t) {
                if (t !== Object(t)) throw new TypeError("Object.values called on a non-object");
                var e, i = [];
                for (e in t) Object.prototype.hasOwnProperty.call(t, e) && i.push(t[e]);
                return i;
            }), Object.values(r)[t];
        }, a.getAllName = function() {
            return Object.keys(r).map(function(t, e) {
                return {
                    name: t,
                    value: e
                };
            });
        };
        var c = null;
        a.getShaderEnum = function() {
            if (c) return c;
            var t = {};
            return Object.keys(r).forEach(function(e, i) {
                return t[e] = i;
            }), c = cc.Enum(t);
        }, e.exports = a, cc._RF.pop();
    }, {} ],
    DailyView: [ function(t, e, i) {
        cc._RF.push(e, "8d094wGYcdDXYGem4qJYLFh", "DailyView"), cc.Class({
            extends: cc.Component,
            properties: {
                menuNode: cc.Node,
                icon: cc.Sprite,
                itemLab: cc.Label,
                coinLab: cc.Label,
                diamondLab: cc.Label,
                defaultIcon: cc.SpriteFrame,
                getNode: cc.Node,
                usedNode: cc.Node,
                desLab: cc.Label,
                doubleNode: cc.Node
            },
            onLoad: function() {
                this.menu = this.menuNode.getComponent("Menu"), this.popUp = this.node.getComponent("PopUp"), 
                this.superBtn = this.doubleNode.getComponent("SuperButton2"), this.data = null, 
                this.awards = [], this.playing = !1, this.timestamp = 0;
            },
            start: function() {
                this.node.active = !1, cc.systemEvent.on(ss.event.client.setRed, this.setRed, this);
            },
            update: function(t) {
                this.playing && (0 != this.awards.length ? (this.timestamp += t, this.timestamp >= .6 && (this.timestamp = 0, 
                this._intervalShowTip(this.awards.shift()))) : this.playing = !1);
            },
            show: function(t) {
                this.data = t, this.menu.show();
                var e = ss.commonUtils.clone(ss.config.popup);
                e.opacity = 255, this.popUp.show(e), this.superBtn.show({
                    rule: ss.config.rule.daily,
                    shareId: ss.config.shareIds.daily,
                    onCanHandler: null,
                    onClickHandler: this.doubleGetAward.bind(this)
                }), this.playing = !1, this.awards.length = 0, this._judgeShow(), ss.logic.info.isCanSign() && (this.getNode.active = !1, 
                this.scheduleOnce(this._delayShowGet.bind(this), 1.5));
            },
            back: function() {
                this.data && this.data.from && cc.systemEvent.emit(ss.event.client.openView, {
                    type: this.data.from
                }), this.close();
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.popUp.close(), 
                this.unscheduleAllCallbacks();
            },
            setRed: function(t) {
                t.type == ss.enum.redType.daily && this._judgeShow();
            },
            getAward: function() {
                var t = this;
                ss.logic.open.isAdChecked() ? ss.logic.open.shareGroup(ss.config.shareIds.home, function() {
                    t._getDaily(1);
                }) : this._getDaily(1);
            },
            usedAward: function() {
                ss.logic.tips.hint("奖励已领取！");
            },
            doubleGetAward: function() {
                this._getDaily(2);
            },
            _getDaily: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                if (ss.logic.info.isCanSign()) {
                    var e, i, s = ss.logic.info.getAwardData();
                    this.playing = !1, this.awards.length = 0, i = (e = s[0]).num * t, ss.logic.money.simpleAdd(ss.enum.money.coin, i), 
                    this.awards.push("金币 +" + i), i = (e = s[1]).num * t, ss.logic.money.simpleAdd(ss.enum.money.diamond, i), 
                    this.awards.push("钻石 +" + i), e = s[2];
                    var o = ss.logic.config.getSheetData(ss.enum.sheet.item, e.id);
                    e.second && (this.awards.push("获得【<color=#FFA500>" + o.name + "</color>】"), ss.logic.goods.addSecond()), 
                    this._intervalShowTip(this.awards.shift()), this.playing = !0, ss.logic.info.signDaily();
                }
            },
            _judgeShow: function() {
                if (this.node.active) {
                    var t, e = ss.logic.info.getAwardData();
                    t = e[0], this.coinLab.string = "+" + t.num, t = e[1], this.diamondLab.string = "+" + t.num, 
                    t = e[2];
                    var i = ss.logic.config.getSheetData(ss.enum.sheet.item, t.id);
                    t.second ? (this.itemLab.string = i.name, this.icon.spriteFrame = ss.logic.asset.getPacmanIcon(i.icon)) : (this.itemLab.string = "", 
                    this.icon.spriteFrame = this.defaultIcon), ss.logic.info.isCanSign() ? (this.doubleNode.active = !0, 
                    this.usedNode.active = !1, this.desLab.string = "当前可领取的奖励！") : (this.getNode.active = !1, 
                    this.doubleNode.active = !1, this.usedNode.active = !0, this.desLab.string = "明天登录可领取的奖励！");
                }
            },
            _intervalShowTip: function(t) {
                ss.logic.tips.hint(t);
            },
            _delayShowGet: function() {
                ss.logic.info.isCanSign() && (this.getNode.active = !0);
            }
        }), cc._RF.pop();
    }, {} ],
    DanStar: [ function(t, e, i) {
        cc._RF.push(e, "d7ef2hPNgxB6qTrOxzOSk8U", "DanStar"), cc.Class({
            extends: cc.Component,
            properties: {
                glow: cc.Node,
                effect: cc.Node
            },
            onLoad: function() {
                this.effectPos = this.effect.getPosition();
            },
            start: function() {
                this.hide();
            },
            show: function(t) {
                var e = this;
                this.effect.active = !0, this.effect.setScale(5), this.effect.setPosition(this.effectPos), 
                this.effect.stopAllActions(), this.glow.active = !1;
                var i = cc.sequence(cc.spawn(cc.scaleTo(.15, 1), cc.moveTo(.15, this.node.getPosition())), cc.delayTime(.25), cc.callFunc(function() {
                    e.glow.active = !0, e.effect.active = !1, t && t();
                }));
                this.effect.runAction(i);
            },
            hide: function() {
                this.effect.stopAllActions(), this.effect.active = !1, this.effect.setPosition(this.effectPos), 
                this.glow.active = !1;
            }
        }), cc._RF.pop();
    }, {} ],
    DanView: [ function(t, e, i) {
        cc._RF.push(e, "4c47dWKwLZDTrFTHQwO/zMx", "DanView"), cc.Class({
            extends: cc.Component,
            properties: {
                danImg: cc.Sprite,
                danName: cc.Label,
                starNode1: cc.Node,
                starNode2: cc.Node,
                starNode3: cc.Node,
                desLab: cc.RichText,
                continueBtn: cc.Node,
                danFrames: [ cc.SpriteFrame ],
                tEffect1: cc.Sprite,
                tEffect2: cc.Sprite
            },
            onLoad: function() {
                this.popUp = this.node.getComponent("PopUp"), this.star1 = this.starNode1.getComponent("DanStar"), 
                this.star2 = this.starNode2.getComponent("DanStar"), this.star3 = this.starNode3.getComponent("DanStar"), 
                this.data = null, this.danItem = null, this.index = 0, this.length = 0, this.resultDes = "", 
                this.pos = this.danImg.node.getPosition(), this.tpos1 = this.tEffect1.node.getPosition(), 
                this.tpos2 = this.tEffect2.node.getPosition();
            },
            start: function() {
                this.node.active = !1;
            },
            update: function(t) {},
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.data = t, this.unscheduleAllCallbacks(), this.reset(), this.resetImg(), ss.logic.sound.result();
                var e = ss.commonUtils.clone(ss.config.popup);
                e.opacity = 180, e.isOpenShowBanner = !1, e.isOpenChangeBanner = !1, this.popUp.show(e), 
                this.danItem = ss.logic.game.getScoreDan(ss.data.getScore()), this.danImg.spriteFrame = this.danFrames[this.danItem.icon], 
                this.danName.string = "" + this.danItem.name;
                var i = t.result, s = i.heroData, o = i.killData, n = i.scoreData.score, a = "", r = 90;
                switch (ss.logic.game.gameMode) {
                  case ss.enum.gameMode.solo:
                    i.finished && s && s.index <= 2 && (r = 98), ss.logic.info.setOpenForeverData(i.finished, o.kill);
                    break;

                  case ss.enum.gameMode.forever:
                    i.finished && (r = 98);
                }
                var c = Math.max(0, o.kill - o.died / 2);
                if (c > 40) {
                    var h = [ "初窥门径", "略有小成", "鹤立鸡群", "驾轻就熟", "青出于蓝", "融会贯通", "炉火纯青", "傲视群雄", "登峰造极", "所向披靡", "震古烁今", "超凡入圣", "威镇寰宇", "深不可测", "返璞归真" ];
                    a = "恭喜你已 <color=#ff0000>" + h[Math.min(Math.ceil(c - 40), h.length) - 1] + "</color>！";
                } else a = (c = Math.max(.2, Math.min(c, 40) / 40 * r)) >= 50 ? "恭喜击败<color=#ff0000>" + c.toFixed(1) + "%</color>的玩家" : "击败了<color=#ff0000>" + c.toFixed(1) + "%</color>的玩家，再接再厉吧！";
                this.resultDes = a, this.desLab.string = "<color=#fcd903>" + a + "</color>", this.index = 0, 
                this.length = ss.logic.game.getScoreStar(n), this.continueBtn.active = !1, this._showStarEffect();
            },
            reset: function() {
                this.star1 && this.star1.hide(), this.star2 && this.star2.hide(), this.star3 && this.star3.hide();
            },
            resetImg: function() {
                this.danImg && this.danImg.node && (this.danImg.node.opacity = 255, this.danImg.node.stopAllActions()), 
                this.tEffect1 && this.tEffect1.node && (this.tEffect1.node.stopAllActions(), this.tEffect1.node.x = this.tpos1.x, 
                this.tEffect1.node.active = !1), this.tEffect2 && this.tEffect2.node && (this.tEffect2.node.stopAllActions(), 
                this.tEffect2.node.x = this.tpos2.x, this.tEffect2.node.active = !1);
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.popUp.close(), 
                this.data = null, this.danItem = null, this.reset(), this.resetImg(), this.unscheduleAllCallbacks();
            },
            skip: function() {
                this.data && (this.popUp.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.result,
                    result: this.data.result,
                    resultDes: this.resultDes
                }), this.reset(), this.resetImg(), this.data = null, this.danItem = null);
            },
            _showStarEffect: function() {
                if (++this.index > this.length) this._showEndEffect(); else {
                    var t = this["star" + this.index];
                    t && t.show ? t.show(this._showStarEffect.bind(this)) : this._showEndEffect();
                }
            },
            _showEndEffect: function() {
                var t = this;
                if (this.data) {
                    var e = this.data.result.scoreData;
                    e.score > 0 && (ss.logic.tips.hint("积分 +" + e.score), ss.logic.net.reqAddScore(e.score), 
                    this.scheduleOnce(function() {
                        if (t.danItem) {
                            var e = ss.logic.game.getScoreDan(ss.data.getScore());
                            e.icon > t.danItem.icon ? (t.resetImg(), t.tEffect1.spriteFrame = t.danFrames[e.icon], 
                            t.tEffect2.spriteFrame = t.danFrames[e.icon], t.danImg.node.runAction(cc.fadeTo(.7, 0)), 
                            t.tEffect1.node.active = !0, t.tEffect2.node.active = !0, t.tEffect1.node.runAction(cc.moveTo(.8, t.pos).easing(cc.easeElasticIn(2))), 
                            t.tEffect2.node.runAction(cc.sequence(cc.moveTo(.8, t.pos).easing(cc.easeElasticIn(2)), cc.callFunc(function() {
                                t.reset(), t.resetImg(), t.danImg.spriteFrame = t.danFrames[t.danItem.icon], t.danName.string = "" + e.name;
                            })))) : e.id > t.danItem.id && (t.danName.string = "" + e.name);
                        }
                    }, .5));
                }
                this._showWrongEffect();
            },
            _showWrongEffect: function() {
                var t = ss.config.bannerWrong[ss.enum.view.dan], e = 0;
                ss.logic.open.isWrongBanner(t) ? (this.continueBtn.active = !0, e = 130) : (this.continueBtn.active = !1, 
                e = 255);
                var i = this.continueBtn.getComponent(cc.Widget);
                i && (i.bottom = e, i.updateAlignment()), this.scheduleOnce(this._delayContinue.bind(this), t.skipTime), 
                this.popUp.delayShowBanner(t.showTime);
            },
            _delayContinue: function() {
                this.continueBtn.active = !0;
                var t = this.continueBtn.getComponent(cc.Widget);
                t && (t.bottom = 255, t.updateAlignment());
            }
        }), cc._RF.pop();
    }, {} ],
    DataManager: [ function(t, e, i) {
        cc._RF.push(e, "5f188irFjJOC6ZtSzM2b6lL", "DataManager");
        var s = t("./data/UnitVo"), o = t("./data/InfoVo"), n = t("./data/GoodsVo"), a = t("./data/MiscVo"), r = t("./data/SetsVo"), c = function() {
            this.fristDate = 0;
        };
        e.exports = {
            DataManager: c
        }, c.prototype.initialize = function() {
            this.top = Math.pow(10, 15), this.unit = new s.UnitVo(), this.info = new o.InfoVo(), 
            this.goods = new n.GoodsVo(), this.misc = new a.MiscVo(), this.sets = new r.SetsVo();
            var t = ss.dateUtils.getZeroTime(), e = cc.sys.localStorage.getItem("fristDate");
            e ? this.fristDate = Number(e) : (this.fristDate = t, cc.sys.localStorage.setItem("fristDate", t)), 
            this.registerDayNum = Math.max(1, (t - this.fristDate) / 864e5 + 1);
        }, c.prototype.startup = function(t) {
            if (t) for (var e in t) if (t[e] && Object.keys(t[e]).length) {
                if (!t[e].newId) continue;
                this[e] = t[e];
            }
        }, c.prototype.clear = function() {}, c.prototype.isAddSecondDay = function() {
            return this.registerDayNum > 1;
        }, c.prototype.isNewCost = function() {
            return this.fristDate > 15608736e5;
        }, c.prototype.addMoney = function(t, e) {
            var i = {};
            i[ss.enum.money.coin] = this.addCoin.bind(this), i[ss.enum.money.diamond] = this.addDiamond.bind(this);
            var s = i[t];
            s && s(e);
        }, c.prototype.addCoin = function(t) {
            if (this.unit.coin + t < this.top) {
                var e = Math.floor(Math.max(0, this.unit.coin + t));
                this.unit.coin = e;
            }
            this.unit.timeStamp = Date.now();
        }, c.prototype.getCoin = function() {
            return this.unit.coin;
        }, c.prototype.addDiamond = function(t) {
            if (this.unit.diamond + t < this.top) {
                var e = Math.floor(Math.max(0, this.unit.diamond + t));
                this.unit.diamond = e;
            }
            this.unit.timeStamp = Date.now();
        }, c.prototype.getDiamond = function() {
            return this.unit.diamond;
        }, c.prototype.addScore = function(t) {
            this.unit.score || (this.unit.score = 0), this.unit.score += Math.floor(t);
        }, c.prototype.getScore = function() {
            return this.unit.score ? this.unit.score : 0;
        }, c.prototype.setMisc = function(t) {
            var e = t.key, i = t.value;
            this.misc[e] = i;
        }, c.prototype.getMisc = function(t) {
            return this.misc[t];
        }, c.prototype.addGoods = function(t) {
            this.goods.items || (this.goods.items = {}), t && (this.goods.items[t.id] = t);
        }, c.prototype.removeGoods = function(t) {
            this.goods.items || (this.goods.items = {}), console.log("DataManager removeGoods:", t), 
            this.goods.items[t] = null, delete this.goods.items[t];
        }, c.prototype.useGoods = function(t) {
            t && (this.goods.current = t.id), this.addGoods(t);
        }, c.prototype.getGoods = function(t) {
            return this.goods.items || (this.goods.items = {}), this.goods.items[t];
        }, c.prototype.getGoodsItems = function() {
            return this.goods.items || (this.goods.items = {}), this.goods.items;
        }, cc._RF.pop();
    }, {
        "./data/GoodsVo": "GoodsVo",
        "./data/InfoVo": "InfoVo",
        "./data/MiscVo": "MiscVo",
        "./data/SetsVo": "SetsVo",
        "./data/UnitVo": "UnitVo"
    } ],
    DataService: [ function(t, e, i) {
        cc._RF.push(e, "efd60Iwp5FADIrG1g21z/N8", "DataService");
        var s = t("../util/Utils"), o = null, n = function() {
            this.dataDict = {};
        };
        e.exports = {
            DataService: n
        }, n.getInstance = function() {
            return null == o && (o = new n()), o;
        };
        var a = function(t) {
            var e = t.replace(/\\/g, "/"), i = e.split("/");
            return !s.Utils.isArray(i) || i.length <= 0 ? e : i[i.length - 1];
        };
        n.prototype.loadJson = function(t, e) {
            cc.loader.loadResDir(t, function(t, i, o) {
                if (t) console.log("DataService loadJson error:", t); else {
                    for (var n = {}, a = 0; a < o.length; a++) n[o[a]] = i[a].json;
                    s.Utils.invokeCb(e, n);
                }
            });
        }, n.prototype.load = function(t, e) {
            var i = this;
            this.loadJson(t, function(t) {
                for (var o in t) {
                    var n = t[o], r = a(o), c = {};
                    for (var h in n) {
                        var l = n[h];
                        if (s.Utils.isArray(l)) {
                            var d = {}, u = -1, p = 0;
                            for (var g in l) s.Utils.isObject(l[g]) && l[g].hasOwnProperty("id") && (u < 0 && (u = l[g].id), 
                            d[l[g].id] = l[g], p = l[g].id);
                            c[h] = {
                                fristId: u,
                                lastId: p,
                                data: d
                            };
                        }
                    }
                    i.dataDict[r] = c;
                }
                s.Utils.invokeCb(e);
            });
        }, n.prototype.getAllSheets = function(t, e) {
            return s.Utils.isValidValue(e) || (e = !0), this.dataDict.hasOwnProperty(t) ? e ? s.Utils.clone(this.dataDict[t]) : this.dataDict[t] : null;
        }, n.prototype.getSheet = function(t, e, i) {
            s.Utils.isValidValue(i) || (i = !0);
            var o = this.getAllSheets(t, !1);
            return null == o ? null : o.hasOwnProperty(e) ? i ? s.Utils.clone(o[e]) : o[e] : null;
        }, n.prototype.getData = function(t, e, i, o) {
            s.Utils.isValidValue(o) || (o = !0);
            var n = this.getSheet(t, e, !1);
            if (null == n) return null;
            var a = n.data;
            return a.hasOwnProperty(i) ? o ? s.Utils.clone(a[i]) : a[i] : null;
        }, n.prototype.getFristId = function(t, e) {
            var i = this.getSheet(t, e, !1);
            return null == i ? 0 : i.fristId;
        }, n.prototype.getLastId = function(t, e) {
            var i = this.getSheet(t, e, !1);
            return null == i ? 0 : i.lastId;
        }, cc._RF.pop();
    }, {
        "../util/Utils": "Utils"
    } ],
    DateUtils: [ function(t, e, i) {
        cc._RF.push(e, "a3576WMMfFE6pLhna9oUOwZ", "DateUtils"), Date.prototype.Format = function(t) {
            var e = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                S: this.getMilliseconds()
            };
            for (var i in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), 
            e) new RegExp("(" + i + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[i] : ("00" + e[i]).substr(("" + e[i]).length)));
            return t;
        };
        var s = function() {};
        s.serverTime = 0, s.startTime = 0, s.initTime = function() {
            s.serverTime = s.getTimestamp(), s.startTime = s.getTimestamp();
        }, s.setServerTime = function(t) {
            s.serverTime = t, s.startTime = s.getTimestamp(), console.log("setServerTime", t);
        }, s.date2datestr = function(t) {
            return t = t || new Date(), s.timestamp2datestr(t.getTime());
        }, s.timestamp2datestr = function(t) {
            return void 0 != t && new Date(t).Format("yyyy-MM-dd hh:mm:ss") || new Date().Format("yyyy-MM-dd hh:mm:ss");
        }, s.datestr2timestamp = function(t) {
            return new Date(t).getTime();
        }, s.isTimeOut = function(t) {
            var e = s.getTimestamp() - s.startTime;
            return s.serverTime + e > t;
        }, s.getLastTime = function(t) {
            return t - s.getNowTimeByServer();
        }, s.getNowTimeByServer = function(t) {
            var e = s.getTimestamp() - s.startTime;
            return s.serverTime + e;
        }, s.getNowDateStr = function() {
            return s.timestamp2datestr();
        }, s.timestamp2datestr_ = function(t) {
            return s.timestamp2datestr(t) + "." + t % 1e3;
        }, s.getTimestamp = function(t) {
            var e = Date.now();
            return t ? Math.floor(e / 1e3) : Math.floor(e);
        }, s.getZeroTime = function(t) {
            return null != t && void 0 != t || (t = s.getTimestamp()), 864e5 * Math.floor((t + 288e5) / 864e5) - 288e5;
        }, s.getWeekZeroTime = function(t) {
            return null != t && void 0 != t || (t = s.getTimestamp()), 6048e5 * Math.floor((t + 288e5 + 3456e5) / 6048e5) - 288e5 - 3456e5;
        }, s.getMonthZeroTime = function(t) {
            null != t && void 0 != t || (t = s.getTimestamp());
            var e = new Date(t), i = new Date(-288e5);
            return i.setYear(e.getFullYear()), i.setMonth(e.getMonth()), i.getTime();
        }, s.getThisMonthDays = function() {
            var t = new Date(), e = t.getFullYear(), i = t.getMonth();
            return 1 != i ? [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][i] : e % 100 != 0 ? e % 4 == 0 ? 29 : 28 : e % 400 == 0 ? 29 : 28;
        }, s.time2countdownStr = function(t) {
            if (t < 0) return t.toString();
            var e = Math.floor(t / 24 / 3600 / 1e3);
            t -= 24 * e * 3600 * 1e3;
            var i = Math.floor(t / 3600 / 1e3);
            t -= 3600 * i * 1e3;
            var s = Math.floor(t / 60 / 1e3);
            return t -= 60 * s * 1e3, [ e, "天", i, "小时", s, "分钟", Math.floor(t / 1e3), "秒" ].join("");
        }, s.time2countdownStr2 = function(t) {
            var e = t, i = Math.floor(e / 3600 / 1e3);
            e -= 3600 * i * 1e3;
            var s = Math.floor(e / 60 / 1e3);
            e -= 60 * s * 1e3;
            var o = Math.floor(e / 1e3);
            return (i >= 10 ? i : "0" + i) + ":" + (s >= 10 ? s : "0" + s) + ":" + (o >= 10 ? o : "0" + o);
        }, s.time2countdownStrCn = function(t) {
            if (t < 0) return "";
            var e = Math.floor(t / 24 / 3600 / 1e3);
            t -= 24 * e * 3600 * 1e3;
            var i = Math.floor(t / 3600 / 1e3);
            t -= 3600 * i * 1e3;
            var s = Math.floor(t / 60 / 1e3);
            t -= 60 * s * 1e3;
            var o = Math.floor(t / 1e3);
            return e > 0 ? i > 0 ? [ e, "天" ].join("") : [ e, "天", i, "时" ].join("") : i > 0 ? s > 0 ? [ i, "时", s, "分" ].join("") : [ i, "时" ].join("") : s > 0 ? o > 0 ? [ s, "分", o, "秒" ].join("") : [ s, "分" ].join("") : o > 0 ? [ o, "秒" ].join("") : "";
        }, s.time2Day = function(t) {
            if (t < 0) return t.toString();
            var e = Math.floor(t / 24 / 3600 / 1e3);
            return t -= 24 * e * 3600 * 1e3, t -= 3600 * Math.floor(t / 3600 / 1e3) * 1e3, e > 0 ? [ e, "天" ].join("") : "";
        }, s.time3Day = function(t) {
            if (t < 0) return 0;
            var e = Math.floor(t / 24 / 3600 / 1e3);
            return t -= 24 * e * 3600 * 1e3, t -= 3600 * Math.floor(t / 3600 / 1e3) * 1e3, e;
        }, s.getLongEndTime = function() {
            return s.getNowTimeByServer() + 31104e8;
        }, s.getEndTime = function(t) {
            return Date.now() + t;
        }, s.getDayTimeStamp = function(t) {
            return null == t && (t = Date.now()), t % 864e5 + 288e5;
        }, s.getCurrentZeroTime = function() {
            return s.getZeroTime(s.serverTime);
        }, s.getNowTime = function(t, e) {
            return Date.now();
        }, e.exports = {
            DateUtils: s
        }, cc._RF.pop();
    }, {} ],
    Dictionary: [ function(t, e, i) {
        cc._RF.push(e, "2367fq3D2hDfZpnquH7iU3B", "Dictionary");
        var s = function() {
            this.items = {};
        };
        (s.prototype = {
            get keys() {
                var t = [];
                for (var e in this.items) t.push(e);
                return t;
            },
            get values() {
                var t = [];
                for (var e in this.items) t.push(this.items[e]);
                return t;
            }
        }).has = function(t) {
            return t in this.items;
        }, s.prototype.set = function(t, e) {
            this.items[t] = e;
        }, s.prototype.remove = function(t) {
            return !!this.has(t) && (delete this.items[t], !0);
        }, s.prototype.get = function(t) {
            return this.has(t) ? this.items[t] : void 0;
        }, s.prototype.clear = function() {
            this.items = {};
        }, e.exports = {
            Dictionary: s
        }, cc._RF.pop();
    }, {} ],
    DirTools: [ function(t, e, i) {
        cc._RF.push(e, "86a4bh/+mNAAps3EMUOv1IM", "DirTools");
        var s = {
            up: 8,
            down: 2,
            left: 4,
            right: 6,
            upLeft: 7,
            upRight: 9,
            downLeft: 1,
            downRight: 3,
            null: 0
        }, o = {
            null: 0,
            track: 1,
            escape: 2
        }, n = function() {};
        n.getDirByCircleAndRect = function(t, e, i) {
            var o = s.null, n = t.y + e >= i.y + i.height, a = t.y - e <= i.y, r = t.x - e <= i.x, c = t.x + e >= i.x + i.width;
            return n && r ? o = s.upLeft : n && c ? o = s.upRight : a && r ? o = s.downLeft : a && c ? o = s.downRight : n ? o = s.up : a ? o = s.down : r ? o = s.left : c && (o = s.right), 
            o;
        }, n.getSafeAngleByCircleAndRect = function(t, e, i) {
            var o = null;
            switch (n.getDirByCircleAndRect(t, e, i)) {
              case s.up:
                o = -15 - Math.floor(150 * Math.random());
                break;

              case s.down:
                o = 15 + Math.floor(150 * Math.random());
                break;

              case s.left:
                o = -75 + Math.floor(150 * Math.random());
                break;

              case s.right:
                o = Math.random() >= .5 ? 105 + Math.floor(75 * Math.random()) : -105 - Math.floor(75 * Math.random());
                break;

              case s.upLeft:
                o = -15 - Math.floor(60 * Math.random());
                break;

              case s.upRight:
                o = -105 - Math.floor(60 * Math.random());
                break;

              case s.downLeft:
                o = 15 + Math.floor(60 * Math.random());
                break;

              case s.downRight:
                o = 105 + Math.floor(60 * Math.random());
            }
            return o;
        }, n.getSafeAngleByPointAndPoint = function(t, e) {
            var i = null;
            switch (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0) {
              case o.null:
              case o.track:
                i = Math.atan2(e.y - t.y, e.x - t.x) * (180 / Math.PI);
                break;

              case o.escape:
                i = Math.atan2(t.y - e.y, t.x - e.x) * (180 / Math.PI), i += -60 + Math.floor(120 * Math.random());
            }
            return i;
        }, n.isTargetAngleByPointAndPoint = function(t, e, i, s) {
            var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 30;
            if (Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) > s) return !1;
            var n = Math.atan2(e.y - t.y, e.x - t.x) * (180 / Math.PI), a = !1, r = i + o, c = i - o;
            return i <= 180 - o && i >= -180 + o ? a = n >= c && n <= r : i > 180 - o ? a = n <= 180 && n >= c || n >= -180 && n <= -360 + r : i < -180 + o && (a = n >= -180 && n <= r || n <= 180 && n >= 360 + c), 
            a;
        }, e.exports = {
            Dir: s,
            DirMode: o,
            DirMath: n
        }, cc._RF.pop();
    }, {} ],
    DirUtils: [ function(t, e, i) {
        cc._RF.push(e, "f766cmVpnxP+b+OkG5yU3th", "DirUtils");
        var s = function() {};
        e.exports = {
            DirUtils: s
        }, s.calcFourDirectionsAngle = function(t) {
            return t > 45 && t < 135 ? 90 : t > -135 && t < -45 ? -90 : t >= -180 && t <= -135 || t >= 135 && t <= 180 ? 180 : 0;
        }, s.calcEightDirectionsAngle = function(t) {
            return t >= 67.5 && t <= 112.5 ? 90 : t >= -112.5 && t <= -67.5 ? -90 : t >= -180 && t <= -157.5 || t >= 157.5 && t <= 180 ? 180 : t >= -22.5 && t <= 22.5 ? 0 : t > 112.5 && t < 157.5 ? 135 : t > 22.5 && t < 67.5 ? 45 : t > -157.5 && t < -112.5 ? -135 : -45;
        }, s.fourDirectionsMove = function(t, e) {
            var i = 0, s = 0;
            return t > 45 && t < 135 ? s += e : t > -135 && t < -45 ? s -= e : t >= -180 && t <= -135 || t >= 135 && t <= 180 ? i -= e : t >= -45 && t <= 45 && (i += e), 
            cc.v2(i, s);
        }, s.eightDirectionsMove = function(t, e) {
            var i = 0, s = 0;
            return t >= 67.5 && t <= 112.5 ? s += e : t >= -112.5 && t <= -67.5 ? s -= e : t >= -180 && t <= -157.5 || t >= 157.5 && t <= 180 ? i -= e : t >= -22.5 && t <= 22.5 ? i += e : t > 112.5 && t < 157.5 ? (i -= e / 1.414, 
            s += e / 1.414) : t > 22.5 && t < 67.5 ? (i += e / 1.414, s += e / 1.414) : t > -157.5 && t < -112.5 ? (i -= e / 1.414, 
            s -= e / 1.414) : (i += e / 1.414, s -= e / 1.414), cc.v2(i, s);
        }, s.allDirectionsMove = function(t, e) {
            var i = 0, s = 0;
            return i += Math.cos(t * (Math.PI / 180)) * e, s += Math.sin(t * (Math.PI / 180)) * e, 
            cc.v2(i, s);
        }, cc._RF.pop();
    }, {} ],
    EduceView: [ function(t, e, i) {
        cc._RF.push(e, "d7eaddQBSxK27XTImFgdmpf", "EduceView"), cc.Class({
            extends: cc.Component,
            properties: {
                lotteryRed: cc.Node,
                inviteRed: cc.Node,
                lotteryTipLab: cc.Label,
                inviteTipLab: cc.Label,
                miniProgramNode: cc.Node,
                skinNode: cc.Node,
                rankLab: cc.RichText,
                homeBtn: cc.Node,
                foreverBtn: cc.Node,
                items: [ cc.Node ]
            },
            onLoad: function() {
                this.popUp = this.node.getComponent("PopUp"), this.miniProgram = this.miniProgramNode.getComponent("WeiPaiMiniProgram"), 
                this.comps = [];
                for (var t, e = 0, i = this.items.length; e < i; e++) t = this.items[e].getComponent("WiPaiMiniItem"), 
                this.comps.push(t);
                this.data = null;
            },
            start: function() {
                this.node.active = !1, cc.systemEvent.on(ss.event.client.setRed, this.setRed, this);
            },
            setRed: function(t) {
                switch (t.type) {
                  case ss.enum.redType.lottery:
                    this.lotteryRed.active = t.num > 0, this.lotteryTipLab.string = "" + t.num;
                    break;

                  case ss.enum.redType.invite:
                    this.inviteRed.active = t.num > 0, this.inviteTipLab.string = "" + t.num;
                }
            },
            update: function(t) {},
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = ss.commonUtils.clone(ss.config.popup);
                e.opacity = 255, this.popUp.show(e);
                var i = ss.logic.weiPai.getRandAdsInfo(ss.enum.weiPai.AdPosition.end_I), s = ss.logic.weiPai.getAdsInfos(ss.enum.weiPai.AdPosition.endList_MI);
                this._showGridProgram(s), this._showMiniProgram(i), this._showResize(), ss.logic.weiPai.batchReportExposure_list(i), 
                ss.logic.weiPai.batchReportExposure_list(s), t && t.msg && (this.rankLab.string = "<b>" + t.msg + "</b>", 
                ss.logic.game.gameMode == ss.enum.gameMode.solo && ss.logic.info.isFristOpenForever() ? (this.homeBtn.active = !1, 
                this.foreverBtn.active = !0, ss.logic.tips.hint("无尽模式已开启，快来挑战吧！")) : (this.homeBtn.active = !0, 
                this.foreverBtn.active = !1));
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.popUp.close(), 
                this.data = null, this.unscheduleAllCallbacks();
            },
            home: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.main
                });
            },
            again: function() {
                ss.logic.game.callMode(ss.logic.game.gameMode);
            },
            forever: function() {
                ss.state.isPreving() && (this.close(), ss.logic.game.callMode(ss.enum.gameMode.forever));
            },
            gotoGoodsClothes: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.goods,
                    from: ss.enum.view.educe
                });
            },
            openRank: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.rank,
                    from: ss.enum.view.educe
                });
            },
            openLunpan: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.lottery,
                    from: ss.enum.view.educe
                });
            },
            openInvite: function() {
                ss.logic.open.isAudited() ? (this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.invite,
                    from: ss.enum.view.educe
                })) : ss.logic.open.shareBase(ss.config.shareIds.home);
            },
            _showGridProgram: function(t) {
                if (isWeiXin && t) for (var e = 0, i = this.comps.length; e < i; e++) e < t.length ? (this.comps[e].node.active = !0, 
                this.comps[e].setData(t[e])) : this.comps[e].node.active = !1;
            },
            _showMiniProgram: function(t) {
                isWeiXin && this.miniProgram && this.miniProgram.show(t);
            },
            _showResize: function() {
                var t;
                ss.Resize.isPad && ((t = this.skinNode.getComponent(cc.Widget)).left = 10, t.updateAlignment(), 
                (t = this.miniProgramNode.getComponent(cc.Widget)).left = 30, t.updateAlignment());
            }
        }), cc._RF.pop();
    }, {} ],
    Enum: [ function(t, e, i) {
        cc._RF.push(e, "eb446o4ZWFKFKHg9oKMaOjy", "Enum");
        var s = {};
        e.exports = {
            Enum: s
        }, s.advertising = {
            mode: {
                banner: "banner",
                video: "video",
                interstitial: "interstitial"
            },
            method: {
                onError: "onError",
                onClose: "onClose",
                show: "show",
                preload: "preload"
            },
            code: {
                success: 200,
                failed: 500
            }
        }, s.code = {
            success: 200,
            failed: 500
        }, s.money = {
            coin: 1,
            diamond: 2
        }, s.audio = {
            bgMusic: "bgMusic",
            eat: "eat",
            bigEat: "bigEat",
            died: "died",
            addSpeed: "addSpeed",
            click: "click",
            result: "result",
            dominating: "dominating",
            double_kill: "double_kill",
            fristblood: "fristblood",
            godlike: "godlike",
            holyshit: "holyshit",
            killing_spree: "killing_spree",
            megakill: "megakill",
            monsterkill: "monsterkill",
            ownage: "ownage",
            rampage: "rampage",
            triple_kill: "triple_kill",
            ultrakill: "ultrakill",
            unstoppable: "unstoppable",
            whickedsick: "whickedsick"
        }, s.killType = {
            dominating: "dominating",
            double_kill: "double_kill",
            fristblood: "fristblood",
            godlike: "godlike",
            holyshit: "holyshit",
            killing_spree: "killing_spree",
            megakill: "megakill",
            monsterkill: "monsterkill",
            rampage: "rampage",
            triple_kill: "triple_kill",
            ultrakill: "ultrakill",
            unstoppable: "unstoppable",
            whickedsick: "whickedsick"
        }, s.killWord = {
            dominating: "主宰比赛",
            double_kill: "双杀",
            fristblood: "第一滴血",
            godlike: "如同神一般",
            holyshit: "超越神的杀戮",
            killing_spree: "大杀特杀",
            megakill: "杀人如麻",
            monsterkill: "妖怪般的杀戮",
            rampage: "暴走",
            triple_kill: "三杀",
            ultrakill: "疯狂杀戮",
            unstoppable: "无人能挡",
            whickedsick: "变态杀戮"
        }, s.roleType = {
            superman: "superman",
            pacman: "pacman",
            ghost: "ghost",
            pea: "pea"
        }, s.action = {
            freedom: "freedom",
            track: "track",
            escape: "escape",
            border: "border",
            swerve: "swerve"
        }, s.gameMode = {
            solo: 1,
            forever: 2
        }, s.gameCamp = {
            normal: 0,
            sentinel: 1,
            scourge: 2
        }, s.gameEgg = {
            normal: 0,
            cherry: 1,
            chocolate: 2,
            sweet: 3,
            shit: 4,
            love: 5
        }, s.tag = {
            body: 1,
            view: 2
        }, s.sheet = {
            item: "item",
            goods: "goods",
            mode: "mode",
            daily: "daily",
            buff: "buff",
            misc: "misc"
        }, s.storage = {
            unit: "unit",
            goods: "goods",
            info: "info",
            misc: "misc",
            mask: "mask",
            sets: "sets"
        }, s.superType = {
            free: 1,
            pay: 2,
            video: 3,
            share: 4,
            shareLimit: 5,
            shareLimitLast: 6,
            shareLimitPre: 7,
            freePre: 8,
            freeLast: 9,
            videoPre: 10,
            videoLast: 11
        }, s.view = {
            main: 1,
            goods: 2,
            daily: 3,
            rank: 4,
            invite: 5,
            lottery: 6,
            test: 7,
            revive: 8,
            result: 9,
            strong: 10,
            sets: 11,
            educe: 12,
            open: 13,
            dan: 14
        }, s.itemType = {
            coin: 1,
            diamond: 2,
            gift: 3,
            hugeCoin: 4,
            hugeDiamond: 5,
            item: 6
        }, s.costType = {
            free: 0,
            coin: 1,
            diamond: 2,
            login: 3,
            video: 4,
            invite: 5
        }, s.goodsMethod = {
            add: 1,
            remove: 2,
            use: 3
        }, s.inviteState = {
            normal: 0,
            complete: 1,
            getted: 2
        }, s.redType = {
            lottery: 1,
            invite: 2,
            daily: 3
        }, s.weiPai = {
            AdPosition: {
                home_I: 1,
                home_MI: 2,
                end_MI: 3,
                end_MB: 4,
                end_B: 5,
                homeList_MI: 6,
                endList_MI: 7,
                end_I: 8,
                win_MI: 9,
                lostList_MI: 10,
                selectLevList_MI: 11,
                relife_I: 12,
                award_I: 13
            },
            ReportEventType: {
                exposure: 1,
                click: 2,
                jump: 3
            },
            ReportUserType: {
                new_user: 101,
                old_user: 102
            }
        }, cc._RF.pop();
    }, {} ],
    Event: [ function(t, e, i) {
        cc._RF.push(e, "628ffKY2CdHrZ8QA0ePRze5", "Event");
        var s = {};
        e.exports = {
            Event: s
        }, s.system = {
            GameInit: "systemGameInit",
            GamePlay: "systemGamePlay",
            GamePause: "systemGamePause",
            GameOver: "systemGameOver",
            UserData: "systemUserData",
            GameData: "systemGameData",
            GameClear: "systemGameClear",
            GameReset: "systemGameReset",
            AdBanner: "systemAdBanner",
            AdVideo: "systemAdVideo",
            AdInterstitial: "AdInterstitial"
        }, s.protocol = {
            ReqGamePlay: "protocolReqGamePlay",
            ReqGameOver: "protocolReqGameOver",
            ReqAddMoney: "protocolReqAddMoney",
            ReqUpdateSign: "protocolReqUpdateSign",
            ReqSetMisc: "protocolReqSetMisc",
            ReqSetGoods: "protocolReqSetGoods",
            ReqAddScore: "protocolReqAddScore"
        }, s.cmd = {
            Startup: "cmdStartup",
            GameInit: "cmdGameInit",
            GamePlay: "cmdGamePlay",
            GamePause: "cmdGamePause",
            GameOver: "cmdGameOver",
            UserData: "cmdUserData",
            GameData: "cmdGameData",
            GameClear: "cmdGameClear",
            GameReset: "cmdGameReset",
            AddMoney: "cmdAddMoney",
            UpDateSign: "cmdUpdateSign",
            SetMisc: "cmdSetMisc",
            SetGoods: "cmdSetGoods",
            AddScore: "cmdAddScore"
        }, s.client = {
            openFunc: "clientOpenFunc",
            addMoney: "clientAddMoney",
            openView: "clientOpenView",
            closeView: "clientCloseView",
            closeAllView: "clientCloseAllView",
            setGoods: "clientSetGoods",
            setRed: "clientSetRed",
            setExport: "clientSetExport"
        }, s.ald = {
            open: "open",
            login: "login",
            start_game: "start_game",
            sendShare: "sendShare",
            clickShare: "clickShare"
        }, cc._RF.pop();
    }, {} ],
    ExtendsManager: [ function(t, e, i) {
        cc._RF.push(e, "7cb0fofme1AkaqpfaSmq9L4", "ExtendsManager");
        var s = function() {};
        s.prototype.initialize = function() {}, e.exports = {
            ExtendsManager: s
        }, cc._RF.pop();
    }, {} ],
    Facade: [ function(t, e, i) {
        cc._RF.push(e, "becafNExvVKgpvxuLQcB1xu", "Facade");
        var s = function() {};
        e.exports = {
            Facade: s
        }, s.prototype.startup = function() {}, cc._RF.pop();
    }, {} ],
    Ferrari: [ function(t, e, i) {
        cc._RF.push(e, "0ae11pxWIRB37+Ic4GUeCwq", "Ferrari");
        var s = t("./Juggler"), o = t("./Timer"), n = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 60;
            this.mCfgFps = t, this.mFps = t, this.mCount = 0, this.mTimer = 0, this.mInterval = 0, 
            this.mStarted = !1, this.mPaused = !1, this.juggler = new s.Juggler(), this.timer = new o.Timer(), 
            cc.game.on(cc.game.EVENT_HIDE, this.pause, this), cc.game.on(cc.game.EVENT_SHOW, this.resume, this);
        };
        (n.prototype = {
            get fps() {
                return this.mFps;
            },
            get isStarted() {
                return this.isStarted;
            }
        }).start = function() {
            this.mStarted || (this.mStarted = !0);
        }, n.prototype.stop = function() {
            this.mStarted = !1, clearInterval(this.mInterval);
        }, n.prototype.pause = function() {
            this.mStarted && !this.mPaused && (this.mPaused = !0);
        }, n.prototype.resume = function() {
            this.mStarted && this.mPaused && (this.mTimer = Date.now(), this.mPaused = !1);
        }, n.prototype.update = function(t) {
            this.mStarted && (this.mPaused || (this.countFps(t), this.nextFrame(t)));
        }, n.prototype.countFps = function(t) {
            this.mFps = Math.ceil(1 / t * 1e3) / 1e3;
        }, n.prototype.nextFrame = function(t) {
            var e = Math.ceil(this.mFps / this.mCfgFps * 1e3) / 1e3;
            e = Math.max(.6, Math.min(e, 1.2)), this.advanceFrame(t, e);
        }, n.prototype.advanceFrame = function(t, e) {
            this.juggler.advanceFrame(t, e), this.timer.advanceFrame(t);
        }, n.prototype.purge = function() {
            this.juggler.purge(), this.timer.purge();
        }, e.exports = {
            Ferrari: n
        }, cc._RF.pop();
    }, {
        "./Juggler": "Juggler",
        "./Timer": "Timer"
    } ],
    FluxaySuper: [ function(t, e, i) {
        cc._RF.push(e, "c3a73zG17ZJRL4TTrdd5Vs6", "FluxaySuper");
        var s = cc.renderer.renderEngine.renderer, o = t("CustomMaterial"), n = {
            name: "FluxaySuper",
            params: [ {
                name: "time",
                type: s.PARAM_FLOAT,
                defaultValue: 0
            } ],
            start: function() {
                this._start = Date.now();
            },
            update: function(t, e) {
                var i = (Date.now() - this._start) / 1e3;
                e.setParamValue("time", i);
            },
            defines: [],
            vert: "\n        uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }",
            frag: "#define TAU 6.12\n        #define MAX_ITER 5\n        uniform sampler2D texture;\n        uniform vec4 color;\n        uniform float time;\n        varying vec2 uv0;\n        \n        void main()\n        {\n            float time = time * .5+5.;\n            // uv should be the 0-1 uv of texture...\n            vec2 uv = uv0.xy;//fragCoord.xy / iResolution.xy;\n            \n            vec2 p = mod(uv*TAU, TAU)-250.0;\n        \n            vec2 i = vec2(p);\n            float c = 1.0;\n            float inten = .0045;\n        \n            for (int n = 0; n < MAX_ITER; n++) \n            {\n                float t =  time * (1.0 - (3.5 / float(n+1)));\n                i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(1.5*t + i.x));\n                c += 1.0/length(vec2(p.x / (cos(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));\n            }\n            c /= float(MAX_ITER);\n            c = 1.17-pow(c, 1.4);\n            vec4 tex = texture2D(texture,uv);\n            vec3 colour = vec3(pow(abs(c), 10.0));\n            colour = clamp(colour + vec3(0.0, 0.0, .0), 0.0, tex.a);\n        \n            // 混合波光\n            float alpha = c*tex[3];  \n            tex[0] = tex[0] + colour[0]*alpha; \n            tex[1] = tex[1] + colour[1]*alpha; \n            tex[2] = tex[2] + colour[2]*alpha; \n            gl_FragColor = color * tex;\n        }"
        };
        o.addShader(n), cc._RF.pop();
    }, {
        CustomMaterial: "CustomMaterial"
    } ],
    Gala: [ function(t, e, i) {
        cc._RF.push(e, "bf560QOWblGdbUzZrIxTTaq", "Gala");
        var s = t("./galagala/Outlooking"), o = t("./galagala/Rassling"), n = function() {
            this.outlooking = new s.Outlooking(), this.rassling = new o.Rassling();
        };
        n.prototype.init = function(t) {
            this.outlooking.init(t.outlooking), this.rassling.init(t.rassling);
        }, n.prototype.createAll = function() {
            this.rassling.play();
        }, n.prototype.clearAll = function() {
            this.outlooking.clear(), this.rassling.stop();
        }, n.prototype.addSmart = function(t, e) {
            this.outlooking.addSmart(t, e);
        }, n.prototype.removeSmart = function(t) {
            this.outlooking.removeSmart(t);
        }, n.prototype.removeAllSmarts = function() {
            this.outlooking.removeAllSmarts();
        }, e.exports = {
            Gala: n
        }, cc._RF.pop();
    }, {
        "./galagala/Outlooking": "Outlooking",
        "./galagala/Rassling": "Rassling"
    } ],
    GameLogic: [ function(t, e, i) {
        cc._RF.push(e, "c6044gRCQhAGr9sDOzGHyPC", "GameLogic");
        var s = t("../../module/game/Bulu"), o = t("../../module/game/Gala"), n = t("../../module/game/Hutu"), a = t("../../module/game/Mini"), r = function() {
            this.bulu = new s.Bulu(), this.gala = new o.Gala(), this.hutu = new n.Hutu(), this.mini = new a.Mini(), 
            this.playing = !1, this.pausing = !1, this.supermanData = null, this.gameMode = 0, 
            this.gameData = null, this.tempData = null, this.hutuData = null, this.ids = [], 
            this.gIndex = 0, this.tIndex = 0, this.tLength = 1, this.fIndex = 0, this.fLength = 1, 
            this.forverCount = 0, this.tMiniProgram = null, this.tEgging = !1, this.tLife = 0, 
            this.timestamps = 0, this.tTime = 0, this.tForever = 0, this.tForeverAll = 0, cc.game.on(cc.game.EVENT_HIDE, this._pause, this), 
            cc.game.on(cc.game.EVENT_SHOW, this._resume, this), cc.systemEvent.on(ss.event.system.AdVideo, this._onVideoRespond.bind(this));
        };
        r.prototype._createAll = function() {
            var t = this.hutu.create(this.tempData);
            this.hutuData = t, this.bulu.createAll(t), this.gala.createAll(), this._createForever(t);
        }, r.prototype._clearAll = function() {
            this.bulu.clearAll(), this.gala.clearAll(), this.ids.length = 0, this.tEgging = !1, 
            this.tLife = 0;
        }, r.prototype._pause = function() {
            this.playing && !this.pausing && (this.pausing = !0);
        }, r.prototype._resume = function() {
            this.playing && this.pausing && (this.pausing = !1);
        }, r.prototype._onVideoRespond = function(t) {
            var e = t;
            e.method == ss.enum.advertising.method.show && e.code == ss.enum.advertising.code.success ? this.pausing = !0 : this.pausing = !1;
        }, r.prototype._respondKillFun = function() {
            this.mini.setKillData(this.getKillData());
        }, r.prototype.init = function(t) {
            this.bulu.init(t.bulu), this.gala.init(t.gala), this.hutu.init(t.hutu, this._respondKillFun.bind(this)), 
            this.mini.init(t.mini);
        }, r.prototype.update = function(t) {
            this.playing && (this.pausing || (this.mini.update(t), this.timestamps += t, this.timestamps >= 1 && (this.timestamps = 0, 
            this.tTime++)));
        }, r.prototype.move = function(t) {
            this.bulu.move(t);
        }, r.prototype.addSpeed = function() {
            this.bulu.addSpeed();
        }, r.prototype.isSystemBetter = function() {
            switch (ss.logic.open.getSystem()) {
              case "android":
                return !1;

              case "ios":
              case "window":
                return !0;
            }
            return !1;
        }, r.prototype.play = function(t) {
            switch (this.gIndex++, this.timestamps = 0, this.tTime = 0, this._clearAll(), this.playing = !0, 
            this.tempData = t, this.gameMode = t.gameMode, this.gameMode) {
              case ss.enum.gameMode.solo:
                this.tIndex++;
                break;

              case ss.enum.gameMode.forever:
                this.fIndex++;
            }
            this.mini.reset(), this._createAll(), this.mini.play(this.gameMode), this._createEggData(t);
        }, r.prototype.stop = function() {
            switch (this.playing = !1, this.pausing = !1, this._clearAll(), this.mini.clear(), 
            this.gameMode) {
              case ss.enum.gameMode.solo:
              case ss.enum.gameMode.forever:
            }
        }, r.prototype.add = function(t) {
            var e = this.bulu.getScaleXY() >= 1 ? 2 : 1, i = this.ids.indexOf(t);
            return this.ids.length < e && (-1 == i && this.ids.push(t), !0);
        }, r.prototype.sub = function(t) {
            var e = this.ids.indexOf(t);
            -1 != e && this.ids.splice(e, 1);
        }, r.prototype.getKillData = function() {
            return this.hutu.getSoulerData();
        }, r.prototype.getScoreData = function(t, e) {
            var i = 0, s = 0, o = 0, n = this.getKillData(), a = 0;
            switch (this.gameMode) {
              case ss.enum.gameMode.solo:
                switch (t.index) {
                  case 0:
                    i += 12, s = 12;
                    break;

                  case 1:
                    i += 10, s = 10;
                    break;

                  case 2:
                    i += 8, s = 8;
                    break;

                  default:
                    i += 5, s = 5;
                }
                a = Math.floor(.6 * (n.kill - n.died)), i += Math.max(0, a), o = Math.floor(i / 3);
                break;

              case ss.enum.gameMode.forever:
                console.log("游戏耗时:" + this.tTime);
                var r = 200 + 2 * this.tForeverAll;
                switch (this.tTime <= .7 * r ? 0 : this.tTime <= .8 * r ? 1 : this.tTime <= .9 * r ? 2 : 3) {
                  case 0:
                    i += 20, s = 25;
                    break;

                  case 1:
                    i += 16, s = 20;
                    break;

                  case 2:
                    i += 12, s = 15;
                    break;

                  default:
                    i += 8, s = 10;
                }
                a = Math.min(200, Math.floor(.5 * (n.kill - n.died))), i += Math.max(0, a), o = Math.floor(i / 2);
            }
            return {
                coin: i,
                diamond: s,
                score: o
            };
        }, r.prototype.getGiveUpScoreData = function() {
            var t = 2, e = 0, i = 0, s = this.getKillData(), o = void 0;
            switch (this.gameMode) {
              case ss.enum.gameMode.solo:
                o = Math.floor(.7 * (s.kill - s.died)), t += Math.max(0, o), s.kill - s.died >= 5 && (e = 5), 
                i = Math.floor(t / 3);
                break;

              case ss.enum.gameMode.forever:
                console.log("游戏耗时:" + this.tTime), o = Math.floor(.5 * (s.kill - s.died)), t += Math.min(Math.max(0, o), 20), 
                s.kill - s.died >= 5 && (e = 3 + Math.min(10, Math.max(0, Math.floor((s.kill - s.died) / 2)))), 
                i = Math.floor(t / 2);
            }
            return {
                coin: t,
                diamond: e,
                score: i
            };
        }, r.prototype.getPreData = function(t) {
            var e = 0, i = !1;
            switch (t) {
              case ss.enum.gameMode.solo:
                if (this.tIndex >= this.tLength) {
                    switch (this.tIndex = 0, this.tLength) {
                      case 1:
                      case 3:
                      case 5:
                        this.tLength = 3;
                        break;

                      default:
                        this.tLength = 5;
                    }
                    e = ss.logic.goods.getTestRandId();
                }
                break;

              case ss.enum.gameMode.forever:
                i = this.fIndex >= 1;
            }
            return {
                test: e > 0,
                testId: e,
                currId: ss.logic.goods.getCurrId(),
                egg: i
            };
        }, r.prototype.resetTest = function() {
            this.tIndex = 0;
        }, r.prototype.getMiniProgram = function() {
            if (this.tMiniProgram) return this.tMiniProgram;
            this.tMiniProgram = [];
            for (var t = ss.config.miniProgram.allList, e = ss.config.miniProgram.programs, i = 0, s = t.length; i < s; i++) this.tMiniProgram.push(e[t[i]]);
            return this.tMiniProgram;
        }, r.prototype.getScoreDan = function(t) {
            for (var e = ss.config.dan.list, i = 0, s = void 0, o = e.length - 1; o >= 0; o--) if ((s = e[o]) && t >= s.score) {
                i = o;
                break;
            }
            return s = e[i];
        }, r.prototype.getScoreStar = function(t) {
            for (var e = ss.config.dan.star, i = 0, s = e.length - 1; s >= 0; s--) if (t >= e[s]) {
                i = s;
                break;
            }
            return i = Math.min(i, 3);
        }, r.prototype.judge = function(t, e) {
            if (!t || !t.getAllLiving()) return !1;
            if (!e || !e.getAllLiving()) return !1;
            switch (t.data.type) {
              case ss.enum.roleType.superman:
              case ss.enum.roleType.pacman:
                if (!e.getAllBorning() || !t.getAllBorning()) return;
                var i = e.data.camp, s = t.data.camp;
                if (i > ss.enum.gameCamp.normal && i == s) return;
                var o = e.getAllGhosting(), n = t.getAllGhosting();
                if (o && n) return;
                var a = e.getGrow(), r = t.getGrow();
                o ? (e.onJudgeGrow && e.onJudgeGrow(this._createGrowVo(r, !0, 0, !0, !0, e.data.id, t.data.id, e.data.name, t.data.name)), 
                t.onJudgeDied && t.onJudgeDied()) : n ? (t.onJudgeGrow && t.onJudgeGrow(this._createGrowVo(a, !0, 0, !0, !0, t.data.id, e.data.id, t.data.name, e.data.name)), 
                e.onJudgeDied && e.onJudgeDied()) : a > r ? (e.onJudgeGrow && e.onJudgeGrow(this._createGrowVo(r, !0, 0, !0, !0, e.data.id, t.data.id, e.data.name, t.data.name)), 
                t.onJudgeDied && t.onJudgeDied()) : a < r ? (t.onJudgeGrow && t.onJudgeGrow(this._createGrowVo(a, !0, 0, !0, !0, t.data.id, e.data.id, t.data.name, e.data.name)), 
                e.onJudgeDied && e.onJudgeDied()) : a == r && (e.onJudgeDied && e.onJudgeDied(), 
                t.onJudgeDied && t.onJudgeDied());
                break;

              case ss.enum.roleType.ghost:
                if (!e.getAllBorning()) return;
                if (e.getAllGhosting()) return;
                e.onJudgeDied && e.onJudgeDied();
                break;

              case ss.enum.roleType.pea:
                e.onJudgeGrow && e.onJudgeGrow(this._createGrowVo(t.getGrow(), t.getEffect(), t.getEgg(), !1, !1)), 
                t.onJudgeDied && t.onJudgeDied();
                break;

              default:
                console.error("GameLogic judge undefind roletype:", t.data);
            }
        }, r.prototype.attract = function(t, e) {
            return !(!t || !t.getAllLiving()) && !(!e || !e.getAllLiving()) && !!t.isCanAttract() && (e.onJudgeGrow && e.onJudgeGrow(this._createGrowVo(t.getGrow(), t.getEffect(), t.getEgg(), !1, !1)), 
            void (t.onAttractDied && t.onAttractDied({
                v2: e.node.getPosition(),
                isEffect: e.node.active
            })));
        }, r.prototype._createGrowVo = function(t, e, i, s, o) {
            return {
                grow: t,
                isEffect: e,
                egg: i,
                isVibrate: s,
                isSoul: o,
                winId: arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
                lostId: arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
                winName: arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "",
                lostName: arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : ""
            };
        }, r.prototype.recover = function(t) {
            var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (t && !(t.id < 0)) {
                var s = ss.commonUtils.clone(t);
                switch (t.type) {
                  case ss.enum.roleType.superman:
                    this.supermanData = s, this.bulu.recoverHero(t.id), this._judgeLove() ? cc.systemEvent.emit(ss.event.client.openView, {
                        type: ss.enum.view.revive
                    }) : (console.log("生命值 == 0"), this._subForever(), ss.logic.game.callOver(!1, null, null, ss.logic.game.getKillData(), ss.logic.game.getGiveUpScoreData()));
                    break;

                  case ss.enum.roleType.pacman:
                    this.bulu.recoverPacman(t.id), this._judgeRevive(s, e, i);
                    break;

                  case ss.enum.roleType.ghost:
                    this.bulu.recoverGhost(t.id), e && this.bulu.reviveGhost(s);
                    break;

                  case ss.enum.roleType.pea:
                    this.bulu.recoverPea(t.id), e && this.bulu.revivePea(s);
                    break;

                  default:
                    console.error("GameLogic recover undefind roletype:", t);
                }
            }
        }, r.prototype.revive = function() {
            switch (this.supermanData && this.bulu.reviveHero(this.supermanData), this.supermanData = null, 
            this.ids.length = 0, this.gameMode) {
              case ss.enum.gameMode.solo:
                this.bulu.reviveAll(!1);
                break;

              case ss.enum.gameMode.forever:
                this.bulu.reviveAll(!0);
            }
        }, r.prototype.callMode = function(t) {
            var e = this.getPreData(t), i = {
                gameMode: t,
                gameData: e
            };
            cc.systemEvent.emit(ss.event.client.closeAllView), e.test ? cc.systemEvent.emit(ss.event.client.openView, {
                type: ss.enum.view.test,
                params: i
            }) : e.egg ? cc.systemEvent.emit(ss.event.client.openView, {
                type: ss.enum.view.strong,
                params: i
            }) : ss.logic.net.reqGamePlay(i);
        }, r.prototype.callOver = function(t) {
            var e = {
                finished: t,
                rankData: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                heroData: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                killData: arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                scoreData: arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null
            };
            ss.logic.net.reqGameOver(e), this._subForever();
        }, r.prototype.getEgging = function() {
            return this.tEgging;
        }, r.prototype.getLife = function() {
            return this.tLife;
        }, r.prototype._createForever = function(t) {
            this.gameMode == ss.enum.gameMode.forever && (this.tForeverAll = this.tForever = t.pacmanForever, 
            this.mini.setSurviveData(this.tForever));
        }, r.prototype._createEggData = function(t) {
            if (t.gameMode == ss.enum.gameMode.forever) {
                var e = t.gameData;
                this.tEgging = e.egg, this.tLife = e.egg ? 5 : 3, this.mini.setBuffData({
                    method: "add",
                    type: ss.enum.gameEgg.love,
                    time: this.tLife
                });
            }
        }, r.prototype._judgeLove = function() {
            if (this.gameMode == ss.enum.gameMode.forever) {
                if (!(--this.tLife > 0)) return this.mini.setBuffData({
                    method: "remove",
                    type: ss.enum.gameEgg.love,
                    time: 0
                }), !1;
                this.mini.setBuffData({
                    method: "update",
                    type: ss.enum.gameEgg.love,
                    time: this.tLife
                });
            }
            return !0;
        }, r.prototype._judgeRevive = function(t, e, i) {
            switch (this.gameMode) {
              case ss.enum.gameMode.solo:
                e && this.bulu.revivePacman(t);
                break;

              case ss.enum.gameMode.forever:
                if (i) e && this.bulu.revivePacman(t); else if (this._subForever(), this.tForever > 0) {
                    var s = t;
                    s.grow && (s.grow += Math.floor(10 + 20 * Math.random())), s.name = this.hutu.getRandName(), 
                    e && this.bulu.revivePacman(s);
                } else console.log("击杀了所有对手，吃鸡成功！"), this.callOver(!0, null, null, ss.logic.game.getKillData(), ss.logic.game.getScoreData(null, null));
            }
        }, r.prototype._subForever = function() {
            this.gameMode == ss.enum.gameMode.forever && (this.tForever = Math.max(0, this.tForever - 1), 
            this.mini.setSurviveData(this.tForever));
        }, e.exports = {
            GameLogic: r
        }, cc._RF.pop();
    }, {
        "../../module/game/Bulu": "Bulu",
        "../../module/game/Gala": "Gala",
        "../../module/game/Hutu": "Hutu",
        "../../module/game/Mini": "Mini"
    } ],
    Game: [ function(t, e, i) {
        cc._RF.push(e, "0a6e3VTwhRHHLwZSgJNHHG9", "Game"), cc.Class({
            extends: cc.Component,
            properties: {
                joystickNode: cc.Node,
                addSpeedNode: cc.Node,
                joystickNode_back: cc.Node,
                addSpeedNode_back: cc.Node,
                mapNode: cc.Node,
                miniMapNode: cc.Node,
                miniRankNode: cc.Node,
                miniBuffNode: cc.Node,
                miniKillNode: cc.Node,
                miniTimeLab: cc.Label,
                miniKillLab: cc.Label,
                miniDiedLab: cc.Label,
                miniSignLab: cc.Label,
                miniSurviveNode: cc.Node,
                miniSurviveLab: cc.Label,
                pacmanPrefab: cc.Prefab,
                peaPrefab: cc.Prefab,
                ghostPrefab: cc.Prefab,
                raderPrefab: cc.Prefab,
                snowPrefab: cc.Prefab,
                shadowPrefab: cc.Prefab
            },
            onLoad: function() {
                this.joystick = this.joystickNode.getComponent("Joystick"), this.addSpeed = this.addSpeedNode.getComponent("AddSpeed"), 
                this.joystick_back = this.joystickNode_back.getComponent("Joystick"), this.addSpeed_back = this.addSpeedNode_back.getComponent("AddSpeed");
            },
            start: function() {
                cc.systemEvent.on(ss.event.system.GameInit, this.gameInit, this), cc.systemEvent.on(ss.event.system.UserData, this.userData, this), 
                cc.systemEvent.on(ss.event.system.GameData, this.gameData, this), cc.systemEvent.on(ss.event.system.GamePlay, this.gamePlay, this), 
                cc.systemEvent.on(ss.event.system.GameOver, this.gameOver, this), this.joystickNode.on("move", this.callJoystick, this), 
                this.addSpeedNode.on("speed", this.callAddSpeed, this), this.joystickNode_back.on("move", this.callJoystick, this), 
                this.addSpeedNode_back.on("speed", this.callAddSpeed, this), this.joystickNode_back.active = !1, 
                this.addSpeedNode_back.active = !1;
            },
            gameInit: function(t) {
                var e = ss.logic.game.isSystemBetter() ? 80 : 60;
                ss.logic.game.init({
                    map: this.mapNode,
                    bulu: {
                        pea: {
                            parent: this.mapNode,
                            prefab: this.peaPrefab,
                            num: e
                        },
                        ghost: {
                            parent: this.mapNode,
                            prefab: this.ghostPrefab,
                            num: 2
                        },
                        pacman: {
                            parent: this.mapNode,
                            prefab: this.pacmanPrefab,
                            num: 10
                        },
                        viewing: {
                            content: this.mapNode,
                            mapSize: cc.size(this.mapNode.width, this.mapNode.height),
                            paddingSize: cc.size(256, 256)
                        },
                        radar: {
                            parent: this.miniMapNode,
                            prefab: this.raderPrefab,
                            num: 0,
                            scaleX: this.miniMapNode.width / this.mapNode.width,
                            scaleY: this.miniMapNode.height / this.mapNode.height
                        },
                        snow: {
                            parent: null,
                            prefab: this.snowPrefab,
                            num: 6
                        },
                        shadow: {
                            parent: this.mapNode,
                            prefab: this.shadowPrefab,
                            num: 50
                        }
                    },
                    gala: {
                        outlooking: {
                            mapRect: cc.rect(-this.mapNode.width / 2, -this.mapNode.height / 2, this.mapNode.width, this.mapNode.height)
                        },
                        rassling: {
                            enabledDebugDraw: !1,
                            enabledDrawBoundingBox: !1
                        }
                    },
                    hutu: {
                        pea: {
                            num: e,
                            1: {
                                cherry: 5,
                                chocolate: 0,
                                sweet: 0,
                                shit: 0
                            },
                            2: {
                                cherry: 5,
                                chocolate: 1,
                                sweet: 1,
                                shit: 1
                            }
                        },
                        ghost: {
                            1: {
                                num: 1
                            },
                            2: {
                                num: 0
                            }
                        },
                        pacman: {
                            num: 9,
                            1: {
                                num: 0,
                                step: 0
                            },
                            2: {
                                num: 50,
                                step: 10
                            }
                        }
                    },
                    mini: {
                        rankNode: this.miniRankNode,
                        killNode: this.miniKillNode,
                        buffNode: this.miniBuffNode,
                        surviveNode: this.miniSurviveNode,
                        surviveLab: this.miniSurviveLab,
                        killLab: this.miniKillLab,
                        diedLab: this.miniDiedLab,
                        signLab: this.miniSignLab,
                        timeLab: this.miniTimeLab,
                        gameTime: 120
                    }
                });
            },
            userData: function(t) {},
            gameData: function(t) {},
            gamePlay: function(t) {
                var e = t;
                this.joystick.play(), this.addSpeed.play(), this.joystick_back.play(), this.addSpeed_back.play(), 
                ss.logic.game.play(e), this.callCtrlView();
            },
            gameOver: function(t) {
                this.joystick.stop(), this.addSpeed.stop(), this.joystick_back.stop(), this.addSpeed_back.stop(), 
                ss.logic.game.stop();
            },
            callJoystick: function(t) {
                if (ss.state.isPlaying()) {
                    var e = t;
                    ss.logic.game.move(e);
                }
            },
            callAddSpeed: function(t) {
                ss.state.isPlaying() && ss.logic.game.addSpeed();
            },
            callCtrlView: function(t) {
                ss.data.sets.rightabled ? (this.joystickNode.active = !1, this.addSpeedNode.active = !1, 
                this.joystickNode_back.active = !0, this.addSpeedNode_back.active = !0) : (this.joystickNode.active = !0, 
                this.addSpeedNode.active = !0, this.joystickNode_back.active = !1, this.addSpeedNode_back.active = !1);
            },
            update: function(t) {
                ss.state.isPlaying() && ss.logic.game.update(t);
            }
        }), cc._RF.pop();
    }, {} ],
    GetAward: [ function(t, e, i) {
        cc._RF.push(e, "66af1TMvDZJbaPI/qdurhOZ", "GetAward"), cc.Class({
            extends: cc.Component,
            properties: {
                msgLabel: cc.Label,
                doubleBtn: cc.Node,
                images: [ cc.Sprite ],
                coinSpriteFrame: cc.SpriteFrame,
                diamondSpriteFrame: cc.SpriteFrame
            },
            onLoad: function() {
                this.superBtn = this.doubleBtn.getComponent("SuperButton2"), this.popUp = this.node.getComponent("PopUp"), 
                this.data = null;
            },
            start: function() {
                this.node.active = !1;
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.data = t;
                var e, i = ss.commonUtils.clone(ss.config.popup);
                switch (i.opacity = 255, i.isOpenShowBanner = !0, i.isEffect = !0, this.popUp.show(i), 
                this.superBtn.show({
                    rule: ss.config.rule.getAward,
                    shareId: ss.config.shareIds.getAward,
                    onCanHandler: null,
                    onClickHandler: this._getAwardHandler.bind(this)
                }), this.msgLabel.string = "" + t.msg, t.type) {
                  case ss.enum.money.coin:
                    e = this.coinSpriteFrame;
                    break;

                  case ss.enum.money.diamond:
                    e = this.diamondSpriteFrame;
                }
                for (var s = 0, o = this.images.length; s < o; s++) this.images[s].spriteFrame = e;
            },
            close: function() {
                this.popUp.close();
            },
            _getAwardHandler: function() {
                switch (this.data.type) {
                  case ss.enum.money.coin:
                    ss.logic.money.simpleAdd(ss.enum.money.coin, this.data.money), ss.logic.tips.hint("金币 +" + this.data.money);
                    break;

                  case ss.enum.money.diamond:
                    ss.logic.money.simpleAdd(ss.enum.money.diamond, this.data.money), ss.logic.tips.hint("钻石 +" + this.data.money);
                }
                this.close();
            }
        }), cc._RF.pop();
    }, {} ],
    Ghost: [ function(t, e, i) {
        cc._RF.push(e, "5dd12eQc0NFz5EjtfzXpesO", "Ghost");
        var s = t("./bulubulu/Unit"), o = t("./galagala/SmartB"), n = t("./Quick");
        cc.Class({
            extends: cc.Component,
            properties: {},
            ctor: function() {
                this.data = null, this.params = null, this.playing = !1, this.locking = !1, this.dieding = !1, 
                this.colliders = {}, this.unit = new s.Unit(this), this.smart = new o.SmartB(this), 
                this.quick = new n.Quick(this), this._baseSpeed = 0, this._addSpeed = 0, this._angle = 0;
            },
            onLoad: function() {
                var t = this.getComponents(cc.CircleCollider);
                if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && (e.abc = this, this.colliders[e.tag] = e, 
                e.onDisable = function() {}, e.onEnable = function() {});
            },
            start: function() {},
            update: function(t) {},
            getAllSpeed: function() {
                return this._baseSpeed + this._addSpeed;
            },
            getAllLiving: function() {
                return this.data && !this.dieding;
            },
            setLocking: function(t) {
                this.locking = t, this.smart.setLocking(t);
            },
            addCollider: function() {
                var t = this.getComponents(cc.CircleCollider);
                if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && cc.director.getCollisionManager().addCollider(e);
            },
            removeCollider: function() {
                var t = this.getComponents(cc.CircleCollider);
                if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && cc.director.getCollisionManager().removeCollider(e);
            },
            preview: function(t) {},
            init: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this.data = t, this.params = e, this.unit.init({
                    id: this.data.id
                }), ss.logic.game.bulu.addUnit(this.data.id, this.data.gid, this.unit), this.smart.init({
                    id: this.data.id,
                    sid: this.data.sid,
                    type: this.data.type,
                    camp: this.data.camp
                }), ss.logic.game.gala.addSmart(this.data.id, this.smart);
                var i = this.unit.cell.getRandV2();
                this.node.setPosition(i), this.node.zIndex = 2, this.unit.move(i), this.smart.move(i), 
                this._baseSpeed = 2;
                var s = ss.config.smart[t.sid];
                this._setBodyLength(s.bodyLength), this._setViewLength(s.viewLength), this.quick.setData({
                    max: 4,
                    up: .2,
                    duration: 300,
                    down: .6
                }), ss.ferrari.juggler.add(this), this.addCollider();
            },
            play: function() {
                this.playing = !0, this.quick.play(), this.smart.play();
            },
            advanceFrame: function(t, e) {
                this.playing && (this.locking || (this._playByEar(), this.quick.update(t), this.smart.update(t)));
            },
            move: function(t) {
                if (this.playing && this.data) {
                    var e = t.angle;
                    this._angle != e && (this._angle = e);
                }
            },
            addSpeed: function() {
                this.playing && this.quick.addSpeed();
            },
            toBeKill: function() {
                this.data && (this.setLocking(!0), this.dieding = !0, ss.logic.game.recover(this.data, !0));
            },
            reset: function() {
                this.quick.clear(), this.setLocking(!1);
            },
            clear: function() {
                this.data && (ss.logic.game.bulu.removeUnit(this.data.id), ss.logic.game.gala.removeSmart(this.data.id)), 
                this.data = null, this.params = null, this.playing = !1, this.locking = !1, this._baseSpeed = 0, 
                this._addSpeed = 0, this._angle = 0, ss.ferrari.juggler.remove(this), this.removeCollider();
            },
            onUnitActive: function(t) {
                this.data && (this.node.active = t);
            },
            onUnitChange: function(t) {
                this.data && (this.data.gid = t);
            },
            onUnitDied: function() {
                this.data && this.toBeKill();
            },
            onQuickUpdate: function(t) {
                this.data && (this._addSpeed = t.speed);
            },
            onSmartAction: function(t) {
                this.data && (null != t.angle && this.move({
                    angle: t.angle
                }), t.addSpeed && this.addSpeed());
            },
            onSmartDied: function() {
                this.toBeKill();
            },
            onJudgeDied: function() {
                this.toBeKill();
            },
            onCollisionEnter: function(t, e) {
                if (this.data && !this.dieding) {
                    var i = t.abc;
                    i && i.data && e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body && this.smart.addViewTarget(i.data.id);
                }
            },
            onCollisionExit: function(t, e) {
                if (this.data && !this.dieding) {
                    var i = t.abc;
                    i && i.data && e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body && this.smart.removeViewTarget(i.data.id);
                }
            },
            _playByEar: function() {
                if (this.data) {
                    var t = this._angle, e = ss.logic.game.bulu.getScaleXY(), i = this.node.getPosition(), s = ss.dirUtils.allDirectionsMove(t, this.getAllSpeed() / e);
                    i.addSelf(s), this.node.setPosition(i), this.unit.move(i), this.smart.move(i);
                }
            },
            _setBodyLength: function(t) {
                this.smart.setBodyLength(t);
                var e = this.colliders[ss.enum.tag.body];
                e && (e.radius = t);
            },
            _setViewLength: function(t) {
                this.smart.setViewLength(t);
                var e = this.colliders[ss.enum.tag.view];
                e && (e.radius = t);
            }
        }), cc._RF.pop();
    }, {
        "./Quick": "Quick",
        "./bulubulu/Unit": "Unit",
        "./galagala/SmartB": "SmartB"
    } ],
    GoodsItem: [ function(t, e, i) {
        cc._RF.push(e, "feecao+RwBClqTDoBjM8oeI", "GoodsItem"), cc.Class({
            extends: cc.Component,
            properties: {
                selectNode: cc.Node,
                icon: cc.Sprite,
                nameLab: cc.Label,
                timeLab: cc.Label,
                useNode: cc.Node,
                bagNode: cc.Node
            },
            onLoad: function() {
                this.data = null, this.list = null, this.item = null, this._timestamp = 0;
            },
            start: function() {},
            update: function(t) {
                this.data && this.timeLab.node.active && (this._timestamp += t, this._timestamp >= 1 && (this._timestamp = 0, 
                this._toTimeString()));
            },
            setLoc: function(t, e) {
                this.node.x = 0, this.node.y = -t * (this.node.height + e) - this.node.height / 2 - 5;
            },
            setInfo: function(t, e) {
                this.data = t, this.list = e;
                var i = ss.logic.goods.isUseing(t.id), s = ss.logic.goods.isBaging(t.id);
                this.useNode.active = i, this.bagNode.active = !i && s, this.selectNode.active = this.list.selectIndex == this.data.index;
                var o = ss.logic.config.getSheetData(ss.enum.sheet.goods, t.id), n = ss.logic.config.getSheetData(ss.enum.sheet.item, o.item_id);
                this.nameLab.string = "" + n.name, this.icon.spriteFrame = ss.logic.asset.getPacmanIcon(n.icon), 
                this.timeLab.node.active = s && n.time > 0, this.item = ss.data.getGoods(t.id), 
                this._toTimeString();
            },
            refresh: function() {
                this.selectNode.active = this.list.selectIndex == this.data.index;
            },
            select: function() {
                this.data && this.list && this.list.selectIndex != this.data.index && this.list.setSelectData(this.data);
            },
            _toTimeString: function() {
                if (this.item && !this.item.forever) {
                    var t = this.item.date - Date.now();
                    t = Math.max(0, t), this.timeLab.string = t > 864e5 ? "剩余时间：" + Math.ceil(t / 864e5) + "天" : "剩余时间：" + ss.dateUtils.time2countdownStr2(t);
                }
            }
        }), cc._RF.pop();
    }, {} ],
    GoodsLogic: [ function(t, e, i) {
        cc._RF.push(e, "3aaf3W/9ztNfKrNssgblABf", "GoodsLogic");
        var s = function() {
            this.default = {
                id: 20001,
                forever: !0,
                date: 0
            }, this.second = {
                id: 20002,
                forever: !0,
                date: 0
            }, this.current = 0, this.timeStamp = 0, this._goodsList = null, this.playing = !1;
        };
        s.prototype.init = function() {
            this.playing = !0, this._judgeCurr(), this._judgeAll();
        }, s.prototype.isDefault = function(t) {
            return this.default.id == t;
        }, s.prototype.addSecond = function() {
            this.add(this.second);
        }, s.prototype.add = function(t) {
            ss.logic.net.reqSetGoods({
                method: ss.enum.goodsMethod.add,
                item: t
            });
        }, s.prototype.use = function(t) {
            this.current = t.id, ss.logic.net.reqSetGoods({
                method: ss.enum.goodsMethod.use,
                item: t
            });
        }, s.prototype.remove = function(t) {
            t == this.current && this.use(this.default);
            var e = ss.data.getGoodsItems()[t];
            console.log("GoodsLogic remove:", e), e && ss.logic.net.reqSetGoods({
                method: ss.enum.goodsMethod.remove,
                item: e
            });
        }, s.prototype.update = function(t) {
            this.playing && (this.timeStamp += t, this.timeStamp >= 1 && (this.timeStamp = 0, 
            this._judgeAll()));
        }, s.prototype.timeout = function(t) {
            var e = ss.data.getGoodsItems()[t];
            return !e || !(!e || e.forever) && Date.now() > e.date;
        }, s.prototype.expire = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e5, i = ss.data.getGoodsItems()[t];
            return !(!i || i.forever) && Date.now() + e > i.date;
        }, s.prototype.compare = function(t) {
            var e = ss.logic.config.getSheetData(ss.enum.sheet.goods, this.current), i = ss.logic.config.getSheetData(ss.enum.sheet.goods, t);
            if (!e || !i) return null;
            var s = ss.logic.config.getSheetData(ss.enum.sheet.mode, e.extend_id || 0), o = ss.logic.config.getSheetData(ss.enum.sheet.mode, i.extend_id || 0);
            return {
                speed: o.speed - s.speed,
                addSpeed: o.addSpeed - s.addSpeed,
                duration: o.duration - s.duration,
                attr: o.attr - s.attr
            };
        }, s.prototype.judgeGet = function() {
            for (var t, e = void 0, i = void 0, s = this.getGoodsList(), o = 0, n = s.length; o < n; o++) if (t = s[o]) switch (e = ss.logic.config.getSheetData(ss.enum.sheet.goods, t.id), 
            i = ss.logic.config.getSheetData(ss.enum.sheet.item, e.item_id), e.cost_type) {
              case ss.enum.costType.invite:
                if (!ss.data.getGoods(t.id)) {
                    var a = e.extend_data;
                    a > 0 && ss.logic.invite.getInviteNum() >= a && (function(e, i) {
                        t = {
                            id: e,
                            forever: 0 == i,
                            date: Date.now() + 1e3 * i
                        }, ss.logic.goods.add(t);
                    }(t.id, i.time), ss.logic.tips.hint("累计邀请好友" + a + "位获得【<color=#FFA500>" + i.name + "</color>】！"));
                }
            }
        }, s.prototype.getGoodsList = function() {
            if (!this._goodsList) {
                this._goodsList = [];
                var t = ss.logic.open.isAudited(), e = ss.logic.config.getSheet(ss.enum.sheet.goods), i = void 0;
                for (var s in e) i = e[s], !t && i.is_audited > 0 || i.is_show && this._goodsList.push(i);
                this._goodsList.sort(function(t, e) {
                    return t.seat - e.seat;
                });
                for (var o = 0; o < this._goodsList.length; o++) (i = this._goodsList[o]).index = o;
            }
            return this._goodsList;
        }, s.prototype.getGoodsById = function(t) {
            for (var e, i = this.getGoodsList(), s = 0, o = i.length; s < o; s++) if ((e = i[s]).id == t) return e;
            return null;
        }, s.prototype.getTestIds = function() {
            for (var t, e = this.getGoodsList(), i = [], s = 0, o = e.length; s < o; s++) (t = e[s]).id != this.current && t.id != this.default.id && (ss.data.getGoods(t.id) || i.push(t.id));
            return i;
        }, s.prototype.getTestRandId = function() {
            var t = this.getTestIds();
            return t && t.length ? t[Math.floor(Math.random() * t.length)] : 0;
        }, s.prototype.getAllRandId = function() {
            var t = this.getGoodsList();
            return t && t.length ? t[Math.floor(Math.random() * t.length)].id : 20001;
        }, s.prototype.getItemPrice = function(t) {
            var e = 0, i = ss.data.isNewCost();
            switch (t.cost_type) {
              case ss.enum.costType.coin:
                e = i ? t.cost_coin2 : t.cost_coin;
                break;

              case ss.enum.costType.diamond:
                e = i ? t.cost_diamond2 : t.cost_diamond;
                break;

              default:
                console.warn("GoodsLogic getItemPrice cost_type error");
            }
            return e;
        }, s.prototype.getCurrId = function() {
            return this.current || this.default.id;
        }, s.prototype.isUseing = function(t) {
            return this.current == t;
        }, s.prototype.isBaging = function(t) {
            return !!ss.data.getGoods(t);
        }, s.prototype._judgeAll = function() {
            for (var t, e = ss.data.getGoodsItems(), i = Object.keys(e), s = i.length - 1; s >= 0; s--) e[t = i[s]] && this.timeout(t) && this.remove(t);
        }, s.prototype._judgeCurr = function() {
            this.current = ss.data.goods.current, this.current && !this.timeout(this.current) || this.use(this.default);
        }, e.exports = {
            GoodsLogic: s
        }, cc._RF.pop();
    }, {} ],
    GoodsView: [ function(t, e, i) {
        cc._RF.push(e, "9f879NTG91O2ppHlporgnun", "GoodsView"), cc.Class({
            extends: cc.Component,
            properties: {
                menuNode: cc.Node,
                modelNode: cc.Node,
                listNode: cc.Node,
                getBtn: cc.Node,
                useBtn: cc.Node,
                usedBtn: cc.Node,
                getMoneyBtn: cc.Node,
                moneyLab: cc.Label,
                getDiamondBtn: cc.Node,
                diamondLab: cc.Label
            },
            onLoad: function() {
                this.popUp = this.node.getComponent("PopUp"), this.menu = this.menuNode.getComponent("Menu"), 
                this.list = this.listNode.getComponent("ListComponent"), this.model = this.modelNode.getComponent("Model"), 
                this.data = null, this.currId = 0;
            },
            start: function() {
                this.node.active = !1, this.listNode.on("select", this._onListSelect, this), cc.systemEvent.on(ss.event.client.setGoods, this.setGoods, this);
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.data = t;
                var e = ss.commonUtils.clone(ss.config.popup);
                e.opacity = 255, this.popUp.show(e), this.menu.show(), ss.logic.goods.judgeGet();
                var i = ss.logic.goods.getCurrId(), s = ss.logic.goods.getGoodsById(i);
                this.list.setData(ss.logic.goods.getGoodsList()), s && this.list.setSelectData(s);
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.data = null, 
                this.popUp.close();
            },
            back: function() {
                this.data && this.data.from && cc.systemEvent.emit(ss.event.client.openView, {
                    type: this.data.from
                }), this.close();
            },
            setGoods: function(t) {
                this.node.active && (t.item.id == this.currId && this._judgeView(this.currId), this.list.setData(ss.logic.goods.getGoodsList()));
            },
            hadUsed: function() {
                ss.logic.tips.hint("皮肤已上阵！");
            },
            useItem: function() {
                if (this.currId) {
                    var t = ss.data.getGoods(this.currId);
                    if (t) {
                        if (ss.logic.goods.timeout(this.currId)) return ss.logic.tips.hint("皮肤已过期！"), ss.logic.goods.remove(this.currId), 
                        void this.getItem();
                        var e = ss.logic.config.getSheetData(ss.enum.sheet.goods, this.currId), i = ss.logic.config.getSheetData(ss.enum.sheet.item, e.item_id);
                        ss.logic.tips.hint("【<color=#FFA500>" + i.name + "</color>】上阵！"), ss.logic.goods.use(t), 
                        ss.logic.game.resetTest();
                    }
                }
            },
            getItem: function() {
                function t() {
                    e = {
                        id: i.currId,
                        forever: 0 == o.time,
                        date: Date.now() + 1e3 * o.time
                    }, ss.logic.tips.hint("获得【<color=#FFA500>" + o.name + "</color>】并上阵！"), ss.logic.goods.add(e), 
                    ss.logic.goods.use(e), ss.logic.game.resetTest();
                }
                if (this.currId) {
                    var e = ss.data.getGoods(this.currId);
                    if (!e) {
                        var i = this, s = ss.logic.config.getSheetData(ss.enum.sheet.goods, this.currId), o = ss.logic.config.getSheetData(ss.enum.sheet.item, s.item_id), n = ss.logic.goods.getItemPrice(s);
                        switch (s.cost_type) {
                          case ss.enum.costType.free:
                            break;

                          case ss.enum.costType.coin:
                            ss.logic.money.cost(ss.enum.money.coin, n, function(e) {
                                e.code == ss.enum.code.success ? t() : ss.logic.lottery.getLastTimes() > 0 ? (ss.logic.tips.hint("试试手气，获得更多金币吧！"), 
                                cc.systemEvent.emit(ss.event.client.openView, {
                                    type: ss.enum.view.lottery,
                                    from: null
                                })) : ss.logic.tips.hint("金币不足！");
                            }, !1);
                            break;

                          case ss.enum.costType.diamond:
                            ss.logic.money.cost(ss.enum.money.diamond, n, function(e) {
                                e.code == ss.enum.code.success ? t() : ss.logic.lottery.getLastTimes() > 0 ? (ss.logic.tips.hint("看看运气，获得更多钻石吧！"), 
                                cc.systemEvent.emit(ss.event.client.openView, {
                                    type: ss.enum.view.lottery,
                                    from: null
                                })) : ss.logic.open.isReadyVideo() ? (ss.logic.tips.hint("点击上面按钮获取钻石吧！"), i.menu.showAddDiamondEffect()) : ss.logic.tips.hint("钻石不足！");
                            }, !1);
                            break;

                          case ss.enum.costType.login:
                            ss.logic.info.isSecondCanSign() ? (ss.logic.tips.hint("签到领取皮肤吧！"), cc.systemEvent.emit(ss.event.client.openView, {
                                type: ss.enum.view.daily,
                                from: null
                            })) : ss.logic.tips.hint("第二天登录免费赠送！");
                            break;

                          case ss.enum.costType.video:
                            break;

                          case ss.enum.costType.invite:
                            cc.systemEvent.emit(ss.event.client.openView, {
                                type: ss.enum.view.invite,
                                from: null
                            });
                        }
                    }
                }
            },
            _onListSelect: function(t) {
                this._judgeView(t.id);
            },
            _judgeView: function(t) {
                this.currId = t, this.model.show({
                    id: t
                });
                var e = ss.logic.goods.isUseing(t), i = ss.logic.goods.isBaging(t);
                this.useBtn.active = !e && i, this.getBtn.active = !i, this.usedBtn.active = e;
                var s = ss.logic.config.getSheetData(ss.enum.sheet.goods, this.currId);
                switch (ss.logic.config.getSheetData(ss.enum.sheet.item, s.item_id), s.cost_type) {
                  case ss.enum.costType.free:
                    this.getBtn.active = !i, this.getMoneyBtn.active = !1, this.getDiamondBtn.active = !1;
                    break;

                  case ss.enum.costType.coin:
                    this.getBtn.active = !1, this.getDiamondBtn.active = !1, this.getMoneyBtn.active = !i, 
                    this.moneyLab.string = "" + ss.logic.goods.getItemPrice(s);
                    break;

                  case ss.enum.costType.diamond:
                    this.getBtn.active = !1, this.getMoneyBtn.active = !1, this.getDiamondBtn.active = !i, 
                    this.diamondLab.string = "" + ss.logic.goods.getItemPrice(s);
                    break;

                  case ss.enum.costType.login:
                  case ss.enum.costType.video:
                    this.getBtn.active = !i, this.getMoneyBtn.active = !1, this.getDiamondBtn.active = !1;
                    break;

                  case ss.enum.costType.invite:
                    this.getMoneyBtn.active = !1, this.getDiamondBtn.active = !1, this.getBtn.active = !i;
                }
            }
        }), cc._RF.pop();
    }, {} ],
    GoodsVo: [ function(t, e, i) {
        cc._RF.push(e, "27500PgA6pBbqd8Sby2Gg0/", "GoodsVo");
        var s = function() {
            this.reset();
        };
        s.prototype.reset = function() {
            this.current = 0, this.items = {}, this.newId = 1;
        }, e.exports = {
            GoodsVo: s
        }, cc._RF.pop();
    }, {} ],
    Grid: [ function(t, e, i) {
        cc._RF.push(e, "aabc3B3MsdBZb5xEbqZA7dD", "Grid");
        var s = t("./Cell"), o = function() {
            this.col = 0, this.row = 0, this.data = null, this.center = cc.v2(), this.showList = [], 
            this.innerList = [], this.outSideList = [], this.cells = new ss.Dictionary(), this.units = new ss.Dictionary(), 
            this._inside = null, this._halfMapW = 0, this._halfMapH = 0;
        };
        o.prototype.init = function(t) {
            var e, i, o, n, a = t.mapSize || cc.size(1e3, 1e3), r = t.gridSize || cc.size(100, 100), c = Math.ceil(a.width / r.width), h = Math.ceil(a.height / r.height);
            this.col = c, this.row = h, this.data = t, this.center.x = Math.floor(c / 2), this.center.y = Math.floor(h / 2);
            var l = t.inside, d = r.width, u = r.height, p = c * (d / 2), g = h * (u / 2);
            this._halfMapW = p, this._halfMapH = g, this._inside = l;
            for (var m = 0; m < h; m++) for (var f = 0; f < c; f++) e = 1e4 * f + m, (n = this.hasInner(f, m)) && (this.innerList.push(e), 
            this.outSideList.push(e)), i = cc.rect(f * d - p, m * u - g, d, u), o = new s.Cell(e, n, i), 
            this.cells.set(e, o);
        }, o.prototype.has = function(t, e) {
            return t >= 0 && t < this.col && e >= 0 && e < this.row;
        }, o.prototype.hasInner = function(t, e) {
            var i = this._inside;
            return i && t >= i.width && t + i.width < this.col && e >= i.height && e + i.height < this.row;
        }, o.prototype.getCell = function(t, e) {
            var i = 1e4 * t + e;
            return this.cells.get(i);
        }, o.prototype.getCellIdByInnerRand = function() {
            var t = this.innerList;
            return t[Math.floor(Math.random() * t.length)];
        }, o.prototype.getCellIdByOutSideRand = function() {
            var t = this.outSideList;
            return t[Math.floor(Math.random() * t.length)];
        }, o.prototype.getCellByOutSideRand = function() {
            var t = this.getCellIdByOutSideRand();
            return this.cells.get(t);
        }, o.prototype.getCenterCellId = function() {
            return this.getCell(this.center.x, this.center.y).id;
        }, o.prototype.show = function(t, e) {
            if (!(t < 0 || e < 0 || t >= this.col || e >= this.row)) {
                var i = this.getCell(t, e);
                if (i) {
                    i.show();
                    var s = i.id, o = this.showList.indexOf(s);
                    -1 == o && this.showList.push(s), this.hasInner(t, e) && (o = this.outSideList.indexOf(s)) > -1 && this.outSideList.splice(o, 1);
                }
            }
        }, o.prototype.hide = function(t, e) {
            if (!(t < 0 || e < 0 || t >= this.col || e >= this.row)) {
                var i = this.getCell(t, e);
                if (i) {
                    i.hide();
                    var s = i.id, o = this.showList.indexOf(s);
                    o > -1 && this.showList.splice(o, 1), this.hasInner(t, e) && -1 == (o = this.outSideList.indexOf(s)) && this.outSideList.push(s);
                }
            }
        }, o.prototype.addUnit = function(t, e, i) {
            var s = this.cells.get(e);
            s ? (this.units.set(t, i), i.setData({
                gid: e,
                cell: s,
                grid: this
            }), s.add(i)) : console.warn("addUnit no find cellId:", e);
        }, o.prototype.removeUnit = function(t) {
            var e = this.units.get(t);
            e && (this.units.remove(t), e.removeSelf());
        }, o.prototype.getUnit = function(t) {
            return this.units.get(t);
        }, o.prototype.removeAllUnits = function() {
            this.units.clear();
        }, o.prototype.getCellByLocalXY = function(t) {
            var e = this.toGridXY(t);
            return e ? this.getCell(e.x, e.y) : null;
        }, o.prototype.toGridXY = function(t) {
            var e = this.data.gridSize, i = this._halfMapW, s = this._halfMapH, o = cc.v2();
            return o.x = Math.floor((t.x + i) / e.width), o.y = Math.floor((t.y + s) / e.height), 
            o.x < 0 || o.x >= this.col || o.y < 0 || o.y >= this.row ? (console.warn("toGridXY no find grid:", t), 
            null) : (o.x = Math.min(Math.max(0, o.x), this.col - 1), o.y = Math.min(Math.max(0, o.y), this.row - 1), 
            o);
        }, o.prototype.toLocalXY = function(t) {
            var e = this.getCell(t.x, t.y);
            return e ? e.rect.center : cc.v2();
        }, o.prototype.reset = function() {
            for (var t, e = this.cells.values, i = 0, s = e.length; i < s; i++) (t = e[i]) && t.reset();
            this.showList.length = 0, this.outSideList = this.innerList.slice();
        }, o.prototype.clear = function() {
            for (var t, e = this.cells.values, i = 0, s = e.length; i < s; i++) (t = e[i]) && t.clear();
            this.units.clear(), this.showList.length = 0, this.outSideList.length = 0;
        }, e.exports = {
            Grid: o
        }, cc._RF.pop();
    }, {
        "./Cell": "Cell"
    } ],
    Group: [ function(t, e, i) {
        cc._RF.push(e, "0bb63hppkNE84FX58Slainx", "Group"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function() {}
        }), cc._RF.pop();
    }, {} ],
    HScrollMiniProgram: [ function(t, e, i) {
        cc._RF.push(e, "531457JX/RCVJhEAMwKBP1A", "HScrollMiniProgram"), cc.Class({
            extends: cc.Component,
            properties: {
                scrollViewNode: cc.Node,
                content: cc.Node,
                miniItemPreb: cc.Prefab,
                space: 10,
                timeRate: 80,
                showLen: 4
            },
            ctor: function() {
                this.data = null, this.isShow = !1, this.conentSrcXpos = 0, this.size = 0, this.items = [], 
                this.showList = [], this.timestamps = 0, this.cb = null;
            },
            onLoad: function() {},
            start: function() {
                this.data && this.data.length || (this.node.active = !1);
            },
            update: function(t) {
                this.isShow && (this.timestamps += t, this.timestamps > .5 && (this.timestamps = 0, 
                this._judgeCurShow()));
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                0 == this.conentSrcXpos && (this.conentSrcXpos = this.content.x), this.data = t, 
                this.cb = e, this.showList.length = 0, this._initItems(), this._judgeCurShow(), 
                this.isShow = !0;
            },
            _judgeCurShow: function() {
                if (this.data && this.data.length && this.node.active) {
                    var t = this.content.x - this.conentSrcXpos;
                    if (!(t > 5)) {
                        var e = Math.floor((Math.abs(t) + this.scrollViewNode.width) / (this.size + this.space / 2));
                        if (e = Math.min(e, this.data.length), !(this.showList.length >= e)) {
                            for (var i = [], s = 0; s < e; s++) null == this.showList[s] && (this.showList.push(this.data[s]), 
                            i.push(this.data[s]));
                            i.length && this.cb && this.cb(i);
                        }
                    }
                }
            },
            _miniCompleteCallBack: function() {
                console.log("_miniCompleteCallBack showAction"), this.showAction();
            },
            _miniStopCallBack: function() {
                this.stopAction();
            },
            _initItems: function() {
                if (this.data && this.data.length) {
                    for (var t = void 0, e = void 0, i = this.items.length, s = Math.max(this.data.length, i), o = 0; o < s; o++) if (o < this.data.length) {
                        if (o < i ? e = this.items[o] ? this.items[o].item : null : ((t = cc.instantiate(this.miniItemPreb)).parent = this.content, 
                        (e = t.getComponent("WiPaiMiniItem")) && this.items.push({
                            node: t,
                            item: e
                        })), t && 0 == this.size && (this.size = t.width), !e) return;
                        e.setData(this.data[o]), e.registerMiniCallBack(this._miniCompleteCallBack.bind(this), this._miniStopCallBack.bind(this));
                    } else (e = this.items[o]) && e.node && (e.node.active = !1);
                    this.node.active = !0, this.content.width = this.size * this.data.length + (this.data.length - 1) * this.space, 
                    this.gridLayout = this.content.getComponent(cc.Layout), this.gridLayout.updateLayout(), 
                    this.scrollView = this.scrollViewNode.getComponent(cc.ScrollView), this.scrollView.scrollToLeft(0), 
                    this.showAction();
                }
            },
            showAction: function() {
                var t = this;
                if (this.data) {
                    var e = this.data.length || 0;
                    if (!(e < this.showLen)) {
                        this.content.stopAllActions();
                        var i = -(this.size * e + (e - 1) * this.space) - this.conentSrcXpos - 5, s = Math.abs(i - this.content.x) / this.timeRate, o = Math.abs(i) / this.timeRate;
                        this.content.x - i < 5 && (s = 0, this.content.x = i);
                        var n = cc.sequence(cc.delayTime(1), cc.moveTo(s, i, 0), cc.delayTime(1), cc.moveTo(o, this.conentSrcXpos + this.space, 0), cc.delayTime(1), cc.callFunc(function() {
                            t.showAction();
                        }));
                        this.content.runAction(n);
                    }
                }
            },
            stopAction: function() {
                this.content.stopAllActions();
            },
            hide: function() {
                this.stopAction(), this.node.active = !1, this.isShow = !1;
            }
        }), cc._RF.pop();
    }, {} ],
    Hint: [ function(t, e, i) {
        cc._RF.push(e, "65633/0PGdKQ7udDxMyOls+", "Hint"), cc.Class({
            extends: cc.Component,
            properties: {
                bg: cc.Node,
                image: cc.Sprite,
                imgLabel: cc.Label,
                richText: cc.RichText,
                strLabel: cc.Label
            },
            ctor: function() {
                this.data = null, this.params = null, this.playing = !1;
            },
            onLoad: function() {
                this.richText.node.on(cc.Node.EventType.SIZE_CHANGED, this._labSizeChange, this), 
                this.strLabel.node.on(cc.Node.EventType.SIZE_CHANGED, this._labSizeChange, this);
            },
            start: function() {},
            init: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this.data = t, this.params = e, this.node.active = !0, this.node.stopAllActions(), 
                this.node.opacity = 255, this.node.setScale(.5, .5), this.node.setPosition(cc.v2());
                var i = t.param, s = i.msg.indexOf("color") > -1;
                this.richText.node.active = s, this.strLabel.node.active = !s, t.image ? (this.image.spriteFrame = i.image, 
                this.imgLabel.string = i.msg, this.richText.string = "") : (this.image.spriteFrame = null, 
                this.imgLabel.string = "", s ? this.richText.string = i.msg : this.strLabel.string = i.msg), 
                this._labSizeChange();
            },
            play: function() {
                this.playing = !0;
                var t = cc.sequence(cc.scaleTo(.1, 1), cc.moveTo(.35, cc.v2(0, 60)).easing(cc.easeBackOut(1)), cc.delayTime(.8), cc.fadeTo(.2, 1), cc.callFunc(this.onFinish, this));
                this.node.runAction(t);
            },
            onFinish: function() {
                this.data && this.data.tips.hideHint(this.data.id);
            },
            clear: function() {
                this.data = null, this.params = null, this.playing = !1, this.node.stopAllActions();
            },
            _labSizeChange: function() {
                if (this.data) {
                    var t = 300;
                    this.data.image || (t = this.richText.node.active ? this.richText.node.width + 30 : this.strLabel.node.width + 30), 
                    this.bg.width = Math.max(t, 300);
                }
            }
        }), cc._RF.pop();
    }, {} ],
    HttpConst: [ function(t, e, i) {
        cc._RF.push(e, "cfad2/AL+dBdpYbycCsNMTh", "HttpConst");
        var s = function() {};
        e.exports = {
            HttpConst: s
        }, s.HTTP_METHOD = {
            POST: "post",
            GET: "get"
        }, s.HTTP_CODE = {
            OK: 200,
            FAILED: 1e5,
            FUNC_NOT_EXIST: 100001,
            NOT_OBJECT: 100002,
            WX_FUNC_FAILD: 100003,
            RETURN_FORMAT_ERR: 100004
        }, cc._RF.pop();
    }, {} ],
    HttpManager: [ function(t, e, i) {
        cc._RF.push(e, "547a1JgARtGYb3SDiA4HvAH", "HttpManager");
        var s = function() {
            this.url = null, this.res = null;
        };
        s.prototype.initialize = function() {
            this.url = ss.proxy.game.url;
        }, s.prototype.setLoginRes = function(t) {
            this.res = t;
        }, s.prototype.login = function(t, e, i) {
            ss.custom.httpPost(this.url + "/auth/login", t, e, i);
        }, s.prototype.loginExt = function(t, e, i) {
            ss.custom.httpPost(this.url + "/auth/loginExt", t, e, i);
        }, s.prototype.getTaskData = function(t, e, i) {
            ss.custom.httpPost(this.url + "/game/get_data", t, e, i);
        }, s.prototype.getInviteData = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            if (this.res) {
                this.res;
                var s = ss.commonUtils.clone(ss.proxy.httpParams);
                s.show_all = t, ss.custom.httpPost(this.url + "/game/get_friends", s, e, i);
            }
        }, e.exports = {
            HttpManager: s
        }, cc._RF.pop();
    }, {} ],
    Hutu: [ function(t, e, i) {
        cc._RF.push(e, "a0845ehJQRAfo52yLVpYv6/", "Hutu");
        var s = function() {
            this.data = null, this.supermanSid = 0, this.gameMode = 0, this.pacmanSids = [ 1001, 1002, 1003, 1004 ], 
            this.ghostSids = [ 2001, 2002, 2003, 2004 ], this.tempNames = ss.config.nikeNames.slice(), 
            this.nikeNames = [], this.souler = new o(), this.soulCallBackFun = null, this.record = {}, 
            this.record[ss.enum.gameMode.solo] = {
                total: 0,
                win: 0,
                lose: 0,
                comb: 0
            }, this.record[ss.enum.gameMode.forever] = {
                total: 0,
                win: 0,
                lose: 0,
                comb: 0
            };
        };
        s.prototype.init = function(t, e) {
            this.data = t, this._randNames(), this.soulCallBackFun = e;
            var i = ss.data.misc.record;
            i && Object.keys(i).length && (this.record = i);
        }, s.prototype.create = function(t) {
            this.souler.reset(), this.gameMode = t.gameMode;
            var e = {}, i = null, s = 0, o = 0, n = null, a = [], r = {
                sid: 0,
                mid: 0,
                camp: 0
            }, c = ss.enum.gameCamp.normal, h = ss.enum.gameCamp.normal;
            a.length = 0;
            var l = this.data.pacman;
            i = l[this.gameMode];
            var d = "普罗米修斯";
            ss.proxy.userInfo && (d = ss.commonUtils.stringTruncate(ss.proxy.userInfo.nickName, 16)), 
            r.name = d, r.camp = c, r.sid = this.supermanSid, r.mid = t.gameData.test ? t.gameData.testId : t.gameData.currId, 
            a.push(r), o = l.num, this.nikeNames.length < o && this._randNames();
            var u, p = this._getAiIds(o);
            for (console.log("aiIds:", p), s = 0; s < o; s++) u = this.nikeNames.pop(), n = {
                sid: p[s],
                mid: ss.logic.goods.getAllRandId(),
                camp: s < 4 ? c : h,
                name: u
            }, a.push(n);
            for (e.pacman = a.slice(), e.pacmanForever = this._getPacmanForever(i), a.length = 0, 
            i = this.data.ghost[this.gameMode], o = ss.logic.open.isAudited() ? i.num : 0, s = 0; s < o; s++) n = {
                sid: this.ghostSids[Math.floor(Math.random() * this.ghostSids.length)],
                mid: 0
            }, a.push(n);
            e.ghost = a.slice();
            var g = this.data.pea;
            return o = g.num, i = ss.commonUtils.clone(g[this.gameMode]), e.pea = {
                num: o,
                data: i
            }, e;
        }, s.prototype.kill = function(t) {
            var e = this.souler.fristblood(), i = [];
            return t && (i = this.souler.excite()), i = e.concat(i), this.soulCallBackFun && this.soulCallBackFun(), 
            i;
        }, s.prototype.died = function() {
            this.souler.downcast(), this.soulCallBackFun && this.soulCallBackFun();
        }, s.prototype.getSoulerData = function() {
            return {
                kill: this.souler.killCount,
                died: this.souler.diedCount
            };
        }, s.prototype.getKillWord = function(t, e) {
            var i = 0;
            switch (t) {
              case ss.enum.killType.fristblood:
                i = 0;
                break;

              case ss.enum.killType.double_kill:
                i = 1;
                break;

              case ss.enum.killType.triple_kill:
                i = 2;
                break;

              case ss.enum.killType.ultrakill:
                i = 3;
                break;

              case ss.enum.killType.rampage:
                i = 4;
                break;

              case ss.enum.killType.killing_spree:
                i = 5;
                break;

              case ss.enum.killType.dominating:
                i = 6;
                break;

              case ss.enum.killType.megakill:
                i = 7;
                break;

              case ss.enum.killType.unstoppable:
                i = 8;
                break;

              case ss.enum.killType.whickedsick:
                i = 9;
                break;

              case ss.enum.killType.monsterkill:
                i = 10;
                break;

              case ss.enum.killType.godlike:
                i = 11;
                break;

              case ss.enum.killType.holyshit:
                i = 12;
                break;

              default:
                return null;
            }
            return {
                index: i,
                winName: e.winName,
                lostName: e.lostName
            };
        }, s.prototype.result = function(t) {
            var e = t.result, i = e.heroData, s = this._getStorge(this.gameMode);
            s.total++;
            var o = !1;
            switch (this.gameMode) {
              case ss.enum.gameMode.solo:
                o = e.finished && i && i.index <= 1;
                break;

              case ss.enum.gameMode.forever:
                o = e.finished;
            }
            o ? (s.win++, s.comb++) : (s.lose++, s.comb = Math.max(s.comb - 1, 0)), ss.logic.net.reqSetMisc({
                key: "record",
                value: this.record
            });
        }, s.prototype.getRandName = function() {
            return 0 == this.nikeNames.length && this._randNames(), this.nikeNames.pop();
        }, s.prototype._getAiIds = function(t) {
            var e = [], i = this._getStorge(this.gameMode).comb, s = [];
            s[0] = Math.max(t - 3 * i, 0), s[1] = i <= 3 ? 3 * i : Math.max(t - 3 * (i - 3), 0), 
            s[2] = i <= 3 || i >= 9 ? 0 : i <= 6 ? 3 * (i - 3) : Math.max(t - 3 * (i - 6), 0), 
            s[3] = i <= 6 ? 0 : Math.min(3 * (i - 6), t), s[4] = t;
            for (var o = 0, n = 0; o < s.length; o++) {
                n = Math.min(this.pacmanSids.length - 1, o);
                for (var a = 0; a < s[o] && (e.push(this.pacmanSids[n]), e.length != t); a++) ;
                if (e.length == t) break;
            }
            return e;
        }, s.prototype._randNames = function() {
            this.nikeNames = ss.commonUtils.arrayRandomSort(this.tempNames);
        }, s.prototype._getStorge = function(t) {
            var e = this.record[t];
            return e = e || {
                total: 0,
                win: 0,
                lose: 0,
                comb: 0
            };
        }, s.prototype._getPacmanForever = function(t) {
            var e = this._getStorge(this.gameMode), i = e ? e.win : 0;
            return t.num + i * t.step;
        }, e.exports = {
            Hutu: s
        };
        var o = function() {
            this.configs = {}, this.configs[ss.enum.killType.fristblood] = {
                type: ss.enum.killType.fristblood,
                grow: 5,
                link: 1,
                comb: 0,
                interval: 0
            }, this.configs[ss.enum.killType.double_kill] = {
                type: ss.enum.killType.double_kill,
                grow: 0,
                link: 2,
                comb: 1,
                interval: 3500
            }, this.configs[ss.enum.killType.triple_kill] = {
                type: ss.enum.killType.triple_kill,
                grow: 0,
                link: 3,
                comb: 2,
                interval: 3500
            }, this.configs[ss.enum.killType.ultrakill] = {
                type: ss.enum.killType.ultrakill,
                grow: 0,
                link: 4,
                comb: 3,
                interval: 3500
            }, this.configs[ss.enum.killType.rampage] = {
                type: ss.enum.killType.rampage,
                grow: 0,
                link: 5,
                comb: 4,
                interval: 800
            }, this.configs[ss.enum.killType.killing_spree] = {
                type: ss.enum.killType.killing_spree,
                grow: 0,
                link: 3,
                comb: 0,
                interval: 0
            }, this.configs[ss.enum.killType.dominating] = {
                type: ss.enum.killType.dominating,
                grow: 0,
                link: 4,
                comb: 0,
                interval: 0
            }, this.configs[ss.enum.killType.megakill] = {
                type: ss.enum.killType.megakill,
                grow: 0,
                link: 5,
                comb: 0,
                interval: 0
            }, this.configs[ss.enum.killType.unstoppable] = {
                type: ss.enum.killType.unstoppable,
                grow: 0,
                link: 6,
                comb: 0,
                interval: 0
            }, this.configs[ss.enum.killType.whickedsick] = {
                type: ss.enum.killType.whickedsick,
                grow: 0,
                link: 7,
                comb: 0,
                interval: 0
            }, this.configs[ss.enum.killType.monsterkill] = {
                type: ss.enum.killType.monsterkill,
                grow: 0,
                link: 8,
                comb: 0,
                interval: 0
            }, this.configs[ss.enum.killType.godlike] = {
                type: ss.enum.killType.godlike,
                grow: 0,
                link: 9,
                comb: 0,
                interval: 0
            }, this.configs[ss.enum.killType.holyshit] = {
                type: ss.enum.killType.holyshit,
                grow: 0,
                link: 10,
                comb: 0,
                interval: 0
            }, this.costs_comb = [ ss.enum.killType.double_kill, ss.enum.killType.triple_kill, ss.enum.killType.ultrakill, ss.enum.killType.rampage ], 
            this.costs_link = [ ss.enum.killType.killing_spree, ss.enum.killType.dominating, ss.enum.killType.megakill, ss.enum.killType.unstoppable, ss.enum.killType.whickedsick, ss.enum.killType.monsterkill, ss.enum.killType.godlike, ss.enum.killType.holyshit ], 
            this.frist = 0, this.link = 0, this.comb = 0, this.timestamp = 0, this.killCount = 0, 
            this.diedCount = 0;
        };
        o.prototype.reset = function() {
            this.frist = 0, this.link = 0, this.comb = 0, this.timestamp = 0, this.killCount = 0, 
            this.diedCount = 0;
        }, o.prototype.fristblood = function() {
            return 1 == ++this.frist ? [ this.configs[ss.enum.killType.fristblood] ] : [];
        }, o.prototype.excite = function() {
            var t = [], e = Date.now();
            0 == this.timestamp && (this.timestamp = e);
            var i, s, o, n = e - this.timestamp, a = this.comb + 1;
            for (this.killCount++, this.link++, i = this.costs_link.length - 1; i >= 0; i--) if (s = this.costs_link[i], 
            o = this.configs[s], this.link >= o.link) {
                t.push(o);
                break;
            }
            for (i = this.costs_comb.length - 1; i >= 0; i--) if (s = this.costs_comb[i], o = this.configs[s], 
            this.link >= o.link && a >= o.comb) {
                n <= o.interval ? (this.comb = a, t.push(o)) : this.comb = 0;
                break;
            }
            return this.timestamp = e, t;
        }, o.prototype.downcast = function() {
            this.diedCount++, this.link = 0, this.comb = 0, this.timestamp = 0;
        }, cc._RF.pop();
    }, {} ],
    InfoLogic: [ function(t, e, i) {
        cc._RF.push(e, "728beFcztZChIKepSRdzKu+", "InfoLogic");
        var s = function() {
            this.CONST_GAP_DAY = 7, this.CONST_SECOND_DAY = 2e3, this.openForever = {
                num: 0,
                kill: 0,
                count: 0
            }, this.openCallBack = null;
        };
        s.prototype.init = function() {
            this._judgeDaily(), this._judgeForever();
        }, s.prototype.isCanSign = function() {
            var t = ss.data.info, e = ss.dateUtils.getZeroTime();
            return t.zero || (t.zero = 0), Math.max(0, (e - t.zero) / 864e5) >= 1 || !t.sign;
        }, s.prototype.isSecondCanSign = function() {
            var t = ss.data.info;
            return 1 == (t.loginNum ? t.loginNum : 0) && this.isCanSign();
        }, s.prototype.getAwardData = function() {
            var t = ss.data.info;
            return t.loginNum || (t.loginNum = 0), this._getLoginData(t.loginNum + 1);
        }, s.prototype.signDaily = function() {
            var t = ss.data.info;
            t.sign = !0, t.zero = ss.dateUtils.getZeroTime(), t.loginNum || (t.loginNum = 0), 
            t.loginNum++, ss.logic.storage.saveInfo(), this._judgeDaily();
        }, s.prototype._judgeDaily = function() {
            var t = this.isCanSign() ? 1 : 0;
            cc.systemEvent.emit(ss.event.client.setRed, {
                type: ss.enum.redType.daily,
                num: t
            });
        }, s.prototype._getLoginData = function(t) {
            var e = 0, i = !1, s = [];
            2 == (t = Math.max(1, t)) ? (e = this.CONST_SECOND_DAY, i = !0) : 0 == (e = t % this.CONST_GAP_DAY) && (e = this.CONST_GAP_DAY);
            for (var o, n = ss.logic.config.getSheetData(ss.enum.sheet.daily, e), a = (n && n.value ? n.value : "10001&50_10002&20_10003&1").split("_"), r = 0; r < a.length; r++) o = a[r].split("&"), 
            s.push({
                id: o[0],
                num: parseInt(o[1]),
                second: i
            });
            return s;
        }, s.prototype._judgeForever = function() {
            var t = ss.data.misc.openForever;
            t && (this.openForever.num = t.num || 0, this.openForever.kill = t.kill || 0, this.openCallBack && this.openCallBack());
        }, s.prototype.setOpenForeverData = function(t, e) {
            var i = !1;
            e >= ss.config.openForever.num && (this.openForever.kill = Math.max(this.openForever.kill, e), 
            i = !0), t && (this.openForever.num++, i = !0), i && (this.isOpenForever() && this.openForever.count++, 
            ss.logic.net.reqSetMisc({
                key: "openForever",
                value: this.openForever
            })), console.log("setOpenForeverData:", this.openForever);
        }, s.prototype.getOpenForeverData = function() {
            return this.openForever;
        }, s.prototype.isOpenForever = function() {
            var t = ss.config.openForever;
            return this.openForever.num >= t.num || this.openForever.kill >= t.kill;
        }, s.prototype.isFristOpenForever = function() {
            return 1 == this.openForever.count;
        }, e.exports = {
            InfoLogic: s
        }, cc._RF.pop();
    }, {} ],
    InfoVo: [ function(t, e, i) {
        cc._RF.push(e, "009a8TehIhOSLheOVIHQEgd", "InfoVo");
        var s = function() {
            this.reset();
        };
        s.prototype.reset = function() {
            this.zero = 0, this.sign = !1, this.loginNum = 0, this.newId = 1;
        }, e.exports = {
            InfoVo: s
        }, cc._RF.pop();
    }, {} ],
    InviteItem: [ function(t, e, i) {
        cc._RF.push(e, "4ecc7Z9BPVCeLddMGbzD5pC", "InviteItem"), cc.Class({
            extends: cc.Component,
            properties: {
                icon: cc.Sprite,
                nameLab: cc.Label,
                coinNode: cc.Node,
                coinLab: cc.Label,
                shareNode: cc.Node,
                getNode: cc.Node,
                usedNode: cc.Node,
                addFriendFrame: cc.SpriteFrame
            },
            onLoad: function() {
                this.data = null, this.list = null, this.item = null, this._timestamp = 0;
            },
            start: function() {},
            update: function(t) {},
            setLoc: function(t, e) {
                this.node.x = 0, this.node.y = -t * (this.node.height + e) - this.node.height / 2 - 5;
            },
            setInfo: function(t, e) {
                switch (this.data = t, this.list = e, t.state) {
                  case ss.enum.inviteState.normal:
                    this.nameLab.node.active = !1, this.coinNode.active = !0, this.shareNode.active = !0, 
                    this.getNode.active = !1, this.usedNode.active = !1;
                    break;

                  case ss.enum.inviteState.getted:
                    this.nameLab.node.active = !0, this.coinNode.active = !1, this.shareNode.active = !1, 
                    this.getNode.active = !1, this.usedNode.active = !0;
                    break;

                  case ss.enum.inviteState.complete:
                    this.nameLab.node.active = !0, this.coinNode.active = !1, this.shareNode.active = !1, 
                    this.getNode.active = !0, this.usedNode.active = !1;
                }
                var i = t.data;
                i ? (this.nameLab.string = "" + ss.commonUtils.stringTruncate(i.nickName, 16), this._updateAvatar(i.avatarUrl), 
                this.icon.node.setContentSize(80, 80)) : (this.icon.spriteFrame = this.addFriendFrame, 
                this.icon.node.setContentSize(63, 64)), this.coinLab.string = "" + t.awardNum;
            },
            share: function() {
                ss.logic.open.shareBase(ss.config.shareIds.invite);
            },
            getAward: function() {
                this.data && this.data.state == ss.enum.inviteState.complete && ss.logic.invite.acceptAward(this.data);
            },
            usedAward: function() {
                ss.logic.tips.hint("奖励已领取！");
            },
            _updateAvatar: function(t) {
                var e = this;
                ss.commonUtils.isValidValue(t) && "" != t && cc.loader.load({
                    url: t,
                    type: "png"
                }, function(t, i) {
                    if (i) {
                        var s = new cc.SpriteFrame(i);
                        e.icon.spriteFrame = s;
                    }
                });
            }
        }), cc._RF.pop();
    }, {} ],
    InviteLogic: [ function(t, e, i) {
        cc._RF.push(e, "92fe5fw98NEUKYKEbnLsfx+", "InviteLogic");
        var s = function() {
            this.serverDataList = [], this.index = 10, this.updateViewsCallback = null, this.playing = !1, 
            this.inviteNum = 0, this.timestamps = 0, this.addtimestamps = 0;
        };
        s.prototype.init = function() {
            this.playing = !0;
            var t = ss.data.misc.inviteNum;
            t || (t = 0), this.inviteNum = t, this.getInitInivteData();
        }, s.prototype.update = function(t) {
            ss.state.isPlaying() || this.playing && (this.timestamps += t, this.timestamps > 120 && (this.timestamps = 0, 
            this.getAddInivteData()));
        }, s.prototype.addUpdateViewsCallback = function(t) {
            this.updateViewsCallback = t;
        }, s.prototype.getInitInivteData = function() {
            ss.state.isPreving() && ss.http.getInviteData(!0, this.getInviteCallbackOk.bind(this), this.getInviteCallbackFail.bind(this));
        }, s.prototype.getAddInivteData = function() {
            if (ss.state.isPreving()) {
                var t = Date.now();
                t - this.addtimestamps < 6e4 || (this.addtimestamps = t, ss.http.getInviteData(!1, this.getInviteCallbackOk.bind(this), this.getInviteCallbackFail.bind(this)));
            }
        }, s.prototype.getInviteCallbackOk = function(t) {
            var e = t;
            if ("string" == typeof t && (e = JSON.parse(t)), e && 200 == e.err_code) {
                var i = e.data;
                i && "" != i && ("string" == typeof i && (i = JSON.parse(i)), i.hasOwnProperty("friends") && i.friends.length > 0 && (this.serverDataList = this.serverDataList.concat(i.friends), 
                this.serverDataList.sort(function(t, e) {
                    return t.index - e.index;
                }), this.updateInivteViews(), this._checkRed()));
            }
        }, s.prototype.updateInivteViews = function() {
            this.updateViewsCallback && this.updateViewsCallback();
        }, s.prototype.getInviteCallbackFail = function(t) {
            console.warn("getInviteCallbackFail:", t);
        }, s.prototype.getInivteData = function() {
            for (var t, e = [], i = this._getInivteMaxNum(), s = 0; s < i; s++) (t = {}).id = s, 
            t.rank = s + 1, t.awardNum = this._getInivteAwardData(s + 1), t.data = this._fillDataFromServer(s), 
            t.state = this._getInivteState(t.data), e.push(t);
            var o = [], n = [], a = [];
            for (s = 0; s < e.length; s++) e[s].state == ss.enum.inviteState.complete ? o.push(e[s]) : e[s].state == ss.enum.inviteState.getted ? n.push(e[s]) : a.push(e[s]);
            o.sort(function(t, e) {
                return t.rank - e.rank;
            }), a.sort(function(t, e) {
                return t.rank - e.rank;
            }), n.sort(function(t, e) {
                return t.rank - e.rank;
            });
            var r = o.concat(a);
            for (r = r.concat(n), s = 0; s < r.length; s++) r[s].id = s, r[s].index = s;
            return r;
        }, s.prototype.acceptAward = function(t) {
            ss.logic.tips.hint("金币 +" + t.awardNum), ss.logic.money.simpleAdd(ss.enum.money.coin, t.awardNum), 
            t.state = ss.enum.inviteState.getted, this.storageDatas(t.data.uid), this.updateInivteViews();
        }, s.prototype.storageDatas = function(t) {
            var e = ss.data.misc.invite || {};
            e[t] = ss.enum.inviteState.getted, ss.logic.net.reqSetMisc({
                key: "invite",
                value: e
            }), this._checkRed();
        }, s.prototype.getInviteNum = function() {
            return console.log("getInviteNum:", this.inviteNum), this.inviteNum;
        }, s.prototype._checkRed = function() {
            for (var t = this.getInivteData(), e = 0, i = 0, s = 0; s < t.length; s++) switch (t[s].state) {
              case ss.enum.inviteState.complete:
                e++, i++;
                break;

              case ss.enum.inviteState.getted:
                i++;
            }
            this.inviteNum = i;
            var o = ss.data.misc.inviteNum;
            o || (o = 0), console.log("_checkRed:", this.inviteNum), i > o && ss.logic.net.reqSetMisc({
                key: "inviteNum",
                value: this.inviteNum
            }), cc.systemEvent.emit(ss.event.client.setRed, {
                type: ss.enum.redType.invite,
                num: e
            });
        }, s.prototype._getInivteAwardData = function(t) {
            return ss.config.invite.coin;
        }, s.prototype._getInivteMaxNum = function() {
            return ss.config.invite.max;
        }, s.prototype._fillDataFromServer = function(t) {
            for (var e = 0; e < this.serverDataList.length; e++) if (this.serverDataList[e].index == t) return this.serverDataList[e];
            return null;
        }, s.prototype._getInivteState = function(t) {
            return t ? ss.commonUtils.isValidValue(ss.data.misc.invite) && ss.data.misc.invite[t.uid] == ss.enum.inviteState.getted ? ss.enum.inviteState.getted : ss.enum.inviteState.complete : ss.enum.inviteState.normal;
        }, e.exports = {
            InviteLogic: s
        }, cc._RF.pop();
    }, {} ],
    InviteView: [ function(t, e, i) {
        cc._RF.push(e, "3444avePjRHULUt5vsRUaOO", "InviteView"), cc.Class({
            extends: cc.Component,
            properties: {
                menuNode: cc.Node,
                listNode: cc.Node
            },
            onLoad: function() {
                this.popUp = this.node.getComponent("PopUp"), this.menu = this.menuNode.getComponent("Menu"), 
                this.list = this.listNode.getComponent("ListComponent"), this.data = null;
            },
            start: function() {
                this.node.active = !1, ss.logic.invite.addUpdateViewsCallback(this._updateListData.bind(this));
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.data = t;
                var e = ss.commonUtils.clone(ss.config.popup);
                e.opacity = 255, this.popUp.show(e), this.menu.show(), this._updateListData(), ss.logic.invite.getAddInivteData(), 
                ss.logic.tips.hint("好友点击邀请后才能领取奖励哦！");
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.data = null, 
                this.popUp.close();
            },
            back: function() {
                this.data && this.data.from && cc.systemEvent.emit(ss.event.client.openView, {
                    type: this.data.from
                }), this.close();
            },
            share: function() {
                ss.logic.open.shareBase(ss.config.shareIds.invite);
            },
            _updateListData: function() {
                this.list.setData(ss.logic.invite.getInivteData());
            }
        }), cc._RF.pop();
    }, {} ],
    ItemLogic: [ function(t, e, i) {
        cc._RF.push(e, "35f09h6VQ5PBIJvYV2oc4G5", "ItemLogic"), e.exports = {
            ItemLogic: function() {}
        }, cc._RF.pop();
    }, {} ],
    Joystick: [ function(t, e, i) {
        cc._RF.push(e, "e67cd2Y08RLU7PxcNEY3JKm", "Joystick");
        var s = {
            TouchType: cc.Enum({
                DEFAULT: 0,
                FOLLOW: 1
            }),
            DirectionType: cc.Enum({
                FOUR: 4,
                EIGHT: 8,
                ALL: 0
            })
        };
        cc.Class({
            extends: cc.Component,
            properties: {
                dot: {
                    default: null,
                    type: cc.Node,
                    displayName: "摇杆节点"
                },
                ring: {
                    default: null,
                    type: cc.Node,
                    displayName: "摇杆背景节点"
                },
                touchType: {
                    default: s.TouchType.DEFAULT,
                    type: s.TouchType,
                    displayName: "触摸类型"
                },
                directionType: {
                    default: s.DirectionType.ALL,
                    type: s.DirectionType,
                    displayName: "方向类型"
                },
                step: {
                    default: 1,
                    displayName: "位移"
                },
                tick: {
                    default: 1,
                    displayName: "位移间隔(毫秒)"
                },
                moveEvents: {
                    default: [],
                    type: cc.Component.EventHandler,
                    displayName: "位移回调"
                }
            },
            ctor: function() {
                this.pressed = !1, this.angle = 9999, this.pressTicks = 0, this.moveStep = 1, this.addStep = 0, 
                this.playing = !1;
            },
            onLoad: function() {
                this.moveTick = this.tick / 1e3, this.moveStep = this.step, this._initTouchEvent();
            },
            play: function() {
                this.playing = !0;
            },
            stop: function() {
                this.playing = !1, this._resetJoystick();
            },
            setAddStep: function(t) {
                this.addStep = t;
            },
            _initTouchEvent: function() {
                this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this), 
                this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
            },
            _touchStartEvent: function(t) {
                if (this._resetJoystick(), this.node.active) if (this.pressed = !0, this.touchType == s.TouchType.FOLLOW) {
                    var e = this.node.convertToNodeSpaceAR(t.getLocation());
                    this.ring.setPosition(e);
                } else {
                    var i = this.dot.getBoundingBoxToWorld();
                    this.pressed = !0, i.contains(t.getLocation()) || this._processMoveDot(t);
                }
            },
            _touchMoveEvent: function(t) {
                this.node.active && this._processMoveDot(t);
            },
            _touchEndEvent: function() {
                this.node.active && this._resetJoystick();
            },
            _getCurrMoveStep: function() {
                var t = this.addStep + this.moveStep;
                return Math.max(0, t);
            },
            update: function(t) {
                this.node.active && this.playing && this.pressed && 9999 != this.angle && (this.pressTicks += t, 
                this.pressTicks > this.moveTick && (this._updateMove(this.angle), this.pressTicks = 0));
            },
            _processMoveDot: function(t) {
                if (!this.pressed) return !1;
                var e = this.ring.convertToNodeSpaceAR(t.getLocation()), i = Math.sqrt(Math.pow(e.x, 2) + Math.pow(e.y, 2)), o = e.x, n = e.y, a = this._calcAngle(o, n), r = (this.ring.width - this.dot.width) / 2;
                if (r > i && this.directionType == s.DirectionType.ALL) this.dot.setPosition(cc.v2(o, n)); else {
                    var c = Math.PI / 180 * a, h = Math.cos(c) * r, l = Math.sin(c) * r;
                    this.dot.setPosition(cc.v2(h, l));
                }
                if (i < 15) return !1;
                this.angle != a && (this.angle = a);
            },
            _resetJoystick: function() {
                this.dot.setPosition(cc.v2(0, 0)), this.pressed = !1, this.angle = 9999, this.pressTicks = 0;
            },
            _calcAngle: function(t, e) {
                var i = Math.atan2(e, t) * (180 / Math.PI);
                switch (this.directionType) {
                  case s.DirectionType.FOUR:
                    return ss.dirUtils.calcFourDirectionsAngle(i);

                  case s.DirectionType.EIGHT:
                    return ss.dirUtils.calcEightDirectionsAngle(i);
                }
                return i;
            },
            _updateMove: function(t) {
                if (9999 != t) {
                    var e = cc.v2(), i = this._getCurrMoveStep();
                    switch (this.directionType) {
                      case s.DirectionType.FOUR:
                        e = ss.dirUtils.fourDirectionsMove(t, i);
                        break;

                      case s.DirectionType.EIGHT:
                        e = ss.dirUtils.eightDirectionsMove(t, i);
                        break;

                      case s.DirectionType.ALL:
                        e = ss.dirUtils.allDirectionsMove(t, i);
                    }
                    var o = {
                        v2: e,
                        angle: t
                    };
                    cc.Component.EventHandler.emitEvents(this.moveEvents, o), this.node.emit("move", o);
                }
            }
        }), cc._RF.pop();
    }, {} ],
    Juggler: [ function(t, e, i) {
        cc._RF.push(e, "0fd34ckp2pICaDkdeLvj8SX", "Juggler");
        var s = function() {
            this.mObjects = [];
        };
        (s.prototype = {
            get objects() {
                return this.mObjects;
            }
        }).add = function(t) {
            t && -1 == this.mObjects.indexOf(t) && (this.mObjects[this.mObjects.length] = t);
        }, s.prototype.contains = function(t) {
            return -1 != this.mObjects.indexOf(t);
        }, s.prototype.remove = function(t) {
            if (null != t) {
                var e = this.mObjects.indexOf(t);
                -1 != e && (this.mObjects[e] = null);
            }
        }, s.prototype.purge = function() {
            for (var t = this.mObjects.length - 1; t >= 0; --t) this.mObjects[t] = null;
        }, s.prototype.advanceFrame = function(t, e) {
            var i, s = this.mObjects.length, o = 0;
            if (0 != s) {
                for (i = 0; i < s; ++i) {
                    var n = this.mObjects[i];
                    n && (o != i && (this.mObjects[o] = n, this.mObjects[i] = null), n.advanceFrame(t, e), 
                    ++o);
                }
                if (o != i) {
                    for (s = this.mObjects.length; i < s; ) this.mObjects[o++] = this.mObjects[i++];
                    this.mObjects.length = o;
                }
            }
        }, e.exports = {
            Juggler: s
        }, cc._RF.pop();
    }, {} ],
    Kill: [ function(t, e, i) {
        cc._RF.push(e, "6c79b4BVhdOWqu1aeHsQ0Jf", "Kill"), cc.Class({
            extends: cc.Component,
            properties: {
                winLab: cc.Label,
                loseLab: cc.Label,
                killSprite: cc.Sprite,
                wordSprite: cc.Sprite,
                wordFrames: [ cc.SpriteFrame ]
            },
            ctor: function() {
                this.data = null, this.params = null, this.playing = !1;
            },
            onLoad: function() {
                this.winLab.node.on(cc.Node.EventType.SIZE_CHANGED, this._labSizeChange, this), 
                this.loseLab.node.on(cc.Node.EventType.SIZE_CHANGED, this._labSizeChange, this);
            },
            start: function() {},
            init: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this.data = t, this.params = e, this.node.active = !0, this.node.stopAllActions(), 
                this.node.opacity = 255, this.node.setScale(.5, .8), this.node.setPosition(cc.v2());
                var i = t.param.msg;
                this.winLab.string = i.winName + "", this.loseLab.string = i.lostName + "", this.wordSprite.spriteFrame = this.wordFrames[i.index], 
                this._labSizeChange();
            },
            play: function() {
                this.playing = !0;
                var t = cc.sequence(cc.scaleTo(.2, 1.2, 1.2), cc.scaleTo(.1, 1, 1), cc.delayTime(.8), cc.fadeTo(.2, 1), cc.callFunc(this.onFinish, this));
                this.node.runAction(t);
            },
            onFinish: function() {
                this.data && this.data.tips.hideKill(this.data.id);
            },
            clear: function() {
                this.data = null, this.params = null, this.playing = !1, this.node.stopAllActions();
            },
            _labSizeChange: function() {
                if (this.data) {
                    var t = this.winLab.node.width + this.loseLab.node.width + this.killSprite.node.width + this.wordSprite.node.width + 60;
                    this.winLab.node.x = -t / 2 + this.winLab.node.width / 2 + 15, this.killSprite.node.x = this.winLab.node.x + this.winLab.node.width / 2 + 10, 
                    this.loseLab.node.x = this.killSprite.node.x + this.killSprite.node.width + this.loseLab.node.width / 2 + 10, 
                    this.wordSprite.node.x = this.loseLab.node.x + this.loseLab.node.width / 2 + 10, 
                    this.node.width = Math.max(t, 300);
                }
            }
        }), cc._RF.pop();
    }, {} ],
    LeaderboardMessage: [ function(t, e, i) {
        cc._RF.push(e, "9c424zupRZE+ZN0zQR9YLfp", "LeaderboardMessage");
        var s = function() {};
        e.exports = {
            LeaderboardMessage: s
        }, s.prototype.userLogin = function(t, e, i, s) {
            wx.postMessage({
                route: "user.login",
                data: {
                    uid: t,
                    nickName: e,
                    avatarUrl: i
                },
                success: function(t) {
                    s && s(!0, t);
                },
                fail: function(t) {
                    s && s(!1, t);
                }
            });
        }, s.prototype.refreshFriendRank = function(t, e) {
            wx.postMessage({
                route: "rank.refreshFriends",
                data: {
                    rankId: t
                },
                success: function(t) {
                    e && e(!0, t);
                },
                fail: function(t) {
                    e && e(!1, t);
                }
            });
        }, s.prototype.updateRankScore = function(t, e, i) {
            wx.postMessage({
                route: "rank.updateCmpScore",
                data: {
                    rankId: t,
                    data: e,
                    timestamp: Date.now()
                },
                success: function(t) {
                    i && i(!0, t);
                },
                fail: function(t) {
                    i && i(!1, t);
                }
            });
        }, s.prototype.draw = function(t, e, i) {
            wx.postMessage({
                route: "rankView.draw",
                data: {
                    viewId: t,
                    param: e
                },
                success: function(t) {
                    i && i(!0, t);
                },
                fail: function(t) {
                    i && i(!1, t);
                }
            });
        }, s.prototype.turnRankPage = function(t, e, i) {
            wx.postMessage({
                route: "rankView.turnPage",
                data: {
                    viewId: t,
                    count: e
                },
                success: function(t) {
                    i && i(!0, t);
                },
                fail: function(t) {
                    i && i(!1, t);
                }
            });
        }, s.prototype.beginBeyond = function(t, e) {
            wx.postMessage({
                route: "rankView.beginBeyond",
                data: {
                    viewId: t
                },
                success: function(t) {
                    e && e(!0, t);
                },
                fail: function(t) {
                    e && e(!1, t);
                }
            });
        }, cc._RF.pop();
    }, {} ],
    Leaderboard: [ function(t, e, i) {
        cc._RF.push(e, "4d14bXebWJPsLU1N00kd2oS", "Leaderboard");
        var s = t("./LeaderboardMessage"), o = function() {
            this.message = new s.LeaderboardMessage();
        }, n = null;
        o.getInstance = function() {
            return null == n && (n = new o()), n;
        }, e.exports = {
            Leaderboard: o
        }, o.prototype.init = function(t, e, i, s) {
            this.message.userLogin(t, e, i, s);
        }, o.prototype.updateRankOneKey = function(t, e, i) {
            this.message.updateRankScore(t, {
                score1: Number(e)
            }, i);
        }, o.prototype.updateRankTwoKey = function(t, e, i, s) {
            this.message.updateRankScore(t, {
                score1: Number(e),
                score2: Number(i)
            }, s);
        }, o.prototype.refreshFriendRank = function(t, e) {
            this.message.refreshFriendRank(t, e);
        }, o.prototype.drawRankView = function(t, e, i) {
            "undefined" !== e && null != e || (e = !0), this.message.draw(t, {
                isReturn: e
            }, i);
        }, o.prototype.lastRankPage = function(t, e) {
            this.message.turnRankPage(t, -1, e);
        }, o.prototype.nextRankPage = function(t, e) {
            this.message.turnRankPage(t, 1, e);
        }, o.prototype.drawRangeView = function(t, e) {
            this.message.draw(t, {}, e);
        }, o.prototype.beginBeyond = function(t, e) {
            this.message.turnRankPage(t, 1, e);
        }, o.prototype.beyondOneKey = function(t, e, i) {
            this.message.draw(t, {
                beyondData: {
                    score1: e
                }
            }, i);
        }, o.prototype.beyondTwoKey = function(t, e, i, s) {
            this.message.draw(t, {
                beyondData: function(t, e, i) {
                    return e in t ? Object.defineProperty(t, e, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[e] = i, t;
                }({
                    score1: e
                }, "score1", i)
            }, s);
        }, cc._RF.pop();
    }, {
        "./LeaderboardMessage": "LeaderboardMessage"
    } ],
    ListComponent: [ function(t, e, i) {
        cc._RF.push(e, "e5e32m3XdlFq5BrZyzgV5+g", "ListComponent"), cc.Class({
            extends: cc.Component,
            properties: {
                content: cc.Node,
                view: cc.Node,
                list: cc.Prefab,
                direction: !0,
                itemSpace: 5,
                typeName: "list",
                gap: 5
            },
            onLoad: function() {
                this.initCtrl(), this.getItemConfig(), this.initScrollView();
            },
            initCtrl: function() {
                this.itemHeight = 45, this.itemWidth = 210, this.Continue = !0, this.initScuccess = !1, 
                this.startIndex = 0, this.endIndex = 0, this.itemList = [], this.preNum = 0, this.selectIndex = -1, 
                this.selectData = null;
            },
            start: function() {},
            getItemConfig: function() {
                var t = cc.instantiate(this.list);
                this.itemHeight = t.height, this.itemWidth = t.width, t.destroy();
            },
            initScrollView: function() {
                var t = Math.ceil(this.view.height / (this.itemHeight + this.itemSpace));
                this.direction ? (t = Math.ceil(this.view.width / (this.itemWidth + this.itemSpace)), 
                this.content.width = (this.itemWidth + this.itemSpace) * (t + 2) + 2 * this.gap, 
                this.content.height = this.view.height, this.content.anchorX = 0, this.content.x = -this.view.width / 2, 
                this.content.y = this.view.height / 2) : (this.content.height = (this.itemHeight + this.itemSpace) * (t + 2) + 2 * this.gap, 
                this.content.width = this.view.width, this.content.anchorX = .5, this.content.anchorY = 1, 
                this.content.x = 0, this.content.y = this.view.height / 2), this.initBar(this.direction), 
                this.initItem(t);
            },
            initBar: function(t) {
                this.node.getComponent(cc.ScrollView).vertical = !t, this.node.getComponent(cc.ScrollView).horizontal = t;
            },
            initItem: function(t) {
                for (var e = 0; e < t + 2; e++) {
                    var i = cc.instantiate(this.list), s = i.getComponent(this.typeName);
                    this.content.addChild(i), this.itemList.push(i), this.endIndex++, s.setLoc(e, this.itemSpace);
                }
                this.offset = this.node.getComponent("cc.ScrollView").getScrollOffset(), this.initScuccess = !0, 
                this.preNum = t + 2;
            },
            updateItemData: function(t) {
                var e = t.index;
                this.dataList[e] = t, this.startIndex >= 0 && e >= this.startIndex - 1 && e <= this.endIndex - 1 && this.itemList[e - this.startIndex].getComponent(this.typeName).setInfo(this.dataList[e], this);
            },
            setListLoc: function(t) {
                this.node.getComponent("cc.ScrollView").scrollToOffset(cc.v2(0, t * (this.itemHeight + this.itemSpace)));
            },
            setSelectData: function(t) {
                this.selectIndex = t.index, this.selectData = t, this.node.emit("select", t), this.refresh();
            },
            setIndex: function(t) {
                this.startIndex = t, this.endIndex = t;
                for (var e = 0; e < this.preNum; e++) this.itemList[e].getComponent(this.typeName).setLoc(this.endIndex, this.itemSpace), 
                this.endIndex++;
            },
            setData: function(t) {
                this.dataList = t, this.length = this.dataList.length;
                for (var e = 0; e < this.preNum; e++) this.itemList[e].active = !0;
                if (this.length < this.preNum) for (var i = 0; i < this.preNum - this.length; i++) this.itemList[this.preNum - 1 - i].active = !1;
                for (this.direction ? this.content.width = (this.itemWidth + this.itemSpace) * this.length + 2 * this.gap : this.content.height = (this.itemHeight + this.itemSpace) * this.length + 2 * this.gap, 
                e = 0; e < this.length; e++) {
                    var s = this.dataList[e].index - this.dataList[0].index;
                    this.startIndex >= 0 && s >= this.startIndex && s <= this.endIndex - 1 && this.itemList[s - this.startIndex].getComponent(this.typeName).setInfo(this.dataList[s], this);
                }
            },
            refresh: function() {
                for (var t, e, i = 0; i < this.itemList.length; i++) (e = this.itemList[i]).active && (t = e.getComponent(this.typeName)).refresh && t.refresh();
            },
            updateList: function() {
                var t = this.node.getComponent("cc.ScrollView").getScrollOffset(), e = this.itemList.length;
                if (this.direction) {
                    if (t.x >= 0) return;
                    var i = this.offset.x - t.x;
                    i > 0 && this.endIndex < this.length ? (o = this.itemList[0]).x + t.x < -o.width && (o.x = this.itemList[e - 1].x + o.width + this.itemSpace, 
                    this.itemList.shift(), this.itemList.push(o), o.getComponent(this.typeName).setInfo(this.dataList[this.endIndex], this), 
                    this.endIndex++, this.startIndex++) : i < 0 && this.startIndex > 0 && (o = this.itemList[e - 1]).x + t.x > o.width + this.view.width && (o.x = this.itemList[0].x - o.width - this.itemSpace, 
                    this.itemList.pop(), this.itemList.unshift(o), this.endIndex--, this.startIndex--, 
                    o.getComponent(this.typeName).setInfo(this.dataList[this.startIndex], this)), this.offset.x = t.x;
                } else {
                    if (t.y <= 0) return;
                    var s = t.y - this.offset.y;
                    if (s > 0 && this.endIndex < this.length) (o = this.itemList[0]).y + t.y > o.height && (o.y = this.itemList[e - 1].y - o.height - this.itemSpace, 
                    this.itemList.shift(), this.itemList.push(o), o.getComponent(this.typeName).setInfo(this.dataList[this.endIndex], this), 
                    this.endIndex++, this.startIndex++); else if (s < 0 && this.startIndex > 0) {
                        var o;
                        -((o = this.itemList[e - 1]).y + t.y) > this.view.height + o.height && (o.y = this.itemList[0].y + o.height + this.itemSpace, 
                        this.itemList.pop(), this.itemList.unshift(o), this.endIndex--, this.startIndex--, 
                        o.getComponent(this.typeName).setInfo(this.dataList[this.startIndex], this));
                    }
                    this.offset.y = t.y;
                }
            },
            update: function() {
                this.initScuccess && this.updateList();
            }
        }), cc._RF.pop();
    }, {} ],
    LogicManager: [ function(t, e, i) {
        cc._RF.push(e, "5310dyHyWRF1bqqe9foFlGc", "LogicManager");
        var s = t("./logic/ConfigLogic"), o = t("./logic/MoneyLogic"), n = t("./logic/NetLogic"), a = t("./logic/OpenLogic"), r = t("./logic/TipsLogic"), c = t("./logic/SoundLogic"), h = t("./logic/StorageLogic"), l = t("./logic/PanelLogic"), d = t("./logic/LotteryLogic"), u = t("./logic/AldLogic"), p = t("./logic/GameLogic"), g = t("./logic/InfoLogic"), m = t("./logic/GoodsLogic"), f = t("./logic/AssetLogic"), v = t("./logic/InviteLogic"), y = t("./logic/AbfunLogic"), w = t("./logic/WeiPaiLogic"), _ = function() {};
        _.prototype.initialize = function() {
            this.config = new s.ConfigLogic(), this.money = new o.MoneyLogic(), this.net = new n.NetLogic(), 
            this.open = new a.OpenLogic(), this.tips = new r.TipsLogic(), this.panel = new l.PanelLogic(), 
            this.sound = new c.SoundLogic(), this.storage = new h.StorageLogic(), this.lottery = new d.LotteryLogic(), 
            this.ald = new u.AldLogic(), this.game = new p.GameLogic(), this.info = new g.InfoLogic(), 
            this.goods = new m.GoodsLogic(), this.asset = new f.AssetLogic(), this.invite = new v.InviteLogic(), 
            this.abFun = new y.AbFunLogic(), this.weiPai = new w.WeiPaiLogic();
        }, _.prototype.clear = function() {}, e.exports = {
            LogicManager: _
        }, cc._RF.pop();
    }, {
        "./logic/AbfunLogic": "AbfunLogic",
        "./logic/AldLogic": "AldLogic",
        "./logic/AssetLogic": "AssetLogic",
        "./logic/ConfigLogic": "ConfigLogic",
        "./logic/GameLogic": "GameLogic",
        "./logic/GoodsLogic": "GoodsLogic",
        "./logic/InfoLogic": "InfoLogic",
        "./logic/InviteLogic": "InviteLogic",
        "./logic/LotteryLogic": "LotteryLogic",
        "./logic/MoneyLogic": "MoneyLogic",
        "./logic/NetLogic": "NetLogic",
        "./logic/OpenLogic": "OpenLogic",
        "./logic/PanelLogic": "PanelLogic",
        "./logic/SoundLogic": "SoundLogic",
        "./logic/StorageLogic": "StorageLogic",
        "./logic/TipsLogic": "TipsLogic",
        "./logic/WeiPaiLogic": "WeiPaiLogic"
    } ],
    LotteryLogic: [ function(t, e, i) {
        cc._RF.push(e, "f9f78S1pkhE5qr1SZ9f9iwB", "LotteryLogic");
        var s = function() {
            this.DAY_MASK_ID = "mask_lottey_dayCount";
        };
        s.prototype.init = function() {
            this._setRed();
        }, s.prototype.getLastTimes = function() {
            var t = ss.mask.get(this.DAY_MASK_ID);
            return Math.max(0, ss.config.lottery.max - t + 1);
        }, s.prototype.getResult = function(t) {
            for (var e, i = (t + 30) % 360, s = null, o = 0; o < ss.config.lottery.pinList.length; o++) if (ss.config.lottery.pinList[o].min_rotaion <= i && i <= ss.config.lottery.pinList[o].max_rotaion) {
                e = ss.config.lottery.pinList[o].itemId, s = ss.logic.config.getSheetData(ss.enum.sheet.item, e);
                break;
            }
            return s;
        }, s.prototype.createLotteryRotation = function() {
            for (var t = ss.config.lottery.itemList, e = t[0].per, i = t.slice(1, t.length), s = ss.randomUtils.getPirze(e, i).id, o = 0; o < ss.config.lottery.pinList.length; o++) if (ss.config.lottery.pinList[o].id == s) return ss.config.lottery.pinList[o].min_rotaion;
            return null;
        }, s.prototype.processLottery = function(t) {
            var e = "", i = t.ext;
            switch (t.type) {
              case ss.enum.itemType.hugeCoin:
                e = "金币 +" + i, ss.logic.tips.hint(e), ss.logic.money.simpleAdd(ss.enum.money.coin, i), 
                ss.logic.panel.showCoin(e, i);
                break;

              case ss.enum.itemType.hugeDiamond:
                e = "钻石 +" + i, ss.logic.tips.hint(e), ss.logic.money.simpleAdd(ss.enum.money.diamond, i), 
                ss.logic.panel.showDiamond(e, i);
                break;

              default:
                console.warn("undefind processLottery:", t);
            }
        }, s.prototype.saveLotteryTimes = function() {
            ss.mask.add(this.DAY_MASK_ID), this._setRed();
        }, s.prototype._setRed = function() {
            var t = this.getLastTimes();
            cc.systemEvent.emit(ss.event.client.setRed, {
                type: ss.enum.redType.lottery,
                num: t
            });
        }, e.exports = {
            LotteryLogic: s
        }, cc._RF.pop();
    }, {} ],
    LotteryView: [ function(t, e, i) {
        cc._RF.push(e, "0ac0cB96vBK/oj7kKBlyuol", "LotteryView"), cc.Class({
            extends: cc.Component,
            properties: {
                menuNode: cc.Node,
                pinNode: cc.Node,
                superBtnNode: cc.Node,
                redNode: cc.Node,
                tipLab: cc.Label
            },
            onLoad: function() {
                this.popUp = this.node.getComponent("PopUp"), this.menu = this.menuNode.getComponent("Menu"), 
                this.pin = this.pinNode.getComponent("Pin"), this.superBtn = this.superBtnNode.getComponent("SuperButton"), 
                this.data = null, this.state = 0;
            },
            start: function() {
                this.node.active = !1;
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.data = t;
                var e = ss.commonUtils.clone(ss.config.popup);
                e.opacity = 255, this.popUp.show(e), this.menu.show(), this.superBtn.show({
                    rule: ss.config.rule.lottey,
                    shareId: ss.config.shareIds.lottey,
                    onCanHandler: this.isCanCanelHandler.bind(this),
                    onClickHandler: this.onClickHandler.bind(this)
                }), this._judgeRedView();
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.data = null, 
                this.popUp.close(), this.superBtn.clear();
            },
            back: function() {
                this.data && this.data.from && cc.systemEvent.emit(ss.event.client.openView, {
                    type: this.data.from
                }), this.close();
            },
            isCanCanelHandler: function() {
                return !(this.state > 0 || 0 == ss.logic.lottery.getLastTimes() && (ss.logic.tips.hint("今天次数已用完！"), 
                1));
            },
            onClickHandler: function() {
                this.state = 1, this._processStartTurn();
            },
            _processStartTurn: function() {
                this.pin.startTurn(this._turnOverCallback.bind(this));
            },
            _turnOverCallback: function(t) {
                var e = ss.logic.lottery.getResult(t);
                e && (ss.logic.lottery.processLottery(e), ss.logic.lottery.saveLotteryTimes()), 
                this.state = 0, this._judgeRedView();
            },
            _judgeRedView: function() {
                var t = ss.logic.lottery.getLastTimes();
                this.redNode.active = t > 0, this.tipLab.string = "" + t;
            }
        }), cc._RF.pop();
    }, {} ],
    MainView: [ function(t, e, i) {
        cc._RF.push(e, "a233eJ6R3tGrILweBo/sGL1", "MainView"), cc.Class({
            extends: cc.Component,
            properties: {
                menuNode: cc.Node,
                feedNode: cc.Node,
                clubNode: cc.Node,
                lotteryRed: cc.Node,
                inviteRed: cc.Node,
                dailyRed: cc.Node,
                lotteryTipLab: cc.Label,
                inviteTipLab: cc.Label,
                dailyTipLab: cc.Label,
                icon: cc.Sprite,
                nameLab: cc.Label,
                lock: cc.Node,
                secondOpen: cc.Node,
                confident: cc.Node,
                miniProgramNode: cc.Node,
                moreGameNode: cc.Node,
                skinNode: cc.Node
            },
            onLoad: function() {
                this.menu = this.menuNode.getComponent("Menu"), this.miniProgram = this.miniProgramNode.getComponent("WeiPaiMiniProgram"), 
                this.moreGame = this.moreGameNode.getComponent("MoreGame");
            },
            start: function() {
                cc.systemEvent.on(ss.event.client.setRed, this.setRed, this), cc.systemEvent.on(ss.event.client.setExport, this._showWeiPai, this);
            },
            init: function() {
                this.menu.show(ss.enum.view.main), this._showUserView(), this.node.active && this._showWXButton(), 
                this._showForever(), this._showResize(), ss.logic.info.openCallBack = this._showForever.bind(this);
            },
            show: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.node.active = !0, 
                this.menu.show(ss.enum.view.main), this._showWXButton(), this._showWeiPai(), this._showForever(), 
                this._showResize(), ss.logic.invite.getAddInivteData(), ss.logic.open.hideBanner();
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.unscheduleAllCallbacks(), 
                this.node.active = !1, ss.logic.open.hideClubButton(), ss.logic.open.hideFeedButton(), 
                this._hideMoreGame();
            },
            setRed: function(t) {
                switch (t.type) {
                  case ss.enum.redType.lottery:
                    this.lotteryRed.active = t.num > 0, this.lotteryTipLab.string = "" + t.num;
                    break;

                  case ss.enum.redType.invite:
                    this.inviteRed.active = t.num > 0, this.inviteTipLab.string = "" + t.num;
                    break;

                  case ss.enum.redType.daily:
                    this.dailyRed.active = t.num > 0, this.dailyTipLab.string = "" + t.num;
                }
            },
            gotoGoodsClothes: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.goods,
                    from: ss.enum.view.main
                });
            },
            playSolo: function() {
                ss.state.isPreving() && ss.logic.game.callMode(ss.enum.gameMode.solo);
            },
            playForever: function() {
                ss.state.isPreving() && (ss.logic.info.isOpenForever() ? ss.logic.game.callMode(ss.enum.gameMode.forever) : this.openOpen());
            },
            openRank: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.rank,
                    from: ss.enum.view.main
                });
            },
            openLunpan: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.lottery,
                    from: ss.enum.view.main
                });
            },
            openInvite: function() {
                ss.logic.open.isAudited() ? (this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.invite,
                    from: ss.enum.view.main
                })) : ss.logic.open.shareBase(ss.config.shareIds.home);
            },
            openDaily: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.daily,
                    from: ss.enum.view.main
                });
            },
            openSets: function() {
                ss.logic.open.hideClubButton(), ss.logic.open.hideFeedButton(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.sets,
                    backFun: function() {
                        ss.logic.open.showClubButton(), ss.logic.open.showFeedButton();
                    }
                });
            },
            openOpen: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.open,
                    from: ss.enum.view.main
                });
            },
            _showUserView: function() {
                var t = this, e = ss.proxy.userInfo;
                if (e) {
                    var i = ss.commonUtils.stringTruncate(e.nickName, 16);
                    this.nameLab.string = "" + i;
                    var s = e.avatarUrl;
                    if (!ss.commonUtils.isValidValue(s)) return;
                    if ("" == s) return;
                    cc.loader.load({
                        url: s,
                        type: "png"
                    }, function(e, i) {
                        if (i) {
                            var s = new cc.SpriteFrame(i);
                            t.icon.spriteFrame = s;
                        }
                    });
                }
            },
            _showForever: function() {
                ss.logic.info.isOpenForever() ? (this.lock.active = !1, this.secondOpen.active = !1, 
                this.confident.active = !0) : (this.lock.active = !0, this.secondOpen.active = !0, 
                this.confident.active = !1);
            },
            _showResize: function() {
                var t;
                ss.Resize.isPad && ((t = this.skinNode.getComponent(cc.Widget)).left = 10, t.updateAlignment(), 
                (t = this.miniProgramNode.getComponent(cc.Widget)).left = 30, t.updateAlignment(), 
                (t = this.moreGameNode.getComponent(cc.Widget)).left = 20, t.updateAlignment());
            },
            _showWXButton: function() {
                if (isWeiXin) {
                    var t, e, i, s = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    }, o = cc.winSize, n = wx.getSystemInfoSync(), a = n.windowWidth / o.width, r = n.windowHeight / o.height;
                    t = this.clubNode.width, e = this.clubNode.height, (i = this.clubNode.getPosition()).x = o.width / 2 + this.clubNode.x - t / 2, 
                    i.y = o.height / 2 - this.clubNode.y - e / 2, s.x = a * i.x, s.y = r * i.y, s.width = a * t, 
                    s.height = r * e, ss.logic.open.createClubButton(s), ss.logic.open.showClubButton(), 
                    t = this.feedNode.width, e = this.feedNode.height, (i = this.feedNode.getPosition()).x = o.width / 2 + this.feedNode.x - t / 2, 
                    i.y = o.height / 2 - this.feedNode.y - e / 2, s.x = a * i.x, s.y = r * i.y, s.width = a * t, 
                    s.height = r * e, ss.logic.open.createFeedButton(s), ss.logic.open.showFeedButton();
                }
            },
            _showWeiPai: function() {
                if (isWeiXin && this.node.active && ss.logic.weiPai.isLoaded()) {
                    var t = ss.logic.weiPai.getRandAdsInfo(ss.enum.weiPai.AdPosition.home_I), e = ss.logic.weiPai.getAdsInfos(ss.enum.weiPai.AdPosition.homeList_MI), i = ss.logic.weiPai.getAdsInfos(ss.enum.weiPai.AdPosition.home_MI);
                    this._showMiniProgram(t), this._showMoreGame(e, i), ss.logic.weiPai.batchReportExposure_list(t);
                }
            },
            _showMiniProgram: function(t) {
                isWeiXin && this.miniProgram && this.miniProgram.show(t);
            },
            _showMoreGame: function(t, e) {
                isWeiXin && this.moreGame && this.moreGame.show({
                    gridData: t,
                    scrollData: e,
                    callBack: function(t) {
                        t ? (ss.logic.open.showClubButton(), ss.logic.open.showFeedButton()) : (ss.logic.open.hideClubButton(), 
                        ss.logic.open.hideFeedButton());
                    }
                });
            },
            _hideMoreGame: function() {
                this.moreGame && this.moreGame.hide();
            }
        }), cc._RF.pop();
    }, {} ],
    Main: [ function(t, e, i) {
        cc._RF.push(e, "85686imBK9JuoLqTveQ4eyB", "Main");
        var s = t("./ferrari/CommonUtils"), o = t("./ferrari/DateUtils"), n = t("./ferrari/Dictionary"), a = t("./ferrari/Ferrari"), r = t("./ferrari/NodePool"), c = t("./ferrari/RandomUtils"), h = t("./ferrari/TimeUtils"), l = t("./ferrari/DirUtils"), d = t("./core/App"), u = t("./core/Resize"), p = t("./core/Proxy"), g = t("./core/State"), m = t("./Facade"), f = t("./Config"), v = t("./Event"), y = t("./Enum"), w = t("./custom/CustomManager"), _ = t("./com/BootManager"), S = t("./com/DataManager"), b = t("./com/VoManager"), k = t("./com/MaskManager"), C = t("./com/RomManager"), L = t("./com/ExtendsManager"), R = t("./com/ServerManager"), T = t("./com/LogicManager"), x = t("./com/PlatformManager"), A = t("./com/CommandManager"), M = t("./com/HttpManager");
        cc.Class({
            extends: cc.Component,
            editor: {
                executionOrder: 0
            },
            properties: {},
            onLoad: function() {
                u.Resize.initialize(!0), this.getComponent(cc.Canvas).designResolution = new cc.Size(u.Resize.width, u.Resize.height), 
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE), d.App.isLoaded || (d.App.isLoaded = !0, 
                ss.commonUtils = s.CommonUtils, ss.dateUtils = o.DateUtils, ss.randomUtils = c.RandomUtils, 
                ss.timeUtils = h.TimeUtils, ss.dirUtils = l.DirUtils, ss.Dictionary = n.Dictionary, 
                ss.NodePool = r.NodePool, ss.Resize = u.Resize, ss.proxy = p.Proxy, ss.event = v.Event, 
                ss.state = g.State, ss.config = f.Config, ss.enum = y.Enum, ss.facade = new m.Facade(), 
                ss.ferrari = new a.Ferrari(), ss.rom = new C.RomManager(), ss.data = new S.DataManager(), 
                ss.vo = new b.VoManager(), ss.mask = new k.MaskManager(), ss.boot = new _.BootManager(), 
                ss.http = new M.HttpManager(), ss.logic = new T.LogicManager(), ss.custom = new w.CustomManager(), 
                ss.server = new R.ServerManager(), ss.extends = new L.ExtendsManager(), ss.command = new A.CommandManager(), 
                ss.platform = new x.PlatformManager(), ss.boot.initialize(), ss.rom.initialize(), 
                ss.data.initialize(), ss.vo.initialize(), ss.mask.initialize(), ss.http.initialize(), 
                ss.logic.initialize(), ss.server.initialize(), ss.custom.initialize(), ss.extends.initialize(), 
                ss.command.initialize(), ss.platform.initialize(), ss.ferrari.start());
            },
            update: function(t) {
                ss.ferrari && ss.ferrari.update(t);
            }
        }), cc._RF.pop();
    }, {
        "./Config": "Config",
        "./Enum": "Enum",
        "./Event": "Event",
        "./Facade": "Facade",
        "./com/BootManager": "BootManager",
        "./com/CommandManager": "CommandManager",
        "./com/DataManager": "DataManager",
        "./com/ExtendsManager": "ExtendsManager",
        "./com/HttpManager": "HttpManager",
        "./com/LogicManager": "LogicManager",
        "./com/MaskManager": "MaskManager",
        "./com/PlatformManager": "PlatformManager",
        "./com/RomManager": "RomManager",
        "./com/ServerManager": "ServerManager",
        "./com/VoManager": "VoManager",
        "./core/App": "App",
        "./core/Proxy": "Proxy",
        "./core/Resize": "Resize",
        "./core/State": "State",
        "./custom/CustomManager": "CustomManager",
        "./ferrari/CommonUtils": "CommonUtils",
        "./ferrari/DateUtils": "DateUtils",
        "./ferrari/Dictionary": "Dictionary",
        "./ferrari/DirUtils": "DirUtils",
        "./ferrari/Ferrari": "Ferrari",
        "./ferrari/NodePool": "NodePool",
        "./ferrari/RandomUtils": "RandomUtils",
        "./ferrari/TimeUtils": "TimeUtils"
    } ],
    MaskManager: [ function(t, e, i) {
        cc._RF.push(e, "d8f7dVSjgRCcrUmdnkWSjuC", "MaskManager");
        var s = function() {
            this.playing = !1, this.time = 0, this.mask = {
                zerostamps: 0,
                datas: {}
            };
        };
        s.prototype.initialize = function() {}, s.prototype.startup = function(t) {
            t && t.mask && Object.keys(t.mask).length ? (this.mask = t.mask, this._judgeDay()) : this._resetDay(), 
            this.playing = !0;
        }, s.prototype.update = function(t) {
            this.playing && (this.time += t, this.time < 120 || (this.time = 0, this._judgeDay()));
        }, s.prototype.add = function(t) {
            var e = this.get(t);
            this.set(t, e + 1);
        }, s.prototype.set = function(t, e) {
            e && (this.mask.datas[t] = e, this._saveDay());
        }, s.prototype.get = function(t) {
            var e = this.mask.datas[t];
            return e ? Number(e) : 0;
        }, s.prototype._resetDay = function() {
            this.mask = {
                zerostamps: ss.dateUtils.getZeroTime(),
                datas: {}
            }, this._saveDay(!0);
        }, s.prototype._judgeDay = function() {
            ss.dateUtils.getZeroTime() - this.mask.zerostamps < 864e5 || this._resetDay();
        }, s.prototype._saveDay = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            ss.custom.setStorage(ss.enum.storage.mask, this.mask, !1, t);
        }, e.exports = {
            MaskManager: s
        }, cc._RF.pop();
    }, {} ],
    Menu: [ function(t, e, i) {
        cc._RF.push(e, "184c7ABgmpEaInlHoJAbr0P", "Menu"), cc.Class({
            extends: cc.Component,
            properties: {
                coinNode: cc.Node,
                diamondNode: cc.Node,
                diamondLab: cc.Label,
                coinLab: cc.Label,
                diamondTip: cc.Label,
                coinTip: cc.Label,
                diamondBubble: cc.Node,
                coinBubble: cc.Node,
                isCoinBubble: !0
            },
            onLoad: function() {
                this.type = null, this.timestamps = 0;
            },
            start: function() {
                cc.systemEvent.on(ss.event.client.addMoney, this.addMoney, this), cc.systemEvent.on(ss.event.system.AdVideo, this.onAdVideo, this);
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.type = t, this._setDiamondValue(), this._setCoinValue(), this.diamondTip.string = "+" + ss.config.bubble.diamond, 
                this.coinTip.string = "+" + ss.config.bubble.coin, this.diamondBubble.active = !0, 
                this.coinBubble.active = ss.logic.open.isAudited(), this.coinNode && (this.coinNode.stopAllActions(), 
                this.coinNode.setScale(1, 1)), this.diamondNode && (this.diamondNode.stopAllActions(), 
                this.diamondNode.setScale(1, 1));
            },
            showAddCoinEffect: function() {
                if (this.coinNode && this.coinNode) {
                    this.coinNode.stopAllActions();
                    var t = cc.repeat(cc.sequence(cc.scaleTo(.25, 1.2), cc.scaleTo(.25, 1)), 2);
                    this.coinNode.runAction(t);
                }
            },
            showAddDiamondEffect: function() {
                if (this.diamondNode) {
                    this.diamondNode.stopAllActions();
                    var t = cc.repeat(cc.sequence(cc.scaleTo(.15, 1.2), cc.scaleTo(.15, 1)), 3);
                    this.diamondNode.runAction(t);
                }
            },
            addMoney: function(t) {
                if (this.node.active) switch (t.moneyType) {
                  case ss.enum.money.coin:
                    this._setCoinValue();
                    break;

                  case ss.enum.money.diamond:
                    this._setDiamondValue();
                }
            },
            addDiamond: function() {
                ss.logic.open.isReadyVideo() ? (this.timestamps = Date.now(), ss.logic.open.showVideo(this.timestamps)) : ss.logic.tips.hint("今天视频次数已用完！");
            },
            addCoin: function() {
                ss.logic.open.isAudited() && (this.isCoinBubble ? (this.type && cc.systemEvent.emit(ss.event.client.closeView, {
                    type: this.type
                }), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.invite,
                    from: this.type
                })) : ss.logic.tips.hint("点击下面的邀请吧！"));
            },
            onAdVideo: function(t) {
                if (this.node.active && this.node.parent && this.node.parent.active) {
                    var e = t;
                    if (e && e.param == this.timestamps) switch (e.method) {
                      case ss.enum.advertising.method.show:
                        e.code == ss.enum.advertising.code.failed && ss.logic.tips.hint("今天视频播放次数已达上限！");
                        break;

                      case ss.enum.advertising.method.onClose:
                        e.code == ss.enum.advertising.code.success ? (ss.logic.money.simpleAdd(ss.enum.money.diamond, ss.config.bubble.diamond), 
                        ss.logic.tips.hint("钻石 +" + ss.config.bubble.diamond)) : ss.logic.tips.hint("看完视频才能获得哦！");
                    }
                }
            },
            _setDiamondValue: function() {
                this.diamondLab.string = ss.commonUtils.unitToString(ss.data.getDiamond());
            },
            _setCoinValue: function() {
                this.coinLab.string = ss.commonUtils.unitToString(ss.data.getCoin());
            }
        }), cc._RF.pop();
    }, {} ],
    MiniBuff: [ function(t, e, i) {
        cc._RF.push(e, "6d0fdP9k2VFHqPL55YuAMZ8", "MiniBuff"), cc.Class({
            extends: cc.Component,
            properties: {
                lifeNode: cc.Node,
                chocolateNode: cc.Node,
                sweetNode: cc.Node,
                shitNode: cc.Node
            },
            onLoad: function() {
                this.life = this.lifeNode.getComponent("BuffItem"), this.chocolate = this.chocolateNode.getComponent("BuffItem"), 
                this.sweet = this.sweetNode.getComponent("BuffItem"), this.shit = this.shitNode.getComponent("BuffItem"), 
                this._methods = {}, this._methods.add = this._onBuffAdd.bind(this), this._methods.update = this._onBuffUpdate.bind(this), 
                this._methods.remove = this._onBuffRemove.bind(this), this._comps = {}, this._comps[ss.enum.gameEgg.chocolate] = this.chocolate, 
                this._comps[ss.enum.gameEgg.sweet] = this.sweet, this._comps[ss.enum.gameEgg.shit] = this.shit, 
                this._comps[ss.enum.gameEgg.love] = this.life;
            },
            start: function() {
                this.node.active = !1;
            },
            init: function(t) {
                this.setVisible(!0), this.clearBuff();
            },
            setVisible: function(t) {
                this.node.active = t;
            },
            setData: function(t) {
                if (this._methods) {
                    var e = this._methods[t.method];
                    e && e(t.type, t.time);
                }
            },
            _onBuffAdd: function(t, e) {
                if (this._comps) {
                    var i = this._comps[t];
                    i && (i.setVisible(!0), i.setNum(e));
                }
            },
            _onBuffUpdate: function(t, e) {
                if (this._comps) {
                    var i = this._comps[t];
                    i && i.setNum(e);
                }
            },
            _onBuffRemove: function(t, e) {
                if (this._comps) {
                    var i = this._comps[t];
                    i && (i.setVisible(!1), i.setNum(e));
                }
            },
            reset: function() {
                this.chocolate.clear(), this.sweet.clear(), this.shit.clear();
            },
            clear: function() {
                this.node.active = !1, this.clearBuff();
            },
            clearBuff: function() {
                this.life.clear(), this.chocolate.clear(), this.sweet.clear(), this.shit.clear();
            }
        }), cc._RF.pop();
    }, {} ],
    MiniItem: [ function(t, e, i) {
        cc._RF.push(e, "9a0806li/BFI7AXL1IBWJFT", "MiniItem"), cc.Class({
            extends: cc.Component,
            properties: {
                icon: cc.Node,
                iconName: cc.Label
            },
            onLoad: function() {},
            start: function() {},
            setData: function(t) {
                var e = this;
                this.data = t, this.icon.getComponent(cc.Sprite).spriteFrame = null, this.data && (this.iconName.string = this.data.name, 
                cc.loader.load({
                    url: cc.url.raw(this.data.icon),
                    type: "png"
                }, function(t, i) {
                    if (i) {
                        var s = new cc.SpriteFrame(i);
                        e.icon.spriteFrame = s, e.icon.getComponent(cc.Sprite).spriteFrame = s, e.node.active = !0;
                    }
                }));
            },
            registerMiniCallBack: function(t, e) {
                t && (this.miniCompleteCallBack = t), e && (this.miniStopCallBack = e);
            },
            clickMinProgram: function() {
                if (isWeiXin) {
                    var t = this;
                    if (this.checkSDKVersion("2.2.0")) {
                        if (!this.data) return;
                        this.miniStopCallBack && this.miniStopCallBack(), wx.navigateToMiniProgram({
                            appId: this.data.appId,
                            path: this.data.path,
                            envVersion: "release",
                            success: function(t) {},
                            complete: function(e) {
                                console.log("navigateToMiniProgram complete"), t.miniCompleteCallBack && t.miniCompleteCallBack();
                            }
                        });
                    }
                }
            },
            checkSDKVersion: function(t) {
                var e = wx.getSystemInfoSync(), i = (e && e.SDKVersion ? e.SDKVersion : "0.0.0").split("."), s = t.split(".");
                return Number(i[0]) > Number(s[0]) || !(Number(i[0]) < Number(s[0])) && (Number(i[1]) > Number(s[1]) || !(Number(i[1]) < Number(s[1])) && Number(i[2]) >= Number(s[2]));
            }
        }), cc._RF.pop();
    }, {} ],
    MiniProgram: [ function(t, e, i) {
        cc._RF.push(e, "28649/+DyNC4rU+O9elr7It", "MiniProgram"), cc.Class({
            extends: cc.Component,
            properties: {
                icon: cc.Sprite,
                nameLab: cc.Label,
                isShark: !0,
                isScale: !1,
                listType: 0
            },
            onLoad: function() {
                this.isShow = !1, this.miniData = null;
            },
            start: function() {
                this.isShow || (this.node.active = !1);
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.isShow = !0, ss.logic.open.isAudited() && ss.config.miniProgram.open > 0 ? (this.node.active = !0, 
                this.icon.spriteFrame = null, this.miniData = t || this._getCurMiniProgramData(), 
                this.node.stopAllActions(), this.node.rotation = 0, this.setData()) : this.node.active = !1;
            },
            setData: function() {
                var t = this;
                if (ss.logic.open.isAudited() && ss.config.miniProgram.open > 0) {
                    var e = this.miniData;
                    e && (this.nameLab.string = e.name, cc.loader.load({
                        url: cc.url.raw(e.icon),
                        type: "png"
                    }, function(e, i) {
                        if (i) {
                            var s = new cc.SpriteFrame(i);
                            t.icon.spriteFrame = s, t.node.active = !0;
                        }
                    })), this._playMiniProgram();
                }
            },
            clickMinProgram: function() {
                if (ss.logic.open.isCanMiniProgram()) {
                    var t = this.miniData;
                    if (!t) return;
                    ss.logic.open.navigateToMiniProgram({
                        appId: t.appId,
                        path: t.path,
                        envVersion: "release",
                        success: function(t) {
                            console.log("navigateToMiniProgram ok");
                        }
                    });
                }
            },
            close: function() {
                this.miniData = null, this.node.active = !1, this.node.stopAllActions(), this.node.rotation = 0, 
                this.node.setScale(1, 1);
            },
            _getCurMiniProgramData: function() {
                var t, e, i, s = ss.config.miniProgram.programs;
                switch (this.listType) {
                  case 0:
                    e = ss.config.miniProgram.list, i = ss.config.miniProgram.id;
                    break;

                  default:
                    e = ss.config.miniProgram["list_" + this.listType], i = ss.config.miniProgram["id_" + this.listType];
                }
                for (var o, n = 0; n < e.length; n++) if (t = 100 * Math.random(), (o = s[e[n]]) && t <= o.rate) return o;
                return s[i];
            },
            _playMiniProgram: function() {
                this.isShark ? this._shackeMiniProgram() : this.isScale && this._scaleMiniProgram();
            },
            _shackeMiniProgram: function() {
                this.isShark && (this.node.stopAllActions(), this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1.5), cc.repeat(cc.sequence(cc.rotateTo(.08, 8), cc.rotateTo(.08, -8)), 4), cc.rotateTo(.04, 0)))));
            },
            _scaleMiniProgram: function() {
                this.isScale && (this.node.stopAllActions(), this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.4), cc.scaleTo(.5, 1.1), cc.scaleTo(.5, 1)))));
            }
        }), cc._RF.pop();
    }, {} ],
    MiniRank: [ function(t, e, i) {
        cc._RF.push(e, "8903fIFLiFMNKnjycEdmd5s", "MiniRank"), cc.Class({
            extends: cc.Component,
            properties: {
                nameLab: cc.Label,
                scoreLab: cc.Label,
                content: cc.Node,
                indexBg: cc.Node
            },
            ctor: function() {
                this.comps = null;
            },
            onLoad: function() {},
            start: function() {},
            show: function(t) {},
            hide: function() {},
            clear: function() {
                this.nameLab.string = "", this.scoreLab.string = "", this.indexBg.active = !1;
            },
            setData: function(t) {
                var e = t.items;
                if (e) {
                    for (var i, s, o = "", n = "", a = 0, r = Math.min(10, e.length); a < r; a++) (i = e[a]) && (o += i.name + "\n", 
                    n += (s = Math.floor(i.grow)) < 100 ? "  " + s + "\n" : s < 1e3 ? " " + s + "\n" : s + "\n", 
                    i.isColor && this.indexBg && this.content && (this.indexBg.active = !0, this.indexBg.y = this.content.y - this.indexBg.height / 2 - a * this.indexBg.height - 5));
                    this.nameLab && (this.nameLab.string = o), this.scoreLab && (this.scoreLab.string = n);
                }
            }
        }), cc._RF.pop();
    }, {} ],
    Mini: [ function(t, e, i) {
        cc._RF.push(e, "61cf18+2oBLHYo5who76+Cu", "Mini");
        var s = function() {
            this.data = null, this.rank = null, this.buff = null, this.killLab = null, this.signLab = null, 
            this.diedLab = null, this.timeLab = null, this.surviveNode = null, this.surviveLab = null, 
            this.timeNum = 0, this.heroGrow = 0, this.grows = new ss.Dictionary(), this.playing = !1, 
            this.rTimestamps = 0, this.tTimestamps = 0;
        };
        s.prototype.init = function(t) {
            this.data = t, this.rank = t.rankNode.getComponent("MiniRank"), this.buff = t.buffNode.getComponent("MiniBuff"), 
            this.killLab = t.killLab, this.diedLab = t.diedLab, this.signLab = t.signLab, this.timeLab = t.timeLab, 
            this.timeNum = t.gameTime, this.surviveNode = t.surviveNode, this.surviveLab = t.surviveLab, 
            this.grows.clear(), this.killLab.node.on(cc.Node.EventType.SIZE_CHANGED, this._layoutKill, this), 
            this.diedLab.node.on(cc.Node.EventType.SIZE_CHANGED, this._layoutKill, this);
        }, s.prototype.clear = function() {
            this.playing = !1, this.rTimestamps = 0, this.tTimestamps = 0, this.timeNum = 0, 
            this.buff.clear();
        }, s.prototype.reset = function() {
            this.grows.clear();
        }, s.prototype.play = function(t) {
            switch (this.heroGrow = 0, this.playing = !0, this.killLab.string = "0", this.diedLab.string = "0", 
            this._layoutKill(), this.timeNum = this.data.gameTime, t) {
              case ss.enum.gameMode.solo:
                this.timeLab.node.active = !0, this.timeLab.string = this._toTimeString(this.timeNum), 
                this.rank.node.active = !0, this.rank.show(), this._rankSetData(), this.buff.setVisible(!1), 
                this.surviveNode.active = !1;
                break;

              case ss.enum.gameMode.forever:
                this.timeLab.node.active = !1, this.rank.node.active = !1, this.buff.init(null), 
                this.surviveNode.active = !0;
            }
        }, s.prototype.stop = function() {
            this.playing = !1;
        }, s.prototype.setKillData = function(t) {
            this.killLab.string = "" + t.kill, this.diedLab.string = "" + t.died, this._layoutKill();
        }, s.prototype.initGrowData = function(t) {
            this.grows.set(t.id, t);
        }, s.prototype.setGrowData = function(t, e) {
            var i = this.grows.get(t);
            i && (i.grow = e, this.grows.set(t, i), t == ss.logic.game.bulu.heroid && (this.heroGrow = e));
        }, s.prototype.getGrowData = function(t) {
            return this.grows.get(t);
        }, s.prototype.setBuffData = function(t) {
            this.buff && this.buff.setData(t);
        }, s.prototype.resetBuffData = function() {
            this.buff && this.buff.reset();
        }, s.prototype.setSurviveData = function(t) {
            this.surviveLab && (this.surviveLab.string = "" + t);
        }, s.prototype.update = function(t) {
            this.playing && (this.timeLab && this.timeLab.node.active && (this.tTimestamps += t, 
            this.tTimestamps >= 1 && (this.tTimestamps = 0, this._timeCountDown())), this.rank && this.rank.node.active && (this.rTimestamps += t, 
            this.rTimestamps >= 2 && (this.rTimestamps = 0, this._rankSetData())));
        }, s.prototype._toTimeString = function(t) {
            var e = t / 60 >> 0, i = t % 60 >> 0;
            return (e = e < 10 ? "0" + e : "" + e) + ":" + (i = i < 10 ? "0" + i : "" + i);
        }, s.prototype._timeCountDown = function() {
            if (this.timeLab.node.active && (this.timeNum--, this.timeLab.string = this._toTimeString(Math.max(this.timeNum, 0)), 
            this.timeNum <= 0)) {
                this.playing = !1, console.log("时间结束，请求结算");
                var t = this._rankSetData(), e = this.grows.get(ss.logic.game.bulu.heroid);
                ss.logic.game.callOver(!0, t, e, ss.logic.game.getKillData(), ss.logic.game.getScoreData(e, t));
            }
        }, s.prototype._rankSetData = function() {
            var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], e = this.grows.values.slice();
            e.sort(function(t, e) {
                return t.grow > e.grow ? -1 : t.grow < e.grow ? 1 : 0;
            });
            for (var i, s = [], o = 0, n = e.length; o < n; o++) (i = e[o]).index = o, i.isColor = i.id == ss.logic.game.bulu.heroid, 
            this.grows.set(i.id, i), s.push(i);
            var a = {
                items: s
            };
            return t && this.rank.setData(a), a;
        }, s.prototype._layoutKill = function() {
            this.signLab.node.x = this.killLab.node.x + this.killLab.node.width + this.signLab.node.width / 2, 
            this.diedLab.node.x = this.signLab.node.x + this.signLab.node.width / 2;
        }, e.exports = {
            Mini: s
        }, cc._RF.pop();
    }, {} ],
    MiscVo: [ function(t, e, i) {
        cc._RF.push(e, "20cf1Z2L0FHwIrjzHCqJ8MV", "MiscVo");
        var s = function() {
            this.reset();
        };
        s.prototype.reset = function() {
            this.newId = 1;
        }, e.exports = {
            MiscVo: s
        }, cc._RF.pop();
    }, {} ],
    Model: [ function(t, e, i) {
        cc._RF.push(e, "00666jVaodHKbQUc1pYUOxw", "Model"), cc.Class({
            extends: cc.Component,
            properties: {
                bodyNode: cc.Node,
                nameLab: cc.Label,
                descLab: cc.Label,
                t1: cc.Label,
                t2: cc.Label,
                t3: cc.Label,
                t4: cc.Label,
                p1: cc.Label,
                p2: cc.Label,
                p3: cc.Label,
                p4: cc.Label
            },
            onLoad: function() {
                this.body = this.bodyNode.getComponent(cc.Animation);
            },
            start: function() {},
            show: function(t) {
                var e = ss.logic.config.getSheetData(ss.enum.sheet.goods, t.id), i = ss.logic.config.getSheetData(ss.enum.sheet.item, e.item_id), s = ss.logic.config.getSheetData(ss.enum.sheet.mode, e.extend_id);
                this.body.addClip(ss.logic.asset.getPacmanClip(s.skin), s.skin), this.body.play(s.skin), 
                this.nameLab.string = "" + i.name;
                var o = ss.data.isNewCost() ? e.des2 : e.des;
                this.descLab.string = "" + o;
                for (var n, a, r = [ "speed", "addSpeed", "duration", "attr" ], c = ss.logic.goods.compare(t.id), h = 0, l = r.length; h < l; h++) (a = this["p" + (h + 1)]).string = "" + s[r[h]], 
                (n = c ? c[r[h]] : 0) < 0 ? a.node.color = cc.Color.RED : 0 == n ? a.node.color = cc.Color.WHITE : n > 0 && (a.node.color = cc.Color.CYAN);
            }
        }), cc._RF.pop();
    }, {} ],
    MoneyLogic: [ function(t, e, i) {
        cc._RF.push(e, "cd82axBO3hGWoy9HFyjlU32", "MoneyLogic");
        var s = function() {};
        s.prototype._isHasFull = function(t, e) {
            switch (t) {
              case ss.enum.money.coin:
                return e <= ss.data.getCoin();

              case ss.enum.money.diamond:
                return e <= ss.data.getDiamond();
            }
            return !1;
        }, s.prototype.isHasFullCoin = function(t) {
            return this._isHasFull(ss.enum.money.coin, t);
        }, s.prototype.isHasFullDiamond = function(t) {
            return this._isHasFull(ss.enum.money.diamond, t);
        }, s.prototype.cost = function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], o = {};
            o[ss.enum.money.coin] = this.isHasFullCoin.bind(this), o[ss.enum.money.diamond] = this.isHasFullDiamond.bind(this);
            var n = {
                code: 0,
                cost: 0
            }, a = o[t];
            a && a(e) ? (n.code = ss.enum.code.success, n.cost = e, ss.logic.net.reqAddMoney({
                moneyType: t,
                money: -e,
                isStorage: !1,
                isEffect: !1,
                isNow: !0,
                isIcon: !1
            })) : (n.code = ss.enum.code.failed, s && this._showLessCost(t)), i && i(n);
        }, s.prototype._showLessCost = function(t) {
            var e = {};
            e[ss.enum.money.coin] = "金币不足！", e[ss.enum.money.diamond] = "钻石不足！", ss.logic.tips.hint(e[t]);
        }, s.prototype.add = function(t) {
            t && t.money && ss.logic.net.reqAddMoney(t);
        }, s.prototype.simpleAdd = function(t, e) {
            var i = {
                moneyType: t,
                money: e,
                isStorage: !1,
                isEffect: !1,
                isNow: !0,
                isIcon: !1
            };
            this.add(i);
        }, e.exports = {
            MoneyLogic: s
        }, cc._RF.pop();
    }, {} ],
    MoreGame: [ function(t, e, i) {
        cc._RF.push(e, "10f79SbfV9M9rugHxPV8C+l", "MoreGame"), cc.Class({
            extends: cc.Component,
            properties: {
                bg: cc.Node,
                scrollProgramNode: cc.Node,
                content: cc.Node,
                icon: cc.Node,
                grid: cc.Node,
                items: [ cc.Node ]
            },
            onLoad: function() {
                this.state = 0, this.data = null, this.isShow = !1, this.playing = !1, this.comps = [];
                for (var t, e = 0, i = this.items.length; e < i; e++) t = this.items[e].getComponent("WiPaiMiniItem"), 
                this.comps.push(t);
                this.scrollProgram = this.scrollProgramNode.getComponent("HScrollMiniProgram");
            },
            start: function() {
                this.bg.active = !1, this.grid.active = !1, this.isShow || (this.node.active = !1);
            },
            show: function(t) {
                t && (this.data = t, this.isShow = !0, ss.logic.open.isAudited() && ss.config.miniProgram.open > 0 ? (this.node.active = !0, 
                this.scrollProgram.show(this.data.scrollData, function(t) {
                    t && t.length && ss.logic.weiPai.batchReportExposure_list(t);
                }), this._showGridProgram(this.data.gridData), this._shacke()) : this.node.active = !1);
            },
            hide: function() {
                this.scrollProgram && this.scrollProgram.hide();
            },
            click: function() {
                if (!this.playing) switch (this.state) {
                  case 0:
                    this._calm(), this._moveUp();
                    break;

                  case 1:
                    this._moveDown();
                }
            },
            mini: function() {
                this.playing || this._moveDown();
            },
            _moveUp: function() {
                var t = this;
                this.state = 1, this.playing = !0, this.bg.active = !0, this.grid.active = !0, this.scrollProgramNode.active = !1, 
                this.content.stopAllActions();
                var e = cc.sequence(cc.moveTo(.5, cc.v2(this.content.x, this.content.height)).easing(cc.easeElasticOut(1)), cc.callFunc(function() {
                    t.playing = !1, t.data && (t.data.gridData && ss.logic.weiPai.batchReportExposure_list(t.data.gridData), 
                    t.data.callBack && t.data.callBack(!1));
                }));
                this.content.runAction(e);
            },
            _moveDown: function() {
                var t = this;
                this.state = 0, this.playing = !0, this.content.stopAllActions();
                var e = cc.sequence(cc.moveTo(.3, cc.v2(this.content.x, 0)), cc.callFunc(function() {
                    t.playing = !1, t.bg.active = !1, t.grid.active = !1, t.scrollProgramNode.active = !0, 
                    t._shacke(), t.data && t.data.callBack && t.data.callBack(!0);
                }));
                this.content.runAction(e);
            },
            _shacke: function() {},
            _calm: function() {
                this.icon.stopAllActions(), this.icon.rotation = 0;
            },
            _showGridProgram: function(t) {
                for (var e = 0, i = this.comps.length; e < i; e++) this.comps[e] && (e < t.length ? (this.comps[e].node.active = !0, 
                this.comps[e].setData(t[e])) : this.comps[e].node.active = !1);
            }
        }), cc._RF.pop();
    }, {} ],
    MoveClips: [ function(t, e, i) {
        cc._RF.push(e, "9b842neEmlBMaPk/92R0yTS", "MoveClips");
        var s = cc.Class({
            name: "MoveClips",
            properties: {
                clips: [ cc.AnimationClip ]
            }
        });
        e.exports = {
            MoveClips: s
        }, cc._RF.pop();
    }, {} ],
    NetLogic: [ function(t, e, i) {
        cc._RF.push(e, "91aa3kQjI5AM4V8NwDFJvfg", "NetLogic");
        var s = function() {};
        s.prototype.reqGamePlay = function(t) {
            var e = {};
            e.type = ss.event.protocol.ReqGamePlay, e.data = t, ss.server.execute(e);
        }, s.prototype.reqGameOver = function(t) {
            var e = {};
            e.type = ss.event.protocol.ReqGameOver, e.data = t, ss.server.execute(e);
        }, s.prototype.reqAddMoney = function(t) {
            var e = {};
            e.type = ss.event.protocol.ReqAddMoney, e.data = t, ss.server.execute(e);
        }, s.prototype.reqUpdateSign = function(t) {
            var e = {};
            e.type = ss.event.protocol.ReqUpdateSign, e.data = t, ss.server.execute(e);
        }, s.prototype.reqSetBuff = function(t) {
            var e = {};
            e.type = ss.event.protocol.ReqSetBuff, e.data = t, ss.server.execute(e);
        }, s.prototype.reqSetTask = function(t) {
            var e = {};
            e.type = ss.event.protocol.ReqSetTask, e.data = t, ss.server.execute(e);
        }, s.prototype.reqSetMisc = function(t) {
            var e = {};
            e.type = ss.event.protocol.ReqSetMisc, e.data = t, ss.server.execute(e);
        }, s.prototype.reqSetGoods = function(t) {
            var e = {};
            e.type = ss.event.protocol.ReqSetGoods, e.data = t, ss.server.execute(e);
        }, s.prototype.reqAddScore = function(t) {
            var e = {};
            e.type = ss.event.protocol.ReqAddScore, e.data = t, ss.server.execute(e);
        }, e.exports = {
            NetLogic: s
        }, cc._RF.pop();
    }, {} ],
    NodePool: [ function(t, e, i) {
        cc._RF.push(e, "3f7d0dVpcpMNaIhoR4+30tN", "NodePool");
        var s = function() {
            this.inited = !1, this.poolName = null, this.prefab = null, this.parent = null, 
            this.pools = null, this.objects = null;
        };
        s.prototype.initialize = function(t, e, i) {
            this.inited || (this.inited = !0, this.poolName = t, this.prefab = e, this.parent = i, 
            this.pools = new cc.NodePool(t), this.objects = {});
        }, s.prototype.preview = function(t) {
            for (var e, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], o = 0; o < t; o++) {
                var n;
                e = cc.instantiate(this.prefab), this.pools.put(e), s && this.parent && (e.parent = this.parent), 
                (n = e.getComponent(this.poolName)).preview && n.preview(i);
            }
        }, s.prototype.create = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = this.objects[t.id];
            if (s) return s;
            var o = this.pools.size();
            if (i && 0 == o) return console.log("NodePool pool is null:", this.poolName, t.id), 
            null;
            !(s = o > 0 ? this.pools.get() : cc.instantiate(this.prefab)).parent && this.parent && this.parent.addChild(s);
            var n = s.getComponent(this.poolName);
            return this.objects[t.id] = s, n.init && n.init(t, e), n.play && n.play(), s;
        }, s.prototype.recover = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = this.objects[t];
            if (i) {
                var s = i.getComponent(this.poolName);
                delete this.objects[t], e && this.parent && this.parent.removeChild(i), s.clear && s.clear(), 
                this.pools.put(i);
            } else console.log("recover error:", this.poolName, t);
        }, s.prototype.callMethod = function(t) {
            var e, i, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            for (var o in this.objects) (e = this.objects[o]) && (i = e.getComponent(this.poolName))[t] && i[t](s);
        }, s.prototype.get = function(t) {
            return this.objects[t];
        }, s.prototype.getIds = function() {
            return Object.keys(this.objects);
        }, s.prototype.getLength = function() {
            return Object.keys(this.objects).length;
        }, s.prototype.getComp = function(t) {
            var e = this.objects[t];
            return e ? e.getComponent(this.poolName) : null;
        }, s.prototype.removeAll = function() {
            for (var t in this.objects) this.recover(t, !0);
            this.objects = {};
        }, e.exports = {
            NodePool: s
        }, cc._RF.pop();
    }, {} ],
    OpenLogic: [ function(t, e, i) {
        cc._RF.push(e, "277594veUNIQ4bse4mPBe6+", "OpenLogic");
        var s = t("../../custom/service/const/ShareConst"), o = function() {
            this.VIEW_ID = "STAGE_VIEW1", this.RANK_ID = "USER_MAXSTAGE", this.replaces = {}, 
            this.vibrating = !1, this.vibrateabled = !0, this.bannerIndex = -1, this.insterstitalIndex = 0;
            var t = cc.sys.localStorage.getItem("freshCount");
            this.freshCount = t ? Number(t) : 0, this.freshCount++, cc.sys.localStorage.setItem("freshCount", this.freshCount), 
            this.shareConf = {
                count: 1,
                rate: 15,
                once: 5,
                in1: 8,
                in2: 5,
                out: 60,
                fresh: {
                    count: 1,
                    rate: 100
                },
                freshCount: this.freshCount
            }, this.shareDelay = new n(4e3, 1e3, 9e3, 16e3, this.shareConf);
        };
        o.prototype.update = function(t) {
            this.shareDelay.update(t);
        }, o.prototype.gc = function() {
            isWeiXin && wx.triggerGC && wx.triggerGC();
        }, o.prototype.setUserCloud = function(t) {
            isWeiXin && ss.platform.leaderboard.updateRankOneKey(this.RANK_ID, t);
        }, o.prototype.refreshFriendRank = function() {
            isWeiXin && ss.platform.leaderboard.refreshFriendRank(this.RANK_ID);
        }, o.prototype.showRankData = function() {
            isWeiXin && ss.platform.leaderboard.drawRankView(this.VIEW_ID);
        }, o.prototype.prevRankData = function() {
            isWeiXin && ss.platform.leaderboard.lastRankPage(this.VIEW_ID);
        }, o.prototype.nextRankData = function() {
            isWeiXin && ss.platform.leaderboard.nextRankPage(this.VIEW_ID);
        }, o.prototype.isCanMiniProgram = function() {
            return !!isWeiXin && ss.platform.current.checkSDKVersion("2.2.0");
        }, o.prototype.navigateToMiniProgram = function(t) {
            return ss.platform.current.navigateToMiniProgram(t);
        }, o.prototype.sendAldEvent = function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            isWeiXin && (this.freshCount > 1 && !i || ss.platform.current.sendAldEvent(t, e));
        }, o.prototype.sendAldOnceEvent = function(t, e) {
            isWeiXin && (this.aldEventDic || (this.aldEventDic = {}), this.aldEventDic.hasOwnProperty(t) || (this.aldEventDic[t] = {
                id: t
            }, ss.platform.current.sendAldEvent(t, e)));
        }, o.prototype.createClubButton = function(t) {
            isWeiXin && ss.platform.current.createClubButton(t);
        }, o.prototype.showClubButton = function() {
            ss.platform.current.showClubButton();
        }, o.prototype.hideClubButton = function() {
            ss.platform.current.hideClubButton();
        }, o.prototype.createFeedButton = function(t) {
            isWeiXin && ss.platform.current.createFeedButton(t);
        }, o.prototype.showFeedButton = function() {
            ss.platform.current.showFeedButton();
        }, o.prototype.hideFeedButton = function() {
            ss.platform.current.hideFeedButton();
        }, o.prototype.showBanner = function() {
            var t = ss.platform.getBanners().length;
            this.bannerIndex < 0 && (this.bannerIndex = Math.floor(Math.random() * t)), this.bannerIndex >= t && (this.bannerIndex = 0);
            var e = ss.enum.advertising.mode.banner + "" + this.bannerIndex;
            ss.platform.ad.showBanner(e), this.bannerIndex++;
        }, o.prototype.hideBanner = function() {
            ss.platform.ad.hideBanner();
        }, o.prototype.setVibrate = function(t) {
            this.vibrateabled = t;
        }, o.prototype.vibrate = function() {
            var t = this;
            isWeiXin && this.vibrateabled && (this.vibrating || (this.vibrating = !0, ss.platform.current.vibrateLong(function(e) {
                t.vibrating = !1;
            })));
        }, o.prototype.getSystem = function() {
            return ss.platform.system;
        }, o.prototype.isCanShare = function() {
            return this.isAudited();
        }, o.prototype.isReadyVideo = function() {
            return ss.platform.isReadyAdVideo();
        }, o.prototype.isAudited = function() {
            return !isWeiXin || ss.platform.isAudited();
        }, o.prototype.isCanBanner = function() {
            return ss.platform.isCanBanner();
        }, o.prototype.isWrongBanner = function(t) {
            var e = ss.platform.isWrongBanner();
            if (e) {
                if (!(t = t)) return !1;
                var i = t.delayRate || 0;
                return 100 * Math.random() <= i;
            }
            return e;
        }, o.prototype.isAdChecked = function() {
            return !isWeiXin || ss.platform.isAdChecked();
        }, o.prototype.isOldMan = function() {
            var t = 24 * (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2) * 3600 * 1e3;
            return ss.dateUtils.getZeroTime() - ss.data.fristDate > t;
        }, o.prototype.isFishMan = function() {
            return ss.dateUtils.getZeroTime() - ss.data.fristDate <= 864e5;
        }, o.prototype.showVideo = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            ss.platform.ad.showVideo(ss.enum.advertising.mode.video, t);
        }, o.prototype.showInterstitial = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = ss.config.insterstital;
            if (e && e.open) {
                if (++this.insterstitalIndex < e.frist) return void console.log("showInterstitial 还未到第一次触发的次数");
                if (this.insterstitalIndex > e.frist && 0 != (this.insterstitalIndex - e.frist) % e.gap) return void console.log("showInterstitial 间隔过滤");
            }
            console.log("showInterstitial 确定调用"), ss.platform.ad.showInterstitial(ss.enum.advertising.mode.interstitial, t);
        }, o.prototype.setReplace = function(t) {
            this.replaces[t.key] = t.value;
        }, o.prototype.setAppMessage = function() {
            if (isWeiXin) {
                if (ss.proxy.userInfo) {
                    var t = ss.commonUtils.stringTruncate(ss.proxy.userInfo.nickName, 8);
                    this.setReplace({
                        key: "nickName",
                        value: t
                    });
                }
                ss.custom.setAppShare(ss.config.shareIds.app);
            }
        }, o.prototype.shareGroup = function(t) {
            var e = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            if (isWeiXin) {
                var n = !1, a = this.createQuery(t, o);
                this.shareDelay.call(function() {
                    i && i(), ss.logic.ald.sendShareAld(a), ss.logic.tips.shareGroupSucc(), n = !0;
                }, function() {
                    ss.logic.tips.shareGroupFailed(), n = !0;
                });
                var r = !1;
                ss.custom.shareGroup(t, a, function(t) {
                    if (t.mod == s.ShareConst.SHARE_MOD.GROUP) if (t.code == s.ShareConst.SHARE_CODE.GROUP_SUCC) {
                        var i = e.shareDelay.trust();
                        !n && i && (ss.logic.ald.sendShareAld(a), ss.logic.tips.shareGroupSucc()), r = !0;
                    } else t.code == s.ShareConst.SHARE_CODE.FAILED_GOURP ? (ss.logic.tips.shareGroupFailed(), 
                    r = !0) : t.code == s.ShareConst.SHARE_CODE.FAILED_GOURP_FULL ? (ss.logic.tips.shareGroupFull(), 
                    r = !0) : t.code == s.ShareConst.SHARE_CODE.CANCEL && (ss.logic.tips.shareGroupFailed(), 
                    r = !0); else ss.logic.tips.shareGroupFailed(), r = !0;
                    r && e.shareDelay.reset();
                }, this.replaces);
            } else i && i();
        }, o.prototype.shareNormal = function(t) {
            var e = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            if (isWeiXin) {
                var n = !1, a = this.createQuery(t, o);
                this.shareDelay.call(function() {
                    i && i(), ss.logic.ald.sendShareAld(a), ss.logic.tips.shareSucc(), n = !0;
                }, function() {
                    ss.logic.tips.shareFail(), n = !0;
                });
                var r = !1;
                ss.custom.shareNormal(t, a, function(t) {
                    if (t.code == s.ShareConst.SHARE_CODE.NORMAL_SUCC) {
                        var i = e.shareDelay.trust();
                        !n && i && (ss.logic.ald.sendShareAld(a), ss.logic.tips.shareSucc()), r = !0;
                    } else t.code == s.ShareConst.SHARE_CODE.FAILED ? (ss.logic.tips.shareFail(), r = !0) : t.code == s.ShareConst.SHARE_CODE.CANCEL && (ss.logic.tips.shareFail(), 
                    r = !0);
                    r && e.shareDelay.reset();
                }, this.replaces);
            } else i && i();
        }, o.prototype.shareBase = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            if (isWeiXin) {
                var s = this.createQuery(t, i);
                ss.logic.ald.sendShareAld(s), ss.custom.shareNormal(t, s, function(t) {}, this.replaces);
            } else e && e();
        }, o.prototype.createQuery = function(t, e) {
            if (!ss.proxy.game.isOther) return e;
            var i = ss.custom.getShareConfData(t), s = i && i.hasOwnProperty("logId") ? i.logId : "", o = ss.proxy.httpParams, n = null;
            if (e) n = e; else if (o) {
                var a = JSON.stringify(o);
                n = JSON.parse(a);
            }
            return n && i && (n.shareId = t + "", n.shareimg = i.img, n.sharetext = i.txt, n.logId = s), 
            console.log("createQuery:", n), n;
        }, e.exports = {
            OpenLogic: o
        };
        var n = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3e3, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 9e3, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 12e3, o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
            this.playTime = t, this.randTime = e, this.relyTime = t, this.inTime = i, this.outTime = s, 
            this.shareConf = o, this.shareCout = 0, this.startTime = 0, this.delayTime = 0, 
            this.usedTime = 0, this.loseCount = 0, this.freshabled = !1, this.isPlaying = !1, 
            this.successed = !1, this.isDelaying = !1, this.isTrusting = !1, this.cb_succ = null, 
            this.cb_fail = null, cc.game.on(cc.game.EVENT_SHOW, this._delayFunc, this);
        };
        n.prototype.call = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            this.reset(), this.isPlaying = !0, this.successed = !1, this.isTrusting = !1, this.relyTime = this.playTime + Math.floor(Math.random() * this.randTime), 
            this.cb_succ = t, this.cb_fail = e, this.usedTime = 0;
        }, n.prototype.trust = function() {
            this.isTrusting = !0;
            var t = Date.now() - this.startTime;
            this.usedTime = t;
            var e = this._judgeFunc();
            return this._judgeResult(e), e;
        }, n.prototype.reset = function() {
            this.startTime = Date.now(), this.isPlaying = !1, this.successed = !1, this.isDelaying = !1, 
            this.isTrusting = !1, this.delayTime = 0, this.usedTime = 0, this.cb_succ = null, 
            this.cb_fail = null;
        }, n.prototype.update = function(t) {
            if (this.isDelaying && !this.isTrusting && (this.delayTime += t, this.delayTime >= .5)) {
                this.isDelaying = !1;
                var e = this._judgeFunc();
                this._judgeResult(e);
            }
        }, n.prototype._isFullLose = function() {
            return this.loseCount >= 2 && (this.loseCount = 0, !0);
        }, n.prototype._delayFunc = function() {
            if (this.isPlaying && !this.isTrusting) {
                if (this.isPlaying = !1, this._isFullLose()) return this.successed = !0, void (this.cb_succ && this.cb_succ());
                var t = Date.now(), e = t - this.startTime;
                e >= this.relyTime ? (this.delayTime = 0, this.usedTime = e, this.isDelaying = !0) : (this.loseCount++, 
                this.cb_fail && this.cb_fail()), this.startTime = t;
            }
        }, n.prototype._judgeResult = function(t) {
            t ? (this.successed = !0, this.loseCount = 0, this.cb_succ && this.cb_succ()) : (this.loseCount++, 
            this.cb_fail && this.cb_fail());
        }, n.prototype._judgeFunc = function() {
            if (this.shareCout++, this.shareConf) {
                var t = this.shareConf.count || 0, e = this.shareConf.rate || 0, i = this.shareConf.once || 0, s = this.shareConf.in1 || 0, o = this.shareConf.in2 || 0, n = this.shareConf.out || 0, a = this.shareConf.fresh || null, r = this.shareConf.freshCount || 0, c = 100 * Math.random();
                if (a && r <= a.count && !this.freshabled && (this.freshabled = !0, c <= a.rate)) return console.log("新玩家第一次分享强制失败"), 
                !1;
                if (this.shareCout <= t) {
                    if (c <= e) return console.log("老玩家登录的第一次分享几率失败"), !1;
                } else if (c <= i) return console.log("每次分享的几率失败"), !1;
                var h = this.playTime + this.randTime;
                if (this.usedTime >= h && this.usedTime < this.inTime) {
                    if (c <= s) return console.log("时间内第一阶段分享的几率失败"), !1;
                } else if (this.usedTime >= this.inTime && this.usedTime < this.outTime) {
                    if (c <= o) return console.log("时间内第一阶段分享的几率失败"), !1;
                } else if (this.usedTime >= this.outTime && c <= n) return console.log("分享的分享几率失败"), 
                !1;
            }
            return !0;
        }, cc._RF.pop();
    }, {
        "../../custom/service/const/ShareConst": "ShareConst"
    } ],
    OpenView: [ function(t, e, i) {
        cc._RF.push(e, "77799vn0v9OOIxrcPSHH6YV", "OpenView"), cc.Class({
            extends: cc.Component,
            properties: {
                killLab: cc.Label,
                numLab: cc.Label
            },
            onLoad: function() {
                this.popUp = this.node.getComponent("PopUp"), this.data = null;
            },
            start: function() {
                this.node.active = !1;
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.data = t;
                var e = ss.commonUtils.clone(ss.config.popup);
                e.opacity = 255, e.isEffect = !0, this.popUp.show(e);
                var i = ss.logic.info.getOpenForeverData(), s = ss.config.openForever;
                this.killLab.string = "≥" + s.kill, this.numLab.string = Math.min(i.num, s.num) + "/" + s.num;
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.popUp.close(), 
                this.data = null;
            },
            goto: function() {
                ss.state.isPreving() && (this.close(), ss.logic.game.callMode(ss.enum.gameMode.solo));
            },
            back: function() {
                this.data && this.data.from && cc.systemEvent.emit(ss.event.client.openView, {
                    type: this.data.from
                }), this.close();
            }
        }), cc._RF.pop();
    }, {} ],
    OtherLogin: [ function(t, e, i) {
        cc._RF.push(e, "0ee9a3Y5JVPfKRfm2rRAibE", "OtherLogin");
        var s = t("./WeiXinSdk"), o = function(t) {
            this.manager = t, this.wxRes = null, this.result = null, this.tryLoginTimes = 0, 
            this.maxLoginTimes = 6, this.delayId = 0;
        };
        o.prototype.ready = function(t) {
            this.manager.weixinSdk.checkSession(function(e) {
                wx.getStorageSync("account"), wx.getStorageSync("password");
                var i = wx.getStorageSync("js_code");
                console.log("checkSession res", e, i), e && e.code == s.WeiXinSdk.RESULT_CODE.OK && i ? t && t({
                    code: s.WeiXinSdk.RESULT_CODE.OK,
                    js_code: i
                }) : t && t({
                    code: s.WeiXinSdk.RESULT_CODE.LOGIN_FAIL,
                    js_code: ""
                });
            });
        }, o.prototype.login = function(t, e, i, s, o) {
            function n(t, s) {
                var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                console.log("other login onResult:", t);
                var n = t;
                200 == n.err_code ? (o || (wx.setStorageSync("account", n.account.account), wx.setStorageSync("password", n.account.password)), 
                wx.setStorageSync("js_code", e), r.result = n, i && i({
                    code: 200,
                    result: n,
                    userInfo: s,
                    params: S
                })) : a();
            }
            function a() {
                r.tryLoginTimes++, console.log("登录失败再次登录:", r.tryLoginTimes), wx.removeStorage({
                    key: "account"
                }), wx.removeStorage({
                    key: "password"
                }), wx.removeStorage({
                    key: "js_code"
                }), r.tryLoginTimes < r.maxLoginTimes ? r.delayId = ss.ferrari.timer.setTimeout(function() {
                    ss.ferrari.timer.clearTimeout(r.delayId), s && s();
                }, 500) : (r.tryLoginTimes = 0, console.log("重连次数用完登录失败"), o && o());
            }
            var r = this;
            this.wxRes = t;
            var c = {
                account: wx.getStorageSync("account"),
                password: wx.getStorageSync("password"),
                datas: {
                    game_type: ss.proxy.game.type,
                    js_code: e
                }
            }, h = t ? {
                datas: t.data.userInfo
            } : null, l = t ? t.data.launchOption.query : {}, d = l.hasOwnProperty("invite_uid") ? l.invite_uid : "", u = l.hasOwnProperty("invite_id") ? l.invite_id : "", p = l.hasOwnProperty("date_type") ? l.date_type : "", g = l.hasOwnProperty("slave_timesamp") ? l.slave_timesamp : "", m = l.hasOwnProperty("shareId") ? l.shareId : "", f = l.hasOwnProperty("sharetext") ? l.sharetext : "", v = l.hasOwnProperty("shareimg") ? l.shareimg : "", y = l.hasOwnProperty("shareAccount") ? l.shareAccount : "", w = l.hasOwnProperty("shareScene") ? l.shareScene : "", _ = l.hasOwnProperty("logId") ? l.logId : "", S = {
                platform: ss.proxy.game.platform,
                account: JSON.stringify(c),
                user: JSON.stringify(h),
                invite_uid: d,
                invite_id: u,
                date_type: p,
                slave_timesamp: g,
                shareId: m,
                sharetext: f,
                shareimg: v,
                shareAccount: y,
                shareScene: w,
                third_type: ss.proxy.game.third_type,
                game_type: ss.proxy.game.type,
                logId: _
            };
            ss.proxy.game.noCheck ? ss.http.loginExt(S, function(t) {
                n(t, null, !0);
            }, function(t) {
                a();
            }) : ss.http.login(S, function(e) {
                n(e, t.data.userInfo, !1);
            }, function(t) {
                a();
            });
        }, e.exports = {
            OtherLogin: o
        }, cc._RF.pop();
    }, {
        "./WeiXinSdk": "WeiXinSdk"
    } ],
    Outlooking: [ function(t, e, i) {
        cc._RF.push(e, "2b0a8586JBDxJVawe+LLUAN", "Outlooking");
        var s = function() {
            this.samrts = new ss.Dictionary(), this.mapRect = null;
        };
        s.prototype.init = function(t) {
            this.mapRect = t.mapRect;
        }, s.prototype.getSmart = function(t) {
            return this.samrts.get(t);
        }, s.prototype.addSmart = function(t, e) {
            this.samrts.set(t, e), e.setData({
                mapRect: this.mapRect,
                outlooking: this
            });
        }, s.prototype.removeSmart = function(t) {
            var e = this.samrts.get(t);
            if (e) {
                e.removeSelf(), this.samrts.remove(t);
                for (var i, s = this.samrts.values, o = 0, n = s.length; o < n; o++) (i = s[o]) && i.removeViewTarget(t);
            }
        }, s.prototype.removeAllSmarts = function() {
            this.samrts.clear();
        }, s.prototype.clear = function() {
            this.removeAllSmarts();
        }, e.exports = {
            Outlooking: s
        }, cc._RF.pop();
    }, {} ],
    Pacman: [ function(t, e, i) {
        cc._RF.push(e, "a1d19l1slVMM4u3yIw4wDko", "Pacman");
        var s = t("./bulubulu/Unit"), o = t("./galagala/SmartA"), n = t("./Quick"), a = t("./Bala");
        cc.Class({
            extends: cc.Component,
            properties: {
                content: cc.Node,
                growLab: cc.Label,
                nameLab: cc.Label,
                mode: cc.Node,
                buff: cc.Node,
                glow: cc.Node,
                crown: cc.Node,
                ghost: cc.Node,
                eggs: cc.Node,
                egg_3: cc.Node,
                egg_4: cc.Node
            },
            ctor: function() {
                this.data = null, this.params = null, this.playing = !1, this.locking = !1, this.dieding = !1, 
                this.borning = !1, this.growing = !1, this.isSuper = !1, this.isGhost = !1, this.isEgger = !1, 
                this.sTimestamp = 0, this.souls = [], this.colliderTimestamp = 0, this.colliderEnters = [], 
                this.colliderStays = [], this.colliderExits = [], this.colliders = {}, this.unit = new s.Unit(this), 
                this.smart = new o.SmartA(this), this.quick = new n.Quick(this), this.bala = new a.Bala(this), 
                this._bornTag = 1, this._growTag = 2, this._diedTag = 3, this._baseSpeed = 0, this._addSpeed = 0, 
                this._angle = 0, this._shadR = 0, this._growR = 1, this._bodyR = 2, this._growLength = 0, 
                this._bodyLength = 0, this._viewLength = 0, this._attrLength = 0, this._shadLength = 0, 
                this._snowLength = 0, this._ghostLength = 35, this._attrBala = 0, this._speedBala = 1;
            },
            onLoad: function() {
                var t = this.getComponents(cc.CircleCollider);
                if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && (e.abc = this, this.colliders[e.tag] = e, 
                e.onDisable = function() {}, e.onEnable = function() {});
                this.nameLab.node.on(cc.Node.EventType.SIZE_CHANGED, this._nameSizeChange, this);
            },
            start: function() {},
            update: function(t) {},
            getAllSpeed: function() {
                return (this._baseSpeed + this._addSpeed) * this._speedBala;
            },
            getAllLiving: function() {
                return this.data && !this.dieding;
            },
            getAllBorning: function() {
                return this.data && !this.borning;
            },
            getAllGhosting: function() {
                return this.data && this.isGhost;
            },
            getGrow: function() {
                return this._growLength;
            },
            setLocking: function(t) {
                this.locking = t, this.smart.setLocking(t);
            },
            addCollider: function() {
                var t = this.getComponents(cc.CircleCollider);
                if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && cc.director.getCollisionManager().addCollider(e);
            },
            removeCollider: function() {
                var t = this.getComponents(cc.CircleCollider);
                if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && cc.director.getCollisionManager().removeCollider(e);
            },
            preview: function(t) {},
            init: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this.data = t, this.params = e, this.isSuper = t.type == ss.enum.roleType.superman, 
                this.unit.init({
                    id: this.data.id
                }), ss.logic.game.bulu.addUnit(this.data.id, this.data.gid, this.unit), this.smart.init({
                    id: this.data.id,
                    sid: this.data.sid,
                    type: this.data.type,
                    camp: this.data.camp
                }), ss.logic.game.gala.addSmart(this.data.id, this.smart), this.bala.init({
                    id: this.data.id
                });
                var i = t.pos || this.unit.cell.getRectV2();
                this.node.setPosition(i), this.node.zIndex = this.isSuper ? 4 : 3, this.unit.move(i), 
                this.smart.move(i), this.content.active = !0, this.content.opacity = 255, this.content.color = cc.Color.WHITE, 
                this.content.setScale(1), this.nameLab.string = this.data.name + "", this.nameLab.node.color = this.isSuper ? cc.Color.ORANGE : cc.Color.WHITE, 
                this.growLab.node.color = this.isSuper ? cc.Color.ORANGE : cc.Color.WHITE;
                var s = ss.logic.config.getSheetData(ss.enum.sheet.goods, t.mid), o = s && s.extend_id ? s.extend_id : 20001, n = ss.logic.config.getSheetData(ss.enum.sheet.mode, o), a = this.mode.getComponent(cc.Animation);
                n || (n = {
                    skin: 0,
                    item_id: 20001,
                    speed: 4,
                    attr: 48,
                    addSpeed: 6,
                    duration: 300
                }), a.addClip(ss.logic.asset.getPacmanClip(n.skin), n.skin), a.play(n.skin);
                var r = ss.config.smart[t.sid];
                this._growR = r.growR, this._baseSpeed = n.speed;
                var c = t.grow;
                c || (c = this.isSuper ? Math.floor((r.bodyLength + Math.floor(5 * Math.random())) / this._bodyR) : Math.floor((r.bodyLength + Math.floor(10 * Math.random() + 5)) / this._bodyR)), 
                this.isSuper ? this.isEgger = ss.logic.game.getEgging() : this.isEgger = Math.random() < .3, 
                this._setGrowLength(c), this._setBodyLength(c * this._bodyR), this._setViewLength(r.viewLength), 
                this._setAttrLength(n.attr), this._doLayout(), this.quick.setData({
                    max: n.addSpeed,
                    up: 1,
                    duration: n.duration,
                    down: 2
                }), ss.logic.game.mini.initGrowData({
                    id: this.data.id,
                    grow: c,
                    camp: this.data.camp,
                    name: this.data.name
                }), ss.ferrari.juggler.add(this), this.addCollider();
            },
            play: function() {
                var t = this;
                this.playing = !0, this.quick.play(), this.smart.play(), this.bala.play(), this._playByEar();
                var e = this.isSuper || this.node.active ? 4 : 2, i = 3 * this._bodyLength + 300;
                this.borning = !0, this.buff.active = !0, this.glow.active = this.isSuper, this.buff.setContentSize(i, i), 
                this.buff.stopActionByTag(this._bornTag);
                var s = cc.sequence(cc.repeat(cc.sequence(cc.fadeTo(.2, 100), cc.fadeTo(.2, 255)), e), cc.callFunc(function() {
                    t.borning = !1, t.buff.active = !1, t.buff.opacity = 255, t.buff.stopActionByTag(t._bornTag);
                }));
                s.setTag(this._bornTag), this.buff.runAction(s);
            },
            advanceFrame: function(t, e) {
                this.playing && (this.locking || (this.quick.update(t), this.smart.update(t), this.bala.update(t), 
                this._playByEar(e), this._playByShadow(), this._playBySoul(t, !1)));
            },
            move: function(t) {
                if (this.playing && this.data) {
                    var e = t.angle;
                    this._angle != e && (this._angle = e, this.smart.setAngleLength(e));
                }
            },
            addSpeed: function() {
                this.playing && this.data && this.quick.addSpeed();
            },
            toBeGrow: function(t) {
                function e() {
                    o._setGrowLength(n), o._setBodyLength(2 * n), o._setViewLength(o._viewLength), o._setAttrLength(o._attrLength), 
                    o._doLayout();
                }
                var i = this;
                if (this.data && !this.dieding) {
                    var s = this._playByKill(t);
                    this.isSuper && (s.isEffect || (t.isEffect ? ss.logic.sound.bigEat() : ss.logic.sound.eat()));
                    var o = this, n = Math.sqrt(this._growLength * this._growLength + t.grow * t.grow / this._growR);
                    if (n += s.r, this.node.active && !this.growing && t.isEffect && this.content.active) {
                        this.growing = !0, this.mode.stopActionByTag(this._growTag), this.mode.setScale(1);
                        var a = cc.sequence(cc.scaleTo(.25, 1.2, 1.2), cc.callFunc(function() {
                            i.growing = !1, i.mode.stopActionByTag(i._growTag), i.mode.setScale(1), e();
                        }));
                        a.setTag(this._growTag), this.mode.runAction(a);
                    } else e();
                }
            },
            toBeKill: function() {
                var t = this;
                if (this.data) if (this.isSuper && (ss.logic.sound.died(), ss.logic.open.vibrate(), 
                ss.logic.game.hutu.died()), this.setLocking(!0), this.dieding = !0, this.content.stopActionByTag(this._diedTag), 
                this.node.active && this.content.active) {
                    var e = .5 * this.content.scaleX, i = .5 * this.content.scaleY, s = cc.sequence(cc.scaleTo(.25, e, i), cc.callFunc(function() {
                        t.dieding = !1, t.content.stopActionByTag(t._diedTag), ss.logic.game.recover(t.data, !0, !1);
                    }));
                    s.setTag(this._diedTag), this.content.runAction(s);
                } else ss.logic.game.recover(this.data, !0, !0);
            },
            toBeEgg: function(t) {
                if (this.data && !this.dieding) {
                    var e = t.egg || 0, i = ss.logic.config.getSheetData(ss.enum.sheet.buff, e);
                    if (i) {
                        var s = 0;
                        switch (e) {
                          case ss.enum.gameEgg.chocolate:
                            var o = this.isEgger ? i.effect_add : i.effect;
                            s = i.time * o;
                            break;

                          default:
                            s = i.time;
                        }
                        this.bala.add(i.id, s);
                    }
                }
            },
            toBeGhost: function() {
                this.data && (this.isGhost || (this.isGhost = !0, this.content.active = !1, this.ghost.active = !0, 
                this.smart.setIsGhost(!0)));
            },
            toBePacman: function() {
                this.data && this.isGhost && (this.isGhost = !1, this.ghost.active = !1, this.content.active = !0, 
                this.smart.setIsGhost(!1));
            },
            revive: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.data && (this.isSuper || ss.logic.game.recover(this.data, !0, t));
            },
            reset: function() {
                this.quick.clear(), this.setLocking(!1);
            },
            clear: function() {
                this.data && (ss.logic.game.bulu.removeUnit(this.data.id), ss.logic.game.gala.removeSmart(this.data.id), 
                ss.logic.game.bulu.removeTargetShadow(this.data.id), ss.logic.game.bulu.removeTargetSnow(this.data.id)), 
                this.isSuper && ss.logic.game.mini.resetBuffData(), this.quick.clear(), this.bala.clear(), 
                this.data = null, this.params = null, this.playing = !1, this.locking = !1, this.dieding = !1, 
                this.borning = !1, this.growing = !1, this.isSuper = !1, this.isGhost = !1, this.isEgger = !1, 
                this.sTimestamp = 0, this.souls.length = 0, this._shadR = 0, this._growR = 1, this._angle = 0, 
                this._baseSpeed = 0, this._addSpeed = 0, this._growLength = 0, this._bodyLength = 0, 
                this._viewLength = 0, this._shadLength = 0, this._snowLength = 0, this._attrBala = 0, 
                this._speedBala = 1, this.colliderTimestamp = 0, this.colliderEnters.length = 0, 
                this.colliderStays.length = 0, this.colliderExits.length = 0, this.node.active = !0, 
                this.content.stopAllActions(), this.content.opacity = 255, this.content.setScale(1), 
                this.mode.stopAllActions(), this.mode.opacity = 255, this.mode.setScale(1), this.ghost.stopAllActions(), 
                this.ghost.opacity = 255, this.ghost.active = !1, this.buff.stopAllActions(), this.buff.opacity = 255, 
                this.buff.active = !1, this.glow.active = !1, this.eggs.active = !1, this.egg_3.active = !1, 
                this.egg_4.active = !1, ss.ferrari.juggler.remove(this), this.removeCollider();
            },
            onUnitActive: function(t, e) {
                if (this.data) {
                    if (!this.isSuper) if (t) {
                        if (!this.node.active && !ss.logic.game.add(this.data.id)) return void this.revive(!0);
                    } else ss.logic.game.sub(this.data.id), ss.logic.game.bulu.removeTargetShadow(this.data.id);
                    this.node.active = t, t && this._playByAnagle();
                }
            },
            onUnitChange: function(t) {
                this.data && (this.data.gid = t);
            },
            onUnitDied: function() {
                this.data && this.toBeKill();
            },
            onQuickUpdate: function(t) {
                this.data && (this._addSpeed = t.speed);
            },
            onSmartAction: function(t) {
                this.data && (null != t.angle && this.move({
                    angle: t.angle
                }), t.addSpeed && this.addSpeed());
            },
            onSmartDied: function() {
                this.data && this.toBeKill();
            },
            onSmartAttr: function(t) {
                this.data && (this.locking || this.dieding || ss.logic.game.attract(t, this));
            },
            onJudgeGrow: function(t) {
                this.data && (this.toBeEgg(t), this.toBeGrow(t));
            },
            onJudgeDied: function() {
                this.data && (this.borning || this.toBeKill());
            },
            onBalaAdd: function(t, e) {
                if (this.data) {
                    var i = ss.logic.config.getSheetData(ss.enum.sheet.buff, t), s = this.isEgger ? i.effect_add : i.effect;
                    switch (t) {
                      case ss.enum.gameEgg.chocolate:
                        this.toBeGhost();
                        break;

                      case ss.enum.gameEgg.sweet:
                        this._attrBala = s, this._setAttrLength(this._attrLength), this.eggs.active = !0, 
                        this.egg_3.active = !0, this.smart.setAttrAngle(s >= 5 ? 90 : 45);
                        break;

                      case ss.enum.gameEgg.shit:
                        this._speedBala = s, this.eggs.active = !0, this.egg_4.active = !0;
                    }
                    this._doLayout(), this.isSuper && ss.logic.game.mini.setBuffData({
                        method: "add",
                        type: t,
                        time: e
                    });
                }
            },
            onBalaUpdate: function(t, e) {
                this.data && this.isSuper && ss.logic.game.mini.setBuffData({
                    method: "update",
                    type: t,
                    time: e
                });
            },
            onBalaRemove: function(t, e) {
                if (this.data) {
                    switch (t) {
                      case ss.enum.gameEgg.chocolate:
                        this.toBePacman();
                        break;

                      case ss.enum.gameEgg.sweet:
                        this._attrBala = 0, this._setAttrLength(this._attrLength), this.egg_3.active = !1, 
                        this.smart.setAttrAngle(30);
                        break;

                      case ss.enum.gameEgg.shit:
                        this._speedBala = 1, this.egg_4.active = !1;
                    }
                    this.eggs.active = this.egg_3.active || this.egg_4.active, this._doLayout(), this.isSuper && ss.logic.game.mini.setBuffData({
                        method: "remove",
                        type: t,
                        time: e
                    });
                }
            },
            onCollisionEnter: function(t, e) {
                if (this.data && !this.dieding) {
                    var i = t.abc;
                    i && i.data && (e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body ? this.smart.addViewTarget(i.data.id) : e.tag == ss.enum.tag.body && t.tag == ss.enum.tag.body && ss.logic.game.judge(i, this));
                }
            },
            _onCollisionEnter: function(t, e) {
                if (this.data && !this.dieding) {
                    var i = t.abc;
                    i && i.data && (e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body ? this.smart.addViewTarget(i.data.id) : e.tag == ss.enum.tag.body && t.tag == ss.enum.tag.body && ss.logic.game.judge(i, this));
                }
            },
            onCollisionStay: function(t, e) {
                if (this.data && !this.dieding && !this.isSuper) {
                    var i = t.abc;
                    i && i.data && i && i.data && i.data.type != ss.enum.roleType.superman && (e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body ? this.smart.addViewTarget(i.data.id) : e.tag == ss.enum.tag.body && t.tag == ss.enum.tag.body && this.node.active && ss.logic.game.judge(i, this));
                }
            },
            _onCollisionStay: function(t, e) {
                if (this.data && !this.dieding && !this.isSuper) {
                    var i = t.abc;
                    i && i.data && i && i.data && i.data.type != ss.enum.roleType.superman && (e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body ? this.smart.addViewTarget(i.data.id) : e.tag == ss.enum.tag.body && t.tag == ss.enum.tag.body && this.node.active && ss.logic.game.judge(i, this));
                }
            },
            onCollisionExit: function(t, e) {
                if (this.data && !this.dieding) {
                    var i = t.abc;
                    i && i.data && e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body && this.smart.removeViewTarget(i.data.id);
                }
            },
            _onCollisionExit: function(t, e) {
                if (this.data && !this.dieding) {
                    var i = t.abc;
                    i && i.data && e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body && this.smart.removeViewTarget(i.data.id);
                }
            },
            _playByAnagle: function() {
                var t = this._angle, e = cc.v2(Math.abs(this.node.scaleX), Math.abs(this.node.scaleY));
                t >= -90 && t <= 90 || (t > 90 && t <= 180 ? e.y *= -1 : t > -180 && t < -90 && (e.y *= -1)), 
                this.content.rotation = ss.commonUtils.angleToRotation(t), this.content.scaleX = e.x, 
                this.content.scaleY = e.y;
            },
            _playByEar: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                if (this.data) {
                    this._playByAnagle();
                    var e = this._angle, i = ss.logic.game.bulu.getScaleXY(), s = this.node.getPosition(), o = ss.dirUtils.allDirectionsMove(e, this.getAllSpeed() / i * (1 / t));
                    s.addSelf(o), this.node.setPosition(s), this.unit.move(s), this.smart.move(s), o.mulSelf(i), 
                    this.isSuper && ss.logic.game.bulu.lookAt(o), this.isSuper || (this.growLab.node.color = this._growLength > ss.logic.game.mini.heroGrow ? cc.Color.RED : cc.Color.WHITE);
                } else console.log("_playByEar:", this.nameLab.string);
            },
            _playByShadow: function() {
                this.data && this.node.active && 0 != this._addSpeed && (++this._shadR < this._shadLength || (this._shadR = 0, 
                ss.logic.game.bulu.createShadow({
                    target: this.data.id,
                    pos: this.node.getPosition(),
                    size: this.mode.getContentSize(),
                    rotation: this.content.rotation,
                    scaleX: this.content.scaleX,
                    scaleY: this.content.scaleY,
                    mid: this.data.mid
                })));
            },
            _playByKill: function(t) {
                var e = {
                    r: 0,
                    isEffect: !1
                };
                if (!this.data || !this.node.active || !t.isSoul) return e;
                var i, s = ss.logic.game.hutu.kill(this.isSuper), o = 0 == this.souls.length;
                if (e.isEffect = s.length > 0, s.length > 0) for (var n = 0; n < s.length; n++) i = s[n], 
                e.r += i.grow, i.msg = 0 == n ? ss.logic.game.hutu.getKillWord(i.type, t) : null, 
                this.souls.push(i); else {
                    var a = ss.logic.game.bulu.heroid;
                    a != t.winId && a != t.lostId || (i = {
                        type: null,
                        msg: ss.logic.game.hutu.getKillWord(null, t)
                    }, this.souls.push(i), o = !0);
                }
                return o && this._playBySoul(0, !0), e;
            },
            _playBySoul: function(t, e) {
                if (this.data && this.node.active && 0 != this.souls.length && (this.sTimestamp += t, 
                e || this.sTimestamp >= 1.5)) {
                    this.sTimestamp = 0;
                    var i = this.souls.shift();
                    i.msg && ss.logic.tips.kill(i.msg), i.type && (ss.logic.sound.playEffect(i.type), 
                    i.msg || (ss.logic.game.bulu.createSnow({
                        target: this.data.id,
                        v2: cc.v2(0, this._bodyLength),
                        word: "" + ss.enum.killWord[i.type],
                        parent: this.node,
                        index: this.snowLength
                    }), this.snowLength > 2 && (this.snowLength = 0), this.snowLength++));
                }
            },
            _playByCollider: function(t) {
                var e;
                this.colliderTimestamp += t, this.colliderTimestamp < .001 || (this.colliderTimestamp = 0, 
                this.colliderEnters.length && (e = this.colliderEnters.shift()) && this._onCollisionEnter(e.other, e.self), 
                this.colliderStays.length && (e = this.colliderStays.shift()) && this._onCollisionStay(e.other, e.self), 
                this.colliderExits.length && (e = this.colliderExits.shift()) && this._onCollisionExit(e.other, e.self));
            },
            _setGrowLength: function(t) {
                if (this.data) {
                    var e = Math.floor(t);
                    this._growLength = t, this.smart.setGrowLength(e), this.growLab.string = e + "", 
                    this.data.grow = e, ss.logic.game.mini.setGrowData(this.data.id, e);
                }
            },
            _setBodyLength: function(t) {
                if (this.data) {
                    var e = Math.min(t, ss.logic.game.isSystemBetter() ? 192 : 144);
                    this._bodyLength = e;
                    var i = this.isGhost ? this._ghostLength : e;
                    this.smart.setBodyLength(i);
                    var s = this.colliders[ss.enum.tag.body];
                    s && (s.radius = i), ss.logic.game.bulu.scaleXY(e), this._shadLength = e < 42 ? 6 : 10;
                    var o = 3 * this._bodyLength + 500;
                    this.glow.active && this.glow.setContentSize(o, o);
                }
            },
            _setViewLength: function(t) {
                if (this.data) {
                    this._viewLength = t;
                    var e = this._bodyLength + t;
                    this.smart.setViewLength(e);
                    var i = this.colliders[ss.enum.tag.view];
                    i && (i.radius = e);
                }
            },
            _setAttrLength: function(t) {
                if (this.data) {
                    this._attrLength = t;
                    var e = this._bodyLength + t * (1 + this._attrBala);
                    this.smart.setAttrLength(e);
                }
            },
            _doLayout: function() {
                var t = 2 * this._bodyLength;
                this.mode.setContentSize(t, t);
                var e = 1 / ss.logic.game.bulu.getScaleXY();
                this.growLab.node.setScale(e, e), this.nameLab.node.setScale(e, e);
                var i = 0, s = 0;
                s = this.isGhost ? -this._ghostLength - 15 : -this._bodyLength - 15, this.eggs.active && (this.eggs.setScale(e, e), 
                s -= (i = this.eggs.height * e) / 2, this.eggs.y = s, s = s - i / 2 - 15), i = this.growLab.node.height * e, 
                this.growLab.node.y = s, s -= i, this.nameLab.node.y = s;
            },
            _nameSizeChange: function() {
                this.playing && this._doLayout();
            }
        }), cc._RF.pop();
    }, {
        "./Bala": "Bala",
        "./Quick": "Quick",
        "./bulubulu/Unit": "Unit",
        "./galagala/SmartA": "SmartA"
    } ],
    PanelLogic: [ function(t, e, i) {
        cc._RF.push(e, "50eaeQZXw1JGoA3Jgiq6c3j", "PanelLogic");
        var s = function() {};
        s.prototype.showDiamond = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = {
                type: ss.enum.money.diamond,
                msg: t,
                money: e
            };
            ss.panel.showGetAward(i);
        }, s.prototype.showCoin = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = {
                type: ss.enum.money.coin,
                msg: t,
                money: e
            };
            ss.panel.showGetAward(i);
        }, e.exports = {
            PanelLogic: s
        }, cc._RF.pop();
    }, {} ],
    Panel: [ function(t, e, i) {
        cc._RF.push(e, "1c913oBlRBITJzANPpXQnaU", "Panel"), cc.Class({
            extends: cc.Component,
            properties: {
                getAwardNode: cc.Node
            },
            onLoad: function() {
                ss.panel = this, this.getAward = this.getAwardNode.getComponent("GetAward");
            },
            start: function() {},
            showGetAward: function(t) {
                this.getAward.show(t);
            }
        }), cc._RF.pop();
    }, {} ],
    Pea: [ function(t, e, i) {
        cc._RF.push(e, "af11dVVKh9LxYVPmGfVeNk9", "Pea");
        var s = t("./bulubulu/Unit"), o = t("./galagala/SmartC");
        cc.Class({
            extends: cc.Component,
            properties: {
                spriteFrames: [ cc.SpriteFrame ]
            },
            ctor: function() {
                this.data = null, this.params = null, this.playing = !1, this.locking = !1, this.dieding = !1, 
                this.colliders = {}, this.unit = new s.Unit(this), this.smart = new o.SmartC(this), 
                this._bornTag = 1, this._growTag = 2, this._diedTag = 3, this._growLength = 0, this._bodyLength = 0, 
                this._viewLength = 0;
            },
            onLoad: function() {
                var t = this.getComponents(cc.CircleCollider);
                if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && (e.abc = this, this.colliders[e.tag] = e, 
                e.onDisable = function() {}, e.onEnable = function() {});
            },
            start: function() {},
            update: function(t) {},
            getAllLiving: function() {
                return this.data && !this.dieding;
            },
            getGrow: function() {
                return this._growLength;
            },
            getEffect: function() {
                if (this.data) switch (this.data.egg) {
                  case ss.enum.gameEgg.normal:
                    return !1;

                  case ss.enum.gameEgg.cherry:
                    return !0;

                  case ss.enum.gameEgg.chocolate:
                    return !1;

                  case ss.enum.gameEgg.sweet:
                    return !0;

                  case ss.enum.gameEgg.shit:
                    return !1;
                }
                return !1;
            },
            getEgg: function() {
                return this.data ? this.data.egg : 0;
            },
            setLocking: function(t) {
                this.locking = t, this.smart.setLocking(t);
            },
            isCanAttract: function() {
                if (!this.data) return !1;
                switch (this.data.egg) {
                  case ss.enum.gameEgg.shit:
                    return !1;
                }
                return !0;
            },
            addCollider: function() {
                var t = this.getComponents(cc.CircleCollider);
                if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && cc.director.getCollisionManager().addCollider(e);
            },
            removeCollider: function() {
                var t = this.getComponents(cc.CircleCollider);
                if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && cc.director.getCollisionManager().removeCollider(e);
            },
            preview: function(t) {},
            init: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this.data = t, this.params = e, this.unit.init({
                    id: this.data.id
                }), ss.logic.game.bulu.addUnit(this.data.id, this.data.gid, this.unit), this.smart.init({
                    id: this.data.id,
                    sid: this.data.sid,
                    type: this.data.type,
                    camp: this.data.camp
                }), ss.logic.game.gala.addSmart(this.data.id, this.smart);
                var i = this.unit.cell.getRandV2();
                this.node.setPosition(i), this.unit.move(i), this.smart.move(i);
                var s = 12, o = 0, n = t.egg;
                switch (this.node.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[n], n) {
                  case ss.enum.gameEgg.normal:
                    this.node.zIndex = 0, this.node.color = cc.Color.WHITE, this.node.setContentSize(32, 32), 
                    o = 32;
                    break;

                  case ss.enum.gameEgg.cherry:
                    s = 50, this.node.zIndex = 0, this.node.color = cc.Color.MAGENTA, this.node.setContentSize(32, 32), 
                    o = 32;
                    break;

                  case ss.enum.gameEgg.chocolate:
                  case ss.enum.gameEgg.sweet:
                  case ss.enum.gameEgg.shit:
                  case ss.enum.gameEgg.love:
                    this.node.zIndex = 1, this.node.color = cc.Color.WHITE, this.node.setContentSize(64, 64), 
                    o = 32;
                }
                this._setGrowLength(s), this._setBodyLength(o), this._setViewLength(32), ss.ferrari.juggler.add(this), 
                this.addCollider();
            },
            play: function() {
                if (this.playing = !0, this.node.stopActionByTag(this._bornTag), this.node.active) {
                    this.node.setScale(.5);
                    var t = cc.scaleTo(.3, 1);
                    t.setTag(this._bornTag), this.node.runAction(t);
                }
            },
            advanceFrame: function(t, e) {
                this.playing && (this.locking || this.smart.update(t));
            },
            move: function(t) {
                this.playing;
            },
            toBeKill: function() {
                this.data && (this.setLocking(!0), this.dieding = !0, ss.logic.game.recover(this.data, !0));
            },
            reset: function() {
                this.setLocking(!1);
            },
            clear: function() {
                this.data && (ss.logic.game.bulu.removeUnit(this.data.id), ss.logic.game.gala.removeSmart(this.data.id)), 
                this.data = null, this.params = null, this.playing = !1, this.locking = !1, this.dieding = !1, 
                this.node.opacity = 255, this.node.setScale(1), this.node.stopAllActions(), this._growLength = 0, 
                this._bodyLength = 0, this._viewLength = 0, ss.ferrari.juggler.remove(this), this.removeCollider();
            },
            onUnitActive: function(t) {
                this.data && (this.node.active = t);
            },
            onUnitChange: function(t) {
                this.data && (this.data.gid = t);
            },
            onUnitDied: function() {
                this.data && this.toBeKill();
            },
            onJudgeDied: function() {
                this.data && this.toBeKill();
            },
            onAttractDied: function(t) {
                var e = this;
                if (this.data && !this.locking && !this.dieding) if (this.node.active && t.isEffect) {
                    var i = this.node.getPosition(), s = t.v2, o = Math.sqrt(Math.pow(s.x - i.x, 2) + Math.pow(s.y - i.y, 2));
                    this.setLocking(!0), this.dieding = !0;
                    var n = .25, a = .15;
                    o >= 120 ? (n = .35, a = .2) : o <= 40 && (n = .15, a = .1), this.node.stopActionByTag(this._diedTag);
                    var r = cc.sequence(cc.spawn(cc.fadeTo(a, 0), cc.moveTo(n, s)), cc.callFunc(function() {
                        e.data && ss.logic.game.recover(e.data, !0);
                    }));
                    r.setTag(this._diedTag), this.node.runAction(r);
                } else this.toBeKill();
            },
            onCollisionEnter: function(t, e) {},
            onCollisionStay: function(t, e) {},
            onCollisionExit: function(t, e) {},
            _setGrowLength: function(t) {
                this._growLength = t;
                var e = Math.floor(t);
                this.smart.setGrowLength(e), this.data.grow = t;
            },
            _setBodyLength: function(t) {
                this._bodyLength = t, this.smart.setBodyLength(t);
                var e = this.colliders[ss.enum.tag.body];
                e && (e.radius = t);
            },
            _setViewLength: function(t) {
                this._viewLength = this._bodyLength + t, this.smart.setViewLength(this._viewLength);
                var e = this.colliders[ss.enum.tag.view];
                e && (e.radius = this._viewLength);
            }
        }), cc._RF.pop();
    }, {
        "./bulubulu/Unit": "Unit",
        "./galagala/SmartC": "SmartC"
    } ],
    Pin: [ function(t, e, i) {
        cc._RF.push(e, "d68938RbZdIe62RA3YDgXl7", "Pin"), cc.Class({
            extends: cc.Component,
            properties: {
                pointNode: cc.Node
            },
            onLoad: function() {},
            startTurn: function(t) {
                this.unscheduleAllCallbacks(), this.node.stopAllActions(), this.callBack = t, this.pointNode.stopAllActions(), 
                this.countToTarget();
                var e = 2 * ss.config.lottery.addSpeedTime + ss.config.lottery.runTime, i = cc.rotateBy(e, this.targetRoation).easing(cc.easeInOut(e / 2));
                this.pointNode.runAction(i), this.scheduleOnce(this.runOver.bind(this), e + ss.config.lottery.waitingTime);
            },
            stopTurn: function() {
                this.startPin = !1, this.pointNode.runAction(curAction);
            },
            runOver: function() {
                this.callBack && this.callBack(this.pointNode.rotation);
            },
            countToTarget: function() {
                this.targetRoation = 360 - this.pointNode.rotation % 360 + 2160 + ss.logic.lottery.createLotteryRotation();
            },
            stopAM: function() {
                this.node.active = !1, this.node.stopAllActions();
            },
            playAM: function() {
                this.node.active = !0;
            }
        }), cc._RF.pop();
    }, {} ],
    PlatformManager: [ function(t, e, i) {
        cc._RF.push(e, "1bf983kz7tLCrSOvIG8CHJf", "PlatformManager");
        var s = t("../weixin/Advertising"), o = t("../weixin/Leaderboard"), n = t("../weixin/WeixinSdkManager"), a = function() {
            this.result = null, this.userInfo = null, this.openId = "", this.params = null, 
            this.callback = null, this.adInited = !1, this.interval = 0, this.current = null, 
            this.ad = null, this.leaderboard = null, this.bannerHeight = 210, this.system = "window", 
            this.mBanners = null;
        };
        a.prototype.initialize = function() {
            this.current = new n.WeixinSdkManager(), this.ad = new s.Advertising(), this.leaderboard = new o.Leaderboard(), 
            this.current.initialize();
        }, a.prototype.preview = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            this.current.preview(t, e);
        }, a.prototype.setWxRes = function(t) {
            this.current.setWxRes(t);
        }, a.prototype.startup = function(t) {
            this.callback = t, this.login();
        }, a.prototype.login = function() {
            var t = this;
            isWeiXin ? this.current.login(function(e) {
                t.result = e.result, t.userInfo = e.userInfo, t.openId = e.openId, t.params = e.params, 
                t.loginComplete && t.loginComplete(), t.callback && t.callback(e);
            }, function(e) {
                console.log("PlatformManager login error:", e), t.current.reconnection(t.login.bind(t));
            }, function() {}) : t.callback && t.callback(null);
        }, a.prototype.isAudited = function() {
            if (!this.result) return !1;
            var t = this.userInfo && this.userInfo.nickName ? this.userInfo.nickName : "";
            if ((t = t.toLowerCase()).indexOf("test") > -1 || t.indexOf("game") > -1 || t.indexOf("tencent") > -1 || t.indexOf("wx") > -1 || t.indexOf("weixin") > -1) return console.warn("nickName isAuditing:", t), 
            !1;
            if (this.result.hasOwnProperty("openFunc")) {
                if (!this.result.openFunc.shareFunc) return !1;
                var e = this.result.openFunc.version || 0;
                if (ss.proxy.game.version <= e) return !0;
            }
            return !1;
        }, a.prototype.isWrongBanner = function() {
            return !!this.result && (!!this.isAudited() && !(!this.result.hasOwnProperty("openFunc") || !this.result.openFunc.isWrongBanner));
        }, a.prototype.isCanBanner = function() {
            return !!this.result && !(!this.result.hasOwnProperty("openFunc") || !this.result.openFunc.isCanBanner);
        }, a.prototype.isMiniBanner = function() {
            return !!this.result && (!this.isAudited() || !(!this.result.hasOwnProperty("openFunc") || !this.result.openFunc.miniBanner));
        }, a.prototype.isAdChecked = function() {
            return !!this.result && !!this.isAudited() && !!this.result.hasOwnProperty("openFunc") && (this.result.openFunc.isAdChecked || 0);
        }, a.prototype.getRelifeType = function() {
            return this.result && this.isAudited() && this.result.hasOwnProperty("openFunc") && this.result.openFunc.relifeType || 0;
        }, a.prototype.getResultType = function() {
            return this.result && this.isAudited() && this.result.hasOwnProperty("openFunc") && this.result.openFunc.resultType || 0;
        }, a.prototype.getOpenFunc = function() {
            return this.result && this.result.hasOwnProperty("openFunc") ? this.result.openFunc : null;
        }, a.prototype.getBanners = function() {
            if (this.mBanners) return this.mBanners;
            var t = 0;
            return this.result && this.result.hasOwnProperty("openFunc") && (t = this.result.openFunc.bannerIndex || 0), 
            t = t > 0 ? Math.min(Math.max(1, t), ss.config.adunit.bannersLength) : Math.ceil(Math.random() * ss.config.adunit.bannersLength), 
            this.mBanners = ss.config.adunit["banners_" + t], this.mBanners || (this.mBanners = ss.config.adunit.banners_1), 
            console.log(t + " getBanners:", this.mBanners), this.mBanners;
        }, a.prototype.isUserInfoButton = function() {
            return !!isWeiXin && this.current.checkSDKVersion("2.0.1");
        }, a.prototype.loginComplete = function() {
            if (this.userInfo = this.userInfo || {
                nickName: " ",
                avatarUrl: " "
            }, isWeiXin) {
                var t = this.userInfo.nickName, e = this.userInfo.avatarUrl;
                (!t || t.length < 1) && (t = " "), (!e || e.length < 1) && (e = " ");
                var i = wx.getSystemInfoSync();
                if (i && i.system) {
                    var s = i.system.toLowerCase();
                    s.indexOf("android") >= 0 ? this.system = "android" : s.indexOf("ios") >= 0 && (this.system = "ios");
                }
            }
            this.proxyInitialize(), this.leaderboardInitialize(), this.adInitialize(), this.wxInitialize();
        }, a.prototype.proxyInitialize = function() {
            if (ss.proxy.userInfo = this.userInfo, this.result) {
                var t = this.result && this.result.user ? this.result.user : null;
                ss.proxy.httpParams = {
                    uid: t ? t.id : "",
                    account_id: t ? t.accountId : "",
                    sid: this.result.secret_id ? this.result.secret_id : "",
                    platform: ss.proxy.game.platform,
                    game_type: ss.proxy.game.type,
                    invite_uid: t ? t.id : ""
                };
            }
        }, a.prototype.leaderboardInitialize = function() {
            if (isWeiXin) {
                var t = this.result && this.result.user ? this.result.user.id : encodeURIComponent(this.openId), e = this.userInfo.nickName, i = this.userInfo.avatarUrl;
                this.leaderboard.init(t, e, i);
            }
        }, a.prototype.adInitialize = function() {
            if (isWeiXin && !this.adInited) if (this.adInited = !0, this.current.checkSDKVersion("2.0.4")) {
                this.result && this.result.hasOwnProperty("openFunc") && this.result.openFunc.bannerHeight && (this.bannerHeight = this.result.openFunc.bannerHeight);
                var t = [];
                if (this.isCanBanner()) for (var e, i, o = wx.getSystemInfoSync(), n = {
                    left: (o.windowWidth - 300) / 2,
                    top: o.windowHeight - 90 + 1,
                    width: 300,
                    onResize: this.onResizeHandler.bind(this)
                }, a = this.getBanners(), r = 0; r < a.length; r++) e = a[r], i = ss.enum.advertising.mode.banner + "" + r, 
                t.push(new s.AdvertisingVo(i, ss.enum.advertising.mode.banner, e, n, this.onBannerHandler.bind(this)));
                t.push(new s.AdvertisingVo(ss.enum.advertising.mode.video, ss.enum.advertising.mode.video, ss.config.adunit.video, null, this.onVideoHandler.bind(this))), 
                this.current.checkSDKVersion("2.6.0") && t.push(new s.AdvertisingVo(ss.enum.advertising.mode.interstitial, ss.enum.advertising.mode.interstitial, ss.config.adunit.interstitial, null, this.onInterstitialHandler.bind(this))), 
                this.ad.initialize(t), this.ad.create(), this.ad.preload();
            } else console.log("warn warn warn:", "微信版本不支持广告");
        }, a.prototype.wxInitialize = function() {
            isWeiXin;
        }, a.prototype.onResizeHandler = function(t, e) {
            if (t) {
                var i = this.bannerHeight, s = wx.getSystemInfoSync(), o = Math.min(i / cc.winSize.height * s.windowHeight, t.ad.style.realHeight);
                t.ad.style.left = (s.windowWidth - t.ad.style.realWidth) / 2, t.ad.style.top = s.windowHeight - o + 1;
            }
        }, a.prototype._isReadyAdByType = function(t) {
            var e = this.ad.get(t);
            return !(!e || !e.isReady);
        }, a.prototype.isReadyAdBanner = function() {
            return this._isReadyAdByType("banner");
        }, a.prototype.isReadyAdVideo = function() {
            return this._isReadyAdByType("video");
        }, a.prototype.onBannerHandler = function(t) {
            if (cc.systemEvent.emit(ss.event.system.AdBanner, t), t && t.method == ss.enum.advertising.method.show && t.code == ss.enum.advertising.code.success) {
                var e = t.banner;
                if (e) {
                    var i = this.bannerHeight, s = wx.getSystemInfoSync(), o = this.isMiniBanner(), n = cc.winSize.height * e.ad.style.realHeight / s.windowHeight;
                    console.log("--------onBannerHandler show:", o, n), o && n > i && (e.ad.style.left = (s.windowWidth - e.ad.style.realWidth) / 2, 
                    e.ad.style.top = s.windowHeight - e.ad.style.realHeight + 1, console.log("...............设置了只显示小广告，强制屏蔽掉大广告..................."), 
                    this.ad.hideBanner());
                }
            }
        }, a.prototype.onVideoHandler = function(t) {
            cc.systemEvent.emit(ss.event.system.AdVideo, t);
        }, a.prototype.onInterstitialHandler = function(t) {
            cc.systemEvent.emit(ss.event.system.AdInterstitial, t);
        }, a.prototype.clear = function() {}, e.exports = {
            PlatformManager: a
        }, cc._RF.pop();
    }, {
        "../weixin/Advertising": "Advertising",
        "../weixin/Leaderboard": "Leaderboard",
        "../weixin/WeixinSdkManager": "WeixinSdkManager"
    } ],
    PopUp: [ function(t, e, i) {
        cc._RF.push(e, "369ddZH9GNAR6qyiJwIddwh", "PopUp"), cc.Class({
            extends: cc.Component,
            properties: {
                mask: cc.Node,
                content: cc.Node
            },
            ctor: function() {
                this.data = null;
            },
            start: function() {},
            show: function(t) {
                if (this.data = t || ss.config.popup, this.node.active = !0, this.content.stopAllActions(), 
                this.unscheduleAllCallbacks(), this.data.isEffect) {
                    this.content.setScale(.5);
                    var e = cc.scaleTo(.5, 1, 1).easing(cc.easeElasticOut(1));
                    this.content.runAction(e);
                } else this.content.setScale(1);
                this.mask && (this.mask.opacity = this.data.opacity ? this.data.opacity : 180), 
                this.data.isOpenShowBanner ? (this.data.isOpenChangeBanner && ss.logic.open.hideBanner(), 
                this.delayShowBanner(this.data.bannerDelayTime)) : this.data.isOpenHideBanner && ss.logic.open.hideBanner();
            },
            delayShowBanner: function(t) {
                0 == t ? ss.logic.open.showBanner() : this.scheduleOnce(function() {
                    ss.logic.open.showBanner();
                }, t);
            },
            hide: function() {
                this.node.active = !1, this.content.stopAllActions(), this.data && this.data.isCloseBanner && ss.logic.open.hideBanner(), 
                this.data = null;
            },
            close: function() {
                this.hide();
            }
        }), cc._RF.pop();
    }, {} ],
    Preview: [ function(t, e, i) {
        cc._RF.push(e, "e212dM986tBf4h/v/BhuJ7x", "Preview"), cc.Class({
            extends: cc.Component,
            editor: {
                executionOrder: 9999
            },
            properties: {
                logo: cc.Node,
                loading: cc.ProgressBar,
                progressTxt: cc.Label,
                loginNode: cc.Node,
                subLength: 0
            },
            onLoad: function() {
                this.progress = 0, this.isLoaded = !1, this.isLogind = !1, this.wxLoginBtn = null;
            },
            start: function() {
                this.loading.node.active = !1, this.loginNode.active = !1, this.ready();
            },
            ready: function() {
                var t = this;
                ss.logic.ald && ss.logic.ald.open && ss.logic.ald.open(), isWeiXin ? ss.proxy.noCheck ? this.login() : this.scheduleOnce(function() {
                    ss.platform.preview(function() {
                        t.login();
                    }, function() {
                        t.loginNode && (t.loginNode.active = !0), t.createUserInfoBotton();
                    });
                }, .5) : this.login();
            },
            createUserInfoBotton: function() {
                var t = this;
                if (isWeiXin) if (ss.platform.isUserInfoButton()) {
                    var e = wx.getSystemInfoSync(), i = wx.createUserInfoButton({
                        type: "text",
                        text: " ",
                        style: {
                            left: 0,
                            top: 0,
                            width: e.windowWidth,
                            height: e.windowHeight,
                            lineHeight: 40,
                            backgroundColor: "#FFFFFF01",
                            color: "#ffffff",
                            textAlign: "center",
                            fontSize: 16,
                            borderRadius: 0
                        }
                    });
                    this.wxLoginBtn = i, i.onTap(function(e) {
                        console.log("createUserInfoButton:", e), "getUserInfo:ok" == e.errMsg && (ss.platform.setWxRes(e), 
                        t.login());
                    });
                } else wx.showModal({
                    title: "提示",
                    content: "微信版本过低，请更新至最新版本再试！",
                    showCancel: !1,
                    cancelText: "",
                    confirmText: "确认",
                    success: function() {
                        console.log("showModal loadSubErr"), wx.exitMiniProgram({
                            success: function() {
                                console.log("exitMiniProgram success");
                            },
                            fail: function() {}
                        });
                    },
                    fail: function() {}
                });
            },
            login: function() {
                this.loginNode && (this.loginNode.active = !1), this.wxLoginBtn && (this.wxLoginBtn.hide(), 
                this.wxLoginBtn.destroy(), this.wxLoginBtn = null), this.isLogind || (this.isLogind = !0, 
                this.enter());
            },
            enter: function() {
                var t = this;
                ss.platform.startup(function(e) {
                    ss.http.setLoginRes(e), t.loading && t.loading.node && (t.loading.node.active = !t.isLoaded), 
                    ss.logic.ald.login(), ss.logic.ald.clickShareAld(), t.loadScene();
                });
            },
            setProgress: function(t) {
                var e = Math.min(1, t);
                this.loading.progress = e, this.progressTxt.string = "加载进度：" + (100 * e).toFixed(2) + "%";
            },
            loadScene: function() {
                var t = this, e = this;
                console.log("loadScene"), e.loading.node && (e.loading.node.active = !0);
                for (var i = 0, s = this.subLength, o = [], n = 1; n <= s; n++) o.push("res" + n);
                this.asyncMap(o, this.loadSubRes.bind(this), function(i, s) {
                    if (i) return console.log("子包资源加载失败"), void t.loadSubErr();
                    !function() {
                        function t() {
                            s && o && (e.setProgress(100), cc.director.loadScene("game"));
                        }
                        var i = 0, s = !1, o = !1;
                        e.schedule(function() {
                            i++, e.progress = .01 + i / 100 * .98, e.setProgress(e.progress), i >= 100 && (s = !0, 
                            e.unscheduleAllCallbacks(), t());
                        }, .01, 100), cc.director.preloadScene("game", function(i, s) {
                            console.log("loaded", i, s), o = !0, cc.loader.onProgress = null, e.isLoaded = !0, 
                            t();
                        });
                    }();
                }, function() {
                    i++, e.progress = Math.min(.01, i / o.length * .01), e.setProgress(e.progress);
                });
            },
            loadSubErr: function() {
                wx.showModal({
                    title: "提示",
                    content: "资源加载异常，请检查网络再试！",
                    showCancel: !1,
                    cancelText: "",
                    confirmText: "确认",
                    success: function() {
                        console.log("showModal loadSubErr"), wx.exitMiniProgram({
                            success: function() {
                                console.log("exitMiniProgram success");
                            },
                            fail: function() {}
                        });
                    },
                    fail: function() {}
                });
            },
            loadSubRes: function(t, e) {
                isWeiXin ? wx.loadSubpackage ? wx.loadSubpackage({
                    name: t,
                    success: function(t) {
                        e(null, t);
                    },
                    fail: function(t) {
                        console.log("loadSubRes error error :", t), e(t);
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "微信版本过低，请升级后再试！",
                    showCancel: !1,
                    cancelText: "",
                    confirmText: "确认",
                    success: function() {
                        console.log("showModal loadSubErr"), wx.exitMiniProgram({
                            success: function() {
                                console.log("exitMiniProgram success");
                            },
                            fail: function() {}
                        });
                    },
                    fail: function() {}
                }) : e(null);
            },
            asyncMap: function(t, e, i, s) {
                if (t.length <= 0) i(null, []); else for (var o = [], n = 0, a = t.length, r = null, c = 0; c < a; c++) e(t[c], function(t, e) {
                    r || (t ? i(r = t, o) : (o.push(e), n++, s && s(), n == a && i(r, o)));
                });
            }
        }), cc._RF.pop();
    }, {} ],
    Proxy: [ function(t, e, i) {
        cc._RF.push(e, "19793+SjQ1Mk7cpCv6RlsD+", "Proxy");
        var s = {
            game: {
                type: 30,
                version: 32,
                url: "https://game1.kiduo.cn",
                platform: 2,
                isOther: !0,
                third_type: 0,
                debug: !1,
                audited: !1,
                isAldDataEyes: !1,
                noCheck: !1
            },
            httpParams: {
                uid: "",
                account_id: "",
                sid: "",
                platform: "",
                game_type: "",
                invite_uid: ""
            },
            userInfo: null,
            share: {
                group: {
                    url: "",
                    shareTimes: 0,
                    params: null
                },
                dataEyes: {
                    url: "",
                    params: null
                }
            }
        };
        e.exports = {
            Proxy: s
        }, cc._RF.pop();
    }, {} ],
    Quick: [ function(t, e, i) {
        cc._RF.push(e, "d100cixrEhLQJvB5l1bT6xy", "Quick");
        var s = function(t) {
            this.step = 0, this.up = 1, this.max = 5, this.duration = 1e3, this.down = 100, 
            this.comp = t, this.state = o.DEFAULT, this.time = 0, this.playing = !1, this.speeding = !1;
        };
        s.prototype.setData = function(t) {
            this.up = t.up, this.max = t.max, this.duration = t.duration, this.down = t.down;
        }, s.prototype.play = function() {
            this.playing = !0;
        }, s.prototype.stop = function() {
            this.playing = !1, this.clear();
        }, s.prototype.addSpeed = function() {
            return !!this.playing && !this.speeding && (this.time = 0, this.step = 0, this.state = o.UP, 
            this.speeding = !0, !0);
        }, s.prototype.clear = function() {
            this.speeding = !1, this.state = o.DEFAULT, this.step = 0, this.time = 0;
        }, s.prototype.update = function(t) {
            if (this.playing && this.speeding) {
                switch (this.state) {
                  case o.DEFAULT:
                    break;

                  case o.UP:
                    this.step += this.up, this.step >= this.max && (this.state = o.DURATION, this.time = 0, 
                    this.step = this.max);
                    break;

                  case o.DURATION:
                    this.step = this.max, this.time += 1e3 * t, this.time > this.duration && (this.state = o.DOWN, 
                    this.time = 0);
                    break;

                  case o.DOWN:
                    this.step -= this.down, this.step <= 0 && this.clear();
                }
                this.comp && this.comp.onQuickUpdate && this.comp.onQuickUpdate({
                    speed: this.step,
                    state: this.state
                });
            }
        }, e.exports = {
            Quick: s
        };
        var o = cc.Enum({
            DEFAULT: 0,
            UP: 1,
            DURATION: 2,
            DOWN: 3
        });
        cc._RF.pop();
    }, {} ],
    Radar: [ function(t, e, i) {
        cc._RF.push(e, "7b080gYsv5N5YbwGmps2zEl", "Radar"), cc.Class({
            extends: cc.Component,
            properties: {},
            ctor: function() {
                this.data = null;
            },
            start: function() {},
            preview: function(t) {},
            init: function(t, e) {
                this.data = t;
                var i = cc.Color.WHITE;
                switch (t.type) {
                  case ss.enum.roleType.superman:
                    i = cc.Color.YELLOW;
                    break;

                  case ss.enum.roleType.pacman:
                    switch (t.camp) {
                      case ss.enum.gameCamp.normal:
                      case ss.enum.gameCamp.sentinel:
                        i = cc.Color.RED;
                        break;

                      case ss.enum.gameCamp.scourge:
                        i = cc.Color.BLUE;
                    }
                    break;

                  case ss.enum.roleType.ghost:
                    i = cc.Color.ORANGE;
                }
                this.node.color = i, this.node.zIndex = t.zIndex, this.move(t.pos);
            },
            play: function() {},
            clear: function() {
                this.data = null;
            },
            move: function(t) {
                if (this.data) {
                    var e = t.x * this.data.scaleX, i = t.y * this.data.scaleY;
                    this.node.setPosition(e, i);
                }
            }
        }), cc._RF.pop();
    }, {} ],
    RandomTools: [ function(t, e, i) {
        cc._RF.push(e, "a32f53F4oFC2akq+AqxlL2J", "RandomTools");
        var s = function() {};
        e.exports = {
            RandomTools: s
        }, s.randomInt = function(t, e) {
            return Math.floor((e - t + 1) * Math.random()) + t;
        }, s.getPirze = function(t, e) {
            var i = e;
            t = t, i.sort(function(t, e) {
                return Number(t.per) - Number(e.per);
            });
            for (var o = s.randomInt(1, t), n = 0; n < i.length; n++) if (o <= i[n].per) return i[n];
            return i[0];
        }, s.isInRate = function(t) {
            return t >= s.randomInt(0, 100);
        }, cc._RF.pop();
    }, {} ],
    RandomUtils: [ function(e, i, s) {
        cc._RF.push(i, "adcabM3QnJJQL/oJ9Y+slYU", "RandomUtils");
        var o = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        }, n = function() {};
        n.getRndDataFromArray = function(t, e) {
            if ("object" !== (void 0 === t ? "undefined" : o(t)) || e <= 0) return [];
            var i = [];
            for (var s in t) i.push(t[s]);
            for (var n = [], a = Math.floor(e / i.length), r = e % i.length, c = 0; c < a; c++) for (var s in t) n.push(t[s]);
            for (s = 0; s < r; s++) {
                var h = i[s], l = Math.ceil(Math.random() * (i.length - s - 1) + s);
                n.push(i[l]), i[s] = i[l], i[l] = h;
            }
            return n;
        }, n.getRndNumsFromNums = function(t, e, i) {
            for (var s = [], o = t; o <= e; o++) s.push(o);
            return n.getRndDataFromArray(s, i);
        }, n.randomInt = function(t, e) {
            return Math.floor((e - t + 1) * Math.random()) + t;
        }, n.getRandomList = function(t, e, i, s) {
            for (var o = [], n = 0; n < i; ) {
                var a = randomInt(t, e);
                -1 == s.indexOf(a) && (o.push(a), n++);
            }
            return o;
        }, n.arrayShuffer = function(t) {
            for (var e = t.length - 1, i = 0; i <= e; i++) {
                var s = n.randomInt(i, e), o = t[i];
                t[i] = t[s], t[s] = o;
            }
            return t;
        }, n.getPirze = function(t, e) {
            var i = e;
            t = t, i.sort(function(t, e) {
                return Number(t.per) - Number(e.per);
            });
            for (var s = this.randomInt(1, t), o = 0; o < i.length; o++) if (s <= i[o].per) return i[o];
            return i[i.length - 1];
        }, i.exports = {
            RandomUtils: n
        }, cc._RF.pop();
    }, {} ],
    RankItem: [ function(t, e, i) {
        cc._RF.push(e, "4011cD8vl9IQbsLV/0+Q/xf", "RankItem"), cc.Class({
            extends: cc.Component,
            properties: {
                sign: cc.Node,
                rankLab: cc.Label,
                nameLab: cc.Label,
                growLab: cc.Label
            },
            onLoad: function() {
                this.nameLab.string = "", this.growLab.string = "";
            },
            start: function() {},
            setData: function(t) {
                this.nameLab.string = t.name, this.growLab.string = "" + Math.floor(t.grow);
                var e = t.isColor ? cc.Color.ORANGE : cc.Color.WHITE;
                this.nameLab.node.color = e, this.growLab.node.color = e;
            },
            clear: function() {
                this.nameLab.string = "", this.growLab.string = "";
            }
        }), cc._RF.pop();
    }, {} ],
    RankView: [ function(t, e, i) {
        cc._RF.push(e, "f2e85ehQ1RANYr0NNr6YdL6", "RankView"), cc.Class({
            extends: cc.Component,
            properties: {
                menuNode: cc.Node,
                rankArea: cc.Node
            },
            onLoad: function() {
                this.menu = this.menuNode.getComponent("Menu"), this.popUp = this.node.getComponent("PopUp"), 
                this.data = null;
            },
            start: function() {
                this.node.active = !1;
            },
            show: function(t) {
                this.data = t, this.menu.show(ss.enum.view.rank), this.popUp.show(), isWeiXin && (sharedCanvas && (sharedCanvas.width = this.rankArea.width, 
                sharedCanvas.height = this.rankArea.height), ss.logic.open.refreshFriendRank(), 
                ss.logic.open.showRankData());
            },
            back: function() {
                this.data && this.data.from ? cc.systemEvent.emit(ss.event.client.openView, {
                    type: this.data.from,
                    from: ss.enum.view.rank
                }) : cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.main
                }), this.close();
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.data = null, 
                this.popUp.close();
            },
            clickPrevHandler: function(t) {
                ss.logic.open.prevRankData();
            },
            clickNextHandler: function(t) {
                ss.logic.open.nextRankData();
            }
        }), cc._RF.pop();
    }, {} ],
    Rassling: [ function(t, e, i) {
        cc._RF.push(e, "249d9EbreFPho93oWwJM52Z", "Rassling");
        var s = function() {
            this.manager = cc.director.getCollisionManager();
        };
        s.prototype.init = function(t) {
            this.manager.enabledDebugDraw = t.enabledDebugDraw || !1, this.manager.enabledDrawBoundingBox = t.enabledDrawBoundingBox || !1;
        }, s.prototype.play = function() {
            this.manager.enabled = !0;
        }, s.prototype.stop = function() {
            this.manager.enabled = !1;
        }, e.exports = {
            Rassling: s
        }, cc._RF.pop();
    }, {} ],
    Resize: [ function(t, e, i) {
        cc._RF.push(e, "b4a24NDUM9P3ahWVDxUwZZN", "Resize");
        var s = {};
        e.exports = {
            Resize: s
        }, s.phone = {
            w: 1280,
            h: 720
        }, s.pad = {
            w: 1560,
            h: 856
        }, s.width = 0, s.height = 0, s.ratio = 0, s.isPad = !1, s.initialize = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            if (s.width = s.phone.w, s.height = s.phone.h, t) {
                var e = cc.view.getVisibleSize();
                s.ratio = e.width / e.height, s.ratio <= 1.4 && (s.width = s.pad.w, s.height = s.pad.h, 
                s.isPad = !0);
            }
        }, cc._RF.pop();
    }, {} ],
    ResultView: [ function(t, e, i) {
        cc._RF.push(e, "bfc5fqjHSZIq7L0RNyaJGsX", "ResultView"), cc.Class({
            extends: cc.Component,
            properties: {
                menuNode: cc.Node,
                lotteryRed: cc.Node,
                inviteRed: cc.Node,
                lotteryTipLab: cc.Label,
                inviteTipLab: cc.Label,
                miniProgramNode: cc.Node,
                items: [ cc.Node ],
                goodsBtnNode: cc.Node,
                doubleBtnNode: cc.Node,
                doubleBtnNode2: cc.Node,
                againBtnNode2: cc.Node,
                skipNode: cc.Node,
                view1: cc.Node,
                view2: cc.Node,
                coinLab: cc.Label,
                diamondLab: cc.Label,
                coinLab2: cc.Label,
                diamondLab2: cc.Label,
                danImg: cc.Sprite,
                danFrames: [ cc.SpriteFrame ]
            },
            onLoad: function() {
                this.menu = this.menuNode.getComponent("Menu"), this.popUp = this.node.getComponent("PopUp"), 
                this.superBtn = this.doubleBtnNode.getComponent("SuperButton2"), this.superBtn2 = this.doubleBtnNode2.getComponent("SuperButton2"), 
                this.miniProgram = this.miniProgramNode.getComponent("WeiPaiMiniProgram"), this.comps = [];
                for (var t, e = 0, i = this.items.length; e < i; e++) t = this.items[e].getComponent("WiPaiMiniItem"), 
                this.comps.push(t);
                this.data = null, this.awards = [], this.playing = !1, this.timestamp = 0, this.resultDes = "";
            },
            start: function() {
                this.node.active = !1, cc.systemEvent.on(ss.event.client.setRed, this.setRed, this), 
                cc.systemEvent.on(ss.event.client.setExport, this._showProgram, this);
            },
            setRed: function(t) {
                switch (t.type) {
                  case ss.enum.redType.lottery:
                    this.lotteryRed.active = t.num > 0, this.lotteryTipLab.string = "" + t.num;
                    break;

                  case ss.enum.redType.invite:
                    this.inviteRed.active = t.num > 0, this.inviteTipLab.string = "" + t.num;
                }
            },
            update: function(t) {
                this.playing && (0 != this.awards.length ? (this.timestamp += t, this.timestamp >= .6 && (this.timestamp = 0, 
                this._intervalShowTip(this.awards.shift()))) : this.playing = !1);
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.unscheduleAllCallbacks(), this.menu.show();
                var e = ss.commonUtils.clone(ss.config.popup);
                if (e.opacity = 180, this.popUp.show(e), this.scheduleOnce(function() {
                    ss.logic.weiPai.request_config(!0);
                }, .2), !this.data) {
                    ss.logic.open.showInterstitial(), this.data = t, this._showResize(), this.resultDes = t.resultDes ? "" + t.resultDes : "";
                    var i = {
                        rule: ss.config.rule.result,
                        shareId: ss.config.shareIds.result,
                        onCanHandler: null,
                        onClickHandler: this.double.bind(this),
                        onLastFailHandler: this._onMaxGet.bind(this)
                    }, s = t.result.scoreData, o = ss.platform.getResultType(), n = ss.logic.open.isAudited();
                    if (0 == o && n) this.view1.active = !0, this.view2.active = !1, this.goodsBtnNode.active = !1, 
                    this.doubleBtnNode.active = !0, this.menuNode.active = !0, this.superBtn.show(i), 
                    this.coinLab.string = "+" + s.coin, this.diamondLab.string = "+" + s.diamond; else {
                        this.view1.active = !1, this.view2.active = !0, this.againBtnNode2.active = !n, 
                        this.doubleBtnNode2.active = n, this.menuNode.active = !n, this.skipNode.active = n, 
                        n && this.scheduleOnce(this._delaySkip.bind(this), .8), this.superBtn2.show(i), 
                        this.coinLab2.string = "+" + s.coin, this.diamondLab2.string = "+" + s.diamond;
                        var a = ss.logic.game.getScoreDan(ss.data.getScore());
                        this.danImg.spriteFrame = this.danFrames[a.icon];
                    }
                    s.coin > 0 && (this.awards.push("金币 +" + s.coin), ss.logic.money.simpleAdd(ss.enum.money.coin, s.coin)), 
                    s.diamond > 0 && (this.awards.push("钻石 +" + s.diamond), ss.logic.money.simpleAdd(ss.enum.money.diamond, s.diamond));
                    var r = ss.logic.game.tempData;
                    if (r) {
                        var c, h, l = r.gameData;
                        l.test && (c = ss.logic.config.getSheetData(ss.enum.sheet.goods, l.testId), h = ss.logic.config.getSheetData(ss.enum.sheet.item, c.item_id), 
                        this.awards.push("【<color=#FFA500>" + h.name + " </color>】试用到期！"));
                    }
                    ss.logic.game.hutu.result(t), this.playing = !0, ss.logic.open.gc();
                }
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.data = null, 
                this.closeSelf(), this.unschedule(this._delaySkip, this);
            },
            closeSelf: function() {
                this.popUp.close(), this.unscheduleAllCallbacks(), this.awards.length = 0, this.playing = !1, 
                this.timestamp = 0;
            },
            back: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.main
                });
            },
            skip: function() {
                this.close(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.educe,
                    msg: this.resultDes
                });
            },
            again: function() {
                ss.logic.game.callMode(ss.logic.game.gameMode);
            },
            openGoods: function() {
                this.closeSelf(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.goods,
                    from: ss.enum.view.result
                });
            },
            openRank: function() {
                this.closeSelf(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.rank,
                    from: ss.enum.view.result
                });
            },
            openLunpan: function() {
                this.closeSelf(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.lottery,
                    from: ss.enum.view.result
                });
            },
            openInvite: function() {
                ss.logic.open.isAudited() ? (this.closeSelf(), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.invite,
                    from: ss.enum.view.result
                })) : ss.logic.open.shareBase(ss.config.shareIds.home);
            },
            double: function() {
                if (this.data) {
                    var t = this.data.result;
                    if (t) {
                        var e = t.scoreData;
                        e && (e.coin > 0 && (this.awards.push("金币 +" + e.coin), ss.logic.money.simpleAdd(ss.enum.money.coin, e.coin)), 
                        e.diamond > 0 && (this.awards.push("钻石 +" + e.diamond), ss.logic.money.simpleAdd(ss.enum.money.diamond, e.diamond)), 
                        this.playing || (this.playing = !0), this.goodsBtnNode.active = !0, this.doubleBtnNode.active = !1, 
                        this.againBtnNode2.active = !0, this.doubleBtnNode2.active = !1);
                    }
                }
            },
            _showProgram: function() {
                if (this.node.active && ss.logic.open.isAudited() && 0 != ss.config.miniProgram.open && isWeiXin) {
                    var t = ss.logic.weiPai.getRandAdsInfo(ss.enum.weiPai.AdPosition.end_I);
                    if (this._showMiniProgram(t), ss.logic.weiPai.batchReportExposure_list(t), this.view1.active) {
                        var e = ss.logic.weiPai.getAdsInfos(ss.enum.weiPai.AdPosition.endList_MI);
                        this._showGridProgram(e), ss.logic.weiPai.batchReportExposure_list(e);
                    }
                }
            },
            _showGridProgram: function(t) {
                if (isWeiXin && t) for (var e = 0, i = this.comps.length; e < i; e++) e < t.length ? (this.comps[e].node.active = !0, 
                this.comps[e].setData(t[e])) : this.comps[e].node.active = !1;
            },
            _showMiniProgram: function(t) {
                isWeiXin && this.miniProgram && this.miniProgram.show(t);
            },
            _showResize: function() {
                var t;
                ss.Resize.isPad && ((t = this.miniProgramNode.getComponent(cc.Widget)).left = 30, 
                t.updateAlignment());
            },
            _intervalShowTip: function(t) {
                ss.logic.tips.hint(t);
            },
            _delaySkip: function() {
                this.skipNode.active = !0;
            },
            _onMaxGet: function() {
                this.doubleBtnNode.active && (this.goodsBtnNode.active = !0, this.doubleBtnNode.active = !1), 
                this.doubleBtnNode2.active && (this.doubleBtnNode2.active = !1, this.againBtnNode2.active = !0);
            }
        }), cc._RF.pop();
    }, {} ],
    ReviveView: [ function(t, e, i) {
        cc._RF.push(e, "59bcfitK/VEUrPTEYKzJfzx", "ReviveView"), cc.Class({
            extends: cc.Component,
            properties: {
                cdTime: 5,
                coolDOwnLab: cc.Label,
                giveUpNode: cc.Node,
                reviveBtn: cc.Node
            },
            onLoad: function() {
                this.currTime = 0, this.timestamps = 0, this.playing = !1, this.pausing = !1, this.popUp = this.node.getComponent("PopUp"), 
                this.superBtn = this.reviveBtn.getComponent("SuperButton2");
            },
            start: function() {
                this.node.active = !1, cc.systemEvent.on(ss.event.system.AdVideo, this.onAdVideo, this), 
                cc.game.on(cc.game.EVENT_HIDE, this.pause, this), cc.game.on(cc.game.EVENT_SHOW, this.resume, this);
            },
            pause: function() {
                this.playing && !this.pausing && (this.pausing = !0);
            },
            resume: function() {
                this.playing && this.pausing && (this.pausing = !1);
            },
            update: function(t) {
                if (this.playing && !this.pausing && (this.timestamps += t, this.timestamps >= 1)) {
                    if (this.timestamps = 0, this.currTime--, this._toTimeString(), this.currTime > 0) return;
                    this._callGameOver();
                }
            },
            show: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                var t = ss.config.bannerWrong[ss.enum.view.revive], e = ss.logic.open.isWrongBanner(t), i = ss.commonUtils.clone(ss.config.popup);
                i.opacity = 180, i.isOpenShowBanner = !0, i.bannerDelayTime = e ? t.showTime : 0, 
                this.popUp.show(i);
                var s = "revive";
                switch (ss.platform.getRelifeType()) {
                  case 0:
                    s = "revive";
                    break;

                  case 1:
                    s = "revive_2";
                    break;

                  case 2:
                    s = "revive";
                }
                this.superBtn.show({
                    rule: ss.config.rule[s],
                    shareId: ss.config.shareIds.revive,
                    onCanHandler: null,
                    onClickHandler: this._clickHandler.bind(this),
                    onFailHandler: this._failHandler.bind(this)
                }), this.currTime = this.cdTime, this.timestamps = 0, this.playing = !0, this._toTimeString();
                var o = 0;
                e ? (this.giveUpNode.active = !0, o = 130) : (this.giveUpNode.active = !1, o = 270);
                var n = this.giveUpNode.getComponent(cc.Widget);
                n && (n.bottom = o, n.updateAlignment()), this.scheduleOnce(this._delayGiveUp.bind(this), t.skipTime), 
                ss.logic.open.gc();
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.unschedule(this._delayGiveUp, this), 
                this.timestamps = 0, this.playing = !1, this.pausing = !1, this.popUp.close();
            },
            click: function() {
                this.playing = !1;
            },
            giveUp: function() {
                this._callGameOver();
            },
            onAdVideo: function(t) {
                if (this.node.active && this.node.parent && this.node.parent.active) {
                    var e = t;
                    if (e && e.method) switch (e.method) {
                      case ss.enum.advertising.method.show:
                        e.code == ss.enum.advertising.code.failed ? this.playing = !0 : this.playing = !1;
                        break;

                      case ss.enum.advertising.method.onClose:
                        e.code == ss.enum.advertising.code.success ? this.playing = !1 : this.playing = !0;
                        break;

                      default:
                        this.playing = !0;
                    }
                }
            },
            _delayGiveUp: function() {
                this.giveUpNode.active = !0;
                var t = this.giveUpNode.getComponent(cc.Widget);
                t && (t.bottom = 270, t.updateAlignment());
            },
            _clickHandler: function() {
                this._callGameRevive();
            },
            _failHandler: function() {
                this.node.active && (this.playing = !0);
            },
            _toTimeString: function() {
                this.coolDOwnLab.string = "" + Math.max(this.currTime, 1);
            },
            _callGameRevive: function() {
                ss.logic.game.revive(), this.close();
            },
            _callGameOver: function() {
                this.close(), ss.logic.game.callOver(!1, null, null, ss.logic.game.getKillData(), ss.logic.game.getGiveUpScoreData());
            }
        }), cc._RF.pop();
    }, {} ],
    RomManager: [ function(t, e, i) {
        cc._RF.push(e, "d0591iqcQ1NZZU3AcVT+QZV", "RomManager");
        var s = function() {
            this.items = null;
        };
        s.prototype.initialize = function() {
            this.items = new ss.Dictionary();
        }, s.prototype.set = function(t, e) {
            this.items.set(t, e);
        }, s.prototype.get = function(t) {
            return this.items.get(t);
        }, s.prototype.clear = function() {
            this.items.clear();
        }, e.exports = {
            RomManager: s
        }, cc._RF.pop();
    }, {} ],
    ScaleButton: [ function(t, e, i) {
        cc._RF.push(e, "c8e86xr0rRHd5cmrTZH/BPs", "ScaleButton"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function() {
                this.node.stopAllActions(), this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.35, 1.05), cc.scaleTo(.35, 1))));
            }
        }), cc._RF.pop();
    }, {} ],
    ScaleNode: [ function(t, e, i) {
        cc._RF.push(e, "8f009mgEbtIJpq5wrhMxHfF", "ScaleNode"), cc.Class({
            extends: cc.Component,
            properties: {
                durition: .1,
                scaleTo: 1.5,
                updateEvent: {
                    default: null,
                    type: cc.Component.EventHandler,
                    tooltip: !1
                },
                completeEvent: {
                    default: null,
                    type: cc.Component.EventHandler,
                    tooltip: !1
                }
            },
            ctor: function() {
                this.datas = [], this.isPlaying = !1;
            },
            onLoad: function() {},
            start: function() {},
            play: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.node && this.node.active && (t && Array.isArray(t) ? this.datas = this.datas.concat(t) : this.datas.push(t), 
                this.isPlaying || (this.isPlaying = !0, this.node.stopAllActions(), this._$playAction()));
            },
            stop: function() {
                this.isPlaying = !1, this.datas.length = 0, this.node.stopAllActions(), this.node.setScale(1);
            },
            _$playAction: function() {
                this.node.setScale(1);
                var t = 1, e = this.datas.length;
                if (e >= 8) this._$completeAction(); else {
                    e >= 4 ? t = 4 : e >= 2 && (t = 2);
                    var i = cc.speed(cc.sequence(cc.scaleTo(this.durition, this.scaleTo), cc.scaleTo(this.durition, 1), cc.callFunc(this._$completeAction, this)), t);
                    this.node.runAction(i);
                }
            },
            _$completeAction: function() {
                this.node.stopAllActions();
                var t = this.datas.shift();
                this.updateEvent && this.updateEvent.emit([ t ]), this.datas.length > 0 ? this._$playAction() : (this.datas.length = 0, 
                this.isPlaying = !1, this.completeEvent && this.completeEvent.emit([]));
            }
        }), cc._RF.pop();
    }, {} ],
    SdkConf: [ function(t, e, i) {
        cc._RF.push(e, "2fe6a0nfBZEIqYWHLlyvyUn", "SdkConf");
        var s = t("../const/SdkConst"), o = function() {};
        e.exports = {
            SdkConf: o
        }, o.SDK_CONF = {};
        var n = s.SdkConst.CONF_TYPE, a = s.SdkConst.PLATFORM_TYPE;
        o.SDK_CONF[n.DEFAULT] = a.COCOS, o.SDK_CONF[n.NORMAL] = a.WECHAT, o.SDK_CONF[n.HTTP] = a.WECHAT, 
        cc._RF.pop();
    }, {
        "../const/SdkConst": "SdkConst"
    } ],
    SdkConst: [ function(t, e, i) {
        cc._RF.push(e, "a650dzLKVBBELdGSULlOYGy", "SdkConst");
        var s = function() {};
        e.exports = {
            SdkConst: s
        }, s.PLATFORM_TYPE = {
            COCOS: 0,
            WECHAT: 1
        }, s.CONF_TYPE = {
            DEFAULT: 0,
            NORMAL: 1,
            HTTP: 2
        }, cc._RF.pop();
    }, {} ],
    SdkService: [ function(t, e, i) {
        cc._RF.push(e, "8cf77LoqnJL6aYLcck3a1j4", "SdkService");
        var s = t("../util/Utils"), o = t("./sdk/CocosSdk"), n = t("./sdk/WechatSdk"), a = t("./const/HttpConst"), r = t("./const/ShareConst"), c = t("./const/SdkConst"), h = t("./conf/SdkConf"), l = function() {
            this.sdkConf = {};
            var t = "undefined" != typeof wx;
            for (var e in h.SdkConf.SDK_CONF) this.sdkConf[e] = t ? s.Utils.clone(h.SdkConf.SDK_CONF[e]) : c.SdkConst.PLATFORM_TYPE.COCOS;
            this.sdks = {}, this.sdks[c.SdkConst.PLATFORM_TYPE.COCOS] = new o.CocosSdk(), this.sdks[c.SdkConst.PLATFORM_TYPE.WECHAT] = new n.WechatSdk();
        };
        e.exports = {
            SdkService: l
        };
        var d = null;
        l.getInstance = function() {
            return null == d && (d = new l()), d;
        }, l.prototype.getFunction = function(t, e) {
            s.Utils.isValidValue(e) || (e = this.sdkConf[c.SdkConst.CONF_TYPE.NORMAL]);
            var i = this.sdkConf[c.SdkConst.CONF_TYPE.DEFAULT];
            return s.Utils.getObjFuncEx(this.sdks[e], t, this.sdks[i]);
        }, l.prototype.setConfPlatform = function(t, e) {
            this.sdkConf[t] = e;
        }, l.prototype.getStorage = function(t, e) {
            var i = this.getFunction("getStorage");
            if (!i) return console.log("SdkService.getStorage sdk func not exist"), void s.Utils.invokeCb(e, null);
            i(t, e);
        }, l.prototype.setStorage = function(t, e, i) {
            var o = this.getFunction("setStorage");
            if (!o) return console.log("SdkService.setStorage sdk func not exist"), void s.Utils.invokeCb(i, !1);
            o(t, e, i);
        }, l.prototype.httpGet = function(t, e, i) {
            var o = this.sdkConf[c.SdkConst.CONF_TYPE.HTTP], n = this.getFunction("httpRequest", o);
            if (!n) return console.log("SdkService.httpGet sdk func not exist"), void s.Utils.invokeCb(i, null, a.HttpConst.HTTP_CODE.FUNC_NOT_EXIST);
            n(a.HttpConst.HTTP_METHOD.GET, t, e, i);
        }, l.prototype.httpPost = function(t, e, i) {
            var o = this.sdkConf[c.SdkConst.CONF_TYPE.HTTP], n = this.getFunction("httpRequest", o);
            if (!n) return console.log("SdkService.httpPost sdk func not exist"), void s.Utils.invokeCb(i, null, a.HttpConst.HTTP_CODE.FUNC_NOT_EXIST);
            n(a.HttpConst.HTTP_METHOD.POST, t, e, i);
        }, l.prototype.shareNormal = function(t, e, i, o, n, a) {
            var c = this.getFunction("shareAppMessage");
            if (!c) {
                var h = {
                    succ: !1,
                    mod: r.ShareConst.SHARE_MOD.NORMAL,
                    code: r.ShareConst.SHARE_CODE.FUNC_NOT_EXIST,
                    cbParam: a
                };
                return console.log("SdkService.shareNormal sdk func not exist"), void s.Utils.invokeCb(n, h);
            }
            c(r.ShareConst.SHARE_MOD.NORMAL, t, e, i, o, n, a);
        }, l.prototype.shareGroup = function(t, e, i, o, n, a) {
            var c = this.getFunction("shareAppMessage");
            if (!c) {
                var h = {
                    succ: !1,
                    mod: r.ShareConst.SHARE_MOD.GROUP,
                    code: r.ShareConst.SHARE_CODE.FUNC_NOT_EXIST,
                    cbParam: a
                };
                return console.log("SdkService.shareGroup sdk func not exist"), void s.Utils.invokeCb(n, h);
            }
            c(r.ShareConst.SHARE_MOD.GROUP, t, e, i, o, n, a);
        }, l.prototype.setAppShare = function(t, e, i, o, n, a) {
            var c = this.getFunction("setupAppMessage");
            if (!c) {
                var h = {
                    succ: !1,
                    mod: r.ShareConst.SHARE_MOD.NORMAL,
                    code: r.ShareConst.SHARE_CODE.FUNC_NOT_EXIST,
                    cbParam: a
                };
                return console.log("SdkService.setAppShare sdk func not exist"), void s.Utils.invokeCb(n, h);
            }
            c(r.ShareConst.SHARE_MOD.NORMAL, t, e, i, o, n, a);
        }, cc._RF.pop();
    }, {
        "../util/Utils": "Utils",
        "./conf/SdkConf": "SdkConf",
        "./const/HttpConst": "HttpConst",
        "./const/SdkConst": "SdkConst",
        "./const/ShareConst": "ShareConst",
        "./sdk/CocosSdk": "CocosSdk",
        "./sdk/WechatSdk": "WechatSdk"
    } ],
    ServerManager: [ function(t, e, i) {
        cc._RF.push(e, "7b73aRNdvhPWJdjSByFUTM8", "ServerManager");
        var s = function() {};
        e.exports = {
            ServerManager: s
        }, s.prototype.initialize = function() {}, s.prototype.startup = function() {
            cc.systemEvent.emit(ss.event.cmd.GameInit), cc.systemEvent.emit(ss.event.cmd.UserData), 
            cc.systemEvent.emit(ss.event.cmd.GameData);
        }, s.prototype.clear = function() {}, s.prototype.execute = function(t) {
            var e = t.data;
            switch (t.type) {
              case ss.event.protocol.ReqGamePlay:
                this.reqGamePlay(e);
                break;

              case ss.event.protocol.ReqGameOver:
                this.reqGameOver(e);
                break;

              case ss.event.protocol.ReqAddMoney:
                this.reqAddMoney(e);
                break;

              case ss.event.protocol.ReqUpdateSign:
                this.reqUpdateSign(e);
                break;

              case ss.event.protocol.ReqSetMisc:
                this.reqSetMisc(e);
                break;

              case ss.event.protocol.ReqSetGoods:
                this.reqSetGoods(e);
                break;

              case ss.event.protocol.ReqAddScore:
                this.reqAddScore(e);
            }
        }, s.prototype.reqGamePlay = function(t) {
            cc.systemEvent.emit(ss.event.cmd.GamePlay, t);
        }, s.prototype.reqGameOver = function(t) {
            cc.systemEvent.emit(ss.event.cmd.GameOver, t);
        }, s.prototype.reqAddMoney = function(t) {
            ss.data.addMoney(t.moneyType, t.money), cc.systemEvent.emit(ss.event.cmd.AddMoney, t);
        }, s.prototype.reqUpdateSign = function(t) {}, s.prototype.reqSetMisc = function(t) {
            ss.data.setMisc(t), cc.systemEvent.emit(ss.event.cmd.SetMisc, t);
        }, s.prototype.reqSetGoods = function(t) {
            switch (t.method) {
              case ss.enum.goodsMethod.add:
                ss.data.addGoods(t.item);
                break;

              case ss.enum.goodsMethod.remove:
                ss.data.removeGoods(t.item.id);
                break;

              case ss.enum.goodsMethod.use:
                ss.data.useGoods(t.item);
            }
            cc.systemEvent.emit(ss.event.cmd.SetGoods, t);
        }, s.prototype.reqAddScore = function(t) {
            ss.data.addScore(t), cc.systemEvent.emit(ss.event.cmd.AddScore, t);
        }, cc._RF.pop();
    }, {} ],
    SetsView: [ function(t, e, i) {
        cc._RF.push(e, "925f8RllY9KgaFPU1i6n6Y0", "SetsView"), cc.Class({
            extends: cc.Component,
            properties: {
                bgSoundToggle: cc.Node,
                effectSoundToggle: cc.Node,
                vibrateToggle: cc.Node,
                leftToggle: cc.Node,
                rightToggle: cc.Node,
                leftCtrl: cc.Node,
                rightCtrl: cc.Node
            },
            onLoad: function() {
                this.popUp = this.node.getComponent("PopUp"), this.data = null, this.count = 0;
            },
            start: function() {
                this.node.active = !1;
            },
            init: function() {
                this._setViewAndData();
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.data = t;
                var e = ss.commonUtils.clone(ss.config.popup);
                e.opacity = 180, e.isEffect = !0, this.popUp.show(e);
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.popUp.close(), 
                this.data = null;
            },
            back: function() {
                this.data && this.data.backFun && this.data.backFun(), this.close();
            },
            setBgSound: function() {
                if (0 != this.count) {
                    var t = !ss.data.sets.bgSoundabled;
                    this.bgSoundToggle.active = t, ss.data.sets.bgSoundabled = t, ss.logic.sound.setBgEnabled(t), 
                    ss.logic.storage.saveSets();
                }
            },
            setEffectSound: function() {
                if (0 != this.count) {
                    var t = !ss.data.sets.effectSoundabled;
                    this.effectSoundToggle.active = t, ss.data.sets.effectSoundabled = t, ss.logic.sound.setSoundEnabled(t), 
                    ss.logic.storage.saveSets();
                }
            },
            setVibrate: function() {
                if (0 != this.count) {
                    var t = !ss.data.sets.vibrateabled;
                    this.vibrateToggle.active = t, ss.data.sets.vibrateabled = t, ss.logic.open.setVibrate(t), 
                    ss.logic.storage.saveSets();
                }
            },
            setLeftCtrl: function() {
                0 != this.count && (this.leftToggle.active || (this.leftToggle.active = !0, this.rightToggle.active = !1, 
                this.leftCtrl.active = !0, this.rightCtrl.active = !1, ss.data.sets.rightabled = !1, 
                ss.logic.storage.saveSets()));
            },
            setRightCtrl: function() {
                0 != this.count && (this.rightToggle.active || (this.leftToggle.active = !1, this.rightToggle.active = !0, 
                this.leftCtrl.active = !1, this.rightCtrl.active = !0, ss.data.sets.rightabled = !0, 
                ss.logic.storage.saveSets()));
            },
            _setViewAndData: function() {
                this.count = 0, this.bgSoundToggle.active = ss.data.sets.bgSoundabled, this.effectSoundToggle.active = ss.data.sets.effectSoundabled, 
                this.vibrateToggle.active = ss.data.sets.vibrateabled, ss.logic.sound.setBgEnabled(ss.data.sets.bgSoundabled), 
                ss.logic.sound.setSoundEnabled(ss.data.sets.effectSoundabled), ss.logic.open.setVibrate(ss.data.sets.vibrateabled), 
                ss.data.sets.rightabled ? (this.leftToggle.active = !1, this.rightToggle.active = !0, 
                this.leftCtrl.active = !1, this.rightCtrl.active = !0) : (this.leftToggle.active = !0, 
                this.rightToggle.active = !1, this.leftCtrl.active = !0, this.rightCtrl.active = !1), 
                this.count = 1;
            }
        }), cc._RF.pop();
    }, {} ],
    SetsVo: [ function(t, e, i) {
        cc._RF.push(e, "ca930r3YLtGzpJLRHBDeaFb", "SetsVo"), e.exports = {
            SetsVo: function() {
                this.newId = 1, this.bgSoundabled = !0, this.effectSoundabled = !0, this.vibrateabled = !0, 
                this.rightabled = !1;
            }
        }, cc._RF.pop();
    }, {} ],
    ShaderHelper: [ function(t, e, i) {
        cc._RF.push(e, "9d066yhGmhOB7tqpWuKqag8", "ShaderHelper");
        var s = t("CustomMaterial"), o = cc.Enum({}), n = cc.Class({
            extends: cc.Component,
            editor: !1,
            properties: {
                _shaderObject: null,
                program: {
                    type: o,
                    default: 0,
                    notify: function(t) {
                        this.program !== t && this.applyShader();
                    }
                }
            },
            __preload: function() {
                var t = s.getAllName();
                n.ShaderEnum = s.getShaderEnum(), cc.Class.Attr.setClassAttr(n, "program", "enumList", t);
            },
            onLoad: function() {
                this.sprite = this.getComponent(cc.Sprite), this.applyShader();
            },
            update: function(t) {
                this.node.active && this._shaderObject && this._shaderObject.update && this._shaderObject.update(this.sprite, this.material, t);
            },
            applyShader: function() {
                this._shaderObject = s.getShaderByIndex(this.program);
                var t = this.sprite, e = this._shaderObject.params, i = this._shaderObject.defines, o = t.getMaterial(this._shaderObject.name);
                o || (o = new s(this._shaderObject.name, e, i || []), t.setMaterial(this._shaderObject.name, o)), 
                this.material = o, t.activateMaterial(this._shaderObject.name), e && e.forEach(function(t) {
                    void 0 !== t.defaultValue && o.setParamValue(t.name, t.defaultValue);
                }), this._shaderObject.start && this._shaderObject.start(t, o);
            }
        });
        e.exports = n, cc._RF.pop();
    }, {
        CustomMaterial: "CustomMaterial"
    } ],
    ShaderHook: [ function(t, e, i) {
        cc._RF.push(e, "566b0ITrP5HbptdPsGhaPda", "ShaderHook");
        var s = cc.renderer.renderEngine, o = s.SpriteMaterial, n = s.GraySpriteMaterial;
        cc.Sprite.prototype.getMaterial = function(t) {
            return this._materials ? this._materials[t] : void 0;
        }, cc.Sprite.prototype.setMaterial = function(t, e) {
            this._materials || (this._materials = {}), this._materials[t] = e;
        }, cc.Sprite.prototype.activateMaterial = function(t) {
            var e = this.getMaterial(t);
            e && e !== this._currMaterial && (e ? (this.node && (e.color = this.node.color), 
            this.spriteFrame && (e.texture = this.spriteFrame.getTexture()), this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR, 
            this._currMaterial = e, this._currMaterial.name = t, this._state = 101, this._activateMaterial()) : console.error("activateMaterial - unknwon material: ", t));
        }, cc.Sprite.prototype.getCurrMaterial = function() {
            if (101 === this._state) return this._currMaterial;
        }, cc.Sprite.prototype._activateMaterial = function() {
            var t = this._spriteFrame;
            if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
                var e = void 0;
                if (this._state === cc.Sprite.State.GRAY) this._graySpriteMaterial || (this._graySpriteMaterial = new n(), 
                this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR), e = this._graySpriteMaterial, 
                this._currMaterial = null; else if (101 === this._state) {
                    if (!this._currMaterial) return void console.error("_activateMaterial: _currMaterial undefined!");
                    e = this._currMaterial;
                } else this._spriteMaterial || (this._spriteMaterial = new o(), this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR), 
                e = this._spriteMaterial, this._currMaterial = null;
                if (t && t.textureLoaded()) {
                    var i = t.getTexture();
                    e.texture !== i ? (e.texture = i, this._updateMaterial(e)) : e !== this._material && this._updateMaterial(e), 
                    this._renderData && (this._renderData.material = e), this.markForUpdateRenderData(!0), 
                    this.markForRender(!0);
                } else this.disableRender();
            }
        }, cc._RF.pop();
    }, {} ],
    Shadow: [ function(t, e, i) {
        cc._RF.push(e, "83427e6wX9JaZSn3pkRAoSX", "Shadow"), cc.Class({
            extends: cc.Component,
            properties: {},
            ctor: function() {
                this.data = null, this.params = null, this.playing = !1;
            },
            onLoad: function() {},
            start: function() {},
            update: function(t) {},
            preview: function(t) {},
            init: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this.data = t, this.params = e, this.node.setPosition(t.pos), this.node.setContentSize(t.size), 
                this.node.setScale(t.scaleX, t.scaleY), this.node.rotation = t.rotation, this.node.opacity = 120, 
                this.node.zIndex = 4;
                var i = ss.logic.config.getSheetData(ss.enum.sheet.goods, t.mid || 20001), s = i && i.item_id ? i.item_id : 20001, o = ss.logic.config.getSheetData(ss.enum.sheet.item, s);
                this.node.getComponent(cc.Sprite).spriteFrame = ss.logic.asset.getPacmanIcon(o.icon);
            },
            play: function() {
                var t = this;
                this.playing = !0, this.node.stopAllActions();
                var e = cc.sequence(cc.fadeTo(.3, 0), cc.callFunc(function() {
                    t.data && ss.logic.game.bulu.recoverShadow(t.data.id);
                }));
                this.node.runAction(e);
            },
            clear: function() {
                this.data = null, this.params = null, this.playing = !1, this.node.opacity = 255, 
                this.node.setScale(1), this.node.stopAllActions();
            },
            removeTarget: function(t) {
                this.data && this.data.target == t && ss.logic.game.bulu.recoverShadow(this.data.id);
            }
        }), cc._RF.pop();
    }, {} ],
    ShakeButton: [ function(t, e, i) {
        cc._RF.push(e, "69be8tFJjdJ9K/TusGBXSdH", "ShakeButton"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function() {
                this.node.stopAllActions(), this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.repeat(cc.sequence(cc.rotateTo(.08, 8), cc.rotateTo(.08, -8)), 4), cc.rotateTo(.04, 0))));
            }
        }), cc._RF.pop();
    }, {} ],
    ShareConf: [ function(t, e, i) {
        cc._RF.push(e, "0d6d0F+IxxCfJ8RZ+k/nE20", "ShareConf");
        var s = function() {};
        e.exports = {
            ShareConf: s
        }, s.SHARE_TXT = {
            1: "test1",
            2: "test2",
            3: "test3"
        }, s.SHARE_IMG = {
            1: "Leaderboard/res/share1.png",
            2: "Leaderboard/res/share2.png",
            3: "Leaderboard/res/share3.png"
        }, s.SHARE_URL = {
            1: "test1",
            2: "test2",
            3: "test3"
        }, s.SHARE_CONF = {
            templete1: [ {
                txt: 1,
                img: 1,
                url: 1
            }, {
                txt: 1,
                img: 1,
                url: 1
            }, {
                txt: 1,
                img: 1,
                url: 1
            } ],
            templete2: [ {
                txt: 2,
                img: 2,
                url: 2
            }, {
                txt: 2,
                img: 2,
                url: 2
            }, {
                txt: 2,
                img: 2,
                url: 2
            } ]
        }, cc._RF.pop();
    }, {} ],
    ShareConst: [ function(t, e, i) {
        cc._RF.push(e, "94699M/sKNOZIksRatXywqp", "ShareConst");
        var s = function() {};
        e.exports = {
            ShareConst: s
        }, s.SHARE_MOD = {
            NORMAL: 0,
            GROUP: 1
        }, s.SHARE_CODE = {
            NORMAL_SUCC: 0,
            GROUP_SUCC: 1,
            CANCEL: 2,
            FAILED: 1e5,
            FUNC_NOT_EXIST: 100001,
            WX_FUNC_FAILD: 100002,
            FAILED_GOURP: 100003,
            FAILED_GOURP_FULL: 100004
        }, cc._RF.pop();
    }, {} ],
    ShareGroup: [ function(t, e, i) {
        cc._RF.push(e, "ffa6cFC1dFLLZoaUrssgP+M", "ShareGroup");
        var s = t("../SdkService"), o = t("../../util/Utils"), n = t("../const/HttpConst"), a = t("../const/ShareConst"), r = t("../../util/TimeTools"), c = function() {
            this.tgShareData = "tgShareData", this.data = null, this.shareCacheData = {};
        };
        e.exports = {
            ShareGroup: c
        }, c.prototype.init = function(t) {
            this.data = t, this.shareCacheData = wx.getStorageSync(this.tgShareData) || {};
        }, c.prototype.isSharedGroupFull = function(t) {
            return !!this.data && (console.log("isSharedGroupFull++++++++", t, this.shareCacheData[t], this.data.shareTimes), 
            !!(this.shareCacheData.hasOwnProperty(t) && (console.log("isSharedGroupFull", t, this.shareCacheData[t], this.data.shareTimes), 
            this.shareCacheData[t] >= this.data.shareTimes)) && (console.log("isSharedGroupFull full"), 
            !0));
        }, c.prototype.getLastShareTime = function() {
            var t = 0;
            return this.shareCacheData && this.shareCacheData.hasOwnProperty("updateTime") && (t = this.shareCacheData.updateTime), 
            t;
        }, c.prototype.saveShareCacheData = function(t) {
            this.shareCacheData.hasOwnProperty(t) ? this.shareCacheData[t] += 1 : this.shareCacheData[t] = 1, 
            wx.setStorage({
                key: this.tgShareData,
                data: this.shareCacheData
            });
        }, c.prototype.checkClearCacheData = function() {
            var t = this.getLastShareTime(), e = r.TimeTools.getDayZeroTime(Date.now());
            console.log("checkClearCacheData", t, e), r.TimeTools.getDayZeroTime(t) < e && (console.log("checkClearCacheData 清理数据"), 
            this.shareCacheData = {}, this.shareCacheData.updateTime = e, wx.setStorage({
                key: this.tgShareData,
                data: this.shareCacheData
            }));
        }, c.prototype.getShareGroupKey = function(t, e, i) {
            s.SdkService.getInstance().httpPost(this.data.url + "/thirdparty/get_wechat_decrypt", t, function(t, s) {
                s == n.HttpConst.HTTP_CODE.OK ? e(t) : i();
            });
        }, c.prototype.execute = function(t, e) {
            function i() {
                e.code = a.ShareConst.SHARE_CODE.FAILED, o.Utils.invokeCb(t, e);
            }
            var s = this;
            this.checkClearCacheData(), this.data && this.data.shareTimes && e.code == a.ShareConst.SHARE_CODE.GROUP_SUCC ? wx.getShareInfo({
                shareTicket: e.shareTickets[0],
                success: function(n) {
                    var r = o.Utils.clone(s.data.params);
                    r.iv = n.iv, r.encryptedData = n.encryptedData, s.getShareGroupKey(r, function(i) {
                        console.log("getShareGroupKey temRes:", i);
                        var n = i;
                        if ("string" == typeof i) {
                            if ("" == i) return void o.Utils.invokeCb(t, e);
                            n = JSON.parse(i);
                        } else if (!i) return void o.Utils.invokeCb(t, e);
                        var r = n.openGId;
                        s.isSharedGroupFull(r) ? (e.code = a.ShareConst.SHARE_CODE.FAILED_GOURP_FULL, o.Utils.invokeCb(t, e)) : (console.log("分享到不同群的群消息成功!"), 
                        s.saveShareCacheData(r), o.Utils.invokeCb(t, e));
                    }, function() {
                        i();
                    });
                },
                fail: function(t) {
                    i();
                }
            }) : o.Utils.invokeCb(t, e);
        }, cc._RF.pop();
    }, {
        "../../util/TimeTools": "TimeTools",
        "../../util/Utils": "Utils",
        "../SdkService": "SdkService",
        "../const/HttpConst": "HttpConst",
        "../const/ShareConst": "ShareConst"
    } ],
    ShareService: [ function(t, e, i) {
        cc._RF.push(e, "005a1nvZGdM76di6eH5lKRw", "ShareService");
        var s = t("../util/Utils"), o = t("../util/RandomTools"), n = t("./conf/ShareConf"), a = t("./SdkService"), r = t("./share/ShareGroup"), c = t("../util/StringUtils"), h = function() {
            this.shareTxt = s.Utils.clone(n.ShareConf.SHARE_TXT), this.shareImg = s.Utils.clone(n.ShareConf.SHARE_IMG), 
            this.shareUrl = s.Utils.clone(n.ShareConf.SHARE_URL), this.shareConf = s.Utils.clone(n.ShareConf.SHARE_CONF), 
            this.group = new r.ShareGroup(), this.shareData = null, this.isOpen = !1, this.isCheck = !1, 
            this.isRemote = !1;
        };
        e.exports = {
            ShareService: h
        };
        var l = null;
        h.getInstance = function() {
            return null == l && (l = new h()), l;
        }, h.prototype.getShareInfo = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = this.getLastShareId(t);
            if (!this.shareConf.hasOwnProperty(i)) return null;
            var s = this.shareConf[i];
            if (s.length <= 0) return null;
            var n = s[o.RandomTools.randomInt(0, s.length - 1)], a = n.txt, r = n.img, h = {
                shareId: i,
                txtId: a,
                imgId: r,
                urlId: this.isRemote && n.url ? n.url + "" : "",
                title: "",
                imgUrl: ""
            };
            return this.shareTxt.hasOwnProperty(a) && (h.title = e ? c.StringUtils.stringKeyValue(this.shareTxt[a], e) : this.shareTxt[a]), 
            this.shareImg.hasOwnProperty(r) && (h.imgUrl = this.shareImg[r]), h;
        }, h.prototype.init = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            "undefined" != typeof wx && (wx.showShareMenu(), wx.updateShareMenu({
                withShareTicket: !0
            }), this.setShareConf(t), this.shareData = e, e && this.group.init(e.group), this.isOpen = t.isOpen, 
            this.isCheck = this.checkSDKVersion("2.4.3"), this.isRemote = this.isOpen && this.isCheck);
        }, h.prototype.setShareConf = function(t) {
            t && (this.setTxtMap(t.shareTxt), this.setImageMap(t.shareImg), this.setUrlMap(t.shareUrl), 
            this.setShareInfo(t.shareConf));
        }, h.prototype.getShareConfData = function(t) {
            if (!this.shareConf.hasOwnProperty(t)) return null;
            var e = this.shareConf[t];
            return e.length <= 0 ? null : e[o.RandomTools.randomInt(0, e.length - 1)];
        }, h.prototype.getLastShareId = function(t) {
            return this.isOpen && !this.isCheck ? "8888" : t;
        }, h.prototype.setTxtMap = function(t) {
            this.shareTxt = s.Utils.clone(t);
        }, h.prototype.setImageMap = function(t) {
            this.shareImg = s.Utils.clone(t);
        }, h.prototype.setUrlMap = function(t) {
            this.shareUrl = s.Utils.clone(t);
        }, h.prototype.setShareInfo = function(t) {
            this.shareConf = s.Utils.clone(t);
        }, h.prototype.shareGroup = function(t, e, i) {
            var s = this, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, n = this.getShareInfo(t, o);
            null != n && a.SdkService.getInstance().shareGroup(n.title, n.imgUrl, n.urlId, e, function(t) {
                s.group.execute(i, t);
            }, n);
        }, h.prototype.shareNormal = function(t, e, i) {
            var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, o = this.getShareInfo(t, s);
            null != o && a.SdkService.getInstance().shareNormal(o.title, o.imgUrl, o.urlId, e, i, o);
        }, h.prototype.setAppShare = function(t, e, i) {
            var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, o = this.getShareInfo(t, s);
            null != o && a.SdkService.getInstance().setAppShare(o.title, o.imgUrl, o.urlId, e, i, o);
        }, h.prototype.checkSDKVersion = function(t) {
            if ("undefined" == typeof wx) return !1;
            var e = wx.getSystemInfoSync(), i = (e && e.SDKVersion ? e.SDKVersion : "0.0.0").split("."), s = t.split(".");
            return Number(i[0]) > Number(s[0]) || !(Number(i[0]) < Number(s[0])) && (Number(i[1]) > Number(s[1]) || !(Number(i[1]) < Number(s[1])) && Number(i[2]) >= Number(s[2]));
        }, cc._RF.pop();
    }, {
        "../util/RandomTools": "RandomTools",
        "../util/StringUtils": "StringUtils",
        "../util/Utils": "Utils",
        "./SdkService": "SdkService",
        "./conf/ShareConf": "ShareConf",
        "./share/ShareGroup": "ShareGroup"
    } ],
    SmartA: [ function(t, e, i) {
        cc._RF.push(e, "de4fdAazIFE+LGHlzHCnTpY", "SmartA");
        var s = t("./Brain"), o = t("./DirTools"), n = function(t) {
            this.comp = t, this.brain = new s.Brain(this), this.list = [], this.clear();
        };
        n.prototype.isStanding = function() {
            return this.id >= 0;
        }, n.prototype.init = function(t) {
            this.id = t.id, this.sid = t.sid, this.type = t.type, this.camp = t.camp;
        }, n.prototype.setData = function(t) {
            this.data = t, this.brain.setData(this.sid);
        }, n.prototype.setGrowLength = function(t) {
            this.grow = t;
        }, n.prototype.setBodyLength = function(t) {
            this.bodyLength = t;
        }, n.prototype.setViewLength = function(t) {
            this.viewLength = t;
        }, n.prototype.setAttrLength = function(t) {
            this.attrLength = t;
        }, n.prototype.setAngleLength = function(t) {
            this.angle = t;
        }, n.prototype.setIsGhost = function(t) {
            this.isGhost = t;
        }, n.prototype.setAttrAngle = function(t) {
            this.offset = t;
        }, n.prototype.play = function() {
            this.playing = !0, this._playFreedom(!0);
        }, n.prototype.update = function(t) {
            this.playing && (this.locking || (this.brain.update(t), this.timestamps += t, this.timestamps < .05 || (this.timestamps = 0, 
            this._guardTheBorder(), this._guardTheAttract())));
        }, n.prototype.addViewTarget = function(t) {
            this.id != t && -1 == this.list.indexOf(t) && (this.list.push(t), this._judgeTheTarget(t));
        }, n.prototype.removeViewTarget = function(t) {
            if (this.id != t) {
                var e = this.list.indexOf(t);
                e > -1 && this.list.splice(e, 1), this.targetId == t && this._playFreedom();
            }
        }, n.prototype.removeSelf = function() {
            this.clear();
        }, n.prototype.setLocking = function(t) {
            this.locking = t;
        }, n.prototype.move = function(t) {
            this.v2 = t;
        }, n.prototype.onBrainUpdate = function(t) {
            switch (t.action) {
              case ss.enum.action.swerve:
                var e = this.angle + 4 * t.clockwise;
                e > 180 ? e -= 360 : e < -180 && (e += 360), this._callBackCompAction(ss.enum.action.border, e, !1);
            }
        }, n.prototype.onBrainFinish = function(t) {
            switch (t.action) {
              case ss.enum.action.freedom:
                t.again ? this._playFreedom() : this._playSwerve();
                break;

              case ss.enum.action.track:
                t.again && this.targetId >= 0 && this.targetId == t.targetId ? this._playTrack(t.targetId) : Math.random() <= .5 ? this._playFreedom() : this._playSwerve();
                break;

              case ss.enum.action.escape:
                t.again && this.targetId >= 0 && this.targetId == t.targetId ? this._playEscape(t.targetId) : Math.random() <= .5 ? this._playFreedom() : this._playSwerve();
                break;

              case ss.enum.action.border:
                -1 == this.targetId && this.action == ss.enum.action.border && (this.action = ss.enum.action.freedom);
                break;

              case ss.enum.action.swerve:
                t.again && this._playSwerve();
            }
        }, n.prototype._callBackCompAction = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            this.action = t, this.comp && this.comp.onSmartAction && this.comp.onSmartAction({
                action: t,
                angle: e,
                addSpeed: i
            });
        }, n.prototype._callBackCompDied = function() {
            this.comp && this.comp.onSmartDied && this.comp.onSmartDied();
        }, n.prototype._callBackCompAttr = function(t) {
            this.comp && this.comp.onSmartAttr && this.comp.onSmartAttr(t);
        }, n.prototype._playFreedom = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.targetId = -1;
            var e = this.brain.reflect(ss.enum.action.freedom, -1);
            if (t || e) {
                var i = -180 + Math.ceil(360 * Math.random()), s = !!e && e.addSpeed;
                this._callBackCompAction(ss.enum.action.freedom, i, s);
            }
        }, n.prototype._playTrack = function(t) {
            if (this.data && this.data.outlooking && -1 != this.list.indexOf(t)) {
                var e = this.data.outlooking.getSmart(t);
                if (e && e.data) {
                    var i = o.DirMath.getSafeAngleByPointAndPoint(this.v2, e.v2, o.DirMode.track);
                    if (null != i) {
                        var s = this.brain.reflect(ss.enum.action.track, t);
                        if (s) {
                            this.targetId = t;
                            var n = s.addSpeed || !1;
                            this._callBackCompAction(ss.enum.action.track, i, n);
                        }
                    }
                }
            }
        }, n.prototype._playEscape = function(t) {
            if (this.data && this.data.outlooking && -1 != this.list.indexOf(t)) {
                var e = this.data.outlooking.getSmart(t);
                if (e && e.data) {
                    var i = o.DirMath.getSafeAngleByPointAndPoint(this.v2, e.v2, o.DirMode.escape);
                    if (null != i) {
                        var s = this.brain.reflect(ss.enum.action.escape, t);
                        if (s) {
                            this.targetId = t;
                            var n = s.addSpeed || !1;
                            this._callBackCompAction(ss.enum.action.escape, i, n);
                        }
                    }
                }
            }
        }, n.prototype._playBorder = function(t) {
            var e = this.brain.reflect(ss.enum.action.border, -1);
            if (e) {
                this.targetId = -1;
                var i = e.addSpeed || !1;
                this._callBackCompAction(ss.enum.action.border, t, i);
            }
        }, n.prototype._playSwerve = function() {
            this.brain.reflect(ss.enum.action.swerve, -1);
        }, n.prototype._guardTheBorder = function() {
            if (this.data && this.v2) {
                var t = this.data.mapRect, e = null;
                null == (e = o.DirMath.getSafeAngleByCircleAndRect(this.v2, this.bodyLength, t)) ? null != (e = o.DirMath.getSafeAngleByCircleAndRect(this.v2, this.viewLength, t)) ? this.bordering || (this.bordering = !0, 
                this._playBorder(e)) : this.bordering = !1 : this._callBackCompDied();
            }
        }, n.prototype._judgeTheTarget = function(t) {
            if (this.data && this.data.outlooking) {
                var e = this.data.outlooking.getSmart(t);
                if (e && e.data) switch (e.type) {
                  case ss.enum.roleType.superman:
                  case ss.enum.roleType.pacman:
                    if (this.camp > ss.enum.gameCamp.normal && this.camp == e.camp) return;
                    if (this.isGhost && e.isGhost) return;
                    if (this.isGhost) this.action != ss.enum.action.track && this._playTrack(t); else if (e.isGhost) this._playEscape(t); else {
                        if (this.grow == e.grow) return;
                        this.grow < e.grow ? this._playEscape(t) : this.action != ss.enum.action.track && this.grow > e.grow && this._playTrack(t);
                    }
                    break;

                  case ss.enum.roleType.ghost:
                    this._playEscape(t);
                    break;

                  case ss.enum.roleType.pea:
                    null != this.action && this.action != ss.enum.action.freedom || this._playTrack(t);
                }
            }
        }, n.prototype._guardTheAttract = function() {
            if (this.data && this.data.outlooking) for (var t, e = 0, i = this.list.length; e < i; e++) (t = this.data.outlooking.getSmart(this.list[e])) && !t.locking && t.type == ss.enum.roleType.pea && o.DirMath.isTargetAngleByPointAndPoint(this.v2, t.v2, this.angle, this.attrLength, this.offset) && this._callBackCompAttr(t.comp);
        }, n.prototype.clear = function() {
            this.id = -1, this.sid = -1, this.camp = -1, this.targetId = -1, this.type = null, 
            this.action = null, this.v2 = null, this.grow = 0, this.angle = 0, this.bodyLength = 0, 
            this.viewLength = 0, this.attrLength = 0, this.offset = 30, this.list.length = 0, 
            this.timestamps = 0, this.playing = !1, this.locking = !1, this.bordering = !1, 
            this.isGhost = !1, this.data = null, this.brain.clear();
        }, e.exports = {
            SmartA: n
        }, cc._RF.pop();
    }, {
        "./Brain": "Brain",
        "./DirTools": "DirTools"
    } ],
    SmartB: [ function(t, e, i) {
        cc._RF.push(e, "e596d7hfpdNZYNsAhlEKbm+", "SmartB");
        var s = t("./Brain"), o = t("./DirTools"), n = function(t) {
            this.comp = t, this.brain = new s.Brain(this), this.list = [], this.clear();
        };
        n.prototype.isStanding = function() {
            return this.id >= 0;
        }, n.prototype.init = function(t) {
            this.id = t.id, this.sid = t.sid, this.type = t.type, this.camp = t.camp;
        }, n.prototype.setData = function(t) {
            this.data = t, this.brain.setData(this.sid);
        }, n.prototype.setBodyLength = function(t) {
            this.bodyLength = t;
        }, n.prototype.setViewLength = function(t) {
            this.viewLength = t;
        }, n.prototype.play = function() {
            this.playing = !0, this._playFreedom(!0);
        }, n.prototype.update = function(t) {
            this.playing && (this.brain.update(t), this.timestamps += t, this.timestamps < 1 / 15 || (this.timestamps = 0, 
            this._guardTheBorder()));
        }, n.prototype.addViewTarget = function(t) {
            this.id != t && -1 == this.list.indexOf(t) && (this.list.push(t), this._judgeTheTarget(t));
        }, n.prototype.removeViewTarget = function(t) {
            if (this.id != t) {
                var e = this.list.indexOf(t);
                e > -1 && this.list.splice(e, 1), this.targetId == t && (this.targetId = -1, this._playFreedom());
            }
        }, n.prototype.removeSelf = function() {
            this.clear();
        }, n.prototype.setLocking = function(t) {
            this.locking = t;
        }, n.prototype.move = function(t) {
            this.v2 = t;
        }, n.prototype.onBrainFinish = function(t) {
            switch (t.action) {
              case ss.enum.action.freedom:
                t.again && this._playFreedom();
                break;

              case ss.enum.action.track:
                t.again && this.targetId >= 0 && this.targetId == t.targetId ? this._playTrack(t.targetId) : this._playFreedom();
                break;

              case ss.enum.action.border:
                -1 == this.targetId && this.action == ss.enum.action.border && (this.action = ss.enum.action.freedom);
            }
        }, n.prototype._callBackCompAction = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            this.action = t, this.comp && this.comp.onSmartAction && this.comp.onSmartAction({
                action: t,
                angle: e,
                addSpeed: i
            });
        }, n.prototype._callBackCompDied = function() {
            this.comp && this.comp.onSmartDied && this.comp.onSmartDied();
        }, n.prototype._playFreedom = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.targetId = -1;
            var e = this.brain.reflect(ss.enum.action.freedom, -1);
            if (t || e) {
                var i = -180 + Math.ceil(360 * Math.random()), s = !!e && e.addSpeed;
                this._callBackCompAction(ss.enum.action.freedom, i, s);
            }
        }, n.prototype._playTrack = function(t) {
            if (this.data && this.data.outlooking && -1 != this.list.indexOf(t)) {
                var e = this.data.outlooking.getSmart(t);
                if (e && e.data) {
                    var i = o.DirMath.getSafeAngleByPointAndPoint(this.v2, e.v2, o.DirMode.track);
                    if (null != i) {
                        var s = this.brain.reflect(ss.enum.action.track, t);
                        if (s) {
                            this.targetId = t;
                            var n = s.addSpeed || !1;
                            this._callBackCompAction(ss.enum.action.track, i, n);
                        }
                    }
                }
            }
        }, n.prototype._playEscape = function() {}, n.prototype._playBorder = function(t) {
            var e = this.brain.reflect(ss.enum.action.border, -1);
            if (e) {
                this.targetId = -1;
                var i = e.addSpeed || !1;
                this._callBackCompAction(ss.enum.action.border, t, i);
            }
        }, n.prototype._guardTheBorder = function() {
            if (this.data && this.v2) {
                var t = this.data.mapRect, e = null;
                null == (e = o.DirMath.getSafeAngleByCircleAndRect(this.v2, this.bodyLength, t)) ? null != (e = o.DirMath.getSafeAngleByCircleAndRect(this.v2, this.viewLength, t)) ? this.bordering || (this.bordering = !0, 
                this._playBorder(e)) : this.bordering = !1 : this._callBackCompDied();
            }
        }, n.prototype._judgeTheTarget = function(t) {
            if (this.data && this.data.outlooking) {
                var e = this.data.outlooking.getSmart(t);
                if (e && e.data) switch (e.type) {
                  case ss.enum.roleType.superman:
                  case ss.enum.roleType.pacman:
                    this.action != ss.enum.action.track && this._playTrack(t);
                }
            }
        }, n.prototype.clear = function() {
            this.id = -1, this.sid = -1, this.camp = -1, this.targetId = -1, this.type = null, 
            this.action = null, this.v2 = null, this.bodyLength = 0, this.viewLength = 0, this.list.length = 0, 
            this.timestamps = 0, this.playing = !1, this.locking = !1, this.bordering = !1, 
            this.data = null, this.brain.clear();
        }, e.exports = {
            SmartB: n
        }, cc._RF.pop();
    }, {
        "./Brain": "Brain",
        "./DirTools": "DirTools"
    } ],
    SmartC: [ function(t, e, i) {
        cc._RF.push(e, "fd811sH+vFF0LL8Etbm99UE", "SmartC");
        var s = t("./Brain"), o = function(t) {
            this.comp = t, this.brain = new s.Brain(), this.list = [], this.clear();
        };
        o.prototype.isStanding = function() {
            return this.id >= 0;
        }, o.prototype.init = function(t) {
            this.id = t.id, this.sid = t.sid, this.type = t.type, this.camp = t.camp;
        }, o.prototype.setData = function(t) {
            this.data = t;
        }, o.prototype.setGrowLength = function(t) {
            this.grow = t;
        }, o.prototype.setBodyLength = function(t) {
            this.bodyLength = t;
        }, o.prototype.setViewLength = function(t) {
            this.viewLength = t;
        }, o.prototype.play = function() {
            this.playing = !0;
        }, o.prototype.update = function(t) {
            this.playing && this.brain.update(t);
        }, o.prototype.addViewTarget = function(t) {
            this.id != t && -1 == this.list.indexOf(t) && this.list.push(t);
        }, o.prototype.removeViewTarget = function(t) {
            if (this.id != t) {
                var e = this.list.indexOf(t);
                e > -1 && this.list.splice(e, 1), this.targetId == t && (this.targetId = -1);
            }
        }, o.prototype.removeSelf = function() {
            this.clear();
        }, o.prototype.setLocking = function(t) {
            this.locking = t;
        }, o.prototype.move = function(t) {
            this.v2 = t;
        }, o.prototype._callBackCompAction = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            this.action = t, this.comp && this.comp.onSmartAction && this.comp.onSmartAction({
                action: t,
                angle: e,
                addSpeed: i
            });
        }, o.prototype._playFreedom = function() {
            var t = -180 + Math.floor(180 * Math.random());
            this._callBackCompAction(ss.enum.action.freedom, t, !1);
        }, o.prototype._playTrack = function(t) {}, o.prototype._playEscape = function() {}, 
        o.prototype.clear = function() {
            this.id = -1, this.sid = -1, this.camp = -1, this.targetId = -1, this.type = null, 
            this.action = null, this.v2 = null, this.grow = 0, this.bodyLength = 0, this.viewLength = 0, 
            this.list.length = 0, this.playing = !1, this.locking = !1, this.data = null, this.brain.clear();
        }, e.exports = {
            SmartC: o
        }, cc._RF.pop();
    }, {
        "./Brain": "Brain"
    } ],
    Snow: [ function(t, e, i) {
        cc._RF.push(e, "4d094ZTBgBKRYmmSXJZF5Ui", "Snow"), cc.Class({
            extends: cc.Component,
            properties: {},
            ctor: function() {
                this.playing = !1, this.v2 = cc.v2(), this.data = null, this.params = null;
            },
            start: function() {},
            init: function(t, e) {
                switch (this.data = t, this.params = e, this.node.parent = t.parent, this.node.setPosition(t.v2), 
                this.v2 = t.v2, t.index) {
                  case 0:
                    this.v2.y += 30;
                    break;

                  case 1:
                    this.v2.y += 60;
                    break;

                  case 2:
                    this.v2.y += 90;
                    break;

                  default:
                    this.v2.y += 45;
                }
                this.getComponent(cc.Label).string = "" + t.word;
            },
            play: function() {
                this.playing = !0, this.node.stopAllActions(), this.node.setScale(.5);
                var t = cc.sequence(cc.spawn(cc.moveTo(.3, this.v2.x, this.v2.y), cc.scaleTo(.3, 1, 1).easing(cc.easeElasticOut(1))), cc.delayTime(.5), cc.callFunc(this.onFinish, this));
                this.node.runAction(t);
            },
            onFinish: function() {
                this.data && ss.logic.game.bulu.recoverSnow(this.data.id);
            },
            clear: function() {
                this.playing = !1, this.node.y = 0, this.node.stopAllActions(), this.node.removeFromParent(), 
                this.data = null, this.params = null;
            },
            removeTarget: function(t) {
                this.data && this.data.target == t && ss.logic.game.bulu.recoverSnow(this.data.id);
            }
        }), cc._RF.pop();
    }, {} ],
    SoundButton: [ function(t, e, i) {
        cc._RF.push(e, "52eab2ORU9Lf5Irh8/YcdJQ", "SoundButton"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function() {},
            click: function() {
                ss.logic.sound.btnClick();
            },
            close: function() {
                ss.logic.sound.btnClick();
            }
        }), cc._RF.pop();
    }, {} ],
    SoundLogic: [ function(t, e, i) {
        cc._RF.push(e, "fb55e4UTgpJMbDq62yqVzle", "SoundLogic");
        var s = function() {
            this.eatTimeStamp = 0, this.bigEatTimeStamp = 0, this.getGainStamp = 0, this.getCoinStamp = 0, 
            this.addSpeedTimeStamp = 0, this.bgId = null, cc.systemEvent.on(ss.event.system.AdVideo, this.onVideoRespond.bind(this));
        };
        s.prototype.open = function() {
            ss.sound.setEnabled(!0);
        }, s.prototype.close = function() {
            ss.sound.setEnabled(!1);
        }, s.prototype.onVideoRespond = function(t) {
            var e = t;
            e.method == ss.enum.advertising.method.show ? e.code == ss.enum.advertising.code.success ? ss.sound.setLockabled(!0) : ss.sound.setLockabled(!1) : e.method == ss.enum.advertising.method.onClose && ss.sound.setLockabled(!1);
        }, s.prototype.setMute = function(t) {
            var e = t ? 1 : 0;
            ss.sound.setBgmVolume(e), ss.sound.setSoundVolume(e);
        }, s.prototype.setBgEnabled = function(t) {
            ss.sound.setBgEnabled(t);
        }, s.prototype.setSoundEnabled = function(t) {
            ss.sound.setSoundEnabled(t);
        }, s.prototype.playBgMusic = function() {
            this.bgId != ss.enum.audio.bgMusic && (this.bgId = ss.enum.audio.bgMusic, ss.sound.playMusic(ss.enum.audio.bgMusic));
        }, s.prototype.stopBgMusic = function() {
            this.bgId = null, ss.sound.stopMusic();
        }, s.prototype.btnClick = function() {
            ss.sound.playSound(ss.enum.audio.click);
        }, s.prototype.panelClose = function() {
            ss.sound.playSound(ss.enum.audio.close);
        }, s.prototype.eat = function() {
            var t = Date.now();
            t - this.eatTimeStamp < 200 || (this.eatTimeStamp = t, ss.sound.playSound(ss.enum.audio.eat));
        }, s.prototype.bigEat = function() {
            var t = Date.now();
            t - this.bigEatTimeStamp < 300 || (this.bigEatTimeStamp = t, ss.sound.playSound(ss.enum.audio.bigEat));
        }, s.prototype.died = function() {
            ss.sound.playSound(ss.enum.audio.died);
        }, s.prototype.addSpeed = function() {
            var t = Date.now();
            t - this.addSpeedTimeStamp < 500 || (this.addSpeedTimeStamp = t, ss.sound.playSound(ss.enum.audio.addSpeed));
        }, s.prototype.result = function() {
            ss.sound.playSound(ss.enum.audio.result);
        }, s.prototype.playEffect = function(t) {
            if (ss.logic.open.isAudited()) {
                var e = ss.enum.audio[t];
                e && ss.sound.playSound(e);
            }
        }, e.exports = {
            SoundLogic: s
        }, cc._RF.pop();
    }, {} ],
    Sound: [ function(t, e, i) {
        cc._RF.push(e, "8f76dca92lLWrlp5Y2T79Dj", "Sound"), cc.Class({
            extends: cc.Component,
            properties: {
                volume: 1,
                bgVolume: 1,
                bgMusic: {
                    type: cc.AudioClip,
                    default: null
                },
                eat: {
                    type: cc.AudioClip,
                    default: null
                },
                bigEat: {
                    type: cc.AudioClip,
                    default: null
                },
                died: {
                    type: cc.AudioClip,
                    default: null
                },
                addSpeed: {
                    type: cc.AudioClip,
                    default: null
                },
                click: {
                    type: cc.AudioClip,
                    default: null
                },
                close: {
                    type: cc.AudioClip,
                    default: null
                },
                result: {
                    type: cc.AudioClip,
                    default: null
                },
                dominating: {
                    type: cc.AudioClip,
                    default: null
                },
                double_kill: {
                    type: cc.AudioClip,
                    default: null
                },
                fristblood: {
                    type: cc.AudioClip,
                    default: null
                },
                godlike: {
                    type: cc.AudioClip,
                    default: null
                },
                holyshit: {
                    type: cc.AudioClip,
                    default: null
                },
                killing_spree: {
                    type: cc.AudioClip,
                    default: null
                },
                megakill: {
                    type: cc.AudioClip,
                    default: null
                },
                monsterkill: {
                    type: cc.AudioClip,
                    default: null
                },
                rampage: {
                    type: cc.AudioClip,
                    default: null
                },
                triple_kill: {
                    type: cc.AudioClip,
                    default: null
                },
                ultrakill: {
                    type: cc.AudioClip,
                    default: null
                },
                unstoppable: {
                    type: cc.AudioClip,
                    default: null
                },
                whickedsick: {
                    type: cc.AudioClip,
                    default: null
                }
            },
            onLoad: function() {
                this.bgmId = -1, this.bgmName = null, this.lockabled = !1, this.soundEnabled = !0, 
                this.bgEnabled = !0, ss.sound = this, cc.audioEngine.setMusicVolume(this.bgVolume);
            },
            start: function() {
                cc.game.on(cc.game.EVENT_HIDE, this.onGameHide, this), cc.game.on(cc.game.EVENT_SHOW, this.onGameShow, this);
            },
            onDestroy: function() {
                cc.game.off(cc.game.EVENT_HIDE, this.onGameHide, this), cc.game.off(cc.game.EVENT_SHOW, this.onGameShow, this);
            },
            onGameHide: function(t) {
                this.pauseMusic();
            },
            onGameShow: function(t) {
                this.bgEnabled && this.resumeMusic();
            },
            _$playSound: function(t, e) {
                this.lockabled || this.soundEnabled && 0 != this.volume && cc.audioEngine.play(e, !1, this.volume);
            },
            playSound: function(t) {
                this[t] && this._$playSound(t, this[t]);
            },
            playSuperSound: function(t) {
                this.lockabled || this.soundEnabled && this[t] && cc.audioEngine.play(this[t], !1, 1);
            },
            setSoundVolume: function(t) {
                this.volume = t;
            },
            setBgmVolume: function(t) {
                this.bgVolume = t, cc.audioEngine.setMusicVolume(t);
            },
            setEnabled: function(t) {
                this.soundEnabled = t, this.bgEnabled = t, t ? this.resumeMusic() : this.pauseMusic();
            },
            setBgEnabled: function(t) {
                this.bgEnabled = t;
            },
            setSoundEnabled: function(t) {
                this.soundEnabled = t;
            },
            setLockabled: function(t) {
                this.lockabled = t, t ? this.pauseMusic() : this.resumeMusic();
            },
            playMusic: function(t) {
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (!this.lockabled && this.bgEnabled) if (this.bgmName != t) {
                    this.stopMusic();
                    var i = this[t];
                    i ? (this.bgmName = t, -1 == this.bgmId && (this.bgmId = cc.audioEngine.playMusic(i, e))) : console.log("error error error:", "playMusic[ " + t + " ] undefind");
                } else this.resumeMusic();
            },
            stopMusic: function() {
                this.bgmName && (-1 != this.bgmId && cc.audioEngine.stopMusic(), this.bgmId = -1, 
                this.bgmName = null);
            },
            pauseMusic: function() {
                -1 != this.bgmId && cc.audioEngine.pauseMusic();
            },
            resumeMusic: function() {
                this.lockabled || this.bgEnabled && -1 != this.bgmId && cc.audioEngine.resumeMusic();
            }
        }), cc._RF.pop();
    }, {} ],
    SpriteFrames: [ function(t, e, i) {
        cc._RF.push(e, "1215e+w60tO8qsdG5Yn6KPE", "SpriteFrames");
        var s = cc.Class({
            name: "SpriteFrames",
            properties: {
                frames: [ cc.SpriteFrame ]
            }
        });
        e.exports = {
            SpriteFrames: s
        }, cc._RF.pop();
    }, {} ],
    StartUp: [ function(t, e, i) {
        cc._RF.push(e, "d94dehs7IJPpYiHpDw/l1EA", "StartUp"), cc.Class({
            extends: cc.Component,
            editor: {
                executionOrder: 99999
            },
            properties: {},
            onLoad: function() {},
            start: function() {
                ss.logic.ald.startGame(), ss.boot.execute(function() {
                    ss.command.startup();
                });
            }
        }), cc._RF.pop();
    }, {} ],
    State: [ function(t, e, i) {
        cc._RF.push(e, "223a1XX9ehDV7BmMoqlrCJk", "State");
        var s = {
            ready: 0,
            init: 1,
            prev: 2,
            play: 3,
            pause: 4,
            over: 5,
            current: 0,
            onInit: function() {
                s.current = s.init;
            },
            onPrev: function() {
                s.current = s.prev;
            },
            onPlay: function() {
                s.current = s.play;
            },
            onPause: function() {
                s.current == s.play && (s.current = s.pause);
            },
            onResume: function() {
                s.current == s.pause && (s.current = s.play);
            },
            onOver: function() {
                s.current = s.over;
            },
            isPlaying: function() {
                return s.current == s.play;
            },
            isPreving: function() {
                return s.current >= s.prev;
            }
        };
        e.exports = {
            State: s
        }, cc._RF.pop();
    }, {} ],
    StorageConf: [ function(t, e, i) {
        cc._RF.push(e, "0859ekRPnxJlaV13juHFm7m", "StorageConf");
        var s = function() {};
        e.exports = {
            StorageConf: s
        }, s.STORAGE_CONF = {
            test1: {
                localTimes: 1e4,
                needNet: !1,
                netTimes: 13e4
            },
            test2: {
                localTimes: 1e4,
                needNet: !1,
                netTimes: 13e4
            },
            test3: {
                localTimes: 1e4,
                needNet: !1,
                netTimes: 13e4
            }
        }, s.UPDATE_TIMES = 34, s.INIT_TIMEOUT = 6e4, cc._RF.pop();
    }, {} ],
    StorageLogic: [ function(t, e, i) {
        cc._RF.push(e, "881d0s1Du5NV5nurWSLL6Sv", "StorageLogic");
        var s = function() {
            this._unitTimeStamps = 0, this._infoTimeStamps = 0, this._goodsTimeStamps = 0;
        };
        s.prototype.saveUnit = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], e = Date.now();
            !t && e - this._unitTimeStamps < 5e3 ? ss.custom.setStorage(ss.enum.storage.unit, ss.data.unit, !1, !1) : (this._unitTimeStamps = e, 
            ss.custom.setStorage(ss.enum.storage.unit, ss.data.unit, !1, !0));
        }, s.prototype.saveInfo = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], e = Date.now();
            !t && e - this._infoTimeStamps < 5e3 ? ss.custom.setStorage(ss.enum.storage.info, ss.data.info, !1, !1) : (this._infoTimeStamps = e, 
            ss.custom.setStorage(ss.enum.storage.info, ss.data.info, !1, !0));
        }, s.prototype.saveGoods = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], e = Date.now();
            !t && e - this._goodsTimeStamps < 5e3 ? ss.custom.setStorage(ss.enum.storage.goods, ss.data.goods, !1, !1) : (this._goodsTimeStamps = e, 
            ss.custom.setStorage(ss.enum.storage.goods, ss.data.goods, !1, !0));
        }, s.prototype.saveSets = function() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0], ss.custom.setStorage(ss.enum.storage.sets, ss.data.sets, !1, !0);
        }, e.exports = {
            StorageLogic: s
        }, cc._RF.pop();
    }, {} ],
    StorageNet: [ function(t, e, i) {
        cc._RF.push(e, "16b59c2ljtFBathU4Pt2VWC", "StorageNet");
        var s = t("../../util/Utils"), o = t("../SdkService"), n = function() {}, a = null;
        n.getInstance = function() {
            return null == a && (a = new n()), a;
        }, e.exports = {
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
        }, cc._RF.pop();
    }, {
        "../../util/Utils": "Utils",
        "../SdkService": "SdkService"
    } ],
    StorageService: [ function(t, e, i) {
        cc._RF.push(e, "7333c6hMShB7YfY/xRiNxGb", "StorageService");
        var s = t("../util/Utils"), o = t("../util/Async"), n = t("./storage/Storage"), a = t("./conf/StorageConf"), r = function() {
            this.isLoad = !1, this.initTimeout = a.StorageConf.INIT_TIMEOUT, this.storageMap = {}, 
            this.storageConf = s.Utils.clone(a.StorageConf.STORAGE_CONF);
        };
        e.exports = {
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
        }, cc._RF.pop();
    }, {
        "../util/Async": "Async",
        "../util/Utils": "Utils",
        "./conf/StorageConf": "StorageConf",
        "./storage/Storage": "Storage"
    } ],
    Storage: [ function(t, e, i) {
        cc._RF.push(e, "20547uBkWRAS6ADI1Q5n1oY", "Storage");
        var s = t("../../util/Utils"), o = t("../../util/Async"), n = t("../SdkService"), a = t("./StorageNet"), r = function(t, e, i, s, o) {
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
        e.exports = {
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
        }, cc._RF.pop();
    }, {
        "../../util/Async": "Async",
        "../../util/Utils": "Utils",
        "../SdkService": "SdkService",
        "./StorageNet": "StorageNet"
    } ],
    StringUtils: [ function(t, e, i) {
        cc._RF.push(e, "fb7f81PmMlDL6GPgETPV1tR", "StringUtils");
        var s = t("./Utils"), o = function() {};
        e.exports = {
            StringUtils: o
        }, String.prototype.replaceAll = function(t, e) {
            return this.replace(new RegExp(t, "gm"), e);
        }, String.prototype.format = function(t) {
            var e = this;
            if (!s.Utils.isObject(t) && !s.Utils.isArray(t)) return e;
            var i = t;
            for (var o in i) {
                var n = i[o];
                void 0 != n && (e = e.replaceAll("\\{" + o + "\\}", n));
            }
            return e;
        }, o.formatString = function(t, e) {
            return s.Utils.isString(t) ? t.format(e) : "";
        }, o.stringReplace = function(t, e, i) {
            return e.replace(new RegExp(t, "gm"), i);
        }, o.stringKeyValue = function(t, e) {
            var i = t;
            for (var s in e) {
                var n = e[s];
                void 0 != n && (i = o.stringReplace("\\{" + s + "\\}", i, n));
            }
            return i;
        }, o.stringCut = function(t) {
            for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 8, i = (arguments.length > 2 && void 0 !== arguments[2] && arguments[2], 
            ""), s = 0, o = 0; o < t.length; o++) {
                var n = t.charCodeAt(o);
                n >= 1 && n <= 126 || 65376 <= n && n <= 65439 ? s++ : s += 2, s <= e && (i += t.substr(o, 1));
            }
            return i;
        }, cc._RF.pop();
    }, {
        "./Utils": "Utils"
    } ],
    StrongView: [ function(t, e, i) {
        cc._RF.push(e, "1cd3b9dZB9JkoOdKQQ90jZL", "StrongView"), cc.Class({
            extends: cc.Component,
            properties: {
                superBtnNode: cc.Node,
                giveUpNode: cc.Node,
                clips: [ cc.Node ],
                tips: [ cc.Node ]
            },
            onLoad: function() {
                this.popUp = this.node.getComponent("PopUp"), this.superBtn = this.superBtnNode.getComponent("SuperButton2"), 
                this.index = 0, this.timestamps = 0, this.playing = !1, this.data = null;
            },
            start: function() {
                this.node.active = !1;
            },
            update: function(t) {
                this._playClip(t);
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.data = t, this.index = Math.floor(Math.random() * this.clips.length), this._showClip(this.index), 
                this.timestamps = 0, this.playing = !0, ss.config.bannerWrong[ss.enum.view.strong];
                var e = ss.logic.open.isWrongBanner(null), i = ss.commonUtils.clone(ss.config.popup);
                i.opacity = 255, i.isOpenShowBanner = !0, i.bannerDelayTime = e ? null.showTime : 0, 
                this.popUp.show(i), this.superBtn.show({
                    rule: ss.config.rule.strong,
                    shareId: ss.config.shareIds.strong,
                    onCanHandler: null,
                    onClickHandler: this.clickStrong.bind(this)
                });
                var s = 0;
                e ? (this.giveUpNode.active = !0, s = 130) : (this.giveUpNode.active = !1, s = 270);
                var o = this.giveUpNode.getComponent(cc.Widget);
                o && (o.bottom = s, o.updateAlignment()), this.scheduleOnce(this._delayGiveUp.bind(this), 1);
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.unschedule(this._delayGiveUp, this), 
                this.popUp.close(), this.data = null, this.index = 0, this.timestamps = 0, this.playing = !1, 
                this.gIndex = 0, this.gTimestamps = 0, this.guidePlaying = !1;
            },
            clickStrong: function() {
                this._callGameStrong(!0);
            },
            giveUp: function() {
                this._callGameStrong(!1);
            },
            skipClip: function() {
                this.timestamps = 0, this.playing = !1, ++this.index >= this.clips.length && (this.index = 0), 
                this._showClip(this.index);
            },
            _showClip: function(t) {
                for (var e, i, s = 0; s < this.clips.length; s++) e = this.clips[s], this.tips[s], 
                e && (s == t ? (e.active = !0, (i = e.getComponent(cc.Animation)) && i.sample()) : e.active = !1);
            },
            _delayGiveUp: function() {
                this.giveUpNode.active = !0;
                var t = this.giveUpNode.getComponent(cc.Widget);
                t && (t.bottom = 270, t.updateAlignment());
            },
            _callGameStrong: function(t) {
                if (this.data) {
                    var e = this.data.params;
                    e.gameData.egg = t, ss.logic.net.reqGamePlay(e), this.close();
                }
            },
            _playClip: function(t) {
                this.playing && (this.clips.length < 1 || (this.timestamps += t, this.timestamps >= 4 && this.skipClip()));
            }
        }), cc._RF.pop();
    }, {} ],
    Sub: [ function(t, e, i) {
        cc._RF.push(e, "c6a05STRD5G7ZqZSru7irdQ", "Sub"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.display = this.getComponent(cc.Sprite), this.tex = new cc.Texture2D();
            },
            start: function() {},
            _updaetSubDomainCanvas: function() {
                isWeiXin && this.tex && (this.tex.initWithElement(sharedCanvas), this.tex.handleLoadedTexture(), 
                this.display.spriteFrame = new cc.SpriteFrame(this.tex));
            },
            update: function(t) {
                this._updaetSubDomainCanvas();
            }
        }), cc._RF.pop();
    }, {} ],
    SuperButton2: [ function(t, e, i) {
        cc._RF.push(e, "e07caVNYIBAjY+Oqjg6zEIv", "SuperButton2");
        var s = cc.Class({
            extends: cc.Component,
            properties: {
                tv: cc.Node
            },
            statics: {
                rule: null
            },
            ctor: function() {
                this.data = null, this.index = 0, this.timestamps = 0;
            },
            onLoad: function() {},
            start: function() {
                cc.systemEvent.on(ss.event.system.AdVideo, this._onAdVideoHandler.bind(this));
            },
            reset: function() {},
            clear: function() {
                this.data = null, this.type = 0, this.timestamps = 0;
            },
            show: function(t) {
                this.data = t, this.data && (s.rule = this.data.rule, this._judgeRule(), this._judgeIsLast(this.type) && this._lastFail());
            },
            _judgeRule: function() {
                var t;
                this.type = 0, this.reset();
                var e = ss.logic.open.isOldMan();
                if ((t = ss.logic.open.isAudited() ? e ? this.data.rule.oldSort : this.data.rule.newSort : this.data.rule.auditSort) && 0 != t.length) {
                    for (var i, s, o = this.data.rule, n = 0, a = t.length; n < a; n++) if (s = t[n], 
                    (i = o.datas[s]) && !(ss.mask.get(i.mask) >= (e ? i.old : i.new)) && (s != ss.enum.superType.video && s != ss.enum.superType.videoPre && !ss.enum.superType.videoLast || ss.logic.open.isReadyVideo()) && (s != ss.enum.superType.pay || ss.logic.money.isHasFullDiamond(i.cost || 0))) {
                        this.type = s;
                        break;
                    }
                    0 == this.type && (this.type = t[t.length - 1]), this._judgeShow(this.type);
                } else console.warn("superbutton2的 rule 数据配置错误!!!");
            },
            _judgeShow: function(t) {
                if (this.tv) switch (t) {
                  case ss.enum.superType.video:
                  case ss.enum.superType.videoPre:
                  case ss.enum.superType.videoLast:
                    this.tv.active = !ss.logic.open.isAdChecked();
                    break;

                  default:
                    this.tv.active = !1;
                }
            },
            _judgeIsLast: function(t) {
                if (!this.data) return !0;
                var e, i = ss.logic.open.isOldMan();
                if (!(e = ss.logic.open.isAudited() ? i ? this.data.rule.oldSort : this.data.rule.newSort : this.data.rule.auditSort) || 0 == e.length) return !0;
                if (t == e[e.length - 1]) {
                    var s = this.data.rule.datas[t];
                    if (!s) return !0;
                    var o = t;
                    if (ss.mask.get(s.mask) >= (i ? s.old : s.new)) return !0;
                    if ((o == ss.enum.superType.video || o == ss.enum.superType.videoPre || o == ss.enum.superType.videoLast) && !ss.logic.open.isReadyVideo()) return !0;
                    if (o == ss.enum.superType.pay && !ss.logic.money.isHasFullDiamond(s.cost || 0)) return !0;
                }
                return !1;
            },
            _useRule: function() {
                if (this.data) {
                    s.rule = this.data.rule;
                    var t = this.data.rule.datas[this.type];
                    if (t) {
                        ss.mask.add(t.mask), this._judgeRule();
                        var e = this.data.onClickHandler;
                        e && e();
                    }
                }
            },
            _judgeFail: function(t) {
                this.data && (this._judgeIsLast(t) ? this._lastFail() : (this._judgeRule(), this.click()));
            },
            _isCanClick: function() {
                return !!this.data && (!this.data.onCanHandler || this.data.onCanHandler());
            },
            _isTypeOver: function() {
                var t = this.data.rule.datas[this.type];
                return ss.mask.get(t.mask) >= (ss.logic.open.isOldMan() ? t.old : t.new) && (ss.logic.tips.hint("今天次数已用完！"), 
                this._fail(), this._lastFail(), !0);
            },
            _onAdVideoHandler: function(t) {
                if (t && this.data && this.node.active && this.node.parent && this.node.parent.active) if (s.rule == this.data.rule) {
                    var e = t;
                    if (e.param == this.timestamps) switch (e.method) {
                      case ss.enum.advertising.method.show:
                        e.code == ss.enum.advertising.code.failed && (ss.logic.tips.hint("今天视频播放次数已达上限！"), 
                        this._judgeRule(), this.type && this._judgeFail(this.type));
                        break;

                      case ss.enum.advertising.method.onClose:
                        e.code == ss.enum.advertising.code.success ? this._videoPlayCompete() : ss.logic.tips.hint("看完视频才能获得哦！");
                    }
                } else console.warn("SuperButton2 出现了交叉，该回调不是自己当前的事件");
            },
            _videoPlayCompete: function() {
                this._useRule();
            },
            _fail: function() {
                this.data && this.data.onFailHandler && this.data.onFailHandler();
            },
            _lastFail: function() {
                this.data && this.data.onLastFailHandler && this.data.onLastFailHandler();
            },
            click: function() {
                var t = this;
                if (this._isCanClick()) switch (s.rule = this.data.rule, this.type) {
                  case ss.enum.superType.free:
                  case ss.enum.superType.freePre:
                  case ss.enum.superType.freeLast:
                    if (this._isTypeOver()) return;
                    this._useRule();
                    break;

                  case ss.enum.superType.pay:
                    var e = this.data.rule.datas[this.type];
                    if (!e) return;
                    if (this._isTypeOver()) return;
                    var i = e.cost;
                    ss.logic.money.cost(ss.enum.money.diamond, i, function(e) {
                        e.code == ss.enum.code.success ? (ss.logic.tips.hint("钻石 -" + i), t._useRule()) : (t._fail(), 
                        t._judgeFail(t.type));
                    });
                    break;

                  case ss.enum.superType.video:
                  case ss.enum.superType.videoPre:
                  case ss.enum.superType.videoLast:
                    if (!ss.logic.open.isReadyVideo()) return ss.logic.tips.hint("今天视频次数已用完！"), this._judgeRule(), 
                    void this._judgeFail(this.type);
                    if (this._isTypeOver()) return;
                    this.timestamps = Date.now(), ss.logic.open.showVideo(this.timestamps);
                    break;

                  case ss.enum.superType.share:
                  case ss.enum.superType.shareLimit:
                  case ss.enum.superType.shareLimitLast:
                  case ss.enum.superType.shareLimitPre:
                    var o = this.data.shareId;
                    if (!o) return void console.warn("rule 的配置了分享，但是data未配置shareId");
                    if (this._isTypeOver()) return;
                    ss.logic.open.shareGroup(o, function() {
                        t._useRule();
                    });
                }
            }
        });
        cc._RF.pop();
    }, {} ],
    SuperButton: [ function(t, e, i) {
        cc._RF.push(e, "76d1dRi9X5NiY1o7YBZmnfs", "SuperButton");
        var s = cc.Class({
            extends: cc.Component,
            properties: {
                video: cc.Node,
                share: cc.Node,
                free: cc.Node,
                pay: cc.Node,
                notPay: cc.Node,
                payLab: cc.Label,
                notPayLab: cc.Label
            },
            statics: {
                rule: null
            },
            ctor: function() {
                this.data = null, this.index = 0, this.timestamps = 0;
            },
            onLoad: function() {},
            start: function() {
                cc.systemEvent.on(ss.event.system.AdVideo, this._onAdVideoHandler.bind(this));
            },
            reset: function() {
                this.video.active = !1, this.share.active = !1, this.free.active = !1, this.pay.active = !1, 
                this.notPay.active = !1;
            },
            clear: function() {
                this.data = null, this.type = 0, this.timestamps = 0;
            },
            show: function(t) {
                this.data = t, this.data && (s.rule = this.data.rule, this._judgeRule());
            },
            _judgeRule: function() {
                var t;
                this.type = 0, this.reset();
                var e = ss.logic.open.isOldMan();
                if ((t = ss.logic.open.isAudited() ? e ? this.data.rule.oldSort : this.data.rule.newSort : this.data.rule.auditSort) && 0 != t.length) {
                    for (var i, s, o = this.data.rule, n = 0, a = t.length; n < a; n++) if (s = t[n], 
                    (i = o.datas[s]) && !(ss.mask.get(i.mask) >= (e ? i.old : i.new)) && (s != ss.enum.superType.video || ss.logic.open.isReadyVideo())) {
                        this.type = s;
                        break;
                    }
                    switch (0 == this.type && (this.type = t[t.length - 1]), this.type) {
                      case ss.enum.superType.free:
                      case ss.enum.superType.freePre:
                      case ss.enum.superType.freeLast:
                        this.free.active = !0;
                        break;

                      case ss.enum.superType.pay:
                        var r = (i = o.datas[this.type]).cost;
                        this.payLab.string = r + "", this.notPayLab.string = r + "", ss.logic.money.isHasFullDiamond(r) ? this.pay.active = !0 : this.notPay.active = !0;
                        break;

                      case ss.enum.superType.video:
                      case ss.enum.superType.videoPre:
                      case ss.enum.superType.videoLast:
                        this.video.active = !0;
                        break;

                      case ss.enum.superType.share:
                      case ss.enum.superType.shareLimit:
                      case ss.enum.superType.shareLimitLast:
                      case ss.enum.superType.shareLimitPre:
                        this.share.active = !0;
                    }
                } else console.warn("superbutton的 rule 数据配置错误!!!");
            },
            _useRule: function() {
                if (this.data) {
                    s.rule = this.data.rule;
                    var t = this.data.rule.datas[this.type];
                    if (t) {
                        ss.mask.add(t.mask), this._judgeRule();
                        var e = this.data.onClickHandler;
                        e && e();
                    }
                }
            },
            _isCanClick: function() {
                return !!this.data && (!this.data.onCanHandler || this.data.onCanHandler());
            },
            _isTypeOver: function() {
                var t = this.data.rule.datas[this.type];
                return ss.mask.get(t.mask) >= (ss.logic.open.isOldMan() ? t.old : t.new) && (ss.logic.tips.hint("今天次数已用完！"), 
                !0);
            },
            _onAdVideoHandler: function(t) {
                if (t && this.data && this.node.active && this.node.parent && this.node.parent.active) if (s.rule == this.data.rule) {
                    var e = t;
                    if (e.param == this.timestamps) switch (e.method) {
                      case ss.enum.advertising.method.show:
                        e.code == ss.enum.advertising.code.failed && (ss.logic.tips.hint("今天视频播放次数已达上限！"), 
                        this._judgeRule());
                        break;

                      case ss.enum.advertising.method.onClose:
                        e.code == ss.enum.advertising.code.success ? this._videoPlayCompete() : ss.logic.tips.hint("看完视频才能获得哦！");
                    }
                } else console.warn("SuperButton 出现了交叉，该回调不是自己当前的事件");
            },
            _videoPlayCompete: function() {
                this._useRule();
            },
            click: function() {
                if (this.data) switch (this.type) {
                  case ss.enum.superType.free:
                  case ss.enum.superType.freePre:
                  case ss.enum.superType.freeLast:
                    this.clickFree();
                    break;

                  case ss.enum.superType.pay:
                    var t = this.data.rule.datas[this.type].cost;
                    ss.logic.money.isHasFullDiamond(t) ? this.clickPay() : this.clickNotPay();
                    break;

                  case ss.enum.superType.video:
                  case ss.enum.superType.videoPre:
                  case ss.enum.superType.videoLast:
                    this.clickVideo();
                    break;

                  case ss.enum.superType.share:
                  case ss.enum.superType.shareLimit:
                  case ss.enum.superType.shareLimitLast:
                  case ss.enum.superType.shareLimitPre:
                    this.clickShare();
                }
            },
            clickVideo: function() {
                if (this._isCanClick()) {
                    if (s.rule = this.data.rule, !ss.logic.open.isReadyVideo()) return ss.logic.tips.hint("今天次数已用完！"), 
                    void this._judgeRule();
                    this._isTypeOver() || (this.timestamps = Date.now(), ss.logic.open.showVideo(this.timestamps));
                }
            },
            clickShare: function() {
                var t = this;
                if (this._isCanClick()) {
                    s.rule = this.data.rule;
                    var e = this.data.shareId;
                    e ? this._isTypeOver() || ss.logic.open.shareGroup(e, function() {
                        t._useRule();
                    }) : console.warn("rule 的配置了分享，但是data未配置shareId");
                }
            },
            clickFree: function() {
                this._isCanClick() && (this._isTypeOver() || (s.rule = this.data.rule, this._useRule()));
            },
            clickPay: function() {
                var t = this;
                if (this._isCanClick()) {
                    s.rule = this.data.rule;
                    var e = this.data.rule.datas[this.type];
                    if (e && !this._isTypeOver()) {
                        var i = e.cost;
                        ss.logic.money.cost(ss.enum.money.diamond, i, function(e) {
                            e.code == ss.enum.code.success ? t._useRule() : (t.pay.active = !1, t.notPay.active = !0);
                        });
                    }
                }
            },
            clickNotPay: function() {
                this._isCanClick() && (this._isTypeOver() || ss.logic.tips.hint("钻石不足！"));
            }
        });
        cc._RF.pop();
    }, {} ],
    TestView: [ function(t, e, i) {
        cc._RF.push(e, "78ca8YWG5dAVI0vzpna6FXf", "TestView"), cc.Class({
            extends: cc.Component,
            properties: {
                superBtnNode: cc.Node,
                giveUpNode: cc.Node,
                bodyNode: cc.Node,
                nameLab: cc.Label
            },
            onLoad: function() {
                this.popUp = this.node.getComponent("PopUp"), this.superBtn = this.superBtnNode.getComponent("SuperButton2"), 
                this.body = this.bodyNode.getComponent(cc.Animation), this.data = null;
            },
            start: function() {
                this.node.active = !1;
            },
            update: function(t) {},
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.data = t;
                var e = ss.config.bannerWrong[ss.enum.view.test], i = ss.logic.open.isWrongBanner(e), s = ss.commonUtils.clone(ss.config.popup);
                s.opacity = 255, s.isOpenShowBanner = !0, s.isOpenChangeBanner = !0, s.bannerDelayTime = i ? e.showTime : 0, 
                this.popUp.show(s), this.superBtn.show({
                    rule: ss.config.rule.test,
                    shareId: ss.config.shareIds.test,
                    onCanHandler: null,
                    onClickHandler: this.click.bind(this)
                });
                var o = this.data.params.gameData.testId, n = ss.logic.config.getSheetData(ss.enum.sheet.goods, o), a = ss.logic.config.getSheetData(ss.enum.sheet.item, n.item_id), r = ss.logic.config.getSheetData(ss.enum.sheet.mode, n.extend_id);
                this.body.addClip(ss.logic.asset.getPacmanClip(r.skin), r.skin), this.body.play(r.skin), 
                this.nameLab.string = "" + a.name;
                var c = 0;
                i ? (this.giveUpNode.active = !0, c = 130) : (this.giveUpNode.active = !1, c = 270);
                var h = this.giveUpNode.getComponent(cc.Widget);
                h && (h.bottom = c, h.updateAlignment()), this.scheduleOnce(this._delayGiveUp.bind(this), e.skipTime);
            },
            close: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.unschedule(this._delayGiveUp, this), 
                this.popUp.close(), this.data = null;
            },
            click: function() {
                this._callGameTest();
            },
            giveUp: function() {
                this._callGameAtOnce();
            },
            _delayGiveUp: function() {
                this.giveUpNode.active = !0;
                var t = this.giveUpNode.getComponent(cc.Widget);
                t && (t.bottom = 270, t.updateAlignment());
            },
            _callGameTest: function() {
                if (this.data) {
                    var t = this.data.params;
                    ss.logic.net.reqGamePlay(t), this.close();
                }
            },
            _callGameAtOnce: function() {
                if (this.data) {
                    var t = this.data.params;
                    t.gameData.test = !1, ss.logic.net.reqGamePlay(t), this.close();
                }
            }
        }), cc._RF.pop();
    }, {} ],
    TimeTools: [ function(t, e, i) {
        cc._RF.push(e, "9f130mIw+xJBqRr9Ees300u", "TimeTools");
        var s = t("./Utils"), o = function() {};
        e.exports = {
            TimeTools: o
        };
        var n = 864e5;
        Date.prototype.Format = function(t) {
            if (!s.Utils.isString(t)) return "";
            var e = t, i = {
                "M+": Date.getMonth() + 1,
                "d+": Date.getDate(),
                "h+": Date.getHours(),
                "m+": Date.getMinutes(),
                "s+": Date.getSeconds(),
                "q+": Math.floor((Date.getMonth() + 3) / 3),
                S: Date.getMilliseconds(),
                w: Math.floor((Date.getTime() + 3 * n + 288e5) / (7 * n))
            };
            for (var o in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (Date.getFullYear() + "").substr(4 - RegExp.$1.length))), 
            i) new RegExp("(" + o + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? i[o] : ("00" + i[o]).substr(("" + i[o]).length)));
            return e;
        }, o.time2StrEN = function(t) {
            if (t < 0) return t.toString();
            t -= 24 * Math.floor(t / 24 / 3600 / 1e3) * 3600 * 1e3;
            var e = Math.floor(t / 3600 / 1e3);
            t -= 3600 * e * 1e3;
            var i = Math.floor(t / 60 / 1e3);
            t -= 60 * i * 1e3;
            var s = Math.floor(t / 1e3);
            return e < 10 && (e = "0" + e), i < 10 && (i = "0" + i), s < 10 && (s = "0" + s), 
            [ e, ":", i, ":", s ].join("");
        }, o.time2StrCN = function(t) {
            if (t < 0) return "";
            var e = Math.floor(t / 24 / 3600 / 1e3);
            t -= 24 * e * 3600 * 1e3;
            var i = Math.floor(t / 3600 / 1e3);
            t -= 3600 * i * 1e3;
            var s = Math.floor(t / 60 / 1e3);
            t -= 60 * s * 1e3;
            var o = Math.floor(t / 1e3);
            return e > 0 ? i > 0 ? [ e, "天" ].join("") : [ e, "天", i, "时" ].join("") : i > 0 ? s > 0 ? [ i, "时", s, "分" ].join("") : [ i, "时" ].join("") : s > 0 ? o > 0 ? [ s, "分", o, "秒" ].join("") : [ s, "分" ].join("") : o > 0 ? [ o, "秒" ].join("") : "";
        }, o.isTimeOut = function(t) {
            return o.getNowTime() > t;
        }, o.getNowTime = function(t, e) {
            return Date.now();
        }, o.getEndTime = function(t) {
            return Date.now() + t;
        }, o.format = function(t, e) {
            return s.Utils.isNumber(e) || (e = Date.now()), new Date(e).Format(t);
        }, o.getDayZeroTime = function(t) {
            return s.Utils.isNumber(t) || (t = Date.now()), Math.floor((t + 288e5) / n) * n - 288e5;
        }, o.getWeekZeroTime = function(t) {
            return s.Utils.isNumber(t) || (t = Date.now()), 6048e5 * Math.floor((t + 288e5 + 3 * n) / 6048e5) - 288e5 - 3 * n;
        }, o.getMonthZeroTime = function(t) {
            s.Utils.isNumber(t) || (t = Date.now());
            var e = new Date(t), i = new Date(-288e5);
            return i.setYear(e.getFullYear()), i.setMonth(e.getMonth()), i.getTime();
        }, cc._RF.pop();
    }, {
        "./Utils": "Utils"
    } ],
    TimeUtils: [ function(t, e, i) {
        cc._RF.push(e, "f649fuymx5DfbD3ESvEZnKZ", "TimeUtils");
        var s = t("./CommonUtils"), o = function() {};
        e.exports = {
            TimeUtils: o
        };
        var n = 864e5;
        Date.prototype.Format = function(t) {
            if (!s.CommonUtils.isString(t)) return "";
            var e = t, i = {
                "M+": Date.getMonth() + 1,
                "d+": Date.getDate(),
                "h+": Date.getHours(),
                "m+": Date.getMinutes(),
                "s+": Date.getSeconds(),
                "q+": Math.floor((Date.getMonth() + 3) / 3),
                S: Date.getMilliseconds(),
                w: Math.floor((Date.getTime() + 3 * n + 288e5) / (7 * n))
            };
            for (var o in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (Date.getFullYear() + "").substr(4 - RegExp.$1.length))), 
            i) new RegExp("(" + o + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? i[o] : ("00" + i[o]).substr(("" + i[o]).length)));
            return e;
        }, o.time2StrEN = function(t) {
            if (t < 0) return t.toString();
            t -= 24 * Math.floor(t / 24 / 3600 / 1e3) * 3600 * 1e3;
            var e = Math.floor(t / 3600 / 1e3);
            t -= 3600 * e * 1e3;
            var i = Math.floor(t / 60 / 1e3);
            t -= 60 * i * 1e3;
            var s = Math.floor(t / 1e3);
            return e < 10 && (e = "0" + e), i < 10 && (i = "0" + i), s < 10 && (s = "0" + s), 
            [ e, ":", i, ":", s ].join("");
        }, o.time2StrCN = function(t) {
            if (t < 0) return "";
            var e = Math.floor(t / 24 / 3600 / 1e3);
            t -= 24 * e * 3600 * 1e3;
            var i = Math.floor(t / 3600 / 1e3);
            t -= 3600 * i * 1e3;
            var s = Math.floor(t / 60 / 1e3);
            t -= 60 * s * 1e3;
            var o = Math.floor(t / 1e3);
            return e > 0 ? i > 0 ? [ e, "天" ].join("") : [ e, "天", i, "时" ].join("") : i > 0 ? s > 0 ? [ i, "时", s, "分" ].join("") : [ i, "时" ].join("") : s > 0 ? o > 0 ? [ s, "分", o, "秒" ].join("") : [ s, "分" ].join("") : o > 0 ? [ o, "秒" ].join("") : "";
        }, o.isTimeOut = function(t) {
            return o.getNowTime() > t;
        }, o.getNowTime = function(t, e) {
            return Date.now();
        }, o.getEndTime = function(t) {
            return Date.now() + t;
        }, o.format = function(t, e) {
            return s.CommonUtils.isNumber(e) || (e = Date.now()), new Date(e).Format(t);
        }, o.getDayZeroTime = function(t) {
            return s.CommonUtils.isNumber(t) || (t = Date.now()), Math.floor((t + 288e5) / n) * n - 288e5;
        }, o.getWeekZeroTime = function(t) {
            return s.CommonUtils.isNumber(t) || (t = Date.now()), 6048e5 * Math.floor((t + 288e5 + 3 * n) / 6048e5) - 288e5 - 3 * n;
        }, o.getMonthZeroTime = function(t) {
            s.CommonUtils.isNumber(t) || (t = Date.now());
            var e = new Date(t), i = new Date(-288e5);
            return i.setYear(e.getFullYear()), i.setMonth(e.getMonth()), i.getTime();
        }, cc._RF.pop();
    }, {
        "./CommonUtils": "CommonUtils"
    } ],
    Timer: [ function(t, e, i) {
        cc._RF.push(e, "85a5e+tY8xI9aGiwhGmCdre", "Timer");
        var s = t("./Dictionary"), o = function() {
            this.root = null, this.id = 0, this.interval = 0, this.startTime = 0, this.count = 0, 
            this.loop = -1, this.isPlaying = !1, this.lastTime = 0, this.method = null, this.param = null, 
            this.isLast = !0, this.isRecover = !1;
        };
        o.prototype.reset = function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : -1, o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null, n = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5], a = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
            this.isPlaying = !1, this.id = t, this.interval = e, n && (this.lastTime = 0), this.isLast = n, 
            this.count = 0, this.loop = s, this.method = i, this.param = o, this.isRecover = a;
        }, o.prototype._$play = function() {
            return this.isLast && (this.startTime = Date.now(), this.lastTime = this.startTime), 
            this.isPlaying = !0, this.id;
        }, o.prototype._$update = function(t) {
            if (this.isPlaying) {
                var e = Date.now();
                if (!(e - this.lastTime < this.interval)) {
                    this.lastTime = e;
                    var i = e - this.startTime;
                    this.count = Math.floor(i / this.interval);
                    var s = this.loop >= 0 && this.count >= this.loop;
                    s && (this.isPlaying = !1), this.method && (null == this.param ? this.method() : this.method(this.param)), 
                    s && this.isRecover && this.recover(this.id);
                }
            }
        }, o.prototype.getCount = function() {
            return this.count;
        }, o.prototype.clear = function() {
            this.isPlaying = !1, this.method = null, this.param = null, this.isLast = !0, this.isClearSelf = !1;
        }, o.timerPools = [], o.timers = new s.Dictionary(), o.tid = 0, o.prototype.advanceFrame = function(t) {
            var e = o.timers.values;
            if (0 != e.length) for (var i, s = e.length - 1; s >= 0; s--) (i = e[s]) && i._$update(t);
        }, o.prototype.getTimer = function(t) {
            return o.timers.get(t);
        }, o.prototype.getTimer2 = function(t) {
            for (var e, i = o.timers.values, s = i.length - 1; s >= 0; s--) if ((e = i[s]) && e.method === t) return e;
            return null;
        }, o.prototype.callLater = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 150, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], n = this.getTimer2(t);
            return n ? n.reset(n.id, e, t, 1, i, s) : ((n = o.timerPools.length > 0 ? o.timerPools.pop() : new o()).root = o, 
            n.reset(++o.tid, e, t, 1, i, s, !0), o.timers.set(n.id, n)), n._$play();
        }, o.prototype.clearCallLater = function(t) {
            this.recover(t);
        }, o.prototype.setInterval = function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : -1, n = o.timerPools.length > 0 ? o.timerPools.pop() : new o();
            return n.root = o, n.reset(++o.tid, e, t, s, i, !0, !0), o.timers.set(n.id, n), 
            n._$play();
        }, o.prototype.clearInterval = function(t) {
            this.recover(t);
        }, o.prototype.setTimeout = function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = o.timerPools.length > 0 ? o.timerPools.pop() : new o();
            return s.root = o, s.reset(++o.tid, e, t, 1, i, !0, !0), o.timers.set(s.id, s), 
            s._$play();
        }, o.prototype.clearTimeout = function(t) {
            this.recover(t);
        }, o.prototype.recover = function(t) {
            var e = o.timers.get(t);
            e && (e.clear(), o.timers.remove(t), o.timerPools.push(e));
        }, o.prototype.purge = function() {
            var t = o.timers.keys;
            if (0 != t.length) {
                for (var e = t.length - 1; e >= 0; e--) this.recover(t[e]);
                o.timers.clear();
            }
        }, e.exports = {
            Timer: o
        }, cc._RF.pop();
    }, {
        "./Dictionary": "Dictionary"
    } ],
    TipsLogic: [ function(t, e, i) {
        cc._RF.push(e, "16eb2t8IwBE/ZknbMmQ0wZ+", "TipsLogic");
        var s = function() {};
        s.prototype.hint = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1.5, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            ss.tips.showHint({
                delay: e,
                image: i,
                msg: t
            });
        }, s.prototype.kill = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            t && ss.tips.showKill({
                msg: t
            });
        }, s.prototype.shareGroupSucc = function() {}, s.prototype.shareGroupFailed = function() {
            var t = [ "试试分享至其他群吧！" ], e = t[Math.floor(Math.random() * t.length)];
            this.hint(e);
        }, s.prototype.shareGroupFull = function() {
            this.hint("尝试分享至不同的群吧！");
        }, s.prototype.shareSucc = function() {}, s.prototype.shareFail = function() {}, 
        e.exports = {
            TipsLogic: s
        }, cc._RF.pop();
    }, {} ],
    Tips: [ function(t, e, i) {
        cc._RF.push(e, "57044SdwD1HGYWMdkeufNtL", "Tips"), cc.Class({
            extends: cc.Component,
            properties: {
                hintParent: cc.Node,
                hintPrefab: cc.Prefab,
                killParent: cc.Node,
                killPrefab: cc.Prefab
            },
            onLoad: function() {
                ss.tips = this, this.hid = 0, this.hList = [], this.hints = new ss.NodePool(), this.kid = 0, 
                this.kList = [], this.kills = new ss.NodePool(), this.qPlaying = !1, this.qTimeStamp = 0, 
                this.queues = [], this.kPlaying = !1, this.kTimeStamp = 0, this.kQueues = [];
            },
            start: function() {
                this.hints.initialize("Hint", this.hintPrefab, this.hintParent), this.hints.preview(5), 
                this.kills.initialize("Kill", this.killPrefab, this.killParent), this.kills.preview(3);
            },
            update: function(t) {
                this._qPlay(), this._kPlay();
            },
            _qPlay: function() {
                this.qPlaying && (0 != this.queues.length ? (this.qTimeStamp += dt, this.qTimeStamp >= .2 && (this.qTimeStamp = 0, 
                this.queues.shift(), this.queues.length > 0 && this.showHint(this.queues[0]))) : this.qPlaying = !1);
            },
            _kPlay: function() {
                this.kPlaying && (0 != this.kQueues.length ? (this.kTimeStamp += dt, this.kTimeStamp >= .25 && (this.kTimeStamp = 0, 
                this.kQueues.shift(), this.kQueues.length > 0 && this.showKill(this.kQueues[0]))) : this.kPlaying = !1);
            },
            showHint: function(t) {
                var e = this.hid++, i = {
                    id: e,
                    index: this.hList.length,
                    tips: this,
                    param: t
                };
                this.hList.push(e), this.hints.create(i);
            },
            showHintQueue: function(t) {
                this.queues.push(t), 1 == this.queues.length && this.showHint(this.queues[0]), this.qPlaying = !0;
            },
            hideHint: function(t) {
                var e = this.hList.indexOf(t);
                e > -1 && this.hList.splice(e, 1), this.hints.recover(t, !0);
            },
            clearHints: function() {
                this.hints.removeAll(), this.queues.length = 0;
            },
            showKill: function(t) {
                var e = this.kid++, i = {
                    id: e,
                    index: this.kList.length,
                    tips: this,
                    param: t
                };
                this.kList.push(e), this.kills.create(i);
            },
            showKillQuene: function(t) {
                this.kQueues.push(t), 1 == this.kQueues.length && this.showKill(this.queues[0]), 
                this.qPlaying = !0;
            },
            hideKill: function(t) {
                var e = this.kList.indexOf(t);
                e > -1 && this.kList.splice(e, 1), this.kills.recover(t, !0);
            }
        }), cc._RF.pop();
    }, {} ],
    UnitVo: [ function(t, e, i) {
        cc._RF.push(e, "de5f4Lu6VlF9pK1VihCwi3h", "UnitVo"), e.exports = {
            UnitVo: function() {
                this.coin = 0, this.diamond = 50, this.score = 0, this.timeStamp = Date.now(), this.newId = 1;
            }
        }, cc._RF.pop();
    }, {} ],
    Unit: [ function(t, e, i) {
        cc._RF.push(e, "a55c5gIFe5IWpH6JiBUgHFH", "Unit");
        var s = function(t) {
            this.grid = null, this.comp = t, this.clear();
        };
        s.prototype.init = function(t) {
            this.id = t.id;
        }, s.prototype.setData = function(t) {
            this.gid = t.gid, this.cell = t.cell, this.grid = t.grid;
        }, s.prototype.isStanding = function() {
            return this.id >= 0;
        }, s.prototype._callBackCompActive = function(t) {
            this.cell && this.comp && this.comp.onUnitActive && this.comp.onUnitActive(this.isShowing, t);
        }, s.prototype._callBackCompChange = function() {
            this.cell && this.comp && this.comp.onUnitChange && this.comp.onUnitChange(this.gid);
        }, s.prototype._callBackCompDied = function() {
            this.cell && this.comp && this.comp.onUnitDied && this.comp.onUnitDied();
        }, s.prototype._exchange = function(t) {
            if (this.cell && this.grid) {
                var e = this.grid.getCellByLocalXY(t);
                if (!e) return console.warn("no find cell in unit[exchange] :", this.cell.id), void this._callBackCompDied();
                this.cell.id != e.id && (this.gid = e.id, this.cell.remove(this.id), this.cell = e, 
                this.cell.add(this), this._callBackCompChange());
            }
        }, s.prototype.onActiveFx = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            this.isShowing = t, this._callBackCompActive(e);
        }, s.prototype.removeSelf = function() {
            this.cell && this.cell.remove(this.id), this.clear();
        }, s.prototype.move = function(t) {
            this.v2 = t;
            var e = this.cell ? this.cell.rect : null;
            e && (e.contains(t) || this._exchange(t));
        }, s.prototype.clear = function() {
            this.id = -1, this.gid = -1, this.cell = null, this.v2 = null, this.isShowing = !1;
        }, e.exports = {
            Unit: s
        }, cc._RF.pop();
    }, {} ],
    Utils: [ function(e, i, s) {
        cc._RF.push(i, "fdbc42wyoBFc73dl9VHh3Vb", "Utils");
        var o = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        }, n = function() {};
        i.exports = {
            Utils: n
        }, n.isValidValue = function(t) {
            return void 0 !== t && null != t && ("number" != typeof t || !isNaN(t));
        }, n.isBoolean = function(t) {
            return n.isValidValue(t) && "boolean" == typeof t;
        }, n.isNumber = function(t) {
            return n.isValidValue(t) && "number" == typeof t;
        }, n.isString = function(t) {
            return n.isValidValue(t) && "string" == typeof t;
        }, n.isFunction = function(t) {
            return n.isValidValue(t) && "function" == typeof t;
        }, n.isArray = function(t) {
            return n.isValidValue(t) && Array.isArray(t);
        }, n.isObject = function(t) {
            return n.isValidValue(t) && "object" === (void 0 === t ? "undefined" : o(t)) && !Array.isArray(t);
        }, n.getJson = function(t) {
            if (!n.isString(t)) return null;
            try {
                var e = JSON.parse(t);
                if (e && n.isObject(e)) return e;
            } catch (t) {}
            return null;
        }, n.getObjFunc = function(t, e) {
            return n.isObject(t) && n.isString(e) && n.isFunction(t[e]) ? t[e].bind(t) : null;
        }, n.getObjFuncEx = function(t, e, i) {
            var s = n.getObjFunc(t, e);
            return null == s ? n.getObjFunc(i, e) : s;
        }, n.invokeCb = function(t) {
            if (n.isFunction(t)) {
                var e = Array.prototype.slice.call(arguments, 1);
                t.apply(null, e);
            } else console.log("invokeCb faild", t);
        }, n.clone = function(t) {
            var e = JSON.stringify(t);
            try {
                return JSON.parse(e);
            } catch (t) {}
            return null;
        }, cc._RF.pop();
    }, {} ],
    VScrollMiniProgram: [ function(t, e, i) {
        cc._RF.push(e, "3e4cfFCANZFDIi1/z0MJRW2", "VScrollMiniProgram"), cc.Class({
            extends: cc.Component,
            properties: {
                scrollViewNode: cc.Node,
                content: cc.Node,
                view: cc.Node,
                miniItemPreb: cc.Prefab,
                space: 10,
                timeRate: 80,
                showLen: 3
            },
            ctor: function() {
                this.data = null, this.isShow = !1, this.conentSrcYpos = 0, this.size = 0, this.items = [], 
                this.showList = [], this.timestamps = 0, this.cb = null;
            },
            onLoad: function() {},
            start: function() {
                this.data && this.data.length || (this.node.active = !1);
            },
            update: function(t) {
                this.isShow && (this.timestamps += t, this.timestamps > .5 && (this.timestamps = 0, 
                this._judgeCurShow()));
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                0 == this.conentSrcYpos && (this.conentSrcYpos = this.content.y), this.data = t, 
                this.cb = e, this.showList.length = 0, this._initItems(), this._judgeCurShow(), 
                this.isShow = !0;
            },
            _judgeCurShow: function() {
                if (this.data && this.data.length && this.node.active) {
                    var t = this.content.y - this.conentSrcYpos;
                    if (!(t < 0)) {
                        var e = Math.floor((Math.abs(t) + this.scrollViewNode.height) / (this.size + this.space / 2));
                        if (e = Math.min(e, this.data.length), !(this.showList.length >= e)) {
                            for (var i = [], s = 0; s < e; s++) null == this.showList[s] && (this.showList.push(this.data[s]), 
                            i.push(this.data[s]));
                            i.length && this.cb && this.cb(i);
                        }
                    }
                }
            },
            _miniCompleteCallBack: function() {
                console.log("_miniCompleteCallBack showAction"), this.showAction();
            },
            _miniStopCallBack: function() {
                this.stopAction();
            },
            _initItems: function() {
                if (this.data && this.data.length) {
                    for (var t = void 0, e = void 0, i = this.items.length, s = Math.max(this.data.length, i), o = 0; o < s; o++) if (o < this.data.length) {
                        if (o < i ? e = this.items[o] ? this.items[o].item : null : ((t = cc.instantiate(this.miniItemPreb)).parent = this.content, 
                        (e = t.getComponent("WiPaiMiniItem")) && this.items.push({
                            node: t,
                            item: e
                        })), t && 0 == this.size && (this.size = t.height), !e) return;
                        e.setData(this.data[o]), e.registerMiniCallBack(this._miniCompleteCallBack.bind(this), this._miniStopCallBack.bind(this));
                    } else (e = this.items[o]) && e.node && (e.node.active = !1);
                    this.node.active = !0, this.content.height = this.size * this.data.length + (this.data.length - 1) * this.space, 
                    this.gridLayout = this.content.getComponent(cc.Layout), this.gridLayout.updateLayout(), 
                    this.scrollView = this.scrollViewNode.getComponent(cc.ScrollView), this.scrollView.scrollToTop(0), 
                    this.showAction();
                }
            },
            showAction: function() {
                var t = this;
                if (this.data) {
                    var e = this.data.length || 0;
                    if (!(e < this.showLen)) {
                        this.content.stopAllActions();
                        var i = this.size * e + (e - 1) * this.space + this.conentSrcYpos - this.view.height, s = Math.abs(i + this.content.y) / this.timeRate, o = Math.abs(i) / this.timeRate;
                        this.content.y - i > 5 && (s = 0, this.content.y = i);
                        var n = cc.sequence(cc.delayTime(1), cc.moveTo(s, 0, i), cc.delayTime(1), cc.moveTo(o, 0, this.conentSrcYpos + this.space), cc.delayTime(1), cc.callFunc(function() {
                            t.showAction();
                        }));
                        this.content.runAction(n);
                    }
                }
            },
            stopAction: function() {
                this.content.stopAllActions();
            },
            hide: function() {
                this.stopAction(), this.node.active = !1, this.isShow = !1;
            }
        }), cc._RF.pop();
    }, {} ],
    Viewing: [ function(t, e, i) {
        cc._RF.push(e, "81e82pa951AZIn9/pTorHvM", "Viewing");
        var s = t("./Grid"), o = function() {
            this.rect = cc.rect(), this.padding = cc.size(), this.mapSize = cc.size(), this.gridSize = cc.size(), 
            this.paddingSize = cc.size(), this.grid = new s.Grid(), this.content = null, this._tv = cc.v2(), 
            this._units = new ss.Dictionary(), this._mapRect = new n(), this._mapLastRect = new n();
        };
        o.prototype.getCenter = function() {
            return this.grid.center;
        }, o.prototype.getShowList = function() {
            return this.grid.showList;
        }, o.prototype.getInnerList = function() {
            return this.grid.innerList;
        }, o.prototype.getCenterId = function() {
            return this.grid.getCenterCellId();
        }, o.prototype.getRandInnerId = function() {
            return this.grid.getCellIdByInnerRand();
        }, o.prototype.getRandOutsideId = function() {
            return this.grid.getCellIdByOutSideRand();
        }, o.prototype.getRandOutsideCell = function() {
            return this.grid.getCellByOutSideRand();
        }, o.prototype.getCellIdLocal = function(t) {
            var e = this.grid.getCellByLocalXY(t);
            return e ? e.id : null;
        }, o.prototype.init = function(t) {
            var e = cc.winSize, i = t.inside || cc.size(1, 1);
            this.content = t.content, this.paddingSize = t.paddingSize || cc.size(), this.rect = t.rect || cc.rect(-e.width / 2, -e.height / 2, e.width, e.height), 
            this.mapSize = t.mapSize || cc.size(1024, 1024), this.gridSize = t.gridSize || cc.size(256, 256), 
            this.grid.init({
                mapSize: this.mapSize,
                gridSize: this.gridSize,
                inside: i
            }), this._mapLastRect.top = this._mapLastRect.bottom = this._mapLastRect.left = this._mapLastRect.right = -1, 
            this.moveViewPort(this.rect.center);
        }, o.prototype.move = function(t) {
            var e = cc.v2(this.content.x, this.content.y);
            e = e.sub(t), this.moveViewPort(e);
        }, o.prototype.moveViewPort = function(t) {
            this.rect.center = cc.v2(-t.x, -t.y), this.content && this.content.setPosition(t.x, t.y), 
            this.updateViewPort();
        }, o.prototype.centerViewPort = function() {
            var t = this.grid.center;
            this.moveViewPort(t);
        }, o.prototype.updateViewPort = function() {
            var t = this.paddingSize, e = this.gridSize, i = this.rect, s = i.x - t.width + this.mapSize.width / 2, o = i.y - t.height + this.mapSize.height / 2, n = i.width + 2 * t.width, a = i.height + 2 * t.height;
            this._mapRect.top = Math.floor((o + a) / e.height), this._mapRect.bottom = Math.floor(o / e.height), 
            this._mapRect.left = Math.floor(s / e.width), this._mapRect.right = Math.floor((s + n) / e.width), 
            this._mapRect.top == this._mapLastRect.top && this._mapRect.bottom == this._mapLastRect.bottom && this._mapRect.left == this._mapLastRect.left && this._mapRect.right == this._mapLastRect.right || (this.clipViewPort(), 
            this._mapLastRect.top = this._mapRect.top, this._mapLastRect.bottom = this._mapRect.bottom, 
            this._mapLastRect.left = this._mapRect.left, this._mapLastRect.right = this._mapRect.right);
        }, o.prototype.clipViewPortNew = function() {
            for (var t = this.grid.row, e = this.grid.col, i = 0; i < t; i++) for (var s = 0; s < e; s++) s >= this._mapRect.left && s <= this._mapRect.right && i >= this._mapRect.bottom && i <= this._mapRect.top ? this.showGrid(s, i) : this.hideGrid(s, i);
        }, o.prototype.clipViewPort = function() {
            var t, e, i = 0, s = 0;
            if (this._mapRect.left > this._mapLastRect.left) {
                if ((i = this._mapRect.left - this._mapLastRect.left) > 0) for (e = this._mapLastRect.left; e < this._mapLastRect.left + i; e++) for (t = this._mapLastRect.bottom; t <= this._mapLastRect.top; t++) this.hideGrid(e, t);
            } else if ((s = Math.min(this._mapLastRect.left, this._mapRect.right + 1) - this._mapRect.left) > 0) for (e = this._mapRect.left; e < this._mapRect.left + s; e++) for (t = this._mapRect.bottom; t <= this._mapRect.top; t++) this.showGrid(e, t);
            if (this._mapRect.right > this._mapLastRect.right) {
                if ((s = this._mapRect.right - this._mapLastRect.right) > 0) for (e = Math.max(this._mapLastRect.right + 1, this._mapRect.left); e <= this._mapLastRect.right + s; e++) for (t = this._mapRect.bottom; t <= this._mapRect.top; t++) this.showGrid(e, t);
            } else if ((i = this._mapLastRect.right - this._mapRect.right) > 0) for (e = this._mapRect.right + 1; e <= this._mapRect.right + i; e++) for (t = this._mapLastRect.bottom; t <= this._mapLastRect.top; t++) this.hideGrid(e, t);
            if (this._mapRect.bottom > this._mapLastRect.bottom) {
                if ((i = this._mapRect.bottom - this._mapLastRect.bottom) > 0) for (t = this._mapLastRect.bottom; t < this._mapLastRect.bottom + i; t++) for (e = this._mapLastRect.left; e <= this._mapLastRect.right; e++) this.hideGrid(e, t);
            } else if ((s = Math.min(this._mapLastRect.bottom, this._mapRect.bottom + 1) - this._mapRect.bottom) > 0) for (t = this._mapRect.bottom; t < this._mapRect.bottom + s; t++) for (e = this._mapRect.left; e <= this._mapRect.right; e++) this.showGrid(e, t);
            if (this._mapRect.top > this._mapLastRect.top) {
                if ((s = this._mapRect.top - this._mapLastRect.top) > 0) for (t = Math.max(this._mapLastRect.top + 1, this._mapRect.bottom); t <= this._mapLastRect.top + s; t++) for (e = this._mapRect.left; e <= this._mapRect.right; e++) this.showGrid(e, t);
            } else if ((i = this._mapLastRect.top - this._mapRect.top) > 0) for (t = this._mapRect.top + 1; t <= this._mapRect.top + i; t++) for (e = this._mapLastRect.left; e <= this._mapLastRect.right; e++) this.hideGrid(e, t);
        }, o.prototype.showGrid = function(t, e) {
            this.grid.show(t, e);
        }, o.prototype.hideGrid = function(t, e) {
            this.grid.hide(t, e);
        }, o.prototype.localToGrid = function(t) {
            return this.grid.toGridXY(t);
        }, o.prototype.gridToLocal = function(t) {
            return this.grid.toLocalXY(t);
        }, o.prototype.getCell = function(t) {
            return this.grid.getCell(t);
        }, o.prototype.addUnit = function(t, e, i) {
            this.grid.addUnit(t, e, i);
        }, o.prototype.addUnitLocal = function(t, e, i) {
            var s = this.localToGrid(e);
            this.grid.addUnit(t, s, i);
        }, o.prototype.removeUnit = function(t) {
            this.grid.removeUnit(t);
        }, o.prototype.getUnit = function(t) {
            return this.grid.getUnit(t);
        }, o.prototype.removeAllUnits = function() {
            this.grid.removeAllUnits();
        }, o.prototype.scaleXY = function(t, e) {
            if (this.content) {
                this.content.stopAllActions();
                var i = this.content.scale, s = this.content.getPosition();
                s.divSelf(i), s.mulSelf(t);
                var o = cc.sequence(cc.spawn(cc.scaleTo(.5, t), cc.moveTo(.5, s)), cc.callFunc(e));
                this.content.runAction(o);
            }
        }, o.prototype.clear = function() {
            this.grid.clear(), this.content && (this.content.stopAllActions(), this.content.setScale(1));
        }, o.prototype.reset = function() {
            this.grid.reset(), this._mapRect.clear(), this._mapLastRect.top = this._mapLastRect.bottom = this._mapLastRect.left = this._mapLastRect.right = -1, 
            this.centerViewPort();
        }, o.prototype.clearAll = function() {
            this._mapRect.clear(), this._mapLastRect.clear(), this.rect.set(0, 0, 0, 0), this.clear();
        }, e.exports = {
            Viewing: o
        };
        var n = function() {
            this.clear();
        };
        n.prototype.clear = function() {
            this.left = this.top = this.right = this.bottom = 0;
        }, cc._RF.pop();
    }, {
        "./Grid": "Grid"
    } ],
    View: [ function(t, e, i) {
        cc._RF.push(e, "3bd66zXgo1JOroPJq/Hpasg", "View"), cc.Class({
            extends: cc.Component,
            properties: {
                mainViewNode: cc.Node,
                goodsViewNode: cc.Node,
                dailyViewNode: cc.Node,
                inviteViewNode: cc.Node,
                lotteryViewNode: cc.Node,
                testViewNode: cc.Node,
                reviveViewNode: cc.Node,
                resultViewNode: cc.Node,
                setsViewNode: cc.Node,
                rankViewNode: cc.Node,
                educeViewNode: cc.Node,
                strongViewNode: cc.Node,
                openViewNode: cc.Node,
                danViewNode: cc.Node
            },
            onLoad: function() {
                cc.Camera.main.backgroundColor = new cc.Color(184, 185, 185), this.views = {}, this.views[ss.enum.view.main] = this.mainViewNode.getComponent("MainView"), 
                this.views[ss.enum.view.goods] = this.goodsViewNode.getComponent("GoodsView"), this.views[ss.enum.view.daily] = this.dailyViewNode.getComponent("DailyView"), 
                this.views[ss.enum.view.invite] = this.inviteViewNode.getComponent("InviteView"), 
                this.views[ss.enum.view.lottery] = this.lotteryViewNode.getComponent("LotteryView"), 
                this.views[ss.enum.view.test] = this.testViewNode.getComponent("TestView"), this.views[ss.enum.view.revive] = this.reviveViewNode.getComponent("ReviveView"), 
                this.views[ss.enum.view.result] = this.resultViewNode.getComponent("ResultView"), 
                this.views[ss.enum.view.sets] = this.setsViewNode.getComponent("SetsView"), this.views[ss.enum.view.rank] = this.rankViewNode.getComponent("RankView"), 
                this.views[ss.enum.view.educe] = this.educeViewNode.getComponent("EduceView"), this.views[ss.enum.view.strong] = this.strongViewNode.getComponent("StrongView"), 
                this.views[ss.enum.view.open] = this.openViewNode.getComponent("OpenView"), this.views[ss.enum.view.dan] = this.danViewNode.getComponent("DanView");
            },
            start: function() {
                cc.systemEvent.on(ss.event.system.GameInit, this.gameInit, this), cc.systemEvent.on(ss.event.system.UserData, this.userData, this), 
                cc.systemEvent.on(ss.event.system.GameData, this.gameData, this), cc.systemEvent.on(ss.event.system.GamePlay, this.gamePlay, this), 
                cc.systemEvent.on(ss.event.system.GameOver, this.gameOver, this), cc.systemEvent.on(ss.event.client.openView, this.openView, this), 
                cc.systemEvent.on(ss.event.client.closeView, this.closeView, this), cc.systemEvent.on(ss.event.client.closeAllView, this.closeAllView, this);
            },
            gameInit: function(t) {
                var e = this.views[ss.enum.view.main];
                e && e.init && e.init(), (e = this.views[ss.enum.view.sets]) && e.init && e.init();
            },
            userData: function(t) {},
            gameData: function(t) {},
            gamePlay: function(t) {},
            gameOver: function(t) {
                var e = t;
                cc.systemEvent.emit(ss.event.client.closeView, {
                    type: ss.enum.view.revive
                }), cc.systemEvent.emit(ss.event.client.openView, {
                    type: ss.enum.view.dan,
                    result: e
                });
            },
            openView: function(t) {
                var e = t, i = this.views[e.type];
                i && i.show && i.show(e);
            },
            closeView: function(t) {
                var e = t, i = this.views[e.type];
                i && i.close && i.close(e);
            },
            closeAllView: function(t) {
                var e;
                for (var i in this.views) (e = this.views[i]) && e.close && e.close();
            }
        }), cc._RF.pop();
    }, {} ],
    Virtual: [ function(t, e, i) {
        cc._RF.push(e, "4805aUczWRKA4mPN8nBLYAo", "Virtual"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {},
            start: function() {
                cc.systemEvent.on(ss.event.system.GameInit, this.gameInit, this), cc.systemEvent.on(ss.event.system.UserData, this.userData, this), 
                cc.systemEvent.on(ss.event.system.GameData, this.gameData, this), cc.systemEvent.on(ss.event.system.GamePlay, this.gamePlay, this), 
                cc.systemEvent.on(ss.event.system.GameOver, this.gameOver, this), cc.systemEvent.on(ss.event.client.openFunc, this.openFunc, this);
            },
            gameInit: function(t) {},
            userData: function(t) {},
            gameData: function(t) {
                ss.logic.goods.init(), ss.logic.info.init(), ss.logic.invite.init(), ss.logic.lottery.init(), 
                ss.logic.abFun.init(), ss.logic.weiPai.init();
            },
            gamePlay: function(t) {
                ss.logic.sound.playBgMusic();
            },
            gameOver: function(t) {
                ss.logic.sound.stopBgMusic();
            },
            openFunc: function(t) {
                var e = t;
                e && (e.miniProgram && (ss.config.miniProgram = e.miniProgram), e.bannerWrong && (ss.config.bannerWrong = e.bannerWrong), 
                e.insterstital && (ss.config.insterstital = e.insterstital));
            },
            update: function(t) {
                ss.mask.update(t), ss.logic.open.update(t), ss.logic.goods.update(t), ss.logic.invite.update(t), 
                ss.logic.weiPai.update(t);
            }
        }), cc._RF.pop();
    }, {} ],
    VoManager: [ function(t, e, i) {
        cc._RF.push(e, "f4a2fByzM1IXrUjTO0CNR7C", "VoManager");
        var s = function() {};
        e.exports = {
            VoManager: s
        }, s.prototype.initialize = function() {}, cc._RF.pop();
    }, {} ],
    WebUtils: [ function(t, e, i) {
        cc._RF.push(e, "432d4FD7CdKb4rWgOPgpaWv", "WebUtils");
        var s = t("./Utils"), o = function() {};
        e.exports = {
            WebUtils: o
        }, o.obj2UriParam = function(t, e) {
            var i = "";
            if (!s.Utils.isObject(t)) return i;
            s.Utils.isValidValue(e) || (e = !0);
            var o = 0;
            for (var n in t) {
                o > 0 && (i += "&"), o++, i += e ? encodeURIComponent(n) : n, i += "=";
                var a = "" + t[n];
                i += e ? encodeURIComponent(a) : a;
            }
            return i;
        }, cc._RF.pop();
    }, {
        "./Utils": "Utils"
    } ],
    WechatSdk: [ function(t, e, i) {
        cc._RF.push(e, "07b2dipM41Nx4jAV+rshyLJ", "WechatSdk");
        var s = t("../../util/Utils"), o = t("../../util/WebUtils"), n = t("../const/HttpConst"), a = t("../const/ShareConst"), r = function() {};
        e.exports = {
            WechatSdk: r
        }, r.prototype.checkWx = function() {
            return "undefined" != typeof wx;
        }, r.prototype.checkWxFunction = function(t) {
            return this.checkWx() ? s.Utils.isFunction(wx[t]) : null;
        }, r.prototype.getStorage = function(t, e) {
            if (t = "" + t, !this.checkWxFunction("getStorage")) return console.log("wechat getStorage err, wx is low", t), 
            void s.Utils.invokeCb(e, null);
            wx.getStorage({
                key: t,
                success: function(i) {
                    if (!i) return console.log("wechat getStorage data res = null", t), void s.Utils.invokeCb(e, {});
                    s.Utils.invokeCb(e, i.data);
                },
                fail: function(i) {
                    console.log("wechat getStorage fail", t, i), s.Utils.invokeCb(e, {});
                }
            });
        }, r.prototype.setStorage = function(t, e, i) {
            return t = "" + t, this.checkWxFunction("setStorage") ? s.Utils.isObject(e) ? void wx.setStorage({
                key: t,
                data: e,
                success: function() {
                    s.Utils.invokeCb(i, !0);
                },
                fail: function() {
                    console.log("wechat setStorage fail", t, e), s.Utils.invokeCb(i, !1);
                }
            }) : (console.log("wechat setStorage data format err", t, e), void s.Utils.invokeCb(i, !1)) : (console.log("wechat setStorage err, wx is low", t, e), 
            void s.Utils.invokeCb(i, !1));
        }, r.prototype.httpRequest = function(t, e, i, o) {
            if (!this.checkWxFunction("request")) return console.log("wechat httpRequest err, wx is low", key, i), 
            void s.Utils.invokeCb(o, null, n.HttpConst.HTTP_CODE.WX_FUNC_FAILD);
            if (!s.Utils.isObject(i)) return console.log("wechat httpRequest data format err", key, i), 
            void s.Utils.invokeCb(o, null, n.HttpConst.HTTP_CODE.NOT_OBJECT);
            var a = {};
            a.url = e, a.header = {
                "Content-Type": "application/x-www-form-urlencoded;"
            }, a.data = i, a.method = t, a.dataType = "json", a.success = function(t) {
                var e = null;
                200 == t.statusCode && (e = t.data), s.Utils.invokeCb(o, e, t.statusCode);
            }, a.fail = function() {
                s.Utils.invokeCb(o, null, n.HttpConst.HTTP_CODE.FAILED);
            }, console.log("wechat httpRequest succ", i), wx.request(a);
        }, r.prototype.shareAppMessage = function(t, e, i, n, r, c, h) {
            var l = {
                succ: !1,
                mod: t,
                code: a.ShareConst.SHARE_CODE.FAILED,
                cbParam: h
            };
            if (!this.checkWxFunction("shareAppMessage")) return console.log("wechat shareAppMessage err, wx is low"), 
            l.code = a.ShareConst.SHARE_CODE.WX_FUNC_FAILD, void s.Utils.invokeCb(c, l);
            var d = {
                title: e,
                query: o.WebUtils.obj2UriParam(r),
                imageUrl: i,
                imageUrlId: n,
                success: function(e) {
                    t == a.ShareConst.SHARE_MOD.GROUP ? e.hasOwnProperty("shareTickets") ? (console.log("分享到群成功"), 
                    l.succ = !0, l.code = a.ShareConst.SHARE_CODE.GROUP_SUCC, l.shareTickets = e.shareTickets, 
                    s.Utils.invokeCb(c, l)) : (console.log("分享到群失败"), l.code = a.ShareConst.SHARE_CODE.FAILED_GOURP, 
                    s.Utils.invokeCb(c, l)) : (console.log("分享成功"), l.succ = !0, l.code = a.ShareConst.SHARE_CODE.NORMAL_SUCC, 
                    s.Utils.invokeCb(c, l));
                },
                fail: function(t) {
                    console.log("wechat shareAppMessage fail:", t), l.code = a.ShareConst.SHARE_CODE.FAILED, 
                    s.Utils.invokeCb(c, l);
                },
                complete: function() {
                    console.log("wechat shareAppMessage complete");
                },
                cancel: function(t) {
                    console.log("wechat shareAppMessage cancel:", t), l.code = a.ShareConst.SHARE_CODE.CANCEL, 
                    s.Utils.invokeCb(c, l);
                }
            };
            wx.shareAppMessage(d);
        }, r.prototype.setupAppMessage = function(t, e, i, n, r, c, h) {
            if (this.checkWxFunction("onShareAppMessage")) {
                var l = {
                    succ: !1,
                    mod: t,
                    code: a.ShareConst.SHARE_CODE.FAILED,
                    cbParam: h
                }, d = {
                    title: e,
                    query: o.WebUtils.obj2UriParam(r),
                    imageUrl: i,
                    imageUrlId: n,
                    success: function(e) {
                        t == a.ShareConst.SHARE_MOD.GROUP ? e.hasOwnProperty("shareTickets") ? (console.log("分享到群成功"), 
                        l.succ = !0, l.code = a.ShareConst.SHARE_CODE.GROUP_SUCC, l.groupId = e.shareTickets, 
                        s.Utils.invokeCb(c, l)) : (console.log("分享到群失败"), l.code = a.ShareConst.SHARE_CODE.FAILED_GOURP, 
                        s.Utils.invokeCb(c, l)) : (console.log("分享成功"), l.succ = !0, l.code = a.ShareConst.SHARE_CODE.NORMAL_SUCC, 
                        s.Utils.invokeCb(c, l));
                    },
                    fail: function(t) {
                        console.log("wechat onShareAppMessage fail:", t), l.code = a.ShareConst.SHARE_CODE.FAILED, 
                        s.Utils.invokeCb(c, l);
                    },
                    complete: function() {
                        console.log("wechat onShareAppMessage complete");
                    }
                };
                wx.onShareAppMessage(function() {
                    return d;
                });
            } else console.log("wechat setupAppMessage err, wx is low");
        }, cc._RF.pop();
    }, {
        "../../util/Utils": "Utils",
        "../../util/WebUtils": "WebUtils",
        "../const/HttpConst": "HttpConst",
        "../const/ShareConst": "ShareConst"
    } ],
    WeiPaiLogic: [ function(t, e, i) {
        function s(t, e, i, s) {
            function o(t, e, i, s) {
                return t < 20 ? e & i | ~e & s : t < 40 ? e ^ i ^ s : t < 60 ? e & i | e & s | i & s : e ^ i ^ s;
            }
            function n(t) {
                return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
            }
            function a(t, e) {
                var i = (65535 & t) + (65535 & e);
                return (t >> 16) + (e >> 16) + (i >> 16) << 16 | 65535 & i;
            }
            function r(t, e) {
                return t << e | t >>> 32 - e;
            }
            function c(t, e) {
                t[e >> 5] |= 128 << 24 - e % 32, t[15 + (e + 64 >> 9 << 4)] = e;
                for (var i = [ 80 ], s = 1732584193, c = -271733879, h = -1732584194, l = 271733878, d = -1009589776, u = 0; u < t.length; u += 16) {
                    for (var p = s, g = c, m = h, f = l, v = d, y = 0; y < 80; y++) {
                        i[y] = y < 16 ? t[u + y] : r(i[y - 3] ^ i[y - 8] ^ i[y - 14] ^ i[y - 16], 1);
                        var w = a(a(r(s, 5), o(y, c, h, l)), a(a(d, i[y]), n(y)));
                        d = l, l = h, h = r(c, 30), c = s, s = w;
                    }
                    s = a(s, p), c = a(c, g), h = a(h, m), l = a(l, f), d = a(d, v);
                }
                return [ s, c, h, l, d ];
            }
            function h(t) {
                for (var e = [], i = (1 << s) - 1, o = 0; o < t.length * s; o += s) e[o >> 5] |= (t.charCodeAt(o / 8) & i) << 32 - s - o % 32;
                return e;
            }
            return i || (i = "="), s || (s = 8), function(t, e) {
                return function(t) {
                    for (var e = "", s = 0; s < 4 * t.length; s += 3) for (var o = (t[s >> 2] >> 8 * (3 - s % 4) & 255) << 16 | (t[s + 1 >> 2] >> 8 * (3 - (s + 1) % 4) & 255) << 8 | t[s + 2 >> 2] >> 8 * (3 - (s + 2) % 4) & 255, n = 0; n < 4; n++) 8 * s + 6 * n > 32 * t.length ? e += i : e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o >> 6 * (3 - n) & 63);
                    return e;
                }(function(t, e) {
                    var i = h(t);
                    i.length > 16 && (i = c(i, t.length * s));
                    for (var o = [ 16 ], n = [ 16 ], a = 0; a < 16; a++) o[a] = 909522486 ^ i[a], n[a] = 1549556828 ^ i[a];
                    var r = c(o.concat(h(e)), 512 + e.length * s);
                    return c(n.concat(r), 672);
                }(t, e));
            }(t, e);
        }
        cc._RF.push(e, "3ae3flab35E4LsGAs8wZvWN", "WeiPaiLogic");
        var o = function() {
            this.navigateToMiniProgramAppIdList = [ "wxa2fd73a6fc715041", "wx6116e13858fad80b", "wxebb8abe1f4cadacd", "wxdb05a20158191f56", "wxb12fb9300c93a4fb", "wx323844398d34ba97", "wxfd5e6758e91c29e6", "wxb2a1b305bbf69be2", "wx431e5e24ccd54633", "wxf4ac0077b6ffb1e7" ], 
            this.spread_app = "10", this.sign_key = "961d427273af1362fd7abed918327b03", this.url = "https://cross-ad-api.afunapp.com", 
            this.test_client_id = 1, this.wpData = null, this.adsData = null, this.timestamps = 0, 
            this.timeAll = 2, this.count = 0, this.max = 6, this.playing = !1, this._deviceInfo = null, 
            this._exposureList = [], this._exposureTimestamps = 0;
        };
        o.prototype.init = function() {
            isWeiXin && ss.logic.open.isAudited() && (this.timestamps = 0, this.timeAll = 1, 
            this.playing = !0, this.reportUserRegister());
        }, o.prototype.update = function(t) {
            if (isWeiXin && (this._exposureTimestamps += t, this._exposureTimestamps >= 1 && (this._exposureTimestamps = 0, 
            this._judgeExposureList()), !ss.state.isPlaying() && this.playing && !this.wpData && (this.timestamps += t, 
            this.timestamps >= this.timeAll))) {
                if (this.timestamps = 0, this.playing = !1, ++this.count >= this.max) return void console.warn("WeiPaiLogic _request_config error : count >= max ");
                this.request_config();
            }
        }, o.prototype.isLoaded = function() {
            return !!this.wpData;
        }, o.prototype.getConfig = function(t, e, i) {
            var o = this;
            if (arguments.length > 3 && void 0 !== arguments[3] && arguments[3] || !this.wpData) {
                for (var n = {
                    spread_app: this.spread_app,
                    client_id: ss.proxy.httpParams.uid || this.test_client_id,
                    position: t
                }, a = Object.keys(n).sort(), r = "GET&/ad/get_ad_config", c = 0; c < a.length; c++) r += "&" + a[c] + "=" + n[a[c]];
                n.sign = s(this.sign_key, r);
                var h = this.url + "/ad/get_ad_config?" + this._objectToForm(n);
                ss.custom.httpGet(h, {}, function(t) {
                    console.log("WeiPaiLogic get_ad_config:", t), t && 200 == t.code ? (o.wpData = t.data, 
                    o._create_crossSpreadAdsInfo(t.data), e && e(t.data)) : i && i();
                }, i);
            } else e && e(this.wpData);
        }, o.prototype.getAdsInfos = function(t) {
            return this.adsData ? this.adsData["ad_list" + t] : [];
        }, o.prototype.getRandAdsInfo = function(t) {
            if (this.adsData) {
                var e = this.getAdsInfos(t), i = 0, s = 0, o = e.length;
                for (s = 0; s < o; ++s) i += e[s].probability;
                var n = i * Math.random(), a = 0;
                for (s = 0; s < o; ++s) if ((a += e[s].probability) >= n) return e[s];
                if (e && o > 0) return e[Math.floor(Math.random() * o)];
            }
            return null;
        }, o.prototype.reportUserRegister = function() {
            if (isWeiXin && ss.logic.open.isAudited() && ss.config.miniProgram.open > 0) {
                var t = wx.getLaunchOptionsSync();
                if (!t) return;
                var e = t.referrerInfo && t.referrerInfo.extraData ? t.referrerInfo.extraData : null, i = e ? e.wepie_crossads : null;
                if (i && i.id) {
                    var s = {
                        wepie_spread_app: i.spread_app,
                        wepie_id: i.id,
                        wepie_material_id: i.material_id,
                        wepie_type: i.type,
                        wepie_path: i.path && i.path.replace(/&/g, "%26"),
                        wepie_position: i.position,
                        wepie_sequence: i.sequence,
                        wepie_upload_type: this._getReportUserType()
                    };
                    this._uploadAdEvent(s, "/ad/upload_ad_event", "user_register_stat", i.spread_app);
                }
            }
        }, o.prototype.reportEvent = function(t, e) {
            if (isWeiXin && ss.logic.open.isAudited() && ss.config.miniProgram.open > 0 && t && t.id) {
                var i = {
                    wepie_id: t.id,
                    wepie_material_id: t.material_id,
                    wepie_type: t.type,
                    wepie_path: t.path && crossSpreadAdsInfo.path.replace(/&/g, "%26"),
                    wepie_position: t.position,
                    wepie_sequence: t.sequence,
                    wepie_upload_type: e
                };
                this._uploadAdEvent(i, "/ad/upload_ad_event", "ad_expose_stat");
            }
        }, o.prototype.batchReportEvent = function(t, e) {
            if (isWeiXin && ss.logic.open.isAudited() && ss.config.miniProgram.open > 0 && t && t.length) {
                for (var i, s = [], o = 0; o < t.length; o++) (i = t[o]) && s.push({
                    wepie_id: i.id,
                    wepie_material_id: i.material_id,
                    wepie_type: i.type,
                    wepie_path: i.path && crossSpreadAdsInfo.path.replace(/&/g, "%26"),
                    wepie_position: i.position,
                    wepie_sequence: i.sequence,
                    wepie_upload_type: e
                });
                s.length && this._uploadAdEvent(s, "/ad/batch_upload_ad_event", "ad_expose_stat");
            }
        }, o.prototype.batchReportEvent_items = function(t) {
            if (isWeiXin) {
                for (var e = [], i = void 0, s = void 0, o = void 0, n = void 0, a = arguments.length, r = Array(a > 1 ? a - 1 : 0), c = 1; c < a; c++) r[c - 1] = arguments[c];
                for (i = 0; i < r.length; i++) if (o = r[i]) if (Array.isArray(o)) for (s = 0; s < o.length; s++) (n = o[s]) && e.push(n); else e.push(o);
                this.batchReportEvent(e, t);
            }
        }, o.prototype.batchReportExposure_list = function(t) {
            isWeiXin && t && (Array.isArray(t) ? this._exposureList = this._exposureList.concat(t) : this._exposureList.push(t), 
            this._exposureList.length >= 10 && (console.log("batchReportExposure_list len >= 10"), 
            this._judgeExposureList()));
        }, o.prototype._judgeExposureList = function() {
            isWeiXin && 0 != this._exposureList.length && (this.batchReportEvent_items(ss.enum.weiPai.ReportEventType.exposure, this._exposureList), 
            this._exposureList.length = 0);
        }, o.prototype._objectToForm = function(t) {
            var e = [];
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.push(i + "=" + t[i]);
            return e.join("&");
        }, o.prototype.request_config = function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            if (isWeiXin) {
                if (e) this.timestamps = 0, this.playing = !1; else if (this.wpData) return;
                this.getConfig(0, function(e) {
                    t.timestamps = 0, t.playing = !1, cc.systemEvent.emit(ss.event.client.setExport);
                }, function() {
                    t.timestamps = 0, t.timeAll = 2, t.playing = !0;
                }, e);
            }
        }, o.prototype._create_crossSpreadAdsInfo = function(t) {
            if (t) try {
                this.adsData = {};
                var e = void 0;
                for (var i in t) if (t.hasOwnProperty(i)) {
                    var s = t[i];
                    if (!s || !s.length) continue;
                    e = [];
                    for (var o = 0; o < s.length; o++) {
                        var n = s[o];
                        n && -1 != this.navigateToMiniProgramAppIdList.indexOf(n.app_id) && e.push(n);
                    }
                    e.length && (this.adsData[i] = e);
                }
            } catch (t) {
                console.log("处理交叉推广广告的返回值出错:" + t);
            } else console.warn("_create_crossSpreadAdsInfo data error:", t);
        }, o.prototype._getDeviceInfo = function() {
            if (this._deviceInfo) return this._deviceInfo;
            var t = void 0;
            isWeiXin && (t = wx.getSystemInfoSync());
            var e = {
                platform: t ? function(t) {
                    var e = 0;
                    switch (t) {
                      case "devtools":
                        e = 3;
                        break;

                      case "android":
                        e = 2;
                        break;

                      case "ios":
                        e = 1;
                    }
                    return e;
                }(t.platform) : 0,
                version: ss.proxy.game.version + "",
                brand: t ? t.brand : "undefined",
                model: t ? t.model : "undefined"
            };
            return this._deviceInfo = JSON.stringify(e), this._deviceInfo;
        }, o.prototype._getReportUserType = function() {
            return ss.logic.open.freshCount <= 1 ? ss.enum.weiPai.ReportUserType.new_user : ss.enum.weiPai.ReportUserType.old_user;
        }, o.prototype._uploadAdEvent = function(t, e, i) {
            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            if (isWeiXin && ss.proxy.httpParams && t) {
                for (var n = {
                    spread_app: o || this.spread_app,
                    client_id: ss.proxy.httpParams.uid,
                    device_info: this._getDeviceInfo(),
                    event: i,
                    ext_data: JSON.stringify(t),
                    log_time: Date.now()
                }, a = Object.keys(n).sort(), r = "POST&" + e, c = 0; c < a.length; c++) r += "&" + a[c] + "=" + n[a[c]];
                n.sign = s(this.sign_key, r);
                var h = this.url + e;
                ss.custom.httpPost(h, n, function(t) {
                    console.log("weipai _uploadAdEvent res:", t), t && 200 == t.code ? console.log("weipai _uploadAdEvent success:", e, i) : console.log("weipai _uploadAdEvent fail:", e, i);
                }, function() {
                    console.log("weipai _uploadAdEvent fail:", e, i);
                });
            }
        }, e.exports = {
            WeiPaiLogic: o
        }, cc._RF.pop();
    }, {} ],
    WeiPaiMiniProgram: [ function(t, e, i) {
        cc._RF.push(e, "03a85PeZoBFJrHErlGuGQmy", "WeiPaiMiniProgram"), cc.Class({
            extends: cc.Component,
            properties: {
                icon: cc.Sprite,
                nameLab: cc.Label,
                red: cc.Node,
                isShark: !0,
                isScale: !1
            },
            onLoad: function() {
                this.isShow = !1, this.miniData = null;
            },
            start: function() {
                this.isShow || (this.node.active = !1);
            },
            show: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                t && (this.isShow = !0, ss.logic.open.isAudited() && ss.config.miniProgram.open > 0 ? (this.node.active = !0, 
                this.icon.spriteFrame = null, this.miniData = t, this.node.stopAllActions(), this.node.rotation = 0, 
                this.setData()) : this.node.active = !1);
            },
            setData: function() {
                var t = this;
                if (ss.logic.open.isAudited() && ss.config.miniProgram.open > 0) {
                    var e = this.miniData;
                    e && (this.nameLab.string = e.spread_name, this.red.active = e.corner_flag >= 1, 
                    cc.loader.load({
                        url: e.icon_imgurl,
                        type: "png"
                    }, function(e, i) {
                        if (i) {
                            var s = new cc.SpriteFrame(i);
                            t.icon.spriteFrame = s, t.node.active = !0;
                        }
                    })), this._playMiniProgram();
                }
            },
            clickMinProgram: function() {
                if (ss.logic.open.isCanMiniProgram()) {
                    var t = this.miniData;
                    if (!t) return;
                    ss.logic.weiPai.reportEvent(t, ss.enum.weiPai.ReportEventType.click), ss.logic.open.navigateToMiniProgram({
                        appId: t.app_id,
                        path: t.path,
                        extraData: {
                            wepie_crossads: t
                        },
                        envVersion: "release",
                        success: function(e) {
                            console.log("navigateToMiniProgram ok:", t), t && ss.logic.weiPai.reportEvent(t, ss.enum.weiPai.ReportEventType.jump);
                        }
                    });
                }
            },
            close: function() {
                this.miniData = null, this.node.active = !1, this.node.stopAllActions(), this.node.rotation = 0, 
                this.node.setScale(1, 1);
            },
            _playMiniProgram: function() {
                this.isShark ? this._shackeMiniProgram() : this.isScale && this._scaleMiniProgram();
            },
            _shackeMiniProgram: function() {
                this.isShark && (this.node.stopAllActions(), this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1.5), cc.repeat(cc.sequence(cc.rotateTo(.08, 8), cc.rotateTo(.08, -8)), 4), cc.rotateTo(.04, 0)))));
            },
            _scaleMiniProgram: function() {
                this.isScale && (this.node.stopAllActions(), this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.4), cc.scaleTo(.5, 1.1), cc.scaleTo(.5, 1)))));
            }
        }), cc._RF.pop();
    }, {} ],
    WeiXinSdk: [ function(t, e, i) {
        cc._RF.push(e, "e2818I8AX5EHZ1fGh/SEqvY", "WeiXinSdk");
        var s = function(t, e) {
            this.isInitialize = !1, this.launchOption = wx.getLaunchOptionsSync(), console.log("this.launchOption:", this.launchOption), 
            wx.onShow(function(e) {
                t && t(e);
            }), wx.onHide(function() {
                e && e();
            });
        };
        s.prototype.initialize = function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            this.requestList = [], this.preCallBack = e, this.isInitialize = !1;
            var s = this;
            wx.getSetting({
                success: function(o) {
                    console.log("WeiXinSdk getSetting:", o);
                    for (var n = o.authSetting, a = t.length, r = 0; r < a; r++) !0 === n[t[r].type] || (n[t[r].type], 
                    s.requestList.push(t[r]));
                    0 == s.requestList.length ? (s.isInitialize = !0, e && e()) : i && i();
                },
                fail: function() {
                    i && i();
                }
            });
        }, s.prototype.checkSession = function(t) {
            var e = {};
            wx.checkSession({
                success: function(i) {
                    e.code = s.RESULT_CODE.OK, e.data = i, t(e);
                },
                fail: function() {
                    e.code = s.RESULT_CODE.LOGIN_FAIL, e.data = null, t(e);
                }
            });
        }, s.prototype.login = function(t) {
            var e = {};
            this.checkInitialize() && wx.login({
                success: function(i) {
                    console.log("login success:", i), e.code = s.RESULT_CODE.OK, e.data = {}, e.data.code = i.code, 
                    t(e);
                },
                fail: function() {
                    e.code = s.RESULT_CODE.LOGIN_FAIL, t(e);
                }
            });
        }, s.prototype.getUserInfo = function(t) {
            var e = {}, i = this;
            wx.getUserInfo({
                openIdList: [ "selfOpenId" ],
                success: function(o) {
                    console.log("getUserInfo:", o), e.code = s.RESULT_CODE.OK, e.data = {}, e.data.encryptedData = encodeURIComponent(o.encryptedData), 
                    e.data.iv = o.iv, e.data.userInfo = o.userInfo, e.data.launchOption = i.launchOption, 
                    t(e);
                },
                fail: function() {
                    e.code = s.RESULT_CODE.GET_USERINFO_FAIL, t(e);
                }
            });
        }, s.prototype.showLoading = function(t) {
            wx.showLoading(t);
        }, s.prototype.hideLoading = function(t) {
            wx.hideLoading(t);
        }, s.prototype.navigateToMiniProgram = function(t) {
            wx.navigateToMiniProgram(t);
        }, s.prototype.checkAuthorize = function() {
            var t = this;
            if (this.requestList && this.requestList.length > 0) {
                var e = this.requestList.shift();
                e ? wx.authorize({
                    scope: e.type,
                    success: function() {
                        t.checkAuthorize();
                    },
                    fail: function() {
                        if (e.isMust) {
                            var i = t.getAuthorizeTypeErrorText(e.type);
                            wx.showModal({
                                title: "提示",
                                content: i,
                                success: function(i) {
                                    i.confirm ? wx.openSetting({
                                        success: function(i) {
                                            for (var s in i.authSetting) if (s == e.type && !i.authSetting[s]) {
                                                t.requestList.push(e);
                                                break;
                                            }
                                            t.checkAuthorize();
                                        },
                                        fail: function() {
                                            t.requestList.push(e), t.checkAuthorize();
                                        }
                                    }) : (t.requestList.push(e), t.checkAuthorize());
                                }
                            });
                        } else t.checkAuthorize();
                    }
                }) : this.checkAuthorize();
            } else this.isInitialize = !0, this.preCallBack();
        }, s.prototype.checkInitialize = function() {
            return this.initialize || console.log("sdk 没有初始化成功"), this.initialize;
        }, s.prototype.getAuthorizeTypeErrorText = function(t) {
            var e = "";
            switch (t) {
              case s.AUTHORIZE_TYPE.USER_INFO:
                e = "需要开启用户信息权限才能继续";
                break;

              case s.AUTHORIZE_TYPE.USER_LOCATION:
                e = "需要开启地理位置权限才能继续";
                break;

              case s.AUTHORIZE_TYPE.WERUN:
                e = "需要开启微信运动步数权限才能继续";
                break;

              case s.AUTHORIZE_TYPE.RECORD:
                e = "需要开启录音功能权限才能继续";
                break;

              case s.AUTHORIZE_TYPE.WRITE_PHOTOS_ALBUM:
                e = "需要开启保存到相册权限才能继续";
                break;

              case s.AUTHORIZE_TYPE.CAMERA:
                e = "需要开启摄像头权限才能继续";
            }
            return e;
        }, s.AUTHORIZE_TYPE = {
            USER_INFO: "scope.userInfo",
            USER_LOCATION: "scope.userLocation",
            WERUN: "scope.werun",
            RECORD: "scope.record",
            WRITE_PHOTOS_ALBUM: "scope.writePhotosAlbum",
            CAMERA: "scope.camera"
        }, s.RESULT_CODE = {
            OK: 200,
            LOGIN_FAIL: 500,
            GET_USERINFO_FAIL: 501
        }, e.exports = {
            WeiXinSdk: s
        }, cc._RF.pop();
    }, {} ],
    WeixinSdkManager: [ function(t, e, i) {
        cc._RF.push(e, "102abL9AF9C/rf2/60rqN/3", "WeixinSdkManager");
        var s = t("./WeiXinSdk"), o = t("./OtherLogin"), n = t("./AldSdk"), a = function() {
            this.wxRes = null, this.userInfo = null, this.auditDate = null, this.audited = !1, 
            this.weixinSdk = null, this.aldSdk = null, this.otherLogin = null, this.isWeiXin = isWeiXin, 
            this.isOtherLogin = ss.proxy.game.isOther, this.isAldDataEyes = ss.proxy.game.isAldDataEyes;
        };
        a.prototype.initialize = function() {
            this.isWeiXin && (this.weixinSdk = new s.WeiXinSdk(this.onShow.bind(this), this.onHide.bind(this))), 
            this.isOtherLogin && (this.otherLogin = new o.OtherLogin(this)), this.isAldDataEyes && (this.aldSdk = new n.AldSdk());
        }, a.prototype.preview = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            this.isWeiXin && !ss.proxy.noCheck ? (this.checkUpdate(), this.weixinSdk.initialize([ {
                type: s.WeiXinSdk.AUTHORIZE_TYPE.USER_INFO,
                isMust: !0
            } ], function() {
                console.log("weixinSdk initialize success"), t && t();
            }, function() {
                e && e();
            })) : t && t();
        }, a.prototype.login = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            if (arguments.length > 2 && void 0 !== arguments[2] && arguments[2], this.isWeiXin && !ss.proxy.noCheck) {
                var i = this;
                i.showLoading("正在登陆", !1), i.isOtherLogin ? i.otherLogin.ready(function(o) {
                    console.log("otherLogin.ready:", o), o && o.code == s.WeiXinSdk.RESULT_CODE.OK ? i.getUserInfo(t, e, o.js_code) : i.weixinSdk.login(function(s) {
                        s && s.data && i.getUserInfo(t, e, s.data.code);
                    });
                }) : i.weixinSdk.login(function(s) {
                    s && s.data && i.getUserInfo(t, e, s.data.code);
                });
            } else t && t(null);
        }, a.prototype.onShow = function(t) {
            console.log("onShow:", t, " query:", JSON.stringify(t.query)), this.checkUpdate();
        }, a.prototype.checkUpdate = function() {
            if ("function" == typeof wx.getUpdateManager) {
                var t = wx.getUpdateManager();
                t.onCheckForUpdate(function(t) {
                    console.log("onCheckForUpdate:", t.hasUpdate);
                }), t.onUpdateReady(function() {
                    t.applyUpdate();
                }), t.onUpdateFailed(function() {});
            }
        }, a.prototype.onHide = function() {
            console.log("onHide");
        }, a.prototype.checkIsUserAdvisedToRest = function(t) {
            "function" == typeof wx.checkIsUserAdvisedToRest && wx.checkIsUserAdvisedToRest({
                todayPlayedTime: t,
                success: function() {
                    console.log("checkIsUserAdvisedToRestg成功");
                },
                fail: function() {
                    console.log("checkIsUserAdvisedToRestg失败");
                }
            });
        }, a.prototype.setWxRes = function(t) {
            var e = {};
            e.code = s.WeiXinSdk.RESULT_CODE.OK, e.data = {}, e.data.encryptedData = encodeURIComponent(t.encryptedData), 
            e.data.iv = t.iv, e.data.userInfo = t.userInfo, e.data.launchOption = this.weixinSdk.launchOption, 
            this.wxRes = e;
        }, a.prototype.getUserInfo = function(t, e, i) {
            function o(o) {
                console.log("judgeUserInfo:", o), o && o.code == s.WeiXinSdk.RESULT_CODE.OK ? (n.userInfo = o.data.userInfo, 
                n.isOtherLogin ? n.otherLogin.login(o, i, function(e) {
                    n.hideLoading(), n.checkUpdate(), t && t(e);
                }, function() {
                    n.login(t, e);
                }, function() {
                    n.hideLoading(), n.checkUpdate(), e && e({
                        code: 500
                    });
                }) : (n.hideLoading(), n.checkUpdate(), t({
                    code: 200,
                    result: null,
                    userInfo: n.userInfo,
                    openId: i,
                    params: {}
                }))) : (n.hideLoading(), n.checkUpdate(), e && e({
                    code: 500
                }));
            }
            var n = this;
            n.wxRes ? o(n.wxRes) : this.weixinSdk.getUserInfo(o);
        }, a.prototype.sendAldEvent = function(t, e) {
            this.aldSdk && this.aldSdk.sendAldEvent(t, e);
        }, a.prototype.showLoading = function(t, e) {
            this.weixinSdk.showLoading({
                title: t,
                mask: e,
                success: function() {},
                fail: function() {}
            });
        }, a.prototype.hideLoading = function() {
            this.weixinSdk.hideLoading({
                success: function() {},
                fail: function() {}
            });
        }, a.prototype.navigateToMiniProgram = function(t) {
            this.weixinSdk.navigateToMiniProgram(t);
        }, a.prototype.showModal = function(t, e, i, s, o, n) {
            wx.showModal({
                title: t,
                content: e,
                showCancel: i,
                cancelText: s,
                confirmText: o,
                success: function() {
                    n();
                },
                fail: function() {}
            });
        }, a.prototype.showToast = function(t) {
            wx.showToast({
                title: t,
                icon: null,
                image: "res/toast.png",
                success: function() {},
                fail: function() {},
                complete: function() {}
            });
        }, a.prototype.exitMiniProgram = function() {
            wx.exitMiniProgram({
                success: function() {},
                fail: function() {}
            });
        }, a.prototype.createClubButton = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            if (this.checkSDKVersion("2.0.3") && !this.clubButton) {
                var e = t ? t.x : 20, i = t ? t.y : 80, s = t ? t.width : 36, o = t ? t.height : 36;
                this.clubButton = wx.createGameClubButton({
                    type: "text",
                    text: "   ",
                    style: {
                        left: e,
                        top: i,
                        width: s,
                        height: o,
                        lineHeight: 16,
                        backgroundColor: "#ffffff01",
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: 12,
                        borderRadius: 0
                    }
                }), this.clubButton.onTap(function(t) {
                    console.log(t);
                }), this.hideClubButton();
            }
        }, a.prototype.showClubButton = function() {
            this.clubButton && this.clubButton.show();
        }, a.prototype.hideClubButton = function() {
            this.clubButton && this.clubButton.hide();
        }, a.prototype.checkSDKVersion = function(t) {
            var e = wx.getSystemInfoSync(), i = (e && e.SDKVersion ? e.SDKVersion : "0.0.0").split("."), s = t.split(".");
            return console.log("verArray", i, "target", s), Number(i[0]) > Number(s[0]) || !(Number(i[0]) < Number(s[0])) && (Number(i[1]) > Number(s[1]) || !(Number(i[1]) < Number(s[1])) && Number(i[2]) >= Number(s[2]));
        }, a.prototype.createFeedButton = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            if (this.checkSDKVersion("2.1.2") && !this.feedButton) {
                var e = t ? t.x : 20, i = t ? t.y : 80, s = t ? t.width : 36, o = t ? t.height : 36;
                this.feedButton = wx.createFeedbackButton({
                    type: "text",
                    text: "   ",
                    style: {
                        left: e,
                        top: i,
                        width: s,
                        height: o,
                        lineHeight: 16,
                        backgroundColor: "#ffffff01",
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: 12,
                        borderRadius: 0
                    }
                });
            }
        }, a.prototype.showFeedButton = function() {
            this.feedButton && this.feedButton.show();
        }, a.prototype.hideFeedButton = function() {
            this.feedButton && this.feedButton.hide();
        }, a.prototype.checkWeixinVersion = function() {
            var t = this;
            t.checkSDKVersion("2.0.1") || t.showModal("警告", "当前微信版本过低，请升级后再重进游戏！", !1, "", "确定", function() {
                t.exitMiniProgram();
            });
        }, a.prototype.reconnection = function(t) {
            this.showModal("提示", "连接服务器失败，请检查网络信号！", !1, "", "确定", t);
        }, a.prototype.vibrateShort = function(t) {
            wx.vibrateShort && wx.vibrateShort({
                success: function(e) {
                    t && t(e);
                },
                fail: function(e) {
                    t && t(e);
                },
                complete: function(e) {
                    t && t(e);
                }
            });
        }, a.prototype.vibrateLong = function(t) {
            wx.vibrateLong && wx.vibrateLong({
                success: function(t) {},
                fail: function(t) {},
                complete: function(e) {
                    t && t(e);
                }
            });
        }, e.exports = {
            WeixinSdkManager: a
        }, cc._RF.pop();
    }, {
        "./AldSdk": "AldSdk",
        "./OtherLogin": "OtherLogin",
        "./WeiXinSdk": "WeiXinSdk"
    } ],
    WiPaiMiniItem: [ function(t, e, i) {
        cc._RF.push(e, "93143gIK3pFq7CrHThbWuZG", "WiPaiMiniItem"), cc.Class({
            extends: cc.Component,
            properties: {
                icon: cc.Node,
                iconName: cc.Label,
                red: cc.Node
            },
            onLoad: function() {},
            start: function() {},
            setData: function(t) {
                var e = this;
                this.data = t, this.icon.getComponent(cc.Sprite).spriteFrame = null, this.data && (this.iconName.string = this.data.spread_name, 
                this.red.active = this.data.corner_flag >= 1, cc.loader.load({
                    url: this.data.icon_imgurl,
                    type: "png"
                }, function(t, i) {
                    if (i) {
                        var s = new cc.SpriteFrame(i);
                        e.icon.spriteFrame = s, e.icon.getComponent(cc.Sprite).spriteFrame = s, e.node.active = !0;
                    }
                }));
            },
            registerMiniCallBack: function(t, e) {
                t && (this.miniCompleteCallBack = t), e && (this.miniStopCallBack = e);
            },
            clickMinProgram: function() {
                if (isWeiXin) {
                    var t = this;
                    if (this.checkSDKVersion("2.2.0")) {
                        if (!this.data) return;
                        this.miniStopCallBack && this.miniStopCallBack();
                        var e = this.data;
                        ss.logic.weiPai.reportEvent(e, ss.enum.weiPai.ReportEventType.click), wx.navigateToMiniProgram({
                            appId: e.app_id,
                            path: e.path,
                            extraData: {
                                wepie_crossads: e
                            },
                            envVersion: "release",
                            success: function(t) {
                                console.log("navigateToMiniProgram ok:", e), e && ss.logic.weiPai.reportEvent(e, ss.enum.weiPai.ReportEventType.jump);
                            },
                            complete: function(e) {
                                console.log("navigateToMiniProgram complete"), t.miniCompleteCallBack && t.miniCompleteCallBack();
                            }
                        });
                    }
                }
            },
            checkSDKVersion: function(t) {
                var e = wx.getSystemInfoSync(), i = (e && e.SDKVersion ? e.SDKVersion : "0.0.0").split("."), s = t.split(".");
                return Number(i[0]) > Number(s[0]) || !(Number(i[0]) < Number(s[0])) && (Number(i[1]) > Number(s[1]) || !(Number(i[1]) < Number(s[1])) && Number(i[2]) >= Number(s[2]));
            }
        }), cc._RF.pop();
    }, {} ]
}