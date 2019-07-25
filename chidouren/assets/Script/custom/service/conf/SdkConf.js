
var s = require("../const/SdkConst"), o = function() {};
module.exports = {
	SdkConf: o
}, o.SDK_CONF = {};
var n = s.SdkConst.CONF_TYPE, a = s.SdkConst.PLATFORM_TYPE;
o.SDK_CONF[n.DEFAULT] = a.COCOS, o.SDK_CONF[n.NORMAL] = a.WECHAT, o.SDK_CONF[n.HTTP] = a.WECHAT  
        