'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");
var PipelineEntity$Wonderjs = require("./PipelineEntity.bs.js");

function getPipelineStream(pipeline) {
  return OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetPipelineRepoDp(undefined).getPipelineStream, PipelineEntity$Wonderjs.value(pipeline)));
}

function setPipelineStream(pipeline, stream) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPipelineRepoDp(undefined).setPipelineStream, PipelineEntity$Wonderjs.value(pipeline), stream);
}

exports.getPipelineStream = getPipelineStream;
exports.setPipelineStream = setPipelineStream;
/* No side effect */
