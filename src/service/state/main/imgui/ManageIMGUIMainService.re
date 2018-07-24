open StateDataMainType;

let getIMGUIFunc = state =>
  WonderImgui.ManageIMGUIAPI.getIMGUIFunc(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let setIMGUIFunc = (customData, func, state) => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord:
      RecordIMGUIMainService.getWonderIMGUIRecord(state)
      |> WonderImgui.ManageIMGUIAPI.setIMGUIFunc(customData, func),
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
