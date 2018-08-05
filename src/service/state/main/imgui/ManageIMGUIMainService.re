open StateDataMainType;

let getIMGUIFunc = state =>
  WonderImgui.ManageIMGUIAPI.getIMGUIFunc(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let setIMGUIFunc = (customData, func, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      ...state,
      imguiRecord: {
        ...state.imguiRecord,
        isSetIMGUIFuncInRenderWorkerForWorker: false,
        wonderImguiIMGUIRecord:
          RecordIMGUIMainService.getWonderIMGUIRecord(state)
          |> WonderImgui.ManageIMGUIAPI.setIMGUIFunc(customData, func),
      },
    } :
    {
      ...state,
      imguiRecord: {
        ...state.imguiRecord,
        wonderImguiIMGUIRecord:
          RecordIMGUIMainService.getWonderIMGUIRecord(state)
          |> WonderImgui.ManageIMGUIAPI.setIMGUIFunc(customData, func),
      },
    };

let isSetIMGUIFuncInRenderWorkerForWorker = state =>
  state.imguiRecord.isSetIMGUIFuncInRenderWorkerForWorker === true;

let markSetIMGUIFuncInRenderWorkerForWorker = state => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    isSetIMGUIFuncInRenderWorkerForWorker: true,
  },
};

let resetIsSetIMGUIFuncInRenderWorkerForWorker = state => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    isSetIMGUIFuncInRenderWorkerForWorker: false,
  },
};

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
  programRecord: ProgramService.clearLastSendProgram(state.programRecord),
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