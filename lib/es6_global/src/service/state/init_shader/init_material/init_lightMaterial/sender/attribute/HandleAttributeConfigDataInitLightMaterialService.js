

import * as Caml_int32 from "../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as ArrayService$Wonderjs from "../../../../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AllGLSLLocationService$Wonderjs from "../../../../../../record/all/location/AllGLSLLocationService.js";
import * as HandleAttributeConfigDataInitMaterialAllService$Wonderjs from "../../../all/sender/attribute/HandleAttributeConfigDataInitMaterialAllService.js";

function _addNormalMatrixInstanceArrayBufferSendData(param, param$1) {
  return /* tuple */[
          param$1[0],
          ArrayService$Wonderjs.push(/* record */[
                /* pos */AllGLSLLocationService$Wonderjs.getAttribLocationAndCache(param[1], param[2], param[3], param[0]),
                /* size */3,
                /* getOffsetFunc */(function (index) {
                    return Caml_int32.imul(index - 4 | 0, 12) + 64 | 0;
                  })
              ], param$1[1])
        ];
}

function _readAttributes(param, sendDataArrTuple, attributes) {
  var attributeLocationMap = param[2];
  var program = param[1];
  var gl = param[0];
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(attributes);
  if (match) {
    return sendDataArrTuple;
  } else {
    return ArrayService$WonderCommonlib.reduceOneParam((function (sendDataArrTuple, param) {
                  var type_ = param[/* type_ */2];
                  var buffer = param[/* buffer */1];
                  var name = param[/* name */0];
                  var match = !OptionService$Wonderjs.isJsonSerializedValueNone(name) && !OptionService$Wonderjs.isJsonSerializedValueNone(type_);
                  if (match) {
                    var name$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(name);
                    var type_$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(type_);
                    if (buffer !== 4) {
                      if (buffer >= 5) {
                        return HandleAttributeConfigDataInitMaterialAllService$Wonderjs.addModelMatrixInstanceArrayBufferSendData(/* tuple */[
                                    gl,
                                    program,
                                    name$1,
                                    attributeLocationMap
                                  ], sendDataArrTuple);
                      } else {
                        return HandleAttributeConfigDataInitMaterialAllService$Wonderjs.addOtherArrayBufferSendData(/* tuple */[
                                    gl,
                                    program,
                                    name$1,
                                    buffer,
                                    type_$1,
                                    attributeLocationMap
                                  ], sendDataArrTuple);
                      }
                    } else {
                      return _addNormalMatrixInstanceArrayBufferSendData(/* tuple */[
                                  gl,
                                  program,
                                  name$1,
                                  attributeLocationMap
                                ], sendDataArrTuple);
                    }
                  } else {
                    return HandleAttributeConfigDataInitMaterialAllService$Wonderjs.addElementBufferSendData(buffer, sendDataArrTuple);
                  }
                }), sendDataArrTuple, OptionService$Wonderjs.unsafeGetJsonSerializedValue(attributes));
  }
}

function _readAttributeSendData(shaderLibDataArr, gl, program, attributeLocationMap) {
  return HandleAttributeConfigDataInitMaterialAllService$Wonderjs.readAttributeSendData(shaderLibDataArr, /* tuple */[
              gl,
              program
            ], _readAttributes, attributeLocationMap);
}

function addAttributeSendData(glTuple, shaderLibDataArr, recordTuple) {
  return HandleAttributeConfigDataInitMaterialAllService$Wonderjs.addAttributeSendData(glTuple, shaderLibDataArr, _readAttributeSendData, recordTuple);
}

export {
  _addNormalMatrixInstanceArrayBufferSendData ,
  _readAttributes ,
  _readAttributeSendData ,
  addAttributeSendData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
