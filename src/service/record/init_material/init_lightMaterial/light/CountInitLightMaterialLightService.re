open InitLightMaterialDirectionLightType;

let getLightCount = (renderLightArr, bufferMaxCount) =>
  renderLightArr
  |> CountLightService.getLightCount
  |> CountLightService.checkNotExceedMaxCount(_, bufferMaxCount);