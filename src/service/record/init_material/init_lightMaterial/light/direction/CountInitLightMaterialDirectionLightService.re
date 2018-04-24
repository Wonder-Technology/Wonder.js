open InitLightMaterialDirectionLightType;

let getLightCount = ({index}) =>
  CountLightService.getLightCount(index, BufferDirectionLightService.getBufferMaxCount());