

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GetDataRenderConfigService$Wonderjs from "../../../record/all/renderConfig/GetDataRenderConfigService.js";
import * as NoMaterialShaderIndexShaderService$Wonderjs from "../../../record/all/shader/NoMaterialShaderIndexShaderService.js";
import * as InitShaderInitNoMaterialShaderService$Wonderjs from "./InitShaderInitNoMaterialShaderService.js";
import * as GetShaderLibDataArrayInitNoMaterialShaderService$Wonderjs from "./GetShaderLibDataArrayInitNoMaterialShaderService.js";

function init(gl, state) {
  var renderConfigRecord = state[/* renderConfigRecord */0];
  var shaders = GetDataRenderConfigService$Wonderjs.getShaders(renderConfigRecord);
  var shaderLibsData = GetDataRenderConfigService$Wonderjs.getShaderLibs(renderConfigRecord);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                var name = param[/* name */0];
                var shaderIndex = InitShaderInitNoMaterialShaderService$Wonderjs.init(/* tuple */[
                      gl,
                      GetShaderLibDataArrayInitNoMaterialShaderService$Wonderjs.getShaderLibDataArr(/* tuple */[
                            shaders,
                            param[/* shaderLibs */1],
                            shaderLibsData
                          ], state),
                      name
                    ], state);
                NoMaterialShaderIndexShaderService$Wonderjs.setShaderIndex(name, shaderIndex, state[/* shaderRecord */1]);
                return state;
              }), state, shaders[/* noMaterialShaders */4]);
}

export {
  init ,
  
}
/* NoMaterialShaderIndexShaderService-Wonderjs Not a pure module */
