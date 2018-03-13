open PointLightType;

let getLightCount = (record) =>
  CountLightService.getLightCount(record.index, RecordPointLightService.getBufferMaxCount());