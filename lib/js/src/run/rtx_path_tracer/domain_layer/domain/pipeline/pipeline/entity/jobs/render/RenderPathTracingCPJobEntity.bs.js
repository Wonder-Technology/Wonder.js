'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple4$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple4.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/webgpu/WebGPUCPRepo.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/dependency/WebGPUCoreDpRunAPI.bs.js");
var PathTracingPassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PathTracingPassCPRepo.bs.js");
var WebGPURayTracingDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/dependency/WebGPURayTracingDpRunAPI.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("render_pathTracing");
}

function exec(param) {
  return Most.just(Result$Wonderjs.mapSuccess(Tuple4$Wonderjs.collectOption(WebGPUCPRepo$Wonderjs.getDevice(undefined), WebGPUCPRepo$Wonderjs.getQueue(undefined), WebGPUCPRepo$Wonderjs.getWindow(undefined), PathTracingPassCPRepo$Wonderjs.getPipeline(undefined)), (function (param) {
                    var $$window = param[2];
                    var commandEncoder = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).device.createCommandEncoder, {}, param[0]);
                    var rtPass = Curry._2(WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).commandEncoder.beginRayTracingPass, {}, commandEncoder);
                    Curry._2(WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).passEncoder.setPipeline, param[3], rtPass);
                    ListSt$Wonderjs.forEach(PathTracingPassCPRepo$Wonderjs.getAllStaticBindGroupData(undefined), (function (param) {
                            return Curry._3(WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).passEncoder.setBindGroup, param.setSlot, param.bindGroup, rtPass);
                          }));
                    Curry._7(WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).passEncoder.traceRays, 0, 1, 3, Curry._1(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).window.getWidth, $$window), Curry._1(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).window.getHeight, $$window), 1, rtPass);
                    Curry._1(WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).passEncoder.endPass, rtPass);
                    return Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).queue.submit, [Curry._1(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).commandEncoder.finish, commandEncoder)], param[1]);
                  })));
}

exports.create = create;
exports.exec = exec;
/* most Not a pure module */
