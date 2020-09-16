'use strict';

var Most = require("most");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var OptionSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var CameraCPRepo$Wonderjs = require("../../../../../../repo/pipeline/CameraCPRepo.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/WebGPUCPRepo.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("init_camera");
}

function _buildCameraBufferData(device) {
  var bufferData = new Float32Array(34);
  var bufferSize = bufferData.byteLength;
  var buffer = UniformBufferVO$Wonderjs.createFromDevice(device, bufferSize);
  return [
          buffer,
          bufferData
        ];
}

function _buildAndSetAllBufferData(device) {
  return CameraCPRepo$Wonderjs.setCameraBufferData(_buildCameraBufferData(device));
}

function exec(param) {
  return Most.just(Result$Wonderjs.mapSuccess(OptionSt$Wonderjs.get(WebGPUCPRepo$Wonderjs.getDevice(undefined)), (function (device) {
                    CameraCPRepo$Wonderjs.setCameraBufferData(_buildCameraBufferData(device));
                    
                  })));
}

exports.create = create;
exports._buildCameraBufferData = _buildCameraBufferData;
exports._buildAndSetAllBufferData = _buildAndSetAllBufferData;
exports.exec = exec;
/* most Not a pure module */
