var s = require("./bulubulu/Viewing"); 
var o = function() {
    this.viewing = new s.Viewing(), 
    this.pacmans = new ss.NodePool(), 
    this.ghosts = new ss.NodePool(), 
    this.peas = new ss.NodePool(), 
    this.radars = new ss.NodePool(), 
    this.snows = new ss.NodePool(), 
    this.shadows = new ss.NodePool(), 
    this.uid = 0, 
    this.heroid = 0, 
    this.hero = null, 
    this.data = null, 
    this.map = null, 
    this._scaleValue = 0, 
    this._scaleXY = 0;
};
o.prototype.init = function(t) {
    this.data = t; 
    this.map = t.map; 
    this.viewing.init(t.viewing), 
    this.peas.initialize("Pea", t.pea.prefab, t.pea.parent); 
    this.peas.preview(t.pea.num);
    this.ghosts.initialize("Ghost", t.ghost.prefab, t.ghost.parent); 
    this.ghosts.preview(t.ghost.num);
    this.pacmans.initialize("Pacman", t.pacman.prefab, t.pacman.parent); 
    this.pacmans.preview(t.pacman.num);
    this.snows.initialize("Snow", t.snow.prefab, t.snow.parent); 
    this.snows.preview(t.snow.num);
    this.shadows.initialize("Shadow", t.shadow.prefab, t.shadow.parent); 
    this.shadows.preview(t.shadow.num);
}, 
o.prototype.createAll = function(t) {
    var e, i;
    this.viewing.reset();
    var s = 0, o = t.pea.data;
    for (var n in o) for (i = o[n], e = 0; e < i; e++) this.createPea(ss.enum.gameEgg[n]), 
    s++;
    for (i = Math.max(t.pea.num - s, 0), e = 0; e < i; e++) this.createPea(ss.enum.gameEgg.normal);
    for (i = t.ghost.length, e = 0; e < i; e++) this.createGhost(t.ghost[e]);
    for (this.createHero(t.pacman[0]), i = Math.max(0, t.pacman.length), e = 1; e < i; e++) this.createPacman(t.pacman[e]);
}, 
o.prototype.clearAll = function() {
    this.pacmans.removeAll(), this.ghosts.removeAll(), this.peas.removeAll(), this.snows.removeAll(), 
    this.shadows.removeAll(), this.viewing.clear(), this.uid = 0, this.hero = null, 
    this._scaleValue = 0, this._scaleXY = 1;
}, 
o.prototype.getScaleXY = function() {
    return this._scaleXY;
}, 
o.prototype.getRandOutSideCell = function() {
    return this.viewing.getRandOutsideCell();
}, 
o.prototype.addUnit = function(t, e, i) {
    this.viewing.addUnit(t, e, i);
}, 
o.prototype.removeUnit = function(t) {
    this.viewing.removeUnit(t);
}, 
o.prototype.createHero = function(t) {
    var e = {};
    e.id = this.heroid, e.pos = cc.v2(), e.gid = this.viewing.getCellIdLocal(e.pos), 
    e.type = ss.enum.roleType.superman, e.camp = t.camp, e.sid = t.sid, e.mid = t.mid, 
    e.name = t.name, this.pacmans.create(e, null, !0), this.hero = this.pacmans.getComp(this.heroid);
}, 
o.prototype.createPacman = function(t) {
    var e = {};
    e.id = ++this.uid, e.pos = null, e.gid = Math.random() < .2 ? this.viewing.getRandInnerId() : this.viewing.getRandOutsideId(), 
    e.type = ss.enum.roleType.pacman, e.camp = t.camp, e.sid = t.sid, e.mid = t.mid, 
    e.name = t.name, this.pacmans.create(e, null, !0);
}, 
o.prototype.createGhost = function(t) {
    var e = {};
    e.id = ++this.uid, e.gid = this.viewing.getRandInnerId(), e.type = ss.enum.roleType.ghost, 
    e.camp = ss.enum.gameCamp.normal, e.sid = t.sid, e.mid = t.mid, this.ghosts.create(e, null, !0);
}, 
o.prototype.createPea = function(t) {
    var e = {};
    e.id = ++this.uid; 
    e.gid = this.viewing.getRandInnerId(); 
    e.type = ss.enum.roleType.pea; 
    e.camp = ss.enum.gameCamp.normal; 
    e.sid = 0;
    e.egg = t; 
    this.peas.create(e, null, !0);
}, 
o.prototype.createRadar = function(t) {}, 
o.prototype.createSnow = function(t) {
    var e = {};
    e.id = ++this.uid, e.target = t.target, e.parent = t.parent, e.word = t.word, e.v2 = t.v2, 
    e.index = t.index, this.snows.create(e, null, !1);
}, 
o.prototype.createShadow = function(t) {
    var e = {};
    e.id = ++this.uid, e.target = t.target, e.pos = t.pos, e.size = t.size, e.rotation = t.rotation, 
    e.scaleX = t.scaleX, e.scaleY = t.scaleY, e.mid = t.mid, this.shadows.create(e, null, !1);
}, 
o.prototype.recoverHero = function(t) {
    this.heroid == t && (this.hero = null, this.pacmans.recover(t, !0));
}, 
o.prototype.recoverPacman = function(t) {
    this.pacmans.recover(t, !0);
}, 
o.prototype.recoverGhost = function(t) {
    this.ghosts.recover(t, !0);
}, 
o.prototype.recoverPea = function(t) {
    this.peas.recover(t, !0);
}, 
o.prototype.recoverRadar = function(t) {}, o.prototype.recoverSnow = function(t) {
    this.snows.recover(t, !0);
}, 
o.prototype.recoverShadow = function(t) {
    this.shadows.recover(t, !0);
}, 
o.prototype.reviveHero = function(t) {
    this.viewing.reset();
    var e = t;
    e.id = this.heroid, e.pos = cc.v2(), e.gid = this.viewing.getCellIdLocal(e.pos), 
    this.pacmans.create(e, null, !0), this.hero = this.pacmans.getComp(this.heroid);
}, 
o.prototype.revivePacman = function(t) {
    var e = t;
    e.pos = null, e.gid = this.viewing.getRandOutsideId(), this.pacmans.create(e, null, !0);
}, 
o.prototype.reviveGhost = function(t) {
    var e = t;
    e.gid = this.viewing.getRandOutsideId(), this.ghosts.create(e, null, !0);
}, 
o.prototype.revivePea = function(t) {
    var e = t;
    e.gid = this.viewing.getRandInnerId(), this.peas.create(e, null, !0);
}, 
o.prototype.reviveAll = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    this.pacmans.callMethod("revive", t);
}, 
o.prototype.removeTargetShadow = function(t) {
    this.shadows.callMethod("removeTarget", t);
}, 
o.prototype.removeTargetSnow = function(t) {
    this.snows.callMethod("removeTarget", t);
}, 
o.prototype.lookAt = function(t) {
    this.viewing.move(t);
}, 
o.prototype.shootAt = function() {
    if (this.hero) {
        var t = this.hero.node.getPosition();
        t.x *= -1, t.y *= -1, this.viewing.moveViewPort(t);
    }
}, 
o.prototype.scaleXY = function(t) {
    if (ss.logic.game.isSystemBetter() && !(this._scaleValue >= t)) {
        this._scaleValue = t;
        var e = 1;
        t >= 192 && (e = .85), this._scaleXY != e && (console.log("scaleXY:", e), this._scaleXY = e, 
        this.viewing.scaleXY(e));
    }
}, 
o.prototype.move = function(t) {
    this.hero && this.hero.move(t);
}, 
o.prototype.addSpeed = function() {
    this.hero && this.hero.addSpeed();
}, 
o.prototype.moveRadar = function(t) {}; 

module.exports = {
    Bulu: o
}