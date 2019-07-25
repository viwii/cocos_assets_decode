
var s = {};
module.exports = {
    Resize: s
}, s.phone = {
    w: 1280,
    h: 720
}, s.pad = {
    w: 1560,
    h: 856
}, s.width = 0, s.height = 0, s.ratio = 0, s.isPad = !1, s.initialize = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    if (s.width = s.phone.w, s.height = s.phone.h, t) {
        var e = cc.view.getVisibleSize();
        s.ratio = e.width / e.height, s.ratio <= 1.4 && (s.width = s.pad.w, s.height = s.pad.h, 
        s.isPad = !0);
    }
} 