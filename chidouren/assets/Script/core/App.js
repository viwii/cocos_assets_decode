 module.exports = {
    App: {
        isLoaded: !1
    }
}, window.isWeiXin = "undefined" != typeof wx, window.ss = {
    isLog: !0,
    log: function(t) {
        if (ss.isLog) {
            for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++) i[s - 1] = arguments[s];
            console.log.apply(console, [ t ].concat(i));
        }
    },
    info: function(t) {
        if (ss.isLog) {
            for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++) i[s - 1] = arguments[s];
            console.info.apply(console, [ t ].concat(i));
        }
    },
    warn: function(t) {
        for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++) i[s - 1] = arguments[s];
        console.warn.apply(console, [ t ].concat(i));
    },
    error: function(t) {
        for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++) i[s - 1] = arguments[s];
        console.error.apply(console, [ t ].concat(i));
    },
    _uid: 0,
    getUid: function() {
        return ++ss._uid;
    },
    byte64: null,
    commonUtils: null,
    dateUtils: null,
    randomUtils: null,
    timeUtils: null,
    dirUtils: null,
    Resize: null,
    Dictionary: null,
    NodePool: null,
    Big: null,
    ferrari: null,
    proxy: null,
    config: null,
    state: null,
    enum: null,
    facade: null,
    command: null,
    boot: null,
    data: null,
    vo: null,
    mask: null,
    server: null,
    http: null,
    rom: null,
    event: null,
    custom: null,
    logic: null,
    extends: null,
    sound: null,
    asset: null,
    tips: null,
    panel: null
} 