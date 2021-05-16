

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function markIsSupportRenderWorkerAndSharedArrayBuffer(isSupportRenderWorkerAndSharedArrayBuffer, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* workerDetectRecord */41];
  newrecord[/* workerDetectRecord */41] = /* record */[
    /* isSupportSharedArrayBuffer */init[/* isSupportSharedArrayBuffer */0],
    /* isSupportRenderWorkerAndSharedArrayBuffer */isSupportRenderWorkerAndSharedArrayBuffer
  ];
  return newrecord;
}

export {
  markIsSupportRenderWorkerAndSharedArrayBuffer ,
  
}
/* No side effect */
