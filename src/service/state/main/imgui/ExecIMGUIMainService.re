open StateDataMainType;

let isSetExecFuncInRenderWorkerForWorker = state =>
  state.imguiRecord.isSetExecFuncInRenderWorkerForWorker === true;

let _markIsSetExecFuncInRenderWorkerForWorker =
    (isSetExecFuncInRenderWorkerForWorker, state) => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    isSetExecFuncInRenderWorkerForWorker,
  },
};

let markSetExecFuncInRenderWorkerForWorker = state =>
  _markIsSetExecFuncInRenderWorkerForWorker(true, state);

let resetIsSetExecFuncInRenderWorkerForWorker = state =>
  _markIsSetExecFuncInRenderWorkerForWorker(false, state);

let getExecFunc = (execFuncName, state) =>
  WonderImgui.ExecIMGUIAPI.getExecFunc(
    execFuncName,
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let unsafeGetExecFunc = (execFuncName, state) =>
  WonderImgui.ExecIMGUIAPI.unsafeGetExecFunc(
    execFuncName,
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let hasExecFuncData = (execFuncName, state) =>
  RecordIMGUIMainService.getWonderIMGUIRecord(state)
  |> WonderImgui.ExecIMGUIAPI.hasExecFuncData(execFuncName);

let getExecFuncDataArr = state =>
  WonderImgui.ExecIMGUIAPI.getExecFuncDataArr(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let addExecFuncData =
    (execFuncName, customData, execOrder, func: ExecIMGUIType.execFunc, state) => {
  let wonderImguiIMGUIRecord =
    RecordIMGUIMainService.getWonderIMGUIRecord(state)
    |> WonderImgui.ExecIMGUIAPI.addExecFuncData(
         execFuncName,
         customData,
         execOrder,
         func |> ExecIMGUIType.wonderExecFuncToWonderIMGUIExecFunc,
       );

  WorkerDetectMainService.isUseWorker(state) ?
    resetIsSetExecFuncInRenderWorkerForWorker(state) :
    RecordIMGUIMainService.setWonderIMGUIRecord(wonderImguiIMGUIRecord, state);
};

let removeExecFuncData = (execFuncName, state) => {
  let wonderImguiIMGUIRecord =
    RecordIMGUIMainService.getWonderIMGUIRecord(state)
    |> WonderImgui.ExecIMGUIAPI.removeExecFuncData(execFuncName);

  WorkerDetectMainService.isUseWorker(state) ?
    resetIsSetExecFuncInRenderWorkerForWorker(state) :
    RecordIMGUIMainService.setWonderIMGUIRecord(wonderImguiIMGUIRecord, state);
};

let clearExecFuncDataArr = state =>
  WonderImgui.ExecIMGUIAPI.clearExecFuncDataArr(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  )
  |> RecordIMGUIMainService.setWonderIMGUIRecord(_, state);

let getCustomData = (execFuncName, state) =>
  WonderImgui.ExecIMGUIAPI.getCustomData(
    execFuncName,
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let unsafeGetCustomData = (execFuncName, state) =>
  WonderImgui.ExecIMGUIAPI.unsafeGetCustomData(
    execFuncName,
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let getExecOrder = (execFuncName, state) =>
  WonderImgui.ExecIMGUIAPI.getExecOrder(
    execFuncName,
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let unsafeGetExecOrder = (execFuncName, state) =>
  WonderImgui.ExecIMGUIAPI.unsafeGetExecOrder(
    execFuncName,
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let getExecFuncDataArr = state: ExecIMGUIType.execFuncDataArr =>
  WonderImgui.ExecIMGUIAPI.getExecFuncDataArr(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  )
  |> ExecIMGUIType.wonderIMGUIExecFuncDataArrToWonderFuncDataArr;

let createEmptyExecFuncDataArr = () =>
  WonderCommonlib.ArrayService.createEmpty();