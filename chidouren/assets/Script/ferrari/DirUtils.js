
var s = function() {};
module.exports = {
    DirUtils: s
}, s.calcFourDirectionsAngle = function(t) {
    return t > 45 && t < 135 ? 90 : t > -135 && t < -45 ? -90 : t >= -180 && t <= -135 || t >= 135 && t <= 180 ? 180 : 0;
}, s.calcEightDirectionsAngle = function(t) {
    return t >= 67.5 && t <= 112.5 ? 90 : t >= -112.5 && t <= -67.5 ? -90 : t >= -180 && t <= -157.5 || t >= 157.5 && t <= 180 ? 180 : t >= -22.5 && t <= 22.5 ? 0 : t > 112.5 && t < 157.5 ? 135 : t > 22.5 && t < 67.5 ? 45 : t > -157.5 && t < -112.5 ? -135 : -45;
}, s.fourDirectionsMove = function(t, e) {
    var i = 0, s = 0;
    return t > 45 && t < 135 ? s += e : t > -135 && t < -45 ? s -= e : t >= -180 && t <= -135 || t >= 135 && t <= 180 ? i -= e : t >= -45 && t <= 45 && (i += e), 
    cc.v2(i, s);
}, s.eightDirectionsMove = function(t, e) {
    var i = 0, s = 0;
    return t >= 67.5 && t <= 112.5 ? s += e : t >= -112.5 && t <= -67.5 ? s -= e : t >= -180 && t <= -157.5 || t >= 157.5 && t <= 180 ? i -= e : t >= -22.5 && t <= 22.5 ? i += e : t > 112.5 && t < 157.5 ? (i -= e / 1.414, 
    s += e / 1.414) : t > 22.5 && t < 67.5 ? (i += e / 1.414, s += e / 1.414) : t > -157.5 && t < -112.5 ? (i -= e / 1.414, 
    s -= e / 1.414) : (i += e / 1.414, s -= e / 1.414), cc.v2(i, s);
}, s.allDirectionsMove = function(t, e) {
    var i = 0, s = 0;
    return i += Math.cos(t * (Math.PI / 180)) * e, s += Math.sin(t * (Math.PI / 180)) * e, 
    cc.v2(i, s);
} 