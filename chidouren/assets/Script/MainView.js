 cc.Class({
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
        this.menu = this.menuNode.getComponent("Menu"); 
        //this.miniProgram = this.miniProgramNode.getComponent("WeiPaiMiniProgram"), 
        //this.moreGame = this.moreGameNode.getComponent("MoreGame");
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
        this.node.active = !1, ss.logic.open.hideClubButton(), ss.logic.open.hideFeedButton(); 
        //this._hideMoreGame();
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
        ss.Resize.isPad && ((t = this.skinNode.getComponent(cc.Widget)).left = 10, t.updateAlignment() 
        //(t = this.miniProgramNode.getComponent(cc.Widget)).left = 30, t.updateAlignment(), 
        //(t = this.moreGameNode.getComponent(cc.Widget)).left = 20, t.updateAlignment()
        );
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
}) 