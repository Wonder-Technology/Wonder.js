open StateDataMainType;

open Js.Promise;

open WonderBsMost;

let loadConfig = (jsonPathArr, fetchFunc, stateData) =>
  ConfigDataLoaderSystem.load(jsonPathArr, fetchFunc, stateData);

let loadWDB = (wdbPath, fetchFunc, state) =>
  LoadWDBSystem.load(wdbPath, fetchFunc, state);

let loadStreamWDB =
    (
      wdbPath,
      (fetchFunc, handleBeforeStartLoopFunc, handleWhenDoneFunc),
      state,
    ) =>
  LoadStreamWDBSystem.load(
    wdbPath,
    (fetchFunc, handleBeforeStartLoopFunc, handleWhenDoneFunc),
    state,
  );

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