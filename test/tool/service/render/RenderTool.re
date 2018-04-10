open StateDataMainType;

let getRenderRecord = (state) => RecordRenderMainService.getRecord(state);

/* let unsafeGetRenderArrayFromState = (state) =>
   state |> OperateRenderMainService.getRenderArray |> OptionTool.unsafeGet; */
let unsafeGetCameraRecord = (state) => OperateRenderMainService.unsafeGetCameraRecord(state);

let getCameraRecord = (state) => RecordRenderMainService.getRecord(state).cameraRecord;