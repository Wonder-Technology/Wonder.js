

import * as Most from "most";
import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";

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

export {
  createFetchJsonStream ,
  createFetchArrayBufferStream ,
  createFetchBlobStream ,
  
}
/* most Not a pure module */
