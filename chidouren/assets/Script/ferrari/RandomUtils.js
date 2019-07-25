var n = function() {};
n.getRndDataFromArray = function(t, e) {
    if ("object" !== (void 0 === t ? "undefined" : o(t)) || e <= 0) return [];
    var i = [];
    for (var s in t) i.push(t[s]);
    for (var n = [], a = Math.floor(e / i.length), r = e % i.length, c = 0; c < a; c++) for (var s in t) n.push(t[s]);
    for (s = 0; s < r; s++) {
        var h = i[s], l = Math.ceil(Math.random() * (i.length - s - 1) + s);
        n.push(i[l]), i[s] = i[l], i[l] = h;
    }
    return n;
}, n.getRndNumsFromNums = function(t, e, i) {
    for (var s = [], o = t; o <= e; o++) s.push(o);
    return n.getRndDataFromArray(s, i);
}, n.randomInt = function(t, e) {
    return Math.floor((e - t + 1) * Math.random()) + t;
}, n.getRandomList = function(t, e, i, s) {
    for (var o = [], n = 0; n < i; ) {
        var a = randomInt(t, e);
        -1 == s.indexOf(a) && (o.push(a), n++);
    }
    return o;
}, n.arrayShuffer = function(t) {
    for (var e = t.length - 1, i = 0; i <= e; i++) {
        var s = n.randomInt(i, e), o = t[i];
        t[i] = t[s], t[s] = o;
    }
    return t;
}, n.getPirze = function(t, e) {
    var i = e;
    t = t, i.sort(function(t, e) {
        return Number(t.per) - Number(e.per);
    });
    for (var s = this.randomInt(1, t), o = 0; o < i.length; o++) if (s <= i[o].per) return i[o];
    return i[i.length - 1];
}, module.exports = {
    RandomUtils: n
}