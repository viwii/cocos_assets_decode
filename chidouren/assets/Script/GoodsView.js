 cc.Class({
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
        // this.popUp = this.node.getComponent("PopUp"), this.menu = this.menuNode.getComponent("Menu"), 
        // this.list = this.listNode.getComponent("ListComponent"), this.model = this.modelNode.getComponent("Model"), 
        // this.data = null, this.currId = 0;
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
})