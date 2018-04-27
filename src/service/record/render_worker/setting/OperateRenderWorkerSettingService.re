open RenderWorkerSettingType;

let unsafeGetGPU = ({gpu}) => gpu |> OptionService.unsafeGet;

let unsafeGetMemory = ({memory}) => memory |> OptionService.unsafeGet;