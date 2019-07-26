
var s = require("../custom/service/const/ShareConst"), o = function() {
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
}, module.exports = {
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
}