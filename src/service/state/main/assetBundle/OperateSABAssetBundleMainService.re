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

let getSAB = (sabRelativePath, {assetBundleRecord} as state) =>
  assetBundleRecord.assembleSABData.sabMap
  |> WonderCommonlib.ImmutableHashMapService.get(sabRelativePath);

let unsafeGetSAB = (sabRelativePath, state) =>
  getSAB(sabRelativePath, state) |> OptionService.unsafeGet;

let setSAB = (sabRelativePath, sab, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleSABData: {
      ...assetBundleRecord.assembleSABData,
      sabMap:
        assetBundleRecord.assembleSABData.sabMap
        |> WonderCommonlib.ImmutableHashMapService.set(sabRelativePath, sab),
    },
  },
};

let markLoaded = (sabRelativePath, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleSABData: {
      ...assetBundleRecord.assembleSABData,
      isLoadedMap:
        assetBundleRecord.assembleSABData.isLoadedMap
        |> WonderCommonlib.ImmutableHashMapService.set(sabRelativePath, true),
    },
  },
};

let isLoaded = (sabRelativePath, {assetBundleRecord} as state) =>
  switch (
    assetBundleRecord.assembleSABData.isLoadedMap
    |> WonderCommonlib.ImmutableHashMapService.get(sabRelativePath)
  ) {
  | None => false
  | Some(isLoaded) => isLoaded
  };

/* let unsafeFindGameObjectByName = (sabRelativePath, gameObjectName, state) => 0;

/* let findAllGameObjects = (sabRelativePath, state) => [|0|]->Some; */

let unsafeFindAllGameObjects = (sabRelativePath, state) => [|0|]; */