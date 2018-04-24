let removeDisposedOnesFromMaterialArrayForWorkerInit = (materialArray, materialArrayForWorkerInit) => {
  let materialMap =
    DisposeECSService.buildMapFromArray(
      materialArray,
      WonderCommonlib.SparseMapService.createEmpty()
    );
  materialArrayForWorkerInit
  |> Js.Array.filter(
       (material) => ! (materialMap |> WonderCommonlib.SparseMapService.has(material))
     )
};