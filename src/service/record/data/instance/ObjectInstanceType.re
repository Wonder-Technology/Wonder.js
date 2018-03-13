open SourceInstanceType;

type objectInstance = int;

type objectInstanceRecord = {
  index: int,
  sourceInstanceMap: array(sourceInstance),
  disposedIndexArray: array(objectInstance),
  gameObjectMap: array(int)
};