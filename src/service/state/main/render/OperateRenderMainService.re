open RenderType;

open StateDataMainType;

let getCameraRecord = (state) => RecordRenderMainService.getRecord(state).cameraRecord;

let unsafeGetCameraRecord = (state) => state |> getCameraRecord |> OptionService.unsafeGet;

let setCameraRecord = (cameraRecord, state: StateDataMainType.state) => {
  RecordRenderMainService.getRecord(state).cameraRecord = cameraRecord;
  state
};

let getBasicRenderObjectRecord = (state) =>
  RecordRenderMainService.getRecord(state).basicRenderObjectRecord;

let unsafeGetBasicRenderObjectRecord = (state) =>
  getBasicRenderObjectRecord(state) |> OptionService.unsafeGet;

let getLightRenderObjectRecord = (state) =>
  RecordRenderMainService.getRecord(state).lightRenderObjectRecord;