

import * as TypeArrayService$Wonderjs from "../../service/primitive/buffer/TypeArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _fillVertexBuffer(buffer, points, offset) {
  TypeArrayService$Wonderjs.setFloat32Array(points, new Float32Array(buffer, offset, points.length));
  return buffer;
}

function _fillIndex16Buffer(buffer, indices16, offset) {
  TypeArrayService$Wonderjs.setUint16Array(indices16, new Uint16Array(buffer, offset, indices16.length));
  return buffer;
}

function _fillIndex32Buffer(buffer, indices32, offset) {
  TypeArrayService$Wonderjs.setUint32Array(indices32, new Uint32Array(buffer, offset, indices32.length));
  return buffer;
}

function _fillImageUint8ArrayBuffer(buffer, uint8Array, offset) {
  TypeArrayService$Wonderjs.setUint8Array(uint8Array, new Uint8Array(buffer, offset, uint8Array.length));
  return buffer;
}

function _fillIMGUIArrayBuffer(buffer, arrayBuffer, offset) {
  TypeArrayService$Wonderjs.setUint8Array(new Uint8Array(arrayBuffer), new Uint8Array(buffer, offset, arrayBuffer.byteLength));
  return buffer;
}

function build(totalByteLength, param, imageUint8DataArr, assetArrayBufferDataArr) {
  var buffer = new ArrayBuffer(totalByteLength);
  var buffer$1 = ArrayService$WonderCommonlib.reduceOneParam((function (buffer, param) {
          return _fillVertexBuffer(buffer, param[1], param[0]);
        }), buffer, param[0]);
  var buffer$2 = ArrayService$WonderCommonlib.reduceOneParam((function (buffer, param) {
          return _fillIndex16Buffer(buffer, param[1], param[0]);
        }), buffer$1, param[1]);
  var buffer$3 = ArrayService$WonderCommonlib.reduceOneParam((function (buffer, param) {
          return _fillIndex32Buffer(buffer, param[1], param[0]);
        }), buffer$2, param[2]);
  var buffer$4 = ArrayService$WonderCommonlib.reduceOneParam((function (buffer, param) {
          return _fillImageUint8ArrayBuffer(buffer, param[/* uint8Array */3], param[/* byteOffset */4]);
        }), buffer$3, imageUint8DataArr);
  return ArrayService$WonderCommonlib.reduceOneParam((function (buffer, param) {
                return _fillIMGUIArrayBuffer(buffer, param[/* arrayBuffer */0], param[/* byteOffset */1]);
              }), buffer$4, assetArrayBufferDataArr);
}

export {
  _fillVertexBuffer ,
  _fillIndex16Buffer ,
  _fillIndex32Buffer ,
  _fillImageUint8ArrayBuffer ,
  _fillIMGUIArrayBuffer ,
  build ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
