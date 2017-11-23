open ComponentType;

type meshRenderer = int;

type meshRendererData = {
  mutable index: int,
  mutable renderGameObjectArray: array(string),
  gameObjectMap,
  mutable disposedIndexArray: array(meshRenderer)
};