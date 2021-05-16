

import * as GlTool$Wonderjs from "../../gl/GlTool.js";
import * as InstanceBufferRenderService$Wonderjs from "../../../../src/service/state/render/vboBuffer/InstanceBufferRenderService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../src/service/state/main/render/CreateRenderStateMainService.js";

function getDefaultCapacity(param) {
  return 1;
}

function getOrCreateBuffer(sourceInstance, defaultCapacity, state) {
  var state$1 = CreateRenderStateMainService$Wonderjs.createRenderState(state);
  var match = state$1[/* vboBufferRecord */1];
  var match$1 = state$1[/* sourceInstanceRecord */17];
  return InstanceBufferRenderService$Wonderjs.getOrCreateBuffer(/* tuple */[
              GlTool$Wonderjs.unsafeGetGlFromRenderState(state$1),
              sourceInstance,
              defaultCapacity
            ], /* tuple */[
              match$1[/* matrixInstanceBufferCapacityMap */3],
              match[/* matrixInstanceBufferMap */4]
            ], state$1);
}

var createMatrixFloat32Array = InstanceBufferRenderService$Wonderjs._createMatrixFloat32Array;

export {
  getDefaultCapacity ,
  getOrCreateBuffer ,
  createMatrixFloat32Array ,
  
}
/* GlTool-Wonderjs Not a pure module */
