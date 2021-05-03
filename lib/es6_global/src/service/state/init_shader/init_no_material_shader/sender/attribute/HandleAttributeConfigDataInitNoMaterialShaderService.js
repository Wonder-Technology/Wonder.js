

import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SendGLSLDataService$Wonderjs from "../../../../../record/all/sender/SendGLSLDataService.js";
import * as AllGLSLLocationService$Wonderjs from "../../../../../record/all/location/AllGLSLLocationService.js";
import * as DrawGLSLInitShaderAllService$Wonderjs from "../../../all/sender/DrawGLSLInitShaderAllService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as HandleShaderConfigDataMapService$Wonderjs from "../../../../../primitive/sender/HandleShaderConfigDataMapService.js";
import * as SendGLSLDataSendRenderDataService$Wonderjs from "../../../../render/sub/send_render_data/SendGLSLDataSendRenderDataService.js";

function _addOtherArrayBufferSendData(param, sendDataArr) {
  return ArrayService$Wonderjs.push(/* record */[
              /* pos */AllGLSLLocationService$Wonderjs.getAttribLocationAndCache(param[1], param[2], param[5], param[0]),
              /* size */SendGLSLDataService$Wonderjs.getBufferSizeByType(param[4]),
              /* buffer */param[3],
              /* sendFunc */SendGLSLDataSendRenderDataService$Wonderjs.sendBuffer
            ], sendDataArr);
}

function _addElementBufferSendData(buffer, sendDataArr) {
  return ArrayService$Wonderjs.push(/* record */[
              /* pos */0,
              /* size */0,
              /* buffer */buffer,
              /* sendFunc */DrawGLSLInitShaderAllService$Wonderjs.bindElementArrayBuffer
            ], sendDataArr);
}

function _readAttributes(param, sendDataArr, attributes) {
  var attributeLocationMap = param[2];
  var program = param[1];
  var gl = param[0];
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(attributes);
  if (match) {
    return sendDataArr;
  } else {
    return ArrayService$WonderCommonlib.reduceOneParam((function (sendDataArr, param) {
                  var type_ = param[/* type_ */2];
                  var buffer = param[/* buffer */1];
                  var name = param[/* name */0];
                  var match = !OptionService$Wonderjs.isJsonSerializedValueNone(name) && !OptionService$Wonderjs.isJsonSerializedValueNone(type_);
                  if (match) {
                    var name$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(name);
                    var type_$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(type_);
                    return _addOtherArrayBufferSendData(/* tuple */[
                                gl,
                                program,
                                name$1,
                                buffer,
                                type_$1,
                                attributeLocationMap
                              ], sendDataArr);
                  } else {
                    return _addElementBufferSendData(buffer, sendDataArr);
                  }
                }), sendDataArr, OptionService$Wonderjs.unsafeGetJsonSerializedValue(attributes));
  }
}

function _readAttributeSendData(shaderLibDataArr, gl, program, attributeLocationMap) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (sendDataArr, param) {
                var variables = param[/* variables */2];
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(variables);
                if (match) {
                  return sendDataArr;
                } else {
                  var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(variables);
                  return _readAttributes(/* tuple */[
                              gl,
                              program,
                              attributeLocationMap
                            ], sendDataArr, match$1[/* attributes */1]);
                }
              }), /* array */[], shaderLibDataArr);
}

function _setToAttributeSendMap(shaderIndex, attributeLocationMap, glslSenderRecord, sendDataArr) {
  MutableSparseMapService$WonderCommonlib.set(shaderIndex, sendDataArr, glslSenderRecord[/* attributeSendDataMap */0]);
  return glslSenderRecord;
}

function addAttributeSendData(param, shaderLibDataArr, param$1) {
  var glslLocationRecord = param$1[1];
  var shaderIndex = param[1];
  var attributeLocationMap = HandleShaderConfigDataMapService$Wonderjs.getOrCreateHashMap(AllGLSLLocationService$Wonderjs.getAttributeLocationMap(shaderIndex, glslLocationRecord));
  return /* tuple */[
          _setToAttributeSendMap(shaderIndex, attributeLocationMap, param$1[0], _readAttributeSendData(shaderLibDataArr, param[0], param[2], attributeLocationMap)),
          AllGLSLLocationService$Wonderjs.setAttributeLocationMap(shaderIndex, attributeLocationMap, glslLocationRecord)
        ];
}

export {
  _addOtherArrayBufferSendData ,
  _addElementBufferSendData ,
  _readAttributes ,
  _readAttributeSendData ,
  _setToAttributeSendMap ,
  addAttributeSendData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
