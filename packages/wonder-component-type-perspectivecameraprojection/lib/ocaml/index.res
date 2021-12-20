let componentName = "PerspectiveCameraProjection"

type dataName = {
  pMatrix: int,
  fovy: int,
  aspect: int,
  near: int,
  far: int,
  dirty: int,
}

let dataName = {
  pMatrix: 0,
  fovy: 1,
  aspect: 2,
  near: 3,
  far: 4,
  dirty: 5,
}

type dataNameType = int

type perspectiveCameraProjection = int