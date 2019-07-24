var n = require("../domain/user/user").getInstance(), e = require("../domain/rank/rankMgr").getInstance(), r = require("../domain/rank/rankViewMgr").getInstance();

module.exports.login = function(i) {
    n.init(i.uid, i.nickName, i.avatarUrl), e.init(), r.init();
};