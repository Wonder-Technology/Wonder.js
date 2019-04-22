/* TODO finish */

open StateDataMainType;

/* let getIMGUIData = (sabRelativePath, {assetBundleRecord} as state) =>
     assetBundleRecord.assembleSABData.imguiDataMap
     |> WonderCommonlib.ImmutableHashMapService.get(sabRelativePath);

   let setIMGUIData =
       (
         sabRelativePath,
         imguiData: AssetBundleType.imguiData,
         {assetBundleRecord} as state,
       ) => {
     ...state,
     assetBundleRecord: {
       ...assetBundleRecord,
       assembleSABData: {
         ...assetBundleRecord.assembleSABData,
         imguiDataMap:
           assetBundleRecord.assembleSABData.imguiDataMap
           |> WonderCommonlib.ImmutableHashMapService.set(
                sabRelativePath,
                imguiData,
              ),
       },
     },
   }; */

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
  /* TODO test */
  |> markNotLoaded(sabRelativePath);