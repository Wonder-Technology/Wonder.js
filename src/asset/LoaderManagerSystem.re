open StateDataMainType;

open Js.Promise;

open WonderBsMost;

let loadConfig = (jsonPathArr, fetchFunc, stateData) =>
  ConfigDataLoaderSystem.load(jsonPathArr, fetchFunc, stateData);

let loadWholeWDB =
    (
      wdbPath,
      (
        isHandleIMGUI,
        isBindEvent,
        isActiveCamera,
        isRenderLight,
        isLoadImage,
      ),
      fetchFunc,
      state,
    ) =>
  LoadWholeWDBSystem.load(
    wdbPath,
    (isHandleIMGUI, isBindEvent, isActiveCamera, isRenderLight, isLoadImage),
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