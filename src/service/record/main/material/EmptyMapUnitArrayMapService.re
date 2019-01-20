let _unsafeGetEmptyMapUnitArray = (material, emptyMapUnitArrayMap) =>
  emptyMapUnitArrayMap |> WonderCommonlib.MutableSparseMapService.unsafeGet(material);

let addEmptyMapUnit = (material, emptyMapUnit, emptyMapUnitArrayMap) => {
  _unsafeGetEmptyMapUnitArray(material, emptyMapUnitArrayMap)
  |> ArrayService.push(emptyMapUnit)
  |> ignore;

  emptyMapUnitArrayMap;
};

let _createArray = textureCountPerMaterial =>
  ArrayService.rangeReverse(textureCountPerMaterial - 1, 0);

let initEmptyMapUnitArray =
    (material, textureCountPerMaterial, emptyMapUnitArrayMap) =>
  emptyMapUnitArrayMap
  |> WonderCommonlib.MutableSparseMapService.set(
       material,
       _createArray(textureCountPerMaterial),
     );

let unsafeGetEmptyMapUnitAndPop = (material, emptyMapUnitArrayMap) => (
  switch (
    _unsafeGetEmptyMapUnitArray(material, emptyMapUnitArrayMap)
    |> Js.Array.pop
  ) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="unsafeGetEmptyMapUnitAndPop",
        ~description={j|has no empty map unit|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | Some(mapUnit) => mapUnit
  },
  emptyMapUnitArrayMap,
);