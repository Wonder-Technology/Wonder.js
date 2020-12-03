type t = Color3(SceneGraphRepoType.color3)

let create = value => Color3(value)

let value = color =>
  switch color {
  | Color3(value) => value
  }
