open ComponentType;

type sourceInstance = int;

type objectInstanceArrayMap = array(array(int));

type matrixInstanceBufferCapacityMap = array(int);

type isTransformStaticMap = array(bool);

type isSendTransformMatrixDataMap = array(bool);

type sourceInstanceRecord = {
  index: int,
  objectInstanceArrayMap,
  matrixInstanceBufferCapacityMap,
  matrixFloat32ArrayMap: array(Js.Typed_array.Float32Array.t),
  isTransformStaticMap,
  isSendTransformMatrixDataMap,
  disposedIndexArray: array(sourceInstance),
  gameObjectMap
};