

import * as FetchCommon$Wonderjs from "../../asset/FetchCommon.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as LoaderManagerSystem$Wonderjs from "../../asset/LoaderManagerSystem.js";

function loadConfig(jsonPathArr) {
  return LoaderManagerSystem$Wonderjs.loadConfig(jsonPathArr, FetchCommon$Wonderjs.fetch, StateDataMain$Wonderjs.stateData);
}

function loadWholeWDB(wdbPath, isHandleIMGUI, isBindEvent, isActiveCamera, isRenderLight, isLoadImage, handleWhenLoadingFunc, state) {
  return LoaderManagerSystem$Wonderjs.loadWholeWDB(wdbPath, /* tuple */[
              isHandleIMGUI,
              isBindEvent,
              isActiveCamera,
              isRenderLight,
              isLoadImage
            ], /* tuple */[
              FetchCommon$Wonderjs.fetch,
              handleWhenLoadingFunc
            ], state);
}

function loadStreamWDB(wdbPath, handleWhenLoadingFunc, handleBeforeStartLoopFunc, handleWhenDoneFunc, handleWhenLoadWholeWDBFunc, state) {
  return LoaderManagerSystem$Wonderjs.loadStreamWDB(wdbPath, /* tuple */[
              FetchCommon$Wonderjs.fetch,
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
              FetchCommon$Wonderjs.fetch,
              handleWhenLoadingFunc
            ], state);
}

var _fetch = FetchCommon$Wonderjs.fetch;

export {
  _fetch ,
  loadConfig ,
  loadWholeWDB ,
  loadStreamWDB ,
  loadIMGUIAsset ,
  
}
/* FetchCommon-Wonderjs Not a pure module */
