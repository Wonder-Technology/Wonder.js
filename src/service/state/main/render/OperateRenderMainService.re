open RenderType;

open StateDataMainType;

let unsafeGetCameraRecord = (state) => RecordRenderMainService.getRecord(state) .cameraRecord |> OptionService.unsafeGet;

let setCameraRecord = (cameraRecord, state: StateDataMainType.state) => {
  RecordRenderMainService.getRecord(state).cameraRecord = cameraRecord;
  state
};

let getBasicRenderObjectRecord = (state) => RecordRenderMainService.getRecord(state).basicRenderObjectRecord;

let unsafeGetBasicRenderObjectRecord = (state) =>
  getBasicRenderObjectRecord(state) |> OptionService.unsafeGet;

let getLightRenderObjectRecord = (state) => RecordRenderMainService.getRecord(state).lightRenderObjectRecord;