

import * as Most from "most";
import * as Caml_array from "../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as ArraySt$WonderCommonlib from "./structure/ArraySt.bs.js";

var _isFromEventStream = (function(stream){
    var source = stream.source;
    return !!source.event && !!source.source;
  });

function concatArray(streamArr) {
  var match = streamArr.length;
  if (match !== 0) {
    return ArraySt$WonderCommonlib.reduceOneParam(ArraySt$WonderCommonlib.sliceFrom(streamArr, 1), (function (stream1, stream2) {
                  _isFromEventStream(stream1) === true;
                  return stream1.concat(stream2);
                }), Caml_array.get(streamArr, 0));
  } else {
    return Most.just(1);
  }
}

export {
  _isFromEventStream ,
  concatArray ,
  
}
/* most Not a pure module */
