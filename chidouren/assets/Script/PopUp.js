 cc.Class({
    extends: cc.Component,
    properties: {
        mask: cc.Node,
        content: cc.Node
    },
    ctor: function() {
        this.data = null;
    },
    start: function() {},
    show: function(t) {
        if (this.data = t || ss.config.popup, this.node.active = !0, this.content.stopAllActions(), 
        this.unscheduleAllCallbacks(), this.data.isEffect) {
            this.content.setScale(.5);
            var e = cc.scaleTo(.5, 1, 1).easing(cc.easeElasticOut(1));
            this.content.runAction(e);
        } else this.content.setScale(1);
        this.mask && (this.mask.opacity = this.data.opacity ? this.data.opacity : 180), 
        this.data.isOpenShowBanner ? (this.data.isOpenChangeBanner && ss.logic.open.hideBanner(), 
        this.delayShowBanner(this.data.bannerDelayTime)) : this.data.isOpenHideBanner && ss.logic.open.hideBanner();
    },
    delayShowBanner: function(t) {
        0 == t ? ss.logic.open.showBanner() : this.scheduleOnce(function() {
            ss.logic.open.showBanner();
        }, t);
    },
    hide: function() {
        this.node.active = !1, this.content.stopAllActions(), this.data && this.data.isCloseBanner && ss.logic.open.hideBanner(), 
        this.data = null;
    },
    close: function() {
        this.hide();
    }
})