open ComponentType;

type transform = int;

type position = (float, float, float);

type transformParentMap = array(Js.undefined(transform));

type transformChildMap = array(array(transform));

type transformDirtyMap = array(bool);

type transformRecord = {
  mutable index: int,
  buffer: Js.Typed_array.array_buffer,
  localToWorldMatrices: Js.Typed_array.Float32Array.t,
  localPositions: Js.Typed_array.Float32Array.t,
  defaultLocalToWorldMatrix: array(float),
  defaultLocalPosition: array(float),
  parentMap: transformParentMap,
  childMap: transformChildMap,
  gameObjectMap,
  dirtyMap: transformDirtyMap,
  mutable normalMatrixCacheMap: array(Js.Typed_array.Float32Array.t),
  disposedIndexArray: array(transform)
};

external transformToJsUndefine : transform => Js.undefined(transform) = "%identity";