let _convertToBasicCameraViewsByCameras = cameras =>
  switch (cameras) {
  | Some(cameras) when Js.Array.length(cameras) > 0 =>
    cameras
    |> Js.Array.sliceFrom(1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, _) =>
           arr
           |> ArrayService.push({isActive: false}: WDType.basicCameraView),
         [|{isActive: true}|],
       )
  | _ => [||]
  };

let convertToBasicCameraViews = ({cameras, extras}: GLTFType.gltf) =>
  switch (extras) {
  | None => _convertToBasicCameraViewsByCameras(cameras)
  | Some({basicCameraViews}) =>
    switch (basicCameraViews) {
    | Some(basicCameraViews) when Js.Array.length(basicCameraViews) > 0 =>
      basicCameraViews
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. arr, {isActive}: GLTFType.basicCameraView) =>
             arr
             |> ArrayService.push(
                  {isActive: isActive}: WDType.basicCameraView,
                ),
           [||],
         )
    | _ => _convertToBasicCameraViewsByCameras(cameras)
    }
  };

let _convertRadiansToDegree = angle => angle *. 180. /. Js.Math._PI;

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
                  {
                    near: znear,
                    far: zfar,
                    fovy: yfov |> _convertRadiansToDegree,
                    aspect: aspectRatio,
                  }: WDType.perspectiveCameraProjection,
                );
           | _ => arr
           },
         [||],
       )
  };

let convertToArcballCameraControllers = ({extras}: GLTFType.gltf) =>
  switch (extras) {
  | None => [||]
  | Some({arcballCameraControllers}) =>
    switch (arcballCameraControllers) {
    | None => [||]
    | Some(arcballCameraControllers) =>
      arcballCameraControllers
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. arr, data) => arr |> ArrayService.push(data),
           [||],
         )
    }
  };