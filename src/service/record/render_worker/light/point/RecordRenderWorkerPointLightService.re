open RenderWorkerPointLightType;

let getPositionMap = record => record.positionMap |> OptionService.unsafeGet;

let getRenderLightArr = record =>
  record.renderLightArr |> OptionService.unsafeGet;