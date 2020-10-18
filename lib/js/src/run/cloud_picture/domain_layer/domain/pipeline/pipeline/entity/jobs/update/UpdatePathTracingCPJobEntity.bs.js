'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/log/Log.bs.js");
var IORVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/IORVO.bs.js");
var ListSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Number$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Number.bs.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple2.bs.js");
var Tuple3$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple3.bs.js");
var Tuple6$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple6.bs.js");
var Tuple7$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple7.bs.js");
var Contract$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var OptionSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var DiffuseVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/DiffuseVO.bs.js");
var ImageIdVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/asset/image/value_object/ImageIdVO.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var ListResult$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListResult.bs.js");
var PassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PassCPRepo.bs.js");
var SpecularVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/SpecularVO.bs.js");
var AssetRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/AssetRunAPI.bs.js");
var DpContainer$Wonderjs = require("../../../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");
var MetalnessVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/MetalnessVO.bs.js");
var RoughnessVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/RoughnessVO.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/webgpu/WebGPUCPRepo.bs.js");
var GeometryEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/entity/GeometryEntity.bs.js");
var NormalMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/NormalMatrixVO.bs.js");
var TransmissionVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/TransmissionVO.bs.js");
var PassCPDoService$Wonderjs = require("../../../service/PassCPDoService.bs.js");
var SpecularColorVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/SpecularColorVO.bs.js");
var StorageBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/StorageBufferVO.bs.js");
var TransformRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/TransformRunAPI.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");
var GameObjectRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/GameObjectRunAPI.bs.js");
var WebGPUCoreRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/WebGPUCoreRunAPI.bs.js");
var BSDFMaterialEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/entity/BSDFMaterialEntity.bs.js");
var BSDFMaterialRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/BSDFMaterialRunAPI.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/dependency/WebGPUCoreDpRunAPI.bs.js");
var OtherConfigDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/dependency/OtherConfigDpRunAPI.bs.js");
var LocalToWorldMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/LocalToWorldMatrixVO.bs.js");
var PointsGeometryCPRepo$Wonderjs = require("../../../../../../repo/scene/component/geometry/PointsGeometryCPRepo.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../../infrastructure_layer/dependency/repo/scene/component/utils/TypeArrayCPRepoUtils.bs.js");
var PathTracingPassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PathTracingPassCPRepo.bs.js");
var WebGPURayTracingRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/WebGPURayTracingRunAPI.bs.js");
var TextureArrayWebGPUCPRepo$Wonderjs = require("../../../../../../repo/webgpu/TextureArrayWebGPUCPRepo.bs.js");
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
                        return Tuple3$Wonderjs.collectOption(GameObjectRunAPI$Wonderjs.getTransform(gameObject), GameObjectRunAPI$Wonderjs.getGeometry(gameObject), GameObjectRunAPI$Wonderjs.getBSDFMaterial(gameObject));
                      })), (function (list) {
                    return ListSt$Wonderjs.traverseReduceResultM(list, 0, (function (offset, param) {
                                  var bsdfMaterial = param[2];
                                  var geometry = param[1];
                                  var transform = param[0];
                                  return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(TransformRunAPI$Wonderjs.getNormalMatrix(transform), (function (normalMatrix) {
                                                    return ListResult$Wonderjs.mergeResults({
                                                                hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 0 | 0, [
                                                                      GeometryEntity$Wonderjs.value(geometry),
                                                                      BSDFMaterialEntity$Wonderjs.value(bsdfMaterial)
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
                                  var x = Number$Wonderjs.dividInt(vertexStartIndex, 3);
                                  return Contract$Wonderjs.Operators.$eq$eq$dot(x - Math.floor(x), 0.0);
                                }));
                  }), Curry._1(OtherConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
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
  return Result$Wonderjs.bind(Contract$Wonderjs.requireCheck((function (param) {
                    Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("vertices.length == normals.length", "not"), (function (param) {
                            var vertices = PointsGeometryCPRepo$Wonderjs.getSubUsedVerticesTypeArr(undefined);
                            var normals = PointsGeometryCPRepo$Wonderjs.getSubUsedNormalsTypeArr(undefined);
                            return Contract$Wonderjs.Operators.$eq(vertices.length, normals.length);
                          }));
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("verticesOffset == normalsOffset", "not"), (function (param) {
                                  return Contract$Wonderjs.Operators.$eq(PointsGeometryCPRepo$Wonderjs.getVerticesOffset(undefined), PointsGeometryCPRepo$Wonderjs.getNormalsOffset(undefined));
                                }));
                  }), Curry._1(OtherConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
                return Result$Wonderjs.mapSuccess(PointsGeometryCPRepo$Wonderjs.getVertexCount(undefined), (function (vertexCount) {
                              var bufferData = new Float32Array((vertexCount << 4));
                              var bufferSize = bufferData.byteLength;
                              var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
                              var vertices = PointsGeometryCPRepo$Wonderjs.getSubUsedVerticesTypeArr(undefined);
                              var texCoords = PointsGeometryCPRepo$Wonderjs.getSubUsedTexCoordsTypeArr(undefined);
                              var normals = PointsGeometryCPRepo$Wonderjs.getSubUsedNormalsTypeArr(undefined);
                              var tangents = PointsGeometryCPRepo$Wonderjs.getSubUsedTangentsTypeArr(undefined);
                              var length = Math.imul(vertexCount, 3);
                              var i = 0;
                              var texCoordsIndex = 0;
                              var j = 0;
                              while(i < length) {
                                bufferData[j] = vertices[i];
                                bufferData[j + 1 | 0] = vertices[i + 1 | 0];
                                bufferData[j + 2 | 0] = vertices[i + 2 | 0];
                                bufferData[j + 4 | 0] = texCoords[texCoordsIndex];
                                bufferData[j + 5 | 0] = 1.0 - texCoords[texCoordsIndex + 1 | 0];
                                bufferData[j + 8 | 0] = normals[i];
                                bufferData[j + 9 | 0] = normals[i + 1 | 0];
                                bufferData[j + 10 | 0] = normals[i + 2 | 0];
                                bufferData[j + 12 | 0] = tangents[i];
                                bufferData[j + 13 | 0] = tangents[i + 1 | 0];
                                bufferData[j + 14 | 0] = tangents[i + 2 | 0];
                                i = i + 3 | 0;
                                texCoordsIndex = texCoordsIndex + 2 | 0;
                                j = j + 16 | 0;
                              };
                              Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubFloat32Data, 0, bufferData, StorageBufferVO$Wonderjs.value(buffer));
                              return PathTracingPassCPRepo$Wonderjs.setVertexBufferData([
                                          buffer,
                                          bufferSize,
                                          bufferData
                                        ]);
                            }));
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

function _getMapLayerIndexForNotExist(param) {
  return 5000;
}

function _getMapLayerIndex(mapImageIdOpt) {
  if (mapImageIdOpt !== undefined) {
    return OptionSt$Wonderjs.getWithDefault(TextureArrayWebGPUCPRepo$Wonderjs.getLayerIndex(ImageIdVO$Wonderjs.value(mapImageIdOpt)), 5000);
  } else {
    return 5000;
  }
}

function _computeMapScale(mapImageIdOpt) {
  var defaultScale = [
    1.0,
    1.0
  ];
  var tmp;
  if (mapImageIdOpt !== undefined) {
    var match = AssetRunAPI$Wonderjs.getImageData(mapImageIdOpt);
    if (match !== undefined) {
      var match$1 = WebGPUCoreRunAPI$Wonderjs.getTextureArrayLayerSize(undefined);
      tmp = [
        Number$Wonderjs.dividInt(match.width, match$1[0]),
        Number$Wonderjs.dividInt(match.height, match$1[1])
      ];
    } else {
      tmp = defaultScale;
    }
  } else {
    tmp = defaultScale;
  }
  return Contract$Wonderjs.ensureCheck(tmp, (function (param) {
                var scaleY = param[1];
                var scaleX = param[0];
                return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("map scale in (0.0, 1.0]", "not "), (function (param) {
                              if (Contract$Wonderjs.Operators.$great$dot(scaleX, 0.0) && Contract$Wonderjs.Operators.$less$eq$dot(scaleX, 1.0) && Contract$Wonderjs.Operators.$great$dot(scaleY, 0.0)) {
                                return Contract$Wonderjs.Operators.$less$eq$dot(scaleY, 1.0);
                              } else {
                                return false;
                              }
                            }));
              }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined));
}

function _buildAndSetBSDFMaterialBufferData(device, allRenderBSDFMaterials) {
  var bsdfMaterialCount = ListSt$Wonderjs.length(allRenderBSDFMaterials);
  var bufferData = new Float32Array((bsdfMaterialCount << 5));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseReduceResultM(allRenderBSDFMaterials, 0, (function (offset, bsdfMaterial) {
                    var diffuse = DiffuseVO$Wonderjs.getPrimitiveValue(BSDFMaterialRunAPI$Wonderjs.getDiffuseColor(bsdfMaterial));
                    var specularColor = SpecularColorVO$Wonderjs.getPrimitiveValue(BSDFMaterialRunAPI$Wonderjs.getSpecularColor(bsdfMaterial));
                    var specular = SpecularVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getSpecular(bsdfMaterial));
                    var roughness = RoughnessVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getRoughness(bsdfMaterial));
                    var metalness = MetalnessVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getMetalness(bsdfMaterial));
                    var transmission = TransmissionVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getTransmission(bsdfMaterial));
                    var ior = IORVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getIOR(bsdfMaterial));
                    var diffuseMapImageId = BSDFMaterialRunAPI$Wonderjs.getDiffuseMapImageId(bsdfMaterial);
                    var channelRoughnessMetallicMapImageId = BSDFMaterialRunAPI$Wonderjs.getChannelRoughnessMetallicMapImageId(bsdfMaterial);
                    var emissionMapImageId = BSDFMaterialRunAPI$Wonderjs.getEmissionMapImageId(bsdfMaterial);
                    var normalMapImageId = BSDFMaterialRunAPI$Wonderjs.getNormalMapImageId(bsdfMaterial);
                    var transmissionMapImageId = BSDFMaterialRunAPI$Wonderjs.getTransmissionMapImageId(bsdfMaterial);
                    var specularMapImageId = BSDFMaterialRunAPI$Wonderjs.getSpecularMapImageId(bsdfMaterial);
                    return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(Tuple6$Wonderjs.collectResult(_computeMapScale(diffuseMapImageId), _computeMapScale(channelRoughnessMetallicMapImageId), _computeMapScale(emissionMapImageId), _computeMapScale(normalMapImageId), _computeMapScale(transmissionMapImageId), _computeMapScale(specularMapImageId)), (function (param) {
                                      return ListResult$Wonderjs.mergeResults({
                                                  hd: TypeArrayCPRepoUtils$Wonderjs.setFloat3(offset + 0 | 0, diffuse, bufferData),
                                                  tl: {
                                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat3(offset + 4 | 0, specularColor, bufferData),
                                                    tl: {
                                                      hd: TypeArrayCPRepoUtils$Wonderjs.setFloat4(offset + 8 | 0, [
                                                            metalness,
                                                            roughness,
                                                            specular,
                                                            transmission
                                                          ], bufferData),
                                                      tl: {
                                                        hd: TypeArrayCPRepoUtils$Wonderjs.setFloat4(offset + 12 | 0, [
                                                              ior,
                                                              _getMapLayerIndex(diffuseMapImageId),
                                                              _getMapLayerIndex(channelRoughnessMetallicMapImageId),
                                                              _getMapLayerIndex(emissionMapImageId)
                                                            ], bufferData),
                                                        tl: {
                                                          hd: TypeArrayCPRepoUtils$Wonderjs.setFloat3(offset + 16 | 0, [
                                                                _getMapLayerIndex(normalMapImageId),
                                                                _getMapLayerIndex(transmissionMapImageId),
                                                                _getMapLayerIndex(specularMapImageId)
                                                              ], bufferData),
                                                          tl: {
                                                            hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 20 | 0, param[0], bufferData),
                                                            tl: {
                                                              hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 22 | 0, param[1], bufferData),
                                                              tl: {
                                                                hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 24 | 0, param[2], bufferData),
                                                                tl: {
                                                                  hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 26 | 0, param[3], bufferData),
                                                                  tl: {
                                                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 28 | 0, param[4], bufferData),
                                                                    tl: {
                                                                      hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 30 | 0, param[5], bufferData),
                                                                      tl: /* [] */0
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                });
                                    })), (function (param) {
                                  return offset + 32 | 0;
                                }));
                  })), (function (param) {
                Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubFloat32Data, 0, bufferData, StorageBufferVO$Wonderjs.value(buffer));
                return PathTracingPassCPRepo$Wonderjs.setBSDFMaterialBufferData([
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
                      hd: _buildAndSetBSDFMaterialBufferData(device, GameObjectRunAPI$Wonderjs.getAllRenderBSDFMaterials(undefined)),
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
          },
          {
            binding: 8,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit,
            type: "sampler"
          },
          {
            binding: 9,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit,
            type: "sampled-texture",
            viewDimension: "2d-array"
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
              },
              {
                binding: 8,
                sampler: param[5],
                size: 0
              },
              {
                binding: 9,
                textureView: param[6],
                size: 0
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
                                  maxPayloadSize: (((Math.imul(9, Float32Array.BYTES_PER_ELEMENT) + (Uint32Array.BYTES_PER_ELEMENT << 0) | 0) + (Float32Array.BYTES_PER_ELEMENT << 0) | 0) + (Float32Array.BYTES_PER_ELEMENT << 0) | 0) + Math.imul(3, Float32Array.BYTES_PER_ELEMENT) | 0
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
                                                              return Result$Wonderjs.bind(Tuple7$Wonderjs.collectOption(PathTracingPassCPRepo$Wonderjs.getSceneDescBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getPointIndexBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getVertexBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getIndexBufferData(undefined), PathTracingPassCPRepo$Wonderjs.getBSDFMaterialBufferData(undefined), TextureArrayWebGPUCPRepo$Wonderjs.getTextureSampler(undefined), TextureArrayWebGPUCPRepo$Wonderjs.getTextureArrayView(undefined)), (function (pathTracingAllBufferDataAndTextureArrayData) {
                                                                            return _createAndSetPipeline(device, _createAndAddRayTracingBindGroup(device, instanceContainer, pathTracingAllBufferDataAndTextureArrayData, passAllBufferData));
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
exports._getMapLayerIndexForNotExist = _getMapLayerIndexForNotExist;
exports._getMapLayerIndex = _getMapLayerIndex;
exports._computeMapScale = _computeMapScale;
exports._buildAndSetBSDFMaterialBufferData = _buildAndSetBSDFMaterialBufferData;
exports._buildAndSetAllBufferData = _buildAndSetAllBufferData;
exports._createAndAddRayTracingBindGroup = _createAndAddRayTracingBindGroup;
exports._createAndSetPipeline = _createAndSetPipeline;
exports.exec = exec;
/* most Not a pure module */
