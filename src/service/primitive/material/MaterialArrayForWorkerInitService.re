let removeDisposedOnesFromMaterialArrayForWorkerInit =
    (materialDataArray, materialArrayForWorkerInit) =>
  switch (materialDataArray |> Js.Array.length) {
  | 0 => materialArrayForWorkerInit
  | _ =>
    let materialMap =
      DisposeECSService.buildMapFromArray(
        materialDataArray |> Js.Array.map(((_, material)) => material),
        WonderCommonlib.MutableSparseMapService.createEmpty(),
      );
    materialArrayForWorkerInit
    |> Js.Array.filter(material =>
         ! (materialMap |> WonderCommonlib.MutableSparseMapService.has(material))
       );
  };

let addMaterialToMaterialArrayForWorkerInit =
    (materialIndex, materialArrayForWorkerInit) =>
  materialArrayForWorkerInit |> ArrayService.unsafeGetLast === materialIndex ?
    materialArrayForWorkerInit :
    materialArrayForWorkerInit |> ArrayService.push(materialIndex);