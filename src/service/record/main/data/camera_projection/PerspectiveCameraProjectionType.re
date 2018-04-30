open ComponentType;

type pMatrixMap = WonderCommonlib.SparseMapService.t(Js.Typed_array.Float32Array.t);

type dirtyArray = array(int);

type perspectiveCameraProjectionRecord = {
  index: int,
  dirtyArray,
  pMatrixMap,
  nearMap: WonderCommonlib.SparseMapService.t(float),
  farMap: WonderCommonlib.SparseMapService.t(float),
  fovyMap: WonderCommonlib.SparseMapService.t(float),
  aspectMap: WonderCommonlib.SparseMapService.t(float),
  gameObjectMap,
  disposedIndexArray: array(component)
};