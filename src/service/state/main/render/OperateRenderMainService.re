open RenderType;

open StateDataMainType;

let unsafeGetCameraRecord = (state) => state.renderRecord.cameraRecord |> OptionService.unsafeGet;

let setCameraRecord = (cameraRecord, state: StateDataMainType.state) => {
  state.renderRecord.cameraRecord = cameraRecord;
  state
};

let getBasicRenderObjectRecord = (state) => state.renderRecord.basicRenderObjectRecord;

let unsafeGetBasicRenderObjectRecord = (state) =>
  getBasicRenderObjectRecord(state) |> OptionService.unsafeGet;

let getLightRenderObjectRecord = (state) => state.renderRecord.lightRenderObjectRecord;