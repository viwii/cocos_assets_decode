 cc.Class({
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
}) 