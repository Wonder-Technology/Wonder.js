open RenderWorkerSettingType;

let getMaxBigTypeArrayPoolSize = (record) =>
  OperateRenderWorkerSettingService.unsafeGetMemory(record).maxBigTypeArrayPoolSize;