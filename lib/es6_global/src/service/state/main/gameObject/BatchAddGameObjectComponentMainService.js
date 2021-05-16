

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as AddGeometryService$Wonderjs from "../../../record/main/geometry/AddGeometryService.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as AddTransformService$Wonderjs from "../../../record/main/transform/AddTransformService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";
import * as AddPointLightService$Wonderjs from "../../../record/main/light/point/AddPointLightService.js";
import * as AddScriptMainService$Wonderjs from "../script/AddScriptMainService.js";
import * as AddBasicMaterialService$Wonderjs from "../../../record/main/material/basic/AddBasicMaterialService.js";
import * as AddLightMaterialService$Wonderjs from "../../../record/main/material/light/AddLightMaterialService.js";
import * as AddDirectionLightService$Wonderjs from "../../../record/main/light/direction/AddDirectionLightService.js";
import * as AddBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/AddBasicCameraViewService.js";
import * as RecordGeometryMainService$Wonderjs from "../geometry/RecordGeometryMainService.js";
import * as AddMeshRendererMainService$Wonderjs from "../meshRenderer/AddMeshRendererMainService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as RecordPointLightMainService$Wonderjs from "../light/point/RecordPointLightMainService.js";
import * as AddFlyCameraControllerService$Wonderjs from "../../../record/main/camera_controller/fly/AddFlyCameraControllerService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../material/light/RecordLightMaterialMainService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../light/direction/RecordDirectionLightMainService.js";
import * as AddArcballCameraControllerService$Wonderjs from "../../../record/main/camera_controller/arcball/AddArcballCameraControllerService.js";
import * as AddPerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/AddPerspectiveCameraProjectionService.js";

function _checkBatchAdd(uidArr, componentArr) {
  return Contract$WonderLog.requireCheck((function (param) {
                var gameObjectCount = uidArr.length;
                var componentCount = componentArr.length;
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("one gameObject should add one component", "" + (String(gameObjectCount) + (" gameObject add " + (String(componentCount) + " components")))), (function (param) {
                              return Contract$WonderLog.Operators[/* = */0](gameObjectCount, componentCount);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
}

function _batchAddComponent(param, handleAddComponentFunc, componentRecord) {
  var componentMap = param[2];
  var componentArr = param[1];
  var uidArr = param[0];
  _checkBatchAdd(uidArr, componentArr);
  return ArrayService$WonderCommonlib.reduceOneParami((function (componentRecord, uid, index) {
                var component = componentArr[index];
                ComponentMapService$Wonderjs.addComponent(uid, component, componentMap);
                return handleAddComponentFunc(component, uid, componentRecord);
              }), componentRecord, uidArr);
}

function _batchAddComponentWithState(param, handleAddComponentFunc, state) {
  var componentMap = param[2];
  var componentArr = param[1];
  var uidArr = param[0];
  _checkBatchAdd(uidArr, componentArr);
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, uid, index) {
                var component = componentArr[index];
                ComponentMapService$Wonderjs.addComponent(uid, component, componentMap);
                return handleAddComponentFunc(component, uid, state);
              }), state, uidArr);
}

function _batchAddScriptComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var scriptRecord = state[/* scriptRecord */27];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* scriptRecord */27] = _batchAddComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* scriptMap */42]
      ], AddScriptMainService$Wonderjs.handleAddComponent, scriptRecord);
  return newrecord;
}

function _batchAddBasicCameraViewComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicCameraViewRecord */13] = _batchAddComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* basicCameraViewMap */31]
      ], AddBasicCameraViewService$Wonderjs.handleAddComponent, basicCameraViewRecord);
  return newrecord;
}

function _batchAddPerspectiveCameraProjectionComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = _batchAddComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* perspectiveCameraProjectionMap */32]
      ], AddPerspectiveCameraProjectionService$Wonderjs.handleAddComponent, perspectiveCameraProjectionRecord);
  return newrecord;
}

function _batchAddFlyCameraControllerComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = _batchAddComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* flyCameraControllerMap */34]
      ], AddFlyCameraControllerService$Wonderjs.handleAddComponent, flyCameraControllerRecord);
  return newrecord;
}

function _batchAddArcballCameraControllerComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = _batchAddComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* arcballCameraControllerMap */33]
      ], AddArcballCameraControllerService$Wonderjs.handleAddComponent, arcballCameraControllerRecord);
  return newrecord;
}

function _batchAddTransformComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* transformRecord */11] = _batchAddComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* transformMap */30]
      ], AddTransformService$Wonderjs.handleAddComponent, RecordTransformMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function _batchAddMeshRendererComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return _batchAddComponentWithState(/* tuple */[
              uidArr,
              componentArr,
              gameObjectRecord[/* meshRendererMap */35]
            ], AddMeshRendererMainService$Wonderjs.handleAddComponent, state);
}

function _batchAddSharableComponent(param, handleAddComponentFunc, record) {
  var componentMap = param[2];
  var componentArr = param[1];
  var uidArr = param[0];
  _checkBatchAdd(uidArr, componentArr);
  return ArrayService$WonderCommonlib.reduceOneParami((function (record, uid, index) {
                var component = componentArr[index];
                ComponentMapService$Wonderjs.addComponent(uid, component, componentMap);
                return handleAddComponentFunc(component, uid, record);
              }), record, uidArr);
}

function _batchAddGeometryComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */23] = _batchAddSharableComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* geometryMap */29]
      ], AddGeometryService$Wonderjs.handleAddComponent, RecordGeometryMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function _batchAddBasicMaterialComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = _batchAddSharableComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* basicMaterialMap */36]
      ], AddBasicMaterialService$Wonderjs.handleAddComponent, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function _batchAddLightMaterialComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = _batchAddSharableComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* lightMaterialMap */37]
      ], AddLightMaterialService$Wonderjs.handleAddComponent, RecordLightMaterialMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function _batchAddDirectionLightComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* directionLightRecord */21] = _batchAddComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* directionLightMap */40]
      ], AddDirectionLightService$Wonderjs.handleAddComponent, RecordDirectionLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function _batchAddPointLightComponent(uidArr, componentArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */22] = _batchAddComponent(/* tuple */[
        uidArr,
        componentArr,
        gameObjectRecord[/* pointLightMap */41]
      ], AddPointLightService$Wonderjs.handleAddComponent, RecordPointLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

var batchAddScriptComponentForClone = _batchAddScriptComponent;

var batchAddBasicCameraViewComponentForClone = _batchAddBasicCameraViewComponent;

var batchAddPerspectiveCameraProjectionComponentForClone = _batchAddPerspectiveCameraProjectionComponent;

var batchAddFlyCameraControllerComponentForClone = _batchAddFlyCameraControllerComponent;

var batchAddArcballCameraControllerComponentForClone = _batchAddArcballCameraControllerComponent;

var batchAddTransformComponentForClone = _batchAddTransformComponent;

var batchAddMeshRendererComponentForClone = _batchAddMeshRendererComponent;

var batchAddGeometryComponentForClone = _batchAddGeometryComponent;

var batchAddBasicMaterialComponentForClone = _batchAddBasicMaterialComponent;

var batchAddLightMaterialComponentForClone = _batchAddLightMaterialComponent;

var batchAddDirectionLightComponentForClone = _batchAddDirectionLightComponent;

var batchAddPointLightComponentForClone = _batchAddPointLightComponent;

var batchAddTransformComponentForCreate = _batchAddTransformComponent;

var batchAddGeometryComponentForCreate = _batchAddGeometryComponent;

var batchAddBasicCameraViewComponentForCreate = _batchAddBasicCameraViewComponent;

var batchAddPerspectiveCameraProjectionComponentForCreate = _batchAddPerspectiveCameraProjectionComponent;

var batchAddFlyCameraControllerComponentForCreate = _batchAddFlyCameraControllerComponent;

var batchAddArcballCameraControllerComponentForCreate = _batchAddArcballCameraControllerComponent;

var batchAddBasicMaterialComponentForCreate = _batchAddBasicMaterialComponent;

var batchAddLightMaterialComponentForCreate = _batchAddLightMaterialComponent;

var batchAddMeshRendererComponentForCreate = _batchAddMeshRendererComponent;

var batchAddDirectionLightComponentForCreate = _batchAddDirectionLightComponent;

var batchAddPointLightComponentForCreate = _batchAddPointLightComponent;

var batchAddScriptComponentForCreate = _batchAddScriptComponent;

export {
  _checkBatchAdd ,
  _batchAddComponent ,
  _batchAddComponentWithState ,
  _batchAddScriptComponent ,
  batchAddScriptComponentForClone ,
  _batchAddBasicCameraViewComponent ,
  batchAddBasicCameraViewComponentForClone ,
  _batchAddPerspectiveCameraProjectionComponent ,
  batchAddPerspectiveCameraProjectionComponentForClone ,
  _batchAddFlyCameraControllerComponent ,
  batchAddFlyCameraControllerComponentForClone ,
  _batchAddArcballCameraControllerComponent ,
  batchAddArcballCameraControllerComponentForClone ,
  _batchAddTransformComponent ,
  batchAddTransformComponentForClone ,
  _batchAddMeshRendererComponent ,
  batchAddMeshRendererComponentForClone ,
  _batchAddSharableComponent ,
  _batchAddGeometryComponent ,
  batchAddGeometryComponentForClone ,
  _batchAddBasicMaterialComponent ,
  batchAddBasicMaterialComponentForClone ,
  _batchAddLightMaterialComponent ,
  batchAddLightMaterialComponentForClone ,
  _batchAddDirectionLightComponent ,
  batchAddDirectionLightComponentForClone ,
  _batchAddPointLightComponent ,
  batchAddPointLightComponentForClone ,
  batchAddTransformComponentForCreate ,
  batchAddGeometryComponentForCreate ,
  batchAddBasicCameraViewComponentForCreate ,
  batchAddPerspectiveCameraProjectionComponentForCreate ,
  batchAddFlyCameraControllerComponentForCreate ,
  batchAddArcballCameraControllerComponentForCreate ,
  batchAddBasicMaterialComponentForCreate ,
  batchAddLightMaterialComponentForCreate ,
  batchAddMeshRendererComponentForCreate ,
  batchAddDirectionLightComponentForCreate ,
  batchAddPointLightComponentForCreate ,
  batchAddScriptComponentForCreate ,
  
}
/* Log-WonderLog Not a pure module */
