var unit = function(t) {
    this.grid = null, this.comp = t, this.clear();
};


unit.prototype.init = function(t) {
    this.id = t.id;
};

unit.prototype.setData = function(t) {
    this.gid = t.gid, this.cell = t.cell, this.grid = t.grid;
}; 

unit.prototype.isStanding = function() {
    return this.id >= 0;
}; 

unit.prototype._callBackCompActive = function(t) {
    this.cell && this.comp && this.comp.onUnitActive && this.comp.onUnitActive(this.isShowing, t);
}; 

unit.prototype._callBackCompChange = function() {
    this.cell && this.comp && this.comp.onUnitChange && this.comp.onUnitChange(this.gid);
}; 

unit.prototype._callBackCompDied = function() {
    this.cell && this.comp && this.comp.onUnitDied && this.comp.onUnitDied();
}; 

unit.prototype._exchange = function(t) {
    if (this.cell && this.grid) {
        var e = this.grid.getCellByLocalXY(t);
        if (!e) return console.warn("no find cell in unit[exchange] :", this.cell.id), void this._callBackCompDied();
        this.cell.id != e.id && (this.gid = e.id, this.cell.remove(this.id), this.cell = e, 
        this.cell.add(this), this._callBackCompChange());
    }
}; 

unit.prototype.onActiveFx = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    this.isShowing = t, this._callBackCompActive(e);
}; 

unit.prototype.removeSelf = function() {
    this.cell && this.cell.remove(this.id), this.clear();
}; 

unit.prototype.move = function(t) {
    this.v2 = t;
    var e = this.cell ? this.cell.rect : null;
    e && (e.contains(t) || this._exchange(t));
}; 

unit.prototype.clear = function() {
    this.id = -1, this.gid = -1, this.cell = null, this.v2 = null, this.isShowing = !1;
};


module.exports = {
    Unit: unit
}