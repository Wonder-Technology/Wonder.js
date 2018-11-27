

import * as GroupService$Wonderjs from "../../../../primitive/GroupService.js";

function isGroupBasicMaterial(material, record) {
  return GroupService$Wonderjs.isGroup(material, record[/* gameObjectsMap */8]);
}

function removeGameObject(gameObject, material, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* textureIndices */record[/* textureIndices */4],
          /* mapUnits */record[/* mapUnits */5],
          /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */6],
          /* defaultColor */record[/* defaultColor */7],
          /* gameObjectsMap */GroupService$Wonderjs.removeGameObject(gameObject, material, record[/* gameObjectsMap */8]),
          /* disposedIndexArray */record[/* disposedIndexArray */9],
          /* nameMap */record[/* nameMap */10],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */11]
        ];
}

export {
  isGroupBasicMaterial ,
  removeGameObject ,
  
}
/* GroupService-Wonderjs Not a pure module */
