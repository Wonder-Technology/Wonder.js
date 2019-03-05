let doesPrimitiveHasMaterial = ({material}: GLTFType.primitive) =>
  material |> Js.Option.isSome;

let doesMeshHasMaterial = ({primitives}: GLTFType.mesh) =>
  ConvertCommon.getPrimitiveData(primitives) |> doesPrimitiveHasMaterial;