 cc.Class({
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
        this.views[ss.enum.view.goods] = this.goodsViewNode.getComponent("GoodsView"), 
        this.views[ss.enum.view.open] = this.openViewNode.getComponent("OpenView"),
        this.views[ss.enum.view.daily] = this.dailyViewNode.getComponent("DailyView");
        // this.views[ss.enum.view.invite] = this.inviteViewNode.getComponent("InviteView"), 
        // this.views[ss.enum.view.lottery] = this.lotteryViewNode.getComponent("LotteryView"), 
        // this.views[ss.enum.view.test] = this.testViewNode.getComponent("TestView"), this.views[ss.enum.view.revive] = this.reviveViewNode.getComponent("ReviveView"), 
        // this.views[ss.enum.view.result] = this.resultViewNode.getComponent("ResultView"), 
        // this.views[ss.enum.view.sets] = this.setsViewNode.getComponent("SetsView"), this.views[ss.enum.view.rank] = this.rankViewNode.getComponent("RankView"), 
        // this.views[ss.enum.view.educe] = this.educeViewNode.getComponent("EduceView"), this.views[ss.enum.view.strong] = this.strongViewNode.getComponent("StrongView"), 
        //  this.views[ss.enum.view.dan] = this.danViewNode.getComponent("DanView");
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
})