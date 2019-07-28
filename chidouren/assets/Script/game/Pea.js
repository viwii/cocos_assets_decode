var s = require("./bulubulu/Unit"); 
var o = require("./galagala/SmartC");
cc.Class({
    extends: cc.Component,
    properties: {
        spriteFrames: [ cc.SpriteFrame ]
    },
    ctor: function() {
        this.data = null; 
        this.params = null; 
        this.playing = false; 
        this.locking = false; 
        this.dieding = false; 
        this.colliders = {}; 
        this.unit = new s.Unit(this); 
        this.smart = new o.SmartC(this); 
        this._bornTag = 1; 
        this._growTag = 2; 
        this._diedTag = 3; 
        this._growLength = 0; 
        this._bodyLength = 0;
        this._viewLength = 0;
    },
    onLoad: function() {
        var t = this.getComponents(cc.CircleCollider);
        if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && (e.abc = this, this.colliders[e.tag] = e, 
        e.onDisable = function() {}, e.onEnable = function() {});
    },
    start: function() {},
    update: function(t) {},
    getAllLiving: function() {
        return this.data && !this.dieding;
    },
    getGrow: function() {
        return this._growLength;
    },
    getEffect: function() {
        if (this.data) switch (this.data.egg) {
            case ss.enum.gameEgg.normal:
            return !1;

            case ss.enum.gameEgg.cherry:
            return !0;

            case ss.enum.gameEgg.chocolate:
            return !1;

            case ss.enum.gameEgg.sweet:
            return !0;

            case ss.enum.gameEgg.shit:
            return !1;
        }
        return !1;
    },
    getEgg: function() {
        return this.data ? this.data.egg : 0;
    },
    setLocking: function(t) {
        this.locking = t, this.smart.setLocking(t);
    },
    isCanAttract: function() {
        if (!this.data) return !1;
        switch (this.data.egg) {
            case ss.enum.gameEgg.shit:
            return !1;
        }
        return !0;
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
        this.data = t, this.params = e; 
        this.unit.init({
            id: this.data.id
        });
        ss.logic.game.bulu.addUnit(this.data.id, this.data.gid, this.unit); 
        this.smart.init({
            id: this.data.id,
            sid: this.data.sid,
            type: this.data.type,
            camp: this.data.camp
        }); 
        ss.logic.game.gala.addSmart(this.data.id, this.smart);
        var i = this.unit.cell.getRandV2();
        this.node.setPosition(i), this.unit.move(i), this.smart.move(i);
        var s = 12, o = 0, n = t.egg;
        switch (this.node.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[n], n) {
            case ss.enum.gameEgg.normal:
            this.node.zIndex = 0, this.node.color = cc.Color.WHITE, this.node.setContentSize(32, 32), 
            o = 32;
            break;

            case ss.enum.gameEgg.cherry:
            s = 50, this.node.zIndex = 0, this.node.color = cc.Color.MAGENTA, this.node.setContentSize(32, 32), 
            o = 32;
            break;

            case ss.enum.gameEgg.chocolate:
            case ss.enum.gameEgg.sweet:
            case ss.enum.gameEgg.shit:
            case ss.enum.gameEgg.love:
            this.node.zIndex = 1, this.node.color = cc.Color.WHITE, this.node.setContentSize(64, 64), 
            o = 32;
        }
        this._setGrowLength(s), this._setBodyLength(o), this._setViewLength(32), ss.ferrari.juggler.add(this), 
        this.addCollider();
    },
    play: function() {
        if (this.playing = !0, this.node.stopActionByTag(this._bornTag), this.node.active) {
            this.node.setScale(.5);
            var t = cc.scaleTo(.3, 1);
            t.setTag(this._bornTag), this.node.runAction(t);
        }
    },
    advanceFrame: function(t, e) {
        this.playing && (this.locking || this.smart.update(t));
    },
    move: function(t) {
        this.playing;
    },
    toBeKill: function() {
        this.data && (this.setLocking(!0), this.dieding = !0, ss.logic.game.recover(this.data, !0));
    },
    reset: function() {
        this.setLocking(!1);
    },
    clear: function() {
        this.data && (ss.logic.game.bulu.removeUnit(this.data.id), ss.logic.game.gala.removeSmart(this.data.id)), 
        this.data = null, this.params = null, this.playing = !1, this.locking = !1, this.dieding = !1, 
        this.node.opacity = 255, this.node.setScale(1), this.node.stopAllActions(), this._growLength = 0, 
        this._bodyLength = 0, this._viewLength = 0, ss.ferrari.juggler.remove(this), this.removeCollider();
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
    onJudgeDied: function() {
        this.data && this.toBeKill();
    },
    onAttractDied: function(t) {
        var e = this;
        if (this.data && !this.locking && !this.dieding) if (this.node.active && t.isEffect) {
            var i = this.node.getPosition(), s = t.v2, o = Math.sqrt(Math.pow(s.x - i.x, 2) + Math.pow(s.y - i.y, 2));
            this.setLocking(!0), this.dieding = !0;
            var n = .25, a = .15;
            o >= 120 ? (n = .35, a = .2) : o <= 40 && (n = .15, a = .1), this.node.stopActionByTag(this._diedTag);
            var r = cc.sequence(cc.spawn(cc.fadeTo(a, 0), cc.moveTo(n, s)), cc.callFunc(function() {
                e.data && ss.logic.game.recover(e.data, !0);
            }));
            r.setTag(this._diedTag), this.node.runAction(r);
        } else this.toBeKill();
    },
    onCollisionEnter: function(t, e) {},
    onCollisionStay: function(t, e) {},
    onCollisionExit: function(t, e) {},
    _setGrowLength: function(t) {
        this._growLength = t;
        var e = Math.floor(t);
        this.smart.setGrowLength(e), this.data.grow = t;
    },
    _setBodyLength: function(t) {
        this._bodyLength = t, this.smart.setBodyLength(t);
        var e = this.colliders[ss.enum.tag.body];
        e && (e.radius = t);
    },
    _setViewLength: function(t) {
        this._viewLength = this._bodyLength + t, this.smart.setViewLength(this._viewLength);
        var e = this.colliders[ss.enum.tag.view];
        e && (e.radius = this._viewLength);
    }
}) 