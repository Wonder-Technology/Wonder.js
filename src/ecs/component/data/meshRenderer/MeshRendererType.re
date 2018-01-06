open ComponentType;

type meshRenderer = int;

type meshRendererData = {
  mutable index: int,
  mutable renderGameObjectArray: array(int),
  gameObjectMap,
  mutable disposedIndexArray: array(meshRenderer)
};