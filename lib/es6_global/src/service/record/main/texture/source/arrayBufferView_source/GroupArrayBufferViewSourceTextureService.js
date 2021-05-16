

import * as GroupTextureService$Wonderjs from "../../GroupTextureService.js";

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
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* needAddedSourceArray */record[/* needAddedSourceArray */14],
          /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */15],
          /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */16],
          /* nameMap */record[/* nameMap */17],
          /* materialsMap */GroupTextureService$Wonderjs.addMaterial(materialData, texture, record[/* materialsMap */18])
        ];
}

function isGroupArrayBufferViewSourceTexture(texture, record) {
  return GroupTextureService$Wonderjs.isGroup(texture, record[/* materialsMap */18]);
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
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* needAddedSourceArray */record[/* needAddedSourceArray */14],
          /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */15],
          /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */16],
          /* nameMap */record[/* nameMap */17],
          /* materialsMap */GroupTextureService$Wonderjs.removeMaterial(materialData, texture, record[/* materialsMap */18])
        ];
}

export {
  addMaterial ,
  isGroupArrayBufferViewSourceTexture ,
  removeMaterial ,
  
}
/* GroupTextureService-Wonderjs Not a pure module */
