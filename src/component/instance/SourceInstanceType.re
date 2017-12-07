open ComponentType;

type sourceInstance = int;

type objectInstanceListMap = array(array(int));

type modelMatrixFloat32ArrayMap = array(Js.Typed_array.Float32Array.t);

type instanceBufferCapacityMap = array(int);

type sourceInstanceData = {
  mutable index: int,
  objectInstanceListMap,
  modelMatrixFloat32ArrayMap,
  instanceBufferCapacityMap,
  gameObjectMap
};