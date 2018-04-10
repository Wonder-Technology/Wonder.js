open StateDataMainType;

let isCameraRecordExist = (state) =>
  RenderTool.getRenderRecord(state).cameraRecord |> Js.Option.isSome;

let setCameraRecord = (cameraRecord, state) =>
  OperateRenderMainService.setCameraRecord(cameraRecord, state);