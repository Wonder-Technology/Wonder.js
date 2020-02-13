'use strict';

var ImageUtils$Wonderjs = require("../../../../../src/asset/utils/ImageUtils.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../src/api/MeshRendererAPI.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../tool/service/texture/BasicSourceTextureTool.js");

function _createTexture1(state) {
  var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
  var texture = match[1];
  var name = "texture_1";
  var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureName(texture, name, match[0]);
  var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(texture, /* Linear */1, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapS(texture, /* Repeat */2, state$1));
  var source = BasicSourceTextureTool$Wonderjs.buildSource(30, 50);
  var state$3 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(texture, source, state$2);
  return /* tuple */[
          state$3,
          /* tuple */[
            texture,
            name
          ],
          /* tuple */[
            source,
            30,
            50
          ]
        ];
}

function createGameObjectWithMap(imageName, state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = _createTexture1(match[0]);
  var texture = match$1[1][0];
  ImageUtils$Wonderjs.setImageName(match$1[2][0], imageName);
  var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, texture, match$1[0]);
  var match$2 = BoxGeometryTool$Wonderjs.createBoxGeometry(state$1);
  var match$3 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$2[0]);
  var match$4 = GameObjectAPI$Wonderjs.createGameObject(match$3[0]);
  var gameObject = match$4[1];
  var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, match$3[1], GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, match$2[1], GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$4[0])));
  var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$2);
  return /* tuple */[
          state$2,
          gameObject,
          transform,
          /* tuple */[
            material,
            texture
          ]
        ];
}

exports._createTexture1 = _createTexture1;
exports.createGameObjectWithMap = createGameObjectWithMap;
/* GameObjectAPI-Wonderjs Not a pure module */
