let isMaxCount = (lightIndexFromRecord, maxCount) =>
  lightIndexFromRecord >= BufferDirectionLightService.getBufferMaxCount() - 1;