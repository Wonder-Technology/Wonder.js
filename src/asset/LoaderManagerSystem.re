open StateDataMainType;

open Js.Promise;

open WonderBsMost;

let loadConfig = (jsonPathArr, fetchFunc, stateData) =>
  ConfigDataLoaderSystem.load(jsonPathArr, fetchFunc, stateData);

let loadWholeWDB =
    (
      wdbPath,
      (isSetIMGUIFunc, isBindEvent, isActiveCamera, isRenderLight),
      fetchFunc,
      state,
    ) =>
  LoadWholeWDBSystem.load(
    wdbPath,
    (isSetIMGUIFunc, isBindEvent, isActiveCamera, isRenderLight),
    fetchFunc,
    state,
  );

let loadStreamWDB = (wdbPath, funcTuple, state) =>
  LoadStreamWDBSystem.load(wdbPath, funcTuple, state);

let loadIMGUIAsset =
    (
      (fntFilePath, bitmapFilePath),
      customTextureSourceDataArr,
      (fetchFunc, handleWhenLoadingFunc),
      state,
    ) =>
  RecordIMGUIMainService.getWonderIMGUIRecord(state)
  |> WonderImgui.IOIMGUIAPI.addFont(fntFilePath, bitmapFilePath)
  |> WonderImgui.IOIMGUIAPI.load(
       customTextureSourceDataArr,
       handleWhenLoadingFunc,
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