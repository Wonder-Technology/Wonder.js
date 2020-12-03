type t = BSDFMaterial(SceneGraphRepoType.bsdfMaterial)

let create = index => BSDFMaterial(index)

let value = bsdfMaterial =>
  switch bsdfMaterial {
  | BSDFMaterial(index) => index
  }
