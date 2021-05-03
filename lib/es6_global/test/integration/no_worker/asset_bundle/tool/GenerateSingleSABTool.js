

import * as Js_option from "./../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as SceneAPI$Wonderjs from "../../../../../src/api/SceneAPI.js";
import * as OptionTool$Wonderjs from "../../../../tool/service/atom/OptionTool.js";
import * as BufferUtils$Wonderjs from "../../../../../src/asset/utils/BufferUtils.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../../../../../src/service/atom/OptionService.js";
import * as PrepareABTool$Wonderjs from "./PrepareABTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as AssembleWholeWDBSystem$Wonderjs from "../../../../../src/asset/assemble/AssembleWholeWDBSystem.js";
import * as GenerateSingleSABSystem$Wonderjs from "../../../../../src/asset_bundle/single/sab/generate/GenerateSingleSABSystem.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var prepare = PrepareABTool$Wonderjs.prepare;

function getSceneAssetBundleContent(sab) {
  var match = BufferUtils$Wonderjs.decodeWDB(sab, AssembleWholeWDBSystem$Wonderjs.checkWDB);
  return JSON.parse(match[0]);
}

function buildImageData(name, $staropt$star, $staropt$star$1, param) {
  var mimeType = $staropt$star !== undefined ? $staropt$star : "image/png";
  var bufferView = $staropt$star$1 !== undefined ? $staropt$star$1 : 0;
  return /* record */[
          /* name */name,
          /* bufferView */bufferView,
          /* mimeType */mimeType
        ];
}

function buildGeometryData(name, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var position = $staropt$star !== undefined ? $staropt$star : 0;
  var normal = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var texCoord = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var index = $staropt$star$3 !== undefined ? $staropt$star$3 : 1;
  var match = Js_option.isNone(normal);
  var match$1 = Js_option.isNone(texCoord);
  return /* record */[
          /* name */name,
          /* position */position,
          /* normal */match ? OptionTool$Wonderjs.buildJsonSerializedValueNone(/* () */0) : OptionService$Wonderjs.unsafeGetJsonSerializedValue(normal),
          /* texCoord */match$1 ? OptionTool$Wonderjs.buildJsonSerializedValueNone(/* () */0) : OptionService$Wonderjs.unsafeGetJsonSerializedValue(texCoord),
          /* index */index
        ];
}

var SceneAssetBundleContent = /* module */[
  /* getSceneAssetBundleContent */getSceneAssetBundleContent,
  /* buildImageData */buildImageData,
  /* buildGeometryData */buildGeometryData
];

function _createGameObject(state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
  var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
  var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
  var gameObject = match$3[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, match$2[1], GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, match$1[1], GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0])));
  var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1);
  return /* tuple */[
          state$1,
          gameObject,
          transform,
          material
        ];
}

function generateOneSAB(state) {
  var match = _createGameObject(state);
  var state$1 = SceneAPI$Wonderjs.addSceneChild(match[2], match[0]);
  return GenerateSingleSABSystem$Wonderjs.generateSingleSAB(SceneAPI$Wonderjs.getSceneGameObject(state$1), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, state$1);
}

export {
  prepare ,
  SceneAssetBundleContent ,
  _createGameObject ,
  generateOneSAB ,
  
}
/* SceneAPI-Wonderjs Not a pure module */
