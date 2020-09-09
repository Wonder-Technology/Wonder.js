'use strict';

var Most = require("most");
var Result$Wonderjs = require("./Result.bs.js");

function sequenceMostM(result) {
  return Result$Wonderjs.either(result, (function (stream) {
                return Most.map(Result$Wonderjs.succeed, stream);
              }), (function (stream) {
                return Most.map(Result$Wonderjs.failWith, stream);
              }));
}

exports.sequenceMostM = sequenceMostM;
/* most Not a pure module */
