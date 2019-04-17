/* TODO finish */

open StateDataMainType;

let markAssembled = (sabRelativePath, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleSABData: {
      ...assetBundleRecord.assembleSABData,
      isAssembled:
        assetBundleRecord.assembleSABData.isAssembled
        |> WonderCommonlib.ImmutableHashMapService.set(sabRelativePath, true),
    },
  },
};

let isAssembled = (sabRelativePath, {assetBundleRecord} as state) =>
  switch (
    assetBundleRecord.assembleSABData.isAssembled
    |> WonderCommonlib.ImmutableHashMapService.get(sabRelativePath)
  ) {
  | None => false
  | Some(isAssembled) => isAssembled
  };

let unsafeFindGameObjectByName = (sabRelativePath, gameObjectName, state) => 0;

/* let findAllGameObjects = (sabRelativePath, state) => [|0|]->Some; */

let unsafeFindAllGameObjects = (sabRelativePath, state) => [|0|];