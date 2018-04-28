open InstanceType;

type sourceInstanceRecord = {
  objectInstanceTransformIndexMap,
  objectInstanceTransformCollections,
  isTransformStatics,
  matrixInstanceBufferCapacityMap,
  matrixFloat32ArrayMap: array(Js.Typed_array.Float32Array.t),
  isSendTransformMatrixDataMap
};