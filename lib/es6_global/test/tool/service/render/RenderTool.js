

import * as RecordRenderMainService$Wonderjs from "../../../../src/service/state/main/render/RecordRenderMainService.js";
import * as OperateRenderMainService$Wonderjs from "../../../../src/service/state/main/render/OperateRenderMainService.js";
import * as RecordBasicRenderObjectMainService$Wonderjs from "../../../../src/service/state/main/render/RecordBasicRenderObjectMainService.js";

var getRenderRecord = RecordRenderMainService$Wonderjs.getRecord;

function getBasicRenderObjectRecord(state) {
  return RecordBasicRenderObjectMainService$Wonderjs.getRecord(RecordRenderMainService$Wonderjs.getRecord(state));
}

var unsafeGetCameraRecord = OperateRenderMainService$Wonderjs.unsafeGetCameraRecord;

function getCameraRecord(state) {
  return RecordRenderMainService$Wonderjs.getRecord(state)[/* cameraRecord */2];
}

export {
  getRenderRecord ,
  getBasicRenderObjectRecord ,
  unsafeGetCameraRecord ,
  getCameraRecord ,
  
}
/* RecordRenderMainService-Wonderjs Not a pure module */
