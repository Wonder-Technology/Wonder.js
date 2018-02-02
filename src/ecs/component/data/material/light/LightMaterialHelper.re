open LightMaterialType;

open StateDataType;

let initData = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  diffuseColorMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  specularColorMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  shininessMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  groupCountMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};