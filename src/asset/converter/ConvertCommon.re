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

let _fatalBase64MimeType = base64Str =>
  WonderLog.Log.fatal(
    WonderLog.Log.buildFatalMessage(
      ~title="getBase64MimeType",
      ~description={j|should has mimeType data|j},
      ~reason="",
      ~solution={j||j},
      ~params={j|base64Str: $base64Str|j},
    ),
  );

let getBase64MimeType = base64Str =>
  switch (
    [%re {|/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/g|}]
    |> Js.Re.exec(base64Str)
  ) {
  | None => _fatalBase64MimeType(base64Str)
  | Some(result) =>
    switch (Js.Nullable.to_opt(Js.Re.captures(result)[1])) {
    | None => _fatalBase64MimeType(base64Str)
    | Some(result) => result
    }
  };

let buildDefaultName = (type_, index) => {j|$(type_)_$index|j};

let getScene = (scenes, scene) => Array.unsafe_get(scenes, scene);