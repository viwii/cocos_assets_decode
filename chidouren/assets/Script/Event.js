var s = {};
s.system = {
    GameInit: "systemGameInit",
    GamePlay: "systemGamePlay",
    GamePause: "systemGamePause",
    GameOver: "systemGameOver",
    UserData: "systemUserData",
    GameData: "systemGameData",
    GameClear: "systemGameClear",
    GameReset: "systemGameReset",
    AdBanner: "systemAdBanner",
    AdVideo: "systemAdVideo",
    AdInterstitial: "AdInterstitial"
}, 
s.protocol = {
    ReqGamePlay: "protocolReqGamePlay",
    ReqGameOver: "protocolReqGameOver",
    ReqAddMoney: "protocolReqAddMoney",
    ReqUpdateSign: "protocolReqUpdateSign",
    ReqSetMisc: "protocolReqSetMisc",
    ReqSetGoods: "protocolReqSetGoods",
    ReqAddScore: "protocolReqAddScore"
}, 
s.cmd = {
    Startup: "cmdStartup",
    GameInit: "cmdGameInit",
    GamePlay: "cmdGamePlay",
    GamePause: "cmdGamePause",
    GameOver: "cmdGameOver",
    UserData: "cmdUserData",
    GameData: "cmdGameData",
    GameClear: "cmdGameClear",
    GameReset: "cmdGameReset",
    AddMoney: "cmdAddMoney",
    UpDateSign: "cmdUpdateSign",
    SetMisc: "cmdSetMisc",
    SetGoods: "cmdSetGoods",
    AddScore: "cmdAddScore"
}, 
s.client = {
    openFunc: "clientOpenFunc",
    addMoney: "clientAddMoney",
    openView: "clientOpenView",
    closeView: "clientCloseView",
    closeAllView: "clientCloseAllView",
    setGoods: "clientSetGoods",
    setRed: "clientSetRed",
    setExport: "clientSetExport"
}, 
s.ald = {
    open: "open",
    login: "login",
    start_game: "start_game",
    sendShare: "sendShare",
    clickShare: "clickShare"
};

module.exports = {
    Event: s
}