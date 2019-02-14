open ComponentType;

open InstanceType;

open SourceInstanceType;

type objectInstanceRecord = {
  index: int,
  sourceInstanceMap: WonderCommonlib.MutableSparseMapService.t(sourceInstance),
  disposedIndexArray: array(objectInstance),
  gameObjectMap
};