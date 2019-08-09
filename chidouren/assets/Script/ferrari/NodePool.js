
var NPool = function() {
    this.inited = false; 
    this.poolName = null; 
    this.prefab = null; 
    this.parent = null; 
    this.pools = null; 
    this.objects = null;
};
NPool.prototype.initialize = function(t, e, i) {
    if (!this.inited){
        this.inited = true; 
        this.poolName = t; 
        this.prefab = e; 
        this.parent = i; 
        this.pools = new cc.NodePool(t); 
        this.objects = {};
    }
}, NPool.prototype.preview = function(t) {
    var e, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    for (var  o = 0; o < t; o++) {
        var n;
        e = cc.instantiate(this.prefab); 
        this.pools.put(e); 
        if (s && this.parent) {
            e.parent = this.parent;
        }
        (n = e.getComponent(this.poolName)).preview && n.preview(i);
    }
}, NPool.prototype.create = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = this.objects[t.id];
    if (s) return s;
    var o = this.pools.size();
    if (i && 0 == o) return console.log("NodePool pool is null:", this.poolName, t.id), 
    null;
    !(s = o > 0 ? this.pools.get() : cc.instantiate(this.prefab)).parent && this.parent && this.parent.addChild(s);
    var n = s.getComponent(this.poolName);
    return this.objects[t.id] = s, n.init && n.init(t, e), n.play && n.play(), s;
}, NPool.prototype.recover = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = this.objects[t];
    if (i) {
        var s = i.getComponent(this.poolName);
        delete this.objects[t], e && this.parent && this.parent.removeChild(i), s.clear && s.clear(), 
        this.pools.put(i);
    } else console.log("recover error:", this.poolName, t);
}, NPool.prototype.callMethod = function(t) {
    var e, i, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    for (var o in this.objects) (e = this.objects[o]) && (i = e.getComponent(this.poolName))[t] && i[t](s);
}, NPool.prototype.get = function(t) {
    return this.objects[t];
}, NPool.prototype.getIds = function() {
    return Object.keys(this.objects);
}, NPool.prototype.getLength = function() {
    return Object.keys(this.objects).length;
}, NPool.prototype.getComp = function(t) {
    var e = this.objects[t];
    return e ? e.getComponent(this.poolName) : null;
}, NPool.prototype.removeAll = function() {
    for (var t in this.objects) this.recover(t, !0);
    this.objects = {};
}, module.exports = {
    NodePool: NPool
}