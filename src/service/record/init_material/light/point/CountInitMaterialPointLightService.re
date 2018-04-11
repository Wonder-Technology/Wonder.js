open InitMaterialPointLightType;

let getLightCount = ({index}) =>
  CountLightService.getLightCount(index, BufferPointLightService.getBufferMaxCount());