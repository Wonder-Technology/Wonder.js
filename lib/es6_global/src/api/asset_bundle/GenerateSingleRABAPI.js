

import * as GenerateSingleRABSystem$Wonderjs from "../../asset_bundle/single/rab/generate/GenerateSingleRABSystem.js";

function buildResourceData(basicMaterials, lightMaterials, basicSourceTextures, cubemapTextures, geometrys, scriptEventFunctionDataArr, scriptAttributeDataArr, basicSourceTextureImageDataMap, cubemapTextureImageDataMap) {
  return /* record */[
          /* basicMaterials */basicMaterials,
          /* lightMaterials */lightMaterials,
          /* basicSourceTextures */basicSourceTextures,
          /* cubemapTextures */cubemapTextures,
          /* geometrys */geometrys,
          /* scriptEventFunctionDataArr */scriptEventFunctionDataArr,
          /* scriptAttributeDataArr */scriptAttributeDataArr,
          /* basicSourceTextureImageDataMap */basicSourceTextureImageDataMap,
          /* cubemapTextureImageDataMap */cubemapTextureImageDataMap
        ];
}

var generateSingleRAB = GenerateSingleRABSystem$Wonderjs.generateSingleRAB;

export {
  generateSingleRAB ,
  buildResourceData ,
  
}
/* GenerateSingleRABSystem-Wonderjs Not a pure module */
