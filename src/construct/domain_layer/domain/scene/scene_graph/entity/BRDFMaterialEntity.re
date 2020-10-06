type t =
  | BRDFMaterial(BRDFMaterialPOType.brdfMaterial);

let create = index => BRDFMaterial(index);

let value = brdfMaterial =>
  switch (brdfMaterial) {
  | BRDFMaterial(index) => index
  };
