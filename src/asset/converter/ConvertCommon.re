let getCount = arrs => arrs |> Js.Array.length;

let getPrimitiveData = primitives =>
  primitives[0]
  // |> WonderLog.Contract.ensureCheck(
  //      ({attributes, indices}: GLTFType.primitive) =>
  //        WonderLog.(
  //          Contract.(
  //            Operators.(
  //              test(
  //                Log.buildAssertMessage(
  //                  ~expect={j|indices exist|j},
  //                  ~actual={j|not|j},
  //                ),
  //                () =>
  //                indices |> Js.Option.isSome |> assertTrue
  //              )
  //            )
  //          )
  //        ),
  //      IsDebugMainService.getIsDebug(StateDataMain.stateData),
  //    );

/* let isBase64 = str =>
   [%re
     {|/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/g|}
   ]
   |> Js.Re.test(str)
   || str
   |> Js.String.substring(~from=0, ~to_=5) === "data:"; */

let buildDefaultName = (type_, index) => {j|$(type_)_$index|j};

let buildDefaultImageName = index => buildDefaultName("image", index);

let buildDefaultGameObjectName = index =>
  buildDefaultName("gameObject", index);

let buildDefaultGeometryName = index => buildDefaultName("geometry", index);

let buildDefaultBasicMaterialName = index =>
  buildDefaultName("basicMaterial", index);

let buildDefaultLightMaterialName = index =>
  buildDefaultName("lightMaterial", index);

let buildDefaultBasicSourceTextureName = index =>
  buildDefaultName("basicSourceTexture", index);

let buildDefaultCubemapTextureName = index =>
  buildDefaultName("cubemapTexture", index);

let isDefaultImageName = name =>
  name |> Js.String.match([%re {|/^image_/g|}]) |> Js.Option.isSome;

let isDefaultLightMaterialName = name =>
  name |> Js.String.match([%re {|/^lightMaterial_/g|}]) |> Js.Option.isSome;

let isDefaultBasicMaterialName = name =>
  name |> Js.String.match([%re {|/^basicMaterial_/g|}]) |> Js.Option.isSome;

let isDefaultBasicSourceTextureName = name =>
  name
  |> Js.String.match([%re {|/^basicSourceTexture/g|}])
  |> Js.Option.isSome;

let isDefaultCubemapTextureName = name =>
  name |> Js.String.match([%re {|/^cubemapTexture/g|}]) |> Js.Option.isSome;

let isDefaultGeometryName = name =>
  name |> Js.String.match([%re {|/^geometry_/g|}]) |> Js.Option.isSome;

let getScene = (scenes, scene) =>
  Array.unsafe_get(
    scenes,
    switch (scene) {
    | None => 0
    | Some(scene) => scene
    },
  );