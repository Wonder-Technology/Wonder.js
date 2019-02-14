

import * as RenderBasicJobCommon$Wonderjs from "../RenderBasicJobCommon.js";
import * as RenderHardwareInstanceJobUtils$Wonderjs from "../../../utils/render/instance/RenderHardwareInstanceJobUtils.js";

function _fillMatrixTypeArr(transform, matricesArrayForInstance, state, offset) {
  RenderHardwareInstanceJobUtils$Wonderjs.fillMatrixTypeArr(transform, matricesArrayForInstance, state, offset);
  return offset + 16 | 0;
}

function render(gl, indexTuple, state) {
  return RenderHardwareInstanceJobUtils$Wonderjs.render(gl, /* tuple */[
              indexTuple,
              4096,
              64,
              64
            ], /* tuple */[
              RenderBasicJobCommon$Wonderjs.render,
              _fillMatrixTypeArr
            ], state);
}

export {
  _fillMatrixTypeArr ,
  render ,
  
}
/* RenderBasicJobCommon-Wonderjs Not a pure module */
