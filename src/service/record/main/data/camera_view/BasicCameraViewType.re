open ComponentType;

type basicCameraViewRecord = {
  index: int,
  isActiveMap: WonderCommonlib.SparseMapService.t(bool),
  gameObjectMap,
  disposedIndexArray: array(component)
};