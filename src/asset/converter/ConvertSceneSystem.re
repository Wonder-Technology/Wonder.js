let getRootNodeIndexs = ({nodes}: GLTFType.scene) =>
  /* WonderLog.Contract.requireCheck(
       () => {
         open WonderLog;
         open Contract;
         open Operators;

         test(
           Log.buildAssertMessage(
             ~expect={j|scene->nodes exist|j},
             ~actual={j|not|j},
           ),
           () =>
           nodes |> Js.Option.isSome |> assertTrue
         );

         test(
           Log.buildAssertMessage(
             ~expect={j|scene->nodes has only one node|j},
             ~actual={j|not|j},
           ),
           () =>
           nodes |> OptionService.unsafeGet |> Js.Array.length == 1
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     ); */
  nodes |> OptionService.unsafeGet;