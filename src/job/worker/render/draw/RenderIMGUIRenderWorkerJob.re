open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);

    let data = MessageService.getRecord(e);
    let imguiData = data##imguiData;

    imguiData##imguiFunc |> OptionService.isJsonSerializedValueNone ?
      e :
      {
        let imguiRecord =
          RecordIMGUIRenderWorkerService.getRecord(state)
          |> WonderImgui.ManageIMGUIAPI.setIMGUIFunc(
               imguiData##customData
               |> OptionService.unsafeGetJsonSerializedValue,
               imguiData##imguiFunc
               |> OptionService.unsafeGetJsonSerializedValue
               |> SerializeService.deserializeFunction,
             )
          |> WonderImgui.ManageIMGUIAPI.render(
               DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
               (imguiData##canvasWidth, imguiData##canvasHeight),
             );

        state.imguiRecord = imguiRecord;
        state |> StateRenderWorkerService.setState(stateData);

        e;
      };
  });