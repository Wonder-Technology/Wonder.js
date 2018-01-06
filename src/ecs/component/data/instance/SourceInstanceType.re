open ComponentType;

type sourceInstance = int;

type objectInstanceArrayMap = array(array(int));

type modelMatrixInstanceBufferCapacityMap = array(int);

type isModelMatrixStaticMap = array(bool);

type isSendModelMatrixDataMap = array(bool);

type sourceInstanceData = {
  mutable index: int,
  mutable objectInstanceArrayMap,
  modelMatrixInstanceBufferCapacityMap,
  modelMatrixFloat32ArrayMap: array(Js.Typed_array.Float32Array.t),
  isModelMatrixStaticMap,
  isSendModelMatrixDataMap,
  mutable disposedIndexArray: array(sourceInstance),
  gameObjectMap
};