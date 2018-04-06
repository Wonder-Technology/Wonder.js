open InitMaterialDirectionLightType;

let getLightCount = ({index}) =>
  CountLightService.getLightCount(index, RecordDirectionLightService.getBufferMaxCount());