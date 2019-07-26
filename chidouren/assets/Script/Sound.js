 cc.Class({
	extends: cc.Component,
	properties: {
		volume: 1,
		bgVolume: 1,
		bgMusic: {
			type: cc.AudioClip,
			default: null
		},
		eat: {
			type: cc.AudioClip,
			default: null
		},
		bigEat: {
			type: cc.AudioClip,
			default: null
		},
		died: {
			type: cc.AudioClip,
			default: null
		},
		addSpeed: {
			type: cc.AudioClip,
			default: null
		},
		click: {
			type: cc.AudioClip,
			default: null
		},
		close: {
			type: cc.AudioClip,
			default: null
		},
		result: {
			type: cc.AudioClip,
			default: null
		},
		dominating: {
			type: cc.AudioClip,
			default: null
		},
		double_kill: {
			type: cc.AudioClip,
			default: null
		},
		fristblood: {
			type: cc.AudioClip,
			default: null
		},
		godlike: {
			type: cc.AudioClip,
			default: null
		},
		holyshit: {
			type: cc.AudioClip,
			default: null
		},
		killing_spree: {
			type: cc.AudioClip,
			default: null
		},
		megakill: {
			type: cc.AudioClip,
			default: null
		},
		monsterkill: {
			type: cc.AudioClip,
			default: null
		},
		rampage: {
			type: cc.AudioClip,
			default: null
		},
		triple_kill: {
			type: cc.AudioClip,
			default: null
		},
		ultrakill: {
			type: cc.AudioClip,
			default: null
		},
		unstoppable: {
			type: cc.AudioClip,
			default: null
		},
		whickedsick: {
			type: cc.AudioClip,
			default: null
		}
	},
	onLoad: function() {
		this.bgmId = -1, this.bgmName = null, this.lockabled = !1, this.soundEnabled = !0, 
		this.bgEnabled = !0, ss.sound = this, cc.audioEngine.setMusicVolume(this.bgVolume);
	},
	start: function() {
		cc.game.on(cc.game.EVENT_HIDE, this.onGameHide, this), cc.game.on(cc.game.EVENT_SHOW, this.onGameShow, this);
	},
	onDestroy: function() {
		cc.game.off(cc.game.EVENT_HIDE, this.onGameHide, this), cc.game.off(cc.game.EVENT_SHOW, this.onGameShow, this);
	},
	onGameHide: function(t) {
		this.pauseMusic();
	},
	onGameShow: function(t) {
		this.bgEnabled && this.resumeMusic();
	},
	_$playSound: function(t, e) {
		this.lockabled || this.soundEnabled && 0 != this.volume && cc.audioEngine.play(e, !1, this.volume);
	},
	playSound: function(t) {
		this[t] && this._$playSound(t, this[t]);
	},
	playSuperSound: function(t) {
		this.lockabled || this.soundEnabled && this[t] && cc.audioEngine.play(this[t], !1, 1);
	},
	setSoundVolume: function(t) {
		this.volume = t;
	},
	setBgmVolume: function(t) {
		this.bgVolume = t, cc.audioEngine.setMusicVolume(t);
	},
	setEnabled: function(t) {
		this.soundEnabled = t, this.bgEnabled = t, t ? this.resumeMusic() : this.pauseMusic();
	},
	setBgEnabled: function(t) {
		this.bgEnabled = t;
	},
	setSoundEnabled: function(t) {
		this.soundEnabled = t;
	},
	setLockabled: function(t) {
		this.lockabled = t, t ? this.pauseMusic() : this.resumeMusic();
	},
	playMusic: function(t) {
		var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
		if (!this.lockabled && this.bgEnabled) if (this.bgmName != t) {
			this.stopMusic();
			var i = this[t];
			i ? (this.bgmName = t, -1 == this.bgmId && (this.bgmId = cc.audioEngine.playMusic(i, e))) : console.log("error error error:", "playMusic[ " + t + " ] undefind");
		} else this.resumeMusic();
	},
	stopMusic: function() {
		this.bgmName && (-1 != this.bgmId && cc.audioEngine.stopMusic(), this.bgmId = -1, 
		this.bgmName = null);
	},
	pauseMusic: function() {
		-1 != this.bgmId && cc.audioEngine.pauseMusic();
	},
	resumeMusic: function() {
		this.lockabled || this.bgEnabled && -1 != this.bgmId && cc.audioEngine.resumeMusic();
	}
})