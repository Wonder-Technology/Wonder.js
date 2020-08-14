

import * as BufferTextureService$Wonderjs from "../../service/record/main/texture/BufferTextureService.js";
import * as GetAllComponentService$Wonderjs from "../../service/primitive/component/GetAllComponentService.js";
import * as InitCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/InitCubemapTextureMainService.js";
import * as NameCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/NameCubemapTextureMainService.js";
import * as CreateCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/CreateCubemapTextureMainService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/RecordCubemapTextureMainService.js";
import * as DisposeCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/DisposeCubemapTextureMainService.js";
import * as OperateCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/OperateCubemapTextureMainService.js";

function createCubemapTexture(state) {
  return CreateCubemapTextureMainService$Wonderjs.create(state);
}

var unsafeGetCubemapTexturePXSource = OperateCubemapTextureMainService$Wonderjs.unsafeGetPXSource;

var setCubemapTexturePXSource = OperateCubemapTextureMainService$Wonderjs.setPXSource;

var unsafeGetCubemapTextureNXSource = OperateCubemapTextureMainService$Wonderjs.unsafeGetNXSource;

var setCubemapTextureNXSource = OperateCubemapTextureMainService$Wonderjs.setNXSource;

var unsafeGetCubemapTexturePYSource = OperateCubemapTextureMainService$Wonderjs.unsafeGetPYSource;

var setCubemapTexturePYSource = OperateCubemapTextureMainService$Wonderjs.setPYSource;

var unsafeGetCubemapTextureNYSource = OperateCubemapTextureMainService$Wonderjs.unsafeGetNYSource;

var setCubemapTextureNYSource = OperateCubemapTextureMainService$Wonderjs.setNYSource;

var unsafeGetCubemapTexturePZSource = OperateCubemapTextureMainService$Wonderjs.unsafeGetPZSource;

var setCubemapTexturePZSource = OperateCubemapTextureMainService$Wonderjs.setPZSource;

var unsafeGetCubemapTextureNZSource = OperateCubemapTextureMainService$Wonderjs.unsafeGetNZSource;

var setCubemapTextureNZSource = OperateCubemapTextureMainService$Wonderjs.setNZSource;

var getCubemapTextureWrapS = OperateCubemapTextureMainService$Wonderjs.getWrapS;

var setCubemapTextureWrapS = OperateCubemapTextureMainService$Wonderjs.setWrapS;

var getCubemapTextureWrapT = OperateCubemapTextureMainService$Wonderjs.getWrapT;

var setCubemapTextureWrapT = OperateCubemapTextureMainService$Wonderjs.setWrapT;

var getCubemapTextureMagFilter = OperateCubemapTextureMainService$Wonderjs.getMagFilter;

var setCubemapTextureMagFilter = OperateCubemapTextureMainService$Wonderjs.setMagFilter;

var getCubemapTextureMinFilter = OperateCubemapTextureMainService$Wonderjs.getMinFilter;

var setCubemapTextureMinFilter = OperateCubemapTextureMainService$Wonderjs.setMinFilter;

var getCubemapTexturePXFormat = OperateCubemapTextureMainService$Wonderjs.getPXFormat;

var setCubemapTexturePXFormat = OperateCubemapTextureMainService$Wonderjs.setPXFormat;

var getCubemapTextureNXFormat = OperateCubemapTextureMainService$Wonderjs.getNXFormat;

var setCubemapTextureNXFormat = OperateCubemapTextureMainService$Wonderjs.setNXFormat;

var getCubemapTexturePYFormat = OperateCubemapTextureMainService$Wonderjs.getPYFormat;

var setCubemapTexturePYFormat = OperateCubemapTextureMainService$Wonderjs.setPYFormat;

var getCubemapTextureNYFormat = OperateCubemapTextureMainService$Wonderjs.getNYFormat;

var setCubemapTextureNYFormat = OperateCubemapTextureMainService$Wonderjs.setNYFormat;

var getCubemapTexturePZFormat = OperateCubemapTextureMainService$Wonderjs.getPZFormat;

var setCubemapTexturePZFormat = OperateCubemapTextureMainService$Wonderjs.setPZFormat;

var getCubemapTextureNZFormat = OperateCubemapTextureMainService$Wonderjs.getNZFormat;

var setCubemapTextureNZFormat = OperateCubemapTextureMainService$Wonderjs.setNZFormat;

var getCubemapTexturePXType = OperateCubemapTextureMainService$Wonderjs.getPXType;

var setCubemapTexturePXType = OperateCubemapTextureMainService$Wonderjs.setPXType;

var getCubemapTextureNXType = OperateCubemapTextureMainService$Wonderjs.getNXType;

var setCubemapTextureNXType = OperateCubemapTextureMainService$Wonderjs.setNXType;

var getCubemapTexturePYType = OperateCubemapTextureMainService$Wonderjs.getPYType;

var setCubemapTexturePYType = OperateCubemapTextureMainService$Wonderjs.setPYType;

var getCubemapTextureNYType = OperateCubemapTextureMainService$Wonderjs.getNYType;

var setCubemapTextureNYType = OperateCubemapTextureMainService$Wonderjs.setNYType;

var getCubemapTexturePZType = OperateCubemapTextureMainService$Wonderjs.getPZType;

var setCubemapTexturePZType = OperateCubemapTextureMainService$Wonderjs.setPZType;

var getCubemapTextureNZType = OperateCubemapTextureMainService$Wonderjs.getNZType;

var setCubemapTextureNZType = OperateCubemapTextureMainService$Wonderjs.setNZType;

var getCubemapTextureFlipY = OperateCubemapTextureMainService$Wonderjs.getFlipY;

var setCubemapTextureFlipY = OperateCubemapTextureMainService$Wonderjs.setFlipY;

var getCubemapTextureName = NameCubemapTextureMainService$Wonderjs.getName;

var unsafeGetCubemapTextureName = NameCubemapTextureMainService$Wonderjs.unsafeGetName;

var setCubemapTextureName = NameCubemapTextureMainService$Wonderjs.setName;

function getCubemapTextureIsNeedUpdate(texture, state) {
  return OperateCubemapTextureMainService$Wonderjs.getIsNeedUpdate(texture, state) === BufferTextureService$Wonderjs.getNeedUpdate(/* () */0);
}

function setCubemapTextureIsNeedUpdate(texture, isNeedUpdate, state) {
  return OperateCubemapTextureMainService$Wonderjs.setIsNeedUpdate(texture, isNeedUpdate ? BufferTextureService$Wonderjs.getNeedUpdate(/* () */0) : BufferTextureService$Wonderjs.getNotNeedUpdate(/* () */0), state);
}

function getAllTextures(state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return GetAllComponentService$Wonderjs.getAllComponents(match[/* index */0], match[/* disposedIndexArray */27]);
}

var disposeCubemapTexture = DisposeCubemapTextureMainService$Wonderjs.handleDisposeTexture;

var initCubemapTexture = InitCubemapTextureMainService$Wonderjs.initTexture;

export {
  createCubemapTexture ,
  unsafeGetCubemapTexturePXSource ,
  setCubemapTexturePXSource ,
  unsafeGetCubemapTextureNXSource ,
  setCubemapTextureNXSource ,
  unsafeGetCubemapTexturePYSource ,
  setCubemapTexturePYSource ,
  unsafeGetCubemapTextureNYSource ,
  setCubemapTextureNYSource ,
  unsafeGetCubemapTexturePZSource ,
  setCubemapTexturePZSource ,
  unsafeGetCubemapTextureNZSource ,
  setCubemapTextureNZSource ,
  getCubemapTextureWrapS ,
  setCubemapTextureWrapS ,
  getCubemapTextureWrapT ,
  setCubemapTextureWrapT ,
  getCubemapTextureMagFilter ,
  setCubemapTextureMagFilter ,
  getCubemapTextureMinFilter ,
  setCubemapTextureMinFilter ,
  getCubemapTexturePXFormat ,
  setCubemapTexturePXFormat ,
  getCubemapTextureNXFormat ,
  setCubemapTextureNXFormat ,
  getCubemapTexturePYFormat ,
  setCubemapTexturePYFormat ,
  getCubemapTextureNYFormat ,
  setCubemapTextureNYFormat ,
  getCubemapTexturePZFormat ,
  setCubemapTexturePZFormat ,
  getCubemapTextureNZFormat ,
  setCubemapTextureNZFormat ,
  getCubemapTexturePXType ,
  setCubemapTexturePXType ,
  getCubemapTextureNXType ,
  setCubemapTextureNXType ,
  getCubemapTexturePYType ,
  setCubemapTexturePYType ,
  getCubemapTextureNYType ,
  setCubemapTextureNYType ,
  getCubemapTexturePZType ,
  setCubemapTexturePZType ,
  getCubemapTextureNZType ,
  setCubemapTextureNZType ,
  getCubemapTextureFlipY ,
  setCubemapTextureFlipY ,
  getCubemapTextureName ,
  unsafeGetCubemapTextureName ,
  setCubemapTextureName ,
  getCubemapTextureIsNeedUpdate ,
  setCubemapTextureIsNeedUpdate ,
  getAllTextures ,
  disposeCubemapTexture ,
  initCubemapTexture ,
  
}
/* GetAllComponentService-Wonderjs Not a pure module */
