'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/log/Log.bs.js");
var ListSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple2.bs.js");
var Tuple3$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple3.bs.js");
var Tuple5$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple5.bs.js");
var Contract$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var DiffuseVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/DiffuseVO.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var ListResult$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListResult.bs.js");
var PassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PassCPRepo.bs.js");
var SpecularVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/SpecularVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");
var MetalnessVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/MetalnessVO.bs.js");
var RoughnessVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/RoughnessVO.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/WebGPUCPRepo.bs.js");
var GeometryEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/entity/GeometryEntity.bs.js");
var NormalMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/NormalMatrixVO.bs.js");
var PassCPDoService$Wonderjs = require("../../../service/PassCPDoService.bs.js");
var StorageBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/StorageBufferVO.bs.js");
var TransformRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/TransformRunAPI.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");
var GameObjectRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/GameObjectRunAPI.bs.js");
var PBRMaterialEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/entity/PBRMaterialEntity.bs.js");
var PBRMaterialRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/PBRMaterialRunAPI.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/dependency/WebGPUCoreDpRunAPI.bs.js");
var OtherConfigDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/dependency/OtherConfigDpRunAPI.bs.js");
var LocalToWorldMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/LocalToWorldMatrixVO.bs.js");
var PointsGeometryCPRepo$Wonderjs = require("../../../../../../repo/scene/component/geometry/PointsGeometryCPRepo.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../../infrastructure_layer/dependency/repo/scene/component/utils/TypeArrayCPRepoUtils.bs.js");
var PathTracingPassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PathTracingPassCPRepo.bs.js");
var WebGPURayTracingRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/WebGPURayTracingRunAPI.bs.js");
var WebGPURayTracingDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/dependency/WebGPURayTracingDpRunAPI.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("update_pathTracing");
}

function _buildAndSetSceneDescBufferData(device, allRenderGameObjects) {
  var gameObjectCount = ListSt$Wonderjs.length(allRenderGameObjects);
  var bufferData = new Float32Array((gameObjectCount << 5));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
  return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(ListSt$Wonderjs.traverseResultM(allRenderGameObjects, (function (gameObject) {
                        return Tuple3$Wonderjs.collectOption(GameObjectRunAPI$Wonderjs.getTransform(gameObject), GameObjectRunAPI$Wonderjs.getGeometry(gameObject), GameObjectRunAPI$Wonderjs.getPBRMaterial(gameObject));
                      })), (function (list) {
                    return ListSt$Wonderjs.traverseReduceResultM(list, 0, (function (offset, param) {
                                  var pbrMaterial = param[2];
                                  var geometry = param[1];
                                  var transform = param[0];
                                  return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(TransformRunAPI$Wonderjs.getNormalMatrix(transform), (function (normalMatrix) {
                                                    return ListResult$Wonderjs.mergeResults({
                                                                hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 0 | 0, [
                                                                      GeometryEntity$Wonderjs.value(geometry),
                                                                      PBRMaterialEntity$Wonderjs.value(pbrMaterial)
                                                                    ], bufferData),
                                                                tl: {
                                                                  hd: TypeArrayCPRepoUtils$Wonderjs.setMat3Data(offset + 4 | 0, NormalMatrixVO$Wonderjs.value(normalMatrix), bufferData),
                                                                  tl: {
                                                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat16WithFloat32Array((offset + 4 | 0) + 12 | 0, LocalToWorldMatrixVO$Wonderjs.value(TransformRunAPI$Wonderjs.getLocalToWorldMatrix(transform)), bufferData),
                                                                    tl: /* [] */0
                                                                  }
                                                                }
                                                              });
                                                  })), (function (param) {
                                                return ((offset + 4 | 0) + 12 | 0) + 16 | 0;
                                              }));
                                }));
                  })), (function (param) {
                Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubFloat32Data, 0, bufferData, StorageBufferVO$Wonderjs.value(buffer));
                return PathTracingPassCPRepo$Wonderjs.setSceneDescBufferData([
                            buffer,
                            bufferSize,
                            bufferData
                          ]);
              }));
}

function _convertVertexStartIndexFromAlignedInPOToInVertexBufferData(vertexStartIndex) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("vertexStartIndex:" + vertexStartIndex + " be 3 times", "not"), (function (param) {
                                  var x = vertexStartIndex / 3;
                                  return Contract$Wonderjs.Operators.$eq$eq$dot(x - Math.floor(x), 0.0);
                                }));
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                return vertexStartIndex / 3 | 0;
              }));
}

function _buildAndSetPointIndexBufferData(device, allRenderGeometries) {
  var geometryCount = ListSt$Wonderjs.length(allRenderGeometries);
  var bufferData = new Uint32Array((geometryCount << 1));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
  return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(ListSt$Wonderjs.traverseResultM(allRenderGeometries, (function (geometry) {
                        var geometry$1 = GeometryEntity$Wonderjs.value(geometry);
                        return Tuple3$Wonderjs.collectResult(Result$Wonderjs.succeed(geometry$1), PointsGeometryCPRepo$Wonderjs.getVertexInfo(geometry$1), PointsGeometryCPRepo$Wonderjs.getIndexInfo(geometry$1));
                      })), (function (list) {
                    return ListSt$Wonderjs.traverseResultM(list, (function (param) {
                                  var faceStartIndex = param[2][0];
                                  var geometry = param[0];
                                  return Result$Wonderjs.bind(_convertVertexStartIndexFromAlignedInPOToInVertexBufferData(param[1][0]), (function (vertexStartIndex) {
                                                return ListResult$Wonderjs.mergeResults({
                                                            hd: TypeArrayCPRepoUtils$Wonderjs.setUint32_1((geometry << 1), vertexStartIndex, bufferData),
                                                            tl: {
                                                              hd: TypeArrayCPRepoUtils$Wonderjs.setUint32_1((geometry << 1) + 1 | 0, faceStartIndex, bufferData),
                                                              tl: /* [] */0
                                                            }
                                                          });
                                              }));
                                }));
                  })), (function (param) {
                Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubUint32Data, 0, bufferData, StorageBufferVO$Wonderjs.value(buffer));
                return PathTracingPassCPRepo$Wonderjs.setPointIndexBufferData([
                            buffer,
                            bufferSize,
                            bufferData
                          ]);
              }));
}

function _buildAndSetVertexBufferData(device) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("vertices.length == normals.length", "not"), (function (param) {
                            var vertices = PointsGeometryCPRepo$Wonderjs.getVerticesTypeArr(undefined);
                            var normals = PointsGeometryCPRepo$Wonderjs.getNormalsTypeArr(undefined);
                            return Contract$Wonderjs.Operators.$eq(vertices.length, normals.length);
                          }));
                    Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("verticesOffset == normalsOffset", "not"), (function (param) {
                            return Contract$Wonderjs.Operators.$eq(PointsGeometryCPRepo$Wonderjs.getVerticesOffset(undefined), PointsGeometryCPRepo$Wonderjs.getNormalsOffset(undefined));
                          }));
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("verticesOffset be 3 times", "not"), (function (param) {
                                  var x = PointsGeometryCPRepo$Wonderjs.getVerticesOffset(undefined) / 3;
                                  return Contract$Wonderjs.Operators.$eq$eq$dot(x - Math.floor(x), 0.0);
                                }));
                  }), Curry._1(OtherConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
                var bufferData = new Float32Array(((PointsGeometryCPRepo$Wonderjs.getVerticesOffset(undefined) / 3 | 0) << 3));
                var bufferSize = bufferData.byteLength;
                var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
                var vertices = PointsGeometryCPRepo$Wonderjs.getVerticesTypeArr(undefined);
                var normals = PointsGeometryCPRepo$Wonderjs.getNormalsTypeArr(undefined);
                var length = PointsGeometryCPRepo$Wonderjs.getVerticesOffset(undefined);
                var i = 0;
                var j = 0;
                while(i < length) {
                  bufferData[j] = vertices[i];
                  bufferData[j + 1 | 0] = vertices[i + 1 | 0];
                  bufferData[j + 2 | 0] = vertices[i + 2 | 0];
                  bufferData[j + 4 | 0] = normals[i];
                  bufferData[j + 5 | 0] = normals[i + 1 | 0];
                  bufferData[j + 6 | 0] = normals[i + 2 | 0];
                  i = i + 3 | 0;
                  j = j + 8 | 0;
                };
                Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubFloat32Data, 0, bufferData, StorageBufferVO$Wonderjs.value(buffer));
                return PathTracingPassCPRepo$Wonderjs.setVertexBufferData([
                            buffer,
                            bufferSize,
                            bufferData
                          ]);
              }));
}

function _buildAndSetIndexBufferData(device) {
  var bufferData = PointsGeometryCPRepo$Wonderjs.getCopyUsedIndicesTypeArr(undefined);
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
  Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubUint32Data, 0, bufferData, StorageBufferVO$Wonderjs.value(buffer));
  return PathTracingPassCPRepo$Wonderjs.setIndexBufferData([
              buffer,
              bufferSize
            ]);
}

function _buildAndSetPBRMaterialBufferData(device, allRenderPBRMaterials) {
  var pbrMaterialCount = ListSt$Wonderjs.length(allRenderPBRMaterials);
  var bufferData = new Float32Array((pbrMaterialCount << 3));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseReduceResultM(allRenderPBRMaterials, 0, (function (offset, pbrMaterial) {
                    var diffuse = DiffuseVO$Wonderjs.getPrimitiveValue(PBRMaterialRunAPI$Wonderjs.getDiffuseColor(pbrMaterial));
                    var specular = SpecularVO$Wonderjs.value(PBRMaterialRunAPI$Wonderjs.getSpecular(pbrMaterial));
                    var roughness = RoughnessVO$Wonderjs.value(PBRMaterialRunAPI$Wonderjs.getRoughness(pbrMaterial));
                    var metalness = MetalnessVO$Wonderjs.value(PBRMaterialRunAPI$Wonderjs.getMetalness(pbrMaterial));
                    return Result$Wonderjs.mapSuccess(ListResult$Wonderjs.mergeResults({
                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat3(offset + 0 | 0, diffuse, bufferData),
                                    tl: {
                                      hd: TypeArrayCPRepoUtils$Wonderjs.setFloat3(offset + 4 | 0, [
                                            metalness,
                                            roughness,
                                            specular
                                          ], bufferData),
                                      tl: /* [] */0
                                    }
                                  }), (function (param) {
                                  return (offset + 4 | 0) + 4 | 0;
                                }));
                  })), (function (param) {
                Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubFloat32Data, 0, bufferData, StorageBufferVO$Wonderjs.value(buffer));
                return PathTracingPassCPRepo$Wonderjs.setPBRMaterialBufferData([
                            buffer,
                            bufferSize,
                            bufferData
                          ]);
              }));
}

function _buildAndSetAllBufferData(device) {
  var allRenderGeometries = GameObjectRunAPI$Wonderjs.getAllRenderGeometries(undefined);
  return ListResult$Wonderjs.mergeResults({
              hd: _buildAndSetSceneDescBufferData(device, GameObjectRunAPI$Wonderjs.getAllRenderGameObjects(undefined)),
              tl: {
                hd: _buildAndSetPointIndexBufferData(device, allRenderGeometries),
                tl: {
                  hd: _buildAndSetVertexBufferData(device),
                  tl: {
                    hd: Result$Wonderjs.succeed(_buildAndSetIndexBufferData(device)),
                    tl: {
                      hd: _buildAndSetPBRMaterialBufferData(device, GameObjectRunAPI$Wonderjs.getAllRenderPBRMaterials(undefined)),
                      tl: /* [] */0
                    }
                  }
                }
              }
            });
}

function _createAndAddRayTracingBindGroup(device, instanceContainer, param, param$1) {
  var match = param$1[1];
  var match$1 = param$1[0];
  var match$2 = param[4];
  var match$3 = param[3];
  var match$4 = param[2];
  var match$5 = param[1];
  var match$6 = param[0];
  var rtBindGroupLayout = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).device.createBindGroupLayout, {
        entries: [
          {
            binding: 0,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_generation | WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit,
            type: "acceleration-container"
          },
          {
            binding: 1,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_generation,
            type: "storage-buffer"
          },
          {
            binding: 2,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_generation,
            type: "uniform-buffer"
          },
          {
            binding: 3,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit,
            type: "storage-buffer"
          },
          {
            binding: 4,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit,
            type: "storage-buffer"
          },
          {
            binding: 5,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit,
            type: "storage-buffer"
          },
          {
            binding: 6,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit,
            type: "storage-buffer"
          },
          {
            binding: 7,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit,
            type: "storage-buffer"
          }
        ]
      }, device);
  PathTracingPassCPRepo$Wonderjs.addStaticBindGroupData(0, Curry._2(WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).device.createRayTracingBindGroup, {
            layout: rtBindGroupLayout,
            entries: [
              {
                accelerationContainer: instanceContainer,
                binding: 0,
                offset: 0,
                size: 0
              },
              {
                binding: 1,
                buffer: StorageBufferVO$Wonderjs.value(match$1[0]),
                offset: 0,
                size: match$1[1]
              },
              {
                binding: 2,
                buffer: UniformBufferVO$Wonderjs.value(match[0]),
                offset: 0,
                size: PassCPDoService$Wonderjs.getCommonBufferDataSize(match[1])
              },
              {
                binding: 3,
                buffer: StorageBufferVO$Wonderjs.value(match$6[0]),
                offset: 0,
                size: match$6[1]
              },
              {
                binding: 4,
                buffer: StorageBufferVO$Wonderjs.value(match$5[0]),
                offset: 0,
                size: match$5[1]
              },
              {
                binding: 5,
                buffer: StorageBufferVO$Wonderjs.value(match$4[0]),
                offset: 0,
                size: match$4[1]
              },
              {
                binding: 6,
                buffer: StorageBufferVO$Wonderjs.value(match$3[0]),
                offset: 0,
                size: match$3[1]
              },
              {
                binding: 7,
                buffer: StorageBufferVO$Wonderjs.value(match$2[0]),
                offset: 0,
                size: match$2[1]
              }
            ]
          }, device));
  return rtBindGroupLayout;
}

function _createAndSetPipeline(device, rtBindGroupLayout) {
  return Result$Wonderjs.mapSuccess(Tuple3$Wonderjs.collectOption(PathTracingPassCPRepo$Wonderjs.getShaderBindingTable(undefined), PathTracingPassCPRepo$Wonderjs.getCameraBindGroupLayout(undefined), PathTracingPassCPRepo$Wonderjs.getDirectionLightBindGroupLayout(undefined)), (function (param) {
                return PathTracingPassCPRepo$Wonderjs.setPipeline(Curry._2(WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).device.createRayTracingPipeline, {
                                layout: Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).device.createPipelineLayout, {
                                      bindGroupLayouts: [
                                        rtBindGroupLayout,
                                        param[1],
                                        param[2]
                                      ]
                                    }, device),
                                rayTracingState: {
                                  shaderBindingTable: param[0],
                                  maxRecursionDepth: 1,
                                  maxPayloadSize: ((Math.imul(9, Float32Array.BYTES_PER_ELEMENT) + (Uint32Array.BYTES_PER_ELEMENT << 0) | 0) + (Float32Array.BYTES_PER_ELEMENT << 0) | 0) + (Float32Array.BYTES_PER_ELEMENT << 0) | 0
                                }
                              }, device));
              }));
}

function exec(param) {
  return Most.just(Result$Wonderjs.bind(Tuple2$Wonderjs.collectOption(WebGPUCPRepo$Wonderjs.getDevice(undefined), WebGPUCPRepo$Wonderjs.getQueue(undefined)), (function (param) {
                    var device = param[0];
                    return Result$Wonderjs.bind(WebGPURayTracingRunAPI$Wonderjs.buildContainers(device, param[1]), (function (instanceContainer) {
                                  return Result$Wonderjs.bind(_buildAndSetAllBufferData(device), (function (param) {
                                                return Result$Wonderjs.bind(Tuple2$Wonderjs.collectOption(PassCPRepo$Wonderjs.getPixelBufferData(undefined), PassCPRepo$Wonderjs.getCommonBufferData(undefined)), (function (passAllBufferData) {
                                                              return Result$Wonderjs.bind(Tuple5$Wonderjs.collectOption(PathTracingPassCPRepo$Wonderjs.getSceneDescBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getPointIndexBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getVertexBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getIndexBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getPBRMaterialBufferData(undefined)), (function (pathTracingAllBufferData) {
                                                                            return _createAndSetPipeline(device, _createAndAddRayTracingBindGroup(device, instanceContainer, pathTracingAllBufferData, passAllBufferData));
                                                                          }));
                                                            }));
                                              }));
                                }));
                  })));
}

exports.create = create;
exports._buildAndSetSceneDescBufferData = _buildAndSetSceneDescBufferData;
exports._convertVertexStartIndexFromAlignedInPOToInVertexBufferData = _convertVertexStartIndexFromAlignedInPOToInVertexBufferData;
exports._buildAndSetPointIndexBufferData = _buildAndSetPointIndexBufferData;
exports._buildAndSetVertexBufferData = _buildAndSetVertexBufferData;
exports._buildAndSetIndexBufferData = _buildAndSetIndexBufferData;
exports._buildAndSetPBRMaterialBufferData = _buildAndSetPBRMaterialBufferData;
exports._buildAndSetAllBufferData = _buildAndSetAllBufferData;
exports._createAndAddRayTracingBindGroup = _createAndAddRayTracingBindGroup;
exports._createAndSetPipeline = _createAndSetPipeline;
exports.exec = exec;
/* most Not a pure module */
