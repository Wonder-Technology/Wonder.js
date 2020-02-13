

import * as GameObjectsMapGroupService$Wonderjs from "../../../../primitive/GameObjectsMapGroupService.js";

function isGroupBasicMaterial(material, record) {
  return GameObjectsMapGroupService$Wonderjs.isGroup(material, record[/* gameObjectsMap */10]);
}

function removeGameObject(gameObject, material, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* textureIndices */record[/* textureIndices */4],
          /* mapUnits */record[/* mapUnits */5],
          /* isDepthTests */record[/* isDepthTests */6],
          /* alphas */record[/* alphas */7],
          /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */8],
          /* defaultColor */record[/* defaultColor */9],
          /* gameObjectsMap */GameObjectsMapGroupService$Wonderjs.removeGameObject(gameObject, material, record[/* gameObjectsMap */10]),
          /* disposedIndexArray */record[/* disposedIndexArray */11],
          /* nameMap */record[/* nameMap */12],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */13]
        ];
}

function batchRemoveGameObjects(gameObjectArr, material, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* textureIndices */record[/* textureIndices */4],
          /* mapUnits */record[/* mapUnits */5],
          /* isDepthTests */record[/* isDepthTests */6],
          /* alphas */record[/* alphas */7],
          /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */8],
          /* defaultColor */record[/* defaultColor */9],
          /* gameObjectsMap */GameObjectsMapGroupService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, record[/* gameObjectsMap */10]),
          /* disposedIndexArray */record[/* disposedIndexArray */11],
          /* nameMap */record[/* nameMap */12],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */13]
        ];
}

export {
  isGroupBasicMaterial ,
  removeGameObject ,
  batchRemoveGameObjects ,
  
}
/* GameObjectsMapGroupService-Wonderjs Not a pure module */
