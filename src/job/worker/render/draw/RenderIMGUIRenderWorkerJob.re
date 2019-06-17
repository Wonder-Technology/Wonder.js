open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);

    let data = MessageService.getRecord(e);
    let imguiData = data##imguiData;

    let imguiRecord =
      imguiData##imguiFunc
      |> OptionService.isJsonSerializedValueNone
      || imguiData##customData
      |> OptionService.isJsonSerializedValueNone ?
        RecordIMGUIRenderWorkerService.getRecord(state) :
        RecordIMGUIRenderWorkerService.getRecord(state)
        |> WonderImgui.ManageIMGUIAPI.setIMGUIFunc(
             imguiData##customData
             |> OptionService.unsafeGetJsonSerializedValue
             |> SerializeService.deserializeValueWithFunction,
             imguiData##imguiFunc
             |> OptionService.unsafeGetJsonSerializedValue
             |> SerializeService.deserializeFunction,
           );

    state.imguiRecord = imguiRecord;

    let state =
      WonderImgui.ManageIMGUIService.render(
        AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
        imguiData##ioData,
        Obj.magic(RecordAPIRenderWorkerService.getIMGUIAPIJsObj(state)),
        (
          ManageIMGUIRenderWorkerService.getRecord |> Obj.magic,
          ManageIMGUIRenderWorkerService.setRecord |> Obj.magic,
        ),
        state |> Obj.magic,
      )
      |> Obj.magic;

    state |> StateRenderWorkerService.setState(stateData);

    e;
  });