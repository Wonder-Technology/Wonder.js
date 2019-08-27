let buildEmptyExecFuncStr = () => {|function (customData, imguiAPIJsObj, state){ return state; }|};

let buildEmptyExecFunc = () =>
  buildEmptyExecFuncStr() |> SerializeService.deserializeFunction;

let createEmptyExecFuncDataArr = () =>
  ExecIMGUIMainService.createEmptyExecFuncDataArr();

let addExecFuncData =
    (
      ~state,
      ~name="exec",
      ~customData=Obj.magic(-1),
      ~zIndex=0,
      ~func=buildEmptyExecFunc(),
      (),
    ) =>
  state |> ExecIMGUIAPI.addExecFuncData(name, customData, zIndex, func);

let getExecFunc = ExecIMGUIMainService.getExecFunc;

let getCustomData = ExecIMGUIMainService.getCustomData;

let getExecFuncDataArr = ExecIMGUIMainService.getExecFuncDataArr;

let hasExecFuncData = state =>
  getExecFuncDataArr(state) |> ExecDataAllIMGUIService.hasExecFuncData;