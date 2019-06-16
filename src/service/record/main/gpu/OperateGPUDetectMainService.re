open StateDataMainType;

let getMaxTextureUnit = state => state.gpuDetectRecord.maxTextureUnit;

let unsafeGetMaxTextureUnit = state =>
  getMaxTextureUnit(state) |> OptionService.unsafeGet;