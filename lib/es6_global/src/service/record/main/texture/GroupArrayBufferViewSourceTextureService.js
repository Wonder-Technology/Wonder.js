

import * as GroupTextureService$Wonderjs from "./GroupTextureService.js";

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
          /* widths */record[/* widths */9],
          /* heights */record[/* heights */10],
          /* sourceMap */record[/* sourceMap */11],
          /* glTextureMap */record[/* glTextureMap */12],
          /* bindTextureUnitCacheMap */record[/* bindTextureUnitCacheMap */13],
          /* disposedIndexArray */record[/* disposedIndexArray */14],
          /* needAddedSourceArray */record[/* needAddedSourceArray */15],
          /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */16],
          /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */17],
          /* nameMap */record[/* nameMap */18],
          /* materialsMap */GroupTextureService$Wonderjs.addMaterial(materialData, texture, record[/* materialsMap */19])
        ];
}

function isGroupArrayBufferViewSourceTexture(texture, record) {
  return GroupTextureService$Wonderjs.isGroup(texture, record[/* materialsMap */19]);
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
          /* widths */record[/* widths */9],
          /* heights */record[/* heights */10],
          /* sourceMap */record[/* sourceMap */11],
          /* glTextureMap */record[/* glTextureMap */12],
          /* bindTextureUnitCacheMap */record[/* bindTextureUnitCacheMap */13],
          /* disposedIndexArray */record[/* disposedIndexArray */14],
          /* needAddedSourceArray */record[/* needAddedSourceArray */15],
          /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */16],
          /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */17],
          /* nameMap */record[/* nameMap */18],
          /* materialsMap */GroupTextureService$Wonderjs.removeMaterial(materialData, texture, record[/* materialsMap */19])
        ];
}

export {
  addMaterial ,
  isGroupArrayBufferViewSourceTexture ,
  removeMaterial ,
  
}
/* GroupTextureService-Wonderjs Not a pure module */
