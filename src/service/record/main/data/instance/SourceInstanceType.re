open ComponentType;

open AllInstanceType;

type sourceInstanceRecord = {
  index: int,
  objectInstanceTransformIndexMap,
  buffer: WorkerType.sharedArrayBuffer,
  isTransformStatics,
  objectInstanceTransformCollections,
  matrixInstanceBufferCapacityMap,
  matrixFloat32ArrayMap: WonderCommonlib.MutableSparseMapService.t(Js.Typed_array.Float32Array.t),
  isSendTransformMatrixDataMap,
  disposedIndexArray: array(sourceInstance),
  gameObjectMap
};