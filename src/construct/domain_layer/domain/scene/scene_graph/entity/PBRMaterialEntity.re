type t =
  | PBRMaterial(PBRMaterialPOType.pbrMaterial);

let create = index => PBRMaterial(index);

let value = pbrMaterial =>
  switch (pbrMaterial) {
  | PBRMaterial(index) => index
  };
