open StateDataRenderWorkerType;

open RenderWorkerBasicSourceTextureType;

let getRecord = ({basicSourceTextureRecord}) => basicSourceTextureRecord |> OptionService.unsafeGet;