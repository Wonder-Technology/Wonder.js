

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GeometryAPI$Wonderjs from "../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../service/setting/SettingTool.js";
import * as GeometryTool$Wonderjs from "../service/geometry/GeometryTool.js";
import * as GameObjectTool$Wonderjs from "../service/gameObject/GameObjectTool.js";
import * as BufferSettingService$Wonderjs from "../../../src/service/record/main/setting/BufferSettingService.js";
import * as RecordGeometryMainService$Wonderjs from "../../../src/service/state/main/geometry/RecordGeometryMainService.js";
import * as ReallocateGeometryCPUMemoryService$Wonderjs from "../../../src/service/state/main/memory/ReallocateGeometryCPUMemoryService.js";

function prepareForOptimize(state) {
  var state$1 = SettingTool$Wonderjs.setMemory(state[0], 1, /* () */0);
  var match = GeometryTool$Wonderjs.createThreeGameObjectsAndSetFullPointData(state$1);
  var match$1 = match[6];
  var match$2 = match$1[1];
  var match$3 = match$1[0];
  var match$4 = match[5];
  var match$5 = match[4];
  var match$6 = match[3];
  var match$7 = match[2];
  var geometry2 = match$7[1];
  var geometry1 = match$7[0];
  var match$8 = match[1];
  var gameObject2 = match$8[1];
  var gameObject1 = match$8[0];
  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(gameObject1, geometry1, match[0]);
  var state$3 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(gameObject2, geometry2, state$2);
  return /* tuple */[
          state$3,
          /* tuple */[
            gameObject1,
            gameObject2,
            match$8[2]
          ],
          /* tuple */[
            geometry1,
            geometry2,
            match$7[2]
          ],
          /* tuple */[
            match$6[0],
            match$6[1],
            match$6[2]
          ],
          /* tuple */[
            match$5[0],
            match$5[1],
            match$5[2]
          ],
          /* tuple */[
            match$4[0],
            match$4[1],
            match$4[2]
          ],
          /* tuple */[
            /* tuple */[
              match$3[0],
              match$3[1],
              match$3[2]
            ],
            /* tuple */[
              match$2[0],
              match$2[1],
              match$2[2]
            ]
          ]
        ];
}

function judgeForOptimize(state, param, param$1, param$2, param$3, param$4, param$5) {
  var geometry3 = param$1[2];
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                  GeometryAPI$Wonderjs.getGeometryVertices(geometry3, state),
                  GeometryAPI$Wonderjs.getGeometryTexCoords(geometry3, state),
                  GeometryAPI$Wonderjs.getGeometryNormals(geometry3, state),
                  GeometryAPI$Wonderjs.getGeometryIndices16(geometry3, state),
                  GeometryAPI$Wonderjs.getGeometryIndices32(geometry3, state)
                ]), /* tuple */[
              param$2[2],
              param$3[2],
              param$4[2],
              param$5[0][2],
              param$5[1][2]
            ]);
}

function reAllocate(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */23] = ReallocateGeometryCPUMemoryService$Wonderjs.reAllocateToTheSameBuffer(GeometryTool$Wonderjs.getRecord(state));
  return newrecord;
}

function reAllocateGeometryToNewBuffer(state) {
  var settingRecord = state[/* settingRecord */0];
  var geometryPointCount = BufferSettingService$Wonderjs.getGeometryPointCount(settingRecord);
  var geometryCount = BufferSettingService$Wonderjs.getGeometryCount(settingRecord);
  var match = RecordGeometryMainService$Wonderjs._initBufferData(geometryPointCount, geometryCount);
  var geometryRecord = GeometryTool$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */23] = ReallocateGeometryCPUMemoryService$Wonderjs.reAllocateToBuffer(/* tuple */[
        match[0],
        match[1],
        match[2],
        match[3],
        match[4],
        match[5],
        match[6],
        match[7],
        match[8],
        match[9]
      ], geometryRecord);
  return newrecord;
}

export {
  prepareForOptimize ,
  judgeForOptimize ,
  reAllocate ,
  reAllocateGeometryToNewBuffer ,
  
}
/* Wonder_jest Not a pure module */
