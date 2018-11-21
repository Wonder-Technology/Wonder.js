let testCopyTypeArraySingleValue =
    (
      (createGameObjectFunc, getDataFunc, setDataFunc, getTargetDataFunc),
      state,
    ) => {
  open StateDataMainType;
  open Wonder_jest;
  open Expect;
  open Expect.Operators;

  let (state, gameObject1, component1) = createGameObjectFunc(state^);
  let (data1, data2) = getTargetDataFunc();
  let state = state |> setDataFunc(component1, data1);
  let copiedState = MainStateTool.deepCopyForRestore(state);
  let copiedState = copiedState |> setDataFunc(component1, data2);
  getDataFunc(component1, state) |> expect == data1;
};