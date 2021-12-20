'use strict';

var Most = require("most");
var Caml_array = require("rescript/lib/js/caml_array.js");
var ArraySt$WonderCommonlib = require("./structure/ArraySt.bs.js");

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

exports._isFromEventStream = _isFromEventStream;
exports.concatArray = concatArray;
/* most Not a pure module */
