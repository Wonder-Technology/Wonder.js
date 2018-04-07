open StateDataMainType;

let isCameraRecordExist = (state) => state.renderRecord.cameraRecord |> Js.Option.isSome;

let setCameraRecord = (cameraRecord, state) =>
  OperateRenderMainService.setCameraRecord(cameraRecord, state);