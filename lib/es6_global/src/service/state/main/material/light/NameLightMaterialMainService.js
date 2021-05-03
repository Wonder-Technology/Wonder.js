

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as NameService$Wonderjs from "../../../../primitive/name/NameService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";

function getName(material, state) {
  return NameService$Wonderjs.getName(material, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* nameMap */13]);
}

function unsafeGetName(material, state) {
  return NameService$Wonderjs.unsafeGetName(material, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* nameMap */13]);
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
    /* diffuseTextureIndices */record[/* diffuseTextureIndices */6],
    /* specularTextureIndices */record[/* specularTextureIndices */7],
    /* defaultDiffuseColor */record[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */record[/* defaultSpecularColor */9],
    /* defaultShininess */record[/* defaultShininess */10],
    /* gameObjectsMap */record[/* gameObjectsMap */11],
    /* disposedIndexArray */record[/* disposedIndexArray */12],
    /* nameMap */NameService$Wonderjs.setName(material, name, record[/* nameMap */13]),
    /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */14]
  ];
  return newrecord;
}

export {
  getName ,
  unsafeGetName ,
  setName ,
  
}
/* NameService-Wonderjs Not a pure module */
