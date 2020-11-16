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

function _executeStream(streamDataResult) {
  return Most.drain(_getStreamFromTuple(Result$Wonderjs.handleFail(streamDataResult, _throwErr)));
}

function init(param) {
  return _executeStream(DirectorCPApService$Wonderjs.init(undefined));
}

function update(param) {
  return _executeStream(DirectorCPApService$Wonderjs.update(undefined));
}

function render(param) {
  return _executeStream(DirectorCPApService$Wonderjs.render(undefined));
}

exports.prepare = prepare;
exports._getStreamFromTuple = _getStreamFromTuple;
exports._throwErr = _throwErr;
exports._executeStream = _executeStream;
exports.init = init;
exports.update = update;
exports.render = render;
/* most Not a pure module */
