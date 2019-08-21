let buildEmptyCustomControlFuncStr = () => {|function (_customControlFuncInputData, _customControlFunctionShowData, _customControlAPIJsObj, record){ return record; }|};

let buildEmptyCustomControlFunc = () =>
  buildEmptyCustomControlFuncStr() |> SerializeService.deserializeFunction;

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