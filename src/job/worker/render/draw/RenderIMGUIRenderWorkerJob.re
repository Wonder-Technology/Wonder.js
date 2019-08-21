open StateDataRenderWorkerType;

let _addAllExecFuncData = (execFuncDataArr, imguiRecord) =>
  execFuncDataArr
  |> SerializeAllIMGUIService.Exec.deserializeExecFuncDataArrToWonderIMGUIType
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         imguiRecord,
         {execFunc, customData, zIndex, name}: WonderImgui.IMGUIType.execFuncData,
       ) =>
         WonderImgui.ManageIMGUIAPI.addExecFuncData(
           name,
           customData,
           zIndex,
           execFunc,
           imguiRecord,
         ),
       imguiRecord,
     );

let _updateExecData = (execFuncDataArr, imguiRecord) =>
  execFuncDataArr |> ExecDataAllIMGUIService.hasExecFuncData ?
    imguiRecord
    |> WonderImgui.ManageIMGUIAPI.clearExecFuncDataArr
    |> _addAllExecFuncData(execFuncDataArr) :
    imguiRecord;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);

    let data = MessageService.getRecord(e);
    let imguiData = data##imguiData;

    let execFuncDataArr = imguiData##execFuncDataArr;

    let imguiRecord =
      RecordIMGUIRenderWorkerService.getRecord(state)
      |> _updateExecData(execFuncDataArr);

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