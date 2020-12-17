'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple2.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/webgpu/WebGPUCPRepo.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/dependency/WebGPUCoreDpRunAPI.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("end_render");
}

function exec(param) {
  return Most.just(Result$Wonderjs.mapSuccess(Tuple2$Wonderjs.collectOption(WebGPUCPRepo$Wonderjs.getWindow(undefined), WebGPUCPRepo$Wonderjs.getSwapChain(undefined)), (function (param) {
                    Curry._1(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).swapChain.present, param[1]);
                    return Curry._1(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).window.pollEvents, param[0]);
                  })));
}

exports.create = create;
exports.exec = exec;
/* most Not a pure module */
