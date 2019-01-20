let prepareForOptimize = (state) => {
  open GameObjectAPI;
  let state = SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
  let (state, gameObject1) = createGameObject(state);
  let (state, gameObject2) = createGameObject(state);
  let (state, gameObject3) = createGameObject(state);
  let state = state |> GameObjectTool.disposeGameObject(gameObject1);
  let state = state |> GameObjectTool.disposeGameObject(gameObject2);
  (state, gameObject1, gameObject2, gameObject3)
};

let judgeForOptimize = (state, gameObject1, gameObject2, gameObject3) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  open GameObjectType;
  let {transformMap} = GameObjectTool.getGameObjectRecord(state);
  (
    transformMap |> WonderCommonlib.MutableSparseMapService.has(gameObject1),
    transformMap |> WonderCommonlib.MutableSparseMapService.has(gameObject2),
    transformMap |> WonderCommonlib.MutableSparseMapService.has(gameObject3)
  )
  |> expect == (false, false, true)
};