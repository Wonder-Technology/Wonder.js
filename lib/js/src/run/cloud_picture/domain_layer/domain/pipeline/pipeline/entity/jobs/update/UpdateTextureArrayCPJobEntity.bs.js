'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_math = require("bs-platform/lib/js/js_math.js");
var Log$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/log/Log.bs.js");
var ListSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Number$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Number.bs.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple2.bs.js");
var Contract$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var ImageIdVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/asset/image/value_object/ImageIdVO.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var AssetRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/AssetRunAPI.bs.js");
var WebGPUCPRepo$Wonderjs = require("../../../../../../repo/webgpu/WebGPUCPRepo.bs.js");
var GameObjectRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/GameObjectRunAPI.bs.js");
var WebGPUCoreRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/WebGPUCoreRunAPI.bs.js");
var PBRMaterialRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/PBRMaterialRunAPI.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/dependency/WebGPUCoreDpRunAPI.bs.js");
var OtherConfigDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/dependency/OtherConfigDpRunAPI.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../../infrastructure_layer/dependency/repo/scene/component/utils/TypeArrayCPRepoUtils.bs.js");
var TextureArrayWebGPUCPRepo$Wonderjs = require("../../../../../../repo/webgpu/TextureArrayWebGPUCPRepo.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("update_textureArray");
}

function _addImageIdAndData(result, imageId) {
  var imageData = AssetRunAPI$Wonderjs.getImageData(imageId);
  if (imageData !== undefined) {
    return {
            hd: [
              imageId,
              imageData
            ],
            tl: result
          };
  } else {
    return result;
  }
}

function _getAllUsedImageIdAndData(param) {
  return ListSt$Wonderjs.removeDuplicateItemsU(ListSt$Wonderjs.reduce(GameObjectRunAPI$Wonderjs.getAllRenderPBRMaterials(undefined), /* [] */0, (function (result, material) {
                    var imageId = PBRMaterialRunAPI$Wonderjs.getDiffuseMapImageId(material);
                    var result$1 = imageId !== undefined ? _addImageIdAndData(result, imageId) : result;
                    var imageId$1 = PBRMaterialRunAPI$Wonderjs.getChannelRoughnessMetallicMapImageId(material);
                    var result$2 = imageId$1 !== undefined ? _addImageIdAndData(result$1, imageId$1) : result$1;
                    var imageId$2 = PBRMaterialRunAPI$Wonderjs.getEmissionMapImageId(material);
                    var result$3 = imageId$2 !== undefined ? _addImageIdAndData(result$2, imageId$2) : result$2;
                    var imageId$3 = PBRMaterialRunAPI$Wonderjs.getNormalMapImageId(material);
                    if (imageId$3 !== undefined) {
                      return _addImageIdAndData(result$3, imageId$3);
                    } else {
                      return result$3;
                    }
                  })), (function (param) {
                return ImageIdVO$Wonderjs.value(param[0]);
              }));
}

function _getLayerCount(allUsedImageIdAndData) {
  var count = ListSt$Wonderjs.length(allUsedImageIdAndData);
  return Contract$Wonderjs.ensureCheck(count === 0 ? 1 : count, (function (r) {
                var maxLayerCount = Curry._1(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).capacity.getTextureArrayMaxLayerCount, undefined);
                return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("layer count:" + r + " < " + maxLayerCount, "not"), (function (param) {
                              return Contract$Wonderjs.Operators.$less(r, maxLayerCount);
                            }));
              }), Curry._1(OtherConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined));
}

function _setMapBetweenImageIdToLayerIndex(allUsedImageIdAndData) {
  ListSt$Wonderjs.reduce(allUsedImageIdAndData, 0, (function (layerIndex, param) {
          TextureArrayWebGPUCPRepo$Wonderjs.setLayerIndex(ImageIdVO$Wonderjs.value(param[0]), layerIndex);
          return layerIndex + 1 | 0;
        }));
  
}

function _buildWebGPUObjects(device, param) {
  var layerCount = param[2];
  var format = "rgba8unorm-srgb";
  var textureArray = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).device.createTexture, {
        size: {
          width: param[0],
          height: param[1],
          depth: 1
        },
        arrayLayerCount: layerCount,
        mipLevelCount: 1,
        sampleCount: 1,
        dimension: "2d",
        format: format,
        usage: WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).textureUsage.copy_dst | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).textureUsage.sampled
      }, device);
  var textureArrayView = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).texture.createView, {
        format: format,
        dimension: "2d-array",
        baseArrayLayer: 0,
        arrayLayerCount: layerCount
      }, textureArray);
  var textureSampler = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).device.createSampler, {
        magFilter: "linear",
        minFilter: "linear",
        addressModeU: "repeat",
        addressModeV: "repeat",
        addressModeW: "repeat"
      }, device);
  return [
          textureArray,
          textureArrayView,
          textureSampler
        ];
}

function _fillImageDataToBufferDataWithFixedSize(param, param$1, bytesPerRow) {
  var data = param$1.data;
  var height = param$1.height;
  var width = param$1.width;
  var textureArrayLayerHeight = param[1];
  if (width === param[0] && height === textureArrayLayerHeight) {
    return data;
  }
  var yy = 0;
  var xx = 0;
  var bufferData = new Uint8Array(Math.imul(bytesPerRow, textureArrayLayerHeight));
  while(yy < height) {
    xx = 0;
    while(xx < width) {
      var bufferDataIndex = (xx << 2) + Math.imul(yy, bytesPerRow) | 0;
      var dataIndex = (xx << 2) + (Math.imul(yy, width) << 2) | 0;
      TypeArrayCPRepoUtils$Wonderjs.setUint8_1WithoutCheck(bufferDataIndex + 0 | 0, TypeArrayCPRepoUtils$Wonderjs.getUint8_1(dataIndex + 0 | 0, data), bufferData);
      TypeArrayCPRepoUtils$Wonderjs.setUint8_1WithoutCheck(bufferDataIndex + 1 | 0, TypeArrayCPRepoUtils$Wonderjs.getUint8_1(dataIndex + 1 | 0, data), bufferData);
      TypeArrayCPRepoUtils$Wonderjs.setUint8_1WithoutCheck(bufferDataIndex + 2 | 0, TypeArrayCPRepoUtils$Wonderjs.getUint8_1(dataIndex + 2 | 0, data), bufferData);
      TypeArrayCPRepoUtils$Wonderjs.setUint8_1WithoutCheck(bufferDataIndex + 3 | 0, 255, bufferData);
      xx = xx + 1 | 0;
    };
    yy = yy + 1 | 0;
  };
  return bufferData;
}

function _fillTextureArray(param, textureArray, param$1, allUsedImageIdAndData) {
  var textureArrayLayerHeight = param$1[1];
  var textureArrayLayerWidth = param$1[0];
  var queue = param[1];
  var device = param[0];
  var bytesPerRow = (Js_math.ceil_int(Number$Wonderjs.dividInt((textureArrayLayerWidth << 2), 256)) << 8);
  var textureBuffer = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).device.createBuffer, {
        size: Math.imul(Math.imul(bytesPerRow, textureArrayLayerHeight), Uint8Array.BYTES_PER_ELEMENT),
        usage: WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_src | WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).bufferUsage.copy_dst
      }, device);
  return ListSt$Wonderjs.forEachi(allUsedImageIdAndData, (function (layerIndex, param) {
                var commandEncoder = Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).device.createCommandEncoder, {}, device);
                var bufferData = _fillImageDataToBufferDataWithFixedSize([
                      textureArrayLayerWidth,
                      textureArrayLayerHeight
                    ], param[1], bytesPerRow);
                Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubUint8Data, 0, bufferData, textureBuffer);
                Curry._4(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).commandEncoder.copyBufferToTexture, {
                      buffer: textureBuffer,
                      bytesPerRow: bytesPerRow,
                      arrayLayer: 0,
                      mipLevel: 0,
                      textureArrayLayerHeight: 0
                    }, {
                      texture: textureArray,
                      mipLevel: 0,
                      arrayLayer: layerIndex,
                      origin: {
                        x: 0,
                        y: 0,
                        z: 0
                      }
                    }, {
                      width: textureArrayLayerWidth,
                      height: textureArrayLayerHeight,
                      depth: 1
                    }, commandEncoder);
                return Curry._2(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).queue.submit, [Curry._1(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).commandEncoder.finish, commandEncoder)], queue);
              }));
}

function _setWebGPUObjects(textureArrayView, textureSampler) {
  TextureArrayWebGPUCPRepo$Wonderjs.setTextureArrayView(textureArrayView);
  return TextureArrayWebGPUCPRepo$Wonderjs.setTextureSampler(textureSampler);
}

function exec(param) {
  return Most.just(Result$Wonderjs.bind(Tuple2$Wonderjs.collectOption(WebGPUCPRepo$Wonderjs.getDevice(undefined), WebGPUCPRepo$Wonderjs.getQueue(undefined)), (function (param) {
                    var queue = param[1];
                    var device = param[0];
                    var allUsedImageIdAndData = _getAllUsedImageIdAndData(undefined);
                    _setMapBetweenImageIdToLayerIndex(allUsedImageIdAndData);
                    var match = WebGPUCoreRunAPI$Wonderjs.getTextureArrayLayerSize(undefined);
                    var textureArrayLayerHeight = match[1];
                    var textureArrayLayerWidth = match[0];
                    return Result$Wonderjs.mapSuccess(_getLayerCount(allUsedImageIdAndData), (function (layerCount) {
                                  var match = _buildWebGPUObjects(device, [
                                        textureArrayLayerWidth,
                                        textureArrayLayerHeight,
                                        layerCount
                                      ]);
                                  _fillTextureArray([
                                        device,
                                        queue
                                      ], match[0], [
                                        textureArrayLayerWidth,
                                        textureArrayLayerHeight
                                      ], allUsedImageIdAndData);
                                  TextureArrayWebGPUCPRepo$Wonderjs.setTextureArrayView(match[1]);
                                  return TextureArrayWebGPUCPRepo$Wonderjs.setTextureSampler(match[2]);
                                }));
                  })));
}

exports.create = create;
exports._addImageIdAndData = _addImageIdAndData;
exports._getAllUsedImageIdAndData = _getAllUsedImageIdAndData;
exports._getLayerCount = _getLayerCount;
exports._setMapBetweenImageIdToLayerIndex = _setMapBetweenImageIdToLayerIndex;
exports._buildWebGPUObjects = _buildWebGPUObjects;
exports._fillImageDataToBufferDataWithFixedSize = _fillImageDataToBufferDataWithFixedSize;
exports._fillTextureArray = _fillTextureArray;
exports._setWebGPUObjects = _setWebGPUObjects;
exports.exec = exec;
/* most Not a pure module */
