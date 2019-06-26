open StateDataRenderWorkerType;

open RenderWorkerCubemapTextureType;

let getRecord = ({cubemapTextureRecord}) =>
  cubemapTextureRecord |> OptionService.unsafeGet;