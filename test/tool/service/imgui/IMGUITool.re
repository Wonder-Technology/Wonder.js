let buildEmptyIMGUIFuncStr = () => {|function (customData, imguiAPIJsObj, state){ return state; }|};

let buildEmptyIMGUIFunc = () =>
  buildEmptyIMGUIFuncStr() |> SerializeService.deserializeFunction;

let buildEmptyCustomControlFuncStr = () => {|function (_customControlFuncInputData, _customControlFunctionShowData, _customControlAPIJsObj, record){ return record; }|};

let getIMGUIFunc = ManageIMGUIMainService.getIMGUIFunc;

let getCustomData = ManageIMGUIMainService.getCustomData;

let getWonderIMGUIRecord = RecordIMGUIMainService.getWonderIMGUIRecord;

let getIOData = state => RecordIMGUIMainService.getIOData(state);

let setIOData =
    (ioData, state: StateDataMainType.state): StateDataMainType.state => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    ioData,
  },
};