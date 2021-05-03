

import * as Most from "most";
import * as Curry from "./../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "./../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as NumberService$Wonderjs from "../service/primitive/NumberService.js";

function createFetchJsonStream(filePath, fetchFunc) {
  return Most.fromPromise(fetchFunc(filePath).then((function (prim) {
                    return prim.json();
                  })));
}

function createFetchArrayBufferStream(filePath, fetchFunc) {
  return Most.fromPromise(fetchFunc(filePath).then((function (prim) {
                    return prim.arrayBuffer();
                  })));
}

function createFetchBlobStream(filePath, fetchFunc) {
  return Most.fromPromise(fetchFunc(filePath).then((function (prim) {
                    return prim.blob();
                  })));
}

function isSupportStreamLoad (response){
        return !!response.body && !!response.body.getReader
      };

function getReader (response){
  return response.body.getReader();
  };

function _getContentLength (response){
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

function fetch$1(filePath) {
  return fetch(filePath);
}

export {
  createFetchJsonStream ,
  createFetchArrayBufferStream ,
  createFetchBlobStream ,
  isSupportStreamLoad ,
  getReader ,
  _getContentLength ,
  getContentLength ,
  fetch$1 as fetch,
  
}
/* most Not a pure module */
