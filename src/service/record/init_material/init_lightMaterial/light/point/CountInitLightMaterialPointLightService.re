open InitLightMaterialPointLightType;

let getLightCount = ({index}) =>
  CountLightService.getLightCount(index, BufferPointLightService.getBufferMaxCount());