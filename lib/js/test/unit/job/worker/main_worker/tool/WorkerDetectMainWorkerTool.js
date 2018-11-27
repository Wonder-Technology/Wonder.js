'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");

function markIsSupportRenderWorkerAndSharedArrayBuffer(isSupportRenderWorkerAndSharedArrayBuffer, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* workerDetectRecord */38];
  newrecord[/* workerDetectRecord */38] = /* record */[
    /* isSupportSharedArrayBuffer */init[/* isSupportSharedArrayBuffer */0],
    /* isSupportRenderWorkerAndSharedArrayBuffer */isSupportRenderWorkerAndSharedArrayBuffer
  ];
  return newrecord;
}

exports.markIsSupportRenderWorkerAndSharedArrayBuffer = markIsSupportRenderWorkerAndSharedArrayBuffer;
/* No side effect */
