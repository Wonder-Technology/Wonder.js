open SourceInstanceType;

let create = () => {
  index: 0,
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  objectInstanceArrayMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  matrixFloat32ArrayMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  matrixInstanceBufferCapacityMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  isTransformStaticMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  isSendTransformMatrixDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};