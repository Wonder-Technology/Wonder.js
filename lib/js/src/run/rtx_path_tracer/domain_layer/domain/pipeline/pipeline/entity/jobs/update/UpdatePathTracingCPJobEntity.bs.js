'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Log$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/log/Log.bs.js");
var IORVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/IORVO.bs.js");
var ListSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Number$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Number.bs.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple2.bs.js");
var Tuple3$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple3.bs.js");
var Tuple6$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple6.bs.js");
var Tuple7$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple7.bs.js");
var WrapVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/WrapVO.bs.js");
var Contract$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var OptionSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var DiffuseVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/DiffuseVO.bs.js");
var ImageIdVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/asset/image/value_object/ImageIdVO.bs.js");
var IndicesVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/IndicesVO.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var NormalsVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/NormalsVO.bs.js");
var ListResult$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListResult.bs.js");
var PassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PassCPRepo.bs.js");
var SpecularVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/SpecularVO.bs.js");
var TangentsVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/TangentsVO.bs.js");
var VerticesVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/VerticesVO.bs.js");
var AssetRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/domain/AssetRunAPI.bs.js");
var DpContainer$Wonderjs = require("../../../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");
var MetalnessVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/MetalnessVO.bs.js");
var RoughnessVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/RoughnessVO.bs.js");
var SceneRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/domain/SceneRunAPI.bs.js");
var TexCoordsVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/TexCoordsVO.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/webgpu/WebGPUCPRepo.bs.js");
var AlphaCutoffVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/AlphaCutoffVO.bs.js");
var GeometryRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/domain/GeometryRunAPI.bs.js");
var NormalMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/NormalMatrixVO.bs.js");
var TransmissionVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/TransmissionVO.bs.js");
var EmissionColorVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/EmissionColorVO.bs.js");
var PassCPDoService$Wonderjs = require("../../../service/PassCPDoService.bs.js");
var SpecularColorVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/SpecularColorVO.bs.js");
var StorageBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/StorageBufferVO.bs.js");
var TransformRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/domain/TransformRunAPI.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");
var GameObjectRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/domain/GameObjectRunAPI.bs.js");
var BSDFMaterialRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/domain/BSDFMaterialRunAPI.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/dependency/WebGPUCoreDpRunAPI.bs.js");
var LocalToWorldMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/LocalToWorldMatrixVO.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../../infrastructure_layer/dependency/repo/utils/TypeArrayCPRepoUtils.bs.js");
var PathTracingPassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PathTracingPassCPRepo.bs.js");
var WebGPURayTracingRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/domain/WebGPURayTracingRunAPI.bs.js");
var TextureArrayWebGPUCPRepo$Wonderjs = require("../../../../../../repo/webgpu/TextureArrayWebGPUCPRepo.bs.js");
var WebGPURayTracingDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/dependency/WebGPURayTracingDpRunAPI.bs.js");
var TextureArrayWebGPUCPDoService$Wonderjs = require("../../../../../webgpu/core/service/TextureArrayWebGPUCPDoService.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("update_pathTracing");
}

function _findIndex(isSameFunc, component, components) {
  return OptionSt$Wonderjs.get(ListSt$Wonderjs.reducei(components, undefined, (function (indexOpt, sourceComponent, index) {
                    if (indexOpt !== undefined) {
                      return indexOpt;
                    } else if (Curry._2(isSameFunc, sourceComponent, component)) {
                      return index;
                    } else {
                      return ;
                    }
                  })));
}

function _buildAndSetSceneDescBufferData(device, allRenderGameObjects, allRenderGeometries, allRenderBSDFMaterials) {
  var gameObjectCount = ListSt$Wonderjs.length(allRenderGameObjects);
  var bufferData = new Float32Array((gameObjectCount << 5));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
  return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(ListSt$Wonderjs.traverseResultM(allRenderGameObjects, (function (gameObject) {
                        return Tuple3$Wonderjs.collectOption(GameObjectRunAPI$Wonderjs.getTransform(gameObject), GameObjectRunAPI$Wonderjs.getGeometry(gameObject), GameObjectRunAPI$Wonderjs.getBSDFMaterial(gameObject));
                      })), (function (list) {
                    return ListSt$Wonderjs.traverseReduceResultM(list, 0, (function (offset, param) {
                                  var transform = param[0];
                                  return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(Tuple2$Wonderjs.collectResult(_findIndex(GeometryRunAPI$Wonderjs.isSame, param[1], allRenderGeometries), _findIndex(BSDFMaterialRunAPI$Wonderjs.isSame, param[2], allRenderBSDFMaterials)), (function (param) {
                                                    return ListResult$Wonderjs.mergeResults({
                                                                hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 0 | 0, [
                                                                      param[0],
                                                                      param[1]
                                                                    ], bufferData),
                                                                tl: {
                                                                  hd: TypeArrayCPRepoUtils$Wonderjs.setMat3Data(offset + 4 | 0, NormalMatrixVO$Wonderjs.value(TransformRunAPI$Wonderjs.getNormalMatrix(transform)), bufferData),
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

var _computeVertexCount = VerticesVO$Wonderjs.getCount;

var _computeFaceCount = IndicesVO$Wonderjs.getCount;

function _computeFaceOptCount(indicesOpt) {
  if (indicesOpt !== undefined) {
    return IndicesVO$Wonderjs.getCount(indicesOpt);
  } else {
    return 0;
  }
}

function _buildAndSetPointIndexBufferData(device, allRenderGeometries) {
  var geometryCount = ListSt$Wonderjs.length(allRenderGeometries);
  var bufferData = new Uint32Array((geometryCount << 1));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseReduceResultMi(allRenderGeometries, [
                  0,
                  0
                ], (function (param, param$1) {
                    var geometry = param$1[1];
                    var geometryIndex = param$1[0];
                    var faceIndex = param[1];
                    var vertexIndex = param[0];
                    return Result$Wonderjs.mapSuccess(ListResult$Wonderjs.mergeResults({
                                    hd: TypeArrayCPRepoUtils$Wonderjs.setUint32_1((geometryIndex << 1), vertexIndex, bufferData),
                                    tl: {
                                      hd: TypeArrayCPRepoUtils$Wonderjs.setUint32_1((geometryIndex << 1) + 1 | 0, faceIndex, bufferData),
                                      tl: /* [] */0
                                    }
                                  }), (function (param) {
                                  return [
                                          vertexIndex + VerticesVO$Wonderjs.getCount(GeometryRunAPI$Wonderjs.getVertices(geometry)) | 0,
                                          faceIndex + _computeFaceOptCount(GeometryRunAPI$Wonderjs.getIndices(geometry)) | 0
                                        ];
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

function _computeAllVertexCount(allRenderGeometries) {
  return ListSt$Wonderjs.reduce(allRenderGeometries, 0, (function (vertexCount, geometry) {
                return vertexCount + VerticesVO$Wonderjs.getCount(GeometryRunAPI$Wonderjs.getVertices(geometry)) | 0;
              }));
}

function _flipY(texCoordY) {
  return 1.0 - texCoordY;
}

function _getVertexBufferStride(param) {
  return 16;
}

function _createVertexBufferData(allRenderGeometries) {
  var bufferData = new Float32Array((_computeAllVertexCount(allRenderGeometries) << 4));
  ListSt$Wonderjs.reduce(allRenderGeometries, 0, (function (offset, geometry) {
          var vertices = VerticesVO$Wonderjs.value(GeometryRunAPI$Wonderjs.getVertices(geometry));
          var length = vertices.length;
          var i = 0;
          var j = offset;
          while(i < length) {
            bufferData[j] = vertices[i];
            bufferData[j + 1 | 0] = vertices[i + 1 | 0];
            bufferData[j + 2 | 0] = vertices[i + 2 | 0];
            i = i + 3 | 0;
            j = j + 16 | 0;
          };
          var newOffset = j;
          var texCoords = OptionSt$Wonderjs.map(GeometryRunAPI$Wonderjs.getTexCoords(geometry), TexCoordsVO$Wonderjs.value);
          if (texCoords !== undefined) {
            var texCoords$1 = Caml_option.valFromOption(texCoords);
            var length$1 = texCoords$1.length;
            var getTexCoordYFunc = GeometryRunAPI$Wonderjs.isFlipTexCoordY(geometry) ? (function (i) {
                  return 1.0 - texCoords$1[i.contents + 1 | 0];
                }) : (function (i) {
                  return texCoords$1[i.contents + 1 | 0];
                });
            var i$1 = {
              contents: 0
            };
            var j$1 = offset;
            while(i$1.contents < length$1) {
              bufferData[j$1 + 4 | 0] = texCoords$1[i$1.contents];
              bufferData[j$1 + 5 | 0] = Curry._1(getTexCoordYFunc, i$1);
              i$1.contents = i$1.contents + 2 | 0;
              j$1 = j$1 + 16 | 0;
            };
          }
          var normals = OptionSt$Wonderjs.map(GeometryRunAPI$Wonderjs.getNormals(geometry), NormalsVO$Wonderjs.value);
          if (normals !== undefined) {
            var normals$1 = Caml_option.valFromOption(normals);
            var length$2 = normals$1.length;
            var i$2 = 0;
            var j$2 = offset;
            while(i$2 < length$2) {
              bufferData[j$2 + 8 | 0] = normals$1[i$2];
              bufferData[j$2 + 9 | 0] = normals$1[i$2 + 1 | 0];
              bufferData[j$2 + 10 | 0] = normals$1[i$2 + 2 | 0];
              i$2 = i$2 + 3 | 0;
              j$2 = j$2 + 16 | 0;
            };
          }
          var tangents = OptionSt$Wonderjs.map(GeometryRunAPI$Wonderjs.getTangents(geometry), TangentsVO$Wonderjs.value);
          if (tangents !== undefined) {
            var tangents$1 = Caml_option.valFromOption(tangents);
            var length$3 = tangents$1.length;
            var i$3 = 0;
            var j$3 = offset;
            while(i$3 < length$3) {
              bufferData[j$3 + 12 | 0] = tangents$1[i$3];
              bufferData[j$3 + 13 | 0] = tangents$1[i$3 + 1 | 0];
              bufferData[j$3 + 14 | 0] = tangents$1[i$3 + 2 | 0];
              i$3 = i$3 + 3 | 0;
              j$3 = j$3 + 16 | 0;
            };
          }
          return newOffset;
        }));
  return bufferData;
}

function _buildAndSetVertexBufferData(device, allRenderGeometries) {
  var bufferData = _createVertexBufferData(allRenderGeometries);
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
  Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubFloat32Data, 0, bufferData, StorageBufferVO$Wonderjs.value(buffer));
  return PathTracingPassCPRepo$Wonderjs.setVertexBufferData([
              buffer,
              bufferSize,
              bufferData
            ]);
}

function _computeAllFaceCount(allRenderGeometries) {
  return ListSt$Wonderjs.reduce(allRenderGeometries, 0, (function (faceCount, geometry) {
                return faceCount + _computeFaceOptCount(GeometryRunAPI$Wonderjs.getIndices(geometry)) | 0;
              }));
}

function _createIndexBufferData(allRenderGeometries) {
  var bufferData = new Uint32Array((_computeAllFaceCount(allRenderGeometries) << 0));
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseReduceResultM(allRenderGeometries, 0, (function (offset, geometry) {
                    var indices = GeometryRunAPI$Wonderjs.getIndices(geometry);
                    if (indices !== undefined) {
                      return Result$Wonderjs.mapSuccess(TypeArrayCPRepoUtils$Wonderjs.fillUint32ArrayWithOffset(bufferData, IndicesVO$Wonderjs.value(indices), offset), (function (param) {
                                    return offset + IndicesVO$Wonderjs.getCount(indices) | 0;
                                  }));
                    } else {
                      return Result$Wonderjs.succeed(offset);
                    }
                  })), (function (param) {
                return bufferData;
              }));
}

function _buildAndSetIndexBufferData(device, allRenderGeometries) {
  return Result$Wonderjs.mapSuccess(_createIndexBufferData(allRenderGeometries), (function (bufferData) {
                var bufferSize = bufferData.byteLength;
                var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
                Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubUint32Data, 0, bufferData, StorageBufferVO$Wonderjs.value(buffer));
                return PathTracingPassCPRepo$Wonderjs.setIndexBufferData([
                            buffer,
                            bufferSize
                          ]);
              }));
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
      var match$1 = TextureArrayWebGPUCPDoService$Wonderjs.getTextureArrayLayerSize(undefined);
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
              }), Curry._1(DpContainer$Wonderjs.unsafeGetConfigDp(undefined).getIsDebug, undefined));
}

function _getMapImageWrapData(mapImageWrapDataOpt) {
  if (mapImageWrapDataOpt !== undefined) {
    return [
            mapImageWrapDataOpt[0],
            mapImageWrapDataOpt[1]
          ];
  } else {
    return [
            1,
            1
          ];
  }
}

function _convertBoolToFloat(boolValue) {
  if (boolValue) {
    return 1.0;
  } else {
    return 0.0;
  }
}

function _buildAndSetBSDFMaterialBufferData(device, allRenderBSDFMaterials) {
  var bsdfMaterialCount = ListSt$Wonderjs.length(allRenderBSDFMaterials);
  var bufferData = new Float32Array(Math.imul(bsdfMaterialCount, 48));
  var bufferSize = bufferData.byteLength;
  var buffer = StorageBufferVO$Wonderjs.createFromDevice(device, bufferSize, WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.storage, undefined);
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseReduceResultM(allRenderBSDFMaterials, 0, (function (offset, bsdfMaterial) {
                    var diffuse = DiffuseVO$Wonderjs.getPrimitiveValue(BSDFMaterialRunAPI$Wonderjs.getDiffuseColor(bsdfMaterial));
                    var emissionColor = EmissionColorVO$Wonderjs.getPrimitiveValue(BSDFMaterialRunAPI$Wonderjs.getEmissionColor(bsdfMaterial));
                    var alphaCutoff = AlphaCutoffVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getAlphaCutoff(bsdfMaterial));
                    var specularColor = SpecularColorVO$Wonderjs.getPrimitiveValue(BSDFMaterialRunAPI$Wonderjs.getSpecularColor(bsdfMaterial));
                    var specular = SpecularVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getSpecular(bsdfMaterial));
                    var roughness = RoughnessVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getRoughness(bsdfMaterial));
                    var metalness = MetalnessVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getMetalness(bsdfMaterial));
                    var transmission = TransmissionVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getTransmission(bsdfMaterial));
                    var ior = IORVO$Wonderjs.value(BSDFMaterialRunAPI$Wonderjs.getIOR(bsdfMaterial));
                    var isDoubleSide = BSDFMaterialRunAPI$Wonderjs.isDoubleSide(bsdfMaterial);
                    var diffuseMapImageId = BSDFMaterialRunAPI$Wonderjs.getDiffuseMapImageId(bsdfMaterial);
                    var channelRoughnessMetallicMapImageId = BSDFMaterialRunAPI$Wonderjs.getChannelRoughnessMetallicMapImageId(bsdfMaterial);
                    var emissionMapImageId = BSDFMaterialRunAPI$Wonderjs.getEmissionMapImageId(bsdfMaterial);
                    var normalMapImageId = BSDFMaterialRunAPI$Wonderjs.getNormalMapImageId(bsdfMaterial);
                    var transmissionMapImageId = BSDFMaterialRunAPI$Wonderjs.getTransmissionMapImageId(bsdfMaterial);
                    var specularMapImageId = BSDFMaterialRunAPI$Wonderjs.getSpecularMapImageId(bsdfMaterial);
                    var diffuseMapImageWrapData = _getMapImageWrapData(OptionSt$Wonderjs.map(BSDFMaterialRunAPI$Wonderjs.getDiffuseMapImageWrapData(bsdfMaterial), (function (param) {
                                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.value, param);
                              })));
                    var channelRoughnessMetallicMapImageWrapData = _getMapImageWrapData(OptionSt$Wonderjs.map(BSDFMaterialRunAPI$Wonderjs.getChannelRoughnessMetallicMapImageWrapData(bsdfMaterial), (function (param) {
                                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.value, param);
                              })));
                    var emissionMapImageWrapData = _getMapImageWrapData(OptionSt$Wonderjs.map(BSDFMaterialRunAPI$Wonderjs.getEmissionMapImageWrapData(bsdfMaterial), (function (param) {
                                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.value, param);
                              })));
                    var normalMapImageWrapData = _getMapImageWrapData(OptionSt$Wonderjs.map(BSDFMaterialRunAPI$Wonderjs.getNormalMapImageWrapData(bsdfMaterial), (function (param) {
                                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.value, param);
                              })));
                    var transmissionMapImageWrapData = _getMapImageWrapData(OptionSt$Wonderjs.map(BSDFMaterialRunAPI$Wonderjs.getTransmissionMapImageWrapData(bsdfMaterial), (function (param) {
                                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.value, param);
                              })));
                    var specularMapImageWrapData = _getMapImageWrapData(OptionSt$Wonderjs.map(BSDFMaterialRunAPI$Wonderjs.getSpecularMapImageWrapData(bsdfMaterial), (function (param) {
                                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.value, param);
                              })));
                    return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(Tuple6$Wonderjs.collectResult(_computeMapScale(diffuseMapImageId), _computeMapScale(channelRoughnessMetallicMapImageId), _computeMapScale(emissionMapImageId), _computeMapScale(normalMapImageId), _computeMapScale(transmissionMapImageId), _computeMapScale(specularMapImageId)), (function (param) {
                                      return ListResult$Wonderjs.mergeResults({
                                                  hd: TypeArrayCPRepoUtils$Wonderjs.setFloat4(offset + 0 | 0, diffuse, bufferData),
                                                  tl: {
                                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat3(offset + 4 | 0, emissionColor, bufferData),
                                                    tl: {
                                                      hd: TypeArrayCPRepoUtils$Wonderjs.setFloat3(offset + 8 | 0, specularColor, bufferData),
                                                      tl: {
                                                        hd: TypeArrayCPRepoUtils$Wonderjs.setFloat1(offset + 11 | 0, alphaCutoff, bufferData),
                                                        tl: {
                                                          hd: TypeArrayCPRepoUtils$Wonderjs.setFloat4(offset + 12 | 0, [
                                                                metalness,
                                                                roughness,
                                                                specular,
                                                                transmission
                                                              ], bufferData),
                                                          tl: {
                                                            hd: TypeArrayCPRepoUtils$Wonderjs.setFloat4(offset + 16 | 0, [
                                                                  ior,
                                                                  isDoubleSide ? 1.0 : 0.0,
                                                                  _getMapLayerIndex(diffuseMapImageId),
                                                                  _getMapLayerIndex(channelRoughnessMetallicMapImageId)
                                                                ], bufferData),
                                                            tl: {
                                                              hd: TypeArrayCPRepoUtils$Wonderjs.setFloat4(offset + 20 | 0, [
                                                                    _getMapLayerIndex(emissionMapImageId),
                                                                    _getMapLayerIndex(normalMapImageId),
                                                                    _getMapLayerIndex(transmissionMapImageId),
                                                                    _getMapLayerIndex(specularMapImageId)
                                                                  ], bufferData),
                                                              tl: {
                                                                hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 24 | 0, param[0], bufferData),
                                                                tl: {
                                                                  hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 26 | 0, param[1], bufferData),
                                                                  tl: {
                                                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 28 | 0, param[2], bufferData),
                                                                    tl: {
                                                                      hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 30 | 0, param[3], bufferData),
                                                                      tl: {
                                                                        hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 32 | 0, param[4], bufferData),
                                                                        tl: {
                                                                          hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 34 | 0, param[5], bufferData),
                                                                          tl: {
                                                                            hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 36 | 0, diffuseMapImageWrapData, bufferData),
                                                                            tl: {
                                                                              hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 38 | 0, channelRoughnessMetallicMapImageWrapData, bufferData),
                                                                              tl: {
                                                                                hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 40 | 0, emissionMapImageWrapData, bufferData),
                                                                                tl: {
                                                                                  hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 42 | 0, normalMapImageWrapData, bufferData),
                                                                                  tl: {
                                                                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 44 | 0, transmissionMapImageWrapData, bufferData),
                                                                                    tl: {
                                                                                      hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(offset + 46 | 0, specularMapImageWrapData, bufferData),
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
                                  return offset + 48 | 0;
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

function _buildAndSetAllBufferData(device, sceneGameObject) {
  var allRenderGeometries = GameObjectRunAPI$Wonderjs.getAllRenderGeometries(sceneGameObject);
  var allRenderBSDFMaterials = GameObjectRunAPI$Wonderjs.getAllRenderBSDFMaterials(sceneGameObject);
  return ListResult$Wonderjs.mergeResults({
              hd: _buildAndSetSceneDescBufferData(device, GameObjectRunAPI$Wonderjs.getAllRenderGameObjects(sceneGameObject), allRenderGeometries, allRenderBSDFMaterials),
              tl: {
                hd: _buildAndSetPointIndexBufferData(device, allRenderGeometries),
                tl: {
                  hd: Result$Wonderjs.succeed(_buildAndSetVertexBufferData(device, allRenderGeometries)),
                  tl: {
                    hd: _buildAndSetIndexBufferData(device, allRenderGeometries),
                    tl: {
                      hd: _buildAndSetBSDFMaterialBufferData(device, allRenderBSDFMaterials),
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
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_generation | WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit | WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_any_hit,
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
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit | WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_any_hit,
            type: "storage-buffer"
          },
          {
            binding: 4,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit | WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_any_hit,
            type: "storage-buffer"
          },
          {
            binding: 5,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit | WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_any_hit,
            type: "storage-buffer"
          },
          {
            binding: 6,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit | WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_any_hit,
            type: "storage-buffer"
          },
          {
            binding: 7,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit | WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_any_hit,
            type: "storage-buffer"
          },
          {
            binding: 8,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit | WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_any_hit,
            type: "sampler"
          },
          {
            binding: 9,
            visibility: WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_closest_hit | WebGPURayTracingDpRunAPI$Wonderjs.unsafeGet(undefined).shaderStage.ray_any_hit,
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
                                  return Result$Wonderjs.bind(_buildAndSetAllBufferData(device, SceneRunAPI$Wonderjs.getSceneGameObject(undefined)), (function (param) {
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
exports._findIndex = _findIndex;
exports._buildAndSetSceneDescBufferData = _buildAndSetSceneDescBufferData;
exports._computeVertexCount = _computeVertexCount;
exports._computeFaceCount = _computeFaceCount;
exports._computeFaceOptCount = _computeFaceOptCount;
exports._buildAndSetPointIndexBufferData = _buildAndSetPointIndexBufferData;
exports._computeAllVertexCount = _computeAllVertexCount;
exports._flipY = _flipY;
exports._getVertexBufferStride = _getVertexBufferStride;
exports._createVertexBufferData = _createVertexBufferData;
exports._buildAndSetVertexBufferData = _buildAndSetVertexBufferData;
exports._computeAllFaceCount = _computeAllFaceCount;
exports._createIndexBufferData = _createIndexBufferData;
exports._buildAndSetIndexBufferData = _buildAndSetIndexBufferData;
exports._getMapLayerIndexForNotExist = _getMapLayerIndexForNotExist;
exports._getMapLayerIndex = _getMapLayerIndex;
exports._computeMapScale = _computeMapScale;
exports._getMapImageWrapData = _getMapImageWrapData;
exports._convertBoolToFloat = _convertBoolToFloat;
exports._buildAndSetBSDFMaterialBufferData = _buildAndSetBSDFMaterialBufferData;
exports._buildAndSetAllBufferData = _buildAndSetAllBufferData;
exports._createAndAddRayTracingBindGroup = _createAndAddRayTracingBindGroup;
exports._createAndSetPipeline = _createAndSetPipeline;
exports.exec = exec;
/* most Not a pure module */
