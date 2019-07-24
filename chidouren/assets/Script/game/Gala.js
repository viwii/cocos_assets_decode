var s = require("./galagala/Outlooking"); 
var o = require("./galagala/Rassling");

var n = function() {
    this.outlooking = new s.Outlooking(); 
    this.rassling = new o.Rassling();
};
n.prototype.init = function(t) {
    this.outlooking.init(t.outlooking); 
    this.rassling.init(t.rassling);
}, 
n.prototype.createAll = function() {
    this.rassling.play();
}, 
n.prototype.clearAll = function() {
    this.outlooking.clear(); 
    this.rassling.stop();
}, 
n.prototype.addSmart = function(t, e) {
    this.outlooking.addSmart(t, e);
}, 
n.prototype.removeSmart = function(t) {
    this.outlooking.removeSmart(t);
}, 
n.prototype.removeAllSmarts = function() {
    this.outlooking.removeAllSmarts();
}; 

module.exports = {
    Gala: n
}