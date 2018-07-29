let isExceedMaxCount = (lightIndexFromRecord, maxCount) =>
  lightIndexFromRecord >= BufferDirectionLightService.getBufferMaxCount();