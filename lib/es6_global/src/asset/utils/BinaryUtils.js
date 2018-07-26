

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";

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

function decode(binary, checkFunc) {
  var dataView = DataViewCommon$Wonderjs.create(binary);
  var dataView$1 = Curry._1(checkFunc, dataView);
  var match = DataViewCommon$Wonderjs.getUint32_1(12, dataView$1);
  var jsonBufSize = match[0];
  var decoder = new TextDecoder("utf-8");
  return /* tuple */[
          decoder.decode(new Uint8Array(binary, 20, jsonBufSize)).trim(),
          binary.slice(jsonBufSize + 28 | 0)
        ];
}

var convertBase64ToBinary = function (dataURI){
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

export {
  alignedLength ,
  _removeAlignedEmptyChars ,
  decode ,
  convertBase64ToBinary ,
  _fatalBase64MimeType ,
  getBase64MimeType ,
  
}
/* Log-WonderLog Not a pure module */
