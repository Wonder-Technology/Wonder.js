

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as BufferService$Wonderjs from "../../service/primitive/buffer/BufferService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CreateScriptMainService$Wonderjs from "../../service/state/main/script/CreateScriptMainService.js";
import * as CreateGeometryMainService$Wonderjs from "../../service/state/main/geometry/CreateGeometryMainService.js";
import * as CreateTransformMainService$Wonderjs from "../../service/state/main/transform/CreateTransformMainService.js";
import * as CreatePointLightMainService$Wonderjs from "../../service/state/main/light/point/CreatePointLightMainService.js";
import * as CreateMeshRendererMainService$Wonderjs from "../../service/state/main/meshRenderer/CreateMeshRendererMainService.js";
import * as CreateBasicMaterialMainService$Wonderjs from "../../service/state/main/material/basic/CreateBasicMaterialMainService.js";
import * as CreateLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/CreateLightMaterialMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as CreateDirectionLightMainService$Wonderjs from "../../service/state/main/light/direction/CreateDirectionLightMainService.js";
import * as CreateBasicCameraViewMainService$Wonderjs from "../../service/state/main/basic_camera_view/CreateBasicCameraViewMainService.js";
import * as CreateGameObjectGameObjectService$Wonderjs from "../../service/record/main/gameObject/CreateGameObjectGameObjectService.js";
import * as CreateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/CreateBasicSourceTextureMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/RecordBasicSourceTextureMainService.js";
import * as CreateArcballCameraControllerMainService$Wonderjs from "../../service/state/main/camera_controller/arcball/CreateArcballCameraControllerMainService.js";
import * as CreatePerspectiveCameraProjectionMainService$Wonderjs from "../../service/state/main/perspective_camera_projection/CreatePerspectiveCameraProjectionMainService.js";

function _checkNotExceedMaxCountByIndex(maxCount, indexArr) {
  BufferService$Wonderjs.checkNotExceedMaxCountByIndex(maxCount, indexArr[indexArr.length - 1 | 0]);
  return indexArr;
}

function _batchCreateGameObject(param, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var state = param[0];
                var match = CreateGameObjectGameObjectService$Wonderjs.create(state[/* gameObjectRecord */10]);
                state[/* gameObjectRecord */10] = match[0];
                return /* tuple */[
                        state,
                        ArrayService$Wonderjs.push(match[1], param[1])
                      ];
              }), /* tuple */[
              state,
              /* array */[]
            ], ArrayService$Wonderjs.range(0, param[/* gameObjects */3][/* count */0] - 1 | 0));
}

function _setDefaultChildren(indexArr, childMap) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (childMap, index) {
                return MutableSparseMapService$WonderCommonlib.set(index, ArrayService$WonderCommonlib.createEmpty(/* () */0), childMap);
              }), childMap, indexArr);
}

function _initTransformDataWhenCreate(indexArr, transformRecord) {
  var childMap = transformRecord[/* childMap */16];
  var newrecord = Caml_array.caml_array_dup(transformRecord);
  newrecord[/* childMap */16] = _setDefaultChildren(indexArr, childMap);
  return newrecord;
}

function _batchCreateComponent(components, createFunc, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = createFunc(param[0]);
                return /* tuple */[
                        match[0],
                        ArrayService$Wonderjs.push(match[1], param[1])
                      ];
              }), /* tuple */[
              state,
              /* array */[]
            ], ArrayService$Wonderjs.range(0, components.length - 1 | 0));
}

function _batchCreateTransform(param, state) {
  return _batchCreateComponent(param[/* transforms */15], CreateTransformMainService$Wonderjs.create, state);
}

function _batchCreateGeometry(param, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, geometry, index) {
                var indexArr = param[1];
                var state = param[0];
                if (geometry == null) {
                  return /* tuple */[
                          state,
                          ArrayService$Wonderjs.push(-1, indexArr)
                        ];
                } else {
                  var match = CreateGeometryMainService$Wonderjs.create(state);
                  return /* tuple */[
                          match[0],
                          ArrayService$Wonderjs.push(match[1], indexArr)
                        ];
                }
              }), /* tuple */[
              state,
              /* array */[]
            ], param[/* geometrys */16]);
}

function _batchCreateMeshRenderer(param, state) {
  return _batchCreateComponent(param[/* meshRenderers */17], CreateMeshRendererMainService$Wonderjs.create, state);
}

function _batchCreateBasicCameraView(param, state) {
  return _batchCreateComponent(param[/* basicCameraViews */12], CreateBasicCameraViewMainService$Wonderjs.create, state);
}

function _batchCreatePerspectiveCameraProjection(param, state) {
  return _batchCreateComponent(param[/* perspectiveCameraProjections */13], CreatePerspectiveCameraProjectionMainService$Wonderjs.create, state);
}

function _createArcballCameraControllerOneByOne(param, state) {
  return _batchCreateComponent(param[/* arcballCameraControllers */14], CreateArcballCameraControllerMainService$Wonderjs.create, state);
}

function _batchCreateScript(param, state) {
  return _batchCreateComponent(param[/* scripts */20], CreateScriptMainService$Wonderjs.create, state);
}

function _batchCreateBasicMaterial(param, state) {
  return _batchCreateComponent(param[/* basicMaterials */18], CreateBasicMaterialMainService$Wonderjs.create, state);
}

function _batchCreateLightMaterial(param, state) {
  return _batchCreateComponent(param[/* lightMaterials */19], CreateLightMaterialMainService$Wonderjs.create, state);
}

function _batchCreateBasicSourceTexture(param, state) {
  RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return ArrayService$Wonderjs.reduceOneParamValidi((function (param, param$1, basicSourceTextureIndex) {
                var indexArr = param[1];
                var match = CreateBasicSourceTextureMainService$Wonderjs.create(param[0]);
                indexArr[basicSourceTextureIndex] = match[1];
                return /* tuple */[
                        match[0],
                        indexArr
                      ];
              }), /* tuple */[
              state,
              /* array */[]
            ], param[/* basicSourceTextures */5]);
}

function _batchCreateLightComponent(components, createFunc, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = Curry._1(createFunc, param[0]);
                return /* tuple */[
                        match[0],
                        ArrayService$Wonderjs.push(match[1], param[1])
                      ];
              }), /* tuple */[
              state,
              /* array */[]
            ], ArrayService$Wonderjs.range(0, components.length - 1 | 0));
}

function _batchCreateDirectionLight(isRenderLight, param, state) {
  return _batchCreateLightComponent(param[/* directionLights */10], (function (param) {
                return CreateDirectionLightMainService$Wonderjs.create(isRenderLight, param);
              }), state);
}

function _batchCreatePointLight(isRenderLight, param, state) {
  return _batchCreateLightComponent(param[/* pointLights */11], (function (param) {
                return CreatePointLightMainService$Wonderjs.create(isRenderLight, param);
              }), state);
}

function batchCreate(isRenderLight, wd, state) {
  var match = _batchCreateGameObject(wd, state);
  var match$1 = _batchCreateTransform(wd, match[0]);
  var match$2 = _batchCreateGeometry(wd, match$1[0]);
  var match$3 = _batchCreateMeshRenderer(wd, match$2[0]);
  var match$4 = _batchCreateBasicCameraView(wd, match$3[0]);
  var match$5 = _batchCreatePerspectiveCameraProjection(wd, match$4[0]);
  var match$6 = _createArcballCameraControllerOneByOne(wd, match$5[0]);
  var match$7 = _batchCreateBasicMaterial(wd, match$6[0]);
  var match$8 = _batchCreateLightMaterial(wd, match$7[0]);
  var match$9 = _batchCreateBasicSourceTexture(wd, match$8[0]);
  var match$10 = _batchCreateDirectionLight(isRenderLight, wd, match$9[0]);
  var match$11 = _batchCreatePointLight(isRenderLight, wd, match$10[0]);
  var match$12 = _batchCreateScript(wd, match$11[0]);
  return /* tuple */[
          match$12[0],
          match[1],
          /* tuple */[
            match$1[1],
            match$2[1],
            match$3[1],
            match$4[1],
            match$5[1],
            match$6[1],
            match$7[1],
            match$8[1],
            match$10[1],
            match$11[1],
            match$12[1]
          ],
          match$9[1]
        ];
}

export {
  _checkNotExceedMaxCountByIndex ,
  _batchCreateGameObject ,
  _setDefaultChildren ,
  _initTransformDataWhenCreate ,
  _batchCreateComponent ,
  _batchCreateTransform ,
  _batchCreateGeometry ,
  _batchCreateMeshRenderer ,
  _batchCreateBasicCameraView ,
  _batchCreatePerspectiveCameraProjection ,
  _createArcballCameraControllerOneByOne ,
  _batchCreateScript ,
  _batchCreateBasicMaterial ,
  _batchCreateLightMaterial ,
  _batchCreateBasicSourceTexture ,
  _batchCreateLightComponent ,
  _batchCreateDirectionLight ,
  _batchCreatePointLight ,
  batchCreate ,
  
}
/* ArrayService-Wonderjs Not a pure module */
