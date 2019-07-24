var e = 60;

cc.game.setFrameRate = function(a) {
    e = a, wx.setPreferredFramesPerSecond(a);
}, cc.game.getFrameRate = function() {
    return e;
}, cc.game._runMainLoop = function() {
    var e, a = this, n = a.config, t = cc.director;
    n.frameRate;
    cc.debug.setDisplayStats(n.showFPS), e = function() {
        a._paused || (a._intervalId = window.requestAnimFrame(e), t.mainLoop());
    }, a._intervalId = window.requestAnimFrame(e), a._paused = !1;
}, cc.game.end = function() {};