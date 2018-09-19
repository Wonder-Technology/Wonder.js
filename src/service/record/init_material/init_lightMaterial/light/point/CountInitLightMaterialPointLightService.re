open InitLightMaterialPointLightType;

let getLightCount = ({index}) =>
  CountLightService.checkNotExceedMaxCount(
    index,
    BufferPointLightService.getBufferMaxCount(),
  );