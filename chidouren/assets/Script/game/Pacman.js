var s = require("./bulubulu/Unit"), 
o = require("./galagala/SmartA"), 
n = require("./Quick"), 
a = require("./Bala");
cc.Class({
    extends: cc.Component,
    properties: {
        content: cc.Node,
        growLab: cc.Label,
        nameLab: cc.Label,
        mode: cc.Node,
        buff: cc.Node,
        glow: cc.Node,
        crown: cc.Node,
        ghost: cc.Node,
        eggs: cc.Node,
        egg_3: cc.Node,
        egg_4: cc.Node
    },
    ctor: function() {
        this.data = null; 
        this.params = null; 
        this.playing = false; 
        this.locking = false; 
        this.dieding = false; 
        this.borning = false; 
        this.growing = false; 
        this.isSuper = false; 
        this.isGhost = false; 
        this.isEgger = false; 
        this.sTimestamp = 0; 
        this.souls = []; 
        this.colliderTimestamp = 0; 
        this.colliderEnters = []; 
        this.colliderStays = []; 
        this.colliderExits = []; 
        this.colliders = {}; 
        this.unit = new s.Unit(this); 
        this.smart = new o.SmartA(this); 
        this.quick = new n.Quick(this); 
        this.bala = new a.Bala(this); 
        this._bornTag = 1; 
        this._growTag = 2; 
        this._diedTag = 3; 
        this._baseSpeed = 0; 
        this._addSpeed = 0; 
        this._angle = 0; 
        this._shadR = 0; 
        this._growR = 1; 
        this._bodyR = 2; 
        this._growLength = 0; 
        this._bodyLength = 0; 
        this._viewLength = 0; 
        this._attrLength = 0; 
        this._shadLength = 0; 
        this._snowLength = 0; 
        this._ghostLength = 35; 
        this._attrBala = 0; 
        this._speedBala = 1;
    },
    onLoad: function() {
        var t = this.getComponents(cc.CircleCollider);
        if (t) 
            for (var e, i = 0; i < t.length; i++) 
                (e = t[i]) && (
                    e.abc = this, 
                    this.colliders[e.tag] = e, 
                    e.onDisable = function() {}, 
                    e.onEnable = function() {}
                );
        this.nameLab.node.on(cc.Node.EventType.SIZE_CHANGED, this._nameSizeChange, this);
    },
    start: function() {},
    update: function(t) {},
    getAllSpeed: function() {
        return (this._baseSpeed + this._addSpeed) * this._speedBala;
    },
    getAllLiving: function() {
        return this.data && !this.dieding;
    },
    getAllBorning: function() {
        return this.data && !this.borning;
    },
    getAllGhosting: function() {
        return this.data && this.isGhost;
    },
    getGrow: function() {
        return this._growLength;
    },
    setLocking: function(t) {
        this.locking = t, this.smart.setLocking(t);
    },
    addCollider: function() {
        var t = this.getComponents(cc.CircleCollider);
        if (t) for (var e, i = 0; i < t.length; i++) 
        (e = t[i]) && cc.director.getCollisionManager().addCollider(e);
    },
    removeCollider: function() {
        var t = this.getComponents(cc.CircleCollider);
        if (t) for (var e, i = 0; i < t.length; i++) (e = t[i]) && cc.director.getCollisionManager().removeCollider(e);
    },
    preview: function(t) {},
    init: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        this.data = t, this.params = e, this.isSuper = t.type == ss.enum.roleType.superman, 
        this.unit.init({
            id: this.data.id
        }), ss.logic.game.bulu.addUnit(this.data.id, this.data.gid, this.unit), this.smart.init({
            id: this.data.id,
            sid: this.data.sid,
            type: this.data.type,
            camp: this.data.camp
        }), ss.logic.game.gala.addSmart(this.data.id, this.smart), this.bala.init({
            id: this.data.id
        });
        var i = t.pos || this.unit.cell.getRectV2();
        this.node.setPosition(i), this.node.zIndex = this.isSuper ? 4 : 3, this.unit.move(i), 
        this.smart.move(i), this.content.active = !0, this.content.opacity = 255, this.content.color = cc.Color.WHITE, 
        this.content.setScale(1), this.nameLab.string = this.data.name + "", this.nameLab.node.color = this.isSuper ? cc.Color.ORANGE : cc.Color.WHITE, 
        this.growLab.node.color = this.isSuper ? cc.Color.ORANGE : cc.Color.WHITE;
        var s = ss.logic.config.getSheetData(ss.enum.sheet.goods, t.mid), o = s && s.extend_id ? s.extend_id : 20001, n = ss.logic.config.getSheetData(ss.enum.sheet.mode, o), a = this.mode.getComponent(cc.Animation);
        n || (n = {
            skin: 0,
            item_id: 20001,
            speed: 4,
            attr: 48,
            addSpeed: 6,
            duration: 300
        });
        a.addClip(ss.logic.asset.getPacmanClip(n.skin), n.skin), 
        a.play(n.skin);
        var r = ss.config.smart[t.sid];
        this._growR = r.growR, this._baseSpeed = n.speed;
        var c = t.grow;
        c || (c = this.isSuper ? Math.floor((r.bodyLength + Math.floor(5 * Math.random())) / this._bodyR) : Math.floor((r.bodyLength + Math.floor(10 * Math.random() + 5)) / this._bodyR)), 
        this.isSuper ? this.isEgger = ss.logic.game.getEgging() : this.isEgger = Math.random() < .3, 
        this._setGrowLength(c), this._setBodyLength(c * this._bodyR), this._setViewLength(r.viewLength), 
        this._setAttrLength(n.attr), this._doLayout(), this.quick.setData({
            max: n.addSpeed,
            up: 1,
            duration: n.duration,
            down: 2
        }), ss.logic.game.mini.initGrowData({
            id: this.data.id,
            grow: c,
            camp: this.data.camp,
            name: this.data.name
        }), ss.ferrari.juggler.add(this), this.addCollider();
    },
    play: function() {
        var t = this;
        this.playing = !0, this.quick.play(), this.smart.play(), this.bala.play(), this._playByEar();
        var e = this.isSuper || this.node.active ? 4 : 2, i = 3 * this._bodyLength + 300;
        this.borning = !0, this.buff.active = !0, this.glow.active = this.isSuper, this.buff.setContentSize(i, i), 
        this.buff.stopActionByTag(this._bornTag);
        var s = cc.sequence(cc.repeat(cc.sequence(cc.fadeTo(.2, 100), cc.fadeTo(.2, 255)), e), cc.callFunc(function() {
            t.borning = !1, t.buff.active = !1, t.buff.opacity = 255, t.buff.stopActionByTag(t._bornTag);
        }));
        s.setTag(this._bornTag), this.buff.runAction(s);
    },
    advanceFrame: function(t, e) {
        this.playing && (this.locking || (this.quick.update(t), this.smart.update(t), this.bala.update(t), 
        this._playByEar(e), this._playByShadow(), this._playBySoul(t, !1)));
    },
    move: function(t) {
        if (this.playing && this.data) {
            var e = t.angle;
            this._angle != e && (this._angle = e, this.smart.setAngleLength(e));
        }
    },
    addSpeed: function() {
        this.playing && this.data && this.quick.addSpeed();
    },
    toBeGrow: function(t) {
        function e() {
            o._setGrowLength(n), o._setBodyLength(2 * n), o._setViewLength(o._viewLength), o._setAttrLength(o._attrLength), 
            o._doLayout();
        }
        var i = this;
        if (this.data && !this.dieding) {
            var s = this._playByKill(t);
            this.isSuper && (s.isEffect || (t.isEffect ? ss.logic.sound.bigEat() : ss.logic.sound.eat()));
            var o = this, n = Math.sqrt(this._growLength * this._growLength + t.grow * t.grow / this._growR);
            if (n += s.r, this.node.active && !this.growing && t.isEffect && this.content.active) {
                this.growing = !0, this.mode.stopActionByTag(this._growTag), this.mode.setScale(1);
                var a = cc.sequence(cc.scaleTo(.25, 1.2, 1.2), cc.callFunc(function() {
                    i.growing = !1, i.mode.stopActionByTag(i._growTag), i.mode.setScale(1), e();
                }));
                a.setTag(this._growTag), this.mode.runAction(a);
            } else e();
        }
    },
    toBeKill: function() {
        var t = this;
        if (this.data) if (this.isSuper && (ss.logic.sound.died(), ss.logic.open.vibrate(), 
        ss.logic.game.hutu.died()), this.setLocking(!0), this.dieding = !0, this.content.stopActionByTag(this._diedTag), 
        this.node.active && this.content.active) {
            var e = .5 * this.content.scaleX, i = .5 * this.content.scaleY, s = cc.sequence(cc.scaleTo(.25, e, i), cc.callFunc(function() {
                t.dieding = !1, t.content.stopActionByTag(t._diedTag), ss.logic.game.recover(t.data, !0, !1);
            }));
            s.setTag(this._diedTag), this.content.runAction(s);
        } else ss.logic.game.recover(this.data, !0, !0);
    },
    toBeEgg: function(t) {
        if (this.data && !this.dieding) {
            var e = t.egg || 0, i = ss.logic.config.getSheetData(ss.enum.sheet.buff, e);
            if (i) {
                var s = 0;
                switch (e) {
                    case ss.enum.gameEgg.chocolate:
                    var o = this.isEgger ? i.effect_add : i.effect;
                    s = i.time * o;
                    break;

                    default:
                    s = i.time;
                }
                this.bala.add(i.id, s);
            }
        }
    },
    toBeGhost: function() {
        this.data && (this.isGhost || (this.isGhost = !0, this.content.active = !1, this.ghost.active = !0, 
        this.smart.setIsGhost(!0)));
    },
    toBePacman: function() {
        this.data && this.isGhost && (this.isGhost = !1, this.ghost.active = !1, this.content.active = !0, 
        this.smart.setIsGhost(!1));
    },
    revive: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        this.data && (this.isSuper || ss.logic.game.recover(this.data, !0, t));
    },
    reset: function() {
        this.quick.clear(), this.setLocking(!1);
    },
    clear: function() {
        this.data && (ss.logic.game.bulu.removeUnit(this.data.id), ss.logic.game.gala.removeSmart(this.data.id), 
        ss.logic.game.bulu.removeTargetShadow(this.data.id), ss.logic.game.bulu.removeTargetSnow(this.data.id)), 
        this.isSuper && ss.logic.game.mini.resetBuffData(), this.quick.clear(), this.bala.clear(), 
        this.data = null, this.params = null, this.playing = !1, this.locking = !1, this.dieding = !1, 
        this.borning = !1, this.growing = !1, this.isSuper = !1, this.isGhost = !1, this.isEgger = !1, 
        this.sTimestamp = 0, this.souls.length = 0, this._shadR = 0, this._growR = 1, this._angle = 0, 
        this._baseSpeed = 0, this._addSpeed = 0, this._growLength = 0, this._bodyLength = 0, 
        this._viewLength = 0, this._shadLength = 0, this._snowLength = 0, this._attrBala = 0, 
        this._speedBala = 1, this.colliderTimestamp = 0, this.colliderEnters.length = 0, 
        this.colliderStays.length = 0, this.colliderExits.length = 0, this.node.active = !0, 
        this.content.stopAllActions(), this.content.opacity = 255, this.content.setScale(1), 
        this.mode.stopAllActions(), this.mode.opacity = 255, this.mode.setScale(1), this.ghost.stopAllActions(), 
        this.ghost.opacity = 255, this.ghost.active = !1, this.buff.stopAllActions(), this.buff.opacity = 255, 
        this.buff.active = !1, this.glow.active = !1, this.eggs.active = !1, this.egg_3.active = !1, 
        this.egg_4.active = !1, ss.ferrari.juggler.remove(this), this.removeCollider();
    },
    onUnitActive: function(t, e) {
        if (this.data) {
            if (!this.isSuper) if (t) {
                if (!this.node.active && !ss.logic.game.add(this.data.id)) return void this.revive(!0);
            } else ss.logic.game.sub(this.data.id), ss.logic.game.bulu.removeTargetShadow(this.data.id);
            this.node.active = t, t && this._playByAnagle();
        }
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
        this.data && this.toBeKill();
    },
    onSmartAttr: function(t) {
        this.data && (this.locking || this.dieding || ss.logic.game.attract(t, this));
    },
    onJudgeGrow: function(t) {
        this.data && (this.toBeEgg(t), this.toBeGrow(t));
    },
    onJudgeDied: function() {
        this.data && (this.borning || this.toBeKill());
    },
    onBalaAdd: function(t, e) {
        if (this.data) {
            var i = ss.logic.config.getSheetData(ss.enum.sheet.buff, t), s = this.isEgger ? i.effect_add : i.effect;
            switch (t) {
                case ss.enum.gameEgg.chocolate:
                this.toBeGhost();
                break;

                case ss.enum.gameEgg.sweet:
                this._attrBala = s, this._setAttrLength(this._attrLength), this.eggs.active = !0, 
                this.egg_3.active = !0, this.smart.setAttrAngle(s >= 5 ? 90 : 45);
                break;

                case ss.enum.gameEgg.shit:
                this._speedBala = s, this.eggs.active = !0, this.egg_4.active = !0;
            }
            this._doLayout(), this.isSuper && ss.logic.game.mini.setBuffData({
                method: "add",
                type: t,
                time: e
            });
        }
    },
    onBalaUpdate: function(t, e) {
        this.data && this.isSuper && ss.logic.game.mini.setBuffData({
            method: "update",
            type: t,
            time: e
        });
    },
    onBalaRemove: function(t, e) {
        if (this.data) {
            switch (t) {
                case ss.enum.gameEgg.chocolate:
                this.toBePacman();
                break;

                case ss.enum.gameEgg.sweet:
                this._attrBala = 0, this._setAttrLength(this._attrLength), this.egg_3.active = !1, 
                this.smart.setAttrAngle(30);
                break;

                case ss.enum.gameEgg.shit:
                this._speedBala = 1, this.egg_4.active = !1;
            }
            this.eggs.active = this.egg_3.active || this.egg_4.active, this._doLayout(), this.isSuper && ss.logic.game.mini.setBuffData({
                method: "remove",
                type: t,
                time: e
            });
        }
    },
    onCollisionEnter: function(t, e) {
        if (this.data && !this.dieding) {
            var i = t.abc;
            i && i.data && (e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body ? this.smart.addViewTarget(i.data.id) : e.tag == ss.enum.tag.body && t.tag == ss.enum.tag.body && ss.logic.game.judge(i, this));
        }
    },
    _onCollisionEnter: function(t, e) {
        if (this.data && !this.dieding) {
            var i = t.abc;
            i && i.data && (e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body ? this.smart.addViewTarget(i.data.id) : e.tag == ss.enum.tag.body && t.tag == ss.enum.tag.body && ss.logic.game.judge(i, this));
        }
    },
    onCollisionStay: function(t, e) {
        if (this.data && !this.dieding && !this.isSuper) {
            var i = t.abc;
            i && i.data && i && i.data && i.data.type != ss.enum.roleType.superman && (e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body ? this.smart.addViewTarget(i.data.id) : e.tag == ss.enum.tag.body && t.tag == ss.enum.tag.body && this.node.active && ss.logic.game.judge(i, this));
        }
    },
    _onCollisionStay: function(t, e) {
        if (this.data && !this.dieding && !this.isSuper) {
            var i = t.abc;
            i && i.data && i && i.data && i.data.type != ss.enum.roleType.superman && (e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body ? this.smart.addViewTarget(i.data.id) : e.tag == ss.enum.tag.body && t.tag == ss.enum.tag.body && this.node.active && ss.logic.game.judge(i, this));
        }
    },
    onCollisionExit: function(t, e) {
        if (this.data && !this.dieding) {
            var i = t.abc;
            i && i.data && e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body && this.smart.removeViewTarget(i.data.id);
        }
    },
    _onCollisionExit: function(t, e) {
        if (this.data && !this.dieding) {
            var i = t.abc;
            i && i.data && e.tag == ss.enum.tag.view && t.tag == ss.enum.tag.body && this.smart.removeViewTarget(i.data.id);
        }
    },
    _playByAnagle: function() {
        var t = this._angle, e = cc.v2(Math.abs(this.node.scaleX), Math.abs(this.node.scaleY));
        t >= -90 && t <= 90 || (t > 90 && t <= 180 ? e.y *= -1 : t > -180 && t < -90 && (e.y *= -1)), 
        this.content.rotation = ss.commonUtils.angleToRotation(t), this.content.scaleX = e.x, 
        this.content.scaleY = e.y;
    },
    _playByEar: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        if (this.data) {
            this._playByAnagle();
            var e = this._angle, i = ss.logic.game.bulu.getScaleXY(), s = this.node.getPosition(), o = ss.dirUtils.allDirectionsMove(e, this.getAllSpeed() / i * (1 / t));
            s.addSelf(o), this.node.setPosition(s), this.unit.move(s), this.smart.move(s), o.mulSelf(i), 
            this.isSuper && ss.logic.game.bulu.lookAt(o), this.isSuper || (this.growLab.node.color = this._growLength > ss.logic.game.mini.heroGrow ? cc.Color.RED : cc.Color.WHITE);
        } else console.log("_playByEar:", this.nameLab.string);
    },
    _playByShadow: function() {
        this.data && this.node.active && 0 != this._addSpeed && (++this._shadR < this._shadLength || (this._shadR = 0, 
        ss.logic.game.bulu.createShadow({
            target: this.data.id,
            pos: this.node.getPosition(),
            size: this.mode.getContentSize(),
            rotation: this.content.rotation,
            scaleX: this.content.scaleX,
            scaleY: this.content.scaleY,
            mid: this.data.mid
        })));
    },
    _playByKill: function(t) {
        var e = {
            r: 0,
            isEffect: !1
        };
        if (!this.data || !this.node.active || !t.isSoul) return e;
        var i, s = ss.logic.game.hutu.kill(this.isSuper), o = 0 == this.souls.length;
        if (e.isEffect = s.length > 0, s.length > 0) for (var n = 0; n < s.length; n++) i = s[n], 
        e.r += i.grow, i.msg = 0 == n ? ss.logic.game.hutu.getKillWord(i.type, t) : null, 
        this.souls.push(i); else {
            var a = ss.logic.game.bulu.heroid;
            a != t.winId && a != t.lostId || (i = {
                type: null,
                msg: ss.logic.game.hutu.getKillWord(null, t)
            }, this.souls.push(i), o = !0);
        }
        return o && this._playBySoul(0, !0), e;
    },
    _playBySoul: function(t, e) {
        if (this.data && this.node.active && 0 != this.souls.length && (this.sTimestamp += t, 
        e || this.sTimestamp >= 1.5)) {
            this.sTimestamp = 0;
            var i = this.souls.shift();
            i.msg && ss.logic.tips.kill(i.msg), i.type && (ss.logic.sound.playEffect(i.type), 
            i.msg || (ss.logic.game.bulu.createSnow({
                target: this.data.id,
                v2: cc.v2(0, this._bodyLength),
                word: "" + ss.enum.killWord[i.type],
                parent: this.node,
                index: this.snowLength
            }), this.snowLength > 2 && (this.snowLength = 0), this.snowLength++));
        }
    },
    _playByCollider: function(t) {
        var e;
        this.colliderTimestamp += t, this.colliderTimestamp < .001 || (this.colliderTimestamp = 0, 
        this.colliderEnters.length && (e = this.colliderEnters.shift()) && this._onCollisionEnter(e.other, e.self), 
        this.colliderStays.length && (e = this.colliderStays.shift()) && this._onCollisionStay(e.other, e.self), 
        this.colliderExits.length && (e = this.colliderExits.shift()) && this._onCollisionExit(e.other, e.self));
    },
    _setGrowLength: function(t) {
        if (this.data) {
            var e = Math.floor(t);
            this._growLength = t, this.smart.setGrowLength(e), this.growLab.string = e + "", 
            this.data.grow = e, ss.logic.game.mini.setGrowData(this.data.id, e);
        }
    },
    _setBodyLength: function(t) {
        if (this.data) {
            var e = Math.min(t, ss.logic.game.isSystemBetter() ? 192 : 144);
            this._bodyLength = e;
            var i = this.isGhost ? this._ghostLength : e;
            this.smart.setBodyLength(i);
            var s = this.colliders[ss.enum.tag.body];
            s && (s.radius = i), ss.logic.game.bulu.scaleXY(e), this._shadLength = e < 42 ? 6 : 10;
            var o = 3 * this._bodyLength + 500;
            this.glow.active && this.glow.setContentSize(o, o);
        }
    },
    _setViewLength: function(t) {
        if (this.data) {
            this._viewLength = t;
            var e = this._bodyLength + t;
            this.smart.setViewLength(e);
            var i = this.colliders[ss.enum.tag.view];
            i && (i.radius = e);
        }
    },
    _setAttrLength: function(t) {
        if (this.data) {
            this._attrLength = t;
            var e = this._bodyLength + t * (1 + this._attrBala);
            this.smart.setAttrLength(e);
        }
    },
    _doLayout: function() {
        var t = 2 * this._bodyLength;
        this.mode.setContentSize(t, t);
        var e = 1 / ss.logic.game.bulu.getScaleXY();
        this.growLab.node.setScale(e, e), this.nameLab.node.setScale(e, e);
        var i = 0, s = 0;
        s = this.isGhost ? -this._ghostLength - 15 : -this._bodyLength - 15, this.eggs.active && (this.eggs.setScale(e, e), 
        s -= (i = this.eggs.height * e) / 2, this.eggs.y = s, s = s - i / 2 - 15), i = this.growLab.node.height * e, 
        this.growLab.node.y = s, s -= i, this.nameLab.node.y = s;
    },
    _nameSizeChange: function() {
        this.playing && this._doLayout();
    }
})