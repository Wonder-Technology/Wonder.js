

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";
import * as OperateTypeArrayAllBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/OperateTypeArrayAllBasicMaterialService.js";

function getColor(material, state) {
  return OperateTypeArrayAllBasicMaterialService$Wonderjs.getColor(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* colors */3]);
}

function setColor(material, color, state) {
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */basicMaterialRecord[/* index */0],
    /* buffer */basicMaterialRecord[/* buffer */1],
    /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
    /* colors */OperateTypeArrayAllBasicMaterialService$Wonderjs.setColor(material, color, basicMaterialRecord[/* colors */3]),
    /* isDepthTests */basicMaterialRecord[/* isDepthTests */4],
    /* alphas */basicMaterialRecord[/* alphas */5],
    /* defaultColor */basicMaterialRecord[/* defaultColor */6],
    /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */7],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */8],
    /* nameMap */basicMaterialRecord[/* nameMap */9],
    /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */10]
  ];
  return newrecord;
}

function getIsDepthTest(material, state) {
  return OperateTypeArrayAllBasicMaterialService$Wonderjs.getIsDepthTest(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* isDepthTests */4]);
}

function setIsDepthTest(material, isDepthTest, state) {
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */basicMaterialRecord[/* index */0],
    /* buffer */basicMaterialRecord[/* buffer */1],
    /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
    /* colors */basicMaterialRecord[/* colors */3],
    /* isDepthTests */OperateTypeArrayAllBasicMaterialService$Wonderjs.setIsDepthTest(material, OperateTypeArrayAllBasicMaterialService$Wonderjs.convertIsDepthTestToVal(isDepthTest), basicMaterialRecord[/* isDepthTests */4]),
    /* alphas */basicMaterialRecord[/* alphas */5],
    /* defaultColor */basicMaterialRecord[/* defaultColor */6],
    /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */7],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */8],
    /* nameMap */basicMaterialRecord[/* nameMap */9],
    /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */10]
  ];
  return newrecord;
}

function getAlpha(material, state) {
  return OperateTypeArrayAllBasicMaterialService$Wonderjs.getAlpha(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* alphas */5]);
}

function setAlpha(material, alpha, state) {
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */basicMaterialRecord[/* index */0],
    /* buffer */basicMaterialRecord[/* buffer */1],
    /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
    /* colors */basicMaterialRecord[/* colors */3],
    /* isDepthTests */basicMaterialRecord[/* isDepthTests */4],
    /* alphas */OperateTypeArrayAllBasicMaterialService$Wonderjs.setAlpha(material, alpha, basicMaterialRecord[/* alphas */5]),
    /* defaultColor */basicMaterialRecord[/* defaultColor */6],
    /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */7],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */8],
    /* nameMap */basicMaterialRecord[/* nameMap */9],
    /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */10]
  ];
  return newrecord;
}

export {
  getColor ,
  setColor ,
  getIsDepthTest ,
  setIsDepthTest ,
  getAlpha ,
  setAlpha ,
  
}
/* RecordBasicMaterialMainService-Wonderjs Not a pure module */
