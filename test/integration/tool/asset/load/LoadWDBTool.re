open Js.Promise;

let load =
    (
      ~wdbPath,
      ~fetchFunc,
      ~isHandleIMGUI=true,
      ~isBindEvent=true,
      ~isActiveCamera=true,
      ~isRenderLight=true,
      ~isLoadImage=true,
      ~handleWhenLoadingFunc=(contentLength, wdbPath) => (),
      (),
    ) => {
  let result = ref(Obj.magic(1));

  MainStateTool.unsafeGetState()
  |> LoaderManagerSystem.loadWholeWDB(
       wdbPath,
       (
         isHandleIMGUI,
         isBindEvent,
         isActiveCamera,
         isRenderLight,
         isLoadImage,
       ),
       (fetchFunc, handleWhenLoadingFunc),
     )
  |> WonderBsMost.Most.forEach(data => result := data)
  |> then_(() => result^ |> resolve);
};