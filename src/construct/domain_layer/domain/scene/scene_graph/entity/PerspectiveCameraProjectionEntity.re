type t =
  | PerspectiveCameraProjection(
      PerspectiveCameraProjectionPOType.perspectiveCameraProjection,
    );

let create = index => PerspectiveCameraProjection(index);

let value = perspectiveCameraProjection =>
  switch (perspectiveCameraProjection) {
  | PerspectiveCameraProjection(index) => index
  };
