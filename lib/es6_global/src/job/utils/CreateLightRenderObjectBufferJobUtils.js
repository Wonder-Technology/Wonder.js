

import * as RecordRenderMainService$Wonderjs from "../../service/state/main/render/RecordRenderMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../../service/state/main/meshRenderer/RecordMeshRendererMainService.js";
import * as RenderArrayMeshRendererService$Wonderjs from "../../service/record/main/meshRenderer/RenderArrayMeshRendererService.js";
import * as RecordLightRenderObjectMainService$Wonderjs from "../../service/state/main/render/RecordLightRenderObjectMainService.js";
import * as SetRenderObjectBufferDataMainService$Wonderjs from "../../service/state/main/render/SetRenderObjectBufferDataMainService.js";

function execJob(state) {
  return SetRenderObjectBufferDataMainService$Wonderjs.setData(RenderArrayMeshRendererService$Wonderjs.getLightMaterialRenderGameObjectArray(RecordMeshRendererMainService$Wonderjs.getRecord(state)), GetComponentGameObjectService$Wonderjs.unsafeGetLightMaterialComponent, RecordLightRenderObjectMainService$Wonderjs.getRecord(RecordRenderMainService$Wonderjs.getRecord(state)), state);
}

export {
  execJob ,
  
}
/* RecordRenderMainService-Wonderjs Not a pure module */
