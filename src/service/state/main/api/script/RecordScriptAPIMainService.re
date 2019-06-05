open WonderBsMost;

let create = () => {
  "unsafeGetScriptAttribute":
    (. script, scriptAttributeName, state) =>
      OperateScriptDataMainService.unsafeGetScriptAttribute(
        script,
        scriptAttributeName,
        state,
      ),
  "unsafeGetScriptAttributeFieldValue":
    (. fieldName, attribute) =>
      OperateScriptAttributeDataMainService.unsafeGetScriptAttributeFieldValue(
        fieldName,
        attribute,
      ),
  "setScriptAttributeFieldValue":
    (. script, (scriptAttributeName, fieldName, value), state) =>
      OperateScriptDataMainService.setScriptAttributeFieldValue(
        script,
        (scriptAttributeName, fieldName, value),
        state,
      ),
  "replaceScriptEventFunctionData":
    (.
      script,
      (sourceScriptEventFunctionDataName, targetScriptEventFunctionDataName),
      targetScriptEventFunctionData,
      state,
    ) =>
      ScriptAPI.replaceScriptEventFunctionData(
        script,
        (
          sourceScriptEventFunctionDataName,
          targetScriptEventFunctionDataName,
        ),
        targetScriptEventFunctionData,
        state,
      ),
  "addScriptAttribute":
    (. script, scriptAttributeName, scriptAttribute, state) =>
      ScriptAPI.addScriptAttribute(
        script,
        scriptAttributeName,
        scriptAttribute,
        state,
      ),
  "unsafeGetScriptGameObject":
    (. script, state) => ScriptAPI.unsafeGetScriptGameObject(script, state),
  "getTransformLocalPosition":
    (. transform, state) =>
      TransformAPI.getTransformLocalPosition(transform, state),
  "setTransformLocalPosition":
    (. transform, localPosition, state) =>
      TransformAPI.setTransformLocalPosition(transform, localPosition, state),
  "unsafeGetGameObjectTransformComponent":
    (. gameObject, state) =>
      GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
  "disposeGameObject":
    (. gameObject, state) =>
      GameObjectAPI.disposeGameObject(gameObject, state),
  "initGameObject":
    (. gameObject, state) => GameObjectAPI.initGameObject(gameObject, state),
  "getAllGameObjects":
    (. gameObject, state) =>
      GameObjectAPI.getAllGameObjects(gameObject, state),
  "findGameObjectsByName":
    (. name, state) => SceneAPI.findGameObjectsByName(name, state),
  "unsafeGetState": () =>
    StateDataMainService.unsafeGetState(StateDataMain.stateData),
  "setState":
    (. state) =>
      StateDataMainService.setState(StateDataMain.stateData, state),
  /* "concatExecStreamArr":
     (. streamArr) => MostUtils.concatExecStreamArr(streamArr), */
  "fromPromiseStream": (. promise) => Most.fromPromise(promise),
  "getAssetBundlePath": LoadABSystem.getAssetBundlePath,
  "initAssetBundleArrayBufferCache": LoadABSystem.initAssetBundleArrayBufferCache,
  "isAssetBundleArrayBufferCached": LoadABSystem.isAssetBundleArrayBufferCached,
  "getAssetBundleArrayBufferCache": LoadABSystem.getAssetBundleArrayBufferCache,
  "cacheAssetBundleArrayBuffer": LoadABSystem.cacheAssetBundleArrayBuffer,
  "loadAssetBundle":
    (. abPath) => LoadABSystem.load(abPath, FetchCommon.fetch),
  "parseWABManifest": (. wab) => ParseABSystem.WAB.parseManifest(wab),
  "getWholeDependencyRelationMap":
    (. wabManifest) =>
      ParseABSystem.WAB.getWholeDependencyRelationMap(wabManifest),
  "setWholeDependencyRelationMap":
    (. wabRelativePath, wholeDependencyRelationMap, state) =>
      OperateWABAssetBundleMainService.setWholeDependencyRelationMap(
        wabRelativePath,
        wholeDependencyRelationMap,
        state,
      ),
  "loadAllDependencyRABAndSetToState":
    (.
      abRelativePath,
      wholeManifest,
      (
        getAssetBundlePathFunc,
        isAssetBundleArrayBufferCachedFunc,
        getAssetBundleArrayBufferCacheFunc,
        cacheAssetBundleArrayBufferFunc,
      ),
    ) =>
      ImportABSystem.RAB.loadAllDependencyRABAndSetToState(
        abRelativePath,
        wholeManifest,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          FetchCommon.fetch,
        ),
      ),
  "loadSABAndSetToState":
    (.
      sabRelativePath,
      wholeManifest,
      (
        getAssetBundlePathFunc,
        isAssetBundleArrayBufferCachedFunc,
        getAssetBundleArrayBufferCacheFunc,
        cacheAssetBundleArrayBufferFunc,
      ),
    ) =>
      ImportABSystem.SAB.loadSABAndSetToState(
        sabRelativePath,
        wholeManifest,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          FetchCommon.fetch,
        ),
      ),
  "assembleAllDependencyRAB":
    (. sabRelativePath, wholeDependencyRelationMap) =>
      ImportABSystem.RAB.assembleAllDependencyRAB(
        sabRelativePath,
        wholeDependencyRelationMap,
      ),
  "loadWABAndSetToState":
    (. wabRelativePath, getAssetBundlePathFunc) =>
      ImportABSystem.WAB.loadWABAndSetToState(
        wabRelativePath,
        (getAssetBundlePathFunc, FetchCommon.fetch),
      ),
  "isWABLoaded":
    (. wabRelativePath, state) =>
      OperateWABAssetBundleMainService.isLoaded(wabRelativePath, state),
  "canAssembleSAB":
    (. sabRelativePath, wabRelativePath, state) =>
      OperateSABAssetBundleMainService.canAssemble(
        sabRelativePath,
        wabRelativePath,
        state,
      ),
  "assembleSAB":
    (. sabRelativePath, sab, wholeDependencyRelationMap) =>
      AssembleABSystem.SAB.assemble(
        sabRelativePath,
        sab,
        wholeDependencyRelationMap,
      ),
  "unsafeGetLoadedSAB":
    (. sabRelativePath, state) =>
      OperateSABAssetBundleMainService.unsafeGetLoadedSAB(
        sabRelativePath,
        state,
      ),
  "unsafeGetWholeDependencyRelationMap":
    (. wabRelativePath, state) =>
      OperateWABAssetBundleMainService.unsafeGetWholeDependencyRelationMap(
        wabRelativePath,
        state,
      ),
  "disposeSceneAllChildren":
    (. state) => ImportABSystem.disposeSceneAllChildren(state),
  "setSABSceneGameObjectToBeScene":
    (. sabSceneGameObject, state) =>
      ImportABSystem.setSABSceneGameObjectToBeScene(
        sabSceneGameObject,
        state,
      ),
  "initAllSABGameObjects":
    (. sabSceneGameObject, state) =>
      ImportABSystem.initAllSABGameObjects(sabSceneGameObject, state),
  "addSABSceneGameObjectChildrenToScene":
    (. sabSceneGameObject, state) =>
      ImportABSystem.addSABSceneGameObjectChildrenToScene(
        sabSceneGameObject,
        state,
      ),
  "getAllNeededABCount":
    (. abRelativePath, wabRelativePath, state) =>
      ProgressABSystem.RAB.getAllNeededABCount(
        abRelativePath,
        wabRelativePath,
        state,
      ),
  "getLoadedNeededABCount":
    (. abRelativePath, wabRelativePath, state) =>
      ProgressABSystem.RAB.getLoadedNeededABCount(
        abRelativePath,
        wabRelativePath,
        state,
      ),
  "isRABAssembled":
    (. rabRelativePath, state) =>
      OperateRABAssetBundleMainService.isAssembled(rabRelativePath, state),
  "isSABAssembled":
    (. sabRelativePath, state) =>
      OperateSABAssetBundleMainService.isAssembled(sabRelativePath, state),
  "unsafeFindScriptEventFunctionDataByName":
    (. rabRelativePath, name, state) =>
      OperateRABAssetBundleMainService.unsafeFindScriptEventFunctionDataByName(
        rabRelativePath,
        name,
        state,
      ),
  "unsafeFindScriptAttributeByName":
    (. rabRelativePath, name, state) =>
      OperateRABAssetBundleMainService.unsafeFindScriptAttributeByName(
        rabRelativePath,
        name,
        state,
      ),
  "releaseLoadedSAB":
    (. sabRelativePath, state) =>
      OperateSABAssetBundleMainService.releaseLoadedSAB(
        sabRelativePath,
        state,
      ),
  "releaseLoadedRAB":
    (. rabRelativePath, state) =>
      OperateRABAssetBundleMainService.releaseLoadedRAB(
        rabRelativePath,
        state,
      ),
  "releaseAssembleRABData":
    (. rabRelativePath, state) =>
      OperateRABAssetBundleMainService.releaseAssembleRABData(
        rabRelativePath,
        state,
      ),
};