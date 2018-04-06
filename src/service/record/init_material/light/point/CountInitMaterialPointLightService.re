open InitMaterialPointLightType;

let getLightCount = ({index}) =>
  CountLightService.getLightCount(index, RecordPointLightService.getBufferMaxCount());