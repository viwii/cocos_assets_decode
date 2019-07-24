var E = module.exports;

E.RANK_PARAM_PREFIX = "score", E.RANK_ID = {
    USER_MAXSTAGE: "USER_MAXSTAGE"
}, E.RANK_TYPE = {
    FRIEND: "FRIEND"
}, E.RANK_DATE = {
    DAY: "DAY",
    WEEK: "WEEK",
    MONTH: "MONTH",
    FOREVER: "FOREVER"
};

var A = {};

A[E.RANK_ID.USER_MAXSTAGE] = {
    date: E.RANK_DATE.FOREVER,
    sortList: [ !0 ],
    limit: 100
}, E.RANK_CONF = {}, E.RANK_CONF[E.RANK_TYPE.FRIEND] = A, E.RANK_STYLE = {
    VERTICAL: "VERTICAL",
    HORIZONTAL: "HORIZONTAL"
}, E.RANK_VIEWID = {
    STAGE_VIEW1: "STAGE_VIEW1",
    STAGE_VIEW2: "STAGE_VIEW2",
    STAGE_VIEW3: "STAGE_VIEW3",
    ABILITY_VIEW1: "ABILITY_VIEW1"
}, E.RANK_VIEWTYPE = {
    NORMAL: "RANK",
    RANGE: "RANGE",
    BEYOND: "BEYOND"
}, E.VIEW_SELF_STYLE = {
    TOP: "TOP",
    BOTTOM: "BOTTOM"
};

var I = {};

I[E.RANK_VIEWID.STAGE_VIEW1] = {
    rankId: E.RANK_ID.USER_MAXSTAGE,
    style: E.RANK_STYLE.VERTICAL,
    pageCount: 4,
    itemSpan: 72,
    pageItem: require("./item/stageItem1"),
    selfStyle: E.VIEW_SELF_STYLE.BOTTOM,
    selfSpan: 76,
    selfItem: require("./item/stageItem2")
};

var R = {}, N = {};

N[E.RANK_VIEWID.STAGE_VIEW3] = {
    rankId: E.RANK_ID.USER_MAXSTAGE,
    style: E.RANK_STYLE.VERTICAL,
    pageItem: require("./item/stageItem1"),
    selfStyle: E.VIEW_SELF_STYLE.BOTTOM,
    selfSpan: 100,
    selfItem: require("./item/stageItem2")
}, E.RANK_VIEWCONF = {}, E.RANK_VIEWCONF[E.RANK_VIEWTYPE.NORMAL] = I, E.RANK_VIEWCONF[E.RANK_VIEWTYPE.RANGE] = R, 
E.RANK_VIEWCONF[E.RANK_VIEWTYPE.BEYOND] = N;