type t = Color4(SceneGraphRepoType.color4)

let create = value => Color4(value)

let value = color =>
  switch color {
  | Color4(value) => value
  }
