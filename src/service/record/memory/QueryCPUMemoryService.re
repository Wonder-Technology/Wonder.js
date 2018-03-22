let isDisposeTooMany = (disposeCount: int, settingRecord) =>
  disposeCount >= MemorySettingService.getMaxDisposeCount(settingRecord);