function e() {
    this.type = "devicemotion", this.accelerationIncludingGravity = null;
}

var c = !1, r = _cc.inputManager._registerAccelerometerEvent.bind(_cc.inputManager);

_cc.inputManager._registerAccelerometerEvent = function() {
    r(), c ? wx.startAccelerometer && wx.startAccelerometer({
        fail: function(e) {
            cc.error("register Accelerometer failed ! err: " + e);
        },
        success: function() {},
        complete: function() {}
    }) : (c = !0, wx.onAccelerometerChange && wx.onAccelerometerChange(function(c) {
        var r = new e(), t = {};
        t.x = c.x, t.y = c.y, t.z = c.z;
        var n = wx.getSystemInfoSync(), i = n.windowWidth;
        if (n.windowHeight < i) {
            var o = t.x;
            t.x = t.y, t.y = o, t.x *= 10, t.y *= -10;
        } else t.x *= -10, t.y *= -10;
        r.accelerationIncludingGravity = t, document.dispatchEvent(r);
    }));
};

var t = _cc.inputManager._unregisterAccelerometerEvent.bind(_cc.inputManager);

_cc.inputManager._unregisterAccelerometerEvent = function() {
    t(), wx.stopAccelerometer && wx.stopAccelerometer({
        fail: function(e) {
            cc.error("unregister Accelerometer failed ! err: " + e);
        },
        success: function() {},
        complete: function() {}
    });
};