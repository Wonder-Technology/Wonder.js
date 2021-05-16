

import * as RecordRenderMainService$Wonderjs from "../../service/state/main/render/RecordRenderMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../../service/state/main/meshRenderer/RecordMeshRendererMainService.js";
import * as RenderArrayMeshRendererService$Wonderjs from "../../service/record/main/meshRenderer/RenderArrayMeshRendererService.js";
import * as RecordBasicRenderObjectMainService$Wonderjs from "../../service/state/main/render/RecordBasicRenderObjectMainService.js";
import * as SetRenderObjectBufferDataMainService$Wonderjs from "../../service/state/main/render/SetRenderObjectBufferDataMainService.js";

function execJob(state) {
  return SetRenderObjectBufferDataMainService$Wonderjs.setData(RenderArrayMeshRendererService$Wonderjs.getBasicMaterialRenderGameObjectArray(RecordMeshRendererMainService$Wonderjs.getRecord(state)), GetComponentGameObjectService$Wonderjs.unsafeGetBasicMaterialComponent, RecordBasicRenderObjectMainService$Wonderjs.getRecord(RecordRenderMainService$Wonderjs.getRecord(state)), state);
}

export {
  execJob ,
  
}
/* RecordRenderMainService-Wonderjs Not a pure module */
