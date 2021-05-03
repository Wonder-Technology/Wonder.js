

import * as Caml_int32 from "./../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function getDefault11ImageUint8ArrayData(param) {
  return /* tuple */[
          new Uint8Array(/* array */[
                137,
                80,
                78,
                71,
                13,
                10,
                26,
                10,
                0,
                0,
                0,
                13,
                73,
                72,
                68,
                82,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1,
                8,
                6,
                0,
                0,
                0,
                31,
                21,
                196,
                137,
                0,
                0,
                0,
                13,
                73,
                68,
                65,
                84,
                24,
                87,
                99,
                248,
                255,
                255,
                255,
                25,
                0,
                9,
                200,
                3,
                202,
                69,
                126,
                87,
                75,
                0,
                0,
                0,
                0,
                73,
                69,
                78,
                68,
                174,
                66,
                96,
                130
              ]),
          "image/png",
          "load default11 image error"
        ];
}

function getStreamChunkArr(param, dataView) {
  var _get = function (currentByteOffset, endByteOffset, dataView, streamChunkArr) {
    var match = currentByteOffset >= endByteOffset;
    if (match) {
      return /* tuple */[
              currentByteOffset,
              endByteOffset,
              streamChunkArr
            ];
    } else {
      var match$1 = DataViewCommon$Wonderjs.getUint32_1(currentByteOffset, dataView);
      var match$2 = DataViewCommon$Wonderjs.getUint16_1(match$1[1], dataView);
      var match$3 = DataViewCommon$Wonderjs.getUint32_1(match$2[1], dataView);
      var match$4 = DataViewCommon$Wonderjs.getUint8_1(match$3[1], dataView);
      return Contract$WonderLog.ensureCheck((function (param) {
                    var endByteOffset = param[1];
                    var currentByteOffset = param[0];
                    return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("currentByteOffset === endByteOffset", "not"), (function (param) {
                                  return Contract$WonderLog.Operators[/* = */0](currentByteOffset, endByteOffset);
                                }));
                  }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), _get(match$4[1], endByteOffset, dataView, ArrayService$Wonderjs.push(/* record */[
                          /* byteLength */match$1[0],
                          /* index */match$3[0],
                          /* type_ */match$4[0],
                          /* componentType */match$2[0]
                        ], streamChunkArr)));
    }
  };
  var currentByteOffset = BufferUtils$Wonderjs.getWDBHeaderTotalByteLength(/* () */0) + BufferUtils$Wonderjs.alignedLength(param[0]) | 0;
  var endByteOffset = currentByteOffset + param[1] | 0;
  return _get(currentByteOffset, endByteOffset, dataView, /* array */[])[2];
}

function _writeStreamChunk(streamChunkArr, byteOffset, dataView) {
  var byteOffset$1 = BufferUtils$Wonderjs.alignedLength(ArrayService$WonderCommonlib.reduceOneParam((function (byteOffset, param) {
              var byteOffset$1 = DataViewCommon$Wonderjs.writeUint32_1(param[/* byteLength */0], byteOffset, dataView);
              var byteOffset$2 = DataViewCommon$Wonderjs.writeUint16_1(param[/* componentType */3], byteOffset$1, dataView);
              var byteOffset$3 = DataViewCommon$Wonderjs.writeUint32_1(param[/* index */1], byteOffset$2, dataView);
              return DataViewCommon$Wonderjs.writeUint8_1(param[/* type_ */2], byteOffset$3, dataView);
            }), byteOffset, streamChunkArr));
  return /* tuple */[
          byteOffset$1,
          dataView
        ];
}

function _getStreamChunkArrByteLength(streamChunkArr) {
  return Caml_int32.imul(((Uint32Array.BYTES_PER_ELEMENT << 1) + Uint16Array.BYTES_PER_ELEMENT | 0) + Uint8Array.BYTES_PER_ELEMENT | 0, streamChunkArr.length);
}

var getStreamChunkTotalByteLength = _getStreamChunkArrByteLength;

function buildStreamChunk(byteOffset, streamChunkArr, dataView) {
  return _writeStreamChunk(streamChunkArr, byteOffset, dataView);
}

function _getBinBufferAlignedByteLength(bufferViewDataArr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (byteLength, param) {
                return byteLength + param[2] | 0;
              }), 0, bufferViewDataArr);
}

function _writeBinBufferByBufferViewData(totalByteOffset, param, binBufferDataView, totalDataView) {
  var oldBufferView = param[0];
  var bufferViewByteOffsetRef = BufferUtils$Wonderjs.unsafeGetBufferViewByteOffset(oldBufferView);
  var totalByteOffsetRef = totalByteOffset;
  var binBuffer = binBufferDataView.buffer;
  var totalBuffer = totalDataView.buffer;
  BufferUtils$Wonderjs.mergeUint8Array(new Uint8Array(totalBuffer), new Uint8Array(binBuffer).subarray(bufferViewByteOffsetRef, bufferViewByteOffsetRef + oldBufferView[/* byteLength */2] | 0), totalByteOffsetRef);
  return /* tuple */[
          totalByteOffset + param[2] | 0,
          binBufferDataView,
          totalDataView
        ];
}

var getBinBufferChunkTotalAlignedByteLength = _getBinBufferAlignedByteLength;

function buildBinBufferChunk(byteOffset, bufferViewDataArr, binBuffer, dataView) {
  var binBufferDataView = DataViewCommon$Wonderjs.create(binBuffer);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, bufferViewData) {
          return _writeBinBufferByBufferViewData(param[0], bufferViewData, param[1], param[2]);
        }), /* tuple */[
        byteOffset,
        binBufferDataView,
        dataView
      ], bufferViewDataArr);
  return /* tuple */[
          match[0],
          match[2]
        ];
}

export {
  getDefault11ImageUint8ArrayData ,
  getStreamChunkArr ,
  _writeStreamChunk ,
  _getStreamChunkArrByteLength ,
  getStreamChunkTotalByteLength ,
  buildStreamChunk ,
  _getBinBufferAlignedByteLength ,
  _writeBinBufferByBufferViewData ,
  getBinBufferChunkTotalAlignedByteLength ,
  buildBinBufferChunk ,
  
}
/* Log-WonderLog Not a pure module */
