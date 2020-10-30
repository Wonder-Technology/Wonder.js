type t =
  | BSDFMaterial(SceneGraphType.bsdfMaterial);

let create = index => BSDFMaterial(index);

let value = bsdfMaterial =>
  switch (bsdfMaterial) {
  | BSDFMaterial(index) => index
  };
