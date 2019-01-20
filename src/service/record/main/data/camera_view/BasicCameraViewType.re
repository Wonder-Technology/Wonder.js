open ComponentType;

type basicCameraViewRecord = {
  index: int,
  isActiveMap: WonderCommonlib.MutableSparseMapService.t(bool),
  gameObjectMap,
  disposedIndexArray: array(component)
};