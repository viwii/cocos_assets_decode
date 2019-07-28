
var s = require("./bulubulu/Unit"), o = require("./galagala/SmartB"), n = require("./Quick");
cc.Class({
    extends: cc.Component,
    properties: {},
    ctor: function() {
        this.data = null, this.params = null, this.playing = !1, this.locking = !1, this.dieding = !1, 
        this.colliders = {}, this.unit = new s.Unit(this), this.smart = new o.SmartB(this), 
        this.quick = new n.Quick(this), this._baseSpeed = 0, this._addSpeed = 0, this._angle = 0;
    },
    onLoad: function() {
        var t = this.getComponents(cc.CircleCollider);
        if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && (e.abc = this, this.colliders[e.tag] = e, 
        e.onDisable = function() {}, e.onEnable = function() {});
    },
    start: function() {},
    update: function(t) {},
    getAllSpeed: function() {
        return this._baseSpeed + this._addSpeed;
    },
    getAllLiving: function() {
        return this.data && !this.dieding;
    },
    setLocking: function(t) {
        this.locking = t, this.smart.setLocking(t);
    },
    addCollider: function() {
        var t = this.getComponents(cc.CircleCollider);
        if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && cc.director.getCollisionManager().addCollider(e);
    },
    removeCollider: function() {
        var t = this.getComponents(cc.CircleCollider);
        if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && cc.director.getCollisionManager().removeCollider(e);
    },
    preview: function(t) {},
    init: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        this.data = t, this.params = e, this.unit.init({
            id: this.data.id
        }), ss.logic.game.bulu.addUnit(this.data.id, this.data.gid, this.unit), this.smart.init({
            id: this.data.id,
            sid: this.data.sid,
            type: this.data.type,
            camp: this.data.camp
        }), ss.logic.game.gala.addSmart(this.data.id, this.smart);
        var i = this.unit.cell.getRandV2();
        this.node.setPosition(i), this.node.zIndex = 2, this.unit.move(i), this.smart.move(i), 
        this._baseSpeed = 2;
        var s = ss.config.smart[t.sid];
        this._setBodyLength(s.bodyLength), this._setViewLength(s.viewLength), this.quick.setData({
            max: 4,
            up: .2,
            duration: 300,
            down: .6
        }), ss.ferrari.juggler.add(this), this.addCollider();
    },
    play: function() {
        this.playing = !0, this.quick.play(), this.smart.play();
    },
    advanceFrame: function(t, e) {
        this.playing && (this.locking || (this._playByEar(), this.quick.update(t), this.smart.update(t)));
    },
    move: function(t) {
        if (this.playing && this.data) {
            var e = t.angle;
            this._angle != e && (this._angle = e);
        }
    },
    addSpeed: function() {
        this.playing && this.quick.addSpeed();
    },
    toBeKill: function() {
        this.data && (this.setLocking(!0), this.dieding = !0, ss.logic.game.recover(this.data, !0));
    },
    reset: function() {
        this.quick.clear(), this.setLocking(!1);
    },
    clear: function() {
        this.data && (ss.logic.game.bulu.removeUnit(this.data.id), ss.logic.game.gala.removeSmart(this.data.id)), 
        this.data = null, this.params = null, this.playing = !1, this.locking = !1, this._baseSpeed = 0, 
        this._addSpeed = 0, this._angle = 0, ss.ferrari.juggler.remove(this), this.removeCollider();
    },
    onUnitActive: function(t) {
        this.data && (this.node.active = t);
    },
    onUnitChange: function(t) {
        this.data && (this.data.gid = t);
    },
    onUnitDied: function() {
        this.data && this.toBeKill();
    },
    onQuickUpdate: function(t) {
        this.data && (this._addSpeed = t.speed);
    },
    onSmartAction: function(t) {
        this.data && (null != t.angle && this.move({
            angle: t.angle
        }), t.addSpeed && this.addSpeed());
    },
    onSmartDied: function() {
        this.toBeKill();
    },
    onJudgeDied: function() {
        this.toBeKill();
    },
    onCollisionEnter: function(t, e) {
        if (this.data && !this.dieding) {
            var i = t.abc;
            i && i.data && e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body && this.smart.addViewTarget(i.data.id);
        }
    },
    onCollisionExit: function(t, e) {
        if (this.data && !this.dieding) {
            var i = t.abc;
            i && i.data && e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body && this.smart.removeViewTarget(i.data.id);
        }
    },
    _playByEar: function() {
        if (this.data) {
            var t = this._angle, e = ss.logic.game.bulu.getScaleXY(), i = this.node.getPosition(), s = ss.dirUtils.allDirectionsMove(t, this.getAllSpeed() / e);
            i.addSelf(s), this.node.setPosition(i), this.unit.move(i), this.smart.move(i);
        }
    },
    _setBodyLength: function(t) {
        this.smart.setBodyLength(t);
        var e = this.colliders[ss.enum.tag.body];
        e && (e.radius = t);
    },
    _setViewLength: function(t) {
        this.smart.setViewLength(t);
        var e = this.colliders[ss.enum.tag.view];
        e && (e.radius = t);
    }
})