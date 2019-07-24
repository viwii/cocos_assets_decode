function n(n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function n(n, e) {
        for (var t = 0; t < e.length; t++) {
            var a = e[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(n, a.key, a);
        }
    }
    return function(e, t, a) {
        return t && n(e.prototype, t), a && n(e, a), e;
    };
}(), t = require("../user/user").getInstance(), a = require("./rankMgr").getInstance(), i = require("./rankCanvas"), o = function() {
    function o(e, a) {
        n(this, o), this.uid = t.getData("uid"), this.viewId = e, this.conf = a, this.beyondDatas = null, 
        this.beyondIndex = -1;
    }
    return e(o, [ {
        key: "init",
        value: function() {}
    }, {
        key: "beginBeyond",
        value: function() {
            var n = a.getRank(this.conf.rankId).getRank();
            this.beyondDatas = n.getKeyBeyondRange(this.uid), this.beyondDatas.length <= 0 ? this.beyondIndex = -1 : this.beyondIndex = this.beyondDatas.length - 1;
        }
    }, {
        key: "draw",
        value: function(n) {
            if (null == this.beyondDatas && this.beginBeyond(), !(this.beyondIndex < 0)) {
                var e = a.getRank(this.conf.rankId).getRank();
                if (!(e.cmpRankData(n.beyondData, this.beyondDatas[this.beyondIndex]) <= 0)) {
                    for (var t = e.getKeyInfo(this.uid), o = this.beyondIndex - 1; o >= 0; o--) if (e.cmpRankData(n.beyondData, this.beyondDatas[o]) <= 0) return this.beyondIndex = o, 
                    void i.drawPage(this.conf, [ this.beyondDatas[o + 1] ], t, this.conf.timeout);
                    this.beyondIndex = -1, i.drawPage(this.conf, [ this.beyondDatas[0] ], t, this.conf.timeout);
                }
            }
        }
    } ]), o;
}();

module.exports = o;