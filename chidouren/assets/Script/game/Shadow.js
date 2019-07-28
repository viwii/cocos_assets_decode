 cc.Class({
    extends: cc.Component,
    properties: {},
    ctor: function() {
        this.data = null, this.params = null, this.playing = !1;
    },
    onLoad: function() {},
    start: function() {},
    update: function(t) {},
    preview: function(t) {},
    init: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        this.data = t, this.params = e, this.node.setPosition(t.pos), this.node.setContentSize(t.size), 
        this.node.setScale(t.scaleX, t.scaleY), this.node.rotation = t.rotation, this.node.opacity = 120, 
        this.node.zIndex = 4;
        var i = ss.logic.config.getSheetData(ss.enum.sheet.goods, t.mid || 20001), s = i && i.item_id ? i.item_id : 20001, o = ss.logic.config.getSheetData(ss.enum.sheet.item, s);
        this.node.getComponent(cc.Sprite).spriteFrame = ss.logic.asset.getPacmanIcon(o.icon);
    },
    play: function() {
        var t = this;
        this.playing = !0, this.node.stopAllActions();
        var e = cc.sequence(cc.fadeTo(.3, 0), cc.callFunc(function() {
            t.data && ss.logic.game.bulu.recoverShadow(t.data.id);
        }));
        this.node.runAction(e);
    },
    clear: function() {
        this.data = null, this.params = null, this.playing = !1, this.node.opacity = 255, 
        this.node.setScale(1), this.node.stopAllActions();
    },
    removeTarget: function(t) {
        this.data && this.data.target == t && ss.logic.game.bulu.recoverShadow(this.data.id);
    }
}) 