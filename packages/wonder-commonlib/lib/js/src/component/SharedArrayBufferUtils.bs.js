'use strict';


var _isSupportSharedArrayBuffer = (function(param){
        return typeof SharedArrayBuffer !== "undefined"
    });

function newSharedArrayBuffer(totalByteLength) {
  return new SharedArrayBuffer(totalByteLength);
}

exports._isSupportSharedArrayBuffer = _isSupportSharedArrayBuffer;
exports.newSharedArrayBuffer = newSharedArrayBuffer;
/* No side effect */
