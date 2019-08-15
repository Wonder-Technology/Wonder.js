module Button = {
  let button =
    (.
      (rect, str),
      showData,
      renderWorkerState: StateDataRenderWorkerType.renderWorkerState,
    ) => {
      let (record, isClick) =
        WonderImgui.ExtendButton.CustomControl.button(.
          (rect, str),
          showData,
          ManageIMGUIRenderWorkerService.getRecord(renderWorkerState),
        );

      (
        ManageIMGUIRenderWorkerService.setRecord(record, renderWorkerState),
        isClick |> ExtendIMGUIType.outputDataToBool,
      );
    };
};

module Extend = {
  let unsafeGetCustomControl =
    (. name, renderWorkerState: StateDataRenderWorkerType.renderWorkerState) =>
      WonderImgui.ManageCustomControlIMGUIService.unsafeGetCustomControl(.
        name,
        ManageIMGUIRenderWorkerService.getRecord(renderWorkerState),
      );
};

module ExtendData = {
  module CustomControl = {
    let serializeFuncMap = (mainState: StateDataMainType.state) =>
      ExtendIMGUIMainService.ExtendData.CustomControl.getFuncMap(mainState)
      |> SerializeService.serializeValueWithFunction;

    let deserializeFuncMap = funcMap =>
      funcMap |> SerializeService.deserializeValueWithFunction;
  };

  module Skin = {
    let serializeAllSkinDataMap = (mainState: StateDataMainType.state) =>
      ExtendIMGUIMainService.ExtendData.Skin.getAllSkinDataMap(mainState);

    let deserializeAllSkinDataMap = allSkinDataMap => allSkinDataMap;
  };
};