open StateDataRenderWorkerType;

open RenderWorkerTextureType;

let getRecord = ({textureRecord}) => textureRecord |> OptionService.unsafeGet;