

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
    /* emptyMapUnitArrayMap */basicMaterialRecord[/* emptyMapUnitArrayMap */6],
    /* defaultColor */basicMaterialRecord[/* defaultColor */7],
    /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */8],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */9],
    /* nameMap */basicMaterialRecord[/* nameMap */10],
    /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */11]
  ];
  return newrecord;
}

var getMap = ManageMapBasicMaterialMainService$Wonderjs.getMap;

var unsafeGetMap = ManageMapBasicMaterialMainService$Wonderjs.unsafeGetMap;

var setMap = ManageMapBasicMaterialMainService$Wonderjs.setMap;

var hasMap = ManageMapBasicMaterialMainService$Wonderjs.hasMap;

var removeMap = ManageMapBasicMaterialMainService$Wonderjs.removeMap;

export {
  getColor ,
  setColor ,
  getMap ,
  unsafeGetMap ,
  setMap ,
  hasMap ,
  removeMap ,
  
}
/* RecordBasicMaterialMainService-Wonderjs Not a pure module */
