let convertToBasicCameraViews =
    ({cameras}: GLTFType.gltf)
    : WDType.basicCameraViews => {
  count:
    switch (cameras) {
    | None => 0
    | Some(cameras) => cameras |> Js.Array.length
    },
};

let convertToPerspectiveCameraProjections = ({cameras}: GLTFType.gltf) =>
  switch (cameras) {
  | None => [||]
  | Some(cameras) =>
    cameras
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, {type_, perspective}: GLTFType.camera) =>
           switch (type_) {
           | "perspective" =>
             let {aspectRatio, yfov, zfar, znear}: GLTFType.perspective =
               perspective |> OptionService.unsafeGet;
             arr
             |> ArrayService.push(
                  {near: znear, far: zfar, fovy: yfov, aspect: aspectRatio}: WDType.perspectiveCameraProjection,
                );
           | _ => arr
           },
         [||],
       )
  };