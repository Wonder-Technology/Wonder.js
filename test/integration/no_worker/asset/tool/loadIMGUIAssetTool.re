open StateDataMainType;

open Js.Promise;

let loadIMGUIAsset = (fntFilePath, bitmapFilePath, fetchFunc, state) =>
  state.imguiRecord
  |> WonderImgui.IOIMGUIAPI.addFont(fntFilePath, bitmapFilePath)
  |> WonderImgui.FontIMGUIService.load(fetchFunc)
  |> then_(imguiRecord => {...state, imguiRecord} |> resolve);