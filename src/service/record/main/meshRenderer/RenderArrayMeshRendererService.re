open MeshRendererType;

let getBasicMaterialRenderArray = ({basicMaterialRenderGameObjectMap}) =>
  basicMaterialRenderGameObjectMap |> SparseMapService.getValidValues;

let getLightMaterialRenderArray = ({lightMaterialRenderGameObjectMap}) =>
  lightMaterialRenderGameObjectMap |> SparseMapService.getValidValues;

let removeFromRenderGameObjectMap =
    (
      meshRenderer,
      {basicMaterialRenderGameObjectMap, lightMaterialRenderGameObjectMap} as meshRendererRecord,
    ) => {
  ...meshRendererRecord,
  isBasicMaterialRenderGameObjectMapForDeepCopy: true,
  isLightMaterialRenderGameObjectMapForDeepCopy: true,
  basicMaterialRenderGameObjectMap:
    basicMaterialRenderGameObjectMap
    |> Obj.magic
    |> WonderCommonlib.SparseMapService.deleteVal(meshRenderer)
    |> Obj.magic,
  lightMaterialRenderGameObjectMap:
    lightMaterialRenderGameObjectMap
    |> Obj.magic
    |> WonderCommonlib.SparseMapService.deleteVal(meshRenderer)
    |> Obj.magic,
};