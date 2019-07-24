var n = module.exports, e = require("../domain/rank/rankViewMgr").getInstance();

n.draw = function(n) {
    var o = e.getView(n.viewId);
    null != o ? o.draw(n.param) : console.log("draw unknown view", n);
}, n.turnPage = function(n) {
    var o = e.getView(n.viewId);
    null != o ? o.turnPage(n.count) : console.log("turnPage unknown view", n);
}, n.beginBeyond = function(n) {
    var o = e.getView(n.viewId);
    null != o ? o.beginBeyond() : console.log("beginBeyond unknown view", n);
};