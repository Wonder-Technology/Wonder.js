open RenderLightMaterialType;

let _unsafeGetMapUnit = (material, unitMap) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|unitMap has unit|j},
                ~actual={j|not|j},
              ),
              () =>
              unitMap
              |> WonderCommonlib.MutableSparseMapService.has(material)
              |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  unitMap |> WonderCommonlib.MutableSparseMapService.unsafeGet(material);
};

let unsafeGetDiffuseMapUnit = (material, lightMaterialRecord) =>
  _unsafeGetMapUnit(material, lightMaterialRecord.diffuseMapUnitMap);

let unsafeGetSpecularMapUnit = (material, lightMaterialRecord) =>
  _unsafeGetMapUnit(material, lightMaterialRecord.specularMapUnitMap);