open AllInstanceType;

type sourceInstanceRecord = {
  objectInstanceTransformIndexMap: option(objectInstanceTransformIndexMap),
  objectInstanceTransformCollections: option(objectInstanceTransformCollections),
  isTransformStatics: option(isTransformStatics),
  matrixInstanceBufferCapacityMap,
  matrixFloat32ArrayMap: WonderCommonlib.MutableSparseMapService.t(Js.Typed_array.Float32Array.t),
  isSendTransformMatrixDataMap
};