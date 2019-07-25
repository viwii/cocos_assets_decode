
var s = {
    ready: 0,
    init: 1,
    prev: 2,
    play: 3,
    pause: 4,
    over: 5,
    current: 0,
    onInit: function() {
        s.current = s.init;
    },
    onPrev: function() {
        s.current = s.prev;
    },
    onPlay: function() {
        s.current = s.play;
    },
    onPause: function() {
        s.current == s.play && (s.current = s.pause);
    },
    onResume: function() {
        s.current == s.pause && (s.current = s.play);
    },
    onOver: function() {
        s.current = s.over;
    },
    isPlaying: function() {
        return s.current == s.play;
    },
    isPreving: function() {
        return s.current >= s.prev;
    }
};
module.exports = {
    State: s
}