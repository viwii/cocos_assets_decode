
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
}, module.exports = {
	WeiPaiLogic: o
}