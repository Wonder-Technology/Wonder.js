type t = PerspectiveCameraProjection(SceneGraphRepoType.perspectiveCameraProjection)

let create = value => PerspectiveCameraProjection(value)

let value = perspectiveCameraProjection =>
  switch perspectiveCameraProjection {
  | PerspectiveCameraProjection(value) => value
  }
