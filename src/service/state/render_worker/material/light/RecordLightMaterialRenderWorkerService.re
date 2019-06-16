open StateDataRenderWorkerType;

open RenderWorkerLightMaterialType;

let getRecord = ({lightMaterialRecord}) =>
  lightMaterialRecord |> OptionService.unsafeGet;

let unsafeGetShaderIndices = state =>
  getRecord(state).shaderIndices |> OptionService.unsafeGet;

let unsafeGetDiffuseTextureIndices = state =>
  getRecord(state).diffuseTextureIndices |> OptionService.unsafeGet;

let unsafeGetSpecularTextureIndices = state =>
  getRecord(state).specularTextureIndices |> OptionService.unsafeGet;