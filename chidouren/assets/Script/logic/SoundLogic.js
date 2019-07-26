
var s = function() {
    this.eatTimeStamp = 0, this.bigEatTimeStamp = 0, this.getGainStamp = 0, this.getCoinStamp = 0, 
    this.addSpeedTimeStamp = 0, this.bgId = null, cc.systemEvent.on(ss.event.system.AdVideo, this.onVideoRespond.bind(this));
};
s.prototype.open = function() {
    ss.sound.setEnabled(!0);
}, s.prototype.close = function() {
    ss.sound.setEnabled(!1);
}, s.prototype.onVideoRespond = function(t) {
    var e = t;
    e.method == ss.enum.advertising.method.show ? e.code == ss.enum.advertising.code.success ? ss.sound.setLockabled(!0) : ss.sound.setLockabled(!1) : e.method == ss.enum.advertising.method.onClose && ss.sound.setLockabled(!1);
}, s.prototype.setMute = function(t) {
    var e = t ? 1 : 0;
    ss.sound.setBgmVolume(e), ss.sound.setSoundVolume(e);
}, s.prototype.setBgEnabled = function(t) {
    ss.sound.setBgEnabled(t);
}, s.prototype.setSoundEnabled = function(t) {
    ss.sound.setSoundEnabled(t);
}, s.prototype.playBgMusic = function() {
    this.bgId != ss.enum.audio.bgMusic && (this.bgId = ss.enum.audio.bgMusic, ss.sound.playMusic(ss.enum.audio.bgMusic));
}, s.prototype.stopBgMusic = function() {
    this.bgId = null, ss.sound.stopMusic();
}, s.prototype.btnClick = function() {
    ss.sound.playSound(ss.enum.audio.click);
}, s.prototype.panelClose = function() {
    ss.sound.playSound(ss.enum.audio.close);
}, s.prototype.eat = function() {
    var t = Date.now();
    t - this.eatTimeStamp < 200 || (this.eatTimeStamp = t, ss.sound.playSound(ss.enum.audio.eat));
}, s.prototype.bigEat = function() {
    var t = Date.now();
    t - this.bigEatTimeStamp < 300 || (this.bigEatTimeStamp = t, ss.sound.playSound(ss.enum.audio.bigEat));
}, s.prototype.died = function() {
    ss.sound.playSound(ss.enum.audio.died);
}, s.prototype.addSpeed = function() {
    var t = Date.now();
    t - this.addSpeedTimeStamp < 500 || (this.addSpeedTimeStamp = t, ss.sound.playSound(ss.enum.audio.addSpeed));
}, s.prototype.result = function() {
    ss.sound.playSound(ss.enum.audio.result);
}, s.prototype.playEffect = function(t) {
    if (ss.logic.open.isAudited()) {
        var e = ss.enum.audio[t];
        e && ss.sound.playSound(e);
    }
}, module.exports = {
    SoundLogic: s
} 