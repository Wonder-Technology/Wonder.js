'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var OptionSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var ResultMost$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ResultMost.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/webgpu/WebGPUCPRepo.bs.js");
var WebGPUCoreRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/domain/WebGPUCoreRunAPI.bs.js");
var PictureCPDoService$Wonderjs = require("../../../../../picture/picture/service/PictureCPDoService.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/dependency/WebGPUCoreDpRunAPI.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("init_webgpu");
}

function exec(param) {
  return ResultMost$Wonderjs.sequenceMostM(Result$Wonderjs.mapSuccess(OptionSt$Wonderjs.get(PictureCPDoService$Wonderjs.getSize(undefined)), (function (param) {
                    var __x = WebGPUCoreRunAPI$Wonderjs.load(Curry._1(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).window.make, {
                              width: param[0],
                              height: param[1],
                              title: "Cloud Picture",
                              resizable: false
                            }));
                    return Most.map((function (param) {
                                  var swapChainFormat = param[5];
                                  var context = param[3];
                                  var device = param[2];
                                  var swapChain = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).context.configureSwapChain, {
                                        device: device,
                                        format: swapChainFormat
                                      }, context);
                                  WebGPUCPRepo$Wonderjs.setWindow(param[0]);
                                  WebGPUCPRepo$Wonderjs.setDevice(device);
                                  WebGPUCPRepo$Wonderjs.setAdapter(param[1]);
                                  WebGPUCPRepo$Wonderjs.setContext(context);
                                  WebGPUCPRepo$Wonderjs.setQueue(param[4]);
                                  WebGPUCPRepo$Wonderjs.setSwapChainFormat(swapChainFormat);
                                  WebGPUCPRepo$Wonderjs.setSwapChain(swapChain);
                                  
                                }), __x);
                  })));
}

exports.create = create;
exports.exec = exec;
/* most Not a pure module */
