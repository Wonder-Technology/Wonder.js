

import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../../../record/all/location/GLSLLocationService.js";
import * as SendGLSLDataService$Wonderjs from "../../../../record/render/sender/SendGLSLDataService.js";
import * as SendGLSLDataAllService$Wonderjs from "../../../all/sender/SendGLSLDataAllService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as DrawGLSLInitMaterialService$Wonderjs from "../../init_lightMaterial/sender/DrawGLSLInitMaterialService.js";
import * as HandleShaderConfigDataMapService$Wonderjs from "../../../../primitive/sender/HandleShaderConfigDataMapService.js";

function addModelMatrixInstanceArrayBufferSendData(param, param$1) {
  return /* tuple */[
          param$1[0],
          ArrayService$Wonderjs.push(/* record */[
                /* pos */GLSLLocationService$Wonderjs.getAttribLocation(param[1], param[2], param[3], param[0]),
                /* size */4,
                /* getOffsetFunc */(function (index) {
                    return (index << 4);
                  })
              ], param$1[1])
        ];
}

function addOtherArrayBufferSendData(param, param$1) {
  return /* tuple */[
          ArrayService$Wonderjs.push(/* record */[
                /* pos */GLSLLocationService$Wonderjs.getAttribLocation(param[1], param[2], param[5], param[0]),
                /* size */SendGLSLDataService$Wonderjs.getBufferSizeByType(param[4]),
                /* buffer */param[3],
                /* sendFunc */SendGLSLDataAllService$Wonderjs.sendBuffer
              ], param$1[0]),
          param$1[1]
        ];
}

function addElementBufferSendData(buffer, param) {
  return /* tuple */[
          ArrayService$Wonderjs.push(/* record */[
                /* pos */0,
                /* size */0,
                /* buffer */buffer,
                /* sendFunc */DrawGLSLInitMaterialService$Wonderjs.bindElementArrayBuffer
              ], param[0]),
          param[1]
        ];
}

function readAttributeSendData(shaderLibDataArr, param, readAttributesFunc, attributeLocationMap) {
  var program = param[1];
  var gl = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (sendDataArrTuple, param) {
                var variables = param[/* variables */2];
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(variables);
                if (match) {
                  return sendDataArrTuple;
                } else {
                  var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(variables);
                  return readAttributesFunc(/* tuple */[
                              gl,
                              program,
                              attributeLocationMap
                            ], sendDataArrTuple, match$1[/* attributes */1]);
                }
              }), /* tuple */[
              /* array */[],
              /* array */[]
            ], shaderLibDataArr);
}

function _setToAttributeSendMap(shaderIndex, _, glslSenderRecord, param) {
  SparseMapService$WonderCommonlib.set(shaderIndex, param[0], glslSenderRecord[/* attributeSendDataMap */0]);
  SparseMapService$WonderCommonlib.set(shaderIndex, param[1], glslSenderRecord[/* instanceAttributeSendDataMap */1]);
  return glslSenderRecord;
}

function addAttributeSendData(param, shaderLibDataArr, readAttributeSendDataFunc, param$1) {
  var glslLocationRecord = param$1[1];
  var glslSenderRecord = param$1[0];
  var shaderIndex = param[1];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not be added before", "be"), (function () {
                        return Contract$WonderLog.assertNotExist(SparseMapService$WonderCommonlib.get(shaderIndex, glslSenderRecord[/* attributeSendDataMap */0]));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var attributeLocationMap = HandleShaderConfigDataMapService$Wonderjs.getOrCreateHashMap(GLSLLocationService$Wonderjs.getAttributeLocationMap(shaderIndex, glslLocationRecord));
  return /* tuple */[
          _setToAttributeSendMap(shaderIndex, attributeLocationMap, glslSenderRecord, readAttributeSendDataFunc(shaderLibDataArr, param[0], param[2], attributeLocationMap)),
          GLSLLocationService$Wonderjs.setAttributeLocationMap(shaderIndex, attributeLocationMap, glslLocationRecord)
        ];
}

export {
  addModelMatrixInstanceArrayBufferSendData ,
  addOtherArrayBufferSendData ,
  addElementBufferSendData ,
  readAttributeSendData ,
  _setToAttributeSendMap ,
  addAttributeSendData ,
  
}
/* Log-WonderLog Not a pure module */
