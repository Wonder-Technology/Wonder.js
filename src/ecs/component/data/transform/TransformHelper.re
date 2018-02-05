open TransformType;

let initData = () => {
  index: 0,
  parentMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  childMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  dirtyMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  localToWorldMatrixMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  localPositionMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  normalMatrixCacheMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};