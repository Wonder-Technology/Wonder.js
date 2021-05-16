

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as AddGeometryService$Wonderjs from "../../../record/main/geometry/AddGeometryService.js";
import * as AddTransformService$Wonderjs from "../../../record/main/transform/AddTransformService.js";
import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";
import * as AddPointLightService$Wonderjs from "../../../record/main/light/point/AddPointLightService.js";
import * as AddScriptMainService$Wonderjs from "../script/AddScriptMainService.js";
import * as AddBasicMaterialService$Wonderjs from "../../../record/main/material/basic/AddBasicMaterialService.js";
import * as AddLightMaterialService$Wonderjs from "../../../record/main/material/light/AddLightMaterialService.js";
import * as AddDirectionLightService$Wonderjs from "../../../record/main/light/direction/AddDirectionLightService.js";
import * as AddObjectInstanceService$Wonderjs from "../../../record/main/instance/objectInstance/AddObjectInstanceService.js";
import * as AddSourceInstanceService$Wonderjs from "../../../record/main/instance/sourceInstance/AddSourceInstanceService.js";
import * as AddBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/AddBasicCameraViewService.js";
import * as RecordGeometryMainService$Wonderjs from "../geometry/RecordGeometryMainService.js";
import * as AddMeshRendererMainService$Wonderjs from "../meshRenderer/AddMeshRendererMainService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as RecordPointLightMainService$Wonderjs from "../light/point/RecordPointLightMainService.js";
import * as AddFlyCameraControllerService$Wonderjs from "../../../record/main/camera_controller/fly/AddFlyCameraControllerService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../material/light/RecordLightMaterialMainService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../light/direction/RecordDirectionLightMainService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../instance/RecordSourceInstanceMainService.js";
import * as AddArcballCameraControllerService$Wonderjs from "../../../record/main/camera_controller/arcball/AddArcballCameraControllerService.js";
import * as AddPerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/AddPerspectiveCameraProjectionService.js";

function _addComponent(param, handleAddComponentFunc, componentRecord) {
  var component = param[1];
  var uid = param[0];
  ComponentMapService$Wonderjs.addComponent(uid, component, param[2]);
  return handleAddComponentFunc(component, uid, componentRecord);
}

function _addComponentWithState(param, handleAddComponentFunc, state) {
  var component = param[1];
  var uid = param[0];
  ComponentMapService$Wonderjs.addComponent(uid, component, param[2]);
  return handleAddComponentFunc(component, uid, state);
}

function addScriptComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var scriptRecord = state[/* scriptRecord */27];
  state[/* scriptRecord */27] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* scriptMap */42]
      ], AddScriptMainService$Wonderjs.handleAddComponent, scriptRecord);
  return state;
}

function addBasicCameraViewComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  state[/* basicCameraViewRecord */13] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* basicCameraViewMap */31]
      ], AddBasicCameraViewService$Wonderjs.handleAddComponent, basicCameraViewRecord);
  return state;
}

function addPerspectiveCameraProjectionComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  state[/* perspectiveCameraProjectionRecord */14] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* perspectiveCameraProjectionMap */32]
      ], AddPerspectiveCameraProjectionService$Wonderjs.handleAddComponent, perspectiveCameraProjectionRecord);
  return state;
}

function addFlyCameraControllerComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* flyCameraControllerMap */34]
      ], AddFlyCameraControllerService$Wonderjs.handleAddComponent, flyCameraControllerRecord);
  return newrecord;
}

function addArcballCameraControllerComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* arcballCameraControllerMap */33]
      ], AddArcballCameraControllerService$Wonderjs.handleAddComponent, arcballCameraControllerRecord);
  return newrecord;
}

function addTransformComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  state[/* transformRecord */11] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* transformMap */30]
      ], AddTransformService$Wonderjs.handleAddComponent, RecordTransformMainService$Wonderjs.getRecord(state));
  return state;
}

function _addSharableComponent(param, handleAddComponentFunc, componentRecord) {
  var component = param[1];
  var uid = param[0];
  ComponentMapService$Wonderjs.addComponent(uid, component, param[2]);
  return handleAddComponentFunc(component, uid, componentRecord);
}

function addGeometryComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  state[/* geometryRecord */23] = _addSharableComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* geometryMap */29]
      ], AddGeometryService$Wonderjs.handleAddComponent, geometryRecord);
  return state;
}

function addBasicMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  state[/* basicMaterialRecord */15] = _addSharableComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* basicMaterialMap */36]
      ], AddBasicMaterialService$Wonderjs.handleAddComponent, basicMaterialRecord);
  return state;
}

function addLightMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  state[/* lightMaterialRecord */16] = _addSharableComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* lightMaterialMap */37]
      ], AddLightMaterialService$Wonderjs.handleAddComponent, lightMaterialRecord);
  return state;
}

function addMeshRendererComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return _addComponentWithState(/* tuple */[
              uid,
              component,
              gameObjectRecord[/* meshRendererMap */35]
            ], AddMeshRendererMainService$Wonderjs.handleAddComponent, state);
}

function addDirectionLightComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  state[/* directionLightRecord */21] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* directionLightMap */40]
      ], AddDirectionLightService$Wonderjs.handleAddComponent, RecordDirectionLightMainService$Wonderjs.getRecord(state));
  return state;
}

function addPointLightComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  state[/* pointLightRecord */22] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* pointLightMap */41]
      ], AddPointLightService$Wonderjs.handleAddComponent, RecordPointLightMainService$Wonderjs.getRecord(state));
  return state;
}

function addSourceInstanceComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  state[/* sourceInstanceRecord */6] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* sourceInstanceMap */38]
      ], AddSourceInstanceService$Wonderjs.handleAddComponent, RecordSourceInstanceMainService$Wonderjs.getRecord(state));
  return state;
}

function addObjectInstanceComponent(uid, component, state) {
  var objectInstanceRecord = state[/* objectInstanceRecord */7];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  state[/* objectInstanceRecord */7] = _addComponent(/* tuple */[
        uid,
        component,
        gameObjectRecord[/* objectInstanceMap */39]
      ], AddObjectInstanceService$Wonderjs.handleAddComponent, objectInstanceRecord);
  return state;
}

export {
  _addComponent ,
  _addComponentWithState ,
  addScriptComponent ,
  addBasicCameraViewComponent ,
  addPerspectiveCameraProjectionComponent ,
  addFlyCameraControllerComponent ,
  addArcballCameraControllerComponent ,
  addTransformComponent ,
  _addSharableComponent ,
  addGeometryComponent ,
  addBasicMaterialComponent ,
  addLightMaterialComponent ,
  addMeshRendererComponent ,
  addDirectionLightComponent ,
  addPointLightComponent ,
  addSourceInstanceComponent ,
  addObjectInstanceComponent ,
  
}
/* AddGeometryService-Wonderjs Not a pure module */
