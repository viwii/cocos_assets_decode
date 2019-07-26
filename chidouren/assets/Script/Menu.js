 cc.Class({
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
}) 