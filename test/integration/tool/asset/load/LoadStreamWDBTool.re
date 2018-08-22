open Js.Promise;

/* let load =
       (
         ~wdbPath,
         ~fetchFunc,
         ~handleWhenDoneFunc=(state, rootGameObject) => state,
         (),
       ) => {
     let result = ref(Obj.magic(1));

     MainStateTool.unsafeGetState()
     |> LoaderManagerSystem.loadStreamWDB(
          wdbPath,
          (fetchFunc, handleWhenDoneFunc),
        )
     /* |> WonderBsMost.Most.forEach(data => result := data) */
     |> WonderBsMost.Most.drain
     |> then_(() => resolve());
   }; */

let read =
    (
      (
        default11Image,
        controller,
        handleBeforeStartLoopFunc,
        handleWhenDoneFunc,
      ),
      reader,
    ) =>
  ReadStreamChunkSystem.read(
    (
      default11Image,
      controller,
      handleBeforeStartLoopFunc,
      handleWhenDoneFunc,
    ),
    [||],
    (
      None,
      [||],
      None,
      0,
      [||],
      WonderCommonlib.SparseMapService.createEmpty(),
    ),
    reader,
  );