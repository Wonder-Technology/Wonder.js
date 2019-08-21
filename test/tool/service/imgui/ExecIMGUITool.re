let buildEmptyExecFuncStr = () => {|function (customData, imguiAPIJsObj, state){ return state; }|};

let buildEmptyExecFunc = () =>
  buildEmptyExecFuncStr() |> SerializeService.deserializeFunction;

let createEmptyExecFuncDataArr = () =>
  ManageIMGUIMainService.createEmptyExecFuncDataArr();

let addExecFuncData =
    (
      ~state,
      ~name="exec",
      ~customData=Obj.magic(-1),
      ~zIndex=0,
      ~func=buildEmptyExecFunc(),
      (),
    ) =>
  state |> ManageIMGUIAPI.addExecFuncData(name, customData, zIndex, func);

let getExecFunc = ManageIMGUIMainService.getExecFunc;

let getCustomData = ManageIMGUIMainService.getCustomData;

let getExecFuncDataArr = ManageIMGUIMainService.getExecFuncDataArr;

let hasExecFuncData = state =>
  getExecFuncDataArr(state) |> ExecDataAllIMGUIService.hasExecFuncData;