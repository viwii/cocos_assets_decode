 cc.Class({
    extends: cc.Component,
    properties: {
        bg: cc.Node,
        image: cc.Sprite,
        imgLabel: cc.Label,
        richText: cc.RichText,
        strLabel: cc.Label
    },
    ctor: function() {
        this.data = null, this.params = null, this.playing = !1;
    },
    onLoad: function() {
        this.richText.node.on(cc.Node.EventType.SIZE_CHANGED, this._labSizeChange, this), 
        this.strLabel.node.on(cc.Node.EventType.SIZE_CHANGED, this._labSizeChange, this);
    },
    start: function() {},
    init: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        this.data = t, this.params = e, this.node.active = !0, this.node.stopAllActions(), 
        this.node.opacity = 255, this.node.setScale(.5, .5), this.node.setPosition(cc.v2());
        var i = t.param, s = i.msg.indexOf("color") > -1;
        this.richText.node.active = s, this.strLabel.node.active = !s, t.image ? (this.image.spriteFrame = i.image, 
        this.imgLabel.string = i.msg, this.richText.string = "") : (this.image.spriteFrame = null, 
        this.imgLabel.string = "", s ? this.richText.string = i.msg : this.strLabel.string = i.msg), 
        this._labSizeChange();
    },
    play: function() {
        this.playing = !0;
        var t = cc.sequence(cc.scaleTo(.1, 1), cc.moveTo(.35, cc.v2(0, 60)).easing(cc.easeBackOut(1)), cc.delayTime(.8), cc.fadeTo(.2, 1), cc.callFunc(this.onFinish, this));
        this.node.runAction(t);
    },
    onFinish: function() {
        this.data && this.data.tips.hideHint(this.data.id);
    },
    clear: function() {
        this.data = null, this.params = null, this.playing = !1, this.node.stopAllActions();
    },
    _labSizeChange: function() {
        if (this.data) {
            var t = 300;
            this.data.image || (t = this.richText.node.active ? this.richText.node.width + 30 : this.strLabel.node.width + 30), 
            this.bg.width = Math.max(t, 300);
        }
    }
}) 