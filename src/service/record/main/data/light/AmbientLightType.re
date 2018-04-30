open ComponentType;

type ambientLightRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  colors: Js.Typed_array.Float32Array.t,
  mappedIndexMap: WonderCommonlib.SparseMapService.t(int),
  gameObjectMap
};