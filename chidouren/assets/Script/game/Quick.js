var s = function(t) {
    this.step = 0, this.up = 1, this.max = 5, this.duration = 1e3, this.down = 100, 
    this.comp = t, this.state = o.DEFAULT, this.time = 0, this.playing = !1, this.speeding = !1;
};
s.prototype.setData = function(t) {
    this.up = t.up, this.max = t.max, this.duration = t.duration, this.down = t.down;
}, s.prototype.play = function() {
    this.playing = !0;
}, s.prototype.stop = function() {
    this.playing = !1, this.clear();
}, s.prototype.addSpeed = function() {
    return !!this.playing && !this.speeding && (this.time = 0, this.step = 0, this.state = o.UP, 
    this.speeding = !0, !0);
}, s.prototype.clear = function() {
    this.speeding = !1, this.state = o.DEFAULT, this.step = 0, this.time = 0;
}, s.prototype.update = function(t) {
    if (this.playing && this.speeding) {
        switch (this.state) {
            case o.DEFAULT:
            break;

            case o.UP:
            this.step += this.up, this.step >= this.max && (this.state = o.DURATION, this.time = 0, 
            this.step = this.max);
            break;

            case o.DURATION:
            this.step = this.max, this.time += 1e3 * t, this.time > this.duration && (this.state = o.DOWN, 
            this.time = 0);
            break;

            case o.DOWN:
            this.step -= this.down, this.step <= 0 && this.clear();
        }
        this.comp && this.comp.onQuickUpdate && this.comp.onQuickUpdate({
            speed: this.step,
            state: this.state
        });
    }
}, module.exports = {
    Quick: s
};
var o = cc.Enum({
    DEFAULT: 0,
    UP: 1,
    DURATION: 2,
    DOWN: 3
});
        