open StateDataMainType;

module Button = {
  let button =
    (. (rect, str), showData, state) => {
      let (record, isClick) =
        WonderImgui.ExtendButton.CustomControl.button(.
          (rect, str),
          showData,
          ManageIMGUIMainService.getRecord(state),
        );

      (
        ManageIMGUIMainService.setRecord(record, state),
        isClick |> ExtendIMGUIType.outputDataToBool,
      );
    };
};

module Extend = {
  let registerCustomControl =
      (name, customControlFunc: ExtendIMGUIType.customControlFunc, state) =>
    CustomControlAllIMGUIService.registerCustomControl(
      name,
      customControlFunc,
      ManageIMGUIMainService.getRecord(state),
    )
    |> ManageIMGUIMainService.setRecord(_, state);

  let unsafeGetCustomControl =
    (. name, state) =>
      WonderImgui.ManageCustomControlIMGUIService.unsafeGetCustomControl(.
        name,
        ManageIMGUIMainService.getRecord(state),
      );
};

module ExtendData = {
  open ExtendIMGUIType;

  /* let create = () => {
       customControlData: {
         funcMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
       },
       skinData: {
         allSkinDataMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
       },
     }; */

  let _getExtendData = state => state.imguiRecord.extendData;

  module CustomControl = {
    let getFuncMap = state => _getExtendData(state).customControlData.funcMap;

    let registerCustomControl = (name, customControlFunc, state) => {
      ...state,
      imguiRecord: {
        ...state.imguiRecord,
        extendData: {
          ...state.imguiRecord.extendData,
          customControlData: {
            funcMap:
              getFuncMap(state)
              |> WonderCommonlib.ImmutableHashMapService.set(
                   name,
                   customControlFunc,
                 ),
          },
        },
      },
    };

    let registerAllCustomControlsToWonderImguiIMGUIRecord = state =>
      CustomControlAllIMGUIService.registerAllCustomControlsToWonderImguiIMGUIRecord(
        getFuncMap(state),
        ManageIMGUIMainService.getRecord(state),
      )
      |> ManageIMGUIMainService.setRecord(_, state);
  };

  module Skin = {
    let getAllSkinDataMap = state =>
      _getExtendData(state).skinData.allSkinDataMap;

    let _setAllSkinDataMap = (allSkinDataMap, state) => {
      ...state,
      imguiRecord: {
        ...state.imguiRecord,
        extendData: {
          ...state.imguiRecord.extendData,
          skinData: {
            allSkinDataMap: allSkinDataMap,
          },
        },
      },
    };

    let addSkinData = (skinName, skinData, state) =>
      _setAllSkinDataMap(
        getAllSkinDataMap(state)
        |> WonderImgui.AllSkinDataMapService.addSkinData(skinName, skinData),
        state,
      );

    let removeSkinData = (skinName, state) =>
      _setAllSkinDataMap(
        getAllSkinDataMap(state)
        |> WonderImgui.AllSkinDataMapService.removeSkinData(skinName),
        state,
      );

    let setSkinData = (skinName, skinData, state) =>
      _setAllSkinDataMap(
        getAllSkinDataMap(state)
        |> WonderCommonlib.ImmutableHashMapService.set(skinName, skinData),
        state,
      );

    let mergeAllSkinDataMapsToWonderImguiIMGUIRecord = state =>
      SkinAllIMGUIService.mergeAllSkinDataMapsToWonderImguiIMGUIRecord(
        getAllSkinDataMap(state),
        ManageIMGUIMainService.getRecord(state),
      )
      |> ManageIMGUIMainService.setRecord(_, state);

    let createDefaultSkinData = WonderImgui.DataSkinIMGUIService._createDefaultSkinData;
  };
};