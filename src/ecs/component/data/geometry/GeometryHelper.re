open StateDataType;

let initData = (state: StateDataType.state) => {
  state.geometryData =
    Some({
      index: 0,
      verticesMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      normalsMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      indicesMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      configDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      computeDataFuncMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty(),
      isInitMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      groupCountMap: WonderCommonlib.SparseMapSystem.createEmpty()
    });
  state
};