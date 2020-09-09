'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple2.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var PassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PassCPRepo.bs.js");
var DpContainer$Wonderjs = require("../../../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/WebGPUCPRepo.bs.js");
var StorageBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/StorageBufferVO.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("init_pass");
}

function _buildPixelBufferData($$window, device) {
  var bufferSize = Math.imul((Math.imul(Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).window.getWidth, $$window), Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).window.getHeight, $$window)) << 2), Float32Array.BYTES_PER_ELEMENT);
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, undefined, undefined);
  return [
          buffer,
          bufferSize
        ];
}

function _buildCommonBufferData(device) {
  var bufferData = new Uint32Array(2);
  var bufferSize = bufferData.byteLength;
  var buffer = UniformBufferVO$Wonderjs.createFromDevice(device, bufferSize);
  return [
          buffer,
          bufferData
        ];
}

function _buildResolutionBufferData($$window, device) {
  var bufferData = new Float32Array([
        Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).window.getWidth, $$window),
        Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).window.getHeight, $$window)
      ]);
  var bufferSize = bufferData.byteLength;
  var buffer = UniformBufferVO$Wonderjs.createFromDevice(device, bufferSize);
  Curry._3(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).buffer.setSubFloat32Data, 0, bufferData, UniformBufferVO$Wonderjs.value(buffer));
  return [
          buffer,
          bufferData
        ];
}

function exec(param) {
  return Most.just(Result$Wonderjs.mapSuccess(Tuple2$Wonderjs.collectOption(WebGPUCPRepo$Wonderjs.getWindow(undefined), WebGPUCPRepo$Wonderjs.getDevice(undefined)), (function (param) {
                    var device = param[1];
                    var $$window = param[0];
                    PassCPRepo$Wonderjs.setPixelBufferData(_buildPixelBufferData($$window, device));
                    PassCPRepo$Wonderjs.setCommonBufferData(_buildCommonBufferData(device));
                    PassCPRepo$Wonderjs.setResolutionBufferData(_buildResolutionBufferData($$window, device));
                    
                  })));
}

exports.create = create;
exports._buildPixelBufferData = _buildPixelBufferData;
exports._buildCommonBufferData = _buildCommonBufferData;
exports._buildResolutionBufferData = _buildResolutionBufferData;
exports.exec = exec;
/* most Not a pure module */
