let deepCopyForRestore = State.deepCopyForRestore;

let restore = State.restoreState;

let getStateData = () => State.getStateData();

let getState = () => StateDataMainService.getState(getStateData());

let setState = (state) => StateDataMainService.setState(getStateData(), state);

let createState = CreateStateMainService.createState;

let createNewCompleteState = (sandbox) =>
  createState() |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

let createNewCompleteStateWithRenderConfig = (sandbox) =>
  createNewCompleteState(sandbox)
  |> (
    (state) => state |> RenderConfigTool.create(RenderConfigTool.buildRenderConfig())
  );

let testShadowCopyArrayLikeMapData = (getMapFunc, state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  let index = 0;
  getMapFunc(state)
  |> Js.Array.forEach(
       (map) =>
         map
         |> WonderCommonlib.SparseMapSystem.set(
              index,
              WonderCommonlib.SparseMapSystem.createEmpty()
            )
         |> ignore
     )
  |> ignore;
  let copiedState = deepCopyForRestore(state);
  getMapFunc(copiedState)
  |> Js.Array.forEach(
       (map) => map |> Obj.magic |> WonderCommonlib.SparseMapSystem.deleteVal(index) |> ignore
     )
  |> ignore;
  let (sourceArr, targetArr) =
    getMapFunc(state)
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           ((sourceArr, targetArr), map) => {
             sourceArr
             |> Js.Array.push(map |> WonderCommonlib.SparseMapSystem.unsafeGet(index))
             |> ignore;
             targetArr |> Js.Array.push(Js.Undefined.empty |> Obj.magic) |> ignore;
             (sourceArr, targetArr)
           }
         ),
         ([||], [||])
       );
  sourceArr |> expect |> not_ == targetArr
};