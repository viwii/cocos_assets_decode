 cc.Class({
    extends: cc.Component,
    properties: {
        lifeNode: cc.Node,
        chocolateNode: cc.Node,
        sweetNode: cc.Node,
        shitNode: cc.Node
    },
    onLoad: function() {
        // this.life = this.lifeNode.getComponent("BuffItem"); 
        // this.chocolate = this.chocolateNode.getComponent("BuffItem"); 
        // this.sweet = this.sweetNode.getComponent("BuffItem"); 
        // this.shit = this.shitNode.getComponent("BuffItem"); 
        // this._methods = {}; 
        // this._methods.add = this._onBuffAdd.bind(this); 
        // this._methods.update = this._onBuffUpdate.bind(this); 
        // this._methods.remove = this._onBuffRemove.bind(this); 
        // this._comps = {}; 
        // this._comps[ss.enum.gameEgg.chocolate] = this.chocolate; 
        // this._comps[ss.enum.gameEgg.sweet] = this.sweet;
        // this._comps[ss.enum.gameEgg.shit] = this.shit; 
        // this._comps[ss.enum.gameEgg.love] = this.life;
    },
    start: function() {
        this.node.active = !1;
    },
    init: function(t) {
        this.setVisible(!0), this.clearBuff();
    },
    setVisible: function(t) {
        this.node.active = t;
    },
    setData: function(t) {
        if (this._methods) {
            var e = this._methods[t.method];
            e && e(t.type, t.time);
        }
    },
    _onBuffAdd: function(t, e) {
        if (this._comps) {
            var i = this._comps[t];
            i && (i.setVisible(!0), i.setNum(e));
        }
    },
    _onBuffUpdate: function(t, e) {
        if (this._comps) {
            var i = this._comps[t];
            i && i.setNum(e);
        }
    },
    _onBuffRemove: function(t, e) {
        if (this._comps) {
            var i = this._comps[t];
            i && (i.setVisible(!1), i.setNum(e));
        }
    },
    reset: function() {
        this.chocolate.clear(), this.sweet.clear(), this.shit.clear();
    },
    clear: function() {
        this.node.active = !1, this.clearBuff();
    },
    clearBuff: function() {
        this.life.clear(), this.chocolate.clear(), this.sweet.clear(), this.shit.clear();
    }
}) 