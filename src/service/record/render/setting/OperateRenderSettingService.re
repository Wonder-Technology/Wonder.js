open RenderSettingType;

let unsafeGetGPU = ({gpu}) => gpu |> OptionService.unsafeGet;

let unsafeGetObjectInstanceCountPerSourceInstance = ({instanceBuffer}) =>
  OptionService.unsafeGet(instanceBuffer).
    objectInstanceCountPerSourceInstance;