var s = require("../weixin/Advertising"), o = require("../weixin/Leaderboard"), n = require("../weixin/WeixinSdkManager"), a = function() {
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
}, a.prototype.clear = function() {}, module.exports = {
	PlatformManager: a
}