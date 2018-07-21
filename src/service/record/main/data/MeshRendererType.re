open ComponentType;

type meshRenderer = int;

type renderGameObjectMap = WonderCommonlib.SparseMapService.t(int);

type meshRendererRecord = {
  index: int,
  basicMaterialRenderGameObjectMap: renderGameObjectMap,
  lightMaterialRenderGameObjectMap: renderGameObjectMap,
  gameObjectMap,
  disposedIndexArray: array(meshRenderer),
};