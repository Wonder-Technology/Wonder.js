

import * as OptionService$Wonderjs from "../../../../src/service/atom/OptionService.js";
import * as MapUnitService$Wonderjs from "../../../../src/service/primitive/material/MapUnitService.js";
import * as SourceTextureTool$Wonderjs from "./SourceTextureTool.js";
import * as TextureTypeService$Wonderjs from "../../../../src/service/primitive/texture/TextureTypeService.js";
import * as BufferSourceTextureService$Wonderjs from "../../../../src/service/record/main/texture/BufferSourceTextureService.js";
import * as OperateGlTextureMapService$Wonderjs from "../../../../src/service/primitive/texture/OperateGlTextureMapService.js";
import * as BufferBasicSourceTextureService$Wonderjs from "../../../../src/service/record/main/texture/BufferBasicSourceTextureService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../../../src/service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";
import * as OperateTypeArrayBasicSourceTextureService$Wonderjs from "../../../../src/service/record/all/texture/basic_source/OperateTypeArrayBasicSourceTextureService.js";

function getRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* basicSourceTextureRecord */18]);
}

function unsafeGetTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.unsafeGetTexture(texture, OptionService$Wonderjs.unsafeGet(state[/* basicSourceTextureRecord */18])[/* glTextureMap */10]);
}

function isNeedUpdate(texture, state) {
  return OperateTypeArrayBasicSourceTextureService$Wonderjs.getIsNeedUpdate(texture, OptionService$Wonderjs.unsafeGet(state[/* basicSourceTextureRecord */18])[/* isNeedUpdates */7]) === BufferSourceTextureService$Wonderjs.getNeedUpdate(/* () */0);
}

function getDefaultUnit() {
  return MapUnitService$Wonderjs.getDefaultUnit(/* () */0);
}

function getNearest() {
  return SourceTextureTool$Wonderjs.getNearest(/* () */0);
}

function getNearestMipmapNearest() {
  return SourceTextureTool$Wonderjs.getNearestMipmapNearest(/* () */0);
}

function getLinear() {
  return SourceTextureTool$Wonderjs.getLinear(/* () */0);
}

function getNearestMipmapLinear() {
  return SourceTextureTool$Wonderjs.getNearestMipmapLinear(/* () */0);
}

function getLinearMipmapNearest() {
  return SourceTextureTool$Wonderjs.getLinearMipmapNearest(/* () */0);
}

function getLinearMipmapLinear() {
  return SourceTextureTool$Wonderjs.getLinearMipmapLinear(/* () */0);
}

function getRgb() {
  return /* Rgb */0;
}

function getRgba() {
  return /* Rgba */1;
}

function getAlpha() {
  return /* Alpha */2;
}

function getUnsignedByte() {
  return TextureTypeService$Wonderjs.getUnsignedByte(/* () */0);
}

function getUnsignedShort565() {
  return TextureTypeService$Wonderjs.getUnsignedShort565(/* () */0);
}

function buildSource(width, height) {
  return {
          width: width,
          height: height
        };
}

function getDefaultWrapS() {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultWrapS(/* () */0);
}

function getDefaultWrapT() {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultWrapT(/* () */0);
}

function getDefaultMagFilter() {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultMagFilter(/* () */0);
}

function getDefaultMinFilter() {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultMinFilter(/* () */0);
}

function getDefaultFormat() {
  return /* Rgba */1;
}

function getDefaultType() {
  return TextureTypeService$Wonderjs.getUnsignedByte(/* () */0);
}

function getDefaultIsNeedUpdate() {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
}

function getIsNeedUpdate(texture, state) {
  return OperateBasicSourceTextureMainService$Wonderjs.getIsNeedUpdate(texture, state) === BufferSourceTextureService$Wonderjs.getNeedUpdate(/* () */0);
}

var setIsNeedUpdate = OperateBasicSourceTextureMainService$Wonderjs.setIsNeedUpdate;

var getNeedUpdate = BufferSourceTextureService$Wonderjs.getNeedUpdate;

var getNotNeedUpdate = BufferSourceTextureService$Wonderjs.getNotNeedUpdate;

export {
  getRecord ,
  unsafeGetTexture ,
  isNeedUpdate ,
  getDefaultUnit ,
  getNearest ,
  getNearestMipmapNearest ,
  getLinear ,
  getNearestMipmapLinear ,
  getLinearMipmapNearest ,
  getLinearMipmapLinear ,
  getRgb ,
  getRgba ,
  getAlpha ,
  getUnsignedByte ,
  getUnsignedShort565 ,
  buildSource ,
  getDefaultWrapS ,
  getDefaultWrapT ,
  getDefaultMagFilter ,
  getDefaultMinFilter ,
  getDefaultFormat ,
  getDefaultType ,
  getDefaultIsNeedUpdate ,
  getNeedUpdate ,
  getNotNeedUpdate ,
  getIsNeedUpdate ,
  setIsNeedUpdate ,
  
}
/* OptionService-Wonderjs Not a pure module */
