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
      |> WonderCommonlib.ImmutableHashMapService.mapValid((. func) =>
           func |> SerializeService.serializeFunction
         )
      |> Obj.magic
      |> Js.Json.stringify;

    let deserializeFuncMap = funcMap =>
      funcMap
      |> Js.Json.parseExn
      |> Obj.magic
      |> WonderCommonlib.ImmutableHashMapService.mapValid((. funcStr) =>
           funcStr |> SerializeService.deserializeFunction
         );
  };

  module Skin = {
    let serializeAllSkinDataMap = (mainState: StateDataMainType.state) =>
      ExtendIMGUIMainService.ExtendData.Skin.getAllSkinDataMap(mainState)
      |> Obj.magic
      |> Js.Json.stringify;

    let deserializeAllSkinDataMap = allSkinDataMap =>
      allSkinDataMap |> Js.Json.parseExn |> Obj.magic;
  };
};