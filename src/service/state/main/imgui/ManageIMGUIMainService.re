open StateDataMainType;

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