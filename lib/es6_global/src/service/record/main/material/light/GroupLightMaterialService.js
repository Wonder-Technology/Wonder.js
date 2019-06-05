

import * as GameObjectsMapGroupService$Wonderjs from "../../../../primitive/GameObjectsMapGroupService.js";

function isGroupLightMaterial(material, record) {
  return GameObjectsMapGroupService$Wonderjs.isGroup(material, record[/* gameObjectsMap */13]);
}

function removeGameObject(gameObject, material, record) {
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
          /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */9],
          /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
          /* defaultSpecularColor */record[/* defaultSpecularColor */11],
          /* defaultShininess */record[/* defaultShininess */12],
          /* gameObjectsMap */GameObjectsMapGroupService$Wonderjs.removeGameObject(gameObject, material, record[/* gameObjectsMap */13]),
          /* disposedIndexArray */record[/* disposedIndexArray */14],
          /* nameMap */record[/* nameMap */15],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */16]
        ];
}

function batchRemoveGameObjects(gameObjectArr, material, record) {
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
          /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */9],
          /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
          /* defaultSpecularColor */record[/* defaultSpecularColor */11],
          /* defaultShininess */record[/* defaultShininess */12],
          /* gameObjectsMap */GameObjectsMapGroupService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, record[/* gameObjectsMap */13]),
          /* disposedIndexArray */record[/* disposedIndexArray */14],
          /* nameMap */record[/* nameMap */15],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */16]
        ];
}

export {
  isGroupLightMaterial ,
  removeGameObject ,
  batchRemoveGameObjects ,
  
}
/* GameObjectsMapGroupService-Wonderjs Not a pure module */
