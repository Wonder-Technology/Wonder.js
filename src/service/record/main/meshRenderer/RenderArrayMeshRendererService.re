open MeshRendererType;

let getBasicMaterialRenderArray = ({basicMaterialRenderGameObjectMap}) =>
  basicMaterialRenderGameObjectMap |> SparseMapService.getValidValues;

let getLightMaterialRenderArray = ({lightMaterialRenderGameObjectMap}) =>
  lightMaterialRenderGameObjectMap |> SparseMapService.getValidValues;

let removeFromRenderGameObjectMap =
    (
      meshRenderer,
      {
        isBasicMaterialRenderGameObjectMapForDeepCopy,
        isLightMaterialRenderGameObjectMapForDeepCopy,
        basicMaterialRenderGameObjectMap,
        lightMaterialRenderGameObjectMap,
      } as meshRendererRecord,
    ) => {
  let isInBasicMaterialRenderGameObjectMap =
    basicMaterialRenderGameObjectMap
    |> WonderCommonlib.SparseMapService.has(meshRenderer);
  let isInLightMaterialRenderGameObjectMap =
    lightMaterialRenderGameObjectMap
    |> WonderCommonlib.SparseMapService.has(meshRenderer);

  {
    ...meshRendererRecord,
    isBasicMaterialRenderGameObjectMapForDeepCopy:
      isInBasicMaterialRenderGameObjectMap ?
        true : isBasicMaterialRenderGameObjectMapForDeepCopy,
    isLightMaterialRenderGameObjectMapForDeepCopy:
      isInLightMaterialRenderGameObjectMap ?
        true : isLightMaterialRenderGameObjectMapForDeepCopy,
    basicMaterialRenderGameObjectMap:
      isInBasicMaterialRenderGameObjectMap ?
        basicMaterialRenderGameObjectMap
        |> Obj.magic
        |> WonderCommonlib.SparseMapService.deleteVal(meshRenderer)
        |> Obj.magic :
        basicMaterialRenderGameObjectMap,
    lightMaterialRenderGameObjectMap:
      isInLightMaterialRenderGameObjectMap ?
        lightMaterialRenderGameObjectMap
        |> Obj.magic
        |> WonderCommonlib.SparseMapService.deleteVal(meshRenderer)
        |> Obj.magic :
        lightMaterialRenderGameObjectMap,
  };
};