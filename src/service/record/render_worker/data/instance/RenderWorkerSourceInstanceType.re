open InstanceType;

type sourceInstanceRecord = {
  objectInstanceTransformArrayMap: option(objectInstanceTransformArrayMap),
  matrixInstanceBufferCapacityMap,
  matrixFloat32ArrayMap: array(Js.Typed_array.Float32Array.t),
  isTransformStaticMap: option(isTransformStaticMap),
  isSendTransformMatrixDataMap
};