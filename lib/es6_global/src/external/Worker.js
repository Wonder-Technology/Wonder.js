

import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";

var _isSupportSharedArrayBuffer = (
    function(param){
        return typeof SharedArrayBuffer !== "undefined"
    }
    );

function isSupportSharedArrayBuffer(param) {
  return Curry._1(_isSupportSharedArrayBuffer, /* () */0);
}

function newSharedArrayBuffer(totalByteLength) {
  var match = Curry._1(_isSupportSharedArrayBuffer, /* () */0);
  if (match) {
    return new SharedArrayBuffer(totalByteLength);
  } else {
    return new ArrayBuffer(totalByteLength);
  }
}

export {
  _isSupportSharedArrayBuffer ,
  isSupportSharedArrayBuffer ,
  newSharedArrayBuffer ,
  
}
/* _isSupportSharedArrayBuffer Not a pure module */
