let deepCopyForRestore = StateAPI.deepCopyForRestore;

let restore = StateAPI.restoreState;

let getStateData = () => StateAPI.getStateData();

let unsafeGetState = () =>
  StateDataMainService.unsafeGetState(getStateData());

let setState = state => StateDataMainService.setState(getStateData(), state);

let createState = () => {
  SharedArrayBufferTool.setSharedArrayBufferToBeArrayBuffer(.);
  StateAPI.createState();
};

let createNewCompleteState = sandbox =>
  SettingType.(
    createState()
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()))
    |> (
      state =>
        {
          ...state,
          settingRecord:
            OperateSettingService.setSetting({
              canvasId: Some(""),
              memory: None,
              buffer: None,
              isDebug: None,
              context: None,
              gpu: None,
              worker: None,
            }),
        }
        |> ConfigDataLoaderSystem._createRecordWithState
    )
  );

let createNewCompleteStateWithRenderConfig = sandbox =>
  createNewCompleteState(sandbox)
  |> (
    state =>
      state |> RenderConfigTool.create(RenderConfigTool.buildRenderConfig())
  );

let testShadowCopyArrayLikeMapData = (getMapFunc, state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  let index = 0;
  getMapFunc(state)
  |> Js.Array.forEach(map =>
       map
       |> WonderCommonlib.SparseMapService.set(
            index,
            WonderCommonlib.SparseMapService.createEmpty(),
          )
       |> ignore
     )
  |> ignore;
  let copiedState = deepCopyForRestore(state);
  getMapFunc(copiedState)
  |> Js.Array.forEach(map =>
       map
       |> Obj.magic
       |> WonderCommonlib.SparseMapService.deleteVal(index)
       |> ignore
     )
  |> ignore;
  let (sourceArr, targetArr) =
    getMapFunc(state)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (sourceArr, targetArr), map) => {
           sourceArr
           |> Js.Array.push(
                map |> WonderCommonlib.SparseMapService.unsafeGet(index),
              )
           |> ignore;
           targetArr
           |> Js.Array.push(Js.Undefined.empty |> Obj.magic)
           |> ignore;
           (sourceArr, targetArr);
         },
         ([||], [||]),
       );

  sourceArr
  |> Obj.magic
  |> Js.Array.includes(Js.Nullable.undefined)
  |> expect == false;
};