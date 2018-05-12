open RenderSettingType;

let unsafeGetGPU = ({gpu}) => gpu |> OptionService.unsafeGet;

let unsafeGetObjectInstanceCountPerSourceInstance = ({instanceBuffer}) =>
  OptionService.unsafeGet(instanceBuffer).objectInstanceCountPerSourceInstance;

let getTextureCountPerMaterial = ({textureCountPerMaterial}) =>
  textureCountPerMaterial |> OptionService.unsafeGet;