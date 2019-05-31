

import * as Most from "most";
import * as SceneAPI$Wonderjs from "../../../../../api/SceneAPI.js";
import * as ScriptAPI$Wonderjs from "../../../../../api/script/ScriptAPI.js";
import * as FetchCommon$Wonderjs from "../../../../../asset/FetchCommon.js";
import * as LoadABSystem$Wonderjs from "../../../../../asset_bundle/import/LoadABSystem.js";
import * as TransformAPI$Wonderjs from "../../../../../api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../api/GameObjectAPI.js";
import * as ParseABSystem$Wonderjs from "../../../../../asset_bundle/import/ParseABSystem.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as ImportABSystem$Wonderjs from "../../../../../asset_bundle/import/ImportABSystem.js";
import * as AssembleABSystem$Wonderjs from "../../../../../asset_bundle/import/assemble/AssembleABSystem.js";
import * as ProgressABSystem$Wonderjs from "../../../../../asset_bundle/import/ProgressABSystem.js";
import * as StateDataMainService$Wonderjs from "../../state/StateDataMainService.js";
import * as OperateScriptDataMainService$Wonderjs from "../../script/OperateScriptDataMainService.js";
import * as OperateRABAssetBundleMainService$Wonderjs from "../../assetBundle/OperateRABAssetBundleMainService.js";
import * as OperateSABAssetBundleMainService$Wonderjs from "../../assetBundle/OperateSABAssetBundleMainService.js";
import * as OperateWABAssetBundleMainService$Wonderjs from "../../assetBundle/OperateWABAssetBundleMainService.js";
import * as OperateScriptAttributeDataMainService$Wonderjs from "../../script/OperateScriptAttributeDataMainService.js";

function create(param) {
  return {
          unsafeGetScriptAttribute: OperateScriptDataMainService$Wonderjs.unsafeGetScriptAttribute,
          unsafeGetScriptAttributeFieldValue: OperateScriptAttributeDataMainService$Wonderjs.unsafeGetScriptAttributeFieldValue,
          setScriptAttributeFieldValue: (function (script, param, state) {
              return OperateScriptDataMainService$Wonderjs.setScriptAttributeFieldValue(script, /* tuple */[
                          param[0],
                          param[1],
                          param[2]
                        ], state);
            }),
          replaceScriptEventFunctionData: (function (script, param, targetScriptEventFunctionData, state) {
              return ScriptAPI$Wonderjs.replaceScriptEventFunctionData(script, /* tuple */[
                          param[0],
                          param[1]
                        ], targetScriptEventFunctionData, state);
            }),
          addScriptAttribute: ScriptAPI$Wonderjs.addScriptAttribute,
          unsafeGetScriptGameObject: ScriptAPI$Wonderjs.unsafeGetScriptGameObject,
          getTransformLocalPosition: TransformAPI$Wonderjs.getTransformLocalPosition,
          setTransformLocalPosition: TransformAPI$Wonderjs.setTransformLocalPosition,
          unsafeGetGameObjectTransformComponent: GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent,
          disposeGameObject: GameObjectAPI$Wonderjs.disposeGameObject,
          initGameObject: GameObjectAPI$Wonderjs.initGameObject,
          getAllGameObjects: GameObjectAPI$Wonderjs.getAllGameObjects,
          findGameObjectsByName: SceneAPI$Wonderjs.findGameObjectsByName,
          unsafeGetState: (function (param) {
              return StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
            }),
          setState: (function (state) {
              return StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, state);
            }),
          fromPromiseStream: (function (promise) {
              return Most.fromPromise(promise);
            }),
          getAssetBundlePath: LoadABSystem$Wonderjs.getAssetBundlePath,
          initAssetBundleArrayBufferCache: LoadABSystem$Wonderjs.initAssetBundleArrayBufferCache,
          isAssetBundleArrayBufferCached: LoadABSystem$Wonderjs.isAssetBundleArrayBufferCached,
          getAssetBundleArrayBufferCache: LoadABSystem$Wonderjs.getAssetBundleArrayBufferCache,
          cacheAssetBundleArrayBuffer: LoadABSystem$Wonderjs.cacheAssetBundleArrayBuffer,
          loadAssetBundle: (function (abPath) {
              return LoadABSystem$Wonderjs.load(abPath, FetchCommon$Wonderjs.fetch);
            }),
          parseWABManifest: (function (wab) {
              return ParseABSystem$Wonderjs.WAB[/* parseManifest */2](wab);
            }),
          getWholeDependencyRelationMap: (function (wabManifest) {
              return ParseABSystem$Wonderjs.WAB[/* getWholeDependencyRelationMap */4](wabManifest);
            }),
          setWholeDependencyRelationMap: OperateWABAssetBundleMainService$Wonderjs.setWholeDependencyRelationMap,
          loadAllDependencyRABAndSetToState: (function (abRelativePath, wholeManifest, param) {
              return ImportABSystem$Wonderjs.RAB[/* loadAllDependencyRABAndSetToState */1](abRelativePath, wholeManifest, /* tuple */[
                          param[0],
                          param[1],
                          param[2],
                          param[3],
                          FetchCommon$Wonderjs.fetch
                        ]);
            }),
          loadSABAndSetToState: (function (sabRelativePath, wholeManifest, param) {
              return ImportABSystem$Wonderjs.SAB[/* loadSABAndSetToState */0](sabRelativePath, wholeManifest, /* tuple */[
                          param[0],
                          param[1],
                          param[2],
                          param[3],
                          FetchCommon$Wonderjs.fetch
                        ]);
            }),
          assembleAllDependencyRAB: (function (sabRelativePath, wholeDependencyRelationMap) {
              return ImportABSystem$Wonderjs.RAB[/* assembleAllDependencyRAB */2](sabRelativePath, wholeDependencyRelationMap);
            }),
          loadWABAndSetToState: (function (wabRelativePath, getAssetBundlePathFunc) {
              return ImportABSystem$Wonderjs.WAB[/* loadWABAndSetToState */0](wabRelativePath, /* tuple */[
                          getAssetBundlePathFunc,
                          FetchCommon$Wonderjs.fetch
                        ]);
            }),
          isWABLoaded: OperateWABAssetBundleMainService$Wonderjs.isLoaded,
          canAssembleSAB: OperateSABAssetBundleMainService$Wonderjs.canAssemble,
          assembleSAB: (function (sabRelativePath, sab, wholeDependencyRelationMap) {
              return AssembleABSystem$Wonderjs.SAB[/* assemble */8](sabRelativePath, sab, wholeDependencyRelationMap);
            }),
          unsafeGetLoadedSAB: OperateSABAssetBundleMainService$Wonderjs.unsafeGetLoadedSAB,
          unsafeGetWholeDependencyRelationMap: OperateWABAssetBundleMainService$Wonderjs.unsafeGetWholeDependencyRelationMap,
          disposeSceneAllChildren: ImportABSystem$Wonderjs.disposeSceneAllChildren,
          setSABSceneGameObjectToBeScene: ImportABSystem$Wonderjs.setSABSceneGameObjectToBeScene,
          initAllSABGameObjects: ImportABSystem$Wonderjs.initAllSABGameObjects,
          addSABSceneGameObjectChildrenToScene: ImportABSystem$Wonderjs.addSABSceneGameObjectChildrenToScene,
          getAllNeededABCount: (function (abRelativePath, wabRelativePath, state) {
              return ProgressABSystem$Wonderjs.RAB[/* getAllNeededABCount */0](abRelativePath, wabRelativePath, state);
            }),
          getLoadedNeededABCount: (function (abRelativePath, wabRelativePath, state) {
              return ProgressABSystem$Wonderjs.RAB[/* getLoadedNeededABCount */3](abRelativePath, wabRelativePath, state);
            }),
          isRABAssembled: OperateRABAssetBundleMainService$Wonderjs.isAssembled,
          isSABAssembled: OperateSABAssetBundleMainService$Wonderjs.isAssembled,
          unsafeFindScriptEventFunctionDataByName: OperateRABAssetBundleMainService$Wonderjs.unsafeFindScriptEventFunctionDataByName,
          unsafeFindScriptAttributeByName: OperateRABAssetBundleMainService$Wonderjs.unsafeFindScriptAttributeByName,
          releaseLoadedSAB: OperateSABAssetBundleMainService$Wonderjs.releaseLoadedSAB,
          releaseLoadedRAB: OperateRABAssetBundleMainService$Wonderjs.releaseLoadedRAB,
          releaseAssembleRABData: OperateRABAssetBundleMainService$Wonderjs.releaseAssembleRABData
        };
}

export {
  create ,
  
}
/* most Not a pure module */
