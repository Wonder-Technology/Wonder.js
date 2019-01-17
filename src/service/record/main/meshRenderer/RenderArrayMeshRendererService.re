open MeshRendererType;

let getBasicMaterialRenderGameObjectArray = ({basicMaterialRenderGameObjectMap}) =>
  basicMaterialRenderGameObjectMap |> SparseMapService.getValidValues;

let getLightMaterialRenderGameObjectArray = ({lightMaterialRenderGameObjectMap}) =>
  lightMaterialRenderGameObjectMap |> SparseMapService.getValidValues;

let removeFromRenderGameObjectMap =
    (
      meshRenderer,
      {basicMaterialRenderGameObjectMap, lightMaterialRenderGameObjectMap} as meshRendererRecord,
    ) => {
  ...meshRendererRecord,
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