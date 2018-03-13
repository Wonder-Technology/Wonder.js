open DirectionLightType;

let getLightCount = (record) =>
  CountLightService.getLightCount(record.index, RecordDirectionLightService.getBufferMaxCount());