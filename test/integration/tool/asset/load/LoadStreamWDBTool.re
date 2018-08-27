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

let load =
    (
      ~wdbPath,
      ~fetchFunc,
      ~handleWhenLoadingFunc=(totalLoadedByteLength, contentLength, wdbPath) =>
                               (),
      ~handleWhenLoadWholeWDBFunc=(state, _, rootGameObject) => (),
      (),
    ) => {
  let result = ref(Obj.magic(1));

  MainStateTool.unsafeGetState()
  |> LoaderManagerSystem.loadStreamWDB(
       wdbPath,
       (
         fetchFunc,
         handleWhenLoadingFunc,
         (state, rootGameObject) => state,
         (state, rootGameObject) => state,
         handleWhenLoadWholeWDBFunc,
       ),
     )
  |> WonderBsMost.Most.drain;
  /* |> WonderBsMost.Most.forEach(data => result := data)
     |> then_(() => result^ |> resolve); */
};

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
      /* (contentLength, wdbPath, handleWhenLoadingFunc), */
      (0, "", (totalLoadedByteLength, contentLength, wdbPath) => ()),
      handleBeforeStartLoopFunc,
      handleWhenDoneFunc,
    ),
    ([||], Js.Typed_array.Uint8Array.fromLength(1000000)),
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

let readWithHandleWhenLoadingFunc =
    (
      (
        default11Image,
        controller,
        (contentLength, wdbPath, handleWhenLoadingFunc),
        handleBeforeStartLoopFunc,
        handleWhenDoneFunc,
      ),
      reader,
    ) =>
  ReadStreamChunkSystem.read(
    (
      default11Image,
      controller,
      (contentLength, wdbPath, handleWhenLoadingFunc),
      handleBeforeStartLoopFunc,
      handleWhenDoneFunc,
    ),
    /* ([||], Js.Typed_array.Uint8Array.fromLength(contentLength)), */
    ([||], Js.Typed_array.Uint8Array.fromLength(1000000)),
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

let setImageData = LoadStreamWDBSetBinBufferChunkDataSystem._setImageData;