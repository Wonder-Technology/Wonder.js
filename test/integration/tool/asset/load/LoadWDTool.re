open Js.Promise;

let load = (~wdPath, ~fetchFunc, ()) => {
  let result = ref(Obj.magic(1));

  MainStateTool.getStateData()
  |> LoaderManagerSystem.loadWD(wdPath, fetchFunc)
  |> Most.forEach(data => result := data)
  |> then_(() => result^ |> resolve);
};