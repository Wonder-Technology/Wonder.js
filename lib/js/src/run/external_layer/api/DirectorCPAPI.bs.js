'use strict';

var Most = require("most");
var Result$Wonderjs = require("../../../construct/domain_layer/library/structure/Result.bs.js");
var DirectorCPApService$Wonderjs = require("../../application_layer/DirectorCPApService.bs.js");

var prepare = DirectorCPApService$Wonderjs.prepare;

function _getStreamFromTuple(param) {
  return param[1];
}

var _throwErr = ((err) => {
    throw err;
});

function init(param) {
  return Most.drain(_getStreamFromTuple(Result$Wonderjs.handleFail(DirectorCPApService$Wonderjs.init(undefined), _throwErr)));
}

exports.prepare = prepare;
exports._getStreamFromTuple = _getStreamFromTuple;
exports._throwErr = _throwErr;
exports.init = init;
/* most Not a pure module */
