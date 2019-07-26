 cc.Class({
    extends: cc.Component,
    properties: {
        nameLab: cc.Label,
        scoreLab: cc.Label,
        content: cc.Node,
        indexBg: cc.Node
    },
    ctor: function() {
        this.comps = null;
    },
    onLoad: function() {},
    start: function() {},
    show: function(t) {},
    hide: function() {},
    clear: function() {
        this.nameLab.string = "", this.scoreLab.string = "", this.indexBg.active = !1;
    },
    setData: function(t) {
        var e = t.items;
        if (e) {
            for (var i, s, o = "", n = "", a = 0, r = Math.min(10, e.length); a < r; a++) (i = e[a]) && (o += i.name + "\n", 
            n += (s = Math.floor(i.grow)) < 100 ? "  " + s + "\n" : s < 1e3 ? " " + s + "\n" : s + "\n", 
            i.isColor && this.indexBg && this.content && (this.indexBg.active = !0, this.indexBg.y = this.content.y - this.indexBg.height / 2 - a * this.indexBg.height - 5));
            this.nameLab && (this.nameLab.string = o), this.scoreLab && (this.scoreLab.string = n);
        }
    }
}) 