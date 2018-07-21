open MeshRendererType;

let getBasicMaterialRenderArray = ({basicMaterialRenderGameObjectMap}) =>
  basicMaterialRenderGameObjectMap |> SparseMapService.getValidValues;

let getLightMaterialRenderArray = ({lightMaterialRenderGameObjectMap}) =>
  lightMaterialRenderGameObjectMap |> SparseMapService.getValidValues;