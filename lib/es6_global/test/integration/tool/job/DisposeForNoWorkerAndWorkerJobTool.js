

import * as GeometryTool$Wonderjs from "../../../tool/service/geometry/GeometryTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as VboBufferTool$Wonderjs from "../../../tool/service/vboBuffer/VboBufferTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../tool/service/geometry/BoxGeometryTool.js";
import * as MeshRendererTool$Wonderjs from "../../../tool/service/meshRenderer/MeshRendererTool.js";

function prepareForDisposeGeometryVboBuffer(state) {
  var match = GeometryTool$Wonderjs.createGameObject(state[0]);
  var geometry1 = match[2];
  var gameObject1 = match[1];
  var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry1, match[0]);
  var state$2 = GameObjectAPI$Wonderjs.disposeGameObject(gameObject1, state$1);
  return /* tuple */[
          state$2,
          gameObject1,
          geometry1
        ];
}

function prepareForDisposeGameObjects(state) {
  var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
  var gameObject1 = match[1];
  var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match[0]);
  var gameObject2 = match$1[1];
  var match$2 = BoxGeometryTool$Wonderjs.createBoxGeometry(match$1[0]);
  var match$3 = BoxGeometryTool$Wonderjs.createBoxGeometry(match$2[0]);
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject1, match$2[1], match$3[0]);
  var state$2 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject2, match$3[1], state$1);
  return /* tuple */[
          state$2,
          gameObject1,
          gameObject2
        ];
}

function prepareGeometryGameObjects(state) {
  var match = GeometryTool$Wonderjs.createGameObject(state[0]);
  var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
  var match$2 = GeometryTool$Wonderjs.createGameObject(match$1[0]);
  return /* tuple */[
          match$2[0],
          /* tuple */[
            match[1],
            match$1[1],
            match$2[1]
          ],
          /* tuple */[
            match[2],
            match$1[2],
            match$2[2]
          ]
        ];
}

export {
  prepareForDisposeGeometryVboBuffer ,
  prepareForDisposeGameObjects ,
  prepareGeometryGameObjects ,
  
}
/* GeometryTool-Wonderjs Not a pure module */
