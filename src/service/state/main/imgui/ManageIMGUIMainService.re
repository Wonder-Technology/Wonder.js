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
  WonderImgui.ManageIMGUIAPI.getExecFunc(
    execFuncName,
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let addExecFuncData =
    (execFuncName, customData, zIndex, func: ExecIMGUIType.execFunc, state) => {
  let wonderImguiIMGUIRecord =
    RecordIMGUIMainService.getWonderIMGUIRecord(state)
    |> WonderImgui.ManageIMGUIAPI.addExecFuncData(
         execFuncName,
         customData,
         zIndex,
         func |> ExecIMGUIType.wonderExecFuncToWonderIMGUIExecFunc,
       );

  WorkerDetectMainService.isUseWorker(state) ?
    resetIsSetExecFuncInRenderWorkerForWorker(state) :
    RecordIMGUIMainService.setWonderIMGUIRecord(wonderImguiIMGUIRecord, state);
};

let removeExecFuncData = (execFuncName, state) => {
  let wonderImguiIMGUIRecord =
    RecordIMGUIMainService.getWonderIMGUIRecord(state)
    |> WonderImgui.ManageIMGUIAPI.removeExecFuncData(execFuncName);

  WorkerDetectMainService.isUseWorker(state) ?
    resetIsSetExecFuncInRenderWorkerForWorker(state) :
    RecordIMGUIMainService.setWonderIMGUIRecord(wonderImguiIMGUIRecord, state);
};

let clearExecFuncDataArr = state =>
  WonderImgui.ManageIMGUIAPI.clearExecFuncDataArr(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  )
  |> RecordIMGUIMainService.setWonderIMGUIRecord(_, state);

let getCustomData = (execFuncName, state) =>
  WonderImgui.ManageIMGUIAPI.getCustomData(
    execFuncName,
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let unsafeGetCustomData = (execFuncName, state) =>
  WonderImgui.ManageIMGUIAPI.unsafeGetCustomData(
    execFuncName,
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let getExecFuncDataArr = state: ExecIMGUIType.execFuncDataArr =>
  WonderImgui.ManageIMGUIAPI.getExecFuncDataArr(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  )
  |> ExecIMGUIType.wonderIMGUIExecFuncDataArrToWonderFuncDataArr;

let createEmptyExecFuncDataArr = () =>
  WonderCommonlib.ArrayService.createEmpty();

let getCanvasSize = ({viewRecord}) =>
  switch (ViewService.getCanvas(viewRecord)) {
  | None => (0, 0)
  | Some(canvas) =>
    let canvas = Obj.magic(canvas);

    (canvas##width, canvas##height);
  };

let getRecord = state => RecordIMGUIMainService.getWonderIMGUIRecord(state);

let setRecord = (record, state) => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord: record,
  },
};

let sendCustomTextureProgramUniformProjectionMatData = (gl, canvasSize, state) => {
  ...state,
  programRecord: AllProgramService.clearLastSendProgram(state.programRecord),
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord:
      WonderImgui.ManageIMGUIAPI.sendCustomTextureProgramUniformProjectionMatData(
        gl,
        canvasSize,
        RecordIMGUIMainService.getWonderIMGUIRecord(state),
      ),
  },
};

let sendFontTextureProgramUniformProjectionMatData = (gl, canvasSize, state) => {
  ...state,
  programRecord: AllProgramService.clearLastSendProgram(state.programRecord),
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord:
      WonderImgui.ManageIMGUIAPI.sendFontTextureProgramUniformProjectionMatData(
        gl,
        canvasSize,
        RecordIMGUIMainService.getWonderIMGUIRecord(state),
      ),
  },
};

let sendNoTextureProgramUniformProjectionMatData = (gl, canvasSize, state) => {
  ...state,
  programRecord: AllProgramService.clearLastSendProgram(state.programRecord),
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord:
      WonderImgui.ManageIMGUIAPI.sendNoTextureProgramUniformProjectionMatData(
        gl,
        canvasSize,
        RecordIMGUIMainService.getWonderIMGUIRecord(state),
      ),
  },
};