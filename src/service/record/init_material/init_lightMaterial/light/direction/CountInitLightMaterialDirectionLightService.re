open InitLightMaterialDirectionLightType;

let getLightCount = ({renderLightArr}) =>
  CountInitLightMaterialLightService.getLightCount(
    renderLightArr,
    BufferDirectionLightService.getBufferMaxCount(),
  );