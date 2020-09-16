'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple4$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple4.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var DpContainer$Wonderjs = require("../../../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/WebGPUCPRepo.bs.js");
var PathTracingPassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PathTracingPassCPRepo.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("render_pathTracing");
}

function exec(param) {
  return Most.just(Result$Wonderjs.mapSuccess(Tuple4$Wonderjs.collectOption(WebGPUCPRepo$Wonderjs.getDevice(undefined), WebGPUCPRepo$Wonderjs.getQueue(undefined), WebGPUCPRepo$Wonderjs.getWindow(undefined), PathTracingPassCPRepo$Wonderjs.getPipeline(undefined)), (function (param) {
                    var $$window = param[2];
                    var commandEncoder = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createCommandEncoder, {}, param[0]);
                    var rtPass = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).commandEncoder.beginRayTracingPass, {}, commandEncoder);
                    Curry._2(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).passEncoderRayTracing.setPipeline, param[3], rtPass);
                    ListSt$Wonderjs.forEach(PathTracingPassCPRepo$Wonderjs.getAllStaticBindGroupData(undefined), (function (param) {
                            return Curry._3(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).passEncoderRayTracing.setBindGroup, param.setSlot, param.bindGroup, rtPass);
                          }));
                    Curry._7(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).passEncoderRayTracing.traceRays, 0, 1, 2, Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).window.getWidth, $$window), Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).window.getHeight, $$window), 1, rtPass);
                    Curry._1(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).passEncoderRayTracing.endPass, rtPass);
                    return Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).queue.submit, [Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).commandEncoder.finish, commandEncoder)], param[1]);
                  })));
}

exports.create = create;
exports.exec = exec;
/* most Not a pure module */
