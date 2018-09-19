open InitLightMaterialDirectionLightType;

let getLightCount = ({renderLightArr}) =>
  renderLightArr
  |> CountLightService.getLightCount
  |> CountLightService.checkNotExceedMaxCount(
       _,
       BufferDirectionLightService.getBufferMaxCount(),
     );