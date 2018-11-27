open InitLightMaterialPointLightType;

let getLightCount = ({renderLightArr}) =>
  CountInitLightMaterialLightService.getLightCount(
    renderLightArr,
    BufferPointLightService.getBufferMaxCount(),
  );