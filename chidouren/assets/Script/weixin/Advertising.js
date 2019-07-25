
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
}, a.prototype.hide = function() {}, a.prototype.destory = function() {}, module.exports = {
	Advertising: s,
	AdvertisingVo: function(t, e, i) {
		var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
		this.type = t, this.mode = e, this.style = s, this.adUnitId = i, this.cb = o;
	}
}