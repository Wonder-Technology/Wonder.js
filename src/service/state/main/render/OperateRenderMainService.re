open RenderType;

open StateDataMainType;

let getCameraRecord = (state) => state.renderRecord.cameraRecord |> OptionService.unsafeGet;

let setCameraRecord = (cameraRecord, state: StateDataMainType.state) => {
  ...state,
  renderRecord: {...state.renderRecord, cameraRecord}
};

let getBasicRenderObjectRecord = (state) => state.renderRecord.basicRenderObjectRecord;

let getLightRenderObjectRecord = (state) => state.renderRecord.lightRenderObjectRecord;