open ComponentType;

type transform = int;

type transformParentMap = WonderCommonlib.SparseMapService.t(Js.undefined(transform));

type transformChildMap = WonderCommonlib.SparseMapService.t(array(transform));

type transformDirtyMap = WonderCommonlib.SparseMapService.t(bool);

type transformRecord = {
  mutable index: int,
  buffer: WorkerType.sharedArrayBuffer,
  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable localRotations: Js.Typed_array.Float32Array.t,
  mutable localScales: Js.Typed_array.Float32Array.t,
  copiedBuffer: option(WorkerType.sharedArrayBuffer),
  mutable copiedLocalToWorldMatrices: option(Js.Typed_array.Float32Array.t),
  mutable copiedLocalPositions: option(Js.Typed_array.Float32Array.t),
  mutable copiedLocalRotations: option(Js.Typed_array.Float32Array.t),
  mutable copiedLocalScales: option(Js.Typed_array.Float32Array.t),
  defaultLocalToWorldMatrix: array(float),
  defaultLocalPosition: array(float),
  defaultLocalRotation: array(float),
  defaultLocalScale: array(float),
  mutable parentMap: transformParentMap,
  mutable childMap: transformChildMap,
  mutable gameObjectMap,
  mutable dirtyMap: transformDirtyMap,
  mutable localToWorldMatrixCacheMap: WonderCommonlib.SparseMapService.t(Js.Typed_array.Float32Array.t),
  mutable normalMatrixCacheMap: WonderCommonlib.SparseMapService.t(Js.Typed_array.Float32Array.t),
  mutable disposedIndexArray: array(transform)
};

external transformToJsUndefine : transform => Js.undefined(transform) = "%identity";