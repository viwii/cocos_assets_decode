var s = function() {};
s.prototype.initialize = function() {
    cc.systemEvent.on(ss.event.cmd.GameInit, this.gameInit, this); 
    cc.systemEvent.on(ss.event.cmd.UserData, this.userData, this); 
    cc.systemEvent.on(ss.event.cmd.GameData, this.gameData, this); 
    cc.systemEvent.on(ss.event.cmd.GamePlay, this.gamePlay, this); 
    cc.systemEvent.on(ss.event.cmd.GameOver, this.gameOver, this); 
    cc.systemEvent.on(ss.event.cmd.AddMoney, this.addMoney, this); 
    cc.systemEvent.on(ss.event.cmd.SetMisc, this.setMisc, this); 
    cc.systemEvent.on(ss.event.cmd.SetGoods, this.setGoods, this); 
    cc.systemEvent.on(ss.event.cmd.AddScore, this.addScore, this);
}, 
s.prototype.clear = function() {}, s.prototype.startup = function() {
    var t = ss.platform.getOpenFunc(), e = t && t.share ? t.share : ss.config.shareConf;
    cc.systemEvent.emit(ss.event.client.openFunc, t), ss.custom.initShare(e, ss.proxy.share), 
    ss.logic.open.setAppMessage();
    var i = ss.enum.storage;
    ss.custom.initStorage(function() {
        var t = {};
        for (var e in i) t[i[e]] = ss.custom.getStorage(i[e]);
        ss.data.startup(t), ss.mask.startup(t), ss.server.startup();
    }, null, 1e4, i);
}, 
s.prototype.gameInit = function(t) {
    ss.state.onInit(), cc.systemEvent.emit(ss.event.system.GameInit);
}, 
s.prototype.userData = function(t) {
    var e = {};
    e.userInfo = ss.proxy.userInfo, cc.systemEvent.emit(ss.event.system.UserData, e);
}, 
s.prototype.gameData = function(t) {
    ss.state.onPrev(), cc.systemEvent.emit(ss.event.system.GameData, {});
}, 
s.prototype.gamePlay = function(t) {
    var e = t;
    ss.state.onPlay(), cc.systemEvent.emit(ss.event.system.GamePlay, e);
}, 
s.prototype.gameOver = function(t) {
    var e = t;
    ss.state.onOver(), cc.systemEvent.emit(ss.event.system.GameOver, e);
}, 
s.prototype.addMoney = function(t) {
    var e = t;
    ss.logic.storage.saveUnit(e.isStorage), cc.systemEvent.emit(ss.event.client.addMoney, e);
}, 
s.prototype.setMisc = function(t) {
    ss.custom.setStorage(ss.enum.storage.misc, ss.data.misc);
}, 
s.prototype.setGoods = function(t) {
    var e = t;
    ss.logic.storage.saveGoods(), cc.systemEvent.emit(ss.event.client.setGoods, e);
}, 
s.prototype.addScore = function(t) {
    ss.logic.storage.saveUnit();
    var e = ss.data.getScore();
    ss.logic.open.setUserCloud(e);
};


module.exports = {
    CommandManager: s
}