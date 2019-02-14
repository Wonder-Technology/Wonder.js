

import * as Most from "most";
import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as NumberService$Wonderjs from "../service/primitive/NumberService.js";

function createFetchJsonStream(filePath, fetchFunc) {
  return Most.fromPromise(Curry._1(fetchFunc, filePath).then((function (prim) {
                    return prim.json();
                  })));
}

function createFetchArrayBufferStream(filePath, fetchFunc) {
  return Most.fromPromise(Curry._1(fetchFunc, filePath).then((function (prim) {
                    return prim.arrayBuffer();
                  })));
}

function createFetchBlobStream(filePath, fetchFunc) {
  return Most.fromPromise(Curry._1(fetchFunc, filePath).then((function (prim) {
                    return prim.blob();
                  })));
}

var isSupportStreamLoad = function (response){
        return !!response.body && !!response.body.getReader
      };

var getReader = function (response){
  return response.body.getReader();
  };

var _getContentLength = function (response){
  return response.headers.get("content-length");
  };

function getContentLength(response) {
  var match = _getContentLength(response);
  if (match == null) {
    return Log$WonderLog.fatal(Log$WonderLog.buildErrorMessage("load", "Content-Length response header unavailable", "", "", ""));
  } else {
    return Curry._1(NumberService$Wonderjs.convertStringToInt, match);
  }
}

export {
  createFetchJsonStream ,
  createFetchArrayBufferStream ,
  createFetchBlobStream ,
  isSupportStreamLoad ,
  getReader ,
  _getContentLength ,
  getContentLength ,
  
}
/* most Not a pure module */
