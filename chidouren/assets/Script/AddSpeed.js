 cc.Class({
	extends: cc.Component,
	properties: {},
	onLoad: function() {
		this.timestamps = 0;
	},
	start: function() {},
	play: function() {
		this.playing = !0;
	},
	stop: function() {
		this.playing = !1;
	},
	click: function(t) {
		if (this.playing) {
			var e = Date.now();
			e - this.timestamps < 800 || (this.timestamps = e, ss.logic.sound.addSpeed(), this.node.emit("speed"));
		}
	}
}) 