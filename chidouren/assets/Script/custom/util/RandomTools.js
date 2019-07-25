
var s = function() {};
module.exports = {
    RandomTools: s
}, s.randomInt = function(t, e) {
    return Math.floor((e - t + 1) * Math.random()) + t;
}, s.getPirze = function(t, e) {
    var i = e;
    t = t, i.sort(function(t, e) {
        return Number(t.per) - Number(e.per);
    });
    for (var o = s.randomInt(1, t), n = 0; n < i.length; n++) if (o <= i[n].per) return i[n];
    return i[0];
}, s.isInRate = function(t) {
    return t >= s.randomInt(0, 100);
}