open StateDataRenderWorkerType;

open RenderWorkerArrayBufferViewSourceTextureType;

let getRecord = ({arrayBufferViewSourceTextureRecord}) =>
  arrayBufferViewSourceTextureRecord |> OptionService.unsafeGet;