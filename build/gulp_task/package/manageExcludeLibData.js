var wdCb = require("wdcb");
var arrayUtils = require("../common/arrayUtils");



var ExcludeLib = {
    WD_COMMONLIB: "Wonder-CommonLib",
    WD_FRP: "Wonder-FRP",
    BOWSER: "bowser",
    CHAI: "chai",
    RSVP: "rsvp",
    CANNON: "cannon"
};

function getAllLibs() {
    var combineDTsList = [
            ExcludeLib.WD_COMMONLIB,
            ExcludeLib.WD_FRP,
            ExcludeLib.BOWSER,
            ExcludeLib.CHAI,
            ExcludeLib.RSVP,
            ExcludeLib.CANNON
        ],
        combineContentList = [
            ExcludeLib.WD_COMMONLIB,
            ExcludeLib.WD_FRP,
            ExcludeLib.BOWSER,
            ExcludeLib.CHAI,
            ExcludeLib.RSVP,
            ExcludeLib.CANNON
        ];

    return {
        combineDTsList: combineDTsList,
        combineContentList: combineContentList
    }
}

function getExcludeLibData(excludeLibData, removeLibArr) {
    var excludeLibsArr = null,
        allLibs = getAllLibs(),
        combineDTsList = allLibs.combineDTsList,
        combineContentList = allLibs.combineContentList;

    excludeLibsArr = removeLibArr || [];

    if(wdCb.JudgeUtils.isString(excludeLibData)){
        if(excludeLibData !== ""){
            excludeLibsArr = excludeLibsArr.concat(excludeLibData.split(','));
        }
    }
    else{
        excludeLibsArr = excludeLibsArr.concat(excludeLibData);
    }

    excludeLibsArr = arrayUtils.removeRepeatItems(excludeLibsArr);

    return {
        combineDTsList: combineDTsList.filter(function(dtsName){
            return excludeLibsArr.indexOf(dtsName) === -1;
        }),
        combineContentList: combineContentList.filter(function(contentName){
            return excludeLibsArr.indexOf(contentName) === -1;
        })
    };
}




module.exports = {
    ExcludeLib: ExcludeLib,

    getExcludeLibData: getExcludeLibData
};
