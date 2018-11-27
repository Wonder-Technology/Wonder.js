

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as NameService$Wonderjs from "../../../../primitive/name/NameService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";

function getName(material, state) {
  return NameService$Wonderjs.getName(material, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* nameMap */15]);
}

function unsafeGetName(material, state) {
  return NameService$Wonderjs.unsafeGetName(material, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* nameMap */15]);
}

function setName(material, name, state) {
  var record = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */record[/* shaderIndices */2],
    /* diffuseColors */record[/* diffuseColors */3],
    /* specularColors */record[/* specularColors */4],
    /* shininess */record[/* shininess */5],
    /* textureIndices */record[/* textureIndices */6],
    /* diffuseMapUnits */record[/* diffuseMapUnits */7],
    /* specularMapUnits */record[/* specularMapUnits */8],
    /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */9],
    /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */record[/* defaultSpecularColor */11],
    /* defaultShininess */record[/* defaultShininess */12],
    /* gameObjectsMap */record[/* gameObjectsMap */13],
    /* disposedIndexArray */record[/* disposedIndexArray */14],
    /* nameMap */NameService$Wonderjs.setName(material, name, record[/* nameMap */15]),
    /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */16]
  ];
  return newrecord;
}

export {
  getName ,
  unsafeGetName ,
  setName ,
  
}
/* NameService-Wonderjs Not a pure module */
