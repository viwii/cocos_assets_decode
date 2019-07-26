 cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: 99999
    },
    properties: {},
    onLoad: function() {},
    start: function() {
        ss.logic.ald.startGame(), ss.boot.execute(function() {
            ss.command.startup();
        });
    }
}) 