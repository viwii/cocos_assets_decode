
var s = {
    up: 8,
    down: 2,
    left: 4,
    right: 6,
    upLeft: 7,
    upRight: 9,
    downLeft: 1,
    downRight: 3,
    null: 0
}, o = {
    null: 0,
    track: 1,
    escape: 2
}, n = function() {};
n.getDirByCircleAndRect = function(t, e, i) {
    var o = s.null, n = t.y + e >= i.y + i.height, a = t.y - e <= i.y, r = t.x - e <= i.x, c = t.x + e >= i.x + i.width;
    return n && r ? o = s.upLeft : n && c ? o = s.upRight : a && r ? o = s.downLeft : a && c ? o = s.downRight : n ? o = s.up : a ? o = s.down : r ? o = s.left : c && (o = s.right), 
    o;
}, n.getSafeAngleByCircleAndRect = function(t, e, i) {
    var o = null;
    switch (n.getDirByCircleAndRect(t, e, i)) {
      case s.up:
        o = -15 - Math.floor(150 * Math.random());
        break;

      case s.down:
        o = 15 + Math.floor(150 * Math.random());
        break;

      case s.left:
        o = -75 + Math.floor(150 * Math.random());
        break;

      case s.right:
        o = Math.random() >= .5 ? 105 + Math.floor(75 * Math.random()) : -105 - Math.floor(75 * Math.random());
        break;

      case s.upLeft:
        o = -15 - Math.floor(60 * Math.random());
        break;

      case s.upRight:
        o = -105 - Math.floor(60 * Math.random());
        break;

      case s.downLeft:
        o = 15 + Math.floor(60 * Math.random());
        break;

      case s.downRight:
        o = 105 + Math.floor(60 * Math.random());
    }
    return o;
}, n.getSafeAngleByPointAndPoint = function(t, e) {
    var i = null;
    switch (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0) {
      case o.null:
      case o.track:
        i = Math.atan2(e.y - t.y, e.x - t.x) * (180 / Math.PI);
        break;

      case o.escape:
        i = Math.atan2(t.y - e.y, t.x - e.x) * (180 / Math.PI), i += -60 + Math.floor(120 * Math.random());
    }
    return i;
}, n.isTargetAngleByPointAndPoint = function(t, e, i, s) {
    var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 30;
    if (Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) > s) return !1;
    var n = Math.atan2(e.y - t.y, e.x - t.x) * (180 / Math.PI), a = !1, r = i + o, c = i - o;
    return i <= 180 - o && i >= -180 + o ? a = n >= c && n <= r : i > 180 - o ? a = n <= 180 && n >= c || n >= -180 && n <= -360 + r : i < -180 + o && (a = n >= -180 && n <= r || n <= 180 && n >= 360 + c), 
    a;
}, module.exports = {
    Dir: s,
    DirMode: o,
    DirMath: n
} 