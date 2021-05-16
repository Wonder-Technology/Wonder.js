'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var FetchCommon$Wonderjs = require("../../../../../src/asset/FetchCommon.js");
var LoadABSystem$Wonderjs = require("../../../../../src/asset_bundle/import/LoadABSystem.js");
var ImportABSystem$Wonderjs = require("../../../../../src/asset_bundle/import/ImportABSystem.js");
var GenerateAllABTool$Wonderjs = require("./GenerateAllABTool.js");
var ImmutableHashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableHashMapService.js");

function getRabRelativePaths(param) {
  return /* tuple */[
          "rab1.rab",
          "rab2.rab",
          "rab3.rab"
        ];
}

function buildWholeHashIdMap(param, param$1) {
  return ImmutableHashMapService$WonderCommonlib.set(param[2], param$1[2], ImmutableHashMapService$WonderCommonlib.set(param[1], param$1[1], ImmutableHashMapService$WonderCommonlib.set(param[0], param$1[0], ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0))));
}

function getHashId2(param) {
  return "h2";
}

function buildWholeDependencyRelationMap(param) {
  return GenerateAllABTool$Wonderjs.buildDependencyRelation(/* array */[/* array */[
                param[2],
                param[1],
                param[0]
              ]]);
}

function buldWholeManifest($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var rabRelativePaths = $staropt$star !== undefined ? $staropt$star : getRabRelativePaths(/* () */0);
  var wholeHashIdMap = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : buildWholeHashIdMap(rabRelativePaths, /* tuple */[
          "h1",
          "h2",
          "h3"
        ]);
  var wholeDependencyRelationMap = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : buildWholeDependencyRelationMap(rabRelativePaths);
  var version = $staropt$star$3 !== undefined ? $staropt$star$3 : "";
  return /* record */[
          /* version */version,
          /* wholeHashIdMap */wholeHashIdMap,
          /* wholeDependencyRelationMap */wholeDependencyRelationMap
        ];
}

function loadAllDependencyRABAndSetToState(abRelativePath, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var wholeManifest = $staropt$star !== undefined ? $staropt$star : buldWholeManifest(getRabRelativePaths(/* () */0), Caml_option.some(buildWholeHashIdMap(getRabRelativePaths(/* () */0), /* tuple */[
                  "h1",
                  "h2",
                  "h3"
                ])), Caml_option.some(buildWholeDependencyRelationMap(getRabRelativePaths(/* () */0))), undefined, /* () */0);
  var getAssetBundlePathFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : (function () {
        return "";
      });
  var isAssetBundleArrayBufferCachedFunc = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : LoadABSystem$Wonderjs.isAssetBundleArrayBufferCached;
  var getAssetBundleArrayBufferCacheFunc = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : LoadABSystem$Wonderjs.getAssetBundleArrayBufferCache;
  var cacheAssetBundleArrayBufferFunc = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : LoadABSystem$Wonderjs.cacheAssetBundleArrayBuffer;
  var fetchFunc = $staropt$star$6 !== undefined ? Caml_option.valFromOption($staropt$star$6) : FetchCommon$Wonderjs.fetch;
  return ImportABSystem$Wonderjs.RAB[/* loadAllDependencyRABAndSetToState */1](abRelativePath, wholeManifest, /* tuple */[
              getAssetBundlePathFunc,
              isAssetBundleArrayBufferCachedFunc,
              getAssetBundleArrayBufferCacheFunc,
              cacheAssetBundleArrayBufferFunc,
              fetchFunc
            ]);
}

function assembleAllDependencyRAB(abRelativePath, $staropt$star, param) {
  var wholeDependencyRelationMap = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : buildWholeDependencyRelationMap(getRabRelativePaths(/* () */0));
  return ImportABSystem$Wonderjs.RAB[/* assembleAllDependencyRAB */2](abRelativePath, wholeDependencyRelationMap);
}

var RAB = /* module */[
  /* getRabRelativePaths */getRabRelativePaths,
  /* buildWholeHashIdMap */buildWholeHashIdMap,
  /* getHashId2 */getHashId2,
  /* buildWholeDependencyRelationMap */buildWholeDependencyRelationMap,
  /* buldWholeManifest */buldWholeManifest,
  /* loadAllDependencyRABAndSetToState */loadAllDependencyRABAndSetToState,
  /* assembleAllDependencyRAB */assembleAllDependencyRAB
];

function getABRelativePaths(param) {
  return /* tuple */[
          "rab1.rab",
          "rab2.rab",
          "sab1.sab"
        ];
}

function getSABRelativePath(param) {
  return getABRelativePaths(/* () */0)[2];
}

function getRABRelativePaths(param) {
  var match = getABRelativePaths(/* () */0);
  return /* tuple */[
          match[0],
          match[1]
        ];
}

function buildWholeHashIdMap$1(param, param$1) {
  return ImmutableHashMapService$WonderCommonlib.set(param[2], param$1[2], ImmutableHashMapService$WonderCommonlib.set(param[1], param$1[1], ImmutableHashMapService$WonderCommonlib.set(param[0], param$1[0], ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0))));
}

function getHashId2$1(param) {
  return "h2";
}

function buildWholeDependencyRelationMap$1(param) {
  return GenerateAllABTool$Wonderjs.buildDependencyRelation(/* array */[/* array */[
                param[2],
                param[1],
                param[0]
              ]]);
}

function buldWholeManifest$1($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var abRelativePaths = $staropt$star !== undefined ? $staropt$star : getABRelativePaths(/* () */0);
  var wholeHashIdMap = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : buildWholeHashIdMap$1(abRelativePaths, /* tuple */[
          "h1",
          "h2",
          "h3"
        ]);
  var wholeDependencyRelationMap = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : buildWholeDependencyRelationMap$1(abRelativePaths);
  var version = $staropt$star$3 !== undefined ? $staropt$star$3 : "";
  return /* record */[
          /* version */version,
          /* wholeHashIdMap */wholeHashIdMap,
          /* wholeDependencyRelationMap */wholeDependencyRelationMap
        ];
}

function loadSABAndSetToState(sabRelativePath, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var wholeManifest = $staropt$star !== undefined ? $staropt$star : buldWholeManifest$1(getABRelativePaths(/* () */0), Caml_option.some(buildWholeHashIdMap$1(getABRelativePaths(/* () */0), /* tuple */[
                  "h1",
                  "h2",
                  "h3"
                ])), Caml_option.some(buildWholeDependencyRelationMap$1(getABRelativePaths(/* () */0))), undefined, /* () */0);
  var getAssetBundlePathFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : (function () {
        return "";
      });
  var isAssetBundleArrayBufferCachedFunc = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : LoadABSystem$Wonderjs.isAssetBundleArrayBufferCached;
  var getAssetBundleArrayBufferCacheFunc = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : LoadABSystem$Wonderjs.getAssetBundleArrayBufferCache;
  var cacheAssetBundleArrayBufferFunc = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : LoadABSystem$Wonderjs.cacheAssetBundleArrayBuffer;
  var fetchFunc = $staropt$star$6 !== undefined ? Caml_option.valFromOption($staropt$star$6) : FetchCommon$Wonderjs.fetch;
  return ImportABSystem$Wonderjs.SAB[/* loadSABAndSetToState */0](sabRelativePath, wholeManifest, /* tuple */[
              getAssetBundlePathFunc,
              isAssetBundleArrayBufferCachedFunc,
              getAssetBundleArrayBufferCacheFunc,
              cacheAssetBundleArrayBufferFunc,
              fetchFunc
            ]);
}

var SAB = /* module */[
  /* getABRelativePaths */getABRelativePaths,
  /* getSABRelativePath */getSABRelativePath,
  /* getRABRelativePaths */getRABRelativePaths,
  /* buildWholeHashIdMap */buildWholeHashIdMap$1,
  /* getHashId2 */getHashId2$1,
  /* buildWholeDependencyRelationMap */buildWholeDependencyRelationMap$1,
  /* buldWholeManifest */buldWholeManifest$1,
  /* loadSABAndSetToState */loadSABAndSetToState
];

function getWABRelativePath(param) {
  return "wab1.wab";
}

function buildWAB(param) {
  return -1;
}

function loadWABAndSetToState(wabRelativePath, $staropt$star, $staropt$star$1, param) {
  var getAssetBundlePathFunc = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : (function () {
        return "";
      });
  var fetchFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : FetchCommon$Wonderjs.fetch;
  return ImportABSystem$Wonderjs.WAB[/* loadWABAndSetToState */0](wabRelativePath, /* tuple */[
              getAssetBundlePathFunc,
              fetchFunc
            ]);
}

var WAB = /* module */[
  /* getWABRelativePath */getWABRelativePath,
  /* buildWAB */buildWAB,
  /* loadWABAndSetToState */loadWABAndSetToState
];

exports.RAB = RAB;
exports.SAB = SAB;
exports.WAB = WAB;
/* FetchCommon-Wonderjs Not a pure module */
