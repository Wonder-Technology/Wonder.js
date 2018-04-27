open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let getRecord = ({basicMaterialRecord}) => basicMaterialRecord |> OptionService.unsafeGet;

let unsafeGetShaderIndices = (state) =>
  getRecord(state).shaderIndices |> OptionService.unsafeGet;