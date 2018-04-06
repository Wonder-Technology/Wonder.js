open ComponentType;

open InstanceType;

open SourceInstanceType;

type objectInstanceRecord = {
  index: int,
  sourceInstanceMap: array(sourceInstance),
  disposedIndexArray: array(objectInstance),
  gameObjectMap
};