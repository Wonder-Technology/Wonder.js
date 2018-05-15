open StateDataRenderWorkerType;

open RenderWorkerLightMaterialType;

let getRecord = ({lightMaterialRecord}) => lightMaterialRecord |> OptionService.unsafeGet;

let unsafeGetShaderIndices = (state) => getRecord(state).shaderIndices |> OptionService.unsafeGet;

let unsafeGetDiffuseMapUnits = (state) =>
  getRecord(state).diffuseMapUnits |> OptionService.unsafeGet;

let unsafeGetSpecularMapUnits = (state) =>
  getRecord(state).specularMapUnits |> OptionService.unsafeGet;