'use strict';

var CPRepo$Wonderjs = require("../CPRepo.bs.js");
var OptionSt$Wonderjs = require("../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var StorageBufferVO$Wonderjs = require("../../../../../construct/domain_layer/domain/webgpu/core/value_object/StorageBufferVO.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");

function getSampleCount(param) {
  return CPRepo$Wonderjs.getPass(undefined).sampleCount;
}

function setSampleCount(sampleCount) {
  var init = CPRepo$Wonderjs.getPass(undefined);
  return CPRepo$Wonderjs.setPass({
              sampleCount: sampleCount,
              totalSampleCount: init.totalSampleCount,
              commonBufferData: init.commonBufferData,
              resolutionBufferData: init.resolutionBufferData,
              pixelBufferData: init.pixelBufferData
            });
}

function getTotalSampleCount(param) {
  return CPRepo$Wonderjs.getPass(undefined).totalSampleCount;
}

function setTotalSampleCount(totalSampleCount) {
  var init = CPRepo$Wonderjs.getPass(undefined);
  return CPRepo$Wonderjs.setPass({
              sampleCount: init.sampleCount,
              totalSampleCount: totalSampleCount,
              commonBufferData: init.commonBufferData,
              resolutionBufferData: init.resolutionBufferData,
              pixelBufferData: init.pixelBufferData
            });
}

function getPixelBufferData(param) {
  return OptionSt$Wonderjs.map(CPRepo$Wonderjs.getPass(undefined).pixelBufferData, (function (param) {
                return [
                        StorageBufferVO$Wonderjs.create(param[0]),
                        param[1]
                      ];
              }));
}

function setPixelBufferData(param) {
  var init = CPRepo$Wonderjs.getPass(undefined);
  return CPRepo$Wonderjs.setPass({
              sampleCount: init.sampleCount,
              totalSampleCount: init.totalSampleCount,
              commonBufferData: init.commonBufferData,
              resolutionBufferData: init.resolutionBufferData,
              pixelBufferData: [
                StorageBufferVO$Wonderjs.value(param[0]),
                param[1]
              ]
            });
}

function getCommonBufferData(param) {
  return OptionSt$Wonderjs.map(CPRepo$Wonderjs.getPass(undefined).commonBufferData, (function (param) {
                return [
                        UniformBufferVO$Wonderjs.create(param[0]),
                        param[1]
                      ];
              }));
}

function setCommonBufferData(param) {
  var init = CPRepo$Wonderjs.getPass(undefined);
  return CPRepo$Wonderjs.setPass({
              sampleCount: init.sampleCount,
              totalSampleCount: init.totalSampleCount,
              commonBufferData: [
                UniformBufferVO$Wonderjs.value(param[0]),
                param[1]
              ],
              resolutionBufferData: init.resolutionBufferData,
              pixelBufferData: init.pixelBufferData
            });
}

function getResolutionBufferData(param) {
  return OptionSt$Wonderjs.map(CPRepo$Wonderjs.getPass(undefined).resolutionBufferData, (function (param) {
                return [
                        UniformBufferVO$Wonderjs.create(param[0]),
                        param[1]
                      ];
              }));
}

function setResolutionBufferData(param) {
  var init = CPRepo$Wonderjs.getPass(undefined);
  return CPRepo$Wonderjs.setPass({
              sampleCount: init.sampleCount,
              totalSampleCount: init.totalSampleCount,
              commonBufferData: init.commonBufferData,
              resolutionBufferData: [
                UniformBufferVO$Wonderjs.value(param[0]),
                param[1]
              ],
              pixelBufferData: init.pixelBufferData
            });
}

exports.getSampleCount = getSampleCount;
exports.setSampleCount = setSampleCount;
exports.getTotalSampleCount = getTotalSampleCount;
exports.setTotalSampleCount = setTotalSampleCount;
exports.getPixelBufferData = getPixelBufferData;
exports.setPixelBufferData = setPixelBufferData;
exports.getCommonBufferData = getCommonBufferData;
exports.setCommonBufferData = setCommonBufferData;
exports.getResolutionBufferData = getResolutionBufferData;
exports.setResolutionBufferData = setResolutionBufferData;
/* CPRepo-Wonderjs Not a pure module */
