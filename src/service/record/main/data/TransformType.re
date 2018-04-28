open ComponentType;

type transform = int;

type transformParentMap = array(Js.undefined(transform));

type transformChildMap = array(array(transform));

type transformDirtyMap = array(bool);

type transformRecord = {
  mutable index: int,
  buffer: WorkerType.sharedArrayBuffer,
  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  copiedBuffer: option(WorkerType.sharedArrayBuffer),
  mutable copiedLocalToWorldMatrices: option(Js.Typed_array.Float32Array.t),
  mutable copiedLocalPositions: option(Js.Typed_array.Float32Array.t),
  defaultLocalToWorldMatrix: array(float),
  defaultLocalPosition: array(float),
  mutable parentMap: transformParentMap,
  mutable childMap: transformChildMap,
  mutable gameObjectMap,
  mutable dirtyMap: transformDirtyMap,
  mutable localToWorldMatrixCacheMap: array(Js.Typed_array.Float32Array.t),
  mutable normalMatrixCacheMap: array(Js.Typed_array.Float32Array.t),
  mutable disposedIndexArray: array(transform)
};

external transformToJsUndefine : transform => Js.undefined(transform) = "%identity";