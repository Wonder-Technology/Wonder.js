open Js.Promise;

let load = (~wdbPath, ~fetchFunc, ()) => {
  let result = ref(Obj.magic(1));

  MainStateTool.unsafeGetState()
  |> LoaderManagerSystem.loadWDB(wdbPath, fetchFunc)
  |> WonderBsMost.Most.forEach(data => result := data)
  |> then_(() => result^ |> resolve);
};