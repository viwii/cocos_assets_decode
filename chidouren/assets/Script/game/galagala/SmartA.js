
var s = require("./Brain"), o = require("./DirTools"), n = function(t) {
    this.comp = t, this.brain = new s.Brain(this), this.list = [], this.clear();
};
n.prototype.isStanding = function() {
    return this.id >= 0;
}, n.prototype.init = function(t) {
    this.id = t.id, this.sid = t.sid, this.type = t.type, this.camp = t.camp;
}, n.prototype.setData = function(t) {
    this.data = t, this.brain.setData(this.sid);
}, n.prototype.setGrowLength = function(t) {
    this.grow = t;
}, n.prototype.setBodyLength = function(t) {
    this.bodyLength = t;
}, n.prototype.setViewLength = function(t) {
    this.viewLength = t;
}, n.prototype.setAttrLength = function(t) {
    this.attrLength = t;
}, n.prototype.setAngleLength = function(t) {
    this.angle = t;
}, n.prototype.setIsGhost = function(t) {
    this.isGhost = t;
}, n.prototype.setAttrAngle = function(t) {
    this.offset = t;
}, n.prototype.play = function() {
    this.playing = !0, this._playFreedom(!0);
}, n.prototype.update = function(t) {
    this.playing && (this.locking || (this.brain.update(t), this.timestamps += t, this.timestamps < .05 || (this.timestamps = 0, 
    this._guardTheBorder(), this._guardTheAttract())));
}, n.prototype.addViewTarget = function(t) {
    this.id != t && -1 == this.list.indexOf(t) && (this.list.push(t), this._judgeTheTarget(t));
}, n.prototype.removeViewTarget = function(t) {
    if (this.id != t) {
        var e = this.list.indexOf(t);
        e > -1 && this.list.splice(e, 1), this.targetId == t && this._playFreedom();
    }
}, n.prototype.removeSelf = function() {
    this.clear();
}, n.prototype.setLocking = function(t) {
    this.locking = t;
}, n.prototype.move = function(t) {
    this.v2 = t;
}, n.prototype.onBrainUpdate = function(t) {
    switch (t.action) {
        case ss.enum.action.swerve:
        var e = this.angle + 4 * t.clockwise;
        e > 180 ? e -= 360 : e < -180 && (e += 360), this._callBackCompAction(ss.enum.action.border, e, !1);
    }
}, n.prototype.onBrainFinish = function(t) {
    switch (t.action) {
        case ss.enum.action.freedom:
        t.again ? this._playFreedom() : this._playSwerve();
        break;

        case ss.enum.action.track:
        t.again && this.targetId >= 0 && this.targetId == t.targetId ? this._playTrack(t.targetId) : Math.random() <= .5 ? this._playFreedom() : this._playSwerve();
        break;

        case ss.enum.action.escape:
        t.again && this.targetId >= 0 && this.targetId == t.targetId ? this._playEscape(t.targetId) : Math.random() <= .5 ? this._playFreedom() : this._playSwerve();
        break;

        case ss.enum.action.border:
        -1 == this.targetId && this.action == ss.enum.action.border && (this.action = ss.enum.action.freedom);
        break;

        case ss.enum.action.swerve:
        t.again && this._playSwerve();
    }
}, n.prototype._callBackCompAction = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    this.action = t, this.comp && this.comp.onSmartAction && this.comp.onSmartAction({
        action: t,
        angle: e,
        addSpeed: i
    });
}, n.prototype._callBackCompDied = function() {
    this.comp && this.comp.onSmartDied && this.comp.onSmartDied();
}, n.prototype._callBackCompAttr = function(t) {
    this.comp && this.comp.onSmartAttr && this.comp.onSmartAttr(t);
}, n.prototype._playFreedom = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    this.targetId = -1;
    var e = this.brain.reflect(ss.enum.action.freedom, -1);
    if (t || e) {
        var i = -180 + Math.ceil(360 * Math.random()), s = !!e && e.addSpeed;
        this._callBackCompAction(ss.enum.action.freedom, i, s);
    }
}, n.prototype._playTrack = function(t) {
    if (this.data && this.data.outlooking && -1 != this.list.indexOf(t)) {
        var e = this.data.outlooking.getSmart(t);
        if (e && e.data) {
            var i = o.DirMath.getSafeAngleByPointAndPoint(this.v2, e.v2, o.DirMode.track);
            if (null != i) {
                var s = this.brain.reflect(ss.enum.action.track, t);
                if (s) {
                    this.targetId = t;
                    var n = s.addSpeed || !1;
                    this._callBackCompAction(ss.enum.action.track, i, n);
                }
            }
        }
    }
}, n.prototype._playEscape = function(t) {
    if (this.data && this.data.outlooking && -1 != this.list.indexOf(t)) {
        var e = this.data.outlooking.getSmart(t);
        if (e && e.data) {
            var i = o.DirMath.getSafeAngleByPointAndPoint(this.v2, e.v2, o.DirMode.escape);
            if (null != i) {
                var s = this.brain.reflect(ss.enum.action.escape, t);
                if (s) {
                    this.targetId = t;
                    var n = s.addSpeed || !1;
                    this._callBackCompAction(ss.enum.action.escape, i, n);
                }
            }
        }
    }
}, n.prototype._playBorder = function(t) {
    var e = this.brain.reflect(ss.enum.action.border, -1);
    if (e) {
        this.targetId = -1;
        var i = e.addSpeed || !1;
        this._callBackCompAction(ss.enum.action.border, t, i);
    }
}, n.prototype._playSwerve = function() {
    this.brain.reflect(ss.enum.action.swerve, -1);
}, n.prototype._guardTheBorder = function() {
    if (this.data && this.v2) {
        var t = this.data.mapRect, e = null;
        null == (e = o.DirMath.getSafeAngleByCircleAndRect(this.v2, this.bodyLength, t)) ? null != (e = o.DirMath.getSafeAngleByCircleAndRect(this.v2, this.viewLength, t)) ? this.bordering || (this.bordering = !0, 
        this._playBorder(e)) : this.bordering = !1 : this._callBackCompDied();
    }
}, n.prototype._judgeTheTarget = function(t) {
    if (this.data && this.data.outlooking) {
        var e = this.data.outlooking.getSmart(t);
        if (e && e.data) switch (e.type) {
            case ss.enum.roleType.superman:
            case ss.enum.roleType.pacman:
            if (this.camp > ss.enum.gameCamp.normal && this.camp == e.camp) return;
            if (this.isGhost && e.isGhost) return;
            if (this.isGhost) this.action != ss.enum.action.track && this._playTrack(t); else if (e.isGhost) this._playEscape(t); else {
                if (this.grow == e.grow) return;
                this.grow < e.grow ? this._playEscape(t) : this.action != ss.enum.action.track && this.grow > e.grow && this._playTrack(t);
            }
            break;

            case ss.enum.roleType.ghost:
            this._playEscape(t);
            break;

            case ss.enum.roleType.pea:
            null != this.action && this.action != ss.enum.action.freedom || this._playTrack(t);
        }
    }
}, n.prototype._guardTheAttract = function() {
    if (this.data && this.data.outlooking) for (var t, e = 0, i = this.list.length; e < i; e++) (t = this.data.outlooking.getSmart(this.list[e])) && !t.locking && t.type == ss.enum.roleType.pea && o.DirMath.isTargetAngleByPointAndPoint(this.v2, t.v2, this.angle, this.attrLength, this.offset) && this._callBackCompAttr(t.comp);
}, n.prototype.clear = function() {
    this.id = -1, this.sid = -1, this.camp = -1, this.targetId = -1, this.type = null, 
    this.action = null, this.v2 = null, this.grow = 0, this.angle = 0, this.bodyLength = 0, 
    this.viewLength = 0, this.attrLength = 0, this.offset = 30, this.list.length = 0, 
    this.timestamps = 0, this.playing = !1, this.locking = !1, this.bordering = !1, 
    this.isGhost = !1, this.data = null, this.brain.clear();
}, 
module.exports = {
        SmartA: n
}