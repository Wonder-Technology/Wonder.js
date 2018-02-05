open ComponentType;

type transform = int;

type position = (float, float, float);

type transformParentMap = array(Js.undefined(transform));

type transformChildMap = array(array(transform));

type transformDirtyMap = array(bool);

type transformData = {
  mutable index: int,
  parentMap: transformParentMap,
  childMap: transformChildMap,
  gameObjectMap,
  localToWorldMatrixMap: array(Js.Typed_array.Float32Array.t),
  localPositionMap: array(Js.Typed_array.Float32Array.t),
  dirtyMap: transformDirtyMap,
  normalMatrixCacheMap: array(Js.Typed_array.Float32Array.t),
  disposedIndexArray: array(transform)
};