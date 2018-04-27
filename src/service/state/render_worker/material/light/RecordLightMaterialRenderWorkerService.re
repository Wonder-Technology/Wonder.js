open StateDataRenderWorkerType;

open RenderWorkerLightMaterialType;

let getRecord = ({lightMaterialRecord}) => lightMaterialRecord |> OptionService.unsafeGet;

let unsafeGetShaderIndices = (state) =>
  getRecord(state).shaderIndices |> OptionService.unsafeGet;