var s = require("./Grid"); 
var view = function() {
    this.rect = cc.rect(); 
    this.padding = cc.size(); 
    this.mapSize = cc.size(); 
    this.gridSize = cc.size(); 
    this.paddingSize = cc.size(); 
    this.grid = new s.Grid(); 
    this.content = null; 
    this._tv = cc.v2(); 
    this._units = new ss.Dictionary(); 
    this._mapRect = new n(); 
    this._mapLastRect = new n();
};

view.prototype.getCenter = function() {
    return this.grid.center;
}; 

view.prototype.getShowList = function() {
    return this.grid.showList;
}; 

view.prototype.getInnerList = function() {
    return this.grid.innerList;
};

view.prototype.getCenterId = function() {
    return this.grid.getCenterCellId();
}; 

view.prototype.getRandInnerId = function() {
    return this.grid.getCellIdByInnerRand();
}; 

view.prototype.getRandOutsideId = function() {
    return this.grid.getCellIdByOutSideRand();
}; 

view.prototype.getRandOutsideCell = function() {
    return this.grid.getCellByOutSideRand();
}; 

view.prototype.getCellIdLocal = function(t) {
    var e = this.grid.getCellByLocalXY(t);
    return e ? e.id : null;
};

view.prototype.init = function(t) {
    var e = cc.winSize, i = t.inside || cc.size(1, 1);
    this.content = t.content; 
    this.paddingSize = t.paddingSize || cc.size(); 
    this.rect = t.rect || cc.rect(-e.width / 2, -e.height / 2, e.width, e.height); 
    this.mapSize = t.mapSize || cc.size(1024, 1024); 
    this.gridSize = t.gridSize || cc.size(256, 256); 
    this.grid.init({
        mapSize: this.mapSize,
        gridSize: this.gridSize,
        inside: i
    }), this._mapLastRect.top = this._mapLastRect.bottom = this._mapLastRect.left = this._mapLastRect.right = -1, 
    this.moveViewPort(this.rect.center);
};
 
view.prototype.move = function(t) {
    var e = cc.v2(this.content.x, this.content.y);
    e = e.sub(t), this.moveViewPort(e);
};

view.prototype.moveViewPort = function(t) {
    this.rect.center = cc.v2(-t.x, -t.y), this.content && this.content.setPosition(t.x, t.y), 
    this.updateViewPort();
}

view.prototype.centerViewPort = function() {
    var t = this.grid.center;
    this.moveViewPort(t);
}

view.prototype.updateViewPort = function() {
    var t = this.paddingSize, e = this.gridSize, i = this.rect, s = i.x - t.width + this.mapSize.width / 2, o = i.y - t.height + this.mapSize.height / 2, n = i.width + 2 * t.width, a = i.height + 2 * t.height;
    this._mapRect.top = Math.floor((o + a) / e.height), this._mapRect.bottom = Math.floor(o / e.height), 
    this._mapRect.left = Math.floor(s / e.width), this._mapRect.right = Math.floor((s + n) / e.width), 
    this._mapRect.top == this._mapLastRect.top && this._mapRect.bottom == this._mapLastRect.bottom && this._mapRect.left == this._mapLastRect.left && this._mapRect.right == this._mapLastRect.right || (this.clipViewPort(), 
    this._mapLastRect.top = this._mapRect.top, this._mapLastRect.bottom = this._mapRect.bottom, 
    this._mapLastRect.left = this._mapRect.left, this._mapLastRect.right = this._mapRect.right);
}

view.prototype.clipViewPortNew = function() {
    for (var t = this.grid.row, e = this.grid.col, i = 0; i < t; i++) for (var s = 0; s < e; s++) s >= this._mapRect.left && s <= this._mapRect.right && i >= this._mapRect.bottom && i <= this._mapRect.top ? this.showGrid(s, i) : this.hideGrid(s, i);
}

view.prototype.clipViewPort = function() {
    var t, e, i = 0, s = 0;
    if (this._mapRect.left > this._mapLastRect.left) {
        if ((i = this._mapRect.left - this._mapLastRect.left) > 0) for (e = this._mapLastRect.left; e < this._mapLastRect.left + i; e++) for (t = this._mapLastRect.bottom; t <= this._mapLastRect.top; t++) this.hideGrid(e, t);
    } else if ((s = Math.min(this._mapLastRect.left, this._mapRect.right + 1) - this._mapRect.left) > 0) for (e = this._mapRect.left; e < this._mapRect.left + s; e++) for (t = this._mapRect.bottom; t <= this._mapRect.top; t++) this.showGrid(e, t);
    if (this._mapRect.right > this._mapLastRect.right) {
        if ((s = this._mapRect.right - this._mapLastRect.right) > 0) for (e = Math.max(this._mapLastRect.right + 1, this._mapRect.left); e <= this._mapLastRect.right + s; e++) for (t = this._mapRect.bottom; t <= this._mapRect.top; t++) this.showGrid(e, t);
    } else if ((i = this._mapLastRect.right - this._mapRect.right) > 0) for (e = this._mapRect.right + 1; e <= this._mapRect.right + i; e++) for (t = this._mapLastRect.bottom; t <= this._mapLastRect.top; t++) this.hideGrid(e, t);
    if (this._mapRect.bottom > this._mapLastRect.bottom) {
        if ((i = this._mapRect.bottom - this._mapLastRect.bottom) > 0) for (t = this._mapLastRect.bottom; t < this._mapLastRect.bottom + i; t++) for (e = this._mapLastRect.left; e <= this._mapLastRect.right; e++) this.hideGrid(e, t);
    } else if ((s = Math.min(this._mapLastRect.bottom, this._mapRect.bottom + 1) - this._mapRect.bottom) > 0) for (t = this._mapRect.bottom; t < this._mapRect.bottom + s; t++) for (e = this._mapRect.left; e <= this._mapRect.right; e++) this.showGrid(e, t);
    if (this._mapRect.top > this._mapLastRect.top) {
        if ((s = this._mapRect.top - this._mapLastRect.top) > 0) for (t = Math.max(this._mapLastRect.top + 1, this._mapRect.bottom); t <= this._mapLastRect.top + s; t++) for (e = this._mapRect.left; e <= this._mapRect.right; e++) this.showGrid(e, t);
    } else if ((i = this._mapLastRect.top - this._mapRect.top) > 0) for (t = this._mapRect.top + 1; t <= this._mapRect.top + i; t++) for (e = this._mapLastRect.left; e <= this._mapLastRect.right; e++) this.hideGrid(e, t);
}

view.prototype.showGrid = function(t, e) {
    this.grid.show(t, e);
}

view.prototype.hideGrid = function(t, e) {
    this.grid.hide(t, e);
}

view.prototype.localToGrid = function(t) {
    return this.grid.toGridXY(t);
}

view.prototype.gridToLocal = function(t) {
    return this.grid.toLocalXY(t);
}

view.prototype.getCell = function(t) {
    return this.grid.getCell(t);
}

view.prototype.addUnit = function(t, e, i) {
    this.grid.addUnit(t, e, i);
}

view.prototype.addUnitLocal = function(t, e, i) {
    var s = this.localToGrid(e);
    this.grid.addUnit(t, s, i);
}

view.prototype.removeUnit = function(t) {
    this.grid.removeUnit(t);
}

view.prototype.getUnit = function(t) {
    return this.grid.getUnit(t);
}

view.prototype.removeAllUnits = function() {
    this.grid.removeAllUnits();
}

view.prototype.scaleXY = function(t, e) {
    if (this.content) {
        this.content.stopAllActions();
        var i = this.content.scale, s = this.content.getPosition();
        s.divSelf(i), s.mulSelf(t);
        var o = cc.sequence(cc.spawn(cc.scaleTo(.5, t), cc.moveTo(.5, s)), cc.callFunc(e));
        this.content.runAction(o);
    }
}

view.prototype.clear = function() {
    this.grid.clear(), this.content && (this.content.stopAllActions(), this.content.setScale(1));
}

view.prototype.reset = function() {
    this.grid.reset(), this._mapRect.clear(), this._mapLastRect.top = this._mapLastRect.bottom = this._mapLastRect.left = this._mapLastRect.right = -1, 
    this.centerViewPort();
}

view.prototype.clearAll = function() {
    this._mapRect.clear(), this._mapLastRect.clear(), this.rect.set(0, 0, 0, 0), this.clear();
}

module.exports = {
    Viewing: view
};

var n = function() {
    this.clear();
};

n.prototype.clear = function() {
    this.left = this.top = this.right = this.bottom = 0;
}