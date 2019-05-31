

import * as Most from "most";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LoadABSystem$Wonderjs from "./LoadABSystem.js";
import * as ParseABSystem$Wonderjs from "./ParseABSystem.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as AssembleABSystem$Wonderjs from "./assemble/AssembleABSystem.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateDataMainService$Wonderjs from "../../service/state/main/state/StateDataMainService.js";
import * as AllGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/AllGameObjectMainService.js";
import * as FindDependencyDataSystem$Wonderjs from "../all/dependency/FindDependencyDataSystem.js";
import * as InitGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/InitGameObjectMainService.js";
import * as GameObjectSceneMainService$Wonderjs from "../../service/state/main/scene/GameObjectSceneMainService.js";
import * as DisposeGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/DisposeGameObjectMainService.js";
import * as OperateRABAssetBundleMainService$Wonderjs from "../../service/state/main/assetBundle/OperateRABAssetBundleMainService.js";
import * as OperateSABAssetBundleMainService$Wonderjs from "../../service/state/main/assetBundle/OperateSABAssetBundleMainService.js";
import * as OperateWABAssetBundleMainService$Wonderjs from "../../service/state/main/assetBundle/OperateWABAssetBundleMainService.js";

function loadAB(abRelativePath, wholeManifest, wholeDependencyRelationMap, param) {
  var fetchFunc = param[4];
  var cacheAssetBundleArrayBufferFunc = param[3];
  var getAssetBundleArrayBufferCacheFunc = param[2];
  var isAssetBundleArrayBufferCachedFunc = param[1];
  var getAssetBundlePathFunc = param[0];
  var hashId = ParseABSystem$Wonderjs.WAB[/* unsafeGetHashId */5](abRelativePath, wholeManifest);
  Log$WonderLog.print(/* tuple */[
        "All->loadAB: ",
        abRelativePath,
        isAssetBundleArrayBufferCachedFunc(abRelativePath, hashId)
      ]);
  return Most.flatMap((function (isCached) {
                if (isCached) {
                  return Most.fromPromise(getAssetBundleArrayBufferCacheFunc(abRelativePath));
                } else {
                  return Most.flatMap((function (ab) {
                                return Most.map((function (param) {
                                                return ab;
                                              }), Most.fromPromise(cacheAssetBundleArrayBufferFunc(abRelativePath, ab, hashId))).concat(Most.just(ab));
                              }), LoadABSystem$Wonderjs.load(getAssetBundlePathFunc() + abRelativePath, fetchFunc));
                }
              }), Most.fromPromise(isAssetBundleArrayBufferCachedFunc(abRelativePath, hashId)));
}

var All = /* module */[/* loadAB */loadAB];

function loadSABAndSetToState(sabRelativePath, wholeManifest, param) {
  var fetchFunc = param[4];
  var cacheAssetBundleArrayBufferFunc = param[3];
  var getAssetBundleArrayBufferCacheFunc = param[2];
  var isAssetBundleArrayBufferCachedFunc = param[1];
  var getAssetBundlePathFunc = param[0];
  return Most.flatMap((function (sabRelativePath) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                var wholeDependencyRelationMap = ParseABSystem$Wonderjs.WAB[/* getWholeDependencyRelationMap */4](wholeManifest);
                var match = OperateSABAssetBundleMainService$Wonderjs.isLoaded(sabRelativePath, state);
                if (match) {
                  return Most.empty();
                } else {
                  return Most.map((function (param) {
                                return /* () */0;
                              }), Most.tap((function (sab) {
                                    var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                                    StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, OperateSABAssetBundleMainService$Wonderjs.setLoadedSAB(sabRelativePath, sab, OperateSABAssetBundleMainService$Wonderjs.markLoaded(sabRelativePath, state)));
                                    return /* () */0;
                                  }), loadAB(sabRelativePath, wholeManifest, wholeDependencyRelationMap, /* tuple */[
                                      getAssetBundlePathFunc,
                                      isAssetBundleArrayBufferCachedFunc,
                                      getAssetBundleArrayBufferCacheFunc,
                                      cacheAssetBundleArrayBufferFunc,
                                      fetchFunc
                                    ])));
                }
              }), Most.just(sabRelativePath));
}

var SAB = /* module */[/* loadSABAndSetToState */loadSABAndSetToState];

function _loadRABAndSetToState(rabRelativePath, wholeManifest, wholeDependencyRelationMap, param) {
  var fetchFunc = param[4];
  var cacheAssetBundleArrayBufferFunc = param[3];
  var getAssetBundleArrayBufferCacheFunc = param[2];
  var isAssetBundleArrayBufferCachedFunc = param[1];
  var getAssetBundlePathFunc = param[0];
  return Most.flatMap((function (rabRelativePath) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                var match = OperateRABAssetBundleMainService$Wonderjs.isLoaded(rabRelativePath, state);
                if (match) {
                  return Most.empty();
                } else {
                  return Most.map((function (param) {
                                return /* () */0;
                              }), Most.tap((function (rab) {
                                    var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                                    StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, OperateRABAssetBundleMainService$Wonderjs.setLoadedRAB(rabRelativePath, rab, OperateRABAssetBundleMainService$Wonderjs.markLoaded(rabRelativePath, state)));
                                    return /* () */0;
                                  }), loadAB(rabRelativePath, wholeManifest, wholeDependencyRelationMap, /* tuple */[
                                      getAssetBundlePathFunc,
                                      isAssetBundleArrayBufferCachedFunc,
                                      getAssetBundleArrayBufferCacheFunc,
                                      cacheAssetBundleArrayBufferFunc,
                                      fetchFunc
                                    ])));
                }
              }), Most.just(rabRelativePath));
}

function loadAllDependencyRABAndSetToState(abRelativePath, wholeManifest, param) {
  var fetchFunc = param[4];
  var cacheAssetBundleArrayBufferFunc = param[3];
  var getAssetBundleArrayBufferCacheFunc = param[2];
  var isAssetBundleArrayBufferCachedFunc = param[1];
  var getAssetBundlePathFunc = param[0];
  var wholeDependencyRelationMap = ParseABSystem$Wonderjs.WAB[/* getWholeDependencyRelationMap */4](wholeManifest);
  return Most.flatMap((function (rabRelativePath) {
                return _loadRABAndSetToState(rabRelativePath, wholeManifest, wholeDependencyRelationMap, /* tuple */[
                            getAssetBundlePathFunc,
                            isAssetBundleArrayBufferCachedFunc,
                            getAssetBundleArrayBufferCacheFunc,
                            cacheAssetBundleArrayBufferFunc,
                            fetchFunc
                          ]);
              }), Most.from(FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(abRelativePath, wholeDependencyRelationMap)));
}

function assembleAllDependencyRAB(abRelativePath, wholeDependencyRelationMap) {
  return Most.concatMap((function (rabRelativePath) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                var match = OperateRABAssetBundleMainService$Wonderjs.isAssembled(rabRelativePath, state);
                if (match) {
                  return Most.empty();
                } else {
                  return AssembleABSystem$Wonderjs.RAB[/* assemble */13](rabRelativePath, OperateRABAssetBundleMainService$Wonderjs.unsafeGetLoadedRAB(rabRelativePath, state), wholeDependencyRelationMap);
                }
              }), Most.from(FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(abRelativePath, wholeDependencyRelationMap)));
}

var RAB = /* module */[
  /* _loadRABAndSetToState */_loadRABAndSetToState,
  /* loadAllDependencyRABAndSetToState */loadAllDependencyRABAndSetToState,
  /* assembleAllDependencyRAB */assembleAllDependencyRAB
];

function loadWABAndSetToState(wabRelativePath, param) {
  var fetchFunc = param[1];
  var getAssetBundlePathFunc = param[0];
  return Most.flatMap((function (wabRelativePath) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                var match = OperateWABAssetBundleMainService$Wonderjs.isLoaded(wabRelativePath, state);
                if (match) {
                  return Most.just(OperateWABAssetBundleMainService$Wonderjs.unsafeGetLoadedWAB(wabRelativePath, state));
                } else {
                  return Most.tap((function (wab) {
                                var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                                StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, OperateWABAssetBundleMainService$Wonderjs.setLoadedWAB(wabRelativePath, wab, OperateWABAssetBundleMainService$Wonderjs.markLoaded(wabRelativePath, state)));
                                return /* () */0;
                              }), LoadABSystem$Wonderjs.load(getAssetBundlePathFunc() + wabRelativePath, fetchFunc));
                }
              }), Most.just(wabRelativePath));
}

var WAB = /* module */[/* loadWABAndSetToState */loadWABAndSetToState];

var setSABSceneGameObjectToBeScene = GameObjectSceneMainService$Wonderjs.setSceneGameObject;

function initAllSABGameObjects(sabSceneGameObject, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, gameObject) {
                return InitGameObjectMainService$Wonderjs.initGameObject(gameObject, state);
              }), state, AllGameObjectMainService$Wonderjs.getAllGameObjects(sabSceneGameObject, state));
}

function addSABSceneGameObjectChildrenToScene(sabSceneGameObject, state) {
  var __x = AllGameObjectMainService$Wonderjs.getAllChildren(sabSceneGameObject, state);
  return GameObjectSceneMainService$Wonderjs.addChildren(__x, state);
}

function disposeSceneAllChildren(state) {
  var scene = GameObjectSceneMainService$Wonderjs.getSceneGameObject(state);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, gameObject) {
                return DisposeGameObjectMainService$Wonderjs.deferDispose(gameObject, state);
              }), state, AllGameObjectMainService$Wonderjs.getAllChildren(scene, state));
}

export {
  All ,
  SAB ,
  RAB ,
  WAB ,
  setSABSceneGameObjectToBeScene ,
  initAllSABGameObjects ,
  addSABSceneGameObjectChildrenToScene ,
  disposeSceneAllChildren ,
  
}
/* most Not a pure module */
