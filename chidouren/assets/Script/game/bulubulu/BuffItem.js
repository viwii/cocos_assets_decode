 cc.Class({
    extends: cc.Component,
    properties: {
        numLab: cc.Label
    },
    ctor: function() {
        this.isLoaded = false;
    },
    onLoad: function() {},
    start: function() {
        this.isLoaded || (this.node.active = !1);
    },
    setVisible: function(t) {
        this.isLoaded = true, this.node.active = t;
    },
    setNum: function(t) {
        this.numLab.string = "" + t;
    },
    clear: function() {
        this.numLab.string = "", this.node.active = !1;
    }
}) 