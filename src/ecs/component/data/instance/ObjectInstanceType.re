open SourceInstanceType;

type objectInstance = int;

type objectInstanceData = {
  index: int,
  sourceInstanceMap: array(sourceInstance),
  disposedIndexArray: array(objectInstance),
  gameObjectMap: array(int)
};