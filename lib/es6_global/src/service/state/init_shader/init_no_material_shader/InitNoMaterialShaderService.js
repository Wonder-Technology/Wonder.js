

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GetDataRenderConfigService$Wonderjs from "../../../record/all/renderConfig/GetDataRenderConfigService.js";
import * as InitShaderInitNoMaterialShaderService$Wonderjs from "./InitShaderInitNoMaterialShaderService.js";
import * as NoMaterialShaderIndexAllShaderService$Wonderjs from "../../../record/all/shader/NoMaterialShaderIndexAllShaderService.js";
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
                NoMaterialShaderIndexAllShaderService$Wonderjs.setShaderIndex(name, shaderIndex, state[/* shaderRecord */1]);
                return state;
              }), state, shaders[/* noMaterialShaders */4]);
}

export {
  init ,
  
}
/* InitShaderInitNoMaterialShaderService-Wonderjs Not a pure module */
