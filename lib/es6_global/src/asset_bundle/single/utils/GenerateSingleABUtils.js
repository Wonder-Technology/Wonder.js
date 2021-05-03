

import * as BufferUtils$Wonderjs from "../../../asset/utils/BufferUtils.js";
import * as DataViewCommon$Wonderjs from "../../../asset/generate/DataViewCommon.js";
import * as GenerateABUtils$Wonderjs from "../../utils/GenerateABUtils.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _writeBuffer(headerAndJsonAlignedByteOffset, param, arrayBuffer) {
  var geometryUint8ArrayArr = param[2];
  var imageUint8ArrayArr = param[1];
  var match = param[0];
  var uint8Array = new Uint8Array(arrayBuffer);
  var uint8Array$1 = ArrayService$WonderCommonlib.reduceOneParami((function (uint8Array, param, index) {
          var imageUint8Array = imageUint8ArrayArr[index];
          return BufferUtils$Wonderjs.mergeUint8Array(uint8Array, imageUint8Array, headerAndJsonAlignedByteOffset + param[0] | 0);
        }), uint8Array, match[0]);
  return ArrayService$WonderCommonlib.reduceOneParami((function (uint8Array, param, index) {
                var geometryUint8Array = geometryUint8ArrayArr[index];
                return BufferUtils$Wonderjs.mergeUint8Array(uint8Array, geometryUint8Array, headerAndJsonAlignedByteOffset + param[0] | 0);
              }), uint8Array$1, match[1]).buffer;
}

function generateAB(param, bufferTotalAlignedByteLength, jsonUint8Array) {
  var match = param[0];
  var match$1 = GenerateABUtils$Wonderjs.computeByteLength(bufferTotalAlignedByteLength, jsonUint8Array);
  var dataView = DataViewCommon$Wonderjs.create(new ArrayBuffer(match$1[2]));
  var byteOffset = GenerateABUtils$Wonderjs.writeHeader(match$1[0], bufferTotalAlignedByteLength, dataView);
  var emptyEncodedUint8Data = GenerateABUtils$Wonderjs.getEmptyEncodedUint8Data(/* () */0);
  var match$2 = GenerateABUtils$Wonderjs.writeJson(byteOffset, /* tuple */[
        emptyEncodedUint8Data,
        match$1[1],
        jsonUint8Array
      ], dataView);
  return _writeBuffer(match$2[0], /* tuple */[
              /* tuple */[
                match[0],
                match[1]
              ],
              param[1],
              param[2]
            ], match$2[2].buffer);
}

export {
  _writeBuffer ,
  generateAB ,
  
}
/* BufferUtils-Wonderjs Not a pure module */
