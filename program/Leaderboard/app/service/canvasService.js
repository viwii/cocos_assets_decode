function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var a = e[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, i, a) {
        return i && t(e.prototype, i), a && t(e, a), e;
    };
}(), i = require("../util/utils"), a = null;

module.exports.getInstance = function() {
    return null == a && (a = new n()), a;
};

var n = function() {
    function a() {
        t(this, a), this.canvas = wx.getSharedCanvas(), this.ctx = this.canvas.getContext("2d"), 
        this.ctx.imageSmoothingEnabled = !0, this.ctx.imageSmoothingQuality = "high", this.curId = 0, 
        this.pos = {
            left: 0,
            top: 0,
            width: 1e3,
            height: 1e3
        };
    }
    return e(a, [ {
        key: "setLayout",
        value: function(t) {
            this.setDefaultLayout();
            for (var e in t) this.ctx[e] = t[e];
        }
    }, {
        key: "setDefaultLayout",
        value: function() {
            var t = {
                fillStyle: "#ffffff",
                textAlign: "middle",
                baseLine: "middle",
                font: "20px Helvetica"
            };
            for (var e in t) this.ctx[e] = t[e];
        }
    }, {
        key: "drawText",
        value: function(t, e, a, n, r) {
            i.invokeCb(r), t === this.curId ? (this.setLayout(a), this.ctx.fillText(e, n.left, n.top, n.width)) : console.log("drawText faild", t, this.curId);
        }
    }, {
        key: "drawImage",
        value: function(t, e, a, n) {
            var r = this;
            if (t === this.curId) {
                var o = wx.createImage();
                o.src = e, o.onload = function() {
                    t === r.curId && (r.ctx.drawImage(o, a.left, a.top, a.width, a.height), i.invokeCb(n));
                };
            } else console.log("drawImage faild", t, this.curId);
        }
    }, {
        key: "clearCtx",
        value: function(t) {
            t === this.curId ? this.clearRect(this.pos) : console.log("clearCtx faild", t, this.curId);
        }
    }, {
        key: "clearRect",
        value: function(t) {
            this.ctx.clearRect(t.left, t.top, t.width, t.height);
        }
    }, {
        key: "createCanvas",
        value: function(t) {
            i.isValidValue(t) && (this.pos = t), this.clearRect(this.pos);
            var e = Math.floor((this.curId + 1) % 99999999);
            return this.curId = e, e;
        }
    } ]), a;
}();