

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";
import * as ManageMapBasicMaterialMainService$Wonderjs from "./mapManager/ManageMapBasicMaterialMainService.js";
import * as OperateTypeArrayBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/OperateTypeArrayBasicMaterialService.js";

function getColor(material, state) {
  return OperateTypeArrayBasicMaterialService$Wonderjs.getColor(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* colors */3]);
}

function setColor(material, color, state) {
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */basicMaterialRecord[/* index */0],
    /* buffer */basicMaterialRecord[/* buffer */1],
    /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
    /* colors */OperateTypeArrayBasicMaterialService$Wonderjs.setColor(material, color, basicMaterialRecord[/* colors */3]),
    /* textureIndices */basicMaterialRecord[/* textureIndices */4],
    /* mapUnits */basicMaterialRecord[/* mapUnits */5],
    /* isDepthTests */basicMaterialRecord[/* isDepthTests */6],
    /* alphas */basicMaterialRecord[/* alphas */7],
    /* emptyMapUnitArrayMap */basicMaterialRecord[/* emptyMapUnitArrayMap */8],
    /* defaultColor */basicMaterialRecord[/* defaultColor */9],
    /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */10],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */11],
    /* nameMap */basicMaterialRecord[/* nameMap */12],
    /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */13]
  ];
  return newrecord;
}

var getMap = ManageMapBasicMaterialMainService$Wonderjs.getMap;

var unsafeGetMap = ManageMapBasicMaterialMainService$Wonderjs.unsafeGetMap;

var setMap = ManageMapBasicMaterialMainService$Wonderjs.setMap;

var hasMap = ManageMapBasicMaterialMainService$Wonderjs.hasMap;

var removeMap = ManageMapBasicMaterialMainService$Wonderjs.removeMap;

function getIsDepthTest(material, state) {
  return OperateTypeArrayBasicMaterialService$Wonderjs.getIsDepthTest(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* isDepthTests */6]);
}

function setIsDepthTest(material, isDepthTest, state) {
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */basicMaterialRecord[/* index */0],
    /* buffer */basicMaterialRecord[/* buffer */1],
    /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
    /* colors */basicMaterialRecord[/* colors */3],
    /* textureIndices */basicMaterialRecord[/* textureIndices */4],
    /* mapUnits */basicMaterialRecord[/* mapUnits */5],
    /* isDepthTests */OperateTypeArrayBasicMaterialService$Wonderjs.setIsDepthTest(material, OperateTypeArrayBasicMaterialService$Wonderjs.convertIsDepthTestToVal(isDepthTest), basicMaterialRecord[/* isDepthTests */6]),
    /* alphas */basicMaterialRecord[/* alphas */7],
    /* emptyMapUnitArrayMap */basicMaterialRecord[/* emptyMapUnitArrayMap */8],
    /* defaultColor */basicMaterialRecord[/* defaultColor */9],
    /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */10],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */11],
    /* nameMap */basicMaterialRecord[/* nameMap */12],
    /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */13]
  ];
  return newrecord;
}

function getAlpha(material, state) {
  return OperateTypeArrayBasicMaterialService$Wonderjs.getAlpha(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* alphas */7]);
}

function setAlpha(material, alpha, state) {
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */basicMaterialRecord[/* index */0],
    /* buffer */basicMaterialRecord[/* buffer */1],
    /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
    /* colors */basicMaterialRecord[/* colors */3],
    /* textureIndices */basicMaterialRecord[/* textureIndices */4],
    /* mapUnits */basicMaterialRecord[/* mapUnits */5],
    /* isDepthTests */basicMaterialRecord[/* isDepthTests */6],
    /* alphas */OperateTypeArrayBasicMaterialService$Wonderjs.setAlpha(material, alpha, basicMaterialRecord[/* alphas */7]),
    /* emptyMapUnitArrayMap */basicMaterialRecord[/* emptyMapUnitArrayMap */8],
    /* defaultColor */basicMaterialRecord[/* defaultColor */9],
    /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */10],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */11],
    /* nameMap */basicMaterialRecord[/* nameMap */12],
    /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */13]
  ];
  return newrecord;
}

export {
  getColor ,
  setColor ,
  getMap ,
  unsafeGetMap ,
  setMap ,
  hasMap ,
  removeMap ,
  getIsDepthTest ,
  setIsDepthTest ,
  getAlpha ,
  setAlpha ,
  
}
/* RecordBasicMaterialMainService-Wonderjs Not a pure module */
