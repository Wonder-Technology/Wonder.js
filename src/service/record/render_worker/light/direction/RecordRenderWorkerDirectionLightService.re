open RenderWorkerDirectionLightType;

let getDirectionMap = record => record.directionMap |> OptionService.unsafeGet;

let getRenderLightArr = record =>
  record.renderLightArr |> OptionService.unsafeGet;