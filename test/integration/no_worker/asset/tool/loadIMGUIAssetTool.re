open StateDataMainType;

open Js.Promise;

let loadIMGUIAsset =
    (
      fntFilePath,
      bitmapFilePath,
      customTextureSourceDataArr,
      (fetchFunc, handleWhenLoadingFunc),
      state,
    ) =>
  RecordIMGUIMainService.getWonderIMGUIRecord(state)
  |> WonderImgui.IOIMGUIAPI.addFont(fntFilePath, bitmapFilePath)
  |> WonderImgui.AssetIMGUIService.LoadAsset.load(
       customTextureSourceDataArr,
       (fetchFunc, handleWhenLoadingFunc),
     )
  |> then_(imguiRecord =>
       {
         ...state,
         imguiRecord: {
           ...state.imguiRecord,
           wonderImguiIMGUIRecord: imguiRecord,
         },
       }
       |> resolve
     );