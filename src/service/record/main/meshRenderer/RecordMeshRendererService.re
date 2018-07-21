open MeshRendererType;

let create = () => {
  index: 0,
  basicMaterialRenderGameObjectMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  lightMaterialRenderGameObjectMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
};

let deepCopyForRestore =
    (
      {
        index,
        basicMaterialRenderGameObjectMap,
        lightMaterialRenderGameObjectMap,
        gameObjectMap,
        disposedIndexArray,
      },
    ) => {
  index,
  basicMaterialRenderGameObjectMap:
    basicMaterialRenderGameObjectMap |> SparseMapService.copy,
  lightMaterialRenderGameObjectMap:
    lightMaterialRenderGameObjectMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy,
};