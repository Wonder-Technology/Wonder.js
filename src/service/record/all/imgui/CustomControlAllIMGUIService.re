let registerCustomControl = WonderImgui.ExtendIMGUIAPI.registerCustomControl;

let registerAllCustomControlsToWonderImguiIMGUIRecord =
    (
      funcMap: ExtendIMGUIType.funcMap,
      imguiRecord: WonderImgui.IMGUIType.imguiRecord,
    ) =>
  funcMap
  |> WonderCommonlib.ImmutableHashMapService.getValidEntries
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. imguiRecord, (name, customControlFunc)) =>
         registerCustomControl(name, customControlFunc, imguiRecord),
       imguiRecord,
     );