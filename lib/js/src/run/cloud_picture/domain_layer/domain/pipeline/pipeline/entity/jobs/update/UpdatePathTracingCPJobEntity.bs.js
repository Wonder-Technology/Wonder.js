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
var TransformRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/TransformRunAPI.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");
var GameObjectRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/GameObjectRunAPI.bs.js");
var PBRMaterialEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/entity/PBRMaterialEntity.bs.js");
var PBRMaterialRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/PBRMaterialRunAPI.bs.js");
var LocalToWorldMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/LocalToWorldMatrixVO.bs.js");
var PointsGeometryCPRepo$Wonderjs = require("../../../../../../repo/scene/component/geometry/PointsGeometryCPRepo.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../repo/structure/utils/TypeArrayCPRepoUtils.bs.js");
var PathTracingPassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PathTracingPassCPRepo.bs.js");
var BuildAccerlerationContainerDoService$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/ray_tracing/service/BuildAccerlerationContainerDoService.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("update_pathTracing");
}

function _updateSceneDescBufferData(param, allRenderGameObjects) {
  var sceneDescBufferData = param[2];
  var sceneDescBufferSize = param[1];
  var sceneDescBuffer = param[0];
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
                                                                    ], sceneDescBufferData),
                                                                tl: {
                                                                  hd: TypeArrayCPRepoUtils$Wonderjs.setMat3Data(offset + 4 | 0, NormalMatrixVO$Wonderjs.value(normalMatrix), sceneDescBufferData),
                                                                  tl: {
                                                                    hd: TypeArrayCPRepoUtils$Wonderjs.setMat3Data((offset + 4 | 0) + 12 | 0, LocalToWorldMatrixVO$Wonderjs.value(TransformRunAPI$Wonderjs.getLocalToWorldMatrix(transform)), sceneDescBufferData),
                                                                    tl: /* [] */0
                                                                  }
                                                                }
                                                              });
                                                  })), (function (param) {
                                                return ((offset + 4 | 0) + 12 | 0) + 16 | 0;
                                              }));
                                }));
                  })), (function (param) {
                Curry._3(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).buffer.setSubFloat32Data, 0, sceneDescBufferData, StorageBufferVO$Wonderjs.value(sceneDescBuffer));
                return PathTracingPassCPRepo$Wonderjs.setSceneDescBufferData([
                            sceneDescBuffer,
                            sceneDescBufferSize,
                            sceneDescBufferData
                          ]);
              }));
}

function _updatePointIndexBufferData(param, allRenderGeometries) {
  var pointIndexBufferData = param[2];
  var pointIndexBufferSize = param[1];
  var pointIndexBuffer = param[0];
  return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(ListSt$Wonderjs.traverseResultM(allRenderGeometries, (function (geometry) {
                        var geometry$1 = GeometryEntity$Wonderjs.value(geometry);
                        return Tuple3$Wonderjs.collectResult(Result$Wonderjs.succeed(geometry$1), PointsGeometryCPRepo$Wonderjs.getVertexInfo(geometry$1), PointsGeometryCPRepo$Wonderjs.getIndexInfo(geometry$1));
                      })), (function (list) {
                    return ListSt$Wonderjs.traverseResultM(list, (function (param) {
                                  var geometry = param[0];
                                  return ListResult$Wonderjs.mergeResults({
                                              hd: TypeArrayCPRepoUtils$Wonderjs.setUint32_1((geometry << 1), param[1][0] / 3 * 8 | 0, pointIndexBufferData),
                                              tl: {
                                                hd: TypeArrayCPRepoUtils$Wonderjs.setUint32_1((geometry << 1) + 1 | 0, param[2][0], pointIndexBufferData),
                                                tl: /* [] */0
                                              }
                                            });
                                }));
                  })), (function (param) {
                Curry._3(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).buffer.setSubUint32Data, 0, pointIndexBufferData, StorageBufferVO$Wonderjs.value(pointIndexBuffer));
                return PathTracingPassCPRepo$Wonderjs.setPointIndexBufferData([
                            pointIndexBuffer,
                            pointIndexBufferSize,
                            pointIndexBufferData
                          ]);
              }));
}

function _updateVertexBufferData(param) {
  var vertexBufferData = param[2];
  var vertexBufferSize = param[1];
  var vertexBuffer = param[0];
  return Result$Wonderjs.tap(Contract$Wonderjs.requireCheck((function (param) {
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("vertices.length == normals.length", "not"), (function (param) {
                                  var vertices = PointsGeometryCPRepo$Wonderjs.getVerticesTypeArr(undefined);
                                  var normals = PointsGeometryCPRepo$Wonderjs.getNormalsTypeArr(undefined);
                                  return Contract$Wonderjs.Operators.$eq(vertices.length, normals.length);
                                }));
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                var vertices = PointsGeometryCPRepo$Wonderjs.getVerticesTypeArr(undefined);
                var normals = PointsGeometryCPRepo$Wonderjs.getNormalsTypeArr(undefined);
                var length = vertices.length;
                var i = 0;
                var j = 0;
                while(i < length) {
                  vertexBufferData[j] = vertices[i];
                  vertexBufferData[j + 1 | 0] = vertices[i + 1 | 0];
                  vertexBufferData[j + 2 | 0] = vertices[i + 2 | 0];
                  vertexBufferData[j + 4 | 0] = normals[i];
                  vertexBufferData[j + 5 | 0] = normals[i + 1 | 0];
                  vertexBufferData[j + 6 | 0] = normals[i + 2 | 0];
                  i = i + 3 | 0;
                  j = j + 8 | 0;
                };
                Curry._3(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).buffer.setSubFloat32Data, 0, vertexBufferData, StorageBufferVO$Wonderjs.value(vertexBuffer));
                return PathTracingPassCPRepo$Wonderjs.setVertexBufferData([
                            vertexBuffer,
                            vertexBufferSize,
                            vertexBufferData
                          ]);
              }));
}

function _updateIndexBufferData(param) {
  var indexBuffer = param[0];
  var indices = PointsGeometryCPRepo$Wonderjs.getIndicesTypeArr(undefined);
  Curry._3(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).buffer.setSubUint32Data, 0, indices, StorageBufferVO$Wonderjs.value(indexBuffer));
  return PathTracingPassCPRepo$Wonderjs.setIndexBufferData([
              indexBuffer,
              param[1]
            ]);
}

function _updatePBRMaterialBufferData(param, allRenderPBRMaterials) {
  var pbrMaterialBufferData = param[2];
  var pbrMaterialBufferSize = param[1];
  var pbrMaterialBuffer = param[0];
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseReduceResultM(allRenderPBRMaterials, 0, (function (offset, pbrMaterial) {
                    var diffuse = DiffuseVO$Wonderjs.getPrimitiveValue(PBRMaterialRunAPI$Wonderjs.getDiffuseColor(pbrMaterial));
                    var specular = SpecularVO$Wonderjs.value(PBRMaterialRunAPI$Wonderjs.getSpecular(pbrMaterial));
                    var roughness = RoughnessVO$Wonderjs.value(PBRMaterialRunAPI$Wonderjs.getRoughness(pbrMaterial));
                    var metalness = MetalnessVO$Wonderjs.value(PBRMaterialRunAPI$Wonderjs.getMetalness(pbrMaterial));
                    return Result$Wonderjs.mapSuccess(ListResult$Wonderjs.mergeResults({
                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat3(offset + 0 | 0, diffuse, pbrMaterialBufferData),
                                    tl: {
                                      hd: TypeArrayCPRepoUtils$Wonderjs.setFloat3(offset + 4 | 0, [
                                            metalness,
                                            roughness,
                                            specular
                                          ], pbrMaterialBufferData),
                                      tl: /* [] */0
                                    }
                                  }), (function (param) {
                                  return (offset + 4 | 0) + 4 | 0;
                                }));
                  })), (function (param) {
                Curry._3(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).buffer.setSubFloat32Data, 0, pbrMaterialBufferData, StorageBufferVO$Wonderjs.value(pbrMaterialBuffer));
                return PathTracingPassCPRepo$Wonderjs.setPBRMaterialBufferData([
                            pbrMaterialBuffer,
                            pbrMaterialBufferSize,
                            pbrMaterialBufferData
                          ]);
              }));
}

function _updateAllBufferData(param) {
  var match = param[4];
  var match$1 = param[3];
  var match$2 = param[2];
  var match$3 = param[1];
  var match$4 = param[0];
  var allRenderGeometries = GameObjectRunAPI$Wonderjs.getAllRenderGeometries(undefined);
  return ListResult$Wonderjs.mergeResults({
              hd: _updateSceneDescBufferData([
                    match$4[0],
                    match$4[1],
                    match$4[2]
                  ], GameObjectRunAPI$Wonderjs.getAllRenderGameObjects(undefined)),
              tl: {
                hd: _updatePointIndexBufferData([
                      match$3[0],
                      match$3[1],
                      match$3[2]
                    ], allRenderGeometries),
                tl: {
                  hd: _updateVertexBufferData([
                        match$2[0],
                        match$2[1],
                        match$2[2]
                      ]),
                  tl: {
                    hd: Result$Wonderjs.succeed(_updateIndexBufferData([
                              match$1[0],
                              match$1[1]
                            ])),
                    tl: {
                      hd: _updatePBRMaterialBufferData([
                            match[0],
                            match[1],
                            match[2]
                          ], GameObjectRunAPI$Wonderjs.getAllRenderPBRMaterials(undefined)),
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
  var rtBindGroupLayout = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createBindGroupLayout, {
        entries: [
          {
            binding: 0,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_generation | DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_closest_hit,
            type: "acceleration-container"
          },
          {
            binding: 1,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_generation,
            type: "storage-buffer"
          },
          {
            binding: 2,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_generation | DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_closest_hit,
            type: "uniform-buffer"
          },
          {
            binding: 3,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_closest_hit,
            type: "storage-buffer"
          },
          {
            binding: 4,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_closest_hit,
            type: "storage-buffer"
          },
          {
            binding: 5,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_closest_hit,
            type: "storage-buffer"
          },
          {
            binding: 6,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_closest_hit,
            type: "storage-buffer"
          },
          {
            binding: 7,
            visibility: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).shaderStage.ray_closest_hit,
            type: "storage-buffer"
          }
        ]
      }, device);
  PathTracingPassCPRepo$Wonderjs.addStaticBindGroupData(0, Curry._2(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).device.createRayTracingBindGroup, {
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
                size: PassCPDoService$Wonderjs.getCommonDataBufferSize(match[1])
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
                return PathTracingPassCPRepo$Wonderjs.setPipeline(Curry._2(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).device.createRayTracingPipeline, {
                                layout: Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createPipelineLayout, {
                                      bindGroupLayouts: [
                                        rtBindGroupLayout,
                                        param[1],
                                        param[2]
                                      ]
                                    }, device),
                                rayTracingState: {
                                  shaderBindingTable: param[0],
                                  maxRecursionDepth: 1,
                                  maxPayloadSize: (Math.imul(9, Float32Array.BYTES_PER_ELEMENT) + (Uint32Array.BYTES_PER_ELEMENT << 0) | 0) + (Float32Array.BYTES_PER_ELEMENT << 0) | 0
                                }
                              }, device));
              }));
}

function exec(param) {
  return Most.just(Result$Wonderjs.bind(Tuple2$Wonderjs.collectOption(WebGPUCPRepo$Wonderjs.getDevice(undefined), WebGPUCPRepo$Wonderjs.getQueue(undefined)), (function (param) {
                    var device = param[0];
                    return Result$Wonderjs.bind(BuildAccerlerationContainerDoService$Wonderjs.buildContainers(device, param[1]), (function (instanceContainer) {
                                  return Result$Wonderjs.bind(Tuple5$Wonderjs.collectOption(PathTracingPassCPRepo$Wonderjs.getSceneDescBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getPointIndexBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getVertexBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getIndexBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getPBRMaterialBufferData(undefined)), (function (allBufferData) {
                                                var match = allBufferData[4];
                                                var pbrMaterialBufferSize = match[1];
                                                var pbrMaterialBuffer = match[0];
                                                var match$1 = allBufferData[3];
                                                var indexBufferSize = match$1[1];
                                                var indexBuffer = match$1[0];
                                                var match$2 = allBufferData[2];
                                                var vertexBufferSize = match$2[1];
                                                var vertexBuffer = match$2[0];
                                                var match$3 = allBufferData[1];
                                                var pointIndexBufferSize = match$3[1];
                                                var pointIndexBuffer = match$3[0];
                                                var match$4 = allBufferData[0];
                                                var sceneDescBufferSize = match$4[1];
                                                var sceneDescBuffer = match$4[0];
                                                return Result$Wonderjs.bind(_updateAllBufferData(allBufferData), (function (param) {
                                                              return Result$Wonderjs.bind(Tuple2$Wonderjs.collectOption(PassCPRepo$Wonderjs.getPixelBufferData(undefined), PassCPRepo$Wonderjs.getCommonBufferData(undefined)), (function (passAllBufferData) {
                                                                            return _createAndSetPipeline(device, _createAndAddRayTracingBindGroup(device, instanceContainer, [
                                                                                            [
                                                                                              sceneDescBuffer,
                                                                                              sceneDescBufferSize
                                                                                            ],
                                                                                            [
                                                                                              pointIndexBuffer,
                                                                                              pointIndexBufferSize
                                                                                            ],
                                                                                            [
                                                                                              vertexBuffer,
                                                                                              vertexBufferSize
                                                                                            ],
                                                                                            [
                                                                                              indexBuffer,
                                                                                              indexBufferSize
                                                                                            ],
                                                                                            [
                                                                                              pbrMaterialBuffer,
                                                                                              pbrMaterialBufferSize
                                                                                            ]
                                                                                          ], passAllBufferData));
                                                                          }));
                                                            }));
                                              }));
                                }));
                  })));
}

exports.create = create;
exports._updateSceneDescBufferData = _updateSceneDescBufferData;
exports._updatePointIndexBufferData = _updatePointIndexBufferData;
exports._updateVertexBufferData = _updateVertexBufferData;
exports._updateIndexBufferData = _updateIndexBufferData;
exports._updatePBRMaterialBufferData = _updatePBRMaterialBufferData;
exports._updateAllBufferData = _updateAllBufferData;
exports._createAndAddRayTracingBindGroup = _createAndAddRayTracingBindGroup;
exports._createAndSetPipeline = _createAndSetPipeline;
exports.exec = exec;
/* most Not a pure module */
