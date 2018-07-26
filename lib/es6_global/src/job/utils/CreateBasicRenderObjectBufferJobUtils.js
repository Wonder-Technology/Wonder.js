

import * as RecordRenderMainService$Wonderjs from "../../service/state/main/render/RecordRenderMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as RenderArrayMeshRendererService$Wonderjs from "../../service/record/main/meshRenderer/RenderArrayMeshRendererService.js";
import * as RecordBasicRenderObjectMainService$Wonderjs from "../../service/state/main/render/RecordBasicRenderObjectMainService.js";
import * as SetRenderObjectBufferDataMainService$Wonderjs from "../../service/state/main/render/SetRenderObjectBufferDataMainService.js";

function execJob(state) {
  var meshRendererRecord = state[/* meshRendererRecord */24];
  return SetRenderObjectBufferDataMainService$Wonderjs.setData(RenderArrayMeshRendererService$Wonderjs.getBasicMaterialRenderArray(meshRendererRecord), GetComponentGameObjectService$Wonderjs.unsafeGetBasicMaterialComponent, RecordBasicRenderObjectMainService$Wonderjs.getRecord(RecordRenderMainService$Wonderjs.getRecord(state)), state);
}

export {
  execJob ,
  
}
/* RecordRenderMainService-Wonderjs Not a pure module */
