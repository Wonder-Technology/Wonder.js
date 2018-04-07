open ComponentType;

open InstanceType;

type sourceInstanceRecord = {
  index: int,
  objectInstanceTransformArrayMap,
  matrixInstanceBufferCapacityMap,
  matrixFloat32ArrayMap: array(Js.Typed_array.Float32Array.t),
  isTransformStaticMap,
  isSendTransformMatrixDataMap,
  disposedIndexArray: array(sourceInstance),
  gameObjectMap
};