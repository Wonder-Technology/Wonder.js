type t =
  | BSDFMaterial(BSDFMaterialPOType.bsdfMaterial);

let create = index => BSDFMaterial(index);

let value = bsdfMaterial =>
  switch (bsdfMaterial) {
  | BSDFMaterial(index) => index
  };
