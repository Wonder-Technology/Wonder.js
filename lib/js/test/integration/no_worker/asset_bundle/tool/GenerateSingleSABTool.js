'use strict';

var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var SceneAPI$Wonderjs = require("../../../../../src/api/SceneAPI.js");
var OptionTool$Wonderjs = require("../../../../tool/service/atom/OptionTool.js");
var BufferUtils$Wonderjs = require("../../../../../src/asset/utils/BufferUtils.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var OptionService$Wonderjs = require("../../../../../src/service/atom/OptionService.js");
var PrepareABTool$Wonderjs = require("./PrepareABTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../src/api/MeshRendererAPI.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var AssembleWholeWDBSystem$Wonderjs = require("../../../../../src/asset/assemble/AssembleWholeWDBSystem.js");
var GenerateSingleSABSystem$Wonderjs = require("../../../../../src/asset_bundle/single/sab/generate/GenerateSingleSABSystem.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

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

exports.prepare = prepare;
exports.SceneAssetBundleContent = SceneAssetBundleContent;
exports._createGameObject = _createGameObject;
exports.generateOneSAB = generateOneSAB;
/* SceneAPI-Wonderjs Not a pure module */
