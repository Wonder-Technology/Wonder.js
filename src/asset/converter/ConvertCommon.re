let getCount = arrs => arrs |> Js.Array.length;

let _checkPrimitive = (({attributes}: GLTFType.primitive) as primitive) =>
  attributes.texCoord_1 |> Js.Option.isSome ?
    {
      WonderLog.Log.warn({j|not support texCoord_1|j});

      primitive;
    } :
    primitive;

let getPrimitiveData = primitives =>
  primitives[0]
  |> _checkPrimitive
  |> WonderLog.Contract.ensureCheck(
       ({attributes, indices}: GLTFType.primitive) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|indices exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 indices |> Js.Option.isSome |> assertTrue
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

/* let isBase64 = str =>
   [%re
     {|/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/g|}
   ]
   |> Js.Re.test(str)
   || str
   |> Js.String.substring(~from=0, ~to_=5) === "data:"; */

let buildDefaultName = (type_, index) => {j|$(type_)_$index|j};

let getScene = (scenes, scene) =>
  Array.unsafe_get(
    scenes,
    switch (scene) {
    | None => 0
    | Some(scene) => scene
    },
  );