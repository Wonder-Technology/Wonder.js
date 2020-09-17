'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../library/structure/tuple/Tuple2.bs.js");
var ArraySt$Wonderjs = require("../../../../library/structure/ArraySt.bs.js");
var Matrix4$Wonderjs = require("../../../../library/structure/matrix/Matrix4.bs.js");
var ScaleVO$Wonderjs = require("../../../scene/scene_graph/value_object/ScaleVO.bs.js");
var OptionSt$Wonderjs = require("../../../../library/structure/OptionSt.bs.js");
var IndicesVO$Wonderjs = require("../../../scene/scene_graph/value_object/IndicesVO.bs.js");
var MathUtils$Wonderjs = require("../../../../library/structure/utils/MathUtils.bs.js");
var PositionVO$Wonderjs = require("../../../scene/scene_graph/value_object/PositionVO.bs.js");
var Quaternion$Wonderjs = require("../../../../library/structure/Quaternion.bs.js");
var VerticesVO$Wonderjs = require("../../../scene/scene_graph/value_object/VerticesVO.bs.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");
var EulerAnglesVO$Wonderjs = require("../../../scene/scene_graph/value_object/EulerAnglesVO.bs.js");
var GeometryEntity$Wonderjs = require("../../../scene/scene_graph/entity/GeometryEntity.bs.js");
var GameObjectRunAPI$Wonderjs = require("../../../../../external_layer/api/run/domain/GameObjectRunAPI.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../library/structure/sparse_map/ImmutableSparseMap.bs.js");
var RayTracingBufferVO$Wonderjs = require("../value_object/RayTracingBufferVO.bs.js");
var IndicesGeometryDoService$Wonderjs = require("../../../scene/scene_graph/service/geometry/IndicesGeometryDoService.bs.js");
var UpdateTransformDoService$Wonderjs = require("../../../scene/scene_graph/service/transform/UpdateTransformDoService.bs.js");
var VerticesGeometryDoService$Wonderjs = require("../../../scene/scene_graph/service/geometry/VerticesGeometryDoService.bs.js");
var AllRenderGameObjectsDoService$Wonderjs = require("../../../scene/scene_graph/service/gameObject/AllRenderGameObjectsDoService.bs.js");

function _buildSceneGeometryContainers(device) {
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseResultM(AllRenderGameObjectsDoService$Wonderjs.getAllRenderGeometries(undefined), (function (geometry) {
                    return Result$Wonderjs.bind(VerticesGeometryDoService$Wonderjs.getVertices(geometry), (function (vertices) {
                                  return Result$Wonderjs.mapSuccess(IndicesGeometryDoService$Wonderjs.getIndices(geometry), (function (indices) {
                                                return [
                                                        GeometryEntity$Wonderjs.value(geometry),
                                                        VerticesVO$Wonderjs.value(vertices),
                                                        IndicesVO$Wonderjs.value(indices)
                                                      ];
                                              }));
                                }));
                  })), (function (list) {
                return ListSt$Wonderjs.reduce(list, ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined), (function (geometryContainerMap, param) {
                              var indices = param[2];
                              var vertices = param[1];
                              var geometryVertexBuffer = RayTracingBufferVO$Wonderjs.createFromDevice(device, vertices.byteLength);
                              Curry._3(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).buffer.setSubFloat32Data, 0, vertices, RayTracingBufferVO$Wonderjs.value(geometryVertexBuffer));
                              var geometryIndexBuffer = RayTracingBufferVO$Wonderjs.createFromDevice(device, indices.byteLength);
                              Curry._3(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).buffer.setSubUint32Data, 0, indices, RayTracingBufferVO$Wonderjs.value(geometryIndexBuffer));
                              return ImmutableSparseMap$Wonderjs.set(geometryContainerMap, param[0], Curry._2(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).device.createRayTracingAccelerationContainer, {
                                              level: "bottom",
                                              usage: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).accelerationContainerUsage.prefer_fast_trace,
                                              geometries: [{
                                                  usage: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).accelerationGeometryUsage.opaque,
                                                  type: "triangles",
                                                  vertex: {
                                                    buffer: RayTracingBufferVO$Wonderjs.value(geometryVertexBuffer),
                                                    format: "float3",
                                                    stride: Math.imul(3, Float32Array.BYTES_PER_ELEMENT),
                                                    count: vertices.length
                                                  },
                                                  index: {
                                                    buffer: RayTracingBufferVO$Wonderjs.value(geometryIndexBuffer),
                                                    format: "uint32",
                                                    count: indices.length
                                                  }
                                                }]
                                            }, device));
                            }));
              }));
}

function _convertMat4To34RowMajorMatrix(mat4) {
  return new Float32Array([
              mat4[0],
              mat4[4],
              mat4[8],
              mat4[12],
              mat4[1],
              mat4[5],
              mat4[9],
              mat4[13],
              mat4[2],
              mat4[6],
              mat4[10],
              mat4[14]
            ]);
}

function _convertInstanceTransformDataToContainerTransformMatrix(param) {
  return _convertMat4To34RowMajorMatrix(Matrix4$Wonderjs.fromTranslationRotationScale(Matrix4$Wonderjs.createIdentityMatrix4(undefined), param[0], Quaternion$Wonderjs.setFromEulerAngles(param[1]), param[2]));
}

function _convertHitGroupIndexToInstanceOffset(hitGroupIndex) {
  return MathUtils$Wonderjs.convertDecimalToHex(hitGroupIndex, 16);
}

function _createInstances(geometryContainerMap) {
  return Result$Wonderjs.mapSuccess(Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseResultM(GameObjectRunAPI$Wonderjs.getAllRenderGameObjects(undefined), (function (gameObject) {
                        return Tuple2$Wonderjs.collectOption(GameObjectRunAPI$Wonderjs.getTransform(gameObject), OptionSt$Wonderjs.flatMap(GameObjectRunAPI$Wonderjs.getGeometry(gameObject), (function (geometry) {
                                          return ImmutableSparseMap$Wonderjs.get(geometryContainerMap, GeometryEntity$Wonderjs.value(geometry));
                                        })));
                      })), (function (list) {
                    return ListSt$Wonderjs.reduce(list, [
                                [],
                                0
                              ], (function (param, param$1) {
                                  var transform = param$1[0];
                                  var instanceIndex = param[1];
                                  return [
                                          ArraySt$Wonderjs.push(param[0], {
                                                usage: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).accelerationInstanceUsage.triangle_cull_disable,
                                                mask: 255,
                                                instanceId: instanceIndex,
                                                instanceOffset: MathUtils$Wonderjs.convertDecimalToHex(0, 16),
                                                geometryContainer: param$1[1],
                                                transformMatrix: _convertInstanceTransformDataToContainerTransformMatrix([
                                                      PositionVO$Wonderjs.value(UpdateTransformDoService$Wonderjs.updateAndGetPosition(transform)),
                                                      EulerAnglesVO$Wonderjs.getPrimitiveValue(UpdateTransformDoService$Wonderjs.updateAndGetEulerAngles(transform)),
                                                      ScaleVO$Wonderjs.value(UpdateTransformDoService$Wonderjs.updateAndGetScale(transform))
                                                    ])
                                              }),
                                          instanceIndex + 1 | 0
                                        ];
                                }));
                  })), Tuple2$Wonderjs.getFirst);
}

function _createInstanceContainer(geometryContainerMap, device) {
  return Result$Wonderjs.mapSuccess(_createInstances(geometryContainerMap), (function (instances) {
                return Curry._2(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).device.createRayTracingAccelerationContainer, {
                            level: "top",
                            usage: DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).accelerationContainerUsage.prefer_fast_trace,
                            instances: instances
                          }, device);
              }));
}

function buildContainers(device, queue) {
  return Result$Wonderjs.bind(_buildSceneGeometryContainers(device), (function (geometryContainerMap) {
                return Result$Wonderjs.tap(_createInstanceContainer(geometryContainerMap, device), (function (instanceContainer) {
                              var commandEncoder = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createCommandEncoder, {}, device);
                              ArraySt$Wonderjs.forEach(ImmutableSparseMap$Wonderjs.getValues(geometryContainerMap), (function (geometryContainer) {
                                      return Curry._2(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).commandEncoder.buildRayTracingAccelerationContainer, geometryContainer, commandEncoder);
                                    }));
                              Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).queue.submit, [Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).commandEncoder.finish, commandEncoder)], queue);
                              var commandEncoder$1 = Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createCommandEncoder, {}, device);
                              Curry._2(DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined).commandEncoder.buildRayTracingAccelerationContainer, instanceContainer, commandEncoder$1);
                              Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).queue.submit, [Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).commandEncoder.finish, commandEncoder$1)], queue);
                              
                            }));
              }));
}

exports._buildSceneGeometryContainers = _buildSceneGeometryContainers;
exports._convertMat4To34RowMajorMatrix = _convertMat4To34RowMajorMatrix;
exports._convertInstanceTransformDataToContainerTransformMatrix = _convertInstanceTransformDataToContainerTransformMatrix;
exports._convertHitGroupIndexToInstanceOffset = _convertHitGroupIndexToInstanceOffset;
exports._createInstances = _createInstances;
exports._createInstanceContainer = _createInstanceContainer;
exports.buildContainers = buildContainers;
/* No side effect */
