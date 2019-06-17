open StateDataMainType;

let getIMGUIFunc = state =>
  WonderImgui.ManageIMGUIAPI.getIMGUIFunc(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let setIMGUIFunc = (customData, func, state) => {
  let wonderImguiIMGUIRecord =
    RecordIMGUIMainService.getWonderIMGUIRecord(state)
    |> WonderImgui.ManageIMGUIAPI.setIMGUIFunc(customData, func);

  WorkerDetectMainService.isUseWorker(state) ?
    {
      ...state,
      imguiRecord: {
        ...state.imguiRecord,
        isSetIMGUIFuncInRenderWorkerForWorker: false,
        wonderImguiIMGUIRecord,
      },
    } :
    {
      ...state,
      imguiRecord: {
        ...state.imguiRecord,
        wonderImguiIMGUIRecord,
      },
    };
};

let clearIMGUIFunc = state =>
  setIMGUIFunc(Obj.magic(-1), Obj.magic((_, _, state) => state), state);

let isSetIMGUIFuncInRenderWorkerForWorker = state =>
  state.imguiRecord.isSetIMGUIFuncInRenderWorkerForWorker === true;

let _markIsSetIMGUIFuncInRenderWorkerForWorker =
    (isSetIMGUIFuncInRenderWorkerForWorker, state) => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    isSetIMGUIFuncInRenderWorkerForWorker,
  },
};

let markSetIMGUIFuncInRenderWorkerForWorker = state =>
  _markIsSetIMGUIFuncInRenderWorkerForWorker(true, state);

let resetIsSetIMGUIFuncInRenderWorkerForWorker = state =>
  _markIsSetIMGUIFuncInRenderWorkerForWorker(false, state);

let getCustomData = state =>
  WonderImgui.ManageIMGUIAPI.getCustomData(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

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

let sendUniformProjectionMatData = (gl, canvasSize, state) => {
  ...state,
  programRecord: AllProgramService.clearLastSendProgram(state.programRecord),
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord:
      WonderImgui.ManageIMGUIAPI.sendUniformProjectionMatData(
        gl,
        canvasSize,
        RecordIMGUIMainService.getWonderIMGUIRecord(state),
      ),
  },
};