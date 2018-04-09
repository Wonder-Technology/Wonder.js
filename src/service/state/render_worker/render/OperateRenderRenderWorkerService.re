open RenderWorkerRenderType;

open StateDataRenderWorkerType;

let unsafeGetCameraRecord = (state) => state.renderRecord.cameraRecord |> OptionService.unsafeGet;

let getBasicRenderObjectRecord = (state) => state.renderRecord.basicRenderObjectRecord;