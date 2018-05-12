open StateDataMainType;

let getBasicMaterialCount = (state) =>
  BufferSettingService.getBasicMaterialCount(state.settingRecord);