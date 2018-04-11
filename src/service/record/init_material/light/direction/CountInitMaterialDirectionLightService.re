open InitMaterialDirectionLightType;

let getLightCount = ({index}) =>
  CountLightService.getLightCount(index, BufferDirectionLightService.getBufferMaxCount());