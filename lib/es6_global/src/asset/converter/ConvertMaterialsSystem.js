

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

var _buildDefaultBasicMaterialName = ConvertCommon$Wonderjs.buildDefaultBasicMaterialName;

function _convertColor(colorFactor) {
  if (colorFactor !== undefined) {
    var colorFactor$1 = colorFactor;
    return /* array */[
            Caml_array.caml_array_get(colorFactor$1, 0),
            Caml_array.caml_array_get(colorFactor$1, 1),
            Caml_array.caml_array_get(colorFactor$1, 2)
          ];
  } else {
    return /* array */[
            1,
            1,
            1
          ];
  }
}

function convertToBasicMaterials(param) {
  var extras = param[/* extras */15];
  if (extras !== undefined) {
    var basicMaterials = extras[/* basicMaterials */2];
    if (basicMaterials !== undefined) {
      return ArrayService$WonderCommonlib.reduceOneParami((function (arr, param, index) {
                    var name = param[/* name */1];
                    return ArrayService$Wonderjs.push(/* record */[
                                /* color */_convertColor(param[/* colorFactor */0]),
                                /* name */name !== undefined ? name : ConvertCommon$Wonderjs.buildDefaultBasicMaterialName(index)
                              ], arr);
                  }), /* array */[], basicMaterials);
    } else {
      return /* array */[];
    }
  } else {
    return /* array */[];
  }
}

var _buildDefaultLightMaterialName = ConvertCommon$Wonderjs.buildDefaultLightMaterialName;

function _convertPBRData(name, diffuseColorFactor, arr, index) {
  return ArrayService$Wonderjs.push(/* record */[
              /* diffuseColor */_convertColor(diffuseColorFactor),
              /* name */name !== undefined ? name : ConvertCommon$Wonderjs.buildDefaultLightMaterialName(index)
            ], arr);
}

function _convertMetallicRoughness(name, pbrMetallicRoughness, arr, index) {
  if (pbrMetallicRoughness !== undefined) {
    return _convertPBRData(name, pbrMetallicRoughness[/* baseColorFactor */0], arr, index);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_convertMetallicRoughness", "pbrMetallicRoughness shouldn\'t be None", "", "", ""));
  }
}

function convertToLightMaterials(param) {
  var materials = param[/* materials */12];
  if (materials !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParami((function (arr, param, index) {
                  var extensions = param[/* extensions */2];
                  var name = param[/* name */1];
                  var pbrMetallicRoughness = param[/* pbrMetallicRoughness */0];
                  if (extensions !== undefined) {
                    var khr_materials_pbrSpecularGlossiness = extensions[/* khr_materials_pbrSpecularGlossiness */0];
                    if (khr_materials_pbrSpecularGlossiness !== undefined) {
                      return _convertPBRData(name, khr_materials_pbrSpecularGlossiness[/* diffuseFactor */0], arr, index);
                    } else {
                      return _convertMetallicRoughness(name, pbrMetallicRoughness, arr, index);
                    }
                  } else {
                    return _convertMetallicRoughness(name, pbrMetallicRoughness, arr, index);
                  }
                }), /* array */[], materials);
  } else {
    return /* array */[];
  }
}

function _getLightMaterialOfMesh(mesh, meshes) {
  if (mesh !== undefined) {
    var meshData = meshes[mesh];
    return ConvertCommon$Wonderjs.getPrimitiveData(meshData[/* primitives */0])[/* material */2];
  }
  
}

function getLightMaterialOfNode(param, meshes) {
  var extras = param[/* extras */8];
  var mesh = param[/* mesh */2];
  if (extras !== undefined) {
    var lightMaterial = extras[/* lightMaterial */3];
    if (lightMaterial !== undefined) {
      return lightMaterial;
    } else {
      return _getLightMaterialOfMesh(mesh, meshes);
    }
  } else {
    return _getLightMaterialOfMesh(mesh, meshes);
  }
}

export {
  _buildDefaultBasicMaterialName ,
  _convertColor ,
  convertToBasicMaterials ,
  _buildDefaultLightMaterialName ,
  _convertPBRData ,
  _convertMetallicRoughness ,
  convertToLightMaterials ,
  _getLightMaterialOfMesh ,
  getLightMaterialOfNode ,
  
}
/* Log-WonderLog Not a pure module */
