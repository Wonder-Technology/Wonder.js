

import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertUtils$Wonderjs from "./utils/ConvertUtils.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function convertToBuffers(param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr, param) {
                return ArrayService$Wonderjs.push(param[/* byteLength */1], arr);
              }), /* array */[], param[/* buffers */6]);
}

function convertToAccessors(param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr, accessor) {
                var bufferView = accessor[/* bufferView */0];
                return ArrayService$Wonderjs.push(/* record */[
                            /* bufferView */bufferView !== undefined ? bufferView : Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_convertToAccessors", "bufferView should exist", "", "", "")),
                            /* byteOffset */BufferUtils$Wonderjs.unsafeGetAccessorByteOffset(accessor),
                            /* count */accessor[/* count */2],
                            /* componentType */ConvertUtils$Wonderjs.convertComponentType(accessor[/* componentType */3]),
                            /* type_ */BufferUtils$Wonderjs.convertType(accessor[/* type_ */4])
                          ], arr);
              }), /* array */[], param[/* accessors */8]);
}

function convertToBufferViews(param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr, bufferView) {
                return ArrayService$Wonderjs.push(/* record */[
                            /* buffer */bufferView[/* buffer */0],
                            /* byteOffset */BufferUtils$Wonderjs.unsafeGetBufferViewByteOffset(bufferView),
                            /* byteLength */bufferView[/* byteLength */2],
                            /* byteStride */bufferView[/* byteStride */3]
                          ], arr);
              }), /* array */[], param[/* bufferViews */7]);
}

export {
  convertToBuffers ,
  convertToAccessors ,
  convertToBufferViews ,
  
}
/* Log-WonderLog Not a pure module */
