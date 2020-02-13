

import * as GenerateSingleRABSystem$Wonderjs from "../../asset_bundle/single/rab/generate/GenerateSingleRABSystem.js";

function buildResourceData(basicMaterials, lightMaterials, textures, geometrys, scriptEventFunctionDataArr, scriptAttributeDataArr, imageDataMap) {
  return /* record */[
          /* basicMaterials */basicMaterials,
          /* lightMaterials */lightMaterials,
          /* textures */textures,
          /* geometrys */geometrys,
          /* scriptEventFunctionDataArr */scriptEventFunctionDataArr,
          /* scriptAttributeDataArr */scriptAttributeDataArr,
          /* imageDataMap */imageDataMap
        ];
}

var generateSingleRAB = GenerateSingleRABSystem$Wonderjs.generateSingleRAB;

export {
  generateSingleRAB ,
  buildResourceData ,
  
}
/* GenerateSingleRABSystem-Wonderjs Not a pure module */
