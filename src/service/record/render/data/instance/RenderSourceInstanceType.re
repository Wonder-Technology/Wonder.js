open AllInstanceType;

type sourceInstanceRecord = {
  objectInstanceTransformIndexMap,
  objectInstanceTransformCollections,
  isTransformStatics,
  matrixInstanceBufferCapacityMap,
  matrixFloat32ArrayMap: WonderCommonlib.MutableSparseMapService.t(Js.Typed_array.Float32Array.t),
  isSendTransformMatrixDataMap
};