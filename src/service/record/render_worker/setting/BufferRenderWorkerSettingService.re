open RenderWorkerSettingType;

let unsafeGetInstanceBuffer = ({instanceBuffer}) => instanceBuffer |> OptionService.unsafeGet;

let getSourceInstanceCount = (record) => (record |> unsafeGetInstanceBuffer).sourceInstanceCount;

let getObjectInstanceCountPerSourceInstance = (record) =>
  (record |> unsafeGetInstanceBuffer).objectInstanceCountPerSourceInstance;

let getTextureCountPerMaterial = ({textureCountPerMaterial}) => textureCountPerMaterial;

let unsafeGetBasicSourceTextureCount = ({basicSourceTextureCount}) =>
  basicSourceTextureCount |> OptionService.unsafeGet;

let unsafeGetArrayBufferViewSourceTextureCount = ({arrayBufferViewSourceTextureCount}) =>
  arrayBufferViewSourceTextureCount |> OptionService.unsafeGet;