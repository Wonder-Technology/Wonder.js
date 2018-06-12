let getCount = arrs => arrs |> Js.Array.length;

let getPrimitiveData = primitives =>
  primitives[0]
  |> WonderLog.Contract.ensureCheck(
       ({attributes, indices}: GLTFType.primitive) => {
         open WonderLog;
         open Contract;
         open Operators;
         test(
           Log.buildAssertMessage(
             ~expect={j|only has TEXCOORD_0|j},
             ~actual={j|not|j},
           ),
           () =>
           attributes.texCoord_1 |> Js.Option.isNone |> assertTrue
         );
         test(
           Log.buildAssertMessage(
             ~expect={j|indices exist|j},
             ~actual={j|not|j},
           ),
           () =>
           indices |> Js.Option.isSome |> assertTrue
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let isBase64 = str =>
  [%re
    {|/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/g|}
  ]
  |> Js.Re.test(str)
  || str
  |> Js.String.substring(~from=0, ~to_=5) === "data:";

let buildDefaultName = (type_, index) => {j|$(type_)_$index|j};