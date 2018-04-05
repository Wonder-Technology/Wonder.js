open ComponentType;

type meshRenderer = int;

type meshRendererRecord = {
  index: int,
  renderGameObjectArray: array(int),
  gameObjectMap,
  disposedIndexArray: array(meshRenderer)
};