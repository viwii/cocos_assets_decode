
var s = function() {};
module.exports = {
    ServerManager: s
}, s.prototype.initialize = function() {}, s.prototype.startup = function() {
    cc.systemEvent.emit(ss.event.cmd.GameInit), cc.systemEvent.emit(ss.event.cmd.UserData), 
    cc.systemEvent.emit(ss.event.cmd.GameData);
}, s.prototype.clear = function() {}, s.prototype.execute = function(t) {
    var e = t.data;
    switch (t.type) {
      case ss.event.protocol.ReqGamePlay:
        this.reqGamePlay(e);
        break;

      case ss.event.protocol.ReqGameOver:
        this.reqGameOver(e);
        break;

      case ss.event.protocol.ReqAddMoney:
        this.reqAddMoney(e);
        break;

      case ss.event.protocol.ReqUpdateSign:
        this.reqUpdateSign(e);
        break;

      case ss.event.protocol.ReqSetMisc:
        this.reqSetMisc(e);
        break;

      case ss.event.protocol.ReqSetGoods:
        this.reqSetGoods(e);
        break;

      case ss.event.protocol.ReqAddScore:
        this.reqAddScore(e);
    }
}, s.prototype.reqGamePlay = function(t) {
    cc.systemEvent.emit(ss.event.cmd.GamePlay, t);
}, s.prototype.reqGameOver = function(t) {
    cc.systemEvent.emit(ss.event.cmd.GameOver, t);
}, s.prototype.reqAddMoney = function(t) {
    ss.data.addMoney(t.moneyType, t.money), cc.systemEvent.emit(ss.event.cmd.AddMoney, t);
}, s.prototype.reqUpdateSign = function(t) {}, s.prototype.reqSetMisc = function(t) {
    ss.data.setMisc(t), cc.systemEvent.emit(ss.event.cmd.SetMisc, t);
}, s.prototype.reqSetGoods = function(t) {
    switch (t.method) {
      case ss.enum.goodsMethod.add:
        ss.data.addGoods(t.item);
        break;

      case ss.enum.goodsMethod.remove:
        ss.data.removeGoods(t.item.id);
        break;

      case ss.enum.goodsMethod.use:
        ss.data.useGoods(t.item);
    }
    cc.systemEvent.emit(ss.event.cmd.SetGoods, t);
}, s.prototype.reqAddScore = function(t) {
    ss.data.addScore(t), cc.systemEvent.emit(ss.event.cmd.AddScore, t);
}