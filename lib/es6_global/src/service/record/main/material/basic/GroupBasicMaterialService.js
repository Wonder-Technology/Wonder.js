

import * as GroupService$Wonderjs from "../../../../primitive/GroupService.js";

function isGroupBasicMaterial(material, record) {
  return GroupService$Wonderjs.isGroup(material, record[/* gameObjectsMap */10]);
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
          /* gameObjectsMap */GroupService$Wonderjs.removeGameObject(gameObject, material, record[/* gameObjectsMap */10]),
          /* disposedIndexArray */record[/* disposedIndexArray */11],
          /* nameMap */record[/* nameMap */12],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */13]
        ];
}

export {
  isGroupBasicMaterial ,
  removeGameObject ,
  
}
/* GroupService-Wonderjs Not a pure module */
