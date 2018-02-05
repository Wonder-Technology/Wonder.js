open ComponentType;

type meshRenderer = int;

type meshRendererData = {
  index: int,
  renderGameObjectArray: array(int),
  gameObjectMap,
  disposedIndexArray: array(meshRenderer)
};