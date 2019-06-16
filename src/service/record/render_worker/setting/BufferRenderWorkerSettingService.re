open RenderWorkerSettingType;

let unsafeGetInstanceBuffer = ({instanceBuffer}) =>
  instanceBuffer |> OptionService.unsafeGet;

let getSourceInstanceCount = record =>
  (record |> unsafeGetInstanceBuffer).sourceInstanceCount;

let getObjectInstanceCountPerSourceInstance = record =>
  (record |> unsafeGetInstanceBuffer).objectInstanceCountPerSourceInstance;

let unsafeGetBasicSourceTextureCount = ({basicSourceTextureCount}) =>
  basicSourceTextureCount |> OptionService.unsafeGet;

let unsafeGetArrayBufferViewSourceTextureCount =
    ({arrayBufferViewSourceTextureCount}) =>
  arrayBufferViewSourceTextureCount |> OptionService.unsafeGet;

let unsafeGetDirectionLightCount = ({directionLightCount}) =>
  directionLightCount |> OptionService.unsafeGet;

let unsafeGetPointLightCount = ({pointLightCount}) =>
  pointLightCount |> OptionService.unsafeGet;