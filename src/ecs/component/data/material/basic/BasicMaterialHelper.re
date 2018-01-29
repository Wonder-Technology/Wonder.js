open BasicMaterialType;

open StateDataType;

let initData = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  colorMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  groupCountMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};