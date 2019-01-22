open MeshRendererType;

let getBasicMaterialRenderGameObjectArray =
    ({basicMaterialRenderGameObjectMap}) =>
  basicMaterialRenderGameObjectMap
  |> WonderCommonlib.MutableSparseMapService.getValidValues;

let getLightMaterialRenderGameObjectArray =
    ({lightMaterialRenderGameObjectMap}) =>
  lightMaterialRenderGameObjectMap
  |> WonderCommonlib.MutableSparseMapService.getValidValues;

let removeFromRenderGameObjectMap =
    (
      meshRenderer,
      {basicMaterialRenderGameObjectMap, lightMaterialRenderGameObjectMap} as meshRendererRecord,
    ) => {
  ...meshRendererRecord,
  basicMaterialRenderGameObjectMap:
    basicMaterialRenderGameObjectMap
    |> WonderCommonlib.MutableSparseMapService.deleteVal(meshRenderer),
  lightMaterialRenderGameObjectMap:
    lightMaterialRenderGameObjectMap
    |> WonderCommonlib.MutableSparseMapService.deleteVal(meshRenderer),
};