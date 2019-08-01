 cc.Class({
    extends: cc.Component,
    properties: {
        hintParent: cc.Node,
        hintPrefab: cc.Prefab,
        killParent: cc.Node,
        killPrefab: cc.Prefab
    },
    onLoad: function() {
        ss.tips = this, this.hid = 0, this.hList = [], this.hints = new ss.NodePool(), this.kid = 0, 
        this.kList = [], this.kills = new ss.NodePool(), this.qPlaying = !1, this.qTimeStamp = 0, 
        this.queues = [], this.kPlaying = !1, this.kTimeStamp = 0, this.kQueues = [];
    },
    start: function() {
        this.hints.initialize("Hint", this.hintPrefab, this.hintParent), this.hints.preview(5), 
        this.kills.initialize("Kill", this.killPrefab, this.killParent), this.kills.preview(3);
    },
    update: function(t) {
        this._qPlay(), this._kPlay();
    },
    _qPlay: function() {
        this.qPlaying && (0 != this.queues.length ? (this.qTimeStamp += dt, this.qTimeStamp >= .2 && (this.qTimeStamp = 0, 
        this.queues.shift(), this.queues.length > 0 && this.showHint(this.queues[0]))) : this.qPlaying = !1);
    },
    _kPlay: function() {
        this.kPlaying && (0 != this.kQueues.length ? (this.kTimeStamp += dt, this.kTimeStamp >= .25 && (this.kTimeStamp = 0, 
        this.kQueues.shift(), this.kQueues.length > 0 && this.showKill(this.kQueues[0]))) : this.kPlaying = !1);
    },
    showHint: function(t) {
        var e = this.hid++, i = {
            id: e,
            index: this.hList.length,
            tips: this,
            param: t
        };
        this.hList.push(e), this.hints.create(i);
    },
    showHintQueue: function(t) {
        this.queues.push(t), 1 == this.queues.length && this.showHint(this.queues[0]), this.qPlaying = !0;
    },
    hideHint: function(t) {
        var e = this.hList.indexOf(t);
        e > -1 && this.hList.splice(e, 1), this.hints.recover(t, !0);
    },
    clearHints: function() {
        this.hints.removeAll(), this.queues.length = 0;
    },
    showKill: function(t) {
        var e = this.kid++, i = {
            id: e,
            index: this.kList.length,
            tips: this,
            param: t
        };
        this.kList.push(e), this.kills.create(i);
    },
    showKillQuene: function(t) {
        this.kQueues.push(t), 1 == this.kQueues.length && this.showKill(this.queues[0]), 
        this.qPlaying = !0;
    },
    hideKill: function(t) {
        var e = this.kList.indexOf(t);
        e > -1 && this.kList.splice(e, 1), this.kills.recover(t, !0);
    }
}) 