open ComponentType;

open InstanceType;

open SourceInstanceType;

type objectInstanceRecord = {
  index: int,
  sourceInstanceMap: WonderCommonlib.SparseMapService.t(sourceInstance),
  disposedIndexArray: array(objectInstance),
  gameObjectMap
};