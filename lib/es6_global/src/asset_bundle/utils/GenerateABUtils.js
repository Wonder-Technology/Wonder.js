

import * as BufferUtils$Wonderjs from "../../asset/utils/BufferUtils.js";
import * as DataViewCommon$Wonderjs from "../../asset/generate/DataViewCommon.js";

function getHeaderTotalByteLength(param) {
  return 8;
}

function writeHeader(jsonByteLength, bufferAlignedByteLength, dataView) {
  var __x = DataViewCommon$Wonderjs.writeUint32_1(jsonByteLength, 0, dataView);
  return DataViewCommon$Wonderjs.writeUint32_1(bufferAlignedByteLength, __x, dataView);
}

function getEmptyEncodedUint8Data(param) {
  var encoder = new TextEncoder();
  var emptyUint8DataArr = encoder.encode(" ");
  return emptyUint8DataArr[0];
}

function _writeUint8ArrayToArrayBufferWithEmptyData(byteOffset, param, dataView) {
  var uint8Array = param[2];
  var uint8ArrayAlignedByteLength = param[1];
  var emptyUint8Data = param[0];
  var resultByteOffset = byteOffset + uint8ArrayAlignedByteLength | 0;
  var byteOffset$1 = byteOffset;
  var uint8ArrayByteLength = uint8Array.length;
  for(var i = 0 ,i_finish = uint8ArrayAlignedByteLength - 1 | 0; i <= i_finish; ++i){
    var value = i >= uint8ArrayByteLength ? emptyUint8Data : uint8Array[i];
    byteOffset$1 = DataViewCommon$Wonderjs.writeUint8_1(value, byteOffset$1, dataView);
  }
  return /* tuple */[
          resultByteOffset,
          uint8Array,
          dataView
        ];
}

function writeJson(byteOffset, param, dataView) {
  return _writeUint8ArrayToArrayBufferWithEmptyData(byteOffset, /* tuple */[
              param[0],
              param[1],
              param[2]
            ], dataView);
}

function computeByteLength(bufferTotalAlignedByteLength, jsonUint8Array) {
  var jsonByteLength = jsonUint8Array.byteLength;
  var jsonAlignedByteLength = BufferUtils$Wonderjs.alignedLength(jsonByteLength);
  var totalByteLength = (8 + jsonAlignedByteLength | 0) + bufferTotalAlignedByteLength | 0;
  return /* tuple */[
          jsonByteLength,
          jsonAlignedByteLength,
          totalByteLength
        ];
}

function buildJsonUint8Array(jsonRecord) {
  var encoder = new TextEncoder();
  return encoder.encode(JSON.stringify(jsonRecord));
}

function readHeader(dataView) {
  var match = DataViewCommon$Wonderjs.getUint32_1(0, dataView);
  var match$1 = DataViewCommon$Wonderjs.getUint32_1(match[1], dataView);
  return /* tuple */[
          match$1[1],
          match[0],
          match$1[0]
        ];
}

function getJsonStr(jsonByteLength, rab) {
  var decoder = new TextDecoder("utf-8");
  return decoder.decode(new Uint8Array(rab, 8, jsonByteLength));
}

function getBuffer(jsonByteLength, rab) {
  return rab.slice(BufferUtils$Wonderjs.alignedLength(8 + jsonByteLength | 0));
}

export {
  getHeaderTotalByteLength ,
  writeHeader ,
  getEmptyEncodedUint8Data ,
  _writeUint8ArrayToArrayBufferWithEmptyData ,
  writeJson ,
  computeByteLength ,
  buildJsonUint8Array ,
  readHeader ,
  getJsonStr ,
  getBuffer ,
  
}
/* BufferUtils-Wonderjs Not a pure module */
