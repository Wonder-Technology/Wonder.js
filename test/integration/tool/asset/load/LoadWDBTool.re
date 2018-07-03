open Js.Promise;

let load = (~wdbPath, ~fetchFunc, ()) => {
  let result = ref(Obj.magic(1));

  MainStateTool.getStateData()
  |> LoaderManagerSystem.loadWDB(wdbPath, fetchFunc)
  |> Most.forEach(data => result := data)
  |> then_(() => result^ |> resolve);
};