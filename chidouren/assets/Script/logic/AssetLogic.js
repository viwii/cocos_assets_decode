var s = function() {};
s.prototype.getPacmanClip = function(t) {
    return ss.asset.pacmanClips.clips[t];
}, 
s.prototype.getPacmanIcon = function(t) {
    var e = parseInt(t.split("_")[1]);
    return ss.asset.pacmanIcons.frames[e];
}; 

module.exports = {
    AssetLogic: s
}