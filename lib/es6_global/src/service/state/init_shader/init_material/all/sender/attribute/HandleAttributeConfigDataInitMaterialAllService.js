

import * as ArrayService$Wonderjs from "../../../../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../../../../../record/all/location/GLSLLocationService.js";
import * as SendGLSLDataService$Wonderjs from "../../../../../../record/all/sender/SendGLSLDataService.js";
import * as DrawGLSLInitShaderAllService$Wonderjs from "../../../../all/sender/DrawGLSLInitShaderAllService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as HandleShaderConfigDataMapService$Wonderjs from "../../../../../../primitive/sender/HandleShaderConfigDataMapService.js";
import * as SendGLSLDataSendRenderDataService$Wonderjs from "../../../../../sub/send_render_data/SendGLSLDataSendRenderDataService.js";

function addModelMatrixInstanceArrayBufferSendData(param, param$1) {
  return /* tuple */[
          param$1[0],
          ArrayService$Wonderjs.push(/* record */[
                /* pos */GLSLLocationService$Wonderjs.getAttribLocationAndCache(param[1], param[2], param[3], param[0]),
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
                /* pos */GLSLLocationService$Wonderjs.getAttribLocationAndCache(param[1], param[2], param[5], param[0]),
                /* size */SendGLSLDataService$Wonderjs.getBufferSizeByType(param[4]),
                /* buffer */param[3],
                /* sendFunc */SendGLSLDataSendRenderDataService$Wonderjs.sendBuffer
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
                /* sendFunc */DrawGLSLInitShaderAllService$Wonderjs.bindElementArrayBuffer
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

function _setToAttributeSendMap(shaderIndex, attributeLocationMap, glslSenderRecord, param) {
  MutableSparseMapService$WonderCommonlib.set(shaderIndex, param[0], glslSenderRecord[/* attributeSendDataMap */0]);
  MutableSparseMapService$WonderCommonlib.set(shaderIndex, param[1], glslSenderRecord[/* instanceAttributeSendDataMap */1]);
  return glslSenderRecord;
}

function addAttributeSendData(param, shaderLibDataArr, readAttributeSendDataFunc, param$1) {
  var glslLocationRecord = param$1[1];
  var shaderIndex = param[1];
  var attributeLocationMap = HandleShaderConfigDataMapService$Wonderjs.getOrCreateHashMap(GLSLLocationService$Wonderjs.getAttributeLocationMap(shaderIndex, glslLocationRecord));
  return /* tuple */[
          _setToAttributeSendMap(shaderIndex, attributeLocationMap, param$1[0], readAttributeSendDataFunc(shaderLibDataArr, param[0], param[2], attributeLocationMap)),
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
/* ArrayService-Wonderjs Not a pure module */
