open ComponentType;

type meshRenderer = int;

type meshRendererRecord = {
  index: int,
  basicMaterialRenderGameObjectArray: array(int),
  lightMaterialRenderGameObjectArray: array(int),
  gameObjectMap,
  disposedIndexArray: array(meshRenderer)
};