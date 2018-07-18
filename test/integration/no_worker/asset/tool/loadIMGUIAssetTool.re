open StateDataMainType;

open Js.Promise;

let loadIMGUIAsset =
    (
      fntFilePath,
      bitmapFilePath,
      customTextureSourceDataArr,
      fetchFunc,
      state,
    ) =>
  state.imguiRecord
  |> WonderImgui.IOIMGUIAPI.addFont(fntFilePath, bitmapFilePath)
  |> WonderImgui.AssetIMGUIService.load(
       customTextureSourceDataArr,
       fetchFunc,
     )
  |> then_(imguiRecord => {...state, imguiRecord} |> resolve);