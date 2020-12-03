type t = Wrap(SceneGraphRepoType.wrap)

let create = value => Wrap(value)

let value = wrap =>
  switch wrap {
  | Wrap(value) => value
  }
