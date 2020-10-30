type t =
  | PerspectiveCameraProjection(SceneGraphType.perspectiveCameraProjection);

let create = value => PerspectiveCameraProjection(value);

let value = perspectiveCameraProjection =>
  switch (perspectiveCameraProjection) {
  | PerspectiveCameraProjection(value) => value
  };
