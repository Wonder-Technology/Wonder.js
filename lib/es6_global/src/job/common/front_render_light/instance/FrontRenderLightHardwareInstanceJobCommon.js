

import * as TypeArrayService$Wonderjs from "../../../../service/primitive/buffer/TypeArrayService.js";
import * as FrontRenderLightJobCommon$Wonderjs from "../FrontRenderLightJobCommon.js";
import * as RenderHardwareInstanceJobUtils$Wonderjs from "../../../utils/render/instance/RenderHardwareInstanceJobUtils.js";
import * as GetTransformDataGetRenderDataService$Wonderjs from "../../../../service/state/sub/get_render_data/transform/GetTransformDataGetRenderDataService.js";

function _fillMatrixTypeArr(transform, matricesArrayForInstance, state, offset) {
  RenderHardwareInstanceJobUtils$Wonderjs.fillMatrixTypeArr(transform, matricesArrayForInstance, state, offset);
  var normalMatrix = GetTransformDataGetRenderDataService$Wonderjs.getNormalMatrixTypeArray(transform, state);
  TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
        matricesArrayForInstance,
        offset + 16 | 0
      ], /* tuple */[
        normalMatrix,
        0
      ], 9);
  return (offset + 16 | 0) + 9 | 0;
}

function render(gl, indexTuple, state) {
  return RenderHardwareInstanceJobUtils$Wonderjs.render(gl, /* tuple */[
              indexTuple,
              6400,
              112,
              100
            ], /* tuple */[
              FrontRenderLightJobCommon$Wonderjs.render,
              _fillMatrixTypeArr
            ], state);
}

export {
  _fillMatrixTypeArr ,
  render ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
