open ComponentType;

open AllInstanceType;

open SourceInstanceType;

type objectInstanceRecord = {
  index: int,
  sourceInstanceMap: WonderCommonlib.MutableSparseMapService.t(sourceInstance),
  disposedIndexArray: array(objectInstance),
  gameObjectMap
};