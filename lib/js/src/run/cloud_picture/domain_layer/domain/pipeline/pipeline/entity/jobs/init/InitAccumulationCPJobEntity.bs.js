'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple3$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple3.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var PassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PassCPRepo.bs.js");
var DpContainer$Wonderjs = require("../../../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/WebGPUCPRepo.bs.js");
var StorageBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/StorageBufferVO.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");
var AccumulationPassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/AccumulationPassCPRepo.bs.js");
var AccumulationCPDoService$Wonderjs = require("../../../service/AccumulationCPDoService.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("init_accumulation");
}

function _buildAccumulationPixelBufferData($$window, device) {
  var bufferSize = Math.imul((Math.imul(Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).window.getWidth, $$window), Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).window.getHeight, $$window)) << 2), Float32Array.BYTES_PER_ELEMENT);
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.copy_dst | DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.storage, undefined);
  return [
          buffer,
          bufferSize
        ];
}

function _createAndSetBindGroup(device, param) {
  var match = param[2];
  var match$1 = param[1];
  var pixelBufferSize = match$1[1];
  var pixelBuffer = match$1[0];
  var match$2 = param[0];
  var bindGroupLayout = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createBindGroupLayout, {
        entries: [
          {
            binding: 0,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).shaderStage.fragment,
            type: "storage-buffer"
          },
          {
            binding: 1,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).shaderStage.fragment,
            type: "storage-buffer"
          },
          {
            binding: 2,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).shaderStage.fragment,
            type: "uniform-buffer"
          }
        ]
      }, device);
  AccumulationPassCPRepo$Wonderjs.setStaticBindGroupData(0, Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createBindGroup, {
            layout: bindGroupLayout,
            entries: [
              {
                binding: 0,
                buffer: pixelBuffer,
                offset: 0,
                size: pixelBufferSize
              },
              {
                binding: 1,
                buffer: pixelBuffer,
                offset: 0,
                size: pixelBufferSize
              },
              {
                binding: 1,
                buffer: match[0],
                offset: 0,
                size: match[1]
              },
              {
                binding: 2,
                buffer: match$2[0],
                offset: 0,
                size: AccumulationCPDoService$Wonderjs.getResolutionBufferDataSize(match$2[1])
              }
            ]
          }, device));
  return bindGroupLayout;
}

function _createAndSetPipeline(device, swapChainFormat, bindGroupLayout) {
  var baseShaderPath = "src/run/cloud_picture/domain_layer/domain/pipeline/shader/accumulation";
  var vertexShaderModule = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createShaderModule, {
        code: Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).loadGLSL, "" + baseShaderPath + "/accumulation.vert")
      }, device);
  var fragmentShaderModule = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createShaderModule, {
        code: Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).loadGLSL, "" + baseShaderPath + "/accumulation.frag")
      }, device);
  return AccumulationPassCPRepo$Wonderjs.setPipeline(Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createRenderPipeline, {
                  layout: Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createPipelineLayout, {
                        bindGroupLayouts: [bindGroupLayout]
                      }, device),
                  vertexStage: {
                    module: vertexShaderModule,
                    entryPoint: "main"
                  },
                  fragmentStage: {
                    module: fragmentShaderModule,
                    entryPoint: "main"
                  },
                  primitiveTopology: "triangle-list",
                  vertexState: {
                    indexFormat: "uint32"
                  },
                  rasterizationState: {},
                  colorStates: [{
                      format: swapChainFormat,
                      alphaBlend: {},
                      colorBlend: {}
                    }]
                }, device));
}

function exec(param) {
  return Most.just(Result$Wonderjs.bind(Tuple3$Wonderjs.collectOption(WebGPUCPRepo$Wonderjs.getWindow(undefined), WebGPUCPRepo$Wonderjs.getDevice(undefined), WebGPUCPRepo$Wonderjs.getSwapChainFormat(undefined)), (function (param) {
                    var swapChainFormat = param[2];
                    var device = param[1];
                    AccumulationPassCPRepo$Wonderjs.setAccumulationPixelBufferData(_buildAccumulationPixelBufferData(param[0], device));
                    return Result$Wonderjs.mapSuccess(Tuple3$Wonderjs.collectOption(PassCPRepo$Wonderjs.getResolutionBufferData(undefined), PassCPRepo$Wonderjs.getPixelBufferData(undefined), AccumulationPassCPRepo$Wonderjs.getAccumulationPixelBufferData(undefined)), (function (allBufferData) {
                                  var match = allBufferData[2];
                                  var match$1 = allBufferData[1];
                                  var match$2 = allBufferData[0];
                                  return _createAndSetPipeline(device, swapChainFormat, _createAndSetBindGroup(device, [
                                                  [
                                                    UniformBufferVO$Wonderjs.value(match$2[0]),
                                                    match$2[1]
                                                  ],
                                                  [
                                                    StorageBufferVO$Wonderjs.value(match$1[0]),
                                                    match$1[1]
                                                  ],
                                                  [
                                                    StorageBufferVO$Wonderjs.value(match[0]),
                                                    match[1]
                                                  ]
                                                ]));
                                }));
                  })));
}

exports.create = create;
exports._buildAccumulationPixelBufferData = _buildAccumulationPixelBufferData;
exports._createAndSetBindGroup = _createAndSetBindGroup;
exports._createAndSetPipeline = _createAndSetPipeline;
exports.exec = exec;
/* most Not a pure module */
