type t = Intensity(SceneGraphRepoType.intensity)

let create = value => Intensity(value)

let value = intensity =>
  switch intensity {
  | Intensity(value) => value
  }
