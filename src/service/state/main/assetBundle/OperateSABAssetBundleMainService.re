open StateDataMainType;

let getLoadedSAB = (sabRelativePath, {assetBundleRecord} as state) =>
  assetBundleRecord.assembleSABData.loadedSABMap
  |> WonderCommonlib.ImmutableHashMapService.get(sabRelativePath);

let unsafeGetLoadedSAB = (sabRelativePath, state) =>
  getLoadedSAB(sabRelativePath, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|sab arrayBuffer in sabRelativePath:$sabRelativePath loaded|j},
         ~actual={j|not|j},
       ),
     );

let setLoadedSAB = (sabRelativePath, sab, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleSABData: {
      ...assetBundleRecord.assembleSABData,
      loadedSABMap:
        assetBundleRecord.assembleSABData.loadedSABMap
        |> WonderCommonlib.ImmutableHashMapService.set(sabRelativePath, sab),
    },
  },
};

let _markIsLoaded = (sabRelativePath, isLoaded, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleSABData: {
      ...assetBundleRecord.assembleSABData,
      isLoadedMap:
        assetBundleRecord.assembleSABData.isLoadedMap
        |> WonderCommonlib.ImmutableHashMapService.set(
             sabRelativePath,
             isLoaded,
           ),
    },
  },
};

let markLoaded = (sabRelativePath, {assetBundleRecord} as state) =>
  _markIsLoaded(sabRelativePath, true, state);

let markNotLoaded = (sabRelativePath, {assetBundleRecord} as state) =>
  _markIsLoaded(sabRelativePath, false, state);

let isLoaded = (sabRelativePath, {assetBundleRecord} as state) =>
  switch (
    assetBundleRecord.assembleSABData.isLoadedMap
    |> WonderCommonlib.ImmutableHashMapService.get(sabRelativePath)
  ) {
  | None => false
  | Some(isLoaded) => isLoaded
  };

let _markIsAssembled =
    (sabRelativePath, isAssembled, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleSABData: {
      ...assetBundleRecord.assembleSABData,
      isAssembledMap:
        assetBundleRecord.assembleSABData.isAssembledMap
        |> WonderCommonlib.ImmutableHashMapService.set(
             sabRelativePath,
             isAssembled,
           ),
    },
  },
};

let markAssembled = (sabRelativePath, {assetBundleRecord} as state) =>
  _markIsAssembled(sabRelativePath, true, state);

let markNotAssembled = (sabRelativePath, {assetBundleRecord} as state) =>
  _markIsAssembled(sabRelativePath, false, state);

let isAssembled = (sabRelativePath, {assetBundleRecord} as state) =>
  switch (
    assetBundleRecord.assembleSABData.isAssembledMap
    |> WonderCommonlib.ImmutableHashMapService.get(sabRelativePath)
  ) {
  | None => false
  | Some(isAssembled) => isAssembled
  };

let canAssemble =
    (sabRelativePath, wabRelativePath, {assetBundleRecord} as state) =>
  isLoaded(sabRelativePath, state)
  && (
    switch (
      OperateWABAssetBundleMainService.getWholeDependencyRelationMap(
        wabRelativePath,
        state,
      )
    ) {
    | None => false
    | Some(wholeDependencyRelationMap) =>
      FindDependencyDataSystem.findAllDependencyRABRelativePathByDepthSearch(
        sabRelativePath,
        wholeDependencyRelationMap,
      )
      |> Js.Array.filter(rabRelativePath =>
           !
             OperateRABAssetBundleMainService.isAssembled(
               rabRelativePath,
               state,
             )
         )
      |> Js.Array.length === 0
    }
  );

let releaseLoadedSAB = (sabRelativePath, {assetBundleRecord} as state) =>
  {
    ...state,
    assetBundleRecord: {
      ...assetBundleRecord,
      assembleSABData: {
        ...assetBundleRecord.assembleSABData,
        loadedSABMap:
          assetBundleRecord.assembleSABData.loadedSABMap
          |> WonderCommonlib.ImmutableHashMapService.deleteVal(
               sabRelativePath,
             ),
      },
    },
  }
  |> markNotLoaded(sabRelativePath);