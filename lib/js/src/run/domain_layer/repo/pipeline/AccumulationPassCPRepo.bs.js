'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var CPRepo$Wonderjs = require("../../../infrastructure_layer/data/container/CPRepo.bs.js");
var OptionSt$Wonderjs = require("../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var StorageBufferVO$Wonderjs = require("../../../../construct/domain_layer/domain/webgpu/core/value_object/StorageBufferVO.bs.js");

function getAccumulationPixelBufferData(param) {
  return OptionSt$Wonderjs.map(CPRepo$Wonderjs.getAccumulationPass(undefined).accumulationPixelBufferData, (function (param) {
                return [
                        StorageBufferVO$Wonderjs.create(param[0]),
                        param[1]
                      ];
              }));
}

function setAccumulationPixelBufferData(param) {
  var init = CPRepo$Wonderjs.getAccumulationPass(undefined);
  return CPRepo$Wonderjs.setAccumulationPass({
              accumulationPixelBufferData: [
                StorageBufferVO$Wonderjs.value(param[0]),
                param[1]
              ],
              staticBindGroupData: init.staticBindGroupData,
              pipeline: init.pipeline
            });
}

function getStaticBindGroupData(param) {
  return CPRepo$Wonderjs.getAccumulationPass(undefined).staticBindGroupData;
}

function setStaticBindGroupData(setSlot, bindGroup) {
  var init = CPRepo$Wonderjs.getAccumulationPass(undefined);
  return CPRepo$Wonderjs.setAccumulationPass({
              accumulationPixelBufferData: init.accumulationPixelBufferData,
              staticBindGroupData: {
                setSlot: setSlot,
                bindGroup: bindGroup
              },
              pipeline: init.pipeline
            });
}

function getPipeline(param) {
  return CPRepo$Wonderjs.getAccumulationPass(undefined).pipeline;
}

function setPipeline(pipeline) {
  var init = CPRepo$Wonderjs.getAccumulationPass(undefined);
  return CPRepo$Wonderjs.setAccumulationPass({
              accumulationPixelBufferData: init.accumulationPixelBufferData,
              staticBindGroupData: init.staticBindGroupData,
              pipeline: Caml_option.some(pipeline)
            });
}

exports.getAccumulationPixelBufferData = getAccumulationPixelBufferData;
exports.setAccumulationPixelBufferData = setAccumulationPixelBufferData;
exports.getStaticBindGroupData = getStaticBindGroupData;
exports.setStaticBindGroupData = setStaticBindGroupData;
exports.getPipeline = getPipeline;
exports.setPipeline = setPipeline;
/* CPRepo-Wonderjs Not a pure module */
