let deepCopyForRestore = State.deepCopyForRestore;

let restore = State.restoreState;

let getStateData = () => State.getStateData();

let getState = () => StateSystem.getState(getStateData());

let setState = (state) => StateSystem.setState(getStateData(), state);

let createState = StateSystem.createState;

let createNewCompleteState = (sandbox) =>
  createState() |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

let createNewCompleteStateWithRenderConfigData = (sandbox) =>
  createNewCompleteState(sandbox)
  |> (
    (state) => state |> RenderConfigDataTool.create(RenderConfigDataTool.buildRenderConfigData())
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