

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as OperateCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/OperateCubemapTextureMainService.js";
import * as BatchSetCubemapTextureAllDataSystem$Wonderjs from "./BatchSetCubemapTextureAllDataSystem.js";

function _setSource(cubemapTexture, cubemapTextureImages, imageCubemapTextureIndex, setSourceFunc, state) {
  var match = ArrayService$Wonderjs.getNth(imageCubemapTextureIndex, cubemapTextureImages);
  if (match !== undefined) {
    return Curry._3(setSourceFunc, cubemapTexture, Caml_option.valFromOption(match), state);
  } else {
    return state;
  }
}

function _batchSetCubemapTextureSources(imageCubemapTextures, param, state) {
  var cubemapTextureNZImages = param[5];
  var cubemapTexturePZImages = param[4];
  var cubemapTextureNYImages = param[3];
  var cubemapTexturePYImages = param[2];
  var cubemapTextureNXImages = param[1];
  var cubemapTexturePXImages = param[0];
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, cubemapTexture, index) {
                return _setSource(cubemapTexture, cubemapTextureNZImages, index, OperateCubemapTextureMainService$Wonderjs.setNZSource, _setSource(cubemapTexture, cubemapTexturePZImages, index, OperateCubemapTextureMainService$Wonderjs.setPZSource, _setSource(cubemapTexture, cubemapTextureNYImages, index, OperateCubemapTextureMainService$Wonderjs.setNYSource, _setSource(cubemapTexture, cubemapTexturePYImages, index, OperateCubemapTextureMainService$Wonderjs.setPYSource, _setSource(cubemapTexture, cubemapTextureNXImages, index, OperateCubemapTextureMainService$Wonderjs.setNXSource, _setSource(cubemapTexture, cubemapTexturePXImages, index, OperateCubemapTextureMainService$Wonderjs.setPXSource, state))))));
              }), state, imageCubemapTextures);
}

function convertKeyFromImageIndexToCubemapTexture(param, cubemapTextureArr, imageUint8ArrayDataMap) {
  var nzImageIndices = param[/* nzImageIndices */6];
  var pzImageIndices = param[/* pzImageIndices */5];
  var nyImageIndices = param[/* nyImageIndices */4];
  var pyImageIndices = param[/* pyImageIndices */3];
  var nxImageIndices = param[/* nxImageIndices */2];
  var pxImageIndices = param[/* pxImageIndices */1];
  var match = MutableSparseMapService$WonderCommonlib.length(imageUint8ArrayDataMap) === 0;
  if (match) {
    return MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0);
  } else {
    return ArrayService$WonderCommonlib.reduceOneParami((function (resultImageUint8ArrayDataMap, cubemapTextureIndex, index) {
                  return MutableSparseMapService$WonderCommonlib.set(cubemapTextureArr[cubemapTextureIndex], /* record */[
                              /* pxImageUint8ArrayData */MutableSparseMapService$WonderCommonlib.unsafeGet(pxImageIndices[index], imageUint8ArrayDataMap),
                              /* nxImageUint8ArrayData */MutableSparseMapService$WonderCommonlib.unsafeGet(nxImageIndices[index], imageUint8ArrayDataMap),
                              /* pyImageUint8ArrayData */MutableSparseMapService$WonderCommonlib.unsafeGet(pyImageIndices[index], imageUint8ArrayDataMap),
                              /* nyImageUint8ArrayData */MutableSparseMapService$WonderCommonlib.unsafeGet(nyImageIndices[index], imageUint8ArrayDataMap),
                              /* pzImageUint8ArrayData */MutableSparseMapService$WonderCommonlib.unsafeGet(pzImageIndices[index], imageUint8ArrayDataMap),
                              /* nzImageUint8ArrayData */MutableSparseMapService$WonderCommonlib.unsafeGet(nzImageIndices[index], imageUint8ArrayDataMap)
                            ], resultImageUint8ArrayDataMap);
                }), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), param[/* cubemapTextureIndices */0]);
  }
}

function batchSet(param, state) {
  var match = param[1];
  var match$1 = param[0];
  return _batchSetCubemapTextureSources(match[0], /* tuple */[
              match[1],
              match[2],
              match[3],
              match[4],
              match[5],
              match[6]
            ], BatchSetCubemapTextureAllDataSystem$Wonderjs.batchSetCubemapTextureData(match$1[0], match$1[1], state));
}

export {
  _setSource ,
  _batchSetCubemapTextureSources ,
  convertKeyFromImageIndexToCubemapTexture ,
  batchSet ,
  
}
/* ArrayService-Wonderjs Not a pure module */
