

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as IndicesUtils$Wonderjs from "../utils/IndicesUtils.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSourceTextureService$Wonderjs from "../../service/record/main/texture/BufferSourceTextureService.js";
import * as IndicesGeometryMainService$Wonderjs from "../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "../../service/state/main/geometry/NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "../../service/state/main/geometry/VerticesGeometryMainService.js";
import * as TexCoordsGeometryMainService$Wonderjs from "../../service/state/main/geometry/TexCoordsGeometryMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";
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

function _setGeometryData(geometryData, geometryArr, geometryGameObjects, gameObjectGeometrys, param, state) {
  var match = _getGameObjectsAndGeometrys(geometryData[/* meshIndex */0], geometryArr, geometryGameObjects, gameObjectGeometrys);
  return Curry._3(param[0], match[1], Curry._1(param[1], geometryData[/* arrayBuffer */1]), state);
}

var _getBasicSourceTextures = IndicesUtils$Wonderjs.getBasicSourceTextures;

function _setImageData(imageData, basicSourceTextureArr, imageTextureIndices, state) {
  var match = OptionService$Wonderjs.unsafeGet(imageData);
  var image = match[/* image */1];
  var basicSourceTextures = IndicesUtils$Wonderjs.getBasicSourceTextures(match[/* imageIndex */0], basicSourceTextureArr, imageTextureIndices);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, basicSourceTexture) {
                return OperateBasicSourceTextureMainService$Wonderjs.setSource(basicSourceTexture, image, OperateBasicSourceTextureMainService$Wonderjs.setIsNeedUpdate(basicSourceTexture, BufferSourceTextureService$Wonderjs.getNeedUpdate(/* () */0), state));
              }), state, basicSourceTextures);
}

function _getIndexUint16Data(componentType, arrayBuffer) {
  var switcher = componentType - 5121 | 0;
  if (switcher > 2 || switcher < 0) {
    return undefined;
  } else {
    switch (switcher) {
      case 0 : 
          return Js_primitive.some(new Uint16Array(new Uint8Array(arrayBuffer)));
      case 1 : 
          return undefined;
      case 2 : 
          return Js_primitive.some(new Uint16Array(arrayBuffer));
      
    }
  }
}

function _getIndexUint32Data(componentType, arrayBuffer) {
  if (componentType !== 5125) {
    return undefined;
  } else {
    return Js_primitive.some(new Uint32Array(arrayBuffer));
  }
}

function setBinBufferChunkData(loadedStreamChunkDataArrWhichHasAllData, param, param$1, state) {
  var imageTextureIndices = param$1[1];
  var basicSourceTextureArr = param$1[0];
  var gameObjectGeometrys = param[2];
  var geometryGameObjects = param[1];
  var geometryArr = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                var geometryData = param[/* geometryData */0];
                switch (param[/* type_ */2]) {
                  case 0 : 
                      return _setGeometryData(OptionService$Wonderjs.unsafeGet(geometryData), geometryArr, geometryGameObjects, gameObjectGeometrys, /* tuple */[
                                  VerticesGeometryMainService$Wonderjs.setVerticesByTypeArray,
                                  (function (prim) {
                                      return new Float32Array(prim);
                                    })
                                ], state);
                  case 1 : 
                      return _setGeometryData(OptionService$Wonderjs.unsafeGet(geometryData), geometryArr, geometryGameObjects, gameObjectGeometrys, /* tuple */[
                                  NormalsGeometryMainService$Wonderjs.setNormalsByTypeArray,
                                  (function (prim) {
                                      return new Float32Array(prim);
                                    })
                                ], state);
                  case 2 : 
                      return _setGeometryData(OptionService$Wonderjs.unsafeGet(geometryData), geometryArr, geometryGameObjects, gameObjectGeometrys, /* tuple */[
                                  TexCoordsGeometryMainService$Wonderjs.setTexCoordsByTypeArray,
                                  (function (prim) {
                                      return new Float32Array(prim);
                                    })
                                ], state);
                  case 3 : 
                      var match = OptionService$Wonderjs.unsafeGet(geometryData);
                      var componentType = match[/* componentType */2];
                      var arrayBuffer = match[/* arrayBuffer */1];
                      var match$1 = _getGameObjectsAndGeometrys(match[/* meshIndex */0], geometryArr, geometryGameObjects, gameObjectGeometrys);
                      var geometry = match$1[1];
                      var gameObjects = match$1[0];
                      var match$2 = _getIndexUint16Data(componentType, arrayBuffer);
                      var state$1;
                      if (match$2 !== undefined) {
                        state$1 = IndicesGeometryMainService$Wonderjs.setIndicesByUint16Array(geometry, Js_primitive.valFromOption(match$2), state);
                      } else {
                        var match$3 = _getIndexUint32Data(componentType, arrayBuffer);
                        state$1 = match$3 !== undefined ? IndicesGeometryMainService$Wonderjs.setIndicesByUint32Array(geometry, Js_primitive.valFromOption(match$3), state) : Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("setBinBufferChunkData", "unknown componentType: " + (String(componentType) + ""), "", "", ""));
                      }
                      var geometrys = gameObjects.slice().map((function () {
                              return geometry;
                            }));
                      return BatchAddGameObjectComponentMainService$Wonderjs.batchAddGeometryComponentForCreate(gameObjects, geometrys, state$1);
                  case 4 : 
                      return _setImageData(param[/* imageData */1], basicSourceTextureArr, imageTextureIndices, state);
                  
                }
              }), state, loadedStreamChunkDataArrWhichHasAllData);
}

export {
  _getGeometry ,
  _getGameObjectsAndGeometrys ,
  _setGeometryData ,
  _getBasicSourceTextures ,
  _setImageData ,
  _getIndexUint16Data ,
  _getIndexUint32Data ,
  setBinBufferChunkData ,
  
}
/* Log-WonderLog Not a pure module */
