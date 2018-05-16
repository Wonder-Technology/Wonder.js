open MeshRendererType;

let create = () => {
  index: 0,
  basicMaterialRenderGameObjectArray: WonderCommonlib.ArrayService.createEmpty(),
  lightMaterialRenderGameObjectArray: WonderCommonlib.ArrayService.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
};

let deepCopyForRestore =
    (
      {
        index,
        basicMaterialRenderGameObjectArray,
        lightMaterialRenderGameObjectArray,
        gameObjectMap,
        disposedIndexArray
      }
    ) => {
  index,
  basicMaterialRenderGameObjectArray: basicMaterialRenderGameObjectArray |> Js.Array.copy,
  lightMaterialRenderGameObjectArray: lightMaterialRenderGameObjectArray |> Js.Array.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};