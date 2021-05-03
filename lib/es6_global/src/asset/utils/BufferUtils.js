

import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "./../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "./../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as TypeArrayService$Wonderjs from "../../service/primitive/buffer/TypeArrayService.js";

function convertType(type_) {
  switch (type_) {
    case "MAT2" : 
        return /* MAT2 */4;
    case "MAT3" : 
        return /* MAT3 */5;
    case "MAT4" : 
        return /* MAT4 */6;
    case "SCALAR" : 
        return /* SCALAR */0;
    case "VEC2" : 
        return /* VEC2 */1;
    case "VEC3" : 
        return /* VEC3 */2;
    case "VEC4" : 
        return /* VEC4 */3;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("convertToAccessors", "unknown type_:" + (String(type_) + ""), "", "", ""));
  }
}

function getAccessorTypeSize(type_) {
  switch (type_) {
    case 0 : 
        return 1;
    case 1 : 
        return 2;
    case 2 : 
        return 3;
    case 3 : 
    case 4 : 
        return 4;
    case 5 : 
        return 9;
    case 6 : 
        return 16;
    
  }
}

function checkByteLengthShouldBeAligned(byteLength) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("byteLength:" + (String(byteLength) + " aligned with multiple of 4"), "is " + (String(byteLength) + "")), (function (param) {
                return byteLength % 4 === 0;
              }));
}

function copyUint8ArrayToArrayBuffer(byteOffset, param, dataView) {
  var uint8Array = param[2];
  var uint8ArrayAlignedByteLength = param[1];
  var emptyUint8Data = param[0];
  var resultByteOffset = byteOffset + uint8ArrayAlignedByteLength | 0;
  var byteOffset$1 = byteOffset;
  var uint8ArrayByteLength = uint8Array.length;
  for(var i = 0 ,i_finish = uint8ArrayAlignedByteLength - 1 | 0; i <= i_finish; ++i){
    var value = i >= uint8ArrayByteLength ? emptyUint8Data : TypeArrayService$Wonderjs.getUint8_1(i, uint8Array);
    byteOffset$1 = DataViewCommon$Wonderjs.writeUint8_1(value, byteOffset$1, dataView);
  }
  return /* tuple */[
          resultByteOffset,
          uint8Array,
          dataView
        ];
}

function computeTypeArrayLengthByAccessorData(count, type_) {
  return Caml_int32.imul(count, getAccessorTypeSize(type_));
}

function computeByteLengthByAccessorData(count, componentType, type_) {
  var tmp;
  var exit = 0;
  switch (componentType) {
    case 5120 : 
    case 5121 : 
        tmp = 1;
        break;
    case 5122 : 
    case 5123 : 
        tmp = 2;
        break;
    case 5124 : 
        exit = 1;
        break;
    case 5125 : 
    case 5126 : 
        tmp = 4;
        break;
    default:
      exit = 1;
  }
  if (exit === 1) {
    tmp = Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("computeByteLengthByAccessorData", "unknown componentType: " + (String(componentType) + ""), "", "", ""));
  }
  return Caml_int32.imul(Caml_int32.imul(count, getAccessorTypeSize(type_)), tmp);
}

function getHeaderByteLength(param) {
  return 12;
}

function getGLBChunkHeaderByteLength(param) {
  return 8;
}

function getWDBChunkHeaderByteLength(param) {
  return 4;
}

function getWDBHeaderTotalByteLength(param) {
  return 24;
}

function alignedLength(value) {
  if (value !== 0) {
    var multiple = value % 4;
    if (multiple !== 0) {
      return value + (4 - multiple | 0) | 0;
    } else {
      return value;
    }
  } else {
    return value;
  }
}

function _removeAlignedEmptyChars(decodedStr) {
  return decodedStr.trim();
}

function decodeGLB(binary, checkFunc) {
  var dataView = DataViewCommon$Wonderjs.create(binary);
  var dataView$1 = Curry._1(checkFunc, dataView);
  var match = DataViewCommon$Wonderjs.getUint32_1(12, dataView$1);
  var jsonChunkLength = match[0];
  var decoder = new TextDecoder("utf-8");
  return /* tuple */[
          decoder.decode(new Uint8Array(binary, 20, jsonChunkLength)).trim(),
          binary.slice((20 + jsonChunkLength | 0) + 8 | 0)
        ];
}

function getWDBJsonChunkStr(jsonChunkLength, binary) {
  var decoder = new TextDecoder("utf-8");
  return decoder.decode(new Uint8Array(binary, getWDBHeaderTotalByteLength(/* () */0), jsonChunkLength));
}

function decodeWDB(binary, checkFunc) {
  var dataView = DataViewCommon$Wonderjs.create(binary);
  var dataView$1 = Curry._1(checkFunc, dataView);
  var match = DataViewCommon$Wonderjs.getUint32_1(12, dataView$1);
  var jsonChunkLength = match[0];
  var match$1 = DataViewCommon$Wonderjs.getUint32_1(16, dataView$1);
  var streamChunkLength = match$1[0];
  return /* tuple */[
          getWDBJsonChunkStr(jsonChunkLength, binary),
          binary.slice(alignedLength(getWDBHeaderTotalByteLength(/* () */0) + jsonChunkLength | 0), (getWDBHeaderTotalByteLength(/* () */0) + jsonChunkLength | 0) + streamChunkLength | 0),
          binary.slice((getWDBHeaderTotalByteLength(/* () */0) + alignedLength(jsonChunkLength) | 0) + alignedLength(streamChunkLength) | 0)
        ];
}

function convertBase64ToBinary (dataURI){
    var BASE64_MARKER = ';base64,';

    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
    };

function _fatalBase64MimeType(base64Str) {
  return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getBase64MimeType", "should has mimeType data", "", "", "base64Str: " + (String(base64Str) + "")));
}

function getBase64MimeType(base64Str) {
  var match = (/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/g).exec(base64Str);
  if (match !== null) {
    var match$1 = Caml_array.caml_array_get(match, 1);
    if (match$1 == null) {
      return _fatalBase64MimeType(base64Str);
    } else {
      return match$1;
    }
  } else {
    return _fatalBase64MimeType(base64Str);
  }
}

function unsafeGetAccessorByteOffset(param) {
  var byteOffset = param[/* byteOffset */1];
  if (byteOffset !== undefined) {
    return byteOffset;
  } else {
    return 0;
  }
}

function unsafeGetBufferViewByteOffset(param) {
  var byteOffset = param[/* byteOffset */1];
  if (byteOffset !== undefined) {
    return byteOffset;
  } else {
    return 0;
  }
}

function mergeUint8Array(sourceUint8Array, targetUint8Array, offset) {
  sourceUint8Array.set(targetUint8Array, offset);
  return sourceUint8Array;
}

function mergeArrayBuffer(sourceUint8Array, targetArrayBuffer, offset) {
  return mergeUint8Array(sourceUint8Array, new Uint8Array(targetArrayBuffer), offset);
}

export {
  convertType ,
  getAccessorTypeSize ,
  checkByteLengthShouldBeAligned ,
  copyUint8ArrayToArrayBuffer ,
  computeTypeArrayLengthByAccessorData ,
  computeByteLengthByAccessorData ,
  getHeaderByteLength ,
  getGLBChunkHeaderByteLength ,
  getWDBChunkHeaderByteLength ,
  getWDBHeaderTotalByteLength ,
  alignedLength ,
  _removeAlignedEmptyChars ,
  decodeGLB ,
  getWDBJsonChunkStr ,
  decodeWDB ,
  convertBase64ToBinary ,
  _fatalBase64MimeType ,
  getBase64MimeType ,
  unsafeGetAccessorByteOffset ,
  unsafeGetBufferViewByteOffset ,
  mergeUint8Array ,
  mergeArrayBuffer ,
  
}
/* Log-WonderLog Not a pure module */
