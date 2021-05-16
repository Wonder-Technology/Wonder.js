open StateDataMainType;

let clearAllABData = state => {
  let state = ImportABSystem.disposeSceneAllChildren(state);

  {...state, assetBundleRecord: RecordAssetBundleMainService.create()};
};
