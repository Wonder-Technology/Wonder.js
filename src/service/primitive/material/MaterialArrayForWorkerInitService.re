let removeDisposedOnesFromMaterialArrayForWorkerInit = (materialArray, materialArrayForWorkerInit) =>
  switch (materialArray |> Js.Array.length) {
  | 0 => materialArrayForWorkerInit
  | _ =>
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