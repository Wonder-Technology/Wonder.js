open TransformType;

let initData = (state: StateDataType.state) => {
  state.transformData =
    Some({
      index: 0,
      parentMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      childMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      dirtyMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      localToWorldMatrixMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      localPositionMap: WonderCommonlib.SparseMapSystem.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
    });
  state
};