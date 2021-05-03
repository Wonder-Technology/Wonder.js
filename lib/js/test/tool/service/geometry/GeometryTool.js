'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../TestTool.js");
var GeometryAPI$Wonderjs = require("../../../../src/api/geometry/GeometryAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var GameObjectTool$Wonderjs = require("../gameObject/GameObjectTool.js");
var TypeArrayService$Wonderjs = require("../../../../src/service/primitive/buffer/TypeArrayService.js");
var BufferGeometryService$Wonderjs = require("../../../../src/service/record/main/geometry/BufferGeometryService.js");
var AllDeviceManagerService$Wonderjs = require("../../../../src/service/record/all/device/AllDeviceManagerService.js");
var NameGeometryMainService$Wonderjs = require("../../../../src/service/state/main/geometry/NameGeometryMainService.js");
var GameObjectGeometryService$Wonderjs = require("../../../../src/service/record/main/geometry/GameObjectGeometryService.js");
var RecordGeometryMainService$Wonderjs = require("../../../../src/service/state/main/geometry/RecordGeometryMainService.js");
var DisposeGeometryMainService$Wonderjs = require("../../../../src/service/state/main/geometry/DisposeGeometryMainService.js");
var IndicesGeometryMainService$Wonderjs = require("../../../../src/service/state/main/geometry/IndicesGeometryMainService.js");
var GetComponentGameObjectService$Wonderjs = require("../../../../src/service/record/main/gameObject/GetComponentGameObjectService.js");
var GetGeometryIndicesRenderService$Wonderjs = require("../../../../src/service/state/render/geometry/GetGeometryIndicesRenderService.js");
var ReallocatedPointsGeometryService$Wonderjs = require("../../../../src/service/primitive/geometry/ReallocatedPointsGeometryService.js");

function buildInfo(startIndex, endIndex) {
  return /* tuple */[
          startIndex,
          endIndex
        ];
}

function getInfo(index, infos) {
  return ReallocatedPointsGeometryService$Wonderjs.getInfo(BufferGeometryService$Wonderjs.getInfoIndex(index), infos);
}

var getRecord = RecordGeometryMainService$Wonderjs.getRecord;

function createGameObject(state) {
  var match = GeometryAPI$Wonderjs.createGeometry(state);
  var geometry = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          geometry
        ];
}

function createGameObjectAndSetPointData(state) {
  var match = GeometryAPI$Wonderjs.createGeometry(state);
  var geometry = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, match$1[0]);
  var vertices1 = new Float32Array(/* array */[10]);
  var texCoords1 = new Float32Array(/* array */[0.5]);
  var normals1 = new Float32Array(/* array */[1]);
  var indices1 = new Uint16Array(/* array */[2]);
  var state$2 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry, indices1, GeometryAPI$Wonderjs.setGeometryNormals(geometry, normals1, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry, texCoords1, GeometryAPI$Wonderjs.setGeometryVertices(geometry, vertices1, state$1))));
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
  var state$1 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry3, indices3, GeometryAPI$Wonderjs.setGeometryIndices16(geometry2, indices2, GeometryAPI$Wonderjs.setGeometryIndices16(geometry1, indices1, GeometryAPI$Wonderjs.setGeometryNormals(geometry3, normals3, GeometryAPI$Wonderjs.setGeometryNormals(geometry2, normals2, GeometryAPI$Wonderjs.setGeometryNormals(geometry1, normals1, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry3, texCoords3, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry2, texCoords2, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry1, texCoords1, GeometryAPI$Wonderjs.setGeometryVertices(geometry3, vertices3, GeometryAPI$Wonderjs.setGeometryVertices(geometry2, vertices2, GeometryAPI$Wonderjs.setGeometryVertices(geometry1, vertices1, match$2[0]))))))))))));
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

function createThreeGameObjectsAndSetFullPointData(state) {
  var vertices1 = new Float32Array(/* array */[
        11,
        10,
        11
      ]);
  var vertices2 = new Float32Array(/* array */[
        2,
        2,
        3
      ]);
  var vertices3 = new Float32Array(/* array */[
        4,
        3,
        2
      ]);
  var texCoords1 = new Float32Array(/* array */[
        0.5,
        1.5
      ]);
  var texCoords2 = new Float32Array(/* array */[
        1,
        2
      ]);
  var texCoords3 = new Float32Array(/* array */[
        1,
        0.5
      ]);
  var normals1 = new Float32Array(/* array */[
        1,
        3,
        3
      ]);
  var normals2 = new Float32Array(/* array */[
        2,
        4,
        4
      ]);
  var normals3 = new Float32Array(/* array */[
        5,
        4,
        2
      ]);
  var indices1 = new Uint16Array(/* array */[
        2,
        0,
        1
      ]);
  var indices2 = new Uint16Array(/* array */[
        2,
        1,
        0
      ]);
  var indices3 = new Uint16Array(/* array */[
        1,
        0,
        2
      ]);
  var indices32_1 = new Uint32Array(/* array */[
        1,
        2,
        0
      ]);
  var indices32_2 = new Uint32Array(/* array */[
        1,
        2,
        1
      ]);
  var indices32_3 = new Uint32Array(/* array */[
        1,
        0,
        2
      ]);
  var match = createGameObject(state);
  var geometry1 = match[2];
  var match$1 = createGameObject(match[0]);
  var geometry2 = match$1[2];
  var match$2 = createGameObject(match$1[0]);
  var geometry3 = match$2[2];
  var state$1 = GeometryAPI$Wonderjs.setGeometryIndices32(geometry3, indices32_3, GeometryAPI$Wonderjs.setGeometryIndices32(geometry2, indices32_2, GeometryAPI$Wonderjs.setGeometryIndices32(geometry1, indices32_1, GeometryAPI$Wonderjs.setGeometryIndices16(geometry3, indices3, GeometryAPI$Wonderjs.setGeometryIndices16(geometry2, indices2, GeometryAPI$Wonderjs.setGeometryIndices16(geometry1, indices1, GeometryAPI$Wonderjs.setGeometryNormals(geometry3, normals3, GeometryAPI$Wonderjs.setGeometryNormals(geometry2, normals2, GeometryAPI$Wonderjs.setGeometryNormals(geometry1, normals1, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry3, texCoords3, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry2, texCoords2, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry1, texCoords1, GeometryAPI$Wonderjs.setGeometryVertices(geometry3, vertices3, GeometryAPI$Wonderjs.setGeometryVertices(geometry2, vertices2, GeometryAPI$Wonderjs.setGeometryVertices(geometry1, vertices1, match$2[0])))))))))))))));
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
            /* tuple */[
              indices1,
              indices2,
              indices3
            ],
            /* tuple */[
              indices32_1,
              indices32_2,
              indices32_3
            ]
          ]
        ];
}

function hasGameObject(geometry, state) {
  var match = GameObjectGeometryService$Wonderjs.getGameObjects(geometry, RecordGeometryMainService$Wonderjs.getRecord(state));
  if (match !== undefined) {
    return match.length > 0;
  } else {
    return false;
  }
}

function isGeometryDisposed(geometry, state) {
  return !DisposeGeometryMainService$Wonderjs.isAliveWithRecord(geometry, RecordGeometryMainService$Wonderjs.getRecord(state));
}

function getIndicesCount(index, state) {
  return GetGeometryIndicesRenderService$Wonderjs.getIndicesCount(index, state);
}

function unsafeGetGeometryComponent(uid, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return GetComponentGameObjectService$Wonderjs.unsafeGetGeometryComponent(uid, gameObjectRecord);
}

function _getMainVertexData(geometry, count, getGeometryVertexFunc, state) {
  var points = Curry._2(getGeometryVertexFunc, geometry, state);
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
  return _getMainVertexData(geometry, 60, GeometryAPI$Wonderjs.getGeometryVertices, state);
}

function getMainNormals(geometry, state) {
  return _getMainVertexData(geometry, 60, GeometryAPI$Wonderjs.getGeometryNormals, state);
}

function getMainTexCoords(geometry, state) {
  return _getMainVertexData(geometry, 40, GeometryAPI$Wonderjs.getGeometryTexCoords, state);
}

function getMainIndices16(geometry, state) {
  var match = IndicesGeometryMainService$Wonderjs.unsafeGetIndicesType(geometry, state);
  if (match) {
    return undefined;
  } else {
    var indices = GeometryAPI$Wonderjs.getGeometryIndices16(geometry, state);
    var length = indices.length;
    var mainVertexs = new Uint16Array(60);
    var match$1 = length > 60;
    if (match$1) {
      TypeArrayService$Wonderjs.fillUint16ArrayWithOffset(mainVertexs, indices.slice(0, 30), 0);
      TypeArrayService$Wonderjs.fillUint16ArrayWithOffset(mainVertexs, indices.slice((length - 30 | 0) - 1 | 0, length - 1 | 0), 30);
      return Caml_option.some(mainVertexs);
    } else {
      return Caml_option.some(indices);
    }
  }
}

function getMainIndices32(geometry, state) {
  var match = IndicesGeometryMainService$Wonderjs.unsafeGetIndicesType(geometry, state);
  if (match) {
    var indices = GeometryAPI$Wonderjs.getGeometryIndices32(geometry, state);
    var length = indices.length;
    var mainVertexs = new Uint32Array(60);
    var match$1 = length > 60;
    if (match$1) {
      TypeArrayService$Wonderjs.fillUint32ArrayWithOffset(mainVertexs, indices.slice(0, 30), 0);
      TypeArrayService$Wonderjs.fillUint32ArrayWithOffset(mainVertexs, indices.slice((length - 30 | 0) - 1 | 0, length - 1 | 0), 30);
      return Caml_option.some(mainVertexs);
    } else {
      return Caml_option.some(indices);
    }
  }
  
}

function getIndexType(state) {
  return AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */20]).UNSIGNED_SHORT;
}

function getIndexTypeSize(state) {
  return Uint16Array.BYTES_PER_ELEMENT;
}

function isGeometry(geometry) {
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* >= */2], Wonder_jest.Expect[/* expect */0](geometry), 0);
}

function batchDisposeGeometryByCloseContractCheck(gameObjectArr, state) {
  var state$1 = GameObjectTool$Wonderjs.batchDisposeGameObject(gameObjectArr, state);
  TestTool$Wonderjs.openContractCheck(/* () */0);
  return state$1;
}

var getName = NameGeometryMainService$Wonderjs.getName;

exports.buildInfo = buildInfo;
exports.getInfo = getInfo;
exports.getRecord = getRecord;
exports.createGameObject = createGameObject;
exports.createGameObjectAndSetPointData = createGameObjectAndSetPointData;
exports.createThreeGameObjectsAndSetPointData = createThreeGameObjectsAndSetPointData;
exports.createThreeGameObjectsAndSetFullPointData = createThreeGameObjectsAndSetFullPointData;
exports.hasGameObject = hasGameObject;
exports.isGeometryDisposed = isGeometryDisposed;
exports.getIndicesCount = getIndicesCount;
exports.unsafeGetGeometryComponent = unsafeGetGeometryComponent;
exports._getMainVertexData = _getMainVertexData;
exports.getMainVertices = getMainVertices;
exports.getMainNormals = getMainNormals;
exports.getMainTexCoords = getMainTexCoords;
exports.getMainIndices16 = getMainIndices16;
exports.getMainIndices32 = getMainIndices32;
exports.getIndexType = getIndexType;
exports.getIndexTypeSize = getIndexTypeSize;
exports.isGeometry = isGeometry;
exports.batchDisposeGeometryByCloseContractCheck = batchDisposeGeometryByCloseContractCheck;
exports.getName = getName;
/* Wonder_jest Not a pure module */
