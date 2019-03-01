let removeDisposedOnesFromMaterialArrayForWorkerInit =
    (materialDataMap, materialArrayForWorkerInit) =>
  switch (materialDataMap |> WonderCommonlib.MutableSparseMapService.length) {
  | 0 => materialArrayForWorkerInit
  | _ =>
    let materialMap =
      DisposeECSService.buildMapFromArray(
        materialDataMap |> WonderCommonlib.MutableSparseMapService.getValidKeys,
        WonderCommonlib.MutableSparseMapService.createEmpty(),
      );
    materialArrayForWorkerInit
    |> Js.Array.filter(material =>
         !(
           materialMap
           |> WonderCommonlib.MutableSparseMapService.has(material)
         )
       );
  };

let addMaterialToMaterialArrayForWorkerInit =
    (materialIndex, materialArrayForWorkerInit) =>
  materialArrayForWorkerInit |> ArrayService.unsafeGetLast === materialIndex ?
    materialArrayForWorkerInit :
    materialArrayForWorkerInit |> ArrayService.push(materialIndex);