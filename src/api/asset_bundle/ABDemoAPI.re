// TODO need remove

let fromPromiseStream = WonderBsMost.Most.fromPromise;

let getAssetBundlePath = LoadABSystem.getAssetBundlePath;

let initAssetBundleArrayBufferCache = LoadABSystem.initAssetBundleArrayBufferCache;

let isAssetBundleArrayBufferCached = LoadABSystem.isAssetBundleArrayBufferCached;

let getAssetBundleArrayBufferCache = LoadABSystem.getAssetBundleArrayBufferCache;

let cacheAssetBundleArrayBuffer = LoadABSystem.cacheAssetBundleArrayBuffer;

let loadAssetBundle = abPath => LoadABSystem.load(abPath, FetchCommon.fetch);

let parseWABManifest = ParseABSystem.WAB.parseManifest;

let getWholeDependencyRelationMap = ParseABSystem.WAB.getWholeDependencyRelationMap;

let setWholeDependencyRelationMap = OperateWABAssetBundleMainService.setWholeDependencyRelationMap;

let loadAllDependencyRABAndSetToState =
    (
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
  );

let loadSABAndSetToState =
    (
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
  );

let assembleAllDependencyRAB = ImportABSystem.RAB.assembleAllDependencyRAB;

let loadWABAndSetToState =
  (. wabRelativePath, getAssetBundlePathFunc) =>
    ImportABSystem.WAB.loadWABAndSetToState(
      wabRelativePath,
      (getAssetBundlePathFunc, FetchCommon.fetch),
    );

let isWABLoaded = OperateWABAssetBundleMainService.isLoaded;

let canAssembleSAB = OperateSABAssetBundleMainService.canAssemble;

let assembleSAB = AssembleABSystem.SAB.assemble;

let unsafeGetLoadedSAB = OperateSABAssetBundleMainService.unsafeGetLoadedSAB;

let unsafeGetWholeDependencyRelationMap = OperateWABAssetBundleMainService.unsafeGetWholeDependencyRelationMap;

let disposeSceneAllChildren = ImportABSystem.disposeSceneAllChildren;

let setSABSceneGameObjectToBeScene = ImportABSystem.setSABSceneGameObjectToBeScene;

let initAllSABGameObjects = ImportABSystem.initAllSABGameObjects;

let addSABSceneGameObjectChildrenToScene = ImportABSystem.addSABSceneGameObjectChildrenToScene;

let getAllNeededABCount = ProgressABSystem.RAB.getAllNeededABCount;

let getLoadedNeededABCount = ProgressABSystem.RAB.getLoadedNeededABCount;

let isRABAssembled = OperateRABAssetBundleMainService.isAssembled;

let isSABAssembled = OperateSABAssetBundleMainService.isAssembled;
