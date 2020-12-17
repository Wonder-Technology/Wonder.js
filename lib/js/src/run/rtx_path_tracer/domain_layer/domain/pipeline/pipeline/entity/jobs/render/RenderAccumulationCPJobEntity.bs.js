'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple6$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple6.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/webgpu/WebGPUCPRepo.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/dependency/WebGPUCoreDpRunAPI.bs.js");
var AccumulationPassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/AccumulationPassCPRepo.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("render_accumulation");
}

function exec(param) {
  return Most.just(Result$Wonderjs.mapSuccess(Tuple6$Wonderjs.collectOption(WebGPUCPRepo$Wonderjs.getDevice(undefined), WebGPUCPRepo$Wonderjs.getQueue(undefined), WebGPUCPRepo$Wonderjs.getWindow(undefined), WebGPUCPRepo$Wonderjs.getSwapChain(undefined), AccumulationPassCPRepo$Wonderjs.getStaticBindGroupData(undefined), AccumulationPassCPRepo$Wonderjs.getPipeline(undefined)), (function (param) {
                    var match = param[4];
                    var backBufferView = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).swapChain.getCurrentTextureView, undefined, param[3]);
                    var commandEncoder = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).device.createCommandEncoder, {}, param[0]);
                    var renderPass = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).commandEncoder.beginRenderPass, {
                          colorAttachments: [{
                              clearColor: {
                                r: 0.0,
                                g: 0.0,
                                b: 0.0,
                                a: 1.0
                              },
                              loadOp: "clear",
                              storeOp: "store",
                              attachment: backBufferView
                            }]
                        }, commandEncoder);
                    Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).passEncoder.render.setPipeline, param[5], renderPass);
                    Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).passEncoder.render.setBindGroup, match.setSlot, match.bindGroup, renderPass);
                    Curry._5(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).passEncoder.render.draw, 3, 1, 0, 0, renderPass);
                    Curry._1(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).passEncoder.render.endPass, renderPass);
                    return Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).queue.submit, [Curry._1(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).commandEncoder.finish, commandEncoder)], param[1]);
                  })));
}

exports.create = create;
exports.exec = exec;
/* most Not a pure module */
