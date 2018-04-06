open InstanceType;

type sourceInstanceRecord = {
  /* index: int, */
  objectInstanceArrayMap,
  matrixInstanceBufferCapacityMap,
  matrixFloat32ArrayMap: array(Js.Typed_array.Float32Array.t),
  isTransformStaticMap,
  isSendTransformMatrixDataMap
};