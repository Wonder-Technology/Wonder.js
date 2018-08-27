open Js.Promise;

let load =
    (
      ~wdbPath,
      ~fetchFunc,
      ~handleWhenLoadingFunc=(contentLength, wdbPath) => (),
      (),
    ) => {
  let result = ref(Obj.magic(1));

  MainStateTool.unsafeGetState()
  |> LoaderManagerSystem.loadWholeWDB(
       wdbPath,
       (fetchFunc, handleWhenLoadingFunc),
     )
  |> WonderBsMost.Most.forEach(data => result := data)
  |> then_(() => result^ |> resolve);
};