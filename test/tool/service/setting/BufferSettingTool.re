open StateDataMainType;

let getBasicMaterialDataBufferCount = (state) =>
  BufferSettingService.getBasicMaterialDataBufferCount(state.settingRecord);