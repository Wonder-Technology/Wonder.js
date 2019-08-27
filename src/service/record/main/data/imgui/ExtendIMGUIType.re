external outputDataToBool:
  WonderImgui.IMGUIType.customControlFuncOutputData => bool =
  "%identity";

type customControlFunc =
  (
    . WonderImgui.IMGUIType.customControlFuncInputData,
    WonderImgui.IMGUIType.customControlFunctionShowData,
    WonderImgui.IMGUIType.customControlAPIJsObj,
    WonderImgui.IMGUIType.imguiRecord
  ) =>
  (
    WonderImgui.IMGUIType.imguiRecord,
    WonderImgui.IMGUIType.customControlFuncOutputData,
  );

type funcMap = WonderCommonlib.ImmutableHashMapService.t(customControlFunc);

type customControlData = {funcMap};

type skinData = {allSkinDataMap: WonderImgui.SkinType.allSkinDataMap};

type extendData = {
  customControlData,
  skinData,
};