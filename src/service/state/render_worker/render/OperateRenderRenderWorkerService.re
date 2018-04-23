open RenderWorkerRenderType;

open StateDataRenderWorkerType;

let getCameraRecord = (state) => state.renderRecord.cameraRecord;

let unsafeGetCameraRecord = (state) => getCameraRecord(state) |> OptionService.unsafeGet;

let getBasicRenderObjectRecord = (state) => state.renderRecord.basicRenderObjectRecord;

let getLightRenderObjectRecord = (state) => state.renderRecord.lightRenderObjectRecord;