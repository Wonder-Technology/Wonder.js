open ObjectInstanceType;

let create = () => {
  index: 0,
  sourceInstanceMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty()
};