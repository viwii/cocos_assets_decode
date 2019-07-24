var s = {
	TouchType: cc.Enum({
		DEFAULT: 0,
		FOLLOW: 1
	}),
	DirectionType: cc.Enum({
		FOUR: 4,
		EIGHT: 8,
		ALL: 0
	})
};
cc.Class({
	extends: cc.Component,
	properties: {
		dot: {
			default: null,
			type: cc.Node,
			displayName: "摇杆节点"
		},
		ring: {
			default: null,
			type: cc.Node,
			displayName: "摇杆背景节点"
		},
		touchType: {
			default: s.TouchType.DEFAULT,
			type: s.TouchType,
			displayName: "触摸类型"
		},
		directionType: {
			default: s.DirectionType.ALL,
			type: s.DirectionType,
			displayName: "方向类型"
		},
		step: {
			default: 1,
			displayName: "位移"
		},
		tick: {
			default: 1,
			displayName: "位移间隔(毫秒)"
		},
		moveEvents: {
			default: [],
			type: cc.Component.EventHandler,
			displayName: "位移回调"
		}
	},
	ctor: function() {
		this.pressed = !1, this.angle = 9999, this.pressTicks = 0, this.moveStep = 1, this.addStep = 0, 
		this.playing = !1;
	},
	onLoad: function() {
		this.moveTick = this.tick / 1e3, this.moveStep = this.step, this._initTouchEvent();
	},
	play: function() {
		this.playing = !0;
	},
	stop: function() {
		this.playing = !1, this._resetJoystick();
	},
	setAddStep: function(t) {
		this.addStep = t;
	},
	_initTouchEvent: function() {
		this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this), 
		this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
	},
	_touchStartEvent: function(t) {
		if (this._resetJoystick(), this.node.active) if (this.pressed = !0, this.touchType == s.TouchType.FOLLOW) {
			var e = this.node.convertToNodeSpaceAR(t.getLocation());
			this.ring.setPosition(e);
		} else {
			var i = this.dot.getBoundingBoxToWorld();
			this.pressed = !0, i.contains(t.getLocation()) || this._processMoveDot(t);
		}
	},
	_touchMoveEvent: function(t) {
		this.node.active && this._processMoveDot(t);
	},
	_touchEndEvent: function() {
		this.node.active && this._resetJoystick();
	},
	_getCurrMoveStep: function() {
		var t = this.addStep + this.moveStep;
		return Math.max(0, t);
	},
	update: function(t) {
		this.node.active && this.playing && this.pressed && 9999 != this.angle && (this.pressTicks += t, 
		this.pressTicks > this.moveTick && (this._updateMove(this.angle), this.pressTicks = 0));
	},
	_processMoveDot: function(t) {
		if (!this.pressed) return !1;
		var e = this.ring.convertToNodeSpaceAR(t.getLocation()), i = Math.sqrt(Math.pow(e.x, 2) + Math.pow(e.y, 2)), o = e.x, n = e.y, a = this._calcAngle(o, n), r = (this.ring.width - this.dot.width) / 2;
		if (r > i && this.directionType == s.DirectionType.ALL) this.dot.setPosition(cc.v2(o, n)); else {
			var c = Math.PI / 180 * a, h = Math.cos(c) * r, l = Math.sin(c) * r;
			this.dot.setPosition(cc.v2(h, l));
		}
		if (i < 15) return !1;
		this.angle != a && (this.angle = a);
	},
	_resetJoystick: function() {
		this.dot.setPosition(cc.v2(0, 0)), this.pressed = !1, this.angle = 9999, this.pressTicks = 0;
	},
	_calcAngle: function(t, e) {
		var i = Math.atan2(e, t) * (180 / Math.PI);
		switch (this.directionType) {
		  case s.DirectionType.FOUR:
			return ss.dirUtils.calcFourDirectionsAngle(i);

		  case s.DirectionType.EIGHT:
			return ss.dirUtils.calcEightDirectionsAngle(i);
		}
		return i;
	},
	_updateMove: function(t) {
		if (9999 != t) {
			var e = cc.v2(), i = this._getCurrMoveStep();
			switch (this.directionType) {
			  case s.DirectionType.FOUR:
				e = ss.dirUtils.fourDirectionsMove(t, i);
				break;

			  case s.DirectionType.EIGHT:
				e = ss.dirUtils.eightDirectionsMove(t, i);
				break;

			  case s.DirectionType.ALL:
				e = ss.dirUtils.allDirectionsMove(t, i);
			}
			var o = {
				v2: e,
				angle: t
			};
			cc.Component.EventHandler.emitEvents(this.moveEvents, o), this.node.emit("move", o);
		}
	}
});