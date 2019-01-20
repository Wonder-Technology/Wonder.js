open MeshRendererType;

let getBasicMaterialRenderGameObjectArray = ({basicMaterialRenderGameObjectMap}) =>
  basicMaterialRenderGameObjectMap |> WonderCommonlib.MutableSparseMapService.getValidValues;

let getLightMaterialRenderGameObjectArray = ({lightMaterialRenderGameObjectMap}) =>
  lightMaterialRenderGameObjectMap |> WonderCommonlib.MutableSparseMapService.getValidValues;

let removeFromRenderGameObjectMap =
    (
      meshRenderer,
      {basicMaterialRenderGameObjectMap, lightMaterialRenderGameObjectMap} as meshRendererRecord,
    ) => {
  ...meshRendererRecord,
  basicMaterialRenderGameObjectMap:
    basicMaterialRenderGameObjectMap
    |> Obj.magic
    |> WonderCommonlib.MutableSparseMapService.deleteVal(meshRenderer)
    |> Obj.magic,
  lightMaterialRenderGameObjectMap:
    lightMaterialRenderGameObjectMap
    |> Obj.magic
    |> WonderCommonlib.MutableSparseMapService.deleteVal(meshRenderer)
    |> Obj.magic,
};