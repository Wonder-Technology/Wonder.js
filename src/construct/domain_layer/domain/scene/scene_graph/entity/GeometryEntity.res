type t = Geometry(SceneGraphRepoType.geometry)

let create = index => Geometry(index)

let value = geometry =>
  switch geometry {
  | Geometry(index) => index
  }
