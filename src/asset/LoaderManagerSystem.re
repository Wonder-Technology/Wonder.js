open StateDataMainType;

open Js.Promise;

let loadConfig = (jsonPathArr, fetchFunc, stateData) =>
  ConfigDataLoaderSystem.load(jsonPathArr, fetchFunc, stateData);

let loadWDB = (wdPath, fetchFunc, state) =>
  LoadWDBSystem.load(wdPath, fetchFunc, state);

let loadIMGUIAsset = (fntFilePath, bitmapFilePath, state) =>
  state.imguiRecord
  |> WonderImgui.IOIMGUIAPI.addFont(fntFilePath, bitmapFilePath)
  |> WonderImgui.IOIMGUIAPI.load
  |> then_(imguiRecord => {...state, imguiRecord} |> resolve);