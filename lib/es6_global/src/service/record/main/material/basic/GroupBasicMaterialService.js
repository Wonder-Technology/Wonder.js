

import * as GameObjectsMapGroupService$Wonderjs from "../../../../primitive/GameObjectsMapGroupService.js";

function isGroupBasicMaterial(material, record) {
  return GameObjectsMapGroupService$Wonderjs.isGroup(material, record[/* gameObjectsMap */7]);
}

function removeGameObject(gameObject, material, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* isDepthTests */record[/* isDepthTests */4],
          /* alphas */record[/* alphas */5],
          /* defaultColor */record[/* defaultColor */6],
          /* gameObjectsMap */GameObjectsMapGroupService$Wonderjs.removeGameObject(gameObject, material, record[/* gameObjectsMap */7]),
          /* disposedIndexArray */record[/* disposedIndexArray */8],
          /* nameMap */record[/* nameMap */9],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */10]
        ];
}

function batchRemoveGameObjects(gameObjectArr, material, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* isDepthTests */record[/* isDepthTests */4],
          /* alphas */record[/* alphas */5],
          /* defaultColor */record[/* defaultColor */6],
          /* gameObjectsMap */GameObjectsMapGroupService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, record[/* gameObjectsMap */7]),
          /* disposedIndexArray */record[/* disposedIndexArray */8],
          /* nameMap */record[/* nameMap */9],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */10]
        ];
}

export {
  isGroupBasicMaterial ,
  removeGameObject ,
  batchRemoveGameObjects ,
  
}
/* GameObjectsMapGroupService-Wonderjs Not a pure module */
