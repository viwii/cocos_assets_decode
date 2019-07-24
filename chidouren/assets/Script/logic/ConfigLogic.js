var s = function() {
    this.fileName = "table";
};

s.prototype.getSheet = function(t) {
    return ss.custom.getSheet(this.fileName, t);
}, s.prototype.getSheetData = function(t, e) {
    return ss.custom.getSheetData(this.fileName, t, e);
}, s.prototype.getSheetFristId = function(t) {
    return ss.custom.getSheetFristId(this.fileName, t);
}, s.prototype.getSheetLastId = function(t) {
    return ss.custom.getSheetLastId(this.fileName, t);
};

module.exports = {
    ConfigLogic: s
}