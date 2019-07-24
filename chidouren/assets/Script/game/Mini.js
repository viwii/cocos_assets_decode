var s = function() {
    this.data = null, this.rank = null, this.buff = null, this.killLab = null, this.signLab = null, 
    this.diedLab = null, this.timeLab = null, this.surviveNode = null, this.surviveLab = null, 
    this.timeNum = 0, this.heroGrow = 0, this.grows = new ss.Dictionary(), this.playing = !1, 
    this.rTimestamps = 0, this.tTimestamps = 0;
};
s.prototype.init = function(t) {
    this.data = t, this.rank = t.rankNode.getComponent("MiniRank"), this.buff = t.buffNode.getComponent("MiniBuff"), 
    this.killLab = t.killLab, this.diedLab = t.diedLab, this.signLab = t.signLab, this.timeLab = t.timeLab, 
    this.timeNum = t.gameTime, this.surviveNode = t.surviveNode, this.surviveLab = t.surviveLab, 
    this.grows.clear(), this.killLab.node.on(cc.Node.EventType.SIZE_CHANGED, this._layoutKill, this), 
    this.diedLab.node.on(cc.Node.EventType.SIZE_CHANGED, this._layoutKill, this);
}, 
s.prototype.clear = function() {
    this.playing = !1, this.rTimestamps = 0, this.tTimestamps = 0, this.timeNum = 0, 
    this.buff.clear();
}, 
s.prototype.reset = function() {
    this.grows.clear();
}, 
s.prototype.play = function(t) {
    switch (this.heroGrow = 0, this.playing = !0, this.killLab.string = "0", this.diedLab.string = "0", 
    this._layoutKill(), this.timeNum = this.data.gameTime, t) {
      case ss.enum.gameMode.solo:
        this.timeLab.node.active = !0, this.timeLab.string = this._toTimeString(this.timeNum), 
        this.rank.node.active = !0, this.rank.show(), this._rankSetData(), this.buff.setVisible(!1), 
        this.surviveNode.active = !1;
        break;

      case ss.enum.gameMode.forever:
        this.timeLab.node.active = !1, this.rank.node.active = !1, this.buff.init(null), 
        this.surviveNode.active = !0;
    }
}, 
s.prototype.stop = function() {
    this.playing = !1;
}, 
s.prototype.setKillData = function(t) {
    this.killLab.string = "" + t.kill, this.diedLab.string = "" + t.died, this._layoutKill();
}, 
s.prototype.initGrowData = function(t) {
    this.grows.set(t.id, t);
}, 
s.prototype.setGrowData = function(t, e) {
    var i = this.grows.get(t);
    i && (i.grow = e, this.grows.set(t, i), t == ss.logic.game.bulu.heroid && (this.heroGrow = e));
}, 
s.prototype.getGrowData = function(t) {
    return this.grows.get(t);
}, 
s.prototype.setBuffData = function(t) {
    this.buff && this.buff.setData(t);
},
s.prototype.resetBuffData = function() {
    this.buff && this.buff.reset();
}, 
s.prototype.setSurviveData = function(t) {
    this.surviveLab && (this.surviveLab.string = "" + t);
}, 
s.prototype.update = function(t) {
    this.playing && (this.timeLab && this.timeLab.node.active && (this.tTimestamps += t, 
    this.tTimestamps >= 1 && (this.tTimestamps = 0, this._timeCountDown())), this.rank && this.rank.node.active && (this.rTimestamps += t, 
    this.rTimestamps >= 2 && (this.rTimestamps = 0, this._rankSetData())));
}, 
s.prototype._toTimeString = function(t) {
    var e = t / 60 >> 0, i = t % 60 >> 0;
    return (e = e < 10 ? "0" + e : "" + e) + ":" + (i = i < 10 ? "0" + i : "" + i);
}, 
s.prototype._timeCountDown = function() {
    if (this.timeLab.node.active && (this.timeNum--, this.timeLab.string = this._toTimeString(Math.max(this.timeNum, 0)), 
    this.timeNum <= 0)) {
        this.playing = !1, console.log("时间结束，请求结算");
        var t = this._rankSetData(), e = this.grows.get(ss.logic.game.bulu.heroid);
        ss.logic.game.callOver(!0, t, e, ss.logic.game.getKillData(), ss.logic.game.getScoreData(e, t));
    }
}, 
s.prototype._rankSetData = function() {
    var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], e = this.grows.values.slice();
    e.sort(function(t, e) {
        return t.grow > e.grow ? -1 : t.grow < e.grow ? 1 : 0;
    });
    for (var i, s = [], o = 0, n = e.length; o < n; o++) (i = e[o]).index = o, i.isColor = i.id == ss.logic.game.bulu.heroid, 
    this.grows.set(i.id, i), s.push(i);
    var a = {
        items: s
    };
    return t && this.rank.setData(a), a;
}, 
s.prototype._layoutKill = function() {
    this.signLab.node.x = this.killLab.node.x + this.killLab.node.width + this.signLab.node.width / 2, 
    this.diedLab.node.x = this.signLab.node.x + this.signLab.node.width / 2;
}; 

module.exports = {
    Mini: s
}