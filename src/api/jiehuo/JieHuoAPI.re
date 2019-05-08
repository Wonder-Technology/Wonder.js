/* TODO remove */

let createPerspectiveCameraRayFromEvent = RayUtils.createPerspectiveCameraRayFromEvent;

let checkIntersectMesh = (ray, geometry, localToWorldMatrixTypeArray, cull, state) =>
  MeshUtils.checkIntersectMesh(
    ray,
    (geometry, localToWorldMatrixTypeArray, cull),
    state,
  );

let isIntersectWithMesh = checkResult => checkResult |> Js.Option.isSome;

let getIntersectedPointWithMesh = checkResult =>
  checkResult |> OptionService.unsafeGet;