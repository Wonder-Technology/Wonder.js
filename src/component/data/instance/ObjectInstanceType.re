open SourceInstanceType;

type objectInstance = int;

type objectInstanceData = {
  mutable index: int,
  sourceInstanceMap: array(sourceInstance),
  mutable disposedIndexArray: array(objectInstance),
  gameObjectMap: array(int)
};