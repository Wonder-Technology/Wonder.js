

import * as GroupTextureService$Wonderjs from "./GroupTextureService.js";
import * as MaterialsMapService$Wonderjs from "./MaterialsMapService.js";

function addMaterial(materialData, texture, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* wrapSs */record[/* wrapSs */1],
          /* wrapTs */record[/* wrapTs */2],
          /* magFilters */record[/* magFilters */3],
          /* minFilters */record[/* minFilters */4],
          /* formats */record[/* formats */5],
          /* types */record[/* types */6],
          /* isNeedUpdates */record[/* isNeedUpdates */7],
          /* flipYs */record[/* flipYs */8],
          /* sourceMap */record[/* sourceMap */9],
          /* glTextureMap */record[/* glTextureMap */10],
          /* bindTextureUnitCacheMap */record[/* bindTextureUnitCacheMap */11],
          /* disposedIndexArray */record[/* disposedIndexArray */12],
          /* needAddedSourceArray */record[/* needAddedSourceArray */13],
          /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */14],
          /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */15],
          /* nameMap */record[/* nameMap */16],
          /* materialsMap */GroupTextureService$Wonderjs.addMaterial(materialData, texture, record[/* materialsMap */17])
        ];
}

function isGroupBasicSourceTexture(texture, record) {
  return GroupTextureService$Wonderjs.isGroup(texture, record[/* materialsMap */17]);
}

function removeMaterial(materialData, texture, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* wrapSs */record[/* wrapSs */1],
          /* wrapTs */record[/* wrapTs */2],
          /* magFilters */record[/* magFilters */3],
          /* minFilters */record[/* minFilters */4],
          /* formats */record[/* formats */5],
          /* types */record[/* types */6],
          /* isNeedUpdates */record[/* isNeedUpdates */7],
          /* flipYs */record[/* flipYs */8],
          /* sourceMap */record[/* sourceMap */9],
          /* glTextureMap */record[/* glTextureMap */10],
          /* bindTextureUnitCacheMap */record[/* bindTextureUnitCacheMap */11],
          /* disposedIndexArray */record[/* disposedIndexArray */12],
          /* needAddedSourceArray */record[/* needAddedSourceArray */13],
          /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */14],
          /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */15],
          /* nameMap */record[/* nameMap */16],
          /* materialsMap */GroupTextureService$Wonderjs.removeMaterial(materialData, texture, record[/* materialsMap */17])
        ];
}

function clearMaterial(texture, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* wrapSs */record[/* wrapSs */1],
          /* wrapTs */record[/* wrapTs */2],
          /* magFilters */record[/* magFilters */3],
          /* minFilters */record[/* minFilters */4],
          /* formats */record[/* formats */5],
          /* types */record[/* types */6],
          /* isNeedUpdates */record[/* isNeedUpdates */7],
          /* flipYs */record[/* flipYs */8],
          /* sourceMap */record[/* sourceMap */9],
          /* glTextureMap */record[/* glTextureMap */10],
          /* bindTextureUnitCacheMap */record[/* bindTextureUnitCacheMap */11],
          /* disposedIndexArray */record[/* disposedIndexArray */12],
          /* needAddedSourceArray */record[/* needAddedSourceArray */13],
          /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */14],
          /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */15],
          /* nameMap */record[/* nameMap */16],
          /* materialsMap */GroupTextureService$Wonderjs.clearMaterial(texture, record[/* materialsMap */17])
        ];
}

function getMaterialDataArr(texture, record) {
  return MaterialsMapService$Wonderjs.getMaterialDataArr(texture, record[/* materialsMap */17]);
}

export {
  addMaterial ,
  isGroupBasicSourceTexture ,
  removeMaterial ,
  clearMaterial ,
  getMaterialDataArr ,
  
}
/* GroupTextureService-Wonderjs Not a pure module */
