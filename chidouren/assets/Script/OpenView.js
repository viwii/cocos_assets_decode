 cc.Class({
        extends: cc.Component,
        properties: {
            killLab: cc.Label,
            numLab: cc.Label
        },
        onLoad: function() {
            this.popUp = this.node.getComponent("PopUp"), this.data = null;
        },
        start: function() {
            this.node.active = !1;
        },
        show: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            this.data = t;
            var e = ss.commonUtils.clone(ss.config.popup);
            e.opacity = 255, e.isEffect = !0, this.popUp.show(e);
            var i = ss.logic.info.getOpenForeverData(), s = ss.config.openForever;
            this.killLab.string = "≥" + s.kill, this.numLab.string = Math.min(i.num, s.num) + "/" + s.num;
        },
        close: function() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0], this.popUp.close(), 
            this.data = null;
        },
        goto: function() {
            ss.state.isPreving() && (this.close(), ss.logic.game.callMode(ss.enum.gameMode.solo));
        },
        back: function() {
            this.data && this.data.from && cc.systemEvent.emit(ss.event.client.openView, {
                type: this.data.from
            }), this.close();
        }
    }) 