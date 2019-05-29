/* TODO remove */

open WonderBsMost;

open Js.Promise;

let createPerspectiveCameraRayFromEvent = RayUtils.createPerspectiveCameraRayFromEvent;

let checkIntersectMesh =
    (ray, geometry, localToWorldMatrixTypeArray, cull, state) =>
  MeshUtils.checkIntersectMesh(
    ray,
    (geometry, localToWorldMatrixTypeArray, cull),
    state,
  );

let isIntersectWithMesh = checkResult => checkResult |> Js.Option.isSome;

let getIntersectedPointWithMesh = checkResult =>
  checkResult |> OptionService.unsafeGet;

let _loadImage:
  (string, string, (. ImageType.image) => unit, (. 'exn) => unit) => unit = [%raw
  (url, errorInfo, resolve, reject) => {|
                    var image = new Image();

                    image.src = url;

                    image.onload = (function () {
                        return resolve(image);
                      });

                    image.onerror = (function (e) {
                      console.trace();
                              return reject(new Error(errorInfo));
                            });

  |}
];

let loadImage = (src, errorInfo) =>
  make((~resolve, ~reject) => _loadImage(src, errorInfo, resolve, reject))
  |> Most.fromPromise;

let loadImageDataArr = imageDataArr => {
  let resultMap = WonderCommonlib.ImmutableHashMapService.createEmpty();

  Most.mergeArray(
    imageDataArr
    |> Js.Array.map(((imageSrc, imageId)) =>
         loadImage(imageSrc, {j|load image(src = $imageSrc) error|j})
         |> Most.map(image => (image, imageId))
       ),
  )
  |> Most.reduce(
       (resultMap, (image, imageId)) =>
         resultMap
         |> WonderCommonlib.ImmutableHashMapService.set(imageId, image),
       WonderCommonlib.ImmutableHashMapService.createEmpty(),
     );
};