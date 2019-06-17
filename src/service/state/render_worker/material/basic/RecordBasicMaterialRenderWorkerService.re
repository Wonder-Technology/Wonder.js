open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let getRecord = ({basicMaterialRecord}) =>
  basicMaterialRecord |> OptionService.unsafeGet;

let unsafeGetShaderIndices = state =>
  getRecord(state).shaderIndices |> OptionService.unsafeGet;

let unsafeGetIsDepthTests = state =>
  getRecord(state).isDepthTests |> OptionService.unsafeGet;

let unsafeGetAlphas = state =>
  getRecord(state).alphas |> OptionService.unsafeGet;