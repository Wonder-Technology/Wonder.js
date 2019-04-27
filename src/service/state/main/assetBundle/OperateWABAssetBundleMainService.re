open StateDataMainType;

let getWholeDependencyRelationMap =
    (wabRelativePath, {assetBundleRecord} as state) =>
  assetBundleRecord.wabData.wholeDependencyRelationMap
  |> WonderCommonlib.ImmutableHashMapService.get(wabRelativePath);

let unsafeGetWholeDependencyRelationMap = (wabRelativePath, state) =>
  getWholeDependencyRelationMap(wabRelativePath, state)
  |> OptionService.unsafeGet;

let setWholeDependencyRelationMap =
    (wabRelativePath, wholeDependencyRelation, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    wabData: {
      ...assetBundleRecord.wabData,
      wholeDependencyRelationMap:
        assetBundleRecord.wabData.wholeDependencyRelationMap
        |> WonderCommonlib.ImmutableHashMapService.set(
             wabRelativePath,
             wholeDependencyRelation,
           ),
    },
  },
};

let _markIsLoaded = (wabRelativePath, isLoaded, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    wabData: {
      ...assetBundleRecord.wabData,
      isLoadedMap:
        assetBundleRecord.wabData.isLoadedMap
        |> WonderCommonlib.ImmutableHashMapService.set(
             wabRelativePath,
             isLoaded,
           ),
    },
  },
};

let getLoadedWAB = (wabRelativePath, {assetBundleRecord} as state) =>
  assetBundleRecord.wabData.loadedWABMap
  |> WonderCommonlib.ImmutableHashMapService.get(wabRelativePath);

let unsafeGetLoadedWAB = (wabRelativePath, state) =>
  getLoadedWAB(wabRelativePath, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|wab arrayBuffer in wabRelativePath:$wabRelativePath loaded|j},
         ~actual={j|not|j},
       ),
     );

let setLoadedWAB = (wabRelativePath, wab, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    wabData: {
      ...assetBundleRecord.wabData,
      loadedWABMap:
        assetBundleRecord.wabData.loadedWABMap
        |> WonderCommonlib.ImmutableHashMapService.set(wabRelativePath, wab),
    },
  },
};

let markLoaded = (wabRelativePath, {assetBundleRecord} as state) =>
  _markIsLoaded(wabRelativePath, true, state);

let markNotLoaded = (wabRelativePath, {assetBundleRecord} as state) =>
  _markIsLoaded(wabRelativePath, false, state);

let isLoaded = (wabRelativePath, {assetBundleRecord} as state) =>
  switch (
    assetBundleRecord.wabData.isLoadedMap
    |> WonderCommonlib.ImmutableHashMapService.get(wabRelativePath)
  ) {
  | None => false
  | Some(isLoaded) => isLoaded
  };