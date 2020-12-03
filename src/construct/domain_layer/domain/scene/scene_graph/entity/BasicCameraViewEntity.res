type t = BasicCameraView(SceneGraphRepoType.basicCameraView)

let create = value => BasicCameraView(value)

let value = basicCameraView =>
  switch basicCameraView {
  | BasicCameraView(value) => value
  }
