

import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as LoaderManagerSystem$Wonderjs from "../../asset/LoaderManagerSystem.js";

function _fetch(filePath) {
  return fetch(filePath);
}

function loadConfig(jsonPathArr) {
  return LoaderManagerSystem$Wonderjs.loadConfig(jsonPathArr, _fetch, StateDataMain$Wonderjs.stateData);
}

function loadWholeWDB(wdbPath, isSetIMGUIFunc, isBindEvent, isActiveCamera, isRenderLight, isLoadImage, handleWhenLoadingFunc, state) {
  return LoaderManagerSystem$Wonderjs.loadWholeWDB(wdbPath, /* tuple */[
              isSetIMGUIFunc,
              isBindEvent,
              isActiveCamera,
              isRenderLight,
              isLoadImage
            ], /* tuple */[
              _fetch,
              handleWhenLoadingFunc
            ], state);
}

function loadStreamWDB(wdbPath, handleWhenLoadingFunc, handleBeforeStartLoopFunc, handleWhenDoneFunc, handleWhenLoadWholeWDBFunc, state) {
  return LoaderManagerSystem$Wonderjs.loadStreamWDB(wdbPath, /* tuple */[
              _fetch,
              handleWhenLoadingFunc,
              handleBeforeStartLoopFunc,
              handleWhenDoneFunc,
              handleWhenLoadWholeWDBFunc
            ], state);
}

function loadIMGUIAsset(fntFilePath, bitmapFilePath, customTextureSourceDataArr, handleWhenLoadingFunc, state) {
  return LoaderManagerSystem$Wonderjs.loadIMGUIAsset(/* tuple */[
              fntFilePath,
              bitmapFilePath
            ], customTextureSourceDataArr, /* tuple */[
              _fetch,
              handleWhenLoadingFunc
            ], state);
}

export {
  _fetch ,
  loadConfig ,
  loadWholeWDB ,
  loadStreamWDB ,
  loadIMGUIAsset ,
  
}
/* StateDataMain-Wonderjs Not a pure module */
