open ComponentType;

type pMatrixMap =
  WonderCommonlib.MutableSparseMapService.t(Js.Typed_array.Float32Array.t);

type dirtyArray = array(int);

type perspectiveCameraProjectionRecord = {
  index: int,
  dirtyArray,
  pMatrixMap,
  nearMap: WonderCommonlib.MutableSparseMapService.t(float),
  farMap: WonderCommonlib.MutableSparseMapService.t(float),
  fovyMap: WonderCommonlib.MutableSparseMapService.t(float),
  aspectMap: WonderCommonlib.MutableSparseMapService.t(float),
  gameObjectMap,
  disposedIndexArray: array(component),
};