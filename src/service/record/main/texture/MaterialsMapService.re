let getMaterialDataArr = (texture, materialsMap) =>
  WonderCommonlib.MutableSparseMapService.get(texture, materialsMap);

let unsafeGetMaterialDataArr = (texture, materialsMap) =>
  WonderCommonlib.MutableSparseMapService.unsafeGet(texture, materialsMap)
  |> WonderLog.Contract.ensureCheck(
       materialData =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|texture's materialData exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 materialData |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let addMaterial = ((material, materialType), texture, materialsMap) =>
  ArrayMapService.addValue(texture, (material, materialType), materialsMap);

let removeMaterial = ((material, materialType), texture, materialsMap) => {
  let (has, arr) = MutableSparseMapService.fastGet(texture, materialsMap);

  has ?
    materialsMap
    |> WonderCommonlib.MutableSparseMapService.set(
         texture,
         arr
         |> Js.Array.filter(((materialInArr, materialTypeInArr)) =>
              materialTypeInArr !== materialType || materialInArr !== material
            ),
       ) :
    materialsMap;
};

let clearMaterial = (texture, materialsMap) =>
  materialsMap |> WonderCommonlib.MutableSparseMapService.deleteVal(texture);