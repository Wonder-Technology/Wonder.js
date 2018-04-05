open RenderType;

open StateDataMainType;

let _getCameraData = (state) => state.renderRecord.cameraRecord |> OptionService.unsafeGet;

let getCameraVMatrixData =
  [@bs] ((state: StateDataMainType.state) => _getCameraData(state).vMatrix);

let getCameraPMatrixData =
  [@bs] ((state: StateDataMainType.state) => _getCameraData(state).pMatrix);

let getCameraPositionData =
  [@bs] ((state: StateDataMainType.state) => _getCameraData(state).position);

let setCameraData = (cameraRecord, state: StateDataMainType.state) => {
  ...state,
  renderRecord: {...state.renderRecord, cameraRecord}
};

let getBasicRenderObjectRecord = (state) => state.renderRecord.basicRenderObjectRecord;

let getLightRenderObjectRecord = (state) => state.renderRecord.lightRenderObjectRecord;