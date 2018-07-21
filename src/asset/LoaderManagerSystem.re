open StateDataMainType;

open Js.Promise;

open WonderBsMost;

let loadConfig = (jsonPathArr, fetchFunc, stateData) =>
  ConfigDataLoaderSystem.load(jsonPathArr, fetchFunc, stateData);

let loadWDB = (wdPath, fetchFunc, state) =>
  LoadWDBSystem.load(wdPath, fetchFunc, state);

let loadIMGUIAsset =
    (
      (fntFilePath, bitmapFilePath),
      customTextureSourceDataArr,
      fetchFunc,
      state,
    ) =>
  RecordIMGUIMainService.getWonderIMGUIRecord(state)
  |> WonderImgui.IOIMGUIAPI.addFont(fntFilePath, bitmapFilePath)
  |> WonderImgui.IOIMGUIAPI.load(customTextureSourceDataArr)
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