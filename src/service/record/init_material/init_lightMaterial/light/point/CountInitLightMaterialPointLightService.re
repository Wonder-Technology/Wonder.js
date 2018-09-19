open InitLightMaterialPointLightType;

let getLightCount = ({renderLightArr}) =>
  renderLightArr
  |> CountLightService.getLightCount
  |> CountLightService.checkNotExceedMaxCount(
       _,
       BufferPointLightService.getBufferMaxCount(),
     );