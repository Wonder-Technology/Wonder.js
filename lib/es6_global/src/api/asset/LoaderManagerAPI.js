

import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as LoaderManagerSystem$Wonderjs from "../../asset/LoaderManagerSystem.js";

function _fetch(filePath) {
  return fetch(filePath);
}

function loadConfig(jsonPathArr) {
  return LoaderManagerSystem$Wonderjs.loadConfig(jsonPathArr, _fetch, StateDataMain$Wonderjs.stateData);
}

function loadWDB(wdPath, state) {
  return LoaderManagerSystem$Wonderjs.loadWDB(wdPath, _fetch, state);
}

function loadIMGUIAsset(fntFilePath, bitmapFilePath, customTextureSourceDataArr, state) {
  return LoaderManagerSystem$Wonderjs.loadIMGUIAsset(/* tuple */[
              fntFilePath,
              bitmapFilePath
            ], customTextureSourceDataArr, _fetch, state);
}

export {
  _fetch ,
  loadConfig ,
  loadWDB ,
  loadIMGUIAsset ,
  
}
/* StateDataMain-Wonderjs Not a pure module */
