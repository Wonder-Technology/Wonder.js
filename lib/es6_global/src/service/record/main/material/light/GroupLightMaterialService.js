

import * as GroupService$Wonderjs from "../../../../primitive/GroupService.js";

function getGroupCount(material, record) {
  return GroupService$Wonderjs.getGroupCount(material, record[/* groupCountMap */14]);
}

function isGroupMaterial(material, record) {
  return GroupService$Wonderjs.isGroupComponent(material, record[/* groupCountMap */14]);
}

function increaseGroupCount(material, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* diffuseColors */record[/* diffuseColors */3],
          /* specularColors */record[/* specularColors */4],
          /* shininess */record[/* shininess */5],
          /* textureIndices */record[/* textureIndices */6],
          /* diffuseMapUnits */record[/* diffuseMapUnits */7],
          /* specularMapUnits */record[/* specularMapUnits */8],
          /* textureCountMap */record[/* textureCountMap */9],
          /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
          /* defaultSpecularColor */record[/* defaultSpecularColor */11],
          /* defaultShininess */record[/* defaultShininess */12],
          /* gameObjectMap */record[/* gameObjectMap */13],
          /* groupCountMap */GroupService$Wonderjs.increaseGroupCount(material, record[/* groupCountMap */14]),
          /* disposedIndexArray */record[/* disposedIndexArray */15],
          /* nameMap */record[/* nameMap */16],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */17]
        ];
}

function decreaseGroupCount(material, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* diffuseColors */record[/* diffuseColors */3],
          /* specularColors */record[/* specularColors */4],
          /* shininess */record[/* shininess */5],
          /* textureIndices */record[/* textureIndices */6],
          /* diffuseMapUnits */record[/* diffuseMapUnits */7],
          /* specularMapUnits */record[/* specularMapUnits */8],
          /* textureCountMap */record[/* textureCountMap */9],
          /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
          /* defaultSpecularColor */record[/* defaultSpecularColor */11],
          /* defaultShininess */record[/* defaultShininess */12],
          /* gameObjectMap */record[/* gameObjectMap */13],
          /* groupCountMap */GroupService$Wonderjs.decreaseGroupCount(material, record[/* groupCountMap */14]),
          /* disposedIndexArray */record[/* disposedIndexArray */15],
          /* nameMap */record[/* nameMap */16],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */17]
        ];
}

export {
  getGroupCount ,
  isGroupMaterial ,
  increaseGroupCount ,
  decreaseGroupCount ,
  
}
/* No side effect */
