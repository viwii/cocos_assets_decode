
var /*s = t("./WeiXinSdk"), o = t("./OtherLogin"), n = t("./AldSdk"),*/ a = function() {
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
}, module.exports = {
	WeixinSdkManager: a
} 