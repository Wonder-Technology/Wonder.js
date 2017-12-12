open SourceInstanceType;

let initData = () => {
  index: 0,
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  objectInstanceListMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  modelMatrixFloat32ArrayMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  modelMatrixInstanceBufferCapacityMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  isModelMatrixStaticMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  isSendModelMatrixDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};