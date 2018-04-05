open SettingType;

let getMaxDisposeCount = (record) => OperateSettingService.unsafeGetMemory(record).maxDisposeCount;

let getMaxTypeArrayPoolSize = (record) =>
  OperateSettingService.unsafeGetMemory(record).maxTypeArrayPoolSize;

let getMaxBigTypeArrayPoolSize = (record) =>
  OperateSettingService.unsafeGetMemory(record).maxBigTypeArrayPoolSize;