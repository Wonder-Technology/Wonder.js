

import * as GroupTextureService$Wonderjs from "../../GroupTextureService.js";
import * as MaterialsMapService$Wonderjs from "../../MaterialsMapService.js";

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
          /* disposedIndexArray */record[/* disposedIndexArray */11],
          /* needAddedSourceArray */record[/* needAddedSourceArray */12],
          /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */13],
          /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */14],
          /* nameMap */record[/* nameMap */15],
          /* materialsMap */GroupTextureService$Wonderjs.addMaterial(materialData, texture, record[/* materialsMap */16])
        ];
}

function isGroupBasicSourceTexture(texture, record) {
  return GroupTextureService$Wonderjs.isGroup(texture, record[/* materialsMap */16]);
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
          /* disposedIndexArray */record[/* disposedIndexArray */11],
          /* needAddedSourceArray */record[/* needAddedSourceArray */12],
          /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */13],
          /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */14],
          /* nameMap */record[/* nameMap */15],
          /* materialsMap */GroupTextureService$Wonderjs.removeMaterial(materialData, texture, record[/* materialsMap */16])
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
          /* disposedIndexArray */record[/* disposedIndexArray */11],
          /* needAddedSourceArray */record[/* needAddedSourceArray */12],
          /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */13],
          /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */14],
          /* nameMap */record[/* nameMap */15],
          /* materialsMap */GroupTextureService$Wonderjs.clearMaterial(texture, record[/* materialsMap */16])
        ];
}

function getMaterialDataArr(texture, record) {
  return MaterialsMapService$Wonderjs.getMaterialDataArr(texture, record[/* materialsMap */16]);
}

export {
  addMaterial ,
  isGroupBasicSourceTexture ,
  removeMaterial ,
  clearMaterial ,
  getMaterialDataArr ,
  
}
/* GroupTextureService-Wonderjs Not a pure module */
