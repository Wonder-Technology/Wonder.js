

import * as GetAllComponentService$Wonderjs from "../../service/primitive/component/GetAllComponentService.js";
import * as NameBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/NameBasicSourceTextureMainService.js";
import * as CreateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/CreateBasicSourceTextureMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/RecordBasicSourceTextureMainService.js";
import * as DisposeBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/DisposeBasicSourceTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";

function createBasicSourceTexture(state) {
  return CreateBasicSourceTextureMainService$Wonderjs.create(state);
}

var unsafeGetBasicSourceTextureSource = OperateBasicSourceTextureMainService$Wonderjs.unsafeGetSource;

var setBasicSourceTextureSource = OperateBasicSourceTextureMainService$Wonderjs.setSource;

var getBasicSourceTextureWidth = OperateBasicSourceTextureMainService$Wonderjs.getWidth;

var getBasicSourceTextureHeight = OperateBasicSourceTextureMainService$Wonderjs.getHeight;

var getBasicSourceTextureWrapS = OperateBasicSourceTextureMainService$Wonderjs.getWrapS;

var setBasicSourceTextureWrapS = OperateBasicSourceTextureMainService$Wonderjs.setWrapS;

var getBasicSourceTextureWrapT = OperateBasicSourceTextureMainService$Wonderjs.getWrapT;

var setBasicSourceTextureWrapT = OperateBasicSourceTextureMainService$Wonderjs.setWrapT;

var getBasicSourceTextureMagFilter = OperateBasicSourceTextureMainService$Wonderjs.getMagFilter;

var setBasicSourceTextureMagFilter = OperateBasicSourceTextureMainService$Wonderjs.setMagFilter;

var getBasicSourceTextureMinFilter = OperateBasicSourceTextureMainService$Wonderjs.getMinFilter;

var setBasicSourceTextureMinFilter = OperateBasicSourceTextureMainService$Wonderjs.setMinFilter;

var getBasicSourceTextureFormat = OperateBasicSourceTextureMainService$Wonderjs.getFormat;

var setBasicSourceTextureFormat = OperateBasicSourceTextureMainService$Wonderjs.setFormat;

var getBasicSourceTextureType = OperateBasicSourceTextureMainService$Wonderjs.getType;

var setBasicSourceTextureType = OperateBasicSourceTextureMainService$Wonderjs.setType;

var getBasicSourceTextureFlipY = OperateBasicSourceTextureMainService$Wonderjs.getFlipY;

var setBasicSourceTextureFlipY = OperateBasicSourceTextureMainService$Wonderjs.setFlipY;

var getBasicSourceTextureName = NameBasicSourceTextureMainService$Wonderjs.getName;

var unsafeGetBasicSourceTextureName = NameBasicSourceTextureMainService$Wonderjs.unsafeGetName;

var setBasicSourceTextureName = NameBasicSourceTextureMainService$Wonderjs.setName;

function getAllTextures(state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return GetAllComponentService$Wonderjs.getAllComponents(match[/* index */0], match[/* disposedIndexArray */12]);
}

var disposeBasicSourceTexture = DisposeBasicSourceTextureMainService$Wonderjs.handleDisposeTexture;

export {
  createBasicSourceTexture ,
  unsafeGetBasicSourceTextureSource ,
  setBasicSourceTextureSource ,
  getBasicSourceTextureWidth ,
  getBasicSourceTextureHeight ,
  getBasicSourceTextureWrapS ,
  setBasicSourceTextureWrapS ,
  getBasicSourceTextureWrapT ,
  setBasicSourceTextureWrapT ,
  getBasicSourceTextureMagFilter ,
  setBasicSourceTextureMagFilter ,
  getBasicSourceTextureMinFilter ,
  setBasicSourceTextureMinFilter ,
  getBasicSourceTextureFormat ,
  setBasicSourceTextureFormat ,
  getBasicSourceTextureType ,
  setBasicSourceTextureType ,
  getBasicSourceTextureFlipY ,
  setBasicSourceTextureFlipY ,
  getBasicSourceTextureName ,
  unsafeGetBasicSourceTextureName ,
  setBasicSourceTextureName ,
  getAllTextures ,
  disposeBasicSourceTexture ,
  
}
/* GetAllComponentService-Wonderjs Not a pure module */
