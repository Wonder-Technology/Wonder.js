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