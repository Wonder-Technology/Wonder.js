

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as StateDataMain$Wonderjs from "../../../../src/service/state/main/data/StateDataMain.js";
import * as TypeArrayService$Wonderjs from "../../../../src/service/primitive/buffer/TypeArrayService.js";
import * as CustomGeometryAPI$Wonderjs from "../../../../src/api/geometry/CustomGeometryAPI.js";
import * as IsDebugMainService$Wonderjs from "../../../../src/service/state/main/state/IsDebugMainService.js";
import * as GroupCustomGeometryService$Wonderjs from "../../../../src/service/record/main/geometry/custom/GroupCustomGeometryService.js";
import * as BufferCustomGeometryService$Wonderjs from "../../../../src/service/record/main/geometry/custom/BufferCustomGeometryService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../src/service/record/main/gameObject/GetComponentGameObjectService.js";
import * as CurrentComponentDataMapService$Wonderjs from "../../../../src/service/record/all/gameObject/CurrentComponentDataMapService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "../../../../src/service/state/main/geometry/custom/RecordCustomGeometryMainService.js";
import * as DisposeCustomGeometryMainService$Wonderjs from "../../../../src/service/state/main/geometry/custom/DisposeCustomGeometryMainService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../../src/service/primitive/geometry/ReallocatedPointsGeometryService.js";
import * as GetCustomGeometryIndicesRenderService$Wonderjs from "../../../../src/service/state/render/geometry/custom/GetCustomGeometryIndicesRenderService.js";

function buildInfo(startIndex, endIndex) {
  return /* tuple */[
          startIndex,
          endIndex
        ];
}

function getInfo(index, infos) {
  return ReallocatedPointsGeometryService$Wonderjs.getInfo(BufferCustomGeometryService$Wonderjs.getInfoIndex(index), infos);
}

var getRecord = RecordCustomGeometryMainService$Wonderjs.getRecord;

function createGameObject(state) {
  var match = CustomGeometryAPI$Wonderjs.createCustomGeometry(state);
  var geometry = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectCustomGeometryComponent(gameObject, geometry, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          geometry
        ];
}

function createGameObjectAndSetPointData(state) {
  var match = CustomGeometryAPI$Wonderjs.createCustomGeometry(state);
  var geometry = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectCustomGeometryComponent(gameObject, geometry, match$1[0]);
  var vertices1 = new Float32Array(/* array */[10]);
  var texCoords1 = new Float32Array(/* array */[0.5]);
  var normals1 = new Float32Array(/* array */[1]);
  var indices1 = new Uint16Array(/* array */[2]);
  var state$2 = CustomGeometryAPI$Wonderjs.setCustomGeometryIndices(geometry, indices1, CustomGeometryAPI$Wonderjs.setCustomGeometryNormals(geometry, normals1, CustomGeometryAPI$Wonderjs.setCustomGeometryTexCoords(geometry, texCoords1, CustomGeometryAPI$Wonderjs.setCustomGeometryVertices(geometry, vertices1, state$1))));
  return /* tuple */[
          state$2,
          gameObject,
          geometry,
          /* tuple */[
            vertices1,
            texCoords1,
            normals1,
            indices1
          ]
        ];
}

function createThreeGameObjectsAndSetPointData(state) {
  var vertices1 = new Float32Array(/* array */[
        10,
        10,
        11
      ]);
  var vertices2 = new Float32Array(/* array */[
        3,
        2,
        3
      ]);
  var vertices3 = new Float32Array(/* array */[
        5,
        3,
        2
      ]);
  var texCoords1 = new Float32Array(/* array */[
        0.5,
        0.5
      ]);
  var texCoords2 = new Float32Array(/* array */[
        0,
        1
      ]);
  var texCoords3 = new Float32Array(/* array */[
        0,
        0.5
      ]);
  var normals1 = new Float32Array(/* array */[
        1,
        2,
        3
      ]);
  var normals2 = new Float32Array(/* array */[
        2,
        2,
        4
      ]);
  var normals3 = new Float32Array(/* array */[
        5,
        1,
        2
      ]);
  var indices1 = new Uint16Array(/* array */[
        2,
        1,
        0
      ]);
  var indices2 = new Uint16Array(/* array */[
        2,
        0,
        1
      ]);
  var indices3 = new Uint16Array(/* array */[
        0,
        1,
        2
      ]);
  var match = createGameObject(state);
  var geometry1 = match[2];
  var match$1 = createGameObject(match[0]);
  var geometry2 = match$1[2];
  var match$2 = createGameObject(match$1[0]);
  var geometry3 = match$2[2];
  var state$1 = CustomGeometryAPI$Wonderjs.setCustomGeometryIndices(geometry3, indices3, CustomGeometryAPI$Wonderjs.setCustomGeometryIndices(geometry2, indices2, CustomGeometryAPI$Wonderjs.setCustomGeometryIndices(geometry1, indices1, CustomGeometryAPI$Wonderjs.setCustomGeometryNormals(geometry3, normals3, CustomGeometryAPI$Wonderjs.setCustomGeometryNormals(geometry2, normals2, CustomGeometryAPI$Wonderjs.setCustomGeometryNormals(geometry1, normals1, CustomGeometryAPI$Wonderjs.setCustomGeometryTexCoords(geometry3, texCoords3, CustomGeometryAPI$Wonderjs.setCustomGeometryTexCoords(geometry2, texCoords2, CustomGeometryAPI$Wonderjs.setCustomGeometryTexCoords(geometry1, texCoords1, CustomGeometryAPI$Wonderjs.setCustomGeometryVertices(geometry3, vertices3, CustomGeometryAPI$Wonderjs.setCustomGeometryVertices(geometry2, vertices2, CustomGeometryAPI$Wonderjs.setCustomGeometryVertices(geometry1, vertices1, match$2[0]))))))))))));
  return /* tuple */[
          state$1,
          /* tuple */[
            match[1],
            match$1[1],
            match$2[1]
          ],
          /* tuple */[
            geometry1,
            geometry2,
            geometry3
          ],
          /* tuple */[
            vertices1,
            vertices2,
            vertices3
          ],
          /* tuple */[
            texCoords1,
            texCoords2,
            texCoords3
          ],
          /* tuple */[
            normals1,
            normals2,
            normals3
          ],
          /* tuple */[
            indices1,
            indices2,
            indices3
          ]
        ];
}

function getGroupCount(geometry, state) {
  return GroupCustomGeometryService$Wonderjs.getGroupCount(geometry, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
}

function isGeometryDisposed(geometry, state) {
  return !DisposeCustomGeometryMainService$Wonderjs.isAlive(geometry, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
}

function getIndicesCount(index, state) {
  return GetCustomGeometryIndicesRenderService$Wonderjs.getIndicesCount(index, state);
}

function unsafeGetGeometryComponent(uid, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return Contract$WonderLog.ensureCheck((function () {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("type_ is box", "not"), (function () {
                              var match = GetComponentGameObjectService$Wonderjs.unsafeGetGeometryComponentData(uid, gameObjectRecord);
                              return Contract$WonderLog.Operators[/* = */0](match[1], CurrentComponentDataMapService$Wonderjs.getCustomGeometryType(/* () */0));
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), GetComponentGameObjectService$Wonderjs.unsafeGetGeometryComponent(uid, gameObjectRecord));
}

function _getMainVertexData(geometry, count, getCustomGeometryVertexFunc, state) {
  var points = Curry._2(getCustomGeometryVertexFunc, geometry, state);
  var length = points.length;
  var mainVertexs = new Float32Array(count);
  var match = length > count;
  if (match) {
    TypeArrayService$Wonderjs.fillFloat32ArrayWithOffset(mainVertexs, points.slice(0, count / 2 | 0), 0);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithOffset(mainVertexs, points.slice((length - (count / 2 | 0) | 0) - 1 | 0, length - 1 | 0), count / 2 | 0);
    return mainVertexs;
  } else {
    return points;
  }
}

function getMainVertices(geometry, state) {
  return _getMainVertexData(geometry, 60, CustomGeometryAPI$Wonderjs.getCustomGeometryVertices, state);
}

function getMainNormals(geometry, state) {
  return _getMainVertexData(geometry, 60, CustomGeometryAPI$Wonderjs.getCustomGeometryNormals, state);
}

function getMainTexCoords(geometry, state) {
  return _getMainVertexData(geometry, 40, CustomGeometryAPI$Wonderjs.getCustomGeometryTexCoords, state);
}

function getMainIndices(geometry, state) {
  var indices = CustomGeometryAPI$Wonderjs.getCustomGeometryIndices(geometry, state);
  var length = indices.length;
  var mainVertexs = new Uint16Array(60);
  var match = length > 60;
  if (match) {
    TypeArrayService$Wonderjs.fillUint16ArrayWithOffset(mainVertexs, indices.slice(0, 30), 0);
    TypeArrayService$Wonderjs.fillUint16ArrayWithOffset(mainVertexs, indices.slice((length - 30 | 0) - 1 | 0, length - 1 | 0), 30);
    return mainVertexs;
  } else {
    return indices;
  }
}

export {
  buildInfo ,
  getInfo ,
  getRecord ,
  createGameObject ,
  createGameObjectAndSetPointData ,
  createThreeGameObjectsAndSetPointData ,
  getGroupCount ,
  isGeometryDisposed ,
  getIndicesCount ,
  unsafeGetGeometryComponent ,
  _getMainVertexData ,
  getMainVertices ,
  getMainNormals ,
  getMainTexCoords ,
  getMainIndices ,
  
}
/* Log-WonderLog Not a pure module */
