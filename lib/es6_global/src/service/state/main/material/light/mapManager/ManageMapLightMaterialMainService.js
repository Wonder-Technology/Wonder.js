

import * as Js_option from "./../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "./../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../../../atom/OptionService.js";
import * as GroupTextureMainService$Wonderjs from "../../../texture/GroupTextureMainService.js";
import * as ManagerMapMaterialMainService$Wonderjs from "../../mapManager/ManagerMapMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../RecordLightMaterialMainService.js";
import * as OperateTypeArrayAllLightMaterialService$Wonderjs from "../../../../../record/all/material/light/OperateTypeArrayAllLightMaterialService.js";

function getDiffuseMap(material, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return ManagerMapMaterialMainService$Wonderjs.getMap(material, OperateTypeArrayAllLightMaterialService$Wonderjs.getTextureIndex, match[/* diffuseTextureIndices */6]);
}

function unsafeGetDiffuseMap(material, state) {
  return OptionService$Wonderjs.unsafeGet(getDiffuseMap(material, state));
}

function setDiffuseMap(material, texture, state) {
  var state$1 = GroupTextureMainService$Wonderjs.addMaterial(/* tuple */[
        material,
        /* LightMaterial */1
      ], texture, state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var diffuseTextureIndices = ManagerMapMaterialMainService$Wonderjs.setMap(material, texture, OperateTypeArrayAllLightMaterialService$Wonderjs.setTextureIndex, lightMaterialRecord[/* diffuseTextureIndices */6]);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* diffuseTextureIndices */diffuseTextureIndices,
    /* specularTextureIndices */lightMaterialRecord[/* specularTextureIndices */7],
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */9],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */10],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */11],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */12],
    /* nameMap */lightMaterialRecord[/* nameMap */13],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */14]
  ];
  return newrecord;
}

function hasDiffuseMap(material, state) {
  return Js_option.isSome(getDiffuseMap(material, state));
}

function removeDiffuseMap(material, state) {
  var state$1 = GroupTextureMainService$Wonderjs.removeMaterial(/* tuple */[
        material,
        /* LightMaterial */1
      ], OptionService$Wonderjs.unsafeGet(getDiffuseMap(material, state)), state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var diffuseTextureIndices = ManagerMapMaterialMainService$Wonderjs.removeMap(material, OperateTypeArrayAllLightMaterialService$Wonderjs.setTextureIndex, lightMaterialRecord[/* diffuseTextureIndices */6]);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* diffuseTextureIndices */diffuseTextureIndices,
    /* specularTextureIndices */lightMaterialRecord[/* specularTextureIndices */7],
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */9],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */10],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */11],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */12],
    /* nameMap */lightMaterialRecord[/* nameMap */13],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */14]
  ];
  return newrecord;
}

function getSpecularMap(material, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return ManagerMapMaterialMainService$Wonderjs.getMap(material, OperateTypeArrayAllLightMaterialService$Wonderjs.getTextureIndex, match[/* specularTextureIndices */7]);
}

function unsafeGetSpecularMap(material, state) {
  return OptionService$Wonderjs.unsafeGet(getSpecularMap(material, state));
}

function setSpecularMap(material, texture, state) {
  var state$1 = GroupTextureMainService$Wonderjs.addMaterial(/* tuple */[
        material,
        /* LightMaterial */1
      ], texture, state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var specularTextureIndices = ManagerMapMaterialMainService$Wonderjs.setMap(material, texture, OperateTypeArrayAllLightMaterialService$Wonderjs.setTextureIndex, lightMaterialRecord[/* specularTextureIndices */7]);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* diffuseTextureIndices */lightMaterialRecord[/* diffuseTextureIndices */6],
    /* specularTextureIndices */specularTextureIndices,
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */9],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */10],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */11],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */12],
    /* nameMap */lightMaterialRecord[/* nameMap */13],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */14]
  ];
  return newrecord;
}

function hasSpecularMap(material, state) {
  return Js_option.isSome(getSpecularMap(material, state));
}

function removeSpecularMap(material, state) {
  var state$1 = GroupTextureMainService$Wonderjs.removeMaterial(/* tuple */[
        material,
        /* LightMaterial */1
      ], OptionService$Wonderjs.unsafeGet(getSpecularMap(material, state)), state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var specularTextureIndices = ManagerMapMaterialMainService$Wonderjs.removeMap(material, OperateTypeArrayAllLightMaterialService$Wonderjs.setTextureIndex, lightMaterialRecord[/* specularTextureIndices */7]);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* diffuseTextureIndices */lightMaterialRecord[/* diffuseTextureIndices */6],
    /* specularTextureIndices */specularTextureIndices,
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */9],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */10],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */11],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */12],
    /* nameMap */lightMaterialRecord[/* nameMap */13],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */14]
  ];
  return newrecord;
}

export {
  getDiffuseMap ,
  unsafeGetDiffuseMap ,
  setDiffuseMap ,
  hasDiffuseMap ,
  removeDiffuseMap ,
  getSpecularMap ,
  unsafeGetSpecularMap ,
  setSpecularMap ,
  hasSpecularMap ,
  removeSpecularMap ,
  
}
/* OptionService-Wonderjs Not a pure module */
