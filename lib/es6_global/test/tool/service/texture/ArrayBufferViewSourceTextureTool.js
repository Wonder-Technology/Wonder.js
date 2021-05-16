

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OptionService$Wonderjs from "../../../../src/service/atom/OptionService.js";
import * as MaterialsMapService$Wonderjs from "../../../../src/service/record/main/texture/MaterialsMapService.js";
import * as BufferTextureService$Wonderjs from "../../../../src/service/record/main/texture/BufferTextureService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../src/service/primitive/texture/TextureSourceMapService.js";
import * as OperateGlTextureMapService$Wonderjs from "../../../../src/service/primitive/texture/OperateGlTextureMapService.js";
import * as IndexAllSourceTextureService$Wonderjs from "../../../../src/service/record/all/texture/source/IndexAllSourceTextureService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../../../../src/service/state/main/texture/source/IndexSourceTextureMainService.js";
import * as BufferArrayBufferViewSourceTextureService$Wonderjs from "../../../../src/service/record/main/texture/source/arrayBufferView_source/BufferArrayBufferViewSourceTextureService.js";
import * as NameArrayBufferViewSourceTextureMainService$Wonderjs from "../../../../src/service/state/main/texture/source/arrayBufferView_source/NameArrayBufferViewSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../../../../src/service/state/main/texture/source/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";
import * as OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs from "../../../../src/service/record/all/texture/source/arrayBufferView_source/OperateTypeArrayAllArrayBufferViewSourceTextureService.js";

function getRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19]);
}

var generateArrayBufferViewSourceTextureIndex = IndexSourceTextureMainService$Wonderjs.generateArrayBufferViewSourceTextureIndex;

function isNeedUpdate(texture, state) {
  return OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getIsNeedUpdate(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19])[/* isNeedUpdates */7]) === BufferTextureService$Wonderjs.getNeedUpdate(/* () */0);
}

function buildSource(param) {
  return new Uint8Array(/* array */[
              1,
              255,
              255,
              255
            ]);
}

function buildSource2(param) {
  return new Uint8Array(/* array */[
              2,
              255,
              255,
              100
            ]);
}

function getDefaultWrapS(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWrapS(/* () */0);
}

function getDefaultWrapT(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWrapT(/* () */0);
}

function getDefaultMagFilter(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultMagFilter(/* () */0);
}

function getDefaultMinFilter(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultMinFilter(/* () */0);
}

function getDefaultFormat(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultFormat(/* () */0);
}

function getDefaultType(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultType(/* () */0);
}

function getDefaultIsNeedUpdate(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
}

function getDefaultWidth(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWidth(/* () */0);
}

function getDefaultHeight(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultHeight(/* () */0);
}

function getMaterialDataArr(texture, state) {
  return MaterialsMapService$Wonderjs.getMaterialDataArr(texture, RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* materialsMap */18]);
}

function unsafeGetMaterialDataArr(texture, state) {
  return OptionService$Wonderjs.unsafeGet(getMaterialDataArr(texture, state));
}

function getNeedAddedSourceArray(state) {
  return RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* needAddedSourceArray */14];
}

function getNeedInitedTextureIndexArray(state) {
  return RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* needInitedTextureIndexArray */15];
}

function getArrayBufferViewSourceTextureSource(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.getSource(texture, match[/* sourceMap */11]);
}

function getTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.getTexture(texture, OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19])[/* glTextureMap */12]);
}

function unsafeGetTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.unsafeGetTexture(texture, OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19])[/* glTextureMap */12]);
}

function setGlTexture(texture, glTexture, state) {
  OperateGlTextureMapService$Wonderjs.setTexture(texture, glTexture, OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19])[/* glTextureMap */12]);
  return state;
}

var getArrayBufferViewSourceTextureName = NameArrayBufferViewSourceTextureMainService$Wonderjs.getName;

function hasMaterial(texture, material, state) {
  var match = MaterialsMapService$Wonderjs.getMaterialDataArr(texture, RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* materialsMap */18]);
  if (match !== undefined) {
    return Js_option.isSome(Caml_option.undefined_to_opt(match.find((function (param) {
                          return param[0] === material;
                        }))));
  } else {
    return false;
  }
}

export {
  getRecord ,
  generateArrayBufferViewSourceTextureIndex ,
  isNeedUpdate ,
  buildSource ,
  buildSource2 ,
  getDefaultWrapS ,
  getDefaultWrapT ,
  getDefaultMagFilter ,
  getDefaultMinFilter ,
  getDefaultFormat ,
  getDefaultType ,
  getDefaultIsNeedUpdate ,
  getDefaultWidth ,
  getDefaultHeight ,
  getMaterialDataArr ,
  unsafeGetMaterialDataArr ,
  getNeedAddedSourceArray ,
  getNeedInitedTextureIndexArray ,
  getArrayBufferViewSourceTextureSource ,
  getTexture ,
  unsafeGetTexture ,
  setGlTexture ,
  getArrayBufferViewSourceTextureName ,
  hasMaterial ,
  
}
/* OptionService-Wonderjs Not a pure module */
