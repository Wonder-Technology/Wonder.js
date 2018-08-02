open StateDataRenderWorkerType;

open RenderWorkerMeshRendererType;

let getRecord = ({meshRendererRecord}) =>
  meshRendererRecord |> OptionService.unsafeGet;