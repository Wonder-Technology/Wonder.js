

import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "./../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as IndicesUtils$Wonderjs from "../utils/IndicesUtils.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferTextureService$Wonderjs from "../../service/record/main/texture/BufferTextureService.js";
import * as IndicesGeometryMainService$Wonderjs from "../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "../../service/state/main/geometry/NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "../../service/state/main/geometry/VerticesGeometryMainService.js";
import * as TexCoordsGeometryMainService$Wonderjs from "../../service/state/main/geometry/TexCoordsGeometryMainService.js";
import * as OperateCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/OperateCubemapTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/source/basic_source/OperateBasicSourceTextureMainService.js";
import * as BatchAddGameObjectComponentMainService$Wonderjs from "../../service/state/main/gameObject/BatchAddGameObjectComponentMainService.js";

function _getGeometry(meshIndex, geometryArr) {
  return geometryArr[meshIndex];
}

function _getGameObjectsAndGeometrys(meshIndex, geometryArr, geometryGameObjects, gameObjectGeometrys) {
  var geometry = geometryArr[meshIndex];
  var gameObjects = ArrayService$WonderCommonlib.reduceOneParami((function (indexArr, gameObjectGeometry, index) {
            var match = gameObjectGeometry === geometry;
            if (match) {
              return ArrayService$Wonderjs.push(index, indexArr);
            } else {
              return indexArr;
            }
          }), /* array */[], gameObjectGeometrys).map((function (index) {
          return geometryGameObjects[index];
        }));
  return /* tuple */[
          gameObjects,
          geometry
        ];
}

function _setGeometryData(param, param$1, state) {
  var geometryData = param[0];
  var match = _getGameObjectsAndGeometrys(geometryData[/* meshIndex */0], param[1], param[2], param[3]);
  return Curry._3(param$1[0], match[1], Curry._1(param$1[1], geometryData[/* arrayBuffer */1]), state);
}

function _setBasicSourceTextureImageData(param, basicSourceTextureArr, imageBasicSourceTextureIndices, state) {
  var image = param[/* image */1];
  var basicSourceTextures = IndicesUtils$Wonderjs.getBasicSourceTextures(param[/* imageIndex */0], basicSourceTextureArr, imageBasicSourceTextureIndices);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, basicSourceTexture) {
                return OperateBasicSourceTextureMainService$Wonderjs.setSource(basicSourceTexture, image, OperateBasicSourceTextureMainService$Wonderjs.setIsNeedUpdate(basicSourceTexture, BufferTextureService$Wonderjs.getNeedUpdate(/* () */0), state));
              }), state, basicSourceTextures);
}

function _setOneFaceCubemapTextureImageData(image, oneFaceCubemapTextures, setSourceFunc, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, cubemapTexture) {
                return Curry._3(setSourceFunc, cubemapTexture, image, OperateCubemapTextureMainService$Wonderjs.setIsNeedUpdate(cubemapTexture, BufferTextureService$Wonderjs.getNeedUpdate(/* () */0), state));
              }), state, oneFaceCubemapTextures);
}

function _setCubemapTextureImageData(param, cubemapTextureArr, imageCubemapTextureIndices, state) {
  var image = param[/* image */1];
  var imageIndex = param[/* imageIndex */0];
  return _setOneFaceCubemapTextureImageData(image, IndicesUtils$Wonderjs.getNZCubemapTextures(imageIndex, cubemapTextureArr, imageCubemapTextureIndices), OperateCubemapTextureMainService$Wonderjs.setNZSource, _setOneFaceCubemapTextureImageData(image, IndicesUtils$Wonderjs.getPZCubemapTextures(imageIndex, cubemapTextureArr, imageCubemapTextureIndices), OperateCubemapTextureMainService$Wonderjs.setPZSource, _setOneFaceCubemapTextureImageData(image, IndicesUtils$Wonderjs.getNYCubemapTextures(imageIndex, cubemapTextureArr, imageCubemapTextureIndices), OperateCubemapTextureMainService$Wonderjs.setNYSource, _setOneFaceCubemapTextureImageData(image, IndicesUtils$Wonderjs.getPYCubemapTextures(imageIndex, cubemapTextureArr, imageCubemapTextureIndices), OperateCubemapTextureMainService$Wonderjs.setPYSource, _setOneFaceCubemapTextureImageData(image, IndicesUtils$Wonderjs.getNXCubemapTextures(imageIndex, cubemapTextureArr, imageCubemapTextureIndices), OperateCubemapTextureMainService$Wonderjs.setNXSource, _setOneFaceCubemapTextureImageData(image, IndicesUtils$Wonderjs.getPXCubemapTextures(imageIndex, cubemapTextureArr, imageCubemapTextureIndices), OperateCubemapTextureMainService$Wonderjs.setPXSource, state))))));
}

function _setImageData(imageData, param, state) {
  var match = param[1];
  var match$1 = param[0];
  var imageData$1 = OptionService$Wonderjs.unsafeGet(imageData);
  return _setCubemapTextureImageData(imageData$1, match[0], match[1], _setBasicSourceTextureImageData(imageData$1, match$1[0], match$1[1], state));
}

function _getIndexUint16Data(componentType, arrayBuffer) {
  switch (componentType) {
    case 5121 : 
        return Caml_option.some(new Uint16Array(new Uint8Array(arrayBuffer)));
    case 5122 : 
        return undefined;
    case 5123 : 
        return Caml_option.some(new Uint16Array(arrayBuffer));
    default:
      return undefined;
  }
}

function _getIndexUint32Data(componentType, arrayBuffer) {
  if (componentType !== 5125) {
    return undefined;
  } else {
    return Caml_option.some(new Uint32Array(arrayBuffer));
  }
}

function _setIndexData(param, state) {
  var match = OptionService$Wonderjs.unsafeGet(param[0]);
  var componentType = match[/* componentType */2];
  var arrayBuffer = match[/* arrayBuffer */1];
  var match$1 = _getGameObjectsAndGeometrys(match[/* meshIndex */0], param[1], param[2], param[3]);
  var geometry = match$1[1];
  var gameObjects = match$1[0];
  var match$2 = _getIndexUint16Data(componentType, arrayBuffer);
  var state$1;
  if (match$2 !== undefined) {
    state$1 = IndicesGeometryMainService$Wonderjs.setIndicesByUint16Array(geometry, Caml_option.valFromOption(match$2), state);
  } else {
    var match$3 = _getIndexUint32Data(componentType, arrayBuffer);
    state$1 = match$3 !== undefined ? IndicesGeometryMainService$Wonderjs.setIndicesByUint32Array(geometry, Caml_option.valFromOption(match$3), state) : Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("setBinBufferChunkData", "unknown componentType: " + (String(componentType) + ""), "", "", ""));
  }
  var geometrys = gameObjects.slice().map((function (param) {
          return geometry;
        }));
  return BatchAddGameObjectComponentMainService$Wonderjs.batchAddGeometryComponentForCreate(gameObjects, geometrys, state$1);
}

function setBinBufferChunkData(loadedStreamChunkDataArrWhichHasAllData, param, param$1, state) {
  var match = param$1[1];
  var imageCubemapTextureIndices = match[1];
  var cubemapTextureArr = match[0];
  var match$1 = param$1[0];
  var imageBasicSourceTextureIndices = match$1[1];
  var basicSourceTextureArr = match$1[0];
  var gameObjectGeometrys = param[2];
  var geometryGameObjects = param[1];
  var geometryArr = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                var geometryData = param[/* geometryData */0];
                switch (param[/* type_ */2]) {
                  case 0 : 
                      return _setGeometryData(/* tuple */[
                                  OptionService$Wonderjs.unsafeGet(geometryData),
                                  geometryArr,
                                  geometryGameObjects,
                                  gameObjectGeometrys
                                ], /* tuple */[
                                  VerticesGeometryMainService$Wonderjs.setVerticesByTypeArray,
                                  (function (prim) {
                                      return new Float32Array(prim);
                                    })
                                ], state);
                  case 1 : 
                      return _setGeometryData(/* tuple */[
                                  OptionService$Wonderjs.unsafeGet(geometryData),
                                  geometryArr,
                                  geometryGameObjects,
                                  gameObjectGeometrys
                                ], /* tuple */[
                                  NormalsGeometryMainService$Wonderjs.setNormalsByTypeArray,
                                  (function (prim) {
                                      return new Float32Array(prim);
                                    })
                                ], state);
                  case 2 : 
                      return _setGeometryData(/* tuple */[
                                  OptionService$Wonderjs.unsafeGet(geometryData),
                                  geometryArr,
                                  geometryGameObjects,
                                  gameObjectGeometrys
                                ], /* tuple */[
                                  TexCoordsGeometryMainService$Wonderjs.setTexCoordsByTypeArray,
                                  (function (prim) {
                                      return new Float32Array(prim);
                                    })
                                ], state);
                  case 3 : 
                      return _setIndexData(/* tuple */[
                                  geometryData,
                                  geometryArr,
                                  geometryGameObjects,
                                  gameObjectGeometrys
                                ], state);
                  case 4 : 
                      return _setImageData(param[/* imageData */1], /* tuple */[
                                  /* tuple */[
                                    basicSourceTextureArr,
                                    imageBasicSourceTextureIndices
                                  ],
                                  /* tuple */[
                                    cubemapTextureArr,
                                    imageCubemapTextureIndices
                                  ]
                                ], state);
                  
                }
              }), state, loadedStreamChunkDataArrWhichHasAllData);
}

export {
  _getGeometry ,
  _getGameObjectsAndGeometrys ,
  _setGeometryData ,
  _setBasicSourceTextureImageData ,
  _setOneFaceCubemapTextureImageData ,
  _setCubemapTextureImageData ,
  _setImageData ,
  _getIndexUint16Data ,
  _getIndexUint32Data ,
  _setIndexData ,
  setBinBufferChunkData ,
  
}
/* Log-WonderLog Not a pure module */
