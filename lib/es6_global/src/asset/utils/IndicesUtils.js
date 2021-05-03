

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _getTextureIndexArr(imageIndex, imageIndices, indexArr) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (indexArr, imageSource, index) {
                var match = imageSource === imageIndex;
                if (match) {
                  return ArrayService$Wonderjs.push(index, indexArr);
                } else {
                  return indexArr;
                }
              }), indexArr, imageIndices);
}

function getBasicSourceTextures(imageIndex, basicSourceTextureArr, param) {
  var textureIndices = param[/* textureIndices */0];
  return _getTextureIndexArr(imageIndex, param[/* imageIndices */1], /* array */[]).map((function (index) {
                return basicSourceTextureArr[textureIndices[index]];
              }));
}

function _getOneFaceCubemapTextures(imageIndex, cubemapTextureArr, cubemapTextureIndices, imageIndices) {
  return _getTextureIndexArr(imageIndex, imageIndices, /* array */[]).map((function (index) {
                return cubemapTextureArr[cubemapTextureIndices[index]];
              }));
}

function getPXCubemapTextures(imageIndex, cubemapTextureArr, param) {
  return _getOneFaceCubemapTextures(imageIndex, cubemapTextureArr, param[/* cubemapTextureIndices */0], param[/* pxImageIndices */1]);
}

function getNXCubemapTextures(imageIndex, cubemapTextureArr, param) {
  return _getOneFaceCubemapTextures(imageIndex, cubemapTextureArr, param[/* cubemapTextureIndices */0], param[/* nxImageIndices */2]);
}

function getPYCubemapTextures(imageIndex, cubemapTextureArr, param) {
  return _getOneFaceCubemapTextures(imageIndex, cubemapTextureArr, param[/* cubemapTextureIndices */0], param[/* pyImageIndices */3]);
}

function getNYCubemapTextures(imageIndex, cubemapTextureArr, param) {
  return _getOneFaceCubemapTextures(imageIndex, cubemapTextureArr, param[/* cubemapTextureIndices */0], param[/* nyImageIndices */4]);
}

function getPZCubemapTextures(imageIndex, cubemapTextureArr, param) {
  return _getOneFaceCubemapTextures(imageIndex, cubemapTextureArr, param[/* cubemapTextureIndices */0], param[/* pzImageIndices */5]);
}

function getNZCubemapTextures(imageIndex, cubemapTextureArr, param) {
  return _getOneFaceCubemapTextures(imageIndex, cubemapTextureArr, param[/* cubemapTextureIndices */0], param[/* nzImageIndices */6]);
}

export {
  _getTextureIndexArr ,
  getBasicSourceTextures ,
  _getOneFaceCubemapTextures ,
  getPXCubemapTextures ,
  getNXCubemapTextures ,
  getPYCubemapTextures ,
  getNYCubemapTextures ,
  getPZCubemapTextures ,
  getNZCubemapTextures ,
  
}
/* ArrayService-Wonderjs Not a pure module */
