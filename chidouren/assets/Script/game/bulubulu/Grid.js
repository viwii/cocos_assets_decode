
var s = require("./Cell"); 
var grid = function() {
    this.col = 0; 
    this.row = 0; 
    this.data = null; 
    this.center = cc.v2(); 
    this.showList = []; 
    this.innerList = []; 
    this.outSideList = []; 
    this.cells = new ss.Dictionary(), 
    this.units = new ss.Dictionary(), 
    this._inside = null; 
    this._halfMapW = 0; 
    this._halfMapH = 0;
};

grid.prototype.init = function(t) {
    var e, i, o, n, a = t.mapSize || cc.size(1e3, 1e3), r = t.gridSize || cc.size(100, 100), c = Math.ceil(a.width / r.width), h = Math.ceil(a.height / r.height);
    this.col = c, this.row = h, this.data = t, this.center.x = Math.floor(c / 2), this.center.y = Math.floor(h / 2);
    var l = t.inside, d = r.width, u = r.height, p = c * (d / 2), g = h * (u / 2);
    this._halfMapW = p, this._halfMapH = g, this._inside = l;
    for (var m = 0; m < h; m++) 
    for (var f = 0; f < c; f++){ 
        e = 10000 * f + m; 
        if(n = this.hasInner(f, m))
        {
            this.innerList.push(e), 
            this.outSideList.push(e)
        } 
        i = cc.rect(f * d - p, m * u - g, d, u); 
        o = new s.Cell(e, n, i);
        this.cells.set(e, o);
    }
}; 

grid.prototype.has = function(t, e) {
    return t >= 0 && t < this.col && e >= 0 && e < this.row;
};

grid.prototype.hasInner = function(t, e) {
    var i = this._inside;
    return i && t >= i.width && t + i.width < this.col && e >= i.height && e + i.height < this.row;
};

grid.prototype.getCell = function(t, e) {
    var i = 1e4 * t + e;
    return this.cells.get(i);
}; 

grid.prototype.getCellIdByInnerRand = function() {
    var t = this.innerList;
    return t[Math.floor(Math.random() * t.length)];
}; 

grid.prototype.getCellIdByOutSideRand = function() {
    var t = this.outSideList;
    return t[Math.floor(Math.random() * t.length)];
}; 

grid.prototype.getCellByOutSideRand = function() {
    var t = this.getCellIdByOutSideRand();
    return this.cells.get(t);
}; 

grid.prototype.getCenterCellId = function() {
    return this.getCell(this.center.x, this.center.y).id;
};

grid.prototype.show = function(t, e) {
    if (!(t < 0 || e < 0 || t >= this.col || e >= this.row)) {
        var i = this.getCell(t, e);
        if (i) {
            i.show();
            var s = i.id, o = this.showList.indexOf(s);
            -1 == o && this.showList.push(s), this.hasInner(t, e) && (o = this.outSideList.indexOf(s)) > -1 && this.outSideList.splice(o, 1);
        }
    }
};

grid.prototype.hide = function(t, e) {
    if (!(t < 0 || e < 0 || t >= this.col || e >= this.row)) {
        var i = this.getCell(t, e);
        if (i) {
            i.hide();
            var s = i.id, o = this.showList.indexOf(s);
            o > -1 && this.showList.splice(o, 1), this.hasInner(t, e) && -1 == (o = this.outSideList.indexOf(s)) && this.outSideList.push(s);
        }
    }
}; 

grid.prototype.addUnit = function(t, e, i) {
    var s = this.cells.get(e);
    s ? (this.units.set(t, i), i.setData({
        gid: e,
        cell: s,
        grid: this
    }), s.add(i)) : console.warn("addUnit no find cellId:", e);
};

grid.prototype.removeUnit = function(t) {
    var e = this.units.get(t);
    e && (this.units.remove(t), e.removeSelf());
}; 

grid.prototype.getUnit = function(t) {
    return this.units.get(t);
}; 

grid.prototype.removeAllUnits = function() {
    this.units.clear();
};

grid.prototype.getCellByLocalXY = function(t) {
    var e = this.toGridXY(t);
    return e ? this.getCell(e.x, e.y) : null;
}; 

grid.prototype.toGridXY = function(t) {
    var e = this.data.gridSize, i = this._halfMapW, s = this._halfMapH, o = cc.v2();
    return o.x = Math.floor((t.x + i) / e.width), o.y = Math.floor((t.y + s) / e.height), 
    o.x < 0 || o.x >= this.col || o.y < 0 || o.y >= this.row ? (console.warn("toGridXY no find grid:", t), 
    null) : (o.x = Math.min(Math.max(0, o.x), this.col - 1), o.y = Math.min(Math.max(0, o.y), this.row - 1), 
    o);
}; 

grid.prototype.toLocalXY = function(t) {
    var e = this.getCell(t.x, t.y);
    return e ? e.rect.center : cc.v2();
}; 

grid.prototype.reset = function() {
    for (var t, e = this.cells.values, i = 0, s = e.length; i < s; i++) (t = e[i]) && t.reset();
    this.showList.length = 0, this.outSideList = this.innerList.slice();
}; 

grid.prototype.clear = function() {
    for (var t, e = this.cells.values, i = 0, s = e.length; i < s; i++) 
        (t = e[i]) && t.clear();
    
    this.units.clear(); 
    this.showList.length = 0; 
    this.outSideList.length = 0;
};

module.exports = {
    Grid: grid
}