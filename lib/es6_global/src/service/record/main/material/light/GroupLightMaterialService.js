

import * as GameObjectsMapGroupService$Wonderjs from "../../../../primitive/GameObjectsMapGroupService.js";

function isGroupLightMaterial(material, record) {
  return GameObjectsMapGroupService$Wonderjs.isGroup(material, record[/* gameObjectsMap */11]);
}

function removeGameObject(gameObject, material, record) {
  return /* record */[
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
          /* gameObjectsMap */GameObjectsMapGroupService$Wonderjs.removeGameObject(gameObject, material, record[/* gameObjectsMap */11]),
          /* disposedIndexArray */record[/* disposedIndexArray */12],
          /* nameMap */record[/* nameMap */13],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */14]
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
          /* diffuseTextureIndices */record[/* diffuseTextureIndices */6],
          /* specularTextureIndices */record[/* specularTextureIndices */7],
          /* defaultDiffuseColor */record[/* defaultDiffuseColor */8],
          /* defaultSpecularColor */record[/* defaultSpecularColor */9],
          /* defaultShininess */record[/* defaultShininess */10],
          /* gameObjectsMap */GameObjectsMapGroupService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, record[/* gameObjectsMap */11]),
          /* disposedIndexArray */record[/* disposedIndexArray */12],
          /* nameMap */record[/* nameMap */13],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */14]
        ];
}

export {
  isGroupLightMaterial ,
  removeGameObject ,
  batchRemoveGameObjects ,
  
}
/* GameObjectsMapGroupService-Wonderjs Not a pure module */
