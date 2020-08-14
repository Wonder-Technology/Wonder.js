

import * as Js_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../../../atom/OptionService.js";
import * as BufferSettingService$Wonderjs from "../../../../../record/main/setting/BufferSettingService.js";
import * as GroupTextureMainService$Wonderjs from "../../../texture/GroupTextureMainService.js";
import * as ManagerMapMaterialMainService$Wonderjs from "../../mapManager/ManagerMapMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../RecordLightMaterialMainService.js";
import * as OperateTypeArrayLightMaterialService$Wonderjs from "../../../../../record/all/material/light/OperateTypeArrayLightMaterialService.js";

function getDiffuseMap(material, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return ManagerMapMaterialMainService$Wonderjs.getMap(material, BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]), /* tuple */[
              OperateTypeArrayLightMaterialService$Wonderjs.getDiffuseMapUnit,
              OperateTypeArrayLightMaterialService$Wonderjs.getTextureIndex
            ], /* tuple */[
              match[/* textureIndices */6],
              match[/* diffuseMapUnits */7]
            ]);
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
  var match = ManagerMapMaterialMainService$Wonderjs.setMap(material, texture, /* tuple */[
        OperateTypeArrayLightMaterialService$Wonderjs.getDiffuseMapUnit,
        OperateTypeArrayLightMaterialService$Wonderjs.setDiffuseMapUnit,
        OperateTypeArrayLightMaterialService$Wonderjs.setTextureIndex
      ], /* tuple */[
        BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]),
        lightMaterialRecord[/* textureIndices */6],
        lightMaterialRecord[/* diffuseMapUnits */7],
        lightMaterialRecord[/* emptyMapUnitArrayMap */9]
      ]);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* textureIndices */match[0],
    /* diffuseMapUnits */match[1],
    /* specularMapUnits */lightMaterialRecord[/* specularMapUnits */8],
    /* emptyMapUnitArrayMap */match[2],
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */13],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */14],
    /* nameMap */lightMaterialRecord[/* nameMap */15],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */16]
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
      ], unsafeGetDiffuseMap(material, state), state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var match = ManagerMapMaterialMainService$Wonderjs.removeMap(material, /* tuple */[
        OperateTypeArrayLightMaterialService$Wonderjs.getDiffuseMapUnit,
        OperateTypeArrayLightMaterialService$Wonderjs.setDiffuseMapUnit,
        OperateTypeArrayLightMaterialService$Wonderjs.setTextureIndex
      ], /* tuple */[
        BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]),
        lightMaterialRecord[/* textureIndices */6],
        lightMaterialRecord[/* diffuseMapUnits */7],
        lightMaterialRecord[/* emptyMapUnitArrayMap */9]
      ]);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* textureIndices */match[0],
    /* diffuseMapUnits */match[1],
    /* specularMapUnits */lightMaterialRecord[/* specularMapUnits */8],
    /* emptyMapUnitArrayMap */match[2],
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */13],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */14],
    /* nameMap */lightMaterialRecord[/* nameMap */15],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */16]
  ];
  return newrecord;
}

function getSpecularMap(material, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return ManagerMapMaterialMainService$Wonderjs.getMap(material, BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]), /* tuple */[
              OperateTypeArrayLightMaterialService$Wonderjs.getSpecularMapUnit,
              OperateTypeArrayLightMaterialService$Wonderjs.getTextureIndex
            ], /* tuple */[
              match[/* textureIndices */6],
              match[/* specularMapUnits */8]
            ]);
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
  var match = ManagerMapMaterialMainService$Wonderjs.setMap(material, texture, /* tuple */[
        OperateTypeArrayLightMaterialService$Wonderjs.getSpecularMapUnit,
        OperateTypeArrayLightMaterialService$Wonderjs.setSpecularMapUnit,
        OperateTypeArrayLightMaterialService$Wonderjs.setTextureIndex
      ], /* tuple */[
        BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]),
        lightMaterialRecord[/* textureIndices */6],
        lightMaterialRecord[/* specularMapUnits */8],
        lightMaterialRecord[/* emptyMapUnitArrayMap */9]
      ]);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* textureIndices */match[0],
    /* diffuseMapUnits */lightMaterialRecord[/* diffuseMapUnits */7],
    /* specularMapUnits */match[1],
    /* emptyMapUnitArrayMap */match[2],
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */13],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */14],
    /* nameMap */lightMaterialRecord[/* nameMap */15],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */16]
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
      ], unsafeGetSpecularMap(material, state), state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var match = ManagerMapMaterialMainService$Wonderjs.removeMap(material, /* tuple */[
        OperateTypeArrayLightMaterialService$Wonderjs.getSpecularMapUnit,
        OperateTypeArrayLightMaterialService$Wonderjs.setSpecularMapUnit,
        OperateTypeArrayLightMaterialService$Wonderjs.setTextureIndex
      ], /* tuple */[
        BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]),
        lightMaterialRecord[/* textureIndices */6],
        lightMaterialRecord[/* specularMapUnits */8],
        lightMaterialRecord[/* emptyMapUnitArrayMap */9]
      ]);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* textureIndices */match[0],
    /* diffuseMapUnits */lightMaterialRecord[/* diffuseMapUnits */7],
    /* specularMapUnits */match[1],
    /* emptyMapUnitArrayMap */match[2],
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */13],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */14],
    /* nameMap */lightMaterialRecord[/* nameMap */15],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */16]
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
