var wdCb = require("wdcb");
var arrayUtils = require("../common/arrayUtils");



var ExcludeLib = {
    WD_COMMONLIB: {
        variableName: "wdCb",
        keyword: "Wonder-CommonLib",
        path: "../lib/inner/Wonder-CommonLib/dist/wdCb.node.js"
    },
    WD_FRP: {
        variableName: "wdFrp",
        keyword: "Wonder-FRP",
        path: "../lib/inner/Wonder-FRP/dist/wdFrp.node.js"
    },
    BOWSER: {
        variableName: "bowser",
        keyword: "bowser",
        path: "../lib/inner/bowser/bowser.js"
    },
    CHAI: {
        variableName: "chai",
        keyword: "chai",
        /*!
        not use chai in inner lib.
        because it's error! use nodejs->chai instead
         */
        path: "chai"
    },
    RSVP: {
        variableName: "RSVP",
        keyword: "rsvp",
        path: "../lib/inner/rsvp/rsvp.js"
    },
    CANNON:{
        variableName: "CANNON",
        keyword: "cannon",
        path: "../lib/outer/cannon/cannon.js"
    }
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
        combineDTsList: combineDTsList.filter(function(data){
            return excludeLibsArr.indexOf(data) === -1;
        }),
        combineContentList: combineContentList.filter(function(data){
            return excludeLibsArr.indexOf(data) === -1;
        })
    };
}



function getExcludeLibDataByCustomPackage(excludeLibData, removeLibArr) {
    var excludeLibsArr = null,
        allLibs = getAllLibs(),
        combineDTsList = allLibs.combineDTsList,
        combineContentList = allLibs.combineContentList;

    excludeLibsArr = removeLibArr;

    if(excludeLibData !== ""){
        excludeLibsArr = excludeLibsArr.concat(excludeLibData.split(','));
    }

    excludeLibsArr = arrayUtils.removeRepeatItems(excludeLibsArr);

    return {
        combineDTsList: combineDTsList.filter(function(data){
            return excludeLibsArr.indexOf(data.keyword) === -1;
        }),
        combineContentList: combineContentList.filter(function(data){
            return excludeLibsArr.indexOf(data.keyword) === -1;
        })
    };
}






module.exports = {
    ExcludeLib: ExcludeLib,

    getExcludeLibData: getExcludeLibData,
    getExcludeLibDataByCustomPackage: getExcludeLibDataByCustomPackage
};
