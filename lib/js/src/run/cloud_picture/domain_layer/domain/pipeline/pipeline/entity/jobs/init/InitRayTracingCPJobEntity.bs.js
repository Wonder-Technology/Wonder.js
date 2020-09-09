'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/log/Log.bs.js");
var ListSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple2.bs.js");
var Contract$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var OptionSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var ListResult$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListResult.bs.js");
var DirectionVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/DirectionVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");
var IntensityVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/IntensityVO.bs.js");
var CameraCPRepo$Wonderjs = require("../../../../../../repo/pipeline/CameraCPRepo.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/WebGPUCPRepo.bs.js");
var POConfigCPRepo$Wonderjs = require("../../../../../../repo/POConfigCPRepo.bs.js");
var StorageBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/StorageBufferVO.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");
var DirectionLightRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/DirectionLightRunAPI.bs.js");
var RayTracingPassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/RayTracingPassCPRepo.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../repo/structure/utils/TypeArrayCPRepoUtils.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("init_rayTracing");
}

function _buildSceneDescBufferData(device) {
  var gameObjectCount = POConfigCPRepo$Wonderjs.getTransformCount(undefined);
  var bufferData = new Float32Array((gameObjectCount << 5));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.copy_dst | DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.storage, undefined);
  return [
          buffer,
          bufferSize,
          bufferData
        ];
}

function _buildPointIndexBufferData(device) {
  var geometryCount = POConfigCPRepo$Wonderjs.getGeometryCount(undefined);
  var bufferData = new Uint32Array((geometryCount << 1));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.copy_dst | DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.storage, undefined);
  return [
          buffer,
          bufferSize,
          bufferData
        ];
}

function _buildVertexBufferData(device) {
  var geometryPopintCount = POConfigCPRepo$Wonderjs.getGeometryPointCount(undefined);
  var bufferData = new Float32Array(((geometryPopintCount << 2) << 1));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.copy_dst | DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.storage, undefined);
  return [
          buffer,
          bufferSize,
          bufferData
        ];
}

function _buildIndexBufferData(device) {
  var geometryPopintCount = POConfigCPRepo$Wonderjs.getGeometryPointCount(undefined);
  var bufferSize = (geometryPopintCount << 0);
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.copy_dst | DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.storage, undefined);
  return [
          buffer,
          bufferSize
        ];
}

function _buildPBRMaterialBufferData(device) {
  var pbrMaterialCount = POConfigCPRepo$Wonderjs.getPBRMaterialCount(undefined);
  var bufferData = new Float32Array((pbrMaterialCount << 3));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.copy_dst | DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.storage, undefined);
  return [
          buffer,
          bufferSize,
          bufferData
        ];
}

function _buildDirectionLightBufferData(device) {
  return Result$Wonderjs.bind(Contract$Wonderjs.requireCheck((function (param) {
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("only has one direction light", "not"), (function (param) {
                                  return Contract$Wonderjs.Operators.$eq(DirectionLightRunAPI$Wonderjs.getLightCount(undefined), 1);
                                }));
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(ListSt$Wonderjs.traverseResultM(DirectionLightRunAPI$Wonderjs.getAllLights(undefined), (function (light) {
                                      return Result$Wonderjs.mapSuccess(OptionSt$Wonderjs.get(DirectionLightRunAPI$Wonderjs.getDirection(light)), (function (direction) {
                                                    return [
                                                            IntensityVO$Wonderjs.value(DirectionLightRunAPI$Wonderjs.getIntensity(light)),
                                                            DirectionVO$Wonderjs.value(direction)
                                                          ];
                                                  }));
                                    })), (function (list) {
                                  var directionLightBufferData = new Float32Array((POConfigCPRepo$Wonderjs.getDirectionLightCount(undefined) << 3));
                                  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseReduceResultM(list, 0, (function (offset, param) {
                                                    return Result$Wonderjs.mapSuccess(ListResult$Wonderjs.mergeResults({
                                                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat1(offset + 0 | 0, param[0], directionLightBufferData),
                                                                    tl: {
                                                                      hd: TypeArrayCPRepoUtils$Wonderjs.setFloat3(offset + 4 | 0, param[1], directionLightBufferData),
                                                                      tl: /* [] */0
                                                                    }
                                                                  }), (function (param) {
                                                                  return offset + 8 | 0;
                                                                }));
                                                  })), (function (param) {
                                                return directionLightBufferData;
                                              }));
                                })), (function (directionLightBufferData) {
                              var bufferSize = directionLightBufferData.byteLength;
                              var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.copy_dst | DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.storage, undefined);
                              Curry._3(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).buffer.setSubFloat32Data, 0, directionLightBufferData, StorageBufferVO$Wonderjs.value(buffer));
                              return [
                                      buffer,
                                      bufferSize
                                    ];
                            }));
              }));
}

function _createShaderBindingTable(baseShaderPath, device) {
  var rayGenShaderModule = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createShaderModule, {
        code: Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).loadGLSL, "" + baseShaderPath + "/ray-generation.rgen")
      }, device);
  var rayRChitShaderModule = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createShaderModule, {
        code: Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).loadGLSL, "" + baseShaderPath + "/ray-closest-hit.rchit")
      }, device);
  var rayMissShaderModule = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createShaderModule, {
        code: Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).loadGLSL, "" + baseShaderPath + "/ray-miss.rmiss")
      }, device);
  var rayMissShadowShaderModule = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createShaderModule, {
        code: Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).loadGLSL, "" + baseShaderPath + "/ray-miss-shadow.rmiss")
      }, device);
  return Curry._2(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).device.createRayTracingShaderBindingTable, {
              stages: [
                {
                  module: rayGenShaderModule,
                  stage: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_generation
                },
                {
                  module: rayRChitShaderModule,
                  stage: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_closest_hit
                },
                {
                  module: rayMissShaderModule,
                  stage: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_miss
                },
                {
                  module: rayMissShadowShaderModule,
                  stage: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_miss
                }
              ],
              groups: [
                {
                  type: "general-hit-group",
                  generalIndex: 0
                },
                {
                  type: "triangles-hit-group",
                  closestHitIndex: 1
                },
                {
                  type: "general",
                  closestHitIndex: 2
                },
                {
                  type: "general",
                  closestHitIndex: 3
                }
              ]
            }, device);
}

function exec(param) {
  return Most.just(Result$Wonderjs.bind(Tuple2$Wonderjs.collectOption(WebGPUCPRepo$Wonderjs.getDevice(undefined), WebGPUCPRepo$Wonderjs.getQueue(undefined)), (function (param) {
                    var device = param[0];
                    RayTracingPassCPRepo$Wonderjs.setShaderBindingTable(_createShaderBindingTable("src/run/cloud_picture/domain_layer/domain/shader/ray_tracing", device));
                    var cameraBindGroupLayout = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createBindGroupLayout, {
                          entries: [{
                              binding: 0,
                              visibility: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_generation | DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_closest_hit,
                              type: "uniform-buffer"
                            }]
                        }, device);
                    RayTracingPassCPRepo$Wonderjs.setCameraBindGroupLayout(cameraBindGroupLayout);
                    return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(Result$Wonderjs.mapSuccess(OptionSt$Wonderjs.get(CameraCPRepo$Wonderjs.getCameraBufferData(undefined)), (function (param) {
                                          RayTracingPassCPRepo$Wonderjs.addStaticBindGroupData(1, Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createBindGroup, {
                                                    layout: cameraBindGroupLayout,
                                                    entries: [{
                                                        binding: 0,
                                                        buffer: UniformBufferVO$Wonderjs.value(param[0]),
                                                        offset: 0,
                                                        size: param[1].byteLength
                                                      }]
                                                  }, device));
                                          
                                        })), (function (param) {
                                      var directionLightBindGroupLayout = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createBindGroupLayout, {
                                            entries: [{
                                                binding: 0,
                                                visibility: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_generation | DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_closest_hit,
                                                type: "storage-buffer"
                                              }]
                                          }, device);
                                      RayTracingPassCPRepo$Wonderjs.setDirectionLightBindGroupLayout(directionLightBindGroupLayout);
                                      return Result$Wonderjs.mapSuccess(_buildDirectionLightBufferData(device), (function (param) {
                                                    return RayTracingPassCPRepo$Wonderjs.addStaticBindGroupData(2, Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createBindGroup, {
                                                                    layout: directionLightBindGroupLayout,
                                                                    entries: [{
                                                                        binding: 0,
                                                                        buffer: StorageBufferVO$Wonderjs.value(param[0]),
                                                                        offset: 0,
                                                                        size: param[1]
                                                                      }]
                                                                  }, device));
                                                  }));
                                    })), (function (param) {
                                  RayTracingPassCPRepo$Wonderjs.setSceneDescBufferData(_buildSceneDescBufferData(device));
                                  RayTracingPassCPRepo$Wonderjs.setPointIndexBufferData(_buildPointIndexBufferData(device));
                                  RayTracingPassCPRepo$Wonderjs.setVertexBufferData(_buildVertexBufferData(device));
                                  RayTracingPassCPRepo$Wonderjs.setIndexBufferData(_buildIndexBufferData(device));
                                  RayTracingPassCPRepo$Wonderjs.setPBRMaterialBufferData(_buildPBRMaterialBufferData(device));
                                  
                                }));
                  })));
}

exports.create = create;
exports._buildSceneDescBufferData = _buildSceneDescBufferData;
exports._buildPointIndexBufferData = _buildPointIndexBufferData;
exports._buildVertexBufferData = _buildVertexBufferData;
exports._buildIndexBufferData = _buildIndexBufferData;
exports._buildPBRMaterialBufferData = _buildPBRMaterialBufferData;
exports._buildDirectionLightBufferData = _buildDirectionLightBufferData;
exports._createShaderBindingTable = _createShaderBindingTable;
exports.exec = exec;
/* most Not a pure module */
