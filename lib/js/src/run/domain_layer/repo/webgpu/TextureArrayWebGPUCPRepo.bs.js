'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var CPRepo$Wonderjs = require("../../../infrastructure_layer/data/container/CPRepo.bs.js");
var ImmutableHashMap$Wonderjs = require("../../../../construct/domain_layer/library/structure/hash_map/ImmutableHashMap.bs.js");

function _getTextureArray(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).textureArray;
}

function _setTextureArray(textureArray) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined);
  return CPRepo$Wonderjs.setWebGPU({
              device: init.device,
              window: init.window,
              adapter: init.adapter,
              context: init.context,
              queue: init.queue,
              swapChainFormat: init.swapChainFormat,
              swapChain: init.swapChain,
              textureArray: textureArray
            });
}

function getLayerIndex(imageId) {
  return ImmutableHashMap$Wonderjs.get(CPRepo$Wonderjs.getWebGPU(undefined).textureArray.layerIndexMap, imageId);
}

function setLayerIndex(imageId, layerIndex) {
  var textureArray = CPRepo$Wonderjs.getWebGPU(undefined).textureArray;
  return _setTextureArray({
              layerIndexMap: ImmutableHashMap$Wonderjs.set(textureArray.layerIndexMap, imageId, layerIndex),
              textureArrayView: textureArray.textureArrayView,
              textureSampler: textureArray.textureSampler,
              layerSize: textureArray.layerSize
            });
}

function getTextureArrayView(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).textureArray.textureArrayView;
}

function setTextureArrayView(textureArrayView) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined).textureArray;
  return _setTextureArray({
              layerIndexMap: init.layerIndexMap,
              textureArrayView: Caml_option.some(textureArrayView),
              textureSampler: init.textureSampler,
              layerSize: init.layerSize
            });
}

function getTextureSampler(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).textureArray.textureSampler;
}

function setTextureSampler(textureSampler) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined).textureArray;
  return _setTextureArray({
              layerIndexMap: init.layerIndexMap,
              textureArrayView: init.textureArrayView,
              textureSampler: Caml_option.some(textureSampler),
              layerSize: init.layerSize
            });
}

function getTextureArrayLayerSize(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).textureArray.layerSize;
}

function setTextureArrayLayerSize(width, height) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined).textureArray;
  return _setTextureArray({
              layerIndexMap: init.layerIndexMap,
              textureArrayView: init.textureArrayView,
              textureSampler: init.textureSampler,
              layerSize: [
                width,
                height
              ]
            });
}

exports._getTextureArray = _getTextureArray;
exports._setTextureArray = _setTextureArray;
exports.getLayerIndex = getLayerIndex;
exports.setLayerIndex = setLayerIndex;
exports.getTextureArrayView = getTextureArrayView;
exports.setTextureArrayView = setTextureArrayView;
exports.getTextureSampler = getTextureSampler;
exports.setTextureSampler = setTextureSampler;
exports.getTextureArrayLayerSize = getTextureArrayLayerSize;
exports.setTextureArrayLayerSize = setTextureArrayLayerSize;
/* CPRepo-Wonderjs Not a pure module */
