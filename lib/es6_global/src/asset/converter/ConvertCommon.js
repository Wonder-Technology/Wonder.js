

import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";

function getCount(arrs) {
  return arrs.length;
}

function getPrimitiveData(primitives) {
  return Contract$WonderLog.ensureCheck((function (param) {
                var indices = param[/* indices */1];
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("indices exist", "not"), (function (param) {
                              return Contract$WonderLog.assertTrue(Js_option.isSome(indices));
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), Caml_array.caml_array_get(primitives, 0));
}

function buildDefaultName(type_, index) {
  return "" + (String(type_) + ("_" + (String(index) + "")));
}

function buildDefaultImageName(index) {
  return buildDefaultName("image", index);
}

function buildDefaultGameObjectName(index) {
  return buildDefaultName("gameObject", index);
}

function buildDefaultGeometryName(index) {
  return buildDefaultName("geometry", index);
}

function buildDefaultBasicMaterialName(index) {
  return buildDefaultName("basicMaterial", index);
}

function buildDefaultLightMaterialName(index) {
  return buildDefaultName("lightMaterial", index);
}

function buildDefaultTextureName(index) {
  return buildDefaultName("texture", index);
}

function isDefaultImageName(name) {
  return Js_option.isSome(Caml_option.null_to_opt(name.match((/^image_/g))));
}

function isDefaultLightMaterialName(name) {
  return Js_option.isSome(Caml_option.null_to_opt(name.match((/^lightMaterial_/g))));
}

function isDefaultBasicMaterialName(name) {
  return Js_option.isSome(Caml_option.null_to_opt(name.match((/^basicMaterial_/g))));
}

function isDefaultTextureName(name) {
  return Js_option.isSome(Caml_option.null_to_opt(name.match((/^texture_/g))));
}

function isDefaultGeometryName(name) {
  return Js_option.isSome(Caml_option.null_to_opt(name.match((/^geometry_/g))));
}

function getScene(scenes, scene) {
  return scenes[scene !== undefined ? scene : 0];
}

export {
  getCount ,
  getPrimitiveData ,
  buildDefaultName ,
  buildDefaultImageName ,
  buildDefaultGameObjectName ,
  buildDefaultGeometryName ,
  buildDefaultBasicMaterialName ,
  buildDefaultLightMaterialName ,
  buildDefaultTextureName ,
  isDefaultImageName ,
  isDefaultLightMaterialName ,
  isDefaultBasicMaterialName ,
  isDefaultTextureName ,
  isDefaultGeometryName ,
  getScene ,
  
}
/* Log-WonderLog Not a pure module */
